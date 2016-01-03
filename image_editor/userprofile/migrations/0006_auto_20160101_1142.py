# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import userprofile.overwrite_storage
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0005_auto_20160101_0650'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='images',
            options={'ordering': ['-date_modified']},
        ),
        migrations.AddField(
            model_name='images',
            name='date_modified',
            field=models.DateTimeField(default=datetime.datetime(2016, 1, 1, 11, 42, 4, 139151, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='images',
            name='filter_path',
            field=models.ImageField(default=None, storage=userprofile.overwrite_storage.OverwriteStorage(), null=True, upload_to='filtered/'),
        ),
    ]
