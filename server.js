import { ApolloServer, gql} from "apollo-server";
import crypto from 'crypto';

const users = [
    {
        id:1,
        name:"Ivan Denisovich",
        email:'IvanD15@gmail.com',
        password:'12345'
    },
    {
        id:2,
        name:"Joe Pisser",
        email:'JP@gmail.com',
        password:'12345'
    }
];

const Todos = [
    {
        userId:1,
        todo:'Die in the gulag'
    },
    {
        userId:2,
        todo:'Piss from roof'
    },
    {
        userId:2,
        todo:'Piss into fabric of reality'
    },
];

const typeDefs = gql`
    input UserInput {
        name:String!,
        email:String!,
        password:String!   
    }
    type User {
        id:ID
        name:String
        email:String
        todos:[Todo]
    }

    type Todo {
        todo:String,
        userId:ID
    }
    type Query {
        users:[User]
        user(id:ID!):User
    }
    type Mutation {
        createUser(newUser:UserInput!):User
    }
`

const resolvers = {
    Query:{
        users:() => users,
        user:(parent, {id}, {userLoggedIn}) => {
            if(!userLoggedIn)
                throw new Error("You are not logged in");
            return users.find(item => item.id == id);
        }
    },
    User:{
        todos:(parent)=>Todos.filter(todo=>todo.userId == parent.id)
    },
    Mutation:{
        createUser:(_,{newUser})=> {
            const createdUser ={
                id:crypto.randomUUID(),
                ...newUser
            };
            users.push(createdUser);
            return createdUser;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:{
        userLoggedIn:true
    },
});

server.listen().then(({url})=> {
    console.log(`server ready at ${url}`);
})