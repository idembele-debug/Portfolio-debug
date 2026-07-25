from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.deploy_log import DeployLog
from app.schemas.deploy_log import DeployLogCreate, DeployLogUpdate, DeployLogResponse
from app.api.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/deploy-logs", tags=["Deploy Logs"])


@router.get("/", response_model=List[DeployLogResponse])
def get_logs(db: Session = Depends(get_db)):
    return db.query(DeployLog).order_by(DeployLog.created_at.desc()).limit(20).all()


@router.post("/", response_model=DeployLogResponse)
def create_log(
    data: DeployLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    log = DeployLog(**data.model_dump())
    db.add(log)
    db.commit()
    db.refresh(log)
    return log


@router.delete("/{log_id}")
def delete_log(
    log_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    log = db.query(DeployLog).filter(DeployLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    db.delete(log)
    db.commit()
    return {"message": "Log deleted"}