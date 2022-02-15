import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import ClipLoader from 'react-spinners/ClipLoader';
import TextField from './TextField';
import { LogInSchema } from '../lib/yup';
import { NextRouter } from 'next/router';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLogInMutation,
} from '../generated/graphql';

interface Props {
  router: NextRouter;
}

const LogInForm: React.FC<Props> = ({ router }) => {
  const [login, { data, loading, error }] = useLogInMutation();
  return (
    <Formik
      // serverError is only used to create an error when the mutation was unsuccessful
      initialValues={{ username: '', password: '', serverError: '' }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const res = await login({
            variables: values,

            // once we have completed the 'login' mutation we run this update fn
            // so that our cache will get updated and we can update the UI
            // 'The update function is used to update the cache after a mutation occurs.
            //  It receives the result of the mutation (data) and the current cache (store) as arguments'
            update: (cache, { data }) => {
              // the 'data' arg above is the mutation response from the server, we are going to grab
              // the user from it and store it in the cache for the 'Me' query
              cache.writeQuery<CurrentUserQuery>({
                query: CurrentUserDocument,
                data: {
                  __typename: 'Query',
                  // we are setting the Me Query in the cache when a user logs in
                  currentUser: data?.login?.user,
                },
              });
            },
          });
          if (!res.data?.login?.success) {
            // error from server
            setErrors({ serverError: res.data?.login?.message });
          } else {
            router.push('/home');
          }
        } catch (err) {
          console.log(err);
        }
      }}
      validationSchema={LogInSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {/* formik uses the following render prop function */}
      {({ values, errors, isSubmitting }) => (
        <Form className='flex flex-col gap-4'>
          {data && !data.login?.success && (
            <p className='text-red text-md'>{data.login?.message}</p>
          )}
          <TextField
            type='text'
            name='username'
            placeholder='username'
            error={!!errors.username}
          />
          <TextField
            type='password'
            name='password'
            placeholder='password'
            error={!!errors.password}
          />
          <motion.button
            type='submit'
            whileTap={{ scale: 0.95 }}
            className='text-purple text-xl py-2 rounded-md border-2 border-purple'
            disabled={isSubmitting}
          >
            {isSubmitting || loading ? (
              <ClipLoader
                color='#bb86fc'
                loading={isSubmitting || loading}
                size={16}
              />
            ) : (
              'Log in'
            )}
          </motion.button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInForm;
