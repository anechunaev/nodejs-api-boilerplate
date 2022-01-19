import { Request, Response, NextFunction } from 'express';

export default function attachDBConnection(connection: any) {
	return function connectionMiddleware(
		_req: Request,
		res: Response,
		next: NextFunction,
	) {
		res.locals.connection = res.locals.connection || connection;
		next();
	};
}
