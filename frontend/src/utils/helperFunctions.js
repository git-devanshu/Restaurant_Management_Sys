import axios from 'axios';
import {toast} from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FoodiesIcon from '../images/restaurant.png';

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
        return h + ':' + min + " " + dd + '-' + (mm+1) + '-' + yy;
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
            console.log("Error logging out", err);
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
            break;
        case 1:
            return 'starter';
            break;
        case 2:
            return 'mains';
            break;
        case 3:
            return 'curry';
            break;
        case 4:
            return 'south indian';
            break;
        case 5:
            return 'italian';
            break;
        case 6:
            return 'chinese';
            break;
        case 7:
            return 'dessert';
            break;
        case 8:
            return 'beverage';
            break;
        case 9:
            return 'soup';
            break;
        case 10:
            return 'specials';
            break;
        case 11:
            return 'breakfast';
            break;
        case 12:
            return 'other';
            break;
    }
}

export const downloadBill = (order) => {
    const {_id, tableNo, items, totalPrice, orderTime, orderStatus, billStatus} = order;
    
    const billHtml = `
        <div id="bill" style="font-family: Arial, sans-serif; padding: 10px; width: 90%; margin: auto;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 10px;">
                <h1 style="margin: 0; color: #43BEE5">FOODIES</h1>
            </div>
            <div style="margin-top: 20px; font-size: 14px;">
                <p><strong>${_id}</strong></p>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <p style="margin:0"><strong>Table No:</strong></p>
                    <p style="margin:0">${tableNo}</p>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <p style="margin:0"><strong>Order Time:</strong></p>
                    <p style="margin:0">${orderTime}</p>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <p style="margin:0"><strong>Bill Status:</strong></p>
                    <p style="margin:0">${billStatus}</p>
                </div>
            </div>
            <table border="0" cellspacing="0" cellpadding="3" style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
                <thead style="background-color: gray; color: white">
                <tr>
                    <th style="text-align: left;">Item</th>
                    <th style="text-align: right;">Quantity</th>
                    <th style="text-align: right;">Price</th>
                    <th style="text-align: right;">Sub Total</th>
                </tr>
                </thead>
                <tbody>
                ${items.map(item => `
                    <tr style="border-bottom: 1px solid black">
                        <td style="text-align: left;">${item.name}</td>
                        <td style="text-align: right;">${item.qty}</td>
                        <td style="text-align: right;">${item.price.toFixed(2)}</td>
                        <td style="text-align: right;">${(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                `).join('')}
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="3" style="text-align: left; font-weight: bold;">Total Price:</td>
                    <td style="text-align: right; font-weight: bold;">${totalPrice.toFixed(2)}</td>
                </tr>
                </tfoot>
            </table>
        </div>
    `;

    const billWindow = window.open('', '', 'height=600,width=450');
    billWindow.document.write('<html><head><title>Bill</title></head><body>');
    billWindow.document.write(billHtml);
    billWindow.document.write('</body></html>');
    billWindow.document.close();

    billWindow.onload = () => {
        html2canvas(billWindow.document.body).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 10, 10);
            // pdf.save('bill.pdf');
            billWindow.close();
        });
    };
}
