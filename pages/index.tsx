import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import LogInForm from '../components/LogInForm';
import SignUpModal from '../components/SignUpModal';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { useCurrentUserQuery } from '../generated/graphql';

const LandingPage: NextPage = () => {
  const {
    data: currentUserData,
    loading: currentUserLoading,
    error: currentUserError,
  } = useCurrentUserQuery();
  const router = useRouter();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsisForgotPasswordModalOpen] = useState(
    false
  );

  if (currentUserData && currentUserData.currentUser) router.push('/home');

  return (
    // Landing page
    <main className='flex flex-col justify-between h-screen min-h-[700px] '>
      {/* main jumbotron */}
      <div className='flex flex-col gap-16 my-auto sm:mx-auto lg:gap-24 lg:flex-row'>
        {/* title - left side */}
        <div className='space-y-2 text-center lg:text-left lg:pt-16'>
          <h1 className='text-purple text-7xl'>squeeker</h1>
          <h4 className='text-white text-4xl'>Share something new.</h4>
        </div>
        {/* log in form */}
        <div className='flex flex-col gap-4 bg-dark-gray sm:rounded-lg w-full sm:w-[450px] p-6 shadow-xl'>
          <LogInForm router={router} />
          <button
            className='text-purple text-center'
            onClick={() => setIsisForgotPasswordModalOpen(true)}
          >
            Forgot password?
          </button>
          <hr className='border-gray' />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='text-white text-xl py-2 rounded-md border-2 border-gray bg-purple'
            onClick={() => setIsSignUpModalOpen(true)}
          >
            Sign up
          </motion.button>
        </div>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {/* MODALS */}
        {isForgotPasswordModalOpen && (
          <ForgotPasswordModal
            setIsModalOpen={setIsisForgotPasswordModalOpen}
          />
        )}
        {isSignUpModalOpen && (
          <SignUpModal setIsModalOpen={setIsSignUpModalOpen} router={router} />
        )}
      </AnimatePresence>
      {/* footer */}
      <footer className='text-gray pb-8 text-center'>
        squeeker &copy; {new Date().getFullYear()}
      </footer>
    </main>
  );
};

export default LandingPage;
