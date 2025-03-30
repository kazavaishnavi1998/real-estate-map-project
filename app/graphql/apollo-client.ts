import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.eng.meridiancapital.com/graphql',
  cache: new InMemoryCache(),
});

export default client;
