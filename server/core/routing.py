from django.urls import path
from core.consumers.notification_consumer import NotificationConsumer


websocket_urlpatterns = [
    path('ws/notification/', NotificationConsumer.as_asgi()),
]