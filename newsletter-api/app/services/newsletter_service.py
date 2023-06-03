import os
from fastapi import BackgroundTasks
from typing import Union
from app.config.db import conn
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv

load_dotenv('../.env')

class NewsletterService():
    def __init__(self) -> None:
        pass

    async def send_email_async(
            self, 
            subject: str, 
            email_to: str, 
            body: dict
    ) -> None:

        message = MessageSchema(
            subject=subject,
            recipients=email_to,
            body=body,
            subtype='html'
        )

        fm = FastMail(conf)
        await fm.send_message(message, template_name='newsletter.html')

    def send_email_background(
            self, 
            background_taks: BackgroundTasks, 
            conf: ConnectionConfig,
            subject: str, 
            email_to: str, 
            body: dict
    ) -> None:
        message = MessageSchema(
            subject=subject,
            recipients=email_to,
            body=body,
            subtype='html'
        )

        fm = FastMail(conf)
        background_taks.add_task(fm.send_message, message, template_name='newsletter.html')

    def publish_newsletter(self, title: str) -> dict:
        try:    
            conf = ConnectionConfig(
                MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
                MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
                MAIL_FROM=os.getenv('MAIL_FROM'),
                MAIL_PORT=os.getenv('MAIL_PORT'),
                MAIL_SERVER=os.getenv('MAIL_SERVER'),
                MAIL_FROM_NAME=title,
                MAIL_TLS=True,
                MAIL_SSL=False,
                USE_CREDENTIALS=True,
                TEMPLATE_FOLDER='../templates/email'
            )
            return {}
        except Exception as e:
            print(str(e))
            return {"error": "The newsletter couldn't be published"}
