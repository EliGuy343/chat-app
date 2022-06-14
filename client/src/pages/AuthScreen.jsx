import React, { useState } from 'react'
import {
    Box,
    Stack,
    Typography,
    Button,
    TextField
} from '@mui/material';


const AuthScreen = () => {
    const [formData, setFormData] = useState({});
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
            component='form'
            onSubmit={handleSubmit}
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='80vh'
        >
            <Stack
                spacing={2}
                sx={{'width':'400px'}}
            >
                <Typography variant="h5">
                    Please Signup
                </Typography>
                <TextField
                    name='name'
                    label='Name'
                    variant='standard'
                    onChange={handleChange}
                />
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
                <TextField
                    type='password'
                    name='confrimPassword'
                    label='Confirm Password'
                    variant='standard'
                    onChange={handleChange}
                />
                <Button varaiant="outlined" type="submit">
                    Submit
                </Button>
            </Stack>
        </Box>
    );
}

export default AuthScreen