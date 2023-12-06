import { User, Session } from '@prisma/client';
import { createUser } from './users-factory';
import { prisma } from '@/config';
import * as jwt from 'jsonwebtoken';

export async function createSession(token: string): Promise<Session> {
  const user = await createUser();

  return prisma.session.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}

export async function createSessionAndToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  await createSession(token);

  return { token, id: incomingUser.id, email: incomingUser.email, password: incomingUser.password };
}