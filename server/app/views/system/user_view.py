from rest_framework import generics, status, pagination
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from app.serializers.system.user_serializer import UserSerializer
from rest_framework.response import Response
from app.helpers.log_helper import log_helper
from app.libraries.custom_pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.models import Group
from django.utils import timezone
from datetime import datetime, timedelta
from app.services.image_upload_service import ImageUploadService

class UserPagination(generics.ListAPIView):
    """
    A view for paginating and filtering User objects.

    This view provides pagination support and allows filtering of User objects based on the following fields:
    - first_name
    - last_name
    - username
    - email
    - is_active

    Attributes:
        queryset (QuerySet): A queryset of User objects.
        serializer_class (Serializer): The serializer class used to serialize User objects.
        pagination_class (Pagination): The pagination class used for paginating User objects.
        filter_backends (list): A list of filter backends used for filtering User objects.
        filterset_fields (list): The fields used for filtering User objects.

    Example:
        To paginate and filter User objects, make a GET request to this endpoint with the desired filters:

        GET /users/?first_name=John&is_active=true&page=2&page_size=10

    Pagination:
        This view supports pagination. The default pagination class is used, but you can customize it by setting the `pagination_class` attribute.

        Available query parameters for pagination:
        - page: The page number to retrieve (default: 1).
        - page_size: The number of items per page (default: 10).

    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name',
                        'username', 'email', 'is_active']
    search_fields = ['first_name', 'last_name', 'username', 'email']


class UserList(generics.ListAPIView):
    """
    API endpoint that allows users to be listed and created.

    Inherits from `generics.ListCreateAPIView` which provides the implementation
    for listing and creating objects.

    Attributes:
        queryset (QuerySet): The queryset of User objects to be listed.
        serializer_class (Serializer): The serializer class used for User objects.

    Example:
        To list all users, make a GET request to this endpoint.
        To create a new user, make a POST request to this endpoint with the required data.

    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(userextended__is_deleted=False)
    serializer_class = UserSerializer

    def get(self, request):
        queryset = User.objects.filter(userextended__is_deleted=False)

        serializer = UserSerializer(
            queryset, many=True, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetail(generics.RetrieveAPIView):
    """
    Retrieve a single user instance.

    Attributes:
        queryset (QuerySet): The queryset of User objects.
        serializer_class (Serializer): The serializer class for User objects.

    Methods:
        GET: Retrieves the details of a user.

    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, pk=None):
        user = User.objects.filter(pk=pk).first()

        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)


class CurrentUserDetail(APIView):
    """
    Retrieve the details of the authenticated user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        GET: Retrieves the details of the authenticated user.
        """
        user = request.user

        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)


class UserCreate(generics.CreateAPIView):
    """
    API endpoint for creating a new user.

    Inherits from `generics.CreateAPIView` and provides a POST method to create a user.

    Attributes:
        serializer_class (Serializer): The serializer class for User objects.

    Methods:
        post(self, request, *args, **kwargs): Handles the POST request to create a user.

    Examples:
        To create a new user, send a POST request to the following URL:
        /api/users/

        Example Request:
        POST /api/users/
        {
            "username": "john_doe",
            "email": "john.doe@example.com",
            "password": "password123"
        }

        Example Response:
        HTTP 201 Created
        {
            "id": 1,
            "username": "john_doe",
            "email": "john.doe@example.com",
            "is_active": true
        }
    """

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserUpdate(generics.UpdateAPIView):
    """
    API endpoint for updating a user.

    Inherits from `generics.UpdateAPIView` and provides a PUT method to update a user.

    Attributes:
        queryset (QuerySet): The queryset of User objects.
        serializer_class (Serializer): The serializer class for User objects.

    Methods:
        put(self, request, *args, **kwargs): Handles the PUT request to update a user.

    Examples:
        To update a user, send a PUT request to the following URL:
        /api/users/<user_id>/update

        Example Request:
        PUT /api/users/1234/
        {
            "username": "new_username",
            "email": "new_email@example.com"
        }

        Example Response:
        HTTP 200 OK
    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserEnabled(generics.UpdateAPIView):
    """
    API endpoint that allows a user to be enabled.

    Inherits from `generics.UpdateAPIView` and provides a PUT method to enable a user.

    Attributes:
        queryset (QuerySet): The queryset of User objects.
        serializer_class (Serializer): The serializer class for User objects.

    Methods:
        put(self, request, *args, **kwargs): Handles the PUT request to enable a user.

    Examples:
        To enable a user, send a PUT request to the following URL:
        /api/users/<user_id>/enabled/

        Example Request:
        PUT /api/users/1234/enabled/

        Example Response:
        HTTP 200 OK
    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        # Your implementation here
        user.is_active = True
        user.save()
        return Response(status=status.HTTP_200_OK)


class UserDisabled(generics.UpdateAPIView):
    """
    API endpoint that allows a user to be disabled.

    Inherits from `generics.UpdateAPIView` and provides a `put` method
    to disable a user by setting their `is_active` attribute to False.

    Attributes:
        queryset (QuerySet): The queryset of all User objects.
        serializer_class (Serializer): The serializer class for User objects.

    Methods:
        put(request, *args, **kwargs): Updates the user's `is_active` attribute to False.

    Returns:
        Response: HTTP 200 OK response.

    Examples:
        To disable a user, send a PUT request to the endpoint with the user's ID:
        ```
        PUT /users/disable/1
        ```

        Response:
        ```
        HTTP 200 OK
        ```

    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = False
        user.save()
        return Response(status=status.HTTP_200_OK)


class UserGroups(generics.UpdateAPIView):
    """
    API endpoint for associating groups with a user.

    Inherits from `generics.UpdateAPIView` and provides a PUT method to associate groups with a user.

    Attributes:
        queryset (QuerySet): The queryset of User objects.
        serializer_class (Serializer): The serializer class for User objects.

    Methods:
        put(self, request, *args, **kwargs): Handles the PUT request to associate groups with a user.

    Examples:
        To associate groups with a user, send a PUT request to the following URL:
        /api/users/{user_id}/groups/

        Example Request:
        PUT /api/users/1234/groups/
        {
            "groups": [1, 2, 3]
        }

        Example Response:
        HTTP 200 OK
        {
            "message": "Groups associated with user successfully."
        }
    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        group_ids = request.data.get('groups', [])
        user.groups.set(group_ids)
        return Response({"detail": "Groups associated with user successfully."}, status=status.HTTP_200_OK)


class UserDeleteView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(userextended__is_deleted=False)
    serializer_class = UserSerializer

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        user.userextended.is_deleted = True
        user.userextended.save()
        user.save()
        return Response({'message': 'User deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


class ImageUploadAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.image_upload_service = ImageUploadService()

    def post(self, request):
        uploaded_image = request.FILES.get('image')
        value = request.query_params.get('value')
        data = self.image_upload_service.upload_images(uploaded_image, value)
        return Response(data, status=status.HTTP_200_OK)
    
class ImageUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.image_upload_service = ImageUploadService()

    def patch(self, request, id):
        uploaded_image = request.FILES.get('image')
        value = request.query_params.get('value')
        data = self.image_upload_service.upload_images(uploaded_image, value)
        return Response(data, status=status.HTTP_200_OK)