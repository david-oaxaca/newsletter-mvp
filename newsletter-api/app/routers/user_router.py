from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.models.user import User
from app.services.user_service import UserService

user_router = APIRouter()

@user_router.get("/users", response_model=list[User], status_code=200, tags=["users"])
def get_all_user():
    users = UserService().get_all_users()
    return users


@user_router.get("/users/{email}", response_model=User, status_code=200, tags=["users"])
def get_user(email: str):
    service_response = UserService().get_user_by_email(email)

    if type(service_response) != User:
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)


@user_router.post("/users/create-user", response_model=dict, status_code=201, tags=["users"])
def create_user(user: User):
    service_response = UserService().create_new_user(user)

    if service_response.get("error", None):
        raise HTTPException(status_code=400, detail=service_response["error"])   
    
    return JSONResponse(status_code=201, content=service_response)


@user_router.put("/users/modify-user/{email}", response_model=User, status_code=200, tags=["users"])
def modify_user(email: str, user: User):
    service_response = UserService().update_user(email, user)

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])    

    return JSONResponse(status_code=200, content=service_response)


@user_router.delete("/users/delete-user/{email}", response_model=dict, status_code=200, tags=["users"])
def delete_user(email: str):
    service_response = UserService().delete_user(email)
    
    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)