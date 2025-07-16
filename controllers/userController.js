import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 


export const createUser = async (req, res) => {
    console.log("============api hit");

    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } }); 
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword }); 
        // console.log("==============user details",user);
        res.status(201).json({ user, message: "User created successfully" });
    } catch (err) {
        console.log("Error in Creating User", err);
        res.status(500).json({ message: err.message });
    }
};

export const loginUser = async (req, res) => { 
    const {email,password} = req.body;
    try{

        const user = await User.findOne({where: {email}});
        if(!user)
            return res.status(404).json({message: "User Did not exists"});
        const  isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword)
            return res.status(401).json({message: "Invalid Credentials"});
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({user,token,message: "Login Successful"})
    }
    catch(err){
        console.log("Error in Login",err);
        res.status(500).json({message: err.message});
    }
}







