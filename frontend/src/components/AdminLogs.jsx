import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminOptions.css';
import {Toaster, toast} from 'react-hot-toast';
import {RepeatIcon} from '@chakra-ui/icons';
import {getBaseUrl} from '../utils/helperFunctions';

export default function AdminLogs(){
    const [logs, setLogs] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get(getBaseUrl()+'/admin/logs', {headers : {
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
                <h1 style={{margin:'0 0 2px 0'}}>LOGIN HISTORY</h1>
                <RepeatIcon h={6} w={6} m='5px' onClick={refreshData} _hover={{color:'gray', cursor:'pointer'}}/>
            </div>
            <div style={{width:'90%', height:'90vh', overflow:'scroll', scrollbarWidth:'none', backgroundColor:'#00171F', borderRadius:'10px', padding:'10px'}}>
                {logs && logs.length > 0 && logs.map((log, index)=>{
                    return(
                        <div key={index} style={{color:'white', fontFamily:'monospace'}}>
                            <p>{log.timeStamp} : {log.username} {' '} {log.privilege} {' '} {log.id}</p>
                        </div>
                    )
                })}
            </div>
            <Toaster/>
        </div>
    );
}
