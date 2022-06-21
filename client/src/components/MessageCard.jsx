import React from 'react';
import {Box, Typography } from '@mui/material';
import './messageCard.css';

const MessageCard = ({text,date,direction}) => {
  return (
    <Box
        display='flex'
        justifyContent={direction}
        sx={{'margin':'5px'}}
    >
        <Box
        >
            <Typography
                 className={direction==='start' ? 'messageCard' 
                    :'messageCardSend'}
                variant='subtitle2'
                padding='5px'
            >
                {text}
            </Typography>
            <Typography
                variant='caption'
            >
                {new Date(date).toLocaleTimeString()}
            </Typography>
        </Box>
    </Box>
  );
}

export default MessageCard