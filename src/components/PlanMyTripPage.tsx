import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Car,
  Building,
  Check,
  Star,
  Zap,
  PhoneCall,
  Loader2,
  Share2,
  HelpCircle,
  ChevronDown,
  Info,
  Waves,
  Plane,
  Camera,
  RotateCcw,
  CheckCircle
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import {
  CURRENCY_RATES,
  DayItineraryItem,
  BudgetBreakdown
} from "../lib/tripRuleEngine";
import { parseTripPrompt, ParsedTripResult } from "../lib/tripAiParser";
import InteractiveRouteFunnelModal from "./InteractiveRouteFunnelModal";
import InteractiveDarkRouteMap from "./InteractiveDarkRouteMap";
import PlanTripStaysWidget from "./PlanTripStaysWidget";
import OnSiteBookingModal from "./OnSiteBookingModal";
import { HotelListing } from "../data/sriLankaHotelsData";

const PRESET_PROMPTS = [
  {
    title: "💑 Couple 6-Day Beach & Hill Loop (₹65,000)",
    prompt: "We are a couple visiting for 6 days in November from Mumbai. We want 4-star sea view hotels, Sigiriya Lion Rock, the scenic blue train, and relaxing beachfront in Mirissa. Target budget around ₹65,000.",
    budget: "65000",
    currency: "INR"
  },
  {
    title: "👨‍👩‍👧 Family 8-Day Wildlife & Heritage ($1,400)",
    prompt: "Family of 4 (2 adults, 2 kids) traveling for 8 days. Want child-friendly pacing, Sigiriya citadel, Yala elephant safari, and gentle beaches in Bentota with chauffeur. Budget $1,400.",
    budget: "1400",
    currency: "USD"
  },
  {
    title: "🌊 5-Day Chennai Coastal Escape (₹45,000)",
    prompt: "Visiting from Chennai for 5 days. Want direct sea view rooms, Galle Fort ramparts, Weligama beach, and Colombo dining. Budget ₹45,000.",
    budget: "45000",
    currency: "INR"
  },
  {
    title: "🚂 7-Day First-Timer Complete Island Loop (£700)",
    prompt: "First time in Sri Lanka for 7 days. Need the classic loop: Sigiriya, Kandy Temple of Tooth, scenic train to Ella, and south coast beaches with dedicated private driver. Budget around £700.",
    budget: "700",
    currency: "GBP"
  },
  {
    title: "🚗 10-Day Private Chauffeur Only Loop (Rs 120,000)",
    prompt: "We already have boutique villas booked. Need a dedicated licensed chauffeur and air-conditioned car for 10 days covering Colombo, Cultural Triangle, Ella and south coast. Budget LKR 120,000.",
    budget: "120000",
    currency: "LKR"
  }
];

