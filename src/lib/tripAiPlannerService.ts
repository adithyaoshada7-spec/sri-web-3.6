import { ParsedTripResult, parseTripPrompt } from "./tripAiParser";
import { matchHotelsFromSupabaseForItinerary } from "./tripAiHotelMatcher";
import { HotelListing } from "../data/sriLankaHotelsData";
import { DayItineraryItem, BudgetBreakdown } from "./tripRuleEngine";

export interface DynamicAiPlanResponse {
  success: boolean;
  trip_title: string;
  summary?: string;
  total_days: number;
  itinerary: DayItineraryItem[];
  selectedHotels: Record<number, HotelListing>;
  breakdown: BudgetBreakdown;
  source: "gemini-api" | "rule-engine-fallback";
}

/**
 * Calls the backend Gemini + Supabase API (/api/plan-trip)
 * Dynamically builds itineraries tailored strictly to the user's requested destinations
 * with automatic fallback to client rule engine if Gemini key is not configured.
 */
export async function fetchDynamicTripPlan(params: {
  promptText: string;
  explicitBudget?: string;
  selectedCurrency?: string;
}): Promise<DynamicAiPlanResponse> {
  const { promptText, explicitBudget, selectedCurrency = "LKR" } = params;

  // 1. First parse duration and target budget from prompt
  const initialParsed: ParsedTripResult = parseTripPrompt(
    promptText,
    explicitBudget,
    selectedCurrency
  );

  const days = initialParsed.intent.days;
  const targetBudget = initialParsed.intent.targetBudgetAmount;

  try {
    const res = await fetch("/api/plan-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userPrompt: promptText,
        days: days,
        currency: selectedCurrency,
        targetBudget: targetBudget
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.itinerary && Array.isArray(data.itinerary) && data.itinerary.length > 0) {
        return {
          success: true,
          trip_title: data.trip_title || initialParsed.summaryTitle,
          summary: data.summary,
          total_days: data.total_days || days,
          itinerary: data.itinerary,
          selectedHotels: data.selectedHotels || {},
          breakdown: data.breakdown || initialParsed.breakdown,
          source: "gemini-api"
        };
      }
    }
    console.warn("[tripAiPlannerService] /api/plan-trip non-OK response, falling back to local matcher.");
  } catch (err) {
    console.warn("[tripAiPlannerService] Network error calling /api/plan-trip, using fallback:", err);
  }

  // 2. Fallback: Local rule engine + Supabase matcher
  const matched = await matchHotelsFromSupabaseForItinerary(
    initialParsed.itinerary,
    initialParsed.intent,
    promptText
  );

  return {
    success: true,
    trip_title: initialParsed.summaryTitle,
    total_days: initialParsed.intent.days,
    itinerary: matched.itinerary,
    selectedHotels: matched.selectedHotels,
    breakdown: matched.breakdown,
    source: "rule-engine-fallback"
  };
}
