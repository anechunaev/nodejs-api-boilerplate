import { Request, Response, NextFunction } from 'express';
import { ServiceError } from '../lib/errors';

export default function middlewareErrorRequestHandler(
	error: Error | ServiceError,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction,
) {
	let status = 500;

	if (typeof (error as ServiceError).httpStatus === 'number') {
		status = (error as ServiceError).httpStatus;
	}

	if (status > 499) {
		// eslint-disable-next-line no-console
		console.error(error);
	}
	res.status(status).json({ error, message: error.message });
}
