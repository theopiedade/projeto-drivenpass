import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { CredentialParams } from '@/services';

import Cryptr from 'cryptr'
const cryptr = new Cryptr(process.env.JWT_SECRET);


export async function createCredential(data: CredentialParams) {
    const cryptPassword = cryptr.encrypt(faker.lorem.word());
    return prisma.credential.create({
      data: {
        title: data.title,
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: cryptPassword,
        userId: data.userId,
      },
    });
  }