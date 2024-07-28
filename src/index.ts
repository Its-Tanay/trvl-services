import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/user/users';
import authRoutes from './routes/user/user-auth';
import adminRoutes from './routes/admin/admin';
import adminAuthRoutes from './routes/admin/admin-auth';
import hotelRoutes from "./routes/admin/my-hotels";
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/api/users/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/hotels", hotelRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});