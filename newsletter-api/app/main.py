from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.user_router import user_router
from app.routers.recipients_list_router import recipients_router
from app.routers.newsletter_router import newsletter_router

from app.docs import tags_metadata

# Init of the app
app = FastAPI(
    title = "Newsletter REST API",
    description= "REST API for Newsletter MVP",
    version = "0.0.1",
    openapi_tags=tags_metadata
)

# Include Middleware such as CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_router)
app.include_router(recipients_router)
app.include_router(newsletter_router)