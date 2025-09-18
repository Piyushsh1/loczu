#!/usr/bin/env python3
"""
Test script to verify the backend setup
"""

import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test if all modules can be imported"""
    try:
        print("Testing imports...")
        
        # Test config
        from config import settings
        print("✅ Config imported successfully")
        
        # Test database
        from packages.dyna_modules.database import get_db, init_db
        print("✅ Database module imported successfully")
        
        # Test models
        from packages.dyna_modules.models import User, Business, Item, Order
        print("✅ Models imported successfully")
        
        # Test GraphQL schema
        from packages.routes.schema import Query, Mutation
        print("✅ GraphQL schema imported successfully")
        
        # Test context
        from packages.context.context import GraphQLContext
        print("✅ Context imported successfully")
        
        # Test middleware
        from packages.middleware.auth import get_password_hash, verify_password
        print("✅ Auth middleware imported successfully")
        
        # Test services
        from packages.pattern.service import Service
        print("✅ Service pattern imported successfully")
        
        print("\n🎉 All imports successful! Backend setup is working correctly.")
        return True
        
    except Exception as e:
        print(f"❌ Import error: {e}")
        return False

def test_database_connection():
    """Test database connection"""
    try:
        print("\nTesting database connection...")
        from packages.dyna_modules.database import engine
        from sqlalchemy import text
        
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Database connection successful")
            return True
            
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        print("💡 Make sure PostgreSQL is running and configured correctly")
        return False

def main():
    """Main test function"""
    print("🧪 Testing MyApp GraphQL Backend Setup\n")
    
    # Test imports
    imports_ok = test_imports()
    
    # Test database connection
    db_ok = test_database_connection()
    
    if imports_ok and db_ok:
        print("\n🎉 All tests passed! Your backend is ready to use.")
        print("\nNext steps:")
        print("1. Run: python server.py")
        print("2. Open: http://localhost:8000/graphql")
        print("3. Start building your GraphQL queries!")
    else:
        print("\n❌ Some tests failed. Please check the errors above.")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
