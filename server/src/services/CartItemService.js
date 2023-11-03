import CartItem from "../models/CartItemModel.js"
import { findUserById } from "./UserService.js"


export const updateCartItem=async(userId,cartItemId,cartItemData)=>{
    try {
        const item=await findCartItemById(cartItemId)
        const user=await findUserById(item.userId)
        if (!item) {
            throw new Error("Cart item not found")
        }
        if (!user) {
            throw new Error("user not found")
        }
        if (user._id.toString() === userId.toString()) {
            item.quantity=cartItemData.quantity
            item.price=item.quantity*item.product.price
            item.discountedPrice=item.quantity*item.product.discountedPrice
            const updatedCartItem=await item.save()
            return updatedCartItem
        }else{
            throw new Error("you can't update this cart item")
        }

    } catch (e) {
        throw new Error(e.message);
    }
}

export const removeCartItem =async(userId,cartItemId)=>{
    const cartItem=await findCartItemById(cartItemId)
    const user=await findUserById(userId)
    if (user._id.toString()===cartItem.userId.toString()) {
        return await CartItem.findByIdAndDelete(cartItemId)
    }

    throw new Error("you can't remove another user's item")
}

export const findCartItemById=async(cartItemId)=>{
    const cartItem=await CartItem.findById(cartItemId).populate("product")
    if (cartItem) {
        return cartItem
    }
    else{
        throw new Error("cart item not found")
    }
}