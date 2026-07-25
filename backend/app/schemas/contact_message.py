from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class ContactMessageBase(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str


class ContactMessageCreate(ContactMessageBase):
    pass


class ContactMessageResponse(ContactMessageBase):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True