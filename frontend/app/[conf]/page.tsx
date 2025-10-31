// app/[conf]/page.tsx
import Layout from "../../components/Layout";
import Link from "next/link";
import api from "../../lib/axios";
import { Article, Conference } from "../../types";

export const dynamic = "force-dynamic"; // Har doim yangi ma'lumot olish uchun (ixtiyoriy)

export default async function ConferenceArticles({
  params,
}: {
  params: Promise<{ conf: string }>;
}) {
  const { conf: confSlug } = await params;
  const res = await api.get(`conferences/${confSlug}/`);
  const conference: Pick<Conference, "name" | "year" | "location"> = {
    name: res.data.name,
    year: res.data.year,
    location: res.data.location || "",
  };
  const articles: Article[] = res.data.articles;

  return (
    <Layout title={`${conference.name} • Maqolalar`}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">{conference.name}</h1>
        <div className="flex gap-2 mt-2">
          <div className="badge badge-lg badge-secondary">
            {conference.year}
          </div>
          <div className="badge badge-lg badge-outline">
            {conference.location}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl opacity-60">Hozircha maqola yo‘q</p>
          </div>
        ) : (
          articles.map((art) => (
            <Link key={art.id} href={`/${confSlug}/${art.slug}`}>
              <div className="block card bg-base-100 border hover:bg-base-200 transition-all p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-2">{art.title}</h2>
                <p className="text-sm text-base-content opacity-70 mb-3">
                  {art.authors}
                </p>
                <p className="line-clamp-2 text-base-content opacity-80">
                  {art.abstract}
                </p>
                <div className="mt-4 text-right">
                  <span className="link link-primary text-sm">Batafsil →</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </Layout>
  );
}
