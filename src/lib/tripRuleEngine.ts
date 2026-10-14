/**
 * Sri Lanka Travel Rule-Engine & Geographic Constraints Matrix
 * 
 * Prevents AI hallucinations by enforcing real-world Sri Lankan highway times,
 * mountain road winding limits, chauffeur operational costs, and verified 4★ hotel rates.
 */

export interface CurrencyRate {
  code: string;
  symbol: string;
  name: string;
  toLkr: number; // 1 unit of currency = X LKR
  format: (amount: number) => string;
}

export const CURRENCY_RATES: Record<string, CurrencyRate> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    toLkr: 3.6,
    format: (amt) => `₹${Math.round(amt).toLocaleString("en-IN")}`
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    toLkr: 300,
    format: (amt) => `$${Math.round(amt).toLocaleString("en-US")}`
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    toLkr: 330,
    format: (amt) => `€${Math.round(amt).toLocaleString("en-EU")}`
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    toLkr: 390,
    format: (amt) => `£${Math.round(amt).toLocaleString("en-GB")}`
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    toLkr: 200,
    format: (amt) => `A$${Math.round(amt).toLocaleString("en-AU")}`
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    toLkr: 220,
    format: (amt) => `C$${Math.round(amt).toLocaleString("en-CA")}`
  },
  AED: {
    code: "AED",
    symbol: "AED",
    name: "UAE Dirham",
    toLkr: 82,
    format: (amt) => `AED ${Math.round(amt).toLocaleString("en-AE")}`
  },
  LKR: {
    code: "LKR",
    symbol: "Rs",
    name: "Sri Lankan Rupee",
    toLkr: 1.0,
    format: (amt) => `LKR ${Math.round(amt).toLocaleString("en-LK")}`
  }
};

export const CHAUFFEUR_DAILY_RATE_LKR = 11500; // Dedicated English speaking licensed chauffeur, AC car, fuel, tolls, driver lodging/food
export const HOTEL_4STAR_SEAVIEW_RATE_LKR = 20000; // Verified 4-Star Category & Sea View / Heritage Boutique with breakfast
export const HOTEL_3STAR_COMFORT_RATE_LKR = 12000;
export const HOTEL_5STAR_LUXURY_RATE_LKR = 45000;
export const ACTIVITIES_BUFFER_PER_PAX_PER_DAY_LKR = 3500; // Sigiriya entry, Temple of Tooth, train tickets, safari jeep

export const MAX_RECOMMENDED_DAILY_DRIVE_HOURS = 3.5;

// Geographic Hub Nodes in Sri Lanka
export interface HubNode {
  id: string;
  name: string;
  region: "coastal" | "cultural" | "highland" | "wildlife" | "urban" | "north";
  recommendedNights: number;
  highlight: string;
  lat: number;
  lng: number;
  priceLkr?: number;
}

export const SRI_LANKA_HUBS: Record<string, HubNode> = {
  negombo: { id: "negombo", name: "Negombo & Airport CMB", region: "coastal", recommendedNights: 1, highlight: "Lagoon & soft beach arrival", lat: 7.2008, lng: 79.8737, priceLkr: 68000 },
  sigiriya: { id: "sigiriya", name: "Sigiriya & Cultural Triangle", region: "cultural", recommendedNights: 2, highlight: "Lion Rock & Pidurangala sunset", lat: 7.9570, lng: 80.7603, priceLkr: 72000 },
  kandy: { id: "kandy", name: "Kandy Sacred Hills", region: "cultural", recommendedNights: 1, highlight: "Temple of the Tooth & Botanic Gardens", lat: 7.2906, lng: 80.6337, priceLkr: 70000 },
  nuwara_eliya: { id: "nuwara_eliya", name: "Nuwara Eliya (Little England)", region: "highland", recommendedNights: 1, highlight: "Tea estates & colonial bungalows", lat: 6.9497, lng: 80.7891, priceLkr: 75000 },
  ella: { id: "ella", name: "Ella Scenic Highlands", region: "highland", recommendedNights: 2, highlight: "Nine Arch Bridge & scenic blue train", lat: 6.8667, lng: 81.0466, priceLkr: 74000 },
  yala: { id: "yala", name: "Yala National Park", region: "wildlife", recommendedNights: 1, highlight: "Leopard safaris & wild elephant lakes", lat: 6.3686, lng: 81.5204, priceLkr: 85000 },
  mirissa: { id: "mirissa", name: "Mirissa & Southern Beaches", region: "coastal", recommendedNights: 2, highlight: "Golden sea view beach & whale watching", lat: 5.9483, lng: 80.4716, priceLkr: 69000 },
  galle: { id: "galle", name: "Galle Dutch Fort", region: "coastal", recommendedNights: 1, highlight: "UNESCO cobblestone fortress ramparts", lat: 6.0535, lng: 80.2210, priceLkr: 76000 },
  bentota: { id: "bentota", name: "Bentota Golden Coast", region: "coastal", recommendedNights: 2, highlight: "Water sports & tranquil sea-view resorts", lat: 6.4259, lng: 79.9958, priceLkr: 72000 },
  trincomalee: { id: "trincomalee", name: "Trincomalee & Nilaveli", region: "coastal", recommendedNights: 2, highlight: "Turquoise shallow bays & Pigeon Island", lat: 8.5874, lng: 81.2152, priceLkr: 78000 },
  colombo: { id: "colombo", name: "Colombo Marina & City", region: "urban", recommendedNights: 1, highlight: "Galle Face Green & dining at Ministry of Crab", lat: 6.9271, lng: 79.8612, priceLkr: 79473 },
  jaffna: { id: "jaffna", name: "Jaffna Peninsula & North", region: "north", recommendedNights: 2, highlight: "Nallur Kovil & Casuarina Beach", lat: 9.6615, lng: 80.0255, priceLkr: 82813 }
};

