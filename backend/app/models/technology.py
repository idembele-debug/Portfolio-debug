from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.session import Base


class Technology(Base):
    __tablename__ = "technologies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    icon = Column(String(100), nullable=True)
    color = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())