import React from 'react';
import { Field } from 'formik';

interface Props {
  [key: string]: string | boolean;
}

const TextField: React.FC<Props> = ({ error, textArea, ...props }) => {
  return (
    <Field
      as={textArea ? 'textarea' : 'input'}
      className={`text-white bg-gray px-2 py-3 rounded-md text-xl focus:outline-none focus:shadow-md ${
        error ? 'border border-red' : 'border border-dark-gray'
      } resize-none`}
      {...props}
    />
  );
};

export default TextField;
