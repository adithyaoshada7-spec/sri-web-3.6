import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { activities } from "./src/data/activities";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Dynamic sitemap.xml route for SEO compliance
  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    
    const baseUrl = "https://plan-srilanka.com";
    const today = new Date().toISOString().split('T')[0];
    
    const routes = [
      { loc: `${baseUrl}/`, lastmod: "2026-06-02", changefreq: "monthly", priority: "1.0" },
      { loc: `${baseUrl}/sri-lanka-trip-cost-from-india`, lastmod: today, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/sri-lanka-7-day-itinerary`, lastmod: today, changefreq: "weekly", priority: "0.9" }
    ];
    
    const legacyExperiences = [
      "cultural-triangle",
      "tea-country",
      "wildlife-safari"
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
    res.send(xmlParts.join("\n"));
  });

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
  }

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Filter out asset requests that should have been handled by middlewares/static
    if (url.includes('.') && !url.endsWith('.html')) {
      return next();
    }

    try {
      let template: string;
      if (process.env.NODE_ENV !== "production") {
        template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.resolve(__dirname, "dist/index.html"), "utf-8");
      }

      // Metadata Injection Logic
      const experienceMatch = url.match(/\/experience\/([^/?#]+)/);
      let title = "Plan Sri Lanka | Curated Luxury Travel";
      let description = "Bespoke luxury journeys through the teardrop of the Indian Ocean. Unrivalled service for the discerning traveller.";
      let image = "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630";
      const domain = "https://plan-srilanka.com";
      const urlPath = url === '/' ? '' : url;
      const absoluteUrl = `${domain}${urlPath}`;

      if (url.includes('/sri-lanka-trip-cost-from-india')) {
        title = "Sri Lanka Trip Cost From India: Interactive 2026 Budget Planner";
        description = "Ultimate breakdown of Sri Lanka trip costs from India. Direct flights, hotels, food, private SUVs, and visa rates. Calculate your custom 2026 vacation budget instantly.";
        image = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1";
      } else if (url.includes('/sri-lanka-7-day-itinerary')) {
        title = "Sri Lanka 7-Day Itinerary: The Classic Curated Route (2026)";
        description = "The definitive day-by-day Sri Lanka 7-day itinerary for Indian travelers. Cover Sigiriya, Kandy, Ella train, Yala safari, and Galle Fort with exact pricing guides.";
        image = "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630";
      } else if (experienceMatch) {
        const slug = experienceMatch[1];
        const activity = activities.find(a => a.slug === slug);
        if (activity) {
          title = `${activity.title} | Plan Sri Lanka`;
          description = activity.description;
          image = activity.image;
        }
      }

      const metaTags = `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${absoluteUrl}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${absoluteUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${title}" />
    <meta property="og:site_name" content="Plan Sri Lanka" />
    <meta property="og:locale" content="en_GB" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${absoluteUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:site" content="@PlanSriLanka" />
    <meta name="twitter:creator" content="@PlanSriLanka" />`;

      // Safer replacement: remove existing similar tags specifically
      const tagsToRemove = [
        /<title>.*?<\/title>/gi,
        /<meta\s+(?:name|property)="description"\s+content="[^"]*"\s*\/?>/gi,
        /<meta\s+(?:name|property)="title"\s+content="[^"]*"\s*\/?>/gi,
        /<meta\s+property="og:.*?"\s+content="[^"]*"\s*\/?>/gi,
        /<meta\s+name="twitter:.*?"\s+content="[^"]*"\s*\/?>/gi,
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi
      ];

      tagsToRemove.forEach(regex => {
        template = template.replace(regex, "");
      });
      
      // Insert new ones before </head>
      template = template.replace(/<\/head>/i, `${metaTags}\n  </head>`);

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
