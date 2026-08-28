import axios from "axios";
import type { PaginatedResponse, MovieListItem, MovieDetail } from "@/lib/tmdb/mapper";

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
