import { useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {AiOutlineHeart,AiOutlineHome} from "react-icons/ai"
import {BsBagCheck} from "react-icons/bs"
import {BiStopwatch} from "react-icons/bi"
import { LuCheck } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const BottomNavigations = () => {

    const navigate=useNavigate()

    const [value, setValue] = useState(0);
    return (
        <>
            <div className=' md:hidden'>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                sx={{ width: '100%', position: 'fixed', bottom: 0 }}
            >
                <BottomNavigationAction onClick={()=>navigate("/")} label="Home" icon={<AiOutlineHome />} />
                <BottomNavigationAction onClick={()=>navigate("/product/wishlist")} label="Wishlist" icon={<AiOutlineHeart />} />
                <BottomNavigationAction onClick={()=>navigate("/cart")} label="Cart" icon={<BsBagCheck />} />
                <BottomNavigationAction onClick={()=>navigate("/account/order")} label="Orders" icon={<LuCheck />} />
                <BottomNavigationAction onClick={()=>navigate("/product/recentlyViewed")} label="Recent" icon={<BiStopwatch />} />
            </BottomNavigation>
            </div>
        </>
    )
}

export default BottomNavigations
