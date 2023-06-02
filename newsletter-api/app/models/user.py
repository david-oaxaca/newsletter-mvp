from typing import Optional
from pydantic import BaseModel

class UserModel(BaseModel):
    email: str 
    password: str

    class Config:
        title= "User data"
        description= "Data of the user such as their e-mail"
        schema_extra= {
            "example": {
                "email": "tdwdavid76@gmail.com",
            }
        }