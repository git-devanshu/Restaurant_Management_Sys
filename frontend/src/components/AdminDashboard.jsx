import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminOptions.css';
import { useNavigate } from 'react-router-dom';
import foodiesIcon from '../images/restaurant.png';
import {Text, Button, Box, Spacer, Stack, Heading} from '@chakra-ui/react';
import {Chart} from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {RepeatIcon, ArrowForwardIcon} from '@chakra-ui/icons';
import {Toaster, toast} from 'react-hot-toast';
// importing icons
import ResIcon from '../images/restaurant.png';
import detailsIcon from '../images/dashboard.png';
import customerIcon from '../images/user2.png';
import kitchenIcon from '../images/kitchen2.png';
import chefIcon from '../images/chef1.png';
import waiterIcon from '../images/waiter.png';
import orderIcon from '../images/orders2.png';
import reservationIcon from '../images/reservation1.png';
import revenueIcon from '../images/revenue.png';
import menuIcon from '../images/menu1.png';
import feedbackIcon from '../images/reviews.png';
import tableIcon from '../images/table2.png';
import logsIcon from '../images/logs.png';
import helpIcon from '../images/help.png';

export default function AdminDashboard(){
    const [data, setData] = useState({
        totalCustomers: 0,
        totalWaiters: 0,
        totalChefs: 0,
        totalOrder: 0,
        totalTables: 0,
        totalMenuItems: 0,
        totalReservations: 0,
        totalOrdersInKitchen: 0,
        totalWaitingCustomers: 0,
        totalFreeWaiters : 0
    });
    const [revenueData, setRevenueData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    useEffect(()=>{
        fetchDashboardData();
        fetchRevenueData();
    }, [refresh]);

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    const fetchDashboardData = () =>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/dashboard', {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then(res=>{
            if(res.data.status === 200){
                setData({
                    totalCustomers: res.data.totalCustomers,
                    totalWaiters: res.data.totalWaiters,
                    totalChefs: res.data.totalChefs,
                    totalOrder: res.data.totalOrder,
                    totalTables: res.data.totalTables,
                    totalMenuItems: res.data.totalMenuItems,
                    totalReservations: res.data.totalReservations,
                    totalOrdersInKitchen: res.data.totalOrdersInKitchen,
                    totalWaitingCustomers: res.data.totalWaitingCustomers,
                    totalFreeWaiters : res.data.totalFreeWaiters
                });
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err=>{
            console.log(err);
            toast.error('Error fetching data');
        })
    }

    const fetchRevenueData = () =>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/revenue', {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then(res=>{
            if(res.data.status === 200){
                setRevenueData(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err=>{
            console.log(err);
            toast.error('Error fetching data');
        })
    }
 
    return (
        <div className='parent-ad'>
            <div style={{display:'flex', alignItems:'center'}}>
                <h1 style={{margin:'0 0 2px 0'}}>DASHBOARD</h1>
                <RepeatIcon h={6} w={6} m='5px' onClick={refreshData} _hover={{color:'gray', cursor:'pointer'}}/>
            </div>
            <div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', placeItems:'center', gap:'10px'}}>
                    <div style={{padding:'10px', height:'100px', width:'100%', border:'1px solid rgb(200, 200, 200)', backgroundColor:'#00171F', borderRadius:'14px', display:'flex', alignItems:'start'}}>
                        <Stack>
                            <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>WAITERS</Text>
                            <Spacer/>
                            <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalWaiters}<span style={{color:'#ffea05', fontSize:'16px', marginLeft:'5px', fontWeight:'400'}}><ArrowForwardIcon w={4} h={4} mb='3px'/> {data.totalFreeWaiters} waiters free</span></Heading>
                        </Stack>
                        <Spacer/>
                        <img src={waiterIcon} height='40px' width='40px' style={{marginRight:'10px', filter:'invert(79%) sepia(9%) saturate(11%) hue-rotate(336deg) brightness(87%) contrast(83%)'}}/>
                    </div>
                    <div style={{padding:'10px', height:'100px', width:'100%', border:'1px solid rgb(200, 200, 200)', backgroundColor:'#00171F', borderRadius:'14px', display:'flex', alignItems:'start'}}>
                        <Stack>
                            <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>USERS</Text>
                            <Spacer/>
                            <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalCustomers}</Heading>
                        </Stack>
                        <Spacer/>
                        <img src={customerIcon} height='40px' width='40px' style={{marginRight:'10px', filter:'invert(79%) sepia(9%) saturate(11%) hue-rotate(336deg) brightness(87%) contrast(83%)'}}/>
                    </div>
                    <div style={{padding:'10px', height:'100px', width:'100%', border:'1px solid rgb(200, 200, 200)', backgroundColor:'#00171F', borderRadius:'14px', display:'flex', alignItems:'start'}}>
                        <Stack>
                            <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>CHEFS</Text>
                            <Spacer/>
                            <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalChefs}</Heading>
                        </Stack>
                        <Spacer/>
                        <img src={chefIcon} height='40px' width='40px' style={{marginRight:'10px', filter:'invert(79%) sepia(9%) saturate(11%) hue-rotate(336deg) brightness(87%) contrast(83%)'}}/>
                    </div>
                    <div style={{padding:'10px', height:'100px', width:'100%', border:'1px solid rgb(200, 200, 200)', backgroundColor:'#00171F', borderRadius:'14px', display:'flex', alignItems:'start'}}>
                        <Stack>
                            <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>MENU ITEMS</Text>
                            <Spacer/>
                            <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalMenuItems}</Heading>
                        </Stack>
                        <Spacer/>
                        <img src={menuIcon} height='40px' width='40px' style={{marginRight:'10px', filter:'invert(79%) sepia(9%) saturate(11%) hue-rotate(336deg) brightness(87%) contrast(83%)'}}/>
                    </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'10px'}}>
                    <div style={{width:'100%', height:'fit-content'}}>
                        <div style={{backgroundColor:'#00171F', height:'250px', width:'100%', border:'1px solid rgb(190, 190, 190)', borderRadius:'14px', display:'flex', alignItems:'center'}}>
                            <Stack style={{padding:'10px', height:'250px'}}>
                                <div style={{padding:'10px', height:'84px', width:'240px', border:'1px solid rgb(200, 200, 200)', backgroundColor:'#00171F', borderRadius:'10px', display:'flex', alignItems:'start'}}>
                                    <Stack>
                                        <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>WAITING CUSTOMERS</Text>
                                        {/* <Spacer/> */}
                                        <Heading textAlign='left' color='white' m='0px' size='lg'>{data.totalWaitingCustomers}</Heading>
                                    </Stack>
                                </div>
                                <Spacer/>
                                <Text color='rgb(200, 200, 200)' fontWeight={500}>TABLES</Text>
                                
                                <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                                    <div style={{height:'65px', width:'100px', borderBottom:'5px solid #2AFF00'}}>
                                        <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>Total</Text>
                                        <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalTables}</Heading>
                                    </div>
                                    <div style={{height:'65px', width:'100px', borderBottom:'5px solid #43BEE5', marginLeft:'10px'}}>
                                        <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>Free</Text>
                                        <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalTables - data.totalReservations}</Heading>
                                    </div>
                                    <div style={{height:'65px', width:'100px', borderBottom:'5px solid #FF0000', marginLeft:'10px'}}>
                                        <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>Reserved</Text>
                                        <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalReservations}</Heading>
                                    </div>
                                </div>
                            </Stack>
                            <Spacer/>
                            <div>
                                <Chart type="doughnut" data={{
                                    labels: ['Free Tables', 'Reserved Tables'],
                                    datasets: [
                                        {
                                            data: [(data.totalTables - data.totalReservations), data.totalReservations],
                                            backgroundColor: ['#43BEE5', '#ff0000'],
                                        }
                                    ]
                                }} options={{cutout : '75%', plugins: {legend: {display: false}}}} style={{height:'200px', width:'200px', marginRight:'20px'}} />
                            </div>
                        </div>
                        <div style={{padding:'10px', backgroundColor:'#00171F', height:'150px', width:'100%', border:'1px solid rgb(200, 200, 200)', borderRadius:'14px', marginTop:'10px', display:'flex', alignItems:'center', gap:'10px'}}>
                            <div style={{padding:'10px', height:'130px', width:'100%', border:'1px solid rgb(200, 200, 200)', backgroundColor:'#00171F', borderRadius:'10px', display:'flex', alignItems:'start'}}>
                                <Stack h='110px'>
                                    <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>ORDERS</Text>
                                    <Spacer/>
                                    <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalOrder}</Heading>
                                    <Text color='rgb(200, 200, 200)' fontSize='14px' fontWeight={400}>Total KOTs with pending bill</Text>
                                </Stack>
                                <Spacer/>
                                <img src={orderIcon} height='40px' width='40px' style={{marginRight:'0', filter:'invert(79%) sepia(9%) saturate(11%) hue-rotate(336deg) brightness(87%) contrast(83%)'}}/>
                            </div>
                            <div style={{padding:'10px', height:'130px', width:'100%', border:'1px solid rgb(200, 200, 200)', backgroundColor:'#00171F', borderRadius:'10px', display:'flex', alignItems:'start'}}>
                                <Stack h='110px'>
                                    <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>KITCHEN</Text>
                                    <Spacer/>
                                    <Heading textAlign='left' color='white' m={0} size='lg'>{data.totalOrdersInKitchen}</Heading>
                                    <Text color='rgb(200, 200, 200)' fontSize='14px' fontWeight={400}>Total KOTs currently on KDS</Text>
                                </Stack>
                                <Spacer/>
                                <img src={kitchenIcon} height='40px' width='40px' style={{marginRight:'0', filter:'invert(79%) sepia(9%) saturate(11%) hue-rotate(336deg) brightness(87%) contrast(83%)'}}/>
                            </div>
                        </div>
                    </div>
                    <div style={{backgroundColor:'', width:'100%'}}>
                        <div style={{padding:'10px', backgroundColor:'#00171F', height:'150px', width:'100%', border:'1px solid rgb(200, 200, 200)', borderRadius:'14px', display:'flex', alignItems:'center', gap:'10px'}}>
                            <div style={{padding:'10px', height:'130px', width:'100%', border:'1px solid rgb(200, 200, 200)', backgroundColor:'#00171F', borderRadius:'10px', display:'flex', alignItems:'start'}}>
                                <Stack h='110px'>
                                    <Text color='rgb(200, 200, 200)' fontSize='15px' fontWeight={500}>REVENUE</Text>
                                    <Spacer/>
                                    <Heading textAlign='left' color='white' m={0} size='lg'>&#x20B9; {revenueData.length > 0 ? revenueData[revenueData.length - 1].totalRevenue : 0}</Heading>
                                    <Text color='rgb(200, 200, 200)' fontSize='14px' fontWeight={400}>For the month of <span style={{color:'#ffea05', border:'1px solid #ffea05', padding:'1px 6px 1px 6px', borderRadius:'4px'}}>{monthName}</span></Text>
                                </Stack>
                                <Spacer/>
                                <img src={revenueIcon} height='40px' width='40px' style={{marginRight:'0', filter:'invert(79%) sepia(9%) saturate(11%) hue-rotate(336deg) brightness(87%) contrast(83%)'}}/>
                            </div>
                            <div>
                                <Chart type='line' data={{
                                    labels: revenueData.map(item => item._id),
                                    datasets: [
                                        {
                                            label: 'Total Revenue',
                                            data: revenueData.map(item => item.totalRevenue),
                                            fill: false, 
                                            borderColor: '#2aff00',
                                            tension: 0,
                                            pointBackgroundColor: '#2aff00',
                                        }
                                    ]
                                }} options={{ responsive: true, plugins: {legend: {display: true, position: 'top', labels: {color : 'rgb(200, 200, 200)'}}}, scales: {x: {display: false}, y: {ticks : {color : 'rgb(200, 200, 200)'}}} }}
                                style={{height:'110px', width:'260px'}}/>
                            </div>
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <DataTable value={revenueData} size={"small"} stripedRows removableSort scrollable scrollHeight="500px">
                                <Column field="_id" header="Month" style={{ width: '50%' }}></Column>
                                <Column field="totalRevenue" header="Total revenue" sortable style={{ width: '50%' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    );
}
