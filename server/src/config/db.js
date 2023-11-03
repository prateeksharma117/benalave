import mongoose from 'mongoose';

const MONGODB_URL="mongodb+srv://ps9665748:mrprateek@cluster0.n3bsjmh.mongodb.net/?retryWrites=true&w=majority"

const connectDb=()=>{
    return mongoose.connect(MONGODB_URL)
}

export default connectDb