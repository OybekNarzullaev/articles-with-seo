// app/page.tsx
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import api from "../lib/axios";
import { Conference } from "../types";

export const revalidate = 3600; // 1 soatda yangilash (ISR)

export default async function Home() {
  const res = await api.get("conferences/");
  const conferences: Conference[] = res.data;

  return (
    <Layout title="Ilmiy Konferensiyalar Arxivi">
      {/* Hero Section - Zamonaviy va Chiroyli Dizayn */}
      <div
        className="hero min-h-screen relative overflow-hidden bg-cover bg-center"
        // style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
      >
        {" "}
        {/* Orqa fon rasm: ilmiy kitoblar yoki konferensiya zal */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80"></div>{" "}
        {/* Overlay gradient */}
        <div className="hero-content text-center relative z-10 flex flex-col items-center justify-center px-4">
          <div className="max-w-4xl animate-fade-in-up">
            {/* Sarlavha */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
                Ilmiy
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-300">
                Konferensiyalar Arxivi
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-3xl text-white/90 mb-10 max-w-3xl mx-auto font-light tracking-wide drop-shadow-md animate-fade-in-delay">
              Eng yangi tadqiqotlar, maqolalar va PDF fayllar bilan tanishing.
              SEO optimallashtirilgan va qidiruv tizimlarida oson topiladigan
              platforma.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#konferensiyalar">
                <button className="btn btn-lg btn-white text-primary shadow-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  Konferensiyalarni Ko'rish
                </button>
              </Link>
              <button className="btn btn-lg btn-outline btn-white shadow-xl hover:bg-white hover:text-primary transition-all duration-300 flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Qidiruv
              </button>
            </div>
          </div>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Konferensiyalar Section - ID bilan */}
      <section id="konferensiyalar" className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12 animate-fade-in">
            Eng Mashhur Konferensiyalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conferences.map((conf) => (
              <Link key={conf.id} href={`/${conf.slug}`}>
                <div className="card bg-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden border border-base-300">
                  <figure className="h-48 relative">
                    {conf.logo ? (
                      <Image
                        src={conf.logo}
                        alt={conf.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                        <svg
                          className="w-20 h-20 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    )}
                  </figure>
                  <div className="card-body p-6">
                    <h2 className="card-title text-2xl font-semibold text-primary mb-2">
                      {conf.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="badge badge-primary badge-lg">
                        {conf.year}
                      </div>
                      <div className="badge badge-outline badge-lg">
                        {conf.location}
                      </div>
                    </div>
                    <p className="text-base-content opacity-70 mb-4 line-clamp-2">
                      Ushbu konferensiyada eng yangi ilmiy ishlanmalar muhokama
                      qilinadi.
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary hover:btn-accent transition-colors">
                        Maqolalar →
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Nima Uchun Bizni Tanlash Kerak?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6 text-center">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Tez va Oson Qidiruv
              </h3>
              <p className="text-base-content opacity-80">
                Google Scholar integratsiyasi bilan maqolalarni tez toping.
              </p>
            </div>
            <div className="card bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6 text-center">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Doimiy Yangilanish</h3>
              <p className="text-base-content opacity-80">
                Har kuni yangi maqolalar va konferensiyalar qo'shiladi.
              </p>
            </div>
            <div className="card bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6 text-center">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Xavfsiz va Ishonchli
              </h3>
              <p className="text-base-content opacity-80">
                Barcha ma'lumotlar tasdiqlangan manbalardan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
