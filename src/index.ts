import * as morgan from 'morgan';
import * as Express from 'express';
import invalidRequest from './middlewares/invalidRequest';
import errorRequestHandler from './middlewares/errorRequestHandler';
import healthcheck from './middlewares/healthcheck';
import openapiSchema from './middlewares/openapiSchema';
import attachDBConnection from './middlewares/attachDBConnection';
import getShutdownHandler from './lib/gracefulShutdown';
import { connect as databaseConnect } from './lib/database';
import Api from './api';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const DB_HOST = process.env.DB_HOST || '0.0.0.0:27017';
const DB_USER = process.env.DB_USER || 'anonymous';
const DB_ACCESS_TOKEN = process.env.DB_ACCESS_TOKEN || '1234567890';
const app = Express();
let shutdown: () => void = () => {};

databaseConnect(DB_HOST, DB_USER, DB_ACCESS_TOKEN)
	.then(db => {
		app.disable('x-powered-by');
		app.all('/healthcheck', healthcheck);
		app.use(morgan('tiny'));

		// Static files
		app.use('/', Express.static('static'));
		app.use('/docs', Express.static('docs/html'));
		app.use('/openapi.json', openapiSchema);

		// API
		app.use('/api/v1/*', attachDBConnection(db));
		app.use('/api', Api);

		// Errors
		app.use(errorRequestHandler);
		app.use(invalidRequest);

		const server = app.listen(+PORT, HOST, function onAppStart() {
			console.log(`==> Server @ http://${HOST}:${PORT}`);
		});
		shutdown = getShutdownHandler(server);
	})
	.catch(dbConnectionError => {
		// retry or exit
		console.error("==> Could not connect to database", dbConnectionError);
		process.exit(1);
	});


process.on('SIGINT', function onSigInt () {
	console.info('\n==> Got SIGINT. Graceful shutdown @ ' + (new Date()).toISOString());
	shutdown();
});

process.on('SIGTERM', function onSigTerm () {
	console.info('\n==> Got SIGTERM. Graceful shutdown @ ' + (new Date()).toISOString());
	shutdown();
});

process.on('unhandledRejection', function unhandledRejectionHandler(reason, promise) {
	console.error("Unhandled rejection at:\n", promise, "\n\nReason: ", reason);
	process.exitCode = 1;
	shutdown();
});

process.on('uncaughtException', function uncaughtExceptionHandler(error) {
	console.error("Uncaught exception:\n", error);
	process.exitCode = 1;
	shutdown();
});
