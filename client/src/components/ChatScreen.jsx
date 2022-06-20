import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  TextField,
  Toolbar,
  Typography,
  Stack
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageCard from './MessageCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MESSAGES, GET_USER } from '../graphql/queries';
import { useEffect } from 'react';
import { SEND_MESSAGE } from '../graphql/mutations';
const ChatScreen = () => {
    const {id} = useParams();
    useEffect(() => {
      if(data)
        setMessages(data.messagesByUser);
    },[id])
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState();
    const {data:userData, loading:userLoading, error:userError} = useQuery(
      GET_USER,{ variables:{receiverId:+id}});
    const {data, loading , error} = useQuery(
        GET_MESSAGES,{variables:{receiverId:+id}, onCompleted(data) {
          setMessages(data.messagesByUser);
    }});
    const [sendMessage] = useMutation(SEND_MESSAGE, {
      onCompleted(data) {
        console.log(messages);
        setMessages([...messages,data.createMessage])
      }
    })
    return (
        <Box flexGrow={1}>
          {userLoading ? (
            <Box>
            <CircularProgress/>
            <Typography>
              Loading messages...
            </Typography>
          </Box>
          ) : <AppBar 
            position='static' 
            sx={{'background':'#f5f5f5', 'color':'black', 'boxShadow':0}}
            >
            <Toolbar>
              <Avatar
                src={`http://avatars.dicebear.com/api/initials/`
                  +`${userData.user.name}.svg`}
                sx={{'width':'32px','height':'32px','mr':'5px'}}
              />
              <Typography variant='h6' color='black'>
                {userData.user.name}
              </Typography>
            </Toolbar>
          </AppBar>}
          {(loading || userLoading) ? (
            <Box>
              <CircularProgress/>
              <Typography>
                Loading messages...
              </Typography>
            </Box>
          ) : (
          <Box backgroundColor='#e6e6e6' height='80vh' overflow='auto'>
            {messages.map(msg=>
              <MessageCard
                key={msg.createdAt} 
                text={msg.text} 
                date={msg.createdAt} 
                direction={msg.receiverId === +id ? 'end' : 'start'}
              />)
            }
          </Box>
          )}
          <Stack direction='row'>
            <TextField
              placeholder='Enter a Message'
              variant='outlined'
              background='#f5f5f5'
              fullWidth
              multiline
              rows={2}
              value={text}
              onKeyDown={(e)=>{
                if(e.key === 'Enter') {
                  setText('');
                  sendMessage({
                    variables:{
                      receiverId: +id,
                      text
                    }
                  });
                }
              }}
              onChange={e=>setText(e.target.value)}
            />
            <SendIcon fontSize='large' onClick={()=>{
              setText('');
              sendMessage({
                variables:{
                  receiverId: +id,
                  text
                }
              });
            }}/>
          </Stack>
        </Box>
  )
}

export default ChatScreen