import express, {Request, Response} from "express";
import { Admin } from "../models/admin";

const router = express.Router();

router.post("/admin/register", async(req: Request, res: Response) => {
    try{
        let admin = await Admin.findOne({
            email : req.body.email
        })

        if(admin){
            return res.status(400).json({message: "Admin already exists"})
        }

        admin = new Admin(req.body);
        await admin.save();

        return res.status(200).json({message: "Admin registered OK"})
    }

    catch(error){

    }
});