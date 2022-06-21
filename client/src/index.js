import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { UserContextProvider } from './context/UserContext';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new GraphQLWsLink(createClient({
  url:'http://localhost:4000/graphql'
}));
const httpLink = createHttpLink({
  uri:'http://localhost:4000/graphql'
});
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('jwt');
  return {
    headers:{ 
      ...headers,
      authorization: token || ""
    }
  }
});
const splitLink = split(
  ({query}) => {
    const definiton = getMainDefinition(query);
    return (
      definiton.kind === 'OperationDefiniton' &&
      definiton.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink, 
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App/>
        </ApolloProvider>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);

