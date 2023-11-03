import React from "react";
import {MdAddCircle} from "react-icons/md"
import {BiSolidMinusCircle} from "react-icons/bi"
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";
import { useNavigate } from "react-router-dom";

const CardItem = ({item}) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleUpdateCartItem=(num)=>{
        const data={
            data:{quantity:item.quantity+num},
            cartItemId:item?._id
        }
        dispatch(updateCartItem(data))
    }

    const handleRemoveCartItem=(num)=>{
        const data={
            data:{quantity:item.quantity+num},
            cartItemId:item?._id
        }
        dispatch(removeCartItem(item._id))
    }

    return (
        <>
            <div className="p-2 md:p-5 my-5 mx-5 shadow-lg border rounded-md">
                <div className="flex items-center">
                    <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                        <img
                        onClick={()=>navigate(`/product/${item?.product?._id}/${item?.product?.category?.name}`)}
                            className=" w-full h-full object-cover object-top rounded-lg cursor-pointer"
                            src={item?.product?.imageUrl[0].image}
                            alt=""
                        />
                    </div>

                    <div className=" ml-5 space-y-1 w-full mt-3 md:mt-0">
                        <h1
                        onClick={()=>navigate(`/product/${item?.product?._id}/${item?.product?.category?.name}`)}
                        className=" font-semibold line-clamp-1 cursor-pointer">
                            {item?.product?.title}
                        </h1>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <p className=" font-medium">Size</p>
                            <p className=" opacity-70">{item?.size}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-2 line-clamp-1">
                            <p className=" font-medium">Seller</p>
                            <p className=" opacity-70">{item?.product?.brand}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <p className="font-semibold ">Rs. {item?.product?.price}</p>
                            <p className="line-through secondaryText">Rs. {item?.product?.discountedPrice}</p>
                            <p className="secondaryText text-green-500">{item?.product?.discountedPercent}% off</p>
                        </div>
                    </div>
                </div>

                <div className="lg:flex flex justify-between items-center lg:space-x-10 pt-4">
                        <div className="flex items-center space-x-2">
                            {
                                item.quantity<=1?
                                (
                                    <BiSolidMinusCircle size={30} color="#afafb1" className=" cursor-pointer  text-white rounded focus:outline-none"/>
                                ):
                                (
                                    <BiSolidMinusCircle size={30} color="#2b65b6" className=" cursor-pointer" onClick={()=>handleUpdateCartItem(-1)}/>
                                )
                            }
                            <span className=" py-1 px-3 md:px-7 border rounded-sm">{item?.quantity}</span>
                                <MdAddCircle size={30} color="#2b65b6" className=" cursor-pointer" onClick={()=>handleUpdateCartItem(1)}/>
                        </div>

                        <div onClick={handleRemoveCartItem} className=" text-red-500 font-medium cursor-pointer">Remove</div>
                    </div>
            </div>
        </>
    );
};

export default CardItem;
