import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart, 
  Sparkles, 
  CheckCircle,
  HelpCircle, 
  Send,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Award,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ThumbsUp,
  X,
  Map,
  BookOpen
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

// Definition of standard routes based on user attributes
interface RouteOutcome {
  id: string;
  name: string;
  duration: string;
  drivingTimeOptimized: string;
  drivingTimeStandard: string;
  timeSaved: string;
  suitability: string;
  bestMonths: string;
  stops: {
    name: string;
    description: string;
    highlights: string[];
  }[];
  whyItWorks: string;
  experienceHours: string;
  transitPercentage: number; // optimized percentage of transit vs standard
  indianTravelerProTip: string;
}

const ROUTE_OUTCOMES: Record<string, RouteOutcome> = {
  east_beach_safari: {
    id: "east_beach_safari",
    name: "The East Coast & Cultural Triangle Cluster",
    duration: "8 - 10 Days",
    drivingTimeOptimized: "9h Travel",
    drivingTimeStandard: "16h Travel",
    timeSaved: "7 Hours Saved",
    suitability: "Honeymooners, Active Families, Sealife Lovers",
    bestMonths: "May to September (Perfect June choice!)",
    stops: [
      { name: "Sigiriya & Dambulla", description: "Day 1-3", highlights: ["Symmetric palace gardens", "Minneriya wild elephants", "Sunrise rock fortress hikes"] },
      { name: "Kandy Hill Country", description: "Day 4", highlights: ["Spicery reserves", "Sacred Temple of the Tooth", "Riverside dining"] },
      { name: "Trincomalee & Nilaveli", description: "Day 5-8", highlights: ["Pigeon Island swim", "Ocean dolphin spotter cruise", "Flat sea snorkeling"] }
    ],
    whyItWorks: "By substituting the southwest coat with Trincomalee during the middle months, you enjoy glass-flat ocean waves, dry sunny skies, and bypass 300+ kilometers of slow mountain bypass curves.",
    experienceHours: "48 Hours Leisure Screen Time",
    transitPercentage: 42,
    indianTravelerProTip: "Direct IndiGo or Air India flights to Colombo (BIA) align perfectly with our pre-vetted private drivers who'll meet you right at arrivals for a smooth transit to Sigiriya."
  },
  south_west_classic: {
    id: "south_west_classic",
    name: "The South-West Heritage Loop",
    duration: "7 - 9 Days",
    drivingTimeOptimized: "8h Travel",
    drivingTimeStandard: "15h Travel",
    timeSaved: "7 Hours Saved",
    suitability: "First-time visitors, Toddler Families, Beach party lovers",
    bestMonths: "December to March (Winter Glow)",
    stops: [
      { name: "Colombo Heritage", description: "Day 1", highlights: ["Lotus Tower overlooks", "Galle Face Green bites", "Boutique resthouses"] },
      { name: "Bentota & Galle Fort", description: "Day 2-4", highlights: ["Colonial stone alleys", "Sea turtle sanctuary visits", "Madu Ganga boat river tour"] },
      { name: "Weligama & Mirissa", description: "Day 5-8", highlights: ["Gentle surf training", "Whale watching cruises", "Crescent bay lounging"] }
    ],
    whyItWorks: "Utilizing the multi-lane Southern Expressway reduces driving fatigue significantly. No backtracking. We skip interior highlands to allow maximum sunbed time.",
    experienceHours: "52 Hours Active Beach Fun",
    transitPercentage: 45,
    indianTravelerProTip: "Ideal for travelers departing from Mumbai, Bengaluru, or Chennai who need a quick, premium beach escape without heavy mountain sickness risk."
  },
  total_highland_adventure: {
    id: "total_highland_adventure",
    name: "The Central Peaks & Wildlife Corridor",
    duration: "10 - 14 Days",
    drivingTimeOptimized: "14h Travel",
    drivingTimeStandard: "23h Travel",
    timeSaved: "9 Hours Saved",
    suitability: "Hikers, Couples, Tea Enthusiasts, Wildlife Photographers",
    bestMonths: "Year-Round (Best January to April)",
    stops: [
      { name: "Kandy Mountains", description: "Day 1-2", highlights: ["Royal botanical garden walks", "Traditional tea plantation views"] },
      { name: "Nuwara Eliya & Ella", description: "Day 3-6", highlights: ["Scenic blue train ride", "Little Adam's Peak trek", "Nine Arch bridge photography"] },
      { name: "Yala National Park", description: "Day 7-9", highlights: ["Leopard tracking morning safari", "Luxury glamping camps"] },
      { name: "Galle Colonial Coast", description: "Day 10-12", highlights: ["Historic rampart walks", "Sunset sea-view dinings"] }
    ],
    whyItWorks: "This route links destinations linearly. Instead of zig-zagging in and out of the mountains, we coordinate hotel check-ins along the scenic railroad, transforming transit time into an experience.",
    experienceHours: "65 Hours Explorer Time",
    transitPercentage: 55,
    indianTravelerProTip: "The mountains are chilly (temperatures drop to 12°C in Nuwara Eliya). Pack warm knitwear or a fleece jacket for early morning safaris."
  }
};

