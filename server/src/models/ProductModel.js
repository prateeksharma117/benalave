import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true,
    },
    discountedPrice: {
        type: Number,
    },
    discountedPercent: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    brand: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    size: [
        {
            name: { type: String },
            quantity: { type: Number },
        },
    ],
    imageUrl: 
    [
        {
            image: { type: String },
        },
    ],
    highlights:
    [
        {
            text:{type:String},
        },
    ],
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ratings",
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews",
        },
    ],
    numRatings: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model("products", productsSchema);

export default Product;
