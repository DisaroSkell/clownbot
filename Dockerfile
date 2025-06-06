ARG BUN_VERSION=1.2.13

FROM oven/bun:${BUN_VERSION}-alpine

WORKDIR /app

RUN apk add --no-cache bash curl unzip

COPY package.json bun.lock tsconfig.json ./

RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

RUN rm -rf node_modules && \
  rm -rf /root/.bun/install/cache/ && \
  bun install --frozen-lockfile --production

RUN curl -sf https://gobinaries.com/tj/node-prune | sh && \
  node-prune

RUN chown -R bun:bun /app

USER bun

CMD ["bun", "start"]