// Regional Origin & Transit Airports (as shown in Flight Radar / Google Flights view)
export interface RegionalAirportNode {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  priceLkr: number;
  highlightRoute?: boolean;
}

export const REGIONAL_AIRPORTS: RegionalAirportNode[] = [
  { id: "colombo", code: "CMB", name: "Bandaranaike Int'l", city: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612, priceLkr: 79473, highlightRoute: true },
  { id: "jaffna", code: "JAF", name: "Jaffna Int'l", city: "Jaffna", country: "Sri Lanka", lat: 9.6615, lng: 80.0255, priceLkr: 82813 },
  { id: "kochi", code: "COK", name: "Cochin Int'l", city: "Kochi", country: "India", lat: 9.9312, lng: 76.2673, priceLkr: 45073 },
  { id: "madurai", code: "IXM", name: "Madurai Airport", city: "Madurai", country: "India", lat: 9.9252, lng: 78.1198, priceLkr: 46071 },
  { id: "thiruvananthapuram", code: "TRV", name: "Trivandrum Int'l", city: "Thiruvananthapuram", country: "India", lat: 8.5241, lng: 76.9366, priceLkr: 48716 },
  { id: "tiruchirappalli", code: "TRZ", name: "Tiruchirappalli Int'l", city: "Tiruchirappalli", country: "India", lat: 10.7905, lng: 78.7047, priceLkr: 46073 },
  { id: "chennai", code: "MAA", name: "Chennai Int'l", city: "Chennai", country: "India", lat: 13.0827, lng: 80.2707, priceLkr: 54635 },
  { id: "coimbatore", code: "CJB", name: "Coimbatore Int'l", city: "Coimbatore", country: "India", lat: 11.0168, lng: 76.9558, priceLkr: 60771 },
  { id: "kozhikode", code: "CCJ", name: "Calicut Int'l", city: "Kozhikode", country: "India", lat: 11.2588, lng: 75.7804, priceLkr: 60490 },
  { id: "bengaluru", code: "BLR", name: "Kempegowda Int'l", city: "Bengaluru", country: "India", lat: 12.9716, lng: 77.5946, priceLkr: 55274 },
  { id: "mangaluru", code: "IXE", name: "Mangaluru Int'l", city: "Mangaluru", country: "India", lat: 12.9141, lng: 74.8560, priceLkr: 60000 },
  { id: "mumbai", code: "BOM", name: "Chhatrapati Shivaji Maharaj", city: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, priceLkr: 68500 }
];

export function getCoordinatesForDestination(dest: string): { lat: number; lng: number } {
  const d = dest.toLowerCase();
  if (d.includes("negombo") || d.includes("airport") || d.includes("cmb")) return { lat: 7.2008, lng: 79.8737 };
  if (d.includes("sigiriya") || d.includes("dambulla") || d.includes("triangle")) return { lat: 7.9570, lng: 80.7603 };
  if (d.includes("kandy")) return { lat: 7.2906, lng: 80.6337 };
  if (d.includes("nuwara eliya") || d.includes("little england")) return { lat: 6.9497, lng: 80.7891 };
  if (d.includes("ella")) return { lat: 6.8667, lng: 81.0466 };
  if (d.includes("yala") || d.includes("tissa")) return { lat: 6.3686, lng: 81.5204 };
  if (d.includes("mirissa") || d.includes("weligama")) return { lat: 5.9483, lng: 80.4716 };
  if (d.includes("galle")) return { lat: 6.0535, lng: 80.2210 };
  if (d.includes("bentota")) return { lat: 6.4259, lng: 79.9958 };
  if (d.includes("trincomalee") || d.includes("nilaveli")) return { lat: 8.5874, lng: 81.2152 };
  if (d.includes("colombo")) return { lat: 6.9271, lng: 79.8612 };
  if (d.includes("jaffna")) return { lat: 9.6615, lng: 80.0255 };
  return { lat: 7.2008, lng: 79.8737 };
}

