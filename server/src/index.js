import express from 'express';
import cors from 'cors';
import connectDb from "./config/db.js"
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRouters.js';
import productRouter from './routes/productRoutes.js';
import adminProductRouter from './routes/adminProductRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import cartItemRouter from './routes/cartItemRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import ratingRouter from './routes/ratingRoutes.js';
import adminOrderRouter from './routes/adminOrderRoutes.js';
import razorpayRouter from './routes/razorpayRoutes.js';
const PORT=process.env.PORT||5454


const app=express()
app.use(express.json())
app.use(cors())

app.get('/',(req, res) => {
    return res.status(200).send({message:"welcome to e-commerce "})
})

app.use("/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/admin/products",adminProductRouter)
app.use("/api/cart",cartRouter)
app.use("/api/cart_items",cartItemRouter)
app.use("/api/orders",orderRouter)
app.use("/api/admin/orders",adminOrderRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/ratings",ratingRouter)
app.use("/api/payments",razorpayRouter)

app.listen(PORT,async()=>{
    await connectDb()
    console.log(`server started at ${PORT}`);
})

export default app