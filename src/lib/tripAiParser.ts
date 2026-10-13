import {
  ParsedTripIntent,
  DayItineraryItem,
  BudgetBreakdown,
  buildOptimalItinerary,
  calculateBudgetBreakdown,
  CURRENCY_RATES
} from "./tripRuleEngine";

export interface ParsedTripResult {
  intent: ParsedTripIntent;
  itinerary: DayItineraryItem[];
  breakdown: BudgetBreakdown;
  summaryTitle: string;
  detectedTags: string[];
}

/**
 * Intelligent Rule-Based AI Parser
 * Extracts trip parameters from free-form user prompt text
 */
export function parseTripPrompt(
  promptText: string,
  explicitBudgetInput?: string,
  explicitCurrency?: string
): ParsedTripResult {
  const text = promptText.trim().toLowerCase();

  // 1. Detect Duration (Days)
  let days = 6; // Default standard sweet-spot
  const dayMatch = text.match(/(\d{1,2})\s*(?:day|days|d|nights)/i);
  if (dayMatch && dayMatch[1]) {
    const parsed = parseInt(dayMatch[1], 10);
    if (parsed >= 2 && parsed <= 21) {
      days = parsed;
    }
  } else if (text.includes("weekend")) {
    days = 3;
  } else if (text.includes("week") || text.includes("1 week") || text.includes("one week")) {
    days = 7;
  } else if (text.includes("2 weeks") || text.includes("two weeks")) {
    days = 14;
  } else if (text.includes("10 days")) {
    days = 10;
  }

  // 2. Detect Group Composition & Travelers
  let travelerCount = 2; // Default couple
  let groupType: ParsedTripIntent["groupType"] = "Couple";

  if (text.includes("solo") || text.includes("alone") || text.includes("myself") || text.includes("1 pax") || text.includes("1 person")) {
    travelerCount = 1;
    groupType = "Solo";
  } else if (text.includes("family") || text.includes("kids") || text.includes("child") || text.includes("children")) {
    groupType = "Family";
    const paxMatch = text.match(/(\d{1,2})\s*(?:people|pax|travelers|members|adults)/i);
    travelerCount = paxMatch ? Math.max(3, parseInt(paxMatch[1], 10)) : 4;
  } else if (text.includes("friends") || text.includes("group") || text.includes("buddies")) {
    groupType = "Friends";
    const paxMatch = text.match(/(\d{1,2})\s*(?:people|pax|travelers|friends)/i);
    travelerCount = paxMatch ? Math.max(3, parseInt(paxMatch[1], 10)) : 4;
  } else {
    // Check if explicit pax given
    const paxMatch = text.match(/(\d{1,2})\s*(?:people|pax|travelers|adults)/i);
    if (paxMatch) {
      travelerCount = parseInt(paxMatch[1], 10);
      if (travelerCount === 1) groupType = "Solo";
      else if (travelerCount === 2) groupType = "Couple";
      else groupType = "Friends";
    }
  }

  // 3. Detect Vibe & Interests
  let vibe: ParsedTripIntent["vibe"] = "balanced";
  const detectedTags: string[] = [];

  if (text.includes("honeymoon") || text.includes("romantic") || text.includes("couple")) {
    vibe = "romantic";
    detectedTags.push("💑 Romantic & Honeymoon");
  }
  if (text.includes("beach") || text.includes("sea view") || text.includes("ocean") || text.includes("coastal")) {
    if (vibe === "balanced") vibe = "beaches";
    detectedTags.push("🌊 4★ Sea View Stays");
  }
  if (text.includes("safari") || text.includes("wildlife") || text.includes("yala") || text.includes("elephant") || text.includes("leopard")) {
    if (vibe === "balanced") vibe = "wildlife";
    detectedTags.push("🐆 Wildlife Safari");
  }
  if (text.includes("train") || text.includes("tea") || text.includes("ella") || text.includes("nuwara eliya") || text.includes("hills")) {
    if (vibe === "balanced") vibe = "highlands";
    detectedTags.push("🚂 Scenic Blue Train");
  }
  if (text.includes("sigiriya") || text.includes("history") || text.includes("culture") || text.includes("temple")) {
    if (vibe === "balanced") vibe = "heritage";
    detectedTags.push("🏰 Cultural Citadel");
  }

  if (detectedTags.length === 0) {
    detectedTags.push("🌟 Signature Sri Lanka Loop");
  }

  // 4. Detect Package Scope (Driver only vs Driver + Hotels)
  let packageScope: ParsedTripIntent["packageScope"] = "complete_package";
  if (
    text.includes("driver only") ||
    text.includes("car only") ||
    text.includes("only transport") ||
    text.includes("transport only") ||
    text.includes("chauffeur only") ||
    text.includes("no hotel") ||
    text.includes("already booked hotel")
  ) {
    packageScope = "driver_only";
    detectedTags.push("🚗 Private Chauffeur Only");
  } else {
    detectedTags.push("🏨 Complete Land Package (Driver + 4★ Stays)");
  }

  // 5. Detect Currency
  let currencyCode = explicitCurrency ? explicitCurrency.toUpperCase() : "INR";

  if (!explicitCurrency) {
    if (text.includes("inr") || text.includes("₹") || text.includes("rupee") || text.includes("rupees") || text.includes("mumbai") || text.includes("chennai") || text.includes("delhi") || text.includes("india")) {
      currencyCode = "INR";
    } else if (text.includes("usd") || text.includes("$") || text.includes("dollar")) {
      currencyCode = "USD";
    } else if (text.includes("eur") || text.includes("€") || text.includes("euro")) {
      currencyCode = "EUR";
    } else if (text.includes("gbp") || text.includes("£") || text.includes("pound")) {
      currencyCode = "GBP";
    } else if (text.includes("lkr") || text.includes("rs") || text.includes("sri lankan")) {
      currencyCode = "LKR";
    }
  }

  if (!CURRENCY_RATES[currencyCode]) {
    currencyCode = "INR";
  }

  // 6. Detect Target Budget Amount
  let targetBudgetAmount: number | null = null;

  // If explicit budget provided in separate input
  if (explicitBudgetInput && explicitBudgetInput.trim()) {
    const cleaned = explicitBudgetInput.replace(/[^0-9.]/g, "");
    if (cleaned) {
      targetBudgetAmount = parseFloat(cleaned);
    }
  }

  // Otherwise check if typed inside prompt
  if (targetBudgetAmount === null) {
    // E.g. "budget 50000", "budget around ₹65,000", "65k inr", "$1200", "budget 80k"
    const kMatch = text.match(/(\d{1,4})\s*k(?:\s*(?:inr|rs|usd|\$|eur))?/i);
    if (kMatch && kMatch[1]) {
      targetBudgetAmount = parseInt(kMatch[1], 10) * 1000;
    } else {
      const budgetMatch = text.match(/(?:budget|around|spend|cost|limit)\s*(?:of|is|around|about)?\s*(?:₹|\$|€|£|inr|usd|eur|lkr)?\s*([0-9,]{3,9})/i);
      if (budgetMatch && budgetMatch[1]) {
        targetBudgetAmount = parseFloat(budgetMatch[1].replace(/,/g, ""));
      }
    }
  }

  // 7. Detect Departure City
  let departureCity: string | undefined = undefined;
  const cityMatch = text.match(/from\s+([a-zA-Z\s]{3,20})(?:,|\.|\s+in|\s+with|\s+for|$)/i);
  if (cityMatch && cityMatch[1]) {
    const candidate = cityMatch[1].trim();
    if (!["sri lanka", "cmb", "airport", "today", "tomorrow"].includes(candidate.toLowerCase())) {
      departureCity = candidate.charAt(0).toUpperCase() + candidate.slice(1);
      detectedTags.push(`✈️ Flights from ${departureCity}`);
    }
  }

  const intent: ParsedTripIntent = {
    days,
    travelerCount,
    groupType,
    vibe,
    packageScope,
    targetBudgetAmount,
    currencyCode,
    departureCity
  };

  const itinerary = buildOptimalItinerary(intent);
  const breakdown = calculateBudgetBreakdown(intent, itinerary);

  // Generate an engaging summary title
  const summaryTitle = `${days}-Day ${intent.vibe === "romantic" ? "Romantic Island Escape" : intent.vibe === "beaches" ? "Coastal Sea-View Discovery" : intent.vibe === "wildlife" ? "Safari & Coast Adventure" : "Signature Sri Lanka Loop"}`;

  return {
    intent,
    itinerary,
    breakdown,
    summaryTitle,
    detectedTags
  };
}
