import { Request } from 'express';
import { NotAllowedError } from '../lib/errors';

export default function invalidRequestMiddleware(req: Request) {
	throw new NotAllowedError(req);
}
