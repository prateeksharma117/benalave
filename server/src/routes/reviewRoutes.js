import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { createReviews, getAllReviews } from '../controller/reviewController.js';
const reviewRouter = express.Router();


reviewRouter.post('/create',Authenticate,createReviews)
reviewRouter.get('/product/:productId',Authenticate,getAllReviews)

export default reviewRouter