import React, {useState} from 'react'
import '../styles/login.css';
import { Input, Stack, InputGroup, InputLeftElement, Center, Heading, Link, Button, ButtonGroup, Text, Image } from '@chakra-ui/react'
import { AtSignIcon, EmailIcon, LockIcon, InfoIcon } from '@chakra-ui/icons';
import foodiesIcon from '../images/restaurant.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import {checkEmailValidity} from '../utils/helperFunctions';

export default function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const registerUser = async (e)=>{
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
        else if(!checkEmailValidity(user.email)){
            toast.error("Enter a valid email id");
            return;
        }
        else{
            const toastId = toast.loading("Saving user...");
            await axios.post('http://localhost:8000/user/signup', user)
            .then(res => {
                if(res.data.status === 201){
                    toast.success(res.data.message, {id : toastId});
                    setTimeout(()=>{
                        navigate('/login');
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
                    <Heading size='lg'>Be A Foodie</Heading>
                    <Text fontSize='lg' width='250px'>
                        Register now to avail the online 
                        facilities provided by the 
                        restaurant.
                    </Text>
                </Stack>
            </div>
            <form className='lg-form'>
                <h1>Signup</h1>
                <Stack spacing={3} style={{margin:'30px'}}>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <InfoIcon color='gray.500' />
                        </InputLeftElement>
                        <Input type='text' placeholder='name' variant='filled' name='name' value={user.name} required onChange={handleChange}/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <AtSignIcon color='gray.500' />
                        </InputLeftElement>
                        <Input type='text' placeholder='username' variant='filled' name='username' value={user.username} required maxLength={20} minLength={3} onChange={handleChange}/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <EmailIcon color='gray.500' />
                        </InputLeftElement>
                        <Input type='email' placeholder='email' variant='filled' name='email' value={user.email} required onChange={handleChange}/>
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <LockIcon color='gray.500' />
                        </InputLeftElement>
                        <Input type='password' placeholder='password' variant='filled' name='password' value={user.password} required maxLength={30} minLength={8} onChange={handleChange}/>
                    </InputGroup>
                    <Button 
                        onClick={registerUser}
                        colorScheme='red' 
                        borderRadius='20px' 
                        width='140px' 
                        bg='#FF0000' 
                        _hover={{ bg: '#ea0000' }}
                        alignSelf='center'
                        margin={'10px'}>
                        Signup
                    </Button>
                </Stack>
                <Text align={'center'}>
                    Already a foodie?{' '}
                    <Link color='blue.500' href='/login'>
                        Login
                    </Link>
                </Text>
            </form>
            <Toaster />
        </div>
    );
}
