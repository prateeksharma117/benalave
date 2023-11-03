import razorpay from "../config/razorpayClient.js"
import CartItem from "../models/CartItemModel.js"
import Cart from "../models/CartModel.js"
import { findOrderById } from "../services/OrderService.js"

export const updatePaymentInformation = async (reqData) => {

    const orderId = reqData.orderId
    const paymentId = reqData.paymentId
    const userId = reqData.userId

    console.log(userId);

    try {
        const order = await findOrderById(orderId)
        const cart=await Cart.findOne({user:userId}).populate('cartItems')
        const payment = await razorpay.payments.fetch(paymentId)
        if (payment.status === "authorized") {
            order.paymentDetails.paymentId = paymentId
            order.paymentDetails.paymentStatus = "COMPLETED"
            order.orderStatus = "PLACED"
            await order.save()
        }

        const resData = { message: "Your order is placed successfully", success: true }

        return resData
    } catch (e) {
        throw new Error(e.message)
    }
}