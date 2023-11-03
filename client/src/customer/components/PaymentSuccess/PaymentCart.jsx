import React from "react";

const PaymentCart = ({ item,order}) => {

    const address=order?.order?.shippingAddress

    return (
        <>
            <div className="my-5 shadow-lg border rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex items-center mx-2 my-2">
                        <div className="w-[6rem] h-[8rem] lg:w-[7rem] lg:h-[7rem]">
                            <img
                                className=" w-full h-full object-cover object-top rounded-lg cursor-pointer"
                                src={item.product.imageUrl[0].image}
                                alt=""
                            />
                        </div>
                        <div className="ml-4 space-y-1 mt-3 md:mt-0">
                            <h1
                                className=" font-semibold line-clamp-1 cursor-pointer">
                                {item.product.title}
                            </h1>

                            <div className="flex items-center gap-2 mt-2">
                                <p className=" font-medium">Size</p>
                                <p className=" opacity-70">{item.size}</p>
                            </div>

                            <div className="flex items-center gap-2 mt-2 line-clamp-1">
                                <p className=" font-medium">Seller</p>
                                <p className=" opacity-70 line-clamp-1">{item.product.brand}</p>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <p className="font-medium">Quantity</p>
                                <p className="secondaryText">{item.quantity}</p>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <p className="font-semibold ">Rs. {item.price}</p>
                                <p className="line-through secondaryText">Rs. {item.discountedPrice}</p>
                                <p className="secondaryText text-green-500">{item.product.discountedPercent}% off</p>
                            </div>

                        </div>
                    </div>

                    <div className="ml-2 space-y-1 md:mt-0 md:flex md:justify-center md:flex-col md:items-end">
                        <div>
                        <h2 className="font-semibold">Delivery Address</h2>
                        <p className="opacity-70 line-clamp-1">{`${address.streetAddress} ${address.city} ${address.state}, ${address.zipCode}`}</p>
                        <h2 className="font-normal">Phone Number</h2>
                        <p className="opacity-70 pb-2">{address.mobile}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentCart;
