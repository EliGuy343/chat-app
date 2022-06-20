import {gql} from '@apollo/client';

export const GET_ALL_USERS = gql`
    query getAllUsers {
        users {
            id
            name
            email
        }
    }
`
export const GET_MESSAGES = gql`
    query MessagesByUser($receiverId: Int!) {
        messagesByUser(receiverId: $receiverId) {
            id
            text
            receiverId
            senderId
            createdAt
        }
    }
`