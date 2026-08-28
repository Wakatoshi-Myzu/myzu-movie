import axios from "axios";

const tmdbClient = axios.create({
  baseURL: process.env.MOVIE_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.MOVIE_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.status_message || "TMDB API request failed";
    return Promise.reject(new Error(message));
  }
);

export default tmdbClient;
