import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { activities } from "./src/data/activities";
import { seoArticles } from "./src/data/seoArticles";

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
      const experienceMatch = req.path.match(/\/experience\/([^/?#]+)/);
      let title = "Plan Sri Lanka | Curated Luxury Travel";
      let description = "Bespoke luxury journeys through the teardrop of the Indian Ocean. Unrivalled service for the discerning traveller.";
      let image = "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630";
      let ogType = "website";
      const domain = "https://plan-srilanka.com";
      const normalizedPath = req.path === '/' ? '' : req.path.replace(/\/$/, "");
      const absoluteUrl = `${domain}${normalizedPath}`;

      // Check if path matches any registered SEO Article route (ignoring trailing slashes)
      const cleanPath = req.path.replace(/\/$/, "");
      const matchedArticle = seoArticles.find(art => art.path === cleanPath);

      if (matchedArticle) {
        title = matchedArticle.title;
        description = matchedArticle.description;
        image = matchedArticle.image;
        ogType = matchedArticle.ogType;
        console.log(`[SEO-Server] Route Matched: ${cleanPath} -> Title: "${title}"`);
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
    <meta property="og:type" content="${ogType}" />
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

      // Robust whole-block replacement of original SEO tags in index.html (from <title> to <meta name="twitter:image" ... /> tag).
      // This completely avoids any risk of having duplicate title, description, or og metadata tags.
      const seoBlockRegex = /<title>[\s\S]*?<meta name="twitter:image"[^>]*>/i;

      if (seoBlockRegex.test(template)) {
        template = template.replace(seoBlockRegex, metaTags.trim());
      } else {
        // Fallback: strip existing metadata recursively and append the new ones before </head>
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
        template = template.replace(/<\/head>/i, `${metaTags}\n  </head>`);
      }

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
