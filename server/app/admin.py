from django.contrib import admin
from app.models.system.user import UserExtended

from app.config.audit_config import *

# Register your models here.
admin.site.register(UserExtended)

