import * as dotenv from 'dotenv';

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  baseUrl: required('BASE_URL', 'https://crm.anhtester.com'),
  validEmail: required('VALID_EMAIL', 'admin@example.com'),
  validPassword: required('VALID_PASSWORD', '123456'),
};
