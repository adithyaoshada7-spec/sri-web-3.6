import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { activities } from "../src/data/activities";
import { seoArticles } from "../src/data/seoArticles";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");
const indexPath = path.join(distPath, "index.html");

interface PrerenderPage {
  path: string;
  title: string;
  description: string;
  image: string;
  ogType: string;
  canonicalUrl: string;
  bodyHtml: string;
  schemas: string[];
}

function generatePrerenderPages(): PrerenderPage[] {
  const pages: PrerenderPage[] = [];
  const domain = "https://plan-srilanka.com";

  // 1. Homepage
  pages.push({
    path: "/",
    title: "Plan Sri Lanka | Curated Luxury Travel & Bespoke Vibe Tours",
    description: "An exclusive travel concierge for high-net-worth individuals and families seeking extraordinary, tailored journeys across the majestic landscapes of Sri Lanka.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200",
    ogType: "website",
    canonicalUrl: `${domain}/`,
    bodyHtml: `
      <header>
        <h1>Plan Sri Lanka | Curated Luxury Travel & Bespoke Vibe Tours</h1>
        <p><strong>An exclusive travel concierge for high-net-worth individuals and families seeking extraordinary, tailored journeys across the majestic landscapes of Sri Lanka.</strong></p>
      </header>
      <section>
        <h2>Bespoke Curated Experiences</h2>
        <ul>
          <li><strong>Vibe Tour Sri Lanka</strong> - Elite luxury coastal getaway and customized family discovery sessions from Colombo Marina.</li>
          <li><strong>Cultural Triangle</strong> - Explore ancient cave temples, lion rock fortress, and sacred relics with private English-fluent guides.</li>
          <li><strong>Tea Country & Misty Highlands</strong> - Scenic train rides, colonial bungalows, and walks through emerald estates in Hatton and Ella.</li>
          <li><strong>Wildlife Safari</strong> - Spot wild leopards, Asian elephants, and exotic birds in private custom-built 4x4 safaris inside Yala and Wilpattu.</li>
        </ul>
      </section>
    `,
    schemas: [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Plan Sri Lanka",
        "url": domain,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${domain}/sri-lanka-trip-planner?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }, null, 2),
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Plan Sri Lanka",
        "url": domain,
        "logo": `${domain}/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "adithyaoshada7@gmail.com"
        }
      }, null, 2)
    ]
  });

  // 2. SEO Articles (from the shared list)
  const defaultArticleBodies: Record<string, string> = {
    "/sri-lanka-trip-cost-from-india": `
      <header>
        <h1>Sri Lanka Trip Cost From India (2026 Guide)</h1>
        <p><strong>Discover the complete Sri Lanka trip cost from India. Compare budget, mid-range and luxury travel costs, flights, hotels, visa fees and use our free trip budget calculator.</strong></p>
      </header>
      <section>
        <h2>Typical Budgets from India</h2>
        <p>Depending on your comfort style, daily land costs are structured into basic tiers:</p>
        <table>
          <thead>
            <tr>
              <th>Travel Comfort Tier</th>
              <th>Estimated Budget / Day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Backpacker/Budget Comfort</strong></td>
              <td>₹2,000 - ₹3,500 ($25 - $40)</td>
            </tr>
            <tr>
              <td><strong>Mid-Range Comfort Stays</strong></td>
              <td>₹4,000 - ₹8,000 ($50 - $100)</td>
            </tr>
            <tr>
              <td><strong>Elite Signature Luxury</strong></td>
              <td>₹12,000+ ($150+)</td>
            </tr>
          </tbody>
        </table>
      </section>
    `,
    "/sri-lanka-7-day-itinerary": `
      <header>
        <h1>Sri Lanka 7-Day Itinerary (2026): Costs, Route & June Travel Guide</h1>
        <p><strong>Proven Linear Itinerary optimized for Indian and high-net-worth travellers visiting Sri Lanka for the first time. Experience golden beaches, majestic mountains, history, and a private wildlife safari inside 7 action-packed days.</strong></p>
      </header>
      <section>
        <h2>The Perfect 7-Day Day-by-Day Route</h2>
        <ul>
          <li><strong>Day 1: Arrive in Negombo</strong> - Sandy Beaches, lagoon catamarans, and rapid rest right next to the airport.</li>
          <li><strong>Day 2: Cultural Triangle via Dambulla</strong> - Golden Rock Cave Temple exploration and a sunset hike up Pidurangala Rock.</li>
          <li><strong>Day 3: Sigiriya Lion Rock to Kandy</strong> - Climb the iconic ancient Sky Fortress rules early in the morning and tour the Tooth Temple.</li>
          <li><strong>Day 4: Highland Blue Train to Ella</strong> - Board the world-famous blue train running through emerald tea fields and walk Nine Arch Bridge.</li>
          <li><strong>Day 5: Ella Ridge Hiking & Yala Safari</strong> - Sunrise climb of Little Adam's Peak, drop down Ella Gap, and safari in Yala to find wild leopards.</li>
          <li><strong>Day 6: Galle Fort Colonial Walk</strong> - Wander coastal fishing towns, capture sunset views from Utrecht Bastion, and rest inside Galle's historic 17th-century rampart hotels.</li>
          <li><strong>Day 7: Colombo Hub Souvenirs & Departures</strong> - Souvenirs in premium boutiques, giant lagoon mud crab eating at Ministry of Crab, and expressway transition to CMB.</li>
        </ul>
      </section>
    `
  };

  seoArticles.forEach(art => {
    // Skip if path equals "/" to avoid redundancy (handled manually above)
    if (art.path === "/") return;

    let bodyHtml = defaultArticleBodies[art.path] || `
      <header>
        <h1>${art.title}</h1>
        <p><strong>${art.description}</strong></p>
      </header>
      <section>
        <h2>Essential Guides & Contextual Frameworks</h2>
        <p>Planning travel to Sri Lanka from India involves careful consideration of climate patterns, regional transport nodes, and curated hotel inventory. Read our active guide resources to plan your perfect vacation.</p>
      </section>
    `;

    pages.push({
      path: art.path,
      title: art.title,
      description: art.description,
      image: art.image,
      ogType: art.ogType,
      canonicalUrl: `${domain}${art.path}`,
      bodyHtml: bodyHtml,
      schemas: [
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": art.title,
          "description": art.description,
          "image": art.image,
          "author": {
            "@type": "Person",
            "name": "Adithya Oshada",
            "jobTitle": "Local Travel Planner"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Plan Sri Lanka",
            "logo": {
              "@type": "ImageObject",
              "url": `${domain}/logo.png`
            }
          },
          "datePublished": "2026-02-10T08:00:00Z",
          "dateModified": "2026-06-19T10:00:00Z"
        }, null, 2)
      ]
    });
  });

  // 3. Dynamic experiences (from Activities)
  const legacyExperiences = [
    { slug: "cultural-triangle", title: "Cultural Triangle Luxury Experience", description: "Immerse in the heritage of Sri Lanka's ancient cities." },
    { slug: "tea-country", title: "Luxury Tea Country & Misty Highlands", description: "Discover the breathtaking tea plantations and colonial heritage of Nuwara Eliya." },
    { slug: "wildlife-safari", title: "Elite Wildlife Safari Experience", description: "Encounter legendary wildlife in Sri Lanka's premium national parks." }
  ];

  // Merge act and legacy experiences to form a complete list of Slugs
  const renderedSlugs = new Set<string>();

  activities.forEach(act => {
    renderedSlugs.add(act.slug);
    pages.push({
      path: `/experience/${act.slug}`,
      title: act.slug === "italian-vibe-tour"
        ? "Sri Lanka Tour Packages from India | Vibe Tour Sri Lanka"
        : `${act.title} | Plan Sri Lanka`,
      description: act.slug === "italian-vibe-tour"
        ? "Bespoke Sri Lanka travel and vacation packages from India. Experience the elite Vibe Tour Sri Lanka with curated itineraries, premium Colombo dining, and packages from Delhi/Mumbai."
        : act.description,
      image: act.image,
      ogType: "article",
      canonicalUrl: `${domain}/experience/${act.slug}`,
      bodyHtml: `
        <header>
          <h1>${act.title}</h1>
          <p><strong>${act.description}</strong></p>
        </header>
        <section>
          <h2>${act.subheading || "Activity Highlight"}</h2>
          <p>${act.longDescription}</p>
        </section>
      `,
      schemas: [
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": act.title,
          "description": act.description,
          "image": act.image,
          "brand": {
            "@type": "Brand",
            "name": "Plan Sri Lanka"
          }
        }, null, 2)
      ]
    });
  });

  legacyExperiences.forEach(leg => {
    if (renderedSlugs.has(leg.slug)) return;
    renderedSlugs.add(leg.slug);
    pages.push({
      path: `/experience/${leg.slug}`,
      title: `${leg.title} | Plan Sri Lanka`,
      description: leg.description,
      image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200",
      ogType: "article",
      canonicalUrl: `${domain}/experience/${leg.slug}`,
      bodyHtml: `
        <header>
          <h1>${leg.title}</h1>
          <p><strong>${leg.description}</strong></p>
        </header>
        <section>
         <h2>Discover Bespoke Itineraries</h2>
         <p>Contact our elite concierge desk to integrate this landmark into your master custom journey.</p>
        </section>
      `,
      schemas: []
    });
  });

  return pages;
}

function prerender() {
  console.log("[Prerender] Launching Static Site Generation (SSG)...");

  if (!fs.existsSync(indexPath)) {
    console.error(`[Prerender] Error: Base index.html does not exist at ${indexPath}. Please run "vite build" first!`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, "utf-8");
  const pages = generatePrerenderPages();

  pages.forEach(page => {
    console.log(`[Prerender] Generating static file for: "${page.path}"`);

    let template = baseHtml;

    // 1. Generate Metadata Block
    const metaTags = `
    <!-- Primary Meta Tags -->
    <title data-rh="true">${page.title}</title>
    <meta data-rh="true" name="title" content="${page.title}" />
    <meta data-rh="true" name="description" content="${page.description}" />
    <link data-rh="true" rel="canonical" href="${page.canonicalUrl}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta data-rh="true" property="og:type" content="${page.ogType}" />
    <meta data-rh="true" property="og:url" content="${page.canonicalUrl}" />
    <meta data-rh="true" property="og:title" content="${page.title}" />
    <meta data-rh="true" property="og:description" content="${page.description}" />
    <meta data-rh="true" property="og:image" content="${page.image}" />
    <meta data-rh="true" property="og:image:secure_url" content="${page.image}" />
    <meta data-rh="true" property="og:image:type" content="image/jpeg" />
    <meta data-rh="true" property="og:image:width" content="1200" />
    <meta data-rh="true" property="og:image:height" content="630" />
    <meta data-rh="true" property="og:image:alt" content="${page.title}" />
    <meta data-rh="true" property="og:site_name" content="Plan Sri Lanka" />
    <meta data-rh="true" property="og:locale" content="en_GB" />

    <!-- Twitter -->
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:url" content="${page.canonicalUrl}" />
    <meta data-rh="true" name="twitter:title" content="${page.title}" />
    <meta data-rh="true" name="twitter:description" content="${page.description}" />
    <meta data-rh="true" name="twitter:image" content="${page.image}" />
    <meta data-rh="true" name="twitter:site" content="@PlanSriLanka" />
    <meta data-rh="true" name="twitter:creator" content="@PlanSriLanka" />`;

    // Replace the head meta block wrapped inside <seo-meta>...</seo-meta>
    const seoBlockRegex = /<seo-meta>[\s\S]*?<\/seo-meta>/i;
    if (seoBlockRegex.test(template)) {
      template = template.replace(seoBlockRegex, `<seo-meta>${metaTags.trim()}\n    </seo-meta>`);
    } else {
      template = template.replace(/<\/head>/i, `<seo-meta>${metaTags.trim()}\n    </seo-meta>\n  </head>`);
    }

    // 2. Wrap Schema Block inside <seo-schema>...</seo-schema>
    const schemaBlockRegex = /<seo-schema>[\s\S]*?<\/seo-schema>/i;
    if (page.schemas.length > 0) {
      const schemaScripts = page.schemas
        .map(sch => `\n    <script type="application/ld+json">\n${sch}\n    </script>`)
        .join("");
      template = template.replace(schemaBlockRegex, `<seo-schema>${schemaScripts}\n    </seo-schema>`);
    } else {
      // Clear out the schema if not needed or not explicitly configured
      template = template.replace(schemaBlockRegex, `<seo-schema></seo-schema>`);
    }

    // 3. Generate Inner Crawler Semantic Content inside `<article class="crawler-seo-wrapper">...</article>`
    const articleRegex = /<article class="crawler-seo-wrapper">[\s\S]*?<\/article>/i;
    const replacementArticle = `<article class="crawler-seo-wrapper">${page.bodyHtml.trim()}\n      </article>`;
    if (articleRegex.test(template)) {
      template = template.replace(articleRegex, replacementArticle);
    }

    // 4. Determine output filepath
    let targetFileDir = distPath;
    let targetFileName = "index.html";

    if (page.path !== "/") {
      // Example: `/sri-lanka-trip-cost-from-india` -> `dist/sri-lanka-trip-cost-from-india/index.html`
      const cleanSubPath = page.path.replace(/^\//, "");
      targetFileDir = path.join(distPath, cleanSubPath);
      targetFileName = "index.html";
    }

    if (!fs.existsSync(targetFileDir)) {
      fs.mkdirSync(targetFileDir, { recursive: true });
    }

    const finalPath = path.join(targetFileDir, targetFileName);
    fs.writeFileSync(finalPath, template, "utf-8");
  });

  console.log("[Prerender] Static site pre-rendering completely updated with bespoke page metadata and semantic layouts!");
}

prerender();
