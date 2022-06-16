import {gql} from '@apollo/client';

export const SIGNUP_USER = gql`
    mutation SignupUser($newUser: UserInput!) {
        signupUser(newUser: $newUser) {
        id
        name
        email
    }
}`;
