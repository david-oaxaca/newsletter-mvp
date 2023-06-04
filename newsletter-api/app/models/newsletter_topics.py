from typing import Optional
from pydantic import BaseModel

class NewsletterTopicsModel(BaseModel):
    topics: str 

    class Config:
        title= "Newsletter list of topics"
        description= "Newsletter topics"
        schema_extra= {
            "example": {
                "topics": "books,dune,fantasy"
            }
        }