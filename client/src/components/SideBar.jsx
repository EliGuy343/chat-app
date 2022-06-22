import React from 'react';
import UserCard from './UserCard';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Box,
    Divider,
    Typography,
    Stack,
    TextField
} from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import { useState } from 'react';
import { useEffect } from 'react';

const SideBar = () => {
    const client = useApolloClient();
    const [nameSearch, setNameSearch] = useState('');
    useEffect(()=>{
        if(nameSearch)
            refetch({
                'nameQuery':nameSearch
            })
    },[nameSearch]);
    const {logout} = useContext(UserContext);
    const {loading, data, error, refetch} = useQuery(GET_ALL_USERS, {
        fetchPolicy:'no-cache'
    });
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
            overflow='auto'
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
                        client.resetStore();
                        logout();
                    }}/>
            </Stack>
            <Divider sx={{bgcolor:'#000000'}}/>
            <Stack 
                justifyContent='space-between'
                alignItems='center'
                textAlign='center'
            >
                <TextField 
                    rows={1} 
                    placeholder='Search Users'
                    sx={{'marginTop':'10px', 'marginBottom':'3px'}}
                    onChange={e=>setNameSearch(e.target.value)}

                />
            </Stack>
            {data && data.users &&
                data.users.map(user=>(
                    <UserCard key={user.id} user={user}/>
                ))
            }
        </Box>
    );
}

export default SideBar;