import express from 'express';
import { getAllUser, getUserProfile, getUserWithEmail, recentProduct } from '../controller/userController.js';
const  userRouter = express.Router();

userRouter.get("/profile",getUserProfile)
userRouter.get("/finduserwithemail",getUserWithEmail)
userRouter.get("/",getAllUser)
userRouter.post("/recentProduct",recentProduct)

export default userRouter