import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import List, Optional, Dict, Any
import logging
from config import settings

logger = logging.getLogger(__name__)

class EmailService:
    """Service for sending emails"""
    
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"  # Change this to your SMTP server
        self.smtp_port = 587
        self.sender_email = settings.SENDER_EMAIL if hasattr(settings, 'SENDER_EMAIL') else "noreply@myapp.com"
        self.sender_password = settings.SENDER_PASSWORD if hasattr(settings, 'SENDER_PASSWORD') else ""
    
    def send_email(
        self,
        to_emails: List[str],
        subject: str,
        body: str,
        html_body: Optional[str] = None,
        attachments: Optional[List[Dict[str, Any]]] = None
    ) -> bool:
        """Send email to multiple recipients"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = ", ".join(to_emails)
            msg['Subject'] = subject
            
            # Add body
            if html_body:
                msg.attach(MIMEText(html_body, 'html'))
            else:
                msg.attach(MIMEText(body, 'plain'))
            
            # Add attachments
            if attachments:
                for attachment in attachments:
                    with open(attachment['file_path'], 'rb') as f:
                        part = MIMEBase('application', 'octet-stream')
                        part.set_payload(f.read())
                        encoders.encode_base64(part)
                        part.add_header(
                            'Content-Disposition',
                            f'attachment; filename= {attachment["filename"]}'
                        )
                        msg.attach(part)
            
            # Send email
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.sender_email, self.sender_password)
            text = msg.as_string()
            server.sendmail(self.sender_email, to_emails, text)
            server.quit()
            
            logger.info(f"Email sent successfully to {to_emails}")
            return True
            
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            return False
    
    def send_welcome_email(self, user_email: str, username: str) -> bool:
        """Send welcome email to new user"""
        subject = "Welcome to MyApp!"
        body = f"""
        Hello {username},
        
        Welcome to MyApp! We're excited to have you on board.
        
        Best regards,
        The MyApp Team
        """
        
        html_body = f"""
        <html>
        <body>
            <h2>Welcome to MyApp!</h2>
            <p>Hello {username},</p>
            <p>Welcome to MyApp! We're excited to have you on board.</p>
            <p>Best regards,<br>The MyApp Team</p>
        </body>
        </html>
        """
        
        return self.send_email([user_email], subject, body, html_body)
    
    def send_order_confirmation(self, user_email: str, order_id: int, order_details: Dict[str, Any]) -> bool:
        """Send order confirmation email"""
        subject = f"Order Confirmation - Order #{order_id}"
        body = f"""
        Hello,
        
        Your order #{order_id} has been confirmed.
        
        Order Details:
        - Total Amount: ${order_details.get('total_amount', 0)}
        - Items: {order_details.get('item_count', 0)}
        
        Thank you for your business!
        
        Best regards,
        The MyApp Team
        """
        
        html_body = f"""
        <html>
        <body>
            <h2>Order Confirmation - Order #{order_id}</h2>
            <p>Hello,</p>
            <p>Your order #{order_id} has been confirmed.</p>
            <h3>Order Details:</h3>
            <ul>
                <li>Total Amount: ${order_details.get('total_amount', 0)}</li>
                <li>Items: {order_details.get('item_count', 0)}</li>
            </ul>
            <p>Thank you for your business!</p>
            <p>Best regards,<br>The MyApp Team</p>
        </body>
        </html>
        """
        
        return self.send_email([user_email], subject, body, html_body)
    
    def send_password_reset(self, user_email: str, reset_token: str) -> bool:
        """Send password reset email"""
        subject = "Password Reset Request"
        reset_url = f"https://myapp.com/reset-password?token={reset_token}"
        
        body = f"""
        Hello,
        
        You requested a password reset for your MyApp account.
        
        Click the following link to reset your password:
        {reset_url}
        
        This link will expire in 1 hour.
        
        If you didn't request this, please ignore this email.
        
        Best regards,
        The MyApp Team
        """
        
        html_body = f"""
        <html>
        <body>
            <h2>Password Reset Request</h2>
            <p>Hello,</p>
            <p>You requested a password reset for your MyApp account.</p>
            <p>Click the following link to reset your password:</p>
            <a href="{reset_url}">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>The MyApp Team</p>
        </body>
        </html>
        """
        
        return self.send_email([user_email], subject, body, html_body)
