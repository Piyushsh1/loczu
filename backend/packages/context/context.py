from typing import Optional
from sqlalchemy.orm import Session
from redis import Redis
from config import settings

class GraphQLContext:
    """GraphQL context for request handling"""
    
    def __init__(self, db: Session, redis: Optional[Redis] = None, user: Optional[dict] = None):
        self.db = db
        self.redis = redis
        self.user = user
        self.request_id = None
    
    def set_request_id(self, request_id: str):
        """Set request ID for tracing"""
        self.request_id = request_id
    
    def get_user_id(self) -> Optional[int]:
        """Get current user ID"""
        return self.user.get("id") if self.user else None
    
    def is_authenticated(self) -> bool:
        """Check if user is authenticated"""
        return self.user is not None
    
    def has_permission(self, permission: str) -> bool:
        """Check if user has specific permission"""
        if not self.user:
            return False
        user_permissions = self.user.get("permissions", [])
        return permission in user_permissions
