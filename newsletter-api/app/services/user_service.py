from typing import Union
from app.config.db import conn
from app.schemas.user_schema import user_entity, users_entity
from passlib.hash import sha256_crypt

class UserService():
    def __init__(self) -> None:
        pass

    def get_all_users(self) -> list:
        return users_entity(conn.local.user.find())

    def get_user_by_email(self, email: str) -> dict:
        try:
            return user_entity(conn.local.user.find_one({"email": email}))
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}

    def create_new_user(self, user: dict) -> dict:
        try:
            if conn.local.user.find_one({"email": user["email"]}):
                return {"message": "User already exists."}
            else:
                user["password"] = sha256_crypt.encrypt(user["password"])
                conn.local.user.insert_one(user).inserted_id
                return {"message": "User was created successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User couldn't be created."}
    
    def update_user(self, email:str, user: dict) -> dict:
        try:
            cur_user = dict(user)

            if not conn.local.user.find_one({"email": email}):
                raise Exception("User doesn't exists in the database")
            
            cur_user["password"] = sha256_crypt.encrypt(cur_user["password"])
            conn.local.user.find_one_and_update({"email": email}, {"$set": cur_user})
            return {"message": "User was updated successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}

    def delete_user(self, email: str) -> dict:
        try:
            user_entity(conn.local.user.find_one_and_delete({"email": email}))
            return {"message": "User was deleted successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}
    
    
