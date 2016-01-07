from PIL import Image
from io import BytesIO

from django.test import TestCase

from imageditor.filters import FilterClass

def create_test_image():
    file = BytesIO()
    image = Image.new('RGBA', size=(50, 50), color=(155, 0, 0))
    image.save(file, 'JPEG')
    file.name = 'test.jpg'
    file.seek(0)
    return file

class FilterTeset(TestCase):

    def setUp(self):
        self.image = create_test_image()
        self.image_open = Image.open(self.image)

    def test_user_can_add_filter(self):
        image_object = FilterClass(self.image_open)
        detail = image_object.detail()
        invert = image_object.invert()
        flip = image_object.flip()
        grayscale = image_object.grayscale()
        blur = image_object.blur()
        contour = image_object.contour()
        darken = image_object.darken()
        mirror = image_object.mirror()
        brighten = image_object.brighten()
        self.assertIsInstance(mirror, Image.Image)
        self.assertIsInstance(detail, Image.Image)
        self.assertIsInstance(invert, Image.Image)
        self.assertIsInstance(flip, Image.Image)
        self.assertIsInstance(grayscale, Image.Image)
        self.assertIsInstance(blur, Image.Image)
        self.assertIsInstance(contour, Image.Image)
        self.assertIsInstance(darken, Image.Image)
        self.assertIsInstance(brighten, Image.Image)