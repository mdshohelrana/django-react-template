import json
from datetime import datetime, timedelta
import pytz
from faker import Faker
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from app.models.system.user import UserExtended


class Command(BaseCommand):
    help = 'Populates the database with country data from a JSON file'

    def handle(self, *args, **options):
        self.create_user_with_extended_profile()

    def create_user_with_extended_profile(self):
        if User.objects.filter(username='demo').exists() or User.objects.filter(email='demo@demo.com').exists():
            self.stdout.write(self.style.WARNING(
                'User with the specified username or email already exists. Skipping creation.'))
            return

        # Create a user
        user = User.objects.create_user(
            username='demo',
            email='demo@demo.com',
            password='1password!',
            first_name='John',
            last_name='Doe',
            is_superuser=True,
            is_staff=True
        )

        # Create UserExtended profile
        user_extended = UserExtended.objects.create(
            user=user,
            photo=None,
            bio='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            organization='Fake Organization Inc.',
            mobile_no="+8801735755570",
            phone_no="+358402545717",
            state='Fakestate',
            city='Fakesville',
            address='123 Fake Street',
            gender="M",
            language="EN",
            time_zone='Europe/Helsinki',
            created_by_id=1,
            created_at=datetime.now(),
            is_deleted=False
        )

        self.stdout.write(self.style.SUCCESS(
            f'Successfully created user with extended profile: {user.username}'))
