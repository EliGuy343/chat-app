import React from 'react';
import {Stack, Avatar, Typography} from '@mui/material';

const UserCard = ({user:{name,id}}) => {
    return (
        <Stack
            direction='row'
            spacing={2}
            sx={{'py':'1px'}}
            alignItems='center'
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