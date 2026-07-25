from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.session import Base


class DeployLog(Base):
    __tablename__ = "deploy_logs"

    id = Column(Integer, primary_key=True, index=True)
    time = Column(String(20), nullable=False)
    badge_type = Column(String(20), nullable=False, default="info")  # ok, warn, err, info
    message = Column(String(500), nullable=False)
    category = Column(String(100), nullable=True, default="general")
    created_at = Column(DateTime(timezone=True), server_default=func.now())