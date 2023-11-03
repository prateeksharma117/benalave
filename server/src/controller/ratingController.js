import { createRating, getProductRating } from "../services/RatingService.js"




export const createRatings=async(req,res)=>{
    const user=await req.user
    try {
        const rating=await createRating(req.body,user)
        return res.status(201).send(rating)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}  


export const getAllRatings=async(req,res)=>{
    const productId=await req.params.id
    try {
        const rating=await getProductRating(productId)
        return res.status(201).send(rating)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}  