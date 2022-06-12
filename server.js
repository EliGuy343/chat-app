import { ApolloServer, gql} from "apollo-server";
import resolvers from "./resolvers/resolvers.js";
import typeDefs from "./schema/typedefs.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({url})=> {
    console.log(`server ready at ${url}`);
});