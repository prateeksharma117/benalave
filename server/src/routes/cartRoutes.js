import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { addItemToCart, findUserCarts } from '../controller/cartController.js';
const cartRouter = express.Router();

cartRouter.get("/",Authenticate,findUserCarts)
cartRouter.put("/add",Authenticate,addItemToCart)

export default cartRouter