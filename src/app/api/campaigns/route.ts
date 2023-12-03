import { getWithFilter, insertDocs } from "@/lib/mongo";
import { Document, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const collection = "campaigns";

// get campaigns
// filters in query param are id, name
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  try {
    const filter = {} as Filter<Document>;
    if (id) {
      filter._id = new ObjectId(id);
    }
    if (name) {
      filter["name"] = { $regex: name, $options: "i" };
    }

    const docs = await getWithFilter(collection, "name", filter);
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
