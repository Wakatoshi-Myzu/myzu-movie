import tmdbClient from "@/lib/axios/tmdb";
import { TMDB_ENDPOINTS } from "@/lib/tmdb/endpoints";
import {
  mapMovieListItem,
  mapMovieDetail,
  mapMovieCredits,
  mapMovieImages,
  mapPaginatedResponse,
  mapWatchProviders,
  mapMovieKeywords,
  mapMovieReleaseDates,
  mapMovieReviews,
  mapMovieExternalIds,
  mapMovieTranslations,
  mapPersonListItem,
  mapPersonDetail,
  mapPersonCombinedCredits,
  mapTvSeriesListItem,
  mapTvSeriesDetail,
  mapCollection,
  type MovieListItem,
  type MovieDetail,
  type MovieCredits,
  type MovieImages,
  type PaginatedResponse,
  type Genre,
  type MovieVideos,
  type MovieWatchProviders,
  type MovieKeywords,
  type MovieReleaseDates,
  type MovieReviews,
  type MovieExternalIds,
  type MovieTranslations,
  type PersonListItem,
  type PersonDetail,
  type PersonCombinedCredits,
  type TvSeriesListItem,
  type TvSeriesDetail,
  type Collection,
} from "@/lib/tmdb/mapper";

export async function getPopularMovies(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.popular, {
    params: { page, language, include_adult: false },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getNowPlayingMovies(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.nowPlaying, {
    params: { page, language, include_adult: false },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getUpcomingMovies(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.upcoming, {
    params: { page, language, include_adult: false },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getTopRatedMovies(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.topRated, {
    params: { page, language, include_adult: false },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getMovieDetails(
  id: number,
  language = "en-US"
): Promise<MovieDetail> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.details(id), {
    params: { language },
  });
  return mapMovieDetail(response.data);
}

export async function getMovieImages(
  id: number,
  language = "en-US"
): Promise<MovieImages> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.images(id), {
    params: { language },
  });
  return mapMovieImages(response.data);
}

export async function getMovieCredits(
  id: number,
  language = "en-US"
): Promise<MovieCredits> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.credits(id), {
    params: { language },
  });
  return mapMovieCredits(response.data);
}

export async function getMovieVideos(
  id: number,
  language = "en-US"
): Promise<MovieVideos> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.videos(id), {
    params: { language },
  });
  return response.data;
}

export async function getSimilarMovies(
  id: number,
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.similar(id), {
    params: { page, language, include_adult: false },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getMovieRecommendations(
  id: number,
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.recommendations(id), {
    params: { page, language, include_adult: false },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getMovieGenres(
  language = "en-US"
): Promise<{ genres: Genre[] }> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.genres.movie, {
    params: { language },
  });
  return response.data;
}

export async function searchMovies(
  query: string,
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.search.movie, {
    params: { query, page, language, include_adult: false },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getTrendingMovies(
  window: "day" | "week" = "day",
  language = "en-US"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.trending.movie(window), {
    params: { language },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getMovieWatchProviders(
  id: number
): Promise<MovieWatchProviders> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.watchProviders(id));
  return mapWatchProviders(response.data);
}

export async function getMovieKeywords(
  id: number
): Promise<MovieKeywords> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.keywords(id));
  return mapMovieKeywords(response.data);
}

export async function getMovieReleaseDates(
  id: number
): Promise<MovieReleaseDates> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.releaseDates(id));
  return mapMovieReleaseDates(response.data);
}

export async function discoverMovies(
  params: {
    page?: number;
    language?: string;
    sort_by?: string;
    with_genres?: string;
    primary_release_year?: number;
    "vote_average.gte"?: number;
    "vote_average.lte"?: number;
    "vote_count.gte"?: number;
    "with_runtime.gte"?: number;
    "with_runtime.lte"?: number;
    year?: number;
  } = {}
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.discover.movie, {
    params: {
      page: params.page || 1,
      language: params.language || "en-US",
      include_adult: false,
      include_video: false,
      sort_by: params.sort_by || "popularity.desc",
      ...params,
    },
  });
  return mapPaginatedResponse(response.data, mapMovieListItem);
}

export async function getPopularPeople(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<PersonListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.person.popular, {
    params: { page, language },
  });
  return mapPaginatedResponse(response.data, mapPersonListItem);
}

export async function getPersonDetails(
  id: number,
  language = "en-US"
): Promise<PersonDetail> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.person.details(id), {
    params: { language },
  });
  return mapPersonDetail(response.data);
}

export async function getPersonCombinedCredits(
  id: number,
  language = "en-US"
): Promise<PersonCombinedCredits> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.person.combinedCredits(id), {
    params: { language },
  });
  return mapPersonCombinedCredits(response.data);
}

export async function getMovieReviews(
  id: number,
  page = 1,
  language = "en-US"
): Promise<MovieReviews> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.reviews(id), {
    params: { page, language },
  });
  return mapMovieReviews(response.data);
}

export async function getMovieExternalIds(id: number): Promise<MovieExternalIds> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.externalIds(id));
  return mapMovieExternalIds(response.data);
}

export async function getMovieTranslations(id: number): Promise<MovieTranslations> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.movie.translations(id));
  return mapMovieTranslations(response.data);
}

export async function getCollectionDetails(
  id: number,
  language = "en-US"
): Promise<Collection> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.collection.details(id), {
    params: { language },
  });
  return mapCollection(response.data);
}

// TV Series
export async function getPopularTvSeries(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<TvSeriesListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.tv.popular, {
    params: { page, language },
  });
  return mapPaginatedResponse(response.data, mapTvSeriesListItem);
}

export async function getAiringTodayTvSeries(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<TvSeriesListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.tv.airingToday, {
    params: { page, language },
  });
  return mapPaginatedResponse(response.data, mapTvSeriesListItem);
}

export async function getOnTheAirTvSeries(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<TvSeriesListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.tv.onTheAir, {
    params: { page, language },
  });
  return mapPaginatedResponse(response.data, mapTvSeriesListItem);
}

export async function getTopRatedTvSeries(
  page = 1,
  language = "en-US"
): Promise<PaginatedResponse<TvSeriesListItem>> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.tv.topRated, {
    params: { page, language },
  });
  return mapPaginatedResponse(response.data, mapTvSeriesListItem);
}

export async function getTvSeriesDetails(
  id: number,
  language = "en-US"
): Promise<TvSeriesDetail> {
  const response = await tmdbClient.get(TMDB_ENDPOINTS.tv.details(id), {
    params: { language },
  });
  return mapTvSeriesDetail(response.data);
}
