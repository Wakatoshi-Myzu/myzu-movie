"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-sm font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]"
    >
      <Icon icon="mdi:arrow-left" className="size-4" />
      BACK
    </button>
  );
}
