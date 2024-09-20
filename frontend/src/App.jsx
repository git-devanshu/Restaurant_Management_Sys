import React, { useState } from 'react';
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
                    <Route path='/home' element={<Home/>}/> {/* Protected Route */}
                    <Route path='/admin-page' element={<AdminPage/>}/>
                    {/* <Route path='/kds' element={}/> */}
                    {/* <Route path='/waiter-page' element={}/> */}
                    <Route path='/book-table' element={<TableReservation/>}/>
                    <Route path='/order-food' element={<OrderFood/>}/>
                    <Route path='/my-orders' element={<MyOrders/>}/>
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    <Route path='/:notfound' element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
        </PrimeReactProvider>
    )
}

const ProtectedHome = () =>{
    const auth = checkAuthority('user') || checkAuthority('admin');
    if(auth){
        return <Home/>
    }
    else{
        return <Navigate to='/login'/>
    }
}

export default App
