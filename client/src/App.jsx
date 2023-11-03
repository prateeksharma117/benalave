import { Route, Routes } from 'react-router-dom'
import './App.css'
import CustomerRoutes from './Routers/CustomerRoutes'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminRouters from './Routers/AdminRouters';


function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='/*' element={<CustomerRoutes/>}/>
          <Route path='/admin/*' element={<AdminRouters/>}/>
        </Routes>
        <ToastContainer/>
      </div>
    </>
  )
}

export default App
