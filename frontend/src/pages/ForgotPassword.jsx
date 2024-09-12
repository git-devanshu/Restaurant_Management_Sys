import React, {useState} from 'react'
import '../styles/login.css';
import { Input, Stack, InputGroup, InputLeftElement, Heading, Link, Button, Text, Image } from '@chakra-ui/react'
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import foodiesIcon from '../images/restaurant.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import vfcodeIcon from '../images/vfcode.png';

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [showDiv, setShowDiv] = useState(false);
    const [username, setUsername] = useState('');
    const [vfcode, setVfcode] = useState('');
    const [password, setPassword] = useState('');

    const verifyUser = (e) =>{
        e.preventDefault();
        if(username === ''){
            toast.error('Please enter your username!');
            return;
        }
        else if(username.length < 3 || username.length > 20){
            toast.error('Username must be 3 and 20 characters long!');
            return;
        }
        else{
            const toastId = toast.loading('Loading...');
            axios.put(`http://localhost:8000/user/forgot-password/${username}`)
            .then(res => {
                if(res.data.status === 200){
                    console.log('response 200 received');
                    toast(res.data.message, {id :toastId});
                    setShowDiv(true);
                }
                else{
                    toast.error(res.data.message, {id :toastId});
                }
            })
            .catch(err =>{
                console.log(err);
            });
        }
    }

    const resetPassword = (e) =>{
        e.preventDefault();
        if(!vfcode || password === ''){
            toast.error('All fields are required');
            return;
        }
        else if(password.length < 8 || password.length > 30){
            toast.error('Password must be 8 and 30 characters long!');
            return;
        }
        else{
            const toastId = toast.loading('Loggin in...');
            axios.put(`http://localhost:8000/user/reset-password/${username}`, {vfcode, password})
            .then(res =>{
                if(res.data.status === 202){
                    toast.success(res.data.message, {id :toastId});
                    setTimeout(()=>{
                        navigate('/login')
                    }, 2000);
                }
                else{
                    toast.error(res.data.message, {id :toastId});
                }
            })
            .catch(err =>{
                console.log(err);
            });
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
                    <Heading size='lg'>Be A Foodie</Heading>
                    <Text fontSize='lg' width='250px'>
                        Register now to avail the online 
                        facilities provided by the 
                        restaurant.
                    </Text>
                </Stack>
            </div>
            <form className='lg-form'>
                <h1 style={{marginTop:'20px'}}>Forgot Password</h1>
                {!showDiv && (
                    <Stack spacing={5} style={{margin:'40px'}}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <AtSignIcon color='gray.500' />
                            </InputLeftElement>
                            <Input type='text' placeholder='username' variant='filled' name='username' value={username} required maxLength={20} minLength={3} onChange={(e)=>setUsername(e.target.value)}/>
                        </InputGroup>
                        <Button 
                            onClick={verifyUser}
                            colorScheme='red' 
                            borderRadius='20px' 
                            width='140px' 
                            bg='#FF0000' 
                            _hover={{ bg: '#ea0000' }}
                            alignSelf='center'
                            margin={'10px'}>
                            Verify
                        </Button>
                    </Stack>
                )}
                {showDiv && (
                    <Stack spacing={5} style={{margin:'30px'}}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                {/* <AtSignIcon color='gray.500' /> */}
                                <Image
                                    boxSize='20px'
                                    objectFit='cover'
                                    src={vfcodeIcon}
                                    alt='Foodies'
                                    filter={'invert(35%)'}
                                />
                            </InputLeftElement>
                            <Input type='text' placeholder='verification code' variant='filled' name='vfcode' value={vfcode} required maxLength={6} minLength={6} onChange={(e)=>setVfcode(e.target.value)}/>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <LockIcon color='gray.500' />
                            </InputLeftElement>
                            <Input type='password' placeholder='new password' variant='filled' name='password' value={password} required maxLength={30} minLength={8} onChange={(e)=>setPassword(e.target.value)}/>
                        </InputGroup>
                        <Button 
                            onClick={resetPassword}
                            colorScheme='red' 
                            borderRadius='20px' 
                            width='140px' 
                            bg='#FF0000' 
                            _hover={{ bg: '#ea0000' }}
                            alignSelf='center'
                            margin={'10px'}>
                            Reset
                        </Button>
                    </Stack>
                )}
                
                <Text align={'center'}>
                    Try Login?{' '}
                    <Link color='blue.500' href='/login'>
                        Login
                    </Link>
                </Text>
            </form>
            <Toaster />
        </div>
    )
}
