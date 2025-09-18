#!/usr/bin/env python3
"""
GraphQL Server with Playground
"""

import uvicorn
from packages.routes.graphql import create_graphql_app

def main():
    """Main function to start the server"""
    app = create_graphql_app()
    
    print("🚀 Starting GraphQL server on http://0.0.0.0:8000")
    print("📊 GraphQL Playground available at http://localhost:8000/graphql")
    print("🔍 GraphQL endpoint available at http://localhost:8000/graphql")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
