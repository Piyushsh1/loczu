from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, RedirectResponse
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from src.graphql.schema import schema
from src.config.settings import settings

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', settings.mongo_url)
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', settings.db_name)]

# GraphQL router with context and GraphQL Playground enabled
async def get_context():
    return {"db": db}

# Create FastAPI app
app = FastAPI(title="E-commerce API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# Add OPTIONS handler for GraphQL endpoint before mounting the router
@app.options("/")
async def graphql_options():
    return Response(status_code=200)

# Mount GraphQL router with playground at /graphql
graphql_app = GraphQLRouter(
    schema,
    context_getter=get_context,
    graphql_ide=True  # Enable GraphQL Playground
)

# Mount GraphQL router at /graphql
app.include_router(graphql_app, prefix="/graphql")

# Redirect root to GraphQL Playground
@app.get("/")
async def root():
    return RedirectResponse(url="/graphql")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "E-commerce API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.host, port=settings.port)
