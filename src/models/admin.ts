import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type AdminType = {
    _id: string;
    email: string;
    username: string;
    password: string;
};

const adminSchema = new mongoose.Schema({
    email : { type: String, required: true, unique: true},
    username : { type: String, required: true, unique: true},
    password : { type: String, required: true},
});

adminSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
})

export const Admin = mongoose.model<AdminType>("Admin", adminSchema);