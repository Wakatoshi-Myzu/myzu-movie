import { NextRequest, NextResponse } from "next/server";
import { getMovieWatchProviders } from "@/lib/tmdb/server";

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

    const data = await getMovieWatchProviders(movieId);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch watch providers";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
