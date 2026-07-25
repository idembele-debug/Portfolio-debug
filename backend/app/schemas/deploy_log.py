from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DeployLogBase(BaseModel):
    time: str
    badge_type: str = "info"
    message: str
    category: Optional[str] = "general"


class DeployLogCreate(DeployLogBase):
    pass


class DeployLogUpdate(BaseModel):
    time: Optional[str] = None
    badge_type: Optional[str] = None
    message: Optional[str] = None
    category: Optional[str] = None


class DeployLogResponse(DeployLogBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True