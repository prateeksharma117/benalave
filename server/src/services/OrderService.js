import Address from "../models/AddressModel.js"
import OrderItem from "../models/OrderItemModel.js"
import Order from "../models/OrderModel.js"
import { findUserCart } from "./CartService.js"


export const createOrder = async (user, shippingAddress,orders) => {

    let address = await Address.findOne({streetAddress: shippingAddress.streetAddress,mobile: shippingAddress.mobile,zipCode: shippingAddress.zipCode });

    if (!address){
        address = new Address(shippingAddress);
        address.user = user;
        await address.save();
        user.address.push(address);
        await user.save();
    }

    const cart = await findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: user._id, // Use the user's ObjectID
            discountedPrice: item.discountedPrice,
        });

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem._id); // Store the ObjectID in the array
    }

    const createdOrder = new Order({
        user: user._id, // Use the user's ObjectID
        orderItems: orderItems, // An array of OrderItem ObjectIDs
        totalPrice: cart.totalPrice,
        discountedPrice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippingAddress: address._id, // Use the address's ObjectID
    });

    const savedOrder = await createdOrder.save();
    return savedOrder;
}


export const placeOrder=async(orderId)=>{
    const order= await findOrderById(orderId)

    order.orderStatus="PLACED"
    order.paymentDetails.status="COMPLETED"

    return await order.save()
}

export const confirmedOrder=async(orderId)=>{
    const order= await findOrderById(orderId)

    order.orderStatus="CONFIRMED"

    return await order.save()
}

export const shipOrder=async(orderId)=>{
    const order= await findOrderById(orderId)

    order.orderStatus="SHIPPED"

    return await order.save()
}

export const deliverOrder=async(orderId)=>{
    const order= await findOrderById(orderId)

    order.orderStatus="DELIVERED"

    return await order.save()
}

export const cancelOrder=async(orderId)=>{
    const order= await findOrderById(orderId)

    order.orderStatus="CANCELLED"

    return await order.save()
}

export const findOrderById=async(orderId)=>{
    const order=await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems",populate:{path:"product",populate:{path:'category',}}})
    .populate("shippingAddress")
    return order
}

export const userOrderHistory=async(userId)=>{
    try {
        const orders=await Order.find({user:userId})
        .populate({path:"orderItems",populate:{path:"product"}}).lean()
        return orders
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getAllOrder=async()=>{
    return await Order.find().populate({path:"orderItems",populate:{path:"product"}}).lean()
}

export const deleteOrder=async(orderId)=>{
    const order=await findOrderById(orderId)
    await Order.findByIdAndDelete(order._id)
}