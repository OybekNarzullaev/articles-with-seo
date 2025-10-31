// types/index.ts

export interface Conference {
  id: number;
  name: string;
  slug: string;
  year: number;
  location: string;
  logo: string | null;
  articles?: Article[]; // Optional, maqolalar ro'yxati uchun
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  authors: string;
  abstract: string;
  pdf_url: string;
  pub_date: string;
  doi: string | null;
  conference_name: string;
  meta_description: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
