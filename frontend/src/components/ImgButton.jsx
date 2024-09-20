import React from 'react';
import '../styles/ImgButton.css';

function ImgButton({photo, title, color, bgC, txtC, action}){
    return(
        <div>
            <button onClick={action} className='btn-main' style={{backgroundColor:`${bgC}`}}>
                <img src={photo} className={`button-img-${color}`}/>
                <p className='title-btn' style={{color:`${txtC}`}}>{title}</p>
            </button>
        </div>
    );
}

export default ImgButton;

/*
props : 
1. photo - the src link of photo
2. title - the name to be put in the button
3. color - icon color (accepted values : black, white, dark, blue, red, green, yellow, orange)
4. bgC - background color of the button (any value accepted rgb, hex, color name)
5. txtC - text/title color (any value accepted rgb, hex, color name)
6. action - function to be fired on clicking the button (accepts function expression not the function call)
*/