import requests
import json
from core.utils.constants import API_KEY

def fetch_api_data(api_url):
    """Fetch data from the specified Fingrid API URL."""
    headers = {'x-api-key': API_KEY}
    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {'error': str(e)}