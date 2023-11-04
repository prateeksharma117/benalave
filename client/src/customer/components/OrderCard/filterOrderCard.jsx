import { Avatar, Grid } from "@mui/material";
import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { AvatarGroup } from "@mui/material";
import dayjs from "dayjs";

const FilterOrderCard= ({item}) => {
    const navigate = useNavigate();

    const openOrderDetailsInNewTab = (order) => {
        navigate(`/account/order/${order?._id}`)
    };
    

    return (
        <>
            {
                Array.isArray(item) ? (
                    item.map((order, i) => {
                        return (
                            <div key={i} onClick={() => openOrderDetailsInNewTab(order)} className="md:p-5 my-5 shadow-sm border rounded-md p-4 hover:shadow-lg duration-300">
                                <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                                    <Grid item sm={12} lg={6}>
                                        <div className="flex items-center cursor-pointer">
                                            <div className="flex">
                                                <AvatarGroup >
                                                    {order?.orderItems?.slice(0, 3).map((img, i) => {
                                                        return (
                                                            <Avatar key={i} src={img?.product?.imageUrl[0].image}></Avatar>
                                                        )
                                                    })}
                                                </AvatarGroup>
                                            </div>
                                            <div className=" ml-2 md:ml-5">
                                                <div className="flex items-center space-x-2 max-[624px]:text-sm">
                                                    <p className=" font-medium">Order Items</p>
                                                    <p className=" text-gray-400 ">{order?.orderItems.length}</p>
                                                </div>
                                                <div className="flex items-center space-x-2 max-[624px]:text-sm">
                                                    <p className=" font-medium ">Payment</p>
                                                    <p className=" text-gray-400 ">{order?.paymentDetails?.paymentStatus}</p>
                                                </div>
                                                <div className="flex items-center space-x-2 max-[624px]:text-sm">
                                                    <p className=" font-medium line-clamp-1">Payment Id</p>
                                                    <p className=" text-gray-400">{order?.paymentDetails?.paymentId}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item sm={3} lg={2}>
                                        <p className=" text-green-400">Rs. {order?.totalPrice}</p>
                                    </Grid>

                                    <Grid item sm={9} lg={4} className="">
                                        <div className="flex justify-end items-center space-x-2 max-[624px]:text-sm">
                                            <TbTruckDelivery size={20} color="#72de80" />
                                            <p className=" font-normal ">
                                                {order?.orderItems?.slice(0, 1).map((img) => {
                                                    const originalDate = dayjs(img?.product?.createdAt);
                                                    const deliveryDate = originalDate.add(3, 'day');
                                                    return (
                                                        <>
                                                            <span>Delivery on {deliveryDate.format("DD/MM/YYYY")}</span>
                                                        </>
                                                    )
                                                })}
                                            </p>
                                        </div>
                                        <div className=" flex justify-end items-end pt-2">
                                            <p className={` w-fit text-md text-white px-5 py-2 rounded-full ${order?.orderStatus === "PLACED"
                                                ? "bg-[#57297c]"
                                                : order.orderStatus === "PENDING"
                                                    ? "bg-[#f3a638]"
                                                    : order.orderStatus === "CONFIRMED"
                                                        ? "bg-[#54b7d3]"
                                                        : order.orderStatus === "SHIPPED"
                                                            ? "bg-[#1e91cf]"
                                                            : order.orderStatus === "DELIVERED"
                                                                ? "bg-[#4cb64c]"
                                                                : "bg-[#e3503e]"
                                                }`}>
                                                <span>{order?.orderStatus}</span>
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })
                ) : (
                    <Loader />
                )
            }
        </>
    );
}

export default FilterOrderCard;
