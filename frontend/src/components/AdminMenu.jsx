import React, { useEffect, useState } from "react";
import '../styles/AdminOptions.css';
import axios from 'axios';
import {Toaster, toast} from 'react-hot-toast';
import ImgButton from './ImgButton';
import MenuItem from "./MenuItem";
import {getCategoryName} from '../utils/helperFunctions';
/* importing icons */
import refreshIcon from '../images/refresh.png';
import backIcon from '../images/previous.png';
import deleteIcon from '../images/delete.png';
import chineseIcon from '../images/food/noodles-food.png';
import starterIcon from '../images/food/starter-food.png';
import dosaIcon from '../images/food/masala-dosa.png';
import pizzaIcon from '../images/food/pizza-slice.png';
import mainsIcon from '../images/food/main-dish.png';
import curryIcon from '../images/food/curry-bowl.png';
import dessertIcon from '../images/food/dessert-food.png';
import drinkIcon from '../images/food/soft-drink.png';
import soupIcon from '../images/food/soup-bowl.png';
import specialsIcon from '../images/food/burger-fries.png';
import breakfastIcon from '../images/food/sandwich.png';
import otherIcon from '../images/food/other-food.png';
import { Button, Stack, CloseButton, Spacer, Input, Select, Text, Badge } from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function AdminMenu(){
    const [refresh, setRefresh] = useState(false);
    const [fetchedData, setFetchedData] = useState([]); //data fetched from DB
    const [data, setData] = useState([]); //data to be displayed
    const [category, setCategory] = useState(0);
    const [categoryName, setCategoryName] = useState('food menu');
    const [item, setItem] = useState({
        name : '',
        price : '',
        type : 'veg',
        category : 'starter'
    });

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/admin/menu', {headers : {
            'Authorization' : `Bearer ${token}`
        }})
        .then(res => {
            if(res.data.status === 200){
                setFetchedData(res.data.data);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Error fetching data');
        })
    }, [refresh]);

    useEffect(()=>{
        setRefresh(!refresh);
        setCategoryName(getCategoryName(category));
    }, [category]);

    useEffect(()=>{
        if(category !== 0){
            const results = fetchedData.filter(item => {return item.category === categoryName});
            setData(results);
        }
    }, [fetchedData]);

    const refreshData = (e) =>{
        e.preventDefault();
        setRefresh(!refresh);
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setItem({
            ...item,
            [name] : value
        })
    };

    const clearForm = (e) =>{
        e.preventDefault();
        setItem({
            name : '',
            price : '',
            type : 'veg',
            category : 'starter'
        });
    }

    const addItem = (e) =>{
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        axios.post('http://localhost:8000/admin/menu', item, {headers : {
            'Authorization' : `Bearer ${token}`
        }})
        .then(res => {
            if(res.data.status === 200){
                setRefresh(!refresh);
                toast.success(res.data.message);
                setItem({
                    ...item,
                    name : '',
                    price : '',
                    type : 'veg'
                });
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Error adding item');
        })
    }

    const removeItem = (index) =>{
        const token = sessionStorage.getItem('token');
        const itemId = data[index]._id;
        axios.delete(`http://localhost:8000/admin/menu/${itemId}`, {headers : {
            'Authorization' : `Bearer ${token}`
        }})
        .then(res => {
            if(res.data.status === 200){
                setRefresh(!refresh);
                toast.success(res.data.message);
            }
            else{
                toast.error(res.data.message);
            }
        })
        .catch(err => {
            console.log(err);
            toast.error('Error deleting item');
        })
    }

    return(
        <div className='parent-ad'>
            <h1>{getCategoryName(category).toUpperCase()}</h1>
            <div className='grid-ad-menu'>
                <div className="main-ad">
                    {category === 0 && (
                        <div className="menu-display-ad">
                            <MenuItem action={()=>{setCategory(1)}} image={starterIcon} name={'Starters'}/>
                            <MenuItem action={()=>{setCategory(2)}} image={mainsIcon} name={'Mains'}/>
                            <MenuItem action={()=>{setCategory(3)}} image={curryIcon} name={'Curry'}/>
                            <MenuItem action={()=>{setCategory(4)}} image={dosaIcon} name={'South Indian'}/>
                            <MenuItem action={()=>{setCategory(5)}} image={pizzaIcon} name={'Italian'}/>
                            <MenuItem action={()=>{setCategory(6)}} image={chineseIcon} name={'Chinese'}/>
                            <MenuItem action={()=>{setCategory(7)}} image={dessertIcon} name={'Desserts'}/>
                            <MenuItem action={()=>{setCategory(8)}} image={drinkIcon} name={'Beverages'}/>
                            <MenuItem action={()=>{setCategory(9)}} image={soupIcon} name={'Soup'}/>
                            <MenuItem action={()=>{setCategory(10)}} image={specialsIcon} name={'Specials'}/>
                            <MenuItem action={()=>{setCategory(11)}} image={breakfastIcon} name={'Breakfast'}/>
                            <MenuItem action={()=>{setCategory(12)}} image={otherIcon} name={'Other'}/>
                        </div>
                    )}
                    {category !== 0 && (
                        <div className="main-ad">
                            <div className="top-ad">
                                <ImgButton action={()=>setCategory(0)} photo={backIcon} title={'Back'} color={'white'} bgC={'#00171F'} txtC={'white'}/>
                                <ImgButton action={refreshData} photo={refreshIcon} title='Refresh' color={'white'} bgC={'#00171F'} txtC={'white'}/>
                            </div>
                            {(!data || data.length === 0) && 
                                <Text fontSize='20px' size='xl'>No food items available</Text>
                            }
                            {data && data.length !== 0 && (
                                <div className="display-table">
                                    <DataTable value={data} size={"small"} stripedRows removableSort scrollable scrollHeight="500px">
                                        <Column field="itemName" header="Item Name" sortable style={{ width: '40%' }}></Column>
                                        <Column field="price" header="Price" sortable style={{ width: '25%' }}></Column>
                                        <Column field="type" header="Type" sortable style={{ width: '25%' }}></Column>
                                        <Column header="Delete" body={(rowData, { rowIndex }) => (
                                            <img src={deleteIcon} onClick={()=>removeItem(rowIndex)} className="td-img-ad-tables" alt="red" />
                                        )} style={{ width: '10%' }}></Column>
                                    </DataTable>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="side-ad-menu">
                    <form>
                        <Stack spacing={4}>
                            <Stack direction={'row'}>
                                <h2 style={{margin:'0'}}>Add an Item</h2>
                            </Stack>
                            <Input variant={'filled'} type="text" name="name" value={item.name} onChange={handleChange} placeholder="item name" required/>
                            <Input variant={'filled'} type="number" name="price" value={item.price} onChange={handleChange} placeholder="price" required/>
                            <Select variant={'filled'} name="type" value={item.type} onChange={handleChange} required>
                                <option value='veg'>Veg</option>
                                <option value='egg food'>Egg Food</option>
                                <option value='non veg'>Non Veg</option>
                            </Select>
                            <Select variant={'filled'} name="category" value={item.category} onChange={handleChange} required>
                                <option value='starter'>Starters</option>
                                <option value='mains'>Mains</option>
                                <option value='curry'>Curry</option>
                                <option value='south indian'>South Indian</option>
                                <option value='italian'>Italian</option>
                                <option value='chinese'>Chinese</option>
                                <option value='dessert'>Dessert</option>
                                <option value='beverage'>Beverages</option>
                                <option value='soup'>Soup</option>
                                <option value='specials'>Specials</option>
                                <option value='breakfast'>Break-fast</option>
                                <option value='other'>Others</option>
                            </Select>
                            <Stack direction='row' spacing={2}>
                                <Button onClick={addItem} style={{backgroundColor:'#2AFF00'}}>Add</Button>
                                <Button onClick={clearForm} style={{backgroundColor:'#FF0000'}}>Clear</Button>
                            </Stack>
                        </Stack>
                    </form>
                </div>
            </div>
            <Toaster/>
        </div>
    );
}
