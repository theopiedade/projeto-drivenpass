import { Prisma } from '@prisma/client';
import { prisma } from '../config';

async function findByNetworkAndTitle(network: string, title: string) {
  const params: Prisma.NetworkFindManyArgs = {
    where: {
      network, 
      title
    },
  };

  return prisma.network.findFirst(params);
}

async function create(data: Prisma.NetworkUncheckedCreateInput) {
  return prisma.network.create({
    data,
  });
}

async function findNetworks(userId: number) {
  const params: Prisma.NetworkFindManyArgs = {
    where: {
      userId
    },
  };

  return prisma.network.findMany(params);
}

async function findNetworkById(id: number, select?: Prisma.CredentialSelect) {
  const params: Prisma.NetworkFindUniqueOrThrowArgs = {
    where: {
      id
    },
  };
  return prisma.network.findUnique(params);
}

async function deleteNetworkById(id: number) {
  const params: Prisma.NetworkDeleteArgs = {
    where: {
      id
    },
  };
  return prisma.network.delete(params);
}

export const networkRepository = {
  findByNetworkAndTitle,
  create,
  findNetworks,
  findNetworkById,
  deleteNetworkById
};