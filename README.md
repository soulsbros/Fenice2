# Fenice2

[![License](https://img.shields.io/github/license/soulsbros/fenice2)](/LICENSE)
[![Pipeline](https://github.com/soulsbros/fenice2/actions/workflows/docker-image.yml/badge.svg)](https://github.com/soulsbros/fenice2/actions/workflows/docker-image.yml)
[![Quality gate status](https://code.soulsbros.ch/api/project_badges/measure?project=soulsbros_Fenice2_59e4f649-e1b1-492c-8603-04a21593d84a&metric=alert_status&token=sqb_b427c37f0d76cdec4fed2269dac5a7743040002f)](https://code.soulsbros.ch/dashboard?id=soulsbros_Fenice2_59e4f649-e1b1-492c-8603-04a21593d84a)
![GitHub repo size](https://img.shields.io/github/repo-size/soulsbros/fenice2?label=Repo%20size)
![Lines of code](https://img.shields.io/endpoint?url=https://ghloc.vercel.app/api/Jonius7/SteamUI-OldGlory/badge&label=Lines%20of%20Code)

## ℹ️ Description

This is a website for our D&D group where we handle maps, character data and much more.

The frontend is exposed at <https://fenice2.soulsbros.ch>.

### Dependencies

The website has a few integrations with some external services (100% self-hosted),
which are not strictly required to run the website but might be needed for some parts of it:

- **MongoDB database** to store characters and campaigns.
Required to browse, create, and edit characters and campaigns
- **Keycloak** OIDC identity provider to allow users to login and store their characters.
Required to create and edit characters
- **S3-compatible storage** to store files such as documents and sounds (optional)
- **Gcal-API** to easily fetch the date of our next session from our shared calendar
(see [steeven9/Gcal-API](https://github.com/Steeven9/Gcal-API), optional)
- **Home Assistant** with the Alexa integration to announce whose turn it is in combat (optional)

## 🏡 Local development

### ⚙️ Prerequisites

- Node.js
- Yarn package manager
- Docker (if you want to run MongoDB locally)

### 🔧 Installation

```bash
# install dependencies
yarn install

# bootstrap local configuration
cp .env.example .env.local
```

Then adapt the values in the `.env.local` file depending
on which external services you need (see "Dependencies" section).

### 🚀 Run locally

```bash
# start DB
docker-compose up mongodb -d

# start frontend
yarn dev
```

Finally, open your browser and head to <http://localhost:3000>.
The first load might take a while, so be patient!

### 📄 Mock data

If you want to load some characters and campaigns, there is some example data in the
`mock_data` folder.

You will need a running MongoDB database and the
[MongoDB database tools](https://www.mongodb.com/docs/database-tools/installation/installation)

To load it in the MongoDB database, simply run the script:

```bash
cd mock_data

./load_data.sh
```

## ♻️ Contributing

If you spot a bug or think there's a missing feature, feel free to open an issue on our GitHub page!

Before submitting a pull request, please check that the build is still passing even after the changes:

```bash
yarn build
```

## Credits

Error logos by [SAWARATSUKI](https://github.com/SAWARATSUKI/KawaiiLogos)

Art by [rui](https://twitter.com/namelessakikaze)

Dice logos by [Zeno](https://twitter.com/LazzariZeno)

And all our contributors here on GitHub:

<a href="https://github.com/Steeven9/Fenice2/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Steeven9/Fenice2" />
</a>

(made with [contributors-img](https://contrib.rocks))
