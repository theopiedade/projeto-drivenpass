import { Router } from 'express';
import { credentialSchema } from '@/schemas';
import { validateBody, authenticateToken } from '@/middlewares';
import { credentialCreate, getCredencials, getCredencialById} from '@/controllers';


const credentialsRouter = Router()
    .all('/*', authenticateToken)
    .post('/create', validateBody(credentialSchema), credentialCreate)
    .get('/', getCredencials)
    .get('/:id', getCredencialById)

export { credentialsRouter };
