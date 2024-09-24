import React from 'react';
import '../styles/AdminOptions.css';
import { useNavigate } from 'react-router-dom';
import foodiesIcon from '../images/restaurant.png';
import { Text, Button, Box, Spacer } from '@chakra-ui/react';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function FAQPage() {
    const navigate = useNavigate();

    const navigateToHome = () =>{
        navigate('/home');
    }

    return (
        <div>
            <div className='header-tbook'>
                <img src={foodiesIcon}/>
                <h3>FOODIES</h3>
                <Spacer/>
                <Button onClick={navigateToHome} w='100px' color='white' mr='10px' bg='transparent' border='2px' borderRadius='20px' borderColor='#ff0000' _hover={{bg:'#ff0000'}} variant='outline'>
                    Home
                </Button>
            </div>
            <div className='faq-section'>
                <div style={{padding:'10px'}}>
                    <Text fontSize='24px' m='10px'>Profile Related</Text>
                    <Accordion>
                        <AccordionTab header="I have lost my account's password, how can I reset it?">
                            <p className="m-0">
                                If you have lost your password, here are steps to reset it :<br/>
                                1. Go to login pages<br/>
                                2. Click on forgot password<br/>
                                3. Enter your username<br/>
                                4. A 6 digit verification code will be sent to your registered email id<br/>
                                5. Enter the verification code and new password, click on reset<br/>
                                6. Try to login with your new password
                            </p>
                        </AccordionTab>
                        <AccordionTab header="How can I change my other profile details?">
                            <p className="m-0">
                                To change the password of your account, go to forgot password to reset it.
                                To change your email id, contact the restaurant admin and get the details changed. Email cannot be changed from your side.
                                <strong>You cannot change the username</strong> of your account once it is created.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="What happens if I didn't log out of my account?">
                            <p className="m-0">
                                <strong>Your account is automatically logged out</strong> once you close the browser window. You won't ne logged out on minimizing the browser.
                            </p>
                        </AccordionTab>
                    </Accordion>
                    <Text fontSize='24px' m='10px'>Table Booking Related</Text>
                    <Accordion>
                        <AccordionTab header="How can I book a table?">
                            <p className="m-0">
                                Here are steps once you go to Table Reservation section :<br/>
                                1. From the graphical menu of tables, pick a free table<br/>
                                2. Click on book table and wait until your request is approved<br/>
                                3. You will receive a notification once the request is accepted is rejected.<br/>
                                Refrain from doing the following actions once your request is in process :<br/>
                                1. Do not click refresh button<br/>
                                2. Do not close the window<br/>
                                3. Do not navigate to other pages
                            </p>
                        </AccordionTab>
                        <AccordionTab header="Can I book multiple tables from same account?">
                            <p className="m-0">
                                No, you can book only one table per account. If you have successfully reserved a table and tried to book another, <strong>your previous booking will be lost once the new booking is approved.</strong>
                            </p>
                        </AccordionTab>
                        <AccordionTab header="What is the WL shown on the tables while booking a table?">
                            <p className="m-0">
                                The WL shown on the table booking graphical menu stands for <strong>Wait List</strong>. It shows the number of customers already waiting for that table.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="What can I do, if all the tables are booked?">
                            <p className="m-0">
                                Pick any table and put a booking request. Your request will be added to the waiting queue. 
                                Once admin approves your request, you will be notified. If you exit the menu amid your request is in process, 
                                you can check the status of your request from My Orders section. On successful reservation of table, you will receive a booking Id.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="Why is it taking too long for my request to get approved?">
                            <p className="m-0">
                                Your requests are manually approved or rejected by admin. If it is taking too long, it may be due to you are in a very long queue.
                                Your request cannot be approved before the table is vacated. In such cases, do not close the browser window. If you navigate to any other pages, 
                                your will not be notified but you can still check the status of your request from the My Orders section.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="Can I put reservation requests in the waitlist of more than one tables?">
                            <p className="m-0">
                                Yes, you can put the requests in the waitlist for more than one table. If any of your request gets approved 
                                by the admin, the table will be booked for you, <strong>But in such cases you should contact the admin to reject your other requests. If any request for another table is also approved by the admin, you will lose your previous bookings.</strong>
                            </p>
                        </AccordionTab>
                        <AccordionTab header="Is my booking lost if I am logged out of my account?">
                            <p className="m-0">
                                No, your booking is not lost even if you are logged out. You can log in again to see the booking and place orders.
                            </p>
                        </AccordionTab>
                    </Accordion>
                    <Text fontSize='24px' m='10px'>Orders Related</Text>
                    <Accordion>
                        <AccordionTab header="Can I place orders before booking a table?">
                            <p className="m-0">
                                No, you can't place orders without booking a table. After successful reservation of a table, you will receive a booking Id under which all your oders will be placed.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="How can I check the status of my orders?">
                            <p className="m-0">
                                Once you have placed orders, go to My Orders section and you will see a list of all the food items you have ordered.
                                The status of these items will be shown infront of them.<br/>
                                Your order will go through three stages : <strong>Pending {'->'} Preparing {'->'} Ready</strong><br/>
                                Pending shows that order is not yet sent to the kitchen, Preparing shows that order is being cooked and Ready means the order is ready to serve.<br/>
                                Keep on refreshing the page to see the updates.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="Can I put multiple items in the same order">
                            <p className="m-0">
                                Yes, you can put multiple food items in the same order and you can put multiple such orders. Till your bill is not marked paid
                                you can add as many number of orders as you want. Once your bill is marked paid, your booking Id will no longer be available for adding orders.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="I have placed orders but the items from my order list are removed, why is it so?">
                            <p className="m-0">
                                If the items from your order list disappear, it means they are <strong>rejected by the admin and cannot be cooked now. </strong>
                                If the orders are accepted, the status of your order will change.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="How can I download the bill for my orders?">
                            <p className="m-0">
                                Once all your orders are approved (there are no pending orders), before the admin marks your bill paid, you can go to the My Orders section and 
                                click on the Issue Bill button to download your bill. <strong>You should not download the bill if you have any pending orders. </strong>
                                If any of the orders are rejected further, your bill will still have that item, considering downloading the bill again in such cases.
                            </p>
                        </AccordionTab>
                    </Accordion>
                </div>
                <div className="faq-title">
                    <h2>FAQs</h2>
                    <p>For any further queries, write to foodies.help@gmail.com</p>
                </div>
            </div>
        </div>
    );
}
