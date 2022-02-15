import React, { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import ClipLoader from 'react-spinners/ClipLoader';
import TextField from './TextField';
import { SignUpSchema } from '../lib/yup';
import { NextRouter } from 'next/router';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useRegisterMutation,
} from '../generated/graphql';
import Modal from './Modal';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  router: NextRouter;
}

const SignUpModal: React.FC<Props> = ({ setIsModalOpen, router }) => {
  const [signUp, { data, loading, error: gqlError }] = useRegisterMutation();

  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      {/* <MdClose
        className='absolute top-3 right-3 w-8 h-8 text-white cursor-pointer'
        onClick={() => setIsModalOpen(false)}
      /> */}
      <h1 className='text-purple text-center text-4xl'>Squeeker</h1>
      <h1 className='text-white text-xl'>New account</h1>
      <Formik
        // serverError is only used to create an error when the mutation was unsuccessful
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          serverError: '',
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const res = await signUp({
              variables: {
                username: values.username,
                email: values.email,
                password: values.password,
              },
              update: (cache, { data }) => {
                cache.writeQuery<CurrentUserQuery>({
                  query: CurrentUserDocument,
                  data: {
                    __typename: 'Query',
                    currentUser: data?.register.user,
                  },
                });
              },
            });
            if (!res.data?.register?.success) {
              // graphql req returned an error
              setErrors({ serverError: res.data?.register?.message });
            } else {
              router.push('/home');
            }
          } catch (err) {
            console.log(err.message);
          }
        }}
        validationSchema={SignUpSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting, errors }) => (
          <Form className='flex flex-col gap-4'>
            {Object.keys(errors).length !== 0 && (
              <div className='-mt-4'>
                {Object.values(errors).map((error, idx) => (
                  <p key={idx} className='text-red text-md'>
                    {error}
                  </p>
                ))}
              </div>
            )}
            <TextField type='text' name='username' placeholder='username' />
            <TextField type='text' name='email' placeholder='email' />
            <TextField type='password' name='password' placeholder='password' />
            <TextField
              type='password'
              name='confirmPassword'
              placeholder='confirm password'
            />
            <motion.button
              type='submit'
              whileTap={{ scale: 0.95 }}
              className='text-white text-xl py-2 rounded-md border-2 border-gray bg-purple'
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <ClipLoader color='#e4e6eb' loading={isSubmitting} size={16} />
              ) : (
                'Sign up'
              )}
            </motion.button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SignUpModal;
