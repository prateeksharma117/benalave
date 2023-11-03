import express from 'express';
import { getAllUser, getUserProfile, getUserWithEmail } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.get("/profile",getUserProfile)
userRouter.get("/finduserwithemail",getUserWithEmail)
userRouter.get("/",getAllUser)

export default userRouter