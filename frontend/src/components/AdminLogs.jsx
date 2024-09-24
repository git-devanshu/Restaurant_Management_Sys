import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminOptions.css';
import {Toaster, toast} from 'react-hot-toast';
import {RepeatIcon} from '@chakra-ui/icons';

export default function AdminLogs(){
    const [logs, setLogs] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/logs', {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then(res=>{
            if(res.data.status === 200){
                setLogs(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err=>{
            console.log(err);
            toast.error('Error fetching system logs');
        })
    }, [refresh]);

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    return(
        <div className='parent-ad'>
            <div style={{display:'flex', alignItems:'center'}}>
                <h1 style={{margin:'0 0 2px 0'}}>DASHBOARD</h1>
                <RepeatIcon h={6} w={6} m='5px' onClick={refreshData} _hover={{color:'gray', cursor:'pointer'}}/>
            </div>
            <pre style={{width:'90%', fontSize: '18px', overflow:'scroll', scrollbarWidth:'none', backgroundColor:'#00171F', color:'white', borderRadius:'10px', padding:'10px'}}>{logs}</pre>
            <Toaster/>
        </div>
    );
}
