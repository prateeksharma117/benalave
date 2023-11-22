import { Grid } from '@mui/material'
import { Achievements, DashboardOrder, DashboardProduct, Loader, MonthlyOverView, OrderCompleteGraph, RevenueGraph } from '../../Admin'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getOrder } from '../../State/Admin/Order/Action';
import CarouselImage from './CarouselImage';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrder())
  }, [])


  return (
    <>
      {
        adminOrder?.orders?.length<1? (
          <Loader />
        ) : (
          <div className=''>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Achievements />
                </Grid>
                <Grid item xs={12} md={8}>
                  <MonthlyOverView />
                </Grid>
                <Grid item xs={12} md={12}>
                  <OrderCompleteGraph data={adminOrder} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <DashboardProduct />
                </Grid>
                <Grid item xs={12} md={12}>
                  <RevenueGraph data={adminOrder} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <DashboardOrder />
                </Grid>
                <Grid item xs={12} md={12}>
                  <CarouselImage />
                </Grid>
              </Grid>
            </div>
        )
      }
    </>
  )
}

export default Dashboard
