FROM node:lts-gallium as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build

FROM nginx:1.23.1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /
COPY --from=builder /usr/src/app/dist/ /www/data

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
