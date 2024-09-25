import React, { useEffect, useState } from "react";
import '../styles/AdminOptions.css';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import ImgButton from './ImgButton';
/* importing icons */
import refreshIcon from '../images/refresh.png'; 
import orderIcon from '../images/chef-hat.png';
import cancelOrderIcon from '../images/order.png';
import deleteIcon from '../images/delete.png';
import { Button, Stack, CloseButton, Spacer, Text } from '@chakra-ui/react';
import {CheckCircleIcon, TimeIcon, DeleteIcon, CheckIcon, DownloadIcon} from '@chakra-ui/icons';
import tableIcon from '../images/table-4.png';
import BillComponent from "./BillComponent";
import html2pdf from 'html2pdf.js';
import {getBaseUrl} from '../utils/helperFunctions';

export default function AdminOrders(){
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState([]);
    const [history, setHistory] = useState([]);
    const [section, setSection] = useState(1);
    const [order, setOrder] = useState({});
    const [details, setDetails] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);
    const [viewBill, setViewBill] = useState(false);

    const getCurrentKOTS = () =>{
        const token = sessionStorage.getItem('token');
        axios.get(getBaseUrl()+'/admin/orders/current-bills', {headers : {
            Authorization: `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setData(res.data.data);
                setDetails(false);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error("Error fetching data");
        })
    }

    const getOldKOTS = () =>{
        const token = sessionStorage.getItem('token');
        axios.get(getBaseUrl()+'/admin/orders/order-history', {headers : {
            Authorization: `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setHistory(res.data.data);
                setDetails(false);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error("Error fetching data");
        })
    }

    useEffect(()=>{
        getCurrentKOTS();
        getOldKOTS();
    }, [refresh]);

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    const showDetails = (index) =>{
        setDetails(true);
        if(section === 1){
            const item = data[index];
            setOrder(item);
        }
        else if(section === 2){
            const item = history[index];
            setOrder(item);
        }
    }

    const handleDownload = () => {
        setViewBill(true);
        setTimeout(()=>{
            const input = document.getElementById('billContent');
            const elementWidthPx = input.offsetWidth;
            const elementHeightPx = input.offsetHeight;
            const widthMm = elementWidthPx * 0.264583;
            const heightMm = elementHeightPx * 0.264583;
            const opt = {
                margin: 1,
                filename: 'bill.pdf',
                image: { type: 'png', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: [widthMm, heightMm], orientation: 'portrait' }
            };
            html2pdf().from(input).set(opt).save();
        }, 100);
        setTimeout(()=>{
            setViewBill(false);
        }, 300);
    };

    const cancelOrder = (index) =>{
        const token = sessionStorage.getItem('token');
        axios.put(getBaseUrl()+'/admin/orders/reject', {
            id : order._id,
            ind : index,
            price : order.items[index].price,
            qty : order.items[index].qty
        }, {headers : {
            Authorization: `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
            }
            else{
                setRefresh(!refresh);
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error cancelling order');
        })
    }

    const prepareOrder = (index) =>{
        const token = sessionStorage.getItem('token');
        axios.put(getBaseUrl()+'/admin/orders/approve', {
            id : order._id,
            ind : index
        }, {headers : {
            Authorization: `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
            }
            else{
                setRefresh(!refresh);
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error approving order');
        })
    }

    const clearItemFromHistory = () =>{
        const token = sessionStorage.getItem('token');
        axios.delete(`${getBaseUrl()}/admin/orders/remove-item/${order._id}`, {headers : {
            Authorization: `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
            }
            else{
                setRefresh(!refresh);
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error Removing record');
        })
    }

    const clearCompleteHistory = () =>{
        const token = sessionStorage.getItem('token');
        axios.delete(getBaseUrl()+'/admin/orders/clear-all', {headers : {
            Authorization: `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
                setConfirmClear(false);
            }
            else{
                setRefresh(!refresh);
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error Removing record');
        })
    }

    const markPaid = () =>{
        const token = sessionStorage.getItem('token');
        axios.put(getBaseUrl()+'/admin/orders/mark-paid', {id : order._id}, {headers : {
            Authorization: `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
            }
            else{
                setRefresh(!refresh);
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error Paying the Bill');
        })
    }

    return(
        <div className='parent-ad'>
            <h1>ORDERS</h1>
            <div className='grid-ad'>
                <div className="main-ad">
                    <div className="top-ad">
                        <ImgButton action={refreshData} photo={refreshIcon} title='Refresh' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                        <div className="top-toggle">
                            <h2 onClick={()=>{setSection(1)}} className={section === 1 ? 'toggle-selected' : ''}>Current</h2>
                            <h2 onClick={()=>{setSection(2)}} className={section === 2 ? 'toggle-selected' : ''}>History</h2>
                        </div>
                        {section === 2 && <ImgButton action={()=>setConfirmClear(true)} photo={deleteIcon} title='Clear All' color={'red'} bgC={'#00171F'} txtC={'red'}/>}
                    </div>
                    {((section === 1 && data.length === 0) || (section === 2 && history.length === 0)) && 
                        <div style={{margin:'15px', marginTop:'0', fontSize:'18px'}}>
                            No Orders Found
                        </div>
                    }
                    {section === 1 && (
                        <div className="order-list-ad">
                            {data && data.length !== 0 && data.map((kot, index)=>{
                                return(
                                    <div className="order-item-ad" onClick={()=>{showDetails(index)}}>
                                        <div className={kot?.items?.some(item => item.status === 'pending') ? 'pending-order-ad' : 'approved-order-ad'}></div>
                                        <Stack spacing={0}>
                                            <div style={{display:'flex', alignItems:'center'}}>
                                                <img src={tableIcon} style={{margin:'8px 5px 5px 5px'}} height='30px' width='30px'/>
                                                <h4>{kot.tableNo}</h4>
                                            </div>
                                            <p>{kot.orderDate}</p>
                                            <p>Order Time : {kot.orderTime}</p>
                                        </Stack>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {section === 2 && (
                        <div className="order-list-ad">
                        {history && history.length !== 0 && history.map((kot, index)=>{
                            return(
                                <div className="order-item-ad" onClick={()=>{showDetails(index)}}>
                                    <div className='history-order-ad'></div>
                                    <Stack spacing={0}>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <img src={tableIcon} style={{margin:'8px 5px 5px 5px'}} height='30px' width='30px'/>
                                            <h4>{kot.tableNo}</h4>
                                        </div>
                                        <p>{kot.orderDate}</p>
                                        <p>Order Time : {kot.orderTime}</p>
                                    </Stack>
                                </div>
                            );
                        })}
                    </div>
                    )}
                </div>
            </div>
            {details && (
                <div className="order-details-div-ad">
                    <div className="order-details-head-ad">
                        <h1>Order Details</h1>
                        <Spacer/>
                        <CloseButton bg='red' color='white' onClick={()=>setDetails(false)}/>
                    </div>
                    <div className="order-details-data-ad">
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>KOT No.</Text>
                            <Spacer/>
                            <Text as='b'>{order._id}</Text>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>Table No. : {order.tableNo}</Text>
                            <Spacer/>
                            <Text>{order.orderDate} {order.orderTime}</Text>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Text>CustId</Text>
                            <Spacer/>
                            <Text>{order.custId}</Text>
                        </div>
                    </div>
                    <div className="order-details-items-ad">
                        {order.items.map((items, ind) =>{
                            return(
                                <div style={{backgroundColor:'#eeeeee', display:'flex', alignItems:'center', padding:'5px 10px 5px 10px', border:'1px solid rgb(127, 127, 127)', borderRadius:'10px', marginTop:'5px'}}>
                                    {items.status === 'pending' && <TimeIcon h={6} w={6}/>}
                                    {(items.status === 'preparing') && <CheckCircleIcon h={6} w={6}/>}
                                    {(items.status === 'ready') && <CheckCircleIcon color='#2AFF00' h={6} w={6}/>}
                                    <div style={{marginLeft:'15px'}}>
                                        <Text as='b'>{items.itemName}</Text>
                                        <Text>x{items.qty}</Text>
                                    </div>
                                    <Spacer/>
                                    {items.status === 'pending' && (
                                        <button onClick={()=>prepareOrder(ind)} style={{height:'30px', width:'30px', backgroundColor:'#2AFF00', borderRadius:'6px', margin:'5px'}}>
                                            <img src={orderIcon} height='18px' width='18px' style={{margin:'0 auto'}}/>
                                        </button>
                                    )}
                                    {items.status === 'pending' && (
                                        <button onClick={()=>cancelOrder(ind)} style={{height:'30px', width:'30px', backgroundColor:'red', borderRadius:'6px', margin:'5px'}}>
                                            <img src={cancelOrderIcon} height='18px' width='18px' style={{margin:'0 auto'}}/>
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div style={{display:'flex', alignItems:'center', padding:'15px'}}>
                        <Text fontSize='18px' as='b'>Total &#x20B9;{order.totalPrice}</Text>
                        <Spacer/>
                        {section === 1 && <Button onClick={markPaid} leftIcon={<CheckIcon/>} bg='#43BEE5' color='white'>Mark Paid</Button>}
                        {section === 2 && <Button bg='#2aff00' color='white' mr='10px' leftIcon={<DownloadIcon/>} onClick={handleDownload}>Download</Button>}
                        {section === 2 && <Button onClick={clearItemFromHistory} leftIcon={<DeleteIcon/>} bg='red' color='white'>Delete Record</Button>}
                    </div>
                </div>
            )}
            {confirmClear && (
                <Stack style={{position:'absolute', zIndex:'3', top:'120px', height:'fit-content', width:'280px', borderRadius:'14px', boxShadow:'0 2px 7px gray', left:'calc((100vw - 280px)/2)', padding:'10px', backgroundColor:'#00171F'}}>
                    <Text fontSize='18px' color='white'>Do you really want to clear All KOTs from history ?</Text>
                    <Button onClick={()=>setConfirmClear(false)} bg='#2AFF00'>Do Not Delete</Button>
                    <Button onClick={clearCompleteHistory} bg='red' color='white'>Delete Permanantly</Button>
                </Stack>
            )}
            {viewBill && (
                <div style={{width: 'min(96%, 500px)', height: 'fit-content', position: 'absolute', top: '100px', left: 'calc((100% - min(96%, 500px))/2)', backgroundColor:'white', padding:'10px', border:'5px solid black', zIndex:'5'}}>
                    <BillComponent bill={order} />
                </div>
            )}
            <Toaster />
        </div>
    );
}