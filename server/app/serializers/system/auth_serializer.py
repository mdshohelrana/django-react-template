from django.contrib.auth.models import User
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.signals import user_logged_in
from django.contrib.auth import user_logged_in
from app.models.system.user import UserExtended
from core.utils.constants import LANGUAGES


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = User.objects.filter(
            email=attrs['email'], is_active=True).first()

        if user and user.check_password(attrs['password']):
            refresh = RefreshToken.for_user(user)

            data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.email,
                }
            }

            update_last_login(None, user)
            request = self.context.get('request')
            # user_logged_in.send(sender=user.__class__, request=request, user=user)
            return data

        raise serializers.ValidationError('Invalid credentials')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            password=validated_data['password']
        )
        UserExtended.objects.create(
            user=user, language=LANGUAGES[0][0])  # language english
        update_last_login(None, user)
        request = self.context.get('request')
        # user_logged_in.send(sender=user.__class__, request=request, user=user)
        return user

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        if isinstance(instance, User):
            refresh = RefreshToken.for_user(instance)
            data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'first_name': instance.first_name,
                    'last_name': instance.last_name,
                    'email': instance.email,
                }
            }
            rep.pop('email', None)
            rep.update(data)

        return rep


class ResetPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate(self, data):
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')

        user = self.context['request'].user

        if not authenticate(username=user.username, password=current_password):
            raise serializers.ValidationError("Current password is incorrect.")

        if new_password != confirm_password:
            raise serializers.ValidationError(
                "New password and confirm password do not match.")

        if len(new_password) < 6:
            raise serializers.ValidationError(
                "New password must be at least 6 characters long.")

        return data
