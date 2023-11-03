import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getCart } from "../../../State/Cart/Action";
import emptyCart from "../../../assets/emptycart.png"
import Loader from "../Loader/Loader";

const Cart = () => {

    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {cart}=useSelector(store=>store)

    const handleCheckout=()=>{
        navigate('/checkout?step=2')
    }

    useEffect(() => {
      dispatch(getCart())
    }, [cart?.updateCartItem,cart?.deleteCartItem])
    



    return (
        <>
        {
        cart?.loading === true ?
            (
                <Loader/>
            ) :
            (
        !cart?.cart?.cartItems?.length<1?
            (
                <div>
                <div className="md:grid grid-cols-3 lg:px-10 relative">
                    <div className=" col-span-2">
                        {cart?.cart?.cartItems?.map((item,i)=> <CardItem key={i} item={item}/>)}
                    </div>

                    <div className="px-2 mb-10 sticky top-0  md:h-[100vh] py-5 lg:mt-0">
                        <div className="border p-5">
                            <p className=" uppercase font-bold opacity-60 pb-4">
                                Price details
                            </p>
                            <hr />
                            <div className=" space-y-3 font-semibold mb-10">

                            <div className="flex justify-between pt-3 text-black">
                                    <span>Total Item</span>
                                    <span>{cart?.cart?.totalItem}</span>
                                </div>

                                <div className="flex justify-between pt-3">
                                    <span>Discount</span>
                                    <span className="text-green-400">Rs. {cart?.cart?.discount}</span>
                                </div>

                                <div className="flex justify-between pt-3 text-black">
                                    <span>Delivery Charges</span>
                                    <span className=" text-red-400">10</span>
                                </div>

                                <div className="flex justify-between pt-3 text-black">
                                    <span>Total Amount</span>
                                    <span className="text-green-500">Rs. {cart?.cart?.totalPrice+10}</span>
                                </div>
                            </div>

                            <Button
                            onClick={handleCheckout}
                                className=" w-full"
                                variant="outlined"
                                sx={{
                                    px: "2rem",
                                    py: "0.5rem",
                                    "&:hover": {
                                        backgroundColor: "#1fb356",
                                        color: "#fff",
                                        borderColor: "#1fb356",
                                    },
                                }}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            ):
            (
                <div className="h-[70vh] lg:h-[100vh] flex justify-start px-5  py-5 items-center flex-col">
                    <div className="w-[15rem] h-[15rem] md:w-[25rem] md:h-[25rem]">
                    <img className=" w-full h-full" src={emptyCart} alt="" />
                    </div>
                    <h1>Hey, it feels so light!</h1>
                    <p className="secondaryText text-center mt-2">There is nothing in your bag right now. Let&apos;s add some items.</p>
                </div>
            )
        )
    }
        </>
    );
};

export default Cart;
