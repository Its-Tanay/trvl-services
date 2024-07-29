# TRVL Services

TRVL Services is a robust backend API for a travel booking platform, built with Node.js, Express, and TypeScript. It provides endpoints for user and admin authentication, hotel management, and booking operations.

## Features

- User and Admin authentication
- Hotel management (CRUD operations)
- Booking system with Stripe integration for payments
- Image upload functionality with Cloudinary
- Search functionality for hotels with various filters

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payment processing
- Cloudinary for image storage
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- Stripe account
- Cloudinary account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Its-Tanay/trvl-services.git cd trvl-services
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```env
CLIENT_URL=http://localhost:3000
MONGODB_CONNECTION_STRING=<your_mongodb_uri>
JWT_SECRET_KEY=<your_jwt_secret>
STRIPE_API_KEY=<your_stripe_secret_key>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

4. Start the server:

```bash
npm run dev
```

## API Endpoints

### User Routes

- POST `/api/users/auth/register` - Register a new user
- POST `/api/users/auth/login` - User login
- GET `/api/users/hotels/search` - Search hotels
- GET `/api/users/hotels` - Get all hotels
- GET `/api/users/hotels/:id` - Get a specific hotel
- POST `/api/users/hotels/:hotelId/bookings/payment-intent` - Create a payment intent
- POST `/api/users/hotels/:hotelId/bookings` - Book a hotel
- GET `/api/users/my-bookings` - Get user's bookings

### Admin Routes

- POST `/api/admin/auth/register` - Register a new admin
- POST `/api/admin/auth/login` - Admin login
- POST `/api/admin/hotels` - Create a new hotel
- PUT `/api/admin/hotels/:hotelId` - Update a hotel
- GET `/api/admin/hotels` - Get admin's hotels

## Project Structure

```
trvl-services/
├── src/
│   ├── index.ts              # Entry point
│   ├── interfaces/           # TypeScript interfaces
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   │   ├── admin/            # Admin-specific routes
│   │   └── user/             # User-specific routes
│   └── utils/                # Utility functions
├── .env                      # Environment variables
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```


##  Key Components

### Models
- `User`: Represents a user with fields for email, password, first name, and last name.
- `Admin`: Represents an admin user with fields for email, username, password, business name, and owner name.
- `Hotel`: Represents a hotel with fields for name, location, description, amenities, pricing, and bookings.

### Routes
- User routes handle user authentication, hotel searching, and booking operations.
- Admin routes manage admin authentication and hotel management.

### Utilities
- `generateToken`: Creates JWT tokens for authentication.

## Development

- Use `npm run dev` to start the development server with hot-reloading.
- The `nodemon` configuration watches for changes in `.ts` files.

## Building for Production

```bash
npm run build
```

- The TypeScript code is compiled to JavaScript in the `dist` folder.

## Deployment

After building, use `npm start` to run the production server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.