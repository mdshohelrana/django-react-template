from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils.translation import gettext_lazy as _
from core.utils.constants import LANGUAGES, TIMEZONES, GENDERS


class UserExtended(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    photo = models.ImageField(upload_to='photo/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    organization = models.CharField(max_length=255, null=True, blank=True)
    mobile_no = models.CharField(max_length=15, null=True, blank=True)
    phone_no = models.CharField(max_length=15, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    gender = models.CharField(
        max_length=100, choices=GENDERS, null=True, blank=True)
    language = models.CharField(
        max_length=3, choices=LANGUAGES, null=True, blank=True)
    time_zone = models.CharField(
        max_length=255, choices=TIMEZONES, null=True, blank=True)
    created_by = models.ForeignKey(
        'auth.User', related_name='userextended_created', on_delete=models.SET_NULL, null=True)
    updated_by = models.ForeignKey(
        'auth.User', related_name='userextended_updated', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.user.first_name

    class Meta:
        db_table = 'auth_user_extended'
        verbose_name = _("User Profile")
        verbose_name_plural = _("User Profiles")
