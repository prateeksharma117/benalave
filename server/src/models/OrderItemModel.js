import mongoose from "mongoose";
const {Schema}=mongoose

const orderItemSchema=new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true,
    },
    size:{
        type:String,
    },
    quantity:{
        type:Number,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    discountedPrice:{
        type:Number,
        require:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
})

const OrderItem= mongoose.model('orderItems',orderItemSchema)

export default OrderItem