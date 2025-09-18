from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from config import settings
import mimetypes
import logging

logger = logging.getLogger(__name__)

def setup_static_files(app: FastAPI):
    """Setup static file serving"""
    
    # Create uploads directory if it doesn't exist
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    
    # Mount static files
    app.mount("/static", StaticFiles(directory=settings.UPLOAD_DIR), name="static")
    
    @app.get("/files/{file_path:path}")
    async def serve_file(file_path: str):
        """Serve uploaded files"""
        full_path = os.path.join(settings.UPLOAD_DIR, file_path)
        
        if not os.path.exists(full_path):
            return {"error": "File not found"}
        
        # Get MIME type
        mime_type, _ = mimetypes.guess_type(full_path)
        
        return FileResponse(
            full_path,
            media_type=mime_type or "application/octet-stream"
        )

def validate_file_type(filename: str, allowed_types: list = None) -> bool:
    """Validate file type based on extension"""
    if not allowed_types:
        allowed_types = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx']
    
    _, ext = os.path.splitext(filename.lower())
    return ext in allowed_types

def validate_file_size(file_size: int) -> bool:
    """Validate file size"""
    return file_size <= settings.MAX_FILE_SIZE

def get_file_extension(filename: str) -> str:
    """Get file extension"""
    _, ext = os.path.splitext(filename)
    return ext.lower()

def generate_unique_filename(original_filename: str) -> str:
    """Generate unique filename to avoid conflicts"""
    import uuid
    import time
    
    ext = get_file_extension(original_filename)
    unique_id = str(uuid.uuid4())
    timestamp = str(int(time.time()))
    
    return f"{timestamp}_{unique_id}{ext}"
