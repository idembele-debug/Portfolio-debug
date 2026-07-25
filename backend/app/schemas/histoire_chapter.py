from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class HistoireChapterBase(BaseModel):
    title: str
    content: str
    chapter_order: int = 0


class HistoireChapterCreate(HistoireChapterBase):
    pass


class HistoireChapterUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    chapter_order: Optional[int] = None


class HistoireChapterResponse(HistoireChapterBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True