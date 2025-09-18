import asyncio
from functools import wraps
from typing import Any, Callable, Coroutine
import logging

logger = logging.getLogger(__name__)

def async_iffe(func: Callable) -> Callable:
    """Decorator for immediate async function execution"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            if asyncio.iscoroutinefunction(func):
                return asyncio.run(func(*args, **kwargs))
            else:
                return func(*args, **kwargs)
        except Exception as e:
            logger.error(f"Error in async_iffe for {func.__name__}: {e}")
            raise
    return wrapper

def sync_iffe(func: Callable) -> Callable:
    """Decorator for immediate sync function execution"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logger.error(f"Error in sync_iffe for {func.__name__}: {e}")
            raise
    return wrapper

def retry_iffe(max_retries: int = 3, delay: float = 1.0):
    """Decorator for retrying function execution"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_retries - 1:
                        logger.warning(f"Attempt {attempt + 1} failed for {func.__name__}: {e}")
                        asyncio.sleep(delay)
                    else:
                        logger.error(f"All {max_retries} attempts failed for {func.__name__}: {e}")
            
            raise last_exception
        return wrapper
    return decorator

def cache_iffe(ttl: int = 300):
    """Decorator for caching function results"""
    def decorator(func: Callable) -> Callable:
        cache = {}
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{hash(str(args) + str(kwargs))}"
            
            if cache_key in cache:
                return cache[cache_key]
            
            result = func(*args, **kwargs)
            cache[cache_key] = result
            
            # Simple TTL implementation
            asyncio.create_task(_expire_cache(cache, cache_key, ttl))
            
            return result
        return wrapper
    return decorator

async def _expire_cache(cache: dict, key: str, ttl: int):
    """Helper function to expire cache entries"""
    await asyncio.sleep(ttl)
    cache.pop(key, None)
