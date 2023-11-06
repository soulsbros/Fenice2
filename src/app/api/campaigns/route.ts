import { getWithFilter, insertDocs } from "@/lib/mongo";
import { NextResponse } from "next/server";

const collection = "campaigns";

// get campaigns
//TODO filters
export async function GET() {
  try {
    const docs = await getWithFilter(collection, "name");
    return NextResponse.json(docs);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: `Error inserting ${collection}: ${err}`,
      },
      { status: 500 }
    );
  }
}

// create new campaign(s)
// takes an array of JSON documents in the request body
export async function POST(request: Request) {
  try {
    const docs = await request.json();
    return await insertDocs(collection, docs);
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
