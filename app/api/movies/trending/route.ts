import { NextRequest, NextResponse } from "next/server";
import { getTrendingMovies } from "@/lib/tmdb/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const window = (searchParams.get("window") || "day") as "day" | "week";
    const language = searchParams.get("language") || "en-US";

    const data = await getTrendingMovies(window, language);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch trending movies";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
