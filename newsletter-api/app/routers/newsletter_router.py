from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from fastapi.responses import JSONResponse
from app.services.newsletter_service import NewsletterService
from typing import Annotated

newsletter_router = APIRouter()
newsletter_service = NewsletterService()

@newsletter_router.post(
        "/{admin_email}/newsletter/publish/", 
        response_model=dict, 
        status_code=200, 
        tags=["newsletter"])
async def publish_newsletter(
    admin_email: str,
    file: Annotated[UploadFile, File()],
    subject: Annotated[str, Form()], 
    title: Annotated[str, Form()], 
    body: Annotated[str, Form()],
    topics: Annotated[str, Form()]
):
    service_response = await newsletter_service.publish_newsletter(
        admin_email,
        subject,
        title,
        body,
        topics.split(","),
        file.content_type,
        file,
    )

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)

@newsletter_router.get(
        "/{admin_email}/newsletter/{newsletter_id}/get-topics/", 
        response_model=dict, 
        status_code=200, 
        tags=["newsletter"])
def retrieve_topics(admin_email: str, newsletter_id: str):
    service_response = newsletter_service.retrieve_newletter(admin_email, newsletter_id)

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)