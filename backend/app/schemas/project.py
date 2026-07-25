from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProjectBase(BaseModel):
    title: str
    description: str
    project_type: str = "personal"
    preview_code: Optional[str] = None
    preview_color: Optional[str] = "blue"
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    tags: Optional[str] = None
    order: int = 0
    is_featured: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    project_type: Optional[str] = None
    preview_code: Optional[str] = None
    preview_color: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    tags: Optional[str] = None
    order: Optional[int] = None
    is_featured: Optional[int] = None


class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True