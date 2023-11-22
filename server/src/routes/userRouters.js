import express from 'express';
import { carouselImages, getAllUser, getCarouselImages, getUserProfile, getUserWithEmail, recentProduct, wishlists } from '../controller/userController.js';
import { Authenticate } from '../middleWare/Authenticate.js';
const  userRouter = express.Router();

userRouter.get("/profile",getUserProfile)
userRouter.get("/finduserwithemail",getUserWithEmail)
userRouter.get("/",getAllUser)
userRouter.post("/recentProduct",Authenticate,recentProduct)
userRouter.post("/wishlist",Authenticate,wishlists)
userRouter.post("/carouselImage",Authenticate,carouselImages)
userRouter.get("/getCarouselImage",getCarouselImages)

export default userRouter