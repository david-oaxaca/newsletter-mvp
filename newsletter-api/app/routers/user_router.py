from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.models.user import UserModel as User
from app.services.user_service import UserService

user_router = APIRouter()
user_service = UserService()

@user_router.get("/users", response_model=list[User], status_code=200, tags=["users"])
def get_all_user():
    users = user_service.get_all_users()
    return users


@user_router.get("/users/{email}", response_model=User, status_code=200, tags=["users"])
def get_user(email: str):
    service_response = user_service.get_user_by_email(email)
    print(type(service_response))
    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)


@user_router.post("/users/create-user", response_model=dict, status_code=201, tags=["users"])
def create_user(user: User):
    service_response = user_service.create_new_user(dict(user))

    if service_response.get("error", None):
        raise HTTPException(status_code=400, detail=service_response["error"])   
    
    return JSONResponse(status_code=201, content=service_response)


@user_router.put("/users/modify-user/{email}", response_model=User, status_code=200, tags=["users"])
def modify_user(email: str, user: User):
    service_response = user_service.update_user(email, dict(user))

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])    

    return JSONResponse(status_code=200, content=service_response)


@user_router.delete("/users/delete-user/{email}", response_model=dict, status_code=200, tags=["users"])
def delete_user(email: str):
    service_response = user_service.delete_user(email)
    
    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)