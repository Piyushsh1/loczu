import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5433/myapp_db")
    DATABASE_TEST_URL = os.getenv("DATABASE_TEST_URL", "postgresql://user:password@localhost:5432/myapp_test_db")
    
    # Redis
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # JWT
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # Environment
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"
    
    # CORS
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
    
    # File Upload
    MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "10485760"))
    UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
    
    # Server
    PORT = int(os.getenv("PORT", "8000"))

settings = Settings()
