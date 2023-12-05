import { Router } from 'express';

import { credentialSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { credentialCreate, getCredencials} from '@/controllers';

const credentialsRouter = Router();

credentialsRouter.post('/create', validateBody(credentialSchema), credentialCreate);
credentialsRouter.get('/', getCredencials);

export { credentialsRouter };
