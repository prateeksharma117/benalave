import { getUserIdFromToken } from "../config/jwtProvider.js"
import { findUserById } from "../services/UserService.js"


export const Authenticate=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        if (!token) {
            return req.status(404).send({error:"token is required"})
        }
        const userId=getUserIdFromToken(token)
        const user=findUserById(userId)
        req.user=user

    } catch (e) {
        return res.status(500).send({error:e.message})
    }
    next()
}