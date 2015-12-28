from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.template import RequestContext, loader
from django.views.generic import TemplateView
from django.contrib.auth.models import User
from userprofile.models import UserProfile

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
