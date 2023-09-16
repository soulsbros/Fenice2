FROM oven/bun as builder

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN bun install && \
    bun run build

FROM nginx:1.23.1-alpine

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /
COPY --from=builder /usr/src/app/dist/ /www/data
