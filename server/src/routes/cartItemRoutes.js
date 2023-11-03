import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { removeCartItems, updateCartItems } from '../controller/cartItemController.js';
const cartItemRouter = express.Router();

cartItemRouter.put("/:id",Authenticate,updateCartItems)
cartItemRouter.delete("/:id",Authenticate,removeCartItems)

export default cartItemRouter