import express from 'express';
import { Authenticate } from '../middleWare/Authenticate.js';
import { createRatings, getAllRatings } from '../controller/ratingController.js';
const ratingRouter = express.Router();


ratingRouter.post('/create',Authenticate,createRatings)
ratingRouter.get('/product/:productId',Authenticate,getAllRatings)

export default ratingRouter