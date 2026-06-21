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
  ShieldAlert,
  Smartphone,
  Navigation,
  Map,
  Sparkles,
  TrendingUp,
  Heart,
  Users
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaChennaiCostPillarPage() {
  usePageMetadata({
    title: "How Much Will It Take to Visit Sri Lanka From Chennai? (2026 Cost Breakdown)",
    description: "The complete 2026 cost guide for traveling from Chennai to Sri Lanka. Flights, visas, hotels, transit, and daily cost breakdowns for families & honeymoons.",
    canonicalUrl: "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai",
    ogUrl: "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `faq_${index}`);
  };

  const handleCtaClick = (buttonId: string) => {
    trackEvent("planner_pillar_cta_click", "conversion", buttonId);
    navigate("/sri-lanka-trip-planner");
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", "conversion", "chennai_pillar");
    window.open("https://wa.me/94722968210", "_blank");
  };

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white pb-20">
      {/* Real Dynamic Schema Formats to solidify EEAT signals */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How Much Will It Take to Visit Sri Lanka From Chennai? (2026 Cost Breakdown)",
            "description": "Your ultimate master budget publication tracking flights, visas, hotels, dining, local transits, and itineraries from Chennai to Sri Lanka.",
            "image": [
              "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "datePublished": "2026-06-20T08:00:00+05:30",
            "dateModified": "2026-06-21T10:00:00+05:30",
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
              "@id": "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does a Sri Lanka trip cost from Chennai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A standard 5-day budget trip starts around ₹25,000 - ₹40,000 per person. Comfortable mid-range tours run from ₹45,000 - ₹75,000, while premium high-comfort luxury experiences begin around ₹90,000+ per traveler."
                }
              },
              {
                "@type": "Question",
                "name": "What is the average flight cost from Chennai to Colombo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A standard round-trip flight from Chennai to Colombo ranges between ₹10,000 and ₹18,000 depending on how early you book, the carrier (e.g. IndiGo, SriLankan Airlines), and travel season."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need a physical visa before traveling from Chennai to Sri Lanka?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, Indian passport holders do not need a physical visa stamp. You can apply for a Tourist Electronic Travel Authorization (ETA) online in under 24 hours, which costs around $20 USD (often waived to ₹0 during dynamic promotional schemes)."
                }
              }
            ]
          })}
        </script>
      </>

      {/* Styled Top Banner */}
      <div className="bg-luxury-green relative overflow-hidden py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.22] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green/90" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            Ultimate 2026 Budget Blueprint
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            How Much Will It Take to Visit Sri Lanka From Chennai? <br/>
            <span className="text-luxury-gold font-normal italic">(2026 Cost Breakdown)</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Planning a short escape from the Chennai heat? Sri Lanka is just an 80-minute flight away. This authoritative guide lays out physical costs, flight paths, visa configurations, hotel tiers, and exact calculations for Indian travelers.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center text-xs text-luxury-cream/70 font-mono">
            <span className="flex items-center gap-1.5 py-1 px-3 bg-white/5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              10 Min Deep Read
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 bg-white/5 rounded-full border border-white/10">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              Verified by Local Travel Experts
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 bg-white/5 rounded-full border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
              Updated June 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Quick Answer Snippet Box (Article එකේ උඩින්ම) */}
        <section className="bg-white border-2 border-luxury-gold/30 rounded-3xl p-6 sm:p-8 shadow-md mb-12 scroll-mt-24">
          <div className="bg-[#fdfaf2] -m-6 sm:-m-8 p-5 sm:p-6 rounded-t-[22px] border-b border-luxury-gold/20 flex items-center gap-3">
            <span className="px-2.5 py-1 bg-luxury-gold text-white text-[10px] font-mono tracking-wider uppercase font-bold rounded-md">Featured Snippet Guide</span>
            <h3 className="text-sm font-bold font-mono text-luxury-green uppercase">Quick Answer: Trips From Chennai</h3>
          </div>
          <div className="mt-8">
            <p className="text-sm sm:text-base text-luxury-black/85 leading-relaxed mb-6 font-light">
              How much will it take to visit Sri Lanka from Chennai? The baseline answer is incredibly encouraging: a <strong>5-day budget backpacking trip from Chennai costs approximately ₹25,000 to ₹40,000 per person</strong>. Couples seeking comfortable <strong>mid-range boutique stays spend about ₹45,000 to ₹75,000</strong>, while highly customizable, high-end <strong>luxury journeys cost ₹90,000+ per traveler</strong>.
            </p>
            
            {/* The Google Featured Snippet Optimized Table */}
            <div className="overflow-hidden border border-luxury-green/10 rounded-2xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-luxury-green text-white font-mono text-[11px] sm:text-xs uppercase">
                    <th className="p-4">Trip Type</th>
                    <th className="p-4 text-right">Estimated Cost (5 Days / Person)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxury-cream">
                  <tr className="hover:bg-luxury-cream/30 transition-colors">
                    <td className="p-4 font-serif font-bold text-luxury-green">🎒 Budget (5 Days)</td>
                    <td className="p-4 text-right font-mono font-bold text-luxury-gold">₹25,000 - ₹40,000</td>
                  </tr>
                  <tr className="hover:bg-luxury-cream/30 transition-colors">
                    <td className="p-4 font-serif font-bold text-luxury-green">🌴 Mid-range (5 Days)</td>
                    <td className="p-4 text-right font-mono font-bold text-luxury-gold">₹45,000 - ₹75,000</td>
                  </tr>
                  <tr className="hover:bg-luxury-cream/30 transition-colors">
                    <td className="p-4 font-serif font-bold text-luxury-green">👑 Luxury (5 Days)</td>
                    <td className="p-4 text-right font-mono font-bold text-luxury-gold">₹90,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-[11px] text-luxury-black/40 mt-3 italic font-light text-center">
              *Estimates contain direct round-trip flights from Chennai (MAA), basic visas, lodging, local food, and transits.
            </p>
          </div>
        </section>

        {/* Quick Links Header Grid */}
        <section className="mb-12">
          <div className="bg-luxury-green/5 border border-luxury-green/10 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-luxury-green/60 uppercase tracking-widest font-bold block mb-3">Quick Navigation Navigation</span>
            <div className="flex flex-wrap gap-2.5 text-xs">
              <a href="#glance" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">1. At a Glance</a>
              <a href="#flights" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">2. Chennai Flight Costs</a>
              <a href="#5day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">3. 5-Day Costs</a>
              <a href="#7day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">4. 7-Day Costs</a>
              <a href="#family" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">5. Family Budgets</a>
              <a href="#honeymoon" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">6. Honeymoon Costs</a>
              <a href="#reduce" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">7. Saving Tips</a>
            </div>
          </div>
        </section>

        {/* Dynamic Inner Link Box to keep visitors circulating through other pages */}
        <div className="bg-luxury-cream border-l-4 border-[#d4af37] p-5 rounded-r-2xl mb-12 text-xs text-luxury-green">
          <p className="font-bold uppercase tracking-wide text-[10px] text-luxury-gold mb-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> Core Internal Travel Blueprints:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-semibold text-luxury-green">
            <Link to="/sri-lanka-trip-cost-from-india" className="block p-3.5 bg-white rounded-xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-colors hover:text-luxury-gold">
              👉 Sri Lanka Trip Cost From India
            </Link>
            <Link to="/sri-lanka-7-day-itinerary" className="block p-3.5 bg-white rounded-xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-colors hover:text-luxury-gold">
              👉 Sri Lanka 7-Day Itinerary Guide
            </Link>
            <Link to="/sri-lanka-visa-for-indians" className="block p-3.5 bg-white rounded-xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-colors hover:text-luxury-gold">
              👉 Sri Lanka Visa ETA Guide
            </Link>
          </div>
        </div>

        {/* H2: Sri Lanka Trip Cost From Chennai at a Glance */}
        <section id="glance" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Trip Cost From Chennai at a Glance
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-8">
            How does the pocket math split? When you embark on a <strong>sri lanka travel cost from chennai</strong> audit, expenses partition into five elemental blocks, allowing you to fine-tune your outlays individually.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 text-blue-700">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Flights</h4>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">₹10,000 - ₹18,000</p>
              <span className="text-[10px] text-luxury-black/50 block mt-1 leading-snug">MAA - CMB round trip per occupant.</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all text-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3 text-green-700">
                <Coffee className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Hotels</h4>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">₹3,500 - ₹12,000</p>
              <span className="text-[10px] text-luxury-black/50 block mt-1 leading-snug">Chic boutiques to beachfront villas.</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all text-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3 text-orange-700">
                <span className="font-serif font-bold text-sm">🍲</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Food</h4>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">₹600 - ₹1,500</p>
              <span className="text-[10px] text-luxury-black/50 block mt-1 leading-snug">Daily Ceylonese crab & authentic clay hoppers.</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all text-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3 text-purple-700">
                <Navigation className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Transport</h4>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">₹2,000 - ₹5,500</p>
              <span className="text-[10px] text-luxury-black/50 block mt-1 leading-snug">PickMe apps, trains, or private chauffeurs.</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all text-center">
              <div className="w-10 h-10 rounded-full bg-[#fdfaf2] flex items-center justify-center mx-auto mb-3 text-yellow-700">
                <Map className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Activities</h4>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">₹4,000 - ₹8,000</p>
              <span className="text-[10px] text-luxury-black/50 block mt-1 leading-snug">Sigiriya Climb, Yala wildlife & Ella hikes.</span>
            </div>
          </div>
        </section>

        {/* H2: Chennai to Sri Lanka Flight Cost */}
        <section id="flights" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Plane className="w-6 h-6 text-[#d4af37]" />
            Chennai to Sri Lanka Flight Cost
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            The flight ticket forms the entry gate of your travel spending. Due to the proximity, the <strong>chennai to colombo flight cost</strong> is routinely the cheapest international airfare available anywhere in India. Flying between Anna International Airport (MAA) and Bandaranaike International Airport (CMB) in Colombo takes only about 80 minutes of non-stop flight duration.
          </p>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            If you are shopping for the absolute <strong>cheapest flights from chennai to sri lanka</strong>, you should target booking times around 60 days ahead. Budget carriers like <strong>IndiGo</strong> and <strong>Alliance Air</strong> periodically deliver promotional, low-cost options starting around <strong>₹10,500 to ₹12,000 for a direct round-trip</strong>.
          </p>

          <div className="bg-white border border-[#d4af37]/25 p-5 rounded-2xl shadow-sm mb-6">
            <h4 className="font-serif font-bold text-sm text-luxury-green mb-3">Comparing Chennai to Colombo Airfare Carriers (2026 Rates)</h4>
            <ul className="space-y-3.5 text-xs text-luxury-black/80 font-light">
              <li className="flex justify-between items-center bg-[#fdfaf2] p-3 rounded-xl border border-luxury-cream">
                <span>✈️ <strong>IndiGo Airlines:</strong> Direct daily runs, standard 15 Kg checkout baggage</span>
                <span className="font-mono font-bold text-[#8B6E30]">₹11,000 - ₹14,500</span>
              </li>
              <li className="flex justify-between items-center bg-[#fdfaf2] p-3 rounded-xl border border-luxury-cream">
                <span>✈️ <strong>SriLankan Airlines:</strong> Full-service carrier, delicious hot food, 30 Kg baggage weight</span>
                <span className="font-mono font-bold text-[#8B6E30]">₹14,500 - ₹18,000</span>
              </li>
              <li className="flex justify-between items-center bg-[#fdfaf2] p-3 rounded-xl border border-luxury-cream">
                <span>✈️ <strong>Air India:</strong> Connecting and occasional non-stop runs, generous hand carriage rules</span>
                <span className="font-mono font-bold text-[#8B6E30]">₹13,500 - ₹16,500</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-2xl text-xs text-yellow-950 flex gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <strong>⚠️ Critical Airfare Hack:</strong> Standard <strong>chennai to colombo airfare</strong> prices can surge past ₹22,000 during high-demand holidays (Indian Diwali, Pongal, school vacations of May-Oct, and Christmas seasons). Try to secure tickets early during weekday promotional cycles.
            </div>
          </div>
        </section>

        {/* H2: 5 Day Sri Lanka Trip Cost From Chennai */}
        <section id="5day" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#d4af37]" />
            5 Day Sri Lanka Trip Cost From Chennai
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            If you are looking for the absolute money-saving option, calculating the <strong>5 day sri lanka trip cost from chennai</strong> is a must-read planning template. This timeframe is perfect for a compact long weekend tour focused on the coastal lowlands of Colombo and Gall Fort, bypassing hilly driving loops.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-luxury-green/10 mb-6">
            <div>
              <h4 className="font-serif font-bold text-luxury-green text-base mb-3 border-b border-luxury-cream pb-2">🎒 Standard Budget Level</h4>
              <p className="text-2xl font-mono font-bold text-luxury-gold py-1">₹25,000 - ₹34,000 <span className="text-xs text-luxury-black/50 font-sans">/ Person</span></p>
              <ul className="text-xs text-luxury-black/75 space-y-2 mt-4 font-light">
                <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Round ticket on Alliance Air/IndiGo</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> High-rated family beach guesthouses (Negombo/Bentota)</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Dinners at local roadside rice cafes</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Exploring Colombo via metered PickMe tuk-tuks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-luxury-green text-base mb-3 border-b border-luxury-cream pb-2">🌴 Comfort Mid-Range level</h4>
              <p className="text-2xl font-mono font-bold text-luxury-gold py-1">₹45,000 - ₹62,000 <span className="text-xs text-luxury-black/50 font-sans">/ Person</span></p>
              <ul className="text-xs text-luxury-black/75 space-y-2 mt-4 font-light">
                <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Direct round tickets on SriLankan Airlines</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> 3 or 4-star beautiful swimming pool retreats</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Private chauffeur-led air conditioned sedan</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Beautiful beach restaurants and guided Galle Fort visits</li>
              </ul>
            </div>
          </div>
          
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light">
            When organizing a <strong>sri lanka budget trip from chennai</strong>, keeping it strictly to 5 days lets you save heavily on hotels and car leases, giving you a powerful dose of tropical beach life without excessive spend.
          </p>
        </section>

        {/* H2: 7 Day Sri Lanka Trip Cost From Chennai */}
        <section id="7day" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#d4af37]" />
            7 Day Sri Lanka Trip Cost From Chennai
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            For most first-time travelers arriving from South India, 7 days is the absolute perfect travel window. This <strong>sri lanka tour cost from chennai</strong> calculation assumes the complete Classic Tour Route: <strong>Colombo → Sigiriya Fortress → Nuwara Eliya → Highlands of Ella → Galle Fort → Colombo</strong>.
          </p>

          {/* Table of 7-Day Classic Route cost breakdown */}
          <div className="overflow-x-auto bg-white rounded-2xl border border-luxury-green/10 mb-6 shadow-sm">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-luxury-green text-white font-mono text-[10px] uppercase">
                  <th className="p-4">Expense Component</th>
                  <th className="p-4 text-right">Backpacker Solo</th>
                  <th className="p-4 text-right">Double Couple Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream">
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-serif font-bold text-luxury-green">✈️ Flights (Direct Round)</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹11,500</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹23,000</td>
                </tr>
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-serif font-bold text-luxury-green">🏨 Stays (6 Nights Boutique)</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹9,000</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹24,000</td>
                </tr>
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-serif font-bold text-luxury-green">🍲 Gourmet & Local Food</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹4,200</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹10,500</td>
                </tr>
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-serif font-bold text-luxury-green">🚈 Local Transits & Trains</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹2,800</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹6,500</td>
                </tr>
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-serif font-bold text-luxury-green">🎟️ Entry Tickets (Sigiriya/Safari)</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹5,500</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹11,000</td>
                </tr>
                <tr className="bg-luxury-cream/40 font-bold">
                  <td className="p-4 font-serif text-luxury-green">📊 Total Estimated 7-Day Net</td>
                  <td className="p-4 text-right font-mono text-luxury-gold">₹33,000</td>
                  <td className="p-4 text-right font-mono text-[#8B6E30] text-sm">₹75,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light">
            With a total land budget of ₹75,000 for two, you can travel with complete ease, stay in beautiful heritage homestays, take the epic first-class mountain train ride to Ella, and hire private drivers when you choose to.
          </p>
        </section>

        {/* H2: Sri Lanka Family Trip Cost From Chennai */}
        <section id="family" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Family Trip Cost From Chennai
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            For Indian family travelers seeking complete comfort, calculating the <strong>sri lanka family trip cost from chennai</strong> requires a focus on safety, lower road transit fatigue, and baby-safe dining properties. A family of 4 can easily experience a gorgeous 7-day tropical vacation for less than **₹1,60,000 to ₹2,10,000 total**.
          </p>

          <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 mb-6">
            <h4 className="font-serif font-bold text-sm text-luxury-green mb-4">Indian Family Comfort Cost Checklist</h4>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-light text-luxury-black/80">
              <div className="p-3 bg-luxury-cream/10 border border-luxury-cream rounded-xl">
                <strong>👨‍👩‍👧‍👦 Family Rooms:</strong> Booking multi-bedroom villas with pool facilities or adjoining suites runs from ₹8,000 to ₹15,000 per night.
              </div>
              <div className="p-3 bg-luxury-cream/10 border border-luxury-cream rounded-xl">
                <strong>🚐 Large Van Commutes:</strong> A dedicated, spacious private AC Toyota van with driver-guide to cover all baggage and stroller gear runs around ₹6,000 per day.
              </div>
              <div className="p-3 bg-luxury-cream/10 border border-luxury-cream rounded-xl">
                <strong>🍲 Healthy Diets:</strong> Kids can readily digest local hoppers, mild coconut-profile white curries, and clean bananas, starting at ₹300 per child's meal.
              </div>
              <div className="p-3 bg-luxury-cream/10 border border-luxury-cream rounded-xl">
                <strong>👨‍⚕️ Kid-Friendly Safety:</strong> Tap water is boiled/filtered in all heritage hotels, and pharmacies inside towns have well-stocked baby assets.
              </div>
            </div>
          </div>
          
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light">
            With standard direct flights from Chennai making flight fatigue extremely minimal, Sri Lanka serves as the ultimate international family introductory getaway.
          </p>
        </section>

        {/* H2: Sri Lanka Honeymoon Cost From Chennai */}
        <section id="honeymoon" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Honeymoon Cost From Chennai
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Honeymoons are high-intent romantic getaways. Many newly married couples search for a personalized <strong>sri lanka honeymoon package from chennai</strong>. The commercial value is unmatched: for the price of standard hillside resorts in Kerala or Ooty, you can secure private oceanfront plunge pool villas in Tangalle or colonial tea country properties.
          </p>

          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            A romantic <strong>sri lanka honeymoon cost from chennai</strong> for 5 to 7 days typically budgets around <strong>₹95,000 to ₹1,40,000 total per couple</strong>, depending on how often you indulge in luxury boutique hotels.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-white border border-luxury-gold/20 rounded-2xl flex gap-3.5 items-start">
              <span className="text-2xl">🌴</span>
              <div>
                <h4 className="font-serif font-bold text-sm text-luxury-green">High-End Coastal Luxury Retreats</h4>
                <p className="text-xs text-luxury-black/70 mt-1 leading-relaxed">
                  Relax in beautiful cliff properties along Mirissa or secure beautiful ocean suites with private spa sessions, costing ₹15,000 - ₹28,000/night.
                </p>
              </div>
            </div>
            <div className="p-5 bg-white border border-luxury-gold/20 rounded-2xl flex gap-3.5 items-start">
              <span className="text-2xl">🥂</span>
              <div>
                <h4 className="font-serif font-bold text-sm text-luxury-green">Romantic Extras & Intimate Dining</h4>
                <p className="text-xs text-luxury-black/70 mt-1 leading-relaxed">
                  Arrange intimate private dining on golden sand beaches, sunset cocktails, or luxury local safari jeep drives, costing ₹4,500 - ₹9,000 total.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* H2: How To Reduce Your Sri Lanka Travel Cost */}
        <section id="reduce" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-luxury-gold" />
            How To Reduce Your Sri Lanka Travel Cost
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Ready to squeeze extra value from your Indian Rupees? Apply these battle-tested spending rules specifically customized for citizens traveling from Chennai:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm">
              <h4 className="font-serif font-bold text-[#1e3a2f] mb-2">1. Use local PickMe apps, not casual tuk-tuks</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Random three-wheelers waiting at busy Colombo or Galle city corners will demand up to triple the standard rate. Always book local PickMe or Uber apps—they feature transparent, legally metered rates.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm">
              <h4 className="font-serif font-bold text-[#1e3a2f] mb-2">2. Avoid International Debit Card Markups</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Standard Indian credit/debit cards charge up to 5% flat currency conversion plus ATM gateway commissions. Bring clean physical Indian Cash (₹500 notes) and convert them at reputable airport exchange desks.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm">
              <h4 className="font-serif font-bold text-[#1e3a2f] mb-2">3. Book Mountain Scenic Trains Early</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Standard 1st and 2nd class reserved train tickets sell out 30 days ahead. Don't fall for local resellers overcharging 4x pricing. Buy authentic tickets online via the official railway portals.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm">
              <h4 className="font-serif font-bold text-[#1e3a2f] mb-2">4. Stay in Family Guest Houses</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Instead of expensive five-star hotel options, check out local homestay guest houses. Savor delicious organic home-style breakfasts, secure local routes advice, and spend less than ₹2,000 per night.
              </p>
            </div>
          </div>
        </section>

        {/* Brand New Redefined High-Conversion CTA Area with interactive link to Planner Pillar */}
        <section id="cta" className="scroll-mt-24 py-12">
          <div className="bg-luxury-green text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg border border-[#d4af37]/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 brightness-[0.3]" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-spin-slow" />
                Durable Travel Planning Tool
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#fcfbf7]">
                Get Your Free Sri Lanka Travel Plan
              </h2>
              
              <p className="text-sm text-luxury-cream/80 leading-relaxed max-w-2xl mx-auto font-light">
                Calculate your direct land expenses in real-time. Choose your preferred monsoon clusters, choose custom travel budgets in Indian Rupees, and download a customized daily route spreadsheet instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <button
                  onClick={() => handleCtaClick("chennai_pillar_planner_cta")}
                  className="bg-[#d4af37] text-white hover:bg-white hover:text-luxury-green font-bold text-sm px-8 py-4 rounded-xl shadow-lg transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
                >
                  🚀 Get Your Free Sri Lanka Travel Plan
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-transparent text-white border border-white/20 hover:border-luxury-gold font-bold text-sm px-8 py-4 rounded-xl transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  💬 Settle Routes on WhatsApp
                </button>
              </div>

              <p className="text-[10px] text-white/40 font-mono">
                Approved by Ceylon Tourist Board Guidelines • 100% Free Interactive Travel Tool
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
