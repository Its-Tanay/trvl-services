import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            role?: string;
        }
    }
}

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.userId = decoded.userId || decoded.adminId;
        req.role = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default verifyAuthToken;