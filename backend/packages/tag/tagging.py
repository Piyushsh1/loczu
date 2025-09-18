from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from packages.dyna_modules.database import get_db
from packages.dyna_modules.models import Item, Business
import re
import logging

logger = logging.getLogger(__name__)

class TaggingService:
    """Service for handling tags and categorization"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def extract_tags_from_text(self, text: str) -> List[str]:
        """Extract tags from text using simple keyword extraction"""
        if not text:
            return []
        
        # Convert to lowercase and split into words
        words = re.findall(r'\b\w+\b', text.lower())
        
        # Filter out common stop words
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these',
            'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him',
            'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
        }
        
        # Extract meaningful words
        tags = [word for word in words if len(word) > 2 and word not in stop_words]
        
        # Remove duplicates and return
        return list(set(tags))
    
    def tag_item(self, item_id: int, custom_tags: Optional[List[str]] = None) -> List[str]:
        """Tag an item based on its properties"""
        item = self.db.query(Item).filter(Item.id == item_id).first()
        if not item:
            return []
        
        tags = []
        
        # Extract tags from item name and description
        if item.name:
            tags.extend(self.extract_tags_from_text(item.name))
        
        if item.description:
            tags.extend(self.extract_tags_from_text(item.description))
        
        # Add category as a tag
        if item.category:
            tags.append(item.category.lower())
        
        # Add custom tags if provided
        if custom_tags:
            tags.extend([tag.lower() for tag in custom_tags])
        
        # Remove duplicates and return
        return list(set(tags))
    
    def tag_business(self, business_id: int, custom_tags: Optional[List[str]] = None) -> List[str]:
        """Tag a business based on its properties"""
        business = self.db.query(Business).filter(Business.id == business_id).first()
        if not business:
            return []
        
        tags = []
        
        # Extract tags from business name and description
        if business.name:
            tags.extend(self.extract_tags_from_text(business.name))
        
        if business.description:
            tags.extend(self.extract_tags_from_text(business.description))
        
        # Add custom tags if provided
        if custom_tags:
            tags.extend([tag.lower() for tag in custom_tags])
        
        # Remove duplicates and return
        return list(set(tags))
    
    def search_by_tags(self, tags: List[str], item_type: str = "item") -> List[Any]:
        """Search items or businesses by tags"""
        if not tags:
            return []
        
        results = []
        
        if item_type == "item":
            items = self.db.query(Item).filter(Item.is_active == True).all()
            for item in items:
                item_tags = self.tag_item(item.id)
                if any(tag in item_tags for tag in tags):
                    results.append(item)
        
        elif item_type == "business":
            businesses = self.db.query(Business).filter(Business.is_active == True).all()
            for business in businesses:
                business_tags = self.tag_business(business.id)
                if any(tag in business_tags for tag in tags):
                    results.append(business)
        
        return results
    
    def get_popular_tags(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get most popular tags across all items"""
        items = self.db.query(Item).filter(Item.is_active == True).all()
        
        tag_counts = {}
        for item in items:
            item_tags = self.tag_item(item.id)
            for tag in item_tags:
                tag_counts[tag] = tag_counts.get(tag, 0) + 1
        
        # Sort by count and return top tags
        popular_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)
        return [{"tag": tag, "count": count} for tag, count in popular_tags[:limit]]
    
    def suggest_tags(self, text: str) -> List[str]:
        """Suggest tags based on input text"""
        return self.extract_tags_from_text(text)
