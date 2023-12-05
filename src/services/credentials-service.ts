import { Credential } from '@prisma/client';
import cryptr from 'cryptr';
import { duplicatedTitleError } from '@/errors';
import { credentialRepository } from '@/repositories';


export async function createCredential({ title, url, username, password, userId}: CredentialParams): Promise<Credential> {

await validateUniqueCredentialTitle(username, title);

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const encryptedPassword = cryptr.encrypt(password);


  return credentialRepository.create({
    title,
    url,
    username,
    password: encryptedPassword,
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