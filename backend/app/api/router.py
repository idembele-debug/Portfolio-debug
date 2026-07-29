from fastapi import APIRouter
from app.api.routes import (
    auth,
    profile,
    skills,
    projects,
    contact,
    histoire,
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(profile.router)
api_router.include_router(skills.router)
api_router.include_router(projects.router)
api_router.include_router(contact.router)
api_router.include_router(histoire.router)
