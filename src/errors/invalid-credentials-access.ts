import { ApplicationError } from '@/protocols';

export function invalidCredentialsAccess(): ApplicationError {
  return {
    name: 'InvalidCredentialsAccess',
    message: 'You cannot access this credential id or it doesnt exists',
  };
}