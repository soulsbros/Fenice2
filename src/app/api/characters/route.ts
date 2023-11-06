import { getWithFilter, insertDocs } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

const collection = "characters";

// get characters
//TODO filters
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

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
