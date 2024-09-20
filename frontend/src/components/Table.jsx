import React, { act, useEffect, useState } from 'react'
import '../styles/Table.css';
import { Stack } from '@chakra-ui/react';

export default function Table({capacity, waitlist, status, tableNo, index, selected, action}) {
    const [oneSide, setOneSide] = useState(2);

    useEffect(()=>{
        if(capacity % 2 == 0){
            setOneSide(capacity / 2);
        }
        else{
            setOneSide((capacity - 1) / 2);
        }
    }, [capacity]);

    return (
        <div className='parent-table' onClick={()=>{action(index)}}>
            {capacity % 2 !== 0 && (
                <div className='side-table'>
                    <div className={selected ? 'side-seat-table-selected' : 'side-seat-table'}></div>
                </div>
            )}
            <div>
                <div className="seating-table">
                    {Array.from({length : oneSide}).map((_, ind) => (
                        <div key={ind} className={selected ? 'upper-seat-table-selected' : 'upper-seat-table'}></div>
                    ))}
                </div>
                <div className={selected ? "table-main-selected" : "table-main"}>
                    <Stack direction={'row'}>
                        <div className={`status-${status}`}></div>
                        <div>
                            <h6>{tableNo}</h6>
                            <p>WL {waitlist}</p>
                        </div>
                    </Stack>
                </div>
                <div className="seating-table">
                    {Array.from({length : oneSide}).map((_, index) => (
                        <div key={index} className={selected ? 'lower-seat-table-selected' : 'lower-seat-table'}></div>
                    ))}
                </div>
            </div>
        </div>
    )
}
