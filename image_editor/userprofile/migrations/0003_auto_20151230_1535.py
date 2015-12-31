# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0002_auto_20151222_0849'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='images',
            options={'ordering': ['-date_created']},
        ),
        migrations.AddField(
            model_name='images',
            name='filtered',
            field=models.BooleanField(default=False),
        ),
    ]
