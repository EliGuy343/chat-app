import React from 'react';
import {Box, Divider, Typography} from '@mui/material';
import UserCard from './UserCard';
const SideBar = () => {
    const users = [
        {id:1,name:'Dick Jones'},
        {id:2,name:'Bill Johnson'},
        {id:3,name:'Harvey Miller'},
    ]
    return (
        <Box
            backgroundColor='#f7f7f7'
            height='100vh'
            maxWidth='350px'
            padding='10px'
        >
            <Typography variant='h6'>
                Chat
            </Typography>
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