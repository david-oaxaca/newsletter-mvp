from typing import Optional
from pydantic import BaseModel

class RecipientsListModel(BaseModel):
    recipients_list: list

    class Config:
        title= "Recipients list"
        description= "List of recipients that will receive the newsletter"
        schema_extra= {
            "example": {
                "recipient_list": ["tdwdavid76@gmail.com"],
            }
        }