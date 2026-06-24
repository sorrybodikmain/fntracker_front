import { NextResponse } from "next/server";
import { searchCosmetics } from "@/lib/api/fortnite";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const lang = searchParams.get("lang") ?? "en";

  if (!query || query.length < 2) {
    return NextResponse.json({ data: [] });
  }

  try {
    const data = await searchCosmetics(query, lang);
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
