#!/usr/bin/env bash

if ! mongoimport --version &>/dev/null; then
  echo "Error: this script requires the mongodb tools. See README for more info."
  exit 1
fi

if [[ ! -f characters.json ]]; then
  echo "Erro: no data files found, make sure you're in the correct directory. See README for more info."
  exit 2
fi

MONGODB_STRING=$(cat ../.env.local | grep MONGODB_URI | awk -F '=' '{print $2}')
if [[ -z $MONGODB_STRING ]]; then
  echo "Error: missing MongoDB connection string in env file. See README for more info."
  exit 2
fi

echo "WARNING: this script will load some data in the MongoDB database running on localhost:27017."
echo "Make sure you have the correct database running there."

read -p "Continue? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  for file in $(ls *.json); do
    echo
    echo "Processing $file..."
    mongoimport --uri $MONGODB_STRING \
      --file $file --jsonArray --authenticationDatabase admin
  done

  echo
  echo "Done!"
fi
