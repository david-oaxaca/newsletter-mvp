import os
from pathlib import Path
from fastapi import BackgroundTasks
from typing import Union
from app.config.db import conn
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.schemas.recipients_list_schema import recipients_list_entity
from dotenv import load_dotenv

load_dotenv('.env')

class NewsletterService():
    
    def __init__(self) -> None:
        CURR_DIR = Path(__file__).resolve().parent
        self.conf = ConnectionConfig(
            MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
            MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
            MAIL_FROM=os.getenv('MAIL_FROM'),
            MAIL_PORT=os.getenv('MAIL_PORT'),
            MAIL_SERVER=os.getenv('MAIL_SERVER'),
            MAIL_FROM_NAME="Newsletter",
            MAIL_STARTTLS=True,
            MAIL_SSL_TLS=False,
            TEMPLATE_FOLDER= Path(CURR_DIR.parent, 'templates')
        )
        self.domain = os.getenv('DOMAIN')

    def retrieve_subscribed(self, email: str, topics: list) -> list:
        document_query = conn.local.user.find_one(
            {"email": email}, 
            {"recipients_list": 1}
        )

        subscribed = []
        
        recipients = recipients_list_entity(document_query)

        for recipient in recipients['recipients_list']:
            if "none" in recipient[1]: 
                subscribed.append(recipient[0])
            else:
                result = any(elem in recipient[1] for elem in topics)
                if not result and "all" not in recipient[1]:
                    subscribed.append(recipient[0])

        return subscribed
    
    def register_newletter(self) -> str:
        return "newsletter_id"
    
    async def send_newsletter_email(self, subject: str, recipients: list, body: dict):
        message = MessageSchema(
            subject=subject,
            recipients=recipients,
            template_body=body,
            subtype=MessageType.html,
        )
        
        fm = FastMail(self.conf)
        await fm.send_message(message, template_name='newsletter.html')

    async def send_newsletter(
            self, 
            sender: str, 
            subject: str, 
            title: str, 
            info: str, 
            topics: list
    ) -> dict:
        try:    
            newsletter_subscribed = self.retrieve_subscribed(sender, topics)
            newsletter_id = self.register_newletter()
            
            for recipient in newsletter_subscribed:
                unsubscribe_url = "/".join([self.domain, sender, recipient, newsletter_id])
                newsletter_info = {
                    "title": title,
                    "body": info,
                    "url": unsubscribe_url
                }
                await self.send_newsletter_email(subject, [recipient], newsletter_info)


            return {"message": "E-mail was send successfuly"}
        except Exception as e:
            print(str(e))
            return {"error": "The newsletter couldn't be published"}
