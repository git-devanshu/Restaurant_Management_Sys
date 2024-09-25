import React, { useEffect, useState } from "react";
import '../styles/AdminOptions.css';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import Table from '../components/Table';
import { Button, Stack, Spacer, Text, Avatar } from '@chakra-ui/react';
import {RepeatIcon} from '@chakra-ui/icons';
/* importing icons */
import approveIcon from '../images/approve.png';
import dismissIcon from '../images/dismiss.png';
import freeIcon from '../images/time.png';
import {getBaseUrl} from '../utils/helperFunctions';

export default function AdminReservations(){
    const [refresh, setRefresh] = useState(false);
    const [fetchedData, setFetchedData] = useState([]); //all the fetched data
    const [currTable, setCurrTable] = useState({});
    const [ind, setInd] = useState(0);

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get(getBaseUrl()+'/admin/tables', {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setFetchedData(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error fetching data');
        })
    }, [refresh]);

    const setTableDetails = (index) => {
        setCurrTable(fetchedData[index]);
        setInd(index);
    }

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    const approveRequest = (index) =>{
        const token = sessionStorage.getItem('token');
        axios.put(getBaseUrl()+'/admin/reservation/approve-request', 
        {
            id : currTable._id, 
            tableNo : currTable.tableNo,
            custId : currTable.waitlist[index].custId,
            name : currTable.waitlist[index].name,
            username : currTable.waitlist[index].username,
            reqTime : currTable.waitlist[index].reqTime
        }, 
        {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setRefresh(!refresh);
                toast.success(res.data.message);
                setCurrTable(fetchedData[index]);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error approving request');
        })
    }

    const rejectRequest = (index) =>{
        const token = sessionStorage.getItem('token');
        axios.put(getBaseUrl()+'/admin/reservation/reject-request',
        {
            id : currTable._id, 
            custId : currTable.waitlist[index].custId,
            name : currTable.waitlist[index].name,
            username : currTable.waitlist[index].username,
            reqTime : currTable.waitlist[index].reqTime
        },
        {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setRefresh(!refresh);
                toast.success(res.data.message);
                setCurrTable(fetchedData[index]);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error rejecting request');
        })
    }

    const vacateTable = () =>{
        const token = sessionStorage.getItem('token');
        axios.put(getBaseUrl()+'/admin/reservation/free-table', {id : currTable._id}, {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setRefresh(!refresh);
                toast.success(res.data.message);
                setCurrTable({});
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error vacating table');
        });
    }

    return(
        <div className='parent-ad'>
            <h1>TABLE RESERVATIONS</h1>
            <div className='grid-ad-reserve'>
                <div style={{gap:'30px', borderRadius:'14px', display:'flex', flexWrap:'wrap', height:'fit-content' ,maxHeight:'89vh', overflow:'scroll', scrollbarWidth:'none'}}>
                    {fetchedData && fetchedData.length !== 0 && fetchedData.map((item, index)=>{
                        return(
                            <Table
                            capacity={item.capacity}
                            waitlist={item.waitlist.length}
                            status={item.status}
                            tableNo={item.tableNo}
                            index={index}
                            selected={item.waitlist.length > 0 ? true : false}
                            action={setTableDetails}
                            />
                        )
                    })}
                </div>
                <div style={{borderRadius:'14px', height:'88vh', backgroundColor:'rgb(250, 250, 250)'}}>
                    <div style={{borderRadius:'10px', height:'65vh', padding:'10px', overflow:'scroll', scrollbarWidth:'none'}}>
                        <div style={{display:'flex', alignItems:'center', borderBottom:'1px solid rgb(127, 127, 127)'}}>
                            <Text fontSize='20px' style={{fontWeight:'400'}}>WAITLIST : {currTable.tableNo}</Text>
                            <Spacer/>
                            <button onClick={refreshData} style={{height:'30px', width:'30px', border:'none', backgroundColor:'transparent', color:'black'}}>
                                <RepeatIcon h={6} w={6} _hover={{color:'gray'}}/>
                            </button>
                        </div>
                        {(!currTable || Object.keys(currTable).length === 0 || currTable?.waitlist?.length === 0) && (
                            <Text mt='5px'>No waiting Requests for this Table</Text>
                        )}
                        {currTable?.waitlist?.length > 0 && currTable.waitlist.map((item, index) => {
                            return (
                                <div key={index} style={{borderRadius:'10px', backgroundColor:'#00171F', marginTop:'10px', display:'flex', alignItems:'center', padding:'10px'}}>
                                    <Stack spacing={0}>
                                        <Text fontSize='16px' color='white'>{item.name}</Text>
                                        <Text fontSize='15px' color='rgb(200, 200, 200)'>{item.username} {item.reqTime}</Text>
                                    </Stack>
                                    <Spacer/>
                                    <Button bg='#2AFF00' onClick={()=>approveRequest(index)}>
                                        <img src={approveIcon} height='20px' width='20px'/>
                                    </Button>
                                    <Button bg='red' ml='5px' onClick={()=>rejectRequest(index)}>
                                        <img src={dismissIcon} height='20px' width='20px'/>
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                    <Text fontSize='20px' m='10px'>Currently Dined</Text>
                    {(!currTable || Object.keys(currTable).length === 0 || !currTable?.currentBooking) && (
                        <div style={{margin:'0 10px 10px 10px' ,borderRadius:'10px', height:'12vh', padding:'10px', backgroundColor:'#00171F', display:'flex', alignItems:'center'}}>
                            <Text fontSize='18px' color='white'>No Current Dining</Text>
                        </div>
                    )}
                    {currTable?.currentBooking && (
                        <div style={{margin:'0 10px 10px 10px' ,borderRadius:'10px', height:'12vh', padding:'10px', backgroundColor:'#00171F', display:'flex', alignItems:'center'}}>
                            <Avatar/>
                            <Stack spacing={0}>
                                <Text fontSize='18px' ml='10px' color='white'>{currTable.currentBooking.name}</Text>
                                <Text fontSize='16px' ml='10px' color='rgb(180, 180, 180)'>Dining Time: {currTable.bookingTime}</Text>
                            </Stack>
                            <Spacer/>
                            <Button bg='blue.500' ml='5px' onClick={vacateTable}>
                                <img src={freeIcon} height='20px' width='20px'/>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    );
}