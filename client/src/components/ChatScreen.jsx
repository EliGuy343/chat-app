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
import MessageCard from './MessageCard';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES, GET_USER } from '../graphql/queries';
import { useEffect } from 'react';
import { SEND_MESSAGE } from '../graphql/mutations';
import { MESSAGE_SUBSCRIPTION } from '../graphql/subscriptions';
const ChatScreen = () => {
  const {id} = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState();
  const {data:subData} = useSubscription(MESSAGE_SUBSCRIPTION,
    {onSubscriptionData(data) {
      console.log(data);
      setMessages((prevMessages)=>[...prevMessages,
        data.subscriptionData.data.messageAdded]);
    }}
  );
  
  useEffect(() => {
      if(data)
      setMessages(data.messagesByUser);
    },[id]);
    
    const {data:userData, loading:userLoading} = useQuery(
      GET_USER,{ variables:{receiverId:+id}});
      const {data, loading} = useQuery(
        GET_MESSAGES,{variables:{receiverId:+id}, onCompleted(data) {
          setMessages(data.messagesByUser);
        }});
        const [sendMessage] = useMutation(SEND_MESSAGE);
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
              rows={1}
              value={text}
              onKeyDown={(e)=>{
                if(e.key === 'Enter' && text && text.length > 0) {
                  sendMessage({
                    variables:{
                      receiverId: +id,
                      text
                    }
                  });
                  setText('');
                }
              }}
              onChange={e=>{
                console.log(e);
                debugger
                if(e.nativeEvent.inputType !== "insertLineBreak") 
                  setText(e.target.value);
              }}
            >
            </TextField>
          </Stack>
        </Box>
  );
}

export default ChatScreen