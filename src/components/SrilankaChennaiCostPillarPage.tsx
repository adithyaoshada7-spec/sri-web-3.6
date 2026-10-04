import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  ArrowRight,
  MapPin,
  Clock,
  Car,
  Utensils,
  Sparkles,
  Calendar,
  Info,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  AlertTriangle,
  Heart,
  Users,
  Train,
  Plane,
  ShieldCheck,
  DollarSign,
  Send,
  Luggage,
  Star,
  Hotel,
  TrendingDown,
  Check,
  UserCheck,
  Compass
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import InteractiveRouteFunnelModal from "./InteractiveRouteFunnelModal";

interface CostBreakdown {
  flights: number;
  hotels: number;
  food: number;
  transport: number;
  activities: number;
  visaAndMisc: number;
  totalPerPerson: number;
  totalGroup: number;
}

export default function SrilankaChennaiCostPillarPage() {
  usePageMetadata({
    title: "Sri Lanka Trip Cost From Chennai (2026): Budget, Flights & 7-Day Guide",
    description: "Planning a Sri Lanka trip from Chennai in 2026? Exact cost breakdown: flights from ₹10,500, hotel rates, 5-day & 7-day budgets, couple & family expenses, plus calculator.",
    canonicalUrl: "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai",
    ogUrl: "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
    ogType: "article"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isFunnelOpen, setIsFunnelOpen] = useState<boolean>(false);

  // Interactive Calculator State
  const [calcDuration, setCalcDuration] = useState<number>(7);
  const [calcTravelers, setCalcTravelers] = useState<number>(2);
  const [calcTier, setCalcTier] = useState<"budget" | "midrange" | "luxury">("midrange");
  const [calcPrivateDriver, setCalcPrivateDriver] = useState<boolean>(true);
  const [calcIncludeSafaris, setCalcIncludeSafaris] = useState<boolean>(true);

  // Lead inquiry form state
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `chennai_cost_faq_${index}`);
  };

  // Dynamic calculation logic in INR
  const calculateCosts = (): CostBreakdown => {
    // Flight rates from MAA roundtrip per person
    const flightRatePerPax = calcTier === "budget" ? 11000 : calcTier === "midrange" ? 13500 : 22000;
    const flightsTotal = flightRatePerPax * calcTravelers;

    // Hotel rates per room per night (assuming 2 pax per room)
    const roomsNeeded = Math.ceil(calcTravelers / 2);
    const nights = Math.max(1, calcDuration - 1);
    const hotelNightlyRate = calcTier === "budget" ? 1800 : calcTier === "midrange" ? 4800 : 14000;
    const hotelsTotal = hotelNightlyRate * roomsNeeded * nights;

    // Daily food cost per person
    const foodDailyRatePerPax = calcTier === "budget" ? 700 : calcTier === "midrange" ? 1600 : 3800;
    const foodTotal = foodDailyRatePerPax * calcDuration * calcTravelers;

    // Transport costs
    let transportTotal = 0;
    if (calcPrivateDriver) {
      // Dedicated AC Sedan/Van with English speaking chauffeur (per vehicle per day)
      const vehicleDailyRate = calcTravelers <= 2 ? 3800 : 5200;
      transportTotal = vehicleDailyRate * calcDuration;
    } else {
      // Public train + PickMe/local tuktuks per person
      const localTransportPerPaxDay = calcTier === "budget" ? 400 : 800;
      transportTotal = localTransportPerPaxDay * calcDuration * calcTravelers;
    }

    // Activities & Entrance tickets per person
    let activitiesPerPax = calcTier === "budget" ? 2500 : calcTier === "midrange" ? 6500 : 14000;
    if (calcIncludeSafaris) {
      activitiesPerPax += 4500; // Yala/Udawalawe 4x4 safari + entry pass
    }
    const activitiesTotal = activitiesPerPax * calcTravelers;

    // Visa ETA & SIM & Tipping
    const visaAndMiscPerPax = 1500; // SIM ₹500 + misc contingency
    const miscTotal = visaAndMiscPerPax * calcTravelers;

    const grandTotal = flightsTotal + hotelsTotal + foodTotal + transportTotal + activitiesTotal + miscTotal;
    const perPax = Math.round(grandTotal / calcTravelers);

    return {
      flights: flightsTotal,
      hotels: hotelsTotal,
      food: foodTotal,
      transport: transportTotal,
      activities: activitiesTotal,
      visaAndMisc: miscTotal,
      totalPerPerson: perPax,
      totalGroup: grandTotal
    };
  };

  const currentCalc = calculateCosts();

  // Pre-formatted WhatsApp inquiry message
  const generateWhatsAppMessage = () => {
    const text = `Hi Plan Sri Lanka team! I am planning a ${calcDuration}-day Sri Lanka trip from Chennai for ${calcTravelers} traveler(s) in ${calcTier} tier. Estimated total: ₹${currentCalc.totalGroup.toLocaleString("en-IN")}. Please send me a customized itinerary and private driver quote.`;
    return encodeURIComponent(text);
  };

  // Structured Data Schema for Rich Snippets & AI Search
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Sri Lanka Trip Cost From Chennai (2026): Budget, Flights & 7-Day Guide",
      "description": "Planning a Sri Lanka trip from Chennai in 2026? Exact cost breakdown: flights from ₹10,500, hotel rates, 5-day & 7-day budgets, couple & family expenses, plus calculator.",
      "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
      "author": {
        "@type": "Person",
        "name": "Oshada Adithya",
        "jobTitle": "Lead Travel Planner",
        "url": "https://plan-srilanka.com/about-founder"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Plan Sri Lanka",
        "logo": {
          "@type": "ImageObject",
          "url": "https://plan-srilanka.com/logo.png"
        }
      },
      "datePublished": "2026-01-15T08:00:00+05:30",
      "dateModified": "2026-03-28T10:00:00+05:30",
      "mainEntityOfPage": "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
    },
    {
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
          "name": "Trip Costs",
          "item": "https://plan-srilanka.com/sri-lanka-trip-cost-from-india"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Sri Lanka Trip Cost From Chennai",
          "item": "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": "Sri Lanka",
      "description": "Tropical island nation located just 80 minutes by direct flight from Chennai (MAA), renowned for UNESCO world heritage sites, tea highlands, golden surf beaches, and wildlife safaris.",
      "about": {
        "@type": "Place",
        "name": "Sri Lanka"
      },
      "touristType": [
        "Couples",
        "Families",
        "Budget Travelers",
        "Honeymooners",
        "Culture & Wildlife Enthusiasts"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a Sri Lanka trip from Chennai cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Sri Lanka trip from Chennai typically costs ₹25,000 to ₹35,000 per person for a 5-day budget trip, ₹45,000 to ₹62,000 per person for a 5-day comfortable mid-range vacation, and ₹58,000 to ₹78,000 per person for a 7-day classic island loop with a dedicated private chauffeur."
          }
        },
        {
          "@type": "Question",
          "name": "How much are direct flight tickets from Chennai to Colombo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Direct round-trip flights from Chennai (MAA) to Colombo (CMB) on IndiGo, SriLankan Airlines, or Air India typically cost between ₹10,500 and ₹14,500 when booked 30 to 60 days in advance. Last-minute fares or holiday peaks can reach ₹18,000 to ₹22,000."
          }
        },
        {
          "@type": "Question",
          "name": "How long is the flight from Chennai to Sri Lanka?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The non-stop flight from Chennai International Airport (MAA) to Colombo Bandaranaike International Airport (CMB) takes just 1 hour and 20 minutes (80 minutes). Flights to Jaffna (JAF) on Alliance Air take approximately 60 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Do Indians need a visa for Sri Lanka in 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Indian passport holders require an online Tourist Electronic Travel Authorization (ETA). Sri Lanka frequently runs promotional visa fee waivers making it free (₹0). When standard fees apply, the 30-day tourist ETA costs approximately $20 USD (~₹1,650)."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a 7-day Sri Lanka trip cost for a couple from Chennai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 7-day mid-range Sri Lanka trip for a couple from Chennai costs between ₹1,10,000 and ₹1,45,000 total (around ₹55,000 to ₹72,500 per person), including return flights, 3 to 4-star boutique hotels with breakfast, a private AC car with driver-guide, entrance fees, and daily dining."
          }
        },
        {
          "@type": "Question",
          "name": "Is Sri Lanka cheaper than domestic Indian holidays like Goa or Kerala?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Due to the ultra-short 80-minute flight from Chennai and favorable exchange rates (1 INR ≈ 3.5 to 3.7 LKR), total spending on private chauffeur transport, boutique coastal resorts, and fresh seafood in Sri Lanka is often comparable to or cheaper than peak-season trips to Goa or Kerala."
          }
        },
        {
          "@type": "Question",
          "name": "How much physical cash should I carry from Chennai to Sri Lanka?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Carry approximately ₹15,000 to ₹20,000 in crisp Indian Rupee (INR) ₹500 notes per person to convert directly to Sri Lankan Rupees (LKR) at Colombo Airport official exchange counters. Use zero-forex debit or credit cards for hotels and modern restaurants."
          }
        },
        {
          "@type": "Question",
          "name": "What is the cheapest month to visit Sri Lanka from Chennai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "September, October, May, and June offer the lowest round-trip flight prices and deep off-season hotel discounts of up to 40%. For the sunny southern beaches, December to April is prime dry season."
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#E5D5B8] selection:text-[#1A1A1A]">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* HERO SECTION */}
      <header className="relative pt-12 pb-14 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#E8E4D9]">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#7A7365]">
            <li>
              <Link to="/" className="hover:text-[#1F3D2B] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/sri-lanka-trip-cost-from-india" className="hover:text-[#1F3D2B] transition-colors">
                Trip Costs
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#1F3D2B] font-bold" aria-current="page">
              Chennai to Sri Lanka Cost
            </li>
          </ol>
        </nav>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF3ED] text-[#1F3D2B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#C5DAC9]">
          <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
          <span>2026 Chennai Flight & Budget Master Guide</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F3D2B] tracking-tight leading-[1.15] mb-6">
          Sri Lanka Trip Cost From Chennai (2026): Complete Budget Guide
        </h1>

        <p className="text-lg sm:text-xl text-[#4A453A] leading-relaxed max-w-3xl mb-6 font-sans">
          Planning a trip from Chennai to Sri Lanka? Because Colombo is just <strong>80 minutes away by direct flight</strong>, Sri Lanka is one of the fastest, most affordable international holidays for travellers in Tamil Nadu. Here is the realistic 2026 cost breakdown for flights, hotels, private transport, food, couples, and families.
        </p>

        <div className="mb-6">
          <button
            onClick={() => {
              setIsFunnelOpen(true);
              trackEvent("funnel_open_hero", "conversion", "chennai_cost_hero");
            }}
            className="cta-pulse-glow btn-shine inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#1F3D2B] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#142A1D] transition-all group cursor-pointer border-2 border-[#D4AF37]/50"
          >
            <Sparkles className="w-4 h-4 text-[#F2C94C] animate-spin" style={{ animationDuration: "6s" }} />
            <span className="tracking-wide">Create My Own Route (Free) 🚀</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#F2C94C]" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#7A7365] font-mono border-t border-[#E8E4D9] pt-4">
          <span className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#1F3D2B]" />
            Author: <strong>Oshada Adithya</strong> (Local Trip Specialist)
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#1F3D2B]" />
            Updated: <strong>March 2026</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#1F3D2B]" />
            Route: <strong>MAA → CMB / JAF</strong>
          </span>
        </div>
      </header>

      {/* QUICK ANSWER / FEATURED SNIPPET SUMMARY BOX */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-6 pt-10 pb-10">
        <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#1F3D2B] p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#1F3D2B] text-[#FFFFFF] text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-bl-xl flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F2C94C]" />
            Quick Answer (Direct Summary)
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3D2B] mb-3">
            How Much Does a Sri Lanka Trip From Chennai Cost?
          </h2>

          <p className="text-base text-[#332F28] leading-relaxed mb-6 font-medium">
            A holiday to Sri Lanka from Chennai typically costs <strong>₹25,000 to ₹75,000 per person</strong> for a 5 to 7-day trip, depending on your travel style, accommodation choice, and whether you hire a private chauffeur or take public trains. Direct flights from Chennai (MAA) start from <strong>₹10,500 roundtrip</strong>.
          </p>

          {/* Core Cost Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E8E4D9] mb-6">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1F3D2B] text-white font-serif">
                  <th className="p-3.5 font-semibold">Travel Tier</th>
                  <th className="p-3.5 font-semibold">5-Day Cost (Per Pax)</th>
                  <th className="p-3.5 font-semibold">7-Day Cost (Per Pax)</th>
                  <th className="p-3.5 font-semibold">Best Suited For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4D9] bg-white">
                <tr className="hover:bg-[#F9F7F2] transition-colors">
                  <td className="p-3.5 font-bold text-[#1F3D2B] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Budget Tier
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#1A1A1A]">₹25,000 – ₹35,000</td>
                  <td className="p-3.5 font-mono font-bold text-[#1A1A1A]">₹33,000 – ₹45,000</td>
                  <td className="p-3.5 text-[#5A5448]">Solo backpackers, hostels/homestays, trains & PickMe tuk-tuks</td>
                </tr>
                <tr className="hover:bg-[#F9F7F2] transition-colors bg-[#FAF8F3]">
                  <td className="p-3.5 font-bold text-[#1F3D2B] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Mid-Range Comfort ⭐
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#1F3D2B]">₹45,000 – ₹62,000</td>
                  <td className="p-3.5 font-mono font-bold text-[#1F3D2B]">₹58,000 – ₹78,000</td>
                  <td className="p-3.5 text-[#5A5448]">Couples & families, 3-4★ boutique hotels, private dedicated AC car</td>
                </tr>
                <tr className="hover:bg-[#F9F7F2] transition-colors">
                  <td className="p-3.5 font-bold text-[#1F3D2B] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                    Luxury & Honeymoon
                  </td>
                  <td className="p-3.5 font-mono font-bold text-[#1A1A1A]">₹90,000 – ₹1,20,000</td>
                  <td className="p-3.5 font-mono font-bold text-[#1A1A1A]">₹1,20,000 – ₹1,80,000+</td>
                  <td className="p-3.5 text-[#5A5448]">5★ beach resorts, private pool villas, colonial tea bungalows, premium SUV</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F2F7F4] p-4 rounded-xl border border-[#C5DAC9]">
            <p className="text-xs sm:text-sm text-[#1F3D2B] font-medium">
              Want a tailored route validation with precise day-by-day costs for your exact dates?
            </p>
            <button
              onClick={() => {
                setIsFunnelOpen(true);
                trackEvent("funnel_open_quick_answer", "conversion", "chennai_cost_quick_answer");
              }}
              className="cta-pulse-glow btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F3D2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#142A1D] transition-all shrink-0 cursor-pointer border border-[#D4AF37]/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2C94C] animate-spin" style={{ animationDuration: "6s" }} />
              <span>Create My Own Route (Free) 🚀</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2C94C]" />
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-14 py-6">

        {/* SECTION 1: KEY AT-A-GLANCE FACTS */}
        <section aria-labelledby="glance-heading" className="space-y-4">
          <h2 id="glance-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
            Sri Lanka Trip Cost From Chennai at a Glance
          </h2>
          <p className="text-base text-[#4A453A] leading-relaxed">
            Chennai is geographically the closest major Indian metro to Sri Lanka. With multiple daily non-stop flights and streamlined immigration, here are the vital trip metrics you should know before building your budget:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] text-center">
              <span className="text-[11px] font-mono text-[#7A7365] uppercase block mb-1">Departure</span>
              <strong className="text-sm sm:text-base font-serif text-[#1F3D2B] block">Chennai (MAA)</strong>
              <span className="text-[10px] text-[#5A5448]">Terminal 2 Intl</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] text-center">
              <span className="text-[11px] font-mono text-[#7A7365] uppercase block mb-1">Flight Time</span>
              <strong className="text-sm sm:text-base font-serif text-[#1F3D2B] block">80 Minutes</strong>
              <span className="text-[10px] text-[#5A5448]">Direct non-stop</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] text-center">
              <span className="text-[11px] font-mono text-[#7A7365] uppercase block mb-1">Return Flights</span>
              <strong className="text-sm sm:text-base font-serif text-[#1F3D2B] block">₹10,500 – ₹14,500</strong>
              <span className="text-[10px] text-[#5A5448]">Advance booked</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] text-center">
              <span className="text-[11px] font-mono text-[#7A7365] uppercase block mb-1">Exchange Rate</span>
              <strong className="text-sm sm:text-base font-serif text-[#1F3D2B] block">1 INR ≈ 3.6 LKR</strong>
              <span className="text-[10px] text-[#5A5448]">Strong INR power</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] text-center">
              <span className="text-[11px] font-mono text-[#7A7365] uppercase block mb-1">Tourist Visa</span>
              <strong className="text-sm sm:text-base font-serif text-[#1F3D2B] block">₹0 / $20 ETA</strong>
              <span className="text-[10px] text-[#5A5448]">Online approval</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] text-center">
              <span className="text-[11px] font-mono text-[#7A7365] uppercase block mb-1">Best Duration</span>
              <strong className="text-sm sm:text-base font-serif text-[#1F3D2B] block">5 to 7 Days</strong>
              <span className="text-[10px] text-[#5A5448]">Zero jet-lag</span>
            </div>
          </div>

          {/* TOURIST PRICE TRANSPARENCY CALLOUT */}
          <div className="bg-[#FAF8F3] border-2 border-[#1F3D2B]/20 rounded-2xl p-6 space-y-3 shadow-sm mt-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1F3D2B] uppercase tracking-wider">
              <span>💡 Essential Price Safeguards</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">
              5 Things You Should Never Overpay For in Sri Lanka 🇱🇰
            </h3>
            <p className="text-xs sm:text-sm text-[#4A453A] leading-relaxed">
              Before booking tuk-tuks, roadside SIM cards, gem shops, or safari jeeps, read our expert checklist on avoiding common tourist price markups and hidden fees.
            </p>
            <Link
              to="/things-never-to-overpay-for-in-sri-lanka"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1F3D2B] uppercase tracking-wider underline hover:text-[#b38728] transition-colors pt-1"
            >
              <span>Read 5 Things Never to Overpay For Guide</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#b38728]" />
            </Link>
          </div>
        </section>

        {/* SECTION 2: CHENNAI TO SRI LANKA FLIGHT COST */}
        <section aria-labelledby="flights-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Aviation & Routes</span>
              <h2 id="flights-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Chennai to Sri Lanka Flight Cost
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            The flight route from <strong>Chennai International Airport (MAA) to Colombo Bandaranaike International Airport (CMB)</strong> is the cheapest and shortest international flight route out of India. With an air distance of just 650 km, you land in Colombo in only <strong>1 hour and 20 minutes</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">Direct Flight Operators & Typical Fares</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A453A]">
                <li className="flex items-start justify-between border-b border-[#F0ECE1] pb-2">
                  <div>
                    <strong>IndiGo (MAA → CMB)</strong>
                    <p className="text-xs text-[#7A7365]">Daily direct morning & evening flights (15kg check-in)</p>
                  </div>
                  <span className="font-mono font-bold text-[#1F3D2B]">₹10,500 – ₹13,500</span>
                </li>
                <li className="flex items-start justify-between border-b border-[#F0ECE1] pb-2">
                  <div>
                    <strong>SriLankan Airlines (MAA → CMB)</strong>
                    <p className="text-xs text-[#7A7365]">Full-service widebody, complimentary hot meal, 30kg check-in</p>
                  </div>
                  <span className="font-mono font-bold text-[#1F3D2B]">₹12,000 – ₹15,500</span>
                </li>
                <li className="flex items-start justify-between border-b border-[#F0ECE1] pb-2">
                  <div>
                    <strong>Air India / Vistara Connections</strong>
                    <p className="text-xs text-[#7A7365]">Connecting or direct seasonal flights</p>
                  </div>
                  <span className="font-mono font-bold text-[#1F3D2B]">₹13,000 – ₹17,000</span>
                </li>
                <li className="flex items-start justify-between pt-1">
                  <div>
                    <strong>Alliance Air (MAA → JAF Jaffna)</strong>
                    <p className="text-xs text-[#7A7365]">Direct 60-min turboprop flight to Northern Sri Lanka</p>
                  </div>
                  <span className="font-mono font-bold text-[#1F3D2B]">₹11,500 – ₹15,000</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E8E4D9] space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">Smart Chennai Flight Booking Rules</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5A5448]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Book 45 to 60 days ahead:</strong> Fares on IndiGo regularly sit at ₹10,500–₹11,500 round-trip during this window.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Watch out for Pongal & Diwali surges:</strong> During Tamil holidays and long weekends, MAA–CMB tickets spike to ₹18,000–₹24,000 if not booked early.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Calculate baggage allowance:</strong> SriLankan Airlines offers 30 kg baggage in economy, which saves money if shopping for Ceylon tea, spices, and handlooms compared to low-cost carriers with 15 kg limits.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3 & 4: 5-DAY AND 7-DAY COMPLETE LINE-ITEM BREAKDOWNS */}
        <section aria-labelledby="duration-cost-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Detailed Expense Breakdown</span>
              <h2 id="duration-cost-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Sri Lanka Trip Cost for 5 Days vs 7 Days
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            To prevent unexpected surprises, here are the itemized, line-by-line calculations for both a quick 5-day escape (ideal for long weekends) and the classic 7-day comprehensive island loop.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 5-Day Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] shadow-sm space-y-4">
              <div className="flex justify-between items-baseline border-b border-[#E8E4D9] pb-3">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1F3D2B]">5-Day Trip Cost (Per Person)</h3>
                  <span className="text-xs text-[#7A7365]">Colombo • Bentota • Galle Fort Coastal Route</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#7A7365] block">Mid-Range Avg</span>
                  <span className="font-mono font-bold text-xl text-[#1F3D2B]">₹48,000</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Return Flight (MAA ↔ CMB)</span>
                  <span className="font-mono font-semibold">₹11,500</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Hotels (4 Nights @ ₹4,500 / 2 pax)</span>
                  <span className="font-mono font-semibold">₹9,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Food & Dining (5 Days @ ₹1,500/day)</span>
                  <span className="font-mono font-semibold">₹7,500</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Private Chauffeur Car (₹3,800/day / 2)</span>
                  <span className="font-mono font-semibold">₹9,500</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Activities (Madu River, Galle, Turtle Hatchery)</span>
                  <span className="font-mono font-semibold">₹4,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Tourist Visa ETA & Dialog SIM Card</span>
                  <span className="font-mono font-semibold">₹1,500</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-[#1F3D2B] bg-[#F9F7F2] p-2.5 rounded-lg">
                  <span>5-Day Mid-Range Total:</span>
                  <span className="font-mono">₹43,000 – ₹52,000</span>
                </div>
                <div className="text-[11px] text-[#7A7365]">
                  * Budget backpacker alternative using trains and hostels: <strong>₹25,000 – ₹32,000 per pax</strong>.
                </div>
              </div>

              <Link
                to="/sri-lanka-5-day-itinerary-from-chennai"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#1F3D2B] text-[#1F3D2B] text-xs font-bold uppercase tracking-wider hover:bg-[#1F3D2B] hover:text-white transition-all text-center"
              >
                <span>Read Full 5-Day Chennai Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 7-Day Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#1F3D2B]/30 shadow-md space-y-4">
              <div className="flex justify-between items-baseline border-b border-[#E8E4D9] pb-3">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1F3D2B]">7-Day Trip Cost (Per Person)</h3>
                  <span className="text-xs text-[#7A7365]">Sigiriya • Kandy • Ella • Yala • Galle Classic Loop</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#7A7365] block">Mid-Range Avg</span>
                  <span className="font-mono font-bold text-xl text-[#1F3D2B]">₹68,000</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Return Flight (MAA ↔ CMB)</span>
                  <span className="font-mono font-semibold">₹12,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Hotels (6 Nights @ ₹5,000 / 2 pax)</span>
                  <span className="font-mono font-semibold">₹15,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Food & Dining (7 Days @ ₹1,600/day)</span>
                  <span className="font-mono font-semibold">₹11,200</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Private Chauffeur Sedan (₹4,000/day / 2)</span>
                  <span className="font-mono font-semibold">₹14,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Key Tickets (Sigiriya, Tooth Temple, Ella, Safari)</span>
                  <span className="font-mono font-semibold">₹11,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F5F2EA]">
                  <span className="text-[#5A5448]">Tourist Visa ETA, SIM & Driver Tips</span>
                  <span className="font-mono font-semibold">₹2,800</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-[#1F3D2B] bg-[#F2F7F4] p-2.5 rounded-lg border border-[#C5DAC9]">
                  <span>7-Day Mid-Range Total:</span>
                  <span className="font-mono">₹62,000 – ₹76,000</span>
                </div>
                <div className="text-[11px] text-[#7A7365]">
                  * Budget backpacker 7-day loop (hostels + public buses/trains): <strong>₹33,000 – ₹42,000 per pax</strong>.
                </div>
              </div>

              <Link
                to="/sri-lanka-7-day-itinerary"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#1F3D2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#142A1D] transition-all text-center shadow"
              >
                <span>Read Full 7-Day Classic Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5: HOTEL & ACCOMMODATION COSTS */}
        <section aria-labelledby="hotels-heading" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Accommodation</span>
              <h2 id="hotels-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Sri Lanka Hotel Cost Breakdown
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            Accommodation in Sri Lanka delivers superb value for Indian travelers. Because 1 INR is roughly 3.6 LKR, ₹4,500 to ₹7,000 per night buys high-ceilinged colonial boutique suites with pools, gardens, and included breakfasts that would cost ₹12,000+ in comparable Southeast Asian hubs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Budget Stays</span>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">₹1,200 – ₹2,500 <span className="text-xs font-normal text-[#7A7365]">/ night</span></h3>
              <p className="text-xs text-[#5A5448]">Clean guesthouses, family-run villas, and boutique backpacker hostels in Negombo, Kandy, Ella, and Weligama with AC and Wi-Fi.</p>
            </div>
            <div className="bg-[#FAF8F3] p-5 rounded-2xl border-2 border-[#1F3D2B]/20 space-y-2">
              <span className="text-xs font-mono font-bold text-[#1F3D2B] uppercase">3★ to 4★ Boutique Hotels</span>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">₹4,000 – ₹8,000 <span className="text-xs font-normal text-[#7A7365]">/ night</span></h3>
              <p className="text-xs text-[#5A5448]">Charming colonial mansions, beachfront properties in Galle/Bentota with swimming pools, lush tea estate vistas, and hot breakfasts.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-purple-700 uppercase">5★ Luxury Resorts & Villas</span>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">₹14,000 – ₹38,000+ <span className="text-xs font-normal text-[#7A7365]">/ night</span></h3>
              <p className="text-xs text-[#5A5448]">Heritance Kandalama, Cape Weligama, Ceylon Tea Trails, and private beachfront pool villas with personal butler service.</p>
            </div>
          </div>
        </section>

        {/* SECTION 6: FOOD & DAILY DINING COSTS */}
        <section aria-labelledby="food-heading" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Gastronomy & Dining</span>
              <h2 id="food-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Food Cost in Sri Lanka for Indian Travelers
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            South Indian travelers from Chennai find Sri Lankan cuisine instantly comforting yet excitingly distinct. With fresh coconut sambols, string hoppers, kottu roti, and abundant vegetarian options alongside fresh lagoon mud crab, here is what dining actually costs:
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#E8E4D9]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF8F3] text-[#1F3D2B] font-serif border-b border-[#E8E4D9]">
                  <th className="p-3 font-semibold">Dining Style</th>
                  <th className="p-3 font-semibold">Typical Meal Items</th>
                  <th className="p-3 font-semibold">Cost in LKR</th>
                  <th className="p-3 font-semibold">Cost in INR (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4D9] bg-white">
                <tr>
                  <td className="p-3 font-bold text-[#1F3D2B]">Local Eateries & Street Food</td>
                  <td className="p-3 text-[#5A5448]">Egg hoppers, string hoppers, veg rice & curry, kottu roti, King Coconut</td>
                  <td className="p-3 font-mono">500 – 1,200 LKR</td>
                  <td className="p-3 font-mono font-bold">₹140 – ₹330</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1F3D2B]">Mid-Range Beach & City Cafes</td>
                  <td className="p-3 text-[#5A5448]">Wood-fired pizzas, fresh seafood rice bowls, grilled fish, smoothies</td>
                  <td className="p-3 font-mono">2,500 – 5,500 LKR</td>
                  <td className="p-3 font-mono font-bold">₹700 – ₹1,550</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1F3D2B]">Fine Dining & Premium Seafood</td>
                  <td className="p-3 text-[#5A5448]">Ministry of Crab (Colombo), 5-star hotel buffets, romantic ocean dinners</td>
                  <td className="p-3 font-mono">12,000 – 30,000+ LKR</td>
                  <td className="p-3 font-mono font-bold">₹3,300 – ₹8,500+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#7A7365]">
            💡 <strong>Pro-Tip for Chennai Vegetarians:</strong> Traditional Sri Lankan rice and curry spreads come with 4 to 6 separate vegetarian side curries (dhal, beetroot, jackfruit, pumpkin, pol sambol). Finding pure-vegetarian food in Colombo, Kandy, and Jaffna is effortless.
          </p>
        </section>

        {/* SECTION 7: TRANSPORT COMPARISON */}
        <section aria-labelledby="transport-heading" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Ground Logistics</span>
              <h2 id="transport-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Transport Cost in Sri Lanka (Chauffeur vs Trains vs Tuk-Tuks)
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            Ground transport is the most pivotal factor determining your trip comfort. Unlike domestic Indian road trips where self-driving is common, Indian tourists in Sri Lanka either hire a <strong>dedicated private tourist chauffeur</strong> or rely on trains and the PickMe app.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-[#1F3D2B] uppercase">Private Chauffeur Sedan / Van</span>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">₹3,500 – ₹5,500 <span className="text-xs font-normal text-[#7A7365]">/ day</span></h3>
              <p className="text-xs text-[#5A5448]">Includes dedicated AC car/van, English-speaking tourist driver, petrol, highway tolls, driver accommodation & meals. Door-to-door comfort for couples and families.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-[#1F3D2B] uppercase">Scenic Highland Trains</span>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">₹300 – ₹1,200 <span className="text-xs font-normal text-[#7A7365]">/ ticket</span></h3>
              <p className="text-xs text-[#5A5448]">The world-famous Kandy to Ella blue train ride. Reserved 1st and 2nd class tickets must be booked 30 days in advance via Sri Lanka Railways portal.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-xs font-mono font-bold text-[#1F3D2B] uppercase">PickMe & Metered Tuk-Tuks</span>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">₹80 – ₹300 <span className="text-xs font-normal text-[#7A7365]">/ ride</span></h3>
              <p className="text-xs text-[#5A5448]">Always hail three-wheelers in Colombo, Galle, and Kandy using the <strong>PickMe app</strong> to prevent arbitrary street overcharging.</p>
            </div>
          </div>
        </section>

        {/* SECTION 7.5: ACTIVITIES & SIGHTSEEING EXPERIENCES + BACKLINK CTA */}
        <section aria-labelledby="activities-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Experiences & Sightseeing</span>
              <h2 id="activities-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                What to Do in Sri Lanka: Activity Costs for Indian Travelers
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            Wondering what experiences to budget for once you land from Chennai? From dawn leopard safaris in Yala to blue whale watching in Mirissa and tea estate tours in Ella, here are the realistic ticket and excursion costs in Indian Rupees:
          </p>

          {/* Quick Experience Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Wildlife Safari</span>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Yala / Udawalawe Safari</h3>
              <div className="text-sm font-mono font-bold text-[#1F3D2B]">₹4,500 – ₹7,000 <span className="text-xs font-normal text-[#7A7365]">/ pax</span></div>
              <p className="text-xs text-[#5A5448]">Includes 4x4 private open-top safari jeep, national park entry ticket, and wildlife tracker.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Marine Adventure</span>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Mirissa Whale Watching</h3>
              <div className="text-sm font-mono font-bold text-[#1F3D2B]">₹3,800 – ₹6,500 <span className="text-xs font-normal text-[#7A7365]">/ pax</span></div>
              <p className="text-xs text-[#5A5448]">Luxury catamaran or insured cruiser with marine biologist onboard and breakfast.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Heritage & Culture</span>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Sigiriya Fortress & Kandy</h3>
              <div className="text-sm font-mono font-bold text-[#1F3D2B]">₹1,200 – ₹3,200 <span className="text-xs font-normal text-[#7A7365]">/ entry</span></div>
              <p className="text-xs text-[#5A5448]">Sigiriya UNESCO Rock (₹3,000 / $36 USD) & Temple of the Sacred Tooth Relic (₹600).</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9] space-y-2">
              <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Coastal & Adventure</span>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Surfing & Ella Tea Hikes</h3>
              <div className="text-sm font-mono font-bold text-[#1F3D2B]">₹1,500 – ₹3,000 <span className="text-xs font-normal text-[#7A7365]">/ session</span></div>
              <p className="text-xs text-[#5A5448]">Surf board rental & beginner lessons in Weligama, Little Adam's Peak zip-line in Ella.</p>
            </div>
          </div>

          {/* High-Converting Visual CTA Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1F3D2B] via-[#2A4D38] to-[#142A1D] rounded-3xl p-6 sm:p-8 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B38728]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[11px] text-[#E8E4D9] uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#B38728]" /> Complete Experience Directory
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  Looking for the Best Activities & Things to Do in Sri Lanka?
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  Compare verified ticket prices, best visiting hours, safari jeep options, and customer reviews across 45+ hand-picked activities in our dedicated catalog.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <Link
                  to="/things-to-do-in-sri-lanka"
                  className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-7 py-4 bg-[#B38728] hover:bg-[#c9982e] text-[#1F3D2B] font-bold rounded-2xl text-xs uppercase tracking-[0.15em] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] group text-center"
                >
                  <span>Explore All Things to Do</span>
                  <ArrowRight className="w-4 h-4 text-[#1F3D2B] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8, 9, 10: COUPLES, FAMILIES, & HONEYMOON BUDGETS */}
        <section aria-labelledby="groups-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Group & Category Costs</span>
              <h2 id="groups-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Cost for Couples, Families & Honeymoons From Chennai
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Couple Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-3">
              <div className="flex items-center gap-2 text-rose-700">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Couples (7 Days)</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1F3D2B]">₹1,15,000 – ₹1,45,000</h3>
              <span className="text-xs text-[#7A7365] block -mt-2">Total for 2 Adults with Flights</span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Includes 2 direct return flights from Chennai, 6 nights in romantic 3-4★ boutique villas, private dedicated AC sedan car with chauffeur, scenic train ride to Ella, and memorable beachside dinners in Galle.
              </p>
            </div>

            {/* Family Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-3">
              <div className="flex items-center gap-2 text-blue-700">
                <Users className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Family of 4 (7 Days)</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1F3D2B]">₹1,85,000 – ₹2,40,000</h3>
              <span className="text-xs text-[#7A7365] block -mt-2">Total for 2 Adults + 2 Kids with Flights</span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Includes 4 return flights, spacious private AC High-Roof Van with child booster seats, interconnecting family hotel rooms with swimming pools, elephant transit home, and sea turtle conservation visits.
              </p>
            </div>

            {/* Honeymoon Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-3">
              <div className="flex items-center gap-2 text-amber-700">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Luxury Honeymoon (7 Days)</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1F3D2B]">₹2,10,000 – ₹3,20,000</h3>
              <span className="text-xs text-[#7A7365] block -mt-2">Total for Couple with Luxury Stays</span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Private oceanfront plunge pool villas in Bentota/Mirissa, colonial tea estate bungalows in Nuwara Eliya, couples spa sessions, premium SUV chauffeur transfers, and candlelit seafood dinners.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: CHEAPEST WAYS TO TRAVEL FROM CHENNAI */}
        <section aria-labelledby="savings-heading" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Insider Money Hacks</span>
              <h2 id="savings-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Cheapest Way to Travel From Chennai to Sri Lanka
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            Experienced travelers from Tamil Nadu slash their total vacation expense by up to 35% using these tested insider steps:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">1. Convert INR at Colombo Airport Arrival Desks</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Do not exchange money in Chennai before leaving or pay heavy bank ATM international markup charges. Carry crisp ₹500 Indian Rupee banknotes and convert them directly to LKR at the official bank desks in the CMB arrivals hall.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">2. Take the Direct Train from Negombo or Colombo</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Instead of hiring long-distance taxi transfers across the whole country, take the scenic 2nd class train from Colombo to Galle or Kandy (₹150 to ₹350 per ticket), then hire local tuk-tuks via PickMe.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">3. Fly During Shoulder Months (Sept, Oct, May)</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Round-trip flight fares on IndiGo drop to ₹10,500 and 4-star boutique beach hotels offer discounts of up to 40% compared to December and January peak periods.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E4D9] space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">4. Skip Sigiriya Lion Rock for Pidurangala</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Climbing Sigiriya Lion Rock costs $36 USD (approx. ₹3,000) per foreign adult. The adjacent monastery peak <strong>Pidurangala Rock</strong> costs only $3 USD (₹250) and gives you a panoramic, unobstructed view of Sigiriya at sunrise!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 12: BEST TIME TO VISIT FROM CHENNAI */}
        <section aria-labelledby="weather-heading" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Seasonality & Weather</span>
              <h2 id="weather-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Best Time to Visit Sri Lanka From Chennai
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            Sri Lanka operates on a unique <strong>dual-monsoon microclimate</strong>. When it rains on one side of the island, the other side enjoys dry, blue skies. Because Chennai is so close, you can visit year-round by picking the correct coast:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#1F3D2B]">December to April (South & West Coasts)</h3>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Prime Winter Break</span>
              </div>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Ideal for Pongal holidays and winter vacations. Experience calm, azure waters at Galle, Bentota, Mirissa (blue whale watching), and crisp mountain air in Nuwara Eliya.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#1F3D2B]">May to September (East Coast & Cultural Triangle)</h3>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Summer School Holidays</span>
              </div>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Perfect for escaping Chennai's summer heat. Trincomalee, Nilaveli, Pasikudah, Sigiriya, and Minneriya elephant gatherings experience dry, sunny weather.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#7A7365]">
            Learn more in our detailed <Link to="/best-time-to-visit-sri-lanka" className="text-[#1F3D2B] font-bold underline hover:text-[#B38728]">Best Time to Visit Sri Lanka Guide</Link>.
          </p>
        </section>

        {/* SECTION 13: 7-DAY ITINERARY BLUEPRINT */}
        <section aria-labelledby="itinerary-heading" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Optimized Route Blueprint</span>
              <h2 id="itinerary-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Optimized 7-Day Sri Lanka Itinerary From Chennai
              </h2>
            </div>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed">
            Taking the 80-minute morning flight out of Chennai allows you to be in Sri Lanka before lunchtime. Here is the field-tested 7-day loop that minimizes travel fatigue:
          </p>

          <div className="space-y-3">
            {[
              {
                day: "Day 1",
                title: "Chennai (MAA) → Colombo (CMB) → Negombo / Sigiriya",
                desc: "Board morning flight, land at CMB in 80 mins. Meet your private chauffeur, transfer to Sigiriya jungle resort. Relax by the pool with King Coconut drinks."
              },
              {
                day: "Day 2",
                title: "Sigiriya Lion Rock Citadel & Dambulla Golden Cave Temple",
                desc: "Early morning ascent of Sigiriya Lion Rock Fortress. Afternoon visit to UNESCO Dambulla Cave Temples, drive to the royal hill capital of Kandy."
              },
              {
                day: "Day 3",
                title: "Sacred Temple of the Tooth Relic & Peradeniya Botanic Gardens",
                desc: "Attend morning cultural pujah ceremony at Tooth Temple. Stroll the royal palm avenues at Peradeniya, taste authentic Ceylon spiced curries."
              },
              {
                day: "Day 4",
                title: "Scenic Highland Blue Train Ride to Ella & Tea Plantations",
                desc: "Board the world-renowned colonial train winding through misty waterfalls and emerald tea valleys. Arrive in relaxed Ella mountain town."
              },
              {
                day: "Day 5",
                title: "Nine Arch Bridge, Little Adam's Peak & Southern Coast",
                desc: "Sunrise photography at Nine Arch stone viaduct, hike Little Adam's Peak, descend through Ravana Falls down to the southern beaches of Mirissa/Weligama."
              },
              {
                day: "Day 6",
                title: "UNESCO Galle Dutch Fort Colonial Bastions & Sunset Ramparts",
                desc: "Wander cobblestone lanes, Dutch colonial villas, boutique tea shops, and watch cliff-jumpers from Flag Rock during golden sunset."
              },
              {
                day: "Day 7",
                title: "Colombo Souvenir Shopping & Evening Flight back to Chennai",
                desc: "Southern Expressway to Colombo. Pick up Ceylon tea & handlooms at Barefoot, quick lunch at Dutch Hospital, 20-min highway transfer to CMB for your 80-min return flight."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#E8E4D9] flex flex-col sm:flex-row gap-3 items-start">
                <span className="px-2.5 py-1 rounded bg-[#1F3D2B] text-white font-mono text-xs font-bold shrink-0">
                  {item.day}
                </span>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F3D2B]">{item.title}</h3>
                  <p className="text-xs text-[#5A5448] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ⭐ DEDICATED 13-DAY TUK-TUK ITINERARY & DIRECT WHATSAPP BOOKING SECTION ⭐ */}
        {/* ========================================================================= */}
        <section aria-labelledby="tuktuk-section-heading" className="bg-gradient-to-br from-[#1F3D2B] to-[#142A1D] text-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-[#3E6B4F] relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C523B] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2C523B] flex items-center justify-center text-3xl shadow-inner shrink-0">
                🛺
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase bg-[#2C523B] text-[#F2C94C] px-3 py-0.5 rounded-full font-bold border border-[#3E6B4F]">
                  Self-Drive Adventure & Rental Booking
                </span>
                <h2 id="tuktuk-section-heading" className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  13-Day Sri Lanka Tuk-Tuk Itinerary & WhatsApp Booking
                </h2>
              </div>
            </div>

            <Link
              to="/sri-lanka-13-day-tuk-tuk-itinerary"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F2C94C] text-xs font-mono font-bold transition-colors border border-white/20 shrink-0"
            >
              <span>View Full 13-Day Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-[#E0DDD5] leading-relaxed max-w-3xl">
            Looking for the ultimate freedom? Instead of a standard car tour, drive your own Tuk-Tuk across <strong>1,100 km of Sri Lanka's most breathtaking landscapes</strong>—from Sigiriya's ancient jungle rocks and Nuwara Eliya's misty tea plantations to Ella's Nine Arch Bridge and Hiriketiya's turquoise surf bays.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#F2C94C] font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>AAC Driving Permit</span>
              </div>
              <p className="text-[11px] text-[#C5DAC9]">We endorse your Indian/home license legally before you land.</p>
            </div>

            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#F2C94C] font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>1-on-1 Driving Lesson</span>
              </div>
              <p className="text-[11px] text-[#C5DAC9]">Learn throttle, clutch, reverse & road safety with a pro instructor.</p>
            </div>

            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#F2C94C] font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Full Comprehensive Insurance</span>
              </div>
              <p className="text-[11px] text-[#C5DAC9]">$0 excess deductible covers vehicle, third-party & passenger liability.</p>
            </div>

            <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-[#F2C94C] font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>24/7 WhatsApp SOS</span>
              </div>
              <p className="text-[11px] text-[#C5DAC9]">Islandwide mechanic dispatch network in every single town.</p>
            </div>
          </div>

          {/* Quick Route Summary */}
          <div className="bg-[#142A1D] p-4 sm:p-5 rounded-2xl border border-[#2C523B] space-y-2 text-xs">
            <strong className="text-[#F2C94C] font-mono uppercase text-[11px] block">
              13-Day Island Loop Route:
            </strong>
            <p className="text-[#C5DAC9] leading-relaxed">
              <strong>Negombo</strong> (Driving Lesson) → <strong>Sigiriya</strong> (Lion Rock & Pidurangala) → <strong>Kandy</strong> (Tooth Temple & Spices) → <strong>Nuwara Eliya</strong> (Tea Trails) → <strong>Ella</strong> (Nine Arch & Waterfalls) → <strong>Udawalawe</strong> (Elephant Safari) → <strong>Hiriketiya & Weligama</strong> (Surf & Whale Watching) → <strong>Galle Dutch Fort</strong> → <strong>Bentota & Colombo</strong> → Airport Handover.
            </p>
          </div>

          {/* Direct WhatsApp Booking Callout Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/10 p-5 rounded-2xl border border-white/15">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Self-Drive from $17 USD / Day (~₹1,450 INR)</span>
                <span className="bg-[#25D366] text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">Instant Confirmation</span>
              </div>
              <p className="text-xs text-[#C5DAC9] mt-0.5">
                Message us on WhatsApp to check vehicle availability, lock in your travel dates, and start your AAC license paperwork.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href="https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20I%20am%20planning%20the%2013-Day%20Sri%20Lanka%20Tuk-Tuk%20Itinerary%20and%20would%20like%20to%20book%20a%20self-drive%20Tuk-Tuk%20rental%20with%20AAC%20driving%20permit%20endorsement.%20Please%20share%20availability%20and%20rates!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("tuktuk_whatsapp_click", "conversion", "chennai_pillar_page_tuktuk_cta")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Book Tuk-Tuk on WhatsApp</span>
              </a>

              <Link
                to="/sri-lanka-13-day-tuk-tuk-itinerary"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white text-[#1F3D2B] hover:bg-[#F2C94C] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md text-center"
              >
                <span>Full Itinerary Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 14: INTERACTIVE COST CALCULATOR */}
        <section aria-labelledby="calculator-heading" className="bg-[#1F3D2B] text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-[#F2C94C] uppercase tracking-widest font-bold">
              Interactive Tool
            </span>
            <h2 id="calculator-heading" className="text-2xl sm:text-3xl font-serif font-bold">
              Sri Lanka Trip Cost Calculator (Chennai Departure)
            </h2>
            <p className="text-xs sm:text-sm text-[#E0DDD5]">
              Adjust your duration, travelers, and comfort tier to get an instant, realistic budget estimate in Indian Rupees (₹).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-4 bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
              {/* Duration Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#E0DDD5]">Trip Duration:</span>
                  <span className="font-mono font-bold text-[#F2C94C]">{calcDuration} Days</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={14}
                  value={calcDuration}
                  onChange={(e) => setCalcDuration(Number(e.target.value))}
                  className="w-full accent-[#F2C94C] cursor-pointer"
                />
              </div>

              {/* Travelers Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#E0DDD5]">Number of Travelers:</span>
                  <span className="font-mono font-bold text-[#F2C94C]">{calcTravelers} Person(s)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={calcTravelers}
                  onChange={(e) => setCalcTravelers(Number(e.target.value))}
                  className="w-full accent-[#F2C94C] cursor-pointer"
                />
              </div>

              {/* Travel Style Selector */}
              <div className="space-y-1.5">
                <span className="font-semibold text-xs text-[#E0DDD5] block">Travel Style & Hotel Tier:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["budget", "midrange", "luxury"] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setCalcTier(tier)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                        calcTier === tier
                          ? "bg-[#F2C94C] text-[#1F3D2B] border-[#F2C94C] shadow"
                          : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded-lg border border-white/10">
                  <input
                    type="checkbox"
                    checked={calcPrivateDriver}
                    onChange={(e) => setCalcPrivateDriver(e.target.checked)}
                    className="accent-[#F2C94C] w-4 h-4 rounded"
                  />
                  <span>Private Chauffeur Car</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded-lg border border-white/10">
                  <input
                    type="checkbox"
                    checked={calcIncludeSafaris}
                    onChange={(e) => setCalcIncludeSafaris(e.target.checked)}
                    className="accent-[#F2C94C] w-4 h-4 rounded"
                  />
                  <span>Include Wildlife Safari</span>
                </label>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-5 bg-white text-[#1A1A1A] p-6 rounded-2xl shadow-xl space-y-4">
              <div className="text-center border-b border-[#E8E4D9] pb-3">
                <span className="text-xs font-mono text-[#7A7365] uppercase">Estimated Budget</span>
                <div className="text-3xl font-serif font-bold text-[#1F3D2B] mt-1">
                  ₹{currentCalc.totalPerPerson.toLocaleString("en-IN")}
                </div>
                <span className="text-xs text-[#5A5448]">per person (₹{currentCalc.totalGroup.toLocaleString("en-IN")} total for {calcTravelers})</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#4A453A]">
                <div className="flex justify-between">
                  <span>Flights (MAA ↔ CMB):</span>
                  <span className="font-mono font-semibold">₹{currentCalc.flights.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hotels ({calcDuration - 1} nights):</span>
                  <span className="font-mono font-semibold">₹{currentCalc.hotels.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Food & Meals ({calcDuration} days):</span>
                  <span className="font-mono font-semibold">₹{currentCalc.food.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport ({calcPrivateDriver ? "Private Car" : "Public/Trains"}):</span>
                  <span className="font-mono font-semibold">₹{currentCalc.transport.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Activities & Tickets:</span>
                  <span className="font-mono font-semibold">₹{currentCalc.activities.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsFunnelOpen(true);
                    trackEvent("funnel_open_calc", "conversion", "chennai_cost_calculator");
                  }}
                  className="cta-pulse-glow btn-shine inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#1F3D2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#142A1D] transition-all cursor-pointer border border-[#D4AF37]/50"
                >
                  <Sparkles className="w-4 h-4 text-[#F2C94C] animate-spin" style={{ animationDuration: "6s" }} />
                  <span>Create My Own Route (Free) 🚀</span>
                  <ArrowRight className="w-4 h-4 text-[#F2C94C]" />
                </button>

                <a
                  href={`https://wa.me/94722968210?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", "conversion", "chennai_cost_calculator")}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow-md text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Get Itinerary Quote on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 15: TRAVEL REQUIREMENTS FOR INDIAN TRAVELERS */}
        <section aria-labelledby="visa-heading" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Immigration & Entry</span>
              <h2 id="visa-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Sri Lanka Travel Requirements for Indian Citizens (2026)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">1. Tourist Electronic Travel Authorization (ETA)</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Indian passport holders must apply online for a 30-day Tourist ETA via the official government portal before departure. Sri Lanka frequently extends fee waivers (making it <strong>₹0</strong>). When standard processing applies, it costs $20 USD (~₹1,650).
              </p>
              <Link to="/sri-lanka-visa-for-indians" className="text-[#1F3D2B] font-bold underline inline-block text-xs">
                Read Complete Visa ETA Guide →
              </Link>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E4D9] space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">2. Passport Validity & Digital Arrival Card</h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Your Indian passport must have at least <strong>6 months of validity</strong> from your arrival date. You can fill out the online Sri Lanka Immigration Arrival Card within 3 days before boarding at Chennai airport.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 16: METHODOLOGY & EDITORIAL TRANSPARENCY */}
        <section aria-labelledby="methodology-heading" className="bg-[#FAF8F3] p-6 rounded-2xl border border-[#E8E4D9] space-y-3">
          <h2 id="methodology-heading" className="font-serif font-bold text-lg text-[#1F3D2B]">
            How We Calculate Sri Lanka Trip Costs
          </h2>
          <p className="text-xs text-[#5A5448] leading-relaxed">
            All price estimates on Plan Sri Lanka are compiled from verified ground rates, active airline pricing directories (IndiGo, SriLankan Airlines, Alliance Air), real-time hotel supplier datasets, and licensed local tourist chauffeur unions in Sri Lanka.
          </p>
          <p className="text-xs text-[#7A7365] leading-relaxed">
            <em>Disclaimer: Airfares and hotel room rates are subject to dynamic seasonal fluctuations, currency rate changes (INR/LKR/USD), and availability during holiday periods. These calculations provide realistic benchmarks for trip planning.</em>
          </p>
        </section>

        {/* SECTION 17: FAQ ACCORDION */}
        <section aria-labelledby="faq-heading" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-[#7A7365] uppercase tracking-widest">Clear Answers</span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Frequently Asked Questions (Chennai Route)
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How much does a Sri Lanka trip from Chennai cost?",
                a: "A standard 5-day budget trip starts from ₹25,000 to ₹35,000 per person. A comfortable 5-day mid-range vacation with boutique hotels and a private chauffeur averages ₹45,000 to ₹62,000 per person. A 7-day comprehensive island tour typically costs ₹58,000 to ₹78,000 per person."
              },
              {
                q: "Are flights cheaper to Sri Lanka from Chennai than Bangalore or Mumbai?",
                a: "Yes! Chennai offers the cheapest flight tickets to Sri Lanka across all Indian departure hubs. Round-trip flights from Chennai (MAA) regularly cost ₹10,500 to ₹13,500, compared to ₹13,000–₹17,000 from Bangalore and ₹16,000–₹22,000 from Mumbai or Delhi."
              },
              {
                q: "How long is the direct flight from Chennai to Colombo?",
                a: "The flight takes exactly 1 hour and 20 minutes (80 minutes). It is faster to fly from Chennai to Colombo than it is to drive from Chennai to Pondicherry or fly to Delhi."
              },
              {
                q: "Is 5 days enough time to visit Sri Lanka from Chennai?",
                a: "Yes, 5 days is perfect for a targeted trip focusing on the Southern Coast (Bentota, Galle Fort, Mirissa) or the Cultural Triangle (Sigiriya and Kandy). For the full highland tea country loop with Ella and wildlife safaris, a 7-day itinerary is ideal."
              },
              {
                q: "Can I use Indian Rupees (INR) or Indian Credit Cards in Sri Lanka?",
                a: "Most boutique hotels, supermarkets, and upscale restaurants accept international Visa and Mastercard with nominal forex markup. For cash spending (tuk-tuks, street food, tipping), bring ₹15,000 to ₹20,000 in physical ₹500 INR notes to exchange for Sri Lankan Rupees (LKR) at Colombo Airport."
              },
              {
                q: "Is Sri Lanka cheaper than the Maldives for Chennai travelers?",
                a: "Significantly cheaper. A 4-night budget Maldives package typically starts at ₹1,20,000+ per couple due to expensive speedboat or seaplane transfers and high resort taxes. In contrast, a 7-day private boutique tour in Sri Lanka with dedicated chauffeur transport costs around ₹1,15,000 total per couple, flights included."
              },
              {
                q: "Can I fly directly from Chennai to Jaffna?",
                a: "Yes, Alliance Air operates direct scheduled flights from Chennai (MAA) to Jaffna International Airport (JAF) in northern Sri Lanka, taking roughly 60 minutes. This is ideal for exploring Northern Tamil culture and ancient Hindu temples."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E8E4D9] overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-serif font-bold text-[#1F3D2B] text-sm sm:text-base flex justify-between items-center gap-4 hover:text-[#B38728] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1F3D2B] transition-transform duration-300 shrink-0 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#5A5448] font-sans leading-relaxed border-t border-[#F0ECE1] pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 18: RELATED HUB & INTERNAL LINKING */}
        <section aria-labelledby="resources-heading" className="pt-6 border-t border-[#E8E4D9]">
          <h2 id="resources-heading" className="text-xs font-mono uppercase tracking-[0.2em] text-[#7A7365] font-bold mb-4 text-center">
            Explore Related Sri Lanka Travel Guides & Activities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <Link
              to="/things-to-do-in-sri-lanka"
              className="p-3.5 bg-[#FAF8F3] rounded-xl border border-[#1F3D2B]/30 hover:border-[#1F3D2B] transition-all text-xs font-bold text-[#1F3D2B] flex items-center justify-between group shadow-sm"
            >
              <span>45+ Things to Do Directory</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B38728] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/sri-lanka-5-day-itinerary-from-chennai"
              className="p-3.5 bg-white rounded-xl border border-[#E8E4D9] hover:border-[#1F3D2B] transition-all text-xs font-bold text-[#1F3D2B] flex items-center justify-between group"
            >
              <span>5-Day Chennai Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B38728] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/sri-lanka-trip-cost-from-india"
              className="p-3.5 bg-white rounded-xl border border-[#E8E4D9] hover:border-[#1F3D2B] transition-all text-xs font-bold text-[#1F3D2B] flex items-center justify-between group"
            >
              <span>All India Trip Cost Guide</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B38728] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/sri-lanka-trip-cost-from-bangalore"
              className="p-3.5 bg-white rounded-xl border border-[#E8E4D9] hover:border-[#1F3D2B] transition-all text-xs font-bold text-[#1F3D2B] flex items-center justify-between group"
            >
              <span>Bangalore Trip Cost Guide</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B38728] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/sri-lanka-7-day-itinerary"
              className="p-3.5 bg-white rounded-xl border border-[#E8E4D9] hover:border-[#1F3D2B] transition-all text-xs font-bold text-[#1F3D2B] flex items-center justify-between group"
            >
              <span>7-Day Master Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B38728] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </main>

      {/* Interactive 3-Step Micro-SaaS Route Funnel Modal */}
      <InteractiveRouteFunnelModal
        isOpen={isFunnelOpen}
        onClose={() => setIsFunnelOpen(false)}
      />
    </div>
  );
}
