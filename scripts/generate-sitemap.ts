import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { activities } from "../src/data/activities";
import { seoArticles } from "../src/data/seoArticles";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateSitemap() {
  console.log("[Sitemap-Generator] Starting sitemap build...");
  
  const baseUrl = "https://plan-srilanka.com";
  const today = new Date().toISOString().split('T')[0];
  
  const routes = [
    { loc: `${baseUrl}/`, lastmod: "2026-06-02", changefreq: "monthly", priority: "1.0" }
  ];

  // Automatically inject all scalable SEO article routes
  seoArticles.forEach(art => {
    routes.push({
      loc: `${baseUrl}${art.path}`,
      lastmod: today,
      changefreq: art.changefreq,
      priority: art.priority
    });
  });
  
  const legacyExperiences = [
    "cultural-triangle",
    "tea-country",
    "wildlife-safari",
    "yala-safari-morning",
    "yala-leopard-safari",
    "kumana-bird-safari",
    "udawalawe-elephant-safari",
    "scenic-train-ride",
    "surfing-arugam-bay",
    "whale-watching-mirissa",
    "pigeon-island-snorkeling",
    "sigiriya-rock-fortress",
    "pidurangala-sunrise-trek",
    "ella-rock-hiking",
    "nine-arch-bridge-walk",
    "tea-plantation-high-tea",
    "galle-fort-heritage-walk"
  ];
  
  const dynamicExperiences = activities.map(act => act.slug);
  const allExperiences = Array.from(new Set([...legacyExperiences, ...dynamicExperiences]));
  
  allExperiences.forEach(slug => {
    routes.push({
      loc: `${baseUrl}/experience/${slug}`,
      lastmod: "2026-06-02",
      changefreq: "monthly",
      priority: "0.8"
    });
  });

  const xmlParts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];
  
  routes.forEach(route => {
    xmlParts.push('  <url>');
    xmlParts.push(`    <loc>${route.loc}</loc>`);
    xmlParts.push(`    <lastmod>${route.lastmod}</lastmod>`);
    xmlParts.push(`    <changefreq>${route.changefreq}</changefreq>`);
    xmlParts.push(`    <priority>${route.priority}</priority>`);
    xmlParts.push('  </url>');
  });
  
  xmlParts.push('</urlset>');
  
  const publicDir = path.resolve(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xmlParts.join("\n"), "utf-8");
  
  console.log(`[Sitemap-Generator] Successfully wrote sitemap to ${sitemapPath}`);
}

generateSitemap();
