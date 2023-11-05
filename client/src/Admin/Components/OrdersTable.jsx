import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrder,
  shippedOrder,
  deliveredOrder,
  confirmOrder,
  cancelOrder,
} from "../../State/Admin/Order/Action";
import { Loader } from "../../Admin";
import {
  Avatar,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  AvatarGroup,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import deleteImage from "../../assets/deleteImage.json";
import { MantineProvider, Menu } from '@mantine/core';
import {MdDelete} from "react-icons/md"

const OrdersTable = () => {
  const dispatch = useDispatch();

  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrder());
  }, [
    adminOrder.confirmed,
    adminOrder.placed,
    adminOrder.canceled,
    adminOrder.delivered,
    adminOrder.shipped,
    adminOrder.deleted
  ]);

  const handleProductDelete = (productId) => {
    dispatch(deleteOrder(productId));
  };

  const confirmOrders = (orderId) => {
    dispatch(confirmOrder(orderId));
  };

  const deliveredOrders = (orderId) => {
    dispatch(deliveredOrder(orderId));
  };

  const cancelOrders = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const shippedOrders = (orderId) => {
    dispatch(shippedOrder(orderId));
  };

  return (
    <>
      {adminOrder.loading === true ? (
        <Loader />
      ) : (
        <div className="md:p-5 space-y-5 overflow-x-auto">
          {adminOrder?.length < 1 ? (
            <div className=" flex justify-center items-center text-white">
              Unfortunately, no order was found
            </div>
          ) : (
            <Card className="mt-2" sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
              <div className="flex justify-between">
                <CardHeader title="All Orders" />
                <CardHeader title={"Total " + adminOrder?.orders?.length} />
              </div>

              <TableContainer
                sx={{ bgcolor: "#0c0c20", color: "#fff" }}
                component={Paper}
              >
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }} align="left">
                        S.no
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="left">
                        Image
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="left">
                        Title
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="left">
                        Price
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="left">
                        Quantity
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="left">
                        Status
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="left">
                        Update
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }} align="left">
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminOrder?.orders?.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ color: "#fff" }} align="left">
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }} align="left">
                          <AvatarGroup sx={{ justifyContent: "start" }}>
                            {item.orderItems.slice(0, 3).map((orderItem, i) => (
                              <Avatar
                                key={i}
                                src={orderItem?.product?.imageUrl[0]?.image}
                              ></Avatar>
                            ))}
                          </AvatarGroup>
                        </TableCell>
                        <TableCell
                          sx={{ color: "#fff" }}
                          align="left"
                        >
                            {item.orderItems.slice(0, 1).map((orderItem, i) => (
                                <p key={i} className=" line-clamp-2">{orderItem?.product?.title}</p>
                            ))}

                        </TableCell>
                        <TableCell sx={{ color: "#fff" }} align="left">
                          {item?.totalPrice}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }} align="left">
                          {item?.totalItem}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }} align="left">
                          <span
                            className={` text-white px-5 py-2 rounded-full ${item.orderStatus === "PLACED"
                              ? "bg-[#57297c]"
                              : item.orderStatus === "PENDING"
                                ? "bg-[#f3a638]"
                                : item.orderStatus === "CONFIRMED"
                                  ? "bg-[#54b7d3]"
                                  : item.orderStatus === "SHIPPED"
                                    ? "bg-[#1e91cf]"
                                    : item.orderStatus === "DELIVERED"
                                      ? "bg-[#4cb64c]"
                                      : "bg-[#e3503e]"
                              }`}
                          >
                            {item?.orderStatus}
                          </span>
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }} align="left">

                          <MantineProvider>
                            <Menu shadow="md" width={200}>
                              <Menu.Target>
                                <Button>Status</Button>
                              </Menu.Target>

                              <Menu.Dropdown>
                                <Menu.Label></Menu.Label>
                                <Menu.Item onClick={() => confirmOrders(item._id)}>
                                  Confirmed Order
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => shippedOrders(item._id)}>
                                  Shipped Order
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => deliveredOrders(item._id)}>
                                  Delivered Order
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item onClick={() => cancelOrders(item._id)}>
                                  Cancel Order
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </MantineProvider>
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }} align="left">
                          <div
                            className=" hover:scale-75 duration-300"
                            onClick={() => handleProductDelete(item?._id)}
                          >
                            <MdDelete size={30} color='#e34d4d'/>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default OrdersTable;
