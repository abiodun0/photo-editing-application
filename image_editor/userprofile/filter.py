import os
from django.core.files import File
from PIL import Image, ImageFilter
from cStringIO import StringIO
from django.core.files.uploadedfile import SimpleUploadedFile

def apply_filter(image,filters):
    original = Image.open(image.image.path)
    if original.mode not in ('L', 'RGB'):
        original = original.convert('RGB')
    image_type = original.format.lower()
    image_effect = getattr(ImageFilter, filters)
    effect = original.filter(image_effect)

    temp_handle = StringIO()
    effect.save(temp_handle, image_type)
    temp_handle.seek(0)

    suf = SimpleUploadedFile(os.path.split(image.image.name)[-1],
                 temp_handle.read(), content_type='image/%s' % (image_type))

    image.filter_path.save('%s_filter.%s'%(os.path.splitext(suf.name)[0],image_type), suf, save=False)
    return image

