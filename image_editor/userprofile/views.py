from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
import json
from django.contrib.auth import authenticate, login
from django.template import RequestContext, loader
from django.views.generic import TemplateView,View
from django.contrib.auth.models import User
from userprofile.models import UserProfile, Images
from userprofile.forms import ImageForm

# Create your views here.


class LoginRequiredMixin(object):
    @method_decorator(login_required(login_url='/'))
    def dispatch(self, request, *args, **kwargs):
        return super(LoginRequiredMixin, self).dispatch(
            request, *args, **kwargs)


class IndexView(TemplateView):
    template_name = 'index.html'
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            return redirect(
                '/dashboard',
                context_instance=RequestContext(request)
            )
        return super(IndexView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        return context


class DashBoardView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard.html'

    def get_context_data(self, **kwargs):
        context = super(DashBoardView, self).get_context_data(**kwargs)
        return context


class LoginView(IndexView):
    @staticmethod
    def authenticate(user,request):
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)
        return HttpResponse("success", content_type='text/plain')

    def post(self, request, *args, **kwargs):
        if self.request.is_ajax():
            try:
                userprofile = UserProfile.objects.get(
                    social_id=request.POST['id'])
                user = userprofile.get_user()
                return self.authenticate(user,request)
                
            except UserProfile.DoesNotExist:
                user = User(
                    first_name=request.POST['first_name'],
                    last_name=request.POST['last_name'],
                    email=request.POST['email'],
                    username=request.POST['id']
                    )
                user.save()
                profile = user.profile
                profile.social_id = request.POST['id']
                profile.image = "https://graph.facebook.com/" + request.POST['id'] + "/picture?type=small"
                profile.save()
                return self.authenticate(user,request)

class ImagesView(View):
    form_class = ImageForm
    def get(self, request, *args, **kwargs):
        images = request.user.images.all()
        images_dict = [image.to_json() for image in images]
                
        response_json = json.dumps(images_dict)
        return HttpResponse(response_json, content_type="application/json")
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST, request.FILES)
        image = form.save(commit=False)
        image.owner = request.user
        image.title = form.files['image'].name
        image.save()
        response_json = json.dumps(image.to_json())
        return HttpResponse(response_json, content_type="application/json")

    def delete(self, request, *args, **kwargs):
        image_json =  json.loads(request.body)
        image = Images.objects.filter(id=image_json['id']).first()
        image.delete()
        return HttpResponse("success", content_type='text/plain')

