import { generateToken } from "../config/jwtProvider.js"
import { createCart } from "../services/CartService.js"
import { createUser, getUserByEmail } from "../services/UserService.js"
import bcrypt from "bcrypt"

export const register=async(req,res)=>{
    try {
        const user=await createUser(req.body)
        const jwt=generateToken(user._id)
        console.log(jwt);
        await createCart(user)
        return res.status(200).send({jwt,message:"registration successful"})
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}

export const login=async(req,res)=>{
    const {password,email}=req.body
    try {
        const user=await getUserByEmail(email)
        if (!user) {
            return res.status(404).send({message:"user not found"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if (!isPasswordValid) {
            return res.status(401).send({message:"invalid password"})
        }

        const jwt=generateToken(user._id)
        console.log(jwt);
        return res.status(200).send({jwt,message:"login success"})

    } 
    catch (e) {
        return res.status(500).send({error:e.message})
    }
}