import { useEffect } from 'react';
import lottie from 'lottie-web';
import trophyAnimation from '../../assets/trophy.json'; 
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../State/Admin/Order/Action';
import numeral from 'numeral';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const Achievements = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminOrder } = useSelector((store) => store);

  const revenue = adminOrder?.orders?.reduce((total, order) => {
    return total + (order?.totalPrice || 0);
  }, 0);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  useEffect(() => {
    const animationContainer = document.getElementById('lottie-container');
    const animationOptions = {
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: trophyAnimation,
    };
    const animation = lottie.loadAnimation(animationOptions);

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <>
      <Card sx={{ position: 'relative', bgcolor: '#0c0c20', color: '#fff' }}>
        <CardContent>
          <div className="flex justify-between">
            <div className="">
              <Typography variant="h6" sx={{ letterSpacing: '.25px' }}>
                Shop with Benelave
              </Typography>
              <Typography variant="body2">Congratulation 🥳</Typography>
              <Typography variant="h5" sx={{ my: 3.1, color: '#2b65b6' }}>
                {numeral(revenue).format('($ 0.00 a)')}
              </Typography>
              <Button size="small" variant="contained" onClick={() => navigate('/admin/orders')}>
                View Sales
              </Button>
            </div>
            <div className="">
              <div id="lottie-container" style={{ width: '150px', height: '150px' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Achievements;
