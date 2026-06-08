# https://hub.docker.com/hardened-images/catalog/dhi/node

FROM dhi.io/node:26-alpine-sfw-dev AS builder

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN yarn build



FROM dhi.io/node:26-alpine AS runner

LABEL author="Soulsbros <https://soulsbros.ch>"

WORKDIR /app
EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node /app/.next/standalone ./
COPY --from=builder --chown=node /app/.next/static ./.next/static

CMD ["node", "server.js"]
