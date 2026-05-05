import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { activities } from "./src/data/activities.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

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

      // Metadata Injection Logic for Experience Pages
      const experienceMatch = url.match(/\/experience\/([^/?#]+)/);
      if (experienceMatch) {
        const slug = experienceMatch[1];
        const activity = activities.find(a => a.slug === slug);

        if (activity) {
          const metaTags = `
    <!-- Primary Meta Tags -->
    <title>${activity.title} | Plan Sri Lanka</title>
    <meta name="title" content="${activity.title} | Plan Sri Lanka" />
    <meta name="description" content="${activity.description}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://plan-srilanka.com${url}" />
    <meta property="og:title" content="${activity.title} | Plan Sri Lanka" />
    <meta property="og:description" content="${activity.description}" />
    <meta property="og:image" content="${activity.image}" />
    <meta property="og:image:secure_url" content="${activity.image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Plan Sri Lanka" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://plan-srilanka.com${url}" />
    <meta name="twitter:title" content="${activity.title} | Plan Sri Lanka" />
    <meta name="twitter:description" content="${activity.description}" />
    <meta name="twitter:image" content="${activity.image}" />
    <meta name="twitter:site" content="@PlanSriLanka" />`;

          // Safer replacement: remove existing similar tags specifically
          const tagsToRemove = [
            /<title>.*?<\/title>/gi,
            /<meta\s+(?:name|property)="description"\s+content="[^"]*"\s*\/?>/gi,
            /<meta\s+(?:name|property)="title"\s+content="[^"]*"\s*\/?>/gi,
            /<meta\s+property="og:.*?"\s+content="[^"]*"\s*\/?>/gi,
            /<meta\s+name="twitter:.*?"\s+content="[^"]*"\s*\/?>/gi
          ];

          tagsToRemove.forEach(regex => {
            template = template.replace(regex, "");
          });
          
          // Insert new ones before </head>
          template = template.replace(/<\/head>/i, `${metaTags}\n  </head>`);
        }
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
