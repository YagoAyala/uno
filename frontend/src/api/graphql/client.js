import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const GRAPHQL_URI =
  process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4000/graphql';

const httpLink = createHttpLink({ uri: GRAPHQL_URI });

const authLink = setContext((_, { headers }) => ({
  headers: { ...headers },
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => console.error(message));
  }
  if (networkError) {
    console.error(networkError);
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache({ addTypename: false }),
});
