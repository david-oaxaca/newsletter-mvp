from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.services.newsletter_service import NewsletterService
from app.models.newsletter import NewsletterModel as Newsletter

newsletter_router = APIRouter()
newsletter_service = NewsletterService()

@newsletter_router.post(
        "/{sender}/newsletter/publish/", 
        response_model=dict, 
        status_code=200, 
        tags=["newsletter"])
async def publish_newsletter(sender: str, newsletter: Newsletter):
    newsletter_info = dict(newsletter)
    service_response = await newsletter_service.send_newsletter(
        sender,
        newsletter_info["subject"],
        newsletter_info["title"],
        newsletter_info["body"],
        newsletter_info["topics"]
    )

    if service_response.get("error", None):
        raise HTTPException(status_code=404, detail=service_response["error"])
    
    return JSONResponse(status_code=200, content=service_response)
