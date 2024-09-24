import React, { useEffect, useState } from "react";
import '../styles/AdminOptions.css';
import 'primereact/resources/themes/mira/theme.css';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import ImgButton from './ImgButton';
/* icons */
import refreshIcon from '../images/refresh.png';
import addIcon from '../images/add2.png';
import deleteIcon from '../images/delete.png';
import editIcon from '../images/edit.png';
import filterIcon from '../images/filter.png';
import { Button, Stack, CloseButton, Spacer, Input, Select, Text, Badge } from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AdminTables(){
    const [table, setTable] = useState({
        id : '',
        tableNo : '',
        location : 'dining area',
        capacity : ''
    }); //table details to manage the form
    const [fetchedData, setFetchedData] = useState([]); //all the fetched data without location filter
    const [data, setData] = useState([]); //the data of tables to be displayed
    const [location, setLocation] = useState('all');
    const [total, setTotal] = useState(0); //total count of tables to be displayed
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setTable({
            ...table,
            [name] : value
        })
    };

    const handleLocationChange = (e) =>{
        setLocation(e.target.value);
    }

    //filter the data if the location variable is changed
    useEffect(()=>{
        if(location !== 'all'){
            const tableData = fetchedData.filter(t => {
                return t.location === location;
            });
            setData(tableData);
            setTotal(tableData.length);
        }
        else{
            setData(fetchedData);
            setTotal(fetchedData.length);
        }
    }, [location]);
    
    //fetch the data from the db
    useEffect(()=>{
        axios.get('http://localhost:8000/admin/tables', {headers : {
            'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
        }})
        .then(res =>{
            if(res.data.status === 200){
                setFetchedData(res.data.data);
                setData(res.data.data);
                setTotal(res.data.data.length);
                setLocation('all');
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error fetching data');
        });
    }, [refresh]);

    //send the data of new table to the server
    const addTableData = (e) =>{
        e.preventDefault();
        if(!e.target.form.reportValidity()){
            return;
        }
        const toastId = toast.loading('Adding Table...');
        axios.post('http://localhost:8000/admin/tables', table, {headers : {
            'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message, {id : toastId});
                setRefresh(!refresh);
                setModal(false);
            }
            else{
                toast.error(res.data.message, {id : toastId});
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error adding table', {id : toastId});
        });
    }

    const putTableData = (index) =>{
        setTable({
            id : data[index]._id,
            tableNo : data[index].tableNo,
            location : data[index].location,
            capacity : data[index].capacity
        });
    }

    const updateTable = (e) =>{
        e.preventDefault();
        if(!e.target.form.reportValidity()){
            return;
        }
        const toastId = toast.loading('Updating Table...');
        axios.put('http://localhost:8000/admin/tables', table, {headers : {
            'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message, {id : toastId});
                setUpdate(false);
                setModal(false);
                setRefresh(!refresh);
            }
            else{
                toast.error(res.data.message, {id : toastId});
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error updating table', {id : toastId});
        });
    }

    const deleteTableData = (index) =>{
        const toastId = toast.loading('Loading...');
        const id = data[index]._id;
        axios.delete(`http://localhost:8000/admin/tables/${id}`, {headers : {
            'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message, {id : toastId});
                setRefresh(!refresh);
            }
            else{
                toast.error(res.data.message, {id : toastId});
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error deleting table', {id : toastId});
        })
    }

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    const clearForm = (e) =>{
        e.preventDefault();
        setTable({
            tableNo : '',
            capacity : '',
            location : '',
            type : ''
        });
    }

    return(
        <div className="parent-ad">
            <h1>MANAGE TABLES</h1>
            <div className="grid-ad">
                {/* tabular view of details of all tables */}
                <div className="main-ad">
                    <div className="top-ad">
                        <ImgButton action={refreshData} photo={refreshIcon} title='Refresh' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                        <ImgButton action={()=>setModal(true)} photo={addIcon} title='Add Table' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                        <img src={filterIcon} style={{filter:'none'}} className="td-img-ad-tables"/>
                        <select value={location} className="top-fields" onChange={handleLocationChange}>
                            <option value="all">All Locations</option>
                            <option value='dining area'>Dining Area</option>
                            <option value='private room'>Private Room</option>
                            <option value='patio'>Patio</option>
                            <option value='rooftop'>Rooftop</option>
                            <option value='garden'>Garden</option>
                            <option value='balcony'>Balcony</option>
                            <option value='courtyard'>Courtyard</option>
                            <option value='vip area'>VIP Area</option>
                        </select>
                        <div className="top-counters">
                            <p>Total</p>
                            <h4>{total}</h4>
                        </div>
                    </div>
                    {(!data || data.length === 0) && 
                        <Text fontSize='20px' size='xl'>No tables data to show</Text>
                    }
                    {data && data.length !== 0 && (
                        <div className="display-table">
                            <DataTable value={data} size={"small"} stripedRows removableSort scrollable scrollHeight="500px">
                                <Column field="tableNo" header="Table No" sortable style={{ width: '15%' }}></Column>
                                <Column field="capacity" header="Capacity" sortable style={{ width: '15%' }}></Column>
                                <Column field="location" header="Location" sortable style={{ width: '20%' }}></Column>
                                <Column body={(rowData, {rowIndex}) => {
                                    return(rowData.status === 'free' ? <Badge colorScheme='green' variant='subtle'>Free</Badge> : <Badge colorScheme='red' variant='subtle'>Booked</Badge>);
                                }} header="Status" style={{ width: '15%' }}></Column>
                                <Column sortable body={(rowData, {rowIndex}) => {
                                    return(rowData.waitlist.length);
                                }} header="Waiting" style={{ width: '15%' }}></Column>
                                <Column header="Delete" body={(rowData, { rowIndex }) => (
                                    <img src={deleteIcon} onClick={() => deleteTableData(rowIndex)} className="td-img-ad-tables" alt="red" />
                                )} style={{ width: '10%' }}></Column>
                                <Column header="Update" body={(rowData, { rowIndex }) => (
                                    <img onClick={() => {putTableData(rowIndex); setModal(true); setUpdate(true)}} src={editIcon} className="td-img-ad-tables" alt="orange" />
                                )} style={{ width: '10%' }}></Column>
                            </DataTable>
                        </div>
                    )}
                </div>
            </div>
            {modal && (
                <div className="modal-ad">
                    <form>
                        <Stack spacing={4}>
                            <Stack direction={'row'}>
                                <h2 style={{margin:'0'}}>{update ? 'Update Table Info' : 'Add a Table'}</h2>
                                <Spacer/>
                                <CloseButton onClick={()=>{setModal(false); setUpdate(false);}}/>
                            </Stack>
                            <Input variant={'filled'} type="text" name="tableNo" value={table.tableNo} onChange={handleChange} placeholder="table no" required/>
                            <Input variant={'filled'} type="number" name="capacity" value={table.capacity} onChange={handleChange} min={2} max={10} placeholder="capacity 2-10" required/>
                            <Select variant={'filled'} name="location" value={table.location} onChange={handleChange} required>
                                <option value='dining area'>Dining Area</option>
                                <option value='private room'>Private Room</option>
                                <option value='patio'>Patio</option>
                                <option value='rooftop'>Rooftop</option>
                                <option value='garden'>Garden</option>
                                <option value='balcony'>Balcony</option>
                                <option value='courtyard'>Courtyard</option>
                                <option value='vip area'>VIP Area</option>
                            </Select>
                            <Stack direction='row' spacing={2}>
                                {update && <Button onClick={updateTable} bg={'#EFA500'}>Update</Button>}
                                {!update && <Button onClick={addTableData} bg={'#2AFF00'}>Add</Button>}
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
