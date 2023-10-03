import { NextResponse } from "next/server";
import { ourMongo } from "../../../../lib/mongoConn";

export async function GET() {
  try {
    let db = await ourMongo("characters");
    let docs = (await db?.find().toArray()) ?? [];
    docs.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(docs);
  } catch (err) {
    console.error(err);

    return NextResponse.json({ error: "Server error" });
  }
}
