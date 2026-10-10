import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Calendar,
  Users,
  Wallet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Check,
  Building,
  Car,
  Clock,
  MapPin,
  Utensils,
  ChevronRight,
  Info,
  Plane
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface SevenDayFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HotelOption {
  id: string;
  name: string;
  rating: string;
  pricePerNightLkr: number;
  highlight: string;
  image: string;
}

export interface DayPlan {
  day: number;
  destination: string;
  nightLocation: string;
  title: string;
  activities: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  drivingTime: string;
  photoSpot: string;
  hotelOptions: HotelOption[];
}

export const SEVEN_DAY_ITINERARY_DATA: DayPlan[] = [
  {
    day: 1,
    destination: "Negombo Lagoon & Beach",
    nightLocation: "Negombo",
    title: "Airport Arrival & Soft Beach Landing",
    drivingTime: "20 mins (12 km)",
    photoSpot: "Negombo sunset catamaran sails & golden lagoon",
    activities: {
      morning: "Bandaranaike International Airport (CMB) arrival, quick local SIM & currency setup at arrival hall.",
      afternoon: "Skip heavy Colombo highway traffic. Relaxing 20-min coastal transfer to Negombo beachfront resort.",
      evening: "Sunset catamaran cruise on Negombo lagoon, followed by fresh ginger mud crab seafood dinner."
    },
    hotelOptions: [
      {
        id: "negombo-comfort-1",
        name: "Heritance Negombo (4★ Sea View Deluxe)",
        rating: "4.8 ★ 4-Star Sea View Beachfront",
        pricePerNightLkr: 20000,
        highlight: "Direct golden beach access, sunset ocean deck, sea-view balcony & infinity pool",
        image: "/serene-beaches-sri-lanka.png"
      },
      {
        id: "negombo-comfort-2",
        name: "Jetwing Blue Negombo (4★ Ocean Club)",
        rating: "4.7 ★ 4-Star Coastal Comfort",
        pricePerNightLkr: 20000,
        highlight: "Spacious sea-facing family suites, beachfront dining, central Negombo strip",
        image: "/luxury-boutique-resort-sri-lanka.jpg"
      }
    ]
  },
  {
    day: 2,
    destination: "Sigiriya & Pidurangala",
    nightLocation: "Sigiriya",
    title: "Cultural Triangle & Pidurangala Golden Sunset",
    drivingTime: "3.5 hrs (145 km)",
    photoSpot: "Pidurangala granite summit overlooking Lion Rock at dusk",
    activities: {
      morning: "Scenic inland drive past lush coconut groves with a fresh King Coconut (Thambili) stop.",
      afternoon: "Check-in to Sigiriya forest sanctuary. Authentic clay-pot village lunch & rest before climb.",
      evening: "Ascend Pidurangala Rock for an iconic 360-degree sunset facing the ancient Sigiriya Lion Rock citadel."
    },
    hotelOptions: [
      {
        id: "sigiriya-comfort-1",
        name: "Aliya Resort & Spa Sigiriya",
        rating: "4.8 ★ Heritage Resort",
        pricePerNightLkr: 20000,
        highlight: "Stunning infinity pool facing Lion Rock, elephant-themed architecture, luxury spa",
        image: "/Sigiriya-Lion-Rock-Citadel.jpeg"
      },
      {
        id: "sigiriya-comfort-2",
        name: "Sigiriya Village Resort",
        rating: "4.7 ★ Nature Cottages",
        pricePerNightLkr: 20000,
        highlight: "Peaceful forest chalets, peacocks on lawns, minutes from the main citadel entrance",
        image: "/wildlife-safari-sri-lanka.jpg"
      }
    ]
  },
  {
    day: 3,
    destination: "Sigiriya Citadel & Kandy",
    nightLocation: "Kandy",
    title: "Lion Rock Fortress, Dambulla Caves & Sacred Kandy",
    drivingTime: "2.5 hrs (90 km)",
    photoSpot: "Sigiriya Lion Paws stairs & Kandy Lake evening reflections",
    activities: {
      morning: "Early 7:00 AM entrance to Sigiriya Lion Rock Citadel to beat crowds and midday tropical heat.",
      afternoon: "Explore UNESCO Dambulla Golden Cave Temples and visit an organic Matale spice garden.",
      evening: "Sacred Temple of the Tooth Relic evening ceremony (Thevava) with rhythmic traditional drums."
    },
    hotelOptions: [
      {
        id: "kandy-comfort-1",
        name: "Earl's Regency Kandy",
        rating: "4.8 ★ Hillside Luxury",
        pricePerNightLkr: 20000,
        highlight: "Elevated mountain views, riverbank breeze, five-star hospitality & gourmet buffet",
        image: "/hill-country-tea-nuwara-eliya.webp"
      },
      {
        id: "kandy-comfort-2",
        name: "The Grand Kandyan",
        rating: "4.7 ★ City View Premium",
        pricePerNightLkr: 20000,
        highlight: "Rooftop panoramic pool, 10 mins to Temple of the Tooth, royal Kandyan suites",
        image: "/luxury-boutique-resort-sri-lanka.jpg"
      }
    ]
  },
  {
    day: 4,
    destination: "Misty Highlands to Ella",
    nightLocation: "Ella",
    title: "World-Famous Blue Train & Highland Tea Trails",
    drivingTime: "3.5 hrs train (luggage by private car)",
    photoSpot: "Hanging from open scenic train door with misty tea terraces",
    activities: {
      morning: "Board the iconic Sri Lankan blue train through emerald tea carpet hills and eucalyptus forests.",
      afternoon: "Chauffeur meets you at Ella Station with your luggage. Relax over Ceylon tea & lunch with valley views.",
      evening: "Cafe Chill Ella for wood-fired artisan pizza, signature cocktails, and vibrant mountain music vibes."
    },
    hotelOptions: [
      {
        id: "ella-comfort-1",
        name: "Ella Mountain Heavens",
        rating: "4.8 ★ Valley View Suites",
        pricePerNightLkr: 20000,
        highlight: "Direct balcony views of Ella Rock & Ella Gap, edge-of-valley infinity pool",
        image: "/hill-country-tea-nuwara-eliya.webp"
      },
      {
        id: "ella-comfort-2",
        name: "Zion View Ella Green Retreat",
        rating: "4.7 ★ Boutique Mountain Spa",
        pricePerNightLkr: 20000,
        highlight: "Surrounded by lush cloud mist, panoramic dining deck, cozy timber rooms",
        image: "/adventure-nature-hiking-sri-lanka.jpg"
      }
    ]
  },
  {
    day: 5,
    destination: "Nine Arch Bridge & Yala Safari",
    nightLocation: "Yala",
    title: "Nine Arch Bridge Sunrise & Leopard Safari",
    drivingTime: "2.0 hrs (100 km)",
    photoSpot: "Blue train crossing Nine Arch Bridge & wild leopards on sun-baked rocks",
    activities: {
      morning: "6:30 AM sunrise stroll to Nine Arch Bridge to witness the morning train chugging across high stone arches.",
      afternoon: "Scenic descent to Southern savannah. Scenic stop at Ravana Falls for cascading photo opportunities.",
      evening: "Private 4x4 Jeep Safari inside Yala National Park tracking leopards, sloth bears & wild elephant herds."
    },
    hotelOptions: [
      {
        id: "yala-comfort-1",
        name: "Jetwing Yala Wilderness",
        rating: "4.8 ★ Wildlife & Ocean Resort",
        pricePerNightLkr: 20000,
        highlight: "Bordering Yala Park & Indian Ocean, dunes, eco-luxury chalets & wildlife sounds",
        image: "/wildlife-safari-sri-lanka.jpg"
      },
      {
        id: "yala-comfort-2",
        name: "Kithala Lodge Yala",
        rating: "4.7 ★ Savannah Boutique",
        pricePerNightLkr: 20000,
        highlight: "Overlooking lotus lake and paddy fields, peaceful safari base, open-air dining",
        image: "/family-trip-to-sri-lanka.webp"
      }
    ]
  },
  {
    day: 6,
    destination: "Yala to Galle Dutch Fort",
    nightLocation: "Galle Fort",
    title: "Southern Coastal Drive & UNESCO Galle Dutch Fort",
    drivingTime: "2.5 hrs (150 km)",
    photoSpot: "Weligama stilt fishermen & Galle Fort Lighthouse at dusk",
    activities: {
      morning: "Leisurely coastal drive along the sparkling turquoise southern bays.",
      afternoon: "Stop at Weligama to witness iconic stilt fishermen and savor a fresh garlic butter lobster beach lunch.",
      evening: "Sunset stroll on UNESCO Galle Fort historic ramparts, artisan gelato & boutique shopping."
    },
    hotelOptions: [
      {
        id: "galle-comfort-1",
        name: "Jetwing Lighthouse (4★ Sea View Coastal Suite)",
        rating: "4.9 ★ 4-Star Sea View Beachfront",
        pricePerNightLkr: 20000,
        highlight: "Direct Indian Ocean panoramic sea views, rock pool, coastal sunset veranda designed by Geoffrey Bawa",
        image: "/serene-beaches-sri-lanka.png"
      },
      {
        id: "galle-comfort-2",
        name: "Fort Bazaar Boutique Hotel",
        rating: "4.8 ★ Colonial Fort Luxury",
        pricePerNightLkr: 20000,
        highlight: "Inside Galle Fort 17th-century merchant villa, courtyard dining, walk to UNESCO ramparts",
        image: "/luxury-boutique-resort-sri-lanka.jpg"
      }
    ]
  },
  {
    day: 7,
    destination: "Galle to Colombo & Airport Departure",
    nightLocation: "CMB Airport / Home",
    title: "Galle Fort Heritage, Colombo Dining & Departure",
    drivingTime: "2.0 hrs (125 km expressway)",
    photoSpot: "Colombo skyline from Galle Face Green & Dutch Hospital promenade",
    activities: {
      morning: "Morning coffee & artisan shopping inside cobblestone alleys of Galle Fort.",
      afternoon: "Smooth Southern Expressway drive to Colombo. Lunch at the world-renowned Ministry of Crab.",
      evening: "Sunset on Galle Face Green, Ceylon souvenir collection (Laksala/ODEL), and CMB airport transfer."
    },
    hotelOptions: [
      {
        id: "departure-comfort-1",
        name: "Standard Onward Flight (No Hotel Needed)",
        rating: "✈️ Same-Day International Flight",
        pricePerNightLkr: 0,
        highlight: "Direct evening drop-off at Bandaranaike International Airport (CMB) with 3hr buffer",
        image: "/serene-beaches-sri-lanka.png"
      },
      {
        id: "departure-comfort-2",
        name: "Colombo Airport Gateway Transit Stay",
        rating: "4.7 ★ Airport Transit Stay",
        pricePerNightLkr: 20000,
        highlight: "For next-morning flight travelers: comfortable day-room & free 5-min airport shuttle",
        image: "/luxury-boutique-resort-sri-lanka.jpg"
      }
    ]
  }
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function SevenDayFunnelModal({ isOpen, onClose }: SevenDayFunnelModalProps) {
  // Funnel Step: 1 | 2 | 3 | 4 | "success"
  const [step, setStep] = useState<1 | 2 | 3 | 4 | "success">(1);

  // Step 1: Budget & Overview State
  const [days] = useState<number>(7);
  const [selectedMonth, setSelectedMonth] = useState<string>("October");
  const [groupType, setGroupType] = useState<"Solo" | "Couple" | "Family / Friends">("Couple");
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [currency, setCurrency] = useState<"LKR" | "INR" | "USD">("LKR");
  const [packageScope, setPackageScope] = useState<"complete_package" | "driver_only">("complete_package");

  // Step 3: Selected Hotels for each night (default to first option of each day)
  const [selectedHotels, setSelectedHotels] = useState<{ [dayNumber: number]: string }>({
    1: "negombo-comfort-1",
    2: "sigiriya-comfort-1",
    3: "kandy-comfort-1",
    4: "ella-comfort-1",
    5: "yala-comfort-1",
    6: "galle-comfort-1",
    7: "departure-comfort-1"
  });

  // Step 4: Contact form state & Flight assistance
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [needFlightQuote, setNeedFlightQuote] = useState<boolean>(false);
  const [departureCity, setDepartureCity] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Computed total travelers
  const travelerCount = groupType === "Solo" ? 1 : groupType === "Couple" ? 2 : adultCount + childCount;

  // Driver price breakdown for 7 days
  const privateDriverCostLkr = 75000; // Dedicated English speaking licensed chauffeur for 7 days
  const hotelRatePerNightLkr = 20000;
  const hotelNightsCount = selectedHotels[7] === "departure-comfort-1" ? 6 : 7;
  const totalHotelCostLkr = packageScope === "driver_only" ? 0 : hotelNightsCount * hotelRatePerNightLkr;
  const estimatedActivitiesLkr = packageScope === "driver_only" ? 0 : travelerCount * 28000; // Sigiriya, Tooth Temple, Yala jeep entry, train tickets
  const totalBudgetLkr = privateDriverCostLkr + totalHotelCostLkr + estimatedActivitiesLkr;

  // Convert for display if needed
  const formatCost = (lkrAmount: number) => {
    if (currency === "USD") {
      const usd = Math.round(lkrAmount / 300);
      return `$${usd.toLocaleString()}`;
    }
    if (currency === "INR") {
      const inr = Math.round(lkrAmount / 3.6);
      return `₹${inr.toLocaleString()}`;
    }
    return `LKR ${lkrAmount.toLocaleString()}`;
  };

  const handleGroupTypeChange = (type: "Solo" | "Couple" | "Family / Friends") => {
    setGroupType(type);
    if (type === "Solo") {
      setAdultCount(1);
      setChildCount(0);
    } else if (type === "Couple") {
      setAdultCount(2);
      setChildCount(0);
    } else {
      setAdultCount(2);
      setChildCount(1);
    }
  };

  const handleSelectHotel = (dayNum: number, hotelId: string) => {
    setSelectedHotels(prev => ({ ...prev, [dayNum]: hotelId }));
  };

  // WhatsApp Final Submission
  const handleFinalCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      setFormError("Please provide your name and WhatsApp number.");
      return;
    }

    setIsSubmitting(true);
    trackEvent("seven_day_funnel_confirmed", "conversion", "7_day_itinerary_funnel");

    // Build Hotel Summary for WhatsApp
    const hotelSummaryLines = packageScope === "driver_only"
      ? "• None (Traveler booking accommodation independently - Chauffeur Only)"
      : SEVEN_DAY_ITINERARY_DATA.map(day => {
          const chosenId = selectedHotels[day.day];
          const hotel = day.hotelOptions.find(h => h.id === chosenId);
          return `• Day ${day.day} (${day.nightLocation}): ${hotel ? hotel.name : "Standard Stays"}`;
        }).join("\n");

    const flightSummary = needFlightQuote
      ? `Yes, please quote flights from ${departureCity.trim() || "my departure city"}`
      : "Not needed (Booking flights independently)";

    const message = `🌟 *New 7-Day Sri Lanka Booking Request!* 🌟
-----------------------------------------
👤 *Traveler:* ${fullName}
📱 *WhatsApp:* ${whatsapp}
📧 *Email:* ${email || "Not provided"}

🗓️ *Trip Details:*
• Duration: ${days} Days
• Travel Month: ${selectedMonth}
• Group Size: ${groupType} (${travelerCount} Pax ${groupType === "Family / Friends" ? `- ${adultCount} Adults, ${childCount} Children` : ""})
• Package Scope: ${packageScope === "complete_package" ? "Complete Land Package (Driver + 4★ Stays & Breakfast)" : "Private Chauffeur Only (Transport Only)"}
• Flight Assistance: ${flightSummary}

🏨 *Accommodation Plan:*
${hotelSummaryLines}

🚗 *Included Private Driver Service:*
• Dedicated English-speaking Tourist Chauffeur
• Air-conditioned vehicle, fuel, highway expressway tolls & driver accommodation included.

💰 *Estimated Budget Breakdown (${currency}):*
• Driver & Vehicle: ${formatCost(privateDriverCostLkr)}
${packageScope === "complete_package" ? `• 4★ Hotels & Stays: ${formatCost(totalHotelCostLkr)}\n• Key Activities: ${formatCost(estimatedActivitiesLkr)}\n` : ""}• Total Estimated: ${formatCost(totalBudgetLkr)}

📝 *Notes/Special Wishes:* ${specialRequests || "None"}

Please confirm hotel availability and finalize our 7-day Sri Lanka booking!`;

    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
      const url = `https://wa.me/94722968210?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
        
        {/* Backdrop dismiss */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] text-[#0F1412] rounded-3xl shadow-2xl border border-[#C5A059]/20 overflow-hidden my-auto z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 md:p-6 bg-[#1A2F23] text-white flex items-center justify-between border-b border-[#C5A059]/30">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  Bespoke 7-Day Route Concierge
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
                Sri Lanka 7-Day Itinerary & Stay Planner
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Funnel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar (4 Steps) */}
          <div className="bg-[#FAF8F5] border-b border-[#0F1412]/10 px-6 py-3">
            <div className="flex items-center justify-between max-w-3xl mx-auto text-xs font-mono font-bold">
              {[
                { num: 1, label: "1. Budget & Overview" },
                { num: 2, label: "2. Full Itinerary" },
                { num: 3, label: "3. Choose Stays" },
                { num: 4, label: "4. Summary & Booking" }
              ].map((s) => {
                const isActive = step === s.num;
                const isPast = typeof step === "number" && step > s.num;
                return (
                  <div key={s.num} className="flex items-center gap-1.5 md:gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#C5A059] text-white shadow-md scale-110"
                          : isPast
                          ? "bg-[#1A2F23] text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isPast ? "✓" : s.num}
                    </span>
                    <span
                      className={`hidden sm:inline transition-colors ${
                        isActive ? "text-[#1A2F23] font-bold" : isPast ? "text-[#1A2F23]" : "text-gray-400 font-normal"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Body Container (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6">

            {/* ============================================================== */}
            {/* STEP 1: Budget & Overview Page (මුල් පිටුව)                      */}
            {/* ============================================================== */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold font-mono">
                    Step 1 of 4: Trip Parameters & Live Cost Engine
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1A2F23]">
                    Configure Your 7-Day Travel Overview
                  </h3>
                  <p className="text-xs md:text-sm text-[#0F1412]/70 max-w-xl mx-auto">
                    Select your travel month and group size. We calculate your estimated driver, curated stays, and tour costs instantly.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 bg-white p-5 md:p-7 rounded-3xl border border-[#0F1412]/5 shadow-md">
                  
                  {/* Left Column: Form Controls */}
                  <div className="space-y-5">
                    {/* Month Picker */}
                    <div>
                      <label className="text-xs uppercase font-mono font-bold tracking-wider text-[#0F1412]/60 block mb-2 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#C5A059]" /> Select Expected Travel Month:
                      </label>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full p-3.5 bg-[#FAF8F5] border border-[#0F1412]/15 rounded-2xl text-xs md:text-sm font-medium focus:outline-none focus:border-[#C5A059]"
                      >
                        {MONTHS.map(m => (
                          <option key={m} value={m}>{m} 2026 / 2027</option>
                        ))}
                      </select>
                    </div>

                    {/* Group Size Selector */}
                    <div>
                      <label className="text-xs uppercase font-mono font-bold tracking-wider text-[#0F1412]/60 block mb-2 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#C5A059]" /> Group Composition:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["Solo", "Couple", "Family / Friends"] as const).map(grp => (
                          <button
                            key={grp}
                            type="button"
                            onClick={() => handleGroupTypeChange(grp)}
                            className={`p-3 rounded-2xl text-xs font-bold transition-all border text-center cursor-pointer ${
                              groupType === grp
                                ? "bg-[#1A2F23] text-white border-[#1A2F23] shadow-sm"
                                : "bg-[#FAF8F5] text-[#0F1412]/80 border-[#0F1412]/10 hover:border-[#C5A059]/40"
                            }`}
                          >
                            {grp === "Solo" ? "🎒 Solo" : grp === "Couple" ? "💑 Couple" : "👨‍👩‍👧‍👦 Family"}
                          </button>
                        ))}
                      </div>

                      {/* Detailed Family Stepper */}
                      {groupType === "Family / Friends" && (
                        <div className="mt-3 p-4 bg-[#FAF8F5] rounded-2xl border border-[#C5A059]/20 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-[#1A2F23]">Adults (12+ yrs):</span>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                                className="w-7 h-7 bg-white rounded-full border border-gray-300 flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span className="w-5 text-center font-mono font-bold">{adultCount}</span>
                              <button
                                type="button"
                                onClick={() => setAdultCount(adultCount + 1)}
                                className="w-7 h-7 bg-[#1A2F23] text-white rounded-full flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-[#1A2F23]">Children (0-11 yrs):</span>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setChildCount(Math.max(0, childCount - 1))}
                                className="w-7 h-7 bg-white rounded-full border border-gray-300 flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span className="w-5 text-center font-mono font-bold">{childCount}</span>
                              <button
                                type="button"
                                onClick={() => setChildCount(childCount + 1)}
                                className="w-7 h-7 bg-[#1A2F23] text-white rounded-full flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Package Scope Selector */}
                    <div>
                      <label className="text-xs uppercase font-mono font-bold tracking-wider text-[#0F1412]/60 block mb-2 flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-[#C5A059]" /> Package Scope:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPackageScope("complete_package")}
                          className={`p-3 rounded-2xl text-left border cursor-pointer transition-all ${
                            packageScope === "complete_package"
                              ? "bg-[#1A2F23] text-white border-[#1A2F23] shadow-sm"
                              : "bg-[#FAF8F5] text-[#0F1412]/80 border-[#0F1412]/10 hover:border-[#C5A059]/40"
                          }`}
                        >
                          <div className="font-bold text-xs flex items-center justify-between">
                            <span>🏨 Driver + 4★ Stays</span>
                            {packageScope === "complete_package" && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                          </div>
                          <p className={`text-[11px] mt-1 ${packageScope === "complete_package" ? "text-white/70" : "text-[#0F1412]/60"}`}>
                            Complete land package with daily breakfast & 4★ sea view stays.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPackageScope("driver_only")}
                          className={`p-3 rounded-2xl text-left border cursor-pointer transition-all ${
                            packageScope === "driver_only"
                              ? "bg-[#1A2F23] text-white border-[#1A2F23] shadow-sm"
                              : "bg-[#FAF8F5] text-[#0F1412]/80 border-[#0F1412]/10 hover:border-[#C5A059]/40"
                          }`}
                        >
                          <div className="font-bold text-xs flex items-center justify-between">
                            <span>🚗 Driver Only</span>
                            {packageScope === "driver_only" && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                          </div>
                          <p className={`text-[11px] mt-1 ${packageScope === "driver_only" ? "text-white/70" : "text-[#0F1412]/60"}`}>
                            Dedicated vehicle, fuel & tolls. You book hotels separately.
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Currency selector chips */}
                    <div>
                      <label className="text-xs uppercase font-mono font-bold tracking-wider text-[#0F1412]/60 block mb-2 flex items-center gap-1.5">
                        <Wallet className="w-4 h-4 text-[#C5A059]" /> Preferred Currency Display:
                      </label>
                      <div className="flex gap-2">
                        {(["LKR", "INR", "USD"] as const).map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCurrency(c)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border cursor-pointer transition-all ${
                              currency === c
                                ? "bg-[#C5A059] text-white border-[#C5A059]"
                                : "bg-[#FAF8F5] text-[#0F1412]/70 border-[#0F1412]/10"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Estimated Live Budget Card */}
                  <div className="bg-[#1A2F23] text-white p-6 rounded-2xl flex flex-col justify-between border border-[#C5A059]/30 relative overflow-hidden">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] font-bold">
                          {packageScope === "complete_package" ? "Estimated Land Package Budget" : "Chauffeur & Transport Budget"}
                        </span>
                        <span className="bg-[#C5A059]/20 text-[#C5A059] text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-[#C5A059]/30">
                          {packageScope === "complete_package" ? "7 Days / 6 Nights" : "7 Days Private Car"}
                        </span>
                      </div>

                      <div>
                        <div className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                          {formatCost(totalBudgetLkr)}
                        </div>
                        <p className="text-xs text-white/60 font-light mt-1">
                          Approx. {formatCost(Math.round(totalBudgetLkr / travelerCount))} per person ({travelerCount} Pax)
                        </p>
                      </div>

                      {/* Transparent cost breakdown */}
                      <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                        {packageScope === "complete_package" ? (
                          <>
                            <div className="flex justify-between text-white/80">
                              <span>🏨 4★ Stays ({hotelNightsCount} Nights @ LKR 20k):</span>
                              <span className="font-mono font-bold text-[#C5A059]">{formatCost(totalHotelCostLkr)}</span>
                            </div>
                            <div className="flex justify-between text-white/80">
                              <span>🚗 Private Chauffeur & AC Car (7 Days):</span>
                              <span className="font-mono font-bold text-[#C5A059]">{formatCost(privateDriverCostLkr)}</span>
                            </div>
                            <div className="flex justify-between text-white/80">
                              <span>🎫 Sightseeing & Park Fees (Estimated):</span>
                              <span className="font-mono font-bold text-[#C5A059]">{formatCost(estimatedActivitiesLkr)}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between text-white/80">
                              <span>🚗 Dedicated Chauffeur & AC Vehicle (7 Days):</span>
                              <span className="font-mono font-bold text-[#C5A059]">{formatCost(privateDriverCostLkr)}</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                              <span>🏨 Hotel Accommodation:</span>
                              <span className="font-mono text-white/60">Self-Booked (Not Included)</span>
                            </div>
                            <div className="p-2.5 bg-white/10 rounded-xl text-[11px] text-[#C5A059] leading-relaxed">
                              💡 Private chauffeur covers vehicle, all fuel, expressway tolls & driver accommodation/meals across Sri Lanka.
                            </div>
                          </>
                        )}
                      </div>

                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-white/70 leading-relaxed">
                        ✨ <em>Transparent Pricing:</em> Includes all expressway tolls, parking fees, driver meals and driver accommodation. Zero surprise hidden charges.
                      </div>
                    </div>

                    <div className="pt-5">
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("funnel_step_1_view_itinerary", "engagement", "7_day_funnel");
                          setStep(2);
                        }}
                        className="w-full py-4 bg-[#C5A059] hover:bg-white hover:text-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        View Daily Itinerary <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>

              </motion.div>
            )}

            {/* ============================================================== */}
            {/* STEP 2: Full Itinerary & Activities Page (දෙවන පිටුව)           */}
            {/* ============================================================== */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold font-mono">
                    Step 2 of 4: Day-By-Day Activity & Night Stay Ledger
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1A2F23]">
                    Your Complete 7-Day Day-by-Day Route
                  </h3>
                  <p className="text-xs md:text-sm text-[#0F1412]/70 max-w-xl mx-auto">
                    From Sigiriya Lion Rock and Pidurangala sunset on Day 1-2 to the Dutch Fort in Galle on Day 7. Review every activity and sleep location.
                  </p>
                </div>

                {/* Day cards list */}
                <div className="space-y-4">
                  {SEVEN_DAY_ITINERARY_DATA.map((day) => (
                    <div
                      key={day.day}
                      className="bg-white rounded-2xl p-5 md:p-6 border border-[#0F1412]/10 shadow-sm hover:shadow-md transition-shadow space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#0F1412]/5">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-[#1A2F23] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <div>
                            <h4 className="font-serif font-bold text-base md:text-lg text-[#1A2F23]">
                              {day.title}
                            </h4>
                            <span className="text-xs text-[#C5A059] font-medium flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> Night Sleep: <strong>{day.nightLocation}</strong>
                            </span>
                          </div>
                        </div>

                        <div className="text-xs font-mono text-gray-500 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#0F1412]/5 flex items-center gap-1.5 self-start sm:self-auto">
                          <Clock className="w-3.5 h-3.5 text-[#C5A059]" /> {day.drivingTime}
                        </div>
                      </div>

                      {/* Three-part daily activities */}
                      <div className="grid sm:grid-cols-3 gap-3 text-xs leading-relaxed">
                        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#0F1412]/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059] block">
                            🌅 Morning
                          </span>
                          <p className="text-[#0F1412]/80">{day.activities.morning}</p>
                        </div>

                        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#0F1412]/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059] block">
                            ☀️ Afternoon
                          </span>
                          <p className="text-[#0F1412]/80">{day.activities.afternoon}</p>
                        </div>

                        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#0F1412]/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059] block">
                            🌙 Evening & Stay
                          </span>
                          <p className="text-[#0F1412]/80">{day.activities.evening}</p>
                        </div>
                      </div>

                      {/* Photo spot footnote */}
                      <div className="text-[11px] text-gray-500 flex items-center gap-1.5 pt-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span><strong>Highlight / Photo Spot:</strong> {day.photoSpot}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-[#0F1412]/10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-xl border border-[#0F1412]/20 text-xs font-mono font-bold text-[#0F1412]/70 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    ← Back to Parameters
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("funnel_step_2_choose_hotels", "engagement", "7_day_funnel");
                      setStep(3);
                    }}
                    className="px-7 py-3.5 bg-[#C5A059] hover:bg-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    Choose Your Hotels & Stays <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            )}

            {/* ============================================================== */}
            {/* STEP 3: Stay Hotel Cards Page (තුන්වන පිටුව)                      */}
            {/* ============================================================== */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold font-mono">
                    Step 3 of 4: Handpicked Comfort Stays (LKR 20,000 / Night Standard)
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1A2F23]">
                    Choose Your Preferred Nightly Accommodations
                  </h3>
                  <p className="text-xs md:text-sm text-[#0F1412]/70 max-w-xl mx-auto">
                    Matched to each night&apos;s rest point (Negombo, Sigiriya, Kandy, Ella, Yala, Galle Fort). Click to select your favorite hotel card for each day.
                  </p>
                </div>

                {packageScope === "driver_only" && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <strong className="block text-amber-950 font-bold mb-0.5">🚗 Transport-Only Selection Active:</strong>
                      You have selected "Driver Only" in Step 1. Hotel accommodations are excluded. If you prefer our team to book and manage these 4-Star Sea View stays for you with daily breakfast, switch to the complete package below:
                    </div>
                    <button
                      type="button"
                      onClick={() => setPackageScope("complete_package")}
                      className="px-4 py-2 bg-[#1A2F23] hover:bg-[#C5A059] text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer transition-all"
                    >
                      Include 4★ Stays
                    </button>
                  </div>
                )}

                {/* Night-by-night hotel cards */}
                <div className="space-y-6">
                  {SEVEN_DAY_ITINERARY_DATA.map((day) => {
                    const currentSelectedId = selectedHotels[day.day];

                    return (
                      <div key={day.day} className="bg-white rounded-3xl p-5 md:p-6 border border-[#0F1412]/10 space-y-4 shadow-sm">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#0F1412]/5 gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold bg-[#1A2F23] text-white px-2.5 py-1 rounded-lg">
                              Night {day.day}
                            </span>
                            <h4 className="font-serif font-bold text-base text-[#1A2F23]">
                              Where to Sleep: {day.nightLocation}
                            </h4>
                          </div>
                          <span className="text-xs font-mono text-emerald-700 font-bold">
                            {day.day === 7 ? "Airport Departure / Day-Room" : "Standard: LKR 20,000 / Night"}
                          </span>
                        </div>

                        {/* Hotel Cards Grid for this day */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {day.hotelOptions.map((hotel) => {
                            const isChosen = currentSelectedId === hotel.id;

                            return (
                              <div
                                key={hotel.id}
                                onClick={() => handleSelectHotel(day.day, hotel.id)}
                                className={`rounded-2xl border-2 p-4 transition-all cursor-pointer relative flex flex-col justify-between ${
                                  isChosen
                                    ? "border-[#C5A059] bg-[#FAF8F5] shadow-md scale-[1.01]"
                                    : "border-gray-200 hover:border-[#C5A059]/40 bg-white"
                                }`}
                              >
                                {isChosen && (
                                  <div className="absolute top-3 right-3 bg-[#C5A059] text-white p-1 rounded-full shadow">
                                    <Check className="w-3.5 h-3.5" />
                                  </div>
                                )}

                                <div className="space-y-2">
                                  <div className="h-32 rounded-xl overflow-hidden bg-gray-100">
                                    <img
                                      src={hotel.image}
                                      alt={hotel.name}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="flex items-center justify-between pt-1">
                                    <h5 className="font-serif font-bold text-sm text-[#1A2F23] leading-snug">
                                      {hotel.name}
                                    </h5>
                                  </div>
                                  <span className="text-[11px] font-mono font-bold text-[#C5A059] block">
                                    {hotel.rating}
                                  </span>
                                  <p className="text-xs text-[#0F1412]/70 leading-relaxed font-light">
                                    {hotel.highlight}
                                  </p>
                                </div>

                                <div className="pt-3 mt-3 border-t border-[#0F1412]/5 flex items-center justify-between">
                                  <span className="text-xs font-mono font-bold text-[#1A2F23]">
                                    {hotel.pricePerNightLkr === 0 ? "Included Transit" : `LKR ${hotel.pricePerNightLkr.toLocaleString()} / night`}
                                  </span>
                                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                                    isChosen ? "bg-[#1A2F23] text-white" : "bg-gray-100 text-gray-600"
                                  }`}>
                                    {isChosen ? "Selected Stay ✓" : "Select Stay"}
                                  </span>
                                </div>

                              </div>
                            );
                          })}
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-[#0F1412]/10">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-3 rounded-xl border border-[#0F1412]/20 text-xs font-mono font-bold text-[#0F1412]/70 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    ← Back to Itinerary
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent("funnel_step_3_review_booking", "engagement", "7_day_funnel");
                      setStep(4);
                    }}
                    className="px-7 py-3.5 bg-[#C5A059] hover:bg-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    Review & Confirm Booking <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            )}

            {/* ============================================================== */}
            {/* STEP 4: Final Summary & Checkout Page (අවසන් පිටුව)             */}
            {/* ============================================================== */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold font-mono">
                    Step 4 of 4: Final Summary & Direct WhatsApp Concierge Confirmation
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1A2F23]">
                    Review Your Complete Booking Summary
                  </h3>
                  <p className="text-xs md:text-sm text-[#0F1412]/70 max-w-xl mx-auto">
                    Everything is locked in: selected hotels, private chauffeur driver service, and estimated overall tour budget. Confirm below to lock your booking.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Left Column: Final Detailed Breakdown */}
                  <div className="bg-white p-6 rounded-3xl border border-[#0F1412]/10 space-y-5 shadow-sm">
                    <h4 className="font-serif font-bold text-lg text-[#1A2F23] border-b border-[#0F1412]/10 pb-3 flex items-center justify-between">
                      <span>Booking Summary</span>
                      <span className="text-xs font-mono text-[#C5A059] uppercase font-bold">7-Day Route</span>
                    </h4>

                    {/* Param cards */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#0F1412]/5">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Package Type</span>
                        <strong className="text-[#1A2F23]">
                          {packageScope === "complete_package" ? "Driver + 4★ Stays" : "Driver Only"}
                        </strong>
                      </div>
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#0F1412]/5">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Travelers</span>
                        <strong className="text-[#1A2F23]">{travelerCount} Pax ({groupType})</strong>
                      </div>
                    </div>

                    {/* Stays list or Transport note */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#0F1412]/60 block">
                        {packageScope === "complete_package" ? "Confirmed Night Stays:" : "Accommodation Status:"}
                      </span>
                      {packageScope === "complete_package" ? (
                        <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
                          {SEVEN_DAY_ITINERARY_DATA.map(day => {
                            const hotel = day.hotelOptions.find(h => h.id === selectedHotels[day.day]);
                            return (
                              <div key={day.day} className="flex justify-between items-center p-2 rounded-lg bg-[#FAF8F5] border border-[#0F1412]/5">
                                <span className="font-medium text-[#1A2F23]">
                                  <strong>D{day.day} ({day.nightLocation}):</strong> {hotel?.name}
                                </span>
                                <span className="text-[11px] font-mono text-[#C5A059] font-bold shrink-0">
                                  {hotel?.pricePerNightLkr === 0 ? "Flight" : "LKR 20k"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                          🏨 <strong>Self-Arranged Stays:</strong> You have chosen chauffeur transport only. You are free to book any hotels, homestays, or Airbnbs directly.
                        </div>
                      )}
                    </div>

                    {/* Inclusions */}
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1 text-emerald-950">
                      <strong className="block font-bold text-emerald-800 flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" /> Private Chauffeur & Vehicle Guarantee:
                      </strong>
                      <p className="text-[11px] leading-relaxed text-emerald-900/80">
                        Dedicated English-speaking tour driver for all 7 days. Includes air-conditioned sedan/van, vehicle fuel, highway expressway tolls, and driver accommodation & meals.
                      </p>
                    </div>

                    {/* Total */}
                    <div className="p-4 bg-[#1A2F23] text-white rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#C5A059] block font-bold">
                          {packageScope === "complete_package" ? "Total Estimated Budget" : "Total Driver & Car Budget"}
                        </span>
                        <span className="text-2xl font-serif font-bold text-white">{formatCost(totalBudgetLkr)}</span>
                      </div>
                      <span className="text-xs font-mono text-[#C5A059] bg-[#C5A059]/20 px-3 py-1 rounded-full border border-[#C5A059]/30">
                        {currency} Rate
                      </span>
                    </div>

                  </div>

                  {/* Right Column: Checkout Contact Form */}
                  <div className="bg-white p-6 rounded-3xl border border-[#0F1412]/10 space-y-5 shadow-sm">
                    <div className="border-b border-[#0F1412]/10 pb-3">
                      <h4 className="font-serif font-bold text-lg text-[#1A2F23]">
                        Enter Contact Details
                      </h4>
                      <p className="text-xs text-gray-500 font-light mt-0.5">
                        Our local concierge will review and verify availability within minutes via WhatsApp.
                      </p>
                    </div>

                    <form onSubmit={handleFinalCheckout} className="space-y-4">
                      {formError && (
                        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                          {formError}
                        </div>
                      )}

                      <div className="space-y-1 text-xs">
                        <label className="font-mono uppercase font-bold text-[#0F1412]/60 block">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins / Rajesh Sharma"
                          className="w-full p-3 bg-[#FAF8F5] border border-[#0F1412]/15 rounded-xl text-xs focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="font-mono uppercase font-bold text-[#0F1412]/60 block">WhatsApp Number (with country code) *</label>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="e.g. +91 98765 43210 or +44 7911 123456"
                          className="w-full p-3 bg-[#FAF8F5] border border-[#0F1412]/15 rounded-xl text-xs font-mono focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="font-mono uppercase font-bold text-[#0F1412]/60 block">Email Address (Optional)</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. name@example.com"
                          className="w-full p-3 bg-[#FAF8F5] border border-[#0F1412]/15 rounded-xl text-xs focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      {/* Flight Quote Assistance Toggle */}
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#0F1412]/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-mono font-bold text-[#1A2F23] flex items-center gap-1.5 cursor-pointer">
                            <Plane className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>Include Flight Price Assistance?</span>
                          </label>
                          <input
                            type="checkbox"
                            checked={needFlightQuote}
                            onChange={(e) => setNeedFlightQuote(e.target.checked)}
                            className="w-4 h-4 text-[#C5A059] rounded cursor-pointer"
                          />
                        </div>
                        <p className="text-[10px] text-gray-500">
                          We can suggest best direct flight routes (IndiGo, Air India, SriLankan Airlines) alongside your land package.
                        </p>
                        {needFlightQuote && (
                          <div className="pt-1">
                            <input
                              type="text"
                              value={departureCity}
                              onChange={(e) => setDepartureCity(e.target.value)}
                              placeholder="e.g. Mumbai (BOM), Chennai (MAA), Delhi (DEL), London"
                              className="w-full p-2.5 bg-white border border-[#0F1412]/15 rounded-lg text-xs focus:outline-none focus:border-[#C5A059]"
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="font-mono uppercase font-bold text-[#0F1412]/60 block">Special Wishes or Requests (Optional)</label>
                        <textarea
                          rows={2}
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="e.g. Vegetarian food preferences, infant car seat, specific flight arrival time..."
                          className="w-full p-3 bg-[#FAF8F5] border border-[#0F1412]/15 rounded-xl text-xs focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#C5A059] hover:bg-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                      >
                        {isSubmitting ? "Locking Booking..." : "Confirm & Send to WhatsApp Concierge ➔"}
                      </button>

                      <p className="text-[10px] text-center text-gray-400 font-mono">
                        🔒 100% Free Consultation. No payment required until your chauffeur and hotel rooms are officially confirmed.
                      </p>
                    </form>

                  </div>

                </div>

                {/* Back button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-3 rounded-xl border border-[#0F1412]/20 text-xs font-mono font-bold text-[#0F1412]/70 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    ← Back to Hotel Selection
                  </button>
                </div>

              </motion.div>
            )}

            {/* ============================================================== */}
            {/* SUCCESS STATE                                                  */}
            {/* ============================================================== */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-5 max-w-lg mx-auto"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1A2F23]">
                  Booking Request Dispatched!
                </h3>
                <p className="text-xs md:text-sm text-[#0F1412]/75 leading-relaxed">
                  Your customized 7-day Sri Lanka itinerary and hotel selections have been opened in WhatsApp. Our licensed concierge desk in Colombo will respond with driver details and confirmation voucher shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3.5 bg-[#1A2F23] hover:bg-[#C5A059] text-white font-mono text-xs uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer shadow-lg"
                >
                  Close Window
                </button>
              </motion.div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
