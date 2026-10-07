import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  MapPin,
  Calendar,
  Users,
  Wallet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Loader2,
  ShieldCheck,
  MessageSquare,
  Compass,
  Check,
  Globe
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface InteractiveRouteFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DESTINATIONS_LIST = [
  { id: "Sigiriya", label: "Sigiriya", subtitle: "Ancient Lion Rock & Caves", icon: "🏰" },
  { id: "Kandy", label: "Kandy", subtitle: "Sacred Tooth Temple & Hills", icon: "🛕" },
  { id: "Nuwara Eliya / Ella", label: "Nuwara Eliya / Ella", subtitle: "Highland Blue Train & Tea Valleys", icon: "🚂" },
  { id: "Bentota / Mirissa", label: "Bentota / Mirissa", subtitle: "Golden Beaches & Yala Safaris", icon: "🏖️" },
  { id: "Nilaveli / Trincomalee", label: "Nilaveli / Trincomalee", subtitle: "Pristine East Coast & Snorkeling", icon: "🦩" },
];

const TRIP_VIBES = [
  { 
    id: 'cultural', 
    name: 'Cultural & Heritage', 
    desc: 'Ancient ruins & UNESCO temples', 
    image: '/Sigiriya-Lion-Rock-Citadel.jpeg' 
  },
  { 
    id: 'romantic', 
    name: 'Romantic & Honeymoon', 
    desc: 'Scenic highlands & oceanfront resorts', 
    image: '/romantic-honeymoon-bentota-couple.webp' 
  },
  { 
    id: 'family', 
    name: 'Family & Kids Friendly', 
    desc: 'Safe & relaxed pacing for all ages', 
    image: '/family-trip-to-sri-lanka.webp' 
  },
  { 
    id: 'beach', 
    name: 'Beach & Leisure', 
    desc: 'Sun, surf, sand & coastal relaxation', 
    image: '/serene-beaches-sri-lanka.png' 
  },
  { 
    id: 'wildlife', 
    name: 'Wildlife & Safari', 
    desc: 'Leopards, elephants & national parks', 
    image: '/wildlife-safari-sri-lanka.jpg' 
  },
  { 
    id: 'adventure', 
    name: 'Adventure & Nature', 
    desc: 'Hikes, waterfalls & outdoor thrills', 
    image: '/adventure-nature-hiking-sri-lanka.jpg' 
  },
  { 
    id: 'hill', 
    name: 'Hill Country & Tea Trails', 
    desc: 'Misty mountains & blue trains', 
    image: '/hill-country-tea-nuwara-eliya.webp' 
  },
  { 
    id: 'luxury', 
    name: 'Luxury & Boutique', 
    desc: '5-star villas & private transfers', 
    image: '/luxury-boutique-resort-sri-lanka.jpg' 
  },
  { 
    id: 'budget', 
    name: 'Budget & Backpacker', 
    desc: 'Cozy guesthouses & local train loops', 
    image: '/budget-backpacker-sri-lanka.jpg' 
  },
  { 
    id: 'food', 
    name: 'Food & Culinary', 
    desc: 'Ceylon spices, seafood & street food', 
    image: '/food-culinary-sri-lanka.jpeg' 
  },
  { 
    id: 'wellness', 
    name: 'Wellness & Ayurveda', 
    desc: 'Ayurvedic spas, yoga & retreats', 
    image: '/wellness-ayurveda-sri-lanka.jpg' 
  },
  { 
    id: 'photography', 
    name: 'Photography & Insta Spots', 
    desc: 'Nine Arch Bridge, Pidurangala & views', 
    image: '/photography-insta-spots-sri-lanka.jpg' 
  }
];

const DURATION_OPTIONS = ["5 Days", "7 Days", "10 Days", "Custom ✏️"];

const GROUP_OPTIONS = [
  { id: "Solo", label: "Solo Traveler", icon: "🎒" },
  { id: "Couple", label: "Couple / Romantic", icon: "💑" },
  { id: "Family / Friends", label: "Family / Group", icon: "👨‍👩‍👧‍👦" },
];

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  tiers: {
    budget: string;
    comfort: string;
    luxury: string;
  };
  customPlaceholder: string;
  defaultCustom: string;
}

