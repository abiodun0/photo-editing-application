""" Tests for authentication"""
import mock
import os

from io import BytesIO
from PIL import Image
import json

from django.core.files import File
from django.core.urlresolvers import reverse
from userprofile.models import UserProfile, Images
from userprofile.views import ImagesView, DashBoardView,IndexView
from userprofile.tests.test_authentication import UserSetupClass


class UserImagesTest(UserSetupClass):

    def setUp(self):
        super(UserImagesTest, self).setUp()
        self.file = self.create_test_image()

        image = self.create_test_image()
        url = reverse('images')
        request = self.factory.post(url, {
            'image': image
        })

        # simulate a logged-in user
        request.user = self.user
        ImagesView.as_view()(request)

    def create_test_image(self):
        file = BytesIO()
        image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)
        return file

    def test_can_upload_image(self):
        image = self.create_test_image()
        url = reverse('images')
        request = self.factory.post(url, {
            'image': image
        })

        # simulate a logged-in user
        request.user = self.user
        response = ImagesView.as_view()(request)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'test.png')

    def test_user_can_change_image_title(self):
        url = reverse('images')
        json_data = json.dumps({
            'title': 'image',
            'current_filter': 'BLUR',
            'filtered': True,
            'id': 1,
        })
        request = self.factory.put(
            url, json_data, content_type='application/json',
            HTTP_X_REQUESTED_WITH='XMLHttpRequest')

        # simulate a logged-in user
        request.user = self.user
        response = ImagesView.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'image')

    def test_user_can_get_all_uploaded_images(self):
        url = reverse('images')
        request = self.factory.get(url)

        # simulate a logged-in user
        request.user = self.user
        response = ImagesView.as_view()(request)

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'title')

    def test_user_can_delete_image(self):
        url = reverse('images')
        json_data = json.dumps({
            'title': 'image',
            'current_filter': 'BLUR',
            'filtered': False,
            'id': 1,
        })
        request = self.factory.delete(
            url, json_data, content_type='application/json',
            HTTP_X_REQUESTED_WITH='XMLHttpRequest')

        # simulate a logged-in user
        request.user = self.user
        response = ImagesView.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'success')

    def test_user_can_reach_dashboard(self):
        url = reverse('dashboard')
        request = self.factory.get(url)

        # simulate a logged-in user
        request.user = self.user
        response = DashBoardView.as_view()(request)

        self.assertEqual(response.status_code, 200)

    def test_user_redirected_to_dashboard_when_authenticated(self):
        url = reverse('index')
        request = self.factory.get(url)

        # simulate a logged-in user
        request.user = self.user
        response = IndexView.as_view()(request)

        self.assertEqual(response.status_code, 302)


