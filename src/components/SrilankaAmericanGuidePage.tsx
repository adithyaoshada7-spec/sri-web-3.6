import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  Calendar, 
  DollarSign, 
  Globe, 
  MapPin, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  Sun, 
  CloudRain, 
  Info, 
  Clock, 
  Map, 
  Navigation,
  CheckCircle,
  AlertCircle,
  Plane,
  Shield,
  Briefcase,
  Layers
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaAmericanGuidePage() {
  usePageMetadata({
    title: "Sri Lanka Travel Guide for Americans (2026) | Plan Sri Lanka",
    description: "The complete Sri Lanka travel guide for US citizens. Learn about the free 30-day visa, flight options, dual monsoon weather, itineraries, costs, and safety guidelines.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-travel-guide-for-americans",
    ogUrl: "https://plan-srilanka.com/sri-lanka-travel-guide-for-americans",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Lead capture state
  const [leadForm, setLeadForm] = useState({
    travelDates: "",
    budget: "luxury",
    travelStyle: "couple",
    departureCity: "New York",
    whatsapp: "",
    agreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whatsapp || !leadForm.travelDates) return;

    setIsSubmitting(true);
    trackEvent("us_guide_lead_form_submit_start", "conversion", leadForm.travelStyle);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent("us_guide_lead_form_submit_success", "conversion", leadForm.travelStyle);
    }, 1200);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      {/* Schema Markup for SEO */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Sri Lanka Travel Guide for Americans (2026)",
            "description": "Comprehensive travel guide for United States citizens visiting Sri Lanka in 2026. Covers flight routes, free visas, weather, 7-day and 10-day itineraries, costs, and safety.",
            "url": "https://plan-srilanka.com/sri-lanka-travel-guide-for-americans",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            }
          })}
        </script>
      </>

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#1e3a2f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            2026 Elite Curated Resource Hub
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white leading-tight max-w-4xl mx-auto">
            Sri Lanka Travel Guide for Americans <span className="text-[#d4af37] italic font-normal">(2026)</span>
          </h1>
          
          <p className="text-sm md:text-xl text-[#a3bfae] font-light max-w-3xl mx-auto leading-relaxed">
            The definitive planning handbook for United States passport holders. Maximize your dollar advantage, navigate seasonal monsoons, and organize a breathtaking tropical getaway.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#why-americans"
              className="px-6 py-3 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full shadow-lg transition-all"
            >
              Why Sri Lanka
            </a>
            <a
              href="#visa-guide"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-full border border-white/10 transition-all"
            >
              Visa & Flights
            </a>
            <a
              href="#weather-timing"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-full border border-white/10 transition-all"
            >
              Weather & Best Time
            </a>
            <a
              href="#itineraries"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-full border border-[#d4af37]/30 transition-all text-[#d4af37]"
            >
              7 & 10-Day Routes
            </a>
          </div>
        </div>
      </section>

      {/* STICKY INTERNAL LINKING ANCHOR BAR */}
      <section className="sticky top-[80px] bg-white/95 backdrop-blur-md z-30 border-b border-[#1e3a2f]/5 shadow-sm overflow-x-auto scrollbar-none py-4">
        <div className="max-w-7xl mx-auto px-6 flex gap-3 whitespace-nowrap text-xs">
          <Link to="/things-to-do-in-sri-lanka" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all flex items-center gap-1">
            ⭐ Things to Do (Authority Hub)
          </Link>
          <Link to="/sri-lanka-7-day-itinerary" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all">
            📅 7-Day Itinerary
          </Link>
          <Link to="/where-to-go-in-sri-lanka-in-june" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all">
            🌦️ Sri Lanka in June
          </Link>
          <Link to="/best-time-to-visit-sri-lanka" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all">
            ☀️ Best Time to Visit
          </Link>
          <Link to="/sri-lanka-trip-cost-from-india" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all">
            💵 Sri Lanka Trip Cost
          </Link>
          <Link to="/sri-lanka-visa-for-indians" className="px-4 py-2 bg-[#1e3a2f] text-white hover:bg-[#d4af37] hover:text-black font-bold uppercase tracking-wider rounded-xl transition-all">
            🛂 Visa Guide
          </Link>
        </div>
      </section>

      {/* SECTION: WHY AMERICANS LOVE SRI LANKA */}
      <section id="why-americans" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* AI-friendly GEO-optimized Quick Summary */}
          <div className="p-6 md:p-8 bg-[#fcfbf7] border border-[#d4af37]/30 rounded-3xl space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]" />
            <div className="pl-2 space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Quick AI Travel Summary
              </span>
              <p className="text-sm text-[#1a2d24] font-medium leading-relaxed">
                Sri Lanka is an affordable destination for American travelers, offering beaches, wildlife safaris, UNESCO heritage sites, scenic train journeys, tea plantations, surfing, and cultural experiences. Most visitors spend 7–14 days exploring Colombo, Sigiriya, Kandy, Ella, Yala National Park, Mirissa, and Galle.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">Introduction</span>
            <h2 className="text-3xl font-serif text-[#1e3a2f]">Why Americans Love Sri Lanka</h2>
            <hr className="w-16 border-[#d4af37] border-2" />
          </div>

          <div className="text-base md:text-lg leading-relaxed text-[#1a2d24]/90 font-light space-y-6">
            <p>
              For decades, American globetrotters seeking exotic South Asian experiences flocked almost exclusively to India, Thailand, or Bali. However, <strong>Sri Lanka</strong> has emerged as the ultimate alternative for travelers who crave deep cultural history, dynamic wildlife, and pristine beaches without the heavy crowds. 
            </p>
            <p>
              Sri Lanka is incredibly compact. It has a geographic footprint roughly comparable to <strong>West Virginia</strong>, yet within its borders lies an array of distinct ecosystems that would span entire regions in the United States. You can easily hike through the misty, cool pine forests of the <strong>Central Highlands</strong> in the morning and lounge on a sun-drenched, palm-fringed tropical beach by late afternoon.
            </p>
            <p>
              Furthermore, the <strong>purchasing power advantage</strong> of the US Dollar (USD) is immense in Sri Lanka. Exceptional colonial tea plantations in the beautiful <strong>Tea Country</strong>, private oceanfront luxury bungalows, five-star boutique hotels, and dedicated English-speaking private chauffeurs are all highly accessible for a fraction of what they would cost in Europe, Hawaii, or the Caribbean.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: DO US CITIZENS NEED A VISA? */}
      <section id="visa-guide" className="py-20 px-4 md:px-8 bg-[#f5f4ef] border-y border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">Border Entry Requirements</span>
            <h2 className="text-3xl font-serif text-[#1e3a2f]">Do US Citizens Need a Visa?</h2>
            <hr className="w-16 border-[#d4af37] border-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-sm text-[#1a2d24]/80 leading-relaxed font-light">
              <p>
                <strong>Yes, but there is incredible news for 2026.</strong> American passport holders require an entry authorization, but under the updated Sri Lankan Visa scheme, the government has introduced a <strong>free 30-day Electronic Travel Authorization (ETA)</strong> for citizens of multiple countries, including the United States.
              </p>
              <p>
                This means you can easily apply online prior to your flight departure without paying any visa processing fees. The authorization is linked directly to your passport number, enabling a seamless transition through the immigration gates at <strong>Bandaranaike International Airport (BIA)</strong> in Colombo.
              </p>
              <div className="pt-2">
                <Link 
                  to="/sri-lanka-visa-for-indians" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3a2f] border-b border-[#1e3a2f] hover:text-[#d4af37] hover:border-[#d4af37] uppercase tracking-wider"
                >
                  Read our full step-by-step Visa guide →
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#1e3a2f]/10 space-y-4">
              <h4 className="font-bold font-serif text-[#1e3a2f] text-sm">Key Requirements at Immigration:</h4>
              <ul className="space-y-3 text-xs text-[#1a2d24]/70 font-light">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A US passport valid for at least <strong>6 months</strong> beyond your arrival date.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A printed copy of your approved <strong>Free 30-day Tourist ETA</strong> confirmation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Proof of an outbound return flight ticket home or to a third country.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: HOW TO FLY FROM THE USA */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">Aviation Pathways</span>
            <h2 className="text-3xl font-serif text-[#1e3a2f]">How to Fly from the USA to Colombo</h2>
            <hr className="w-16 border-[#d4af37] border-2" />
          </div>

          <p className="text-sm md:text-base text-[#1a2d24]/80 leading-relaxed font-light">
            While there are no direct, non-stop commercial flights connecting the United States directly to Sri Lanka's primary gateway, <strong>Bandaranaike International Airport (BIA)</strong>, getting there is remarkably straightforward via award-winning single-stop layovers:
          </p>

          <div className="grid sm:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 text-center">
              <Plane className="w-6 h-6 text-[#1e3a2f] mx-auto mb-3" />
              <h4 className="font-bold text-xs text-[#1e3a2f] uppercase mb-1">Middle East Airlines</h4>
              <p className="text-[11px] text-[#1a2d24]/70 leading-relaxed">
                Qatar Airways (via Doha) or Emirates (via Dubai). Highly recommended for supreme business-class suites (Qsuites) and smooth connections.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 text-center">
              <Plane className="w-6 h-6 text-[#1e3a2f] mx-auto mb-3" />
              <h4 className="font-bold text-xs text-[#1e3a2f] uppercase mb-1">European Gateways</h4>
              <p className="text-[11px] text-[#1a2d24]/70 leading-relaxed">
                SriLankan Airlines flies direct non-stop from London Heathrow (LHR) and Paris (CDG). British Airways operates seasonal routes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 text-center">
              <Plane className="w-6 h-6 text-[#1e3a2f] mx-auto mb-3" />
              <h4 className="font-bold text-xs text-[#1e3a2f] uppercase mb-1">Asian Connections</h4>
              <p className="text-[11px] text-[#1a2d24]/70 leading-relaxed">
                Singapore Airlines (via Changi) or Cathay Pacific (via Hong Kong) are ideal routing choices for travelers departing from the US West Coast (LAX, SFO).
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: BEST TIME TO VISIT SRI LANKA */}
      <section id="weather-timing" className="py-20 px-4 md:px-8 bg-[#f5f4ef] border-t border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">Seasonal Wisdom</span>
            <h2 className="text-3xl font-serif text-[#1e3a2f]">Best Time to Visit Sri Lanka</h2>
            <hr className="w-16 border-[#d4af37] border-2" />
          </div>

          <div className="space-y-6 text-sm md:text-base text-[#1a2d24]/80 leading-relaxed font-light">
            <p>
              When planning your vacation, identifying the <strong>sri lanka best time to visit</strong> is crucial. Because of the island's unique geographical topography, there is a dry, sunny coast to explore during any month of the year—provided you follow the monsoonal patterns.
            </p>
            
            {/* June Weather Box */}
            <div className="bg-white p-6 rounded-3xl border border-[#1e3a2f]/10 space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1e3a2f] flex items-center gap-2">
                <Sun className="w-5 h-5 text-[#d4af37]" />
                what's the weather like in sri lanka in june?
              </h4>
              <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed">
                A massive volume of US travelers ask this question due to summer vacation blocks. In June, the Southwest Monsoon (Yala monsoon) dampens the southern beaches (Unawatuna, Mirissa) and western coast (Colombo, Bentota) with frequent heavy downpours and high ocean swells. 
              </p>
              <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed">
                However, the East Coast (Trincomalee, Nilaveli, Passikudah) is gloriously sunny, dry, and hot, while the Cultural Triangle is completely dry. If you build a custom <strong>sri lanka itinerary in june</strong>, simply focus your routing on the East Coast and North Central plains to find the absolute <strong>best places to visit in sri lanka in june</strong>.
              </p>
              <div className="pt-2">
                <Link 
                  to="/where-to-go-in-sri-lanka-in-june" 
                  className="text-xs text-[#d4af37] hover:text-[#1e3a2f] font-mono font-bold uppercase tracking-wider border-b border-[#d4af37] hover:border-[#1e3a2f]"
                >
                  Explore our complete June Travel Guide →
                </Link>
              </div>
            </div>

            {/* August Weather Box */}
            <div className="bg-white p-6 rounded-3xl border border-[#1e3a2f]/10 space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1e3a2f] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#d4af37]" />
                Planning for August
              </h4>
              <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed">
                If you are planning a <strong>sri lanka itinerary in august</strong>, you will enjoy a beautiful seasonal "monsoon lull". August is a highly popular dry interval offering perfect beach weather on the East Coast, sunny trails in the Central Highlands, and spectacular events. August is also home to the 10-day <em>Kandy Esala Perahera</em>, featuring massive parading dancers, drummers, and cultural grandeur.
              </p>
            </div>

            <div className="pt-2 text-center">
              <Link 
                to="/best-time-to-visit-sri-lanka" 
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1e3a2f] border-b border-[#1e3a2f] hover:text-[#d4af37] hover:border-[#d4af37]"
              >
                Access our master 12-Month weather matrix →
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: 7-DAY & 10-DAY ITINERARIES */}
      <section id="itineraries" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">Master Itineraries</span>
            <h2 className="text-3xl font-serif text-[#1e3a2f]">7-Day vs. 10-Day Travel Blueprints</h2>
            <hr className="w-16 border-[#d4af37] border-2" />
          </div>

          {/* 7-DAY ITINERARY OUTLINE */}
          <div className="p-8 rounded-[32px] bg-[#1e3a2f] text-white space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
              <Layers className="w-64 h-64 rotate-12" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#d4af37] font-bold uppercase">Option A: The 1-Week Classic Sampler</span>
              <h3 className="text-2xl font-serif">The Classic 7-Day Sri Lanka Itinerary</h3>
              <p className="text-xs md:text-sm text-[#a3bfae] leading-relaxed font-light">
                If you are short on vacation days, a <strong>7 day sri lanka itinerary</strong> or a highly optimized <strong>7 day itinerary sri lanka</strong> is the gold standard template. This highly efficient loop is designed as a premier <strong>itinerary for sri lanka for 7 days</strong>, ensuring you see the core highlights without burning out behind the wheel.
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-4">
              <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">The Route Breakdown:</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-light text-[#a3bfae]">
                <div>
                  <span className="font-bold text-white block">Day 1: Negombo Beach</span>
                  Land in Colombo at <strong>Bandaranaike International Airport (BIA)</strong>, 20-min airport transfer to Negombo beach resort.
                </div>
                <div>
                  <span className="font-bold text-white block">Day 2: Sigiriya Lion Rock & Cultural Triangle</span>
                  Enter the famous <strong>Cultural Triangle</strong>. Explore King Kassapa's ancient 5th-century volcanic citadel, one of Sri Lanka's prized <strong>UNESCO World Heritage sites</strong>.
                </div>
                <div>
                  <span className="font-bold text-white block">Day 3: Sacred City of Kandy</span>
                  Visit the Dambulla Cave Temple (another magnificent UNESCO site) en route, followed by Kandy's Temple of the Tooth.
                </div>
                <div>
                  <span className="font-bold text-white block">Day 4: Scenic Ella Train Ride</span>
                  Ride the world's most scenic blue train through emerald highland tea valleys of the gorgeous <strong>Tea Country</strong>.
                </div>
                <div>
                  <span className="font-bold text-white block">Day 5: Wilderness Game Safari</span>
                  Jeep safari in Udawalawe or Yala National Park tracking wild herds of Asian elephants.
                </div>
                <div>
                  <span className="font-bold text-white block">Day 6 & 7: Galle Dutch Fort & Southern Expressway</span>
                  Stroll the seaside ramparts, boutique hotels, and colonial alleys of Galle Fort (UNESCO site), then return swiftly to BIA via the modern <strong>Southern Expressway</strong>.
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-mono">
              <Link 
                to="/sri-lanka-7-day-itinerary" 
                className="px-5 py-2.5 bg-white text-black font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4af37] transition-all"
              >
                Read detailed Day-by-Day 7-day Route →
              </Link>
              <span className="text-white/60 py-2">Optimized for <strong>sri lanka itinerary 7 days</strong> & <strong>sri lanka in 7 days</strong> searches.</span>
            </div>
          </div>

          {/* 10-DAY ITINERARY OUTLINE */}
          <div className="p-8 rounded-[32px] bg-[#f5f4ef] border border-[#1e3a2f]/10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#d4af37] font-bold uppercase">Option B: The Ideal Depth Loop</span>
              <h3 className="text-2xl font-serif text-[#1e3a2f]">The Breathtaking 10-Day Sri Lanka Itinerary</h3>
              <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                If your flight schedule allows for three extra days, we strongly advocate for a 10-day route. This gives you extra breathing room to hike, dive, or enjoy a luxurious tea estate stay without packing bags every morning.
              </p>
            </div>

            <div className="border-t border-[#1e3a2f]/10 pt-4 space-y-4">
              <h4 className="font-serif font-bold text-sm text-[#1e3a2f] uppercase tracking-wider">The Extended Route:</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-light text-[#1a2d24]/80">
                <div>
                  <span className="font-bold text-[#1e3a2f] block">Days 1 - 3: The Cultural Triangle & UNESCO Fortresses</span>
                  Base yourself in Sigiriya at the heart of the <strong>Cultural Triangle</strong>. Explore the Sigiriya Lion Rock citadel and Polonnaruwa, both prestigious <strong>UNESCO World Heritage sites</strong>.
                </div>
                <div>
                  <span className="font-bold text-[#1e3a2f] block">Days 4 - 5: Highland Peaks & Tea Country (Ella)</span>
                  Ride the scenic railway into the misty <strong>Tea Country</strong>, hike Ella Rock, photograph the iconic Nine Arch Bridge, and tour a traditional Ceylon tea estate.
                </div>
                <div>
                  <span className="font-bold text-[#1e3a2f] block">Days 6 - 7: Deep Wilderness Safari (Yala)</span>
                  Spend two nights glamping in Yala National Park for maximum leopard tracking chances and pristine coastal dune walks.
                </div>
                <div>
                  <span className="font-bold text-[#1e3a2f] block">Days 8 - 10: Golden Southern Coast & Southern Expressway</span>
                  Savor the slow lifestyle of Mirissa or Galle. Walk Galle's colonial streets (UNESCO site), learn to surf, and return seamlessly to Colombo via the high-speed <strong>Southern Expressway</strong>.
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <a 
                href="#june-form" 
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#1e3a2f] border-b border-[#1e3a2f] hover:text-[#d4af37] hover:border-[#d4af37]"
              >
                Let our team map your custom 10-day loop for free →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: BEST THINGS TO DO (INTERNAL LINKING FOCUS) */}
      <section className="py-20 px-4 md:px-8 bg-[#f5f4ef] border-y border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">Signature Experiences</span>
            <h2 className="text-3xl font-serif text-[#1e3a2f]">Best Things to Do in Sri Lanka</h2>
            <hr className="w-16 border-[#d4af37] border-2" />
          </div>

          <p className="text-sm md:text-base text-[#1a2d24]/80 leading-relaxed font-light">
            Sri Lanka packs an unbelievable variety of adventure and culture into its borders. To plan your perfect trip, we have compiled an exhaustive, beautifully detailed list of the island's ultimate bucket-list experiences:
          </p>

          {/* Large Authority Inter-link Callout Card */}
          <div className="p-8 rounded-[32px] bg-white border border-[#1e3a2f]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="px-2.5 py-1 bg-amber-50 text-[#d4af37] border border-amber-100 rounded-lg text-[10px] font-mono uppercase tracking-widest font-bold inline-block">
                ★ Primary Authority Guide
              </span>
              <h4 className="font-serif text-xl md:text-2xl text-[#1e3a2f] font-bold">
                Things to Do in Sri Lanka: Elite Curated Experiences
              </h4>
              <p className="text-xs text-[#1a2d24]/70 leading-relaxed font-light">
                Discover the 15 ultimate activities—from trackable Yala leopard safaris and tea field high-teas to hidden turquoise horseshoe coves, rural cooking classes, and free walking trails.
              </p>
            </div>
            
            <Link 
              to="/things-to-do-in-sri-lanka" 
              className="px-6 py-4 bg-[#1e3a2f] text-white hover:bg-[#d4af37] hover:text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all text-center whitespace-nowrap group"
            >
              <span>Explore All Things to Do</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform inline ml-2" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION: COSTS FOR AMERICAN TRAVELERS */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">Financial Strategy</span>
            <h2 className="text-3xl font-serif text-[#1e3a2f]">Costs & Budgeting for American Travelers</h2>
            <hr className="w-16 border-[#d4af37] border-2" />
          </div>

          <div className="text-sm md:text-base text-[#1a2d24]/80 leading-relaxed font-light space-y-4">
            <p>
              Your dollar goes incredibly far in Sri Lanka, making it an outstanding destination for high-end experiences on a moderate budget. While local curries are almost free ($3 - $5), primary costs derive from high-quality private transport and major park entrance ticket fees (such as Sigiriya at $36, and Yala national park jeep hire).
            </p>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10">
                <span className="font-bold text-[#1e3a2f] text-xs block mb-1">Elite Luxury Chauffeur Daily</span>
                <span className="font-serif text-[#d4af37] text-lg font-bold block mb-2">$85 - $130 per day</span>
                <p className="text-[11px] text-[#1a2d24]/70 leading-relaxed">
                  Covers a pristine, air-conditioned late-model SUV, all gasoline, highway tolls, parking fees, and a dedicated, vetted professional English-speaking driver-guide.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10">
                <span className="font-bold text-[#1e3a2f] text-xs block mb-1">5-Star Boutique Hotels & Villas</span>
                <span className="font-serif text-[#d4af37] text-lg font-bold block mb-2">$150 - $350 per night</span>
                <p className="text-[11px] text-[#1a2d24]/70 leading-relaxed">
                  Breathtaking properties featuring infinity pools overlooking tea plantations, historic colonial planters' bungalows, or ocean-facing beach suites.
                </p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <Link 
                to="/sri-lanka-trip-cost-from-india" 
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#1e3a2f] border-b border-[#1e3a2f] hover:text-[#d4af37] hover:border-[#d4af37]"
              >
                Access our detailed budgeting & cost calculator →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: SAFETY & PACKING */}
      <section className="py-20 px-4 md:px-8 bg-[#f5f4ef] border-t border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Safety */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Is Sri Lanka Safe for US Travelers?</h3>
              </div>
              <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                <strong>Yes, Sri Lanka is exceptionally safe.</strong> Sri Lankan culture is deeply rooted in hospitality and respect. Violent crime against tourists is extremely rare. Travelers routinely experience friendly locals welcoming them warmly. 
              </p>
              <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                As with any destination, simple traveler common sense applies: keep track of personal belongings on busy public trains, lock in fixed fares on the PickMe app rather than hailing unmetered tuk-tuks, and respect local temple customs.
              </p>
            </div>

            {/* Packing List */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Packing Essentials</h3>
              </div>
              <ul className="space-y-2 text-xs md:text-sm text-[#1a2d24]/80 font-light">
                <li>• <strong>Light linen clothing</strong> for hot, humid coastal and plains regions.</li>
                <li>• <strong>A light jacket or sweater</strong> for chilly, windy highland towns like Nuwara Eliya and Ella.</li>
                <li>• <strong>Modest temple attire</strong> (clothing that covers shoulders and knees completely; white colors are preferred).</li>
                <li>• <strong>Slip-on shoes</strong> (since you must remove shoes to enter temple grounds; paths get extremely hot under direct sun).</li>
                <li>• A reliable universal travel plug adapter (Sri Lanka primarily uses Type G and D outlets).</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="june-form" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#fcfbf7] border-2 border-[#1e3a2f]/10 p-8 md:p-12 rounded-[40px] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#d4af37]" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold block">
                  Custom Travel Architecture
                </span>
                <h3 className="text-2xl md:text-4xl font-serif text-[#1e3a2f] leading-tight">
                  Design Your Dream Vacation
                </h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/70 leading-relaxed font-light">
                  Skip the endless planning logs and forum chains. Tell us your travel window, and we will formulate a curated, stress-free route matching hotels and custom private car transport perfectly.
                </p>

                <div className="space-y-3 text-xs text-[#1a2d24]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free personalized route structure & options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vetted, highly rated private SUV chauffeurs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exclusive boutique resort rates & reserved 1st class rail seats</span>
                  </div>
                </div>
              </div>

              <div>
                {!formSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f] mb-1">
                        When are you planning to visit?
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., June 2026, August 2026, December"
                        value={leadForm.travelDates}
                        onChange={(e) => setLeadForm({...leadForm, travelDates: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-[#1e3a2f]/10 rounded-xl text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f] mb-1">
                          Luxury Tier
                        </label>
                        <select 
                          value={leadForm.budget}
                          onChange={(e) => setLeadForm({...leadForm, budget: e.target.value})}
                          className="w-full px-3 py-3 bg-white border border-[#1e3a2f]/10 rounded-xl text-xs focus:outline-none"
                        >
                          <option value="elite">Ultra-Luxury</option>
                          <option value="luxury">Boutique Luxury</option>
                          <option value="premium">Premium Comfort</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f] mb-1">
                          Departure City (US)
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g., JFK, LAX"
                          value={leadForm.departureCity}
                          onChange={(e) => setLeadForm({...leadForm, departureCity: e.target.value})}
                          className="w-full px-3 py-3 bg-white border border-[#1e3a2f]/10 rounded-xl text-xs focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f] mb-1">
                        Your WhatsApp / Phone Number (For PDF Itinerary)
                      </label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g., +1 555-123-4567"
                        value={leadForm.whatsapp}
                        onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-[#1e3a2f]/10 rounded-xl text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#1e3a2f] hover:bg-[#d4af37] text-white hover:text-black font-bold uppercase text-xs tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Generating Custom Blueprint..." : "Receive My Free Travel Guide Blueprint"}
                    </button>

                    <p className="text-[9px] text-[#1a2d24]/50 leading-relaxed text-center">
                      By submitting, you consent to our travel concierge reaching out via WhatsApp/Email to share custom pricing. We never spam.
                    </p>
                  </form>
                ) : (
                  <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-emerald-950">Thank You, Traveler!</h4>
                    <p className="text-xs text-emerald-800 leading-relaxed font-light">
                      Your custom Sri Lanka holiday outline has been registered. Our expert team is reviewing your flight options from <strong>{leadForm.departureCity}</strong> and will reach out via WhatsApp shortly to share your customized plan!
                    </p>
                    <a 
                      href="https://wa.me/94722968210" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 hover:underline"
                    >
                      Connect Immediately on WhatsApp <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SEO FAQS SEGMENT */}
      <section className="py-20 px-4 md:px-8 bg-[#f5f4ef] border-t border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            
            {/* FAQ 1 */}
            <div className="border border-[#1e3a2f]/10 rounded-2xl bg-white overflow-hidden">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-[#1e3a2f]/5 transition-all"
              >
                <span className="font-serif font-bold text-sm md:text-base text-[#1e3a2f]">
                  How can I customize a sri lanka itinerary in june?
                </span>
                <span className="text-[#d4af37] text-xl font-bold ml-4">{activeFaq === 1 ? "−" : "+"}</span>
              </button>
              {activeFaq === 1 && (
                <div className="p-6 pt-0 border-t border-[#1e3a2f]/5 text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light space-y-3 bg-white">
                  <p>
                    To execute an absolute masterclass <strong>sri lanka itinerary in june</strong>, you must build your route around dry zones. Instead of heading straight to Galle Fort and the southern beaches after Ella, turn north-east from Ella toward Arugam Bay (supreme world-class surfing) or Nilaveli Beach in Trincomalee. 
                  </p>
                  <p>
                    This lets you capture the absolute <strong>best places to visit in sri lanka in june</strong>, preserving dry days, calm azure ocean waters, and glorious sunshine.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border border-[#1e3a2f]/10 rounded-2xl bg-white overflow-hidden">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-[#1e3a2f]/5 transition-all"
              >
                <span className="font-serif font-bold text-sm md:text-base text-[#1e3a2f]">
                  Is a sri lanka itinerary 7 days long enough for first-timers?
                </span>
                <span className="text-[#d4af37] text-xl font-bold ml-4">{activeFaq === 2 ? "−" : "+"}</span>
              </button>
              {activeFaq === 2 && (
                <div className="p-6 pt-0 border-t border-[#1e3a2f]/5 text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light space-y-3 bg-white">
                  <p>
                    Yes! A <strong>sri lanka itinerary 7 days</strong> long is absolutely perfect to sample the core experiences. Because Sri Lanka's cultural triangle, central highlands, and coastal fortresses are highly compact, you don't spend days flying between cities.
                  </p>
                  <p>
                    While we also offer comprehensive 10-day and 12-day packages, this curated week-long loop remains the most popular luxury sampler for US professionals with tight vacation structures.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border border-[#1e3a2f]/10 rounded-2xl bg-white overflow-hidden">
              <button 
                onClick={() => toggleFaq(3)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-[#1e3a2f]/5 transition-all"
              >
                <span className="font-serif font-bold text-sm md:text-base text-[#1e3a2f]">
                  What are the key elements of a great sri lanka itinerary in august?
                </span>
                <span className="text-[#d4af37] text-xl font-bold ml-4">{activeFaq === 3 ? "−" : "+"}</span>
              </button>
              {activeFaq === 3 && (
                <div className="p-6 pt-0 border-t border-[#1e3a2f]/5 text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light space-y-3 bg-white">
                  <p>
                    If you plan a <strong>sri lanka itinerary in august</strong>, the supreme highlight is the legendary Esala Perahera in Kandy—a cultural spectacle of dancers, drummers, and fire-breathers. August enjoys fabulous weather, with the dry monsoon lull opening up beautiful sunny days on the south-west and east coasts.
                  </p>
                  <p>
                    August is a peak travel window for families and couples alike, offering ideal climate conditions across nearly all major national parks and coastal resorts.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="border border-[#1e3a2f]/10 rounded-2xl bg-white overflow-hidden">
              <button 
                onClick={() => toggleFaq(4)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-[#1e3a2f]/5 transition-all"
              >
                <span className="font-serif font-bold text-sm md:text-base text-[#1e3a2f]">
                  Can you recommend a premium chauffeur service?
                </span>
                <span className="text-[#d4af37] text-xl font-bold ml-4">{activeFaq === 4 ? "−" : "+"}</span>
              </button>
              {activeFaq === 4 && (
                <div className="p-6 pt-0 border-t border-[#1e3a2f]/5 text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light space-y-3 bg-white">
                  <p>
                    Absolutely. Driving in Sri Lanka can be highly stressful for foreigners due to busy roads and narrow mountain passes. Hiring a private chauffeur with an air-conditioned premium SUV is the standard choice for our luxury clients. 
                  </p>
                  <p>
                    It gives you absolute flexibility to modify stops on your <strong>7 day itinerary sri lanka</strong> on the fly, with fluent English-speaking guides explaining the deep rich histories of each site.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Final CTA Back to Home */}
          <div className="pt-8 text-center">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-serif font-bold text-[#1e3a2f] hover:text-[#d4af37] transition-colors group"
            >
              ← Back to Travel Guides Hub <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
