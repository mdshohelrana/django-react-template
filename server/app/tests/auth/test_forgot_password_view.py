from django.core import mail
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class PasswordResetTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        self.url = reverse('forgot_password')

    def test_password_reset_email_sent(self):
        response = self.client.post(self.url, {'email': 'test@example.com'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ['test@example.com'])

    def test_password_reset_email_user_not_exist(self):
        response = self.client.post(self.url, {'email': 'nonexistent@example.com'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(len(mail.outbox), 0)

    def test_password_reset_email_user_is_inactive(self):
        response = self.client.post(self.url, {'email': 'nonexistent@example.com'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(len(mail.outbox), 0)
