import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../State/Product/Action'
import { MantineProvider, Menu} from '@mantine/core';


const DashboardProduct = () => {

  const dispatch = useDispatch()
  const { product } = useSelector((store) => store);


  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      size: [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: "price_high_to_low",
      pageNumber: 1,
      pageSize: "",
      stock: "",
    };
    dispatch(findProducts(data));
  }, [])


  return (
    <>
      {
        <MantineProvider>
          <div className='space-y-5'>
            {
              product?.products?.content?.length < 1 ?
                (
                  <div className=' flex justify-center items-center text-white'>Unfortunately, no item was found</div>
                ) :
                (
                  <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }} >
                    <div className='flex justify-between'>
                      <CardHeader title="Products" />
                      <CardHeader title={"Total " + product?.products?.content?.length} />
                    </div>

                    <TableContainer sx={{ bgcolor: "#0c0c20", color: "#fff" }} component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ color: "#fff" }} align="left">S.no</TableCell>
                            <TableCell sx={{ color: "#fff" }} align="left">Image</TableCell>
                            <TableCell sx={{ color: "#fff" }} align="left">Title</TableCell>
                            <TableCell sx={{ color: "#fff" }} align="left">Color</TableCell>
                            <TableCell sx={{ color: "#fff" }} align="left">Size</TableCell>
                            <TableCell sx={{ color: "#fff" }} align="left">Price</TableCell>
                            <TableCell sx={{ color: "#fff" }} align="left">Quantity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            product?.products?.content?.slice(0, 10).map((item, i) => (
                              <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell sx={{ color: "#fff" }} align="left">{i + 1}</TableCell>
                                <TableCell sx={{ color: "#fff" }} align="left"><Avatar src={item?.imageUrl[0]?.image} /></TableCell>
                                <TableCell sx={{ color: "#fff" }} align="left"><p className=' line-clamp-2'>{item?.title}</p></TableCell>
                                <TableCell sx={{ color: "#fff" }} align="left">{item?.color}</TableCell>
                                <TableCell sx={{ color: "#fff" }} align="left">
                                  <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                      <Button>Size</Button>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                      <Menu.Label>Size</Menu.Label>
                                      {item?.size?.map((item, i) => (
                                        <Menu.Item key={i}>
                                          {item?.name}
                                        </Menu.Item>
                                      ))}
                                    </Menu.Dropdown>
                                  </Menu></TableCell>
                                <TableCell sx={{ color: "#fff" }} align="left">{item?.price}</TableCell>
                                <TableCell sx={{ color: "#fff" }} align="left">{item?.quantity}</TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                )
            }
          </div>
        </MantineProvider>
      }
    </>
  )
}

export default DashboardProduct
