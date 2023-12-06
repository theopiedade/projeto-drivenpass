import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { handleApplicationErrors } from '@/middlewares';
import { usersRouter, authenticationRouter, credentialsRouter, networkRouter } from '@/routers';
import { loadEnv, connectDb, disconnectDB } from '@/config';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/credential', credentialsRouter)
  .use('/network', networkRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
