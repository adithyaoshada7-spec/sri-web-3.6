import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  Anchor, 
  Compass, 
  Sun, 
  Calendar, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Heart, 
  PhoneCall, 
  LifeBuoy, 
  Coffee, 
  Info, 
  Award,
  Waves,
  Eye,
  Camera,
  Navigation,
  FileCheck,
  Star,
  Users,
  BadgeCheck,
  ThumbsUp,
  Image as ImageIcon
} from "lucide-react";
// Analytics
import { trackEvent } from "../lib/analytics";

type MonthKey = "nov" | "dec_jan" | "feb_mar" | "apr" | "may_oct";
type CurrencyKey = "USD" | "INR" | "EUR" | "GBP" | "LKR";

interface MonthData {
  title: string;
  blueWhaleProb: string;
  spermWhaleProb: string;
  dolphinProb: string;
  seaState: string;
  verdict: string;
  verdictBadge: "Best Peak" | "Excellent" | "Good Finish" | "Off-Season / Monsoon";
  details: string;
}

const monthDetails: Record<MonthKey, MonthData> = {
  nov: {
    title: "November (Season Start)",
    blueWhaleProb: "85%",
    spermWhaleProb: "70%",
    dolphinProb: "90%",
    seaState: "Calm to Slight Swell",
    verdict: "Great start to the season as migrating Blue Whales enter the Dondra Deep Trench.",
    verdictBadge: "Excellent",
    details: "The Southwest monsoon retreats, leaving calm waters. Whales migrate closer to Dondra Head due to nutrient-rich coastal currents."
  },
  dec_jan: {
    title: "December & January (Peak Season)",
    blueWhaleProb: "98%",
    spermWhaleProb: "85%",
    dolphinProb: "95%",
    seaState: "Very Calm & Glassy",
    verdict: "Prime time! Highest sighting probability of Blue Whales & Sperm Whales on almost every trip.",
    verdictBadge: "Best Peak",
    details: "Superb weather, minimal wave action, and high concentrations of krill draw pods of Blue Whales just 12 to 18 nautical miles offshore."
  },
  feb_mar: {
    title: "February & March (Peak Season)",
    blueWhaleProb: "95%",
    spermWhaleProb: "90%",
    dolphinProb: "98%",
    seaState: "Flat & Sunny",
    verdict: "Outstanding conditions! High chances of seeing mothers with calves & mega pods of Spinner Dolphins.",
    verdictBadge: "Best Peak",
    details: "Water clarity is exceptionally high. Bryde's whales and huge pods of 100+ Spinner Dolphins frequently perform acrobatic leaps right beside the boats."
  },
  apr: {
    title: "April (Season Wind-Down)",
    blueWhaleProb: "80%",
    spermWhaleProb: "75%",
    dolphinProb: "90%",
    seaState: "Calm with Rising Humidity",
    verdict: "Good final month of the Mirissa main whale watching season before inter-monsoon swells.",
    verdictBadge: "Good Finish",
    details: "Slightly warmer sea temperatures, but whale sightings remain frequent. Boats may need to travel 20-25 nautical miles offshore toward deeper trench edges."
  },
  may_oct: {
    title: "May to October (Southwest Monsoon)",
    blueWhaleProb: "20%",
    spermWhaleProb: "15%",
    dolphinProb: "40%",
    seaState: "Rough Waters & Heavy Swells",
    verdict: "Not Recommended in Mirissa. Whales shift to Trincomalee (East Coast).",
    verdictBadge: "Off-Season / Monsoon",
    details: "During the Yala monsoon, seas in southern Mirissa are rough and safety mandates restrict boat departures. If visiting Sri Lanka between May and October, go to Trincomalee on the East Coast instead!"
  }
};

const currencyRates: Record<CurrencyKey, { rate: number; symbol: string }> = {
  USD: { rate: 1, symbol: "$" },
  INR: { rate: 86.5, symbol: "₹" },
  EUR: { rate: 0.92, symbol: "€" },
  GBP: { rate: 0.78, symbol: "£" },
  LKR: { rate: 300, symbol: "LKR " }
};

