import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinearProgress} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../../../State/Payment/Action';
import { getUser } from '../../../State/Auth/Action';

const PaymentUpdatePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const params=useParams()
  const dispatch = useDispatch();
  const jwt=localStorage.getItem('jwt');
  const {auth}=useSelector((store)=>store)
  
  useEffect(() => {
    dispatch(getUser(jwt))
  }, [jwt])
  

  useEffect(() => {
    const data={
     orderId: params.orderId,
     paymentId: params.paymentId,
     userId: auth?.jwt?._id,
    }
    dispatch(updatePayment(data));
  }, [params])
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          navigate(`/payment/${params.orderId}`)
        }, 5000);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [progress, navigate]);

  return (
    <div className=" bg-gray-100 min-h-screen p-8">
    <div className="max-w-screen-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Payment Update</h1>
      <div className="mb-8">
        <p>Your payment is being processed...</p>
      </div>
      <div className="mb-6">
        <LinearProgress variant="determinate" value={progress} />
      </div>
      {progress === 100 && (
        <p className="text-green-600 font-semibold">Payment completed successfully!</p>
      )}
    </div>
  </div>
  );
};

export default PaymentUpdatePage;
