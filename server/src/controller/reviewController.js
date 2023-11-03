import { createReview, getAllReview } from "../services/ReviewService.js"



export const createReviews=async(req,res)=>{
    const user=await req.user
    try {
        const review=await createReview(req.body,user)
        return res.status(201).send(review)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}  


export const getAllReviews=async(req,res)=>{
    const productId=await req.params.id
    try {
        const review=await getAllReview(productId)
        return res.status(201).send(review)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}  