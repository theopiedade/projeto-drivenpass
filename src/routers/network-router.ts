import { Router } from 'express';
import { networkSchema } from '@/schemas';
import { validateBody, authenticateToken } from '@/middlewares';
import { networkCreate, getNetworks, getNetworkById, deleteNetworkById} from '@/controllers';


const networkRouter = Router()
    .all('/*', authenticateToken)
    .post('/create', validateBody(networkSchema), networkCreate)
    .get('/:id', getNetworkById)
    .get('/', getNetworks)
    .delete('/:id', deleteNetworkById)


export { networkRouter };