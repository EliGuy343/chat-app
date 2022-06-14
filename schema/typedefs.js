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
    scalar Date
    type Message {
        id:ID!
        text: String!
        receiverId:Int!
        senderId:Int!
        createdAt:Date!
    }
    type Query{
        users:[User]
        messagesByUser(receiverId:Int!):[Message]
    }
    type Mutation{
        signupUser(newUser:UserInput!):User
        signinUser(userSignin:UserSigninInput):Token
        createMessage(receiverId:Int!,text:String!):Message
    }
`;

export default typeDefs;
