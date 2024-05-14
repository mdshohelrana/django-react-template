from django.utils.translation import gettext_lazy as _
import json


LANGUAGES = (
    ('EN', _('English')),
    ('TR', _('Turkish')),
)

with open('app/assets/timezones.json', 'r') as file:
    timezones_data = json.load(file)

TIMEZONES = [(tz["utc"][0], tz["text"])
             for tz in timezones_data if tz.get("utc")]

ORDER_BY = (
    ('ASC', _('Ascending')),
    ('DESC', _('Descending')),
)

GENDERS = (
    ('M', _('Male')),
    ('F', _('Female')),
    ('O', _('Other')),
)

TIME_FORMATS = (
    ('hh:mm:ss A', _('HH:MM:SS AM/PM (e.g., 08:15:30 PM)')),
    ('hh:mm A', _('HH:MM AM/PM (e.g., 08:15 PM)')),
    ('HH:mm:ss', _('HH:MM:SS (24-hour format, e.g., 20:15:30)')),
    ('HH:mm', _('HH:MM (24-hour format, e.g., 20:15)')),
)

DATE_FORMATS = (
    ('MM/DD/YYYY', _('MM/DD/YYYY (e.g., 04/03/2024)')),
    ('DD.MM.YYYY', _('DD.MM.YYYY (e.g., 03.04.2024)')),
    ('DD/MM/YYYY', _('DD/MM/YYYY (e.g., 03/04/2024)')),
    ('MMM/DD/YYYY', _('MMM/DD/YYYY (e.g., Apr/03/2024)')),
    ('DD.MMM.YYYY', _('DD.MMM.YYYY (e.g., 03.Apr.2024)')),
    ('DD/MMM/YYYY', _('DD/MMM/YYYY (e.g., 03/Apr/2024)')),
)

DATE_TIME_FORMATS = (
    ('MM/DD/YYYY hh:mm:ss A',
     _('MM/DD/YYYY HH:MM:SS AM/PM (e.g., 04/03/2024 08:15:30 PM)')),
    ('MM/DD/YYYY hh:mm A',
     _('MM/DD/YYYY HH:MM AM/PM (e.g., 04/03/2024 08:15 PM)')),
    ('DD.MM.YYYY HH:mm:ss', _(
        'DD.MM.YYYY HH:MM:SS (24-hour format, e.g., 03.04.2024 20:15:30)')),
    ('DD.MM.YYYY HH:mm', _(
        'DD.MM.YYYY HH:MM (24-hour format, e.g., 03.04.2024 20:15)')),
    ('DD.MM.YYYY hh:mm:ss A', _(
        'DD.MM.YYYY HH:MM:SS AM/PM (12-hour format, e.g., 03.04.2024 08:15:30 PM)')),
    ('DD.MM.YYYY hh:mm A', _(
        'DD.MM.YYYY HH:MM AM/PM (12-hour format, e.g., 03.04.2024 08:15 PM)')),
    ('DD/MM/YYYY HH:mm:ss', _('DD/MM/YYYY HH:MM:SS (e.g., 03/04/2024 20:15:30)')),
    ('DD/MM/YYYY HH:mm', _('DD/MM/YYYY HH:MM (e.g., 03/04/2024 20:15)')),
    ('MMM/DD/YYYY hh:mm:ss A',
     _('MMM/DD/YYYY HH:MM:SS AM/PM (e.g., Apr/03/2024 08:15:30 PM)')),
    ('MMM/DD/YYYY hh:mm A',
     _('MMM/DD/YYYY HH:MM AM/PM (e.g., Apr/03/2024 08:15 PM)')),
    ('DD.MMM.YYYY HH:mm:ss', _(
        'DD.MMM.YYYY HH:MM:SS (24-hour format, e.g., 03.Apr.2024 20:15:30)')),
    ('DD.MMM.YYYY HH:mm', _(
        'DD.MMM.YYYY HH:MM (24-hour format, e.g., 03.Apr.2024 20:15)')),
    ('DD/MMM/YYYY HH:mm:ss', _('DD/MMM/YYYY HH:MM:SS (e.g., 03/Apr/2024 20:15:30)')),
    ('DD/MMM/YYYY HH:mm', _('DD/MMM/YYYY HH:MM (e.g., 03/Apr/2024 20:15)')),
)


DEFAULT_IMAGE_FOLDER_URL = "http://127.0.0.1:8000/api/v1/images"
DEFAULT_IMAGE_FOLDER_NAME = "images"
DEFAULT_QRCODE_FOLDER_NAME = "qr_codes"
DEFAULT_PHOTO_FOLDER_NAME = "photo"
DEFAULT_LOGO_FOLDER_NAME = "logo"
DEFAULT_MENU_ICONS_FOLDER_NAME = "menus_icons"

API_KEY = '2f05a26ab68e4169b07ee2be6b521a5e'