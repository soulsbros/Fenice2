import { ourMongo } from "@/lib/mongoConn";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let db = await ourMongo("campaigns");
    let docs = (await db?.find().toArray()) ?? [];
    docs.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(docs);
  } catch (err) {
    console.error(err);

    return NextResponse.json({ error: "Server error" });
  }
}

export async function POST() {
  return NextResponse.json({ status: "Not implemented" });
}
