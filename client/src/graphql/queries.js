import {gql} from '@apollo/client';

export const GET_ALL_USERS = gql`
    query getAllUsers($nameQuery: String) {
        users(nameQuery: $nameQuery) {
            id
            name
            email
        }
    }
`;
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
`;
export const GET_USER = gql`
    query User($receiverId: Int!) {
        user(receiverId: $receiverId) {
            id
            name
            email
        }
    }
`;