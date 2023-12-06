import { Router } from 'express';
import { credentialSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { credentialCreate, getCredencials, getCredencialById} from '@/controllers';

const credentialsRouter = Router();

credentialsRouter.post('/create', validateBody(credentialSchema), credentialCreate);
credentialsRouter.get('/', getCredencials);
credentialsRouter.get('/:id', getCredencialById);

export { credentialsRouter };
