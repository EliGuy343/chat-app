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
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri:'http://localhost:4000'
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('jwt');
  return {
    headers:{ 
      ...headers,
      authorization: token || ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(authLink.concat(httpLink))
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

