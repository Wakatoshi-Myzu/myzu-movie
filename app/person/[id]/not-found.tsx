import Link from "next/link";
import { Icon } from "@iconify/react";

export default function PersonNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="nb-card mx-auto max-w-md bg-card p-8">
        <Icon
          icon="mdi:account-question-outline"
          className="mx-auto mb-4 size-16 text-muted-foreground"
        />
        <h1 className="mb-2 text-2xl font-black uppercase">Person Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The person you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/people"
          className="nb-btn nb-on-primary inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          <Icon icon="mdi:account-group" className="size-4" />
          BROWSE PEOPLE
        </Link>
      </div>
    </div>
  );
}
