// app/[conf]/[slug]/page.tsx
import Layout from "../../../components/Layout";
import Head from "next/head";
import Link from "next/link";
import api from "../../../lib/axios";
import { Article } from "../../../types";

export const dynamic = "force-dynamic"; // Har doim yangi (ixtiyoriy)

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ conf: string; slug: string }>;
}) {
  const { conf: confSlug, slug } = await params;
  const res = await api.get(`conferences/${confSlug}/${slug}/`);
  const article: Article = res.data;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.title,
    author: article.authors
      .split(", ")
      .map((name) => ({ "@type": "Person", name: name.trim() })),
    datePublished: article.pub_date,
    abstract: article.abstract,
    url: `https://your-site.com/${confSlug}/${article.slug}`,
    sameAs: article.doi ? `https://doi.org/${article.doi}` : undefined,
    isPartOf: {
      "@type": "PublicationEvent",
      name: article.conference_name,
    },
    encoding: {
      "@type": "MediaObject",
      contentUrl: article.pdf_url,
      encodingFormat: "application/pdf",
    },
  };

  return (
    <Layout title={article.title}>
      <Head>
        <meta name="description" content={article.meta_description} />
        <meta name="citation_title" content={article.title} />
        {article.authors.split(", ").map((author, i) => (
          <meta key={i} name="citation_author" content={author.trim()} />
        ))}
        <meta name="citation_publication_date" content={article.pub_date} />
        <meta name="citation_journal_title" content={article.conference_name} />
        <meta name="citation_pdf_url" content={article.pdf_url} />
        {article.doi && <meta name="citation_doi" content={article.doi} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href={`/${confSlug}`}>
              <span className="link link-primary text-sm">
                {article.conference_name}
              </span>
            </Link>
            <span className="text-sm opacity-50">/</span>
            <span className="text-sm opacity-70">Maqola</span>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            {article.title}
          </h1>
          <p className="text-lg opacity-80 mb-2">
            Mualliflar: <strong>{article.authors}</strong>
          </p>
          <p className="text-sm opacity-60">
            {new Date(article.pub_date).toLocaleDateString("uz-UZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-10 bg-base-100 p-8 rounded-xl">
          <p className="whitespace-pre-wrap">{article.abstract}</p>
        </div>

        <div className="text-center">
          <a
            href={article.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-accent gap-3"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" />
              <path d="M8 10l4-4m0 0l-4-4m4 4H6" />
            </svg>
            PDF yuklab olish
          </a>
        </div>
      </article>
    </Layout>
  );
}
