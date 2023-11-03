import {login,register} from "../controller/authController.js"
import express from 'express';
const authRouter = express.Router();

authRouter.post("/signup",register)
authRouter.post("/signin",login)

export default authRouter