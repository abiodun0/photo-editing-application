import json

from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.template import RequestContext
from django.views.generic import TemplateView, View
from django.contrib.auth.models import User
from django.http import JsonResponse

from useful.helpers import json_response
from imageditor.models import UserProfile, Images
from imageditor.forms import ImageForm
from imageditor.effects import apply_filter

# Create your views here.


class LoginRequiredMixin(object):
    """Decorator that protects the authenticated page"""
    @method_decorator(login_required(login_url='/'))
    def dispatch(self, request, *args, **kwargs):
        return super(LoginRequiredMixin, self).dispatch(
            request, *args, **kwargs)


class IndexView(TemplateView):
    template_name = 'index.html'

    def dispatch(self, request, *args, **kwargs):
        """ Redirects to dashboard if user is authenticated"""
        if request.user.is_authenticated():
            return redirect(
                '/dashboard',
                context_instance=RequestContext(request)
            )
        return super(IndexView, self).dispatch(request, *args, **kwargs)


class DashBoardView(LoginRequiredMixin, TemplateView):
    """Default dashboard view"""
    template_name = 'dashboard.html'


class LoginView(IndexView):
    """Authentication and Signup View"""

    @staticmethod
    def authenticate(user, request):
        """Static method that handles authentication and registration"""
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
        return JsonResponse({'status': 'success'})

    def post(self, request, *args, **kwargs):
        """Method that handles authentication """
        if self.request.is_ajax():
            try:
                # Checks if the user already exist in database
                userprofile = UserProfile.objects.get(
                    social_id=request.POST['id'])
                user = userprofile.get_user()
                return self.authenticate(user, request)

            except UserProfile.DoesNotExist:
                # If user does not exist create one
                user = User(
                    first_name=request.POST['first_name'],
                    last_name=request.POST['last_name'],
                    email=request.POST['email'],
                    username=request.POST['id']
                    )
                user.save()
                profile = user.profile
                profile.social_id = request.POST['id']
                profile.image = "https://graph.facebook.com/" + \
                                request.POST['id'] + "/picture?type=small"
                profile.save()
                return self.authenticate(user, request)


class ImagesView(LoginRequiredMixin, View):
    """ inititalize the image form"""
    form_class = ImageForm

    def get(self, request, *args, **kwargs):
        """Gets all the images for the specified user"""
        images = request.user.images.all()
        images_dict = [image.to_json() for image in images]
        return JsonResponse({'data': images_dict})

    def post(self, request, *args, **kwargs):
        """ Creates a new image from the upload form"""
        form = self.form_class(request.POST, request.FILES)

        # set the maximum upload file size to 10MB
        if form.files['image'].size > 10485760:
            return json_response(data="file too large", status=500)
        image = form.save(commit=False)
        image.owner = request.user
        image.title = form.files['image'].name
        image.save()
        return JsonResponse(image.to_json())

    def put(self, request, *args, **kwargs):
        """Edits image upload image and changes filter"""

        image_json = json.loads(request.body)
        image = Images.objects.get(pk=image_json['id'])
        if image.title != image_json['title']:
            image.title = image_json['title']

        if image.filtered != image_json['filtered']:
            image.filtered = image_json['filtered']
            image.current_filter = None

        if image_json['filtered'] and \
                image.current_filter != image_json['currentFilter']:
            image = apply_filter(image, image_json['currentFilter'])
            image.current_filter = image_json['currentFilter']
            image.filtered = image_json['filtered']

        image.save()
        return JsonResponse(image.to_json())

    def delete(self, request, *args, **kwargs):
        """ Deletes specified image form the delete request"""
        image_json = json.loads(request.body)
        image = Images.objects.get(pk=image_json['id'])
        image.delete()
        return JsonResponse({'status': 'success'})
