import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  MapPin, 
  Check, 
  HelpCircle, 
  Plane, 
  Award, 
  Clock, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  Info,
  Layers,
  Coffee,
  Smartphone,
  Navigation,
  Map,
  Sparkles,
  TrendingUp,
  Heart,
  Users,
  UtensilsCrossed,
  ShieldAlert,
  Moon,
  DollarSign
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaMumbaiCostPillarPage() {
  usePageMetadata({
    title: "Sri Lanka Trip Cost From Mumbai (2026 Guide) | Flights & Budgets",
    description: "Calculate your complete Sri Lanka trip cost from Mumbai. Discover direct flights from Chhatrapati Shivaji Airport, average budgets, hotel prices, and romantic honeymoon getaways.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-mumbai",
    ogUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-mumbai"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<"5days" | "7days" | "10days">("7days");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `mumbai_faq_${index}`);
  };

  const handleCtaClick = (buttonId: string) => {
    trackEvent("planner_pillar_cta_click", "conversion", buttonId);
    navigate("/sri-lanka-trip-planner");
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", "conversion", "mumbai_pillar");
    window.open("https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20I'm%20planning%20a%20trip%20from%20Mumbai%20and%20would%20love%2520a%2520free%2520custom%2520budget%2520estimate%2520and%2520itinerary.", "_blank");
  };

  // Realistic estimates for Mumbai travelers (in INR)
  const budgetEstimates = {
    "5days": {
      budget: 32000,
      comfort: 54000,
      luxury: 98000
    },
    "7days": {
      budget: 45000,
      comfort: 72000,
      luxury: 145000
    },
    "10days": {
      budget: 62000,
      comfort: 98000,
      luxury: 210000
    }
  };

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white pb-20">
      {/* Rich Schema Formats for SEO Alignment */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Trip Cost From Mumbai (2026): Flights, Hotels & Budget Guide",
            "description": "Calculate your total budget, compare BOM-CMB flight costs, understand visa requirements, and plan the perfect Sri Lanka itinerary from Mumbai with our 2026 guide.",
            "image": [
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "datePublished": "2026-07-01T08:00:00+05:30",
            "dateModified": "2026-07-01T08:00:00+05:30",
            "author": {
              "@type": "Person",
              "name": "Adithya Oshada",
              "jobTitle": "Lead Ceylon Travel Stylist"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka Concierge",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/favicon.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/sri-lanka-trip-cost-from-mumbai"
            }
          })}
        </script>

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
                "name": "Trip Costs",
                "item": "https://plan-srilanka.com/sri-lanka-trip-cost-from-india"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Mumbai",
                "item": "https://plan-srilanka.com/sri-lanka-trip-cost-from-mumbai"
              }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Sri Lanka",
            "description": "Calculated travel costs, direct flights, ancient cultural heritage, raw wildlife, and stunning tea estate highlands from Mumbai (BOM) gateway.",
            "about": {
              "@type": "Place",
              "name": "Sri Lanka"
            },
            "touristType": "Sightseeing, Beaches, Wildlife, Culture, Wellness"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does a Sri Lanka trip cost from Mumbai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A standard 7-day Sri Lanka trip from Mumbai typically costs between ₹45,000 and ₹95,000 per person depending on flights, hotel choices, private car rentals, and your preferred travel style."
                }
              },
              {
                "@type": "Question",
                "name": "Are there direct flights from Mumbai to Colombo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, SriLankan Airlines operates daily direct flights from Chhatrapati Shivaji Maharaj International Airport (BOM) to Bandaranaike International Airport (CMB) in Colombo. The flight duration is roughly 2 hours and 45 minutes."
                }
              },
              {
                "@type": "Question",
                "name": "What is the best airline to fly from Mumbai to Sri Lanka?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SriLankan Airlines is the premium option offering direct flights with comfortable meal services. IndiGo, Air India, and Vistara offer highly competitive rates, often with brief layovers in Chennai or Bangalore."
                }
              },
              {
                "@type": "Question",
                "name": "Do Indian passport holders need a visa for Sri Lanka?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Indian passport holders require a Tourist Electronic Travel Authorization (ETA). Standard ETA fees are $20 USD (~₹1,650), but are frequently waived to ₹0 during active tourism promotion campaigns in 2026."
                }
              },
              {
                "@type": "Question",
                "name": "Which coast is best in Sri Lanka during summer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The East Coast (Trincomalee, Nilaveli, and Pasikudah Bay) experiences sunny blue skies, flat calm seas, and zero monsoon rain in August, making it the premier beach destination for couples during this month."
                }
              }
            ]
          })}
        </script>
      </>

      {/* Styled Top Hero */}
      <div className="bg-luxury-green relative overflow-hidden py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.22] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green/90" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            2026 Mumbai Edition
          </div>
          
          <h1 id="mumbai-hero-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            Sri Lanka Trip Cost From Mumbai <br/>
            <span className="text-luxury-gold font-normal italic">(2026 Master Guide)</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-3xl mx-auto font-light leading-relaxed">
            Settle budgets, direct flight routes from Chhatrapati Shivaji Airport (BOM), hotel recommendations, visa fee waivers, and secret beaches. Plan your perfect escape to paradise!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center text-xs text-luxury-cream/70 font-mono">
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              10 Min Deep Read
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              Expert Travel Curation
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
              Updated July 2026
            </span>
          </div>

          <div className="mt-10">
            <button
              id="mumbai-hero-cta"
              onClick={() => handleCtaClick("hero_mumbai_cta")}
              className="px-8 py-4 bg-luxury-gold hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2 group"
            >
              Calculate My Trip Cost <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Quick Answer Featured Snippet Box */}
        <section id="mumbai-snippet-box" className="bg-white border-2 border-luxury-gold/30 rounded-3xl p-6 sm:p-8 shadow-md mb-12 scroll-mt-24">
          <div className="bg-[#fdfaf2] -m-6 sm:-m-8 p-5 sm:p-6 rounded-t-[22px] border-b border-luxury-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-luxury-gold text-white text-[10px] font-mono tracking-wider uppercase font-bold rounded-md">Quick Answer</span>
              <div className="flex items-center text-xs text-luxury-gold gap-0.5">
                {"★".repeat(5)}
              </div>
            </div>
            <span className="text-xs font-mono text-luxury-black/40 hidden sm:inline">Chhatrapati Shivaji (BOM) → Colombo (CMB)</span>
          </div>
          
          <div className="mt-8">
            <p className="text-lg sm:text-xl text-luxury-green font-serif font-bold leading-relaxed mb-4">
              A 7-day Sri Lanka trip from Mumbai typically costs between ₹45,000 and ₹95,000 per person, depending on flights, accommodation and travel style.
            </p>
            <p className="text-sm sm:text-base text-luxury-black/75 leading-relaxed mb-6 font-light">
              This comprehensive budget takes into account direct flight routes from CSMIA (BOM), tourist visa costs, comfortable private transport (AC sedan with driver), typical meals, and premium heritage tours across Sigiriya, Kandy, Ella, and Galle Fort.
            </p>

            {/* Quick Answer Duration Switcher */}
            <div className="bg-[#fcfbf7] border border-luxury-gold/20 rounded-2xl p-4 sm:p-6 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <span className="text-xs font-mono font-bold uppercase text-luxury-green">Select Duration:</span>
                <div className="flex gap-2 bg-white p-1 rounded-full border border-luxury-gold/15 shadow-sm">
                  {(["5days", "7days", "10days"] as const).map((dur) => (
                    <button
                      key={dur}
                      onClick={() => {
                        setSelectedDuration(dur);
                        trackEvent("mumbai_duration_select", "interaction", dur);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                        selectedDuration === dur
                          ? "bg-luxury-gold text-black shadow-md"
                          : "text-luxury-black/60 hover:text-luxury-black hover:bg-luxury-cream/10"
                      }`}
                    >
                      {dur === "5days" ? "5 Days" : dur === "7days" ? "7 Days" : "10 Days"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-luxury-gold/10 text-center">
                  <span className="text-[10px] uppercase font-mono text-luxury-black/40 font-bold block mb-1">Budget Backpacker</span>
                  <span className="text-xl font-mono font-bold text-luxury-black">
                    ₹{budgetEstimates[selectedDuration].budget.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-luxury-black/40 block mt-1">Hostels, trains, local food</span>
                </div>
                <div className="p-4 rounded-xl bg-luxury-cream/15 border border-luxury-gold/30 text-center ring-2 ring-luxury-gold/10">
                  <span className="text-[10px] uppercase font-mono text-luxury-gold font-bold block mb-1">Comfort Traveler</span>
                  <span className="text-xl font-mono font-bold text-luxury-green">
                    ₹{budgetEstimates[selectedDuration].comfort.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-luxury-green/80 block mt-1">3★/4★ Hotels, AC Sedan, Safaris</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-luxury-gold/10 text-center">
                  <span className="text-[10px] uppercase font-mono text-luxury-black/40 font-bold block mb-1">Luxury Escape</span>
                  <span className="text-xl font-mono font-bold text-luxury-black">
                    ₹{budgetEstimates[selectedDuration].luxury.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-luxury-black/40 block mt-1">5★ Resorts, Private SUV, Guides</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                id="snippet-calculate-cta"
                onClick={() => handleCtaClick("mumbai_snippet_calculate")}
                className="px-6 py-3.5 bg-luxury-gold hover:bg-luxury-green hover:text-white text-black font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                Calculate My Trip Cost <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                id="snippet-wa-cta"
                onClick={handleWhatsAppClick}
                className="px-6 py-3.5 border border-emerald-500/30 text-emerald-700 hover:bg-emerald-50/50 font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all inline-flex items-center justify-center gap-2"
              >
                Get Free Estimate on WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Route Indicator */}
        <div className="p-4 mb-12 bg-white rounded-2xl border border-luxury-gold/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-luxury-cream/20 flex items-center justify-center text-luxury-green font-bold">
              BOM
            </div>
            <div className="h-0.5 w-12 border-t-2 border-dashed border-luxury-gold" />
            <div className="w-10 h-10 rounded-full bg-luxury-cream/20 flex items-center justify-center text-luxury-green font-bold">
              CMB
            </div>
            <div className="ml-2 text-left">
              <h4 className="text-xs font-mono font-bold text-luxury-green uppercase tracking-wide">Direct Gateway Route</h4>
              <p className="text-[11px] text-luxury-black/55">2h 45m Direct Flight • Chhatrapati Shivaji (BOM) → Colombo (CMB)</p>
            </div>
          </div>
          <Link 
            to="/sri-lanka-trip-planner"
            className="text-xs font-mono font-bold text-[#d4af37] hover:text-luxury-green transition-colors flex items-center gap-1 underline"
          >
            Custom Cost Calculator <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Expense Category Table Section */}
        <section id="cost-breakdown" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Detailed 7-Day Expense Breakdown (INR per person)
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light">
            How do we map these costs? This itemized budget table breaks down realistic expenses for a single traveler (assumed as part of a couple traveling together to split car & room rental rates).
          </p>

          <div className="overflow-x-auto border border-luxury-gold/15 rounded-2xl shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fdfaf2] border-b border-luxury-gold/15">
                  <th className="p-4 text-xs font-mono uppercase tracking-wider font-bold text-luxury-green">Expense Category</th>
                  <th className="p-4 text-xs font-mono uppercase tracking-wider font-bold text-luxury-black">Budget Tier</th>
                  <th className="p-4 text-xs font-mono uppercase tracking-wider font-bold text-[#d4af37]">Comfort Tier</th>
                  <th className="p-4 text-xs font-mono uppercase tracking-wider font-bold text-luxury-green">Luxury Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-gold/5 text-sm">
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Plane className="w-4 h-4 text-luxury-gold shrink-0" />
                    Flights (Round-Trip)
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹14,000 - ₹16,000</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹15,500 - ₹18,000</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹22,000 - ₹35,000+</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Moon className="w-4 h-4 text-luxury-gold shrink-0" />
                    Hotels & Stays (6 Nights)
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹7,000 (Hostels/Homestays)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹18,000 (3-4★ Boutique)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹48,000 (5★ Heritage & Villas)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-luxury-gold shrink-0" />
                    Food & Dining (Daily)
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹5,000 (Local rice & curry)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹12,000 (Cafes & Beach Clubs)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹25,000 (Fine dining, High-Tea)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-luxury-gold shrink-0" />
                    Transport & Driver
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹6,000 (Public trains & PickMe)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹16,000 (Private Sedan with Driver)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹32,000 (Private SUV & Airport VIP)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Compass className="w-4 h-4 text-luxury-gold shrink-0" />
                    Activities & Safaris
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹5,000 (Temples, free peaks)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹12,500 (Sigiriya entry, Yala safari)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹28,000 (Hot Air Balloon, Whale Watch)</td>
                </tr>
                <tr className="bg-luxury-cream/10 font-bold border-t border-luxury-gold/20">
                  <td className="p-4 text-luxury-green uppercase font-mono text-xs">Total Budget Estimate</td>
                  <td className="p-4 font-mono text-luxury-black text-sm">₹37,000 - ₹45,000</td>
                  <td className="p-4 font-mono text-luxury-green text-sm">₹65,000 - ₹82,000</td>
                  <td className="p-4 font-mono text-luxury-green text-base">₹1,55,000 - ₹2,50,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-luxury-black/45 italic">
            <Info className="w-3.5 h-3.5" /> Note: Table totals represent estimates per person. Flight prices fluctuate seasonally; early booking is strongly recommended.
          </div>
        </section>

        {/* Flight Cost Breakdown - Mumbai specific */}
        <section id="flights-bom-cmb" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Mumbai to Colombo Flights: Costs & Routes
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light">
            Since Sri Lanka is an island, your flight to Colombo (BOM → CMB) constitutes the baseline of your budget. Chhatrapati Shivaji Maharaj International Airport (BOM) offers excellent premium connectivity to Sri Lanka.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-luxury-gold/10 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold font-bold">
                  ✈️
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-luxury-black">Direct Flight Options</h3>
                  <p className="text-xs text-luxury-black/55">The most convenient choice</p>
                </div>
              </div>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light mb-4">
                <strong>SriLankan Airlines</strong> is the primary carrier operating direct flights from Mumbai to Colombo. It's incredibly fast, taking just <strong>2 hours and 45 minutes</strong>. 
              </p>
              <ul className="text-xs space-y-2 text-luxury-black/80 font-mono">
                <li className="flex justify-between border-b border-luxury-gold/5 pb-1">
                  <span>Average Direct Fare:</span>
                  <span className="font-bold text-luxury-green">₹15,500 - ₹22,000</span>
                </li>
                <li className="flex justify-between border-b border-luxury-gold/5 pb-1">
                  <span>Frequency:</span>
                  <span className="text-luxury-black/60">Daily flights available</span>
                </li>
                <li className="flex justify-between">
                  <span>Comfort Score:</span>
                  <span className="text-luxury-gold font-bold">⭐⭐⭐⭐⭐</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-gold/10 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-luxury-green/10 flex items-center justify-center text-luxury-green font-bold">
                  🔄
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-luxury-black">Connecting Flights</h3>
                  <p className="text-xs text-luxury-black/55">Best for budget optimization</p>
                </div>
              </div>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light mb-4">
                Airlines like <strong>IndiGo</strong>, <strong>Air India</strong>, and <strong>Vistara</strong> operate flights from Mumbai with quick, convenient connections in Chennai (MAA) or Bangalore (BLR). Total transit time ranges between 4 to 6 hours.
              </p>
              <ul className="text-xs space-y-2 text-luxury-black/80 font-mono">
                <li className="flex justify-between border-b border-luxury-gold/5 pb-1">
                  <span>Average Connecting Fare:</span>
                  <span className="font-bold text-luxury-green">₹13,500 - ₹16,500</span>
                </li>
                <li className="flex justify-between border-b border-luxury-gold/5 pb-1">
                  <span>Best Hub Layovers:</span>
                  <span className="text-luxury-black/60">Chennai (MAA) / Bangalore (BLR)</span>
                </li>
                <li className="flex justify-between">
                  <span>Average Delay Risk:</span>
                  <span className="text-emerald-600 font-bold">Low</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-2xl text-xs flex gap-3 text-amber-800">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <div>
              <p className="font-bold mb-1">Mumbai Flight Price Hack</p>
              <p className="font-light leading-relaxed">
                If you are planning a trip during high season (December–April or August-September), flight prices from CSMIA (BOM) can spike past ₹24,000. Book your tickets exactly <strong>45 to 60 days in advance</strong> via flight aggregate searches to grab the baseline ₹13,500 tickets.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Duration Packages Section */}
        <section id="trip-packages" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            How Much Does a Trip Cost by Length?
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-8 font-light">
            Depending on how many days you can step away from your busy schedule in Mumbai, the budget changes considerably.
          </p>

          <div className="space-y-6">
            {/* 5-Day Cost Card */}
            <div className="bg-white border border-luxury-gold/15 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-luxury-cream/10 rounded-bl-full pointer-events-none group-hover:bg-luxury-gold/10 transition-colors" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-luxury-gold/10">
                <div>
                  <span className="px-2.5 py-1 bg-luxury-cream/25 text-luxury-green text-[10px] font-mono tracking-wider uppercase font-bold rounded-md block w-fit mb-2">Short Holiday</span>
                  <h3 className="text-xl font-bold font-serif text-luxury-black">The 5-Day Highlight Escape</h3>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-luxury-black/40 font-mono uppercase">Cost Per Couple</p>
                  <p className="text-2xl font-serif font-bold text-luxury-green">₹75,000 - ₹1,15,000</p>
                  <p className="text-[10px] text-luxury-black/50 font-mono">(Excluding international flights)</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-luxury-black/75 leading-relaxed font-light mb-4">
                Perfect for long weekend getaways or quick mental breaks from Mumbai's fast pace. This route focuses strictly on Colombo, a rapid transfer to the historic Galle Dutch Fort, and scenic coastal relaxations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-luxury-black/70">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Colombo (1 Night) + Galle Fort (2 Nights)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Hikkaduwa or Bentota beach sports</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Direct BOM-CMB flight convenience</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Private AC Sedan airport transfers</div>
              </div>
            </div>

            {/* 7-Day Cost Card */}
            <div className="bg-[#fdfaf2] border-2 border-luxury-gold rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all relative overflow-hidden group">
              <div className="absolute right-0 top-0 bg-luxury-gold text-black text-[9px] font-mono font-bold tracking-widest uppercase px-4 py-1.5 rounded-bl-xl">
                Most Popular
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-luxury-gold/10">
                <div>
                  <span className="px-2.5 py-1 bg-luxury-gold text-white text-[10px] font-mono tracking-wider uppercase font-bold rounded-md block w-fit mb-2">Ideal Loop</span>
                  <h3 className="text-xl font-bold font-serif text-luxury-black">The 7-Day Classic Island Loop</h3>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-luxury-black/40 font-mono uppercase">Cost Per Couple</p>
                  <p className="text-2xl font-serif font-bold text-luxury-green">₹1,10,000 - ₹1,65,000</p>
                  <p className="text-[10px] text-luxury-green/80 font-mono">(Highly Recommended comfort package)</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-luxury-black/75 leading-relaxed font-light mb-4">
                The absolute gold-standard itinerary for first-time visitors. It balances deep cultural exploration with highland scenic train loops, dramatic high-altitude mists, wildlife safaris, and beach relaxing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-luxury-black/70">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Sigiriya (2N) • Kandy (1N) • Ella (2N) • Galle (1N)</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Scenic Kandy to Ella blue train seats</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Jeep Safari in Yala or Minneriya</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Dedicated local AC sedan and driver guide</div>
              </div>
              <div className="mt-4 text-center">
                <Link 
                  to="/sri-lanka-7-day-itinerary"
                  className="text-xs font-mono font-bold text-luxury-green hover:text-luxury-gold transition-colors inline-flex items-center gap-1.5 underline"
                >
                  View Full 7-Day Route Guide <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Honeymoon Cost Card */}
            <div className="bg-white border border-luxury-gold/15 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-luxury-gold/10">
                <div>
                  <span className="px-2.5 py-1 bg-pink-50 text-pink-700 text-[10px] font-mono tracking-wider uppercase font-bold rounded-md block w-fit mb-2">Couples Special</span>
                  <h3 className="text-xl font-bold font-serif text-luxury-black">7-Day Luxury Honeymoon Getaway</h3>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-luxury-black/40 font-mono uppercase">Cost Per Couple</p>
                  <p className="text-2xl font-serif font-bold text-pink-700">₹1,95,000 - ₹3,10,000</p>
                  <p className="text-[10px] text-pink-700/70 font-mono">(Private pool villas, heritage luxury)</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-luxury-black/75 leading-relaxed font-light mb-4">
                Mumbai travelers frequently seek ultra-private boutique wellness resorts, colonial tea bungalows, and sunset beach villas. This honeymoon itinerary treats you to premium Ceylon-style pampering, candles, and stunning private plunge pools.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-luxury-black/70">
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pink-600 shrink-0" /> Sleep in Colonial Tea Estates & Pool Villas</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pink-600 shrink-0" /> Private couples wellness therapies & spas</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pink-600 shrink-0" /> Candle-lit seaside lobster dining experience</div>
                <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-pink-600 shrink-0" /> Premium SUV airport service with butler greeting</div>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Mumbai Section */}
        <section id="mumbai-exclusive" className="mb-16 bg-[#edf1ed]/40 rounded-3xl p-6 sm:p-8 border border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-luxury-green" />
            <h3 className="text-lg font-bold font-serif text-luxury-black">Local Insights for Mumbai Travelers</h3>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-luxury-black/80 font-light leading-relaxed">
            <p>
              <strong>1. Direct Flight Timing:</strong> SriLankan Airlines' direct BOM-CMB flight typically departs Chhatrapati Shivaji Airport (BOM) in the mid-afternoon and touches down at Colombo (CMB) by early evening. This is ideal, as it lets you bypass heavy Colombo evening traffic, transfer directly to beachside <strong>Negombo</strong> (20 mins away), and have a relaxed dinner on your very first night.
            </p>
            <p>
              <strong>2. High Travel Seasons:</strong> Many Mumbai travelers love escaping during the heavy southwest monsoons of June/July to seek sunshine elsewhere. In Sri Lanka, the <strong>East Coast (Trincomalee & Pasikudah)</strong> is completely dry, flat, and gorgeous during July-August—making it a perfect counter-monsoon beach vacation.
            </p>
            <p>
              <strong>3. Premium Luxury Resorts:</strong> For travelers seeking high-end stays similar to five-star properties in Alibaug or Udaipur but with gorgeous colonial charm, Sri Lanka offers some of the world's most spectacular architecture:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs font-mono text-luxury-green">
              <li><strong>Santani Wellness Kandy:</strong> Renowned world-class wellness hilltop retreat.</li>
              <li><strong>Ceylon Tea Trails:</strong> Ultra-luxury colonial bungalows overlooking misty lake waters.</li>
              <li><strong>Amanwella (Tangalle):</strong> Spectacular high-contrast modern cliffside luxury.</li>
            </ul>
          </div>
        </section>

        {/* Hidden Costs section */}
        <section id="hidden-costs" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Hidden Expenses to Account For (Avoid Surprises!)
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light">
            When calculating your final travel budget, don't just count flights and hotels. Make sure you set aside buffer money for these small but essential local expenses:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-white border border-luxury-gold/15">
              <div className="flex items-center gap-2 text-luxury-green font-bold mb-2">
                <Smartphone className="w-4 h-4 text-luxury-gold" />
                <span>Tourist SIM Cards</span>
              </div>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Available right in the arrivals lobby of Colombo airport. Dialog or Mobitel offer high-speed tourist plans with 30GB to 50GB data for just <strong>$10 USD (~₹830)</strong>. Don't buy international roaming; local 4G is extremely fast and cheap.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-luxury-gold/15">
              <div className="flex items-center gap-2 text-luxury-green font-bold mb-2">
                <Award className="w-4 h-4 text-luxury-gold" />
                <span>Tourist Visa (ETA)</span>
              </div>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                You must apply online via the official ETA portal. It typically costs <strong>$20 USD (~₹1,650)</strong>, but is often heavily discounted or waived to <strong>₹0 (free visa processing)</strong> under 2026 tourism bilateral campaigns. Check before you fly!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-luxury-gold/15">
              <div className="flex items-center gap-2 text-luxury-green font-bold mb-2">
                <UtensilsCrossed className="w-4 h-4 text-luxury-gold" />
                <span>Tipping & Gratuities</span>
              </div>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Tipping is an integral part of the service culture in Sri Lanka. Factor in roughly <strong>₹300 - ₹500 per day</strong> for hotel bellboys and waiters, and <strong>₹800 - ₹1,200 per day</strong> for a dedicated private driver who drives safely.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-luxury-gold/15">
              <div className="flex items-center gap-2 text-luxury-green font-bold mb-2">
                <Coffee className="w-4 h-4 text-luxury-gold" />
                <span>Travel Insurance</span>
              </div>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Highly recommended for mountain driving and hiking. A comprehensive travel policy covering medical emergencies, delayed flights, and lost baggage starts from just <strong>₹600 - ₹1,200 per person</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Tips for Indian Travelers */}
        <section id="practical-tips" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Practical Tips for Mumbai Travelers
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light">
            Keep these quick, high-value packing and cultural rules in mind to make your journey perfectly smooth:
          </p>

          <div className="bg-white border border-luxury-gold/15 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-luxury-black/85 leading-relaxed font-light">
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-green font-mono font-bold flex items-center justify-center shrink-0">1</span>
              <p><strong>Bring mosquito repellent:</strong> Essential for wild safaris (like Yala or Udawalawe) and beautiful forest hikes in Ella. Carry a bottle with DEET in your checked-in baggage.</p>
            </div>
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-green font-mono font-bold flex items-center justify-center shrink-0">2</span>
              <p><strong>Wear modest clothing at temples:</strong> Both men and women must cover their shoulders and knees when visiting historic sites (like Temple of the Tooth in Kandy or Anuradhapura). Keep a light sarong or shawl in your daypack.</p>
            </div>
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-green font-mono font-bold flex items-center justify-center shrink-0">3</span>
              <p><strong>Choose easy slip-on shoes:</strong> You must remove footwear when entering temple compounds. Walking barefoot on sun-heated stone ruins can be very hot, so wear simple shoes that slip on and off easily, or keep a spare pair of thick socks.</p>
            </div>
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-luxury-gold/15 text-luxury-green font-mono font-bold flex items-center justify-center shrink-0">4</span>
              <p><strong>Spend at least one day in Colombo:</strong> Don't skip the capital city! Colombo is beautiful and clean, featuring stunning colonial cafes, local boutiques, beach views, and excellent high-quality dining that represents a perfect introduction to local culture.</p>
            </div>
          </div>
        </section>

        {/* Dynamic CTA Footer Section */}
        <section id="cta-footer" className="bg-luxury-green rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.15] opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-4xl font-serif text-[#fcfbf7] font-bold mb-4">
              Generate Your Mumbai → Sri Lanka Budget
            </h3>
            <p className="text-sm sm:text-base text-luxury-cream/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Why settle for generic tour package estimates? Use our intelligent, free, interactive Ceylon travel planner tool to calculate a highly customized budget based on your dates, flight selections, and accommodation styles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                id="footer-planner-cta"
                onClick={() => handleCtaClick("footer_mumbai_cta_planner")}
                className="px-8 py-4 bg-luxury-gold hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg"
              >
                Go to Trip Planner <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="footer-wa-cta"
                onClick={handleWhatsAppClick}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg"
              >
                Chat on WhatsApp
              </button>
            </div>

            {/* Internal Links for Quick Navigation */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-xs text-luxury-cream/60 font-mono">
              <Link to="/sri-lanka-trip-planner" className="hover:text-luxury-gold transition-colors underline">Trip Planner</Link>
              <span>•</span>
              <Link to="/sri-lanka-7-day-itinerary" className="hover:text-luxury-gold transition-colors underline">7 Day Itinerary</Link>
              <span>•</span>
              <Link to="/sri-lanka-visa-for-indians" className="hover:text-luxury-gold transition-colors underline">Sri Lanka Visa</Link>
              <span>•</span>
              <Link to="/best-time-to-visit-sri-lanka" className="hover:text-luxury-gold transition-colors underline">Best Time to Visit</Link>
            </div>
          </div>
        </section>

        {/* Custom FAQ Accordion */}
        <section id="faq-section" className="mt-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-6 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How much does a Sri Lanka trip cost from Mumbai?",
                a: "A comfortable 7-day mid-range couples trip typically costs between ₹65,000 and ₹82,000 per person (excluding international flights). Adding direct round-trip BOM-CMB flights usually adds ₹15,500 to ₹22,000, bringing the grand total for a wonderful comfort tour to about ₹85,000–₹1,05,000 per traveler."
              },
              {
                q: "Are flights from Mumbai to Colombo direct?",
                a: "Yes! SriLankan Airlines operates daily, highly convenient direct flights from CSMIA (BOM) to Colombo (CMB), taking roughly 2 hours and 45 minutes."
              },
              {
                q: "Is Sri Lanka a safe destination for families or couples from Mumbai?",
                a: "Absolutely. Sri Lanka has an incredibly warm, peaceful, and hospitable culture. English is widely spoken in hotels, restaurants, and historical ruins. Taxis and private AC cars driven by safe local chauffeurs make travel exceptionally secure and pleasant."
              },
              {
                q: "How many days are recommended for a first-time Sri Lanka visit?",
                a: "A 7-day trip is the gold standard for first-time visitors, as it allows you to cover a beautiful highlight loop including Negombo beach, Sigiriya ancient rock, Kandy, Ella scenic tea peaks, a wild safari in Yala, and the Galle Dutch Fort."
              }
            ].map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white border border-luxury-gold/15 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex justify-between items-center hover:bg-luxury-cream/10 transition-colors"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-luxury-black pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-luxury-gold shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 border-t border-luxury-gold/5 text-xs sm:text-sm text-luxury-black/75 leading-relaxed font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cross-City Departure Hubs & Guides Section */}
        <section className="py-12 border-t border-luxury-green/10 mt-12">
          <h3 className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-bold mb-6 text-center">
            Compare Flight Costs From Other Indian Departure Hubs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <Link 
              to="/sri-lanka-trip-cost-from-bangalore"
              className="p-5 rounded-2xl bg-white border border-luxury-green/10 hover:border-luxury-gold transition-all group flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-luxury-gold block mb-1">Bangalore Hub</span>
                <h4 className="font-serif font-bold text-luxury-green text-sm group-hover:text-luxury-gold transition-colors">Sri Lanka Trip Cost From Bangalore</h4>
                <p className="text-[11px] text-luxury-black/70 mt-1 font-light">Direct 85-min flights, 5-day budget calculator & flight schedules.</p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
              className="p-5 rounded-2xl bg-white border border-luxury-green/10 hover:border-luxury-gold transition-all group flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-luxury-gold block mb-1">Chennai Hub</span>
                <h4 className="font-serif font-bold text-luxury-green text-sm group-hover:text-luxury-gold transition-colors">Sri Lanka Trip Cost From Chennai</h4>
                <p className="text-[11px] text-luxury-black/70 mt-1 font-light">Shortest 75-min hop starting at ₹10,500 round-trip fare.</p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/sri-lanka-trip-cost-from-hyderabad"
              className="p-5 rounded-2xl bg-white border border-luxury-green/10 hover:border-luxury-gold transition-all group flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-luxury-gold block mb-1">Hyderabad Hub</span>
                <h4 className="font-serif font-bold text-luxury-green text-sm group-hover:text-luxury-gold transition-colors">Sri Lanka Trip Cost From Hyderabad</h4>
                <p className="text-[11px] text-luxury-black/70 mt-1 font-light">Connecting flight options, 7-day budget breakdown & packages.</p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <h3 className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-bold mb-6 text-center">
            Essential Sri Lanka Planning Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/sri-lanka-visa-for-indians"
              className="p-4 bg-white rounded-xl border border-luxury-green/10 hover:border-luxury-gold transition-all text-xs font-bold text-luxury-green flex items-center justify-between group shadow-sm"
            >
              <span>Sri Lanka ETA Visa For Indians</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/sri-lanka-7-day-itinerary"
              className="p-4 bg-white rounded-xl border border-luxury-green/10 hover:border-luxury-gold transition-all text-xs font-bold text-luxury-green flex items-center justify-between group shadow-sm"
            >
              <span>7-Day Master Sri Lanka Blueprint</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/how-to-plan-a-train-trip-in-sri-lanka"
              className="p-4 bg-white rounded-xl border border-luxury-green/10 hover:border-luxury-gold transition-all text-xs font-bold text-luxury-green flex items-center justify-between group shadow-sm"
            >
              <span>Kandy to Ella Train Tickets Guide</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/things-to-do-in-sri-lanka"
              className="p-4 bg-white rounded-xl border border-luxury-green/10 hover:border-luxury-gold transition-all text-xs font-bold text-luxury-green flex items-center justify-between group shadow-sm"
            >
              <span>Best Things to Do for First-Timers</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
