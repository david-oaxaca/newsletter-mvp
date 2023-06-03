from typing import Optional
from pydantic import BaseModel

class RecipientsListModel(BaseModel):
    recipients_list: list

    class Config:
        title= "User data"
        description= "Data of the user such as their e-mail"
        schema_extra= {
            "example": {
                "recipients_list": ["tdwdavid76@gmail.com", "tdwdavid@gmail.com"]
            }
        }