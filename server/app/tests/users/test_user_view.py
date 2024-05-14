from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User


class UserViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_list_users(self):
        url = reverse('user-list')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        url = reverse('user-list')
        data = {'username': 'newuser', 'password': 'newpassword'}
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_user(self):
        user = User.objects.create_user(username='existinguser', password='existingpassword')
        url = reverse('user-detail', args=[user.id])
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        user = User.objects.create_user(username='existinguser', password='existingpassword')
        url = reverse('user-detail', args=[user.id])
        data = {'username': 'updateduser'}
        self.client.force_authenticate(user=self.user)
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertEqual(user.username, 'updateduser')

    def test_delete_user(self):
        user = User.objects.create_user(username='existinguser', password='existingpassword')
        url = reverse('user-detail', args=[user.id])
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_enable_user(self):
        user = User.objects.create_user(username='existinguser', password='existingpassword')
        url = reverse('user-enable', args=[user.id])
        self.client.force_authenticate(user=self.user)
        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertTrue(user.is_active)

    def test_disable_user(self):
        user = User.objects.create_user(username='existinguser', password='existingpassword')
        url = reverse('user-disable', args=[user.id])
        self.client.force_authenticate(user=self.user)
        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertFalse(user.is_active)