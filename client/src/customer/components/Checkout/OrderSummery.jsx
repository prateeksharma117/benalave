import { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { getOrderById } from "../../../State/Order/Action";
import { useLocation, useNavigate } from "react-router-dom";
import SummeryCart from "./SummeryCart";
import { createPayment} from "../../../State/Payment/Action";
import Loader from "../Loader/Loader";

const OrderSummery = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const orderId = searchParams.get("order_id")
  const {order,payment} = useSelector(store => store)

  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [orderId])

  const handlePayNow = (e) => {
    e.preventDefault();
  
    // Convert the amount to paisa by multiplying by 100
    const amountInPaisa = Math.round(order?.order?.totalPrice * 100);
  
    dispatch(createPayment(amountInPaisa));
  
    const options = {
      key: "rzp_test_SrfoBWTy4j3S9s",
      amount: amountInPaisa, // Use the amount in paisa
      currency: "INR",
      name: "Your Company Name",
      description: "Payment for your product",
      order_id: payment?.paymentData?.data?.id,
      handler: function (response) {
        if (response?.razorpay_payment_id) {
          const paymentId = response.razorpay_payment_id;
          navigate(`/payment/${orderId}/${paymentId}`);
        } else {
          console.log("Payment failed. Error: " + response.error.description);
        }
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  return (
    <>
    {
      order.loading === true ?
      (
        <Loader/>
      ) :
      (
        <div>
        <div className=" mx-3 p-5 shadow-lg rounded-s-md border">
          <AddressCard address={order?.order?.shippingAddress} />
        </div>

        <div>
          <div className="md:grid grid-cols-3 lg:px-10 relative">
            <div className=" col-span-2">
              {order?.order?.orderItems?.map((item, i) => (
                <SummeryCart key={i} item={item} />
              ))}
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
                    <span>{order?.order?.totalItem}</span>
                  </div>

                  <div className="flex justify-between pt-3">
                    <span>Discount</span>
                    <span className="text-green-400">Rs. {order?.order?.discount}</span>
                  </div>

                  <div className="flex justify-between pt-3 text-black">
                    <span>Delivery Charges</span>
                    <span className=" text-red-400"> 10</span>
                  </div>

                  <div className="flex justify-between pt-3 text-black">
                    <span>Total Amount</span>
                    <span className="text-green-500">Rs. {order?.order?.totalPrice + 10}</span>
                  </div>
                </div>

                <Button
                  className=" w-full"
                  variant="outlined"
                  onClick={handlePayNow}
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
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
      
    </>
  );
};

export default OrderSummery;
