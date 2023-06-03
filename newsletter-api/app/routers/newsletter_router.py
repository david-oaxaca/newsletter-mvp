from fastapi import APIRouter

newsletter_router = APIRouter()

@newsletter_router.post(
        "/publish-newsletter", 
        response_model=dict, 
        status_code=200, 
        tags=["newsletter"])
async def publish_newsletter():
    return {}