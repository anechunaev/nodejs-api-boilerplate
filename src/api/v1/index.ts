import { Router } from 'express';
import notAllowedMiddleware from '../../middlewares/invalidRequest';
import Creatures from './creatures';

const V1Router = Router();

V1Router.route('/').all(notAllowedMiddleware);
V1Router.use('/creatures', Creatures);

export default V1Router;
