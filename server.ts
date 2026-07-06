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
        } else {
          const legacyDetails = [
            { slug: "cultural-triangle", title: "Cultural Triangle Luxury Experience", description: "Immerse in the heritage of Sri Lanka's ancient cities." },
            { slug: "tea-country", title: "Luxury Tea Country & Misty Highlands", description: "Discover the breathtaking tea plantations and colonial heritage of Nuwara Eliya." },
            { slug: "wildlife-safari", title: "Elite Wildlife Safari Experience", description: "Encounter legendary wildlife in Sri Lanka's premium national parks." },
            { slug: "yala-safari-morning", title: "Yala Safari - Morning", description: "The morning safari is the prime window to witness Yala National Park's famous leopards, elephants, and sloth bears as they wake and hunt at dawn." },
            { slug: "yala-leopard-safari", title: "Yala Leopard Safari", description: "Yala National Park holds the highest density of leopards in the world, making it the premier destination for big cat photography." },
            { slug: "kumana-bird-safari", title: "Kumana Bird Safari", description: "A tranquil sanctuary for bird lovers and those seeking leopards away from the crowds." },
            { slug: "udawalawe-elephant-safari", title: "Udawalawe Elephant Safari", description: "Udawalawe National Park is famous for its massive reservoir backdrop and dry-zone grasslands with wild elephants guaranteed." },
            { slug: "scenic-train-ride", title: "Scenic Highlands Train Ride", description: "Consistently voted one of the most beautiful train journeys in the world, winding through misty tea country peaks." },
            { slug: "surfing-arugam-bay", title: "Surfing at Arugam Bay", description: "Arugam Bay is a world-class surfing crescent on the dry east coast of Sri Lanka." },
            { slug: "whale-watching-mirissa", title: "Whale Watching in Mirissa", description: "Set sail to witness Blue Whales, the largest creatures on Earth, in their ocean highway." },
            { slug: "pigeon-island-snorkeling", title: "Pigeon Island Coral Snorkeling", description: "Swim with blacktip reef sharks and green sea turtles in a protected marine sanctuary." },
            { slug: "sigiriya-rock-fortress", title: "Sigiriya Lion Rock Citadel", description: "Ascend a sheer 200m volcanic monolith housing a royal fortress, frescoes, and gardens." },
            { slug: "pidurangala-sunrise-trek", title: "Pidurangala Sunrise Hike", description: "Scale the neighboring monastery peak for the ultimate sunrise view of Sigiriya Rock." },
            { slug: "ella-rock-hiking", title: "Ella Rock & Little Adam's Peak Trek", description: "Hike through mountain cloud forests for dramatic panoramic vistas of the southern plains." },
            { slug: "nine-arch-bridge-walk", title: "Nine Arch Bridge Walkway", description: "Walk the tracks of the spectacular 91m colonial stone viaduct framed by green jungle." },
            { slug: "tea-plantation-high-tea", title: "High Country Tea Estate Tour", description: "Harvest organic tea buds with local pluckers and enjoy high tea in colonial bungalows." },
            { slug: "galle-fort-heritage-walk", title: "Galle Fort UNESCO Walkway", description: "Wander cobblestone streets, Dutch colonial villas, and ocean battlements at sunset." },
            { slug: "paddy-lake-trail", title: "The Paddy & Lake Trail", description: "A beautifully curated cycling tour around Koggala Lake, paddy fields, and local villages." },
            { slug: "kitulgala-white-water-rafting", title: "White Water Rafting in Kitulgala", description: "An exhilarating rafting adventure down the Kelani River with Class II and Class III rapids." }
          ];
          const matchedLegacy = legacyDetails.find(l => l.slug === slug);
          if (matchedLegacy) {
            title = `${matchedLegacy.title} | Plan Sri Lanka`;
            description = matchedLegacy.description;
          }
        }
      }

      const metaTags = `
    <!-- Primary Meta Tags -->
    <title data-rh="true">${title}</title>
    <meta data-rh="true" name="title" content="${title}" />
    <meta data-rh="true" name="description" content="${description}" />
    <link data-rh="true" rel="canonical" href="${absoluteUrl}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta data-rh="true" property="og:type" content="${ogType}" />
    <meta data-rh="true" property="og:url" content="${absoluteUrl}" />
    <meta data-rh="true" property="og:title" content="${title}" />
    <meta data-rh="true" property="og:description" content="${description}" />
    <meta data-rh="true" property="og:image" content="${image}" />
    <meta data-rh="true" property="og:image:secure_url" content="${image}" />
    <meta data-rh="true" property="og:image:type" content="image/jpeg" />
    <meta data-rh="true" property="og:image:width" content="1200" />
    <meta data-rh="true" property="og:image:height" content="630" />
    <meta data-rh="true" property="og:image:alt" content="${title}" />
    <meta data-rh="true" property="og:site_name" content="Plan Sri Lanka" />
    <meta data-rh="true" property="og:locale" content="en_GB" />

    <!-- Twitter / X -->
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:url" content="${absoluteUrl}" />
    <meta data-rh="true" name="twitter:title" content="${title}" />
    <meta data-rh="true" name="twitter:description" content="${description}" />
    <meta data-rh="true" name="twitter:image" content="${image}" />
    <meta data-rh="true" name="twitter:site" content="@PlanSriLanka" />
    <meta data-rh="true" name="twitter:creator" content="@PlanSriLanka" />`;

      // Robust whole-block replacement of original SEO tags in index.html (wrapped in <seo-meta>...</seo-meta>)
      const seoBlockRegex = /<seo-meta>[\s\S]*?<\/seo-meta>/i;

      if (seoBlockRegex.test(template)) {
        template = template.replace(seoBlockRegex, metaTags.trim());
      } else {
        // Fallback: strip existing metadata recursively and append the new ones before </head>
        // Implemented with robust, minification-compatible regular expressions
        const tagsToRemove = [
          /<title>[\s\S]*?<\/title>/gi,
          /<meta\s+[^>]*?(?:name|property)\s*=\s*['"]?description['"]?[^>]*?>/gi,
          /<meta\s+[^>]*?(?:name|property)\s*=\s*['"]?title['"]?[^>]*?>/gi,
          /<meta\s+[^>]*?property\s*=\s*['"]?og:[^'">\s]+['"]?[^>]*?>/gi,
          /<meta\s+[^>]*?name\s*=\s*['"]?twitter:[^'">\s]+['"]?[^>]*?>/gi,
          /<link\s+[^>]*?rel\s*=\s*['"]?canonical['"]?[^>]*?>/gi
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
