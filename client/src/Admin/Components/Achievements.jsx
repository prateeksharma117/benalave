import styled from '@emotion/styled'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { style } from '@mui/system'
import React, { useEffect } from 'react'
import trophyAnimation from "../../assets/trophy.json"
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../State/Admin/Order/Action'
import numeral from "numeral";
import {useNavigate} from "react-router-dom"

const animationOptions = {
  loop: true, 
  autoplay: true, 
  animationData: trophyAnimation, 
};

const Achievements = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
    const {adminOrder} = useSelector((store) => store);

    const revenue = adminOrder?.orders?.reduce((total, order) => {
      return total + (order?.totalPrice || 0);
    }, 0);

    useEffect(() => {
      dispatch(getOrder())
    }, [])
    


  return (
    <>
    <Card sx={{position:"relative", bgcolor:"#0c0c20",color:"#fff"}}>
      <CardContent>
        <div className='flex justify-between'>
        <div className=''>
        <Typography variant='h6' sx={{letterSpacing:".25px"}}>Shop with Benelave</Typography>
        <Typography variant='body2'>Congratulation 🥳</Typography>
        <Typography variant='h5' sx={{my:3.1 ,color:"#2b65b6"}}>{numeral(revenue).format("($ 0.00 a)")}</Typography>
        <Button size='small' variant='contained' onClick={()=>navigate("/admin/orders")}>View Sales</Button>
        </div>
        <div className=''>
        <Lottie options={animationOptions} height={150} width={150} />
        </div>
        </div>
      </CardContent>
    </Card>
    </>
  )
}

export default Achievements
