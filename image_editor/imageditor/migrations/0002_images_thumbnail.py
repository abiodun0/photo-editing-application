# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imageditor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='images',
            name='thumbnail',
            field=models.ImageField(max_length=500, null=True, upload_to='thumbnail', blank=True),
        ),
    ]
