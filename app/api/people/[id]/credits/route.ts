import { NextRequest, NextResponse } from "next/server";
import { getPersonCombinedCredits } from "@/lib/tmdb/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const personId = Number(id);

    if (isNaN(personId)) {
      return NextResponse.json(
        { success: false, message: "Invalid person ID" },
        { status: 400 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get("language") || "en-US";

    const data = await getPersonCombinedCredits(personId, language);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch person credits";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
