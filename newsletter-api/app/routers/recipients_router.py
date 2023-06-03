from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.models.recipients_list import RecipientsListModel as RecipientsList
from app.services.recipients_list_service import RecipientsListService

recipients_router = APIRouter()
recipients_list_service = RecipientsListService()

@recipients_router.get(
        "/{email}/recipients/", 
        response_model=RecipientsList, 
        status_code=200, 
        tags=["recipients_list"])
def get_recipients_list(email: str):
    service_response = recipients_list_service.get_recipients(email)

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)

@recipients_router.post(
        "/{email}/recipients/create-list/", 
        response_model=dict, 
        status_code=200, 
        tags=["recipients_list"])
def create_recipients_list(email: str, recipients_list: RecipientsList):
    service_response = recipients_list_service.create_new_recipients_list(email, recipients_list)

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=201, content=service_response)

@recipients_router.put(
        "/{email}/recipients/add-recipient/{new_recipient}", 
        response_model=dict, 
        status_code=200, 
        tags=["recipients_list"])
def add_recipients(email: str, new_recipient: str):
    service_response = recipients_list_service.add_new_recipient(email, new_recipient)

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=201, content=service_response)