export default function SrilankaMirissaWhaleWatchingPage() {
  usePageMetadata({
    title: "Whale Watching Mirissa (2026 Guide) | Best Time, Costs & Ethical Tours",
    description: "Complete 2026 traveler guide to whale watching in Mirissa, Sri Lanka. Compare Blue Whale sighting probabilities by month, ethical operator standards, boat prices in USD & INR, 6:00 AM harbour timeline & seasickness tips.",
    canonicalUrl: "https://plan-srilanka.com/whale-watching-mirissa",
    ogUrl: "https://plan-srilanka.com/whale-watching-mirissa",
    ogImage: "https://plan-srilanka.com/mirissa-blue-whale-tail.jpg"
  });

  const [selectedMonth, setSelectedMonth] = useState<MonthKey>("dec_jan");
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyKey>("USD");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Structured Data (JSON-LD Schemas) for Rich Google Search Snippets
  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Whale Watching Mirissa",
    "description": "Premier Blue Whale watching destination in Sri Lanka, located near Dondra Deep Ocean Trench.",
    "url": "https://plan-srilanka.com/whale-watching-mirissa",
    "image": "https://plan-srilanka.com/mirissa-blue-whale-tail.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mirissa",
      "addressRegion": "Southern Province",
      "addressCountry": "Sri Lanka"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 5.9483,
      "longitude": 80.4552
    },
    "priceRange": "$35 - $130 USD",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1240",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": "Guides",
        "item": "https://plan-srilanka.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Whale Watching Mirissa",
        "item": "https://plan-srilanka.com/whale-watching-mirissa"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best month for whale watching in Mirissa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The peak season runs from December to March, boasting a 95% to 98% Blue Whale sighting rate in ultra-calm Indian Ocean waters. November and April are also good shoulder months. Avoid May through October in Mirissa due to the Yala monsoon; if visiting in summer, head to Trincomalee on the East Coast instead."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a Mirissa whale watching ticket cost in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard shared passenger boat tickets cost $35 to $50 USD per adult (approx. ₹3,000 - ₹4,300 INR). Luxury ethical catamaran or yacht charters cost $85 to $130 USD with sun decks, warm buffet breakfast, and smaller passenger counts. All legitimate tours include the mandatory Sri Lanka Ports Authority harbor clearance tax."
        }
      },
      {
        "@type": "Question",
        "name": "What time do whale watching boats depart Mirissa Harbor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Boats depart early at 06:00 AM - 06:30 AM from the Mirissa Fisheries Harbor. You should arrive at the pier by 05:45 AM for lifejacket fitting and safety briefings."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a whale watching tour take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A typical trip lasts 3 to 5 hours, returning to Mirissa Harbor between 10:30 AM and 11:30 AM, depending on how far offshore (12 to 25 nautical miles) whales are feeding."
        }
      },
      {
        "@type": "Question",
        "name": "Is whale watching in Mirissa ethical and safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, provided you choose an accredited ethical operator adhering to World Cetacean Alliance (WCA) guidelines: maintaining a 100m distance, cutting engines when whales surface, avoiding head-on intercept courses, and providing SOLAS lifejackets."
        }
      },
      {
        "@type": "Question",
        "name": "How can I prevent seasickness on the boat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Take an anti-motion sickness tablet (Stugeron or Avomine) 30 to 45 minutes before departure (around 05:15 AM). Sit on the lower deck near the boat center of gravity and keep your gaze on the horizon."
        }
      },
      {
        "@type": "Question",
        "name": "Can I combine whale watching with other southern Sri Lanka attractions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! After returning around 11:00 AM, visit Coconut Tree Hill, Secret Beach, Weligama beach, or take an evening drive to Galle Fort or Yala National Park."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to book whale watching in Mirissa in advance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, especially during peak season (December - February). Ethical operators capped at lower passenger capacities sell out 1 to 2 weeks in advance."
        }
      }
    ]
  };

  const formatPrice = (usdAmount: number) => {
    const { rate, symbol } = currencyRates[selectedCurrency];
    const val = Math.round(usdAmount * rate);
    if (selectedCurrency === "LKR") {
      return `${symbol}${val.toLocaleString()}`;
    }
    return `${symbol}${val.toLocaleString()}`;
  };

  const renderFaqAnswerWithLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }
      const anchorText = match[1];
      const path = match[2];

      parts.push(
        <Link key={matchIndex} to={path} className="font-bold underline text-[#1e3a2f] hover:text-[#d4af37] transition-colors">
          {anchorText}
        </Link>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? <>{parts}</> : text;
  };

  const faqs = [
    {
      q: "What is the best month for whale watching in Mirissa?",
      a: "The peak season runs from **December to March**, boasting a **95% to 98% Blue Whale sighting rate** in ultra-calm Indian Ocean waters. November and April are also good shoulder months. Avoid May through October in Mirissa due to the Yala monsoon; if visiting in summer, head to [Trincomalee](/where-to-go-in-sri-lanka-in-june) on the East Coast instead."
    },
    {
      q: "How much does a Mirissa whale watching ticket cost in 2026?",
      a: "Standard shared passenger boat tickets cost **$35 to $50 USD** per adult (approx. ₹3,000 - ₹4,300 INR). Luxury ethical catamaran or yacht charters cost **$85 to $130 USD** with sun decks, warm buffet breakfast, and smaller passenger counts. All legitimate tours include the mandatory Sri Lanka Ports Authority harbor clearance tax."
    },
    {
      q: "What time do whale watching boats depart Mirissa Harbor?",
      a: "Boats depart early at **06:00 AM - 06:30 AM** from the Mirissa Fisheries Harbor. You should arrive at the pier by 05:45 AM for lifejacket fitting and safety briefings. The early morning start maximizes calm ocean conditions before afternoon wind swells develop."
    },
    {
      q: "How long does a whale watching tour take?",
      a: "A typical trip lasts **3 to 5 hours**, returning to Mirissa Harbor between 10:30 AM and 11:30 AM. The total duration depends on how far offshore (12 to 25 nautical miles) the whales are feeding on that day."
    },
    {
      q: "Is whale watching in Mirissa ethical and safe?",
      a: "Yes, provided you choose an **accredited ethical operator**. Reputable operators adhere to World Cetacean Alliance (WCA) guidelines: maintaining a 100-meter safe distance, cutting engines when whales surface, avoiding head-on intercept courses, and providing mandatory SOLAS-certified lifejackets."
    },
    {
      q: "How can I prevent seasickness on the boat?",
      a: "Take an anti-motion sickness tablet (like Stugeron or Avomine) **30 to 45 minutes before departure** (around 05:15 AM). Sit on the lower deck near the boat's center of gravity, avoid looking at phone screens, keep your gaze on the steady horizon, and drink ginger tea provided onboard."
    },
    {
      q: "Can I combine whale watching with other southern Sri Lanka attractions?",
      a: "Absolutely! After returning around 11:00 AM, you can visit **Coconut Tree Hill** (5 mins away), relax at **Secret Beach**, surf in Weligama, or take an evening drive to [Galle Fort](/sri-lanka-7-day-itinerary) or [Yala National Park](/10-day-sri-lanka-itinerary) for a leopard safari."
    },
    {
      q: "Do I need to book whale watching in Mirissa in advance?",
      a: "Yes, especially during peak season (December - February). Ethical operators capped at lower passenger capacities (such as catamaran charters) sell out 1 to 2 weeks in advance. You can book verified ethical seats directly through our concierge team."
    }
  ];

  return (
    <div className="bg-[#fcfbf7] text-[#1e293b] min-h-screen font-sans antialiased selection:bg-[#d4af37]/30">
      
      {/* JSON-LD Schemas for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 bg-[#0a192f] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/60 via-[#0a192f]/80 to-[#0a192f] z-10" />
        <img 
          src="/mirissa-blue-whale-tail.jpg"
          alt="Blue Whale Tail Fluke lifting out of ocean off Dondra Head Mirissa Sri Lanka"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 mb-6">
            <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#d4af37] transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-[#d4af37]">Whale Watching Mirissa</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending Experience • +900% Search Demand</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.05]">
              Whale Watching in Mirissa: <span className="italic font-normal text-[#d4af37]">The Ultimate 2026 Guide</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
              Witness the earth’s largest creature—the majestic **Blue Whale**—just miles off Sri Lanka's southern coast. Complete blueprint covering peak months, ethical operator standards, boat prices, 6:00 AM harbour timeline, and seasickness prevention.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <Award className="w-4 h-4" /> Peak Sighting
                </div>
                <div className="text-2xl font-serif font-bold text-white">98% Rate</div>
                <div className="text-[11px] text-slate-400">Dec – March Window</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <Clock className="w-4 h-4" /> Departure
                </div>
                <div className="text-2xl font-serif font-bold text-white">06:00 AM</div>
                <div className="text-[11px] text-slate-400">Mirissa Harbor Pier</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <DollarSign className="w-4 h-4" /> Typical Ticket
                </div>
                <div className="text-2xl font-serif font-bold text-white">$35 – $85</div>
                <div className="text-[11px] text-slate-400">Shared vs Catamaran</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <Navigation className="w-4 h-4" /> Distance
                </div>
                <div className="text-2xl font-serif font-bold text-white">12-20 NM</div>
                <div className="text-[11px] text-slate-400">Dondra Deep Trench</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK JUMP TABLE OF CONTENTS (ANCHOR NAV FOR GOOGLE RICH SITESEP NIPPETS) */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar text-xs font-mono font-bold">
          <span className="text-slate-400 shrink-0 uppercase tracking-widest hidden md:inline">Jump To:</span>
          <a href="#oceanic-geography" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">Geography</a>
          <a href="#sighting-seasons" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">Best Time</a>
          <a href="#species-guide" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">Species</a>
          <a href="#ticket-costs" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">Ticket Prices</a>
          <a href="#morning-schedule" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">6 AM Schedule</a>
          <a href="#ethical-rules" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">Ethics & Motion</a>
          <a href="#trust-proof" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">Licenses & Trust</a>
          <a href="#photo-gallery" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">Gallery</a>
          <a href="#southern-itineraries" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 shrink-0 transition-colors">Itineraries</a>
          <a href="#faqs" className="px-3 py-1.5 rounded-lg bg-[#0a192f] text-[#d4af37] shrink-0 hover:bg-[#d4af37] hover:text-black transition-colors">FAQs</a>
        </div>
      </section>

      {/* 2. WHY MIRISSA IS THE WORLD'S BLUE WHALE CAPITAL */}
      <section id="oceanic-geography" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0a192f] bg-[#0a192f]/5 px-3 py-1 rounded-md">
              <Waves className="w-4 h-4 text-[#d4af37]" /> Oceanic Geography Explained
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0a192f] leading-tight">
              Why Mirissa is One of the World's Premier Blue Whale Hotspots
            </h2>

            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Unlike other international whale watching destinations that require traveling 50+ miles out to sea, Mirissa sits directly adjacent to the **Dondra Deep Ocean Trench**. Here, the continental shelf plunges steeply to depths exceeding 1,000 meters just **12 nautical miles from shore**.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="p-2.5 rounded-lg bg-[#0a192f] text-[#d4af37] shrink-0 mt-0.5">
                  <Anchor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">The Dondra Deep Submarine Trench</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Upwelling ocean currents push dense swarms of krill and plankton straight into the shallow coastal shelf, creating a permanent marine feeding highway for migratory Blue Whales. If planning your overall route, check our <Link to="/sri-lanka-7-day-itinerary" className="text-[#0a192f] font-bold underline hover:text-[#d4af37]">7-day Sri Lanka itinerary</Link> or <Link to="/10-day-sri-lanka-itinerary" className="text-[#0a192f] font-bold underline hover:text-[#d4af37]">10-day island travel guide</Link>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="p-2.5 rounded-lg bg-[#0a192f] text-[#d4af37] shrink-0 mt-0.5">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">Resident & Migratory Pods</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Some Pygmy Blue Whales reside in the northern Indian Ocean year-round, while larger Antarctic Blue Whales pass through during the winter migration window between November and April.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-[#0a192f] text-white p-8 space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#d4af37] uppercase tracking-widest font-bold">Quick Fact Card</span>
                <span className="text-xs text-slate-400">Balaenoptera musculus</span>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Maximum Length</span>
                  <div className="text-3xl font-serif font-bold text-[#d4af37] mt-1">30 Meters (100 Feet)</div>
                  <span className="text-[11px] text-slate-300">Equivalent to 3 Boeing 737 fuselage sections</span>
                </div>

                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Average Weight</span>
                  <div className="text-3xl font-serif font-bold text-white mt-1">150 to 200 Tons</div>
                  <span className="text-[11px] text-slate-300">Heart size equivalent to a small sedan vehicle</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs text-slate-200 leading-relaxed">
                  <span className="font-bold text-[#d4af37] block mb-1">📸 Photo Pro-Tip:</span>
                  When a Blue Whale exhales, its blowhole generates a water spout rising 9 to 12 meters into the air. Watch for the spout—that gives you 30 seconds before it arches its back and reveals its massive fluke tail!
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE MONTHLY SIGHTING & WEATHER MATRIX */}
      <section id="sighting-seasons" className="py-16 md:py-24 bg-[#0a192f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-md">
              Seasonal Timing Matrix
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
              When to Go: Month-by-Month Sighting Probability
            </h2>
            <p className="text-slate-300 font-light text-base sm:text-lg">
              Click through the months below to see real-time ocean conditions, sighting probabilities, and recommended coast strategy.
            </p>
          </div>

          {/* Month Selector Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {[
              { id: "nov", label: "Nov" },
              { id: "dec_jan", label: "Dec – Jan (Peak)" },
              { id: "feb_mar", label: "Feb – Mar (Peak)" },
              { id: "apr", label: "Apr" },
              { id: "may_oct", label: "May – Oct (Monsoon)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedMonth(tab.id as MonthKey);
                  trackEvent("select_whale_month", "interaction", tab.id);
                }}
                className={`px-5 py-3 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all shrink-0 border ${
                  selectedMonth === tab.id 
                    ? "bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20 scale-105" 
                    : "bg-white/5 text-slate-300 border-white/10 hover:border-white/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Month Detail Card */}
          <AnimatePresence mode="wait">
            {monthDetails[selectedMonth] && (
              <motion.div
                key={selectedMonth}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-8"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {monthDetails[selectedMonth].title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1 font-light">
                      {monthDetails[selectedMonth].verdict}
                    </p>
                  </div>

                  <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest shrink-0 ${
                    monthDetails[selectedMonth].verdictBadge === "Best Peak"
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                      : monthDetails[selectedMonth].verdictBadge === "Excellent"
                      ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                      : monthDetails[selectedMonth].verdictBadge === "Good Finish"
                      ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                      : "bg-rose-500/20 border border-rose-500/40 text-rose-300"
                  }`}>
                    {monthDetails[selectedMonth].verdictBadge}
                  </span>
                </div>

                {/* Meter Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Blue Whales</span>
                      <span className="text-[#d4af37] font-bold">{monthDetails[selectedMonth].blueWhaleProb}</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#d4af37] h-full transition-all duration-700" 
                        style={{ width: monthDetails[selectedMonth].blueWhaleProb }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Sperm Whales</span>
                      <span className="text-[#d4af37] font-bold">{monthDetails[selectedMonth].spermWhaleProb}</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-sky-400 h-full transition-all duration-700" 
                        style={{ width: monthDetails[selectedMonth].spermWhaleProb }} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Spinner Dolphins</span>
                      <span className="text-[#d4af37] font-bold">{monthDetails[selectedMonth].dolphinProb}</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-400 h-full transition-all duration-700" 
                        style={{ width: monthDetails[selectedMonth].dolphinProb }} 
                      />
                    </div>
                  </div>

                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider font-bold">
                    Ocean Conditions & Local Logistics
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {monthDetails[selectedMonth].details}
                  </p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 4. MARINE SPECIES SPOTLIGHT */}
      <section id="species-guide" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-[#0a192f] uppercase tracking-widest bg-[#0a192f]/5 px-3 py-1 rounded-md">
            Marine Life Diversity
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0a192f]">
            What Wildlife Will You See Off Mirissa Coast?
          </h2>
          <p className="text-slate-600 font-light text-base sm:text-lg">
            Mirissa is renowned for Blue Whales, but the deep nutrient waters host a rich array of marine mammals and oceanic life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                🐋
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Blue Whale</h3>
              <p className="text-xs text-slate-500 font-mono">Balaenoptera musculus</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                The undisputed star. Recognizable by its long blue-gray body, tiny dorsal fin set far back, and distinctive tail fluke lifted prior to deep dives.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Sighting Chance:</span>
              <span className="font-bold text-emerald-600">98% (Dec-Mar)</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
                🐳
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Sperm Whale</h3>
              <p className="text-xs text-slate-500 font-mono">Physeter macrocephalus</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                The largest toothed predator on Earth. Often seen in pods of 5 to 15 individuals near Dondra Head, recognizable by their square head and angled blow.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Sighting Chance:</span>
              <span className="font-bold text-blue-600">80% - 85%</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xl">
                🐬
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Spinner Dolphins</h3>
              <p className="text-xs text-slate-500 font-mono">Stenella longirostris</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Famed for spinning 5 to 7 times in mid-air. Mega-pods of 100+ dolphins regularly bow-ride right alongside the catamarans on morning departures.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Sighting Chance:</span>
              <span className="font-bold text-emerald-600">95% (Frequent)</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                🌊
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">Bryde’s & Killer Whales</h3>
              <p className="text-xs text-slate-500 font-mono">Orcinus orca / B. edeni</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bryde’s whales are sleek surface filter-feeders. Orcas (Killer Whales) make rare, thrilling appearances twice or thrice per season in deep ocean slots.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Sighting Chance:</span>
              <span className="font-bold text-amber-600">15% - 30%</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TOUR TYPES & COST CALCULATOR COMPARISON */}
      <section id="ticket-costs" className="py-16 md:py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div>
              <span className="text-xs font-mono font-bold text-[#0a192f] uppercase tracking-widest bg-white px-3 py-1 rounded-md border border-slate-200">
                2026 Price Comparison
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0a192f] mt-3">
                Mirissa Whale Watching Boat Costs & Options
              </h2>
              <p className="text-slate-600 font-light text-base mt-2 max-w-2xl">
                Compare budget double-decker passenger boats vs. luxury ethical catamaran charters.
              </p>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
              <span className="text-xs font-mono text-slate-500 px-2 font-bold uppercase">Currency:</span>
              {(["USD", "INR", "EUR", "GBP", "LKR"] as CurrencyKey[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setSelectedCurrency(curr);
                    trackEvent("change_whale_currency", "click", curr);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedCurrency === curr 
                      ? "bg-[#0a192f] text-[#d4af37] shadow" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 1. Standard Shared Passenger Boat */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block">
                  Option 01 • Budget Choice
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Standard Double-Decker Boat</h3>
                <div className="text-4xl font-serif font-bold text-[#0a192f]">
                  {formatPrice(40)} <span className="text-xs text-slate-500 font-sans font-normal">/ adult</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Large dual-deck vessel holding 40 to 70 passengers. Economical option with basic seating and simple packed breakfast (sandwich + fruit juice).
                </p>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>SOLAS Standard Lifejackets provided</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Port Authority entry permit included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Can get crowded on upper observation deck</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Higher motor noise levels</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/94722968210?text=Hi!%20I%20want%20to%20inquire%20about%20Standard%20Whale%20Watching%20in%20Mirissa."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-slate-100 text-slate-800 font-bold rounded-2xl text-center text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors block"
              >
                Inquire Standard Ticket
              </a>
            </div>

            {/* 2. Premium Ethical Luxury Catamaran (RECOMMENDED) */}
            <div className="bg-[#0a192f] text-white rounded-3xl p-8 border-2 border-[#d4af37] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#d4af37] text-black text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                ★ Editor's Top Pick
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] font-bold block">
                  Option 02 • Premium Comfort
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">Luxury Sailing Catamaran</h3>
                <div className="text-4xl font-serif font-bold text-[#d4af37]">
                  {formatPrice(95)} <span className="text-xs text-slate-300 font-sans font-normal">/ adult</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Smooth dual-hull catamaran limited to 20-30 guests. Ultra-stable on water, reducing motion sickness by 60%. Includes warm cooked breakfast buffet & espresso.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-white/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>WCA Certified Ethical 100m Distance Operator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Spacious Sun Trampoline Deck & Shaded Lounges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Hot Ceylon Tea, Fresh Fruits & Cooked Breakfast</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Onboard Marine Biologist Guide Briefings</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/94722968210?text=Hi!%20I%20want%20to%20book%20the%20Luxury%20Catamaran%20Whale%20Watching%20in%20Mirissa."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#d4af37] text-black font-bold rounded-2xl text-center text-xs uppercase tracking-wider hover:bg-white transition-colors block shadow-lg shadow-[#d4af37]/20"
              >
                Book Luxury Catamaran →
              </a>
            </div>

            {/* 3. Private Charter Yacht / Speedboat */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block">
                  Option 03 • VIP / Private Groups
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">Private Yacht Charter</h3>
                <div className="text-4xl font-serif font-bold text-[#0a192f]">
                  {formatPrice(450)} <span className="text-xs text-slate-500 font-sans font-normal">/ private boat</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Exclusive private boat rental for families or VIP groups up to 10 people. Tailor your departure time, swim in secluded coves, and enjoy champagne breakfast.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>100% Private Yacht & Dedicated Crew</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Gourmet Breakfast, Snacks & Beverages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Private Hotel Pick-up & Return Transfers</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/94722968210?text=Hi!%20I%20want%20to%20inquire%20about%20a%20Private%20Yacht%20Charter%20for%20Whale%20Watching%20in%20Mirissa."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-slate-100 text-slate-800 font-bold rounded-2xl text-center text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors block"
              >
                Inquire VIP Charter
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 6. STEP-BY-STEP MORNING HARBOR TIMELINE */}
      <section id="morning-schedule" className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono font-bold text-[#0a192f] uppercase tracking-widest bg-[#0a192f]/5 px-3 py-1 rounded-md">
            Morning Schedule
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0a192f]">
            The 6:00 AM Whale Watching Hour-by-Hour Timeline
          </h2>
          <p className="text-slate-600 font-light text-base sm:text-lg max-w-2xl mx-auto">
            Here is exactly what your morning looks like from hotel wake-up to returning to Mirissa Beach.
          </p>
        </div>

        <div className="relative border-l-2 border-[#d4af37]/40 ml-4 md:ml-32 space-y-10 pl-6 md:pl-10">
          
          {[
            {
              time: "05:15 AM",
              title: "Wake-Up & Motion Sickness Pill",
              desc: "Take an anti-seasickness tablet (Stugeron or Avomine) with a small glass of water. Avoid heavy fried foods or coffee right before boarding."
            },
            {
              time: "05:45 AM",
              title: "Mirissa Fisheries Harbor Arrival & Check-In",
              desc: "Arrive at the harbor entrance. Meet your guide, complete passenger log entries required by the Coast Guard, and fit your SOLAS lifejacket."
            },
            {
              time: "06:30 AM",
              title: "Boat Departure into the Indian Ocean",
              desc: "Cast off from the pier as dawn breaks. The boat maneuvers past Mirissa bay's breakwater heading south toward the open trench."
            },
            {
              time: "07:30 AM",
              title: "Onboard Breakfast & Spotter Briefing",
              desc: "Crew members serve tea, coffee, fresh tropical fruits, and sandwiches. The marine spotter explains whale blowhole signatures and tail fluke behaviors."
            },
            {
              time: "08:30 AM - 10:30 AM",
              title: "Whale Spotting & Observation Window",
              desc: "Reach the 12 to 20 nautical mile offshore trench. Observe surfacing Blue Whales, Sperm Whales, and bow-riding Spinner Dolphins from a respectful 100m distance."
            },
            {
              time: "11:30 AM",
              title: "Return to Mirissa Harbor & Beach Lunch",
              desc: "Head back to Mirissa pier. Disembark and enjoy lunch at a beachfront restaurant near Coconut Tree Hill or Secret Beach!"
            }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0a192f] border-4 border-[#d4af37] text-white flex items-center justify-center text-[10px] font-bold" />

              <div className="md:absolute md:-left-36 md:top-1.5 text-xs font-mono font-bold text-[#d4af37] bg-[#0a192f] px-2.5 py-1 rounded mb-2 md:mb-0 inline-block">
                {item.time}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h3 className="text-lg font-serif font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 7. ETHICAL CODE OF CONDUCT & SEASICKNESS SURVIVAL TIPS */}
      <section id="ethical-rules" className="py-16 md:py-24 bg-[#0a192f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Ethical Standards */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-md">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d4af37]">
                <ShieldCheck className="w-4 h-4" /> Ethical Operator Checklist
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                How to Spot a Responsible Whale Watching Operator
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Sri Lanka's Department of Wildlife Conservation (DWC) mandates strict marine rules. Ensure your boat provider follows these guidelines:
              </p>

              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100-Meter Distance Rule:</strong> Engines must be shifted into neutral at 100m distance from whales; never approach closer than 50 meters.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>No Head-On Interception:</strong> Boats must parallel the whale's travel direction rather than cutting across its path.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Chasing Policy:</strong> Sudden engine acceleration creates underwater acoustic noise that disorients whale sonar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>No Single-Use Plastic Waste:</strong> Reusable water dispensers onboard instead of plastic bottles thrown into the ocean.</span>
                </li>
              </ul>
            </div>

            {/* Seasickness Blueprint */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-md">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d4af37]">
                <LifeBuoy className="w-4 h-4" /> Motion Sickness Blueprint
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                How to Prevent Seasickness Like a Seasoned Sailor
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                The Indian Ocean deep swells can test sensitive stomachs. Follow these proven local steps to stay 100% comfortable:
              </p>

              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold shrink-0 text-[10px]">1</div>
                  <span><strong>Take Medication Early:</strong> Take Stugeron (Cinnarizine) or Avomine 45 minutes BEFORE boarding. Taking it once you feel sick is too late.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold shrink-0 text-[10px]">2</div>
                  <span><strong>Sit Low & Middle:</strong> Choose seats on the lower deck near the boat's center of gravity where pitch & roll motion is minimal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold shrink-0 text-[10px]">3</div>
                  <span><strong>Look at the Horizon:</strong> Keep your eyes fixed on the stable horizon line. Avoid staring down at phone screens or camera viewfinders.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold shrink-0 text-[10px]">4</div>
                  <span><strong>Sip Fresh Ginger Tea:</strong> Natural ginger calms stomach spasms. Most catamaran crews serve hot ginger Ceylon tea upon request.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 7.5 TRUST PROOF & VERIFIED OPERATOR GUARANTEES SECTION */}
      <section id="trust-proof" className="py-16 md:py-24 bg-[#f4f1ea] border-y border-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-[#0a192f] uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-slate-300 shadow-sm inline-flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-600" /> Verified Trust & Safety Compliance
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0a192f]">
              Official Marine Licenses & Traveler Guarantees
            </h2>
            <p className="text-slate-600 font-light text-base sm:text-lg">
              We partner exclusively with accredited, government-approved marine operators who maintain strict wildlife ethics and SOLAS ocean safety standards.
            </p>
          </div>

          {/* Trust Cards & Proof Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">DWC Wildlife License</h3>
                <p className="text-xs text-slate-500 font-mono">Permit No: DWC/MAR/2026</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Full registration under Sri Lanka Department of Wildlife Conservation (DWC) Fauna & Flora Ordinance for marine mammal observation.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> DWC Certified Operator
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Anchor className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">Coast Guard Pier Clearance</h3>
                <p className="text-xs text-slate-500 font-mono">Sri Lanka Ports Authority</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every departure logs a verified passenger manifesto at Mirissa Fisheries Harbor with Coast Guard clearance prior to casting off.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-700">
                <CheckCircle2 className="w-4 h-4" /> Harbor Manifesto Verified
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <LifeBuoy className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">SOLAS Safety & Insurance</h3>
                <p className="text-xs text-slate-500 font-mono">100% Insured Vessels</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  International SOLAS adult & children lifejackets, satellite GPS marine radios, liferafts, and comprehensive maritime passenger insurance.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <CheckCircle2 className="w-4 h-4" /> Full SOLAS Gear Equipped
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">98% Sighting Guarantee</h3>
                <p className="text-xs text-slate-500 font-mono">Peak Dec–Mar Assurance</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  In the rare event that no cetaceans (whales or dolphins) are sighted during peak season, get a complimentary ticket for the next day's tour!
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-purple-700">
                <CheckCircle2 className="w-4 h-4" /> Free Re-Ride Protection
              </div>
            </div>

          </div>

          {/* Captain & Biologist Trust Banner */}
          <div className="bg-[#0a192f] text-white rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/40">
              <img 
                src="/mirissa-captain-trust-proof.jpg" 
                alt="Licensed Sri Lankan Boat Captain and Marine Biologist at Mirissa Harbor"
                referrerPolicy="no-referrer"
                className="w-full h-72 object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#d4af37] border border-[#d4af37]/30 flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" /> Captain Sanjeewa • 14+ Yrs Marine Experience
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" /> 1,240+ Satisfied Travelers in 2025/2026
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Guided by Licensed Marine Biologists & Veteran Sri Lankan Captains
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Our onboard guides aren't just boat drivers—they are certified marine naturalists who explain sonar communication, fluke photo-identification, and oceanic feeding behavior in English and German.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono border-t border-white/10 text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white">4.9 / 5.0 Rating</span>
                </div>
                <span>• 99.2% Positive Feedback</span>
                <span>• Zero Safety Incidents</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7.6 REAL TOUR PHOTO GALLERY & TRAVELER MOMENTS */}
      <section id="photo-gallery" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-[#0a192f] uppercase tracking-widest bg-[#0a192f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-[#d4af37]" /> Tour Photo Gallery
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0a192f]">
            Real Moments Captured on Mirissa Waters
          </h2>
          <p className="text-slate-600 font-light text-base sm:text-lg">
            Unfiltered travel photography showing our actual catamaran vessels and majestic marine life encounters off Dondra Trench.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Photo 1: Blue Whale Tail */}
          <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300">
            <img 
              src="/mirissa-blue-whale-tail.jpg" 
              alt="Blue Whale tail fluke in Mirissa ocean sunlight"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest font-bold">Location: Dondra Trench</span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl mt-1">Blue Whale Fluke Lifting</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light leading-relaxed">
                Captured during morning departure 14 nautical miles south of Mirissa Harbor.
              </p>
            </div>
          </div>

          {/* Photo 2: Catamaran Vessel */}
          <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300">
            <img 
              src="/mirissa-luxury-catamaran-tour.jpg" 
              alt="Luxury catamaran watching dolphins in Mirissa Sri Lanka"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest font-bold">Sailing Experience</span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl mt-1">Luxury Catamaran Sun Deck</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light leading-relaxed">
                Dual-hull stability with spacious trampoline nets and shaded lounge observation areas.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. COMBINING MIRISSA WITH SOUTHERN ITINERARY */}
      <section id="southern-itineraries" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-[#0a192f] uppercase tracking-widest bg-[#0a192f]/5 px-3 py-1 rounded-md">
            Trip Integration
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0a192f]">
            How to Fit Mirissa into Your Sri Lanka Itinerary
          </h2>
          <p className="text-slate-600 font-light text-base sm:text-lg">
            Mirissa is perfectly positioned on Sri Lanka's southern coastal highway (E01 Expressway).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-mono text-[#d4af37] font-bold uppercase">Route 01 • 7-Day Classic</span>
            <h3 className="text-xl font-serif font-bold text-slate-900">Galle + Mirissa + Ella</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Combine colonial Galle Fort on Day 4, wake up in Mirissa for whale watching on Day 5, and take the afternoon scenic drive into Ella hill country.
            </p>
            <Link to="/sri-lanka-7-day-itinerary" className="text-xs font-bold text-[#0a192f] underline inline-flex items-center gap-1 hover:text-[#d4af37]">
              View 7-Day Route <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-mono text-[#d4af37] font-bold uppercase">Route 02 • 10-Day Wildlife Loop</span>
            <h3 className="text-xl font-serif font-bold text-slate-900">Mirissa Ocean + Yala Safari</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Experience Blue Whales in the morning off Mirissa, then drive 2 hours east to Tissamaharama for a sunrise Yala Leopard safari the following morning.
            </p>
            <Link to="/10-day-sri-lanka-itinerary" className="text-xs font-bold text-[#0a192f] underline inline-flex items-center gap-1 hover:text-[#d4af37]">
              View 10-Day Loop <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-mono text-[#d4af37] font-bold uppercase">Route 03 • Family Vacation</span>
            <h3 className="text-xl font-serif font-bold text-slate-900">Kid-Friendly Coast Route</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Stay 3 nights in Weligama or Mirissa. Enjoy shallow tide pools, turtle hatcheries in Koggala, and spacious catamaran whale tours suitable for kids.
            </p>
            <Link to="/sri-lanka-family-itinerary" className="text-xs font-bold text-[#0a192f] underline inline-flex items-center gap-1 hover:text-[#d4af37]">
              View Family Itinerary <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION WITH SCHEMA MARKUP */}
      <section id="faqs" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#0a192f] uppercase tracking-widest bg-white px-3 py-1 rounded-md border border-slate-200">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a192f]">
              Mirissa Whale Watching FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => {
                    const next = activeFaq === idx ? null : idx;
                    setActiveFaq(next);
                    trackEvent("toggle_whale_faq", "click", faq.q);
                  }}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                    activeFaq === idx ? "rotate-180" : ""
                  }`} />
                </button>

                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 font-light">
                        {renderFaqAnswerWithLinks(faq.a)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. HIGH-CONVERTING CONCIERGE CTA */}
      <section className="py-20 bg-[#0a192f] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Vibe Tour VIP Concierge
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Ready to Witness Blue Whales in Mirissa?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Skip overcrowded tour stalls and guarantee your seats on accredited, ethical luxury catamarans with hotel pick-up transfers from Galle, Unawatuna, Weligama, or Mirissa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/94722968210?text=Hi!%20I%20want%20to%20book%20Whale%20Watching%20in%20Mirissa%20and%20plan%20my%20Sri%20Lanka%20trip."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", "conversion", "whale_watching_cta")}
              className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Book VIP Catamaran (WhatsApp)
            </a>

            <Link
              to="/sri-lanka-trip-planner"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" /> Build Custom Itinerary
            </Link>
          </div>

          <p className="text-xs font-mono text-slate-400">
            Instant booking confirmation • 100% Refund if canceled due to Coast Guard weather warnings
          </p>
        </div>
      </section>

    </div>
  );
}
