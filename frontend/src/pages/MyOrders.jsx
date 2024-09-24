import React, { useEffect, useState } from 'react';
import '../styles/MyOrders.css';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import {decodeToken, getCurrentDate, logout} from '../utils/helperFunctions';
/* importing icons */
import orderStatusIcon from '../images/order-status.png';
import { useNavigate } from 'react-router-dom';
import foodiesIcon from '../images/restaurant.png';
import { Button, Stack, CloseButton, Spacer, Input, Text, Avatar, Badge, Divider } from '@chakra-ui/react';
import {RepeatIcon} from '@chakra-ui/icons';
import addIcon from '../images/add2.png';

export default function MyOrders(){
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [currOrders, setCurrOrders] = useState({});
    const [refresh, setRefresh] = useState(false);
    const spaceString = '     ';
    const [bill, setBill] = useState({
        billId : '',
        name : '',
        billDate : '',
        tableNo : '',
        items : [],
        total : 0,
    });

    const createBill = () =>{
        setBill({
            billId : currOrders._id,
            name : userInfo.name,
            tableNo : currOrders.tableNo,
            total : currOrders.totalPrice,
            items : currOrders.items,
            billDate : currOrders.orderDate,
        });  
    }

    const putUserInformation = () =>{
        const token = sessionStorage.getItem('token');
        const user = decodeToken(token);
        if(user){
            setUserInfo({username : user.username, name: user.name});
        }
    }

    const fetchCurrentOrders = () =>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/customer/my-orders', {headers : {
            Authorization: `Bearer ${token}`
        }})
        .then(res => {
            if(res.data.status === 202){
                setCurrOrders(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
            console.log('Error fetching Orders');
        });
    }

    useEffect(()=>{
        fetchCurrentOrders();
        putUserInformation();
    }, [refresh]);

    const navigateToLogin = () =>{
        navigate('/login');
    }

    const navigateToHome = () =>{
        navigate('/home');
    }

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    return(
        <div className='parent-mo'>
            <div className='header-tbook'>
                <img src={foodiesIcon}/>
                <h3>FOODIES</h3>
                <Spacer/>
                <Button onClick={navigateToHome} w='100px' color='white' mr='10px' bg='transparent' border='2px' borderRadius='20px' borderColor='#ff0000' _hover={{bg:'#ff0000'}} variant='outline'>
                    Home
                </Button>
            </div>
            <div className="grid-mo">
                <div className="profile-mo">
                    <div className="inner-profile-mo">
                        {/* <img src={userIcon} alt="user-icon"/> */}
                        <Avatar size='lg' bg='#ffea05' src='https://bit.ly/broken-link' />
                        <h3><strong>{userInfo.username}</strong></h3>
                        <h3>{userInfo.name}</h3>
                        <button onClick={()=>{logout(navigateToLogin)}}>Logout</button>
                    </div>
                    <p>Contact the restaurant admin counter to change profile related details.</p>
                </div>

                <div className="current-orders-mo">
                    <div className="order-list-mo">
                        <h2>
                            <img src={orderStatusIcon} alt='order-status'/>
                            Order Status
                            <Spacer/>
                            <button onClick={refreshData} style={{height:'30px', width:'30px', border:'none', backgroundColor:'transparent', color:'black'}}>
                                <RepeatIcon h={6} w={6} _hover={{color:'gray'}}/>
                            </button>
                        </h2>
                        {(!currOrders || Object.keys(currOrders).length === 0) && (
                            <div style={{fontSize:'16px', margin:'10px 10px 10px 20px'}}>
                                No Orders placed
                            </div>
                        )}
                        {currOrders && Object.keys(currOrders).length !== 0 && currOrders.items.map((item, index)=>{
                            return(
                                <div className='order-item-mo'>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <h2>{item.itemName}</h2>
                                        <Spacer/>
                                        {item.status === 'pending' && <Badge variant='subtle' colorScheme='red'>Pending</Badge>}
                                        {item.status === 'preparing' && <Badge variant='subtle' colorScheme='yellow'>Preparing</Badge>}
                                        {item.status === 'ready' && <Badge variant='subtle' colorScheme='green'>Ready</Badge>}
                                    </div>
                                    <Text fontSize='16px' color='rgb(110, 110, 110)'>Rs. {item.price}{spaceString}<strong>{item.qty}</strong></Text>
                                    <Divider/>
                                </div>
                            );
                        })}
                        <button onClick={()=>{navigate('/order-food/1')}}>
                            <img src={addIcon} style={{height:'24px', width:'24px'}}/>
                            Add Orders
                        </button>
                    </div>
                </div>

                <div className="order-details-mo">
                    <h2>Order Details</h2>
                    <div style={{margin:'10px'}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>KOT No.</Text>
                            <Spacer/>
                            <Text as='b'>{currOrders._id}</Text>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>Order Date</Text>
                            <Spacer/>
                            <Text as='b'>{currOrders.orderDate}</Text>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>Order Time</Text>
                            <Spacer/>
                            <Text as='b'>{currOrders.orderTime}</Text>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>Bill Status</Text>
                            <Spacer/>
                            <Text as='b'>{currOrders.billStatus}</Text>
                        </div>
                    </div>
                    <div style={{margin:'0 10px 0 10px', borderTop:'1px solid rgb(127, 127, 127)', borderBottom:'1px solid rgb(127, 127, 127)'}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>Table No.</Text>
                            <Spacer/>
                            <Text as='b'>{currOrders.tableNo}</Text>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>Grand Total</Text>
                            <Spacer/>
                            <Text as='b'>{currOrders.totalPrice}</Text>
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <button onClick={createBill}>Issue Bill</button>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    );
}