import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid, Box } from "@mui/material";
import { AiOutlineStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import Loader from "../Loader/Loader";

const OrderDetails = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { order } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getOrderById(param?.orderId));
    }, [param?.orderId]);

    

    return (
        <>
            {
                order.loading === true ?
                    (
                        <Loader/>
                    ) :
                    (
                        <div className=" min-h-screen py-10 px-3 md:px-10 lg:px-20 overflow-x-hidden items-center p-2 md:p-5 my-5  rounded-md cursor-pointer">
                            <div>
                                <div>
                                    <h1 className="py-10 font-semibold text-xl">Delivery Address</h1>
                                    <AddressCard address={order?.order?.shippingAddress} />
                                </div>

                                <div className="py-10">
                                    <OrderTracker activeStep={order?.order?.orderStatus==="PLACED"?1:
                                    order?.order?.orderStatus==="CONFIRMED"?2:order?.order?.orderStatus==="SHIPPED"?3:
                                    order?.order?.orderStatus==="DELIVERED"?4:5
                                } />
                                </div>
                            </div>

                            <Grid className="space-y-5" container>
                                {order?.order?.orderItems?.map((item, i) => (
                                    <Grid
                                        key={i}
                                        item
                                        container
                                        className="rounded-md p-3 border shadow-sm hover:shadow-md"
                                        sx={{ alignItems: "center", justifyContent: "space-between" }}
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <div className="flex space-x-5 items-center">
                                                <div onClick={()=>navigate(`/product/${item?.product?._id}/${item?.product?.category?.name}`)} className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                                                <img
                                                    className=" w-full h-full object-cover object-top rounded-lg"
                                                    src={item?.product?.imageUrl[0]?.image}
                                                    alt=""
                                                />
                                                </div>
                                            
                                                <div className=" space-y-1">
                                                    <p onClick={()=>navigate(`/product/${item?.product?._id}/${item?.product?.category?.name}`)} className=" line-clamp-1 ">
                                                        {item?.product?.title}
                                                    </p>
                                                    <div className="flex space-x-4">
                                                        <div className="flex space-x-2 items-center">
                                                            <p>Size</p>
                                                            <p className=" text-gray-400">{item?.size}</p>
                                                        </div>
                                                        <div className="flex space-x-2 items-center">
                                                            <p>Color</p>
                                                            <p className=" text-gray-400">
                                                                {item?.product?.color}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className=" text-green-400">Rs. {item?.price}</p>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={3}>
                                            <Box sx={{ color: "#3d86f2", mt: 2 }}>
                                                <div className="flex space-x-2 items-center">
                                                    <AiOutlineStar size={20}/>
                                                    <span className=" font-medium line-clamp-1 cursor-pointer">
                                                        Rate & Review Product
                                                    </span>
                                                </div>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    )
            }
        </>
    );
};

export default OrderDetails;
