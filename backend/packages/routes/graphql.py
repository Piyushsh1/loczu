from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from graphene import Schema
from packages.context.context import GraphQLContext
from packages.dyna_modules.database import get_db, get_redis
from packages.middleware.auth import get_current_user
from packages.dyna_modules.models import User
from packages.routes.schema import Query, Mutation, Subscription
import logging

logger = logging.getLogger(__name__)

def create_graphql_context(db, redis, user=None):
    """Create GraphQL context"""
    return GraphQLContext(db=db, redis=redis, user=user)

def create_graphql_app() -> FastAPI:
    """Create GraphQL FastAPI application"""
    
    # Create GraphQL schema
    schema = Schema(query=Query, mutation=Mutation, subscription=Subscription)
    
    # Create FastAPI app
    app = FastAPI(
        title="MyApp GraphQL API",
        description="A GraphQL API for MyApp",
        version="1.0.0"
    )
    
    # Add CORS middleware
    from packages.middleware.cors import setup_cors
    setup_cors(app)
    
    # Add logging middleware
    from packages.middleware.logging import LoggingMiddleware, SecurityHeadersMiddleware
    app.add_middleware(LoggingMiddleware)
    app.add_middleware(SecurityHeadersMiddleware)
    
    # Add GraphQL endpoint
    from fastapi import Request
    from fastapi.responses import JSONResponse
    import json
    
    @app.post("/graphql")
    async def graphql_endpoint(request: Request):
        """GraphQL endpoint"""
        try:
            body = await request.json()
            query = body.get("query")
            variables = body.get("variables", {})
            
            # Create context
            db = next(get_db())
            redis = get_redis()
            context = create_graphql_context(db, redis)
            
            # Execute GraphQL query
            result = schema.execute(query, variables=variables, context=context)
            
            return JSONResponse({
                "data": result.data,
                "errors": [{"message": str(error)} for error in result.errors] if result.errors else None
            })
            
        except Exception as e:
            logger.error(f"GraphQL error: {e}")
            return JSONResponse({"error": str(e)}, status_code=500)
    
    @app.get("/graphql")
    async def graphql_playground():
        """GraphQL Playground"""
        from fastapi.responses import HTMLResponse
        
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>GraphQL Playground</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css" />
            <link rel="shortcut icon" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/favicon.png" />
            <script src="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js"></script>
        </head>
        <body>
            <div id="root">
                <style>
                    body { margin: 0; font-family: Open Sans, sans-serif; overflow: hidden; }
                    #root { height: 100vh; }
                </style>
                <div id="loading-wrapper">
                    <div class="loading-text">Loading GraphQL Playground...</div>
                </div>
            </div>
            <script>
                window.addEventListener('load', function (event) {
                    GraphQLPlayground.init(document.getElementById('root'), {
                        endpoint: '/graphql'
                    })
                })
            </script>
        </body>
        </html>
        """
        return HTMLResponse(html)
    
    # Add health check endpoint
    @app.get("/health")
    async def health_check():
        return {"status": "healthy", "service": "myapp-graphql"}
    
    return app
