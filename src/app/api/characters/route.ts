import { getWithFilter, insertDocs } from "@/lib/mongo";
import { Document, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const collection = "characters";

// get characters
// filters in query param are id, name, campaignName
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const campaignName = searchParams.get("campaignName");
  const result = [] as any[];

  try {
    const filter = {} as Filter<Document>;
    if (id) {
      filter._id = new ObjectId(id);
    }
    if (name) {
      filter["name"] = { $regex: name, $options: "i" };
    }
    if (campaignName) {
      const campaigns = await getWithFilter("campaigns", "name", {
        name: { $regex: campaignName, $options: "i" },
      });

      await Promise.all(
        campaigns[0].characters.map(async (character: any) => {
          let char = await getWithFilter(collection, "name", {
            _id: new ObjectId(character),
          });
          result.push(char);
        })
      );
      return NextResponse.json(result);
    }

    const chars = await getWithFilter(collection, "name", filter);

    for (const character of chars) {
      if (character.externalId !== null) {
        const response = await fetch(
          `https://lafenice.soulsbros.ch/actions/getCharacterData.php?id=${character.externalId}`
        );
        try {
          const externalData = await response.json();
          result.push({ ...externalData, ...character });
        } catch (err) {
          console.error(
            `Error fetching extra data for ${character.externalId}: ${err}`
          );
          return NextResponse.json(
            {
              error: `Error fetching extra data for ${character.externalId}: ${err}`,
            },
            { status: 500 }
          );
        }
      } else {
        result.push(character);
      }
    }
    return NextResponse.json(result);
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
