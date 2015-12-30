import os

def fb_id(request):
    return {
    'fb_id': os.getenv("FB_ID"),
    }