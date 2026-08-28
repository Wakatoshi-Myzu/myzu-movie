import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Search query is required" },
        { status: 400 }
      );
    }

    const page = Number(searchParams.get("page")) || 1;
    const language = searchParams.get("language") || "en-US";

    const data = await searchMovies(query, page, language);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to search movies";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
