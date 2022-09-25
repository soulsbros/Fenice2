#!/usr/bin/env sh
set -eu

envsubst '${VITE_APP_BACKEND_HOSTNAME} ${VITE_APP_BACKEND_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
