import { Request, Response } from 'express';
import schema from '../../openapi.json';

export default function middlewareErrorRequestHandler(
	_req: Request,
	res: Response,
) {
	res.json(schema);
}
