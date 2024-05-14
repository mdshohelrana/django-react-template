from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.urls import reverse
from django.shortcuts import get_object_or_404
from app.serializers.system.auth_serializer import LoginSerializer, ResetPasswordSerializer, RegisterSerializer
from app.serializers.system.user_serializer import UserSerializer
from app.services.emails.auth import forgot_password_email

class LoginView(TokenObtainPairView):
    """
    View for handling user login and generating JWT tokens.

    Inherits from TokenObtainPairView which is a built-in view provided by the rest_framework_simplejwt library.
    Uses the LoginSerializer for validating user credentials and generating tokens.

    Attributes:
        serializer_class (class): The serializer class to be used for validating user credentials.
    """
    serializer_class = LoginSerializer


class LogoutView(APIView):
    """
    View for logging out a user by blacklisting the refresh token.

    Attributes:
        permission_classes (tuple): Tuple of permission classes required for accessing this view.
    """

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Bad request"})


class ForgotPasswordView(APIView):
    """
    View for handling the forgot password functionality,
    Handle the POST request for resetting the password.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        Response: The HTTP response object.
    """

    def post(self, request):

        form = PasswordResetForm(request.data)

        if form.is_valid():
            user = form.get_user()
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = request.build_absolute_uri(
                reverse('password_reset_confirm', kwargs={
                        'uidb64': uid, 'token': token})
            )
            forgot_password_email.send_email(user.email, reset_url)
            return Response({'detail': 'Password reset email sent.'}, status=status.HTTP_200_OK)

        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    """
    API view for resetting user password.
    Handle POST request to reset user password.

    Parameters:
    - request: The HTTP request object.

    Returns:
    - Response: The HTTP response object.
    """
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        serializer = ResetPasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            user.password = make_password(
                serializer.validated_data['new_password'])
            user.save()
            return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterUserView(APIView):
    """
    API view for registering a new user.

    This view accepts a POST request with user data and creates a new user if the data is valid.
    If the data is invalid, it returns a response with the validation errors.

    Methods:
    - post: Handles the POST request and creates a new user if the data is valid.
    - verify_email: Handles the GET request to verify the user's email.

    Attributes:
    - serializer: An instance of RegisterSerializer used for validating and saving user data.
    """

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Send verification email to the user
            # You can implement this logic using your email service
            # For example:
            # verification_token = default_token_generator.make_token(user)
            # verification_url = reverse('verify_email', kwargs={'uidb64': urlsafe_base64_encode(force_bytes(user.pk)), 'token': verification_token})
            # send_verification_email(user.email, verification_url)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    """
    API view for verifying user's email.

    This view accepts a GET request with a verification token in the URL.
    If the token is valid, it sets the 'is_verify_email' attribute of the user to True.

    Methods:
    - get: Handles the GET request and verifies the user's email.

    Attributes:
    - token_param: The name of the URL parameter that contains the verification token.
    """

    token_param = 'token'

    def get(self, request):
        token = request.GET.get(self.token_param)
        if token:
            try:
                uidb64, token = token.split(':')
                uid = force_str(urlsafe_base64_decode(uidb64))
                user = get_object_or_404(User, pk=uid)
                if default_token_generator.check_token(user, token):
                    user.is_verify_email = True
                    user.save()
                    return Response({'detail': 'Email verified successfully.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Token not provided.'}, status=status.HTTP_400_BAD_REQUEST)
