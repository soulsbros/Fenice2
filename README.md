# React-boilerplate
[![](https://img.shields.io/github/license/soulsbros/react-boilerplate)](/LICENSE)
[![C/C++ CI](https://github.com/soulsbros/react-boilerplate/actions/workflows/docker-image.yml/badge.svg)](https://github.com/soulsbros/react-boilerplate/actions/workflows/docker-image.yml)
![](https://img.shields.io/tokei/lines/github/soulsbros/react-boilerplate)

A template for modern web applications. By default, the frontend runs on port 3000
and the backend on 4000.


## Features
A Docker-compose file is included to bring up all services.
As it is, the images are built locally instead of fetching them from registry,
this can easily be changed in the `docker-compose.yml` file.

A GitHub workflow is included to build and push the images for both front-
and backend to [Docker Hub](https://hub.docker.com/).

[Husky](https://typicode.github.io/husky/#/) is included to automatically lint
and format your files before committing with [Eslint](https://eslint.org/) and
[Prettier](https://prettier.io/). [Custom configs](https://github.com/soulsbros/lint-configs)
are set up but can easily be changed or extended.

A special [package](https://www.npmjs.com/package/recursive-install) for
recursive installation of dependencies for client and server is also included,
which can be run with `npm run ri`.

A working [socket.io](https://socket.io/) setup is already in place, with a 
[React context](https://reactjs.org/docs/context.html)
to avoid prop-drilling the socket object in all the components.
Can't guarantee it's the best approach, but it works ¯\\_(ツ)_/¯


## Usage
Checklist to run through before usage:
- change all instances of `react-boilerplate` to your actual app name
and `A template for modern web applications` to the description
- add the actual favicon (suggestion: use [this website](https://realfavicongenerator.net/))
- check and adjust dependencies
- if needed, add and set up CORS for server
- check Eslint and Prettier configs
- delete the first part of the README (this one)

Additionally, if you want to push to Docker Hub:
- create the corresponding Docker Hub images
- add the `DOCKERHUB_USERNAME` and `DOCKERHUB_PASSWORD` secrets to the repo 
**before the first commit** (otherwise the pipeline will fail)


---- below is the README template ----

# react-boilerplate
[![](https://img.shields.io/github/license/soulsbros/react-boilerplate)](/LICENSE)
[![C/C++ CI](https://github.com/soulsbros/react-boilerplate/actions/workflows/docker-image.yml/badge.svg)](https://github.com/soulsbros/react-boilerplate/actions/workflows/docker-image.yml)
![](https://img.shields.io/tokei/lines/github/soulsbros/react-boilerplate)

A template for modern web applications


## Run in Docker
A Docker image is available on Docker Hub for both 
[client](https://hub.docker.com/steeven9/react-boilerplate-client)
and [server](https://hub.docker.com/steeven9/react-boilerplate-server).

* Run `docker-compose up` in the root folder


## Run locally
* Run `npm ri` to install all the dependencies
* Run `npm run dev` in the server folder
* Run `npm start` in the client folder
