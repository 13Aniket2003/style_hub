import sendgrid
from sendgrid.helpers.mail import Mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_welcome_email(email, full_name):
    try:
        sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)

        message = Mail(
            from_email=settings.DEFAULT_FROM_EMAIL,
            to_emails=email,
            subject="Welcome to StyleHub 🎉",
            plain_text_content=(
                f"Hi {full_name},\n\n"
                "Welcome to StyleHub!\n\n"
                "Your account has been created successfully.\n"
                "Start shopping now.\n\n"
                "– Team StyleHub"
            ),
        )

        sg.send(message)
        logger.info("Welcome email sent to %s", email)

    except Exception as e:
        logger.error("SendGrid error: %s", e)