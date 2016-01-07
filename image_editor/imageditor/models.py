from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver


# Create your models here.
class UserProfile(models.Model):
    """User profile model that has a one on one relationship with the User"""

    user = models.OneToOneField(User, related_name="profile")
    social_id = models.CharField(max_length=200, null=True)
    image = models.CharField(max_length=200, null=True)

    def get_user(self):
        return User.objects.get(id=self.user_id)

User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])


class Images(models.Model):
    owner = models.ForeignKey(User, related_name="images")
    thumbnail = models.ImageField(upload_to='thumbnail',
                                  max_length=500, blank=True, null=True)
    image = models.ImageField(upload_to='uploads/')
    title = models.CharField(max_length=100, null=True)
    filtered = models.BooleanField(default=False)
    current_filter = models.CharField(max_length=100,
                                      null=True, blank=True, default='')
    filter_path = models.ImageField(upload_to='filtered/',
                                    null=True, default=None)
    date_created = models.DateTimeField(
        auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def create_thumbnail(self):
        """ creates thumbnail image for the image"""
        if not self.image:
            return
        from PIL import Image
        from cStringIO import StringIO
        from django.core.files.uploadedfile import SimpleUploadedFile
        import os

        # Set our max thumbnail size in a tuple (max width, max height)
        THUMBNAIL_SIZE = (100, 100)

        # Open original photo which we want to thumbnail using PIL's Image
        image = Image.open(StringIO(self.image.read()))

        image_type = image.format.lower()

        image.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)

        # Save the thumbnail
        temp_handle = StringIO()
        image.save(temp_handle, image_type)
        temp_handle.seek(0)
        # Save image to a SimpleUploadedFile which can be saved into
        # ImageField
        suf = SimpleUploadedFile(os.path.split(self.image.name)[-1],
                                 temp_handle.read(),
                                 content_type=image_type)
        # Save SimpleUploadedFile into image field
        self.thumbnail.save('%s_thumbnail.%s' % (os.path.splitext(suf.name)[0],
                                                 image_type), suf, save=False)

    def save(self):
        # create a thumbnail
        if not self.id:
            self.create_thumbnail()

        super(Images, self).save()

    def to_json(self):
        json_items = {
                        'id': self.id,
                        'title': self.title,
                        'thumbnail': str(self.thumbnail),
                        'picture': str(self.image),
                        'date_created': str(self.date_created),
                        'date_modified': str(self.date_modified),
                        'current_filter': self.current_filter,
                        'filter_path': str(self.filter_path),
                        'filtered': self.filtered
                        }
        return json_items

    class Meta:
        ordering = ['-date_modified']


@receiver(pre_delete, sender=Images)
def delete_image(sender, instance, **kwargs):
    """Deletes image after image model is deleted"""
    instance.image.delete(False)
    instance.thumbnail.delete(False)
    instance.filter_path.delete(False)


@receiver(pre_save, sender=Images)
def update_image(sender, instance, update_fields, **kwargs):
    """Deletes image after image filter is changed"""
    try:
        # checks if the image exist
        prev_instance = sender.objects.get(pk=instance.id)
    except:
        pass

    try:
        if prev_instance.current_filter != instance.current_filter:
            prev_instance.filter_path.delete()
    except:
        pass
