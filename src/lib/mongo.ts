import { Db, Document, Filter, MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const mongoURI =
  process.env.MONGODB_URI ?? "mongodb://user:password@localhost:27017";
const dbName = "fenice2";

const client = new MongoClient(mongoURI, {
  connectTimeoutMS: 5000,
  appName: "Fenice2",
  authSource: dbName,
});
let database: Db;

export async function ourMongo(collection: string) {
  if (database) {
    return database.collection(collection);
  }
  try {
    await client.connect();
    database = client.db(dbName);
    console.info(" ✓ Connected to mongoDB database");
    return database.collection(collection);
  } catch (err) {
    console.error(" x Failed to connect to the mongoDB database!");
    console.error(err);
  }
}

export async function getWithFilter(
  collection: string,
  sortingParam: string,
  filter = {} as Filter<Document>
) {
  try {
    const db = await ourMongo(collection);
    const docs = (await db?.find(filter).toArray()) ?? [];
    if (sortingParam) {
      docs.sort((a, b) => a[sortingParam].localeCompare(b[sortingParam]));
    }

    return docs as any[];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function insertDocs(collection: string, docs: any[]) {
  const db = await ourMongo(collection);
  try {
    const result = await db?.insertMany(docs);

    if (result && result.insertedCount > 0) {
      return NextResponse.json({
        msg: result.insertedCount + ` ${collection} inserted successfully`,
      });
    } else {
      console.error(`Error inserting ${collection}`, result);
      return NextResponse.json({
        error: `Error inserting ${collection}: ${result}`,
      });
    }
  } catch (err) {
    console.error(`Error inserting ${collection}`, err);
    return NextResponse.json(
      {
        error: `Error inserting ${collection}: ${err}`,
      },
      { status: 400 }
    );
  }
}
