import React from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import MessageCard from './MessageCard';
const ChatScreen = () => {
    const {id,name} = useParams();

    return (
        <Box flexGrow={1}>
          <AppBar 
            position='static' 
            sx={{'background':'#f5f5f5', 'color':'black', 'boxShadow':0}}
            >
            <Toolbar>
              <Avatar
                src={`http://avatars.dicebear.com/api/initials/${name}.svg`}
                sx={{'width':'32px','height':'32px','mr':'5px'}}
              />
              <Typography variant='h6' color='black'>{name}</Typography>
            </Toolbar>
          </AppBar>
          <Box backgroundColor='#e6e6e6' height='80vh' overflow='auto'>
            <MessageCard text='test' date='25/7/2075' direction='start'/>
            <MessageCard text='test' date='25/7/2075' direction='end'/>
            <MessageCard text='test' date='25/7/2075' direction='start'/>
          </Box>
          <TextField
            placeholder='Enter a Message'
            variant='outlined'
            background='#f5f5f5'
            fullWidth
            multiline
            rows={2}
          />
        </Box>
  )
}

export default ChatScreen