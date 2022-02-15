import * as Yup from 'yup';

export const LogInSchema = Yup.object().shape({
  username: Yup.string()
    .max(30, 'The credentials provided did not match our records')
    .required('Username is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'The credentials provided did not match our records'
    )
    .required('Password is required'),
});

export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .max(30, 'Too Long!')
    .matches(
      /^[a-zA-Z0-9_-]{1,30}$/,
      'Username can only contain letters, number, underscores, and hyphens'
    )
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must include an uppercase letter, lowercase letter, and a number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match'
  ),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
});

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must include an uppercase letter, lowercase letter, and a number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match'
  ),
});

export const CreatePostSchema = Yup.object().shape({
  text: Yup.string()
    .max(160, 'Squeek must be less than 160 characters')
    .required('Please enter a valid squeek'),
});
