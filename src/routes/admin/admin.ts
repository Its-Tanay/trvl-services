import express, { Request, Response } from "express";
import { Admin } from "../../models/admin";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post("/register", [
    check("email", "Email is required").isEmail(),
    check("username", "Username is required").isString(),
    check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
    check("businessName", "Business name is required").isString(),
    check("ownerName", "Owner name is required").isString()
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        let admin = await Admin.findOne({ email: req.body.email });

        if (admin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        admin = new Admin(req.body);
        await admin.save();

        return res.status(200).json({ message: "Admin registered OK" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;