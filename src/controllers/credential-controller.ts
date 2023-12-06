import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CredentialParams, authenticationService, credentialService } from '@/services';


export async function credentialCreate(req: Request, res: Response) {
  const { title, url, username, password } = req.body as CredentialParams;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');


  const userId = await authenticationService.checkSession(token)

  const result = await credentialService.createCredential({ title, url, username, password, userId});

  return res.status(httpStatus.OK).send(result);
}

export async function getCredencials(req: Request, res: Response) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  const userId = await authenticationService.checkSession(token)

  console.log("controllers getCredencials userId:"+userId)

  const result = await credentialService.getCredentials(userId);

  return res.status(httpStatus.OK).send(result);
}

export async function getCredencialById(req: Request, res: Response) {
  const id = Number(req.params.id);
  console.log("credential-controller id:"+id);

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  const userId = await authenticationService.checkSession(token)

  const result = await credentialService.getCredentialById(userId, id);

  return res.status(httpStatus.OK).send(result);
}

