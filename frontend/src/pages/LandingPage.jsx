import React from 'react';
import '../styles/landingPage.css';
import { Stack, Center, Image, Text, Button, Spacer, Heading, Circle } from '@chakra-ui/react'
import foodiesIcon from '../images/restaurant.png';
import heroSecImage from '../images/food/heroSecImage.png';
import fbIcon from '../images/facebook.png';
import instaIcon from '../images/instagram.png';
import xIcon from '../images/twitter.png';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    const navigateToLogin = () =>{
        navigate('/login');
    }

    const navigateToSignup = () =>{
        navigate('/signup');
    }

    const navigateToStaffLogin = () =>{
        navigate('/login/staff');
    }

    const navigateToFAQs = () =>{
        navigate('/faq')
    }

    return (
        <div className='parent-lp'>
            {/* Navbar in stack */}
            <div className='nav-lp'>
                <Center w='auto' h='40px'>
                    <Image 
                        boxSize='40px'
                        objectFit='cover'
                        src={foodiesIcon}
                        alt='Foodies'
                        filter={'invert(16%) sepia(98%) saturate(6628%) hue-rotate(4deg) brightness(96%) contrast(124%)'}
                    />
                </Center>
                <Center w='auto' h='40px'>
                    <Text onClick={navigateToStaffLogin} fontSize='lg' color='white' _hover={{textDecoration:'underline'}} style={{cursor:'pointer'}}>Staff Login</Text>
                </Center>
                <Center w='auto' h='40px'>
                    <Text onClick={navigateToFAQs} fontSize='lg' color='white' _hover={{textDecoration:'underline'}} style={{cursor:'pointer'}}>FAQs</Text>
                </Center>
                <Center w='auto' h='40px'>
                    <Text className='nav-lp-contact' fontSize='lg' color='white' _hover={{textDecoration:'underline'}} style={{cursor:'pointer'}}>Contact</Text>
                </Center>
                <Spacer/>
                <Center w='auto' h='40px'>
                    <Button onClick={navigateToSignup} w='100px' color='white' bg='transparent' border='2px' borderRadius='20px' borderColor='#ff0000' _hover={{bg:'#ff0000'}} variant='outline'>
                        Signup
                    </Button>
                </Center>
            </div>

            {/* Hero section */}
            <div className='grid-lp'>
                <div className="lp-left">
                    <Stack spacing={4}>
                        <Heading color='white' size='xl' as='i' fontSize={``} className='lp-head-1'>The best food for</Heading>
                        <Heading color='red' size='4xl' fontSize={``} as='b' className='lp-head-2' style={{fontFamily:'initial'}}>FOODIES</Heading>
                        <Text color='white' width='340px' fontSize='lg' style={{fontFamily:'serif'}}>
                            We serve the most delicious meals at best prices. Visit the nearest FOODIES restaurant in your city now.
                        </Text>
                        <Button onClick={navigateToLogin} w='100px' border='2px' borderColor='#ff0000' color='white' bg='#ff0000' borderRadius='20px' _hover={{bg:'transparent'}} style={{margin:'0'}}>
                            Login
                        </Button>
                    </Stack>
                </div>
                <div className="lp-right">
                    <img src={heroSecImage}/>
                </div>
            </div>

            {/* Social media Contats */}
            <Stack direction='horizontal' spacing={4} className='lp-contacts' >
                <Circle size='50px'>
                    <Image
                    boxSize='50px'
                    objectFit='cover'
                    src={fbIcon}
                    alt='Facebook'
                    filter='invert(30%)'/>
                </Circle>
                <Circle size='50px'>
                    <Image
                    boxSize='50px'
                    objectFit='cover'
                    src={instaIcon}
                    alt='Instagram'
                    filter='invert(30%)'/>
                </Circle>
                <Circle size='50px'>
                    <Image
                    boxSize='50px'
                    objectFit='cover'
                    src={xIcon}
                    alt='X'
                    filter='invert(30%)'/>
                </Circle>
            </Stack>
        </div>
    )
}
