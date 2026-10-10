import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  MapPin,
  Waves,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Info,
  ChevronDown,
  Building,
  Star,
  ExternalLink,
  Plane,
  Clock,
  Compass,
  PhoneCall,
  Utensils
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import InteractiveRouteFunnelModal from "./InteractiveRouteFunnelModal";

interface HotelCard {
  id: string;
  name: string;
  region: string;
  tier: "Luxury Heritage" | "Family Comfort" | "Sweet-Spot Value" | "Boutique Oceanfront";
  priceLkr: string;
  priceInr: string;
  image: string;
  tagline: string;
  whyChennaiLoved: string;
  highlights: string[];
}

const HOTELS_DATA: HotelCard[] = [
  // 1. Bentota & Beruwala
  {
    id: "cinnamon-bentota",
    name: "Cinnamon Bentota Beach",
    region: "Bentota (West Coast)",
    tier: "Luxury Heritage",
    priceLkr: "LKR 55,000 – 90,000 / night",
    priceInr: "~₹15,000 – ₹24,000 INR",
    image: "/luxury-boutique-resort-sri-lanka.jpg",
    tagline: "Geoffrey Bawa architectural masterpiece where river meets ocean",
    whyChennaiLoved: "Generous South Indian and pure vegetarian breakfast buffet spreads, shaded coconut lawns, and shallow waters ideal for kids.",
    highlights: ["Geoffrey Bawa legacy heritage suites", "Direct beach & Bentota river lagoon access", "Expansive shaded swimming pools"]
  },
  {
    id: "taj-bentota",
    name: "Taj Bentota Resort & Spa",
    region: "Bentota (West Coast)",
    tier: "Family Comfort",
    priceLkr: "LKR 48,000 – 75,000 / night",
    priceInr: "~₹13,000 – ₹20,000 INR",
    image: "/romantic-honeymoon-bentota-couple.webp",
    tagline: "Headland luxury with 180° crashing surf panoramas",
    whyChennaiLoved: "Trusted Tata / Taj group hospitality, dedicated Jain and vegetarian kitchens, and supervised kids' recreation clubs.",
    highlights: ["Dedicated Indian chef for Jain & veg items", "180° oceanfront cliff promontory views", "Jiva Ayurvedic spa therapies"]
  },
  {
    id: "wonder-bentota",
    name: "Wonder Bentota (Centara Peninsula)",
    region: "Bentota (West Coast)",
    tier: "Sweet-Spot Value",
    priceLkr: "LKR 20,000 – 28,000 / night",
    priceInr: "~₹5,500 – ₹7,600 INR",
    image: "/serene-beaches-sri-lanka.png",
    tagline: "Island-feel peninsula resort accessed via 2-min river ferry",
    whyChennaiLoved: "Hits the exact LKR 20,000/night sweet spot with unobstructed ocean-facing balconies, watersports, and large beachfront pools.",
    highlights: ["LKR 20k sweet-spot pricing match", "Island seclusion with lagoon ferry transit", "Water sports center on Bentota river"]
  },

  // 2. Mirissa & Weligama
  {
    id: "weligama-marriott",
    name: "Weligama Bay Marriott Resort & Spa",
    region: "Weligama (South Coast)",
    tier: "Luxury Heritage",
    priceLkr: "LKR 60,000 – 95,000 / night",
    priceInr: "~₹16,500 – ₹26,000 INR",
    image: "/luxury-boutique-resort-sri-lanka.jpg",
    tagline: "High-rise landmark where every single room guarantees floor-to-ceiling bay views",
    whyChennaiLoved: "Watch stilt fishermen and beginner surfers right from your private high-floor balcony. Superb acoustic soundproofing and multi-cuisine buffet.",
    highlights: ["100% ocean-facing high-floor balconies", "Right on Weligama beginner surf beach", "Exceptional South Asian & Western breakfast"]
  },
  {
    id: "triple-o-six",
    name: "Triple O Six Mirissa",
    region: "Mirissa (South Coast)",
    tier: "Sweet-Spot Value",
    priceLkr: "LKR 18,000 – 24,000 / night",
    priceInr: "~₹4,900 – ₹6,500 INR",
    image: "/family-trip-to-sri-lanka.webp",
    tagline: "Contemporary boutique sanctuary 3 mins from Mirissa Beach",
    whyChennaiLoved: "Ideal balance for cost-conscious Chennai families. Impeccable hygiene, serene pool, and ocean views starting right at LKR 20,000.",
    highlights: ["Direct alignment with LKR 20,000 target budget", "3-min walk to Mirissa beach & coconut hill", "Peaceful boutique ambiance away from noise"]
  },
  {
    id: "mandara-mirissa",
    name: "Mandara Resort Mirissa",
    region: "Mirissa / Red Cliff (South Coast)",
    tier: "Boutique Oceanfront",
    priceLkr: "LKR 28,000 – 42,000 / night",
    priceInr: "~₹7,700 – ₹11,500 INR",
    image: "/serene-beaches-sri-lanka.png",
    tagline: "Secluded estuary cove with private plunge pools and direct sand access",
    whyChennaiLoved: "Tranquil ocean sounds away from noisy beach party bars, ideal for couples flying in from Chennai for anniversary privacy.",
    highlights: ["Private plunge pool villas available", "Quiet river estuary oceanfront position", "Beachfront seafood candlelit dinners"]
  },

  // 3. Galle & Unawatuna
  {
    id: "jetwing-lighthouse",
    name: "Jetwing Lighthouse Galle",
    region: "Galle (South Coast)",
    tier: "Luxury Heritage",
    priceLkr: "LKR 50,000 – 80,000 / night",
    priceInr: "~₹13,800 – ₹22,000 INR",
    image: "/luxury-boutique-resort-sri-lanka.jpg",
    tagline: "Geoffrey Bawa ocean cliff design overlooking crashing surf & Galle lighthouse",
    whyChennaiLoved: "Dramatic sunset views over rock boulders, colonial breezy verandahs, and only 8 minutes to the UNESCO Dutch Fort ramparts.",
    highlights: ["Iconic Geoffrey Bawa spiral staircase", "Rock-boulder crashing ocean vistas", "Minutes from Galle Dutch Fort shopping"]
  },
  {
    id: "thaproban-pavilion",
    name: "Thaproban Pavilion Waves Unawatuna",
    region: "Unawatuna Bay (South Coast)",
    tier: "Sweet-Spot Value",
    priceLkr: "LKR 20,000 – 30,000 / night",
    priceInr: "~₹5,500 – ₹8,200 INR",
    image: "/romantic-honeymoon-bentota-couple.webp",
    tagline: "Protected bay sanctuary with gentle turquoise swimming waters",
    whyChennaiLoved: "Unawatuna offers calmer swimming than open coastlines. Fresh grilled seafood dinners right on the sand with live acoustic music.",
    highlights: ["Direct beach access to sheltered bay", "Starting at LKR 20,000 comfort sweet spot", "Walkable to beach cafes & gelato shops"]
  },

  // 4. Nilaveli & Trincomalee (East Coast)
  {
    id: "nilaveli-beach-hotel",
    name: "Nilaveli Beach Hotel",
    region: "Nilaveli / Trincomalee (East Coast)",
    tier: "Sweet-Spot Value",
    priceLkr: "LKR 18,000 – 25,000 / night",
    priceInr: "~₹4,900 – ₹6,900 INR",
    image: "/Nilaveli-Beach-background-image.jpg",
    tagline: "The legendary pioneer beachfront resort facing Pigeon Island",
    whyChennaiLoved: "Directly in front of the Pigeon Island snorkeling boat launch. Glassy, calm waters from May to September — a direct LKR 20,000 match.",
    highlights: ["Prime Pigeon Island boat embarkation beach", "Crystal-clear summer swimming waters", "Wide open shaded coconut groves"]
  },
  {
    id: "trinco-blu",
    name: "Trinco Blu by Cinnamon",
    region: "Uppuveli / Trincomalee (East Coast)",
    tier: "Family Comfort",
    priceLkr: "LKR 26,000 – 38,000 / night",
    priceInr: "~₹7,200 – ₹10,500 INR",
    image: "/snorkeler-trincomalee-nilaveli.jpg",
    tagline: "Retro-chic marine lifestyle resort with on-site whale & dolphin boat launches",
    whyChennaiLoved: "Morning dolphin-watching catamarans launch right from the shore. Authentic Jaffna/Trinco crab curry and extensive vegetarian spreads.",
    highlights: ["On-site whale & dolphin catamaran safaris", "Gentle sloping calm swimming shoreline", "Signature coastal dining and pool bar"]
  }
];

