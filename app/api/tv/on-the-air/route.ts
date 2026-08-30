import { NextResponse } from "next/server";
import { getOnTheAirTvSeries } from "@/lib/tmdb/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const data = await getOnTheAirTvSeries(page);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch TV series on the air" },
      { status: 500 }
    );
  }
}
