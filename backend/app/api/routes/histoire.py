from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.histoire_chapter import HistoireChapter
from app.schemas.histoire_chapter import (
    HistoireChapterCreate,
    HistoireChapterUpdate,
    HistoireChapterResponse,
)
from app.api.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/histoire", tags=["Histoire"])


@router.get("/", response_model=List[HistoireChapterResponse])
def get_chapters(db: Session = Depends(get_db)):
    return db.query(HistoireChapter).order_by(HistoireChapter.chapter_order).all()


@router.post("/", response_model=HistoireChapterResponse)
def create_chapter(
    data: HistoireChapterCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chapter = HistoireChapter(**data.model_dump())
    db.add(chapter)
    db.commit()
    db.refresh(chapter)
    return chapter


@router.put("/{chapter_id}", response_model=HistoireChapterResponse)
def update_chapter(
    chapter_id: int,
    data: HistoireChapterUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chapter = db.query(HistoireChapter).filter(HistoireChapter.id == chapter_id).first()
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(chapter, key, value)
    db.commit()
    db.refresh(chapter)
    return chapter


@router.delete("/{chapter_id}")
def delete_chapter(
    chapter_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chapter = db.query(HistoireChapter).filter(HistoireChapter.id == chapter_id).first()
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    db.delete(chapter)
    db.commit()
    return {"message": "Chapter deleted"}