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

async function findCredentials(userId: number) {
  const params: Prisma.CredentialFindManyArgs = {
    where: {
      userId
    },
  };

  return prisma.credential.findMany(params);
}

async function findCredentialById(id: number) {
  const params: Prisma.CredentialFindUniqueOrThrowArgs = {
    where: {
      id
    },
  };
  return prisma.credential.findUnique(params);
}

export const credentialRepository = {
  findByUsernameAndTitle,
  create,
  findCredentials,
  findCredentialById
};