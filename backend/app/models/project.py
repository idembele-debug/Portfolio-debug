from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    project_type = Column(String(50), nullable=False, default="personal")  # academic, personal, enterprise, opensource, freelance
    preview_code = Column(Text, nullable=True)
    preview_color = Column(String(50), nullable=True, default="blue")
    github_url = Column(String(500), nullable=True)
    live_url = Column(String(500), nullable=True)
    tags = Column(String(500), nullable=True)  # comma-separated
    order = Column(Integer, default=0)
    is_featured = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    technologies = relationship("Technology", secondary="project_technologies", lazy="selectin")
