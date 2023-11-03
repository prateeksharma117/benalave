import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrder,
} from "../../State/Admin/Order/Action";
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
} from "@mui/material";


const DashboardOrder = () => {
    const dispatch = useDispatch();

    const { adminOrder } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getOrder());
    }, []);

    return (
        <>
            {
                <div className="space-y-5 overflow-x-auto">
                    {adminOrder?.length < 1 ? (
                        <div className=" flex justify-center items-center text-white">
                            Unfortunately, no order was found
                        </div>
                    ) : (
                        <Card className="mt-2" sx={{ bgcolor: "#0c0c20", color: "#fff" }}>
                            <div className="flex justify-between">
                                <CardHeader title="All Products" />
                                <CardHeader title={"Total " + adminOrder?.orders?.length} />
                            </div>

                            <TableContainer
                                sx={{ bgcolor: "#0c0c20", color: "#fff" }}
                                component={Paper}
                            >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {adminOrder?.orders?.slice(0, 10).map((item, index) => (
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
                                                    scope="row"
                                                >
                                                    {item.orderItems.slice(0, 1).map((orderItem, i) => (
                                                        <div key={i} className="flex flex-row">
                                                            <p>{orderItem?.product?.title}</p>
                                                        </div>
                                                    ))}
                                                    
                                                </TableCell>
                                                <TableCell sx={{ color: "#fff" }} align="left">
                                                    {item?.totalPrice}
                                                </TableCell>
                                                <TableCell sx={{ color: "#fff" }} align="left">
                                                    {item?.totalItem}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    )}
                </div>
            }
        </>
    );
};

export default DashboardOrder;
