import { env } from '../config/env';

export const validUser = {
  email: env.validEmail,
  password: env.validPassword,
};

export const invalidLoginCases = [
  {
    name: 'wrong password',
    email: env.validEmail,
    password: 'wrong-password-123',
  },
  {
    name: 'unregistered email',
    email: 'no-such-user@example.com',
    password: env.validPassword,
  },
  {
    name: 'empty password',
    email: env.validEmail,
    password: '',
  },
];

export const EXPECTED_ERROR_MESSAGE = 'Invalid email or password';