const CURRENCIES: CurrencyConfig[] = [
  {
    code: "USD",
    symbol: "$",
    name: "USD ($) - US Dollar",
    flag: "🇺🇸",
    tiers: {
      budget: "$400 – $600",
      comfort: "$600 – $900",
      luxury: "$1,000+",
    },
    customPlaceholder: "e.g. $750 / person or $2,500 total",
    defaultCustom: "$750 / person",
  },
  {
    code: "EUR",
    symbol: "€",
    name: "EUR (€) - Euro",
    flag: "🇪🇺",
    tiers: {
      budget: "€350 – €550",
      comfort: "€550 – €850",
      luxury: "€950+",
    },
    customPlaceholder: "e.g. €700 / person or €2,300 total",
    defaultCustom: "€700 / person",
  },
  {
    code: "GBP",
    symbol: "£",
    name: "GBP (£) - British Pound",
    flag: "🇬🇧",
    tiers: {
      budget: "£300 – £500",
      comfort: "£500 – £750",
      luxury: "£850+",
    },
    customPlaceholder: "e.g. £650 / person or £2,000 total",
    defaultCustom: "£650 / person",
  },
  {
    code: "AUD",
    symbol: "A$",
    name: "AUD (A$) - Australian Dollar",
    flag: "🇦🇺",
    tiers: {
      budget: "A$600 – A$900",
      comfort: "A$900 – A$1,400",
      luxury: "A$1,500+",
    },
    customPlaceholder: "e.g. A$1,100 / person or A$3,500 total",
    defaultCustom: "A$1,100 / person",
  },
  {
    code: "CAD",
    symbol: "C$",
    name: "CAD (C$) - Canadian Dollar",
    flag: "🇨🇦",
    tiers: {
      budget: "C$550 – C$850",
      comfort: "C$850 – C$1,300",
      luxury: "C$1,400+",
    },
    customPlaceholder: "e.g. C$1,000 / person or C$3,200 total",
    defaultCustom: "C$1,000 / person",
  },
  {
    code: "INR",
    symbol: "₹",
    name: "INR (₹) - Indian Rupee",
    flag: "🇮🇳",
    tiers: {
      budget: "₹30,000 – ₹45,000",
      comfort: "₹45,000 – ₹65,000",
      luxury: "₹70,000+",
    },
    customPlaceholder: "e.g. ₹50,000 / person or ₹2,00,000 total",
    defaultCustom: "₹50,000 / person",
  },
  {
    code: "LKR",
    symbol: "Rs",
    name: "LKR (Rs) - Sri Lankan Rupee",
    flag: "🇱🇰",
    tiers: {
      budget: "Rs 120,000 – 180,000",
      comfort: "Rs 180,000 – 270,000",
      luxury: "Rs 300,000+",
    },
    customPlaceholder: "e.g. Rs 220,000 / person or Rs 700,000 total",
    defaultCustom: "Rs 220,000 / person",
  },
  {
    code: "AED",
    symbol: "AED",
    name: "AED (AED) - UAE Dirham",
    flag: "🇦🇪",
    tiers: {
      budget: "AED 1,500 – 2,200",
      comfort: "AED 2,200 – 3,500",
      luxury: "AED 3,800+",
    },
    customPlaceholder: "e.g. AED 2,800 / person or AED 8,000 total",
    defaultCustom: "AED 2,800 / person",
  },
  {
    code: "SGD",
    symbol: "S$",
    name: "SGD (S$) - Singapore Dollar",
    flag: "🇸🇬",
    tiers: {
      budget: "S$550 – S$800",
      comfort: "S$800 – S$1,250",
      luxury: "S$1,350+",
    },
    customPlaceholder: "e.g. S$950 / person or S$3,000 total",
    defaultCustom: "S$950 / person",
  },
  {
    code: "CHF",
    symbol: "CHF",
    name: "CHF (CHF) - Swiss Franc",
    flag: "🇨🇭",
    tiers: {
      budget: "CHF 350 – 550",
      comfort: "CHF 550 – 850",
      luxury: "CHF 950+",
    },
    customPlaceholder: "e.g. CHF 750 / person",
    defaultCustom: "CHF 750 / person",
  },
  {
    code: "OTHER",
    symbol: "🌐",
    name: "Other / Any Currency",
    flag: "🌐",
    tiers: {
      budget: "Budget Tier",
      comfort: "Comfort Tier",
      luxury: "Luxury Tier",
    },
    customPlaceholder: "Type your currency & budget (e.g. 1200 NZD)",
    defaultCustom: "Custom Budget",
  },
];

