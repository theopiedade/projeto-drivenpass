import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { CredentialParams, authenticationService, credentialService } from '@/services';


export async function credentialCreate(req: AuthenticatedRequest, res: Response) {
  const { title, url, username, password } = req.body as CredentialParams;
 
  const { userId } = req;

  const result = await credentialService.createCredential({ title, url, username, password, userId});

  return res.status(httpStatus.OK).send(result);
}

export async function getCredencials(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  const result = await credentialService.getCredentials(userId);

  return res.status(httpStatus.OK).send(result);
}

export async function getCredencialById(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  const id = Number(req.params.id);

  const result = await credentialService.getCredentialById(userId, id);

  return res.status(httpStatus.OK).send(result);
}

export async function deleteCredencialById(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  const id = Number(req.params.id);

  const result = await credentialService.deleteCredentialById(userId, id);

  return res.status(httpStatus.OK).send(result);
}
