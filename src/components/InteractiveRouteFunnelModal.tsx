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
  Check
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
    image: '/Kandy-Tourism-Richard.jpg' 
  },
  { 
    id: 'wellness', 
    name: 'Wellness & Ayurveda', 
    desc: 'Ayurvedic spas, yoga & retreats', 
    image: '/Nilaveli-Beach-background-image.jpg' 
  },
  { 
    id: 'photography', 
    name: 'Photography & Insta Spots', 
    desc: 'Nine Arch Bridge, Pidurangala & views', 
    image: '/Hiking-to-Sacred-Adams-Peak-Sri-Lanka.jpeg' 
  }
];

const DURATION_OPTIONS = ["5 Days", "7 Days", "10 Days", "Custom ✏️"];

const GROUP_OPTIONS = [
  { id: "Solo", label: "Solo Traveler", icon: "🎒" },
  { id: "Couple", label: "Couple / Romantic", icon: "💑" },
  { id: "Family / Friends", label: "Family / Group", icon: "👨‍👩‍👧‍👦" },
];

const BUDGET_TIERS = [
  { id: "Budget (₹30k–₹45k)", title: "Budget Tier", range: "₹30k – ₹45k", desc: "Cozy guesthouses & scenic train loops" },
  { id: "Comfort (₹45k–₹65k)", title: "Comfort Tier ⭐", range: "₹45k – ₹65k", desc: "3-4★ Boutique villas & AC private car" },
  { id: "Luxury (₹65k+)", title: "Luxury Tier", range: "₹65k+", desc: "5★ Beach resorts & colonial tea estates" },
];

export default function InteractiveRouteFunnelModal({ isOpen, onClose }: InteractiveRouteFunnelModalProps) {
  // Funnel Step: 1, 2, "loading", 3, "success"
  const [step, setStep] = useState<1 | 2 | "loading" | 3 | "success">(1);

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

  // Step 2 State
  const [groupType, setGroupType] = useState<string>("Couple");
  const [budgetTier, setBudgetTier] = useState<string>("Comfort (₹45k–₹65k)");

  // Micro-SaaS Loading simulation message index
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  // Step 3 State
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
        setStep(3);
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
    }, 300);
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
    trackEvent("funnel_step_1_complete", "engagement", "chennai_cost_funnel");
    setStep(2);
  };

  const handleStep2Validate = () => {
    trackEvent("funnel_step_2_validate", "engagement", "chennai_cost_funnel");
    setStep("loading");
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      setFormError("Please enter your name and WhatsApp number.");
      return;
    }

    setFormError("");
    trackEvent("funnel_step_3_submit", "conversion", "chennai_cost_funnel");

    // Find selected vibe display name
    const vibeObj = TRIP_VIBES.find((v) => v.id === selectedVibe);
    const vibeName = vibeObj ? vibeObj.name : selectedVibe;

    // Format WhatsApp message
    const message = `Hi Plan Sri Lanka! 🚀 I used your Route Feasibility Tool for my Chennai trip.
    
📌 *My Route Configuration:*
• *Trip Vibe:* ${vibeName}
• *Destinations:* ${selectedDestinations.join(", ")}
• *Duration:* ${selectedDays}
• *Group Type:* ${groupType}
• *Budget Tier:* ${budgetTier}

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

          {/* PROGRESS INDICATOR (Steps 1, 2, 3) */}
          {step !== "loading" && step !== "success" && (
            <div className="bg-[#FAF8F3] px-6 py-3 border-b border-[#E8E4D9] flex items-center justify-between shrink-0 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 1 ? "bg-[#1F3D2B] text-[#D4AF37]" : "bg-[#1F3D2B]/10 text-[#1F3D2B]"}`}>
                  1
                </span>
                <span className={`font-semibold ${step === 1 ? "text-[#1F3D2B]" : "text-[#7A7365]"}`}>Vibe & Destinations</span>
              </div>
              <div className="h-0.5 w-8 bg-[#E8E4D9] hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 2 ? "bg-[#1F3D2B] text-[#D4AF37]" : "bg-[#1F3D2B]/10 text-[#1F3D2B]"}`}>
                  2
                </span>
                <span className={`font-semibold ${step === 2 ? "text-[#1F3D2B]" : "text-[#7A7365]"}`}>Travelers & Budget</span>
              </div>
              <div className="h-0.5 w-8 bg-[#E8E4D9] hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${step === 3 ? "bg-[#1F3D2B] text-[#D4AF37]" : "bg-[#1F3D2B]/10 text-[#1F3D2B]"}`}>
                  3
                </span>
                <span className={`font-semibold ${step === 3 ? "text-[#1F3D2B]" : "text-[#7A7365]"}`}>WhatsApp Delivery</span>
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
                    <span>Next: Travelers & Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: GROUP TYPE & BUDGET */}
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
                    Step 2: Group Composition & Target Budget
                  </label>
                  <p className="text-xs text-[#5A5448]">
                    Specify your group type and comfort budget tier:
                  </p>
                </div>

                {/* Group Types */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold text-[#7A7365] block">
                    Group Type:
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {GROUP_OPTIONS.map((grp) => (
                      <button
                        key={grp.id}
                        type="button"
                        onClick={() => setGroupType(grp.id)}
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
                </div>

                {/* Budget Tiers */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold text-[#7A7365] block">
                    Budget Tier (Per Pax):
                  </span>
                  <div className="space-y-2.5">
                    {BUDGET_TIERS.map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setBudgetTier(tier.id)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          budgetTier === tier.id
                            ? "bg-[#1F3D2B] text-white border-[#1F3D2B] shadow-md"
                            : "bg-white border-[#E8E4D9] text-[#1A1A1A] hover:border-[#1F3D2B]"
                        }`}
                      >
                        <div>
                          <div className="font-serif font-bold text-sm leading-tight flex items-center gap-2">
                            <span>{tier.title}</span>
                          </div>
                          <p className={`text-xs mt-0.5 ${budgetTier === tier.id ? "text-white/80" : "text-[#7A7365]"}`}>
                            {tier.desc}
                          </p>
                        </div>
                        <span className={`font-mono font-bold text-xs px-3 py-1 rounded-full ${
                          budgetTier === tier.id ? "bg-[#D4AF37] text-[#1F3D2B]" : "bg-[#FAF8F3] text-[#1F3D2B]"
                        }`}>
                          {tier.range}
                        </span>
                      </button>
                    ))}
                  </div>
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
                    onClick={handleStep2Validate}
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

            {/* STEP 3: CONTACT & WHATSAPP DELIVERY */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="bg-[#F2F7F4] border border-[#C5DAC9] p-4 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">
                      Route Validated! ({selectedDays} • {selectedDestinations.length} Key Stops)
                    </h4>
                    <p className="text-xs text-[#5A5448] mt-0.5">
                      Your chosen route ({selectedDestinations.join(", ")}) is feasible with realistic drive times. Enter your WhatsApp below to receive the complete custom itinerary & price breakdown.
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
                      placeholder="e.g. Ramesh Kumar"
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
                      placeholder="e.g. ramesh@gmail.com"
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
                      placeholder="e.g. +91 98765 43210"
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
                      onClick={() => setStep(2)}
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
