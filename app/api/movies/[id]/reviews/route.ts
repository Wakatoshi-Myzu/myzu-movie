import { NextResponse } from "next/server";
import { getMovieReviews } from "@/lib/tmdb/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");

    const data = await getMovieReviews(parseInt(id), page);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch movie reviews" },
      { status: 500 }
    );
  }
}
