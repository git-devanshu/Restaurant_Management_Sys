import React from 'react';

const BillComponent = ({bill}) =>{
    return(
        <div id="billContent" style={{padding: '5px 20px 20px 20px'}}>
            <h2 style={{textAlign: 'center', margin:'0'}}>INVOICE</h2>
            <h1 style={{textAlign: 'center', margin:'0'}}>Foodies Restaurant</h1>
            <p style={{textAlign: 'center', borderBottom:'2px solid black', paddingBottom:'10px'}}><strong>{bill._id}</strong></p>
            <div style={{padding:'10px 10px 15px 10px', borderBottom:'2px solid black'}}>
              <p>Cust ID: {bill.custId}</p>
              <p>Table No: {bill.tableNo}</p>
              <p>Date: {bill.orderDate}, {bill.orderTime}</p>
            </div>
            <table style={{ width: '100%', border: 'none', marginTop: '5px' }}>
                <thead style={{borderBottom: '1px solid black'}}>
                    <tr>
                        <th style={{width: '15%', textAlign:'center', paddingBottom:'10px'}}>Sr no.</th>
                        <th style={{width: '60%', textAlign:'left', paddingBottom:'10px'}}>Item Name</th>
                        <th style={{width: '15%', textAlign:'center', paddingBottom:'10px'}}>Price</th>
                        <th style={{width: '10%', textAlign:'center', paddingBottom:'10px'}}>Qty.</th>
                    </tr>
                </thead>
                <tbody>
                    {bill.items?.map((item, index) => (
                        <tr key={index}>
                            <td style={{width: '15%', textAlign:'center'}}>{index + 1}</td>
                            <td style={{width: '60%'}}>{item.itemName}</td>
                            <td style={{width: '15%', textAlign:'center'}}>{item.price}</td>
                            <td style={{width: '10%', textAlign:'center'}}>{item.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{padding: '10px', marginTop:'10px', borderTop: '2px solid black', borderBottom: '2px solid black'}}>
                <h3><strong>Total: &#x20B9; {bill.totalPrice}</strong></h3>
            </div>
            <h3 style={{textAlign:'center'}}>Thank you, visit again...</h3>
        </div>
    );
};

export default BillComponent;