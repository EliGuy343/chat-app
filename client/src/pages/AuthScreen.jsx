import React, { useState } from 'react'
import {
    Box,
    Stack,
    Typography,
    Button,
    TextField,
    Card,
    CircularProgress,
    Alert
} from '@mui/material';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/mutations';


const AuthScreen = () => {
    const [formData, setFormData] = useState({});
    const [showLogin, setShowLogin] = useState(true);
    const form = useRef(null)
    const [
        signupUser,
        {data:signupData,loading:LoadingSignup,error:signupError}
    ] = useMutation(SIGNUP_USER);

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };
    
    const handleSubmit = (e) =>{
        debugger;
        e.preventDefault();
        if(showLogin) {
            //sign in user
        } 
        else {
            signupUser({
                variables:{
                    newUser:{
                        name:formData.name,
                        email:formData.email,
                        password:formData.password
                    }
                }
            })
        }
    };
    if(LoadingSignup) {
        return (
            <Box>
                <CircularProgress/>
                <Typography variant='h6'>Authenticating...</Typography>
            </Box>
        )
    }
    console.log(signupError);
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
                    {signupData && 
                    <Alert severity='success'>
                        Sign Up Complete
                    </Alert>}
                    {signupError &&
                    <Alert severity='error'>
                        {signupError.message}
                    </Alert>}
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

export default AuthScreen;