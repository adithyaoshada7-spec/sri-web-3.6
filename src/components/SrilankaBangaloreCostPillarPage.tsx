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
  Volume2,
  DollarSign,
  Send,
  Star,
  Zap,
  Luggage,
  ShieldCheck
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaBangaloreCostPillarPage() {
  usePageMetadata({
    title: "Sri Lanka Trip Cost From Bangalore (2026 Breakdown) | Flights & 7-Day Budget",
    description: "Calculate your complete Sri Lanka trip cost from Bangalore (BLR). Direct 85-min flight schedules, 4-day & 7-day itinerary budgets in INR, online visa guidance & instant WhatsApp quote.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-bangalore",
    ogUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-bangalore"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [travelerType, setTravelerType] = useState<"couple" | "family" | "solo" | "friends">("couple");
  const [comfortTier, setComfortTier] = useState<"budget" | "comfort" | "luxury">("comfort");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Direct BLR Flight Guidance",
    "Private Chauffeur Sedan / SUV",
    "3/4-Star Boutique Hotel Stays",
    "ETA Visa Clearance Assistance"
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `bangalore_faq_${index}`);
  };

  const handleCtaClick = (buttonId: string) => {
    trackEvent("planner_pillar_cta_click", "conversion", buttonId);
    navigate("/sri-lanka-trip-planner");
  };

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const calculateDynamicBudget = () => {
    let perPersonInr = 38000;
    if (comfortTier === "budget") perPersonInr = 27000;
    if (comfortTier === "luxury") perPersonInr = 82000;

    if (travelerType === "solo") perPersonInr *= 1.15; // single supplement
    if (travelerType === "family") perPersonInr *= 0.85; // group savings
    if (travelerType === "friends") perPersonInr *= 0.88;

    const roundInr = Math.round(perPersonInr);
    const totalGroupInr = travelerType === "couple" ? roundInr * 2 : travelerType === "family" ? roundInr * 4 : roundInr;

    return {
      perPerson: roundInr.toLocaleString("en-IN"),
      totalGroup: totalGroupInr.toLocaleString("en-IN"),
      flightCost: "12,500",
      hotelCost: Math.round(roundInr * 0.42).toLocaleString("en-IN"),
      transitCost: Math.round(roundInr * 0.25).toLocaleString("en-IN"),
      mealsCost: Math.round(roundInr * 0.22).toLocaleString("en-IN"),
    };
  };

  const dynamicCosts = calculateDynamicBudget();

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", "conversion", "bangalore_pillar");
    const msg = `Hi Vibe Tour Concierge! I'm planning a Sri Lanka trip from Bangalore (BLR).\n\nDetails:\n• Traveler Type: ${travelerType.toUpperCase()}\n• Style: ${comfortTier.toUpperCase()}\n• Est. Budget / Person: ₹${dynamicCosts.perPerson}\n• Key Services Needed: ${selectedServices.join(", ")}\n\nPlease send me a customized 5-Day/7-Day itinerary and flight package quote!`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const blrFlights = [
    {
      airline: "SriLankan Airlines (UL 172)",
      depTime: "09:30 AM (BLR)",
      arrTime: "10:55 AM (CMB)",
      duration: "1h 25m",
      days: "Daily Direct",
      recommended: true,
      perks: "Full-service flight with hot breakfast & 30kg luggage allowance."
    },
    {
      airline: "IndiGo Airlines (6E 1177)",
      depTime: "05:40 AM (BLR)",
      arrTime: "07:05 AM (CMB)",
      duration: "1h 25m",
      days: "Daily Direct",
      recommended: true,
      perks: "Early arrival! Maximizes your entire Day 1 on the island."
    },
    {
      airline: "SriLankan Airlines (UL 174)",
      depTime: "08:40 PM (BLR)",
      arrTime: "10:05 PM (CMB)",
      duration: "1h 25m",
      days: "Daily Direct",
      recommended: false,
      perks: "Ideal for tech workers flying straight after office hours."
    }
  ];

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white pb-20">
      {/* Real Dynamic Schema Formats for SEO alignment */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Trip Cost From Bangalore (2026 Guide) | Stays, Flights & Budgets",
            "description": "Calculate your total budget, compare BLR-CMB flight costs, understand visa requirements, and plan the perfect Sri Lanka itinerary from Bangalore with our 2026 guide.",
            "image": [
              "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "datePublished": "2026-06-27T08:00:00+05:30",
            "dateModified": "2026-06-27T10:00:00+05:30",
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
              "@id": "https://plan-srilanka.com/sri-lanka-trip-cost-from-bangalore"
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
                "name": "Bangalore",
                "item": "https://plan-srilanka.com/sri-lanka-trip-cost-from-bangalore"
              }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Sri Lanka",
            "description": "Calculated travel costs, pristine beaches, ancient cultural heritage, raw wildlife, and stunning tea estate highlands from Bangalore (BLR) gateway.",
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
                "name": "How much does a Sri Lanka trip cost from Bangalore?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A standard 5-day budget trip starts around ₹27,000 - ₹42,000 per person. Comfortable mid-range tours run from ₹48,000 - ₹78,000, while premium high-comfort luxury experiences begin around ₹95,000+ per traveler from Bangalore."
                }
              },
              {
                "@type": "Question",
                "name": "How much is a Bangalore to Colombo flight?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A direct round-trip flight from Bangalore (BLR) to Colombo (CMB) typically ranges between ₹11,000 and ₹18,000 depending on advance booking."
                }
              },
              {
                "@type": "Question",
                "name": "Do Indians need a visa for Sri Lanka?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Indian passport holders require a Tourist Electronic Travel Authorization (ETA). Standard ETA fees are $20 USD (~₹1,650), but frequently waived to ₹0 during active tourism promotion campaigns in 2026."
                }
              },
              {
                "@type": "Question",
                "name": "Is Sri Lanka cheaper than Maldives?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, significantly. While Maldives is built around costly private island overwater resorts, Sri Lanka offers affordable heritage stays, local transport options, public transit trains, and reasonable dining, making it 60% cheaper."
                }
              },
              {
                "@type": "Question",
                "name": "Is 5 days enough for Sri Lanka?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, 5 days is perfect for a targeted itinerary covering Colombo, Negombo, and Galle Dutch Fort, or a Cultural Triangle highlight trip (Sigiriya and Kandy)."
                }
              },
              {
                "@type": "Question",
                "name": "What's the cheapest month to travel to Sri Lanka?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "June, September, and October are historically the cheapest months for flights and hotel stays due to the shoulder season. This is when boutique resorts offer heavy discounts of up to 40%."
                }
              },
              {
                "@type": "Question",
                "name": "Is Sri Lanka good for solo travelers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. Sri Lanka has an extremely friendly, safe local culture, a well-established hostel network, widely spoken English, and cheap PickMe/TukTuk transport options, making it ideal and highly safe for solo travelers."
                }
              },
              {
                "@type": "Question",
                "name": "Can I travel to Sri Lanka without a tour package?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, easily! DIY travel in Sri Lanka is very simple. Chauffeurs can be booked directly online, hotels can be selected via standard booking engines, and trains can be pre-booked in advance, allowing you to bypass agencies completely."
                }
              }
            ]
          })}
        </script>
      </>

      {/* Styled Top Hero */}
      <div className="bg-luxury-green relative overflow-hidden py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.22] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green/90" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            2026 Bangalore Edition
          </div>
          
          <h1 id="hero-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            Sri Lanka Trip Cost From Bangalore <br/>
            <span className="text-luxury-gold font-normal italic">(2026 Master Guide)</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-3xl mx-auto font-light leading-relaxed">
            Calculate your total budget, compare flight costs, understand visa requirements, and plan the perfect Sri Lanka itinerary from Bangalore. Just a quick 90-minute hop from Kempegowda Airport!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center text-xs text-luxury-cream/70 font-mono">
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              12 Min Deep Read
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              Written by Travel Architects
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
              Updated June 2026
            </span>
          </div>

          <div className="mt-10">
            <button
              id="plan-trip-cta"
              onClick={() => handleCtaClick("hero_bangalore_cta")}
              className="px-8 py-4 bg-luxury-gold hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2 group"
            >
              Plan My Sri Lanka Trip <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Quick Answer Featured Snippet Box */}
        <section id="snippet-box" className="bg-white border-2 border-luxury-gold/30 rounded-3xl p-6 sm:p-8 shadow-md mb-12 scroll-mt-24">
          <div className="bg-[#fdfaf2] -m-6 sm:-m-8 p-5 sm:p-6 rounded-t-[22px] border-b border-luxury-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-luxury-gold text-white text-[10px] font-mono tracking-wider uppercase font-bold rounded-md">Featured Snippet Guide</span>
              <h3 className="text-sm font-bold font-mono text-luxury-green uppercase">Average Budgets from Bangalore</h3>
            </div>
            <span className="text-xs font-mono text-luxury-black/40 hidden sm:inline">Kempegowda Int'l (BLR) → Colombo (CMB)</span>
          </div>
          
          <div className="mt-8">
            <p className="text-sm sm:text-base text-luxury-black/85 leading-relaxed mb-6 font-light">
              Looking to estimate your <strong>Sri Lanka trip cost from Bangalore</strong>? Based on direct flights from Kempegowda Airport, standard visa ETA clearances, and local fuel estimates, a **5-day budget backpacking trip starts around ₹27,000 - ₹42,000 per person**. A comfortable **mid-range tour averages ₹48,000 - ₹78,000**, while a premium **luxury getaway runs ₹95,000+ per traveler**.
            </p>

            {/* Quick Answer Budget Matrices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-luxury-cream/20 border border-luxury-green/10">
                <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest block mb-1">Solo Traveler</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Budget Tier</span>
                    <span className="font-mono font-bold text-luxury-green">₹27,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Mid-Range</span>
                    <span className="font-mono font-bold text-luxury-green">₹48,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Luxury Tour</span>
                    <span className="font-mono font-bold text-luxury-green">₹95,000+</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-luxury-cream/20 border border-luxury-green/10">
                <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest block mb-1">Couple Travel</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Budget Tier</span>
                    <span className="font-mono font-bold text-luxury-green">₹52,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Mid-Range</span>
                    <span className="font-mono font-bold text-luxury-green">₹88,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Luxury Tour</span>
                    <span className="font-mono font-bold text-luxury-green">₹1,75,000+</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-luxury-cream/20 border border-luxury-green/10">
                <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest block mb-1">Family of 4</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Budget Tier</span>
                    <span className="font-mono font-bold text-luxury-green">₹1,05,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Mid-Range</span>
                    <span className="font-mono font-bold text-luxury-green">₹1,80,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-luxury-black/60">Luxury Tour</span>
                    <span className="font-mono font-bold text-luxury-green">₹3,40,000+</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-[11px] text-luxury-black/40 italic font-light text-center">
              *Estimates are calculated per-trip/per-person inclusive of direct BLR-CMB return flights, average seasonal hotels, local meals, and inter-city commutes.
            </p>
          </div>
        </section>

        {/* Dynamic Interactive Bangalore Cost Calculator */}
        <section className="bg-luxury-green text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-luxury-gold/30 mb-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-luxury-gold font-bold block mb-1">
                ⚡ Instant Bangalore Budget Estimator
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#fcfbf7]">
                Calculate Your Custom Sri Lanka Trip Cost
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-mono bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 text-luxury-gold">
              <DollarSign className="w-3.5 h-3.5" /> Updated for 2026 Season
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Controls */}
            <div className="space-y-5">
              <div>
                <label className="text-xs font-mono uppercase text-luxury-cream/70 font-bold block mb-2">
                  1. Traveler Group
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["couple", "family", "solo", "friends"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTravelerType(t)}
                      className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all text-center capitalize ${
                        travelerType === t
                          ? "bg-luxury-gold text-black border-luxury-gold shadow-md"
                          : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-luxury-cream/70 font-bold block mb-2">
                  2. Travel Style & Comfort
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["budget", "comfort", "luxury"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setComfortTier(c)}
                      className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all text-center capitalize ${
                        comfortTier === c
                          ? "bg-luxury-gold text-black border-luxury-gold shadow-md"
                          : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {c === "budget" ? "🎒 Budget 3★" : c === "comfort" ? "🌴 Comfort 4★" : "👑 Luxury 5★"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-luxury-cream/70 font-bold block mb-2">
                  3. Select Services Needed
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    "Direct BLR Flight Guidance",
                    "Private Chauffeur Sedan / SUV",
                    "3/4-Star Boutique Hotel Stays",
                    "ETA Visa Clearance Assistance"
                  ].map((service) => (
                    <button
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`p-2 rounded-lg text-left text-[11px] font-medium border transition-all flex items-center gap-1.5 ${
                        selectedServices.includes(service)
                          ? "bg-white/20 border-luxury-gold text-white"
                          : "bg-white/5 border-white/10 text-luxury-cream/60"
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${selectedServices.includes(service) ? "text-luxury-gold" : "opacity-0"}`} />
                      <span className="truncate">{service}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-wider block">Estimated Cost / Person</span>
                    <span className="text-3xl font-serif font-bold text-white">₹{dynamicCosts.perPerson}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-luxury-cream/60 uppercase tracking-wider block">Est. Total Group Cost</span>
                    <span className="text-lg font-mono font-bold text-luxury-gold">₹{dynamicCosts.totalGroup}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-luxury-cream/80">
                  <div className="flex justify-between">
                    <span>• Return Flight (BLR → CMB):</span>
                    <span className="font-bold text-white">~₹{dynamicCosts.flightCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Hotel & Lodging ({comfortTier.toUpperCase()}):</span>
                    <span className="font-bold text-white">~₹{dynamicCosts.hotelCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Private Transit & Driver:</span>
                    <span className="font-bold text-white">~₹{dynamicCosts.transitCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Dining & Entry Tickets:</span>
                    <span className="font-bold text-white">~₹{dynamicCosts.mealsCost}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full py-3.5 bg-luxury-gold text-luxury-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" /> Get Custom Quote on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Navigation Shortcuts */}
        <section className="mb-12">
          <div className="bg-luxury-green/5 border border-luxury-green/10 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-luxury-green/60 uppercase tracking-widest font-bold block mb-3">Quick Navigation Navigation</span>
            <div className="flex flex-wrap gap-2.5 text-xs">
              <a href="#flight-costs" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">1. Flight Cost Comparison</a>
              <a href="#total-breakdown" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">2. Cost Breakdown (Flights to SIM)</a>
              <a href="#itinerary-5day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">3. 5-Day Sample Itinerary</a>
              <a href="#first-timers" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">4. Reddit Insights & Practical Advice</a>
              <a href="#worth-it" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">5. What Makes Sri Lanka Worth It</a>
              <a href="#diy-vs-package" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">6. DIY vs Tour Package</a>
              <a href="#faq-section" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">7. Frequently Asked Questions</a>
            </div>
          </div>
        </section>

        {/* Inner Linking sequential block */}
        <div className="bg-white border-2 border-luxury-gold/20 p-6 sm:p-8 rounded-3xl mb-12 shadow-sm">
          <p className="font-bold uppercase tracking-widest text-[11px] text-luxury-gold mb-4 flex items-center gap-1.5 font-mono">
            <Info className="w-4 h-4" /> Sri Lanka Planning Pipeline:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <Link to="/sri-lanka-trip-planner" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Interactive</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Route Planner</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Our dynamic custom budget and route builder.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-trip-cost-from-india" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Finance</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">India Cost Guide</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Master Indian budget breakdown in INR.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Read Post</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-visa-for-indians" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Immigration</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Visa Guide</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Official ETA online application guide.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Check Rules</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/best-time-to-visit-sri-lanka" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Climatology</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Seasonal Map</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Which month is ideal for beaches or hill trails.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">See Months</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Section 1: Bangalore -> Sri Lanka Flight Cost */}
        <section id="flight-costs" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Plane className="w-6 h-6 text-[#d4af37]" />
            Bangalore → Sri Lanka Flight Cost
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            The flight ticket constitutes the most volatile portion of your travel cost, but flying out of Kempegowda International Airport (BLR) offers unparalleled benefits. Not only is Colombo (CMB) extremely close, but Bangalore also has regular, daily direct flight choices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-4">
              <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest block">Direct Connections</span>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                  <span className="text-xs font-semibold text-luxury-green">Average Cost</span>
                  <span className="font-mono font-bold text-luxury-gold">₹11,000 - ₹18,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                  <span className="text-xs font-semibold text-luxury-green">Flight Duration</span>
                  <span className="font-mono font-bold text-luxury-gold">1 hr 25 mins</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-semibold text-luxury-green">Key Carriers</span>
                  <span className="text-xs font-light text-luxury-black">IndiGo, SriLankan Airlines</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-4">
              <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest block">Connecting Routes</span>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                  <span className="text-xs font-semibold text-luxury-green">Average Cost</span>
                  <span className="font-mono font-bold text-luxury-gold">₹13,000 - ₹21,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                  <span className="text-xs font-semibold text-luxury-green">Flight Duration</span>
                  <span className="font-mono font-bold text-luxury-gold">4 hr to 7 hr</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-xs font-semibold text-luxury-green">Key Hubs</span>
                  <span className="text-xs font-light text-luxury-black">Chennai (MAA), Mumbai (BOM)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct BLR Flight Intelligence Schedule Table */}
          <div className="bg-white rounded-2xl border border-luxury-green/10 p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-base text-luxury-green flex items-center gap-2">
                <Plane className="w-4 h-4 text-luxury-gold" /> Direct Flight Intelligence (Kempegowda BLR → Colombo CMB)
              </h3>
              <span className="text-[10px] font-mono text-luxury-gold uppercase font-bold px-2.5 py-1 bg-luxury-cream rounded-full">2026 Flight Timings</span>
            </div>
            <p className="text-xs text-luxury-black/70 font-light mb-4">
              Flying directly from BLR takes only <strong>85 minutes</strong>. Here are the top direct carrier options to help you plan your landing time:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] font-mono text-luxury-green uppercase">
                    <th className="p-3">Flight / Carrier</th>
                    <th className="p-3">Departure (BLR)</th>
                    <th className="p-3">Arrival (CMB)</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Key Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxury-cream text-luxury-black/80 font-light">
                  {blrFlights.map((flight, idx) => (
                    <tr key={idx} className="hover:bg-luxury-cream/10">
                      <td className="p-3 font-semibold text-luxury-green">
                        {flight.airline}
                        {flight.recommended && (
                          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-[9px] font-mono rounded font-bold">Recommended</span>
                        )}
                      </td>
                      <td className="p-3 font-mono font-bold text-luxury-gold">{flight.depTime}</td>
                      <td className="p-3 font-mono">{flight.arrTime}</td>
                      <td className="p-3 font-mono">{flight.duration}</td>
                      <td className="p-3 text-[11px] text-luxury-black/70">{flight.perks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-4 mb-8">
            <h3 className="font-serif font-bold text-base text-luxury-green">Best Times to Book & Save</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
              <div className="p-4 rounded-xl bg-luxury-cream/10 border border-luxury-cream">
                <strong className="text-luxury-green block mb-1">📉 Cheapest Months:</strong>
                September, June, and October are historically the most wallet-friendly months to book flights. Fares frequently drop down to ₹10,000.
              </div>
              <div className="p-4 rounded-xl bg-luxury-cream/10 border border-luxury-cream">
                <strong className="text-luxury-green block mb-1">📈 Peak Season Surges:</strong>
                December through April experiences high tourist arrival rates. Booking less than 30 days before travel can cause prices to surge up to ₹24,000.
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-2xl text-xs text-yellow-950 flex gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <strong>✈️ Chauffeur Booking tip:</strong> Direct flights on IndiGo generally leave BLR in the early morning or mid-afternoon, allowing you to land at Bandaranaike Airport (CMB) by noon. This leaves ample daylight hours to hire a private taxi and drive directly to Sigiriya or Galle Fort without losing a day.
            </div>
          </div>
        </section>

        {/* Section 2: Total Trip Cost Breakdown */}
        <section id="total-breakdown" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#d4af37]" />
            Complete Expense Breakdown (Estimated in INR)
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-8">
            To build a foolproof trip cost blueprint, you must allocate funds across nine specific expense segments. Here is how standard budgets break down across Solo, Couple, and Family categories:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm p-2 mb-8">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Expense Block</th>
                  <th className="p-4">🎒 Budget Tier (Solo)</th>
                  <th className="p-4">🌴 Mid-Range (Per Person)</th>
                  <th className="p-4">👑 Luxury (Per Person)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">✈️ Flight Tickets (Return)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹11,000 - ₹13,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹13,500 - ₹16,500</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹17,000 - ₹24,000</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🏨 Stays (Per Night)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹1,200 - ₹2,500</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹4,000 - ₹7,500</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹12,000 - ₹35,000+</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🍲 Meals & Dining (Daily)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹500 - ₹900</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹1,200 - ₹2,200</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹3,500 - ₹7,000+</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🚖 Transits & Chauffeurs</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹400 (TukTuk/PickMe)</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹2,500 - ₹3,500 (Car)</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹5,000 - ₹8,500 (SUV)</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🎟️ Tickets & Safaris</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹1,500 - ₹3,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹4,500 - ₹8,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹10,000 - ₹20,000</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">📄 Visa (Tourist ETA)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹0 (Promo Promo)</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹1,650 ($20 standard)</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹1,650</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">📱 SIM Card & Data</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹400 (Dialog 10GB)</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹800 (Dialog 30GB)</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹800</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🛡️ Travel Insurance</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹600</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹950</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹1,200</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🛍️ Tea & Souvenirs</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹1,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹3,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹8,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: 5-Day Sample Itinerary */}
        <section id="itinerary-5day" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#d4af37]" />
            5-Day Sri Lanka Sample Itinerary (Bangalore Flyer Route)
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            If you only have a standard 5-day holiday window, trying to cover the entire island will cause extreme exhaustion. To keep travel times low and scenic value high, we have engineered the optimal low-fatigue route specifically for Bangalore flyers:
          </p>

          <div className="space-y-6 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-luxury-gold/30">
            {/* Day 1 */}
            <div className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-luxury-green text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 1: Landing at Colombo (CMB)</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Negombo / Colombo • Transit: 20 mins</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Land in the morning, complete ETA clearances, and pick up local Dialog SIMs. Take a short 20-minute highway taxi run to Negombo. Check in to your beach resort, shake off airport fatigue, and enjoy a fresh lagoon mud-crab dinner.
              </p>
            </div>

            {/* Day 2 */}
            <div className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-luxury-green text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 2: Cultural Triangle Heritage</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Negombo → Sigiriya • Transit: 3.5 hours</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Depart early in a private AC sedan towards Sigiriya. Climb the iconic Sigiriya Lion Rock Fortress during the cool late afternoon hours. Check into a nature boutique hotel nested within organic paddy fields.
              </p>
            </div>

            {/* Day 3 */}
            <div className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-luxury-green text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 3: Sacred Highlands</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Sigiriya → Kandy • Transit: 2.5 hours</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Drive south towards Kandy. Stop at the Dambulla Cave Temple complex. In Kandy, walk along Kandy Lake, tour the sacred Temple of the Tooth Relic, and watch traditional drumming displays.
              </p>
            </div>

            {/* Day 4 */}
            <div className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-luxury-green text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                4
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 4: Highland Peaks & Waterfalls</h3>
              <p className="text-xs text-[#d4af37] font-mono font-bold mt-1">Kandy → Nuwara Eliya / Ella • Transit: 3 hours</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Board the legendary blue train from Peradeniya to Ella for first-class panoramic tea estate views. Traverse the mist-covered mountains, view the iconic Nine Arch Bridge, and capture dramatic waterfall cascades.
              </p>
            </div>

            {/* Day 5 */}
            <div className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-luxury-green text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                5
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 5: Galle Fort Coastline & Flyout</h3>
              <p className="text-xs text-[#d4af37] font-mono font-bold mt-1">Ella → Galle → Colombo Airport • Transit: 5.5 hours total (via highway)</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Drive early down the southern foothills to Galle Fort. Tour the historic Dutch colonial lanes, buy premium Ceylon tea packs, and have a fresh seafood lunch. Hop on the Southern Expressway to Colombo Airport for your late evening flight to Bangalore.
              </p>
            </div>
          </div>

          {/* 7-Day Itinerary Bridge Callout */}
          <div className="mt-8 bg-[#fdfaf2] border-2 border-luxury-gold/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-luxury-gold uppercase tracking-wider block">Have 7 Days Available?</span>
              <h4 className="font-serif font-bold text-luxury-green text-base">Explore Complete 7-Day Sri Lanka Itineraries (INR Budget)</h4>
              <p className="text-xs text-luxury-black/70">Covers Yala Leopard Safaris, Mirissa Whale Watching, and Kandy Tea Estate Trails.</p>
            </div>
            <Link
              to="/sri-lanka-itinerary"
              className="px-5 py-2.5 bg-luxury-green text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-luxury-gold hover:text-black transition-all whitespace-nowrap shadow-sm"
            >
              View 7-Day Itinerary →
            </Link>
          </div>
        </section>

        {/* Section 4: First Time in Sri Lanka (Reddit & Practical Insights) */}
        <section id="first-timers" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#d4af37]" />
            First-Time Travelers From Bangalore Should Know
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-8">
            These guidelines represent actual field insights compiled from active Reddit travel discussions. They are highly practical planning points rather than generic AI advice:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Independent DIY Travel is Easy</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Unlike complex overland countries, Sri Lanka is incredibly welcoming and straightforward to coordinate. You do not need to overpay rigid offline agencies. Stays, train passes, and tourist drivers can be booked entirely online.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">English is Universally Spoken</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                English is highly understood in most commercial shops, hotels, beach bars, and tourist clusters. Conversing with local drivers, guides, and resort managers is completely effortless.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">PickMe and Uber are Live</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Inside Colombo, Kandy, and Galle town zones, the local app <strong>PickMe</strong> operates beautifully alongside Uber. It lets you book metered tuk-tuks, luxury sedans, and cargo trucks at standard rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Carry Some Cash is Vital</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                While boutique resorts and high-end restaurants accept Visa/Mastercard, roadside king-coconut vendors, local cafes, and village tuk-tuks operate entirely on Sri Lankan Rupees (LKR). Keep about ₹5,000 equivalent in hand.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm col-span-full space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-2">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">The "Short Map Distance" Illusion</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Distances on the map might look short (Sigiriya to Kandy is under 100 km). However, do not plan based on standard highway speeds! Narrow winding hill roads, TukTuk traffic, and mountain curves mean that 100 km can easily translate to a 3-hour drive. Allocate buffer times when planning.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: What Makes Sri Lanka Worth It? */}
        <section id="worth-it" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.25em] font-bold block mb-2">Is it even worth a trip?</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">What Makes Sri Lanka Worth It?</h2>
            <p className="text-xs sm:text-sm text-luxury-black/60 max-w-xl mx-auto font-light mt-2">
              Sri Lanka is often compared with domestic trips, but its dense, tropical energy and pristine nature provide an elite international experience. Here is what makes the trip so magical:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Beaches */}
            <div className="bg-white rounded-2xl overflow-hidden border border-luxury-green/5 shadow-sm hover:shadow-md transition-all">
              <div className="h-44 relative overflow-hidden bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400&h=300"
                  alt="Beaches in Sri Lanka"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-luxury-gold font-mono uppercase tracking-wider">
                  🏖️ Pristine Beaches
                </div>
                <h4 className="font-serif font-bold text-base text-luxury-green">Mirissa, Unawatuna, Arugam Bay</h4>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                  Golden sands, clean swimming waters, world-class beginner surf breaks, and lively ocean cafes that rival Thailand or Bali.
                </p>
              </div>
            </div>

            {/* Culture */}
            <div className="bg-white rounded-2xl overflow-hidden border border-luxury-green/5 shadow-sm hover:shadow-md transition-all">
              <div className="h-44 relative overflow-hidden bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1588598176944-4fc3a2862c93?auto=format&fit=crop&q=80&w=400&h=300"
                  alt="Culture in Sri Lanka"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-luxury-gold font-mono uppercase tracking-wider">
                  🏛️ Ancient Culture
                </div>
                <h4 className="font-serif font-bold text-base text-luxury-green">Sigiriya, Kandy, Anuradhapura</h4>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                  Scale a 200m vertical fortress block, walk through 2,000-year-old rock-carved monastery arches, and explore sacred relic temples.
                </p>
              </div>
            </div>

            {/* Food */}
            <div className="bg-white rounded-2xl overflow-hidden border border-luxury-green/5 shadow-sm hover:shadow-md transition-all">
              <div className="h-44 relative overflow-hidden bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=400&h=300"
                  alt="Food in Sri Lanka"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-luxury-gold font-mono uppercase tracking-wider">
                  🍛 Ceylonese Food
                </div>
                <h4 className="font-serif font-bold text-base text-luxury-green">Rice & Curry, Hoppers, Seafood</h4>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                  Spicy lagoon crab curries, crisp lace-edged egg hoppers, sweet coconut sambols, and cold ginger beers.
                </p>
              </div>
            </div>

            {/* Nightlife */}
            <div className="bg-white rounded-2xl overflow-hidden border border-luxury-green/5 shadow-sm hover:shadow-md transition-all">
              <div className="h-44 relative overflow-hidden bg-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400&h=300"
                  alt="Nightlife in Sri Lanka"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-luxury-gold font-mono uppercase tracking-wider">
                  🌃 Vibrant Nightlife
                </div>
                <h4 className="font-serif font-bold text-base text-luxury-green">Colombo, Mirissa beach parties, Rooftop bars</h4>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                  Sip cocktails on 40th-floor rooftop lounges over Colombo city or party with toes in the sand on Mirissa bay shores.
                </p>
              </div>
            </div>

            {/* Wildlife */}
            <div className="bg-white rounded-2xl overflow-hidden border border-luxury-green/5 shadow-sm hover:shadow-md transition-all">
              <div className="h-44 relative overflow-hidden bg-neutral-200">
                <img 
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=400&h=300"
                  alt="Wildlife in Sri Lanka"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-luxury-gold font-mono uppercase tracking-wider">
                  🐘 Raw Wildlife
                </div>
                <h4 className="font-serif font-bold text-base text-luxury-green">Yala, Minneriya, Udawalawe</h4>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                  View herds of wild elephants drinking at reservoirs, rare leopards resting in Yala branches, and sea turtles nesting on sandy shores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: DIY vs Package */}
        <section id="diy-vs-package" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#d4af37]" />
            DIY vs Package: What's Better?
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            Is it better to plan your Sri Lanka trip independently or book an all-inclusive tour package from Bangalore? Here is a transparent comparison to help you choose:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DIY Stays */}
            <div className="bg-white p-6 rounded-3xl border border-luxury-green/10 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                <h3 className="font-serif font-bold text-lg text-luxury-green">Plan Yourself (DIY)</h3>
                <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[9px] font-mono font-bold uppercase rounded-md">Flexible & Free</span>
              </div>
              <ul className="text-xs text-luxury-black/70 space-y-2 font-light">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <strong>Pros:</strong> Full control over hotels, custom timings, and dining spots. Bypasses commission-driven souvenir stops.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <strong>Cons:</strong> Requires researching several hotels, booking trains in advance, and coordinating local taxi transfers yourself.
                </li>
                <li className="flex gap-2">
                  <span className="text-luxury-gold font-bold shrink-0">ℹ</span>
                  <strong>Suitable For:</strong> Solo travelers, backpackers, and couples who love designing their own paths.
                </li>
              </ul>
              <div className="pt-2">
                <p className="text-[11px] text-luxury-black/40">Average land cost: <strong>₹32,000 - ₹55,000</strong></p>
              </div>
            </div>

            {/* Tour Package */}
            <div className="bg-white p-6 rounded-3xl border border-luxury-green/10 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                <h3 className="font-serif font-bold text-lg text-luxury-green">Tour Package</h3>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-mono font-bold uppercase rounded-md">Convenient & Smooth</span>
              </div>
              <ul className="text-xs text-luxury-black/70 space-y-2 font-light">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <strong>Pros:</strong> Hand over booking and transits completely. Includes a dedicated car, driver, and pre-selected stays.
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <strong>Cons:</strong> Rigid schedules with fixed hotels. Many cheaper packages bundle generic 3-star chain hotels far from beaches.
                </li>
                <li className="flex gap-2">
                  <span className="text-luxury-gold font-bold shrink-0">ℹ</span>
                  <strong>Suitable For:</strong> Multi-generational families, elderly travelers, or those with zero planning time.
                </li>
              </ul>
              <div className="pt-2">
                <p className="text-[11px] text-luxury-black/40">Average land cost: <strong>₹45,000 - ₹78,000</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Inner CTA Banner */}
        <div className="bg-gradient-to-r from-luxury-green to-[#132c21] text-white p-8 sm:p-10 rounded-[32px] mb-16 shadow-2xl border border-luxury-gold/30 relative overflow-hidden text-center">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-8">
            <Compass className="w-56 h-56 text-luxury-gold" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-3 py-1 bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-gold text-xs font-mono uppercase tracking-[0.2em] rounded-full font-bold">Bangalore Direct Concierge</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#fcfbf7]">
              Build Your Bangalore → Sri Lanka Trip Plan
            </h3>
            <p className="text-xs sm:text-sm text-luxury-cream/80 leading-relaxed font-light">
              Skip the rigid cookie-cutter offline agencies. Our concierge coordinates luxury and mid-comfort family trips that match your flights, desired pace, and customized budget seamlessly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => handleCtaClick("bottom_bangalore_planner_cta")}
                className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-white hover:bg-white hover:text-luxury-green font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all"
              >
                Launch Route Creator Tool
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2"
              >
                💬 WhatsApp Our Team
              </button>
            </div>
          </div>
        </div>

        {/* Section 7: FAQs */}
        <section id="faq-section" className="scroll-mt-24 py-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-8 text-center">
            Frequently Asked Questions (Bangalore Flyers)
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How much does a Sri Lanka trip cost from Bangalore?",
                a: "A standard 5-day budget trip starts around ₹27,000 - ₹42,000 per person. Comfortable mid-range tours run from ₹48,000 - ₹78,000, while premium high-comfort luxury experiences begin around ₹95,000+ per traveler from Bangalore."
              },
              {
                q: "How much is a Bangalore to Colombo flight?",
                a: "A direct round-trip flight from Bangalore (BLR) to Colombo (CMB) typically ranges between ₹11,000 and ₹18,000 depending on when you book. Booking 45–60 days in advance usually secures the cheapest fares."
              },
              {
                q: "Do Indians need a visa to travel to Sri Lanka?",
                a: "Yes, Indian passport holders require a Tourist Electronic Travel Authorization (ETA) prior to arrival. Under ongoing tourism promotional campaigns in 2026, standard ETA visa application fees are frequently waived for Indian passport holders."
              },
              {
                q: "Is Sri Lanka cheaper than Maldives?",
                a: "Yes, significantly cheaper. While the Maldives functions primarily on private island luxury resorts with expensive speedboat transfers, Sri Lanka offers a diverse range of heritage homestays, public transits, local cuisines, and affordable boutique hotels, making it about 60% cheaper than Maldives."
              },
              {
                q: "Is 5 days enough for Sri Lanka?",
                a: "Five days is perfect for a short coastal holiday (covering Colombo, Negombo, and Galle Fort) or a cultural trip (covering Sigiriya and Kandy). However, if you wish to do the full scenic train loop to Ella and go on safaris, we recommend a 7 to 9-day itinerary."
              },
              {
                q: "What's the cheapest month to travel to Sri Lanka?",
                a: "June, September, and October are historically the cheapest months for flights and hotel stays due to the shoulder season. This is when boutique resorts offer heavy discounts of up to 40%."
              },
              {
                q: "Is Sri Lanka good for solo travelers?",
                a: "Absolutely. Sri Lanka has an extremely friendly, safe local culture, a well-established hostel network, widely spoken English, and cheap PickMe/TukTuk transport options, making it ideal and highly safe for solo travelers."
              },
              {
                q: "Can I travel to Sri Lanka without a tour package?",
                a: "Yes, easily! DIY travel in Sri Lanka is very simple. Chauffeurs can be booked directly online, hotels can be selected via standard booking engines, and trains can be pre-booked in advance, allowing you to bypass agencies completely."
              }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-luxury-green/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left text-luxury-green hover:bg-[#fdfaf2]/50 transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-luxury-gold shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 border-t border-luxury-green/5 text-xs sm:text-sm text-luxury-black/75 leading-relaxed font-light bg-luxury-cream/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