export default function InteractiveRouteFunnelModal({ isOpen, onClose }: InteractiveRouteFunnelModalProps) {
  // Funnel Step: 1 (Vibes/Days), 2 (Travelers/Group), 3 (Target Budget), "loading", 4 (Contact/Submit), "success"
  const [step, setStep] = useState<1 | 2 | 3 | "loading" | 4 | "success">(1);

  // Step 1 State
  const [selectedVibe, setSelectedVibe] = useState<string>("cultural");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    "Sigiriya",
    "Kandy",
    "Nuwara Eliya / Ella"
  ]);
  const [selectedDays, setSelectedDays] = useState<string>("7 Days");
  const [isCustomDays, setIsCustomDays] = useState<boolean>(false);
  const [customDays, setCustomDays] = useState<string>("12");

  // Step 2 State (Group / Travelers)
  const [groupType, setGroupType] = useState<string>("Couple");
  const [travelerCount, setTravelerCount] = useState<number>(2);
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(1);

  // Step 3 State (Target Budget)
  const [currencyCode, setCurrencyCode] = useState<string>("USD");
  const [budgetTierType, setBudgetTierType] = useState<"budget" | "comfort" | "luxury" | "custom">("comfort");
  const [customBudgetAmount, setCustomBudgetAmount] = useState<string>("$750 / person");

  // Micro-SaaS Loading simulation message index
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  // Step 4 State (Contact)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [formError, setFormError] = useState("");

  const loadingMessages = [
    "Analyzing route feasibility & transfer times...",
    "Checking driver availability on highway nodes...",
    "Calculating hotel distance & daily drive limits...",
    "Formatting custom route & budget blueprint..."
  ];

  // Micro-SaaS simulation effect
  useEffect(() => {
    if (step === "loading") {
      setLoadingTextIndex(0);
      const interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 400);

      const timer = setTimeout(() => {
        clearInterval(interval);
        setStep(4);
      }, 1500);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [step]);

  // Reset modal state when closed
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setFormError("");
      setIsCustomDays(false);
      setSelectedDays("7 Days");
      setGroupType("Couple");
      setTravelerCount(2);
      setAdultCount(2);
      setChildCount(1);
      setCurrencyCode("USD");
      setBudgetTierType("comfort");
      setCustomBudgetAmount("$750 / person");
    }, 300);
  };

  const activeCurrency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  const handleCurrencyChange = (newCode: string) => {
    setCurrencyCode(newCode);
    const newCurr = CURRENCIES.find((c) => c.code === newCode) || CURRENCIES[0];
    if (budgetTierType === "custom") {
      setCustomBudgetAmount(newCurr.defaultCustom);
    }
  };

  const getBudgetDisplay = () => {
    if (budgetTierType === "custom") {
      return customBudgetAmount.trim()
        ? `Custom (${customBudgetAmount.trim()})`
        : `Custom Budget (${activeCurrency.code})`;
    }
    if (budgetTierType === "budget") return `Budget Tier (${activeCurrency.tiers.budget} ${activeCurrency.code})`;
    if (budgetTierType === "luxury") return `Luxury Tier (${activeCurrency.tiers.luxury} ${activeCurrency.code})`;
    return `Comfort Tier (${activeCurrency.tiers.comfort} ${activeCurrency.code})`;
  };

  const handleGroupSelect = (grpId: string) => {
    setGroupType(grpId);
    if (grpId === "Solo") {
      setTravelerCount(1);
    } else if (grpId === "Couple") {
      setTravelerCount(2);
    } else if (grpId === "Family / Friends") {
      const totalFam = adultCount + childCount;
      setTravelerCount(totalFam > 0 ? totalFam : 3);
    }
  };

  const handleAdultCountChange = (newAdults: number) => {
    const validAdults = Math.max(1, Math.min(20, newAdults));
    setAdultCount(validAdults);
    setTravelerCount(validAdults + childCount);
  };

  const handleChildCountChange = (newChildren: number) => {
    const validChildren = Math.max(0, Math.min(15, newChildren));
    setChildCount(validChildren);
    setTravelerCount(adultCount + validChildren);
  };

  const toggleDestination = (destId: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destId)
        ? prev.filter((d) => d !== destId)
        : [...prev, destId]
    );
  };

  const handleStep1Next = () => {
    if (!selectedVibe) return;
    trackEvent("funnel_step_1_complete", "engagement", "route_feasibility_funnel");
    setStep(2);
  };

  const handleStep2Next = () => {
    trackEvent("funnel_step_2_complete", "engagement", "route_feasibility_funnel");
    setStep(3);
  };

  const handleStep3Validate = () => {
    trackEvent("funnel_step_3_validate", "engagement", "route_feasibility_funnel");
    setStep("loading");
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      setFormError("Please enter your name and WhatsApp number.");
      return;
    }

    setFormError("");
    trackEvent("funnel_step_4_submit", "conversion", "route_feasibility_funnel");

    // Find selected vibe display name
    const vibeObj = TRIP_VIBES.find((v) => v.id === selectedVibe);
    const vibeName = vibeObj ? vibeObj.name : selectedVibe;

    const formattedBudget = getBudgetDisplay();

    const formattedGroupSize =
      groupType === "Family / Friends"
        ? `Family / Group (${adultCount} ${adultCount === 1 ? "Adult" : "Adults"}, ${childCount} ${childCount === 1 ? "Child" : "Children"} • Total ${travelerCount} Pax)`
        : `${groupType} (${travelerCount} ${travelerCount === 1 ? "Person" : "Persons"})`;

    // Format WhatsApp message
    const message = `Hi Plan Sri Lanka! 🚀 I used your Route Feasibility Tool for my Sri Lanka trip.
    
📌 *My Route Configuration:*
• *Trip Vibe:* ${vibeName}
• *Destinations:* ${selectedDestinations.join(", ")}
• *Duration:* ${selectedDays}
• *Group Size:* ${formattedGroupSize}
• *Currency & Budget:* ${formattedBudget}

👤 *My Contact Details:*
• *Name:* ${fullName}
• *Email:* ${email || "Not provided"}
• *WhatsApp:* ${whatsapp}

Please send my customized route & budget review directly to my WhatsApp!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/94722968210?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(waUrl, "_blank");
    setStep("success");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#FDFBF7] text-[#1A1A1A] rounded-3xl shadow-2xl border-2 border-[#1F3D2B]/20 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        >
          {/* MODAL HEADER */}
          <div className="bg-[#1F3D2B] text-white p-5 sm:p-6 flex items-center justify-between relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                <Compass className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest block">
                  Interactive Route Validation Tool
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                  Build Your Custom Sri Lanka Route
                </h2>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* PROGRESS INDICATOR (Steps 1, 2, 3, 4) */}
          {step !== "loading" && step !== "success" && (
            <div className="bg-[#FAF8F3] px-3 sm:px-6 py-3 border-b border-[#E8E4D9] flex items-center justify-between shrink-0 text-xs font-mono overflow-x-auto">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 1 ? "bg-[#1F3D2B] text-[#D4AF37]" : "bg-[#1F3D2B]/10 text-[#1F3D2B]"}`}>
                  1
                </span>
                <span className={`font-semibold ${step === 1 ? "text-[#1F3D2B]" : "text-[#7A7365]"}`}>Vibe & Days</span>
              </div>
              <div className="h-0.5 w-3 sm:w-6 bg-[#E8E4D9] shrink-0" />
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 2 ? "bg-[#1F3D2B] text-[#D4AF37]" : "bg-[#1F3D2B]/10 text-[#1F3D2B]"}`}>
                  2
                </span>
                <span className={`font-semibold ${step === 2 ? "text-[#1F3D2B]" : "text-[#7A7365]"}`}>Travelers</span>
              </div>
              <div className="h-0.5 w-3 sm:w-6 bg-[#E8E4D9] shrink-0" />
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 3 ? "bg-[#1F3D2B] text-[#D4AF37]" : "bg-[#1F3D2B]/10 text-[#1F3D2B]"}`}>
                  3
                </span>
                <span className={`font-semibold ${step === 3 ? "text-[#1F3D2B]" : "text-[#7A7365]"}`}>Target Budget</span>
              </div>
              <div className="h-0.5 w-3 sm:w-6 bg-[#E8E4D9] shrink-0" />
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 4 ? "bg-[#1F3D2B] text-[#D4AF37]" : "bg-[#1F3D2B]/10 text-[#1F3D2B]"}`}>
                  4
                </span>
                <span className={`font-semibold ${step === 4 ? "text-[#1F3D2B]" : "text-[#7A7365]"}`}>Submit</span>
              </div>
            </div>
          )}

          {/* MODAL BODY */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

            {/* STEP 1: VIBES, DESTINATIONS & DAYS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {/* Step 1: Vibe & Destinations (First Page Only) */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 tracking-wide uppercase">
                      WHAT KIND OF TRIP VIBE ARE YOU LOOKING FOR? ✨
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Select your preferred travel style to customize your route:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {TRIP_VIBES.map((vibe) => {
                      const isSelected = selectedVibe === vibe.id;
                      return (
                        <div
                          key={vibe.id}
                          onClick={() => setSelectedVibe(vibe.id)}
                          className={`cursor-pointer relative rounded-2xl overflow-hidden border-2 transition-all duration-200 group bg-gray-900 ${
                            isSelected 
                              ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/30 scale-[1.02]' 
                              : 'border-gray-800 hover:border-gray-600'
                          }`}
                        >
                          {/* Background Image with Overlay */}
                          <div className="h-28 w-full overflow-hidden relative">
                            <img 
                              src={vibe.image} 
                              alt={vibe.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                            
                            {/* Selection Tick Badge */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-1 shadow-md">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Title & Description */}
                          <div className="p-3 text-center relative -mt-8 bg-transparent">
                            <h4 className="font-bold text-white text-sm mb-1">{vibe.name}</h4>
                            <p className="text-[11px] text-gray-300 leading-tight">{vibe.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DAYS SELECTION PILLS */}
                <div className="pt-2 space-y-3">
                  <label className="text-xs font-mono font-bold text-[#1F3D2B] uppercase tracking-wider block">
                    Select Your Trip Duration:
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {DURATION_OPTIONS.map((days) => {
                      const isCustomPill = days.startsWith("Custom");
                      const isSelected = isCustomPill ? isCustomDays : selectedDays === days && !isCustomDays;

                      return (
                        <button
                          key={days}
                          type="button"
                          onClick={() => {
                            if (isCustomPill) {
                              setIsCustomDays(true);
                              setSelectedDays(customDays ? `${customDays} Days` : "12 Days");
                            } else {
                              setIsCustomDays(false);
                              setSelectedDays(days);
                            }
                          }}
                          className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#1F3D2B] text-[#D4AF37] shadow-md scale-105"
                              : "bg-white border border-[#E8E4D9] text-[#1A1A1A] hover:border-[#1F3D2B]"
                          }`}
                        >
                          ⏱️ {days}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Days Input */}
                  {isCustomDays && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#1F3D2B]/30 flex flex-wrap items-center gap-3"
                    >
                      <span className="text-xs font-mono font-bold text-[#1F3D2B]">
                        Specify Number of Days:
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={60}
                          value={customDays}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCustomDays(val);
                            setSelectedDays(val ? `${val} Days` : "Custom Days");
                          }}
                          className="w-20 px-3 py-1.5 rounded-xl border-2 border-[#1F3D2B] bg-white text-sm font-mono font-bold text-[#1F3D2B] focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/30"
                          placeholder="e.g. 12"
                        />
                        <span className="text-xs font-mono font-bold text-[#1F3D2B]">Days</span>
                      </div>
                      <span className="text-[11px] text-[#7A7365] italic">
                        (Flexible itinerary planning for any duration)
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E8E4D9] flex justify-end">
                  <button
                    type="button"
                    onClick={handleStep1Next}
                    disabled={!selectedVibe}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1F3D2B] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#142A1D] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next: Select Travelers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: GROUP TYPE & TRAVELERS (Dedicated Page 2) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <label className="text-xs font-mono font-bold text-[#1F3D2B] uppercase tracking-wider block mb-1">
                    Step 2: Who Is Traveling?
                  </label>
                  <p className="text-xs text-[#5A5448]">
                    Specify your group type and number of travelers so we can calculate vehicle sizing and pacing:
                  </p>
                </div>

                {/* Group Types */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#7A7365]">
                      Group Type:
                    </span>
                    <span className="text-[11px] font-mono text-[#1F3D2B] font-bold">
                      {travelerCount} {travelerCount === 1 ? "Traveler" : "Travelers"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {GROUP_OPTIONS.map((grp) => (
                      <button
                        key={grp.id}
                        type="button"
                        onClick={() => handleGroupSelect(grp.id)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          groupType === grp.id
                            ? "bg-[#1F3D2B] text-white border-[#1F3D2B] shadow-md"
                            : "bg-white border-[#E8E4D9] text-[#1A1A1A] hover:border-[#1F3D2B]"
                        }`}
                      >
                        <span className="text-2xl block mb-1">{grp.icon}</span>
                        <span className="font-serif font-bold text-xs block">{grp.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Family / Friends: Dedicated Adult & Child Count Controls */}
                  {groupType === "Family / Friends" ? (
                    <div className="bg-[#FAF8F3] border-2 border-[#1F3D2B]/30 p-4 rounded-2xl space-y-3.5 shadow-sm">
                      <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-2.5">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#1F3D2B]" />
                          <div>
                            <span className="text-xs font-mono font-bold text-[#1F3D2B] block">
                              Family Composition
                            </span>
                            <span className="text-[11px] text-[#7A7365]">
                              Specify number of adults and children traveling
                            </span>
                          </div>
                        </div>
                        <div className="px-2.5 py-1 bg-[#1F3D2B] text-[#D4AF37] rounded-xl text-center font-mono font-bold text-xs shadow-sm">
                          Total: {travelerCount} Pax
                        </div>
                      </div>

                      {/* Adult & Child Stepper Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Adults Stepper */}
                        <div className="bg-white p-3 rounded-xl border border-[#E8E4D9] flex items-center justify-between">
                          <div>
                            <span className="text-xs font-serif font-bold text-[#1F3D2B] block">
                              Adults
                            </span>
                            <span className="text-[10px] text-[#7A7365] block">
                              Age 12+ years
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleAdultCountChange(adultCount - 1)}
                              disabled={adultCount <= 1}
                              className="w-8 h-8 rounded-lg bg-[#FAF8F3] border border-[#E8E4D9] text-[#1F3D2B] font-bold text-base hover:bg-[#1F3D2B] hover:text-white transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                              aria-label="Decrease adult count"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-mono font-bold text-sm text-[#1F3D2B]">
                              {adultCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAdultCountChange(adultCount + 1)}
                              disabled={adultCount >= 20}
                              className="w-8 h-8 rounded-lg bg-[#FAF8F3] border border-[#E8E4D9] text-[#1F3D2B] font-bold text-base hover:bg-[#1F3D2B] hover:text-white transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                              aria-label="Increase adult count"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children Stepper */}
                        <div className="bg-white p-3 rounded-xl border border-[#E8E4D9] flex items-center justify-between">
                          <div>
                            <span className="text-xs font-serif font-bold text-[#1F3D2B] block">
                              Children
                            </span>
                            <span className="text-[10px] text-[#7A7365] block">
                              Age 0 – 11 years
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleChildCountChange(childCount - 1)}
                              disabled={childCount <= 0}
                              className="w-8 h-8 rounded-lg bg-[#FAF8F3] border border-[#E8E4D9] text-[#1F3D2B] font-bold text-base hover:bg-[#1F3D2B] hover:text-white transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                              aria-label="Decrease child count"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-mono font-bold text-sm text-[#1F3D2B]">
                              {childCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleChildCountChange(childCount + 1)}
                              disabled={childCount >= 15}
                              className="w-8 h-8 rounded-lg bg-[#FAF8F3] border border-[#E8E4D9] text-[#1F3D2B] font-bold text-base hover:bg-[#1F3D2B] hover:text-white transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                              aria-label="Increase child count"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#5A5448] flex items-center gap-1.5 pt-1">
                        <span className="text-[#D4AF37]">💡</span>
                        <span>Vehicle size and family child car seats will be automatically calculated for your route.</span>
                      </div>
                    </div>
                  ) : (
                    /* General Interactive Traveler Count Selector (Solo / Couple) */
                    <div className="bg-[#FAF8F3] border border-[#E8E4D9] p-3.5 rounded-2xl space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#1F3D2B]" />
                          <div>
                            <span className="text-xs font-mono font-bold text-[#1F3D2B] block">
                              How many people are traveling?
                            </span>
                            <span className="text-[11px] text-[#7A7365]">
                              {groupType === "Solo"
                                ? "Solo adventurer"
                                : "Traveling as a couple"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setTravelerCount((prev) => Math.max(1, prev - 1))}
                            disabled={travelerCount <= 1}
                            className="w-8 h-8 rounded-xl bg-white border border-[#E8E4D9] text-[#1F3D2B] font-bold text-base hover:bg-[#1F3D2B] hover:text-white transition-colors flex items-center justify-center shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Decrease traveler count"
                          >
                            -
                          </button>
                          <div className="min-w-[4.2rem] px-2 py-1 bg-white border border-[#1F3D2B]/30 rounded-xl text-center font-mono font-bold text-xs text-[#1F3D2B] shadow-inner">
                            {travelerCount} {travelerCount === 1 ? "Pax" : "Pax"}
                          </div>
                          <button
                            type="button"
                            onClick={() => setTravelerCount((prev) => Math.min(30, prev + 1))}
                            className="w-8 h-8 rounded-xl bg-white border border-[#E8E4D9] text-[#1F3D2B] font-bold text-base hover:bg-[#1F3D2B] hover:text-white transition-colors flex items-center justify-center shadow-sm"
                            aria-label="Increase traveler count"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Quick Group Size Buttons */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#E8E4D9]/60">
                        <span className="text-[10px] font-mono text-[#7A7365] mr-1">Quick pick:</span>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => {
                              setTravelerCount(num);
                              if (num === 1) setGroupType("Solo");
                              else if (num === 2) setGroupType("Couple");
                              else setGroupType("Family / Friends");
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all ${
                              travelerCount === num
                                ? "bg-[#1F3D2B] text-white border-[#1F3D2B]"
                                : "bg-white text-[#5A5448] border-[#E8E4D9] hover:border-[#1F3D2B]"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E8E4D9] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-xl border border-[#E8E4D9] text-xs font-bold text-[#7A7365] hover:text-[#1F3D2B] transition-colors"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleStep2Next}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1F3D2B] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#142A1D] transition-all shadow-md"
                  >
                    <span>Next: Target Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: TARGET BUDGET (Dedicated Page 3) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <label className="text-xs font-mono font-bold text-[#1F3D2B] uppercase tracking-wider block mb-1">
                    Step 3: Target Budget (Per Pax or Total)
                  </label>
                  <p className="text-xs text-[#5A5448]">
                    Choose your preferred currency or specify your target spending style:
                  </p>
                </div>

                {/* Budget Tiers & Currency Switcher */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-semibold text-[#7A7365] block">
                        Currency Selection:
                      </span>
                      <span className="text-[11px] text-[#5A5448]">
                        Estimates automatically convert to your local currency:
                      </span>
                    </div>

                    {/* Currency Selector Dropdown */}
                    <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white border border-[#E8E4D9] rounded-xl px-2.5 py-1.5 shadow-sm hover:border-[#1F3D2B] transition-colors">
                      <Globe className="w-3.5 h-3.5 text-[#1F3D2B] shrink-0" />
                      <span className="text-[10px] font-mono text-[#7A7365] uppercase font-bold">Currency:</span>
                      <select
                        value={currencyCode}
                        onChange={(e) => handleCurrencyChange(e.target.value)}
                        className="bg-transparent text-xs font-mono font-bold text-[#1F3D2B] focus:outline-none cursor-pointer pr-1"
                        aria-label="Select currency"
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code} className="text-[#1A1A1A]">
                            {c.flag} {c.code} ({c.symbol})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Popular Currency Quick Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono text-[#7A7365] mr-1">Popular:</span>
                    {["USD", "EUR", "GBP", "AUD", "CAD", "INR", "LKR", "AED"].map((code) => {
                      const c = CURRENCIES.find((item) => item.code === code);
                      if (!c) return null;
                      const isCurrent = currencyCode === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleCurrencyChange(code)}
                          className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold border transition-all ${
                            isCurrent
                              ? "bg-[#1F3D2B] text-white border-[#1F3D2B] shadow-xs"
                              : "bg-white text-[#5A5448] border-[#E8E4D9] hover:border-[#1F3D2B]"
                          }`}
                        >
                          {c.flag} {c.code}
                        </button>
                      );
                    })}
                  </div>

                  {/* Preset Budget Cards */}
                  <div className="space-y-2.5">
                    {[
                      {
                        id: "budget" as const,
                        title: "Budget Tier",
                        range: activeCurrency.tiers.budget,
                        desc: "Cozy guesthouses & scenic train loops",
                      },
                      {
                        id: "comfort" as const,
                        title: "Comfort Tier ⭐",
                        range: activeCurrency.tiers.comfort,
                        desc: "3-4★ Boutique villas & AC private car",
                      },
                      {
                        id: "luxury" as const,
                        title: "Luxury Tier",
                        range: activeCurrency.tiers.luxury,
                        desc: "5★ Beach resorts & colonial tea estates",
                      },
                      {
                        id: "custom" as const,
                        title: "Custom Budget ✏️",
                        range: "Your Choice",
                        desc: `Specify your target in ${activeCurrency.code} or any currency`,
                      },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => {
                          setBudgetTierType(tier.id);
                          if (tier.id === "custom" && !customBudgetAmount) {
                            setCustomBudgetAmount(activeCurrency.defaultCustom);
                          }
                        }}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          budgetTierType === tier.id
                            ? "bg-[#1F3D2B] text-white border-[#1F3D2B] shadow-md"
                            : "bg-white border-[#E8E4D9] text-[#1A1A1A] hover:border-[#1F3D2B]"
                        }`}
                      >
                        <div>
                          <div className="font-serif font-bold text-sm leading-tight flex items-center gap-2">
                            <span>{tier.title}</span>
                          </div>
                          <p className={`text-xs mt-0.5 ${budgetTierType === tier.id ? "text-white/80" : "text-[#7A7365]"}`}>
                            {tier.desc}
                          </p>
                        </div>
                        <span className={`font-mono font-bold text-xs px-3 py-1 rounded-full ${
                          budgetTierType === tier.id ? "bg-[#D4AF37] text-[#1F3D2B]" : "bg-[#FAF8F3] text-[#1F3D2B]"
                        }`}>
                          {tier.range}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Budget Input if Selected */}
                  {budgetTierType === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 bg-[#FAF8F3] border-2 border-[#D4AF37]/50 rounded-2xl space-y-2 mt-2"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-[#1F3D2B]">
                          Enter Your Target Budget ({activeCurrency.code}):
                        </label>
                        <span className="text-[10px] text-[#7A7365] font-normal">Per Person or Total</span>
                      </div>
                      <div className="relative">
                        {activeCurrency.symbol !== "🌐" && (
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-[#1F3D2B] text-sm select-none">
                            {activeCurrency.symbol}
                          </span>
                        )}
                        <input
                          type="text"
                          value={customBudgetAmount}
                          onChange={(e) => setCustomBudgetAmount(e.target.value)}
                          placeholder={activeCurrency.customPlaceholder}
                          className={`w-full ${activeCurrency.symbol !== "🌐" ? "pl-9" : "pl-3.5"} pr-3.5 py-2.5 rounded-xl border border-[#E8E4D9] bg-white text-xs sm:text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B] focus:ring-1 focus:ring-[#1F3D2B]`}
                        />
                      </div>
                      <p className="text-[11px] text-[#7A7365]">
                        💡 You can type any currency or amount (e.g. {activeCurrency.customPlaceholder}). We will configure hotel categories, private vehicle sizing, and experiences to suit your exact target.
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E8E4D9] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-3 rounded-xl border border-[#E8E4D9] text-xs font-bold text-[#7A7365] hover:text-[#1F3D2B] transition-colors"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleStep3Validate}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1F3D2B] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#142A1D] transition-all shadow-md"
                  >
                    <span>Validate My Route</span>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* MICRO-SAAS SIMULATION LOADING EFFECT */}
            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-6 text-center space-y-6"
              >
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-[#1F3D2B]/10 animate-ping" />
                  <div className="w-20 h-20 rounded-full bg-[#1F3D2B] text-[#D4AF37] flex items-center justify-center shadow-xl">
                    <Loader2 className="w-10 h-10 animate-spin" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest block">
                    Micro-SaaS Feasibility Engine
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1F3D2B] min-h-[28px]">
                    {loadingMessages[loadingTextIndex]}
                  </h3>
                  <p className="text-xs text-[#7A7365]">
                    Validating highway routes, driver availability, and budget parameters...
                  </p>
                </div>

                <div className="w-48 h-1.5 bg-[#E8E4D9] rounded-full mx-auto overflow-hidden">
                  <motion.div
                    className="h-full bg-[#D4AF37]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONTACT & WHATSAPP DELIVERY */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="bg-[#F2F7F4] border border-[#C5DAC9] p-4 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">
                      Route Validated! ({selectedDays} • {travelerCount} {travelerCount === 1 ? "Traveler" : "Travelers"} • {selectedDestinations.length} Key Stops)
                    </h4>
                    <p className="text-xs text-[#5A5448] mt-0.5">
                      Your chosen route ({selectedDestinations.join(", ")}) is verified feasible for {travelerCount} {travelerCount === 1 ? "traveler" : "travelers"} with your target budget ({getBudgetDisplay()}). Enter your WhatsApp below to receive the complete custom itinerary & price breakdown.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-[#1F3D2B] uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins or Alex Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E4D9] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B] focus:ring-1 focus:ring-[#1F3D2B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-[#1F3D2B] uppercase tracking-wider block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sarah@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E4D9] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B] focus:ring-1 focus:ring-[#1F3D2B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-[#1F3D2B] uppercase tracking-wider block">
                      WhatsApp Number (With Country Code) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 555 123 4567, +44 7911..., +91 98765..."
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E4D9] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B] focus:ring-1 focus:ring-[#1F3D2B]"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E4D9] text-xs text-[#7A7365] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1F3D2B] shrink-0" />
                    <span>We'll send your customized route & budget review directly to your WhatsApp. Zero spam.</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-3 rounded-xl border border-[#E8E4D9] text-xs font-bold text-[#7A7365] hover:text-[#1F3D2B] transition-colors"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#1EBE5D] transition-all shadow-lg scale-[1.02]"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Send My Validated Route 🚀</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* SUCCESS SCREEN */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 px-4 text-center space-y-5"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl">
                  🎉
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-[#1F3D2B]">
                    WhatsApp Chat Initiated!
                  </h3>
                  <p className="text-xs text-[#5A5448] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{fullName}</strong>! We have opened WhatsApp with your complete route configuration. Our local trip specialist will review your selected destinations and send your customized day-by-day plan right away.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E4D9]">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-3 rounded-xl bg-[#1F3D2B] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#142A1D] transition-colors shadow-md"
                  >
                    Done & Return to Article
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
