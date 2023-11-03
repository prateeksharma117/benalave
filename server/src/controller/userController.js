import { getAllUsers, getUserByEmail, getUserProfileByToken } from "../services/UserService.js";


export const getUserProfile=async(req,res)=>{
    try {
        const jwt=req.headers.authorization?.split(" ")[1]
        if (!jwt) {
            return res.status(404).send({error:"token not found"});
        }
        const user=await getUserProfileByToken(jwt)
        return res.status(200).send(user)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}

export const getAllUser=async(req,res)=>{
    try {
        const users=await getAllUsers()
        return res.status(200).send(users)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}

export const getUserWithEmail=async(req,res)=>{
    const email=req.body.email
    try {
        if (!email) {
            return res.status(404).send({error:"email not found"});
        }
        const user=await getUserByEmail(email)
        return res.status(200).send(user)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}