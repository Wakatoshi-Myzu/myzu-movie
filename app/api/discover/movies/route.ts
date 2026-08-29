import { NextRequest, NextResponse } from "next/server";
import { discoverMovies } from "@/lib/tmdb/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const language = searchParams.get("language") || "en-US";
    const sortBy = searchParams.get("sort_by") || "popularity.desc";
    const genreIds = searchParams.get("with_genres") || undefined;
    const primaryReleaseYear = searchParams.get("primary_release_year")
      ? Number(searchParams.get("primary_release_year"))
      : undefined;
    const voteAverageGte = searchParams.get("vote_average.gte")
      ? Number(searchParams.get("vote_average.gte"))
      : undefined;
    const voteAverageLte = searchParams.get("vote_average.lte")
      ? Number(searchParams.get("vote_average.lte"))
      : undefined;
    const voteCountGte = searchParams.get("vote_count.gte")
      ? Number(searchParams.get("vote_count.gte"))
      : undefined;
    const runtimeGte = searchParams.get("with_runtime.gte")
      ? Number(searchParams.get("with_runtime.gte"))
      : undefined;
    const runtimeLte = searchParams.get("with_runtime.lte")
      ? Number(searchParams.get("with_runtime.lte"))
      : undefined;
    const year = searchParams.get("year")
      ? Number(searchParams.get("year"))
      : undefined;

    const data = await discoverMovies({
      page,
      language,
      sort_by: sortBy,
      with_genres: genreIds,
      primary_release_year: primaryReleaseYear,
      "vote_average.gte": voteAverageGte,
      "vote_average.lte": voteAverageLte,
      "vote_count.gte": voteCountGte,
      "with_runtime.gte": runtimeGte,
      "with_runtime.lte": runtimeLte,
      year,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to discover movies";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
