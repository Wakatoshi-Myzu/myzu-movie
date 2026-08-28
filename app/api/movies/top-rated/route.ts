import { NextRequest, NextResponse } from "next/server";
import { getTopRatedMovies } from "@/lib/tmdb/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const language = searchParams.get("language") || "en-US";

    const data = await getTopRatedMovies(page, language);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch top rated movies";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
