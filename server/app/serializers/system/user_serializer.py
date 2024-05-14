from rest_framework import serializers
from django.contrib.auth.models import User
from app.models.system.user import UserExtended
from app.services.image_upload_service import ImageUploadService


class UserExtendedSerializer(serializers.ModelSerializer):
    photo_path = serializers.CharField(
        max_length=500, write_only=True, required=False)

    class Meta:
        model = UserExtended
        fields = ['uuid', 'bio', 'photo_path', 'photo', 'organization', 'mobile_no', 'gender',
                  'phone_no', 'state', 'city', 'country', 'address', 'language', 'time_zone']

    def create(self, validated_data):
        photo_path = validated_data.pop('photo_path', None)
        instance = super().create(validated_data)

        if photo_path:
            self.instance.photo = photo_path

        instance.save()
        return instance

    def update(self, instance, validated_data):
        photo_path = validated_data.pop('photo_path', None)
        instance = super().update(instance, validated_data)

        if self.instance.photo and photo_path:
            service = ImageUploadService()
            service.delete_image(instance.photo.name)

        if photo_path:
            self.instance.photo = photo_path
            instance.save()

        return instance

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep.update({
            'language_name': instance.get_language_display() if instance.language else None,
            'gender_name': instance.get_gender_display(),
            'time_zone_label': instance.get_time_zone_display(),
        })

        return rep


class UserSerializer(serializers.ModelSerializer):
    userextended = UserExtendedSerializer(required=True)
    first_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'password', 'email', 'is_superuser', 'is_staff',
                  'is_active', 'date_joined', 'last_login', 'userextended',]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, password):
        if len(password) < 6:
            raise serializers.ValidationError(
                "Password must be at least 6 characters.")
        return password

    def create(self, validated_data):
        userextended_data = validated_data.pop('userextended')
        password = validated_data.pop('password')
        validated_data["username"] = validated_data.get('email')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)

        user.save()

        photo_path = userextended_data.pop('photo_path', None)
        user_extended = UserExtended.objects.create(
            user=user, **userextended_data)

        if photo_path:
            user_extended.photo = photo_path
            user_extended.save()

        return user

    def update(self, instance, validated_data):
        userextended_data = validated_data.pop('userextended', {})

        email = validated_data.get('email', None)
        if email:
            validated_data["username"] = validated_data.get('email')

        if userextended_data:
            userextended_serializer = UserExtendedSerializer(
                instance.userextended, data=userextended_data, partial=True)
            userextended_serializer.is_valid(raise_exception=True)
            userextended_serializer.save()

        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)

        instance.save()
        return instance

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep.update({'created_at': instance.date_joined})

        return rep
