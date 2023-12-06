import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { NetworkParams, authenticationService, networkService } from '@/services';


export async function networkCreate(req: AuthenticatedRequest, res: Response) {
  const { title, network, password } = req.body as NetworkParams;
 
  const { userId } = req;

  const result = await networkService.createNetwork({ title, network, password, userId});

  return res.status(httpStatus.OK).send(result);
}

export async function getNetworks(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  const result = await networkService.getNetworks(userId);

  return res.status(httpStatus.OK).send(result);
}

export async function getNetworkById(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  const id = Number(req.params.id);

  const result = await networkService.getNetworkById(userId, id);

  return res.status(httpStatus.OK).send(result);
}

export async function deleteNetworkById(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  const id = Number(req.params.id);

  const result = await networkService.deleteNetworkById(userId, id);

  return res.status(httpStatus.OK).send(result);
}
