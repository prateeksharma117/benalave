import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import { useEffect } from 'react'
import {BsGraphUpArrow,BsFillPersonFill,BsThreeDotsVertical} from "react-icons/bs"
import {MdImportantDevices} from "react-icons/md"
import {RiMoneyDollarCircleLine} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../State/Product/Action'
import { getAllUser } from '../../State/Auth/Action'
import { getOrder } from '../../State/Admin/Order/Action'
import numeral from "numeral";


const MonthlyOverView = () => {

    const dispatch=useDispatch()
    const { product,auth,adminOrder} = useSelector((store) => store);

    const revenue = adminOrder?.orders?.reduce((total, order) => {
        return total + (order?.totalPrice || 0);
      }, 0);

    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);
    const sortValue = searchParams.get("sort");
    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const CategoryValue = searchParams.get("category");
    const stock = searchParams.get("stock");
    const pageNumber = searchParams.get("page") || 1;


    useEffect(() => {
        const data = {
            category: CategoryValue || "",
            colors: colorValue || [],
            size: sizeValue || [],
            minPrice: 0,
            maxPrice: 100000000,
            minDiscount: 0,
            sort: sortValue || "price_high_to_low",
            pageNumber: pageNumber,
            pageSize: 20000000000,
            stock: stock,
        };

        dispatch(getAllUser())
        dispatch(getOrder())
        dispatch(findProducts(data))
    }, [
        sortValue
        , stock
        , colorValue, sizeValue
        , CategoryValue
        , pageNumber])


        const salesData=[
            {stats:numeral(adminOrder?.orders?.length).format("(0 a)"),title:"Sales",color:"#bf17e1",icon:<BsGraphUpArrow color='#fff' size={23}/>},
            {stats:numeral(auth?.allUsers?.length).format("(0 a)"),title:"Customers",color:"#23a64b",icon:<BsFillPersonFill color='#fff' size={23}/>},
            {stats:numeral(product?.products?.content?.length).format("(0 a)"),title:"Products",color:"#ffbf0c",icon:<MdImportantDevices color='#fff' size={23}/>},
            {stats:`Rs. ${numeral(revenue).format("(0.00 a)")}`,title:"Revenue",color:"#0987ff",icon:<RiMoneyDollarCircleLine color='#fff' size={23}/>}
        ]
        
        const randersStats=()=>{
            return salesData.map((item,index)=>(
                <Grid key={index} item xs={12} sm={3}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Avatar variant='rounded'
                        sx={{
                            mr:3,
                            width:44,
                            height:44,
                            boxShadow:3,
                            color:"white",
                            bgcolor:`${item.color}`
                        }}
                        >
                            {item.icon}
                        </Avatar>
        
                        <Box sx={{display:"flex",flexDirection:"column"}}>
                            <Typography variant='caption'>
                                {item.title}
                            </Typography>
                            <Typography variant='h6'>
                                {item.stats}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            ))
        }
        


  return (
    <>
    <Card sx={{bgcolor:"#0c0c20",color:"#fff"}}>
        <CardHeader title="Over All Growth"
        action={
            <IconButton size='small'>
                <BsThreeDotsVertical/>
            </IconButton>
        }
        subheader={
            <Typography variant='body2'>
                <Box component="span" sx={{fontWeight:600}}>
                🚀 overview of the overall growth
                </Box>
            </Typography>
        }
        titleTypographyProps={{
            sx:{
                mb:2.5,
                lineHeight:"2rem !important",
                letterSpacing:"0.15px !important"
            }
        }}
        />

        <CardContent sx={{pt:theme=>`${theme.spacing(3)} !important`}}>
            <Grid container spacing={[5,0]}>
                {randersStats()}
            </Grid>
        </CardContent>
    </Card>
    </>
  )
}

export default MonthlyOverView
