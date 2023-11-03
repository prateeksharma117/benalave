import { Avatar, Button, Card, CardHeader, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../State/Auth/Action';
import dayjs from "dayjs"
import {Loader} from '../../Admin';


const CustomerTable = () => {

  const dispatch = useDispatch()
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(getAllUser());
  }, [])


  return (
    <>
      {
        auth.isLoading === true ?
        (
          <Loader />
        ) :
        (
            <div className='space-y-5'>
              {
                auth?.allUsers?.length < 1 ?
                  (
                    <div className=' flex justify-center items-center text-white'>Unfortunately, no item was found</div>
                  ) :
                  (
                    <Card className='mt-2' sx={{ bgcolor: "#0c0c20", color: "#fff" }} >
                      <div className='flex justify-between'>
                        <CardHeader title="Users" />
                        <CardHeader title={"Total " +auth?.allUsers?.length} />
                      </div>

                      <TableContainer sx={{ bgcolor: "#0c0c20", color: "#fff" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ color: "#fff" }} align="left">S.no</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Image</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Name</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Email</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">id</TableCell>
                              <TableCell sx={{ color: "#fff" }} align="left">Created At</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              auth?.allUsers?.map((item, i) => (
                                <TableRow
                                  key={i}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell sx={{ color: "#fff" }} align="left">{i + 1}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left"><Avatar sx={{backgroundColor:"#2b65b6"}}>{item?.firstName[0].toUpperCase()}</Avatar></TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{`${item?.firstName} ${item?.lastName}`}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{item?.email}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{item?._id}</TableCell>
                                  <TableCell sx={{ color: "#fff" }} align="left">{dayjs(item?.createdAt).format("DD-MM-YYYY")}</TableCell>
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
        )
      }
    </>
  )
}

export default CustomerTable
