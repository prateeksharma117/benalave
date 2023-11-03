import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Alert,
    AlertTitle,
    Box,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import PaymentCart from "./PaymentCart";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import LottieAnimation from "./LottieAnimation";
import Loader from "../Loader/Loader";

const PaymentSuccess = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [paymentId, setPaymentId] = React.useState();
    const [showAnimation, setShowAnimation] = useState(true);
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { orderId } = useParams();
    const { order } = useSelector((store) => store);

    const steps = ["Login", "Delivery Address", "Order Summery", "payment"];

    const onAnimationComplete = () => {
        setShowAnimation(false);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setPaymentId(urlParams.get("razorpay_payment_id"));
        setPaymentId(urlParams.get("razorpay_payment_link_status"));
    }, [setPaymentId,]);

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId, paymentId]);



    return (
        <>
        {
            order.loading === true ?
            (
              <Loader/>
            ) :
            (
                <div className="bg-gray-100 md:p-6 min-h-screen">
                {showAnimation ? (
                    <LottieAnimation width={300} height={300} onAnimationComplete={onAnimationComplete} />
                ) : (
                    <div className="max-w-screen-lg mx-auto">
                        <div className="bg-white md:p-6 rounded-md">
                            <div className="p-2">
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    Thank you for your purchase. Your order has been confirmed.{" "}
                                    <strong className=" cursor-pointer" onClick={() => navigate("/account/order")}>check it out!</strong>
                                </Alert>
                            </div>

                            <div className=" overflow-x-hidden my-10 md:mx-8 lg:px-20">
                                <Box className="" sx={{ width: "100%" }}>
                                    <Stepper activeStep={4}>
                                        {steps.map((label, index) => {
                                            const stepProps = {};
                                            const labelProps = {};
                                            return (
                                                <Step key={label} {...stepProps}>
                                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    {activeStep === steps.length ? (
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <Box
                                                sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                                            ></Box>
                                        </React.Fragment>
                                    )}
                                </Box>
                            </div>

                            <div className="mt-8 p-2">
                                <h3 className="text-xl font-semibold ">Ordered Products</h3>
                                <div>
                                    {order?.order?.orderItems?.map((item, i) => (
                                        <PaymentCart item={item} order={order} key={i} />
                                    ))}
                                </div>
                            </div>

                            <div className="py-8 text-center">
                                <Link to="/" className="text-green-600 underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            )
        }
        </>
    );
};

export default PaymentSuccess;
