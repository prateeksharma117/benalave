import { useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import { AdminNavbar, CreateProductForm, CustomersTable, Dashboard, OrdersTable, ProductsTable } from '../Admin';
import { getUser} from '../State/Auth/Action';
import { useDispatch } from 'react-redux';


const Admin = () => {

    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")


    useEffect(() => {
        dispatch(getUser(jwt))
    }, [])


    return (
        <>
            <div>
                <div>
                    <div className='min-h-screen right-0 bg-[#000014]'>
                        <div>
                            <AdminNavbar />
                        </div>
                        <div className='p-2 md:p-5'>
                            <Routes>
                                <Route path='/' element={<Dashboard />}></Route>
                                <Route path='/product/create' element={<CreateProductForm />}></Route>
                                <Route path='/products' element={<ProductsTable />}></Route>
                                <Route path='/orders' element={<OrdersTable />}></Route>
                                <Route path='/customers' element={<CustomersTable />}></Route>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin
