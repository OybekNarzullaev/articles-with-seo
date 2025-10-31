// app/sitemap.xml/route.tsx
import { NextResponse } from "next/server";
import api from "../../lib/axios";
import { Conference } from "../../types";

export async function GET() {
  const baseUrl = "https://your-site.com"; // Production URL
  const res = await api.get("conferences/");
  const conferences: Conference[] = res.data;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  conferences.forEach((conf) => {
    xml += `<url><loc>${baseUrl}/${conf.slug}</loc></url>`;
    conf.articles?.forEach((art) => {
      xml += `<url><loc>${baseUrl}/${conf.slug}/${art.slug}</loc><lastmod>${art.pub_date}</lastmod></url>`;
    });
  });

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}
