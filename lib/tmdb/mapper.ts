export interface MovieListItem {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  genreIds: number[];
  popularity: number;
  originalLanguage: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  runtime: number | null;
  status: string;
  tagline: string;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdbId: string | null;
  budget: number;
  revenue: number;
  productionCompanies: { id: number; name: string; logoPath: string | null }[];
  spokenLanguages: { englishName: string; iso6391: string }[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath: string | null;
}

export interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieVideos {
  results: VideoResult[];
}

export interface MovieImage {
  filePath: string;
  width: number;
  height: number;
  aspectRatio: number;
  voteAverage: number;
  voteCount: number;
}

export interface MovieImages {
  backdrops: MovieImage[];
  posters: MovieImage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}

interface TmdbMovieListItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  adult: boolean;
}

interface TmdbMovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  status: string;
  tagline: string;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdb_id: string | null;
  budget: number;
  revenue: number;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  spoken_languages: { english_name: string; iso_639_1: string }[];
}

interface TmdbMovieImage {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

interface TmdbMovieImages {
  backdrops: TmdbMovieImage[];
  posters: TmdbMovieImage[];
}

interface TmdbCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface TmdbCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export function mapMovieListItem(tmdbMovie: TmdbMovieListItem): MovieListItem {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    overview: tmdbMovie.overview,
    posterPath: tmdbMovie.poster_path,
    backdropPath: tmdbMovie.backdrop_path,
    releaseDate: tmdbMovie.release_date,
    voteAverage: tmdbMovie.vote_average,
    voteCount: tmdbMovie.vote_count,
    genreIds: tmdbMovie.genre_ids,
    popularity: tmdbMovie.popularity,
    originalLanguage: tmdbMovie.original_language,
  };
}

export function mapMovieDetail(tmdbMovie: TmdbMovieDetail): MovieDetail {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    originalTitle: tmdbMovie.original_title,
    overview: tmdbMovie.overview,
    posterPath: tmdbMovie.poster_path,
    backdropPath: tmdbMovie.backdrop_path,
    releaseDate: tmdbMovie.release_date,
    voteAverage: tmdbMovie.vote_average,
    voteCount: tmdbMovie.vote_count,
    runtime: tmdbMovie.runtime,
    status: tmdbMovie.status,
    tagline: tmdbMovie.tagline,
    genres: tmdbMovie.genres,
    homepage: tmdbMovie.homepage,
    imdbId: tmdbMovie.imdb_id,
    budget: tmdbMovie.budget,
    revenue: tmdbMovie.revenue,
    productionCompanies: tmdbMovie.production_companies.map((c) => ({
      id: c.id,
      name: c.name,
      logoPath: c.logo_path,
    })),
    spokenLanguages: tmdbMovie.spoken_languages.map((l) => ({
      englishName: l.english_name,
      iso6391: l.iso_639_1,
    })),
  };
}

export function mapCastMember(tmdbCast: TmdbCastMember): CastMember {
  return {
    id: tmdbCast.id,
    name: tmdbCast.name,
    character: tmdbCast.character,
    profilePath: tmdbCast.profile_path,
    order: tmdbCast.order,
  };
}

export function mapCrewMember(tmdbCrew: TmdbCrewMember): CrewMember {
  return {
    id: tmdbCrew.id,
    name: tmdbCrew.name,
    job: tmdbCrew.job,
    department: tmdbCrew.department,
    profilePath: tmdbCrew.profile_path,
  };
}

export function mapMovieImages(tmdbImages: TmdbMovieImages): MovieImages {
  return {
    backdrops: tmdbImages.backdrops.map((img) => ({
      filePath: img.file_path,
      width: img.width,
      height: img.height,
      aspectRatio: img.aspect_ratio,
      voteAverage: img.vote_average,
      voteCount: img.vote_count,
    })),
    posters: tmdbImages.posters.map((img) => ({
      filePath: img.file_path,
      width: img.width,
      height: img.height,
      aspectRatio: img.aspect_ratio,
      voteAverage: img.vote_average,
      voteCount: img.vote_count,
    })),
  };
}

export function mapMovieCredits(tmdbCredits: {
  cast: TmdbCastMember[];
  crew: TmdbCrewMember[];
}): MovieCredits {
  return {
    cast: tmdbCredits.cast.map(mapCastMember),
    crew: tmdbCredits.crew.map(mapCrewMember),
  };
}

export function mapPaginatedResponse<T, R>(
  tmdbResponse: TmdbPaginatedResponse<T>,
  mapper: (item: T) => R
): PaginatedResponse<R> {
  return {
    page: tmdbResponse.page,
    results: tmdbResponse.results.filter((item) => !(item as { adult?: boolean }).adult).map(mapper),
    totalPages: tmdbResponse.total_pages,
    totalResults: tmdbResponse.total_results,
  };
}
