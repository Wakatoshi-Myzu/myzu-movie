export const movieKeys = {
  all: ["movies"] as const,
  popular: (page = 1) => [...movieKeys.all, "popular", page] as const,
  nowPlaying: (page = 1) => [...movieKeys.all, "now-playing", page] as const,
  upcoming: (page = 1) => [...movieKeys.all, "upcoming", page] as const,
  topRated: (page = 1) => [...movieKeys.all, "top-rated", page] as const,
  detail: (id: number) => [...movieKeys.all, "detail", id] as const,
  similar: (id: number, page = 1) =>
    [...movieKeys.all, "similar", id, page] as const,
};

export const searchKeys = {
  all: ["search"] as const,
  movies: (query: string, page = 1) =>
    [...searchKeys.all, "movies", query, page] as const,
};

export const genreKeys = {
  all: ["genres"] as const,
  movie: () => [...genreKeys.all, "movie"] as const,
};
