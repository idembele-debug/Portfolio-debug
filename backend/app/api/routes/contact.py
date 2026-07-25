from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate, ContactMessageResponse
from app.api.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("/", response_model=ContactMessageResponse)
def send_message(data: ContactMessageCreate, db: Session = Depends(get_db)):
    message = ContactMessage(**data.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/", response_model=List[ContactMessageResponse])
def get_messages(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.put("/{message_id}/read")
def mark_as_read(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    message.is_read = True
    db.commit()
    return {"message": "Marked as read"}


@router.delete("/{message_id}")
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(message)
    db.commit()
    return {"message": "Message deleted"}