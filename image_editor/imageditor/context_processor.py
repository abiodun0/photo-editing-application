import os
from types import FunctionType
from .filters import FilterClass


def fb_id(request):

    return {
        'fb_id': os.getenv("FB_ID"),
        'filters': ','.join([x for x, y in FilterClass.__dict__.items()
                            if type(y) == FunctionType and x != '__init__' and
                            x != 'thumbnail'])
    }
