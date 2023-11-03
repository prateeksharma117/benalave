import express from 'express';
import cors from 'cors';
import connectDb from "./src/config/db.js"
import authRouter from './src/routes/authRoutes.js';
import userRouter from './src/routes/userRouters.js';
import productRouter from './src/routes/productRoutes.js';
import adminProductRouter from './src/routes/adminProductRoutes.js';
import cartRouter from './src/routes/cartRoutes.js';
import cartItemRouter from './src/routes/cartItemRoutes.js';
import orderRouter from './src/routes/orderRoutes.js';
import reviewRouter from './src/routes/reviewRoutes.js';
import ratingRouter from './src/routes/ratingRoutes.js';
import adminOrderRouter from './src/routes/adminOrderRoutes.js';
import razorpayRouter from './src/routes/razorpayRoutes.js';
const PORT=process.env.PORT||5454


const app=express()
app.use(express.json())
app.use(cors())

app.get('/',(req, res) => {
    return res.status(200).send("i am started 😄")
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
