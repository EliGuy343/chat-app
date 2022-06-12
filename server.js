import { ApolloServer, gql} from "apollo-server";
import resolvers from "./resolvers/resolvers.js";
import typedefs from "./schema/typedefs.js";

const server = new ApolloServer({
    typedefs,
    resolvers,
});

server.listen().then(({url})=> {
    console.log(`server ready at ${url}`);
})