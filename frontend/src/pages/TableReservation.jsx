import React, { useEffect } from 'react';
import '../styles/TableReservation.css';
import { useState } from 'react';
import axios from 'axios';
import {decodeToken} from '../utils/helperFunctions';
import {Toaster, toast} from 'react-hot-toast';
import Table from '../components/Table';
import foodiesIcon from '../images/restaurant.png';
import { Button, Stack, CloseButton, Spacer, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import tableIcon from '../images/table-4.png';

export default function TableReservation(){
    const navigate = useNavigate();

    const [selectedTable, setSelectedTable] = useState(-1);
    const [data, setData] = useState([]); //store the fetched data of tables
    const [disableBtn, setDisableBtn] = useState(true);

    const groupedData = data.reduce((acc, item, index) => {
        if (!acc[item.location]) {
            acc[item.location] = [];
        }
        acc[item.location].push({ ...item, originalIndex: index });
        return acc;
    }, {});

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/customer/reservations', {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setData(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Failed to fetch data');
        })
    }, []);

    //use effect to handle the changes in disable btn variable
    useEffect(()=>{
        if(selectedTable !== -1){
            setDisableBtn(false);
        }
        // if(selectedTable !== -1 && data[selectedTable].status === 'occupied'){
        //     setDisableBtn(true);
        // }
    }, [selectedTable]);

    const bookTable = ()=> {
        setDisableBtn(true);
        const token = sessionStorage.getItem('token');
        const tableId = data[selectedTable]._id;
        const toastId = toast.loading('Sending reservation request...');
        axios.put('http://localhost:8000/customer/reservations', {id : tableId}, {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res => {
            if(res.data.status === 200){
                toast.loading('Wait until your request is approved...', {id: toastId});
                //keep on polling to check if the request is approved
                const interval = setInterval(async ()=>{
                    axios.get('http://localhost:8000/customer/my-orders', {headers : {
                        Authorization : `Bearer ${token}`,
                    }})
                    .then(res =>{
                        if(res.data.status === 200){
                            toast.error('Request Rejected', {id : toastId});
                            clearInterval(interval);
                        }
                        else if(res.data.status === 202){
                            toast.success('Request Approved', {id : toastId});
                            clearInterval(interval);
                        }
                        else if(res.data.status === 204){
                            
                        }
                        else{
                            toast.error(res.data.message, {id : toastId});
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        toast.error('An error occurred', {id : toastId});
                    })
                }, 5000);
            }
            else{
                toast.error(res.data.message, {id: toastId});
                setDisableBtn(false);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Failed to Book Table', {id : toastId});
            setDisableBtn(false);
        })
    }

    const navigateToHome = () =>{
        navigate('/home');
    }

    return(
        <div className='outer-tbook'>
            <div className='header-tbook'>
                <img src={foodiesIcon}/>
                <h3>FOODIES</h3>
                <Spacer/>
                <Button onClick={navigateToHome} w='100px' color='white' mr='10px' bg='transparent' border='2px' borderRadius='20px' borderColor='#ff0000' _hover={{bg:'#ff0000'}} variant='outline'>
                    Home
                </Button>
            </div>
            <div className='parent-tbook'>
                <div className='tables-div-tbook'>
                    <h1>Reserve Table</h1>
                    {Object.keys(groupedData).map((location) => (
                        <div key={location} style={{backgroundColor: '#ffffff', borderBottom: '1px solid rgb(174, 174, 174)', marginLeft:'10px', marginRight:' 10px'}}>
                            <h3>{location.toUpperCase()}</h3>
                            <div className='tables-list-tbook'>
                                {groupedData[location].map((item) => (
                                    <Table 
                                        capacity={item.capacity} 
                                        tableNo={item.tableNo}
                                        status={item.status}
                                        waitlist={item.waitlist.length}
                                        index={item.originalIndex}
                                        selected={selectedTable === item.originalIndex}
                                        action={setSelectedTable}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className='info-div-tbook'>
                    <div className='info-content-tbook'>
                        <div style={{display:'flex', borderBottom:'1px solid rgb(174, 174, 174)', marginLeft:'10px', marginRight:'10px'}}>
                            <img src={tableIcon} style={{height:'30px', width:'30px', margin:'10px'}}/>
                            <h2>{selectedTable === -1 ? '' : data[selectedTable].tableNo}</h2>
                        </div>
                        <div className='info-item-tbook'>
                            <p>Capacity</p>
                            <p style={{fontWeight:'600'}}>: {selectedTable === -1 ? '' : data[selectedTable].capacity}</p>
                        </div>
                        <div className='info-item-tbook'>
                            <p>Location</p>
                            <p style={{fontWeight:'600'}}>: {selectedTable === -1 ? '' : data[selectedTable].location}</p>
                        </div>
                        <div className='info-item-tbook'>
                            <p>Status</p>
                            <p style={{fontWeight:'600'}}>: {selectedTable === -1 ? '' : data[selectedTable].status}</p>
                        </div>
                        <div className='warning-info-tbook'>
                            <p>Your reservation request may take some time to get approved.</p>
                            {disableBtn && (
                                <button disabled={true} style={{cursor: 'not-allowed'}}>Book Table</button>
                            )}
                            {!disableBtn && (
                                <button onClick={bookTable}>Book Table</button>
                            )}
                        </div>
                        <div className='index-div-info-tbook'>
                            <ul style={{listStyle: 'none'}}>
                                <li className='li-1-tbook'>Reserved tables</li>
                                <li className='li-2-tbook'>Free tables</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}