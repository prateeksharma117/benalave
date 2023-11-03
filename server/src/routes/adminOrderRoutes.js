import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { cancelOrders, confirmedOrders, deleteOrders, deliverOrders, getAllOrders, shippedOrders } from '../controller/adminOrderController.js';
const adminOrderRouter = express.Router();


adminOrderRouter.get('/',Authenticate,getAllOrders)
adminOrderRouter.put('/:orderId/confirmed',Authenticate,confirmedOrders)
adminOrderRouter.put('/:orderId/ship',Authenticate,shippedOrders)
adminOrderRouter.put('/:orderId/deliver',Authenticate,deliverOrders)
adminOrderRouter.put('/:orderId/cancel',Authenticate,cancelOrders)
adminOrderRouter.put('/:orderId/delete',Authenticate,deleteOrders)

export default adminOrderRouter