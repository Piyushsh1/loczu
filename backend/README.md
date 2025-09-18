# MyApp GraphQL Backend

A Python GraphQL backend built with FastAPI, Graphene, and SQLAlchemy.

## Features

- **GraphQL API** with FastAPI and Graphene
- **PostgreSQL** database with SQLAlchemy ORM
- **Redis** for caching and session storage
- **Celery** for background tasks and scheduled jobs
- **JWT Authentication** with role-based access control
- **File Upload** support with validation
- **Email Service** for notifications
- **Tagging System** for content categorization
- **Repository Pattern** for clean data access
- **Comprehensive Logging** and error handling

## Project Structure

```
backend/
├── packages/                 # Modular package structure
│   ├── context/             # GraphQL context management
│   ├── cron/                # Scheduled tasks and Celery
│   ├── dyna_modules/        # Database models and core functionality
│   ├── iffe/                # Immediate function execution utilities
│   ├── middleware/          # Authentication, CORS, logging
│   ├── pattern/             # Repository and service patterns
│   ├── routes/              # GraphQL schema and resolvers
│   ├── tag/                 # Tagging and categorization
│   └── www/                 # Web utilities (static files, email)
├── migrations/              # Database migrations
├── server.py               # Main application entry point
├── config.py               # Configuration settings
├── requirements.txt        # Python dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Multi-service setup
└── README.md              # This file
```

## Quick Start

### Using Docker (Recommended)

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations:**
   ```bash
   docker-compose exec api alembic upgrade head
   ```

4. **Access the GraphQL playground:**
   - Open http://localhost:8000/graphql in your browser

### Manual Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up PostgreSQL and Redis:**
   - Install PostgreSQL and Redis locally
   - Create a database named `myapp_db`

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run migrations:**
   ```bash
   alembic upgrade head
   ```

5. **Start the server:**
   ```bash
   python server.py
   ```

## API Endpoints

- **GraphQL Playground:** `http://localhost:8000/graphql`
- **Health Check:** `http://localhost:8000/health`
- **Static Files:** `http://localhost:8000/static/`

## GraphQL Schema

### Queries
- `users` - Get all users
- `user(id: Int!)` - Get user by ID
- `businesses` - Get all businesses
- `business(id: Int!)` - Get business by ID
- `items` - Get all items
- `item(id: Int!)` - Get item by ID
- `orders` - Get all orders
- `order(id: Int!)` - Get order by ID

### Mutations
- `createUser(userData: UserInput!)` - Create new user
- `createBusiness(businessData: BusinessInput!)` - Create new business
- `createItem(itemData: ItemInput!)` - Create new item
- `createOrder(orderData: OrderInput!)` - Create new order
- `createReview(businessId: Int!, rating: Int!, comment: String)` - Create review

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Background Tasks

Celery is used for background tasks:
- **Token cleanup** - Daily cleanup of expired tokens
- **Daily reports** - Send daily reports to administrators
- **Order processing** - Process pending orders every 5 minutes

## Development

### Running Tests
```bash
pytest
```

### Creating Migrations
```bash
alembic revision --autogenerate -m "Description of changes"
```

### Applying Migrations
```bash
alembic upgrade head
```

### Code Formatting
```bash
black .
isort .
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/myapp_db` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379/0` |
| `SECRET_KEY` | JWT secret key | `your-secret-key-here` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |
| `ENVIRONMENT` | Environment (development/production) | `development` |
| `DEBUG` | Debug mode | `True` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000,http://localhost:5173` |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
