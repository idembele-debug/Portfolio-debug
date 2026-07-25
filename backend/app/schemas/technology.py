from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TechnologyBase(BaseModel):
    name: str
    icon: Optional[str] = None
    color: Optional[str] = None


class TechnologyCreate(TechnologyBase):
    pass


class TechnologyUpdate(BaseModel):
    name: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None


class TechnologyResponse(TechnologyBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True