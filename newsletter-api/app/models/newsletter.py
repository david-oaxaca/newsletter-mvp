from typing import Optional
from pydantic import BaseModel
from fastapi import UploadFile

class NewsletterModel(BaseModel):
    subject: str 
    title: str 
    body: str
    topics: list
    file_type: str

    class Config:
        title= "Newsletter data"
        description= "Newsletter info of title, info and files that will be send"
        schema_extra= {
            "example": {
                "subject": "Subject of the newsletter",
                "title": "Title of the newsletter",
                "body": "Information of the newsletter",
                "topics": ["Books", "Fantasy"],
                "file_type": "pdf"
            }
        }