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
  AlertCircle
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaAmericanItineraryPage() {
  usePageMetadata({
    title: "7-Day Sri Lanka Itinerary for American Travelers | 2026 Guide",
    description: "The ultimate 7-day Sri Lanka itinerary optimized for US travelers. Maximize your dollar purchasing power, explore ancient ruins, take scenic trains, and experience safaris under the new free visa scheme.",
    canonicalUrl: "https://plan-srilanka.com/american-sri-lanka-itinerary",
    ogUrl: "https://plan-srilanka.com/american-sri-lanka-itinerary"
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
    trackEvent("us_itinerary_lead_form_submit_start", "conversion", leadForm.travelStyle);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent("us_itinerary_lead_form_submit_success", "conversion", leadForm.travelStyle);
      
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
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
            "@type": "BlogPosting",
            "headline": "The Ultimate 7-Day Sri Lanka Itinerary for American Travelers: Luxury, Culture, & Coastline",
            "description": "A comprehensive, search-intent-optimized travel itinerary for United States travelers visiting Sri Lanka for 7 days. Features weather advice for June/August, budgeting hacks, and transit tips.",
            "image": [
              "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "author": {
              "@type": "Person",
              "name": "Luxury Travel Concierge Desk",
              "worksFor": {
                "@type": "Organization",
                "name": "Plan Sri Lanka"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "url": "https://plan-srilanka.com"
            },
            "datePublished": "2026-07-08T12:00:00Z",
            "dateModified": "2026-07-08T12:00:00Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/american-sri-lanka-itinerary"
            }
          })}
        </script>
      </>

      {/* HERO HERO SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#1e3a2f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            2026 US Passport Holders Special
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white leading-tight max-w-4xl mx-auto">
            The Curated <span className="text-[#d4af37] italic font-normal">7-Day</span> Sri Lanka Itinerary for American Travelers
          </h1>
          
          <p className="text-sm md:text-xl text-[#a3bfae] font-light max-w-3xl mx-auto leading-relaxed">
            Discover a country with incredible cultural depth and dynamic wildlife. Maximize your dollar purchasing advantage with a high-end private chauffeur, boutique villas, and seamless logistics.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#itinerary-core"
              className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-lg transition-all"
            >
              Skip to Day-by-Day Route
            </a>
            <a
              href="#weather-timing"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-full border border-white/10 transition-all"
            >
              View Monsoon & Weather Intel
            </a>
          </div>
        </div>
      </section>

      {/* QUICK STATS & INTRO / THE HOOK SECTION */}
      <section className="py-16 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* US Traveler Context Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1e3a2f]/5 p-6 rounded-3xl border border-[#1e3a2f]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Globe className="w-6 h-6 text-[#1e3a2f]" />
                </div>
                <h3 className="font-serif text-lg text-[#1e3a2f] font-bold mb-2">Compact & Diverse</h3>
                <p className="text-xs text-[#1a2d24]/80 leading-relaxed">
                  Roughly the geographic size of <strong>West Virginia</strong>, yet packed with climate zones, rainforests, and golden coastlines that would stretch across multiple US states.
                </p>
              </div>
            </div>

            <div className="bg-[#1e3a2f]/5 p-6 rounded-3xl border border-[#1e3a2f]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <DollarSign className="w-6 h-6 text-[#1e3a2f]" />
                </div>
                <h3 className="font-serif text-lg text-[#1e3a2f] font-bold mb-2">Purchasing Advantage</h3>
                <p className="text-xs text-[#1a2d24]/80 leading-relaxed">
                  The US dollar possesses immense purchasing power in Sri Lanka. Ultra-luxury colonial tea estates, private oceanfront villas, and dedicated chauffeurs are accessible at a fraction of standard European rates.
                </p>
              </div>
            </div>

            <div className="bg-[#1e3a2f]/5 p-6 rounded-3xl border border-[#1e3a2f]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Check className="w-6 h-6 text-[#1e3a2f]" />
                </div>
                <h3 className="font-serif text-lg text-[#1e3a2f] font-bold mb-2">Seamless Entry</h3>
                <p className="text-xs text-[#1a2d24]/80 leading-relaxed">
                  Under the updated <strong>2026 Sri Lankan Visa Scheme</strong>, US citizens are eligible for a free 30-day Electronic Travel Authorization (ETA), eliminating complex border paperwork.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-[#1e3a2f]/10" />

          {/* Deep Hook Paragraph */}
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#1a2d24]/90 font-light">
            <p>
              For American travelers, planning a trip to South Asia often comes with the dilemma of managing long flights and packed timelines. That is where Sri Lanka shines as an ultimate tropical jewel. By utilizing a highly structured <strong>7 day sri lanka itinerary</strong>, you can experience a profound blend of ancient UNESCO archaeological sites, mountainous tea fields, and raw big-game safaris, all within a reasonable flight transit.
            </p>
            <p>
              This expert guide outlines the absolute best ways to experience <strong>sri lanka in 7 days</strong>. It is designed to minimize travel fatigue, maximize your hard-earned vacation time, and ensure you stay on the dry side of the country's unique micro-climates.
            </p>
          </div>

        </div>
      </section>

      {/* WEATHER & MONSOON SECTION (TARGETING SEO INTENT) */}
      <section id="weather-timing" className="py-20 px-4 md:px-8 bg-[#f5f4ef]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">
              Meteorological Intelligence
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              Microclimates & The Sri Lanka Best Time to Visit
            </h2>
            <p className="text-sm text-[#1a2d24]/60 max-w-xl mx-auto">
              Sri Lanka is subject to two separate monsoons affecting opposing sides of the island. Picking your months correctly is key to a flawless trip.
            </p>
          </div>

          {/* Core Weather Box */}
          <div className="bg-white p-8 rounded-[32px] border border-[#1e3a2f]/10 space-y-8 shadow-sm">
            
            <div className="space-y-4">
              <h3 className="font-serif text-xl md:text-2xl text-[#1e3a2f] border-l-4 border-[#d4af37] pl-4 font-bold">
                what's the weather like in sri lanka in june?
              </h3>
              <p className="text-sm md:text-base text-[#1a2d24]/80 leading-relaxed font-light">
                This is one of the most common questions from summer travelers. In June, Sri Lanka's weather is highly split. The Southwest Monsoon is in full effect, meaning Colombo, Galle, and the southwest coast experience periodic, heavy tropical downpours and rough, non-swimmable ocean waves. 
              </p>
              <p className="text-sm md:text-base text-[#1a2d24]/80 leading-relaxed font-light">
                However, the East Coast (Trincomalee, Passikudah, Arugam Bay) and the Central Cultural Triangle (Sigiriya, Dambulla) are dry, sunny, and incredibly hot. If you are executing a <strong>sri lanka itinerary in june</strong>, simply swap the southern beaches for the stunning, calm shores of the East Coast to find the <strong>best places to visit in sri lanka in june</strong>.
              </p>
            </div>

            <hr className="border-[#1e3a2f]/10" />

            <div className="space-y-4">
              <h3 className="font-serif text-xl md:text-2xl text-[#1e3a2f] border-l-4 border-[#d4af37] pl-4 font-bold">
                Planning for August vs June
              </h3>
              <p className="text-sm md:text-base text-[#1a2d24]/80 leading-relaxed font-light">
                Understanding the <strong>sri lanka best time to visit</strong> depends heavily on your vacation schedule. If you plan a <strong>sri lanka itinerary in august</strong>, you will enjoy a marvelous weather lull. August is a fantastic transitional month where the southwest monsoon weakens, offering lovely dry days across the highlands and the east coast. It also aligns perfectly with the world-famous Kandy Esala Perahera festival, featuring majestic cultural parades.
              </p>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                <Sun className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs text-emerald-900 block">Dry Zone (East & North)</span>
                  <p className="text-xs text-emerald-800/80 leading-relaxed">
                    Sunny and perfect from May to September. Perfect for June or August beach getaways.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 flex items-start gap-3">
                <CloudRain className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs text-[#1e3a2f] block">Wet Zone (South & West)</span>
                  <p className="text-xs text-[#1a2d24]/80 leading-relaxed">
                    Sunny and dry from December to April. Expect late-afternoon monsoon downpours in June.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* THE CORE 7-DAY ROUTE */}
      <section id="itinerary-core" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">
              The Master Blueprint
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1e3a2f]">
              The Perfect 7 Day Itinerary Sri Lanka
            </h2>
            <p className="text-sm text-[#1a2d24]/60 max-w-2xl mx-auto">
              This classic loop is optimized to hit major high-intent highlights while managing travel fatigue. Designed as the ultimate <strong>itinerary for sri lanka for 7 days</strong>, it combines cultural heritage, high-elevation scenic trails, and coastal history.
            </p>
          </div>

          {/* Quick Route Summary Card */}
          <div className="bg-[#1e3a2f] text-white p-6 md:p-8 rounded-[32px] space-y-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
              <Map className="w-64 h-64 rotate-12" />
            </div>
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] font-bold uppercase">Route Quick-View</span>
              <h3 className="text-lg md:text-xl font-serif">Negombo → Sigiriya → Kandy → Ella → Udawalawe/Yala → Galle Fort</h3>
              <p className="text-xs text-[#a3bfae] max-w-2xl font-light">
                This loop is meticulously planned. Instead of spending 6 hours in a car daily, we split drives into manageable 2 to 3-hour increments. This makes it an ideal <strong>sri lanka itinerary 7 days</strong> template for travelers who want depth without feeling constantly on the move.
              </p>
            </div>
          </div>

          {/* DAY-BY-DAY TIMELINE */}
          <div className="space-y-12 relative before:absolute before:left-4 sm:before:left-1/2 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#1e3a2f]/10">
            
            {/* DAY 1 */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-8 sm:gap-16">
              <div className="sm:w-1/2 sm:text-right flex flex-col justify-center items-start sm:items-end order-2 sm:order-1">
                <span className="text-[#d4af37] font-mono text-xs font-bold uppercase tracking-widest block mb-2">Day 1</span>
                <h3 className="text-xl font-serif text-[#1e3a2f] font-bold mb-3">Arrive in Negombo (Jet Lag Recovery)</h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Land at Bandaranaike International Airport (BIA). Instead of facing a long, bumpy 2-hour drive into the chaotic city center of Colombo, your private chauffeur will whisk you 20 minutes north to the peaceful beachside town of Negombo. Check into a high-end coastal boutique hotel, sip on a fresh king coconut, and sleep off your 20-hour flight transition.
                </p>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1e3a2f] border-4 border-white flex items-center justify-center text-white text-xs font-bold z-10 order-1 sm:order-2">
                1
              </div>
              <div className="sm:w-1/2 order-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600" 
                    alt="Negombo beach coast" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* DAY 2 */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-8 sm:gap-16">
              <div className="sm:w-1/2 order-3 sm:order-1">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=600" 
                    alt="Sigiriya Rock Fortress" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1e3a2f] border-4 border-white flex items-center justify-center text-white text-xs font-bold z-10 order-1 sm:order-2">
                2
              </div>
              <div className="sm:w-1/2 flex flex-col justify-center items-start order-2">
                <span className="text-[#d4af37] font-mono text-xs font-bold uppercase tracking-widest block mb-2">Day 2</span>
                <h3 className="text-xl font-serif text-[#1e3a2f] font-bold mb-3">Ascend the Ancient Sigiriya Rock</h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Head inland into the cultural heart of the island. Sigiriya is a towering 660-foot granite citadel rising out of the dense jungle. Climb the 1,200 steps past ancient frescoes to reach the summit, where the ruins of King Kassapa's 5th-century palace await. In the afternoon, take a private jeep safari in adjacent Minneriya National Park to witness hundreds of wild Asian elephants gather around the ancient reservoir.
                </p>
              </div>
            </div>

            {/* DAY 3 */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-8 sm:gap-16">
              <div className="sm:w-1/2 sm:text-right flex flex-col justify-center items-start sm:items-end order-2 sm:order-1">
                <span className="text-[#d4af37] font-mono text-xs font-bold uppercase tracking-widest block mb-2">Day 3</span>
                <h3 className="text-xl font-serif text-[#1e3a2f] font-bold mb-3">Immerse in Spiritual Kandy</h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Drive south toward Kandy, the final royal capital of Sri Lanka's ancient kings. En route, stop at the mesmerizing Dambulla Cave Temple, a UNESCO world heritage site boasting over 150 gold-gilded Buddha statues carved directly into the rock. In Kandy, explore the sacred Temple of the Tooth Relic, which houses a legendary physical relic of the historical Buddha. Stroll around Kandy Lake and experience a traditional drum and dance performance.
                </p>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1e3a2f] border-4 border-white flex items-center justify-center text-white text-xs font-bold z-10 order-1 sm:order-2">
                3
              </div>
              <div className="sm:w-1/2 order-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=600" 
                    alt="Kandy Temple Lake" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* DAY 4 */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-8 sm:gap-16">
              <div className="sm:w-1/2 order-3 sm:order-1">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1563198804-b144dfc1661c?auto=format&fit=crop&q=80&w=600" 
                    alt="Ella Train View" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1e3a2f] border-4 border-white flex items-center justify-center text-white text-xs font-bold z-10 order-1 sm:order-2">
                4
              </div>
              <div className="sm:w-1/2 flex flex-col justify-center items-start order-2">
                <span className="text-[#d4af37] font-mono text-xs font-bold uppercase tracking-widest block mb-2">Day 4</span>
                <h3 className="text-xl font-serif text-[#1e3a2f] font-bold mb-3">The Scenic Train to Ella</h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Today is the crown jewel of highland travel. Board the iconic blue train from Kandy (or Nanu Oya) to Ella. It is widely considered one of the most scenic train journeys on Earth. Roll past rolling emerald tea fields, dramatic valleys, and tumbling waterfalls. Upon arriving in the charming, relaxed mountain town of Ella, enjoy a mild sunset hike up Little Adam's Peak for incredible panoramic views.
                </p>
              </div>
            </div>

            {/* DAY 5 */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-8 sm:gap-16">
              <div className="sm:w-1/2 sm:text-right flex flex-col justify-center items-start sm:items-end order-2 sm:order-1">
                <span className="text-[#d4af37] font-mono text-xs font-bold uppercase tracking-widest block mb-2">Day 5</span>
                <h3 className="text-xl font-serif text-[#1e3a2f] font-bold mb-3">Nine Arch Bridge & Safari Descent</h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Wake up early to photograph the architectural marvel of the Nine Arch Bridge as a train passes through the misty jungle canopy. Afterward, begin your descent from the cold mountain air down to the warm southern plains. Check into an eco-luxury glamping resort near Udawalawe or Yala National Park. Embark on a private 4x4 evening safari to search for majestic leopards, sloth bears, and crocodiles.
                </p>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1e3a2f] border-4 border-white flex items-center justify-center text-white text-xs font-bold z-10 order-1 sm:order-2">
                5
              </div>
              <div className="sm:w-1/2 order-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=600" 
                    alt="Wild elephant safari" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* DAY 6 */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-8 sm:gap-16">
              <div className="sm:w-1/2 order-3 sm:order-1">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&q=80&w=600" 
                    alt="Galle Fort Lighthouse" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1e3a2f] border-4 border-white flex items-center justify-center text-white text-xs font-bold z-10 order-1 sm:order-2">
                6
              </div>
              <div className="sm:w-1/2 flex flex-col justify-center items-start order-2">
                <span className="text-[#d4af37] font-mono text-xs font-bold uppercase tracking-widest block mb-2">Day 6</span>
                <h3 className="text-xl font-serif text-[#1e3a2f] font-bold mb-3">Colonial Charm at Galle Fort</h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Head to the historic south coast and enter the legendary Galle Fort, a 16th-century fortress built by the Portuguese and extensively fortified by the Dutch. Today, Galle Fort is an exquisite, car-free heritage enclave filled with boutique fashion labels, colonial cafes, luxury gemstone shops, and high-quality seafood dining. Walk the old stone ramparts by sunset and photograph the historic white lighthouse.
                </p>
              </div>
            </div>

            {/* DAY 7 */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-8 sm:gap-16">
              <div className="sm:text-right sm:w-1/2 flex flex-col justify-center items-start sm:items-end order-2 sm:order-1">
                <span className="text-[#d4af37] font-mono text-xs font-bold uppercase tracking-widest block mb-2">Day 7</span>
                <h3 className="text-xl font-serif text-[#1e3a2f] font-bold mb-3">Coastal Chilling & Airport Transfer</h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Spend your final morning walking along the gorgeous golden beaches of neighboring Unawatuna or Thalpe. Enjoy a beachfront brunch, pick up some last-minute souvenirs (such as Ceylon tea, hand-carved masks, or high-purity blue sapphires), and head back north along the smooth Southern Expressway directly to the airport (approx 2 hours) to board your outbound flight home.
                </p>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1e3a2f] border-4 border-white flex items-center justify-center text-white text-xs font-bold z-10 order-1 sm:order-2">
                7
              </div>
              <div className="sm:w-1/2 order-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=600" 
                    alt="Beach view Sri Lanka coast" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CORE ADVICE & TRANSIT TIPS SEGMENT */}
      <section className="py-20 px-4 md:px-8 bg-[#1e3a2f] text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono">
              Expert Travel Advice
            </span>
            <h2 className="text-2xl md:text-4xl font-serif">
              Crucial Logistical Tips for US Visitors
            </h2>
            <p className="text-xs md:text-sm text-[#a3bfae] font-light max-w-2xl leading-relaxed">
              When executing a fast-paced <strong>7 day sri lanka itinerary</strong> or an intensive <strong>itinerary for sri lanka for 7 days</strong>, navigating local systems efficiently is the difference between a pristine vacation and chaotic travel stress. Keep these tips in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
              <Navigation className="w-8 h-8 text-[#d4af37]" />
              <h4 className="font-bold font-serif text-sm">Download "PickMe"</h4>
              <p className="text-xs text-[#a3bfae] leading-relaxed font-light">
                PickMe is the local Uber equivalent. It is highly secure, lets you lock in fixed fares for tuk-tuks, and prevents any awkward roadside fare negotiations in city zones.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
              <DollarSign className="w-8 h-8 text-[#d4af37]" />
              <h4 className="font-bold font-serif text-sm">Currency & Cash</h4>
              <p className="text-xs text-[#a3bfae] leading-relaxed font-light">
                The local currency is the Sri Lankan Rupee (LKR). Always carry cash (bills under 1,000 LKR) for local cafes, driver tips, and national parks. Credit cards are accepted only in high-end hubs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
              <Clock className="w-8 h-8 text-[#d4af37]" />
              <h4 className="font-bold font-serif text-sm">Tipping Guidelines</h4>
              <p className="text-xs text-[#a3bfae] leading-relaxed font-light">
                Tipping is customary. For a private chauffeur, tipping $15 to $25 per day is standard for excellent service. Small tips of 100-200 LKR are appreciated for bag handlers.
              </p>
            </div>

          </div>

          {/* Visa CTA Reminder Box */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="font-bold font-serif text-lg">Reminder: Free 2026 Visa for US Citizens</h4>
              <p className="text-xs text-[#a3bfae] leading-relaxed max-w-xl font-light">
                Do not wait till arrival. Apply online at the official portal for your free 30-day Tourist ETA. Check out our step-by-step documentation to verify application rules.
              </p>
            </div>
            <Link 
              to="/sri-lanka-visa-for-indians" 
              className="px-6 py-3 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white transition-all whitespace-nowrap"
            >
              Read Visa Guidelines
            </Link>
          </div>

        </div>
      </section>

      {/* LEAD CONVERSIVE CAPTURE ZONE */}
      <section id="june-form" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#fcfbf7] border-2 border-[#1e3a2f]/10 p-8 md:p-12 rounded-[40px] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#d4af37]" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold block">
                  Bespoke Trip Creation
                </span>
                <h3 className="text-2xl md:text-4xl font-serif text-[#1e3a2f] leading-tight">
                  Let Our Experts Craft Your Perfect <span className="italic font-normal">7-Day</span> Itinerary
                </h3>
                <p className="text-xs md:text-sm text-[#1a2d24]/70 leading-relaxed font-light">
                  Skip the hours of confusing web research. Tell us your vacation dates and we will map out a customized luxury private car tour linking heritage, safaris, and sun-kissed coastlines flawlessly.
                </p>

                <div className="space-y-3 text-xs text-[#1a2d24]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free bespoke route optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vetted, fluent English-speaking private chauffeurs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hand-picked 5-star boutique hotels & villa bookings</span>
                  </div>
                </div>
              </div>

              <div>
                {!formSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f] mb-1">
                        When do you plan to travel?
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., June 2026, August 2026"
                        value={leadForm.travelDates}
                        onChange={(e) => setLeadForm({...leadForm, travelDates: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-[#1e3a2f]/10 rounded-xl text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f] mb-1">
                          Desired Luxury Tier
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
                          US Departure City
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
                        Your WhatsApp / Phone Number (For PDF Plan)
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
                      {isSubmitting ? "Generating Custom Itinerary..." : "Receive My Free Custom 7-Day Plan"}
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
                      Your premium 7-day Sri Lanka vacation outline has been registered. Our bespoke travel designers are reviewing your departure from <strong>{leadForm.departureCity}</strong> and will reach out on WhatsApp within 2-3 hours with your custom optimized itinerary!
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

      {/* COMPREHENSIVE SEO FAQ SEGMENT */}
      <section className="py-20 px-4 md:px-8 bg-[#f5f4ef] border-t border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              US Travelers Planning Guide & FAQs
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
