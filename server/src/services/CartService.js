import CartItem from "../models/CartItemModel.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

export const createCart = async (user) => {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (e) { 
        throw new Error(e.message);
    }
};

export const findUserCart = async (userId) => {
    try {
        let cart=await Cart.findOne({user:userId})
        let cartItems=await CartItem.find({cart:cart._id}).populate("product").populate({
            path: 'product',
            populate: ('category')
        })
        cart.cartItems=cartItems
        let totalPrice=0
        let totalDiscountedPrice=0
        let totalItem=0
        if (Array.isArray(cart.cartItems)) {
            for (let cartItem of cart.cartItems){
                totalPrice+=cartItem.price
                totalDiscountedPrice+=cartItem.discountedPrice
                totalItem+=cartItem.quantity
            }
        }

        cart.totalPrice=totalPrice
        cart.totalItem=totalItem
        cart.discount=totalDiscountedPrice
        cart.totalDiscountedPrice=totalPrice-totalDiscountedPrice
        return cart
    } catch (e) {
        throw new Error(e.message)
    }
}

export const addCartItem=async(userId,req)=>{
    try {
        const cart=await Cart.findOne({user:userId})
        const product=await Product.findById(req.productId)
        const isPresent=await CartItem.findOne({cart:cart._id,product:product._id,userId})
        if (!isPresent) {
            const cartItem=new CartItem({
                product:product._id,
                cart:cart._id,
                quantity:1,
                userId,
                price:product.price,
                size:req.size,
                discountedPrice:product.discountedPrice,
            })

            const createdCardItem=await cartItem.save()
            cart.cartItems.push(createdCardItem)
            await cart.save()
            return "item added to cart"
        }
    } catch (e) {
        throw new Error(e.message)
    }
}