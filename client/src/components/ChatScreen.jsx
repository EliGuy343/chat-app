import React from 'react'
import { useParams } from 'react-router-dom'

const ChatScreen = () => {
    const {id} = useParams();

    return (
        <div>{id}</div>
  )
}

export default ChatScreen