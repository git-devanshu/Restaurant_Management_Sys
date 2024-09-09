import React from 'react'
import '../styles/login.css';
import { Input, Stack, InputGroup, InputLeftElement } from '@chakra-ui/react'

export default function Signup() {
    return (
        <div className='parent-lg'>
            <div className='lg-left'>
                    
            </div>
            <div className="lg-right">
                    
            </div>
            <div className='lg-form'>
                <h1>Signup</h1>
                <Stack spacing={3} style={{margin:'10px'}}>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <PhoneIcon color='gray.300' />
                        </InputLeftElement>
                        <Input type='tel' placeholder='Phone number' />
                    </InputGroup>
                </Stack>
            </div>
        </div>
    )
}
