from channels.consumer import SyncConsumer, AsyncConsumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.exceptions import StopConsumer
import json
from django.contrib.auth.models import User


class NotificationConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        user = self.scope['user']
        if user.is_authenticated:
            self.group_name = str(user.username).replace(".", "_").replace("@", "_")
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            print(self.group_name)

            await self.accept()

    async def receive_json(self, content, **kwargs):
        print("Websocket message received.......", content)
        user = self.scope['user']

        if user.is_authenticated:
            # print(content)
            await self.channel_layer.group_send(self.group_name, {
                'type': 'send.notification', 
                'data': content['data'],
            })

    async def send_notification(self, event): 
        '''Send a notification message to the client.'''
        print('Send Notification....', event)
        await self.send_json({
            # 'type': 'send.notification',
            'success' : True,
            'message': "WebSocket message processed successfully.",
            'data':  event['data']
            
        })

    async def disconnect(self, close_code):
        user = self.scope['user']
        if user.is_authenticated:
            await self.channel_layer.group_discard(self.group_name, self.channel_name)