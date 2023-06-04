from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.models.recipients_list import RecipientsListModel as RecipientsList
from app.models.newsletter_topics import NewsletterTopicsModel as Newsletter
from app.services.recipients_list_service import RecipientsListService

recipients_router = APIRouter()
recipients_list_service = RecipientsListService()

@recipients_router.get(
        "/{admin_email}/recipients/", 
        response_model=RecipientsList, 
        status_code=200, 
        tags=["recipients_list"])
def get_recipients_list(admin_email: str):
    service_response = recipients_list_service.get_recipients(admin_email)

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)

@recipients_router.post(
        "/{admin_email}/recipients/create-list/", 
        response_model=dict, 
        status_code=200, 
        tags=["recipients_list"])
def create_recipients_list(admin_email: str, recipients_list: RecipientsList):
    service_response = recipients_list_service.create_new_recipients_list(admin_email, recipients_list)

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=201, content=service_response)

@recipients_router.put(
        "/{admin_email}/recipients/add-recipient/{new_recipient}", 
        response_model=dict, 
        status_code=200, 
        tags=["recipients_list"])
def add_recipients(admin_email: str, new_recipient: str):
    service_response = recipients_list_service.add_new_recipient(admin_email, new_recipient)

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=201, content=service_response)

@recipients_router.put(
        "/{admin_email}/recipients/{recipient}/unsub/", 
        response_model=dict, 
        status_code=200, 
        tags=["recipients_list"])
def add_recipient_unsub(admin_email: str, recipient: str, unsub_topics: Newsletter):
    topics_list = dict(unsub_topics)
    
    service_response = recipients_list_service.update_recipient_unsubs(
        admin_email, 
        recipient, 
        topics_list["topics"].split(",")
    )

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=201, content=service_response)
