from functools import wraps
from django.http import JsonResponse


def json_response(func):
    """
    Json response decorator that returns json data to the views
    """
    @wraps(func)
    def func_wrapper(request, *args, **kwargs):
        func_response = func(request, *args, **kwargs)
        status_code = func_response.get('status_code', 200)
        return JsonResponse(func_response, status=status_code)
    return func_wrapper
