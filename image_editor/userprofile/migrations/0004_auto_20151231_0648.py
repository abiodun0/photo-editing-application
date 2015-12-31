# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0003_auto_20151230_1535'),
    ]

    operations = [
        migrations.AddField(
            model_name='images',
            name='current_filter',
            field=models.CharField(default='', max_length=100, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='images',
            name='filter_path',
            field=models.CharField(default='', max_length=200, null=True),
        ),
    ]
