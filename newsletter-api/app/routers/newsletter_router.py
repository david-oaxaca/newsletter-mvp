from fastapi import APIRouter

newsletter_router = APIRouter

@newsletter_router.post("/publish")
async def publish_newsletter():
    return