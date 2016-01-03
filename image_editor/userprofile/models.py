from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from userprofile.overwrite_storage import OverwriteStorage


# Create your models here.
class UserProfile(models.Model):

    user = models.OneToOneField(User,related_name="profile")
    social_id = models.CharField(max_length=200, null=True)
    image = models.CharField(max_length=200, null=True)

    def get_user(self):
        return User.objects.get(id=self.user_id)

User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])


class Images(models.Model):
    owner = models.ForeignKey(User,related_name="images")
    image = models.ImageField(upload_to='uploads/')
    title = models.CharField(max_length=100, null=True)
    filtered = models.BooleanField(default=False)
    current_filter = models.CharField(max_length=100, null=True,blank=True,default='')
    filter_path = models.ImageField(upload_to='filtered/', storage=OverwriteStorage(), null=True, default=None)
    date_created = models.DateTimeField(
        auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def to_json(self):
        json_items = {
        'id': self.id,
        'title': self.title,
        'picture': str(self.image),
        'date_created': str(self.date_created),
        'date_modified': str(self.date_modified),
        'current_filter':self.current_filter,
        'filter_path':str(self.filter_path),
        'filtered': self.filtered
        }
        return json_items
    class Meta:
        ordering = ['-date_modified']

@receiver(pre_delete, sender=Images)
def delete_image(sender, instance, **kwargs):
    # Pass false so modelfield so it doesnt save the model
    instance.image.delete(False)
    instance.filter_path.delete(False)