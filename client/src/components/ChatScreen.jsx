import React from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import MessageCard from './MessageCard';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
const ChatScreen = () => {
    const {id,name} = useParams();
    const {data, loading , error} = useQuery(GET_MESSAGES,{
      variables:{
        receiverId:+id
      }
    });
    console.log(data);
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
          {loading ? (
            <Box>
              <CircularProgress/>
              <Typography>
                Loading messages...
              </Typography>
            </Box>
          ) : (
          <Box backgroundColor='#e6e6e6' height='80vh' overflow='auto'>
            {data.messagesByUser.map(msg=>
              <MessageCard
                key={msg.createdAt} 
                text={msg.text} 
                date={msg.createdAt} 
                direction={msg.receiverId == +id ? 'end' : 'start'}
              />)
            }
          </Box>
          )}
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