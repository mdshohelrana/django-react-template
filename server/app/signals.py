from django.contrib.auth.signals import user_logged_in
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.signals import user_logged_in
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from app.models.system.user import UserExtended
from django.utils import timezone

@receiver(user_logged_in, sender = User)
def user_login_success(sender, request, user, **kwargs):
    group_name = str(user.username).replace(".", "_").replace("@", "_")
    channel_layer = get_channel_layer()
    print(group_name)
    message = {
        'type': 'send.notification',
        'data': {
            'event_type' : 'User Login',
            'description' : "Successfully logged in.",
            'is_read' : False,
            'created_at' : str(timezone.now()),
        }
    }
    async_to_sync(channel_layer.group_send)(group_name, message)

