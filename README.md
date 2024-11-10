# Fenice2

[![](https://img.shields.io/github/license/steeven9/fenice2)](/LICENSE)
[![C/C++ CI](https://github.com/steeven9/fenice2/actions/workflows/docker-image.yml/badge.svg)](https://github.com/steeven9/fenice2/actions/workflows/docker-image.yml)
![](https://img.shields.io/tokei/lines/github/steeven9/fenice2)

## ℹ️ Description

This is a website for our D&D group, where we handle maps, character data and much more.

The frontend is exposed at <https://fenice2.soulsbros.ch>.

404 and 500 error logos by [SAWARATSUKI](https://github.com/SAWARATSUKI/KawaiiLogos)

### Dependencies

- MongoDB database
- <https://github.com/Steeven9/Gcal-API> to fetch next session date
- Home Assistant with Alexa for TTS (optional)

## 🏡 Local development

### ⚙️ Prerequisites

- Node.js v22
- Yarn package manager
- Docker

### 🔧 Installation

```bash
# install dependencies
yarn install

# set up local configuration
cp .env.example .env.local
```

### 🚀 Run locally

```bash
# start DB
docker-compose up mongodb -d

# start frontend
yarn dev
```

Then open your browser and head to <http://localhost:3000>
