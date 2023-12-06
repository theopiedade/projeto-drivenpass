import Joi from 'joi';
import { NetworkParams } from '@/services';

export const networkSchema = Joi.object<NetworkParams>({
  title: Joi.string().required(),
  network: Joi.string().required(),
  password: Joi.string().required(),
});