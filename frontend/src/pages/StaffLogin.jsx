import React, {useState} from 'react'
import '../styles/login.css';
import { Input, Stack, InputGroup, InputLeftElement, Heading, Link, Button, Text, Image, Select } from '@chakra-ui/react'
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import foodiesIcon from '../images/restaurant.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import {checkAuthority} from '../utils/helperFunctions';
import {getBaseUrl} from '../utils/helperFunctions';

export default function StaffLogin() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: '',
        role: 'waiter'
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const loginUser = async (e)=>{
        e.preventDefault();
        if(!e.target.form.reportValidity()){
            return;
        }
        else if(user.username === "" || user.password === ""){
            toast.error("All fields are required");
        }
        else if(user.username.length < 3 || user.username.length > 20){
            toast.error("Username should be 3 to 20 characters long");
        }
        else if(user.password.length < 8 || user.password.length > 30){
            toast.error("Password should be 8 to 30 characters long");
        }
        else{
            const toastId = toast.loading(`Loggin in as ${user.role}...`);
            await axios.post(getBaseUrl()+'/staff/login', user)
            .then(res => {
                if(res.data.status === 202){
                    toast.success(res.data.message, {id : toastId});
                    sessionStorage.setItem('token', res.data.token);
                    setTimeout(()=>{
                        if(checkAuthority('admin')){
                            navigate('/admin-page');
                        }
                        else if(checkAuthority('chef')){
                            navigate('/chef-page');
                        }
                        else if(checkAuthority('waiter')){
                            navigate('/waiter-page');
                        }
                    }, 2000);
                }
                else{
                    toast.error(res.data.message, {id : toastId});
                }
            })
            .catch(err => {
                console.error(err);
            })
        }
    }

    return (
        <div className='parent-lg'>
            <div className='lg-left'></div>
            <div className="lg-right">
                <Stack spacing={3} style={{margin:'30px'}} >
                    <Stack direction='horizontal'>
                        <Image
                            boxSize='60px'
                            objectFit='cover'
                            src={foodiesIcon}
                            alt='Foodies'
                            filter={'invert(16%) sepia(98%) saturate(6628%) hue-rotate(4deg) brightness(96%) contrast(124%)'}
                        />
                        <h1 style={{fontSize:'40px', margin:'0', marginLeft:'10px', fontFamily:'serif', color:'red'}}>FOODIES</h1>
                    </Stack>
                    <Heading size='lg' textAlign='left'>Be A Foodie</Heading>
                    <Text fontSize='lg' width='250px'>
                        Register now to avail the online 
                        facilities provided by the 
                        restaurant.
                    </Text>
                </Stack>
            </div>
            <form className='lg-form'>
                <h1>Staff Login</h1>
                <Stack spacing={5} style={{margin:'30px'}}>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <AtSignIcon color='gray.500' />
                        </InputLeftElement>
                        <Input type='text' placeholder='username' variant='filled' name='username' value={user.username} required maxLength={20} minLength={3} onChange={handleChange}/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <LockIcon color='gray.500' />
                        </InputLeftElement>
                        <Input type='password' placeholder='password' variant='filled' name='password' value={user.password} required maxLength={30} minLength={8} onChange={handleChange}/>
                    </InputGroup>
                    <Select placeholder='Select Role' name='role' value={user.role} onChange={handleChange} variant='filled'>
                        <option value='waiter'>Waiter</option>
                        <option value='chef'>Chef</option>
                        <option value='admin'>Admin</option>
                    </Select>
                    <Text align={'center'}>
                        <Link color='blue.500' href='/forgot-password/staff'>
                            Forgot Password?
                        </Link>
                    </Text>
                    <Button 
                        onClick={loginUser}
                        colorScheme='red' 
                        borderRadius='20px' 
                        width='140px' 
                        bg='#FF0000' 
                        _hover={{ bg: '#ea0000' }}
                        alignSelf='center'
                        margin={'10px'}>
                        Login
                    </Button>
                </Stack>
            </form>
            <Toaster />
        </div>
    )
}
