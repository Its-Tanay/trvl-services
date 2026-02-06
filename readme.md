# TRVL Services - Travel Booking Backend API

Modern TypeScript backend for hotel search, booking, and management with integrated payments

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green)](https://www.mongodb.com/)

## Features

- User & Admin authentication with JWT
- Hotel search with filters & pagination
- Booking system with Stripe payments
- Image uploads via Cloudinary
- Role-based access control
- Docker support for easy development

## Quick Start

### Prerequisites
- Docker & Docker Compose (recommended)
- OR Node.js 18+ and MongoDB (manual setup)

### Option 1: Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/Its-Tanay/trvl-services.git
cd trvl-services

# 2. Start the stack
docker-compose up

# 3. Seed the database (in another terminal)
docker exec trvl-app npm run seed

# Done! API running at http://localhost:9000
# MongoDB UI at http://localhost:8081
```

**Test it:**
```bash
curl http://localhost:9000/health
```

**Login credentials** (after seeding):
- Admin: `admin1@test.com` / `password123`
- User: `user1@test.com` / `password123`

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your configuration

# 3. Start MongoDB locally
# (or use MongoDB Atlas)

# 4. Run development server
npm run dev

# 5. Seed database
npm run seed
```

## Documentation

### Environment Variables

See [`.env.example`](.env.example) for all configuration options.

**Required:**
- `MONGODB_CONNECTION_STRING` - MongoDB connection URI
- `JWT_SECRET_KEY` - JWT signing secret
- `JWT_REFRESH_SECRET_KEY` - JWT refresh token secret
- `CLIENT_URL` - Frontend URL for CORS

**Optional (can use mock mode):**
- `MOCK_CLOUDINARY=true` - Skip image uploads (development)
- `MOCK_STRIPE=true` - Mock payment processing (development)
- `CLOUDINARY_CLOUD_NAME` - Image storage cloud name ([Get free account](https://cloudinary.com))
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `STRIPE_API_KEY` - Payment processing key ([Get test key](https://dashboard.stripe.com/test/apikeys))

### API Endpoints

#### Health Check

**GET** `/health` - Check server status

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-08-01T12:00:00.000Z",
  "uptime": 123.456,
  "database": "connected",
  "environment": "development",
  "mockServices": {
    "cloudinary": true,
    "stripe": true
  }
}
```

#### Authentication

**POST** `/api/users/auth/register` - Register new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**POST** `/api/users/auth/login` - Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response: Sets `auth_token` cookie

#### Hotels (User)

**GET** `/api/users/hotels/search?destination=Paris&page=1` - Search hotels

Query parameters:
- `destination` - City or country name
- `adultCount`, `childCount` - Guest counts
- `facilities` - Array of facility filters
- `types` - Array of hotel types
- `stars` - Array of star ratings (1-5)
- `maxPrice` - Maximum price per night
- `sortOption` - Sort order (`starRating`, `pricePerNightAsc`, `pricePerNightDesc`)
- `page` - Page number (default: 1, 5 results per page)

**GET** `/api/users/hotels/:id` - Get hotel details

**GET** `/api/users/hotels` - Get all hotels

#### Bookings (User - requires auth)

**POST** `/api/users/hotels/:hotelId/bookings/payment-intent` - Create Stripe payment intent
```json
{
  "numberOfNights": 3
}
```

**POST** `/api/users/hotels/:hotelId/bookings` - Create booking
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "adultCount": 2,
  "childCount": 0,
  "checkIn": "2024-08-01",
  "checkOut": "2024-08-05",
  "userId": "user_id",
  "paymentIntentId": "pi_xxx",
  "totalCost": 500
}
```

**GET** `/api/users/my-bookings` - Get user's bookings (requires auth)

#### Admin Routes (require admin auth)

**POST** `/api/admin/auth/register` - Register admin
```json
{
  "email": "admin@example.com",
  "username": "admin",
  "password": "password123",
  "businessName": "My Hotels",
  "ownerName": "John Admin"
}
```

**POST** `/api/admin/auth/login` - Login admin

**POST** `/api/admin/hotels/add-hotel` - Create hotel (multipart/form-data with images)

**PUT** `/api/admin/hotels/update-hotel-by-id/:hotelId` - Update hotel

**GET** `/api/admin/hotels/get-my-hotels` - Get admin's hotels

**GET** `/api/admin/hotels/get-hotel-by-id/:id` - Get specific hotel

### Project Structure

```
src/
├── index.ts              # Express app entry point
├── models/               # Mongoose schemas
│   ├── user.ts          # User model
│   ├── admin.ts         # Admin model
│   └── hotels.ts        # Hotel & Booking models
├── routes/              # API endpoints
│   ├── user/            # User routes
│   │   ├── users.ts
│   │   ├── user-auth.ts
│   │   ├── hotels.ts
│   │   └── my-bookings.ts
│   ├── admin/           # Admin routes
│   │   ├── admin.ts
│   │   ├── admin-auth.ts
│   │   └── my-hotels.ts
│   └── health.ts        # Health check endpoint
├── middleware/          # Express middleware
│   └── auth.ts          # JWT authentication
├── utils/               # Utility functions
│   ├── generateToken.ts # JWT generation
│   ├── validateEnv.ts   # Environment validation
│   └── mockServices.ts  # Mock external services
└── scripts/
    └── seed.ts          # Database seeding
```

## Development

### Available Commands

```bash
npm run dev          # Start development server with hot-reload
npm run build        # Compile TypeScript to JavaScript
npm run seed         # Populate database with test data
npm run seed:clean   # Clear database and reseed

# Docker commands
docker-compose up          # Start containers (use -d for detached)
docker-compose down        # Stop containers
docker-compose logs -f app # View app logs
docker exec trvl-app npm run seed  # Seed database in Docker

# Or use Makefile
make docker-up       # Start Docker stack
make seed            # Seed database
make docker-logs     # View logs
make help            # Show all commands
```

### Database Seeding

The seed script creates:
- 2 admin accounts (`admin1@test.com`, `admin2@test.com`)
- 3 user accounts (`user1@test.com`, `user2@test.com`, `user3@test.com`)
- 15 sample hotels across various cities
- 5 sample bookings

All accounts use password: `password123`

### Health Check

```bash
curl http://localhost:9000/health
```

Returns server status, database connection, and configured services.

## Troubleshooting

### Port already in use
```bash
# Find and kill process on port 9000
lsof -ti:9000 | xargs kill -9
```

### MongoDB connection failed
- Check `MONGODB_CONNECTION_STRING` in `.env`
- Ensure MongoDB container is running: `docker ps`
- Check logs: `docker-compose logs mongodb`

### Docker containers won't start
```bash
# Clean up and restart
docker-compose down -v
docker-compose up --build
```

### Image upload fails
- Set `MOCK_CLOUDINARY=true` in `.env.docker` to skip uploads
- Or configure Cloudinary credentials from https://cloudinary.com

### Payment processing fails
- Set `MOCK_STRIPE=true` in `.env.docker` to mock payments
- Or add Stripe test key from https://dashboard.stripe.com/test/apikeys
