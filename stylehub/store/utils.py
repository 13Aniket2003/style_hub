import sendgrid
from sendgrid.helpers.mail import Mail
from django.conf import settings

def send_welcome_email(email, full_name):
    print("🚀 SENDGRID FUNCTION STARTED")

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
        print("✅ SENDGRID STATUS:", response.status_code)

    except Exception as e:
        print("❌ SENDGRID ERROR:", str(e))