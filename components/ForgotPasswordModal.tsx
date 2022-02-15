import React, { Dispatch, SetStateAction, useState } from 'react';
import { Formik, Form } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import ClipLoader from 'react-spinners/ClipLoader';
import Modal from './Modal';
import TextField from './TextField';
import { ForgotPasswordSchema } from '../lib/yup';
import { useForgotPasswordMutation } from '../generated/graphql';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ForgotPasswordModal: React.FC<Props> = ({ setIsModalOpen }) => {
  const [message, setMessage] = useState(
    'Enter the email address associated with your account and we will send you an email with further instructions on how to reset your password.'
  );
  const [
    sendForgotPasswordEmail,
    { data, loading, error },
  ] = useForgotPasswordMutation();

  let body: JSX.Element;

  if (data?.forgotPassword.success) {
    body = <p className='text-purple text-base -mt-2 mb-2'>{message}</p>;
  } else {
    body = (
      <>
        <p className='text-purple text-base -my-2'>{message}</p>
        <Formik
          // serverError is only used to create an error when the mutation was unsuccessful
          initialValues={{ email: '' }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            await sendForgotPasswordEmail({ variables: values });
            setMessage(
              `An email has been sent to ${values.email} with further instructions on how to change your password.`
            );
          }}
          validationSchema={ForgotPasswordSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, errors }) => (
            <Form className='flex flex-col gap-4'>
              {Object.keys(errors).length !== 0 && (
                <div className='-mt-2'>
                  {Object.values(errors).map((error, idx) => (
                    <p key={idx} className='text-red text-md'>
                      {error}
                    </p>
                  ))}
                </div>
              )}
              <TextField type='text' name='email' placeholder='email' />
              <motion.button
                type='submit'
                whileTap={{ scale: 0.95 }}
                className='text-white text-xl py-2 rounded-md border-2 border-gray bg-purple'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ClipLoader
                    color='#e4e6eb'
                    loading={isSubmitting}
                    size={16}
                  />
                ) : (
                  'Reset password'
                )}
              </motion.button>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      {/* <MdClose
        className='absolute top-3 right-3 w-8 h-8 text-white cursor-pointer'
        onClick={() => setIsModalOpen(false)}
      /> */}
      <h1 className='text-purple text-center text-4xl'>Squeeker</h1>
      <h1 className='text-white text-center text-2xl'>Reset your password</h1>
      {body}
    </Modal>
  );
};

export default ForgotPasswordModal;
