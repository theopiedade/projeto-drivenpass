import { Router } from 'express';

import { credentialSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { usersPost } from '@/controllers';

const usersRouter = Router();

usersRouter.post('/', validateBody(credentialSchema), usersPost);

export { usersRouter };
