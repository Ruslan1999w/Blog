from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase


class AccountTests(TestCase):

    def test_user_list(self):
        url = 'http://127.0.0.1:8000/articles/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)