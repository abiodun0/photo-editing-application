import os
from time import time
from cStringIO import StringIO
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
from .filters import FilterClass


def apply_filter(image, filters):
    """This applies the required filters to the image
    @params image(model class)
    @filters string
    return image instance of model class"""
    if filters == 'thumbnail':
        original = Image.open(StringIO(image.image.read()))
    else:
        original = Image.open(image.image.path)
    image_type = original.format.lower()

    # if original.mode not in ('L', 'RGB'):
    #     original = original.convert('RGB')

    image_object = FilterClass(original)
    effect = getattr(image_object, filters)()

    temp_handle = StringIO()
    effect.save(temp_handle, image_type)
    temp_handle.seek(0)

    suf = SimpleUploadedFile(os.path.split(image.image.name)[-1],
                             temp_handle.read(),
                             content_type='image/%s' % (image_type))

    if filters != 'thumbnail':
        image.filter_path.save('%s_filter_%s.%s' %
                               (os.path.splitext(suf.name)[0],
                                int(time()*1000), image_type), suf, save=False)
        return image
    else:
        image.thumbnail.save('%s_thumbnail.%s' %
                             (os.path.splitext(suf.name)[0],
                              image_type), suf, save=False)
