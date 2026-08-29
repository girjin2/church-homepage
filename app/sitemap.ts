import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://seojae-church.vercel.app";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/church`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/worship`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sermons`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/bulletin`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/location`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];
}
