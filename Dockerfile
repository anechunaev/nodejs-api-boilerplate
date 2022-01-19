FROM node:16-alpine as builder

ARG PORT=8080
ARG HOST='0.0.0.0'

ENV HOST=$HOST \
	PORT=$PORT \
	DB_HOST=$DB_HOST \
	DB_USER=$DB_USER \
	DB_ACCESS_TOKEN=$DB_ACCESS_TOKEN \
	TERM=xterm \
	LANG=en_US.UTF-8 \
	TZ='Europe/Moscow' \
	NO_UPDATE_NOTIFIER=true \
	NPM_CONFIG_USERCONFIG=/tmp/.npmrc \
	NPM_CONFIG_CACHE=/tmp/npm-cache \
	NPM_CONFIG_PREFIX=/tmp/npm-global

# Java and OpenJDK is used for OpenAPI tools
RUN apk add openjdk11 && \
	mkdir -p /usr/share/app \
	&& chown 1001:0 /usr/share/app \
	&& mkdir -p /tmp/npm-cache \
	&& mkdir -p /tmp/npm-global

WORKDIR /usr/share/app

COPY package.json .
COPY package-lock.json .
COPY .npmrc .
RUN npm ci --no-audit --no-fund
COPY static ./static
COPY bin ./bin
COPY config ./config
COPY tsconfig.json .
COPY globals.d.ts .
COPY openapi.json .
COPY docs ./docs
COPY src ./src

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN chown -R 1001:0 ./docs
RUN sh ./bin/build.sh



FROM node:16-alpine as runner

ARG PORT=8080
ARG HOST='0.0.0.0'
ARG NODE_ENV=production

ENV HOST=$HOST \
	PORT=$PORT \
	DB_HOST=$DB_HOST \
	DB_USER=$DB_USER \
	DB_ACCESS_TOKEN=$DB_ACCESS_TOKEN \
	NODE_ENV=$NODE_ENV

WORKDIR /usr/share/app
RUN chown -R 1001:0 .

COPY --from=builder --chown=1001:0 /usr/share/app/bin ./bin
COPY --from=builder --chown=1001:0 /usr/share/app/dist ./dist
COPY --from=builder --chown=1001:0 /usr/share/app/docs/html ./docs/html
COPY --from=builder --chown=1001:0 /usr/share/app/static ./static
COPY --from=builder --chown=1001:0 /usr/share/app/node_modules/full-icu ./node_modules/full-icu

EXPOSE $PORT
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "./bin/healthcheck.sh" ]

USER 1001
CMD [ "./bin/start.sh" ]
