import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { createMultipleProducts, createProducts, deleteProducts, updateProducts } from '../controller/productController.js';
const adminProductRouter = express.Router();

adminProductRouter.post('/',Authenticate,createProducts)
adminProductRouter.post('/creates',Authenticate,createMultipleProducts)
adminProductRouter.delete('/delete/:id',Authenticate,deleteProducts)
adminProductRouter.put('/:id',Authenticate,updateProducts)

export default adminProductRouter