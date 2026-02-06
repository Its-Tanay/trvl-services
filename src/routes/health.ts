import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
    mockServices: {
      cloudinary: process.env.MOCK_CLOUDINARY === 'true',
      stripe: process.env.MOCK_STRIPE === 'true'
    }
  });
});

export default router;
