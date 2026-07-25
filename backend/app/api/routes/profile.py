from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileUpdate, ProfileResponse, ProfilePublic
from app.api.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("/", response_model=ProfilePublic)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.put("/", response_model=ProfileResponse)
def update_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(Profile).first()
    if not profile:
        profile = Profile(**data.model_dump(exclude_unset=True))
        db.add(profile)
    else:
        for key, value in data.model_dump(exclude_unset=True).items():
            setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return profile