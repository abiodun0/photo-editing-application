""" Tests for authentication"""
from django.contrib.auth.models import User
from django.test import TestCase, RequestFactory, Client
from django.core.urlresolvers import reverse
from imageditor.models import UserProfile


class UserSetupClass(TestCase):

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()
        self.user = User.objects.create(
            first_name='John',
            last_name='doe',
            username=828384758869697,
            email='johndoe@doe.com')
        self.profile = UserProfile.objects.create(
            social_id=828384758869697,
            image="http://placehold.it/20x20",
            user=self.user)
        self.data = {
            'first_name': 'John',
            'last_name': 'doe',
            'email': 'email@email.com',
            'id': 828384758869697,
            }

        self.new_data = {
            'first_name': 'andela',
            'last_name': 'andela',
            'email': 'email@email1.com',
            'id': 2,
        }

    def tearDown(self):
        User.objects.all().delete()
        UserProfile.objects.all().delete()

class TestAuthentication(UserSetupClass):

    def test_new_user_can_authenticate_and_login(self):
        url = reverse('login')
        response = self.client.post(url,
                                    self.new_data,
                                    HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'success')

    def test_can_authenticate_registered_user(self):
        url = reverse('login')
        response = self.client.post(url,
                                    self.data,
                                    HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'success')

    def test_user_can_reach_the_login_page(self):
        url = reverse('index')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_only_authenicated_user_can_reach_dashboard(self):
        url = reverse('dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 302)