export default function PlanMyTripPage() {
  usePageMetadata({
    title: "Plan My Trip Sri Lanka | AI Route Builder & Instant Budget Breakdown",
    description: "Type your dream journey and target budget to generate an optimal Sri Lanka route, verified driving times, dedicated chauffeur cost, and 4★ sea view hotel breakdown in seconds.",
    canonicalUrl: "https://plan-srilanka.com/plan-my-trip",
    ogUrl: "https://plan-srilanka.com/plan-my-trip",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [promptText, setPromptText] = useState(
    "We are a couple visiting for 6 days in November from Mumbai. We want 4-star sea view hotels, Sigiriya Lion Rock, the scenic blue train to Ella, and golden beaches. Target budget around ₹65,000."
  );
  const [explicitBudget, setExplicitBudget] = useState("65000");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [isGenerating, setIsGenerating] = useState(false);
  const [simulationIndex, setSimulationIndex] = useState(0);
  const [result, setResult] = useState<ParsedTripResult | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHotels, setSelectedHotels] = useState<Record<number, HotelListing>>({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFunnelOpen, setIsFunnelOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const simulationSteps = [
    "Analyzing trip vibe, duration & traveler group size...",
    "Auditing Sri Lankan highway transfers (enforcing ≤ 3.5 hrs/day drive limit)...",
    "Pairing verified 4★ Sea View & Heritage Boutique properties...",
    "Computing transparent multi-currency budget & private chauffeur allocation..."
  ];

  // Initial generation on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const initialParsed = parseTripPrompt(promptText, explicitBudget, selectedCurrency);
    setResult(initialParsed);
  }, []);

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;

    trackEvent("ai_route_generate_click", "engagement", "plan_my_trip_page");
    setIsGenerating(true);
    setSimulationIndex(0);

    const interval = setInterval(() => {
      setSimulationIndex((prev) => (prev + 1) % simulationSteps.length);
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      const parsed = parseTripPrompt(promptText, explicitBudget, selectedCurrency);
      setResult(parsed);
      setIsGenerating(false);

      // Scroll smoothly to results
      const resEl = document.getElementById("results-section");
      if (resEl) {
        resEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 1200);
  };

  const applyPreset = (preset: typeof PRESET_PROMPTS[0]) => {
    setPromptText(preset.prompt);
    setExplicitBudget(preset.budget);
    setSelectedCurrency(preset.currency);
    trackEvent("ai_route_preset_click", "engagement", preset.title);

    setIsGenerating(true);
    setSimulationIndex(0);
    setTimeout(() => {
      const parsed = parseTripPrompt(preset.prompt, preset.budget, preset.currency);
      setResult(parsed);
      setIsGenerating(false);
      const resEl = document.getElementById("results-section");
      if (resEl) {
        resEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Build WhatsApp Lead URL with generated itinerary
  const generateWhatsAppUrl = () => {
    if (!result) return "https://wa.me/94722968210";

    const { intent, itinerary, breakdown, summaryTitle } = result;
    const curr = CURRENCY_RATES[breakdown.currency] || CURRENCY_RATES.INR;

    const routeStops = itinerary
      .map((d) => `• Day ${d.day}: ${d.destination} (${d.drivingTime})`)
      .join("\n");

    const message = `🌟 *New AI Journey Blueprint from Plan-SriLanka.com!* 🌟
-----------------------------------------
📋 *Route Plan:* ${summaryTitle} (${intent.days} Days / ${intent.travelerCount} Pax)
👥 *Group:* ${intent.groupType} (${intent.travelerCount} Travelers)
📦 *Package Scope:* ${intent.packageScope === "complete_package" ? "Complete Land Package (Driver + 4★ Stays + Breakfast)" : "Private Chauffeur Only"}
${intent.departureCity ? `✈️ *Departure City:* ${intent.departureCity}\n` : ""}
📍 *Daily Route Outline:*
${routeStops}

💰 *Transparent Cost Estimate (${curr.code}):*
• Dedicated Private Chauffeur & AC Car: ${breakdown.formattedDriverCost}
${intent.packageScope === "complete_package" ? `• 4★ Sea View & Boutique Stays: ${breakdown.formattedHotelCost}\n• Activities Buffer: ${breakdown.formattedActivitiesCost}\n` : ""}• Total Estimated: ${breakdown.formattedTotalCalculated} (${breakdown.perPersonCalculated} / person)
${intent.targetBudgetAmount ? `🎯 *My Target Budget:* ${curr.format(intent.targetBudgetAmount)}\n` : ""}
Please confirm hotel availability and assign our dedicated local chauffeur!`;

    return `https://wa.me/94722968210?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#1A1A1A] font-sans selection:bg-[#D4AF37]/20 selection:text-[#1F3D2B]">
      
      {/* TOP HEADER / BREADCRUMB */}
      <header className="sticky top-0 z-40 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-[#E8E4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
              Plan Sri Lanka<span className="text-[#D4AF37]">.</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase bg-[#1F3D2B] text-white px-2 py-0.5 rounded-full">
              AI ENGINE
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/sri-lanka-7-day-itinerary"
              className="hidden md:inline-flex text-xs font-mono font-semibold text-[#5A5448] hover:text-[#1F3D2B] transition-colors"
            >
              7-Day Classic
            </Link>
            <Link
              to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
              className="hidden md:inline-flex text-xs font-mono font-semibold text-[#5A5448] hover:text-[#1F3D2B] transition-colors"
            >
              India Cost Guide
            </Link>
            <button
              onClick={() => setIsFunnelOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F3D2B] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl hover:bg-[#142A1D] transition-all shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Full Route Funnel</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH PROMPT BOX */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#E8E4D9]/60">
        <div className="absolute inset-0 bg-radial-gradient from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Eyebrow & Headline */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F3D2B]/5 border border-[#1F3D2B]/15 text-[#1F3D2B] text-[11px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Hybrid AI + Sri Lanka Geographic Constraints Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1F3D2B] leading-[1.15] tracking-tight">
              Type Your Dream Journey. <br />
              <span className="italic text-[#8B6E28]">Get Instant Verified Route & Costs.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5A5448] leading-relaxed max-w-2xl mx-auto">
              Generic AIs suggest impossible 9-hour mountain drives and fake prices. Our hybrid engine enforces real highway limits (<strong>max 3.5 hrs/day</strong>), verified chauffeur rates, and handpicked 4★ Sea View stays in seconds.
            </p>
          </div>

          {/* SAAS AI PROMPT CARD */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 border-2 border-[#1F3D2B]/20 shadow-2xl space-y-6">
            
            <form onSubmit={handleGenerate} className="space-y-5">
              
              {/* Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#1F3D2B] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <span>Describe Your Trip (Dates, Travelers, Places & Style)</span>
                  </label>
                  <span className="text-[11px] text-[#7A7365] font-mono">Free-form Text AI</span>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder='e.g. "We are 2 adults from Mumbai visiting for 6 days in November. We want 4-star sea view hotels, Sigiriya rock, the blue train, and beach relaxation. Budget ₹65,000."'
                    className="w-full p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] text-sm md:text-base text-[#1A1A1A] leading-relaxed placeholder:text-[#9A9385] focus:outline-none focus:border-[#1F3D2B] focus:ring-2 focus:ring-[#1F3D2B]/10 transition-all resize-y min-h-[110px]"
                  />
                </div>
              </div>

              {/* Secondary Controls: Budget & Currency override */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                
                {/* Target Budget Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-[#5A5448] uppercase tracking-wider block">
                    Target Budget (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={explicitBudget}
                      onChange={(e) => setExplicitBudget(e.target.value)}
                      placeholder="e.g. 65000 or 1200"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4D9] text-xs font-mono font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                </div>

                {/* Currency Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-[#5A5448] uppercase tracking-wider block">
                    Preferred Currency
                  </label>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4D9] text-xs font-mono font-bold text-[#1F3D2B] focus:outline-none focus:border-[#1F3D2B] cursor-pointer"
                  >
                    {Object.values(CURRENCY_RATES).map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol}) - {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Generate Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isGenerating || !promptText.trim()}
                    className="w-full py-3 px-6 bg-[#1F3D2B] hover:bg-[#142A1D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>Generate Route ⚡</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </form>

            {/* Quick Inspiration Pills */}
            <div className="space-y-2 pt-2 border-t border-[#E8E4D9]/60">
              <span className="text-[11px] font-mono text-[#7A7365] font-semibold block">
                💡 Or click an example prompt to test instantly:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#E8E4D9] text-[11px] font-mono text-[#1F3D2B] font-medium transition-all text-left hover:border-[#1F3D2B]/40 cursor-pointer"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* SIMULATION LOADER (IF ACTIVE) */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-6 bg-[#FAF8F5] border border-[#D4AF37]/40 rounded-2xl text-center space-y-3 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#1F3D2B] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
                <div className="text-xs font-mono font-bold text-[#1F3D2B]">
                  {simulationSteps[simulationIndex]}
                </div>
                <div className="w-48 h-1 bg-[#E8E4D9] rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-[#D4AF37] animate-pulse w-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* RESULTS DISPLAY CANVAS */}
      {result && (
        <section id="results-section" className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* RESULTS HEADER */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4D9] shadow-md space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4D9]">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#1F3D2B] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    Verified Feasible
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                    ✓ Max Drive ≤ 3.5h / day
                  </span>
                  {result.detectedTags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#5A5448] border border-[#E8E4D9] text-[10px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1F3D2B]">
                  {result.summaryTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#7A7365] mt-1">
                  Custom-tailored for <strong>{result.intent.travelerCount} {result.intent.travelerCount === 1 ? "Traveler" : "Travelers"}</strong> ({result.intent.groupType}) over <strong>{result.intent.days} Days / {result.itinerary.length - 1} Nights</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-5 py-3.5 bg-[#1F3D2B] hover:bg-[#142A1D] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Book On-Site Now</span>
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 fill-current" />
                  <span>Lock Route On WhatsApp</span>
                </a>
              </div>
            </div>

            {/* FEASIBILITY / BUDGET ADVISORY CARD */}
            <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3.5 ${
              result.breakdown.feasibilityStatus === "UNDER_BUDGET" || result.breakdown.feasibilityStatus === "EXACT_MATCH"
                ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                : "bg-amber-50/80 border-amber-200 text-amber-950"
            }`}>
              <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                result.breakdown.feasibilityStatus === "UNDER_BUDGET" || result.breakdown.feasibilityStatus === "EXACT_MATCH"
                  ? "text-emerald-700"
                  : "text-amber-700"
              }`} />
              <div>
                <strong className="block font-bold text-sm mb-0.5">
                  Feasibility & Price Analysis:
                </strong>
                <span>{result.breakdown.feasibilityNote}</span>
              </div>
            </div>

            {/* LIVE PRICE BREAKDOWN TILES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] space-y-1">
                <div className="flex items-center gap-1.5 text-[#7A7365] text-[10px] font-mono uppercase font-bold">
                  <Car className="w-3.5 h-3.5 text-[#1F3D2B]" />
                  <span>Private Chauffeur</span>
                </div>
                <div className="text-lg sm:text-xl font-mono font-bold text-[#1F3D2B]">
                  {result.breakdown.formattedDriverCost}
                </div>
                <p className="text-[10px] text-[#7A7365]">
                  {result.intent.days} Days Dedicated AC car, fuel, tolls & driver stay
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] space-y-1">
                <div className="flex items-center gap-1.5 text-[#7A7365] text-[10px] font-mono uppercase font-bold">
                  <Building className="w-3.5 h-3.5 text-[#1F3D2B]" />
                  <span>4★ Stays & Resorts</span>
                </div>
                <div className="text-lg sm:text-xl font-mono font-bold text-[#1F3D2B]">
                  {result.breakdown.formattedHotelCost}
                </div>
                <p className="text-[10px] text-[#7A7365]">
                  {result.intent.packageScope === "driver_only" ? "Not included (Self-booked)" : "Handpicked 4★ Sea View rooms with daily breakfast"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] space-y-1">
                <div className="flex items-center gap-1.5 text-[#7A7365] text-[10px] font-mono uppercase font-bold">
                  <Compass className="w-3.5 h-3.5 text-[#1F3D2B]" />
                  <span>Activities Buffer</span>
                </div>
                <div className="text-lg sm:text-xl font-mono font-bold text-[#1F3D2B]">
                  {result.breakdown.formattedActivitiesCost}
                </div>
                <p className="text-[10px] text-[#7A7365]">
                  Sigiriya citadel, train tickets, safari jeep buffer
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#1F3D2B] text-white border border-[#1F3D2B] space-y-1">
                <div className="flex items-center justify-between text-[#D4AF37] text-[10px] font-mono uppercase font-bold">
                  <span>Total Package</span>
                  <span className="text-white/60">({result.breakdown.currency})</span>
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-[#D4AF37]">
                  {result.breakdown.formattedTotalCalculated}
                </div>
                <p className="text-[10px] text-white/80">
                  ~{result.breakdown.perPersonCalculated} per person
                </p>
              </div>

            </div>

          </div>

          {/* INTERACTIVE MIDNIGHT NAVY ROUTE MAP */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
                  Geographic Route Visualization
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3D2B]">
                  Interactive Island Map & Flight Gateways
                </h3>
              </div>
              <p className="text-xs font-mono text-[#7A7365]">
                Real road pacing enforced: ≤ 3.5 hrs drive time per day
              </p>
            </div>

            <InteractiveDarkRouteMap
              itinerary={result.itinerary}
              currencyCode={result.breakdown.currency}
              departureCity={result.intent.departureCity || "Mumbai"}
              selectedDay={selectedDay}
              onSelectDay={(dayNum) => {
                setSelectedDay(dayNum);
                const el = document.getElementById(`day-card-${dayNum}`);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
            />
          </div>

          {/* DAY-BY-DAY VISUAL ROUTE TIMELINE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
                  Optimized Transfer Flow
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3D2B]">
                  Day-by-Day Feasibility Timeline
                </h3>
              </div>
              <span className="text-xs font-mono text-[#7A7365]">
                {result.itinerary.length} Days Planned
              </span>
            </div>

            <div className="space-y-4">
              {result.itinerary.map((day) => (
                <div
                  key={day.day}
                  id={`day-card-${day.day}`}
                  className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all space-y-4 ${
                    selectedDay === day.day
                      ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-md"
                      : "border-[#E8E4D9] shadow-xs hover:border-[#1F3D2B]/30"
                  }`}
                >
                  {/* Top Day Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8E4D9]/60 gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-lg bg-[#1F3D2B] text-white text-xs font-mono font-bold">
                        Day {day.day}
                      </span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#1F3D2B]">
                        {day.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-[#5A5448] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#E8E4D9] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{day.drivingTime}</span>
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#1F3D2B] bg-[#EAF2ED] px-2.5 py-1 rounded-md border border-[#C5DAC9]">
                        {day.routeLeg}
                      </span>
                    </div>
                  </div>

                  {/* 3-Part Daily Plan */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4D9]/60 space-y-1">
                      <span className="font-mono font-bold text-[#1F3D2B] uppercase tracking-wider text-[10px] block">
                        🌅 Morning
                      </span>
                      <p className="text-[#5A5448] leading-relaxed">
                        {day.morning}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4D9]/60 space-y-1">
                      <span className="font-mono font-bold text-[#1F3D2B] uppercase tracking-wider text-[10px] block">
                        ☀️ Afternoon
                      </span>
                      <p className="text-[#5A5448] leading-relaxed">
                        {day.afternoon}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4D9]/60 space-y-1">
                      <span className="font-mono font-bold text-[#1F3D2B] uppercase tracking-wider text-[10px] block">
                        🌙 Evening
                      </span>
                      <p className="text-[#5A5448] leading-relaxed">
                        {day.evening}
                      </p>
                    </div>
                  </div>

                  {/* Footnotes: Photo Spot & Hotel Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-[#E8E4D9]/50 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-[#7A7365]">
                      <Camera className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span><strong>Photo Spot:</strong> {day.photoSpot}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAF8F3] text-[#8B6E28] font-bold border border-[#D4AF37]/30">
                        {day.hotelBadge}
                      </span>
                      <span className="font-semibold text-[#1F3D2B]">
                        {selectedHotels[day.day]?.name || day.hotelName}
                      </span>
                    </div>
                  </div>

                  {/* GOOGLE STAYS WIDGET (SUPABASE POWERED) */}
                  {day.hotelPriceLkr > 0 && (
                    <div className="pt-2">
                      <PlanTripStaysWidget
                        dayNumber={day.day}
                        destination={day.nightLocation.split("/")[0].trim()}
                        nightsCount={1}
                        currencyCode={result.breakdown.currency}
                        selectedHotelId={selectedHotels[day.day]?.id}
                        onSelectHotel={(hotel) => {
                          setSelectedHotels((prev) => ({
                            ...prev,
                            [day.day]: hotel
                          }));
                        }}
                      />
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM WHATSAPP CALL TO ACTION */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#1F3D2B] text-white border-2 border-[#D4AF37]/40 text-center space-y-5 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest block">
                Zero Obligation • Direct Concierge Verification
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
                Ready to Lock In This Exact Sri Lanka Journey?
              </h3>
              <p className="text-xs sm:text-base text-white/80 leading-relaxed font-light">
                Our local concierge verifies highway feasibility, secures your English-fluent licensed chauffeur, and checks 4★ Sea View room inventory within minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0d2235] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2.5 scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Entire Tour & Stays On-Site ➔</span>
              </button>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 fill-current" />
                <span>WhatsApp Concierge</span>
              </a>

              <button
                type="button"
                onClick={() => setIsFunnelOpen(true)}
                className="w-full sm:w-auto px-5 py-4 bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Multi-Step Funnel</span>
              </button>
            </div>

            <p className="text-[11px] text-white/60 font-mono">
              🔒 100% Free Consultation. No payment required until your chauffeur and hotel bookings are officially confirmed.
            </p>
          </div>

        </section>
      )}

      {/* WHY HYBRID AI MATTERS (EDUCATIONAL SECTION) */}
      <section className="py-16 md:py-20 bg-[#FAF8F5] border-t border-[#E8E4D9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              The Technology Difference
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1F3D2B]">
              Why Generic AI Fails on Sri Lanka Travel
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5448]">
              Standard ChatGPT or generic travel bots don't understand Sri Lanka's geography or real market rates. Here is why our Rule-Engine architecture protects your vacation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-[#E8E4D9] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold text-sm">
                ❌
              </div>
              <h4 className="font-serif font-bold text-base text-[#1F3D2B]">
                Generic AIs Ignore Road Pacing
              </h4>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                ChatGPT regularly suggests pairing Jaffna with Galle or driving from Kandy to Yala on a 2-day trip—forcing travelers into exhausting 8-hour road trips on winding mountain passes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8E4D9] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <h4 className="font-serif font-bold text-base text-[#1F3D2B]">
                Our ≤ 3.5h Drive Guarantee
              </h4>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Our constraint matrix limits transit legs to a maximum of 3.5 hours per day, guaranteeing you spend your vacation lounging on beaches and exploring forts rather than stuck in traffic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8E4D9] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm">
                💰
              </div>
              <h4 className="font-serif font-bold text-base text-[#1F3D2B]">
                Real Verified Business Pricing
              </h4>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                We calculate real chauffeur day rates (~LKR 11,500/day) and verified 4★ Sea View stays (~LKR 20,000/night with breakfast), converting directly to INR, USD, EUR or GBP with zero hidden surprises.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-16 md:py-20 border-t border-[#E8E4D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              Frequently Asked Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              How the Plan My Trip Tool Works
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Is this AI trip planning tool free to use?",
                a: "Yes, 100% free. You can type any number of itineraries, tweak your budget in INR, USD, EUR, or GBP, and receive tailored road plans without paying any software subscription or upfront fee."
              },
              {
                q: "What is included in the private chauffeur cost?",
                a: "The chauffeur rate (approx. LKR 11,500 per day / ~₹3,200 INR) is all-inclusive. It covers an air-conditioned tourist sedan or van, all fuel, highway expressway tolls, driver accommodation, driver meals, and comprehensive passenger insurance."
              },
              {
                q: "Can I book 'Driver Only' if I prefer to arrange my own hotels?",
                a: "Absolutely. In the prompt box, simply type 'driver only' or 'car only'. The engine will zero out the hotel accommodation cost and calculate strictly the transport fee for your route."
              },
              {
                q: "How do I confirm this itinerary into a real booking?",
                a: "Click the 'Lock Route On WhatsApp' button. Your complete itinerary and price breakdown will be sent directly to our local concierge team on WhatsApp (+94 72 296 8210). We verify room inventory, confirm vehicle type, and finalize your booking with zero deposit pressure."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E8E4D9] bg-white overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1F3D2B] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A7365] transition-transform duration-200 shrink-0 ${
                      activeFaq === idx ? "rotate-180 text-[#D4AF37]" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#5A5448] leading-relaxed border-t border-[#E8E4D9]/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FULL MODAL FALLBACK */}
      <InteractiveRouteFunnelModal
        isOpen={isFunnelOpen}
        onClose={() => setIsFunnelOpen(false)}
      />

      {/* DIRECT ON-SITE BOOKING MODAL */}
      {result && (
        <OnSiteBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          itinerary={result.itinerary}
          selectedHotels={selectedHotels}
          totalDays={result.intent.days}
          totalCost={result.breakdown.totalCalculated}
          currencyCode={result.breakdown.currency}
        />
      )}

    </div>
  );
}
