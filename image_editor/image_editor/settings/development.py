from .base import *
import sys

if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'testdatabase',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'imageditor',
            'USER': 'image_user',
            'PASSWORD': '123456',
            'HOST': '127.0.0.1',
            'PORT': '5432',
        }}
