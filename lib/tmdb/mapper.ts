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

// Watch Providers
export interface WatchProvider {
  providerId: number;
  providerName: string;
  logoPath: string;
}

export interface WatchProviderItem {
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  free?: WatchProvider[];
}

export interface MovieWatchProviders {
  id: number;
  results: Record<string, WatchProviderItem>;
}

// Person/People
export interface PersonListItem {
  id: number;
  name: string;
  popularity: number;
  profilePath: string | null;
  knownForDepartment: string;
}

export interface PersonDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  placeOfBirth: string | null;
  profilePath: string | null;
  popularity: number;
  knownForDepartment: string;
  alsoKnownAs: string[];
  homepage: string | null;
}

export interface PersonCastCredit {
  id: number;
  title: string;
  originalTitle: string;
  character: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  overview: string;
  genreIds: number[];
  mediaType: string;
  popularity: number;
}

export interface PersonCrewCredit {
  id: number;
  title: string;
  originalTitle: string;
  job: string;
  department: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  overview: string;
  genreIds: number[];
  mediaType: string;
  popularity: number;
}

export interface PersonCombinedCredits {
  id: number;
  cast: PersonCastCredit[];
  crew: PersonCrewCredit[];
}

// Discover
export interface DiscoverMovieParams {
  page?: number;
  language?: string;
  sortBy?: string;
  genreIds?: string;
  primaryReleaseYear?: number;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  year?: number;
}

// Keywords
export interface MovieKeyword {
  id: number;
  name: string;
}

export interface MovieKeywords {
  id: number;
  keywords: MovieKeyword[];
}

// Reviews
export interface ReviewAuthorDetails {
  name: string;
  username: string;
  avatarPath: string | null;
  rating: number | null;
}

export interface MovieReview {
  id: string;
  author: string;
  authorDetails: ReviewAuthorDetails;
  content: string;
  createdAt: string;
  url: string;
}

export interface MovieReviews {
  id: number;
  page: number;
  results: MovieReview[];
  totalPages: number;
  totalResults: number;
}

// External IDs
export interface MovieExternalIds {
  id: number;
  imdbId: string | null;
  wikidataId: string | null;
  facebookId: string | null;
  instagramId: string | null;
  twitterId: string | null;
}

// Translations
export interface Translation {
  iso6391: string;
  iso31661: string;
  name: string;
  englishName: string;
}

export interface MovieTranslations {
  id: number;
  translations: Translation[];
}

// Collection
export interface Collection {
  id: number;
  name: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  parts: MovieListItem[];
}

// TV Series
export interface TvSeriesListItem {
  id: number;
  name: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  firstAirDate: string;
  voteAverage: number;
  voteCount: number;
  genreIds: number[];
  popularity: number;
  originalLanguage: string;
  originCountry: string[];
}

export interface TvSeriesDetail {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  firstAirDate: string;
  lastAirDate: string | null;
  voteAverage: number;
  voteCount: number;
  status: string;
  tagline: string;
  genres: { id: number; name: string }[];
  homepage: string | null;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  seasons: TvSeason[];
  networks: { id: number; name: string; logoPath: string | null }[];
  createdBy: { id: number; name: string; profilePath: string | null }[];
  spokenLanguages: { englishName: string; iso6391: string }[];
  productionCompanies: { id: number; name: string; logoPath: string | null }[];
}

export interface TvSeason {
  id: number;
  name: string;
  overview: string;
  seasonNumber: number;
  episodeCount: number;
  airDate: string | null;
  posterPath: string | null;
  voteAverage: number;
}

export interface TvEpisode {
  id: number;
  name: string;
  overview: string;
  episodeNumber: number;
  seasonNumber: number;
  airDate: string | null;
  stillPath: string | null;
  voteAverage: number;
  voteCount: number;
  runtime: number | null;
}

// Release Dates
export interface ReleaseDate {
  certification: string;
  descriptors: string[];
  iso6391: string;
  note: string;
  releaseDate: string;
  type: number;
}

export interface ReleaseDateResult {
  iso31661: string;
  releaseDates: ReleaseDate[];
}

export interface MovieReleaseDates {
  id: number;
  results: ReleaseDateResult[];
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

interface TmdbWatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface TmdbWatchProviderItem {
  flatrate?: TmdbWatchProvider[];
  rent?: TmdbWatchProvider[];
  buy?: TmdbWatchProvider[];
  free?: TmdbWatchProvider[];
}

interface TmdbPersonListItem {
  id: number;
  name: string;
  popularity: number;
  profile_path: string | null;
  known_for_department: string;
}

interface TmdbPersonDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
  also_known_as: string[];
  homepage: string | null;
}

interface TmdbPersonCastCredit {
  id: number;
  title: string;
  original_title: string;
  character: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  media_type: string;
  popularity: number;
}

interface TmdbPersonCrewCredit {
  id: number;
  title: string;
  original_title: string;
  job: string;
  department: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  media_type: string;
  popularity: number;
}

