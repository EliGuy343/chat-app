import React from 'react';
import UserCard from './UserCard';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Box,
    Divider,
    Typography,
    Stack
} from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../graphql/queries';

const SideBar = () => {
    const {logout} = useContext(UserContext);
    const {loading, data, error} = useQuery(GET_ALL_USERS);
    console.log(data);
    if(loading) {
        return (
            <Typography variant='h6'>
                Loading Chat...
            </Typography>
        );
    }
    return (
        <Box
            backgroundColor='#f7f7f7'
            maxWidth='350px'
            padding='10px'
        >
            <Stack
                direction='row'
                justifyContent='space-between'
            >
                <Typography variant='h6'>Chat</Typography>
                <LogoutIcon 
                    sx={{'marginTop':'3px', 'cursor':'pointer'}} 
                    onClick={()=> {
                        localStorage.removeItem('jwt');
                        logout();
                    }}/>
            </Stack>
            <Divider/>
            {
                data.users.map(user=>(
                    <UserCard key={user.id} user={user}/>
                ))
            }
        </Box>
    )
}

export default SideBar;