"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getBackdropUrl, getPosterUrl } from "@/lib/tmdb/image";
import { useMovieImages } from "@/hooks/use-movie-images";
import { useMovieVideos } from "@/hooks/use-movie-videos";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieMediaProps {
  movieId: number;
}

type MediaTab = "backdrops" | "posters" | "videos";

type SelectedMedia =
  | { type: "backdrop"; filePath: string; index: number }
  | { type: "poster"; filePath: string; index: number }
  | { type: "video"; key: string; name: string }
  | null;

export function MovieMedia({ movieId }: MovieMediaProps) {
  const [activeTab, setActiveTab] = useState<MediaTab>("backdrops");
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia>(null);

  const imagesQuery = useMovieImages(movieId);
  const videosQuery = useMovieVideos(movieId);

  const images = imagesQuery.data;
  const videos = videosQuery.data;

  const trailers = videos?.results.filter(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  ) || [];
  const teasers = videos?.results.filter(
    (v) => v.type === "Teaser" && v.site === "YouTube"
  ) || [];
  const allVideos = [...trailers, ...teasers];

  const tabs: { key: MediaTab; label: string; count: number }[] = [
    { key: "backdrops", label: "Backdrops", count: images?.backdrops.length || 0 },
    { key: "posters", label: "Posters", count: images?.posters.length || 0 },
    { key: "videos", label: "Videos", count: allVideos.length },
  ];

  const hasContent = tabs.some((t) => t.count > 0);

  if (imagesQuery.isLoading || videosQuery.isLoading) {
    return (
      <section>
        <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
          Media
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video animate-pulse rounded-lg border-[3px] border-[var(--nb-shadow)] bg-muted"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!hasContent) return null;

  return (
    <section>
      <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
        Media
      </h2>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) =>
          tab.count > 0 ? (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] ${
                activeTab === tab.key
                  ? "nb-on-primary bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              <Icon
                icon={
                  tab.key === "backdrops"
                    ? "mdi:landscape"
                    : tab.key === "posters"
                      ? "mdi:image-multiple"
                      : "mdi:play-circle"
                }
                className="size-4"
              />
              {tab.label}
              <span className="ml-0.5 rounded-full bg-background/20 px-1.5 py-0.5 text-[10px]">
                {tab.count}
              </span>
            </button>
          ) : null
        )}
      </div>

      {/* Backdrops */}
      {activeTab === "backdrops" && images?.backdrops && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {images.backdrops.slice(0, 12).map((img, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedMedia({ type: "backdrop", filePath: img.filePath, index })
              }
              className="nb-card group relative cursor-pointer overflow-hidden bg-card transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--nb-shadow)]"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={getBackdropUrl(img.filePath, "w780")}
                  alt={`Backdrop ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/10">
                  <Icon
                    icon="mdi:fullscreen"
                    className="size-8 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Posters */}
      {activeTab === "posters" && images?.posters && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.posters.slice(0, 15).map((img, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedMedia({ type: "poster", filePath: img.filePath, index })
              }
              className="nb-card group relative cursor-pointer overflow-hidden bg-card transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--nb-shadow)]"
            >
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getPosterUrl(img.filePath, "w342")}
                  alt={`Poster ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/10">
                  <Icon
                    icon="mdi:fullscreen"
                    className="size-8 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Videos */}
      {activeTab === "videos" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allVideos.map((video) => (
            <button
              key={video.id}
              onClick={() =>
                setSelectedMedia({ type: "video", key: video.key, name: video.name })
              }
              className="nb-card group overflow-hidden bg-card text-left transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--nb-shadow)]"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  alt={video.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 transition-colors group-hover:bg-muted/70">
                  <div className="nb-on-primary nb-shadow-sm flex size-14 items-center justify-center rounded-full border-[3px] border-[var(--nb-shadow)] bg-primary transition-transform group-hover:scale-110">
                    <Icon icon="mdi:play" className="size-7 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="border-t-[3px] border-[var(--nb-shadow)] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black">{video.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {video.type}
                      {video.official && " • Official"}
                    </p>
                  </div>
                  <Icon
                    icon="mdi:play-circle-outline"
                    className="size-5 shrink-0 text-primary"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Responsive Modal for Images */}
      <ResponsiveModal
        open={selectedMedia !== null && selectedMedia.type !== "video"}
        onOpenChange={(open) => {
          if (!open) setSelectedMedia(null);
        }}
        title="Image Viewer"
      >
        {selectedMedia && selectedMedia.type === "backdrop" && (
          <div className="relative flex items-center justify-center overflow-hidden bg-muted p-2 sm:p-4">
            <ImageSkeleton />
            <Image
              src={getBackdropUrl(selectedMedia.filePath, "original")}
              alt="Backdrop full size"
              width={1920}
              height={1080}
              className="relative h-auto w-full rounded-lg object-contain"
              priority
            />
          </div>
        )}
        {selectedMedia && selectedMedia.type === "poster" && (
          <div className="relative flex items-center justify-center overflow-hidden bg-muted p-2 sm:p-4">
            <ImageSkeleton />
            <Image
              src={getPosterUrl(selectedMedia.filePath, "original")}
              alt="Poster full size"
              width={800}
              height={1200}
              className="relative mx-auto h-auto max-h-[70vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>
        )}
      </ResponsiveModal>

      {/* Responsive Modal for Videos */}
      <ResponsiveModal
        open={selectedMedia !== null && selectedMedia.type === "video"}
        onOpenChange={(open) => {
          if (!open) setSelectedMedia(null);
        }}
        title="Video Player"
      >
        {selectedMedia && selectedMedia.type === "video" && (
          <div className="relative overflow-hidden bg-muted">
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedMedia.key}?autoplay=1&rel=0`}
                title={selectedMedia.name}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </ResponsiveModal>
    </section>
  );
}

function ImageSkeleton() {
  return (
    <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />
  );
}
