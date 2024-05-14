from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response as DRFResponse
import logging

logger = logging.getLogger(__name__)


class ResponseFormattingMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # Check if this is a DRF Response object and the response is in JSON format
        if isinstance(response, DRFResponse) and self.is_json_response(response):
            model_name = self.get_model_name(response)
            formatted_data = {
                "success": response.status_code in range(200, 299),
                "message": self.get_default_message(response.status_code, model_name),
                "data": response.data if hasattr(response, 'data') else None
            }

            if response.status_code >= 400:
                logger.error(f'{response.status_code} Response: {formatted_data["message"]}', extra={
                             'response_data': formatted_data})

            # Modify DRF response data
            response.data = formatted_data
            # Indicate that the response needs to be re-rendered
            response._is_rendered = False
            response.render()

        return response

    def is_json_response(self, response):
        """
        Check if the response is JSON by looking at the accepted renderer format.
        """
        return hasattr(response, 'accepted_renderer') and response.accepted_renderer.format == 'json'

    def get_model_name(self, response):
        """
        Attempt to dynamically determine the model name from the response data.
        Defaults to "Resource" if unable to determine.
        """
        try:
            if 'data' in response.data and isinstance(response.data['data'], dict):
                first_key = next(iter(response.data['data']), None)
                if first_key:
                    return first_key.capitalize()
            return "Resource"
        except Exception as e:
            logger.error(f'Error determining model name: {str(e)}')
            return "Resource"

    def get_default_message(self, status_code, model_name):
        """
        Generate a default message based on the status code and model name.
        """
        if status_code == 200:
            return f"{model_name} retrieved successfully."
        elif status_code == 201:
            return f"{model_name} created successfully."
        elif status_code == 204:
            return f"{model_name} deleted successfully."
        elif status_code == 400:
            return "Bad request."
        elif status_code == 404:
            return f"{model_name} not found."
        elif status_code == 500:
            return "Internal server error."
        else:
            return "Unhandled response."
