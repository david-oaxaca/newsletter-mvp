from typing import Union
from app.config.db import collection
from app.models.recipients_list import RecipientsListModel as RecipientsList
from app.schemas.recipients_list_schema import recipients_list_entity

class RecipientsListService():
    def __init__(self) -> None:
        pass

    def get_recipients(self, email: str) -> recipients_list_entity:
        try:
            document_query = collection.find_one(
                {"email": email}, 
                {"recipients_list": 1}
            )

            if document_query and "recipients_list" in document_query:
                return recipients_list_entity(document_query)
            else:
                return {}

        except Exception as e:
            print(str(e))
            return {"error": "Recipients list wasn't found."}
        
    def update_recipients_list(self, email: str, recipients: list) -> bool:
        try:
            filter_query = {"email": email}
            update_query = {"$set": {"recipients_list": recipients}}
            collection.find_one_and_update(filter_query, update_query)
            return True
        except Exception as e:
            print(str(e))
            return False
    
    def create_new_recipients_list(self, email: str, recipients_list: RecipientsList) -> dict:
        try:
            if not collection.find_one({"email": email}):
                raise Exception("User doesn't exists in the database")

            new_recipients = dict(recipients_list)
            recipients = {email: ["none"] for email in new_recipients["recipients_list"]}

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
            if not collection.find_one({"email": email}):
                raise Exception("User doesn't exists in the database")
            
            document_query = collection.find_one(
                {"email": email}, 
                {"recipients_list": 1}
            )
            cur_list = dict(document_query)
            cur_list["recipients_list"][new_recipient] = ["none"]

            successful_update = self.update_recipients_list(email, cur_list["recipients_list"])

            if successful_update:
                return {"message": "Recipient was added successfuly"}
            else:
                raise Exception("Recipients list couldn't be added to user model")
        except Exception as e:
            print(str(e))
            return {"error": "Recipients lists couldn't be created."}
        
    def update_recipient_unsubs(self, email: str, recipient_mail: str, topics: list) -> dict:
        try:
            document_query = collection.find_one(
                {"email": email}, 
                {"recipients_list": 1}
            )

            recipients = dict(document_query)

            curr_unsubs = recipients["recipients_list"][recipient_mail]

            if "none" in curr_unsubs:
                recipients["recipients_list"][recipient_mail] = topics
            elif "all" in topics:
                recipients["recipients_list"][recipient_mail] = ["all"]
            elif "all" not in curr_unsubs:
                all_topics = set(curr_unsubs + topics)
                recipients["recipients_list"][recipient_mail] = list(all_topics)

        
            filter_query = {"email": email}
            update_query = {"$set": 
                                {
                                    "recipients_list": recipients["recipients_list"]
                                }
                            }
            
            collection.find_one_and_update(filter_query, update_query)
            return {"message": "The recipient was unsubscribed to the topics successfuly"}
        except Exception as e:
            print(str(e))
            return {"error": "Recipient couldn't be unsubscribed to the topics."}
