from pydantic_settings import BaseSettings
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Portfolio API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Database
    DATABASE_URL: Optional[str] = os.getenv(
        "DATABASE_URL",
        "sqlite:///./portfolio.db"
    )

    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    # Upload
    UPLOAD_DIR: str = "uploads"
    UPLOAD_PROFILE_DIR: str = "uploads/profile"
    UPLOAD_PROJECTS_DIR: str = "uploads/projects"
    UPLOAD_CV_DIR: str = "uploads/cv"
    MAX_UPLOAD_SIZE: int = 5 * 1024 * 1024  # 5MB
    ALLOWED_EXTENSIONS: set[str] = {
        "jpg", "jpeg", "png", "gif", "webp", "pdf", "svg"
    }

    # Admin
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "i.dembele@hestim.ma")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "admin123")

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()