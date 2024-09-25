import React, { useEffect, useState } from 'react';
import '../styles/AdminOptions.css';
import { Spacer, Text, Avatar, Divider } from '@chakra-ui/react';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import refreshIcon from '../images/refresh.png';
import foodiesIcon from '../images/restaurant.png';
import {logout, decodeToken} from '../utils/helperFunctions';
import { useNavigate } from 'react-router-dom';
import {getBaseUrl} from '../utils/helperFunctions';

export default function WaiterPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [waiterData, setWaiterData] = useState([]);

    useEffect(()=>{
        putUserInformation();
        fetchWaiterData();
    }, [refresh]);

    const navigateToStaffLogin = () =>{
        navigate('/login/staff');
    }

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    const putUserInformation = () =>{
        const token = sessionStorage.getItem('token');
        const user = decodeToken(token);
        if(user){
            setUserInfo({username : user.username, name: user.name});
        }
    }

    const fetchWaiterData = () =>{
        const token = sessionStorage.getItem('token');
        axios.get(getBaseUrl()+'/waiter/get-data', {headers : {
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
        });
    }

    return (
        <div>
            <div className='kds-head'>
                <img src={foodiesIcon} style={{height:'30px', width:'30px', marginLeft:'10px', filter:'invert(16%) sepia(98%) saturate(6628%) hue-rotate(4deg) brightness(96%) contrast(124%)'}}/>
                <h3>FOODIES</h3>
            </div>
            <div>
                <div className="profile-mo">
                    <div className="inner-profile-mo">
                        <Avatar size='lg' bg='#ffea05' src='https://bit.ly/broken-link' />
                        <h3><strong>{userInfo.username}</strong></h3>
                        <h3>{userInfo.name}</h3>
                        <button onClick={()=>{logout(navigateToStaffLogin)}}>Logout</button>
                    </div>
                    <p>You are logged in as Waiter. To change profile details, contact admin.</p>
                </div>
                <div style={{margin:'10px', padding:'10px', height:'auto', borderRadius:'14px', border:'1px solid rgb(127, 127, 127)', boxShadow:'0 2px 4px gray'}}>
                    <div style={{display:'flex', alignItems:'center', borderBottom:'1px solid rgb(127, 127, 127)'}}>
                        <Text fontSize='20px' as='b'>Tables Assigned</Text>
                        <Spacer/>
                        <button style={{border:'none'}} onClick={refreshData}>
                            <img src={refreshIcon} height='26px' width='26px' style={{margin:'0 auto'}}/>
                        </button>
                    </div>
                    {waiterData && waiterData.servingTable?.length > 0 && waiterData.servingTable.map((item, index)=>{
                        return(
                            <div key={index}>
                                <Text fontSize='20px' m='5px'>{item}</Text>
                                <Divider/>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Toaster/>
        </div>
    );
}
