import os
from django.utils import timezone
from django.core.files.storage import default_storage
from core.utils.constants import DEFAULT_IMAGE_FOLDER_NAME, DEFAULT_PHOTO_FOLDER_NAME, DEFAULT_LOGO_FOLDER_NAME, DEFAULT_MENU_ICONS_FOLDER_NAME
from app.models.system.user import UserExtended


class ImageUploadService:
    def generate_filename(self, filename, folder_name):
        current_datetime = timezone.now()
        current_date_int = int(current_datetime.strftime('%Y%m%d'))
        current_time_int = int(current_datetime.strftime('%H%M%S%f'))

        ext = filename.split('.')[-1]

        new_filename = f"{filename.split('.')[0]}_{current_date_int}{current_time_int}.{ext}"
        new_filename = new_filename.replace(' ', '_').lower()

        return os.path.join(f'{folder_name}/', new_filename)

    def upload_images(self, file, value=None):

        if value == DEFAULT_PHOTO_FOLDER_NAME:
            folder_name = DEFAULT_PHOTO_FOLDER_NAME

        if value == DEFAULT_LOGO_FOLDER_NAME:
            folder_name = DEFAULT_LOGO_FOLDER_NAME

        if value == 'icon':
            folder_name = DEFAULT_MENU_ICONS_FOLDER_NAME

        if file and value:
            try:
                file_path = self.generate_filename(file.name, folder_name)

                folder_path = os.path.join(
                    DEFAULT_IMAGE_FOLDER_NAME, folder_name)
                if not os.path.exists(folder_path):
                    os.makedirs(folder_path)

                with default_storage.open(file_path, 'wb+') as destination:
                    for chunk in file.chunks():
                        destination.write(chunk)

                return {"file_path": file_path}

            except Exception as e:
                return {"error": str(e)}

        return None

    def delete_image(self, file_path):

        if file_path:
            default_storage.delete(file_path)
