import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import components or pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    {/* <Route path='/' element={}/> */}
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                    {/* <Route path='' element={}/> */}
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App
