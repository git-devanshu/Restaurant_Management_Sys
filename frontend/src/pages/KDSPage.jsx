import React, { useEffect, useState } from 'react';
import '../styles/AdminOptions.css';
import { Button, Spacer, Text, Avatar } from '@chakra-ui/react';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import refreshIcon from '../images/refresh.png';
import tableIcon from '../images/table-4.png';
import foodiesIcon from '../images/restaurant.png';
import ImgButton from '../components/ImgButton';
import approveIcon from '../images/approve.png';
import {logout, decodeToken} from '../utils/helperFunctions';
import { useNavigate } from 'react-router-dom';
import {getBaseUrl} from '../utils/helperFunctions';

export default function KDSPage(){
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [KDSData, setKDSData] = useState([]);

    useEffect(()=>{
        putUserInformation();
        fetchKDSData();
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

    const fetchKDSData = () =>{
        const token = sessionStorage.getItem('token');
        axios.get(getBaseUrl()+'/chef/kitchen', {headers : {
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
        });
    }

    const completeOrderCooking = (ind, kdsId, kotId, kotInd) =>{
        const token = sessionStorage.getItem('token');
        axios.put(getBaseUrl()+'/chef/kitchen', {
            id : kdsId,
            kotId : kotId,
            index : ind,
            kotIndex : kotInd
        }, {headers : {
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
            toast.error('Error fetching data');
        });
    }

    return (
        <div>
            <div className='kds-head'>
                <img src={foodiesIcon} style={{height:'30px', width:'30px', marginLeft:'10px', filter:'invert(16%) sepia(98%) saturate(6628%) hue-rotate(4deg) brightness(96%) contrast(124%)'}}/>
                <Text fontSize='20px' as='b' ml='10px' color='white'>Kitchen Display System (KDS)</Text>
                <Spacer/>
                <ImgButton action={refreshData} photo={refreshIcon} title='Refresh' color={'dark'} bgC={'white'} txtC={'#00171F'}/>
            </div>
            <div className="grid-kds">
                <div className="profile-mo">
                    <div className="inner-profile-mo">
                        <Avatar size='lg' bg='#ffea05' src='https://bit.ly/broken-link' />
                        <h3><strong>{userInfo.username}</strong></h3>
                        <h3>{userInfo.name}</h3>
                        <button onClick={()=>{logout(navigateToStaffLogin)}}>Logout</button>
                    </div>
                    <p>You are logged in as Chef. To change profile details, contact admin.</p>
                </div>
                <div className="kds-display">
                    {(!KDSData || KDSData.length === 0) && (
                        <Text fontSize='20px' ml='5px'>No Oders to cook</Text>
                    )}
                    {KDSData && KDSData.length > 0 && KDSData.map((kds, index)=>{
                        return(
                            <div className='kds-card-ad'>
                                <div style={{display:'flex', alignItems:'center', backgroundColor:'#EFA500', width:'100%'}}>
                                    <img src={tableIcon} style={{margin:'5px 5px 5px 10px'}} height='30px' width='30px'/>
                                    <Text fontSize='18px' as='b' ml='5px'>{kds.tableNo}</Text>
                                </div>
                                <div style={{height:'fit-content', maxHeight:'259px', padding:'5px', overflow:'scroll', scrollbarWidth:'none'}}>
                                    {kds.items?.length > 0 && kds.items.map((item, ind)=>{
                                        return(
                                            <div style={{display:'flex', alignItems:'center', borderBottom:'1px solid rgb(127, 127, 127)'}}>
                                                <div>
                                                    <Text fontSize='18px'>{item.itemName}</Text>
                                                    <Text color='rgb(120, 120, 120)'>x{item.qty}</Text>
                                                </div>
                                                <Spacer/>
                                                <Button bg='#2AFF00' onClick={()=>completeOrderCooking(ind, kds._id, kds.kotId, item.index)}>
                                                    <img src={approveIcon} height='20px' width='20px'/>
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div> 
                            </div>
                        )
                    })}
                </div>
            </div>
            <Toaster/>
        </div>
    );
}
