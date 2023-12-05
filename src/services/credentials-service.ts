import { Credential } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedTitleError } from '@/errors';
import { credentialRepository } from '@/repositories';

export async function createCredential({ title, url, username, password, userId}: CredentialParams): Promise<Credential> {

  await validateUniqueCredentialTitle(username, title);

  const hashedPassword = await bcrypt.hash(password, 12);
  return credentialRepository.create({
    title,
    url,
    username,
    password: hashedPassword,
    userId
  });
}

async function validateUniqueCredentialTitle(username: string, title: string) {
  const credentialWithSameTitle = await credentialRepository.findByUsernameAndTitle(username, title);
  if (credentialWithSameTitle) {
    throw duplicatedTitleError();
  }
}


export type CredentialParams = Pick<Credential, 'title' | 'url' | 'username' | 'password' | 'userId'>;

export const credentialService = {
  createCredential,
};