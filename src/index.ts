import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/user/users';
import authRoutes from './routes/user/user-auth';
import adminRoutes from './routes/admin/admin';
import adminAuthRoutes from './routes/admin/admin-auth';
import hotelRoutes from "./routes/admin/my-hotels";
import cookieParser from 'cookie-parser';
import bookingRoutes from './routes/user/my-bookings';
import myHotelRoutes from './routes/user/hotels';
import healthRouter from './routes/health';
import { v2 as cloudinary } from 'cloudinary';
import { validateEnv } from './utils/validateEnv';

validateEnv();

if (process.env.MOCK_CLOUDINARY !== 'true') {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('Cloudinary configured:', cloudinary.config());
}

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/health", healthRouter);
app.use("/api/users/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/hotels", hotelRoutes);
app.use("/api/users/my-bookings", bookingRoutes);
app.use("/api/users/hotels", myHotelRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});