import { gql } from "apollo-server";

const typeDefs = gql`
    input UserInput {
        name:String!,
        email:String!,
        password:String!   
    }
    input UserSigninInput {
        email:String!,
        password:String!
    }
    type Token {
        token:String!
    }
    type User {
        id:ID
        name:String
        email:String
    }
    type Query {
        users:[User]
        user(id:ID!):User
    }
    type Mutation {
        signupUser(newUser:UserInput!):User
        signinUser(userSignin:UserSigninInput):Token
    }
`;

export default typeDefs;
