const MongoClient = require('mongodb').MongoClient;

//mongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1';
const client = new MongoClient(mongoURI);
let database;
async function ourMongo(collection) {
  // https://www.youtube.com/watch?v=xirKvZv9Hq8
  if (database) {
    return database.collection(collection);
  }
  try {
    await client.connect();
    database = client.db('dnd-alignment');
    return database.collection(collection);
  } catch (err) {
    console.error(
      'Failed to connect to the mongoDB database! Check that you set the correct env variables (see README for details)',
    );
    console.error(err);
  }
}

module.exports = { ourMongo };
