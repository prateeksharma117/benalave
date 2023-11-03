import Review from "../models/ReviewModel.js"
import { findProductById } from "./ProductService.js"


export const createReview=async(reqData,user)=>{
    const product=await findProductById(reqData.productId)

    const review=new Review({
        user: user._id,
        product:product.id,
        review:reqData.review,
        createdAt:new Date(),
    })

    await product.save()
    return await review.save()

}


export const getAllReview=async(productId)=>{
    const product=await findProductById(reqData.productId)
    return await Review.find({product:productId}).populate("user")
}

