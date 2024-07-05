import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import adminAuthRoutes from './routes/adminAuth';
import cookieParser from 'cookie-parser';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/admin/auth", adminAuthRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});