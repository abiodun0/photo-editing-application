from django.conf.urls import url
from userprofile import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^dashboard$', views.DashBoardView.as_view(), name='dashboard'),
    ]