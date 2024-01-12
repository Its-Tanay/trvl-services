import express, {Request, Response} from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();
router.post("/register", [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required with 6 or more character").isLength({min: 6})
], async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }
    try{
        let user = await User.findOne({
            email : req.body.email
        });

        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d"
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 1000 
        })

        return res.sendStatus(200);

    } catch(error) {
        console.log(error);
        res.status(500).send({message: "Something went wrong"})
    }
});

export default router;