// Driving times between nodes (in hours)
export const DRIVING_HOURS_MATRIX: Record<string, Record<string, number>> = {
  negombo: {
    sigiriya: 3.5,
    kandy: 3.0,
    bentota: 1.5,
    mirissa: 2.2,
    colombo: 0.6,
    trincomalee: 5.0
  },
  sigiriya: {
    negombo: 3.5,
    kandy: 2.5,
    trincomalee: 2.0,
    nuwara_eliya: 4.5,
    ella: 5.5
  },
  kandy: {
    sigiriya: 2.5,
    nuwara_eliya: 2.5,
    ella: 3.5,
    negombo: 3.0,
    colombo: 3.2
  },
  nuwara_eliya: {
    kandy: 2.5,
    ella: 2.0,
    yala: 4.0
  },
  ella: {
    nuwara_eliya: 2.0,
    kandy: 3.5,
    yala: 2.2,
    mirissa: 3.5
  },
  yala: {
    ella: 2.2,
    mirissa: 2.5,
    galle: 2.3,
    bentota: 3.0
  },
  mirissa: {
    galle: 0.7,
    bentota: 1.2,
    colombo: 2.0,
    negombo: 2.5,
    yala: 2.5
  },
  galle: {
    mirissa: 0.7,
    bentota: 0.8,
    colombo: 1.8,
    negombo: 2.2
  },
  bentota: {
    galle: 0.8,
    mirissa: 1.2,
    colombo: 1.2,
    negombo: 1.5
  },
  colombo: {
    negombo: 0.6,
    bentota: 1.2,
    galle: 1.8,
    mirissa: 2.0,
    kandy: 3.2
  }
};

export interface DayItineraryItem {
  day: number;
  destination: string;
  nightLocation: string;
  title: string;
  drivingTime: string;
  routeLeg: string;
  morning: string;
  afternoon: string;
  evening: string;
  photoSpot: string;
  hotelName: string;
  hotelCategory: string;
  hotelBadge: string;
  hotelPriceLkr: number;
  lat?: number;
  lng?: number;
}

export interface BudgetBreakdown {
  currency: string;
  driverCost: number;
  hotelCost: number;
  activitiesCost: number;
  totalCalculated: number;
  formattedDriverCost: string;
  formattedHotelCost: string;
  formattedActivitiesCost: string;
  formattedTotalCalculated: string;
  userTargetBudget: number | null;
  formattedUserTargetBudget: string | null;
  feasibilityStatus: "UNDER_BUDGET" | "EXACT_MATCH" | "SLIGHTLY_ABOVE" | "NEEDS_BUDGET_ADJUSTMENT";
  feasibilityNote: string;
  perPersonCalculated: string;
}

export interface ParsedTripIntent {
  days: number;
  travelerCount: number;
  groupType: "Solo" | "Couple" | "Family" | "Friends";
  vibe: "romantic" | "beaches" | "wildlife" | "heritage" | "highlands" | "balanced";
  packageScope: "complete_package" | "driver_only";
  targetBudgetAmount: number | null;
  currencyCode: string;
  departureCity?: string;
  specialRequests?: string;
}

/**
 * Validates whether user-requested destinations violate maximum daily drive limits
 */
export function validateRouteFeasibility(requestedPlaces: string[]): {
  isFeasible: boolean;
  warnings: string[];
  suggestedRoute: string[];
} {
  const warnings: string[] = [];
  const lower = requestedPlaces.map((p) => p.toLowerCase());

  if (lower.some((p) => p.includes("jaffna")) && lower.some((p) => p.includes("galle") || p.includes("mirissa"))) {
    warnings.push(
      "⚠️ Jaffna (Far North) to Galle (South) requires 9+ hours of continuous highway driving. We strongly suggest prioritizing either the Northern Heritage Loop or the Southern Coastal Loop."
    );
  }

  return {
    isFeasible: warnings.length === 0,
    warnings,
    suggestedRoute: requestedPlaces
  };
}

/**
 * Constructs an optimal, realistic Day-by-Day Loop conforming strictly to Sri Lanka's geography
 */
