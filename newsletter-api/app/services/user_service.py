from typing import Union
from app.config.db import collection
from app.schemas.user_schema import user_entity, users_entity
import hashlib

class UserService():
    def __init__(self) -> None:
        pass

    def get_all_users(self) -> list:
        """
        General function to retrieve all users documents in collection.
        Used for debugging.
        """
        return users_entity(collection.find())

    def get_user_by_email(self, email: str) -> dict:
        """
        Function to retrieve a user document in a collection with the passed e-mail.
        """
        try:
            return user_entity(collection.find_one({"email": email}))
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}

    def create_new_user(self, user: dict) -> dict:
        """
        Creation of a new user in the database.
        Hashes the passed password and that's the one stored. Plain-text password is discarded.
        """
        try:
            if collection.find_one({"email": user["email"]}):
                return {"message": "User already exists."}
            else:
                user["password"] = hashlib.md5(user["password"].encode()).hexdigest()
                collection.insert_one(user).inserted_id
                return {"message": "User was created successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User couldn't be created."}
    
    def update_user(self, email:str, user: dict) -> dict:
        """
        Updates user password.
        Used for debugging.
        """
        try:
            curr_user = dict(user)

            if not collection.find_one({"email": email}):
                raise Exception("User doesn't exists in the database")
            
            curr_user["password"] = hashlib.md5(curr_user["password"].encode()).hexdigest()
            collection.find_one_and_update({"email": email}, {"$set": curr_user})
            return {"message": "User was updated successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}

    def delete_user(self, email: str) -> dict:
        """
        Deletes an user.
        Used for debugging.
        """
        try:
            user_entity(collection.find_one_and_delete({"email": email}))
            return {"message": "User was deleted successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}
        
    def login(self, user: dict) -> dict:
        """
        Compares passed password hash with password hash in database.
        If it doesn't match, returns an error response.
        """
        try:
            document_query = collection.find_one({"email": user["email"]})
            if document_query["password"] == hashlib.md5(user["password"].encode()).hexdigest():
                return {
                    "message": "User logged in successfuly.",
                    "user_mail": user["email"]
                }
            else:
                raise Exception("Passwords doesn't match")
        except Exception as e:
            print(str(e))
            return {"error": "Log In failed."}
    
    
