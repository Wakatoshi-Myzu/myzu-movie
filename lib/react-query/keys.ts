export const movieKeys = {
  all: ["movies"] as const,
  popular: (page = 1) => [...movieKeys.all, "popular", page] as const,
  nowPlaying: (page = 1) => [...movieKeys.all, "now-playing", page] as const,
  upcoming: (page = 1) => [...movieKeys.all, "upcoming", page] as const,
  topRated: (page = 1) => [...movieKeys.all, "top-rated", page] as const,
  trending: (window: string = "day") => [...movieKeys.all, "trending", window] as const,
  detail: (id: number) => [...movieKeys.all, "detail", id] as const,
  similar: (id: number, page = 1) =>
    [...movieKeys.all, "similar", id, page] as const,
  watchProviders: (id: number) =>
    [...movieKeys.all, "watch-providers", id] as const,
  keywords: (id: number) => [...movieKeys.all, "keywords", id] as const,
  releaseDates: (id: number) =>
    [...movieKeys.all, "release-dates", id] as const,
  reviews: (id: number, page = 1) =>
    [...movieKeys.all, "reviews", id, page] as const,
  externalIds: (id: number) =>
    [...movieKeys.all, "external-ids", id] as const,
  translations: (id: number) =>
    [...movieKeys.all, "translations", id] as const,
};

export const collectionKeys = {
  all: ["collections"] as const,
  detail: (id: number) => [...collectionKeys.all, "detail", id] as const,
};

export const tvKeys = {
  all: ["tv"] as const,
  popular: (page = 1) => [...tvKeys.all, "popular", page] as const,
  airingToday: (page = 1) => [...tvKeys.all, "airing-today", page] as const,
  onTheAir: (page = 1) => [...tvKeys.all, "on-the-air", page] as const,
  topRated: (page = 1) => [...tvKeys.all, "top-rated", page] as const,
  detail: (id: number) => [...tvKeys.all, "detail", id] as const,
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

export const discoverKeys = {
  all: ["discover"] as const,
  movies: (params: Record<string, unknown>) =>
    [...discoverKeys.all, "movies", params] as const,
};

export const personKeys = {
  all: ["people"] as const,
  popular: (page = 1) => [...personKeys.all, "popular", page] as const,
  detail: (id: number) => [...personKeys.all, "detail", id] as const,
  credits: (id: number) => [...personKeys.all, "credits", id] as const,
};
