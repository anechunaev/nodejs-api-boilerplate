# Modern Node.js API Boilerplate

## Technologies
- TypeScript v4, Node.js v16, Express v4
- API Schema: OpenAPI v3

## Limitations and restrictions
- TLS/SSL not supported, it should be implemented by platform router or reverse-proxy

## Docker repository

`bungubot/nodejs-api-boilerplate`

## Features

### Build process

- [x] Containerized build process with Docker
- [x] Multi-stage build with Docker

### Server-side application

- [x] Graceful shutdown
- [x] Internationalization support with `Intl` API for Node.js
- [ ] Optional: Use GraphQL to implement client-server-client messaging
- [ ] Optional: Add GRPC protocol

### Development tools

- [ ] Quality assurance tools
	- [ ] Integrate framework for unit-testing
	- [ ] Integrate framework for e2e testing
	- [ ] Coverage reports
	- [ ] Performance reports
	- [ ] Linters and code-style checkers
- [ ] Watcher
- [ ] Hot module replacement for client-side code
- [ ] Iterative assets building

## How to build
Production build:
```sh
$ npm run build
```

Development build:
```sh
$ npm run dev:build
```

Start server:
```sh
$ npm start
# or
$ ./bin/start.sh
```

It is possible to start an application cluster on a local development machine. Docker Compose is used for running development environment. Just change `./dev/docker-compose.yaml` according to your application and run it:

```sh
$ cd dev
$ docker-compose build
$ docker-compose up
```