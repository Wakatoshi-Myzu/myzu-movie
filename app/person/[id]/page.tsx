import { notFound } from "next/navigation";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { PersonHero } from "@/app/person/[id]/_partials/person-hero";
import { PersonFilmography } from "@/app/person/[id]/_partials/person-filmography";
import { getPersonDetails, getPersonCombinedCredits } from "@/lib/tmdb/server";

interface PersonPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PersonPageProps) {
  const { id } = await params;
  const personId = Number(id);

  if (isNaN(personId)) {
    return { title: "Person Not Found" };
  }

  const person = await getPersonDetails(personId).catch(() => null);

  if (!person) {
    return { title: "Person Not Found" };
  }

  return {
    title: `${person.name} | Movie Archive`,
    description: person.biography?.slice(0, 160) || `Profile of ${person.name}`,
  };
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;
  const personId = Number(id);

  if (isNaN(personId)) {
    notFound();
  }

  const [person, credits] = await Promise.all([
    getPersonDetails(personId).catch(() => null),
    getPersonCombinedCredits(personId).catch(() => null),
  ]);

  if (!person || !credits) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <PersonHero person={person} />
        <div className="mx-auto max-w-7xl space-y-12 px-4 pb-12 sm:px-6 lg:px-8">
          <PersonFilmography credits={credits} />
        </div>
      </main>
      <Footer />
    </>
  );
}
