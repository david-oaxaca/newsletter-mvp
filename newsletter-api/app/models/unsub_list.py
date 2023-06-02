from typing import Optional
from pydantic import BaseModel

class UnsubListModel(BaseModel):
    unsub_list: dict

    class Config:
        title= "Unsubscriptions list"
        description= "List of recipients that choose to unsubscribe from certain or all topics"
        schema_extra= {
            "example": {
                "unsubscribed_list": {
                    "tdwdavid76@gmail.com": ["Books"]
                },
            }
        }