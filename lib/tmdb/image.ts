const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export type ImageSize = "w45" | "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "h632" | "original";

export const POSTER_SIZES: Record<string, ImageSize> = {
  small: "w185",
  medium: "w342",
  large: "w500",
};

export const BACKDROP_SIZES: Record<string, ImageSize> = {
  small: "w300" as ImageSize,
  medium: "w780",
  large: "original",
};

export const PROFILE_SIZES: Record<string, ImageSize> = {
  small: "w45",
  medium: "w185",
  large: "h632",
};

export function getPosterUrl(
  path: string | null,
  size: ImageSize = "w500"
): string {
  if (!path) return "/placeholder-poster.svg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: ImageSize = "w780"
): string {
  if (!path) return "/placeholder-backdrop.svg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getProfileUrl(
  path: string | null,
  size: ImageSize = "w185"
): string {
  if (!path) return "/placeholder-profile.svg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
