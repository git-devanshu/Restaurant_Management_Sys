import React from "react";
import notfoundIcon from '../images/404.png';

function PageNotFound(){
    return(
        <div style={{display:'grid', placeItems:'center', margin:'20px'}}>
            <div style={{display:'flex', width:'300px'}}>
                <div style={{flex:'2', display:'grid', placeItems:'center'}}>
                    <h1 style={{fontSize:'50px', color:'red', margin:'0px'}}>404</h1>
                    <p style={{fontSize:'20px', textAlign:'center'}}><b>PAGE NOT FOUND</b></p>
                </div>
                <div style={{flex:'1', display:'grid', placeItems:'center'}}>
                    <img src={notfoundIcon} style={{width:'auto', height:'180px'}}/>
                </div>
            </div>
            <p style={{margin:'10px', fontSize:'16px', color:'gray'}}>Looks like you're out of the restaurant !</p>
        </div>
    );
}

export default PageNotFound;