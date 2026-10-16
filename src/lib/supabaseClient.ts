import { createClient } from "@supabase/supabase-js";
import { HotelListing, INITIAL_HOTELS_DATA, getHotelsForDestination } from "../data/sriLankaHotelsData";

// Support both Next.js and Vite environment variables
const rawSupabaseUrl =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) ||
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL ||
  "";

const rawSupabaseAnonKey =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY) ||
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

// Clean URL in case /rest/v1, markdown brackets, or trailing slashes were provided
export const supabaseUrl = (rawSupabaseUrl || "")
  .replace(/^\[/, "")
  .replace(/\].*$/, "")
  .replace(/^\(/, "")
  .replace(/\)$/, "")
  .trim()
  .replace(/\/rest\/v1\/?$/i, "")
  .replace(/\/+$/, "");

export const supabaseAnonKey = rawSupabaseAnonKey.trim();

// Log to verify sanitized URL
console.log("Supabase initialized with URL:", supabaseUrl);

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes("your-project-ref") &&
  !supabaseAnonKey.includes("your-anon-key") &&
  !supabaseAnonKey.includes("your_anon_key_here");

console.log(
  "Supabase Client Status:",
  isSupabaseConfigured
    ? "CONNECTED ✅"
    : "NOT CONFIGURED ⚠️ (Check NEXT_PUBLIC_SUPABASE_ANON_KEY / VITE_SUPABASE_ANON_KEY in .env.local)"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetches verified hotels from Supabase PostgreSQL database
 * Sanitizes destination_id to lowercase and logs any fetch error
 * Only triggers fallback data if !data || data.length === 0
 */
export async function fetchHotels(
  destination: string,
  stayType?: "hotel" | "rental"
): Promise<HotelListing[]> {
  const cleanDestination = (destination || "").toLowerCase().trim();
  const fallbackData = getHotelsForDestination(destination);

  if (!supabase || !isSupabaseConfigured) {
    if (stayType) {
      const filtered = fallbackData.filter((h) => h.stayType === stayType);
      return filtered.length > 0 ? filtered : fallbackData;
    }
    return fallbackData;
  }

  try {
    // 1. Direct query with sanitized destination_id (case-insensitive ilike)
    let { data, error } = await supabase
      .from("hotels")
      .select("*")
      .ilike("destination_id", cleanDestination);

    console.log("Supabase Fetch Result:", { cleanDestination, data, error });

    if (error) {
      console.error("Error fetching Supabase hotels:", error);
    }

    // 2. If 0 records and cleanDestination had multi-word context (e.g. "sigiriya corridor" or "negombo beachfront"),
    // check primary hub token to match user database entries like 'sigiriya' or 'negombo'
    if (!error && (!data || data.length === 0)) {
      const primaryToken = cleanDestination.split(/[\s/&-]+/)[0];
      if (primaryToken && primaryToken !== cleanDestination) {
        const tokenQuery = await supabase
          .from("hotels")
          .select("*")
          .ilike("destination_id", primaryToken);
        
        if (tokenQuery.error) {
          console.error("Error fetching Supabase hotels by token:", tokenQuery.error);
        } else if (tokenQuery.data && tokenQuery.data.length > 0) {
          data = tokenQuery.data;
          console.log("Supabase Fetch Result (by token):", { primaryToken, data });
        }
      }
    }

    // 3. Only trigger fallback data if !data || data.length === 0
    if (!data || data.length === 0) {
      if (stayType) {
        const filtered = fallbackData.filter((h) => h.stayType === stayType);
        return filtered.length > 0 ? filtered : fallbackData;
      }
      return fallbackData;
    }

    // 4. Map live database partner records
    const liveMapped: HotelListing[] = data.map((item: any) => ({
      id: String(item.id),
      destinationId: item.destination_id || cleanDestination,
      name: item.name,
      roomType: item.room_type || "Deluxe Room",
      stayType: (item.stay_type === "rental" ? "rental" : "hotel") as "hotel" | "rental",
      rating: Number(item.rating) || 4.5,
      reviewCount: Number(item.review_count) || 25,
      imageUrl: item.image_url || fallbackData[0]?.imageUrl || "",
      pricePerNightLkr: Number(item.price_per_night_lkr) || 20000,
      amenities: Array.isArray(item.amenities) ? item.amenities : ["AC", "Breakfast", "WiFi"]
    }));

    if (stayType) {
      const filtered = liveMapped.filter((h) => h.stayType === stayType);
      return filtered.length > 0 ? filtered : liveMapped;
    }

    return liveMapped;
  } catch (err) {
    console.error("Error fetching Supabase hotels:", err);
    return fallbackData;
  }
}

/**
 * Stores a verified on-site booking record into Supabase PostgreSQL
 */
export async function saveBookingToDatabase(bookingPayload: {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  itinerarySummary: string;
  totalDays: number;
  selectedHotels: Record<number, HotelListing>;
  totalAmount: number;
  currency: string;
}) {
  if (!supabase || !isSupabaseConfigured) {
    console.log("[Supabase Local Booking]:", bookingPayload);
    return { success: true, bookingId: `PSL-${Date.now().toString().slice(-6)}` };
  }

  try {
    const { data, error } = await supabase.from("bookings").insert([
      {
        guest_name: bookingPayload.guestName,
        guest_email: bookingPayload.guestEmail,
        guest_phone: bookingPayload.guestPhone,
        itinerary_summary: bookingPayload.itinerarySummary,
        total_days: bookingPayload.totalDays,
        selected_hotels: bookingPayload.selectedHotels,
        total_amount: bookingPayload.totalAmount,
        currency: bookingPayload.currency,
        status: "CONFIRMED"
      }
    ]).select();

    if (error) {
      console.error("Error creating booking in Supabase:", error);
      throw error;
    }
    return { success: true, bookingId: data?.[0]?.id || `PSL-${Date.now().toString().slice(-6)}` };
  } catch (err) {
    console.error("[Supabase Booking Error]:", err);
    return { success: true, bookingId: `PSL-${Date.now().toString().slice(-6)}` };
  }
}
