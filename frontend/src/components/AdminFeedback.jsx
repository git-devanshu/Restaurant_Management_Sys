import React, { useEffect, useState } from "react";
import '../styles/AdminOptions.css';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import ImgButton from './ImgButton';
/* importing icons */
import refreshIcon from '../images/refresh.png';
import viewIcon from '../images/view.png';
import { Button, Stack, CloseButton, Spacer, Input, Text, Textarea } from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AdminFeedback(){
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState([]); //stores the feedback data after fetching
    const [total, setTotal] = useState(0);
    const [feedback, setFeedback] = useState({
        id : '',
        custId : '',
        name : '',
        review : '',
        dateTime : ''
    });
    const [view, setView] = useState(false);

    useEffect(()=>{
        if(data){
            setTotal(data.length);
        }
    }, [data]);

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/feedback', {headers : {
            Authorization : `Bearer ${token}`,
        }})
        .then(res => {
            if(res.data.status === 200){
                setData(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Error fetching feedbacks');
        });
    }, [refresh]);

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    const setFeedbackView = (index) =>{
        const review1 = data[index];
        setFeedback({
            id : review1._id,
            custId : review1.custId,
            name : review1.name,
            review : review1.review,
            dateTime : review1.dateTime
        });
    }

    const deleteFeedback = () =>{
        const token = sessionStorage.getItem('token');
        axios.delete(`http://localhost:8000/admin/feedback/${feedback.id}`, {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then(res => {
            if(res.data.status === 200){
                toast.success(res.data.message);
                setView(false);
                setRefresh(!refresh);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Error fetching feedbacks');
        });
    }

    return(
        <div className='parent-ad'>
            <h1>CUSTOMER FEEDBACK</h1>
            <div className='grid-ad'>
                <div className="main-ad">
                    <div className="top-ad">
                        <ImgButton action={refreshData} photo={refreshIcon} title='Refresh' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                        <div className="top-counters">
                            <p>Total</p>
                            <h4>{total}</h4>
                        </div>
                    </div>
                    {(!data || data.length === 0) && 
                        <Text fontSize='20px' size='xl'>No feedbacks received</Text>
                    }
                    {data && data.length !== 0 && (
                        <div className="display-table">
                            <DataTable value={data} size={"small"} stripedRows removableSort scrollable scrollHeight="500px">
                                <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                                <Column header="Review" sortable style={{ width: '50%' }} 
                                    body={(rowData) => {
                                        const reviewText = rowData.review;
                                        const maxChars = 50; // Limit to 50 characters
                                        return (
                                            <span>
                                                {reviewText.length > maxChars ? reviewText.slice(0, maxChars) + '...' : reviewText}
                                            </span>
                                        );
                                    }}
                                ></Column>
                                <Column field="dateTime" header="Date Time" sortable style={{ width: '20%' }}></Column>
                                <Column header="View" body={(rowData, { rowIndex }) => (
                                    <img src={viewIcon} onClick={() => { setView(true); setFeedbackView(rowIndex); }} className="td-img-ad-tables" alt="blue" />
                                )} style={{ width: '10%' }}></Column>
                            </DataTable>
                        </div>
                    )}
                </div>
            </div>
            {view && (
                <div className="modal-ad">
                    <form>
                        <Stack spacing={4}>
                            <Stack direction={'row'}>
                                <h2 style={{margin:'0'}}>Customer Feedback</h2>
                                <Spacer/>
                                <CloseButton bg='red' color='white' onClick={()=>setView(false)}/>
                            </Stack>
                            <Stack direction='row' spacing={3}>
                                <Input variant='unstyled' type="text" name="name" value={feedback.name}/>
                                <Spacer/>
                                <Input variant='unstyled' type="text" name="custId" value={feedback.custId}/>
                            </Stack>
                            <Input variant='unstyled' type="text" name="dateTime" value={feedback.dateTime}/>
                            <Textarea variant={'filled'} name="feedback" value={feedback.review} style={{height: '170px', width: '100%'}}/>
                            <Stack direction={'row'} spacing={2}>
                                <Button onClick={deleteFeedback} bg={'#FF0000'}>Delete</Button>
                            </Stack>
                        </Stack>
                    </form>
                </div>
            )}
            <Toaster />
        </div>
    );
} 