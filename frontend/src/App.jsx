import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { PrimeReactProvider } from 'primereact/api';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {checkAuthority} from './utils/helperFunctions';
//import components or pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import StaffLogin from './pages/StaffLogin';
import StaffForgotPassword from './pages/StaffForgotPassword';
import AdminPage from './pages/AdminPage';
import TableReservation from './pages/TableReservation';
import OrderFood from './pages/OrderFood';
import MyOrders from './pages/MyOrders';
import KDSPage from './pages/KDSPage';
import WaiterPage from './pages/WaiterPage';
import FAQPage from './pages/FAQPage';

function App() {
    return (
        <PrimeReactProvider>
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LandingPage/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route path='/login/staff' element={<StaffLogin/>}/>
                    <Route path='/forgot-password/staff' element={<StaffForgotPassword/>}/>
                    <Route path='/home' element={<ProtectedRoute privilege={'user'} component={<Home/>} navigatePath='/login' />}/>
                    <Route path='/book-table' element={<ProtectedRoute privilege={'user'} component={<TableReservation/>} navigatePath='/login' />}/>
                    <Route path='/order-food/:category' element={<ProtectedRoute privilege={'user'} component={<OrderFood/>} navigatePath='/login' />}/>
                    <Route path='/my-orders' element={<ProtectedRoute privilege={'user'} component={<MyOrders/>} navigatePath='/login' />}/>
                    <Route path='/admin-page' element={<ProtectedRoute privilege={'admin'} component={<AdminPage/>} navigatePath='/login/staff' />}/>
                    <Route path='/chef-page' element={<ProtectedRoute privilege={'chef'} component={<KDSPage/>} navigatePath='/login/staff' />}/>
                    <Route path='/waiter-page' element={<ProtectedRoute privilege={'waiter'} component={<WaiterPage/>} navigatePath='/login/staff' />}/>
                    <Route path='/faq' element={<FAQPage />}/>
                    <Route path='/:notfound' element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
        </PrimeReactProvider>
    )
}

const ProtectedRoute = ({privilege, component, navigatePath}) =>{
    const auth = checkAuthority(privilege);
    if(auth){
        return component;
    }
    else{
        return <Navigate to={navigatePath}/>
    }
}

export default App;