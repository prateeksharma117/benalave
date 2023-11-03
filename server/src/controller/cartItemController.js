import { findCartItemById, removeCartItem, updateCartItem } from "../services/CartItemService.js"


export const updateCartItems=async(req,res)=>{
    const user=await req.user
    try {
        const updatedCart=await updateCartItem(user._id,req.params.id,req.body)
        return res.status(200).send(updatedCart)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}

export const removeCartItems = async (req, res) => {
    const user = await req.user;
    try {
        const cartItemId = req.params.id;
        const cartItem = await findCartItemById(cartItemId); // Retrieve the cartItem
        if (!cartItem) {
            return res.status(404).send("Cart item not found");
        }

        if (user._id.toString() === cartItem.userId.toString()) {
            // Ensure user owns the cart item
            await removeCartItem(user._id, cartItemId);
            return res.status(200).send("Cart item removed successfully");
        } else {
            return res.status(403).send("You can't remove another user's item");
        }
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}