import { NextResponse } from "next/server";
import { getTopRatedTvSeries } from "@/lib/tmdb/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const data = await getTopRatedTvSeries(page);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch top rated TV series" },
      { status: 500 }
    );
  }
}
