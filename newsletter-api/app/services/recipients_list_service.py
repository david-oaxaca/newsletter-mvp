from typing import Union
from app.config.db import conn
from app.models.recipients_list import RecipientsListModel as RecipientsList
from app.schemas.recipients_list_schema import recipients_list_entity

class RecipientsListService():
    def __init__(self) -> None:
        pass

    def get_recipients(self, email: str) -> recipients_list_entity:
        try:
            recipient_list = conn.local.user.find_one(
                {"email": email}, 
                {"recipients_list": 1}
            )

            return recipients_list_entity(recipient_list)
        except Exception as e:
            print(str(e))
            return {"error": "Recipients list wasn't found."}
        
    def update_recipients_list(self, email: str, recipients: list) -> bool:
        try:
            filter_query = {"email": email}
            update_query = {"$set": {"recipients_list": recipients}}
            conn.local.user.find_one_and_update(filter_query, update_query)

            return True
        except Exception as e:
            print(str(e))
            return False
    
    def create_new_recipients_list(self, email: str, recipients_list: RecipientsList) -> dict:
        try:
            if not conn.local.user.find_one({"email": email}):
                raise Exception("User doesn't exists in the database")

            new_recipients = dict(recipients_list)
            recipients = [{email: "all"} for email in new_recipients["recipients_list"]]

            successful_update = self.update_recipients_list(email, recipients)

            if successful_update:
                return {"message": "Recipients list was created successfuly."}
            else:
                raise Exception("Recipients list couldn't be added to user model")
            
        except Exception as e:
            print(str(e))
            return {"error": "Recipients lists couldn't be created." }
        
    def add_new_recipient(self, email: str, new_recipient: str) -> dict:
        try:
            if not conn.local.user.find_one({"email": email}):
                raise Exception("User doesn't exists in the database")
            
            query_obj = conn.local.user.find_one(
                {"email": email}, 
                {"recipients_list": 1}
            )
            cur_list = dict(query_obj)
            cur_list["recipients_list"].append({new_recipient: "all"})

            successful_update = self.update_recipients_list(email, cur_list["recipients_list"])

            if successful_update:
                return {"message": "Recipient was added successfuly"}
            else:
                raise Exception("Recipients list couldn't be added to user model")
        except Exception as e:
            print(str(e))
            return {"error": "Recipients lists couldn't be created."}