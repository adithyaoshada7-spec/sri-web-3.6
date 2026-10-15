import { HotelListing } from "../data/sriLankaHotelsData";
import { fetchHotels } from "./supabaseClient";
import {
  DayItineraryItem,
  ParsedTripIntent,
  CURRENCY_RATES,
  calculateBudgetBreakdown,
  BudgetBreakdown
} from "./tripRuleEngine";

export interface HotelMatchResult {
  itinerary: DayItineraryItem[];
  selectedHotels: Record<number, HotelListing>;
  breakdown: BudgetBreakdown;
}

/**
 * Intelligent AI Hotel Matcher for Supabase
 * Evaluates user prompt (vibe, target budget, luxury vs rental, beach/wildlife/heritage)
 * and dynamically matches the best live partner hotel from the Supabase database
 * for every night of the itinerary.
 */
export async function matchHotelsFromSupabaseForItinerary(
  baseItinerary: DayItineraryItem[],
  intent: ParsedTripIntent,
  rawPrompt: string
): Promise<HotelMatchResult> {
  const text = (rawPrompt || "").toLowerCase();

  // 1. Detect user preferences & stylistic keywords from prompt
  const wantsRental =
    text.includes("villa") ||
    text.includes("apartment") ||
    text.includes("rental") ||
    text.includes("homestay") ||
    text.includes("kitchen") ||
    text.includes("airbnb") ||
    text.includes("private pool");

  const wantsHotel =
    text.includes("hotel") ||
    text.includes("resort") ||
    text.includes("5 star") ||
    text.includes("4 star");

  const wantsSeaView =
    text.includes("sea view") ||
    text.includes("ocean") ||
    text.includes("beach") ||
    text.includes("coastal") ||
    intent.vibe === "beaches";

  const wantsLuxury =
    text.includes("luxury") ||
    text.includes("5 star") ||
    text.includes("5★") ||
    text.includes("honeymoon") ||
    text.includes("plunge pool") ||
    text.includes("presidential") ||
    text.includes("boutique suite");

  const wantsBudget =
    text.includes("budget") ||
    text.includes("affordable") ||
    text.includes("cheap") ||
    text.includes("hostel") ||
    text.includes("backpack") ||
    text.includes("homestay");

  const wantsHeritage =
    text.includes("heritage") ||
    text.includes("colonial") ||
    text.includes("ancient") ||
    text.includes("cultural") ||
    intent.vibe === "heritage";

  // 2. Compute Target Hotel Budget Per Night in LKR
  const curr = CURRENCY_RATES[intent.currencyCode] || CURRENCY_RATES.INR;
  let targetPerNightLkr = 20000; // default 4★ sea view baseline

  if (intent.targetBudgetAmount && intent.targetBudgetAmount > 0) {
    const totalBudgetLkr = intent.targetBudgetAmount * curr.toLkr;
    const chauffeurTotalLkr = intent.days * 11500;
    const activitiesTotalLkr =
      intent.packageScope === "driver_only"
        ? 0
        : Math.max(1, intent.travelerCount) * Math.max(1, intent.days - 1) * 3500;

    const remainingHotelBudgetLkr = Math.max(
      0,
      totalBudgetLkr - chauffeurTotalLkr - activitiesTotalLkr
    );

    const payableNights = baseItinerary.filter(
      (d) =>
        !d.nightLocation.toLowerCase().includes("airport") &&
        !d.nightLocation.toLowerCase().includes("home") &&
        d.hotelPriceLkr > 0
    ).length || Math.max(1, intent.days - 1);

    if (remainingHotelBudgetLkr > 0 && payableNights > 0) {
      targetPerNightLkr = Math.round(remainingHotelBudgetLkr / payableNights);
    }
  }

  // 3. Collect unique destinations to fetch from Supabase
  const destinationMap = new Map<string, HotelListing[]>();
  const destinationsToFetch = Array.from(
    new Set(
      baseItinerary
        .filter((d) => d.hotelPriceLkr > 0)
        .map((d) => d.nightLocation.split("/")[0].trim().toLowerCase())
    )
  );

  // Fetch concurrently from Supabase
  await Promise.all(
    destinationsToFetch.map(async (dest) => {
      try {
        const hotels = await fetchHotels(dest);
        destinationMap.set(dest, hotels);
      } catch (err) {
        console.error(`Failed to fetch Supabase hotels for ${dest}:`, err);
      }
    })
  );

  const selectedHotels: Record<number, HotelListing> = {};

  // 4. Score and select the optimal hotel for each day
  const updatedItinerary: DayItineraryItem[] = baseItinerary.map((day) => {
    // If Day is departure or no hotel needed (hotelPriceLkr == 0)
    if (
      day.hotelPriceLkr === 0 ||
      day.nightLocation.toLowerCase().includes("airport") ||
      day.nightLocation.toLowerCase().includes("home")
    ) {
      return day;
    }

    const cleanDest = day.nightLocation.split("/")[0].trim().toLowerCase();
    const candidates = destinationMap.get(cleanDest) || [];

    if (!candidates || candidates.length === 0) {
      return day;
    }

    // Score candidates
    const scored = candidates.map((hotel) => {
      let score = 50;

      // Base quality score from rating and review count
      score += (hotel.rating - 4.0) * 30; // e.g. 4.8 -> +24 pts, 4.2 -> +6 pts
      score += Math.min(hotel.reviewCount / 15, 15); // up to 15 pts

      // Accommodation Type Preference
      if (wantsRental) {
        if (hotel.stayType === "rental") score += 40;
        else score -= 15;
      } else if (wantsHotel) {
        if (hotel.stayType === "hotel") score += 20;
      }

      const textCorpus = (
        hotel.name +
        " " +
        hotel.roomType +
        " " +
        (hotel.amenities || []).join(" ")
      ).toLowerCase();

      // Sea View & Beach Alignment
      if (wantsSeaView) {
        if (
          textCorpus.includes("sea") ||
          textCorpus.includes("ocean") ||
          textCorpus.includes("beach") ||
          textCorpus.includes("coastal")
        ) {
          score += 30;
        }
      }

      // Heritage & Cultural Alignment
      if (wantsHeritage) {
        if (
          textCorpus.includes("heritage") ||
          textCorpus.includes("colonial") ||
          textCorpus.includes("sanctuary") ||
          textCorpus.includes("rock view")
        ) {
          score += 25;
        }
      }

      // Luxury & Honeymoon Alignment
      if (wantsLuxury) {
        if (hotel.rating >= 4.8 || textCorpus.includes("plunge pool") || textCorpus.includes("suite") || textCorpus.includes("villa")) {
          score += 35;
        }
      }

      // Budget Alignment
      if (wantsBudget) {
        // Favor lower cost options
        const priceRatio = hotel.pricePerNightLkr / 15000;
        if (priceRatio <= 1.0) score += 35;
        else score -= (priceRatio - 1.0) * 20;
      } else {
        // Target budget proximity
        const diff = Math.abs(hotel.pricePerNightLkr - targetPerNightLkr);
        const ratio = diff / Math.max(targetPerNightLkr, 10000);
        if (ratio <= 0.25) score += 30;
        else if (ratio <= 0.5) score += 15;
        else if (ratio > 1.2) score -= 15;
      }

      return { hotel, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);
    const winningHotel = scored[0].hotel;

    selectedHotels[day.day] = winningHotel;

    // Build smart AI badge
    let badge = "🤖 AI Selected Match";
    if (wantsRental && winningHotel.stayType === "rental") {
      badge = "🏡 AI Match · Private Villa";
    } else if (winningHotel.rating >= 4.8) {
      badge = `⭐ AI Top Pick · ${winningHotel.rating.toFixed(1)}★`;
    } else if (wantsSeaView && (winningHotel.roomType.toLowerCase().includes("sea") || winningHotel.name.toLowerCase().includes("sea"))) {
      badge = "🌊 AI Match · Sea View";
    } else if (wantsBudget) {
      badge = "💡 AI Best Value Pick";
    }

    return {
      ...day,
      hotelName: winningHotel.name,
      hotelCategory: winningHotel.roomType,
      hotelPriceLkr: winningHotel.pricePerNightLkr,
      hotelBadge: badge,
      hotelImage: winningHotel.imageUrl,
      hotelRating: winningHotel.rating,
      hotelReviewCount: winningHotel.reviewCount
    };
  });

  // 5. Recalculate dynamic budget breakdown with real Supabase hotel prices
  const breakdown = calculateBudgetBreakdown(intent, updatedItinerary);

  return {
    itinerary: updatedItinerary,
    selectedHotels,
    breakdown
  };
}
