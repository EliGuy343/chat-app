import { ApolloServer, gql} from "apollo-server";

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
        email:'JP',
        password:'12345'
    }
]

const typeDefs = gql`
    type Query {
        users:[User]
        user(id:ID!):User
    }

    type User {
        id:ID
        name:String
        email:String
    }
`

const resolvers = {
    Query: {
        users:() => users,
        user:(parent, {id}, context) => {
            return users.find(item => item.id == id);
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=> {
    console.log(`server ready at ${url}`);
})