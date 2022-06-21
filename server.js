import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './schema/typedefs.js';
import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';


const app = express();
const schema = makeExecutableSchema({typeDefs, resolvers});
const PORT = process.env.PORT || 4000
const apolloServer = new ApolloServer({schema, context:({req})=>{
    const authorization = req.headers.authorization;
    if(authorization){
        const {userId} = jwt.verify(authorization, process.env.JWT);
        return {userId};
    }
}});
await apolloServer.start()
apolloServer.applyMiddleware({app, path:'/graphql'});
const server = app.listen(PORT, () => {
    const wsServer = new WebSocketServer({
        server,
        path: '/graphql'
    });
    useServer({schema}, wsServer);
    console.log(`Server running on port ${PORT}`);
});
