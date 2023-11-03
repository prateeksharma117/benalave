import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { createPaymentLinks, updatePaymentInformations } from '../controller/razorpayController.js';
const razorpayRouter = express.Router();



razorpayRouter.post("/:amount",Authenticate,createPaymentLinks)
razorpayRouter.get("/:orderId/:paymentId/:userId",Authenticate,updatePaymentInformations)

export default razorpayRouter