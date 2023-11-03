import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import {FilterOrderCard, OrderCard} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../State/Auth/Action";
import { userOrderHistory } from "../../../State/Order/Action";
import Loader from "../Loader/Loader";

const status = [
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];


const Order = () => {

  const dispatch = useDispatch()
  const { auth, order } = useSelector(store => store)
  const user = localStorage.getItem("jwt")
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    dispatch(getUser(user))
    dispatch(userOrderHistory(auth?.jwt?._id))
  }, [user])

  const handleCheckboxChange = (statusValue) => {
    if (selectedStatus.includes(statusValue)) {
      // If status is already selected, remove it
      setSelectedStatus(selectedStatus.filter((value) => value !== statusValue));
    } else {
      // If status is not selected, add it
      setSelectedStatus([...selectedStatus, statusValue]);
    }
  };

  const filteredOrders = order?.order?.filter((order) =>
    selectedStatus.length === 0 || selectedStatus.includes(order.orderStatus)
  );


  return (
    <>
      {
        order?.loading === true ?
          (
            <Loader />
          ) :
          (
            order?.order?.length < 1 ?
              (
                <div className="flex flex-col px-5 items-center justify-center h-screen">
                    <h2 className="text-2xl font-semibold mb-4">No Orders Found</h2>
                    <p className="text-gray-600 text-center">Sorry, we couldn&apos;t find any orders for you at the moment. Please check back later or place a new order.</p>
                </div>
              ) :
              (
                <div className=" min-h-screen py-10 px-2 md:px-5 lg:px-20">
                  <Grid container spacing={5} sx={{ justifyContent: "space-between" }}>
                    <Grid item sm={4} lg={3} xs={12}>
                      <div className=" h-auto shadow-lg bg-white p-5 sticky top-5">
                        <div className=" flex justify-between items-center">
                          <h1 className=" font-bold text-lg">Filter</h1>
                          <BiFilterAlt />
                        </div>

                        <div className=" space-y-4 mt-10">
                          <h1 className=" font-semibold">Order Status</h1>

                          {status?.map((item, i) => (
                            <div className="flex items-center" key={i}>
                              <input
                                defaultValue={item.value}
                                type="checkbox"
                                className=" h-4 m-4 border-gray-300 text-[#2b65b6] focus:text-[#3d86f2]"
                                onChange={() => handleCheckboxChange(item.value)}
                                checked={selectedStatus.includes(item.value)}
                              />
                              <label
                                className=" ml-3 text-sm text-gray-600"
                                htmlFor={item.value}
                              >
                                {item.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Grid>

                    <Grid item sm={8} lg={9} xs={12}>
                      <div className=" space-y-5">
                        {filteredOrders===null?<OrderCard item={order} />:<FilterOrderCard item={filteredOrders}/>}
                      </div>
                    </Grid>
                  </Grid>
                </div >
              )

          )
      }
    </>
  );
};

export default Order;
