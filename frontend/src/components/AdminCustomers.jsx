import React, { useEffect, useState } from "react";
import '../styles/AdminOptions.css';
import 'primereact/resources/themes/mira/theme.css';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import ImgButton from './ImgButton';
/* importing icons */
import refreshIcon from '../images/refresh.png';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import searchIcon from '../images/search.png';
import { Button, Stack, CloseButton, Spacer, Input } from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AdminCustomer(){
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState([]); //stores the fetched customer data
    const [user, setUser] = useState({
        id : '',
        name : '',
        email : '',
        username : ''
    });
    const [name, setName] = useState(''); //to search a customer by name
    const [search, setSearch] = useState(false); //display the search data when true
    const [srcData, setSrcData] = useState([]); //stores the data found in search
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/customers', {headers : {
            Authorization : `Bearer ${token}`
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
            toast.error('Error fetching customers');
        })
    }, [refresh]);

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
        setSearch(false);
        setSrcData([]);
        setName('');
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const clearForm = (e) =>{
        e.preventDefault();
        setUser({
            id : '',
            name : '',
            email : '',
            username : ''
        });
    }

    const setUserDetails = (index) =>{
        setModal(true);
        setUser({
            id : data[index]._id,
            name : data[index].name,
            email : data[index].email,
            username : data[index].username
        })
    }

    const searchCustomer = () =>{
        const results = data.filter(item => {return item.name === name});
        setSrcData(results);
        setSearch(true);
    }

    const removeCustomer = (index) =>{
        const token = sessionStorage.getItem('token');
        const id = data[index]._id;
        axios.delete(`http://localhost:8000/admin/customers/${id}`, {headers : {
            'Authorization' : `Bearer ${token}`
        }})
        .then(res => {
            if(res.data.status === 200){
                setRefresh(!refresh);
                toast.success(res.data.message);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Error deleting customer');
        })
    }

    const updateCustomer = (e) =>{
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        axios.put('http://localhost:8000/admin/customers', user, {headers : {
            'Authorization' : `Bearer ${token}`
        }})
        .then(res => {
            if(res.data.status === 200){
                setRefresh(!refresh);
                toast.success(res.data.message);
                setUser({
                    id : '',
                    name : '',
                    email : '',
                    username : ''
                });
                setModal(false);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Error updating customer');
        })
    }

    return(
        <div className='parent-ad'>
            <h1>CUSTOMERS</h1>
            <div className='grid-ad'>
                <div className="main-ad">
                    <div className="top-ad">
                        <ImgButton action={refreshData} photo={refreshIcon} title='Refresh' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                        <img src={searchIcon} style={{filter:'none'}} className="td-img-ad-tables"/>
                        <input name="name" value={name} onChange={(e)=>setName(e.target.value)} style={{height:'34px', border:'none', width: '200px', paddingLeft:'5px'}} className="top-fields" placeholder="search name"/>
                        <button onClick={searchCustomer} className="top-button">Search</button>
                    </div>
                    {!search && (
                        <div className="display-table">
                            <DataTable value={data} size={"small"} stripedRows removableSort scrollable scrollHeight="500px">
                                <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                                <Column field="email" header="Email" sortable style={{ width: '25%' }}></Column>
                                <Column field="username" header="Username" sortable style={{ width: '15%' }}></Column>
                                <Column field="bookingId" header="Booking Id" style={{ width: '20%' }}></Column>
                                <Column header="Delete" body={(rowData, { rowIndex }) => (
                                    <img src={deleteIcon} onClick={() => removeCustomer(rowIndex)} className="td-img-ad-tables" alt="red" />
                                )} style={{ width: '10%' }}></Column>
                                <Column header="Update" body={(rowData, { rowIndex }) => (
                                    <img onClick={() => setUserDetails(rowIndex)} src={editIcon} className="td-img-ad-tables" alt="orange" />
                                )} style={{ width: '10%' }}></Column>
                            </DataTable>
                        </div>
                    )}
                    {search && (
                        <DataTable value={srcData} size={"small"} stripedRows removableSort scrollable scrollHeight="400px">
                        <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
                        <Column field="email" header="Email" sortable style={{ width: '30%' }}></Column>
                        <Column field="username" header="Username" sortable style={{ width: '20%' }}></Column>
                        <Column field="bookingId" header="Booking Id" style={{ width: '25%' }}></Column>
                    </DataTable>
                    )}
                </div>
            </div>
            {modal && (
                <div className="modal-ad">
                    <form>
                        <Stack spacing={4}>
                            <Stack direction={'row'}>
                                <h2 style={{margin:'0'}}>Update Customer</h2>
                                <Spacer/>
                                <CloseButton color="white" onClick={()=>setModal(false)}/>
                            </Stack>
                            <Input variant={'filled'} type="text" name='name' value={user.name} onChange={handleChange} placeholder="name" required/>
                            <Input variant={'filled'} type="text" name='username' value={user.username} onChange={handleChange} placeholder="username" required/>
                            <Input variant={'filled'} type="text" name='email' value={user.email} onChange={handleChange} placeholder="email" required/>
                            <Stack direction='row' spacing={2}>
                                <Button onClick={updateCustomer} bg={'#EFA500'}>Update</Button>
                                <Button onClick={clearForm} bg={'#FF0000'}>Clear</Button>
                            </Stack>
                        </Stack>
                    </form>
                </div>
            )}
            <Toaster />
        </div>
    );
}