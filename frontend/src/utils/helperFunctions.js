import axios from 'axios';
import {toast} from 'react-hot-toast';

//checks if the email is in valid format
export function checkEmailValidity(email){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const isValid = emailPattern.test(email); 
    return isValid;
}

//decodes the token, extracts the payload from it and returns the payload else null
//call this function after checking the presence of token
export function decodeToken(token) {
    try {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64URL to Base64
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload); // Parse JSON payload
    } 
    catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}

//gets the token from the session storage and decodes it. Checks if the token privilege 
//with the required one. Returns true if authorized else returns false 
export function checkAuthority(privilege){
    const token = sessionStorage.getItem('token');
    if(token){
        const decodedToken = decodeToken(token);
        if(decodedToken && decodedToken.privilege === privilege){
            return true;
        }
        return false;
    }
    return false;
}

//function to get the current date in different formats
/*
type values : 
1 - DD-MM-YYYY
2 - DD M_name, YYYY
3 - D_name DD M_name, YYYY
4 - YYYY
5 - hh:mm dd-mm-yy
else - YYYY-MM-DD
*/
export function getCurrentDate(type){
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth();
    var m_name = date.toLocaleString('default', {month : 'long'});
    var yy = date.getFullYear();
    var d_name = date.toLocaleString('default', {weekday : 'long'});
    var h = date.getHours();
    var min = date.getMinutes();

    if(type === 1){
        return dd + '-' + (mm+1) + '-' + yy;
    }
    else if(type === 2){
        return dd + ' ' + m_name + ', ' + yy;
    }
    else if(type === 3){
        return d_name + ' ' + dd + ' ' + m_name + ', ' + yy;
    }
    else if(type === 4){
        return yy;
    }
    else if(type === 5){
        return h.toString(10).padStart(2, '0') + ':' + min.toString(10).padStart(2, '0');
    }
    else{
        return yy + '-' + (mm+1) + '-' + dd;
    }
}

//function to logout from the profile that takes a navigating function as a parameter
export function logout(navigate){
    const token = sessionStorage.getItem('token');
    if(token){
        const toastId = toast.loading('Logging out...');
        axios.post('http://localhost:8000/user/logout',{}, { headers: {
            Authorization : `Bearer ${token}`,
        }})
        .then(res => {
            if(res.data.status === 200){
                sessionStorage.removeItem('token');
                toast.success(res.data.message, {id : toastId});
                setTimeout(()=>{
                    navigate();
                }, 2000);
            }
            else{
                toast.error(res.data.message, {id : toastId});
            }
        })
        .catch(err => {
            console.log(err);
            toast.error("Error logging out", {id : toastId});
        })
    }
    else{
        toast('You are already logged out')
        console.log('You are already logged out');
    }
}

//get the name of category of food items in menu
export const getCategoryName = (index) =>{
    switch(index){
        case 0:
            return 'food menu';
        case 1:
            return 'starter';
        case 2:
            return 'mains';
        case 3:
            return 'curry';
        case 4:
            return 'south indian';
        case 5:
            return 'italian';
        case 6:
            return 'chinese';
        case 7:
            return 'dessert';
        case 8:
            return 'beverage';
        case 9:
            return 'soup';
        case 10:
            return 'specials';
        case 11:
            return 'breakfast';
        case 12:
            return 'other';
    }
}