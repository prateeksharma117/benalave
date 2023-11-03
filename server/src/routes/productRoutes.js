import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { findProductWithId, getAllProducts } from '../controller/productController.js';
const productRouter = express.Router();


productRouter.get('/',getAllProducts)
productRouter.get('/id/:id',findProductWithId)

export default productRouter