interface TmdbPersonCombinedCredits {
  id: number;
  cast: TmdbPersonCastCredit[];
  crew: TmdbPersonCrewCredit[];
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

export function mapWatchProviders(tmdbData: {
  id: number;
  results: Record<string, TmdbWatchProviderItem>;
}): MovieWatchProviders {
  const results: Record<string, WatchProviderItem> = {};
  for (const [region, item] of Object.entries(tmdbData.results)) {
    results[region] = {
      flatrate: item.flatrate?.map((p) => ({
        providerId: p.provider_id,
        providerName: p.provider_name,
        logoPath: p.logo_path,
      })),
      rent: item.rent?.map((p) => ({
        providerId: p.provider_id,
        providerName: p.provider_name,
        logoPath: p.logo_path,
      })),
      buy: item.buy?.map((p) => ({
        providerId: p.provider_id,
        providerName: p.provider_name,
        logoPath: p.logo_path,
      })),
      free: item.free?.map((p) => ({
        providerId: p.provider_id,
        providerName: p.provider_name,
        logoPath: p.logo_path,
      })),
    };
  }
  return { id: tmdbData.id, results };
}

export function mapPersonListItem(tmdbPerson: TmdbPersonListItem): PersonListItem {
  return {
    id: tmdbPerson.id,
    name: tmdbPerson.name,
    popularity: tmdbPerson.popularity,
    profilePath: tmdbPerson.profile_path,
    knownForDepartment: tmdbPerson.known_for_department,
  };
}

export function mapPersonDetail(tmdbPerson: TmdbPersonDetail): PersonDetail {
  return {
    id: tmdbPerson.id,
    name: tmdbPerson.name,
    biography: tmdbPerson.biography,
    birthday: tmdbPerson.birthday,
    deathday: tmdbPerson.deathday,
    placeOfBirth: tmdbPerson.place_of_birth,
    profilePath: tmdbPerson.profile_path,
    popularity: tmdbPerson.popularity,
    knownForDepartment: tmdbPerson.known_for_department,
    alsoKnownAs: tmdbPerson.also_known_as,
    homepage: tmdbPerson.homepage,
  };
}

export function mapPersonCastCredit(tmdbCredit: TmdbPersonCastCredit): PersonCastCredit {
  return {
    id: tmdbCredit.id,
    title: tmdbCredit.title,
    originalTitle: tmdbCredit.original_title,
    character: tmdbCredit.character,
    posterPath: tmdbCredit.poster_path,
    backdropPath: tmdbCredit.backdrop_path,
    releaseDate: tmdbCredit.release_date,
    voteAverage: tmdbCredit.vote_average,
    overview: tmdbCredit.overview,
    genreIds: tmdbCredit.genre_ids,
    mediaType: tmdbCredit.media_type,
    popularity: tmdbCredit.popularity,
  };
}

export function mapPersonCrewCredit(tmdbCredit: TmdbPersonCrewCredit): PersonCrewCredit {
  return {
    id: tmdbCredit.id,
    title: tmdbCredit.title,
    originalTitle: tmdbCredit.original_title,
    job: tmdbCredit.job,
    department: tmdbCredit.department,
    posterPath: tmdbCredit.poster_path,
    backdropPath: tmdbCredit.backdrop_path,
    releaseDate: tmdbCredit.release_date,
    voteAverage: tmdbCredit.vote_average,
    overview: tmdbCredit.overview,
    genreIds: tmdbCredit.genre_ids,
    mediaType: tmdbCredit.media_type,
    popularity: tmdbCredit.popularity,
  };
}

export function mapPersonCombinedCredits(tmdbCredits: TmdbPersonCombinedCredits): PersonCombinedCredits {
  return {
    id: tmdbCredits.id,
    cast: tmdbCredits.cast.map(mapPersonCastCredit),
    crew: tmdbCredits.crew.map(mapPersonCrewCredit),
  };
}

export function mapMovieKeywords(tmdbData: { id: number; keywords: { id: number; name: string }[] }): MovieKeywords {
  return {
    id: tmdbData.id,
    keywords: tmdbData.keywords.map((k) => ({ id: k.id, name: k.name })),
  };
}

export function mapMovieReleaseDates(tmdbData: {
  id: number;
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      descriptors: string[];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }[];
  }[];
}): MovieReleaseDates {
  return {
    id: tmdbData.id,
    results: tmdbData.results.map((r) => ({
      iso31661: r.iso_3166_1,
      releaseDates: r.release_dates.map((rd) => ({
        certification: rd.certification,
        descriptors: rd.descriptors,
        iso6391: rd.iso_639_1,
        note: rd.note,
        releaseDate: rd.release_date,
        type: rd.type,
      })),
    })),
  };
}

// Reviews mappers
interface TmdbReviewAuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

interface TmdbMovieReview {
  id: string;
  author: string;
  author_details: TmdbReviewAuthorDetails;
  content: string;
  created_at: string;
  url: string;
}

interface TmdbMovieReviews {
  id: number;
  page: number;
  results: TmdbMovieReview[];
  total_pages: number;
  total_results: number;
}

