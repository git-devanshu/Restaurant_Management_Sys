import React, { useEffect, useState } from 'react';
import '../styles/OrderFood.css';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import {getCategoryName} from '../utils/helperFunctions';
import chineseIcon from '../images/food/chinese2.png';
import starterIcon from '../images/food/starter1.png';
import dosaIcon from '../images/food/dosa1.png';
import pizzaIcon from '../images/food/pizza1.png';
import mainsIcon from '../images/food/thali.png';
import curryIcon from '../images/food/curry1.png';
import dessertIcon from '../images/food/ice-cream4.png';
import drinkIcon from '../images/food/smoothie2.png';
import soupIcon from '../images/food/soup1.png';
import specialsIcon from '../images/food/fast-food1.png';
import breakfastIcon from '../images/food/samosa.png';
import otherIcon from '../images/food/other1.png';
import eggFoodIcon from '../images/egg-food-icon.png';
import vegFoodIcon from '../images/veg-food-icon.png';
import nonVegIcon from '../images/non-veg-icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import foodiesIcon from '../images/restaurant.png';
import { Button, Spacer } from '@chakra-ui/react';
import {getBaseUrl} from '../utils/helperFunctions';

export default function OrderFood(){
    const {category} = useParams();
    const navigate = useNavigate();

    const [selected, setSelected] = useState(parseInt(category, 10) || 1);
    const [orderList, setOrderList] = useState([]);
    const [fetchedData, setFetchedData] = useState([]);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get(getBaseUrl()+'/customer/order', {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                setFetchedData(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error Loading Menu');
        })
    }, []);

    useEffect(()=>{
        setData(fetchedData.filter(item => {return item.category === getCategoryName(selected)}));
    }, [fetchedData, selected]);

    useEffect(() => {
        if (category) {
          setSelected(parseInt(category));
        }
    }, [category]);

    const putItemInList = (index)=> {
        const item = data[index];
        setTotal(prevTotal => prevTotal + item.price);
        setOrderList(prevOrder => {
            const existingIndex = prevOrder.findIndex(m => m.itemName === item.itemName);
            if(existingIndex !== -1){
                return prevOrder.map((m, idx) => 
                    idx === existingIndex ? { ...m, qty: m.qty + 1 } : m
                );
            }
            else{
                return [...prevOrder, { itemName: item.itemName, price: item.price, qty: 1, status: 'pending', index : prevOrder.length }];
            }
        });
    };

    const placeOrder = () =>{
        if(orderList.length === 0){
            return;
        }
        const toastId = toast.loading('Placing Order...');
        const token = sessionStorage.getItem('token');
        axios.put(getBaseUrl()+'/customer/order', {orderList, total}, {headers : {
            Authorization : `Bearer ${token}`
        }})
        .then(res =>{
            if(res.data.status === 200){
                toast.success(res.data.message, {id: toastId});
                setTimeout(()=>{
                    navigate('/my-orders');
                }, 700);
            }
            else{
                toast.error(res.data.message, {id : toastId});
            }
        })
        .catch(err =>{
            console.log(err);
            toast.error('Error placing order', {id : toastId});
        })
    }

    const clearList = () =>{
        setOrderList([]);
        setTotal(0);
    }

    const navigateToHome = () =>{
        navigate('/home');
    }

    return(
        <div className='parent-of'>
            <div className='header-tbook'>
                <img src={foodiesIcon}/>
                <h3>FOODIES</h3>
                <Spacer/>
                <Button onClick={navigateToHome} w='100px' color='white' mr='10px' bg='transparent' border='2px' borderRadius='20px' borderColor='#ff0000' _hover={{bg:'#ff0000'}} variant='outline'>
                    Home
                </Button>
            </div>
            <div className="grid-of">
                <div className="main-of">
                    <div className="top-menu-of">
                        <div onClick={()=>{setSelected(1)}} className={selected === 1 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={starterIcon}/>
                            <h3>Starters</h3>
                        </div>
                        <div onClick={()=>{setSelected(2)}} className={selected === 2 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={mainsIcon}/>
                            <h3>Mains</h3>
                        </div>
                        <div onClick={()=>{setSelected(3)}} className={selected === 3 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={curryIcon}/>
                            <h3>Curry</h3>
                        </div>
                        <div onClick={()=>{setSelected(4)}} className={selected === 4 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={dosaIcon}/>
                            <h3>South</h3>
                        </div>
                        <div onClick={()=>{setSelected(5)}} className={selected === 5 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={pizzaIcon}/>
                            <h3>Italian</h3>
                        </div>
                        <div onClick={()=>{setSelected(6)}} className={selected === 6 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={chineseIcon}/>
                            <h3>Chinese</h3>
                        </div>
                        <div onClick={()=>{setSelected(7)}} className={selected === 7 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={dessertIcon}/>
                            <h3>Desserts</h3>
                        </div>
                        <div onClick={()=>{setSelected(8)}} className={selected === 8 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={drinkIcon}/>
                            <h3>Drinks</h3>
                        </div>
                        <div onClick={()=>{setSelected(9)}} className={selected === 9 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={soupIcon}/>
                            <h3>Soup</h3>
                        </div>
                        <div onClick={()=>{setSelected(10)}} className={selected === 10 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={specialsIcon}/>
                            <h3>Specials</h3>
                        </div>
                        <div onClick={()=>{setSelected(11)}} className={selected === 11 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={breakfastIcon}/>
                            <h3>Breakfast</h3>
                        </div>
                        <div onClick={()=>{setSelected(12)}} className={selected === 12 ? 'menu1-category-selected' : 'menu1-category-of'}>
                            <img src={otherIcon}/>
                            <h3>Others</h3>
                        </div>
                    </div>
                    <h1>{getCategoryName(selected).toUpperCase()}</h1>
                    <div className="menu-list-of">
                        {(!data || data.length === 0) && (
                            <div style={{fontSize:'18px', margin:'10px'}}>
                                No items available
                            </div>
                        )}
                        {data && data.map((item, index)=>{
                            return(
                                <div className='menu-item-of' onClick={()=>{putItemInList(index)}}>
                                    {item.type === 'egg food' && <img src={eggFoodIcon} />}
                                    {item.type === 'veg' && <img src={vegFoodIcon} />}
                                    {item.type === 'non veg' && <img src={nonVegIcon} />}
                                    <h4>{item.itemName}</h4>
                                    <p>&#x20B9; {item.price}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="side-of">
                    <h3>Order List</h3>
                    <div className='orders-of'>
                        {orderList && orderList.length !== 0 && orderList.map((item, index)=>{
                            return(
                                <div className="orders-list-of">
                                    <h2>{item.itemName}</h2>
                                    <div style={{display:'flex'}}>
                                        <p style={{flex:'2', textAlign:'left', marginLeft:'10px', color:'red'}}>&#x20B9; {item.price}</p>
                                        <p style={{flex:'1', textAlign:'right', marginRight:'10px', fontWeight:'600'}}>{item.qty}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='decision-div-of'>
                        <p>Total : &#x20B9; {total}</p>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <button onClick={placeOrder}>Place Order</button>
                            <button onClick={clearList}>Clear list</button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/ >
        </div>
    );
}