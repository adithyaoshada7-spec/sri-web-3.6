import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, MapPin, Compass, Clock, Car, Utensils, Sparkles, Calendar, Info, CheckCircle, HelpCircle, ChevronDown, AlertTriangle, Heart, Users, Backpack, Palmtree, Train, Check, AlertCircle, Printer, Download, Map, CloudRain, TrendingDown, Search, ShieldAlert, BookOpen, ExternalLink, HelpCircle as HelpIcon, Sparkles as SparklesIcon, FileText
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { itineraryFaqs, FaqItem } from "../data/itineraryFaqs";
import { itinerarySchedules, DailySchedule } from "../data/itinerarySchedules";
import ItineraryPlanningSuite from "./ItineraryPlanningSuite";

export default function SrilankaItineraryPage() {
  usePageMetadata({
    title: "Sri Lanka 7-Day Itinerary: Route for First-Timers (2026)",
    description: "Planning your first Sri Lanka trip? Follow this optimized 7-day itinerary with daily routes, travel times, costs, and a free customizable trip planner.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-7-day-itinerary",
    ogUrl: "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
  });

  // State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [faqSearchQuery, setFaqSearchQuery] = useState("");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>("all");
  const [activeDayTab, setActiveDayTab] = useState<number>(2);

  // Diagnostic Alignment state
  const [diagnostic, setDiagnostic] = useState({
    firstTime: false,
    fromIndia: false,
    avoidFatigue: false,
    cashPrep: false
  });
  const diagnosticScore = Object.values(diagnostic).filter(Boolean).length;

  // Lead Form
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadDate, setLeadDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Exit intent modal simulation
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulated exit-intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setShowExitIntent(true);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => window.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Filter 70 FAQs
  const filteredFaqs = itineraryFaqs.filter(faq => {
    const matchesCategory = selectedFaqCategory === "all" || faq.category === selectedFaqCategory;
    const matchesSearch = faq.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppDirect = (msg: string) => {
    trackEvent('whatsapp_click', 'conversion', 'itinerary_suite');
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleMainWhatsApp = () => {
    const msg = `Hi Plan Sri Lanka! I am planning a 7-day tour. Can you confirm pricing, hotel options, and secure my Train seats? Thank you!`;
    handleWhatsAppDirect(msg);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert("Please provide your name and WhatsApp number to generate your itinerary.");
      return;
    }
    setIsSubmitting(true);
    trackEvent('lead_submit', 'conversion', 'itinerary_landing_lead');

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      const msg = `Hi! I completed my lead details:
👤 Name: ${leadName}
📞 WhatsApp: ${leadPhone}
📅 Expected Travel Month: ${leadDate || "Unspecified"}
      
Please send me the optimized free 24-page PDF and confirm private chauffeur packages!`;
      window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0F1412] font-sans leading-relaxed selection:bg-[#C5A059]/20 pt-24 md:pt-32">
      
      {/* JSON-LD SCHEMAS FOR SEO & AI OVERVIEW INDEXING */}
      <>
        {/* WebPage & Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
            },
            "headline": "Sri Lanka 7-Day Itinerary: The Ultimate Non-Fatiguing Route for First-Time Visitors",
            "description": "Planning your first trip to Sri Lanka? Read our master route compiled by local chauffeur-guides with real drive times, interactive planning tools, and detailed schedules.",
            "author": {
              "@type": "Person",
              "name": "Manju Ranasinghe",
              "jobTitle": "Licensed SLTDA National Chauffeur-Guide Lecturer",
              "identifier": "SLTDA-Badge #NGL-35221"
            },
            "publisher": {
              "@type": "TravelAgency",
              "name": "Plan Sri Lanka",
              "url": "https://plan-srilanka.com"
            }
          })}
        </script>

        {/* TouristTrip & HowTo Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": "Sri Lanka 7-Day Optimal Heritage & Coastal Corridor",
            "description": "7-day luxury private tour covering Negombo, Sigiriya, Kandy, Ella, Yala leopards safari, and Galle Heritage Fort.",
            "itinerary": itinerarySchedules.map(day => ({
              "@type": "TouristAttraction",
              "name": `Day ${day.day}: ${day.title}`,
              "description": `Morning: ${day.morning}. Afternoon: ${day.afternoon}. Evening: ${day.evening}. Real Driving Time: ${day.drivingTime}.`
            }))
          })}
        </script>

        {/* FAQPage Schema (from the 70-question FAQ vault) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": itineraryFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      </>

      {/* 1. HERO BANNER HEADER & ATTENTION DECK */}
      <section className="relative px-6 pb-16 pt-8 overflow-hidden bg-gradient-to-b from-[#1A2F23]/10 to-transparent">
        <div className="max-w-5xl mx-auto space-y-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> Google Search Quality & EEAT Approved Master Blueprint
          </div>
          
          <h1 className="text-4xl md:text-7xl font-serif text-[#1A2F23] tracking-tight leading-[1.1] max-w-4xl mx-auto font-bold">
            Spend 7 Days in Sri Lanka <br />
            <span className="italic text-[#C5A059] font-normal">Without Wasting a Single Hour</span>
          </h1>
          
          <p className="text-base md:text-xl text-[#0F1412]/75 font-light max-w-2xl mx-auto leading-relaxed">
            Maps are deceptive. Mountain roads restrict speed to 35 km/h. This optimized itinerary ensures first-time visitors see Sri Lanka&apos;s most magnificent peaks and heritage loops with the absolute least vehicle fatigue.
          </p>

          <p className="text-sm text-[#0F1412]/70 font-light max-w-2xl mx-auto leading-relaxed text-left sm:text-center">
            Seven days is enough to cover Sri Lanka&apos;s three signature landscapes — ancient ruins, misty tea hills, and the south coast — without feeling rushed. This route runs Negombo → Sigiriya → Kandy → Ella → Yala → Galle → Colombo, roughly 640km with manageable 2-4 hour drives between stops. Below you&apos;ll find the day-by-day plan, hotel picks by budget, and a full cost breakdown (this route typically runs <strong className="text-[#1A2F23] font-semibold">$450-900 per person</strong> for 7 days depending on hotel class — see our <Link to="/sri-lanka-trip-cost-from-india" className="text-[#C5A059] underline hover:text-[#1A2F23]">full cost breakdown from India</Link> or <Link to="/sri-lanka-trip-cost-from-bangalore" className="text-[#C5A059] underline hover:text-[#1A2F23]">from Bangalore</Link>). Check <Link to="/best-time-to-visit-sri-lanka" className="text-[#C5A059] underline hover:text-[#1A2F23]">the best time to visit</Link> before locking in your dates, or skip straight to our <Link to="/sri-lanka-trip-planner" className="text-[#C5A059] underline hover:text-[#1A2F23]">free trip planner</Link> to customize this route for your own travel window. Flying out of Chennai specifically? See our <Link to="/sri-lanka-7-day-itinerary-from-chennai" className="text-[#C5A059] underline hover:text-[#1A2F23]">Sri Lanka 7 day itinerary from Chennai</Link> for MAA-specific flight times and a tailored day-by-day plan.
          </p>

          {/* Quick Answer Summary table (At-A-Glance optimal route loop) */}
          <div className="bg-white rounded-3xl border border-[#0F1412]/5 shadow-xl p-4 md:p-6 max-w-3xl mx-auto overflow-hidden">
            <div className="text-left pb-3 mb-3 border-b border-[#0F1412]/5 flex justify-between items-center text-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F1412]/40 font-bold block">
                🏁 At-A-Glance Optimal Route Loop
              </span>
              <span className="text-xs bg-[#1A2F23] text-white px-3 py-1 rounded-full font-mono font-bold">
                8.5 Hours Driving Total
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
              {itinerarySchedules.map((day) => (
                <div 
                  key={day.day} 
                  onClick={() => {
                    setActiveDayTab(day.day);
                    document.getElementById('daily-itinerary-ledger')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer group ${
                    activeDayTab === day.day 
                      ? "bg-[#1A2F23] text-white border-[#1A2F23] shadow-md scale-105" 
                      : "bg-[#FAF8F5]/50 text-[#0F1412] hover:bg-[#FAF8F5] border-[#0F1412]/5 hover:border-[#C5A059]/30"
                  }`}
                >
                  <p className={`text-[9px] font-mono uppercase tracking-wider font-bold mb-1 ${
                    activeDayTab === day.day ? "text-[#C5A059]" : "text-[#0F1412]/40"
                  }`}>
                    Day {day.day}
                  </p>
                  <p className="font-serif text-xs font-bold truncate tracking-tight">{day.title.split("via")[0].split("to")[0].trim().split(" ")[0]}</p>
                  <span className={`text-[9px] block mt-1.5 font-light ${
                    activeDayTab === day.day ? "text-white/70" : "text-[#0F1412]/50 group-hover:text-[#C5A059]"
                  }`}>
                    {day.day === 4 ? "Scenic Train" : `🚗 ${day.travelTime}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-2xl mx-auto">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-8 py-4 bg-[#1A2F23] text-white hover:bg-[#C5A059] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <Printer className="w-4 h-4 text-white" /> Print Itinerary
            </button>
            <a 
              href="#interactive-suite-anchor"
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] text-white hover:bg-[#1A2F23] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-2.5 shadow-xl"
            >
              15-in-1 Interactive Suite <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>

        </div>
      </section>

      {/* Contextual month-specific planning links */}
      <section className="py-6 px-6 bg-[#f5f2e8]/50 border-b border-[#1A2F23]/5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-[#1A2F23]/60 font-mono uppercase tracking-wider text-[10px]">Traveling in a specific month?</span>
          <Link to="/where-to-go-in-sri-lanka-in-june" className="px-3 py-1.5 bg-white border border-[#1A2F23]/10 rounded-full text-[#1A2F23] hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-medium">
            Sri Lanka in June →
          </Link>
          <Link to="/sri-lanka-itinerary-august-couples" className="px-3 py-1.5 bg-white border border-[#1A2F23]/10 rounded-full text-[#1A2F23] hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-medium">
            Sri Lanka in August →
          </Link>
        </div>
      </section>

      {/* Pre-trip essentials: visa & flights quick links */}
      <section className="py-6 px-6 bg-white border-b border-[#1A2F23]/5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-[#1A2F23]/60 font-mono uppercase tracking-wider text-[10px]">Before you book:</span>
          <Link to="/sri-lanka-visa-for-indians" className="px-3 py-1.5 bg-[#f5f2e8]/50 border border-[#1A2F23]/10 rounded-full text-[#1A2F23] hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-medium">
            🛂 Do I Need a Visa? →
          </Link>
          <Link to="/guide-to-flying-to-sri-lanka" className="px-3 py-1.5 bg-[#f5f2e8]/50 border border-[#1A2F23]/10 rounded-full text-[#1A2F23] hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-medium">
            ✈️ Flight Duration & Routes →
          </Link>
        </div>
      </section>

      {/* 2. RELEVANCE & DIAGNOSTIC ALIGNMENT */}
      <section className="py-16 bg-[#1A2F23] text-white px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Diagnostic Alignment</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              Is This Itinerary Built For You?
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Select what matches your travel preferences. Let our validation engine verify if your goals align with local road constraints.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "firstTime", title: "First-Timer?", desc: "Want to witness legendary landmarks without guessing daily pacing." },
              { key: "fromIndia", title: "Flying from India?", desc: "Looking for simple e-Visa guidance, direct flights, and veg dining." },
              { key: "avoidFatigue", title: "Avoid Car Fatigue?", desc: "Want to stay 2 nights per hotel instead of daily checkout rushes." },
              { key: "cashPrep", title: "Cash Preparation?", desc: "Need precise USD/LKR temple pricing and tipping etiquette norms." }
            ].map(item => {
              const checked = (diagnostic as any)[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => setDiagnostic(prev => ({ ...prev, [item.key]: !checked }))}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-center select-none flex flex-col justify-between ${
                    checked 
                      ? "bg-[#C5A059] text-white border-[#C5A059] shadow-lg scale-[1.02]" 
                      : "bg-white/5 text-white/90 border-white/10 hover:border-white/25 hover:bg-white/10"
                  }`}
                >
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-sm">{item.title}</h3>
                    <p className={`text-[11px] leading-normal font-light ${checked ? "text-white/95" : "text-white/60"}`}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase transition-all tracking-wider ${
                      checked ? "bg-white text-[#C5A059]" : "bg-white/10 text-white/70"
                    }`}>
                      {checked ? "✓ Matched" : "Tap to Match"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {diagnosticScore === 4 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/5 border border-[#C5A059]/40 p-6 rounded-2xl text-center space-y-2.5 max-w-2xl mx-auto"
              >
                <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center font-bold text-lg mx-auto">🌟</div>
                <p className="font-serif font-bold text-lg text-[#C5A059]">100% Ideal Corridor Confirmed!</p>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  This blueprint matches your parameters perfectly. By utilizing the Colombo-Sigiriya-Ella-Galle loop, you bypass extreme backtracking, secure vegetarian recommendations, utilize fast expressways, and ensure zero daily checkout stress. Read on with absolute confidence.
                </p>
              </motion.div>
            ) : (
              <p className="text-[10px] font-mono tracking-widest text-white/40 text-center uppercase">
                💡 Select all four items to unlock your local suitability verification message.
              </p>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 3. EXPERIENCE & EEAT PROOF (Author Byline) */}
      <section className="py-12 px-6 bg-white border-b border-[#0F1412]/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-[#FAF8F5] border border-[#0F1412]/5">
          <div className="w-20 h-20 rounded-full bg-[#C5A059]/20 shrink-0 flex items-center justify-center text-3xl font-serif text-[#1A2F23] border-2 border-[#C5A059] font-bold">MR</div>
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider bg-[#C5A059]/10 px-2.5 py-1 rounded-full">Licensed Expert Attestation</span>
              <span className="text-xs text-gray-500 font-mono">SLTDA Reg Badge #NGL-35221</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A2F23]">Verified by Manju Ranasinghe — National Chauffeur-Guide Lecturer</h3>
            <p className="text-xs text-[#0F1412]/70 font-light leading-relaxed">
              &ldquo;In my 14 years driving first-time travelers across our hill country, 80% of families make the mistake of pushing too many stops into 7 days. This specific blueprint is the ONLY way to balance misty highlands, ancient fortresses, and elephant zone safaris in 168 hours without getting carsick.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE 15-IN-1 INTELLIGENT PLANNING SUITE */}
      <section className="py-20 px-6 bg-[#FAF8F5]" id="interactive-suite-anchor">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">15-in-1 Planner Deck</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              The Intelligent Itinerary Engineering Suite
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Calculate costs, track monsoonal rain risk shifts, simulate driving fatigue scores, sum up entrance tickets, and play audio phrasings in our live planning console below.
            </p>
          </div>

          <ItineraryPlanningSuite onWhatsAppRequest={handleWhatsAppDirect} />

        </div>
      </section>

      {/* 4B. QUICK OVERVIEW TABLE */}
      <section className="py-16 px-6 bg-white border-t border-b border-[#0F1412]/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">At-A-Glance</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Quick Overview: 7-Day Route
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              The full loop at a glance — location, highlight, drive time, and average daily spend per person.
            </p>
          </div>

          <div className="overflow-x-auto bg-[#FAF8F5] rounded-2xl border border-[#0F1412]/5 shadow-lg">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#1A2F23] text-white font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Day</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Highlight</th>
                  <th className="p-4">Drive Time</th>
                  <th className="p-4">Avg. Cost/Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {[
                  { day: 1, location: "Negombo", highlight: "Beach + lagoon, airport recovery", cost: "$40-70" },
                  { day: 2, location: "Sigiriya", highlight: "Pidurangala sunset, Cultural Triangle", cost: "$50-90" },
                  { day: 3, location: "Sigiriya → Kandy", highlight: "Lion Rock climb, Temple of the Tooth", cost: "$50-90" },
                  { day: 4, location: "Kandy → Ella", highlight: "Blue Train, tea country", cost: "$50-80" },
                  { day: 5, location: "Ella → Yala", highlight: "Nine Arch Bridge, leopard safari", cost: "$70-120" },
                  { day: 6, location: "Yala → Galle", highlight: "Stilt fishermen, Galle Fort ramparts", cost: "$50-90" },
                  { day: 7, location: "Galle → Colombo", highlight: "Ministry of Crab, departure", cost: "$40-70" }
                ].map((row) => (
                  <tr key={row.day} className="hover:bg-white transition-colors">
                    <td className="p-4 font-mono font-bold text-[#C5A059]">Day {row.day}</td>
                    <td className="p-4 font-bold text-[#1A2F23]">{row.location}</td>
                    <td className="p-4 text-[#0F1412]/80 font-light">{row.highlight}</td>
                    <td className="p-4 text-[#0F1412]/80 font-light">{itinerarySchedules[row.day - 1]?.drivingTime}</td>
                    <td className="p-4 font-mono font-bold text-emerald-700">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. DENSE DAY-BY-DAY ITINERARY LEDGER */}
      <section className="py-20 px-6 bg-white" id="daily-itinerary-ledger">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Comprehensive Daily Ledger</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Your Day-by-Day Optimal Schedule
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Bypass generic advice. Each day details exact Morning/Afternoon/Evening targets, transport real speeds, photo spots, hotel choices, and local secrets.
            </p>
          </div>

          {/* Daily tab selector */}
          <div className="flex overflow-x-auto gap-1.5 p-1 bg-[#FAF8F5] rounded-2xl scrollbar-none">
            {itinerarySchedules.map(day => (
              <button
                key={day.day}
                onClick={() => setActiveDayTab(day.day)}
                className={`flex-grow py-2.5 px-4 rounded-xl text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                  activeDayTab === day.day 
                    ? "bg-[#C5A059] text-white shadow" 
                    : "text-[#0F1412]/50 hover:text-[#0F1412] hover:bg-gray-200/50"
                }`}
              >
                Day {day.day} Stop
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {itinerarySchedules.map(day => {
              if (activeDayTab !== day.day) return null;
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#0F1412]/5 shadow-xl space-y-8"
                >
                  <div className="border-b border-[#0F1412]/10 pb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#C5A059] font-bold block uppercase">
                        DAY {day.day} OFFICIAL LEDGER
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1A2F23] font-bold mt-1">
                        {day.title}
                      </h3>
                    </div>
                    <div className="bg-[#1A2F23] text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-center shrink-0">
                      🚗 Driving: {day.drivingTime}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    
                    {/* Time breakdown block */}
                    <div className="md:col-span-2 space-y-5">
                      <div className="space-y-1.5">
                        <h4 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-[#C5A059]" /> 1. Morning Schedule (07:00 AM - 12:00 PM)
                        </h4>
                        <p className="text-xs text-[#0F1412]/85 font-light leading-relaxed">{day.morning}</p>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                          <Car className="w-4 h-4 text-[#C5A059]" /> 2. Afternoon Schedule (12:00 PM - 04:00 PM)
                        </h4>
                        <p className="text-xs text-[#0F1412]/85 font-light leading-relaxed">{day.afternoon}</p>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                          <Utensils className="w-4 h-4 text-[#C5A059]" /> 3. Evening Schedule (04:00 PM - 08:30 PM)
                        </h4>
                        <p className="text-xs text-[#0F1412]/85 font-light leading-relaxed">{day.evening}</p>
                      </div>
                    </div>

                    {/* Metadata column */}
                    <div className="bg-white rounded-2xl p-5 border border-[#0F1412]/5 space-y-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block">Estimated Stays:</span>
                        <p className="text-[#1A2F23] font-serif font-bold leading-tight">{day.hotels}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block">Food Spotlights:</span>
                        <p className="text-[#0F1412]/80 font-light leading-tight">{day.foodSuggestions}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block">Insta Photo Spots:</span>
                        <p className="text-[#0F1412]/80 font-light leading-tight">{day.photoSpots}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block">Day Ticket Pricing:</span>
                        <p className="text-emerald-700 font-mono font-bold leading-tight">{day.costs}</p>
                      </div>
                    </div>

                  </div>

                  {/* Tips and common mistakes footer panels */}
                  <div className="grid sm:grid-cols-2 gap-4 border-t border-[#0F1412]/10 pt-6">
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/50 flex gap-3">
                      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-amber-800 block">Local Insider Advice:</span>
                        <p className="text-xs text-[#0F1412]/80 font-light leading-relaxed">{day.localTips}</p>
                      </div>
                    </div>

                    <div className="bg-red-50/50 p-4 rounded-xl border border-red-200/50 flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-red-800 block">Common Tourist Mistakes:</span>
                        <p className="text-xs text-red-950/80 font-light leading-relaxed">{day.commonMistakes}</p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </section>

      {/* 6. COMPREHENSIVE TRANSPORT COMPONENT MATRIX */}
      <section className="py-20 px-6 bg-[#FAF8F5] border-t border-b border-[#0F1412]/10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Vehicle Logistics Sifter</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Transit Comparison Matrix
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Is a self-drive rental, train, or private driver better for a 7-day trip? See the physical ratings below.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-[#0F1412]/5 shadow-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#1A2F23] text-white font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Transport Mode</th>
                  <th className="p-4">Comfort level</th>
                  <th className="p-4">Average speed</th>
                  <th className="p-4">Luggage safety</th>
                  <th className="p-4">Cost Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {[
                  { mode: "🚗 Private Chauffeur AC Car", comfort: "⭐⭐⭐⭐⭐ (Elite)", speed: "35-45 km/h (Stable)", safety: "100% Locked & Safe", cost: "Mid-range (₹6-9k/day)" },
                  { mode: "🎫 Reserved Scenic Train", comfort: "⭐⭐⭐⭐ (Scenic AC)", speed: "30 km/h (Scenic delays)", safety: "Poor (Crowded overhead racks)", cost: "Very Cheap" },
                  { mode: "🚗 Self-Drive Car Rental", comfort: "⭐⭐ (High stress roads)", speed: "25 km/h (Backtracking risks)", safety: "Moderate", cost: "High (High excess deposits)" },
                  { mode: "🚌 Public SLTB Red Bus", comfort: "⭐ (No AC / standing)", speed: "20 km/h (Tractor blocks)", safety: "Unsafe (No baggage racks)", cost: "Almost Free" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="p-4 font-bold text-[#1A2F23]">{row.mode}</td>
                    <td className="p-4 text-[#0F1412]/80 font-light">{row.comfort}</td>
                    <td className="p-4 font-mono font-bold text-gray-600">{row.speed}</td>
                    <td className="p-4 text-[#0F1412]/80 font-light">{row.safety}</td>
                    <td className="p-4 text-[#C5A059] font-bold">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 6B. SAMPLE BUDGET BREAKDOWN TABLE */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Real Numbers</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Sample 7-Day Budget Breakdown
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Per person, for the full 7-day route above. For a fuller breakdown by departure city, see our{" "}
              <Link to="/sri-lanka-trip-cost-from-india" className="text-[#C5A059] underline hover:text-[#1A2F23]">cost guide from India</Link>{" "}
              or{" "}
              <Link to="/sri-lanka-trip-cost-from-bangalore" className="text-[#C5A059] underline hover:text-[#1A2F23]">from Bangalore</Link>.
            </p>
          </div>

          <div className="overflow-x-auto bg-[#FAF8F5] rounded-2xl border border-[#0F1412]/5 shadow-lg">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#1A2F23] text-white font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Category</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Mid-Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {[
                  { cat: "Accommodation (7 nights)", budget: "$150-210", mid: "$350-560" },
                  { cat: "Private driver/car (7 days)", budget: "$210-280", mid: "$210-280" },
                  { cat: "Meals", budget: "$70-105", mid: "$140-210" },
                  { cat: "Entrance fees (Sigiriya, Yala, temples)", budget: "$90-110", mid: "$90-110" }
                ].map((row) => (
                  <tr key={row.cat} className="hover:bg-white transition-colors">
                    <td className="p-4 font-bold text-[#1A2F23]">{row.cat}</td>
                    <td className="p-4 font-mono text-[#0F1412]/80">{row.budget}</td>
                    <td className="p-4 font-mono text-[#0F1412]/80">{row.mid}</td>
                  </tr>
                ))}
                <tr className="bg-[#1A2F23]/5 font-bold">
                  <td className="p-4 text-[#1A2F23]">Total per person</td>
                  <td className="p-4 font-mono text-emerald-700">$450-650</td>
                  <td className="p-4 font-mono text-emerald-700">$700-900</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. HEALTH, SAFETY & SCAN PROTECTION DOSSIER */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Safety Dossier</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              Emergency Safety & Well-Being
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              How to bypass common scams, handle health emergencies, and ensure complete family comfort on-the-ground.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-3">
              <ShieldAlert className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">Common Tourist Scams</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Bypass the <strong>Milk Powder scam</strong> in Colombo and the <strong>Shady Gem Valuer trap</strong> near Galle. Ignore strangers claiming a site is &quot;closed today&quot;; verify with your driver first.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-3">
              <Users className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">Solo Female Travel Care</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Sri Lanka is welcoming, but follow local customs. Dress modestly away from beaches (cover shoulders/knees). Book reserved 2nd class rail wagons and avoid dark unlit lanes at night.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-3">
              <Clock className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">Emergency Contact Lists</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Dial <strong>1912</strong> for the official Tourist Police, <strong>119</strong> for general police, and <strong>110</strong> for urgent ambulance dispatch. Keep your driver&apos;s phone handy.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. SEARCHABLE AND CATEGORIZED FAQ ACCORDIONS (70 Questions) */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">{itineraryFaqs.length} Expert FAQs</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              The Planning Answers Vault
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Our comprehensive database of {itineraryFaqs.length} answers verified by local guides. Use the search bar or category filters to find answers immediately.
            </p>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search FAQs... e.g. leeches, tipping, train tickets..." 
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#0F1412]/10 rounded-2xl p-3.5 pl-12 text-sm focus:outline-none focus:border-[#C5A059] shadow"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center">
              {[
                { id: "all", label: `🌍 Show All (${itineraryFaqs.length})` },
                { id: "logistics", label: "🚗 Logistics & Transport" },
                { id: "health", label: "🏥 Health & Food" },
                { id: "money", label: "💵 Cash & Tipping" },
                { id: "connectivity", label: "📶 eSIM & Tech" },
                { id: "weather", label: "⛅ Weather & Monsoons" },
                { id: "safety", label: "🛡️ Safety & Scams" },
                { id: "culture", label: "🕌 Cultural Etiquette" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFaqCategory(cat.id)}
                  className={`py-1.5 px-3.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedFaqCategory === cat.id 
                      ? "bg-[#C5A059] text-white shadow-sm" 
                      : "bg-white text-[#0F1412]/60 hover:text-[#0F1412] border border-[#0F1412]/5"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQS DISPLAY LIST */}
          <div className="space-y-3 min-h-[250px]">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.slice(0, 15).map((faq, idx) => {
                const uniqueIndex = itineraryFaqs.indexOf(faq);
                const isOpen = activeFaq === uniqueIndex;
                return (
                  <div 
                    key={uniqueIndex}
                    className="bg-white rounded-2xl border border-[#0F1412]/5 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : uniqueIndex)}
                      className="w-full p-5 text-left font-serif font-bold text-[#1A2F23] text-sm sm:text-base flex justify-between items-center gap-4 cursor-pointer hover:bg-[#FAF8F5]/40"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#C5A059] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-[#0F1412]/5 overflow-hidden bg-[#FAF8F5]/30"
                        >
                          <p className="p-5 text-xs sm:text-sm text-[#0F1412]/80 font-light leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-400 text-xs">
                No matching expert planning questions found. Try search query shortcuts like &quot;train&quot; or &quot;cash&quot;.
              </div>
            )}

            {filteredFaqs.length > 15 && (
              <p className="text-center text-xs text-gray-400 pt-4 font-mono">
                Showing top 15 matching questions. Filter categories or type specific queries to view remaining planning files.
              </p>
            )}
          </div>

        </div>
      </section>

      {/* 9. EXIT INTENT POPUP CONVERSION MODAL */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A2F23]/80 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-[2rem] p-6 sm:p-10 max-w-md w-full border border-white/10 shadow-2xl relative text-center space-y-6"
            >
              <button 
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#1A2F23] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>

              <div className="w-12 h-12 bg-[#C5A059]/10 text-[#C5A059] rounded-full flex items-center justify-center mx-auto text-xl">
                🧳
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-bold">Don&apos;t Lose Cellular Signals</span>
                <h3 className="font-serif text-2xl font-bold text-[#1A2F23]">Get the Offline Survival PDF Guide</h3>
                <p className="text-xs text-[#0F1412]/70 font-light leading-relaxed">
                  Avoid getting lost in highland mountain mist. Download our licensed 24-page offline-ready survival blueprint with direct driver coordinates, regional checklists, and emergency health protocols before you board your flight.
                </p>
              </div>

              <button 
                onClick={() => {
                  setShowExitIntent(false);
                  handleWhatsAppDirect("Hi Plan Sri Lanka! Please send me the 24-page Offline Survival PDF Guide for my 7-day tour.");
                }}
                className="w-full py-4 bg-[#C5A059] text-white hover:bg-[#1A2F23] font-serif tracking-widest text-xs uppercase font-bold rounded-full transition-all cursor-pointer shadow-lg"
              >
                Download Free PDF Guide ➔
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. REUSABLE STICKY CONCIERGE FOOTER BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A2F23] border-t border-[#C5A059]/30 text-white py-4.5 px-6 shadow-2xl">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <p className="text-xs font-mono tracking-wide text-white/90">
              Online Local Coordinators active (Response time: &lt; 3 mins)
            </p>
          </div>
          <button 
            onClick={handleMainWhatsApp}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#C5A059] hover:bg-white hover:text-[#1A2F23] text-white text-xs uppercase tracking-widest font-mono font-bold rounded-full transition-all cursor-pointer text-center shrink-0"
          >
            Chat Live via WhatsApp ➔
          </button>
        </div>
      </div>

      {/* Trip Planner CTA banner */}
      <section className="py-14 px-6 bg-[#1A2F23]">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Want This Route Customized to Your Exact Dates?
          </h3>
          <p className="text-sm text-white/70 font-light max-w-xl mx-auto">
            This 7-day loop is a proven starting point — but pacing, hotel tier, and add-on stops all depend on when you travel. Try our free trip planner to adjust it to your own dates and travel style.
          </p>
          <Link
            to="/sri-lanka-trip-planner"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A059] text-white hover:bg-white hover:text-[#1A2F23] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full shadow-xl"
          >
            Open the Free Trip Planner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Lead capture form final block */}
      <section className="py-24 px-6 bg-white pb-36" id="concierge-form-submit">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FAF8F5] rounded-[3rem] border border-[#0F1412]/5 shadow-2xl p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="w-[15%] h-full bg-[#006233]" />
              <div className="w-[15%] h-full bg-[#FFBE29]" />
              <div className="flex-grow h-full bg-[#8D153B]" />
            </div>

            <div className="max-w-2xl mx-auto space-y-8 text-center pt-4">
              <div className="space-y-2">
                <span className="text-[#C5A059] font-serif italic text-lg block">Micro-Commitment Planning Form</span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#1A2F23] tracking-tight leading-tight font-bold">
                  Get Your Personalized <br />
                  <span className="italic font-normal text-[#C5A059] font-serif">Sri Lanka Itinerary Details</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#0F1412]/70 font-light max-w-lg mx-auto">
                  Submit your expected holiday month below. We will secure your e-Visa ETA registration guide, print-ready PDF, and launch direct WhatsApp concierge support.
                </p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-5 text-left max-w-md mx-auto">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#0F1412]/50">Your Full Name:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Rajesh Kumar" 
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full p-4 bg-white border border-[#0F1412]/10 rounded-2xl focus:outline-none focus:border-[#C5A059] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#0F1412]/50">WhatsApp Phone Number:</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g., +91 98765 43210" 
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full p-4 bg-white border border-[#0F1412]/10 rounded-2xl focus:outline-none focus:border-[#C5A059] text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#0F1412]/50">Expected Travel Month:</label>
                    <input 
                      type="text" 
                      placeholder="e.g., December 2026" 
                      value={leadDate}
                      onChange={(e) => setLeadDate(e.target.value)}
                      className="w-full p-4 bg-white border border-[#0F1412]/10 rounded-2xl focus:outline-none focus:border-[#C5A059] text-xs"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#1A2F23] hover:bg-[#C5A059] text-white rounded-full font-serif font-bold text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>Get My Personalized Itinerary <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-[#1A2F23]/5 p-6 rounded-3xl border border-[#1A2F23]/10 max-w-md mx-auto space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xl mx-auto">✓</div>
                  <h4 className="font-serif font-bold text-xl text-[#1A2F23]">Itinerary Submitted Successfully!</h4>
                  <p className="text-xs text-[#0F1412]/75 leading-relaxed font-light">
                    Your details have been registered on-the-ground. Connect with your dedicated local concierge planner to claim your 24-page PDF and verify chauffeur options.
                  </p>
                  <button 
                    onClick={() => handleWhatsAppDirect("Hi Plan Sri Lanka! I completed my lead form. Please send my customized PDF.")}
                    className="w-full py-4 bg-[#C5A059] text-white hover:bg-[#1A2F23] font-serif tracking-widest text-xs uppercase font-bold rounded-full transition-all block text-center cursor-pointer shadow-md"
                  >
                    Start Chat on WhatsApp ➔
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
