import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { useScrollDepthTracking } from "../hooks/useScrollDepthTracking";
import {
  ArrowRight, MapPin, Compass, Clock, Car, Utensils, Sparkles, Calendar, Info, CheckCircle, HelpCircle, ChevronDown, AlertTriangle, Heart, Users, Backpack, Palmtree, Train, Check, AlertCircle, Printer, Download, Map, CloudRain, TrendingDown, Search, ShieldAlert, BookOpen, ExternalLink, HelpCircle as HelpIcon, Sparkles as SparklesIcon, FileText, Bed, X
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { itineraryFaqs, FaqItem } from "../data/itineraryFaqs";
import { itinerarySchedules, DailySchedule } from "../data/itinerarySchedules";
import ItineraryPlanningSuite from "./ItineraryPlanningSuite";

// "Right for you?" comparison — honest, not a hard sell.
const travelerFit = [
  { type: "First-time visitor", verdict: "Great fit", note: "This route is built for exactly this trip — culture, hills, wildlife and coast in one loop." },
  { type: "Couple", verdict: "Great fit", note: "Romantic hill-country and coastal combo. Consider the Honeymoon variant below for slower mornings." },
  { type: "Honeymoon", verdict: "Good fit, with tweaks", note: "Drop one inland stop and add a 2nd night in Ella or Galle instead of changing hotels daily." },
  { type: "Family with kids", verdict: "Workable, but fast", note: "6 hotel changes in 7 days is tiring for kids under 8 — see the Family variant to cut that in half." },
  { type: "Solo traveler", verdict: "Great fit", note: "Easy to book solo, with sociable stops in Ella and Galle where you'll meet other travelers." },
  { type: "Adventure / hiking", verdict: "Good fit, with tweaks", note: "Swap a day of Kandy sightseeing for extra hiking time around Ella — see the Mountain variant." },
  { type: "Slow traveler", verdict: "Too fast as written", note: "This is a brisk pace by design. Drop 1-2 stops rather than rushing all seven — see the alternatives below." },
  { type: "Budget traveler", verdict: "Workable", note: "Private transport is the biggest cost lever. See the Budget variant and the transport section below." }
];

// Clean destination name per day (day.title strings are full descriptive headlines).
const destinationLabel: { [day: number]: string } = {
  1: "Negombo",
  2: "Sigiriya",
  3: "Kandy",
  4: "Ella",
  5: "Yala",
  6: "Galle",
  7: "Colombo / Departure"
};

// Short "main experience" label for the route-at-a-glance table.
const dayHighlights: { [day: number]: string } = {
  1: "Beach + lagoon, airport recovery",
  2: "Pidurangala sunset, Cultural Triangle",
  3: "Lion Rock climb, Temple of the Tooth",
  4: "Blue Train, tea country",
  5: "Nine Arch Bridge, leopard safari",
  6: "Stilt fishermen, Galle Fort ramparts",
  7: "Ministry of Crab, departure"
};

// Alternative routings — what changes, who it's for, the honest trade-off.
const alternatives = [
  {
    id: "beach",
    emoji: "🏖️",
    title: "Beach-focused",
    change: "Replace the Yala safari day with two extra nights on the south coast (Mirissa or Bentota), or swap Galle for a full beach day at Unawatuna or Weligama.",
    who: "Travelers who want to relax more than sightsee.",
    gain: "More pool and beach time, fewer hotel changes.",
    giveUp: "The Yala leopard safari and some Cultural Triangle depth."
  },
  {
    id: "honeymoon",
    emoji: "❤️",
    title: "Honeymoon",
    change: "Cut one inland stop (commonly Kandy) and add a 2nd night in Ella and a 2nd night in Galle, so you're not checking in and out every day.",
    who: "Couples who want romance and slower mornings over ticking off every landmark.",
    gain: "Longer stays, real time for private dinners or a spa afternoon, less driving fatigue.",
    giveUp: "The Temple of the Tooth ceremony or one Cultural Triangle site."
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "Family",
    change: "Reduce to 2-3 core bases instead of 6-7 — for example, Sigiriya/Kandy for culture, then one south-coast base for beach time.",
    who: "Families with kids under ~10, or anyone who dislikes daily check-in/check-out.",
    gain: "Less car time, more downtime at each hotel — pools matter more than monuments to kids.",
    giveUp: "Breadth — you'll see fewer distinct regions in the same week."
  },
  {
    id: "wildlife",
    emoji: "🐘",
    title: "Wildlife-focused",
    change: "Add a second safari (Udawalawe, or a Yala Block 5 game drive) and trim a day off the south coast leg to fit it in.",
    who: "Travelers whose main goal is wildlife, not beaches or forts.",
    gain: "Two safari attempts — meaningfully better odds of a strong leopard or elephant sighting.",
    giveUp: "Galle Fort or a full south-coast beach day."
  },
  {
    id: "mountain",
    emoji: "🏔️",
    title: "Mountain-focused",
    change: "Give hill country two full days instead of a fast pass-through — add Nuwara Eliya alongside Ella, or extend Ella to two nights for hikes.",
    who: "Travelers who love hiking, tea country and cooler weather over beaches.",
    gain: "Time for at least one proper hike (Little Adam's Peak, Ella Rock) and a tea-factory visit without rushing for a train.",
    giveUp: "The Yala safari or the south-coast leg entirely."
  },
  {
    id: "budget",
    emoji: "💰",
    title: "Budget-focused",
    change: "Swap the private driver for a mix of train and public/shared transport on the flatter legs, and choose value-tier guesthouses throughout.",
    who: "Cost-conscious travelers comfortable handling more of their own logistics.",
    gain: "A materially lower daily spend — transport is the single biggest cost lever on this route.",
    giveUp: "Door-to-door convenience and some flexibility on timings."
  }
];

// Decision tree: trip style -> which alternative to jump to.
const tripStyles = [
  { id: "beaches", emoji: "🏖️", label: "Beaches", altId: "beach" },
  { id: "mountains", emoji: "🏔️", label: "Mountains", altId: "mountain" },
  { id: "wildlife", emoji: "🐘", label: "Wildlife", altId: "wildlife" },
  { id: "honeymoon", emoji: "❤️", label: "Honeymoon", altId: "honeymoon" },
  { id: "family", emoji: "👨‍👩‍👧", label: "Family", altId: "family" },
  { id: "budget", emoji: "💰", label: "Budget", altId: "budget" },
  { id: "photography", emoji: "📸", label: "Photography", altId: "mountain" }
];

// Where to stay each night — built from the same hotel picks used in the day-by-day ledger,
// with a short note on why that town/area is the convenient base.
const stayNotes: { [day: number]: string } = {
  1: "Closest beach town to the airport — the obvious first-night base so you're not driving into Colombo traffic straight off a long-haul flight.",
  2: "Central for the Cultural Triangle — Sigiriya, Dambulla and Pidurangala are all a short drive from here.",
  3: "Walkable to the Temple of the Tooth and Kandy Lake, so you can reach the evening ceremony on foot from most central hotels.",
  4: "Valley-view properties line the ridge above Ella town — most are a short tuk-tuk ride from the train station and cafes.",
  5: "Safari camps sit along the Yala boundary, which shortens the drive to the park gate for your afternoon game drive.",
  6: "Fort-wall hotels put you inside the walking-tour action; properties just outside the fort are quieter and usually better value.",
  7: "You're departing tonight, so this is either a Colombo day-use room or straight to the airport after Galle."
};

export default function SrilankaItineraryPage() {
  usePageMetadata({
    title: "Sri Lanka 7-Day Itinerary: The Perfect Route for First-Time Visitors (2026)",
    description: "Is 7 days enough for Sri Lanka? Follow this realistic day-by-day route (Negombo → Sigiriya → Kandy → Ella → Yala → Galle), see real costs and alternatives for couples, families and budget trips, then build your own with our free planner.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-7-day-itinerary",
    ogUrl: "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
  });

  useScrollDepthTracking("sri_lanka_7_day_itinerary");

  // State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [faqSearchQuery, setFaqSearchQuery] = useState("");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>("all");
  const [activeDayTab, setActiveDayTab] = useState<number>(2);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [highlightedAlt, setHighlightedAlt] = useState<string | null>(null);

  // Lead Form
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadDate, setLeadDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Exit intent modal simulation
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Cost section view tracking (fires once)
  const costSectionRef = useRef<HTMLDivElement | null>(null);
  const costViewFired = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setShowExitIntent(true);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => window.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  useEffect(() => {
    if (!costSectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !costViewFired.current) {
            costViewFired.current = true;
            trackEvent("cost_section_view", "engagement", "itinerary_cost_section");
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(costSectionRef.current);
    return () => observer.disconnect();
  }, []);

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

Please send me the free offline PDF guide and confirm private chauffeur packages!`;
      window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStyleSelect = (style: typeof tripStyles[number]) => {
    setSelectedStyle(style.id);
    trackEvent("alternative_route_click", "engagement", `decision_tree_${style.id}`);
    setHighlightedAlt(style.altId);
    setTimeout(() => scrollToId(`alt-${style.altId}`), 50);
    setTimeout(() => setHighlightedAlt(null), 2500);
  };

  const handlePlannerClick = (location: string) => {
    trackEvent("trip_planner_click", "conversion", location);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0F1412] font-sans leading-relaxed selection:bg-[#C5A059]/20 pt-24 md:pt-32">

      {/* JSON-LD SCHEMAS FOR SEO & AI OVERVIEW INDEXING */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
            },
            "headline": "Sri Lanka 7-Day Itinerary: The Perfect Route for First-Time Visitors",
            "description": "A realistic day-by-day 7-day Sri Lanka route with travel times, costs, alternatives for couples and families, and a free trip planner.",
            "author": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "url": "https://plan-srilanka.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "url": "https://plan-srilanka.com"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com/" },
              { "@type": "ListItem", "position": 2, "name": "Sri Lanka 7-Day Itinerary", "item": "https://plan-srilanka.com/sri-lanka-7-day-itinerary" }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": "Sri Lanka 7-Day Route: Negombo, Sigiriya, Kandy, Ella, Yala, Galle, Colombo",
            "description": "A 7-day / 6-night Sri Lanka route covering Negombo, Sigiriya, Kandy, Ella, Yala safari and Galle Fort.",
            "itinerary": itinerarySchedules.map(day => ({
              "@type": "TouristAttraction",
              "name": `Day ${day.day}: ${day.title}`,
              "description": `Morning: ${day.morning} Afternoon: ${day.afternoon} Evening: ${day.evening} Approx. travel time: ${day.drivingTime}.`
            }))
          })}
        </script>

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

      {/* 1. HERO — above the fold: what this page is, in one screen */}
      <section className="relative px-6 pb-14 pt-8 overflow-hidden bg-gradient-to-b from-[#1A2F23]/10 to-transparent">
        <div className="max-w-5xl mx-auto space-y-7 text-center relative z-10">

          <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> 7 Days / 6 Nights &middot; First-Timer Route
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-[#1A2F23] tracking-tight leading-[1.15] max-w-4xl mx-auto font-bold">
            Sri Lanka 7-Day Itinerary: <br className="hidden sm:block" />
            <span className="italic text-[#C5A059] font-normal">The Perfect Route for First-Time Visitors</span>
          </h1>

          <p className="text-base md:text-xl text-[#0F1412]/75 font-light max-w-2xl mx-auto leading-relaxed">
            Ancient ruins, misty tea hills, a leopard safari and the south coast — in one realistic loop.
            Below: the day-by-day plan, honest trade-offs, real costs, and a free planner to make it yours.
          </p>

          {/* Quick facts row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            {[
              { label: "Route", value: "Negombo → Sigiriya → Kandy → Ella → Yala → Galle → Colombo" },
              { label: "Duration", value: "7 days / 6 nights, ~640 km" },
              { label: "Pace", value: "Brisk — a new base most nights" },
              { label: "Best for", value: "First-time visitors, couples, solo travelers" }
            ].map(fact => (
              <div key={fact.label} className="bg-white rounded-xl border border-[#0F1412]/5 p-3 shadow-sm">
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A059] font-bold block mb-0.5">{fact.label}</span>
                <span className="text-xs text-[#1A2F23] font-medium leading-snug block">{fact.value}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#0F1412]/70 font-light max-w-2xl mx-auto leading-relaxed">
            This route typically runs <strong className="text-[#1A2F23] font-semibold">$450-900 per person</strong> for 7 days depending on hotel class —
            see the full <Link to="/sri-lanka-trip-cost-from-india" onClick={() => trackEvent("internal_itinerary_click", "engagement", "hero_cost")} className="text-[#C5A059] underline hover:text-[#1A2F23]">cost breakdown</Link>.
            Check <Link to="/best-time-to-visit-sri-lanka" onClick={() => trackEvent("internal_itinerary_click", "engagement", "hero_best_time")} className="text-[#C5A059] underline hover:text-[#1A2F23]">the best time to visit</Link> before booking dates,
            or flying from Chennai? See our <Link to="/sri-lanka-7-day-itinerary-from-chennai" onClick={() => trackEvent("internal_itinerary_click", "engagement", "hero_chennai")} className="text-[#C5A059] underline hover:text-[#1A2F23]">Chennai-specific 7-day itinerary</Link>.
          </p>

          {/* Primary / secondary CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 max-w-2xl mx-auto">
            <Link
              to="/sri-lanka-trip-planner"
              onClick={() => handlePlannerClick("hero_primary")}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] text-white hover:bg-[#1A2F23] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-2.5 shadow-xl"
            >
              Build My 7-Day Sri Lanka Trip <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <button
              onClick={() => {
                trackEvent("route_day_click", "engagement", "hero_secondary_cta");
                scrollToId("route-overview");
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#1A2F23] hover:bg-[#1A2F23] hover:text-white border border-[#1A2F23]/15 font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-2 cursor-pointer"
            >
              See the 7-Day Route
            </button>
          </div>

        </div>
      </section>

      {/* Contextual month-specific + pre-trip essential links */}
      <section className="py-6 px-6 bg-[#f5f2e8]/50 border-b border-[#1A2F23]/5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-[#1A2F23]/60 font-mono uppercase tracking-wider text-[10px]">Before you book:</span>
          <Link to="/sri-lanka-visa-for-indians" onClick={() => trackEvent("internal_itinerary_click", "engagement", "visa_link")} className="px-3 py-1.5 bg-white border border-[#1A2F23]/10 rounded-full text-[#1A2F23] hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-medium">
            🛂 Do I Need a Visa? →
          </Link>
          <Link to="/guide-to-flying-to-sri-lanka" onClick={() => trackEvent("internal_itinerary_click", "engagement", "flights_link")} className="px-3 py-1.5 bg-white border border-[#1A2F23]/10 rounded-full text-[#1A2F23] hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-medium">
            ✈️ Flight Duration & Routes →
          </Link>
          <Link to="/where-to-go-in-sri-lanka-in-june" onClick={() => trackEvent("internal_itinerary_click", "engagement", "june_link")} className="px-3 py-1.5 bg-white border border-[#1A2F23]/10 rounded-full text-[#1A2F23] hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-medium">
            Traveling in June? →
          </Link>
          <Link to="/sri-lanka-itinerary-august-couples" onClick={() => trackEvent("internal_itinerary_click", "engagement", "august_link")} className="px-3 py-1.5 bg-white border border-[#1A2F23]/10 rounded-full text-[#1A2F23] hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-medium">
            Traveling in August? →
          </Link>
        </div>
      </section>

      {/* 2. QUICK ANSWER — value even if the user reads nothing else */}
      <section className="py-14 px-6 bg-white border-b border-[#0F1412]/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">30-Second Read</span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1A2F23] tracking-tight">Sri Lanka in 7 Days: Quick Answer</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {[
              { q: "Is 7 days enough?", a: "Yes — for a well-paced introduction to Sri Lanka's three signature regions (ancient ruins, hill country, south coast), provided you use a private driver and don't add extra stops." },
              { q: "What does it cover?", a: "Negombo, Sigiriya, Kandy, the Kandy-Ella train, Yala safari and Galle Fort, ending back in Colombo — roughly 640 km with 2-4 hour drives between most stops." },
              { q: "How fast-paced is it?", a: "Fairly brisk. From Day 2 onward you're mostly changing hotels every night. It is not a slow, pool-side trip." },
              { q: "Who should use it as-is?", a: "First-time visitors, couples and solo travelers who want the highlights without piecing together their own logistics." },
              { q: "Who should modify it?", a: "Families with young kids, slow travelers, and anyone mainly after beach time — see the route alternatives below before you commit." }
            ].map(item => (
              <div key={item.q} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#0F1412]/5">
                <p className="font-serif font-bold text-[#1A2F23] mb-1">{item.q}</p>
                <p className="text-[#0F1412]/75 font-light leading-relaxed">{item.a}</p>
              </div>
            ))}
            <div className="p-4 rounded-xl bg-[#1A2F23] text-white flex flex-col justify-center items-start gap-2">
              <p className="font-serif font-bold">Want it tailored to you?</p>
              <Link
                to="/sri-lanka-trip-planner"
                onClick={() => handlePlannerClick("quick_answer")}
                className="inline-flex items-center gap-1.5 text-[#C5A059] font-bold text-xs hover:text-white"
              >
                Build my trip <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROUTE AT A GLANCE */}
      <section className="py-16 px-6 bg-[#FAF8F5] scroll-mt-24" id="route-overview">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Route Overview</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              7-Day Sri Lanka Route at a Glance
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Destination, main experience, approximate travel requirement, and overnight base for each day. Tap a day to jump to the full plan below.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-[#0F1412]/5 shadow-lg">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#1A2F23] text-white font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Day</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Main Experience</th>
                  <th className="p-4">Travel (approx.)</th>
                  <th className="p-4">Overnight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {itinerarySchedules.map((day) => (
                  <tr
                    key={day.day}
                    onClick={() => {
                      setActiveDayTab(day.day);
                      trackEvent("route_day_click", "engagement", `day_${day.day}`);
                      scrollToId("daily-itinerary-ledger");
                    }}
                    className="hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    <td className="p-4 font-mono font-bold text-[#C5A059]">Day {day.day}</td>
                    <td className="p-4 font-bold text-[#1A2F23]">{destinationLabel[day.day]}</td>
                    <td className="p-4 text-[#0F1412]/80 font-light">{dayHighlights[day.day]}</td>
                    <td className="p-4 text-[#0F1412]/80 font-light whitespace-nowrap">{day.day === 4 ? "Train, ~3.5-4h" : day.drivingTime}</td>
                    <td className="p-4 text-[#0F1412]/80 font-light">{day.hotels.split(",")[0].replace(/\s*\(.*\)/, "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center text-xs text-[#0F1412]/50 font-light">
            Travel times are approximate and vary with traffic, weather and stops en route.
          </div>
        </div>
      </section>

      {/* 4. IS THIS ITINERARY RIGHT FOR YOU */}
      <section className="py-16 px-6 bg-white border-t border-b border-[#0F1412]/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Honest Fit-Check</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Is This 7-Day Itinerary Right for You?
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              This route is relatively fast-paced by design. You have permission to remove destinations rather than rush through all seven.
            </p>
          </div>

          <div className="overflow-x-auto bg-[#FAF8F5] rounded-2xl border border-[#0F1412]/5 shadow-lg">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#1A2F23] text-white font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Traveler Type</th>
                  <th className="p-4">Verdict</th>
                  <th className="p-4">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {travelerFit.map(row => (
                  <tr key={row.type} className="hover:bg-white transition-colors">
                    <td className="p-4 font-bold text-[#1A2F23] whitespace-nowrap">{row.type}</td>
                    <td className="p-4 font-mono font-bold whitespace-nowrap">
                      <span className={
                        row.verdict === "Great fit" ? "text-emerald-700" :
                        row.verdict === "Too fast as written" ? "text-red-600" : "text-amber-600"
                      }>{row.verdict}</span>
                    </td>
                    <td className="p-4 text-[#0F1412]/80 font-light">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <button
              onClick={() => scrollToId("route-alternatives")}
              className="inline-flex items-center gap-2 text-[#C5A059] font-bold text-xs uppercase tracking-wider hover:text-[#1A2F23] cursor-pointer"
            >
              See route alternatives for your travel style <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. TRUST LINE — honest, no fabricated persona */}
      <section className="py-10 px-6 bg-[#FAF8F5] border-b border-[#0F1412]/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white border border-[#0F1412]/5">
          <img
            src="/adithya-oshada-founder-plan-sri-lanka.jpg"
            alt="Oshada Adithya, founder of Plan Sri Lanka"
            className="w-20 h-20 rounded-full object-cover shrink-0 border-2 border-[#C5A059]"
            loading="lazy"
          />
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider bg-[#C5A059]/10 px-2.5 py-1 rounded-full inline-block">
              Route maintained by Plan Sri Lanka
            </span>
            <p className="text-xs text-[#0F1412]/70 font-light leading-relaxed max-w-xl">
              This route and its drive times are reviewed against feedback from our SLTDA-registered driver network and travelers who've actually run it.
              We'll tell you plainly when a day is rushed rather than oversell it — see <Link to="/about-founder" className="text-[#C5A059] underline hover:text-[#1A2F23]">how we plan trips</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DAY-BY-DAY */}
      <section className="py-20 px-6 bg-white scroll-mt-24" id="daily-itinerary-ledger">
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Day-by-Day</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Your Day-by-Day 7-Day Schedule
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Morning, afternoon and evening for each stop, plus realistic travel time, where to stay, what it costs, who it suits, and one thing to watch out for.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-1.5 p-1 bg-[#FAF8F5] rounded-2xl scrollbar-none">
            {itinerarySchedules.map(day => (
              <button
                key={day.day}
                onClick={() => {
                  setActiveDayTab(day.day);
                  trackEvent("route_day_click", "engagement", `day_tab_${day.day}`);
                }}
                className={`flex-grow py-2.5 px-4 rounded-xl text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                  activeDayTab === day.day
                    ? "bg-[#C5A059] text-white shadow"
                    : "text-[#0F1412]/50 hover:text-[#0F1412] hover:bg-gray-200/50"
                }`}
              >
                Day {day.day}
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
                        DAY {day.day}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1A2F23] font-bold mt-1">
                        {day.title}
                      </h3>
                    </div>
                    <div className="bg-[#1A2F23] text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-center shrink-0">
                      🚗 Travel: {day.day === 4 ? "Train ~3.5-4h" : day.drivingTime}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">

                    <div className="md:col-span-2 space-y-5">
                      <div className="space-y-1.5">
                        <h4 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-[#C5A059]" /> Morning
                        </h4>
                        <p className="text-xs text-[#0F1412]/85 font-light leading-relaxed">{day.morning}</p>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                          <Car className="w-4 h-4 text-[#C5A059]" /> Afternoon
                        </h4>
                        <p className="text-xs text-[#0F1412]/85 font-light leading-relaxed">{day.afternoon}</p>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                          <Utensils className="w-4 h-4 text-[#C5A059]" /> Evening
                        </h4>
                        <p className="text-xs text-[#0F1412]/85 font-light leading-relaxed">{day.evening}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#1A2F23]/5 border border-[#1A2F23]/10 flex gap-2.5">
                        <Users className="w-4 h-4 text-[#1A2F23] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#1A2F23]/60 block">Best for:</span>
                          <p className="text-xs text-[#1A2F23]/90 font-light leading-relaxed">{day.bestFor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-[#0F1412]/5 space-y-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block">Where to Stay:</span>
                        <p className="text-[#1A2F23] font-serif font-bold leading-tight">{day.hotels}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block">Food Spotlights:</span>
                        <p className="text-[#0F1412]/80 font-light leading-tight">{day.foodSuggestions}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block">Photo Spots:</span>
                        <p className="text-[#0F1412]/80 font-light leading-tight">{day.photoSpots}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block">Estimated Daily Cost:</span>
                        <p className="text-emerald-700 font-mono font-bold leading-tight">{day.costs}</p>
                      </div>
                    </div>

                  </div>

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
                        <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-red-800 block">Don't Make This Mistake:</span>
                        <p className="text-xs text-red-950/80 font-light leading-relaxed">{day.commonMistakes}</p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Retention CTA after itinerary */}
          <div className="text-center pt-2">
            <p className="text-sm text-[#0F1412]/60 font-light mb-3">Want to change the route?</p>
            <Link
              to="/sri-lanka-trip-planner"
              onClick={() => handlePlannerClick("after_day_by_day")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2F23] text-white hover:bg-[#C5A059] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full shadow"
            >
              Customize Your Itinerary <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 7. DECISION TREE + ALTERNATIVES */}
      <section className="py-20 px-6 bg-[#1A2F23] text-white scroll-mt-24" id="route-alternatives">
        <div className="max-w-5xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Make It Yours</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              What Kind of Sri Lanka Trip Do You Want?
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Tap what matters most to you — we'll point you to the route change that fits.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {tripStyles.map(style => (
              <button
                key={style.id}
                onClick={() => handleStyleSelect(style)}
                className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedStyle === style.id
                    ? "bg-[#C5A059] text-white border-[#C5A059]"
                    : "bg-white/5 text-white/85 border-white/15 hover:border-[#C5A059]/60 hover:bg-white/10"
                }`}
              >
                <span>{style.emoji}</span> {style.label}
              </button>
            ))}
          </div>

          <div>
            <h3 className="text-center text-xl md:text-2xl font-serif font-bold text-white mb-6">
              Want a Different 7-Day Sri Lanka Route?
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {alternatives.map(alt => (
                <div
                  key={alt.id}
                  id={`alt-${alt.id}`}
                  className={`p-5 rounded-2xl border space-y-3 transition-all scroll-mt-32 ${
                    highlightedAlt === alt.id
                      ? "bg-[#C5A059]/20 border-[#C5A059] shadow-lg"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{alt.emoji}</span>
                    <h4 className="font-serif font-bold text-white">{alt.title}</h4>
                  </div>
                  <div className="space-y-2 text-[11px] leading-relaxed">
                    <p><span className="text-[#C5A059] font-bold uppercase font-mono text-[9px] block mb-0.5">What to change</span><span className="text-white/85 font-light">{alt.change}</span></p>
                    <p><span className="text-[#C5A059] font-bold uppercase font-mono text-[9px] block mb-0.5">Who it's for</span><span className="text-white/85 font-light">{alt.who}</span></p>
                    <p><span className="text-emerald-400 font-bold uppercase font-mono text-[9px] block mb-0.5">What you gain</span><span className="text-white/85 font-light">{alt.gain}</span></p>
                    <p><span className="text-red-400 font-bold uppercase font-mono text-[9px] block mb-0.5">What you give up</span><span className="text-white/85 font-light">{alt.giveUp}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-white/60 font-light mb-3">Not sure which route fits you?</p>
            <Link
              to="/sri-lanka-trip-planner"
              onClick={() => handlePlannerClick("after_alternatives")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A059] text-white hover:bg-white hover:text-[#1A2F23] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full shadow-xl"
            >
              Build Your Personalized Itinerary <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[11px] text-white/40 font-light mt-4 max-w-md mx-auto">
              Traveling as a family? See our <Link to="/sri-lanka-family-itinerary" onClick={() => trackEvent("internal_itinerary_click", "engagement", "family_link")} className="text-[#C5A059] underline hover:text-white">12-day family itinerary</Link>.
              Planning a romantic trip? See our <Link to="/sri-lanka-itinerary-august-couples" onClick={() => trackEvent("internal_itinerary_click", "engagement", "couples_link")} className="text-[#C5A059] underline hover:text-white">August couples itinerary</Link>.
            </p>
          </div>

        </div>
      </section>

      {/* 8. THE 15-IN-1 INTELLIGENT PLANNING SUITE */}
      <section className="py-20 px-6 bg-[#FAF8F5] scroll-mt-24" id="interactive-suite-anchor">
        <div className="max-w-5xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Planning Tools</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Calculate Your Own Numbers
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Cost calculator, driving-fatigue simulator, monsoon planner, packing checklist, route reorder tool and a few quick utilities — all in one place.
            </p>
          </div>

          <ItineraryPlanningSuite onWhatsAppRequest={handleWhatsAppDirect} />

        </div>
      </section>

      {/* 9. COST SECTION */}
      <section className="py-20 px-6 bg-white" ref={costSectionRef}>
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Budget</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              How Much Does a 7-Day Sri Lanka Trip Cost?
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Per person, for the full 7-day route above. Prices vary by season, accommodation and transport choices — treat these as planning ranges, not quotes.
            </p>
          </div>

          <div className="overflow-x-auto bg-[#FAF8F5] rounded-2xl border border-[#0F1412]/5 shadow-lg">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#1A2F23] text-white font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Category</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Mid-Range</th>
                  <th className="p-4">Luxury</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {[
                  { cat: "Accommodation (6 nights)", budget: "$150-210", mid: "$350-560", lux: "$900-2,000+" },
                  { cat: "Private driver/car (7 days)", budget: "$210-280", mid: "$210-280", lux: "$280-400" },
                  { cat: "Food", budget: "$70-105", mid: "$140-210", lux: "$250-400" },
                  { cat: "Entrance fees (Sigiriya, Yala, temples)", budget: "$90-110", mid: "$90-110", lux: "$90-130" },
                  { cat: "Safari (Yala jeep + park fee, shared)", budget: "$35-45", mid: "$45-60", lux: "$80-120" },
                  { cat: "Miscellaneous (tips, drinks, extras)", budget: "$30-50", mid: "$50-80", lux: "$100-200" }
                ].map((row) => (
                  <tr key={row.cat} className="hover:bg-white transition-colors">
                    <td className="p-4 font-bold text-[#1A2F23]">{row.cat}</td>
                    <td className="p-4 font-mono text-[#0F1412]/80">{row.budget}</td>
                    <td className="p-4 font-mono text-[#0F1412]/80">{row.mid}</td>
                    <td className="p-4 font-mono text-[#0F1412]/80">{row.lux}</td>
                  </tr>
                ))}
                <tr className="bg-[#1A2F23]/5 font-bold">
                  <td className="p-4 text-[#1A2F23]">Total per person</td>
                  <td className="p-4 font-mono text-emerald-700">$450-650</td>
                  <td className="p-4 font-mono text-emerald-700">$700-900</td>
                  <td className="p-4 font-mono text-emerald-700">$1,200-2,500+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5"><Users className="w-4 h-4 text-[#C5A059]" /> Solo vs. Couple</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                The private driver/car cost (~$210-280 for 7 days) is fixed per vehicle, not per person. Traveling as a couple splits that cost two ways, which
                usually lowers your per-person total more than it would for a solo traveler carrying the full fare alone.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#C5A059]" /> What moves the price</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Hotel tier is the single biggest lever, followed by whether you hire a private driver or mix in trains/public transport. Peak season (Dec-Mar) also runs higher than shoulder months.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-[#0F1412]/60 font-light mb-3">Want your own budget?</p>
            <Link
              to="/sri-lanka-trip-cost-from-india"
              onClick={() => { trackEvent("cost_calculator_click", "conversion", "cost_section_cta"); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2F23] text-white hover:bg-[#C5A059] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full shadow"
            >
              Calculate My Sri Lanka Trip <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. TRANSPORT — trade-offs, not just a table */}
      <section className="py-20 px-6 bg-[#FAF8F5] border-t border-b border-[#0F1412]/10">
        <div className="max-w-4xl mx-auto space-y-10">

          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Getting Around</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              How to Travel Around Sri Lanka in 7 Days
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Mountain roads are winding and slower than Google Maps suggests. Your transport choice is mostly a trade-off between speed, cost, convenience and experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            {[
              { title: "Private driver", note: "Most convenient option for a tight 7-day pace — door-to-door, no schedules to chase. Recommended default for this route." },
              { title: "Kandy-Ella train", note: "Worth prioritizing regardless of how you do the rest of the trip. Reserved seats sell out ~30 days ahead; delays of 1-2 hours are common." },
              { title: "Self-drive rental", note: "Cheapest per kilometer, but left-hand traffic, narrow mountain roads and aggressive overtaking make it stressful for first-timers." },
              { title: "Public bus", note: "Very cheap, very slow, no luggage racks. Only sensible if you have significantly more than 7 days." },
              { title: "Combination", note: "Train for Kandy-Ella, private driver for the rest — a practical middle ground many travelers choose." }
            ].map(item => (
              <div key={item.title} className="p-4 rounded-xl bg-white border border-[#0F1412]/5">
                <p className="font-serif font-bold text-[#1A2F23] mb-1">{item.title}</p>
                <p className="text-[#0F1412]/75 font-light leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-[#0F1412]/5 shadow-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#1A2F23] text-white font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Transport Mode</th>
                  <th className="p-4">Comfort</th>
                  <th className="p-4">Typical Speed</th>
                  <th className="p-4">Luggage</th>
                  <th className="p-4">Relative Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {[
                  { mode: "🚗 Private Driver / AC Car", comfort: "★★★★★", speed: "~35-45 km/h, mountain roads", safety: "Locked in the car", cost: "Mid-range" },
                  { mode: "🎫 Reserved Scenic Train", comfort: "★★★★", speed: "~30 km/h, scenic delays common", safety: "Limited overhead space", cost: "Very cheap" },
                  { mode: "🚗 Self-Drive Rental", comfort: "★★", speed: "Slower — unfamiliar roads", safety: "Moderate", cost: "High (deposits/excess)" },
                  { mode: "🚌 Public Bus", comfort: "★", speed: "Slowest, frequent stops", safety: "No luggage racks", cost: "Almost free" }
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

      {/* 11. ACCOMMODATION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Where to Sleep</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Where Should You Stay Each Night?
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Location matters more than the specific hotel. Here's the convenient area for each stop and a type of pick at each budget level.
            </p>
          </div>

          <div className="space-y-3">
            {itinerarySchedules.map(day => (
              <div key={day.day} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 grid sm:grid-cols-3 gap-4 items-start">
                <div className="sm:col-span-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A059] font-bold block">Night {day.day}</span>
                  <h4 className="font-serif font-bold text-[#1A2F23]">{destinationLabel[day.day]}</h4>
                  <p className="text-[11px] text-[#0F1412]/60 font-light leading-relaxed mt-1 flex gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" /> {stayNotes[day.day]}
                  </p>
                </div>
                <div className="sm:col-span-2 text-xs text-[#0F1412]/80 font-light leading-relaxed">
                  {day.hotels}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. PRACTICAL PLANNING — quick-answer layer before the full FAQ vault */}
      <section className="py-16 px-6 bg-[#FAF8F5] border-t border-b border-[#0F1412]/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Before You Go</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Before You Follow This Itinerary
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { q: "Is 7 days enough?", a: "Yes, with a private driver — it's the minimum to comfortably cover culture, hills, wildlife and coast." },
              { q: "Is this itinerary too rushed?", a: "It's brisk. If you prefer a slower trip, drop 1-2 stops rather than trying to fit everything in." },
              { q: "What's the best month?", a: "December to March is driest for both the hill country and south coast legs of this route." },
              { q: "Do I need a visa?", a: "Yes, almost all nationalities need an ETA before arrival — apply via the official channel, not resellers." },
              { q: "Should I hire a driver?", a: "For 7 days, yes — it's the biggest lever for keeping the pace comfortable rather than exhausting." },
              { q: "Is the Kandy-Ella train worth it?", a: "Yes — most travelers rate it the trip highlight. Book reserved seats 30 days ahead." },
              { q: "Yala or another safari park?", a: "Yala has the highest leopard density but gets crowded; Udawalawe is a quieter, more reliable elephant alternative." },
              { q: "Can I customize this itinerary?", a: "Yes — use the alternatives above or the free trip planner to adjust pace, stops and budget to your dates." }
            ].map(item => (
              <div key={item.q} className="p-4 rounded-xl bg-white border border-[#0F1412]/5">
                <p className="font-serif font-bold text-[#1A2F23] text-sm mb-1">{item.q}</p>
                <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. HEALTH, SAFETY DOSSIER */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Safety Dossier</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              Emergency Safety & Well-Being
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              How to bypass common scams, handle health basics, and ensure family comfort on the ground.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-3">
              <ShieldAlert className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">Common Tourist Scams</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Bypass the <strong>Milk Powder scam</strong> in Colombo and unsolicited "gem valuer" offers near Galle. Ignore strangers claiming a site is "closed today"; verify with your driver first.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-3">
              <Users className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">Solo Female Travel Care</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Sri Lanka is generally welcoming. Dress modestly away from beaches, book reserved 2nd-class rail wagons, and avoid dark unlit lanes at night.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-3">
              <Clock className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">Emergency Contacts</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Dial <strong>1912</strong> for the Tourist Police, <strong>119</strong> for general police, and <strong>110</strong> for ambulance dispatch. Keep your driver's phone number handy.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 14. SEARCHABLE FAQ VAULT */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">{itineraryFaqs.length} FAQs</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              More Planning Questions, Answered
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Search or filter our full FAQ library, covering logistics, health, money, connectivity, weather, safety and culture.
            </p>
          </div>

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

          <div className="space-y-3 min-h-[250px]">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.slice(0, 15).map((faq) => {
                const uniqueIndex = itineraryFaqs.indexOf(faq);
                const isOpen = activeFaq === uniqueIndex;
                return (
                  <div
                    key={uniqueIndex}
                    className="bg-white rounded-2xl border border-[#0F1412]/5 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => {
                        setActiveFaq(isOpen ? null : uniqueIndex);
                        trackEvent("faq_accordion_toggle", "engagement", `itinerary_faq_${uniqueIndex}`);
                      }}
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
                No matching questions found. Try a different search term like &quot;train&quot; or &quot;cash&quot;.
              </div>
            )}

            {filteredFaqs.length > 15 && (
              <p className="text-center text-xs text-gray-400 pt-4 font-mono">
                Showing top 15 matching questions. Filter categories or refine your search to see more.
              </p>
            )}
          </div>

        </div>
      </section>

      {/* 15. EXIT INTENT MODAL */}
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
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-[#C5A059]/10 text-[#C5A059] rounded-full flex items-center justify-center mx-auto text-xl">
                🧳
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-bold">Don&apos;t Lose Cellular Signal in the Hills</span>
                <h3 className="font-serif text-2xl font-bold text-[#1A2F23]">Get the Offline Survival PDF Guide</h3>
                <p className="text-xs text-[#0F1412]/70 font-light leading-relaxed">
                  A free 24-page offline-ready guide with regional checklists, emergency contacts, and packing notes — useful even when your signal drops in the hills.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowExitIntent(false);
                  handleWhatsAppDirect("Hi Plan Sri Lanka! Please send me the offline Survival PDF Guide for my 7-day tour.");
                }}
                className="w-full py-4 bg-[#C5A059] text-white hover:bg-[#1A2F23] font-serif tracking-widest text-xs uppercase font-bold rounded-full transition-all cursor-pointer shadow-lg"
              >
                Download Free PDF Guide ➔
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 16. STICKY MOBILE CTA BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A2F23] border-t border-[#C5A059]/30 text-white py-4.5 px-6 shadow-2xl">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <p className="text-xs font-mono tracking-wide text-white/90">
              Local coordinators online (Response time: &lt; 3 mins)
            </p>
          </div>
          <div className="w-full sm:w-auto flex gap-2">
            <Link
              to="/sri-lanka-trip-planner"
              onClick={() => handlePlannerClick("sticky_bar")}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-mono font-bold rounded-full transition-all cursor-pointer text-center"
            >
              🗺️ Build My Trip
            </Link>
            <button
              onClick={handleMainWhatsApp}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#C5A059] hover:bg-white hover:text-[#1A2F23] text-white text-xs uppercase tracking-widest font-mono font-bold rounded-full transition-all cursor-pointer text-center shrink-0"
            >
              WhatsApp ➔
            </button>
          </div>
        </div>
      </div>

      {/* Trip Planner CTA banner */}
      <section className="py-14 px-6 bg-[#1A2F23]">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Ready to Build Your Sri Lanka Trip?
          </h3>
          <p className="text-sm text-white/70 font-light max-w-xl mx-auto">
            This 7-day loop is a proven starting point — but pacing, hotel tier and add-on stops all depend on when you travel. Use the free trip planner to adjust it to your own dates and travel style.
          </p>
          <Link
            to="/sri-lanka-trip-planner"
            onClick={() => handlePlannerClick("bottom_banner")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A059] text-white hover:bg-white hover:text-[#1A2F23] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full shadow-xl"
          >
            Build My Trip <ArrowRight className="w-4 h-4" />
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
                <span className="text-[#C5A059] font-serif italic text-lg block">Prefer WhatsApp over the full planner?</span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#1A2F23] tracking-tight leading-tight font-bold">
                  Get Your Personalized <br />
                  <span className="italic font-normal text-[#C5A059] font-serif">Sri Lanka Itinerary Details</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#0F1412]/70 font-light max-w-lg mx-auto">
                  Share your travel month below and a local coordinator will follow up on WhatsApp with route options and pricing.
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
                  <h4 className="font-serif font-bold text-xl text-[#1A2F23]">Details Submitted!</h4>
                  <p className="text-xs text-[#0F1412]/75 leading-relaxed font-light">
                    A local coordinator will follow up on WhatsApp with your offline PDF guide and route options.
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
