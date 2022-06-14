import React from 'react';
import {Stack, Avatar, Typography} from '@mui/material';
import './userCard.css';
import { useNavigate } from 'react-router-dom';
const UserCard = ({user:{name,id}}) => {
    const navigate = useNavigate();

    return (
        <Stack
            className='userCard'
            direction='row'
            spacing={2}
            sx={{'py':'1px'}}
            alignItems='center'
            onClick={()=>navigate(`/${id}`)}
        >
            <Avatar
                src={`http://avatars.dicebear.com/api/initials/${name}.svg`}
                sx={{'width':'32px','height':'32px'}}
            />
            <Typography variant='subtitle2'>
                {name}
            </Typography>
        </Stack>
    );
}

export default UserCard;