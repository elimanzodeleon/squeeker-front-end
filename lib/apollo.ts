import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          homePosts: relayStylePagination(),
          // this works with pagination
          // but each profile displays the same posts of the user whos profile was first cached
          userPosts: relayStylePagination(['username']),
        },
      },
    },
  }),
});

export default client;
