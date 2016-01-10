from django.forms import ModelForm
from .models import Images


class ImageForm(ModelForm):
    """Handles the upload of the ImageModel file """

    class Meta:
        model = Images
        fields = ['image']
