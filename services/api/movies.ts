import axios from "axios";
import type { PaginatedResponse, MovieListItem, MovieDetail, MovieImages, MovieVideos, MovieWatchProviders, MovieKeywords, MovieReleaseDates, MovieReviews, MovieExternalIds, MovieTranslations, Collection, PersonListItem, PersonDetail, PersonCombinedCredits, TvSeriesListItem, TvSeriesDetail } from "@/lib/tmdb/mapper";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "API request failed";
    return Promise.reject(new Error(message));
  }
);

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function fetchPopularMovies(
  page = 1
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    "/movies/popular",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchNowPlayingMovies(
  page = 1
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    "/movies/now-playing",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchUpcomingMovies(
  page = 1
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    "/movies/upcoming",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchTopRatedMovies(
  page = 1
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    "/movies/top-rated",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchMovieDetails(id: number): Promise<MovieDetail> {
  const response = await apiClient.get<ApiResponse<MovieDetail>>(
    `/movies/${id}`
  );
  return response.data.data;
}

export async function fetchMovieImages(id: number): Promise<MovieImages> {
  const response = await apiClient.get<ApiResponse<MovieImages>>(
    `/movies/${id}/images`
  );
  return response.data.data;
}

export async function fetchMovieVideos(id: number): Promise<MovieVideos> {
  const response = await apiClient.get<ApiResponse<MovieVideos>>(
    `/movies/${id}/videos`
  );
  return response.data.data;
}

export async function fetchSimilarMovies(
  id: number,
  page = 1
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    `/movies/${id}/similar`,
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchMovieRecommendations(
  id: number,
  page = 1
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    `/movies/${id}/recommendations`,
    { params: { page } }
  );
  return response.data.data;
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    "/search",
    { params: { q: query, page } }
  );
  return response.data.data;
}

export async function fetchTrendingMovies(
  window: "day" | "week" = "day"
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    "/movies/trending",
    { params: { window } }
  );
  return response.data.data;
}

export async function fetchMovieWatchProviders(
  id: number
): Promise<MovieWatchProviders> {
  const response = await apiClient.get<ApiResponse<MovieWatchProviders>>(
    `/movies/${id}/watch-providers`
  );
  return response.data.data;
}

export async function fetchMovieKeywords(
  id: number
): Promise<MovieKeywords> {
  const response = await apiClient.get<ApiResponse<MovieKeywords>>(
    `/movies/${id}/keywords`
  );
  return response.data.data;
}

export async function fetchMovieReleaseDates(
  id: number
): Promise<MovieReleaseDates> {
  const response = await apiClient.get<ApiResponse<MovieReleaseDates>>(
    `/movies/${id}/release-dates`
  );
  return response.data.data;
}

export async function fetchDiscoverMovies(
  params: Record<string, string | number | undefined> = {}
): Promise<PaginatedResponse<MovieListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<MovieListItem>>>(
    "/discover/movies",
    { params }
  );
  return response.data.data;
}

export async function fetchPopularPeople(
  page = 1
): Promise<PaginatedResponse<PersonListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<PersonListItem>>>(
    "/people",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchPersonDetails(
  id: number
): Promise<PersonDetail> {
  const response = await apiClient.get<ApiResponse<PersonDetail>>(
    `/people/${id}`
  );
  return response.data.data;
}

export async function fetchPersonCombinedCredits(
  id: number
): Promise<PersonCombinedCredits> {
  const response = await apiClient.get<ApiResponse<PersonCombinedCredits>>(
    `/people/${id}/credits`
  );
  return response.data.data;
}

// Movie Reviews
export async function fetchMovieReviews(
  id: number,
  page = 1
): Promise<MovieReviews> {
  const response = await apiClient.get<ApiResponse<MovieReviews>>(
    `/movies/${id}/reviews`,
    { params: { page } }
  );
  return response.data.data;
}

// Movie External IDs
export async function fetchMovieExternalIds(
  id: number
): Promise<MovieExternalIds> {
  const response = await apiClient.get<ApiResponse<MovieExternalIds>>(
    `/movies/${id}/external-ids`
  );
  return response.data.data;
}

// Movie Translations
export async function fetchMovieTranslations(
  id: number
): Promise<MovieTranslations> {
  const response = await apiClient.get<ApiResponse<MovieTranslations>>(
    `/movies/${id}/translations`
  );
  return response.data.data;
}

// Collection
export async function fetchCollectionDetails(
  id: number
): Promise<Collection> {
  const response = await apiClient.get<ApiResponse<Collection>>(
    `/collections/${id}`
  );
  return response.data.data;
}

// TV Series
export async function fetchPopularTvSeries(
  page = 1
): Promise<PaginatedResponse<TvSeriesListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<TvSeriesListItem>>>(
    "/tv/popular",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchAiringTodayTvSeries(
  page = 1
): Promise<PaginatedResponse<TvSeriesListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<TvSeriesListItem>>>(
    "/tv/airing-today",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchOnTheAirTvSeries(
  page = 1
): Promise<PaginatedResponse<TvSeriesListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<TvSeriesListItem>>>(
    "/tv/on-the-air",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchTopRatedTvSeries(
  page = 1
): Promise<PaginatedResponse<TvSeriesListItem>> {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<TvSeriesListItem>>>(
    "/tv/top-rated",
    { params: { page } }
  );
  return response.data.data;
}

export async function fetchTvSeriesDetails(
  id: number
): Promise<TvSeriesDetail> {
  const response = await apiClient.get<ApiResponse<TvSeriesDetail>>(
    `/tv/${id}`
  );
  return response.data.data;
}
