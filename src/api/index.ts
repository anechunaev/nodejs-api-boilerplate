import { Router } from 'express';
import notAllowedMiddleware from '../middlewares/invalidRequest';
import V1Router from './v1';

const ApiRouter = Router();

ApiRouter.route('/').all(notAllowedMiddleware);

ApiRouter.use('/v1', V1Router);

export default ApiRouter;
