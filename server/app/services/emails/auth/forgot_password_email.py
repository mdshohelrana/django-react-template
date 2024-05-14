from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
import app.config.constants as constants

class ForgotPasswordEmail:
    @staticmethod
    def send_email(user, request):
        token = default_token_generator.make_token(user)

        current_site = get_current_site(request)

        mail_subject = 'forgot your password'

        message = render_to_string('emails/reset_password_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid': user.id,
            'token': token,
        })

        send_mail(mail_subject, message, constants.EMAIL_DEFAULT, [user.email])
