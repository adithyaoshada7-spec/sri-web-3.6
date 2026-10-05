import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  Compass,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  Users,
  Wallet,
  Car,
  MapPin,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  ChevronDown,
  Globe,
  Plane,
  AlertTriangle,
  Heart,
  Baby,
  Hotel,
  Coffee,
  Train,
  Check,
  Share2,
  HelpCircle,
  Sun,
  CloudRain,
  PhoneCall,
  DollarSign
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import InteractiveRouteFunnelModal from "./InteractiveRouteFunnelModal";

export default function SrilankaOctoberPage() {
  usePageMetadata({
    title: "Where To Go In Sri Lanka In October (2026 Guide) | Costs, Itinerary & Family Advice From Chennai",
    description: "The ultimate October Sri Lanka travel guide for families and travelers from Chennai. Inter-monsoon weather breakdown, accurate costs in INR/LKR, verified driver safety, and custom 7-day itinerary.",
    canonicalUrl: "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-october",
    ogUrl: "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-october",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [isFunnelOpen, setIsFunnelOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleOpenFunnel = (source: string) => {
    trackEvent("open_funnel_click", "engagement", `october_page_${source}`);
    setIsFunnelOpen(true);
  };

  const faqs = [
    {
      q: "Is October a good time to visit Sri Lanka from Chennai?",
      a: "Yes! October is an excellent transitional month. It marks the inter-monsoon period before the peak winter crowds arrive. You get emerald-green highlands, roaring waterfalls, clear morning sunshine, uncrowded UNESCO sites, and significantly better hotel rates. Flight times from Chennai (MAA) to Colombo (CMB) are only 1 hour 15 minutes."
    },
    {
      q: "How much does a 7-day Sri Lanka trip cost from Chennai in October?",
      a: "For an average traveler, a comfortable 7-day holiday ranges between ₹35,000 – ₹55,000 per person. Roundtrip direct flights from Chennai cost approximately ₹12,500 – ₹21,000 (USD 150 – 250), comfortable family stays average around LKR 20,000 (~USD 65) per night, daily food is about USD 15 – 30, and a private air-conditioned car with a verified local driver is USD 50 – 80 per day."
    },
    {
      q: "What is the weather like in Sri Lanka during October?",
      a: "October is the second inter-monsoonal period. Mornings are typically bright, warm, and sunny, while afternoon or evening tropical showers can occur. The Central Highlands (Nuwara Eliya, Ella) and Cultural Triangle (Sigiriya, Dambulla) are lush and vibrant. By pacing your days with morning sightseeing, rain rarely disrupts travel."
    },
    {
      q: "Why is a private car with a verified driver recommended over public transport for families?",
      a: "Navigating Sri Lanka's winding mountain roads and busy stations via public buses or unreserved trains with luggage and children can lead to heavy fatigue and delays. A vetted private driver-guide provides child safety, flexible bathroom/snack breaks, authentic local dining tips, and total luggage security."
    },
    {
      q: "How does Plan Sri Lanka's free route validator work?",
      a: "Our interactive route planner is 100% free with zero paywalls. You select your trip vibe, target destinations, duration, and group composition (including dedicated Adult and Child counts for families), and receive a verified day-by-day feasible route blueprint with estimated budgets in INR, USD, or LKR via WhatsApp."
    }
  ];

  return (
    <div className="bg-[#FCFBF7] text-[#1A2D24] min-h-screen pt-24 md:pt-32 pb-20 font-sans selection:bg-[#D4AF37]/30 selection:text-[#1F3D2B]">
      {/* STRUCTURED DATA (JSON-LD) FOR SEARCH ENGINE TRUST & CRAWL BOTS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-october#article",
                "isPartOf": {
                  "@type": "WebPage",
                  "@id": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-october"
                },
                "headline": "The Ultimate October Travel Guide to Sri Lanka: Complete Costs, Itinerary, and Family Advice from Chennai",
                "description": "Comprehensive October Sri Lanka travel guide for Indian travelers and families departing Chennai. Transitional weather analysis, itemized costs, verified private driver benefits, scam prevention, and an optimized 7-day family route.",
                "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
                "datePublished": "2026-10-05T08:00:00+05:30",
                "dateModified": "2026-10-05T12:00:00+05:30",
                "mainEntityOfPage": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-october",
                "author": {
                  "@type": "Person",
                  "name": "Oshada Adithya",
                  "url": "https://plan-srilanka.com/about-founder",
                  "jobTitle": "Founder & Travel Logistics Architect"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Plan Sri Lanka",
                  "url": "https://plan-srilanka.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://plan-srilanka.com/logo.png"
                  }
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-october#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://plan-srilanka.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Seasonal Guides",
                    "item": "https://plan-srilanka.com/best-time-to-visit-sri-lanka"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Where to Go in October",
                    "item": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-october"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-october#faq",
                "mainEntity": faqs.map((f) => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16 text-center">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs font-mono text-[#7A7365]">
          <Link to="/" className="hover:text-[#1F3D2B] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/best-time-to-visit-sri-lanka" className="hover:text-[#1F3D2B] transition-colors">Seasonality</Link>
          <span>/</span>
          <span className="text-[#1F3D2B] font-bold">October Travel Guide</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F3D2B]/10 border border-[#1F3D2B]/20 text-[#1F3D2B] text-xs font-mono font-bold uppercase tracking-wider mb-6">
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Chennai Gateway & Family Special • October 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1F3D2B] leading-tight mb-6">
          The Ultimate October Travel Guide to Sri Lanka: Complete Costs, Itinerary, and Family Advice from Chennai
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#4A4438] max-w-3xl mx-auto leading-relaxed mb-8">
          Are you dreaming of an escape to the tropical paradise of Sri Lanka? From misty emerald peaks and ancient UNESCO citadels to uncrowded golden shores, discover how to navigate October's transitional weather with total financial clarity, verified local drivers, and zero tour agency stress.
        </p>

        {/* Author & Editorial Metadata Badge */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#7A7365] pb-8 border-b border-[#E8E4D9]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#1F3D2B] text-[#D4AF37] font-bold flex items-center justify-center font-serif text-sm">OA</span>
            <span>By <strong>Oshada Adithya</strong> (Founder, Plan Sri Lanka)</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            11 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Transit & Cost Datasets
          </span>
        </div>

        {/* HERO PULSING CTA BUTTON */}
        <div className="mt-8">
          <button
            onClick={() => handleOpenFunnel("hero_cta")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-sm uppercase tracking-wider shadow-xl hover:bg-[#142A1D] transition-all duration-300 ring-4 ring-[#D4AF37]/30 hover:ring-[#D4AF37]/60 animate-pulse hover:animate-none scale-100 hover:scale-105 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
            <span>Create My Own Route Free</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[11px] font-mono text-[#7A7365] mt-2">
            ✨ 100% Free • Interactive route validator • Direct WhatsApp blueprint
          </p>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* INTRO CALLOUT */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E4D9] shadow-sm space-y-4">
          <p className="text-base text-[#2C271E] leading-relaxed">
            Planning a trip to a foreign destination can quickly transform from an exciting adventure into an overwhelming chore. With countless commercial travel agencies, rigid tour packages, and conflicting online forum advice, how do you ensure your vacation is everything you dreamed of without breaking the bank or stressing over logistics?
          </p>
          <p className="text-base text-[#2C271E] leading-relaxed">
            The answer is simple: <strong className="text-[#1F3D2B]">Plan Sri Lanka</strong> (<Link to="/" className="text-[#1F3D2B] underline decoration-[#D4AF37] font-semibold hover:text-[#D4AF37]">plan-srilanka.com</Link>). In this comprehensive October guide, we explore why savvy modern travelers and families from Chennai choose Plan Sri Lanka over traditional tour operators and cookie-cutter travel agencies.
          </p>
        </section>

        {/* SECTION 1: WHY VISIT IN OCTOBER? */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">1</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Why Visit Sri Lanka in October? (The Transitional Window)
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            October is a fascinating and transitional month in Sri Lanka. It marks the second inter-monsoon period, bridging the gap between major weather shifts across the island. While some coastal stretches experience passing tropical afternoon showers, others offer glorious sunshine, roaring mountain waterfalls, and incredible wildlife viewings without the heavy crowds of the peak winter season.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">🌿</div>
              <h3 className="font-serif font-bold text-sm text-[#1F3D2B]">Lush Green Landscapes</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                The inter-monsoonal showers breathe vibrant life into the central highlands. Waterfalls in Nuwara Eliya and Ella roar at peak volume, and rolling Ceylon tea plantations glow a brilliant emerald-green.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">🏛️</div>
              <h3 className="font-serif font-bold text-sm text-[#1F3D2B]">Significantly Fewer Crowds</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Because October falls just before the official peak winter tourism rush, you can explore UNESCO wonders like <Link to="/experience/sigiriya-rock-fortress" className="text-[#1F3D2B] font-semibold underline hover:text-[#D4AF37]">Sigiriya Rock</Link> and Kandy's Temple of the Tooth without battling tour bus hordes.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">💰</div>
              <h3 className="font-serif font-bold text-sm text-[#1F3D2B]">Better Value & Luxury Stays</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Boutique hill-country villas and beach retreats offer exceptional shoulder-season rates. Expect 25% to 40% lower accommodation prices compared to peak December and January rates.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE FLAW WITH TRADITIONAL TRAVEL AGENCIES */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">2</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              The Flaw with Traditional Travel Agencies and Competitors
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            Before diving into how Plan Sri Lanka is revolutionizing island travel, it is worth looking at why conventional package tour operators often fail modern travelers:
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-red-900">Rigid Itineraries & Rushed Pacing</h4>
                <p className="text-xs text-red-800 mt-1">
                  Most conventional agencies force you into fixed schedules. If you want to spend an extra hour watching wild elephants in Minneriya or lingering over Ceylon high tea in Ella, a rigid tour package from a standard competitor won't let you.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-red-900">Hidden Costs, Paywalls & Commission Traps</h4>
                <p className="text-xs text-red-800 mt-1">
                  Many online planning tools and generic agencies lure you in with "free" templates only to gatekeep essential details behind consultation fees, unexpected booking markups, or mandatory stops at overpriced commission-heavy souvenir shops.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-red-900">Impersonal, Spreadsheet-Driven Tourism</h4>
                <p className="text-xs text-red-800 mt-1">
                  Mass-market operators treat travelers like numbers on a spreadsheet, shuttling them through overcrowded tourist traps with little regard for personal pace, children's rest needs, or regional weather nuances.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#4A4438] italic">
            Plan Sri Lanka was built from the ground up to solve these exact frustrations, placing total control, transparent pricing, and bespoke personalization directly into your hands.
          </p>
        </section>

        {/* SECTION 3: 100% FREE INTERACTIVE ROUTE PLANNER */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">3</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              A 100% Free Interactive Trip Planner vs. Expensive Competitor Consultations
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            One of the standout reasons savvy travelers choose Plan Sri Lanka is our state-of-the-art interactive route validator and trip planner.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-700">
                <XCircle className="w-4 h-4 text-red-500" />
                <span>The Competitor Flaw</span>
              </div>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Mainstream agencies charge hefty consultation fees just to draft a basic route, or they lock standard itineraries behind paid memberships and rigid deposit terms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The Plan Sri Lanka Advantage</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                We provide a <strong>100% free interactive trip planner tool</strong>. Design, test, and validate your travel routes, group sizes, and budget tiers directly on our platform without spending a single rupee before booking.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-white border border-[#E8E4D9]">
              <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">✨ Tailored Travel Vibes</h4>
              <p className="text-xs text-[#5A5448] mt-1">
                Filter experiences based on your travel style—whether you seek cultural heritage, romantic highland tea estates, wildlife safaris, food adventures, or family-friendly relaxing beaches.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E8E4D9]">
              <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">👨‍👩‍👧‍👦 Complete Budget & Group Flexibility (With Dedicated Family Breakdown)</h4>
              <p className="text-xs text-[#5A5448] mt-1">
                Specify your group size—solo, couple, or family (with individual Adult and Child counts)—and choose your budget tier with instant conversions across INR (₹), USD ($), LKR (Rs), and other global currencies.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E8E4D9]">
              <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">🛡️ Zero Financial Risk</h4>
              <p className="text-xs text-[#5A5448] mt-1">
                Experiment with durations, stops, and transfer paths as many times as you like. The planning phase is completely transparent and designed to give you clarity before you book.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: OCTOBER COSTS & BUDGET BREAKDOWN FOR CHENNAI TRAVELERS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">4</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              October Travel Costs & Budget Breakdown for Chennai Travelers
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            Planning your finances beforehand ensures a stress-free holiday. Here is a clear breakdown of typical expenses when traveling from Chennai (MAA) to Sri Lanka (CMB) in October:
          </p>

          {/* ITEMISED COST TABLE */}
          <div className="overflow-x-auto bg-white rounded-2xl border border-[#E8E4D9] shadow-sm">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#1F3D2B] text-[#D4AF37] font-mono uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">Cost Category</th>
                  <th className="p-4">Estimate in USD ($)</th>
                  <th className="p-4">Estimate in INR (₹)</th>
                  <th className="p-4">Estimate in LKR (Rs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4D9]">
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">
                    <div className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Roundtrip Flight (Chennai - Colombo)</span>
                    </div>
                    <span className="text-[10px] text-[#7A7365] font-normal block mt-0.5">Direct 80-min flight via IndiGo, SriLankan, Air India</span>
                  </td>
                  <td className="p-4 font-mono font-bold">$150 – $250</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">₹12,500 – ₹21,000</td>
                  <td className="p-4 font-mono">Rs 45,000 – 75,000</td>
                </tr>

                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">
                    <div className="flex items-center gap-1.5">
                      <Hotel className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Comfortable Family Hotel (Per Night)</span>
                    </div>
                    <span className="text-[10px] text-[#7A7365] font-normal block mt-0.5">3-4 star family room or boutique villa with breakfast</span>
                  </td>
                  <td className="p-4 font-mono font-bold">$65 – $70</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">₹5,400 – ₹5,800</td>
                  <td className="p-4 font-mono">Rs 20,000 / night</td>
                </tr>

                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">
                    <div className="flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Food & Dining (Per Person Daily)</span>
                    </div>
                    <span className="text-[10px] text-[#7A7365] font-normal block mt-0.5">Mix of authentic local rice & curry, rotis, and family restaurants</span>
                  </td>
                  <td className="p-4 font-mono font-bold">$15 – $30</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">₹1,250 – ₹2,500</td>
                  <td className="p-4 font-mono">Rs 4,500 – 9,000</td>
                </tr>

                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Key Activities & Entry Tickets</span>
                    </div>
                    <span className="text-[10px] text-[#7A7365] font-normal block mt-0.5">Sigiriya citadel ($36), Kandy Tooth Temple ($6), elephant safari ($45)</span>
                  </td>
                  <td className="p-4 font-mono font-bold">$50 – $100 / person</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">₹4,200 – ₹8,400</td>
                  <td className="p-4 font-mono">Rs 15,000 – 30,000</td>
                </tr>

                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">
                    <div className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Private Car & Verified Chauffeur-Guide</span>
                    </div>
                    <span className="text-[10px] text-[#7A7365] font-normal block mt-0.5">A/C sedan or van, inclusive of fuel, highway tolls & driver stay</span>
                  </td>
                  <td className="p-4 font-mono font-bold">$50 – $80 / day</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">₹4,200 – ₹6,700 / day</td>
                  <td className="p-4 font-mono">Rs 15,000 – 24,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#5A5448]">
            💡 <em>Need more detail on flight times and budgeting? Check out our dedicated <Link to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" className="text-[#1F3D2B] font-semibold underline hover:text-[#D4AF37]">Chennai to Sri Lanka Cost Pillar Guide</Link> or our <Link to="/sri-lanka-5-day-itinerary-from-chennai" className="text-[#1F3D2B] font-semibold underline hover:text-[#D4AF37]">5-Day Chennai Express Itinerary</Link>.</em>
          </p>
        </section>

        {/* SECTION 5: TRUSTED LOCAL DRIVERS VS UNRELIABLE PUBLIC TRANSPORT */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">5</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Trusted, Verified Local Drivers vs. Unreliable Public Transport
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            Navigating a foreign country's roads, public transport schedules, and local traffic can be one of the most stressful parts of traveling, especially with children and older parents. At Plan Sri Lanka, we believe your vacation should be relaxing from the moment you touch down.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-red-700 block">The Competitor & Public Transit Flaw</span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Attempting to navigate Sri Lanka via crowded public red buses or unreserved 3rd class trains with heavy luggage and tired kids leads to burnout. Furthermore, many online operators outsource drivers randomly, causing communication barriers and unverified safety standards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-800 block">The Plan Sri Lanka Advantage</span>
              <p className="text-xs text-emerald-900 leading-relaxed">
                We connect you exclusively with professional, vetted local drivers who also serve as licensed, knowledgeable guides. Your safety, comfort, and peace of mind are prioritized from arrival to departure.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-xl bg-white border border-[#E8E4D9] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">Local Expertise & Insider Knowledge</h4>
                <p className="text-xs text-[#5A5448] mt-0.5">
                  Our drivers know the island inside and out. They share historical context, recommend hygienic roadside fruit stalls and authentic family restaurants, and help you bypass long ticket queues or tourist traps.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E8E4D9] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">A Stress-Free Travel Companion</h4>
                <p className="text-xs text-[#5A5448] mt-0.5">
                  You never have to worry about mountain navigation, fuel stops, parking, or haggling with roadside vendors. Sit back in an air-conditioned cabin, enjoy panoramic highland views, and focus entirely on your family.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: AIRPORT TRANSPORT: TAXI BOOKING VS ONLINE PRE-BOOKING */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">6</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Airport Transport: Taxi Booking vs. Online Pre-Booking
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            When you land at Colombo Bandaranaike International Airport (CMB), sorting out your onward transport is crucial for a smooth arrival experience:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">Online Pre-Booking (Recommended)</h4>
              </div>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                It is always safer, calmer, and more cost-effective to pre-book your airport transfer and full-trip transport online through a trusted platform like Plan Sri Lanka before flying out of Chennai. Your driver meets you with a nameboard at arrivals—protecting you from aggressive lobby solicitors and inflated airport surcharges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">Official Airport Counters (If Booking on Arrival)</h4>
              </div>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                If you arrive without prior bookings, proceed directly to the registered airport taxi counters inside the terminal (such as Lanka Taxi) rather than negotiating with independent drivers outside the terminal gates.
              </p>
            </div>
          </div>
        </section>

        {/* MID-PAGE PROMOTIONAL INTERACTIVE FUNNEL CARD */}
        <section className="bg-gradient-to-br from-[#1F3D2B] to-[#142A1D] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4 text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
              Free Micro-SaaS Route Feasibility Engine
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Planning Your October Trip Right Now?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Test your October route stops, specify your exact family adult and child counts, and receive a customized day-by-day plan with transparent local chauffeur pricing directly on WhatsApp.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleOpenFunnel("mid_page_box")}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#D4AF37] text-[#1F3D2B] font-mono font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white transition-all shadow-lg scale-100 hover:scale-105 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#1F3D2B]" />
                <span>Launch Free Route Planner</span>
                <ArrowRight className="w-4 h-4 text-[#1F3D2B]" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 7: FULLY ADJUSTABLE ITINERARIES VS RIGID TOUR PACKAGES */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">7</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Fully Adjustable Itineraries vs. Rigid Mass-Market Tour Packages
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            No two families travel the same way. Why should your vacation itinerary be an identical carbon-copy of everyone else's?
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-[#E8E4D9]">
              <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">🗺️ Seamless Route Optimization</h4>
              <p className="text-xs text-[#5A5448] mt-1">
                Our platform ensures that even as you customize your stops, your route remains geographically logical. You won't waste valuable vacation hours backtracking across central mountain passes because transitions are sequenced for highway speed and efficiency.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E8E4D9]">
              <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">⚡ Dynamic Weather & Pace Adjustments</h4>
              <p className="text-xs text-[#5A5448] mt-1">
                October features microclimates. If an afternoon thunderstorm rolls into Kandy, your private driver can effortlessly pivot your morning schedule forward, explore indoor cultural sites, or take your children to a serene spice garden.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: SCAM PREVENTION ADVICE FOR TOURISTS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">8</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Scam Prevention Advice for Tourists
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            While Sri Lankans are globally admired for their warm hospitality and gentle smiles, international tourists can occasionally encounter minor pricing traps. Keep these ground rules in mind:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-[#1F3D2B] block">🛺 Tuk-Tuk Meters & Fixed Rates</span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                For short city rides in Colombo or Kandy, always demand that the meter is turned on or agree on a firm price beforehand. When traveling between cities, stick with your private vehicle.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-[#1F3D2B] block">🎟️ Unauthorized Monument Guides</span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                At ancient landmarks like Sigiriya or Polonnaruwa, polite strangers may offer "free" guidance and demand excessive tips later. Always hire certified guides from the official ticket counters.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-[#1F3D2B] block">🧳 Unsolicited Luggage Help</span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Be mindful of independent porters at railway stations or airport exits who grab your bags without consent and demand heavy tips. Keep luggage with your dedicated driver.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#5A5448]">
            💡 <em>Read our exhaustive guide: <Link to="/things-never-to-overpay-for-in-sri-lanka" className="text-[#1F3D2B] font-semibold underline hover:text-[#D4AF37]">5 Things You Should Never Overpay For in Sri Lanka</Link>.</em>
          </p>
        </section>

        {/* SECTION 9: TRAVELING WITH CHILDREN: ESSENTIAL ADVICE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">9</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Traveling with Children: Essential Advice for Sri Lanka
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            Sri Lanka is one of the safest and most child-friendly destinations in South Asia, but traveling with young kids requires intelligent itinerary pacing:
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] flex items-start gap-3">
              <Baby className="w-5 h-5 text-[#1F3D2B] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">Pace Your Itinerary (Max 1-2 Activities Daily)</h4>
                <p className="text-xs text-[#5A5448] mt-1">
                  Avoid the classic mistake of trying to cover 8 cities in 5 days. Stick to 1 major morning activity and let kids swim or relax at the hotel pool in the afternoon.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] flex items-start gap-3">
              <Car className="w-5 h-5 text-[#1F3D2B] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">Comfortable, Air-Conditioned Private Transport</h4>
                <p className="text-xs text-[#5A5448] mt-1">
                  Public buses and unreserved carriages are ill-suited for young children and strollers. A private vehicle allows you to stop whenever toddlers need a snack, clean washroom, or stretch break.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1F3D2B] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B]">Pack Motion Sickness Remedies & Essentials</h4>
                <p className="text-xs text-[#5A5448] mt-1">
                  Highland roads between Kandy, Nuwara Eliya, and Ella have winding curves. Carry pediatric motion sickness medication, bottled drinking water, sunscreen, and child insect repellent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: OPTIMIZED 7-DAY SRI LANKA ITINERARY (FROM CHENNAI) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">10</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Optimized 7-Day Sri Lanka Itinerary (From Chennai)
            </h2>
          </div>

          <p className="text-base text-[#3A3428] leading-relaxed">
            This route is curated specifically for families, couples, and travelers departing Chennai in October, ensuring a balanced mix of cultural wonders, cool tea estates, scenic train journeys, and restorative relaxation:
          </p>

          <div className="space-y-4">
            {/* Day 1 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-xs">Day 1</span>
                <span className="text-xs text-[#7A7365] font-mono">Night: Kandy</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Arrival & Scenic Transfer to Kandy</h3>
              <p className="text-xs text-[#4A4438] leading-relaxed">
                Take the short 75-minute morning flight from Chennai (MAA) to Colombo (CMB). Meet your dedicated English-fluent driver in arrivals and travel through scenic lowland palm groves toward Kandy. En route, stop at the Pinnawala Elephant sanctuary where children can watch elephant herds bathing in the river. Check into your hillside Kandy hotel.
              </p>
            </div>

            {/* Day 2 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-xs">Day 2</span>
                <span className="text-xs text-[#7A7365] font-mono">Night: Kandy</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Kandy Cultural Triangle Exploration</h3>
              <p className="text-xs text-[#4A4438] leading-relaxed">
                Explore the sacred UNESCO Temple of the Sacred Tooth Relic (Sri Dalada Maligawa) during morning prayer offerings. Stroll around tranquil Kandy Lake, visit the Royal Botanical Gardens in Peradeniya with giant bamboo trees, and enjoy an evening traditional Kandyan cultural dance with fire walking.
              </p>
            </div>

            {/* Day 3 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-xs">Day 3</span>
                <span className="text-xs text-[#7A7365] font-mono">Night: Ella</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">The Iconic Blue Mountain Train to Ella</h3>
              <p className="text-xs text-[#4A4438] leading-relaxed">
                Board the legendary blue train through misty mountain ridges, roaring waterfalls, and carpeted tea plantations—an unforgettable memory for kids and photography lovers. Your private driver transports your luggage ahead directly to your Ella hotel, leaving you free to enjoy the rails unencumbered.
              </p>
            </div>

            {/* Day 4 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-xs">Day 4</span>
                <span className="text-xs text-[#7A7365] font-mono">Night: Ella</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Ella Adventures & Nine Arch Bridge</h3>
              <p className="text-xs text-[#4A4438] leading-relaxed">
                Walk along the jungle path to see trains pass over the colossal colonial stone Nine Arch Bridge. Later, embark on an easy, kid-friendly hike up Little Adam’s Peak for 360-degree views across Ella Gap, followed by relaxation at a mountain-view café.
              </p>
            </div>

            {/* Day 5 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-xs">Day 5</span>
                <span className="text-xs text-[#7A7365] font-mono">Night: Nuwara Eliya</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Nuwara Eliya (Little England) & Tea Factories</h3>
              <p className="text-xs text-[#4A4438] leading-relaxed">
                Short scenic drive up to Nuwara Eliya at 1,868m elevation. Tour a working colonial tea estate and taste pure Ceylon Orange Pekoe. Visit strawberry farms where children can pick fresh fruit, take a pedal-boat ride on Gregory Lake, and relax by cozy log fires in the evening chill.
              </p>
            </div>

            {/* Day 6 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-xs">Day 6</span>
                <span className="text-xs text-[#7A7365] font-mono">Night: Sigiriya</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Sigiriya Lion Rock & Dambulla Caves</h3>
              <p className="text-xs text-[#4A4438] leading-relaxed">
                Head north into the drier Cultural Triangle plains. Tour the breathtaking ancient citadel of Sigiriya Rock Fortress in the cooler morning air, or visit the historic gold-buddha cave temple complex at Dambulla. If time permits, embark on an open-top safari in Minneriya National Park to observe large elephant gatherings.
              </p>
            </div>

            {/* Day 7 */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-xs">Day 7</span>
                <span className="text-xs text-[#7A7365] font-mono">Departure</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Colombo City Sightseeing & Return to Chennai</h3>
              <p className="text-xs text-[#4A4438] leading-relaxed">
                Drive smoothly back to Colombo via the high-speed expressway. Do some last-minute shopping for Ceylon tea, spices, and handmade crafts at Barefoot or Odel, before your driver delivers you to CMB airport for your quick return evening flight to Chennai.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: FAQS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">11</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Frequently Asked Questions (October Sri Lanka Travel)
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1F3D2B] hover:text-[#D4AF37] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-200 ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#5A5448] leading-relaxed border-t border-[#E8E4D9]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 12: CONCLUSION & FINAL CTA */}
        <section className="bg-white p-8 rounded-3xl border border-[#E8E4D9] shadow-sm text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
            Conclusion: Experience the Difference Today
          </h2>
          <p className="text-sm sm:text-base text-[#4A4438] max-w-2xl mx-auto leading-relaxed">
            Choosing how to spend your precious vacation time and hard-earned money is a big decision. While traditional competitors offer rigid packages, hidden fees, and impersonal service, Plan Sri Lanka delivers complete freedom, transparent planning, and trusted local support.
          </p>
          <p className="text-sm sm:text-base text-[#4A4438] max-w-2xl mx-auto leading-relaxed font-semibold">
            Stop wrestling with rigid tour groups and confusing guidebooks. Take advantage of our free interactive trip planner, secure a trusted local driver, and design a custom itinerary that reflects your ultimate dream vacation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleOpenFunnel("conclusion_cta")}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-sm uppercase tracking-wider shadow-xl hover:bg-[#142A1D] transition-all duration-300 ring-4 ring-[#D4AF37]/30 hover:ring-[#D4AF37]/60 animate-pulse hover:animate-none scale-100 hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span>Create My Own Route Free</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* BIDIRECTIONAL INTERNAL LINKING CARDS SECTION */}
        <section className="pt-6 border-t border-[#E8E4D9] space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-1">
              Topical Topic Cluster
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3D2B]">
              Continue Exploring Expert Sri Lanka Guides
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/why-choose-plan-sri-lanka"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#D4AF37] block mb-1">Our Advantage</span>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">Why Choose Plan Sri Lanka?</h4>
                <p className="text-[11px] text-[#5A5448] mt-1">Outperforming traditional agencies with 100% free planning & vetted local drivers.</p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#D4AF37] block mb-1">Gateway Costs</span>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">Chennai to Sri Lanka Cost</h4>
                <p className="text-[11px] text-[#5A5448] mt-1">80-minute flights, visa fees, hotel tiers & daily spending estimates in INR.</p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/where-to-go-in-sri-lanka-in-june"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#D4AF37] block mb-1">Seasonal Weather</span>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">Where To Go In June</h4>
                <p className="text-[11px] text-[#5A5448] mt-1">Summer monsoon comparison: East Coast vs. South Coast weather patterns.</p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/nilaveli-beach-travel-guide"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#D4AF37] block mb-1">East Coast Paradise</span>
                <h4 className="font-serif font-bold text-sm text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">Nilaveli Beach Travel Guide</h4>
                <p className="text-[11px] text-[#5A5448] mt-1">Pigeon Island snorkeling, marine life & calm ocean escapes.</p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

      </main>

      {/* INTERACTIVE MICRO-SAAS ROUTE FUNNEL MODAL */}
      <InteractiveRouteFunnelModal
        isOpen={isFunnelOpen}
        onClose={() => setIsFunnelOpen(false)}
      />
    </div>
  );
}
