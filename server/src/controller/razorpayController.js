import { updatePaymentInformation } from "../services/razorpayService.js"
import razorpay from "../config/razorpayClient.js"



export const createPaymentLinks = async (req, res) => {
    const amount=req?.params?.amount
    try {
        const options = {
            amount: amount,
            currency: "INR",
        };

        razorpay.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            
        });
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

export const updatePaymentInformations = async (req, res) => {
    const orderId = req.params.orderId
    const paymentId = req.params.paymentId
    const userId = req.params.userId
    const data={
        orderId:orderId,
        paymentId:paymentId,
        userId:userId,
    }
    try {
        await updatePaymentInformation(data)
        return res.status(200).send({ message: "payment information updated", status: true })
    } catch (e) {
        return res.status(500).send(e.message)
    }
}