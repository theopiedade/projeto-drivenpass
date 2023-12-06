import { Router } from 'express';
import { credentialSchema } from '@/schemas';
import { validateBody, authenticateToken } from '@/middlewares';
import { credentialCreate, getCredencials, getCredencialById, deleteCredencialById} from '@/controllers';


const credentialsRouter = Router()
    .all('/*', authenticateToken)
    .post('/create', validateBody(credentialSchema), credentialCreate)
    .get('/:id', getCredencialById)
    .get('/', getCredencials)
    .delete('/:id', deleteCredencialById)


export { credentialsRouter };
