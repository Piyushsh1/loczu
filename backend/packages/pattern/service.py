from typing import TypeVar, Generic, Type, Optional, List, Any, Dict
from sqlalchemy.orm import Session
from packages.pattern.repository import Repository
from packages.dyna_modules.database import Base
import logging

logger = logging.getLogger(__name__)

T = TypeVar('T', bound=Base)

class Service(Generic[T]):
    """Generic service pattern for business logic"""
    
    def __init__(self, model: Type[T], db: Session):
        self.repository = Repository(model, db)
        self.model = model
    
    def create(self, **kwargs) -> T:
        """Create a new record with business logic"""
        # Add any business logic here before creation
        return self.repository.create(**kwargs)
    
    def get_by_id(self, id: int) -> Optional[T]:
        """Get record by ID with business logic"""
        return self.repository.get_by_id(id)
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[T]:
        """Get all records with business logic"""
        return self.repository.get_all(skip, limit)
    
    def update(self, id: int, **kwargs) -> Optional[T]:
        """Update record with business logic"""
        # Add any business logic here before update
        return self.repository.update(id, **kwargs)
    
    def delete(self, id: int) -> bool:
        """Delete record with business logic"""
        # Add any business logic here before deletion
        return self.repository.delete(id)
    
    def filter_by(self, **kwargs) -> List[T]:
        """Filter records with business logic"""
        return self.repository.filter_by(**kwargs)
    
    def count(self) -> int:
        """Count records with business logic"""
        return self.repository.count()
    
    def search(self, query: str, fields: List[str]) -> List[T]:
        """Search records by query in specified fields"""
        # This would need to be implemented based on your search requirements
        # For now, return all records
        return self.repository.get_all()
    
    def bulk_create(self, data_list: List[Dict[str, Any]]) -> List[T]:
        """Create multiple records at once"""
        instances = []
        for data in data_list:
            instance = self.repository.create(**data)
            instances.append(instance)
        return instances
    
    def bulk_update(self, updates: List[Dict[str, Any]]) -> List[T]:
        """Update multiple records at once"""
        instances = []
        for update in updates:
            id = update.pop('id')
            instance = self.repository.update(id, **update)
            if instance:
                instances.append(instance)
        return instances