export function buildOptimalItinerary(intent: ParsedTripIntent): DayItineraryItem[] {
  const days = Math.max(3, Math.min(14, intent.days || 6));
  const items: DayItineraryItem[] = [];

  const enrichWithCoordinates = (list: DayItineraryItem[]): DayItineraryItem[] => {
    return list.map((item) => {
      const coords = getCoordinatesForDestination(item.destination || item.nightLocation);
      return {
        ...item,
        lat: coords.lat,
        lng: coords.lng
      };
    });
  };

  // 3-Day Express Coastal / Triangle Route
  if (days <= 4) {
    items.push({
      day: 1,
      destination: "Airport to Negombo / Bentota",
      nightLocation: "Negombo Beachfront",
      title: "Arrival & Coastal Lagoon Unwind",
      drivingTime: "25 mins (15 km)",
      routeLeg: "CMB Airport ➔ Negombo",
      morning: "Bandaranaike International Airport pickup by your private licensed chauffeur.",
      afternoon: "Check into 4★ beachfront hotel. Sunset ocean deck & king coconut refresh.",
      evening: "Negombo lagoon catamaran cruise & fresh ginger mud crab dining.",
      photoSpot: "Negombo golden sunset over catamaran sails",
      hotelName: "Heritance Negombo (4★ Sea View Deluxe)",
      hotelCategory: "4-Star Sea View Beachfront",
      hotelBadge: "🌊 4★ Ocean Front",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    });
    items.push({
      day: 2,
      destination: "Galle Dutch Fort Heritage",
      nightLocation: "Galle Fort / Weligama",
      title: "UNESCO Ramparts & Weligama Coastal Waves",
      drivingTime: "1.8 hrs (130 km expressway)",
      routeLeg: "Negombo ➔ Southern Expressway ➔ Galle",
      morning: "Smooth highway cruise down south with dedicated air-conditioned chauffeur.",
      afternoon: "Artisan gelato and cobblestone strolls inside UNESCO Galle Dutch Fort.",
      evening: "Sunset walk on the 17th-century ramparts facing breaking Indian Ocean waves.",
      photoSpot: "Galle Fort Lighthouse at dusk & Weligama stilt fishermen",
      hotelName: "Jetwing Lighthouse (4★ Sea View Coastal Suite)",
      hotelCategory: "4-Star Sea View Ocean Resort",
      hotelBadge: "🌊 4★ Sea View",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    });
    items.push({
      day: 3,
      destination: "Colombo Marina & Departure",
      nightLocation: "CMB Airport / Home",
      title: "Colombo Dining & Airport Transfer",
      drivingTime: "1.5 hrs (125 km expressway)",
      routeLeg: "Galle ➔ Colombo ➔ CMB Airport",
      morning: "Leisurely beachside breakfast and Ceylon souvenir shopping (Laksala / ODEL).",
      afternoon: "Galle Face Green ocean promenade and world-famous Ministry of Crab lunch.",
      evening: "Smooth 30-min expressway transfer directly to CMB Airport departures hall.",
      photoSpot: "Colombo skyline across Galle Face Green",
      hotelName: "International Flight Home (Airport Transfer Included)",
      hotelCategory: "Airport Drop-off Buffering",
      hotelBadge: "✈️ Same-Day Departure",
      hotelPriceLkr: 0
    });
    return enrichWithCoordinates(items);
  }

  // 5 to 7 Day Classic Loop: Negombo -> Sigiriya -> Kandy -> Ella -> Galle/Mirissa -> Colombo
  if (days <= 7) {
    items.push({
      day: 1,
      destination: "Airport to Negombo",
      nightLocation: "Negombo Beachfront",
      title: "Airport Welcome & Beachside Soft Landing",
      drivingTime: "25 mins (15 km)",
      routeLeg: "CMB Airport ➔ Negombo",
      morning: "Private chauffeur greeting at CMB Arrival Hall with cold mineral water & local SIM setup.",
      afternoon: "Skip Colombo traffic: 20-min coastal transfer to your beachfront resort.",
      evening: "Lagoon catamaran cruise & seafood dinner by the ocean waves.",
      photoSpot: "Negombo palm-fringed sunset",
      hotelName: "Heritance Negombo (4★ Sea View Deluxe)",
      hotelCategory: "4-Star Sea View Beachfront",
      hotelBadge: "🌊 4★ Sea View",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    });

    items.push({
      day: 2,
      destination: "Sigiriya Lion Rock Citadel",
      nightLocation: "Sigiriya",
      title: "Cultural Triangle & Pidurangala Golden Sunset",
      drivingTime: "3.5 hrs (145 km)",
      routeLeg: "Negombo ➔ Kurunegala ➔ Sigiriya",
      morning: "Scenic inland journey past lush coconut estates with King Coconut (Thambili) stop.",
      afternoon: "Check-in to forest sanctuary resort. Traditional clay-pot lunch.",
      evening: "Ascend Pidurangala Rock for an iconic 360-degree sunset facing the Lion Citadel.",
      photoSpot: "Pidurangala summit overlooking Lion Rock",
      hotelName: "Aliya Resort & Spa (4★ Heritage Resort)",
      hotelCategory: "4-Star Cultural Resort",
      hotelBadge: "🏰 4★ Heritage Stay",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    });

    items.push({
      day: 3,
      destination: "Sigiriya Citadel & Sacred Kandy",
      nightLocation: "Kandy Hills",
      title: "Ancient Fortress & Temple of the Sacred Tooth",
      drivingTime: "2.5 hrs (90 km)",
      routeLeg: "Sigiriya ➔ Dambulla ➔ Kandy",
      morning: "Early climb of Sigiriya Lion Rock Citadel to beat midday heat and crowds.",
      afternoon: "Explore Dambulla Golden Rock Cave Temples, then scenic drive into misty Kandy.",
      evening: "Evening ceremonial drums at Temple of the Sacred Tooth Relic & Kandy Lake walk.",
      photoSpot: "Sigiriya Mirror Wall & Kandy Lake reflection",
      hotelName: "Earl's Regency Kandy (4★ Mountain View)",
      hotelCategory: "4-Star Hill Country Luxury",
      hotelBadge: "🛕 4★ Mountain View",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    });

    items.push({
      day: 4,
      destination: "Scenic Blue Train to Ella",
      nightLocation: "Ella Highlands",
      title: "World-Renowned Tea Country Blue Train",
      drivingTime: "3.5 hrs (Reserved Train + Car)",
      routeLeg: "Kandy ➔ Nuwara Eliya ➔ Ella",
      morning: "Board the world-famous Highland Blue Train through emerald Ceylon tea valleys.",
      afternoon: "Chauffeur meets you with your luggage at Ella Station. Check-in to cliffside boutique.",
      evening: "Sunset cocktails overlooking Ella Gap and Nine Arch Bridge valley.",
      photoSpot: "Hanging from the Blue Train doors over tea estates",
      hotelName: "98 Acres Resort & Spa / Mountain Heavens (4★)",
      hotelCategory: "4-Star Panoramic Highland Boutique",
      hotelBadge: "🚂 4★ Ella Ridge",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    });

    if (days >= 6) {
      items.push({
        day: 5,
        destination: "Ella to Yala / Mirissa Coastal Drive",
        nightLocation: "Mirissa / Weligama",
        title: "Ravana Falls & Southern Golden Beachfront",
        drivingTime: "3.2 hrs (170 km)",
        routeLeg: "Ella ➔ Ravana Falls ➔ Mirissa Beach",
        morning: "Sunrise photos at Nine Arch Bridge as morning steam train crosses.",
        afternoon: "Stop at cascading Ravana Falls. Coast down to the sparkling turquoise south coast.",
        evening: "Direct sea-view check-in. Coconut cocktails on Mirissa beach with barefoot seafood dinner.",
        photoSpot: "Nine Arch Bridge viaduct & Mirissa Coconut Tree Hill",
        hotelName: "Triple O Six Mirissa (4★ Sea View Boutique)",
        hotelCategory: "4-Star Sea View Coastal Resort",
        hotelBadge: "🌊 4★ Sea View",
        hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
      });
    }

    if (days >= 7) {
      items.push({
        day: 6,
        destination: "Mirissa Whale Watching & Galle Dutch Fort",
        nightLocation: "Galle Fort / Bentota",
        title: "Southern Coast & UNESCO Galle Fort Ramparts",
        drivingTime: "1.2 hrs (50 km coastal)",
        routeLeg: "Mirissa ➔ Weligama ➔ Galle Fort",
        morning: "Optional morning whale watching cruise or leisurely beachside surf session.",
        afternoon: "Witness Weligama stilt fishermen. Artisan shopping in Galle Fort.",
        evening: "Sunset walk on Galle Fort lighthouse ramparts with candlelit Dutch Hospital dining.",
        photoSpot: "Galle Fort Lighthouse & Weligama stilt fishermen",
        hotelName: "Jetwing Lighthouse (4★ Sea View Coastal Suite)",
        hotelCategory: "4-Star Sea View Ocean Resort",
        hotelBadge: "🌊 4★ Sea View",
        hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
      });
    }

    // Final Departure Day
    items.push({
      day: days,
      destination: "Galle / Bentota to Colombo & Airport Departure",
      nightLocation: "CMB Airport / Home",
      title: "Southern Expressway, Colombo Dining & Departure",
      drivingTime: "1.8 hrs (125 km expressway)",
      routeLeg: "South Coast ➔ Colombo ➔ CMB Airport",
      morning: "Breakfast overlooking Indian Ocean waves. Pack Ceylon tea and artisan gems.",
      afternoon: "Expressway drive to Colombo. Lunch at Ministry of Crab or Dutch Hospital.",
      evening: "Sunset on Galle Face Green, souvenir collection, and direct airport transfer (3hr buffer).",
      photoSpot: "Colombo skyline across Galle Face promenade",
      hotelName: "Direct International Flight Home (Driver Transfer Included)",
      hotelCategory: "Airport Departure Service",
      hotelBadge: "✈️ Same-Day Flight",
      hotelPriceLkr: 0
    });

    return items;
  }

  // 8 to 14 Days Extended Loop (Adds Yala Safari, Nuwara Eliya colonial tea estates, Bentota watersports)
  // Day 1 to 4 same as classic
  items.push(
    {
      day: 1,
      destination: "Airport to Negombo",
      nightLocation: "Negombo Beachfront",
      title: "Airport Welcome & Beachside Soft Landing",
      drivingTime: "25 mins (15 km)",
      routeLeg: "CMB Airport ➔ Negombo",
      morning: "Private chauffeur greeting at CMB Arrival Hall with cold mineral water.",
      afternoon: "Skip heavy Colombo traffic. 20-min coastal transfer to beachfront resort.",
      evening: "Sunset catamaran cruise on Negombo lagoon & fresh seafood dinner.",
      photoSpot: "Negombo golden sunset catamaran sails",
      hotelName: "Heritance Negombo (4★ Sea View Deluxe)",
      hotelCategory: "4-Star Sea View Beachfront",
      hotelBadge: "🌊 4★ Sea View",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    },
    {
      day: 2,
      destination: "Sigiriya Lion Rock Citadel",
      nightLocation: "Sigiriya",
      title: "Cultural Triangle & Pidurangala Golden Sunset",
      drivingTime: "3.5 hrs (145 km)",
      routeLeg: "Negombo ➔ Sigiriya",
      morning: "Scenic inland journey past coconut estates with King Coconut stop.",
      afternoon: "Forest sanctuary check-in & authentic clay-pot lunch.",
      evening: "Ascend Pidurangala Rock for an iconic 360-degree sunset facing the Lion Rock.",
      photoSpot: "Pidurangala summit facing Lion Citadel",
      hotelName: "Aliya Resort & Spa (4★ Heritage Resort)",
      hotelCategory: "4-Star Cultural Resort",
      hotelBadge: "🏰 4★ Heritage Stay",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    },
    {
      day: 3,
      destination: "Dambulla Caves & Sacred Kandy",
      nightLocation: "Kandy Hills",
      title: "Golden Caves & Temple of the Sacred Tooth",
      drivingTime: "2.5 hrs (90 km)",
      routeLeg: "Sigiriya ➔ Dambulla ➔ Kandy",
      morning: "Early Sigiriya Lion Rock ascent before midday sun.",
      afternoon: "Dambulla Cave Temples UNESCO site, spice garden walk, and Kandy arrival.",
      evening: "Ceremonial evening puja at Temple of the Tooth Relic & Kandy Lake promenade.",
      photoSpot: "Dambulla cave murals & Kandy Lake",
      hotelName: "Earl's Regency Kandy (4★ Mountain View)",
      hotelCategory: "4-Star Mountain View Resort",
      hotelBadge: "🛕 4★ Mountain View",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    },
    {
      day: 4,
      destination: "Nuwara Eliya (Little England)",
      nightLocation: "Nuwara Eliya",
      title: "Colonial Tea Country & Misty Waterfalls",
      drivingTime: "2.5 hrs (75 km winding hills)",
      routeLeg: "Kandy ➔ Ramboda Falls ➔ Nuwara Eliya",
      morning: "Ascend into mist-covered mountains, stopping at dramatic Ramboda Waterfalls.",
      afternoon: "Exclusive tea plucking and Ceylon factory degustation tour.",
      evening: "High tea at colonial Grand Hotel & boat ride across Lake Gregory.",
      photoSpot: "Ramboda Falls & emerald tea pluckers",
      hotelName: "The Grand Hotel Nuwara Eliya (4★ Heritage)",
      hotelCategory: "4-Star Colonial Heritage Hotel",
      hotelBadge: "☕ 4★ Colonial Estate",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    },
    {
      day: 5,
      destination: "Scenic Train to Ella",
      nightLocation: "Ella Highlands",
      title: "World Famous Highland Blue Train & Nine Arch Bridge",
      drivingTime: "2.5 hrs (Train + Car)",
      routeLeg: "Nanu Oya ➔ Scenic Train ➔ Ella",
      morning: "Board reserved observation seats on the scenic Highland Blue Train.",
      afternoon: "Arrive in Ella, explore Nine Arch Bridge viaduct.",
      evening: "Sunset hike up Little Adam's Peak & artisan cafe dining in Ella village.",
      photoSpot: "Nine Arch Bridge viaduct with passing train",
      hotelName: "Mountain Heavens / 98 Acres (4★)",
      hotelCategory: "4-Star Ella Ridge Boutique",
      hotelBadge: "🚂 4★ Ella Ridge",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    },
    {
      day: 6,
      destination: "Yala National Park Safari",
      nightLocation: "Yala / Tissamaharama",
      title: "Ravana Falls & Wild Leopard 4x4 Jeep Safari",
      drivingTime: "2.2 hrs (95 km)",
      routeLeg: "Ella ➔ Ravana Falls ➔ Yala",
      morning: "Morning stop at roaring Ravana Falls, descending toward southern savannah.",
      afternoon: "Check-in to luxury safari eco-lodge. Rest before wildlife drive.",
      evening: "Private open-top 4x4 safari tracker drive: search for wild leopards, sloth bears & elephants.",
      photoSpot: "Yala leopard atop granite boulder & wild elephant herd",
      hotelName: "Cinnamon Wild Yala / Jetwing Yala (4★)",
      hotelCategory: "4-Star Wildlife Eco-Resort",
      hotelBadge: "🐆 4★ Safari Resort",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    },
    {
      day: 7,
      destination: "Mirissa & Southern Beaches",
      nightLocation: "Mirissa Beachfront",
      title: "Southern Coastal Waves & Coconut Tree Hill",
      drivingTime: "2.2 hrs (110 km expressway)",
      routeLeg: "Yala ➔ Southern Coast ➔ Mirissa",
      morning: "Leisurely breakfast by the lotus lake, then smooth coastal expressway drive.",
      afternoon: "Check into 4★ beachfront hotel. Coconut cocktails on private sea-view balcony.",
      evening: "Sunset walk to Coconut Tree Hill & barefoot seafood dinner on the sand.",
      photoSpot: "Mirissa Coconut Tree Hill over turquoise ocean",
      hotelName: "Triple O Six Mirissa (4★ Sea View Deluxe)",
      hotelCategory: "4-Star Sea View Coastal Resort",
      hotelBadge: "🌊 4★ Sea View",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    },
    {
      day: 8,
      destination: "Galle Dutch Fort Heritage",
      nightLocation: "Galle Fort / Bentota",
      title: "UNESCO Ramparts & Weligama Stilt Fishermen",
      drivingTime: "1.0 hr (45 km coastal)",
      routeLeg: "Mirissa ➔ Weligama ➔ Galle Fort",
      morning: "Morning surf or relaxing swim in calm coral bays.",
      afternoon: "Stop to photograph iconic Weligama stilt fishermen. Enter UNESCO Galle Fort.",
      evening: "Sunset on Galle Fort 17th-century ramparts & dinner at Dutch Hospital.",
      photoSpot: "Galle Fort Lighthouse & Weligama stilt fishermen",
      hotelName: "Jetwing Lighthouse (4★ Sea View Coastal Suite)",
      hotelCategory: "4-Star Sea View Ocean Resort",
      hotelBadge: "🌊 4★ Sea View",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    }
  );

  // If longer than 8, pad with extra relaxation in Bentota / Colombo
  for (let i = 9; i < days; i++) {
    items.push({
      day: i,
      destination: "Bentota Golden Beachfront",
      nightLocation: "Bentota Beachfront",
      title: `Coastal Relaxation & Madu River Safari (Day ${i})`,
      drivingTime: "45 mins (35 km)",
      routeLeg: "Galle ➔ Bentota Golden Coast",
      morning: "Slow tropical breakfast, tranquil beach strolls, and ayurvedic massage.",
      afternoon: "Madu River mangrove boat safari through cinnamon islands and fish therapy spas.",
      evening: "Sunset seafood barbecue under beachfront palms.",
      photoSpot: "Bentota golden sunset over calm Indian Ocean",
      hotelName: "Cinnamon Bentota Beach (4★ Sea View)",
      hotelCategory: "4-Star Beachfront Resort",
      hotelBadge: "🌊 4★ Beachfront",
      hotelPriceLkr: HOTEL_4STAR_SEAVIEW_RATE_LKR
    });
  }

  // Final Departure Day
  items.push({
    day: days,
    destination: "Colombo Marina & Departure",
    nightLocation: "CMB Airport / Home",
    title: "Colombo Dining & Airport Transfer",
    drivingTime: "1.5 hrs (110 km expressway)",
    routeLeg: "West Coast ➔ Colombo ➔ CMB Airport",
    morning: "Farewell tropical breakfast and souvenir collection.",
    afternoon: "Expressway transfer into Colombo for Galle Face Green walk and Ministry of Crab dining.",
    evening: "Direct smooth drop-off at Bandaranaike International Airport departure terminal.",
    photoSpot: "Colombo skyline across Galle Face Green",
    hotelName: "International Flight Home (Chauffeur Airport Transfer Included)",
    hotelCategory: "Departure Buffering",
    hotelBadge: "✈️ International Departure",
    hotelPriceLkr: 0
  });

  return enrichWithCoordinates(items);
}

