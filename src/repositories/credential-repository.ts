import { Prisma } from '@prisma/client';
import { prisma } from '../config';

async function findByUsernameAndTitle(username: string, title: string) {
  const params: Prisma.CredentialFindManyArgs = {
    where: {
      username, 
      title
    },
  };

  return prisma.credential.findFirst(params);
}

async function create(data: Prisma.CredentialUncheckedCreateInput) {
  return prisma.credential.create({
    data,
  });
}

export const credentialRepository = {
  findByUsernameAndTitle,
  create,
};