import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { createOrders, findOrderWithId, ordersHistory } from '../controller/orderController.js';
const orderRouter = express.Router();

orderRouter.post('/',Authenticate,createOrders)
orderRouter.get('/user',Authenticate,ordersHistory)
orderRouter.get('/:id',Authenticate,findOrderWithId)

export default orderRouter