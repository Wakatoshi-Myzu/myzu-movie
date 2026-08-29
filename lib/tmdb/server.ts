import tmdbClient from "@/lib/axios/tmdb";
import { TMDB_ENDPOINTS } from "@/lib/tmdb/endpoints";
import {
  mapMovieListItem,
  mapMovieDetail,
  mapMovieCredits,
  mapMovieImages,
  mapPaginatedResponse,
  type MovieListItem,
  type MovieDetail,
  type MovieCredits,
  type MovieImages,
  type PaginatedResponse,
  type Genre,
  type MovieVideos,
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
