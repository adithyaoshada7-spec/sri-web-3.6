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

export default function SrilankaHyderabadCostPillarPage() {
  usePageMetadata({
    title: "Sri Lanka Trip Cost From Hyderabad (2026) | Flights, Budget & 7-Day Cost",
    description: "Planning a Sri Lanka trip from Hyderabad? Discover flight prices, 5-day and 7-day trip costs, hotel budgets, visa fees, family and honeymoon expenses, plus a free Sri Lanka Trip Planner.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-hyderabad",
    ogUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-hyderabad"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<"5days" | "7days" | "10days">("7days");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `hyderabad_faq_${index}`);
  };

  const handleCtaClick = (buttonId: string) => {
    trackEvent("planner_pillar_cta_click", "conversion", buttonId);
    navigate("/sri-lanka-trip-planner");
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", "conversion", "hyderabad_pillar");
    window.open("https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20I'm%20planning%20a%20trip%20from%20Hyderabad%20and%20would%20love%20a%20free%20custom%20budget%20estimate%20and%20itinerary.", "_blank");
  };

  // Realistic estimates for Hyderabad travelers (in INR)
  const budgetEstimates = {
    "5days": {
      budget: 28000,
      comfort: 48000,
      luxury: 85000
    },
    "7days": {
      budget: 38000,
      comfort: 62000,
      luxury: 125000
    },
    "10days": {
      budget: 54000,
      comfort: 86000,
      luxury: 185000
    }
  };

  const faqItems = [
    {
      q: "Is Sri Lanka cheaper than the Maldives?",
      a: "Yes, significantly! While the Maldives operates primarily on expensive private resort islands requiring high-cost speedboats/seaplanes and imported dining, Sri Lanka offers a rich, diverse land-based travel experience. In Sri Lanka, you can book magnificent boutique hotels for ₹5,000–₹9,000 per night, travel using a private AC car, eat incredible local cuisine for pennies, and explore massive ancient cities, hills, and beaches. A Maldives trip usually costs double or triple a comparable Sri Lankan holiday."
    },
    {
      q: "Is Sri Lanka cheaper than Bali?",
      a: "Yes, Sri Lanka is generally on par with or slightly cheaper than Bali, especially regarding private transport (hiring a car with a driver) and boutique heritage stays. While Bali has seen a significant surge in tourist pricing and heavy traffic congestion, Sri Lanka offers uncrowded beaches, highly affordable national park safaris, and excellent value for money. Local food, train journeys, and guesthouse stays in Sri Lanka are incredibly inexpensive."
    },
    {
      q: "Do Hyderabad residents need a visa for Sri Lanka?",
      a: "Yes, all Indian passport holders require a Tourist Electronic Travel Authorization (ETA). The standard visa fee is $20 USD (~₹1,650), but Sri Lanka frequently introduces zero-fee (₹0) visa processing campaigns for Indian tourists. You can easily complete the registration online via the official ETA portal and receive your authorization within 12–24 hours."
    },
    {
      q: "Which airline is cheapest from Hyderabad to Colombo?",
      a: "IndiGo is typically the most budget-friendly airline, operating highly efficient connecting flights with brief layovers in Chennai (MAA) or Bengaluru (BLR). SriLankan Airlines offers the most premium direct flights on selected days, or convenient direct options can be boarded from Chennai, which is just a short hop from Hyderabad."
    },
    {
      q: "Is 5 days enough to explore Sri Lanka?",
      a: "A 5-day trip is ideal for a short, high-value escape to unwind from Hyderabad's bustling tech-hub routine. It is enough to cover the historic Galle Dutch Fort, do a lazy beach stay on the south coast (Bentota or Hikkaduwa), and spend half a day shopping and dining in Colombo. However, for the full cultural experience (Sigiriya, Kandy, Ella train), we highly recommend a 7-to-10-day itinerary."
    },
    {
      q: "How much cash should I carry for my trip?",
      a: "We recommend carrying roughly ₹15,000 to ₹20,000 in cash (exchanged into US Dollars or Sri Lankan Rupees at Colombo airport) for small local expenses, tipping, tuk-tuks, street food, and minor entry tickets. Major hotels, restaurants, and supermarkets readily accept standard Indian Credit/Debit cards (ensure international usage is activated on your card app)."
    },
    {
      q: "Which month is cheapest to visit Sri Lanka from Hyderabad?",
      a: "The cheapest months are during the shoulder/monsoon transition seasons, specifically September to November (before the winter peak starts) and May to June. During these months, flight tickets drop to their lowest rates, and luxury resorts offer heavy discounts of up to 40% to 50% off standard winter prices."
    },
    {
      q: "Can I use UPI or Indian debit/credit cards in Sri Lanka?",
      a: "Yes! Under bilateral agreements, UPI payments are increasingly accepted at selected merchants and major tourism hubs in Sri Lanka. Furthermore, standard Indian Visa and Mastercard debit/credit cards are widely accepted at supermarkets, major hotels, and premium restaurants. Be sure to enable 'International Usage' in your banking app before departing Hyderabad to avoid transaction declines."
    },
    {
      q: "Do I need travel insurance for my Sri Lanka trip?",
      a: "While travel insurance is no longer a strict mandatory entry requirement by the Sri Lankan government, we highly recommend purchasing a basic travel insurance policy. It usually costs less than ₹1,000 for a week-long trip and covers unforeseen flight delays, baggage losses, and any emergency medical expenses."
    }
  ];

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white pb-20">
      {/* Schema Markups for Rich SEO Results */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Trip Cost From Hyderabad (2026): Flights, Hotels & Budget Guide",
            "description": "Planning a Sri Lanka trip from Hyderabad? Discover flight prices, 5-day and 7-day trip costs, hotel budgets, visa fees, family and honeymoon expenses, plus a free Sri Lanka Trip Planner.",
            "image": [
              "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "datePublished": "2026-07-02T09:00:00+05:30",
            "dateModified": "2026-07-02T09:00:00+05:30",
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
              "@id": "https://plan-srilanka.com/sri-lanka-trip-cost-from-hyderabad"
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
                "name": "Hyderabad Guide",
                "item": "https://plan-srilanka.com/sri-lanka-trip-cost-from-hyderabad"
              }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Sri Lanka",
            "description": "Calculated flight schedules, direct/connecting airline routes, luxury honeymoon packages, and customizable holiday budgets from Rajiv Gandhi International Airport (HYD).",
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
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
              }
            }))
          })}
        </script>
      </>

      {/* Styled Top Hero */}
      <div className="bg-luxury-green relative overflow-hidden py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.25] opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green/95" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            2026 Hyderabad Premium Edition
          </div>
          
          <h1 id="hyderabad-hero-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            Sri Lanka Trip Cost From Hyderabad
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-3xl mx-auto font-light leading-relaxed">
            A complete budget guide including Rajiv Gandhi International Airport (HYD) flight costs, 5-day and 7-day trip costs, hotel choices, visas, family expenses, and custom romantic honeymoons.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center text-xs text-luxury-cream/70 font-mono">
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              8 Min Deep Read
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              Verified Local Pricing
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
              Active July 2026 Guide
            </span>
          </div>

          <div className="mt-10">
            <button
              id="hyderabad-hero-cta"
              onClick={() => handleCtaClick("hero_hyderabad_cta")}
              className="px-8 py-4 bg-luxury-gold hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2 group"
            >
              Calculate My Trip Cost <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Quick Answer Snippet Box (Above the fold focus) */}
        <section id="hyderabad-snippet-box" className="bg-white border-2 border-luxury-gold/30 rounded-3xl p-6 sm:p-8 shadow-md mb-12 scroll-mt-24">
          <div className="bg-[#fdfaf2] -m-6 sm:-m-8 p-5 sm:p-6 rounded-t-[22px] border-b border-luxury-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-luxury-gold text-white text-[10px] font-mono tracking-wider uppercase font-bold rounded-md">Quick Answer</span>
              <div className="flex items-center text-xs text-luxury-gold gap-0.5">
                {"★".repeat(5)}
              </div>
            </div>
            <span className="text-xs font-mono text-luxury-black/40 hidden sm:inline">Rajiv Gandhi (HYD) → Colombo (CMB)</span>
          </div>
          
          <div className="mt-8">
            <p className="text-lg sm:text-xl text-luxury-green font-serif font-bold leading-relaxed mb-4">
              A 7-day Sri Lanka trip from Hyderabad typically costs ₹38,000–₹75,000 per person, depending on your travel style, flight prices, accommodation, and activities.
            </p>
            <p className="text-sm sm:text-base text-luxury-black/75 leading-relaxed mb-6 font-light">
              This average includes round-trip economy flights from Hyderabad, local tourist visa ETA fees, comfortable stays in beautifully located boutique guesthouses or hotels, a private AC car for easy island transfers, and premium excursions like climbing Sigiriya rock and going on an elephant safari.
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
                        trackEvent("hyderabad_duration_select", "interaction", dur);
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
                  <span className="text-[10px] text-luxury-black/40 block mt-1">Guesthouses, trains, street food</span>
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
                  <span className="text-[10px] text-luxury-black/40 block mt-1">5★ Luxury Resorts, Private SUV</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                id="snippet-calculate-cta-hyd"
                onClick={() => handleCtaClick("hyd_snippet_calculate")}
                className="px-6 py-3.5 bg-luxury-gold hover:bg-luxury-green hover:text-white text-black font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2 font-mono"
              >
                ✅ Calculate My Trip Cost <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                id="snippet-wa-cta-hyd"
                onClick={handleWhatsAppClick}
                className="px-6 py-3.5 border border-emerald-500/30 text-emerald-700 hover:bg-emerald-50/50 font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all inline-flex items-center justify-center gap-2 font-mono"
              >
                Get Free Estimate on WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Route Info */}
        <div className="p-4 mb-12 bg-white rounded-2xl border border-luxury-gold/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-luxury-cream/20 flex items-center justify-center text-luxury-green font-bold">
              HYD
            </div>
            <div className="h-0.5 w-12 border-t-2 border-dashed border-luxury-gold" />
            <div className="w-10 h-10 rounded-full bg-luxury-cream/20 flex items-center justify-center text-luxury-green font-bold">
              CMB
            </div>
            <div className="ml-2 text-left">
              <h4 className="text-xs font-mono font-bold text-luxury-green uppercase tracking-wide">Transit Gateway Hub</h4>
              <p className="text-[11px] text-luxury-black/55">Rajiv Gandhi Intl (HYD) to Colombo Bandaranaike (CMB)</p>
            </div>
          </div>
          <Link 
            to="/sri-lanka-trip-planner"
            className="text-xs font-mono font-bold text-[#d4af37] hover:text-luxury-green transition-colors flex items-center gap-1 underline"
          >
            Custom Cost Calculator <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* H2: How Much Does a Sri Lanka Trip Cost From Hyderabad? */}
        <section id="general-cost-assessment" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            How Much Does a Sri Lanka Trip Cost From Hyderabad?
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light leading-relaxed">
            Planning a trip from Hyderabad to Sri Lanka is both remarkably simple and highly budget-friendly. Because Sri Lanka sits right off the southern tip of India, international flights are short, and local prices remain highly competitive. 
          </p>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light leading-relaxed">
            For standard Hyderabad travelers, expenses scale primarily based on your choice of accommodation, whether you hire a private dedicated driver, and what excursions (such as whale watching, luxury national park safaris, or hot air balloons) you add. Rest assured, Sri Lanka delivers an incredibly high standard of hospitality for every rupee spent, making it an ideal choice for both rapid weekend getaways and immersive multi-week family adventures.
          </p>

          {/* Core Internal Links Navigation Box */}
          <div className="bg-white border border-luxury-gold/20 rounded-2xl p-6 mb-8 shadow-sm">
            <h3 className="text-sm font-bold font-mono text-luxury-green uppercase tracking-wide mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-luxury-gold" />
              Essential India-to-Sri Lanka Travel Resources:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                to="/sri-lanka-trip-planner"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#fcfbf7] hover:bg-luxury-cream/15 border border-luxury-gold/10 transition-colors group"
              >
                <div className="text-left">
                  <span className="text-xs font-bold text-luxury-green block">Sri Lanka Trip Planner</span>
                  <span className="text-[10px] text-luxury-black/40 block">Free custom budget calculator</span>
                </div>
                <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                to="/sri-lanka-trip-cost-from-india"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#fcfbf7] hover:bg-luxury-cream/15 border border-luxury-gold/10 transition-colors group"
              >
                <div className="text-left">
                  <span className="text-xs font-bold text-luxury-green block">Sri Lanka Trip Cost From India</span>
                  <span className="text-[10px] text-luxury-black/40 block">Comprehensive national pricing data</span>
                </div>
                <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#fcfbf7] hover:bg-luxury-cream/15 border border-luxury-gold/10 transition-colors group"
              >
                <div className="text-left">
                  <span className="text-xs font-bold text-luxury-green block">Sri Lanka Trip Cost From Chennai</span>
                  <span className="text-[10px] text-luxury-black/40 block">Southern flights, local guides & tips</span>
                </div>
                <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                to="/sri-lanka-trip-cost-from-bangalore"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#fcfbf7] hover:bg-luxury-cream/15 border border-luxury-gold/10 transition-colors group"
              >
                <div className="text-left">
                  <span className="text-xs font-bold text-luxury-green block">Sri Lanka Trip Cost From Bangalore</span>
                  <span className="text-[10px] text-luxury-black/40 block">IT-hub guide, direct routes & budgets</span>
                </div>
                <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* H2: Unique Hyderabad to Colombo Flight Guide */}
        <section id="flights-hyd-cmb" className="mb-16 scroll-mt-24 bg-[#fdfaf2] p-6 sm:p-8 rounded-3xl border border-luxury-gold/15">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Hyderabad to Colombo Flight Guide
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light leading-relaxed">
            Your flight ticket constitutes the initial baseline of your overall holiday budget. Rajiv Gandhi International Airport (HYD) in Shamshabad offers smooth connectivity to Bandaranaike International Airport (CMB) in Colombo.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-luxury-gold/10">
              <h3 className="text-sm font-bold font-mono text-luxury-green uppercase tracking-wide mb-2">Common Airlines Serving the Route</h3>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                <strong>IndiGo</strong>, <strong>Air India</strong>, and <strong>Vistara</strong> operate frequent daily flights from Hyderabad with quick, comfortable layovers. Layovers typically take place in <strong>Chennai (MAA)</strong> or <strong>Bengaluru (BLR)</strong>, making total travel times highly manageable. On selected seasonal dates, <strong>SriLankan Airlines</strong> runs direct flight connections or coordinated codeshares out of Hyderabad.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-gold/10">
              <h3 className="text-sm font-bold font-mono text-luxury-green uppercase tracking-wide mb-2">Typical Journey Time</h3>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                A connection flight via Chennai or Bangalore usually takes <strong>4 to 5.5 hours</strong> in total, including a brief layover of about 1 to 2 hours. If direct charter or non-stop flights are booked, the flight time is an incredibly quick <strong>2 hours and 15 minutes</strong>.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-gold/10">
              <h3 className="text-sm font-bold font-mono text-luxury-green uppercase tracking-wide mb-2">Average Airfares & Dynamic Pricing</h3>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                Standard round-trip flight tickets average between <strong>₹14,500 and ₹18,500 per person</strong> when booked at least 4 to 6 weeks in advance. During peak festivals (like Diwali, Christmas, or summer school holidays), prices can climb up to ₹24,000+.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#fcfbf7] border border-luxury-gold/20 rounded-2xl text-xs flex gap-3 text-luxury-black/70">
            <Info className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-luxury-green mb-1">Hyderabad Pro-Flight Hack:</p>
              <p className="font-light leading-relaxed">
                Check flights that connect through Chennai (MAA). Because Chennai sits very close to Colombo, flights out of Chennai are very frequent and cheap. You can occasionally book separate domestic legs from HYD to MAA and MAA to CMB to shave ₹3,000 off your total round-trip flight budget!
              </p>
            </div>
          </div>
        </section>

        {/* H2: 5-Day Sri Lanka Trip Cost From Hyderabad */}
        <section id="5day-package" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            5-Day Sri Lanka Trip Cost From Hyderabad
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light">
            If you are looking to escape the high-intensity IT-hub rush of Hyderabad for a quick revitalizing break, a 5-day holiday is highly rewarding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-luxury-gold/10 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <span className="px-2 py-0.5 bg-luxury-black/5 text-luxury-black/60 text-[9px] font-mono uppercase tracking-widest font-bold rounded-md mb-3 inline-block">Tier 1</span>
              <h3 className="text-base font-bold font-serif text-luxury-black mb-1">Budget Backpacker</h3>
              <p className="text-2xl font-mono font-bold text-luxury-black mb-4">₹28,000</p>
              <ul className="text-xs text-left space-y-2 text-luxury-black/70 font-light border-t border-luxury-gold/5 pt-4">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Local beach hostels & guesthouses</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Public buses & coastal trains</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Authentic local rice & curry meals</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Free beaches & historic walks</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-luxury-gold rounded-2xl p-6 text-center shadow-sm relative ring-4 ring-luxury-gold/5">
              <span className="px-2.5 py-0.5 bg-luxury-gold text-white text-[9px] font-mono uppercase tracking-widest font-bold rounded-md mb-3 inline-block">Best Seller</span>
              <h3 className="text-base font-bold font-serif text-luxury-green mb-1">Comfort Explorer</h3>
              <p className="text-2xl font-mono font-bold text-luxury-green mb-4">₹48,000</p>
              <ul className="text-xs text-left space-y-2 text-luxury-black/80 font-light border-t border-luxury-gold/5 pt-4">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> 3★ to 4★ Boutique hotels</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Dedicated private AC Sedan car</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Stylish cafes & hotel buffet dinners</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Galle Fort tour & boat safari</li>
              </ul>
            </div>

            <div className="bg-white border border-luxury-gold/10 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <span className="px-2 py-0.5 bg-luxury-green/10 text-luxury-green text-[9px] font-mono uppercase tracking-widest font-bold rounded-md mb-3 inline-block">Premium</span>
              <h3 className="text-base font-bold font-serif text-luxury-black mb-1">Luxury Wellness</h3>
              <p className="text-2xl font-mono font-bold text-luxury-black mb-4">₹85,000</p>
              <ul className="text-xs text-left space-y-2 text-luxury-black/70 font-light border-t border-luxury-gold/5 pt-4">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> 5★ Luxury cliffside ocean resorts</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Premium AC SUV with professional guide</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Fine dining & high-end seafood</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Private spa therapies & helicopter legs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* H2: 7-Day Sri Lanka Trip Cost From Hyderabad (Table) */}
        <section id="7day-package-table" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            7-Day Sri Lanka Trip Cost From Hyderabad
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light">
            A 7-day loop is the absolute sweet spot for first-time Hyderabad visitors. This structured table details itemized costs (excluding flights) per person for a comprehensive week-long itinerary:
          </p>

          <div className="overflow-x-auto border border-luxury-gold/15 rounded-2xl shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fdfaf2] border-b border-luxury-gold/15">
                  <th className="p-4 text-xs font-mono uppercase tracking-wider font-bold text-luxury-green">Expense Item</th>
                  <th className="p-4 text-xs font-mono uppercase tracking-wider font-bold text-luxury-black">Budget Tier</th>
                  <th className="p-4 text-xs font-mono uppercase tracking-wider font-bold text-[#d4af37]">Comfort Tier</th>
                  <th className="p-4 text-xs font-mono uppercase tracking-wider font-bold text-luxury-green">Luxury Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-gold/5 text-sm">
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Moon className="w-4 h-4 text-luxury-gold shrink-0" />
                    Boutique Lodging (6 Nights)
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹6,500 (Guesthouses/Homestays)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹16,500 (3-4★ Boutique hotels)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹42,000 (5★ Colonial Bungalows)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-luxury-gold shrink-0" />
                    Transport & Driver
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹5,000 (Public trains & local tuk-tuks)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹15,000 (Dedicated private Sedan with driver)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹28,000 (Private premium 4x4 SUV)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-luxury-gold shrink-0" />
                    Daily Dining & Meals
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹4,500 (Traditional street food & cafes)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹11,000 (Boutique cafes & beach clubs)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹22,000 (Five-star buffets & fine dining)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Compass className="w-4 h-4 text-luxury-gold shrink-0" />
                    Tours & Entry Fees
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹4,500 (Temples & self-guided walks)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹11,500 (Sigiriya entry, Yala elephant safari)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹25,000 (Private guides, whale watching)</td>
                </tr>
                <tr className="bg-luxury-cream/10 font-bold border-t border-luxury-gold/20">
                  <td className="p-4 text-luxury-green uppercase font-mono text-xs">Total Local Budget</td>
                  <td className="p-4 font-mono text-luxury-black text-sm">₹20,500 - ₹24,000</td>
                  <td className="p-4 font-mono text-luxury-green text-sm">₹54,000 - ₹62,000</td>
                  <td className="p-4 font-mono text-luxury-green text-base">₹1,17,000 - ₹1,80,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* H2: Sri Lanka Family Trip Cost From Hyderabad */}
        <section id="family-cost" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Sri Lanka Family Trip Cost From Hyderabad
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light leading-relaxed">
            Sri Lanka is an incredibly warm and child-friendly destination. If you are planning a trip for a <strong>family of 4 (2 adults and 2 children)</strong>, you can expect an average total budget of <strong>₹1,80,000 to ₹2,60,000</strong> (including comfortable hotels, flights, meals, and private transport).
          </p>
          <div className="p-5 bg-white border border-luxury-gold/15 rounded-2xl">
            <h3 className="text-base font-bold font-serif text-luxury-black mb-3">Family Budget Optimization Tips:</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-luxury-black/75 font-light list-disc pl-5">
              <li><strong>Share a Private Driver:</strong> Renting a comfortable private minivan (like a Toyota KDH) is highly cost-effective when split across 4 members, ensuring safe, air-conditioned journeys between hill-country stops.</li>
              <li><strong>Book Interconnecting Rooms or Family Suites:</strong> Sri Lankan boutique properties are famous for generous garden villas and interconnected family suites, which are significantly cheaper than booking two separate hotel rooms.</li>
              <li><strong>Child Ticket Discounts:</strong> Major sights (like Pinnewala Elephant Orphanage or Royal Botanical Gardens) offer 50% discount entry tickets for children under 12. Keep passports handy for age verification.</li>
            </ul>
          </div>
        </section>

        {/* H2: Sri Lanka Honeymoon Cost From Hyderabad */}
        <section id="honeymoon-cost" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Sri Lanka Honeymoon Cost From Hyderabad
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light leading-relaxed">
            With misty tea plantations, beautiful colonial history, and sweeping tropical oceans, Sri Lanka is a legendary romantic honeymoon paradise. A premium 7-day couples honeymoon package from Hyderabad typically ranges between <strong>₹1,60,000 and ₹2,80,000 per couple</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white border border-luxury-gold/10 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mb-3 font-bold">🏡</div>
              <h3 className="text-sm font-bold font-serif text-luxury-black mb-1">Luxury Villas & Bungalows</h3>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Stay in romantic colonial tea estates in Hatton, or book a private cliffside pool villa in Tangalle with stunning Indian Ocean views. Stays average ₹12,000 to ₹22,000 per night.
              </p>
            </div>

            <div className="p-5 bg-white border border-luxury-gold/10 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mb-3 font-bold">🚗</div>
              <h3 className="text-sm font-bold font-serif text-luxury-black mb-1">Private Transport</h3>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Travel in complete privacy in a premium sedan or SUV, driven safely by an experienced English-speaking tourist chauffeur guide. Chauffeur services average ₹4,500 per day.
              </p>
            </div>

            <div className="p-5 bg-white border border-luxury-gold/10 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mb-3 font-bold">✨</div>
              <h3 className="text-sm font-bold font-serif text-luxury-black mb-1">Romantic Experiences</h3>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Indulge in private couples Ayurvedic spa massages, scenic Kandy-Ella first-class train cabins, and beautiful candlelit lobster dinners on secret southern sands.
              </p>
            </div>
          </div>
        </section>

        {/* H2: Visa Cost */}
        <section id="visa-cost" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Sri Lanka Visa Cost for Indian Tourists (2026)
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light leading-relaxed">
            All tourists entering Sri Lanka require an Electronic Travel Authorization (ETA). To apply, simply use the official online ETA system. 
          </p>
          <div className="p-5 bg-[#edf1ed]/40 border border-luxury-green/10 rounded-2xl">
            <p className="text-xs sm:text-sm text-luxury-black/80 font-light leading-relaxed mb-3">
              - <strong>Standard Online Fee:</strong> $20 USD (~₹1,650) for a double-entry tourist visa valid for up to 30 days.
            </p>
            <p className="text-xs sm:text-sm text-luxury-black/80 font-light leading-relaxed">
              - <strong>Special Note:</strong> Under active 2026 bilateral tourism promotion campaigns, visa processing fees are frequently waived to <strong>₹0 (Free Visa on Arrival)</strong> for Indian passport holders. Ensure you pre-register on the official portal before flying to bypass queues!
            </p>
          </div>
          <div className="mt-4">
            <Link 
              to="/sri-lanka-visa-for-indians"
              className="text-xs font-mono font-bold text-luxury-gold hover:text-luxury-green transition-colors inline-flex items-center gap-1.5 underline"
            >
              Read Full Visa & Document Requirements <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* H2: Best Time to Visit Sri Lanka From Hyderabad */}
        <section id="best-time" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Best Time to Visit Sri Lanka From Hyderabad
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light leading-relaxed">
            Deciding when to book your tickets impacts both flight rates and local climatic comfort.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-luxury-gold/10">
              <h3 className="text-sm font-bold font-mono text-luxury-green uppercase tracking-wide mb-2">When Flights are Cheaper</h3>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                The absolute cheapest months to secure flights are during off-peak windows like <strong>September to November</strong> and <strong>February to May</strong>. Planning mid-week departures (Tuesdays or Wednesdays) out of Hyderabad also drops airfares considerably.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-gold/10">
              <h3 className="text-sm font-bold font-mono text-luxury-green uppercase tracking-wide mb-2">Which Coast is Best?</h3>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                - <strong>December to April:</strong> Head to the South & West Coasts (Bentota, Hikkaduwa, Mirissa) for blue waters, calm seas, and whale watching.<br/>
                - <strong>May to October:</strong> Head to the East Coast (Trincomalee, Nilaveli, Pasikudah) for dry, brilliant sunshine and clear shallow bays.
              </p>
            </div>
          </div>
          <div className="mt-6 text-left">
            <Link 
              to="/best-time-to-visit-sri-lanka"
              className="text-xs font-mono font-bold text-luxury-gold hover:text-luxury-green transition-colors inline-flex items-center gap-1.5 underline"
            >
              See Our Monthly Climate Matrix <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* H2: Suggested 7-Day Itinerary */}
        <section id="itinerary-link" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-4 tracking-tight">
            Suggested 7-Day Itinerary Loop
          </h2>
          <p className="text-sm sm:text-base text-luxury-black/75 mb-6 font-light leading-relaxed">
            Ready to structure your daily route? Our optimized 7-day loop is designed to give you the perfect highlight loop across the island, minimizing driving exhaustion while maximizing spectacular sights:
          </p>

          <div className="p-6 bg-white border border-luxury-gold/15 rounded-3xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">1</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 1:</strong> Arrive in Colombo, transfer to tranquil seaside Negombo beach hotels (20 mins away) to rest.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 2-3:</strong> Transfer to Sigiriya Cultural Triangle. Climb Sigiriya Lion Rock and visit the ancient ruins of Polonnaruwa.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">4</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 4:</strong> Travel south to misty Kandy. Visit Temple of the Sacred Tooth Relic and Royal Botanical Gardens.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">5</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 5:</strong> Catch the world-famous Kandy-to-Ella scenic blue train. Hike Ella Rock or visit Nine Arch Bridge.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">6</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 6-7:</strong> Transfer to Southern Galle Dutch Fort. Relax on beaches and return to Colombo for shopping before your flight back to Hyderabad.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-luxury-gold/10 text-center">
              <Link 
                to="/sri-lanka-7-day-itinerary"
                className="text-xs font-mono font-bold text-luxury-green hover:text-luxury-gold transition-colors inline-flex items-center gap-1.5 underline"
              >
                Access Full Daily Itinerary Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* H2: Plan Your Trip (CTA) */}
        <section id="cta-planner" className="bg-luxury-green rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl mb-16">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.15] opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#fcfbf7] font-bold mb-4">
              Plan Your Trip to Sri Lanka Today
            </h2>
            <p className="text-sm sm:text-base text-luxury-cream/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Skip generic, expensive tour packages! Use our interactive, free, and incredibly intelligent Ceylon Travel Planner tool to estimate a highly customized holiday budget based on your dates, hotel types, and flight preferences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                id="planner-c-cta"
                onClick={() => handleCtaClick("hyd_cta_planner_bottom")}
                className="px-8 py-4 bg-luxury-gold hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg"
              >
                Go to Trip Planner <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="wa-c-cta"
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
              <Link to="/sri-lanka-trip-cost-from-india" className="hover:text-luxury-gold transition-colors underline">Trip Cost From India</Link>
              <span>•</span>
              <Link to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" className="hover:text-luxury-gold transition-colors underline">Chennai Guide</Link>
              <span>•</span>
              <Link to="/sri-lanka-trip-cost-from-bangalore" className="hover:text-luxury-gold transition-colors underline">Bangalore Guide</Link>
            </div>
          </div>
        </section>

        {/* H2: Custom FAQ Accordion */}
        <section id="faq-section" className="scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif text-luxury-green font-bold mb-6 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white border border-luxury-gold/15 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-luxury-green hover:bg-[#fdfaf2] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-luxury-gold shrink-0 transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 border-t border-luxury-gold/5 text-xs sm:text-sm text-luxury-black/75 leading-relaxed font-light bg-[#fcfbf7]/40">
                        {item.a}
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
