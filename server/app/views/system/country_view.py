import logging
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import json


class CountryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            with open('app/assets/countries.json', encoding='utf-8') as f:
                json_data = json.load(f)

            filtered_data = {key: value for key,
                             value in json_data.items() if key in ('TR', 'US')}

            return Response(filtered_data, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Internal server error.'}, status=status.HTTP_400_BAD_REQUEST)
