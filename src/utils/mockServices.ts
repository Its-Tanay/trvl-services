// Mock Stripe payment intent creation
export async function createMockPaymentIntent(amount: number) {
  return {
    id: `mock_pi_${Date.now()}`,
    client_secret: `mock_secret_${Date.now()}`,
    amount,
    currency: 'usd',
    status: 'succeeded'
  };
}

// Mock Cloudinary image upload
export function mockCloudinaryUpload(file: Express.Multer.File) {
  return {
    url: `https://via.placeholder.com/800x600?text=${encodeURIComponent(file.originalname)}`,
    public_id: `mock_${Date.now()}_${file.originalname}`
  };
}
