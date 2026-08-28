import { NextRequest, NextResponse } from "next/server";
import { getMovieGenres } from "@/lib/tmdb/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get("language") || "en-US";

    const data = await getMovieGenres(language);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch genres";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
