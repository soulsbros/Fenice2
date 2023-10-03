import { Db, MongoClient } from "mongodb";

const mongoURI =
  process.env.MONGODB_URI ?? "mongodb://user:password@localhost:27017";
const client = new MongoClient(mongoURI, {
  connectTimeoutMS: 5000,
  appName: "Fenice2",
  authSource: "dnd-alignment",
});
let database: Db;

export async function ourMongo(collection: string) {
  if (database) {
    return database.collection(collection);
  }
  try {
    await client.connect();
    database = client.db("dnd-alignment");
    return database.collection(collection);
  } catch (err) {
    console.error("Failed to connect to the mongoDB database!");
    console.error(err);
  }
}
