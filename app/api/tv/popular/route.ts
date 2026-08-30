import { NextResponse } from "next/server";
import { getPopularTvSeries } from "@/lib/tmdb/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const data = await getPopularTvSeries(page);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch popular TV series" },
      { status: 500 }
    );
  }
}
