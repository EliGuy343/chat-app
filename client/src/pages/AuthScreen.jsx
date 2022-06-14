import React, { useState } from 'react'
import {
    Box,
    Stack,
    Typography,
    Button,
    TextField,
    Card
} from '@mui/material';
import { useRef } from 'react';


const AuthScreen = () => {
    const [formData, setFormData] = useState({});
    const [showLogin, setShowLogin] = useState(true);
    const form = useRef(null)
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Box
            ref={form}
            component='form'
            onSubmit={handleSubmit}
            display='flex'
            justifyContent='center'
            alignItems='center'
            textAlign='center'
            height='80vh'
        >
            <Card
                variant='outlined'
                sx={{'padding':'10px'}}
            >
                <Stack
                    spacing={2}
                    sx={{'width':'400px'}}
                    >
                    <Typography variant="h5">
                        {showLogin? 'Login' : 'Sign Up'}
                    </Typography>
                    {
                        !showLogin && <>
                            <TextField
                                name='name'
                                label='Name'
                                variant='standard'
                                onChange={handleChange}
                            />
                    </>
                    }
                    <TextField
                        type='email'
                        name='email'
                        label='Email'
                        variant='standard'
                        onChange={handleChange}
                    />
                    <TextField
                        type='password'
                        name='password'
                        label='Password'
                        variant='standard'
                        onChange={handleChange}
                    />
                    {
                        !showLogin && <>
                            <TextField
                                type='password'
                                name='confrimPassword'
                                label='Confirm Password'
                                variant='standard'
                                onChange={handleChange}
                            />
                        </>
                    }
                    <Button variant='contained' type="submit">
                        {showLogin ? 'Login' : 'Register'}
                    </Button>
                    <Button 
                        textAlign='center'
                        alignItems='center'
                        color='secondary'
                        variant='outlined'
                        size='small'
                        onClick={()=>{
                            setShowLogin(!showLogin);
                            setFormData({});
                            form.current.reset();
                        }}
                    >
                        {showLogin? 'Sign Up': 'Login'}
                    </Button>
                </Stack>
            </Card>
        </Box>
    );
}

export default AuthScreen