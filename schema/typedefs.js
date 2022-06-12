import { gql } from "apollo-server";

const typedefs = gql`
    input UserInput {
        name:String!,
        email:String!,
        password:String!   
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
    }
`;

export default typedefs;