export default function SrilankaTripPlannerPage() {
  const navigate = useNavigate();
  const quizSectionRef = useRef<HTMLDivElement>(null);

  // Active planning parameters chosen by user
  const [currentStep, setCurrentStep] = useState(1);
  const [vacationDays, setVacationDays] = useState<string>("8-10"); // "5-7", "8-10", "11+"
  const [companion, setCompanion] = useState<string>("couple"); // "couple", "family", "solo", "friends"
  const [season, setSeason] = useState<string>("june-sept"); // "june-sept", "dec-march", "anytime"
  const [priority, setPriority] = useState<string>("mix"); // "beach", "culture", "nature", "mix"

  const [wizardComplete, setWizardComplete] = useState(false);
  const [matchedRoute, setMatchedRoute] = useState<RouteOutcome>(ROUTE_OUTCOMES.east_beach_safari);

  // Lead capture state
  const [leadForm, setLeadForm] = useState({
    name: "",
    whatsapp: "",
    departureCity: "Mumbai",
    estimatedBudget: "luxury",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Smooth scroll to quiz
  const scrollToQuiz = () => {
    trackEvent("trip_planner_hero_cta_click", "engagement", "build_my_route");
    quizSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Determine the recommended route recommendation on final form selection
  const processRouteSelection = () => {
    trackEvent("trip_planner_quiz_complete", "planner", `${vacationDays}_${companion}_${season}`);
    
    // Simple robust rules engine to evaluate matching route
    if (season === "june-sept") {
      setMatchedRoute(ROUTE_OUTCOMES.east_beach_safari);
    } else if (companion === "family" && vacationDays === "5-7") {
      setMatchedRoute(ROUTE_OUTCOMES.south_west_classic);
    } else if (vacationDays === "11+" || priority === "nature") {
      setMatchedRoute(ROUTE_OUTCOMES.total_highland_adventure);
    } else {
      // Default to high-satisfaction south-west loop or customized cluster
      setMatchedRoute(ROUTE_OUTCOMES.south_west_classic);
    }
    setWizardComplete(true);
  };

  // Handle lead generation form
  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whatsapp) return;

    setIsSubmitting(true);
    trackEvent("trip_planner_lead_submit_start", "conversion", leadForm.estimatedBudget);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      trackEvent("trip_planner_lead_submit_success", "conversion", leadForm.estimatedBudget);
      
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
    }, 1200);
  };

  const resetPlanner = () => {
    setCurrentStep(1);
    setWizardComplete(false);
    setSubmitSuccess(false);
    trackEvent("trip_planner_reset", "planner", "reset");
  };

  return (
    <div className="bg-[#FAF9F5] text-[#1e3a2f] min-h-screen font-sans overflow-x-hidden">
      <Helmet>
        <title>Sri Lanka Private Trip & Route Planner (2026) | Vibe Tour</title>
        <meta name="description" content="Stop wasting precious travel days in slow vehicles! Match your vacation length, month, and style to the perfect, vetted Sri Lanka cluster. Route planner." />
        <link rel="canonical" href="https://plan-srilanka.com/sri-lanka-trip-planner" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plan-srilanka.com/sri-lanka-trip-planner" />
        <meta property="og:title" content="Bespoke Sri Lanka Route & Trip Planner | Vibe Tour" />
        <meta property="og:description" content="An interactive intelligence decision tool built specifically to help travelers choose the correct climatic side of Sri Lanka. Save up to 7+ transit hours." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sri Lanka Private Trip & Route Planner (2026)" />
        <meta name="twitter:description" content="Match your vacation parameters to the ultimate optimized loop. Minimize driving exhaustion, maximize sandy beaches." />
        
        {/* JSON-LD breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://plan-srilanka.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Trip Planner",
                "item": "https://plan-srilanka.com/sri-lanka-trip-planner"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* SECTION 1: HERO */}
      <section className="relative pt-20 pb-16 md:pt-36 md:pb-24 border-b border-[#1e3a2f]/5 overflow-hidden bg-gradient-to-b from-[#1e3a2f]/10 to-transparent">
        {/* Decorative background grid vector lines */}
        <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(to_right,#1e3a2f0a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a2f0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent)]" />
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative space-y-8 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 text-[#2c5342] text-xs font-mono uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Climatic Intelligence Engine (V.3)
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7.5xl font-serif text-[#1e3a2f] tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Plan Your Sri Lanka Trip
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
            Get the best Sri Lanka route based on your unique travel style, available time, climate seasons, and personal interests. Stop booking the wrong coast.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={scrollToQuiz}
              className="w-full sm:w-auto px-8 py-4 bg-[#1e3a2f] hover:bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Build My Route <ArrowRight className="w-4 h-4 text-[#d4af37]" />
            </button>
            <a
              href="#saved-time"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-50 text-[#1e3a2f] font-semibold uppercase tracking-widest text-xs rounded-full border border-[#1e3a2f]/10 transition-all text-center"
            >
              See Time Savings
            </a>
          </div>

          {/* Key Quick Value Badges */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            {[
              { title: "No Vehicles Backtrack", desc: "Linear optimized loops" },
              { title: "Monsoon Filter", desc: "Always hit dry beach days" },
              { title: "Toddler Approved", desc: "Maximum 3-hour transits" },
              { title: "Private Drivers Vetted", desc: "Verified english guides" }
            ].map((badge, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-neutral-100 flex items-start gap-2.5 shadow-sm">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold text-[#1e3a2f] leading-tight">{badge.title}</h4>
                  <p className="text-[10px] text-neutral-500">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: VACATION TIME SAVED COMPARISON */}
      <section id="saved-time" className="py-16 md:py-24 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
              Core Optimization Metrics
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f] tracking-tight">
              Spend Less Time in Vehicles, More Time in Nature
            </h2>
            <p className="text-xs md:text-sm text-[#5a7065] font-light max-w-2xl mx-auto">
              Most standard travel routes offered by online general agencies zig-zag inefficiently. See how our bespoke route clustering actively redeems holiday moments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Recommended Route Card */}
            <div className="relative bg-[#1e3a2f] text-white p-6 rounded-3xl space-y-4 shadow-xl border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-[#d4af37]/20 text-[#d4af37] text-[9px] uppercase tracking-widest font-mono font-bold rounded-bl-xl">
                Bespoke Path
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37]">Recommended Route</span>
                <h3 className="text-3xl font-serif font-bold text-[#fcfbf7]">8h Travel</h3>
              </div>
              <p className="text-xs text-[#a4c9b7] font-light leading-relaxed">
                Linear clustering keeps drive segments comfortable. You sleep within target circles, avoiding multi-hour repeat mountain transits.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-[#d4af37] font-mono">
                <CheckCircle className="w-4 h-4 text-[#d4af37]" /> No backtracking fatigue
              </div>
            </div>

            {/* Popular Route Card */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Standard Agency</span>
                  <h3 className="text-2xl font-serif font-semibold text-neutral-400">15h Travel</h3>
                </div>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Typical pre-packaged round tours attempt to cover both Mirissa beaches and Anuradhapura heritage concurrently inside standard 8-day parameters.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-red-600 font-mono">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Constant packing & long transits
              </div>
            </div>

            {/* Math Savings Card */}
            <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 border border-[#d4af37]/30 p-6 rounded-3xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#2c5342] font-bold block">Exclusive Dividend</span>
                <span className="text-4xl font-serif italic text-[#1e3a2f] font-bold block">You Save: 7 Hours</span>
                <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
                  Redeem 7 entire hours of driving stress. That translates directly to an extra half day soaking in Nilaveli beach or watching giant blue whales skip.
                </p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-[#d4af37]/20 text-[10px] font-mono text-[#1e3a2f] text-center">
                ✨ Worth 1 Extra Sunset Cocktail session
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DECISION ASSISTANT INTERACTIVE WIZARD */}
      <section ref={quizSectionRef} className="py-20 px-4 md:px-8 bg-[#f5f2e8]/35 border-b border-[#1e3a2f]/5">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Step-By-Step Interactive Finder
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1e3a2f] tracking-tight">
              Sri Lanka Decision Assistant
            </h2>
            <p className="text-xs md:text-sm text-[#4c5c53] font-light max-w-xl mx-auto">
              Answer 4 brief context query questions. Our custom algorithm identifies your optimal geographical cluster, weather safety rating, and total transit reduction.
            </p>
          </div>

          {/* QUIZ INTERFACE WALKTROUGH */}
          <div className="bg-white rounded-3xl border border-[#1e3a2f]/10 shadow-2xl p-6 md:p-10 relative overflow-hidden">
            {/* Step indicators */}
            {!wizardComplete && (
              <div className="flex justify-between items-center pb-6 border-b border-neutral-100 mb-8">
                <span className="text-xs font-mono uppercase text-neutral-400">Question {currentStep} of 4</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((stepNum) => (
                    <div 
                      key={stepNum} 
                      className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                        currentStep === stepNum ? "bg-[#1e3a2f] w-12" : currentStep > stepNum ? "bg-emerald-600" : "bg-neutral-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {!wizardComplete ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* STEP 1: VACATION DAYS AVAILABLE */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-serif text-[#1e3a2f] font-semibold">How many days do you have allocated for Sri Lanka?</h3>
                        <p className="text-xs text-neutral-500">Duration affects how far north or east we can safely expand your private transfer lines.</p>
                      </div>
                      <div className="grid gap-3">
                        {[
                          { key: "5-7", title: "5 - 7 Days (Short Escape)", desc: "Best for quick regional focus. Strict cluster safety recommended." },
                          { key: "8-10", title: "8 - 10 Days (Ideal First Holiday)", desc: "Enables combining culture triangles and pristine private beaches comfortably." },
                          { key: "11+", title: "11 - 14 Days (Ultimate Experience)", desc: "Complete loop including tea highlands, south coasts, and safaris." }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => {
                              setVacationDays(opt.key);
                              setCurrentStep(2);
                              trackEvent("trip_planner_step_1", "planner", opt.key);
                            }}
                            className={`p-5 rounded-2xl border text-left transition-all flex justify-between items-center group ${
                              vacationDays === opt.key 
                                ? "bg-[#1e3a2f] text-white border-[#1e3a2f]" 
                                : "bg-[#FAF9F5] hover:bg-neutral-50 border-[#1e3a2f]/10"
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="font-serif font-bold text-sm block">{opt.title}</span>
                              <span className={`text-[11px] leading-normal block ${vacationDays === opt.key ? "text-white/70" : "text-neutral-500"}`}>
                                {opt.desc}
                              </span>
                            </div>
                            <ChevronRight className={`w-5 h-5 shrink-0 ${vacationDays === opt.key ? "text-[#d4af37]" : "text-neutral-300 group-hover:translate-x-1 transition-transform"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: WITH WHOM ARE YOU TRAVELING? */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-serif text-[#1e3a2f] font-semibold">Who are your co-travelers?</h3>
                        <p className="text-xs text-neutral-500">Crucial for matching shallow-sea safety criteria and mountain altitude curve limits.</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { key: "couple", title: "Couple / Honeymoon", icon: "❤️" },
                          { key: "family", title: "Family with Kids", icon: "👶" },
                          { key: "friends", title: "With Friends / Group", icon: "✈️" },
                          { key: "solo", title: "Active Solo Wanderer", icon: "🧭" }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => {
                              setCompanion(opt.key);
                              setCurrentStep(3);
                              trackEvent("trip_planner_step_2", "planner", opt.key);
                            }}
                            className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between h-32 ${
                              companion === opt.key 
                                ? "bg-[#1e3a2f] text-white border-[#1e3a2f]" 
                                : "bg-[#FAF9F5] hover:bg-neutral-50 border-[#1e3a2f]/10"
                            }`}
                          >
                            <span className="text-2xl leading-none">{opt.icon}</span>
                            <div className="flex justify-between items-center w-full mt-auto">
                              <span className="font-serif font-bold text-sm">{opt.title}</span>
                              <ChevronRight className={`w-4 h-4 ${companion === opt.key ? "text-[#d4af37]" : "text-neutral-300"}`} />
                            </div>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setCurrentStep(1)} className="text-xs font-mono text-[#1e3a2f]/60 hover:text-[#1e3a2f] flex items-center gap-1">
                        ← Back to Previous Step
                      </button>
                    </div>
                  )}

                  {/* STEP 3: SEASON OF TRAVEL */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-serif text-[#1e3a2f] font-semibold">When is your scheduled departure?</h3>
                        <p className="text-xs text-neutral-500">We filter out heavy rain zones automatically according to our dual weather cycle map.</p>
                      </div>
                      <div className="grid gap-3">
                        {[
                          { key: "june-sept", title: "May to September (June Peak)", desc: "Dry North & East Coast. Ideal for Trincomalee snorkeling." },
                          { key: "dec-march", title: "November to March (Winter Peak)", desc: "Dry South & West Coast. Perfect for Mirissa whale sightings." },
                          { key: "anytime", title: "April, October or Undecided Shoulder", desc: "Dynamic transition months with highly unique cost values." }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => {
                              setSeason(opt.key);
                              setCurrentStep(4);
                              trackEvent("trip_planner_step_3", "planner", opt.key);
                            }}
                            className={`p-5 rounded-2xl border text-left transition-all flex justify-between items-center group ${
                              season === opt.key 
                                ? "bg-[#1e3a2f] text-white border-[#1e3a2f]" 
                                : "bg-[#FAF9F5] hover:bg-neutral-50 border-[#1e3a2f]/10"
                            }`}
                          >
                            <div className="space-y-1">
                              <span className="font-serif font-bold text-sm block">{opt.title}</span>
                              <span className={`text-[11px] block ${season === opt.key ? "text-white/70" : "text-neutral-500"}`}>
                                {opt.desc}
                              </span>
                            </div>
                            <ChevronRight className={`w-5 h-5 shrink-0 ${season === opt.key ? "text-[#d4af37]" : "text-neutral-300"}`} />
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setCurrentStep(2)} className="text-xs font-mono text-[#1e3a2f]/60 hover:text-[#1e3a2f] flex items-center gap-1">
                        ← Back to Previous Step
                      </button>
                    </div>
                  )}

                  {/* STEP 4: PRIMARY INTEREST / EMOTIONAL MOTIVATOR */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-serif text-[#1e3a2f] font-semibold">What experience matters most to you?</h3>
                        <p className="text-xs text-neutral-500">Ensures we match the correct balance of hiking vs lazy sandy water lounges.</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { key: "beach", title: "Fine Beaches & Water Safaris", desc: "Snorkeling, swimming, coral life" },
                          { key: "culture", title: "Heritage, Forts & Old Kingdoms", desc: "Royal antiquities, old temples" },
                          { key: "nature", title: "Tea Highlands & Wildlife Safaris", desc: "Mountain trains, leopards, hikes" },
                          { key: "mix", title: "A Curated Classic Mix of Everything", desc: "The ultimate baseline overview" }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => {
                              setPriority(opt.key);
                              trackEvent("trip_planner_step_4", "planner", opt.key);
                              // Calculate and finalize
                              setTimeout(() => {
                                processRouteSelection();
                              }, 150);
                            }}
                            className="p-5 rounded-2xl border text-left transition-all bg-[#FAF9F5] hover:bg-neutral-100 border-[#1e3a2f]/10 group flex flex-col justify-between min-h-[110px]"
                          >
                            <span className="font-serif font-bold text-sm text-[#1e3a2f] group-hover:text-emerald-800 transition-colors">{opt.title}</span>
                            <span className="text-[10px] text-neutral-500 mt-2 block">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setCurrentStep(3)} className="text-xs font-mono text-[#1e3a2f]/60 hover:text-[#1e3a2f] flex items-center gap-1">
                        ← Back to Previous Step
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* OUTCOME MATCH RESULTS CARD */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <span className="text-xs font-mono uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                      ✓ Optimization Match Found
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-[#1e3a2f] font-bold">
                      {matchedRoute.name}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Vetted dynamic transit routing for <strong className="text-neutral-700">{vacationDays} Days</strong>, structured for {companion === "couple" ? "Romantic couples" : companion === "family" ? "Families with kids" : "Active travelers"}.
                    </p>
                  </div>

                  {/* Savings Comparison Block */}
                  <div className="bg-[#1e3a2f] rounded-2xl p-6 text-white grid sm:grid-cols-3 gap-4 text-center items-center">
                    <div>
                      <span className="text-[10px] text-emerald-400 uppercase font-mono block">Vibe Tour Path</span>
                      <span className="text-xl font-bold font-serif text-white">{matchedRoute.drivingTimeOptimized}</span>
                    </div>
                    <div className="border-t sm:border-t-0 sm:border-x border-white/10 py-2">
                      <span className="text-[10px] text-[#d4af37] uppercase font-mono block">Backtrack Cost Saved</span>
                      <span className="text-xl font-bold font-serif text-[#d4af37]">{matchedRoute.timeSaved}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-mono block">Standard Agency</span>
                      <span className="text-base text-neutral-300 line-through font-serif">{matchedRoute.drivingTimeStandard}</span>
                    </div>
                  </div>

                  {/* Route Highlights / Stops */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Day-By-Day Route Core Clusters:</h4>
                    <div className="grid gap-3 font-sans">
                      {matchedRoute.stops.map((stop, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
                          <div className="w-8 h-8 rounded-full bg-[#1e3a2f]/10 text-[#1e3a2f] font-serif font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </div>
                          <div className="space-y-1">
                            <span className="font-serif font-bold text-sm text-[#1e3a2f] block">{stop.name} <span className="text-xs text-neutral-400 font-normal">({stop.description})</span></span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {stop.highlights.map((h, hIdx) => (
                                <span key={hIdx} className="text-[9px] bg-white border border-neutral-100 px-2 py-0.5 rounded-md text-neutral-600 font-mono">
                                  ✦ {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why it works */}
                  <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl text-xs text-[#1e3a2f] space-y-1 leading-relaxed">
                    <span className="font-bold flex items-center gap-1.5 text-amber-900 font-serif">
                      <Compass className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: "12s" }} /> Strategy Decision Analysis:
                    </span>
                    <p className="font-light text-neutral-700">{matchedRoute.whyItWorks}</p>
                  </div>

                  {/* Indian pro tip */}
                  <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl text-xs text-emerald-950 space-y-1 leading-relaxed">
                    <span className="font-bold text-emerald-900 font-mono text-[10px] uppercase block">
                      🇮🇳 INDIAN TRAVELER PRO-TIP:
                    </span>
                    <p className="font-light text-emerald-900">{matchedRoute.indianTravelerProTip}</p>
                  </div>

                  {/* Lead Generation Capture for results integration */}
                  <div id="capture-box" className="p-6 md:p-8 rounded-3xl bg-neutral-50/90 border border-[#1e3a2f]/10 space-y-6">
                    <div className="space-y-2 text-center sm:text-left">
                      <h4 className="font-serif font-bold text-lg text-[#1e3a2f]">Secure Your Full PDF Digital Map & Price Calculation</h4>
                      <p className="text-xs text-[#4e5c53] leading-relaxed">
                        Input your direct contact detail to receive our comprehensive hotel recommendations, driver quotes, and free direct booking rates with zero middlemen charges.
                      </p>
                    </div>

                    {!submitSuccess ? (
                      <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">Your Name</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Adithya Sharma"
                              value={leadForm.name}
                              onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-[#1e3a2f] outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">WhatsApp Number (For Route Delivery)</label>
                            <input 
                              type="tel" 
                              required
                              placeholder="e.g. +91 98765 43210"
                              value={leadForm.whatsapp}
                              onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-[#1e3a2f] outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">Departure Indian Airport</label>
                            <input 
                              type="text"
                              value={leadForm.departureCity}
                              onChange={(e) => setLeadForm({...leadForm, departureCity: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-[#1e3a2f] outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">Preferred Budget Class</label>
                            <select 
                              value={leadForm.estimatedBudget}
                              onChange={(e) => setLeadForm({...leadForm, estimatedBudget: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-[#1e3a2f] outline-none bg-white"
                            >
                              <option value="luxury">Ultra-Luxury Boutique (5 Star Pools)</option>
                              <option value="premium">Premium Curated (4 Star Heritage)</option>
                              <option value="organic">Authentic Wilderness & Eco-lodges</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-[#1e3a2f] hover:bg-neutral-900 text-white font-bold uppercase tracking-widest text-[#1e3a2f] text-xs rounded-full transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin text-[#d4af37]" /> Generating Custom Route Pack...
                            </>
                          ) : (
                            <>
                              Download Custom Itinerary Map (WhatsApp) <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                        <h5 className="font-serif font-bold text-emerald-950 text-base">Route Pack Generated Successfully!</h5>
                        <p className="text-xs text-emerald-900 font-light leading-relaxed">
                          We have registered your details. A Vibe Tour Sri Lanka travel designer will forward your custom-mapped <strong>{matchedRoute.name}</strong> blueprint directly to your WhatsApp at <span className="font-bold">{leadForm.whatsapp}</span> shortly.
                        </p>
                        <a 
                          href="https://wa.me/94722968210"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-full font-bold text-[11px] uppercase tracking-wider hover:bg-emerald-700 transition-all mt-2"
                        >
                          Connect Immediately via WhatsApp
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Reset decision assistant */}
                  <div className="text-center pt-4">
                    <button 
                      onClick={resetPlanner}
                      className="text-xs font-mono text-[#1e3a2f]/60 hover:text-[#1e3a2f] underline inline-flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Plan Another Custom Route Sequence
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTEXTUAL STRATEGIC ADVICE */}
      <section className="py-20 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
              Proactive Destination Guidelines
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              Before You Book: The Golden Rules of Sri Lanka Travel
            </h2>
            <p className="text-xs md:text-sm text-[#4c5c53] font-light">
              Designing trips to South Asia shouldn't rely on random TripAdvisor forums. Adhere to these three fundamental strategic protocols formulated by our on-site expert dispatch desk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-2xl">01</span>
              <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Avoid 1-Night Hotel Stays</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Packing bags, processing hotel check-ins, and repeating checkout procedures daily destroys vacation rhythm. Seek centered clusters of minimum 2 to 3 nights to allow peaceful decompression.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-2xl">02</span>
              <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Respect the Mountain Speed Limits</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Do not evaluate geography via Google Map distance equations. Sri Lanka's high country roads are tight, single-lane, and winding. A 75km mountain drive takes 2 and a half hours.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-2xl">03</span>
              <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Select Dedicated Private Drivers</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Public transport buses are fast but crowded, and local tuk-tuks are not designed for multi-hour intercity luggage travel. A vetted private car with stable AC is essential to avoid fatigue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SECONDARY CALL-TO-ACTION */}
      <section className="py-16 md:py-24 px-4 bg-[#1e3a2f] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.1),transparent_40%)]" />
        <div className="max-w-3xl mx-auto space-y-6 relative">
          <Award className="w-8 h-8 text-[#d4af37] mx-auto animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-serif text-white">Let Our Experts Craft Your Perfect Loop</h2>
          <p className="text-xs md:text-sm text-[#a3bfae] font-light max-w-xl mx-auto leading-relaxed">
            Ready to completely bypass the stress of plan coordination? Our Colombo and London design team is waiting to coordinate your entire private private-car journey.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/94722968210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-[#1e3a2f] text-xs rounded-full shadow-lg transition-all inline-block"
            >
              Start Personal Consultation via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
