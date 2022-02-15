import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ChangePasswordMutationResponse = MutationResponse & {
  __typename?: 'ChangePasswordMutationResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  passwordChanged: Scalars['Boolean'];
  success: Scalars['Boolean'];
};

/** following 3 types are used for paginated queries */
export type Edge = {
  __typename?: 'Edge';
  cursor: Scalars['String'];
  node: Post;
};

export type ForgotPasswordMutationResponse = MutationResponse & {
  __typename?: 'ForgotPasswordMutationResponse';
  code: Scalars['Int'];
  email: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordMutationResponse;
  createPost: PostMutationResponse;
  deletePost: PostMutationResponse;
  forgotPassword: ForgotPasswordMutationResponse;
  login: UserMutationResponse;
  logout: Scalars['Boolean'];
  register: UserMutationResponse;
  updatePost: PostMutationResponse;
  votePost?: Maybe<PostMutationResponse>;
};


/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type MutationCreatePostArgs = {
  text: Scalars['String'];
};


/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
};


/** update mutations to return a new type -> MutationResponse{code,status,message,[...rest]} */
export type MutationVotePostArgs = {
  postId: Scalars['ID'];
  value: Scalars['Int'];
};

export type MutationResponse = {
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  points: Scalars['Int'];
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
  voteStatus: VoteStatus;
};

export type PostMutationResponse = MutationResponse & {
  __typename?: 'PostMutationResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  edges: Array<Maybe<Edge>>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  /** client will use 'me' query to keep user session alive (since session cookie is http only and cannot be read on the client) */
  currentUser?: Maybe<User>;
  /**
   * allPosts is a TEST query and should be deleted
   * i am using it to figure out if i can access this query in the cache
   * since i cant't access the posts query that uses pagination in the cache
   */
  homePosts: PostsResponse;
  post?: Maybe<Post>;
  /** get user info (for now its just display username we really need for the profile but in the future we may need things like following, followers, etc) */
  user?: Maybe<User>;
  userPosts: PostsResponse;
};


export type QueryHomePostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  displayUsername: Scalars['String'];
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export enum VoteStatus {
  DownVote = 'DOWN_VOTE',
  NoVote = 'NO_VOTE',
  UpVote = 'UP_VOTE'
}

export type PostSnippetFragment = { __typename?: 'Post', id: string, createdAt?: string | null | undefined, text: string, points: number, voteStatus: VoteStatus, user: { __typename?: 'User', id: string, username: string, displayUsername: string } };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string, displayUsername: string };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordMutationResponse', code: number, success: boolean, message: string, passwordChanged: boolean } };

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: string, text: string, points: number, createdAt?: string | null | undefined, voteStatus: VoteStatus, user: { __typename?: 'User', id: string, username: string, displayUsername: string } } | null | undefined } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: string } | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordMutationResponse', code: number, success: boolean, message: string, email: string } };

export type LogInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string, displayUsername: string } | null | undefined } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string, displayUsername: string } | null | undefined } };

export type VotePostMutationVariables = Exact<{
  postId: Scalars['ID'];
  value: Scalars['Int'];
}>;


export type VotePostMutation = { __typename?: 'Mutation', votePost?: { __typename?: 'PostMutationResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: string, text: string, points: number, createdAt?: string | null | undefined, voteStatus: VoteStatus, user: { __typename?: 'User', id: string, username: string, displayUsername: string } } | null | undefined } | null | undefined };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, username: string, displayUsername: string } | null | undefined };

export type HomePostsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type HomePostsQuery = { __typename?: 'Query', homePosts: { __typename?: 'PostsResponse', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'Edge', cursor: string, node: { __typename?: 'Post', id: string, createdAt?: string | null | undefined, text: string, points: number, voteStatus: VoteStatus, user: { __typename?: 'User', id: string, username: string, displayUsername: string } } } | null | undefined> } };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, displayUsername: string } | null | undefined };

export type UserPostsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type UserPostsQuery = { __typename?: 'Query', userPosts: { __typename?: 'PostsResponse', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'Edge', cursor: string, node: { __typename?: 'Post', id: string, createdAt?: string | null | undefined, text: string, points: number, voteStatus: VoteStatus, user: { __typename?: 'User', id: string, username: string, displayUsername: string } } } | null | undefined> } };

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  text
  points
  voteStatus
  user {
    id
    username
    displayUsername
  }
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  displayUsername
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(token: $token, password: $password) {
    code
    success
    message
    passwordChanged
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($text: String!) {
  createPost(text: $text) {
    code
    success
    message
    post {
      id
      text
      points
      createdAt
      voteStatus
      user {
        ...RegularUser
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    code
    success
    message
    post {
      id
    }
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    code
    success
    message
    email
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    code
    success
    message
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logout
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    code
    success
    message
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const VotePostDocument = gql`
    mutation VotePost($postId: ID!, $value: Int!) {
  votePost(postId: $postId, value: $value) {
    code
    success
    message
    post {
      id
      text
      points
      createdAt
      voteStatus
      user {
        ...RegularUser
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type VotePostMutationFn = Apollo.MutationFunction<VotePostMutation, VotePostMutationVariables>;

/**
 * __useVotePostMutation__
 *
 * To run a mutation, you first call `useVotePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVotePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [votePostMutation, { data, loading, error }] = useVotePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVotePostMutation(baseOptions?: Apollo.MutationHookOptions<VotePostMutation, VotePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VotePostMutation, VotePostMutationVariables>(VotePostDocument, options);
      }
export type VotePostMutationHookResult = ReturnType<typeof useVotePostMutation>;
export type VotePostMutationResult = Apollo.MutationResult<VotePostMutation>;
export type VotePostMutationOptions = Apollo.BaseMutationOptions<VotePostMutation, VotePostMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const HomePostsDocument = gql`
    query HomePosts($first: Int!, $after: String) {
  homePosts(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...PostSnippet
      }
      cursor
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useHomePostsQuery__
 *
 * To run a query within a React component, call `useHomePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useHomePostsQuery(baseOptions: Apollo.QueryHookOptions<HomePostsQuery, HomePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePostsQuery, HomePostsQueryVariables>(HomePostsDocument, options);
      }
export function useHomePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePostsQuery, HomePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePostsQuery, HomePostsQueryVariables>(HomePostsDocument, options);
        }
export type HomePostsQueryHookResult = ReturnType<typeof useHomePostsQuery>;
export type HomePostsLazyQueryHookResult = ReturnType<typeof useHomePostsLazyQuery>;
export type HomePostsQueryResult = Apollo.QueryResult<HomePostsQuery, HomePostsQueryVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserPostsDocument = gql`
    query UserPosts($first: Int!, $after: String, $username: String) {
  userPosts(first: $first, after: $after, username: $username) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...PostSnippet
      }
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useUserPostsQuery__
 *
 * To run a query within a React component, call `useUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserPostsQuery(baseOptions: Apollo.QueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, options);
      }
export function useUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPostsQuery, UserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPostsQuery, UserPostsQueryVariables>(UserPostsDocument, options);
        }
export type UserPostsQueryHookResult = ReturnType<typeof useUserPostsQuery>;
export type UserPostsLazyQueryHookResult = ReturnType<typeof useUserPostsLazyQuery>;
export type UserPostsQueryResult = Apollo.QueryResult<UserPostsQuery, UserPostsQueryVariables>;