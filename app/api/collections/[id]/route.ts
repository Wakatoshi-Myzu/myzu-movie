import { NextResponse } from "next/server";
import { getCollectionDetails } from "@/lib/tmdb/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getCollectionDetails(parseInt(id));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch collection details" },
      { status: 500 }
    );
  }
}
