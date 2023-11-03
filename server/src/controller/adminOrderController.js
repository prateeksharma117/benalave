import { cancelOrder, confirmedOrder, deleteOrder, deliverOrder, getAllOrder, shipOrder } from "../services/OrderService.js"


export const getAllOrders =async (req, res) =>{
    try {
        const orders=await getAllOrder()
        return res.status(200).send(orders)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}

export const confirmedOrders =async (req, res) =>{
    const orderId=await req.params.orderId
    try {
        const orders=await confirmedOrder(orderId)
        return res.status(200).send(orders)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}

export const shippedOrders =async (req, res) =>{
    const orderId=await req.params.orderId
    try {
        const orders=await shipOrder(orderId)
        return res.status(200).send(orders)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}

export const deliverOrders =async (req, res) =>{
    const orderId=await req.params.orderId
    try {
        const orders=await deliverOrder(orderId)
        return res.status(200).send(orders)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}

export const cancelOrders =async (req, res) =>{
    const orderId=await req.params.orderId
    try {
        const orders=await cancelOrder(orderId)
        return res.status(200).send(orders)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}

export const deleteOrders =async (req, res) =>{
    const orderId=await req.params.orderId
    try {
        const orders=await deleteOrder(orderId)
        return res.status(200).send(orders)
    } catch (e) {
        return res.status(500).send({error:e.message})
    }
}