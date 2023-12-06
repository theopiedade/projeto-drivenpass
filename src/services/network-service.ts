import { Network } from '@prisma/client';
import { duplicatedTitleError, invalidCredentialsAccess, invalidDataError } from '@/errors';
import { networkRepository } from '@/repositories';
import Cryptr from 'cryptr'
const cryptr = new Cryptr(process.env.JWT_SECRET);


export async function createNetwork({ title, network, password, userId}: NetworkParams): Promise<Network> {

await validateUniqueNetworkTitle(network, title);


const encryptedPassword = cryptr.encrypt(password);


  return networkRepository.create({
    title,
    network,
    password: encryptedPassword,
    userId
  });
}

async function validateUniqueNetworkTitle(network: string, title: string) {
  const networkWithSameTitle = await networkRepository.findByNetworkAndTitle(network, title);
  if (networkWithSameTitle) {
    throw duplicatedTitleError();
  }
}

async function getNetworks(userId: number) {
  const networks = await networkRepository.findNetworks(userId);
  networks.map((network) => (network.password = cryptr.decrypt(network.password)));
  return networks;
}

async function getNetworkById(userId: number, id: number) {
  const networks = await networkRepository.findNetworkById(id);
  if (networks.userId !== userId) throw invalidCredentialsAccess();
  networks.password = cryptr.decrypt(networks.password);
  return networks;
}

async function deleteNetworkById(userId: number, id: number) {
  const networks = await networkRepository.findNetworkById(id);
  if (networks.userId !== userId) throw invalidCredentialsAccess();
  await networkRepository.deleteNetworkById(id);
}


export type NetworkParams = Pick<Network, 'title' | 'network' | 'password' | 'userId'>;

export const networkService = {
  createNetwork,
  getNetworks,
  getNetworkById,
  deleteNetworkById
};