import {gql} from '@apollo/client';

export const SIGNUP_USER = gql`
    mutation SignupUser($newUser: UserInput!) {
        signupUser(newUser: $newUser) {
            id
            name
            email
        }
    }
`

export const LOGIN_USER = gql`
    mutation Mutation($userSignin: UserSigninInput) {
        signinUser(userSignin: $userSignin) {
            token
        }
    }
`
export const SEND_MESSAGE = gql`
    mutation CreateMessage($receiverId: Int!, $text: String!) {
        createMessage(receiverId: $receiverId, text: $text) {
            id
            text
            receiverId
            senderId
            createdAt
        }
    }
`