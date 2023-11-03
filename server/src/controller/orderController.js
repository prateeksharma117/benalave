import { createOrder, findOrderById, userOrderHistory } from "../services/OrderService.js"




export const createOrders=async(req,res)=>{
    const user=await req.user
    try {
        let createdOrder=await createOrder(user,req.body)
        return res.status(201).send(createdOrder)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}

export const findOrderWithId=async(req,res)=>{
    try {
        let createdOrder=await findOrderById(req.params.id)
        return res.status(201).send(createdOrder)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}

export const ordersHistory=async(req,res)=>{
    const user=await req.user
    try {
        let createdOrder=await userOrderHistory(user._id)
        return res.status(201).send(createdOrder)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}