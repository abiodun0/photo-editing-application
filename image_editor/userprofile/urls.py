from django.conf.urls import url
from userprofile import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^login$', views.LoginView.as_view(), name='dashboard'),
    url(r'^logout$', 'django.contrib.auth.views.logout', {'next_page': '/'}),
    url(r'^dashboard$', views.DashBoardView.as_view(), name='dashboard'),
    url(r'^images$', views.ImagesView.as_view(), name='images'),
    ]