export default function SrilankaSeaViewHotelsChennaiPage() {
  usePageMetadata({
    title: "Top 10 Sea View Hotels in Sri Lanka for Chennai Travelers (2026)",
    description: "Discover the top 10 sea-view hotels in Sri Lanka for Chennai travelers. Compare per-night prices in INR & LKR, flight-aligned coastal routes, and stay budgets.",
    canonicalUrl: "https://plan-srilanka.com/top-10-sea-view-hotels-sri-lanka-chennai",
    ogUrl: "https://plan-srilanka.com/top-10-sea-view-hotels-sri-lanka-chennai"
  });

  const [isFunnelOpen, setIsFunnelOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>("All");

  const regions = ["All", "Bentota", "Mirissa / Weligama", "Galle / Unawatuna", "Nilaveli / Trinco"];

  const filteredHotels = selectedRegionFilter === "All"
    ? HOTELS_DATA
    : HOTELS_DATA.filter(h => {
        if (selectedRegionFilter === "Bentota") return h.region.includes("Bentota");
        if (selectedRegionFilter === "Mirissa / Weligama") return h.region.includes("Mirissa") || h.region.includes("Weligama");
        if (selectedRegionFilter === "Galle / Unawatuna") return h.region.includes("Galle") || h.region.includes("Unawatuna");
        if (selectedRegionFilter === "Nilaveli / Trinco") return h.region.includes("Nilaveli") || h.region.includes("Trincomalee");
        return true;
      });

  const faqs = [
    {
      q: "How much does a good sea-view hotel in Sri Lanka cost for Chennai travelers?",
      a: "A comfortable, hygienic 3-to-4 star oceanfront hotel with air conditioning, private sea-view balcony, swimming pool, and breakfast typically costs between LKR 18,000 and LKR 24,000 per night (approximately ₹4,900 to ₹6,500 INR). Luxury 5-star properties like Taj Bentota or Weligama Marriott range from LKR 50,000 to LKR 90,000+ per night (₹13,500 to ₹25,000 INR)."
    },
    {
      q: "Which coast has the best sea view hotels for Chennai travelers in different seasons?",
      a: "From November to April (winter & spring), choose the West & South Coasts (Bentota, Galle, Mirissa, Weligama) for calm seas and sunsets. From May to September (summer holidays), choose the East Coast (Nilaveli and Trincomalee) because the southwest monsoon creates rough waves in the south, while the East Coast enjoys glassy, rain-free swimming waters."
    },
    {
      q: "Do Sri Lankan beach resorts cater to South Indian and vegetarian diets?",
      a: "Yes! Major resort chains such as Taj, Cinnamon, and Jetwing regularly cater to Indian guests with dedicated vegetarian counters, idli, dosa, sambar, dal, and upon advance request, pure Jain preparations without root vegetables. Local beachfront cafes also prepare delicious dhal curries, pol sambol, and fresh tropical fruit platters."
    },
    {
      q: "How do I travel from Colombo Airport (CMB) to my sea-view hotel?",
      a: "The most comfortable and time-efficient choice is a dedicated private air-conditioned vehicle with an English/Tamil-speaking tourist chauffeur. Bentota takes approximately 90 minutes via the Katunayake-Southern Expressway, Galle takes 2 hours, and Mirissa takes 2.5 hours. For East Coast stays (Nilaveli), a scenic inland drive takes approximately 4.5 hours, usually paired with an overnight stop in Sigiriya."
    },
    {
      q: "Should I book sea-view hotels as a package or customize my own route?",
      a: "We strongly advise customizing your route instead of buying rigid Indian tour agency packages. Traditional packages often add heavy agent markups (30-40%) and bundle sub-par hotels away from the beach. Using our 3-step route validator, you can test your dates, pick your exact coastal stays, and confirm your private driver directly on WhatsApp without hidden fees."
    }
  ];

  const handleOpenFunnel = (source: string) => {
    trackEvent("open_funnel_sea_view_hotels", "engagement", source);
    setIsFunnelOpen(true);
  };

  const handleWhatsAppContact = () => {
    trackEvent("whatsapp_sea_view_hotels", "conversion", "chennai_hotels_guide");
    const msg = `Hi Plan Sri Lanka! 🌊 I'm traveling from Chennai and looking for sea-view hotels in Sri Lanka (LKR 20,000/night range) with a private chauffeur. Could you help validate my coastal route?`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0F1412] font-sans leading-relaxed selection:bg-[#C5A059]/20 pt-24 md:pt-32">

      {/* SCHEMA INJECTIONS FOR GOOGLE & AI ENGINES */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Top 10 Sea View Hotels in Sri Lanka for Chennai Travelers: Budget to Luxury Coastal Stays",
            "description": "Discover the top 10 sea-view hotels in Sri Lanka for Chennai travelers. Compare per-night prices in INR & LKR, flight-aligned coastal routes, and stay budgets.",
            "image": "https://plan-srilanka.com/serene-beaches-sri-lanka.png",
            "author": {
              "@type": "TravelAgency",
              "name": "Plan Sri Lanka",
              "url": "https://plan-srilanka.com"
            },
            "publisher": {
              "@type": "TravelAgency",
              "name": "Plan Sri Lanka",
              "logo": "https://plan-srilanka.com/logo.png"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/top-10-sea-view-hotels-sri-lanka-chennai"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Top Sea View Hotels in Sri Lanka for Chennai Travelers",
            "itemListElement": HOTELS_DATA.map((h, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": `${h.name} (${h.region})`
            }))
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          })
        }}
      />

      {/* 1. HERO HEADER */}
      <section className="relative px-6 pb-16 pt-8 overflow-hidden bg-gradient-to-b from-[#1A2F23]/10 to-transparent">
        <div className="max-w-5xl mx-auto space-y-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> 🇮🇳 Chennai to Sri Lanka Coastal Travel Guide (2026)
          </div>

          <h1 className="text-4xl md:text-7xl font-serif text-[#1A2F23] tracking-tight leading-[1.08] max-w-4xl mx-auto font-bold">
            Top 10 Sea View Hotels in Sri Lanka <br />
            <span className="italic text-[#C5A059] font-normal">
              for Chennai Travelers (Budget to Luxury)
            </span>
          </h1>

          <p className="text-base md:text-xl text-[#0F1412]/80 font-light max-w-3xl mx-auto leading-relaxed">
            With direct flights from Chennai (MAA) to Colombo (CMB) taking just <strong>80 minutes</strong> on IndiGo, Air India, and SriLankan Airlines, an island escape has never been closer. Discover verified oceanfront stays across Bentota, Mirissa, Galle, and Nilaveli paired with realistic INR & LKR pricing.
          </p>

          {/* Core Intent Contextual Bridge Box */}
          <div className="bg-white p-5 md:p-6 rounded-3xl border border-[#0F1412]/10 shadow-lg max-w-3xl mx-auto text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold block">
                Planning Flight & Transit Costs?
              </span>
              <p className="text-xs sm:text-sm text-[#0F1412]/85 font-light">
                Before choosing your resort, review our{" "}
                <Link
                  to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
                  className="font-bold text-[#1A2F23] hover:text-[#C5A059] underline decoration-[#C5A059] underline-offset-4"
                >
                  complete breakdown of how much a Sri Lanka trip costs from Chennai
                </Link>
                {" "}covering direct flight rates, ETA visa requirements, and chauffeur allowances.
              </p>
            </div>
            <button
              onClick={() => handleOpenFunnel("hero_card")}
              className="px-5 py-3 bg-[#1A2F23] hover:bg-[#C5A059] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all shrink-0 cursor-pointer shadow"
            >
              Plan Stays Free ➔
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 text-left">
            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#0F1412]/5">
              <span className="text-[10px] font-mono text-gray-500 uppercase block">Flight Time</span>
              <strong className="text-xs sm:text-sm text-[#1A2F23]">80 Mins (Direct)</strong>
            </div>
            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#0F1412]/5">
              <span className="text-[10px] font-mono text-gray-500 uppercase block">Sweet Spot Budget</span>
              <strong className="text-xs sm:text-sm text-[#C5A059]">LKR 20,000 (~₹5.5k)</strong>
            </div>
            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#0F1412]/5">
              <span className="text-[10px] font-mono text-gray-500 uppercase block">Dietary Comfort</span>
              <strong className="text-xs sm:text-sm text-[#1A2F23]">Veg & Jain Friendly</strong>
            </div>
            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#0F1412]/5">
              <span className="text-[10px] font-mono text-gray-500 uppercase block">Airport Transfer</span>
              <strong className="text-xs sm:text-sm text-[#1A2F23]">90m (Southern Hwy)</strong>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE LKR 20,000 / NIGHT PRICING SWEET SPOT */}
      <section className="py-16 px-6 bg-white border-t border-b border-[#0F1412]/5">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Budgeting Transparency • Currency Calibration
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A2F23] font-bold tracking-tight">
              The &quot;LKR 20,000 / Night&quot; Sweet Spot for Indian Travelers
            </h2>
            <p className="text-xs sm:text-sm text-[#0F1412]/75 font-light max-w-xl mx-auto">
              Currency math between INR and LKR can feel daunting. In Sri Lanka, <strong>LKR 20,000 per night</strong> (approx. <strong>₹5,400 – ₹5,800 INR</strong>) is the golden benchmark for premium comfort without luxury resort inflation.
            </p>
          </div>

          {/* Pricing Tier Table */}
          <div className="overflow-x-auto bg-[#FAF8F5] rounded-3xl border border-[#0F1412]/10 p-2 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#1A2F23] text-white font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4 rounded-l-2xl">Tier</th>
                  <th className="p-4">Rate in LKR</th>
                  <th className="p-4">Approx. in INR</th>
                  <th className="p-4">Ideal For</th>
                  <th className="p-4 rounded-r-2xl">Key Inclusions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/10">
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="p-4 font-bold text-[#1A2F23]">Beachfront Value</td>
                  <td className="p-4 font-mono">LKR 12k – 16k</td>
                  <td className="p-4 font-mono font-bold text-gray-700">₹3,300 – ₹4,400</td>
                  <td className="p-4 text-gray-600">Solo / Budget Couples</td>
                  <td className="p-4 text-gray-600">AC, partial sea view, breakfast</td>
                </tr>
                <tr className="bg-emerald-50/70 hover:bg-emerald-50 transition-colors">
                  <td className="p-4 font-bold text-emerald-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Comfort Sweet Spot
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-900">LKR 18k – 24k</td>
                  <td className="p-4 font-mono font-bold text-[#C5A059]">₹4,900 – ₹6,500</td>
                  <td className="p-4 text-emerald-950 font-bold">Families & Couples</td>
                  <td className="p-4 text-emerald-900 font-light">Direct beach access, ocean balcony, pool, full buffet</td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="p-4 font-bold text-[#1A2F23]">Luxury & Heritage</td>
                  <td className="p-4 font-mono">LKR 45k – 90k+</td>
                  <td className="p-4 font-mono font-bold text-gray-700">₹12,000 – ₹24,000+</td>
                  <td className="p-4 text-gray-600">Honeymoon / High-End</td>
                  <td className="p-4 text-gray-600">5-star suites, private plunge, butler service</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/60 text-xs text-amber-950 space-y-1 leading-relaxed">
            <span className="font-bold flex items-center gap-1 text-amber-900">
              <Info className="w-4 h-4 text-amber-700" /> Pro-Tip from our Chennai Cost Model:
            </span>
            <p className="font-light">
              As detailed in our{" "}
              <Link
                to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
                className="font-bold text-amber-950 hover:text-[#C5A059] underline decoration-[#C5A059] underline-offset-4"
              >
                Chennai to Sri Lanka travel cost guide
              </Link>
              , keeping hotel accommodation in the <strong>LKR 20,000/night tier</strong> leaves ample room in your budget for private air-conditioned chauffeur transfers, lagoon boat safaris, and fresh jumbo prawn dining without overspending.
            </p>
          </div>

        </div>
      </section>

      {/* 3. HOTEL SHOWCASE CARDS (TOP 10 LIST) */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0F1412]/10 pb-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                Curated Recommendations
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] font-bold tracking-tight">
                Top 10 Oceanfront Resorts
              </h2>
              <p className="text-xs sm:text-sm text-[#0F1412]/75 font-light">
                Filter by regional coastline or explore the full collection below.
              </p>
            </div>

            {/* Region Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegionFilter(reg)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedRegionFilter === reg
                      ? "bg-[#1A2F23] text-white shadow"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-[#0F1412]/10"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="space-y-6">
            {filteredHotels.map((hotel, index) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0F1412]/10 shadow-sm hover:shadow-md transition-shadow grid md:grid-cols-3 gap-6 items-center"
              >
                {/* Image */}
                <div className="h-48 md:h-full rounded-2xl overflow-hidden bg-gray-100 relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#1A2F23]/80 backdrop-blur-sm text-white text-[10px] font-mono px-2.5 py-1 rounded-lg">
                    #{index + 1}
                  </span>
                </div>

                {/* Details */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0F1412]/5 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold tracking-wider block">
                        {hotel.region} • {hotel.tier}
                      </span>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1A2F23]">
                        {hotel.name}
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="font-mono font-bold text-sm sm:text-base text-[#1A2F23] block">
                        {hotel.priceLkr}
                      </span>
                      <span className="text-[11px] font-mono text-[#C5A059] font-bold block">
                        {hotel.priceInr}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#0F1412]/80 font-light italic">
                    &ldquo;{hotel.tagline}&rdquo;
                  </p>

                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#0F1412]/5 space-y-1 text-xs">
                    <strong className="text-[#1A2F23] block font-serif">Why Chennai Guests Love It:</strong>
                    <p className="text-[#0F1412]/75 font-light leading-relaxed">{hotel.whyChennaiLoved}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap gap-2 text-[11px] text-gray-600 font-mono">
                      {hotel.highlights.map((h, i) => (
                        <span key={i} className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {h}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenFunnel(`hotel_card_${hotel.id}`)}
                      className="px-4 py-2 bg-[#C5A059] hover:bg-[#1A2F23] text-white text-xs font-mono font-bold rounded-xl transition-all cursor-pointer shadow flex items-center gap-1.5 shrink-0"
                    >
                      <span>Include in My Route</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* East Coast Contextual Note */}
          <div className="bg-emerald-900/5 p-6 rounded-3xl border border-emerald-900/15 space-y-2 text-xs text-[#1e3a2f] leading-relaxed">
            <span className="font-bold flex items-center gap-1.5 font-serif text-sm">
              <Compass className="w-4 h-4 text-[#C5A059]" /> Planning an East Coast Escape (Nilaveli & Trincomalee)?
            </span>
            <p className="font-light">
              When{" "}
              <Link
                to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
                className="font-bold underline decoration-[#C5A059] underline-offset-4 hover:text-[#C5A059]"
              >
                calculating your overall Sri Lanka expenses from Chennai
              </Link>
              , East Coast stays like Nilaveli Beach Hotel are unbeatable if you fly during South India&apos;s school summer vacation (May through August). While southern beaches experience monsoon waves, Nilaveli offers crystal-clear calm water for snorkeling with reef turtles at Pigeon Island.
            </p>
          </div>

        </div>
      </section>

      {/* 4. AVOID TOUR OPERATOR MARKUPS & BOOKING ADVICE */}
      <section className="py-20 px-6 bg-white border-t border-b border-[#0F1412]/5">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Direct Travel Concierge • No Commission Fees
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A2F23] font-bold tracking-tight">
              How to Plan Sea View Stays Without Travel Agent Markups
            </h2>
            <p className="text-xs sm:text-sm text-[#0F1412]/75 font-light max-w-xl mx-auto">
              Generic package operators in India often tack on 30% to 40% agency fees while locking you into rigid daily schedules. Here is the modern approach:
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-xs">
            <div className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#0F1412]/10 space-y-2">
              <span className="text-2xl">🎯</span>
              <h4 className="font-serif font-bold text-base text-[#1A2F23]">1. Target LKR 20,000 Stays</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Skip overpriced generic tour packages. Booking direct comfort-tier oceanfront rooms guarantees pristine hygiene, great breakfast, and direct beach proximity at honest prices.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#0F1412]/10 space-y-2">
              <span className="text-2xl">🚗</span>
              <h4 className="font-serif font-bold text-base text-[#1A2F23]">2. Dedicated Private Driver</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Rather than negotiating expensive hotel taxis each morning, hire an English/Tamil-friendly chauffeur who meets you at CMB airport with an AC car for flat daily rates.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#0F1412]/10 space-y-2">
              <span className="text-2xl">⚡</span>
              <h4 className="font-serif font-bold text-base text-[#1A2F23]">3. Pre-Validate Drive Times</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Sri Lanka mountain roads are slower than maps suggest. Keep drive legs under 3.5 hours per day so your family spends their holiday relaxing by the pool, not stuck in a car.
              </p>
            </div>
          </div>

          {/* Enhanced Authority Backlink Card: Complete Chennai Trip Cost Pillar */}
          <div className="bg-gradient-to-r from-[#1A2F23] to-[#254633] text-white p-7 md:p-8 rounded-3xl border-2 border-[#C5A059]/40 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 border border-[#C5A059]/40 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider text-[#C5A059] font-bold">
                  🌟 Essential Companion Guide for Chennai Travelers
                </div>
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-white">
                  Planning Your Complete Chennai to Sri Lanka Trip Budget?
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xl font-light leading-relaxed">
                  Hotels are just one part of your vacation. Read our comprehensive{" "}
                  <Link
                    to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
                    className="font-bold text-[#C5A059] underline decoration-[#C5A059] underline-offset-4 hover:text-white"
                  >
                    Chennai to Sri Lanka trip cost guide
                  </Link>
                  {" "}for verified round-trip flight rates from MAA (IndiGo/Air India), Sri Lanka Tourist ETA visa costs, daily chauffeur charges, and itemized 5-day & 7-day budget blueprints.
                </p>
              </div>

              <Link
                to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
                className="px-7 py-4 bg-[#C5A059] hover:bg-white hover:text-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-full transition-all shrink-0 shadow-xl flex items-center gap-2"
              >
                <span>Read Full Chennai Cost Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive CTA Banner */}
          <div className="bg-[#FAF8F5] p-7 md:p-8 rounded-3xl border border-[#0F1412]/10 text-center space-y-4 shadow-sm">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1A2F23]">
              Ready to Calculate Your Coastal Route & Stay Costs?
            </h3>
            <p className="text-xs sm:text-sm text-[#0F1412]/75 max-w-xl mx-auto font-light leading-relaxed">
              Pair your preferred sea-view hotel with a licensed chauffeur and explore{" "}
              <Link
                to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
                className="text-[#1A2F23] font-bold underline decoration-[#C5A059] underline-offset-4 hover:text-[#C5A059]"
              >
                realistic flight-and-stay estimates from Chennai
              </Link>
              . Our interactive route validator lets you test days, vibes, and budget tiers free.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleOpenFunnel("bottom_cta_banner")}
                className="px-8 py-4 bg-[#C5A059] hover:bg-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-full transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Open Free Route Feasibility Funnel ➔
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FAQS ACCORDION */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Chennai Traveler FAQs
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A2F23] font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#0F1412]/75 font-light max-w-xl mx-auto">
              Clear answers to the most common questions asked by vacationers flying from Tamil Nadu to Sri Lanka.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#0F1412]/5 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-serif font-bold text-[#1A2F23] text-sm sm:text-base flex justify-between items-center gap-4 cursor-pointer hover:bg-gray-50/60"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C5A059] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
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
            })}
          </div>

        </div>
      </section>

      {/* 6. BOTTOM CONCIERGE BAR */}
      <section className="py-20 px-6 bg-[#1A2F23] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
            Direct Colombo & London Concierge
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-bold leading-tight">
            Reserve Your Sea View Stays & Private Driver
          </h2>
          <p className="text-xs md:text-base text-white/75 font-light max-w-xl mx-auto leading-relaxed">
            Skip middleman commissions. Message our local concierge desk to verify real-time room availability, private van rates, and custom coastal itineraries.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <button
              onClick={() => handleOpenFunnel("footer_cta")}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-white hover:text-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-full transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Start 3-Step Route Funnel ➔
            </button>
            <button
              onClick={handleWhatsAppContact}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white hover:text-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-full transition-all border border-white/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Chat on WhatsApp 💬
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROUTE FUNNEL MODAL */}
      <InteractiveRouteFunnelModal
        isOpen={isFunnelOpen}
        onClose={() => setIsFunnelOpen(false)}
      />

    </div>
  );
}
