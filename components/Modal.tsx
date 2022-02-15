import React, { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { NextRouter } from 'next/router';
import { useRegisterMutation } from '../generated/graphql';
import { MdClose } from 'react-icons/md';

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariant = {
  initial: {
    y: '-100vh',
    transition: {
      // duration: '0.3',
      type: 'spring',
    },
  },
  isOpen: { y: '0' },
  exit: { y: '-100vh' },
};

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ setIsModalOpen, children }) => {
  const [signUp, { data, loading, error: gqlError }] = useRegisterMutation();

  return (
    <motion.div
      className='absolute w-full h-full top-0 left-0 backdrop-blur-md min-h-[700px] flex justify-center items-center'
      initial={'initial'}
      animate={'isOpen'}
      exit={'exit'}
      variants={modalVariant}
      onClick={() => setIsModalOpen(false)}
    >
      {/* form container */}
      <motion.div
        className='relative flex flex-col gap-6 sm:rounded-lg w-[500px] bg-dark-gray p-6'
        variants={containerVariant}
        // this onClick prevents modal from closing when we click the actual modal
        // since when the overlay is clicked, we close the modal.
        // this stops the event from bubbling
        onClick={e => e.stopPropagation()}
      >
        <MdClose
          className='absolute top-3 right-3 w-8 h-8 text-white cursor-pointer'
          onClick={() => setIsModalOpen(false)}
        />
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
