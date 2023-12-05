import { ApplicationError } from '@/protocols';

export function duplicatedTitleError(): ApplicationError {
  return {
    name: 'DuplicatedTitleError',
    message: 'There is already a title created with this same name in this user',
  };
}