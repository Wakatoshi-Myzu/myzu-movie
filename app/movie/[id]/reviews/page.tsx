"use client";

import { useState } from "react";
import Link from "next/link";
import { useMovieReviews } from "@/hooks/use-movie-reviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { use } from "react";
import type { MovieReview } from "@/lib/tmdb/mapper";

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

export default function MovieReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const movieId = Number(id);

  const { data: reviews, isLoading, error } = useMovieReviews(movieId);
  const [selectedReview, setSelectedReview] = useState<MovieReview | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-[3px] border-[var(--nb-shadow)] bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href={`/movie/${movieId}`}
            className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
          >
            <Icon icon="mdi:arrow-left" className="size-4" />
            BACK
          </Link>
          <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black">
            ALL REVIEWS
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Reviews
            </h1>
            {reviews && (
              <p className="mt-2 text-sm text-muted-foreground">
                {reviews.totalResults} reviews from the community
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="nb-card bg-card p-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="nb-shadow-sm size-10 shrink-0 rounded-full border-[2.5px] border-[var(--nb-shadow)] bg-muted" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 rounded bg-muted" />
                      <div className="h-3 w-16 rounded bg-muted" />
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="nb-card bg-card p-8 text-center">
              <Icon icon="mdi:alert-circle" className="mx-auto mb-3 size-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Failed to load reviews</p>
            </div>
          ) : !reviews?.results.length ? (
            <div className="nb-card bg-card p-8 text-center">
              <Icon icon="mdi:comment-outline" className="mx-auto mb-3 size-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No reviews yet</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.results.map((review) => (
                <div
                  key={review.id}
                  className="nb-card group flex flex-col bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="nb-shadow-sm size-10 shrink-0 border-[2.5px] border-[var(--nb-shadow)]">
                      <AvatarImage src={review.authorDetails.avatarPath || undefined} alt={review.author} />
                      <AvatarFallback className="bg-muted text-xs font-black">
                        {review.author.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black uppercase tracking-tight group-hover:text-primary">
                          {review.author}
                        </span>
                        {review.authorDetails.rating && (
                          <span className="nb-badge nb-on-yellow bg-yellow-400 px-1.5 py-0.5 text-[10px] font-black text-black">
                            ★ {review.authorDetails.rating}/10
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(review.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-5">
                    {review.content}
                  </p>
                  <div className="mt-3 flex justify-center sm:justify-end">
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="nb-border-sm nb-shadow-sm inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] sm:w-auto"
                    >
                      <Icon icon="mdi:open-in-new" className="size-3" />
                      Read Full Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Review Detail Modal */}
      <ResponsiveModal
        open={selectedReview !== null}
        onOpenChange={(open) => !open && setSelectedReview(null)}
        title="Review Details"
      >
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {selectedReview && (
            <>
              <div className="mb-4 flex items-center gap-2">
                <Icon icon="mdi:comment-text-outline" className="size-5 text-primary" />
                <h3 className="text-lg font-black uppercase tracking-tight">
                  Review
                </h3>
                {selectedReview.authorDetails.rating && (
                  <span className="nb-badge nb-on-yellow bg-yellow-400 px-2 py-0.5 text-xs font-black text-black">
                    ★ {selectedReview.authorDetails.rating}/10
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Avatar className="nb-shadow-sm size-12 shrink-0 border-[2.5px] border-[var(--nb-shadow)]">
                  <AvatarImage src={selectedReview.authorDetails.avatarPath || undefined} alt={selectedReview.author} />
                  <AvatarFallback className="bg-muted text-xs font-black">
                    {selectedReview.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-black uppercase tracking-tight">
                    {selectedReview.author}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(selectedReview.createdAt)}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {selectedReview.content}
              </p>
            </>
          )}
        </div>
      </ResponsiveModal>
    </div>
  );
}