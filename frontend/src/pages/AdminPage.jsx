import React, { useEffect, useState } from "react";
import '../styles/AdminPage.css';
import {logout} from '../utils/helperFunctions';
import { Button, Avatar } from '@chakra-ui/react';
import ImgButton from '../components/ImgButton';
import { useNavigate } from "react-router-dom";
import {decodeToken} from '../utils/helperFunctions';
/* Importing icons */
import logoutIcon from '../images/logout.png';
import ResIcon from '../images/restaurant.png';
import detailsIcon from '../images/dashboard.png';
import customerIcon from '../images/user2.png';
import kitchenIcon from '../images/kitchen1.png';
import waiterIcon from '../images/waiter.png';
import orderIcon from '../images/orders2.png';
import reservationIcon from '../images/reservation1.png';
import revenueIcon from '../images/revenue.png';
import menuIcon from '../images/menu1.png';
import feedbackIcon from '../images/reviews.png';
import tableIcon from '../images/table2.png';
import logsIcon from '../images/logs.png';
import helpIcon from '../images/help.png';
/* importing component pages */
import AdminCustomers from "../components/AdminCustomers";
import AdminTables from "../components/AdminTables";
import AdminFeedback from "../components/AdminFeedback";
import AdminMenu from "../components/AdminMenu";
import AdminReservations from "../components/AdminReservations";
import AdminOrders from "../components/AdminOrders";
import AdminKitchen from "../components/AdminKitchen";
import AdminWaiters from "../components/AdminWaiters";
import AdminDashboard from "../components/AdminDashboard";
import AdminLogs from "../components/AdminLogs";

export default function AdminPage() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(1);
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        putUserInformation();
    }, []);

    const navigateToLogin = ()=>{
        navigate('/login/staff');
    }

    const putUserInformation = () =>{
        const token = sessionStorage.getItem('token');
        const user = decodeToken(token);
        if(user){
            setUserInfo({username : user.username, name: user.name});
        }
    }

    return(
        <div className="parent-admin">
            <div className="sidebar-ad">
                <div className="sidebar-menu">
                    <div className="admin-res-logo">
                        <img src={ResIcon} className="admin-res-img" />
                        <p className="admin-res-title">FOODIES</p>
                    </div>
                    {/* Sidebar menu options */}
                    <p style={{color:'rgb(202, 202, 202)', fontSize:'14px', margin:'0 5px 5px 15px'}}>Main</p>
                    <div onClick={()=>setSelected(1)} className={selected === 1 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={detailsIcon} alt='menu-item-icon'/>
                        <p>Dashboard</p>
                    </div>
                    <div onClick={()=>setSelected(2)} className={selected === 2 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={orderIcon} alt='menu-item-icon'/>
                        <p>Orders</p>
                    </div>
                    <div onClick={()=>setSelected(3)} className={selected === 3 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={reservationIcon} alt='menu-item-icon'/>
                        <p>Reservations</p>
                    </div>
                    <div onClick={()=>setSelected(4)} className={selected === 4 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={kitchenIcon} alt='menu-item-icon'/>
                        <p>Kitchen</p>
                    </div>
                    <div onClick={()=>setSelected(5)} className={selected === 5 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={waiterIcon} alt='menu-item-icon'/>
                        <p>Waiters</p>
                    </div>
                    <p style={{color:'rgb(202, 202, 202)', fontSize:'14px', margin:'0 5px 5px 15px'}}>Secondary</p>
                    <div onClick={()=>setSelected(6)} className={selected === 6 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={customerIcon} alt='menu-item-icon'/>
                        <p>Customers</p>
                    </div>
                    <div onClick={()=>setSelected(7)} className={selected === 7 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={tableIcon} alt='menu-item-icon'/>
                        <p>Tables</p>
                    </div>
                    <div onClick={()=>setSelected(8)} className={selected === 8 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={menuIcon} alt='menu-item-icon'/>
                        <p>Menu</p>
                    </div>
                    {/* <div onClick={()=>setSelected(9)} className={selected === 9 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={revenueIcon} alt='menu-item-icon'/>
                        <p>Revenue</p>
                    </div> */}
                    <div onClick={()=>setSelected(10)} className={selected === 10 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={feedbackIcon} alt='menu-item-icon'/>
                        <p>Feedbacks</p>
                    </div>
                    <p style={{color:'rgb(202, 202, 202)', fontSize:'14px', margin:'0 5px 5px 15px'}}>Profile</p>
                    <div className="sb-profile-div">
                        <Avatar bg='blue.100' name={userInfo.name}/>
                        <p>{userInfo.name}</p>
                        <h6>Administrator</h6>
                        <Button size='sm' onClick={()=>logout(navigateToLogin)}>Logout</Button>
                    </div>
                    <div onClick={()=>setSelected(11)} className={selected === 11 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={logsIcon} alt='menu-item-icon'/>
                        <p>Logs</p>
                    </div>
                    <div onClick={()=>setSelected(12)} className={selected === 12 ? 'sidebar-btn-selected' : 'sidebar-btn'}>    
                        <img src={helpIcon} alt='menu-item-icon'/>
                        <p>Help</p>
                    </div>
                </div>
                <div className="sidebar-display">
                    {selected === 1 && <AdminDashboard/>}
                    {selected === 2 && <AdminOrders/>}
                    {selected === 3 && <AdminReservations/>}
                    {selected === 4 && <AdminKitchen/>}
                    {selected === 5 && <AdminWaiters/>}
                    {selected === 6 && <AdminCustomers/>}
                    {selected === 7 && <AdminTables/>}
                    {selected === 8 && <AdminMenu/>}
                    {/* {selected === 9 && </>} */}
                    {selected === 10 && <AdminFeedback/>}
                    {selected === 11 && <AdminLogs/>}
                    {/* {selected === 12 && </>} */}
                </div>
            </div>
        </div>
    );
}
