import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        require:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
})

const Review= mongoose.model('reviews',reviewSchema)

export default Review