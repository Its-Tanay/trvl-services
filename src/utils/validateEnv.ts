export function validateEnv(): void {
  const required = [
    'MONGODB_CONNECTION_STRING',
    'JWT_SECRET_KEY',
    'JWT_REFRESH_SECRET_KEY',
    'CLIENT_URL'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('Missing required environment variables:');
    missing.forEach(key => console.error(`  - ${key}`));
    console.error('\nCopy .env.example to .env and configure required variables');
    process.exit(1);
  }

  const mockCloudinary = process.env.MOCK_CLOUDINARY === 'true';
  const mockStripe = process.env.MOCK_STRIPE === 'true';

  if (mockCloudinary) {
    console.warn('MOCK_CLOUDINARY=true: Image uploads will be mocked');
  } else if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary not configured. Set MOCK_CLOUDINARY=true or add credentials');
  }

  if (mockStripe) {
    console.warn('MOCK_STRIPE=true: Payment processing will be mocked');
  } else if (!process.env.STRIPE_API_KEY) {
    console.warn('Stripe not configured. Set MOCK_STRIPE=true or add API key');
  }

  console.log('Environment configuration validated\n');
}
