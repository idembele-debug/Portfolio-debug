from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class ProfileBase(BaseModel):
    full_name: str
    title: str
    headline: str
    bio: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    photo_url: Optional[str] = None
    resume_url: Optional[str] = None
    available_for_work: int = 1


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    title: Optional[str] = None
    headline: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    photo_url: Optional[str] = None
    resume_url: Optional[str] = None
    available_for_work: Optional[int] = None


class ProfileResponse(ProfileBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProfilePublic(BaseModel):
    full_name: str
    title: str
    headline: str
    bio: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    photo_url: Optional[str] = None
    resume_url: Optional[str] = None
    available_for_work: int

    class Config:
        from_attributes = True