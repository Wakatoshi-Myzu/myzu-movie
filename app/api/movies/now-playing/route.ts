import { NextRequest, NextResponse } from "next/server";
import { getNowPlayingMovies } from "@/lib/tmdb/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const language = searchParams.get("language") || "en-US";

    const data = await getNowPlayingMovies(page, language);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch now playing movies";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
