import { Request, Response, NextFunction, RequestHandler } from 'express';

function asyncHandler(handler: RequestHandler) {
	return function asyncHandlerMiddleware(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		return Promise.resolve(handler(req, res, next)).catch(next);
	};
}

export default asyncHandler;
