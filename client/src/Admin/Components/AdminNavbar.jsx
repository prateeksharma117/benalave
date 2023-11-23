import React, { useEffect } from "react";
import {
    Navbar,
    Typography,
    Collapse,
} from "@material-tailwind/react";
import benaleve from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"
import { RxHamburgerMenu } from "react-icons/rx"
import { useDispatch } from "react-redux";
import { logout } from "../../State/Auth/Action";




const AdminNavbar = () => {

    const [openNav, setOpenNav] = React.useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, [])

    
    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
        window.location.reload()
    }


    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <p onClick={() => {
                    setOpenNav(false);
                    navigate("/admin");
                }} className="flex items-center cursor-pointer">
                    Dashboard
                </p>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <p onClick={() => {
                    setOpenNav(false); // Set openNav to false
                    navigate("/admin/products");
                }} className="flex items-center cursor-pointer">
                    Products
                </p>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <p onClick={() => {
                    setOpenNav(false); // Set openNav to false
                    navigate("/admin/customers");
                }} className="flex items-center cursor-pointer">
                    Customers
                </p>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <p onClick={() => {
                    setOpenNav(false); // Set openNav to false
                    navigate("/admin/orders");
                }} className="flex items-center cursor-pointer">
                    Orders
                </p>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <p onClick={() => {
                    setOpenNav(false); // Set openNav to false
                    navigate("/admin/product/create");
                }} className="flex items-center cursor-pointer">
                    Add Products
                </p>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <p onClick={() => {
                    setOpenNav(false); // Set openNav to false
                    handleLogout()
                }} className="flex items-center cursor-pointer">
                    Logout
                </p>
            </Typography>
        </ul>
    );



    return (
        <div className="max-h-[768px] pb-2">
            <Navbar className="sticky border-none rounded-none top-0 z-10 h-max max-w-full px-4 py-2 lg:px-8 lg:py-4 bg-[#0c0c20]">
                <div className="flex items-center justify-between text-white">
                    <Typography
                        as="a"
                        href="#"
                        className=" w-[10rem] md:w-[12rem] mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        <img src={benaleve} alt="" />
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className=" md:hidden" onClick={() => setOpenNav(!openNav)}>
                            {openNav ? (
                                <div className="flex items-center"><AiOutlineClose size={25} /></div>

                            ) : (
                                <div className="flex items-center"><RxHamburgerMenu size={25} /></div>

                            )}
                        </div>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                </Collapse>
            </Navbar>
        </div>
    )
}

export default AdminNavbar
