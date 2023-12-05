import Joi from 'joi';
import { CredentialParams } from '@/services';

export const credentialSchema = Joi.object<CredentialParams>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});