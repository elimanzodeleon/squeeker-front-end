import { useState } from 'react';
import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import TextField from '../../components/TextField';
import { ChangePasswordSchema } from '../../lib/yup';
import { useChangePasswordMutation } from '../../generated/graphql';

const ChangePassword = () => {
  const [message, setMessage] = useState(
    'New password must contain an uppercase letter, lowercase letter,number, and be at least 8 characters long'
  );
  const [
    changePassword,
    { data, loading, error },
  ] = useChangePasswordMutation();
  const router = useRouter();
  const { resetPasswordToken } = router.query;
  console.log(resetPasswordToken);

  // default body
  let body = (
    <>
      <p className='text-base text-purple py-2'>{message}</p>
      <Formik
        // serverError is only used to create an error when the mutation was unsuccessful
        initialValues={{
          password: '',
          confirmPassword: '',
          serverError: '',
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const res = await changePassword({
            variables: {
              token: resetPasswordToken as string,
              password: values.password,
            },
          });
          // console.log(res);
        }}
        validationSchema={ChangePasswordSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {/* formik uses the following render prop function */}
        {({ values, errors, isSubmitting }) => (
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
            <TextField
              type='password'
              name='password'
              placeholder='new password'
            />
            <TextField
              type='password'
              name='confirmPassword'
              placeholder='confirm new password'
            />
            <motion.button
              type='submit'
              whileTap={{ scale: 0.95 }}
              className='text-purple text-xl py-2 rounded-md border-2 border-purple'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ClipLoader color='#bb86fc' loading={isSubmitting} size={16} />
              ) : (
                'Change Password'
              )}
            </motion.button>
          </Form>
        )}
      </Formik>
    </>
  );

  if (data && data.changePassword.success) {
    // body is server successfully changed password
    body = (
      <>
        <p className='text-base text-white py-2'>
          Your password has been successfully changed. You may now log in using
          your new password
        </p>
        <Link href='/'>
          <p className='text-base text-purple m-auto cursor-pointer'>Log in</p>
        </Link>
      </>
    );
  } else if (data && !data.changePassword.success) {
    // body if server was unable to change the password
    body = (
      <>
        <p className='text-base text-red py-2'>
          We were unable to change your password. Please request a new email and
          try again.
        </p>
        <Link href='/'>
          <p className='text-base text-white m-auto cursor-pointer'>Home</p>
        </Link>
      </>
    );
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-col lg:flex-row w-[500] m-auto  gap-16'>
        <Link href='/'>
          <h1 className='text-8xl text-purple m-auto cursor-pointer'>
            squeeker
          </h1>
        </Link>
        <div className='flex flex-col gap-2 w-full sm:w-[450px] sm:rounded-lg bg-dark-gray p-4'>
          <h1 className='text-4xl text-white'>Change Password</h1>
          {body}
        </div>
      </div>
      <footer className='text-gray pb-8 text-center'>
        squeeker &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default ChangePassword;
