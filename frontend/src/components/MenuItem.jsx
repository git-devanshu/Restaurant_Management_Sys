import React from "react";
import '../styles/MenuItem.css';

function MenuItem({image, action, name}){
    return(
        <div onClick={action} className="menu-item-parent">
            <img src={image}/>
            <h2>{name}</h2>
        </div>
    );
}

export default MenuItem;