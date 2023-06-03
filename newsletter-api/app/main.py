from fastapi import FastAPI

from app.routers.user_router import user_router
from app.routers.recipients_router import recipients_router
from app.routers.newsletter_router import newsletter_router

from app.docs import tags_metadata

# Init of the app
app = FastAPI(
    title = "Newsletter REST API",
    description= "REST API for Newsletter MVP",
    version = "0.0.1",
    openapi_tags=tags_metadata
)

# Include routers
app.include_router(user_router)
app.include_router(recipients_router)
app.include_router(newsletter_router)