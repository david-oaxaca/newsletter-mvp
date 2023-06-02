from typing import Union
from app.config.db import conn
from app.models.user import User
from app.schemas.user_schema import userEntity, usersEntity
from passlib.hash import sha256_crypt

class UserService():
    def __init__(self) -> None:
        pass

    def get_all_users(self) -> usersEntity:
        return usersEntity(conn.local.user.find())

    def get_user_by_email(self, email: str) -> Union[userEntity, dict]:
        try:
            return userEntity(conn.local.user.find_one({"email": email}))
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}

    def create_new_user(self, user: User) -> dict:
        try:
            new_user = dict(user)

            if conn.local.user.find_one({"email": new_user["email"]}):
                return {"message": "User already exists."}
            else:
                new_user["password"] = sha256_crypt.encrypt(new_user["password"])
                conn.local.user.insert_one(new_user).inserted_id
                return {"message": "User was created successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User couldn't be created."}
    
    def update_user(self, email:str, user: User) -> dict:
        try:
            cur_user = dict(user)

            if not conn.local.user.find_one({"email": cur_user["email"]}):
                raise Exception("User doesn't exists in the database")
            
            cur_user["password"] = sha256_crypt.encrypt(cur_user["password"])
            conn.local.user.find_one_and_update({"email": email}, {"$set": cur_user})
            return {"message": "User was updated successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}

    def delete_user(self, email: str) -> dict:
        try:
            userEntity(conn.local.user.find_one_and_delete({"email": email}))
            return {"message": "User was deleted successfuly."}
        except Exception as e:
            print(str(e))
            return {"error": "User doesn't exists."}
    
    
