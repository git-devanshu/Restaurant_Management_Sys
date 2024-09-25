import React, { useState } from 'react';
import axios from 'axios';
import '../styles/landingPage.css';
import { Input, Stack, InputGroup, InputLeftElement, Center, Image, Text, Button, Spacer, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import foodiesIcon from '../images/restaurant.png';
import heroSecImage from '../images/food/heroSecImage.png';
import tableIcon from '../images/table2.png';
import orderIcon from '../images/order-status.png';
import billIcon from '../images/bill1.png';
import fbIcon from '../images/facebook.png';
import instaIcon from '../images/instagram.png';
import xIcon from '../images/twitter.png';
import queues from '../images/time-left.png';
import orders from '../images/order-food.png';
import orderStatus from '../images/order-food (1).png';
import live from '../images/live.png';
import thaliImage from '../images/thali.jpg';
import southIndImage from '../images/south-indian.jpg';
import burgerImage from '../images/burger-combo.jpg';
import pizzaImage from '../images/pizza.jpg';
import noodlesImage from '../images/noodles.jpg';
import dessertImage from '../images/dessert.jpg';
import drinksImage from '../images/drinks.jpg';
import samosaImage from '../images/samosa-img.jpg';
import quoteIcon from '../images/quote.png';
import faster from '../images/faster.png';
import onlinesurvey from '../images/online-survey.png';
import userfriendly from '../images/user-friendly.png';
import visibility from '../images/visibility.png';
import { EmailIcon } from '@chakra-ui/icons'
import addressIcon from '../images/location.png';
import emailIcon from '../images/email.png';
import contactIcon from '../images/phone.png';
import {getCurrentDate, logout} from '../utils/helperFunctions';
import { Toaster, toast } from 'react-hot-toast';
import {getBaseUrl} from '../utils/helperFunctions';

export default function Home() {
    const navigate = useNavigate();
    const [review, setReview] = useState('');

    const navigateToLogin = () =>{
        navigate('/login');
    }

    const navigateToTableBooking = () =>{
        navigate('/book-table');
    }

    const navigateToOrderFood = (ind) =>{
        navigate(`/order-food/${ind}`);
    }

    const navigateToMyOrders = () =>{
        navigate('/my-orders');
    }

    const navigateToFAQs = () =>{
        navigate('/faq')
    }

    const handleChange = (e) =>{
        e.preventDefault();
        setReview(e.target.value);
    }

    const submitFeedback = () =>{
        const token = sessionStorage.getItem('token');
        axios.post(getBaseUrl()+'/customer/feedback', {review}, {headers : {
            'Authorization' : `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message);
                setReview('');
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error submitting feedback');
        })
    }

    return (
        <>
        <div className='parent-lp'>
            {/* Navbar in stack */}
            <Stack direction='horizontal' spacing={8} className='nav-lp'>
                <Center w='auto' h='40px' style={{marginLeft:'20px'}}>
                    <Image 
                        boxSize='40px'
                        objectFit='cover'
                        src={foodiesIcon}
                        alt='Foodies'
                        filter={'invert(16%) sepia(98%) saturate(6628%) hue-rotate(4deg) brightness(96%) contrast(124%)'}
                    />
                </Center>
                <Center w='auto' h='40px'>
                    <Text className='nav-lp-contact' fontSize='lg' color='white' _hover={{textDecoration:'underline'}} style={{cursor:'pointer'}}>Tables</Text>
                </Center>
                <Center w='auto' h='40px'>
                    <Text className='nav-lp-contact' fontSize='lg' color='white' _hover={{textDecoration:'underline'}} style={{cursor:'pointer'}}>Orders</Text>
                </Center>
                <Center w='auto' h='40px'>
                    <Text className='nav-lp-contact' fontSize='lg' color='white' _hover={{textDecoration:'underline'}} style={{cursor:'pointer'}}>Feedback</Text>
                </Center>
                <Center w='auto' h='40px'>
                    <Text onClick={navigateToFAQs} className='nav-lp-contact' fontSize='lg' color='white' _hover={{textDecoration:'underline'}} style={{cursor:'pointer'}}>FAQs</Text>
                </Center>
                <Spacer/>
                <Center w='auto' h='40px'>
                    <Button onClick={()=>logout(navigateToLogin)} w='100px' color='white' bg='transparent' border='2px' borderRadius='20px' borderColor='#ff0000' _hover={{bg:'#ff0000'}} variant='outline'>
                        Logout
                    </Button>
                </Center>
            </Stack>

            {/* Hero section */}
            <div className='grid-lp'>
                <div className="lp-left">
                    <Stack spacing={4}>
                        <Heading color='white' size='xl' as='i' fontSize={``} className='lp-head-1'>The best food for</Heading>
                        <Heading color='red' size='4xl' fontSize={``} as='b' className='lp-head-2' style={{fontFamily:'initial'}}>FOODIES</Heading>
                        <Text color='white' width='340px' fontSize='lg' style={{fontFamily:'serif'}}>
                            We serve the most delicious meals at best prices. Visit the nearest FOODIES restaurant in your city now.
                        </Text>
                        <Button onClick={navigateToMyOrders} w='120px' border='2px' borderColor='#ff0000' color='white' bg='#ff0000' borderRadius='20px' _hover={{bg:'transparent'}} style={{margin:'0'}}>
                            My Orders
                        </Button>
                    </Stack>
                </div>
                <div className="lp-right">
                    <img src={heroSecImage}/>
                </div>
            </div>
        </div>

        {/* Service info bar */}
        <div className="hp-service-info">
            <div style={{display:'grid', gridTemplateColumns:'1fr 3fr', placeItems:'center', marginTop:'25px', marginBottom:'25px'}}>
                <Image 
                    boxSize='40px'
                    objectFit='cover'
                    src={tableIcon}
                    alt='table reservation'
                    filter={'invert(16%)'}
                />
                <Text color='#222222' size='2xl' fontSize='25px'>Reserve Table</Text>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 3fr', placeItems:'center', marginTop:'25px', marginBottom:'25px'}}>
                <Image 
                    boxSize='40px'
                    objectFit='cover'
                    src={orderIcon}
                    alt='Order Food'
                    filter={'invert(16%)'}
                />
                <Text color='#222222' size='2xl' fontSize='25px'>Order Food</Text>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 3fr', placeItems:'center', marginTop:'25px', marginBottom:'25px'}}>
                <Image 
                    boxSize='40px'
                    objectFit='cover'
                    src={billIcon}
                    alt='Get bill'
                    filter={'invert(16%)'}
                />
                <Text color='#222222' size='2xl' fontSize='25px'>Get Your Bill</Text>
            </div>
        </div>

        {/* Reserve table */}
        <div className='hp-table-reserve'>
            <Center>
                <Text color='black' size='3xl' as='b' fontSize='40px'>Reserve Table</Text>
            </Center>
            <div className='hp-table-grid'>
                <Center>
                    <div className='hp-table-left'>
                        <div style={{height:'200px', width:'160px', display:'flex', flexDirection:'column', gap:'10px', justifyContent:'center', alignItems:'center', borderRadius:'10px', boxShadow:'0px 2px 8px black'}}>
                            <Image
                            boxSize='60px'
                            objectFit='cover'
                            src={live}
                            alt='live bookings'/>
                            <Text color='black' size='2xl' fontSize='20px'>Live Bookings</Text>
                            <p style={{color:'#222222', fontSize:'16px', width:'140px', textAlign:'center'}}>No worries about pre-bookings of tables.</p>
                        </div>
                        <div style={{height:'200px', width:'160px', display:'flex', flexDirection:'column', gap:'10px', justifyContent:'center', alignItems:'center', borderRadius:'10px', boxShadow:'0px 2px 8px black'}}>
                            <Image
                            boxSize='60px'
                            objectFit='cover'
                            src={queues}
                            alt='No long queues'/>
                            <Text color='black' size='2xl' fontSize='20px'>No long Queues</Text>
                            <p style={{color:'#222222', fontSize:'16px', width:'140px', textAlign:'center'}}>Get the table of your choice.</p>
                        </div>
                        <div style={{height:'200px', width:'160px', display:'flex', flexDirection:'column', gap:'10px', justifyContent:'center', alignItems:'center', borderRadius:'10px', boxShadow:'0px 2px 8px black'}}>
                            <Image
                            boxSize='60px'
                            objectFit='cover'
                            src={orders}
                            alt='manage orders'/>
                            <Text color='black' size='2xl' fontSize='20px'>Manage Orders</Text>
                            <p style={{color:'#222222', fontSize:'16px', width:'140px', textAlign:'center'}}>No waiting for a waiter to place the orders.</p>
                        </div>
                        <div style={{height:'200px', width:'160px', display:'flex', flexDirection:'column', gap:'10px', justifyContent:'center', alignItems:'center', borderRadius:'10px', boxShadow:'0px 2px 8px black'}}>
                            <Image
                            boxSize='60px'
                            objectFit='cover'
                            src={orderStatus}
                            alt='orders status'/>
                            <Text color='black' size='2xl' fontSize='20px'>Order Status</Text>
                            <p style={{color:'#222222', fontSize:'16px', width:'140px', textAlign:'center'}}>Keep track of all orders and issue your bill.</p>
                        </div>
                    </div>
                </Center>
                <div className='hp-table-right'>
                    <Heading color='black' size='2xl' fontSize='26px' as='b'>How to Book a Table ?</Heading>
                    <ul style={{fontSize:'20px', width:'350px', marginLeft:'20px'}}>
                        <li>Go to the table reservation menu</li>
                        <li>Pick an available table</li>
                        <li>Click reserve and until the request is approved</li>
                        <li>Do not try to book another table else the first will be unreserved</li>
                    </ul>
                    <Button onClick={navigateToTableBooking} w='140px' border='2px' borderColor='#ff0000' color='white' bg='#ff0000' borderRadius='20px' _hover={{bg:'#ee0000'}} style={{margin:'10px', marginTop:'20px'}}>
                        Book Table
                    </Button>
                </div>
            </div>
        </div>

        {/* Order food */}
        <div className='hp-order-food'>
            <div className='hp-food-categories'>
                <div>
                    <Text color='black' size='3xl' as='b' fontSize='40px'>Order Food</Text>
                    <p style={{color:'#222222', fontSize:'22px', width:'230px', textAlign:'left'}}>Browse food categories or check out our full menu</p>
                    <Button onClick={()=>navigateToOrderFood(1)} w='140px' border='2px' borderColor='#ff0000' color='white' bg='#ff0000' borderRadius='20px' _hover={{bg:'#ee0000'}} style={{marginTop:'10px'}}>
                        View Menu
                    </Button>
                </div>
                <div className="famous-order-hp">
                    <img src={thaliImage}/>
                    <h2>Indian Thali</h2>
                    <button onClick={()=>navigateToOrderFood(2)}>View</button>
                </div>
                <div className="famous-order-hp">
                    <img src={burgerImage}/>
                    <h2>Burger-Fries</h2>
                    <button onClick={()=>navigateToOrderFood(10)}>View</button>
                </div>
                <div className="famous-order-hp">
                    <img src={southIndImage}/>
                    <h2>South Indian</h2>
                    <button onClick={()=>navigateToOrderFood(4)}>View</button>
                </div>
                <div className="famous-order-hp">
                    <img src={pizzaImage}/>
                    <h2>Pizza</h2>
                    <button onClick={()=>navigateToOrderFood(5)}>View</button>
                </div>
                <div className="famous-order-hp">
                    <img src={noodlesImage}/>
                    <h2>Noodles</h2>
                    <button onClick={()=>navigateToOrderFood(6)}>View</button>
                </div>
                <div className="famous-order-hp">
                    <img src={dessertImage}/>
                    <h2>Dessert</h2>
                    <button onClick={()=>navigateToOrderFood(7)}>View</button>
                </div>
                <div className="famous-order-hp">
                    <img src={drinksImage}/>
                    <h2>Smoothies</h2>
                    <button onClick={()=>navigateToOrderFood(8)}>View</button>
                </div>
                <div className="famous-order-hp">
                    <img src={samosaImage}/>
                    <h2>Breakfast</h2>
                    <button onClick={()=>navigateToOrderFood(11)}>View</button>
                </div>
            </div>
        </div>

        {/* Customer feedback */}
        <div>
            <Center style={{marginBottom:'20px'}}>
                <Text color='black' size='3xl' as='b' fontSize='40px'>Customer Feedback</Text>
            </Center>
            <div className='hp-feedback-grid'>
                <div className='hp-feedback-dark-bg'>
                    <textarea value={review} onChange={handleChange} placeholder='Share your experience here' style={{padding:'10px'}}/>
                    <Button onClick={submitFeedback} w='140px' border='2px' borderColor='#ff0000' color='white' bg='#ff0000' borderRadius='20px' _hover={{bg:'#ee0000'}} style={{marginTop:'10px'}}>
                        Submit
                    </Button>
                </div>
                <div className='hp-feedback-right'>
                    <Heading color='black' size='2xl' fontSize='26px' as='b'>Where do we use your Feedbacks ?</Heading>
                    <ul style={{fontSize:'20px', width:'350px', marginLeft:'20px'}}>
                        <li>Your feedback is kept totally private</li>
                        <li>Only restaurant admin can read what you write</li>
                        <li>It helps us improve the facilities</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Quotes */}
        <div style={{backgroundColor: 'white', display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            <div className='hp-quote-card'>
                <div style={{backgroundColor:'#040316', height:'45px', width:'100%', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}}></div>
                <Image
                boxSize='60px'
                objectFit='quote'
                src={quoteIcon}
                alt='orders status'
                style={{margin:'10px'}}/>
                <h1 style={{color:'black', fontSize:'42px', marginLeft:'10px'}}>Life is uncertain, eat Dessert first.</h1>
                <h1 style={{color:'black', fontSize:'25px', margin:'15px'}}> - Ernestine Ulmer</h1>
            </div>
            <div className='hp-quote-card'>
                <div style={{backgroundColor:'#040316', height:'45px', width:'100%', borderTopLeftRadius:'15px', borderTopRightRadius:'15px'}}></div>
                <Image
                boxSize='60px'
                objectFit='quote'
                src={quoteIcon}
                alt='orders status'
                style={{margin:'10px'}}/>
                <h1 style={{color:'black', fontSize:'42px', marginLeft:'10px'}}>First we eat, then we do everything else.</h1>
                <h1 style={{color:'black', fontSize:'25px', margin:'15px'}}> - M.F.K. Fisher</h1>
            </div>
        </div>

        {/* Features */}
        <div className='hp-features'>
            <div style={{display:'grid', gridTemplateRows:'2fr 1fr 2fr', placeItems:'center'}}>
                <Image
                boxSize='70px'
                objectFit='cover'
                src={faster}
                alt='faster service'/>
                <Text color='black' as='b' size='2xl' fontSize='20px'>Faster Service</Text>
                <p style={{color:'#222222', fontSize:'16px', width:'150px', textAlign:'center'}}>Get all services efficiently and faster over internet.</p>
            </div>
            <div style={{display:'grid', gridTemplateRows:'2fr 1fr 2fr', placeItems:'center'}}>
                <Image
                boxSize='70px'
                objectFit='cover'
                src={visibility}
                alt='supervised'/>
                <Text color='black' as='b' size='2xl' fontSize='20px'>Supervised</Text>
                <p style={{color:'#222222', fontSize:'16px', width:'150px', textAlign:'center'}}>All the services are operated under admin’s supervision.</p>
            </div>
            <div style={{display:'grid', gridTemplateRows:'2fr 1fr 2fr', placeItems:'center'}}>
                <Image
                boxSize='70px'
                objectFit='cover'
                src={onlinesurvey}
                alt='Mobile support'/>
                <Text color='black' as='b' size='2xl' fontSize='20px'>Mobile Support</Text>
                <p style={{color:'#222222', fontSize:'16px', width:'150px', textAlign:'center'}}>Interface supported by smart phones for smart users.</p>
            </div>
            <div style={{display:'grid', gridTemplateRows:'2fr 1fr 2fr', placeItems:'center'}}>
                <Image
                boxSize='70px'
                objectFit='cover'
                src={userfriendly}
                alt='user friendly'/>
                <Text color='black' as='b' size='2xl' fontSize='20px'>User Friendly</Text>
                <p style={{color:'#222222', fontSize:'16px', width:'150px', textAlign:'center'}}>Easy for new users to understand.</p>
            </div>
        </div>

        {/* Footer */}
        <div className="hp-footer">
            <div className='hp-send-idea'>
                <div className='hp-idea-text'>
                    <Text color='black' as='b' size='2xl' fontSize='20px'>Have an Idea?</Text>  
                    <p style={{color:'#222222', fontSize:'16px'}}>Write it directly to the developers.</p>
                </div>
                <div>
                    <Text color='black' size='lg' fontSize='14px'>Send your idea at</Text>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <EmailIcon color='gray.500' />
                        </InputLeftElement>
                        <Input type='email' variant='filled' backgroundColor='red' color='black' value={'foodies.support@gmail.com'} width='300px' readOnly={true}/>
                    </InputGroup>
                </div>
            </div>
            <div className='footer-ep'>
                <div style={{display:'flex', gap:'10px'}}>
                    <Image 
                        boxSize='40px'
                        objectFit='cover'
                        src={foodiesIcon}
                        alt='Foodies'
                        filter={'invert(16%) sepia(98%) saturate(6628%) hue-rotate(4deg) brightness(96%) contrast(124%)'}
                    />
                    <h3>FOODIES</h3>
                </div>
                <div className='footer-link-div-ep'>
                    <div className='footer-about-ep'>
                        <h4>About</h4>
                        <p>The foodies is the best restaurant that serves wide variety of food. Online services are available through this site.</p>
                        <p>
                            <img src={instaIcon}/>
                            <img src={fbIcon}/>
                            <img src={xIcon}/>
                        </p>
                    </div>  
                    <div className='footer-contact-ep'>
                        <h4>Contact</h4>
                        <p><img src={contactIcon}/>+91 9876543210</p>
                        <p><img src={emailIcon}/>foodies.help@gmail.com</p>
                        <p><img src={addressIcon}/>Address of the restaurant, city</p>
                    </div>
                    <div className='footer-time-ep'>
                        <h4>Opening hours</h4>
                        <p>MON-FRI : 10am to 9pm</p>
                        <p>SAT : 2pm to 12pm</p>
                        <p>SUN : 9am to 11pm</p>
                    </div>
                </div>
                <div className='footer-cp-ep'>
                    Copyright &copy; {getCurrentDate(4)} Foodies
                </div>
            </div>
        </div>
        <Toaster/>
        </>
    )
}
