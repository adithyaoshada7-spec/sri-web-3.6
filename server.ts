import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { activities } from "./src/data/activities";
import { seoArticles } from "./src/data/seoArticles";
import { trainFallbackHtml } from "./src/data/trainFallbackHtml";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body parsing for API routes
  app.use(express.json());

  // Meta Conversions API (CAPI) Endpoint
  app.post("/api/meta-capi", async (req, res) => {
    try {
      const {
        eventName,
        eventId,
        eventSourceUrl,
        userData = {},
        customData = {}
      } = req.body;

      if (!eventName) {
        return res.status(400).json({ error: "eventName is required" });
      }

      const pixelId = process.env.META_PIXEL_ID || "2857205307994379";
      const accessToken = process.env.META_ACCESS_TOKEN;

      if (!accessToken) {
        console.warn("[Meta CAPI] META_ACCESS_TOKEN is not configured in server environment.");
        return res.status(200).json({ status: "skipped", reason: "META_ACCESS_TOKEN_MISSING" });
      }

      // Hash function for PII compliance (SHA-256 in lowercase hex)
      const hashSha256 = (str?: string) => {
        if (!str) return undefined;
        const normalized = str.trim().toLowerCase();
        return crypto.createHash("sha256").update(normalized).digest("hex");
      };

      // Extract client IP & User Agent
      let clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() || req.socket.remoteAddress || "";
      if (clientIp === "::1" || clientIp === "127.0.0.1" || !clientIp) {
        clientIp = "123.231.100.50"; // Fallback public IP for local testing
      }
      const clientUserAgent = req.headers["user-agent"] || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

      // Format User Data
      const processedUserData: Record<string, any> = {
        client_ip_address: clientIp,
        client_user_agent: clientUserAgent
      };

      if (userData.email) {
        processedUserData.em = [hashSha256(userData.email)];
      }
      if (userData.phone) {
        // Strip non-digits and hash
        const cleanPhone = userData.phone.replace(/[^0-9]/g, "");
        processedUserData.ph = [hashSha256(cleanPhone)];
      }
      if (userData.firstName) {
        processedUserData.fn = [hashSha256(userData.firstName)];
      }
      if (userData.lastName) {
        processedUserData.ln = [hashSha256(userData.lastName)];
      }
      if (userData.fbp) {
        processedUserData.fbp = userData.fbp;
      }
      if (userData.fbc) {
        processedUserData.fbc = userData.fbc;
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);

      const eventPayload: Record<string, any> = {
        event_name: eventName,
        event_time: currentTimestamp,
        action_source: "website",
        event_source_url: eventSourceUrl || req.headers.referer || "https://plan-srilanka.com",
        user_data: processedUserData,
        custom_data: customData
      };

      if (eventId) {
        eventPayload.event_id = eventId;
      }

      const requestBody: Record<string, any> = {
        data: [eventPayload]
      };

      if (process.env.META_TEST_EVENT_CODE) {
        requestBody.test_event_code = process.env.META_TEST_EVENT_CODE;
      }

      const metaGraphUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
      
      const metaResponse = await fetch(metaGraphUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const metaResult = await metaResponse.json();

      if (!metaResponse.ok) {
        console.error("[Meta CAPI Error]", metaResult);
        return res.status(metaResponse.status).json({
          status: "error",
          details: metaResult
        });
      }

      return res.json({
        status: "success",
        events_received: metaResult.events_received,
        fbtrace_id: metaResult.fbtrace_id
      });
    } catch (err: any) {
      console.error("[Meta CAPI Exception]", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  });


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
      "galle-fort-heritage-walk",
      "paddy-lake-trail",
      "kitulgala-white-water-rafting",
      "kitesurf-lessons-kalpitiya"
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

  // Aviationstack Real-Time & Scheduled Flight Proxy Route
  app.get("/api/flights-realtime", async (req, res) => {
    const { flight, dep, arr, date, type, search } = req.query;
    const apiKey = "fb3d7aaf276866ea51d7039686cb1c3c";
    
    // Default values
    const selectedDate = (date as string) || "2026-07-18";
    const flowType = (type as string) || "arrivals";
    
    // Construct aviationstack API URL
    let url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}`;
    url += `&flight_date=${encodeURIComponent(selectedDate)}`;
    
    // Apply filters to Aviationstack URL
    if (flight) {
      url += `&flight_iata=${encodeURIComponent(flight as string)}`;
    } else if (search && /^[a-zA-Z]{2,3}\s*\d+/i.test((search as string).trim())) {
      const cleanFlight = (search as string).trim().replace(/\s+/g, "");
      url += `&flight_iata=${encodeURIComponent(cleanFlight)}`;
    } else {
      if (flowType === "departures") {
        url += `&dep_iata=CMB`;
        if (arr) {
          url += `&arr_iata=${encodeURIComponent(arr as string)}`;
        } else if (search && (search as string).length === 3) {
          url += `&arr_iata=${encodeURIComponent((search as string).toUpperCase())}`;
        }
      } else {
        url += `&arr_iata=CMB`;
        if (dep) {
          url += `&dep_iata=${encodeURIComponent(dep as string)}`;
        } else if (search && (search as string).length === 3) {
          url += `&dep_iata=${encodeURIComponent((search as string).toUpperCase())}`;
        }
      }
    }
    
    url += `&limit=100`;

    try {
      console.log(`[Aviationstack Proxy] Fetching ${flowType} schedule for ${selectedDate} from: ${url.replace(apiKey, "HIDDEN_KEY")}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Aviationstack status code: ${response.status}`);
      }

      const rawJson = await response.json();
      
      if (rawJson.error) {
        console.error("[Aviationstack Proxy API Error]", rawJson.error);
        throw new Error(rawJson.error.message || "Aviationstack API returned error status");
      }

      if (rawJson && Array.isArray(rawJson.data)) {
        return res.json({
          source: "aviationstack-live",
          data: rawJson.data
        });
      }

      throw new Error("Invalid response format from Aviationstack");
    } catch (err: any) {
      console.warn(`[Aviationstack Proxy] Using premium monthly schedule generator for ${selectedDate} (${flowType}) due to: ${err.message}`);
      
      // Dynamic monthly schedule generation that matches the Aviationstack API schema
      const getIsoStringForTime = (timeStr: string) => {
        return `${selectedDate}T${timeStr}:00+00:00`;
      };

      const arrivalsTemplate = [
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "192", iata: "UL192", icao: "ALK192" },
          departure: { airport: "Indira Gandhi International", iata: "DEL", scheduled: getIsoStringForTime("18:45") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("22:20"), gate: "14", baggage: "Belt 4" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Emirates", iata: "EK", icao: "UAE" },
          flight: { number: "650", iata: "EK650", icao: "UAE650" },
          departure: { airport: "Dubai International", iata: "DXB", scheduled: getIsoStringForTime("02:50") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("08:30"), gate: "06", baggage: "Belt 2" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Qatar Airways", iata: "QR", icao: "QTR" },
          flight: { number: "664", iata: "QR664", icao: "QTR664" },
          departure: { airport: "Hamad International", iata: "DOH", scheduled: getIsoStringForTime("08:10") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("15:45"), gate: "08", baggage: "Belt 3" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Singapore Airlines", iata: "SQ", icao: "SIA" },
          flight: { number: "468", iata: "SQ468", icao: "SIA468" },
          departure: { airport: "Changi Airport", iata: "SIN", scheduled: getIsoStringForTime("16:50") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("23:30"), gate: "04", baggage: "Belt 1" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Air India", iata: "AI", icao: "AIC" },
          flight: { number: "273", iata: "AI273", icao: "AIC273" },
          departure: { airport: "Indira Gandhi International", iata: "DEL", scheduled: getIsoStringForTime("00:25") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("04:00"), gate: "11", baggage: "Belt 5" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "102", iata: "UL102", icao: "ALK102" },
          departure: { airport: "Velana International", iata: "MLE", scheduled: getIsoStringForTime("09:15") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("11:15"), gate: "02", baggage: "Belt 1" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Etihad Airways", iata: "EY", icao: "ETD" },
          flight: { number: "264", iata: "EY264", icao: "ETD264" },
          departure: { airport: "Abu Dhabi International", iata: "AUH", scheduled: getIsoStringForTime("07:45") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("13:50"), gate: "12", baggage: "Belt 3" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "504", iata: "UL504", icao: "ALK504" },
          departure: { airport: "Heathrow", iata: "LHR", scheduled: getIsoStringForTime("21:30") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("12:00"), gate: "09", baggage: "Belt 2" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "flydubai", iata: "FZ", icao: "FDB" },
          flight: { number: "579", iata: "FZ579", icao: "FDB579" },
          departure: { airport: "Dubai International", iata: "DXB", scheduled: getIsoStringForTime("19:40") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("01:20"), gate: "05", baggage: "Belt 4" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "142", iata: "UL142", icao: "ALK142" },
          departure: { airport: "Chhatrapati Shivaji Maharaj", iata: "BOM", scheduled: getIsoStringForTime("03:10") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("05:55"), gate: "08", baggage: "Belt 3" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Malaysia Airlines", iata: "MH", icao: "MAS" },
          flight: { number: "179", iata: "MH179", icao: "MAS179" },
          departure: { airport: "Kuala Lumpur International", iata: "KUL", scheduled: getIsoStringForTime("14:50") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("18:10"), gate: "10", baggage: "Belt 1" },
          flight_status: "scheduled"
        },
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "302", iata: "UL302", icao: "ALK302" },
          departure: { airport: "Changi Airport", iata: "SIN", scheduled: getIsoStringForTime("15:30") },
          arrival: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("20:05"), gate: "07", baggage: "Belt 2" },
          flight_status: "scheduled"
        }
      ];

      const departuresTemplate = [
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "191", iata: "UL191", icao: "ALK191" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("17:10"), gate: "04" },
          arrival: { airport: "Indira Gandhi International", iata: "DEL", scheduled: getIsoStringForTime("20:45") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Emirates", iata: "EK", icao: "UAE" },
          flight: { number: "651", iata: "EK651", icao: "UAE651" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("09:55"), gate: "06" },
          arrival: { airport: "Dubai International", iata: "DXB", scheduled: getIsoStringForTime("13:10") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Qatar Airways", iata: "QR", icao: "QTR" },
          flight: { number: "665", iata: "QR665", icao: "QTR665" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("17:15"), gate: "08" },
          arrival: { airport: "Hamad International", iata: "DOH", scheduled: getIsoStringForTime("20:20") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Singapore Airlines", iata: "SQ", icao: "SIA" },
          flight: { number: "469", iata: "SQ469", icao: "SIA469" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("00:50"), gate: "11" },
          arrival: { airport: "Changi Airport", iata: "SIN", scheduled: getIsoStringForTime("07:20") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Air India", iata: "AI", icao: "AIC" },
          flight: { number: "274", iata: "AI274", icao: "AIC274" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("05:15"), gate: "05" },
          arrival: { airport: "Indira Gandhi International", iata: "DEL", scheduled: getIsoStringForTime("08:45") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "101", iata: "UL101", icao: "ALK101" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("08:20"), gate: "03" },
          arrival: { airport: "Velana International", iata: "MLE", scheduled: getIsoStringForTime("09:20") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Etihad Airways", iata: "EY", icao: "ETD" },
          flight: { number: "265", iata: "EY265", icao: "ETD265" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("15:20"), gate: "12" },
          arrival: { airport: "Abu Dhabi International", iata: "AUH", scheduled: getIsoStringForTime("18:50") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "503", iata: "UL503", icao: "ALK503" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("13:40"), gate: "09" },
          arrival: { airport: "Heathrow", iata: "LHR", scheduled: getIsoStringForTime("20:30") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "flydubai", iata: "FZ", icao: "FDB" },
          flight: { number: "580", iata: "FZ580", icao: "FDB580" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("02:40"), gate: "02" },
          arrival: { airport: "Dubai International", iata: "DXB", scheduled: getIsoStringForTime("06:05") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "141", iata: "UL141", icao: "ALK141" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("23:45"), gate: "07" },
          arrival: { airport: "Chhatrapati Shivaji Maharaj", iata: "BOM", scheduled: getIsoStringForTime("02:40") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "Malaysia Airlines", iata: "MH", icao: "MAS" },
          flight: { number: "178", iata: "MH178", icao: "MAS178" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("09:10"), gate: "10" },
          arrival: { airport: "Kuala Lumpur International", iata: "KUL", scheduled: getIsoStringForTime("15:35") },
          flight_status: "scheduled"
        },
        {
          airline: { name: "SriLankan Airlines", iata: "UL", icao: "ALK" },
          flight: { number: "301", iata: "UL301", icao: "ALK301" },
          departure: { airport: "Bandaranaike International", iata: "CMB", scheduled: getIsoStringForTime("07:25"), gate: "01" },
          arrival: { airport: "Changi Airport", iata: "SIN", scheduled: getIsoStringForTime("13:55") },
          flight_status: "scheduled"
        }
      ];

      const rawFallback: any[] = flowType === "departures" ? departuresTemplate : arrivalsTemplate;
      let filteredFallback: any[] = rawFallback;

      // Add actual/estimated delay values deterministically depending on the date string
      const dateNum = parseInt(selectedDate.replace(/-/g, "")) || 20260718;
      filteredFallback = rawFallback.map((item: any, idx) => {
        const isDelayed = (dateNum + idx) % 7 === 0;
        const delay = isDelayed ? ((dateNum + idx) % 4) * 15 + 10 : null;
        
        let schedTimeStr = flowType === "departures" ? item.departure.scheduled : item.arrival.scheduled;
        let estTimeStr = schedTimeStr;
        
        if (delay) {
          try {
            const d = new Date(schedTimeStr);
            d.setMinutes(d.getMinutes() + delay);
            estTimeStr = d.toISOString();
          } catch {}
        }

        const isFuture = new Date(schedTimeStr) > new Date();
        const status = isFuture 
          ? "scheduled" 
          : (idx % 3 === 0 ? "landed" : (idx % 3 === 1 ? "active" : "scheduled"));

        return {
          flight_date: selectedDate,
          flight_status: status,
          departure: {
            ...item.departure,
            delay: flowType === "departures" ? delay : null,
            estimated: flowType === "departures" ? estTimeStr : item.departure.scheduled,
            actual: null
          },
          arrival: {
            ...item.arrival,
            delay: flowType === "arrivals" ? delay : null,
            estimated: flowType === "arrivals" ? estTimeStr : item.arrival.scheduled,
            actual: null
          },
          airline: item.airline,
          flight: item.flight
        };
      });

      // Filter by search terms if present
      const querySearch = (search as string || flight as string || dep as string || arr as string);
      if (querySearch) {
        const lowerSearch = querySearch.toLowerCase().trim();
        filteredFallback = filteredFallback.filter(item => {
          const fNum = item.flight.iata.toLowerCase();
          const air = item.airline.name.toLowerCase();
          const depI = item.departure.iata.toLowerCase();
          const arrI = item.arrival.iata.toLowerCase();
          const depAir = item.departure.airport.toLowerCase();
          const arrAir = item.arrival.airport.toLowerCase();

          return fNum.includes(lowerSearch) || 
                 air.includes(lowerSearch) || 
                 depI.includes(lowerSearch) || 
                 arrI.includes(lowerSearch) || 
                 depAir.includes(lowerSearch) || 
                 arrAir.includes(lowerSearch);
        });
      }

      return res.json({
        source: "fallback-simulated-schedule",
        data: filteredFallback
      });
    }
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
            { slug: "kitulgala-white-water-rafting", title: "White Water Rafting in Kitulgala", description: "An exhilarating rafting adventure down the Kelani River with Class II and Class III rapids." },
            { slug: "kitesurf-lessons-kalpitiya", title: "Kitesurf Lessons in Kalpitiya | Plan Sri Lanka", description: "Master the wind at Kalpitiya Lagoon with certified IKO instructors from Margarita Kite School. We guide you, you do the magic!" }
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

      // Dynamic fallback HTML injection for crawlers / LLMs
      const fallbackRegex = /<article class="crawler-seo-wrapper">[\s\S]*?<\/article>/i;
      if (fallbackRegex.test(template)) {
        if (cleanPath === "/how-to-plan-a-train-trip-in-sri-lanka") {
          template = template.replace(fallbackRegex, trainFallbackHtml.trim());
          console.log(`[SEO-Server] Injected 1500+ words Train Trip Guide semantic fallback HTML.`);
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
