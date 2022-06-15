import React from 'react';
import UserCard from './UserCard';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Box,
    Divider,
    Typography,
    Stack
} from '@mui/material';

const SideBar = () => {
    const users = [
        {id:1,name:'Dick Jones'},
        {id:2,name:'Bill Johnson'},
        {id:3,name:'Harvey Miller'},
    ]
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
                <LogoutIcon sx={{'marginTop':'3px'}}/>
            </Stack>
            <Divider/>
            {
                users.map(user=>(
                    <UserCard key={user.id} user={user}/>
                ))
            }
        </Box>
    )
}

export default SideBar;