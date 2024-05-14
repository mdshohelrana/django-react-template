from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException
from django.http import Http404
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from datetime import datetime
import logging

# Setup logger
logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    # to get the standard error response.
    response = exception_handler(exc, context)
    print(exc)

    if response is not None:
        response.data = {
            'status_code': response.status_code,
            'message': response.data.get('detail', 'Error occurred'),
            'time': datetime.now().isoformat(),
        }
    else:
        if isinstance(exc, Http404):
            response = Response({'status_code': 404, 'message': 'Not found',
                                'time': datetime.now().isoformat()}, status=404)
        elif isinstance(exc, PermissionDenied):
            response = Response({'status_code': 403, 'message': 'Permission denied',
                                'time': datetime.now().isoformat()}, status=403)
        else:
            # Log the error for unknown exceptions for further investigation
            logger.error(f'Unhandled exception caught: {exc}', exc_info=True)
            response = Response({'status_code': 500, 'message': 'Internal server error',
                                'time': datetime.now().isoformat()}, status=500)

    return response