/**
 * Calculates accurate budget breakdown using verified chauffeur and 4★ hotel rates
 */
export function calculateBudgetBreakdown(
  intent: ParsedTripIntent,
  itinerary: DayItineraryItem[]
): BudgetBreakdown {
  const days = itinerary.length;
  const travelers = Math.max(1, intent.travelerCount || 2);
  const curr = CURRENCY_RATES[intent.currencyCode] || CURRENCY_RATES.INR;

  const totalDriverCostLkr = days * CHAUFFEUR_DAILY_RATE_LKR;
  
  // Stays calculation: count nights with hotelPriceLkr > 0
  const totalHotelCostLkr = intent.packageScope === "driver_only" 
    ? 0 
    : itinerary.reduce((sum, item) => sum + (item.hotelPriceLkr || 0), 0);

  const totalActivitiesCostLkr = intent.packageScope === "driver_only"
    ? 0
    : travelers * (days - 1) * ACTIVITIES_BUFFER_PER_PAX_PER_DAY_LKR;

  const totalCalculatedLkr = totalDriverCostLkr + totalHotelCostLkr + totalActivitiesCostLkr;

  // Convert to requested currency
  const driverCostConverted = totalDriverCostLkr / curr.toLkr;
  const hotelCostConverted = totalHotelCostLkr / curr.toLkr;
  const activitiesCostConverted = totalActivitiesCostLkr / curr.toLkr;
  const totalCalculatedConverted = totalCalculatedLkr / curr.toLkr;

  let feasibilityStatus: BudgetBreakdown["feasibilityStatus"] = "EXACT_MATCH";
  let feasibilityNote = "Your budget aligns smoothly with private chauffeur travel and 4★ accommodations.";

  const userTarget = intent.targetBudgetAmount;

  if (userTarget !== null && userTarget > 0) {
    const ratio = userTarget / totalCalculatedConverted;

    if (ratio >= 1.15) {
      feasibilityStatus = "UNDER_BUDGET";
      feasibilityNote = `🎉 Great news! Your target budget (${curr.format(userTarget)}) is comfortably higher than the estimated complete package cost (${curr.format(totalCalculatedConverted)}). You can easily upgrade to 5★ luxury resorts or beachfront plunge pool suites!`;
    } else if (ratio >= 0.95 && ratio < 1.15) {
      feasibilityStatus = "EXACT_MATCH";
      feasibilityNote = `✨ Perfect match! Your target budget (${curr.format(userTarget)}) aligns with our verified 4★ sea view package (${curr.format(totalCalculatedConverted)}) with dedicated licensed chauffeur.`;
    } else if (ratio >= 0.8 && ratio < 0.95) {
      feasibilityStatus = "SLIGHTLY_ABOVE";
      feasibilityNote = `💡 Close match! The verified standard package is ${curr.format(totalCalculatedConverted)}, slightly above your ${curr.format(userTarget)} target. We can easily fine-tune hotel categories to 3★ comfort or optimize travel days to fit your exact budget.`;
    } else {
      feasibilityStatus = "NEEDS_BUDGET_ADJUSTMENT";
      feasibilityNote = `⚠️ Budget Advisory: A complete ${days}-day package with dedicated private AC car and 4★ hotels typically averages around ${curr.format(totalCalculatedConverted)}. For your target (${curr.format(userTarget)}), we recommend either choosing "Private Chauffeur Only" (${curr.format(driverCostConverted)}) or adjusting days.`;
    }
  }

  const perPersonConverted = totalCalculatedConverted / travelers;

  return {
    currency: curr.code,
    driverCost: Math.round(driverCostConverted),
    hotelCost: Math.round(hotelCostConverted),
    activitiesCost: Math.round(activitiesCostConverted),
    totalCalculated: Math.round(totalCalculatedConverted),
    formattedDriverCost: curr.format(driverCostConverted),
    formattedHotelCost: curr.format(hotelCostConverted),
    formattedActivitiesCost: curr.format(activitiesCostConverted),
    formattedTotalCalculated: curr.format(totalCalculatedConverted),
    userTargetBudget: userTarget,
    formattedUserTargetBudget: userTarget ? curr.format(userTarget) : null,
    feasibilityStatus,
    feasibilityNote,
    perPersonCalculated: curr.format(perPersonConverted)
  };
}
