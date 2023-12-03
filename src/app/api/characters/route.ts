import { getWithFilter, insertDocs } from "@/lib/mongo";
import { Document, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const collection = "characters";

// get characters
// filters in query param are id, name, campaignId
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const campaignId = searchParams.get("campaignId");

  try {
    const filter = {} as Filter<Document>;
    if (id) {
      filter._id = new ObjectId(id);
    }
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (campaignId) {
      filter.campaignId = campaignId;
    }

    const chars = await getWithFilter(collection, "campaignId", filter);
    return NextResponse.json(chars);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: `Error fetching ${collection}: ${err}`,
      },
      { status: 500 }
    );
  }
}

// create new character(s)
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
