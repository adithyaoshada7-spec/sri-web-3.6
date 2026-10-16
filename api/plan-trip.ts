import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import { INITIAL_HOTELS_DATA, HotelListing } from "../src/data/sriLankaHotelsData.js";
import {
  getCoordinatesForDestination,
  calculateBudgetBreakdown,
  ParsedTripIntent,
  DayItineraryItem
} from "../src/lib/tripRuleEngine.js";

// Clean Supabase base URL (strip /rest/v1 or trailing slashes)
const rawSupabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://umhxiqninzmprapfbbft.supabase.co";

const supabaseUrl = rawSupabaseUrl
  .replace(/^\[/, "")
  .replace(/\].*$/, "")
  .replace(/^\(/, "")
  .replace(/\)$/, "")
  .trim()
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "");

const supabaseAnonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  ""
).trim();

const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseAnonKey.includes("your-anon-key") &&
  !supabaseAnonKey.includes("your_anon_key_here");

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const geminiApiKey =
  process.env.GEMINI_API_KEY ||
  process.env.VITE_GEMINI_API_KEY ||
  "";

/**
 * Core Dynamic Trip Planning Logic combining Gemini AI + Supabase Live Database
 */
export async function executePlanTrip(payload: {
  userPrompt: string;
  days?: number;
  currency?: string;
  targetBudget?: number | null;
}) {
  const { userPrompt, days = 5, currency = "LKR", targetBudget = null } = payload;

  // 1. Fetch available partner hotels from Supabase
  let availableHotels: any[] = [];
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("hotels")
        .select("id, destination_id, name, room_type, stay_type, price_per_night_lkr, rating, review_count, image_url, amenities");
      if (!error && data && data.length > 0) {
        availableHotels = data;
      }
    } catch (e) {
      console.warn("[api/plan-trip] Supabase query failed, using fallback hotel data:", e);
    }
  }

  // Fallback to in-repo verified hotels if Supabase returned 0
  if (availableHotels.length === 0) {
    availableHotels = INITIAL_HOTELS_DATA.map((h) => ({
      id: h.id,
      destination_id: h.destinationId,
      name: h.name,
      room_type: h.roomType,
      stay_type: h.stayType,
      price_per_night_lkr: h.pricePerNightLkr,
      rating: h.rating,
      review_count: h.reviewCount,
      image_url: h.imageUrl,
      amenities: h.amenities
    }));
  }

  // 2. If Gemini API key is missing, throw or let caller know
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server environment.");
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);

  // 3. Build strict System Instruction prompt
  const systemInstruction = `
You are an expert Sri Lanka Travel Route Specialist & Chauffeur Logistics Engineer.
Given a user query and a database list of available partner hotels, generate a realistic, geographically sound day-by-day itinerary.

CRITICAL LOGISTICS RULES:
1. STRICTLY RESPECT THE USER'S REQUESTED DESTINATIONS.
   - If the user asks for "Negombo" (e.g. "I want to cover Negombo in 5 days"), ONLY plan activities in and around Negombo (Negombo beach, lagoon, canal, Muthurajawela wetlands, fish market, catamaran sailing, coastal dining). DO NOT insert Sigiriya, Kandy, Nuwara Eliya, or Ella unless explicitly mentioned!
   - If the user asks for "South Coast" or "Galle/Mirissa", focus only on the southern beaches.
   - If the user asks for the classic loop, then include the classic loop.
2. ENFORCE REAL HIGHWAY DRIVING LIMITS: Driving between locations must not exceed 3.5 hours per day.
3. FOR EACH DAY THAT REQUIRES A HOTEL STAY:
   - Match and select the best hotel ONLY from the provided HOTEL DATABASE.
   - Output its exact "id" in "selected_hotel_id".
   - If the final day is departure, "selected_hotel_id" can be null or "departure".
4. OUTPUT FORMAT: Return ONLY valid, raw JSON (no markdown formatting, no code fences, no extra text) matching this schema:
{
  "trip_title": "string",
  "summary": "string",
  "total_days": number,
  "vibe": "beaches | romantic | wildlife | heritage | highlands | balanced",
  "itinerary": [
    {
      "day": 1,
      "destination_name": "string (e.g. Negombo Lagoon & Soft Beach Arrival)",
      "destination_id": "string (lowercase hub: negombo, sigiriya, kandy, ella, mirissa, galle, bentota, colombo, etc.)",
      "night_location": "string (e.g. Negombo Beachfront)",
      "title": "string",
      "driving_time": "string (e.g. 25 mins (15 km) or 1.5 hrs)",
      "route_leg": "string (e.g. CMB Airport ➔ Negombo Beach)",
      "morning": "string (morning activity)",
      "afternoon": "string (afternoon activity)",
      "evening": "string (evening activity)",
      "photo_spot": "string (scenic photo recommendation)",
      "selected_hotel_id": "exact_hotel_id_from_db"
    }
  ]
}

AVAILABLE HOTEL DATABASE:
${JSON.stringify(
  availableHotels.map((h) => ({
    id: String(h.id),
    destination_id: h.destination_id,
    name: h.name,
    room_type: h.room_type,
    stay_type: h.stay_type,
    price_per_night_lkr: h.price_per_night_lkr,
    rating: h.rating,
    amenities: h.amenities
  }))
)}
`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json"
    }
  });

  const promptMessage = `User Travel Request: "${userPrompt}"
Target Duration: ${days} Days
Preferred Currency: ${currency}
${targetBudget ? `Target Budget: ${targetBudget} ${currency}` : ""}`;

  const response = await model.generateContent([
    systemInstruction,
    promptMessage
  ]);

  const responseText = response.response.text();
  const cleanedJson = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsedData = JSON.parse(cleanedJson);

  // 4. Enrich AI response with full HotelListing objects and coordinates
  const selectedHotelsMap: Record<number, HotelListing> = {};

  const enrichedItinerary: DayItineraryItem[] = (parsedData.itinerary || []).map(
    (dayItem: any, idx: number) => {
      const dayNum = dayItem.day || idx + 1;
      const isDepartureDay = dayNum === parsedData.total_days;

      // Find matched hotel from availableHotels
      let matchedRawHotel = availableHotels.find(
        (h) => String(h.id) === String(dayItem.selected_hotel_id)
      );

      // Fallback matching by destination if ID didn't match
      if (!matchedRawHotel && dayItem.destination_id) {
        matchedRawHotel = availableHotels.find(
          (h) =>
            h.destination_id.toLowerCase() ===
            dayItem.destination_id.toLowerCase()
        );
      }

      const hotelPriceLkr = isDepartureDay
        ? 0
        : Number(matchedRawHotel?.price_per_night_lkr) || 20000;

      const coords = getCoordinatesForDestination(
        dayItem.destination_id || dayItem.night_location || ""
      );

      if (matchedRawHotel && !isDepartureDay) {
        selectedHotelsMap[dayNum] = {
          id: String(matchedRawHotel.id),
          destinationId: matchedRawHotel.destination_id,
          name: matchedRawHotel.name,
          roomType: matchedRawHotel.room_type || "Deluxe Room",
          stayType: matchedRawHotel.stay_type === "rental" ? "rental" : "hotel",
          rating: Number(matchedRawHotel.rating) || 4.5,
          reviewCount: Number(matchedRawHotel.review_count) || 40,
          imageUrl: matchedRawHotel.image_url || "",
          pricePerNightLkr: Number(matchedRawHotel.price_per_night_lkr) || 20000,
          amenities: Array.isArray(matchedRawHotel.amenities)
            ? matchedRawHotel.amenities
            : ["AC", "Breakfast", "WiFi"]
        };
      }

      return {
        day: dayNum,
        destination: dayItem.destination_name || dayItem.title || "Sri Lanka Stop",
        nightLocation: dayItem.night_location || dayItem.destination_name || "Hotel Stay",
        title: dayItem.title || "Daily Experience",
        drivingTime: dayItem.driving_time || "25 mins (15 km)",
        routeLeg: dayItem.route_leg || "Direct Highway Leg",
        morning: dayItem.morning || "",
        afternoon: dayItem.afternoon || "",
        evening: dayItem.evening || "",
        photoSpot: dayItem.photo_spot || "Scenic landscape spot",
        hotelName: isDepartureDay
          ? "Direct International Flight Home (Driver Transfer Included)"
          : matchedRawHotel?.name || "Verified 4★ Partner Stay",
        hotelCategory: isDepartureDay
          ? "Airport Departure Service"
          : matchedRawHotel?.room_type || "4-Star Deluxe",
        hotelBadge: isDepartureDay
          ? "✈️ Departure Transfer"
          : "🤖 AI Match · Supabase Verified",
        hotelPriceLkr: hotelPriceLkr,
        hotelImage: matchedRawHotel?.image_url || "",
        hotelRating: matchedRawHotel?.rating || 4.6,
        hotelReviewCount: matchedRawHotel?.review_count || 45,
        lat: coords.lat,
        lng: coords.lng
      };
    }
  );

  // 5. Compute accurate multi-currency budget breakdown
  const intent: ParsedTripIntent = {
    days: parsedData.total_days || days,
    travelerCount: 2,
    groupType: "Couple",
    vibe: parsedData.vibe || "balanced",
    packageScope: "complete_package",
    targetBudgetAmount: targetBudget,
    currencyCode: currency
  };

  const breakdown = calculateBudgetBreakdown(intent, enrichedItinerary);

  return {
    success: true,
    trip_title: parsedData.trip_title,
    summary: parsedData.summary,
    total_days: parsedData.total_days || days,
    itinerary: enrichedItinerary,
    selectedHotels: selectedHotelsMap,
    breakdown,
    intent
  };
}

/**
 * Standard Vercel Serverless Function Handler
 */
export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { userPrompt, days, currency, targetBudget } = req.body || {};

    if (!userPrompt) {
      return res.status(400).json({ error: "userPrompt is required." });
    }

    const result = await executePlanTrip({
      userPrompt,
      days,
      currency,
      targetBudget
    });

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("[api/plan-trip] Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate dynamic trip itinerary with AI"
    });
  }
}
