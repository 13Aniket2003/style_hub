from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os

def send_welcome_email(to_email, full_name):
    message = Mail(
        from_email=os.getenv("EMAIL_FROM"),
        to_emails=to_email,
        subject="Welcome to Stylehub 🎉",
        html_content=f"""
        <h2>Hi {full_name},</h2>
        <p>Welcome to <b>Stylehub</b>!</p>
        <p>Your account has been created successfully.</p>
        <p>Happy shopping 🛍️</p>
        """
    )

    try:
        sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
        sg.send(message)
    except Exception as e:
        print("SENDGRID ERROR:", e)