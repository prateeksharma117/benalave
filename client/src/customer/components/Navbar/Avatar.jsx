import { Avatar, Menu, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../../../State/Auth/Action";
import { useEffect } from "react";

const Profile = ({ userInitials, fullName, close }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((store) => store?.auth);
    const jwt =localStorage.getItem('jwt')

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleMyOrder = () => {
        navigate("/account/order")
        close()
    }

    useEffect(() => {
        dispatch(getUser(jwt))
      }, [])


    return (
        <>
            <MantineProvider>
                <Menu>
                    <Menu.Target>
                        <Avatar
                            alt="user image"
                            radius={"xl"}
                            color="#2b65b6"
                        ><p>{userInitials}</p></Avatar>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item>{fullName}</Menu.Item>
                        <Menu.Item onClick={handleMyOrder}>My Order</Menu.Item>
                        <Menu.Item onClick={()=>navigate("/product/recentlyViewed")}>Recent</Menu.Item>
                        <Menu.Item onClick={()=>navigate("/product/wishlist")}>Wishlist</Menu.Item>
                        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                        {auth?.jwt?.role === 'ADMIN'?<Menu.Item onClick={()=>navigate('/admin')}>Admin Panel</Menu.Item>:""}
                    </Menu.Dropdown>
                </Menu>
            </MantineProvider>
        </>
    );
};

export default Profile;
