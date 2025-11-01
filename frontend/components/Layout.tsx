// components/Layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../app/theme-context";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({
  children,
  title = "Ilmiy Konferensiyalar Arxivi",
}: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="SEO optimallashtirilgan ilmiy maqolalar, konferensiyalar va PDF arxivi"
        />
        <meta
          name="keywords"
          content="ilmiy maqolalar, konferensiya, PDF yuklab olish, Google Scholar, O‘zbekiston"
        />
        <meta name="author" content="Ilmiy Arxiv" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Eng yangi tadqiqotlar va maqolalar bilan tanishing"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Container */}
      <div className="min-h-screen flex flex-col bg-base-200">
        {/* Navbar - Zamonaviy va Responsive */}
        <div className="navbar bg-base-100 shadow-xl sticky top-0 z-50 border-b border-base-300">
          <div className="navbar-start">
            {/* Mobile Menu */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-box w-56 border border-base-300"
              >
                <li>
                  <Link
                    href="/"
                    className="hover:bg-primary hover:text-white transition-colors rounded-lg"
                  >
                    Bosh sahifa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#konferensiyalar"
                    className="hover:bg-primary hover:text-white transition-colors rounded-lg"
                  >
                    Konferensiyalar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:bg-primary hover:text-white transition-colors rounded-lg"
                  >
                    Biz haqimizda
                  </Link>
                </li>
              </ul>
            </div>

            {/* Logo va Nomi */}
            <Link
              href="/"
              className="flex items-center gap-3 btn btn-ghost text-xl font-bold text-primary hover:bg-primary/10 transition-all"
            >
              <span className="hidden sm:inline">Ilmiy Arxiv</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">
              <li>
                <Link
                  href="/"
                  className="btn btn-ghost hover:bg-primary hover:text-white transition-all rounded-xl"
                >
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link
                  href="/#konferensiyalar"
                  className="btn btn-ghost hover:bg-primary hover:text-white transition-all rounded-xl"
                >
                  Konferensiyalar
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="btn btn-ghost hover:bg-primary hover:text-white transition-all rounded-xl"
                >
                  Biz haqimizda
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side: Search + Theme Toggle */}
          <div className="navbar-end gap-2">
            {/* Search Input */}
            <div className="form-control">
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  placeholder="Maqola qidiring…"
                  className="input input-bordered input-sm w-32 md:w-48 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <button className="btn btn-square btn-sm btn-primary">
                  <svg
                    className="w-5 h-5"
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
                </button>
              </div>
            </div>

            {/* Dark/Light Mode Toggle */}
            <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-base-200 transition-all">
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              {/* Moon Icon (Dark Mode) */}
              <svg
                className="swap-on fill-current w-5 h-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
              {/* Sun Icon (Light Mode) */}
              <svg
                className="swap-off fill-current w-5 h-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </label>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

        {/* Footer - Chiroyli va Ma'lumotli */}
        <footer className="footer flex md:flex-row flex-col justify-between p-10 bg-base-300 text-base-content border-t border-base-200 mt-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-lg">Ilmiy Arxiv</span>
            </div>
            <p className="text-sm opacity-80">
              © 2025 Barcha huquqlar himoyalangan
            </p>
            <p className="text-xs opacity-60 mt-1">
              SEO optimallashtirilgan platforma
            </p>
          </div>

          <div>
            <span className="footer-title">Havolalar</span>
            <Link href="/" className="link link-hover">
              Bosh sahifa
            </Link>
            <Link href="/#konferensiyalar" className="link link-hover">
              Konferensiyalar
            </Link>
            <Link href="/about" className="link link-hover">
              Biz haqimizda
            </Link>
          </div>

          <div>
            <span className="footer-title">Ijtimoiy Tarmoqlar</span>
            <div className="grid grid-flow-col gap-4">
              <a href="#" className="link link-hover">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="link link-hover">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <span className="footer-title">Statistika</span>
            <div className="stats stats-vertical shadow bg-base-100">
              <div className="stat p-3">
                <div className="stat-title text-xs">Konferensiyalar</div>
                <div className="stat-value text-lg">150+</div>
              </div>
              <div className="stat p-3">
                <div className="stat-title text-xs">Maqolalar</div>
                <div className="stat-value text-lg">1,200+</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
