import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CredentialParams, credentialService } from '@/services';

export async function credentialCreate(req: Request, res: Response) {
  const { title, url, username, password } = req.body as CredentialParams;
  const userId = Number(req.params.userId)

  const result = await credentialService.createCredential({ title, url, username, password, userId});

  return res.status(httpStatus.OK).send(result);
}