import { NextResponse } from "next/server";
import { getTvSeriesDetails } from "@/lib/tmdb/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getTvSeriesDetails(parseInt(id));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch TV series details" },
      { status: 500 }
    );
  }
}
