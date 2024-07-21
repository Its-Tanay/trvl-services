import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Admin } from "../models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyAdminAuthToken } from "../middleware/auth";

const router = express.Router();

router.post("/login", [
    check("username", "Username is required").isString(),
    check("password", "Password with 6 or more characters is required").isLength({ min: 6 })
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { adminId: admin.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        );

        res.cookie("admin_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 1000,
        });

        res.status(200).json({ adminId: admin._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/validate-token", verifyAdminAuthToken, (req: Request, res: Response) => {
    res.status(200).json({ adminId: req.userId});
});

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("admin_auth_token", "", {
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});


export default router;