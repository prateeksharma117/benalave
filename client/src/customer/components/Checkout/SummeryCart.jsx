import React from "react";
import {MdAddCircle} from "react-icons/md"
import {BiSolidMinusCircle} from "react-icons/bi"
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";
import { useNavigate } from "react-router-dom";

const SummeryCart = ({item}) => {
    const navigate=useNavigate()

    return (
        <>
            <div className="p-2 md:p-5 my-5 mx-5 shadow-sm hover:shadow-md border rounded-md">
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
            </div>
        </>
    );
};

export default SummeryCart;
