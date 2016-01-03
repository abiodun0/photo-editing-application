# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0004_auto_20151231_0648'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images',
            name='filter_path',
            field=models.ImageField(default=None, null=True, upload_to='filtered/'),
        ),
    ]