export function mapMovieReviews(tmdbData: TmdbMovieReviews): MovieReviews {
  return {
    id: tmdbData.id,
    page: tmdbData.page,
    results: tmdbData.results.map((r) => ({
      id: r.id,
      author: r.author,
      authorDetails: {
        name: r.author_details.name,
        username: r.author_details.username,
        avatarPath: r.author_details.avatar_path,
        rating: r.author_details.rating,
      },
      content: r.content,
      createdAt: r.created_at,
      url: r.url,
    })),
    totalPages: tmdbData.total_pages,
    totalResults: tmdbData.total_results,
  };
}

// External IDs mapper
interface TmdbMovieExternalIds {
  id: number;
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export function mapMovieExternalIds(tmdbData: TmdbMovieExternalIds): MovieExternalIds {
  return {
    id: tmdbData.id,
    imdbId: tmdbData.imdb_id,
    wikidataId: tmdbData.wikidata_id,
    facebookId: tmdbData.facebook_id,
    instagramId: tmdbData.instagram_id,
    twitterId: tmdbData.twitter_id,
  };
}

// Translations mapper
interface TmdbTranslation {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  english_name: string;
}

interface TmdbMovieTranslations {
  id: number;
  translations: TmdbTranslation[];
}

export function mapMovieTranslations(tmdbData: TmdbMovieTranslations): MovieTranslations {
  return {
    id: tmdbData.id,
    translations: tmdbData.translations.map((t) => ({
      iso6391: t.iso_639_1,
      iso31661: t.iso_3166_1,
      name: t.name,
      englishName: t.english_name,
    })),
  };
}

// Collection mapper
interface TmdbCollection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: TmdbMovieListItem[];
}

export function mapCollection(tmdbData: TmdbCollection): Collection {
  return {
    id: tmdbData.id,
    name: tmdbData.name,
    overview: tmdbData.overview,
    posterPath: tmdbData.poster_path,
    backdropPath: tmdbData.backdrop_path,
    parts: tmdbData.parts.map(mapMovieListItem),
  };
}

// TV Series mappers
interface TmdbTvSeriesListItem {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  origin_country: string[];
}

export function mapTvSeriesListItem(tmdbShow: TmdbTvSeriesListItem): TvSeriesListItem {
  return {
    id: tmdbShow.id,
    name: tmdbShow.name,
    overview: tmdbShow.overview,
    posterPath: tmdbShow.poster_path,
    backdropPath: tmdbShow.backdrop_path,
    firstAirDate: tmdbShow.first_air_date,
    voteAverage: tmdbShow.vote_average,
    voteCount: tmdbShow.vote_count,
    genreIds: tmdbShow.genre_ids,
    popularity: tmdbShow.popularity,
    originalLanguage: tmdbShow.original_language,
    originCountry: tmdbShow.origin_country,
  };
}

interface TmdbTvSeason {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episode_count: number;
  air_date: string | null;
  poster_path: string | null;
  vote_average: number;
}

interface TmdbTvSeriesDetail {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string | null;
  vote_average: number;
  vote_count: number;
  status: string;
  tagline: string;
  genres: { id: number; name: string }[];
  homepage: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: TmdbTvSeason[];
  networks: { id: number; name: string; logo_path: string | null }[];
  created_by: { id: number; name: string; profile_path: string | null }[];
  spoken_languages: { english_name: string; iso_639_1: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
}

export function mapTvSeriesDetail(tmdbShow: TmdbTvSeriesDetail): TvSeriesDetail {
  return {
    id: tmdbShow.id,
    name: tmdbShow.name,
    originalName: tmdbShow.original_name,
    overview: tmdbShow.overview,
    posterPath: tmdbShow.poster_path,
    backdropPath: tmdbShow.backdrop_path,
    firstAirDate: tmdbShow.first_air_date,
    lastAirDate: tmdbShow.last_air_date,
    voteAverage: tmdbShow.vote_average,
    voteCount: tmdbShow.vote_count,
    status: tmdbShow.status,
    tagline: tmdbShow.tagline,
    genres: tmdbShow.genres,
    homepage: tmdbShow.homepage,
    numberOfSeasons: tmdbShow.number_of_seasons,
    numberOfEpisodes: tmdbShow.number_of_episodes,
    seasons: tmdbShow.seasons.map((s) => ({
      id: s.id,
      name: s.name,
      overview: s.overview,
      seasonNumber: s.season_number,
      episodeCount: s.episode_count,
      airDate: s.air_date,
      posterPath: s.poster_path,
      voteAverage: s.vote_average,
    })),
    networks: tmdbShow.networks.map((n) => ({
      id: n.id,
      name: n.name,
      logoPath: n.logo_path,
    })),
    createdBy: tmdbShow.created_by.map((c) => ({
      id: c.id,
      name: c.name,
      profilePath: c.profile_path,
    })),
    spokenLanguages: tmdbShow.spoken_languages.map((l) => ({
      englishName: l.english_name,
      iso6391: l.iso_639_1,
    })),
    productionCompanies: tmdbShow.production_companies.map((c) => ({
      id: c.id,
      name: c.name,
      logoPath: c.logo_path,
    })),
  };
}
