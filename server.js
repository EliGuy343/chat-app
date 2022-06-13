import { ApolloServer, gql} from "apollo-server";
import resolvers from "./resolvers/resolvers.js";
import typeDefs from "./schema/typedefs.js";
import jwt from 'jsonwebtoken';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection:true,
    context:({req})=>{
        const authorization = req.headers.authorization;
        if(authorization){
            const {userId} = jwt.verify(authorization, process.env.JWT);
            return {userId};
        }
    }
});

server.listen().then(({url})=> {
    console.log(`server ready at ${url}`);
});