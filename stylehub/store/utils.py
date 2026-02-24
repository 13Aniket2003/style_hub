# store/utils.py

import sendgrid
from sendgrid.helpers.mail import Mail
from django.conf import settings
import logging

logger = logging.getLogger("django")

def send_welcome_email(email, full_name):
    logger.error("🚀 send_welcome_email CALLED")

    if not settings.SENDGRID_API_KEY:
        logger.error("❌ SENDGRID_API_KEY MISSING")
        return

    try:
        sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)

        message = Mail(
            from_email=settings.DEFAULT_FROM_EMAIL,
            to_emails=email,
            subject="Welcome to StyleHub 🎉",
            plain_text_content=f"""
Hi {full_name},

Welcome to StyleHub!
Your account has been created successfully.

– Team StyleHub
"""
        )

        response = sg.send(message)

        logger.error(f"✅ SENDGRID STATUS CODE: {response.status_code}")
        logger.error(f"✅ SENDGRID BODY: {response.body}")
        logger.error(f"✅ SENDGRID HEADERS: {response.headers}")

    except Exception as e:
        logger.exception("❌ SENDGRID EXCEPTION")