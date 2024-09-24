import React, { useEffect, useState } from 'react';
import '../styles/AdminOptions.css';
import { Button, Stack, CloseButton, Spacer, Input, Text, Avatar, Badge, Divider } from '@chakra-ui/react';
import {RepeatIcon} from '@chakra-ui/icons';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import refreshIcon from '../images/refresh.png';
import deleteIcon from '../images/delete.png';
import addIcon from '../images/add2.png';
import tableIcon from '../images/table-4.png';
import ImgButton from './ImgButton';

export default function AdminKitchen() {
    const [chefData, setChefData] = useState([]);
    const [KDSData, setKDSData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);
    const [chef, setChef] = useState({
        name : '',
        username : '',
        password : '',
        email : '',
        age : 0,
        speciality : '',
    });

    useEffect(()=>{
        fetchChefData();
        fetchKDSData();
    }, [refresh]);

    const refreshData = () =>{
        setRefresh(!refresh);
        setModal(false);
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setChef({
            ...chef,
            [name] : value
        })
    }

    const clearForm = (e) =>{
        e.preventDefault();
        setChef({
            name : '',
            username : '',
            password : '',
            email : '',
            age : 0,
            speciality : '',
        });
    }

    const fetchChefData = () =>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/kitchen/chefs', {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setChefData(res.data.data);
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

    const fetchKDSData = () =>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/kitchen/kds-data', {headers : {
            'Authorization': `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setKDSData(res.data.data);
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

    const removeChef = (index) =>{
        const token = sessionStorage.getItem('token');
        const id = chefData[index]._id;
        axios.delete(`http://localhost:8000/admin/kitchen/${id}`, {headers : {
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
            toast.error('Error removing chef');
        })
    }

    const addChef = () =>{
        const token = sessionStorage.getItem('token');
        axios.post('http://localhost:8000/admin/kitchen', chef, {headers : {
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
            toast.error('Error adding chef');
        })
    }
    
    return (
        <div className='parent-ad' style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
            <div className="chef-div-ad">
                <h1>CHEFS & KITCHEN</h1>
                <div className="top-ad">
                    <ImgButton action={refreshData} photo={refreshIcon} title='Refresh' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                    <ImgButton action={()=>setModal(true)} photo={addIcon} title='Add Chef' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                </div>
                {(!chefData || chefData.length === 0) && (
                    <Text fontSize='18px' ml='10px'>No Chef data available</Text>
                )}
                {chefData && chefData.length > 0 && (
                    <div className="display-table">
                        <DataTable value={chefData} size={"small"} stripedRows removableSort scrollable scrollHeight="500px">
                            <Column field="name" header="Name" sortable style={{ width: '20%' }}></Column>
                            <Column field="email" header="Email" style={{ width: '25%' }}></Column>
                            <Column field="username" header="Username" sortable style={{ width: '15%' }}></Column>
                            <Column field="age" header="Age" sortable style={{ width: '10%' }}></Column>
                            <Column field="speciality" header="Speciality" style={{ width: '20%' }}></Column>
                            <Column header="Delete" body={(rowData, { rowIndex }) => (
                                <img src={deleteIcon} onClick={() =>removeChef(rowIndex)} className="td-img-ad-tables" alt="red" />
                            )} style={{ width: '10%' }}></Column>
                        </DataTable>
                    </div>
                )}
            </div>
            <div className="kds-div-ad">
                <h4>Kitchen Orders</h4>
                <div className='kds-display-ad'>
                    {(!KDSData || KDSData.length === 0) && (
                        <Text fontSize='18px' ml='5px'>No Oders being cooked in Kitchen now</Text>
                    )}
                    {KDSData && KDSData.length > 0 && KDSData.map((kds, index)=>{
                        return(
                            <div className='kds-card-ad'>
                                <div style={{display:'flex', alignItems:'center', backgroundColor:'#EFA500', width:'100%'}}>
                                    <img src={tableIcon} style={{margin:'5px 5px 5px 10px'}} height='30px' width='30px'/>
                                    <Text fontSize='18px' as='b' ml='5px'>{kds.tableNo}</Text>
                                </div>
                                <div style={{height:'fit-content', maxHeight:'259px', padding:'10px', overflow:'scroll', scrollbarWidth:'none'}}>
                                    {kds.items?.length > 0 && kds.items.map((item, ind)=>{
                                        return(
                                            <div>
                                                <Text fontSize='18px'>{item.itemName}</Text>
                                                <Text color='rgb(120, 120, 120)'>x{item.qty}</Text>
                                                <Divider/>
                                            </div>
                                        );
                                    })}
                                </div> 
                            </div>
                        )
                    })}
                </div>
            </div>
            {modal && (
                <div className="modal-ad">
                    <form>
                        <Stack spacing={4}>
                            <Stack direction={'row'}>
                                <h2 style={{margin:'0'}}>Add Chef</h2>
                                <Spacer/>
                                <CloseButton onClick={()=>setModal(false)}/>
                            </Stack>
                            <Input variant={'filled'} type="text" name="name" value={chef.name} onChange={handleChange} placeholder="Chef Name" required/>
                            <Input variant={'filled'} type="text" name="username" value={chef.username} onChange={handleChange} minLength={3} maxLength={20} placeholder="Username" required/>
                            <Input variant={'filled'} type="text" name="password" value={chef.password} onChange={handleChange} minLength={8} maxLength={30} placeholder="Password" required/>
                            <Input variant={'filled'} type="text" name="email" value={chef.email} onChange={handleChange} placeholder="Email" required/>
                            <Input variant={'filled'} type="number" name="age" value={chef.age} onChange={handleChange} min={18} max={100} placeholder="Age" required/>
                            <Input variant={'filled'} type="text" name="speciality" value={chef.speciality} onChange={handleChange} placeholder="Speciality" required/>
                            <Stack direction='row' spacing={2}>
                                <Button onClick={addChef} bg={'#2AFF00'}>Add</Button>
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
