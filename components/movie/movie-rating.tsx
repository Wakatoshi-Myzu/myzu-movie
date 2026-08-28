import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface MovieRatingProps {
  rating: number;
  className?: string;
}

export function MovieRating({ rating, className }: MovieRatingProps) {
  const formattedRating = rating.toFixed(1);

  return (
    <div
      className={cn(
        "nb-badge nb-on-yellow inline-flex items-center gap-1 bg-yellow-400 px-2 py-0.5 text-xs font-black text-black",
        className
      )}
    >
      <Icon icon="mdi:star" className="size-3" />
      <span>{formattedRating}</span>
    </div>
  );
}
