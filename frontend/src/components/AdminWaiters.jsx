import React, { useEffect, useState } from 'react';
import '../styles/AdminOptions.css';
import { Button, Stack, CloseButton, Spacer, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import refreshIcon from '../images/refresh.png';
import deleteIcon from '../images/delete.png';
import addIcon from '../images/add2.png';
import approveIcon from '../images/approve.png';
import ImgButton from './ImgButton';
import Table from '../components/Table';

export default function AdminWaiters() {
    const [waiterData, setWaiterData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);
    const [section, setSection] = useState(1);
    const [currTable, setCurrTable] = useState({});
    const [waiter, setWaiter] = useState({
        name : '',
        username : '',
        password : '',
        email : '',
        age : 0,
    });

    useEffect(()=>{
        fetchTableData();
        fetchWaiterData();
    }, [refresh]);

    const refreshData = () =>{
        setRefresh(!refresh);
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setWaiter({
            ...waiter,
            [name] : value
        })
    }

    const clearForm = (e) =>{
        e.preventDefault();
        setWaiter({
            name : '',
            username : '',
            password : '',
            email : '',
            age : 0,
        });
    }

    const setTableDetails = (index) => {
        setCurrTable(tableData[index]);
    }

    const fetchWaiterData = () =>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/waiters', {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setWaiterData(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error fetching data');
        })
    }

    const fetchTableData = () =>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/tables', {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setTableData(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error fetching data');
        })
    }

    const removeWaiter = (index) =>{
        const token = sessionStorage.getItem('token');
        const id = waiterData[index]._id;
        axios.delete(`http://localhost:8000/admin/waiters/${id}`, {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error removing waiter');
        })
    }

    const addWaiter = () =>{
        const token = sessionStorage.getItem('token');
        axios.post('http://localhost:8000/admin/waiters', waiter, {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
                setModal(false);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error adding a waiter');
        })
    }

    const freeAllWaiters = () =>{
        const token = sessionStorage.getItem('token');
        axios.put('http://localhost:8000/admin/waiters/free-all', {}, {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error adding a waiter');
        })
    }

    const assignWaiter = (index) =>{
        const token = sessionStorage.getItem('token');
        const id = waiterData[index]._id;
        if(!currTable.tableNo){
            toast.error('Please select a table');
            return;
        }
        axios.put('http://localhost:8000/admin/waiters/assign', {id : id, tableNo : currTable.tableNo}, {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setRefresh(!refresh);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error adding a waiter');
        })
    }
    
    return (
        <div className='parent-ad'>
            <h1>WAITERS</h1>
            <div className="top-ad">
                <ImgButton action={refreshData} photo={refreshIcon} title='Refresh' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                <div className="top-toggle">
                    <h2 onClick={()=>{setSection(1)}} className={section === 1 ? 'toggle-selected' : ''}>Assign</h2>
                    <h2 onClick={()=>{setSection(2)}} className={section === 2 ? 'toggle-selected' : ''}>Waiters</h2>
                </div>
                {section === 2 && <ImgButton action={()=>setModal(true)} photo={addIcon} title='Waiter' color={'white'} bgC={'#00171F'} txtC={'white'}/>}
            </div>
            {section === 1 && (
                <div style={{display:'grid', gridTemplateColumns:'2fr 1fr'}}>
                    <div style={{gap:'30px', borderRadius:'14px', display:'flex', flexWrap:'wrap', height:'fit-content' ,maxHeight:'76vh', overflow:'scroll', scrollbarWidth:'none'}}>
                        {tableData && tableData.length !== 0 && tableData.map((item, index)=>{
                            return(
                                <Table
                                capacity={item.capacity}
                                waitlist={item.waitlist.length}
                                status={item.status}
                                tableNo={item.tableNo}
                                index={index}
                                action={setTableDetails}
                                />
                            )
                        })}
                    </div>
                    <div>
                        <div style={{borderRadius:'10px', height:'76vh', padding:'10px', overflow:'scroll', scrollbarWidth:'none'}}>
                            <div style={{display:'flex', alignItems:'center', borderBottom:'1px solid rgb(127, 127, 127)'}}>
                                <Text fontSize='20px' style={{fontWeight:'400'}}>WAITERS : {currTable.tableNo}</Text>
                                <Spacer/>
                                <Button bg='red' m='5px' color='white' onClick={freeAllWaiters}>Free All</Button>
                            </div>
                            {(!waiterData || waiterData.length === 0) && (
                                <Text fontSize='18px' ml='10px'>No Waiter data available</Text>
                            )}
                            {waiterData && waiterData.length > 0 && waiterData.map((item, index)=>{
                                return(
                                    <div key={index} style={{borderRadius:'10px', backgroundColor:'#00171F', marginTop:'10px', display:'flex', alignItems:'center', padding:'10px'}}>
                                        <Stack spacing={0}>
                                            <Text fontSize='16px' color='white'>{item.name}</Text>
                                            <Text fontSize='15px' color='rgb(200, 200, 200)'>Serving Tables : {item.servingTable.length}</Text>
                                        </Stack>
                                        <Spacer/>
                                        <Button bg='#2AFF00' onClick={()=>assignWaiter(index)}>
                                            <img src={approveIcon} height='20px' width='20px'/>
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {section === 2 && (
                <div>
                    {(!waiterData || waiterData.length === 0) && (
                        <Text fontSize='18px' ml='10px'>No Waiter data available</Text>
                    )}
                    {waiterData && waiterData.length > 0 && (
                        <div className="display-table">
                            <DataTable value={waiterData} size={"small"} stripedRows removableSort scrollable scrollHeight="600px">
                                <Column field="name" header="Name" sortable style={{ width: '15%' }}></Column>
                                <Column field="email" header="Email" style={{ width: '25%' }}></Column>
                                <Column field="username" header="Username" sortable style={{ width: '15%' }}></Column>
                                <Column field="age" header="Age" sortable style={{ width: '10%' }}></Column>
                                <Column field="servingTable" header="Serving Tables" style={{ width: '25%' }} body={(rowData)=>rowData.servingTable.join(', ')}></Column>
                                <Column header="Delete" body={(rowData, { rowIndex }) => (
                                    <img src={deleteIcon} onClick={()=>removeWaiter(rowIndex)} className="td-img-ad-tables" alt="red" />
                                )} style={{ width: '10%' }}></Column>
                            </DataTable>
                        </div>
                    )}
                </div>
            )}
            {modal && (
                <div className="modal-ad">
                    <form>
                        <Stack spacing={4}>
                            <Stack direction={'row'}>
                                <h2 style={{margin:'0'}}>Add Waiter</h2>
                                <Spacer/>
                                <CloseButton bg='red' color='white' onClick={()=>setModal(false)}/>
                            </Stack>
                            <Input variant={'filled'} type="text" name="name" value={waiter.name} onChange={handleChange} placeholder="Waiter Name" required/>
                            <Input variant={'filled'} type="text" name="username" value={waiter.username} onChange={handleChange} minLength={3} maxLength={20} placeholder="Username" required/>
                            <Input variant={'filled'} type="text" name="password" value={waiter.password} onChange={handleChange} minLength={8} maxLength={30} placeholder="Password" required/>
                            <Input variant={'filled'} type="text" name="email" value={waiter.email} onChange={handleChange} placeholder="Email" required/>
                            <Input variant={'filled'} type="number" name="age" value={waiter.age} onChange={handleChange} min={18} max={100} placeholder="Age" required/>
                            <Stack direction='row' spacing={2}>
                                <Button onClick={addWaiter} bg={'#2AFF00'}>Add</Button>
                                <Button onClick={clearForm} bg={'#FF0000'}>Clear</Button>
                            </Stack>
                        </Stack>
                    </form>
                </div>
            )}
            <Toaster/>
        </div>
    );
}
