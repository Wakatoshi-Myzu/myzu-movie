import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails } from "@/lib/tmdb/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movieId = Number(id);

    if (isNaN(movieId)) {
      return NextResponse.json(
        { success: false, message: "Invalid movie ID" },
        { status: 400 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get("language") || "en-US";

    const data = await getMovieDetails(movieId, language);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch movie details";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
