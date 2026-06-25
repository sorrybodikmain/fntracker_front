import { NextResponse } from "next/server";
import { getPlaylistById } from "@/lib/api/fortnite";
import { toApiLanguage } from "@/i18n/locale";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const lang = toApiLanguage(searchParams.get("lang") ?? "en");

  try {
    const playlist = await getPlaylistById(id, lang);
    if (!playlist?.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data: playlist });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
