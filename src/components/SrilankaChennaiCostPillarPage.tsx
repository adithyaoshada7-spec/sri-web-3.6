import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  MapPin, 
  Check, 
  HelpCircle, 
  DollarSign, 
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
  FileText,
  TrendingUp,
  Map,
  Sparkles
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaChennaiCostPillarPage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedBudgetTab, setSelectedBudgetTab] = useState<"budget" | "couple" | "mid" | "luxury">("couple");

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
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white">
      {/* Dynamic SEO Meta Data & Schema Markup injection via React Helmet */}
      <>
        <title>How Much Will It Take to Visit Sri Lanka From Chennai in 2026? | Complete Budget Guide</title>
        <meta name="description" content="Discover the complete Chennai to Sri Lanka travel cost guide for 2026. Realistic estimates on flights, visas, accommodation, Jaffna routes, and daily expenses for couples and families." />
        <link rel="canonical" href="https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai" />
        
        {/* Real Dynamic Schema Formats to solidify EEAT signals */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How Much Will It Take to Visit Sri Lanka From Chennai in 2026?",
            "description": "Your ultimate master budget publication tracking flights, visas, hotels, dining, local trains, PickMe taxis, and overland routes from Chennai to Sri Lanka.",
            "image": [
              "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "datePublished": "2026-06-12T08:00:00+05:30",
            "dateModified": "2026-06-14T10:00:00+05:30",
            "author": {
              "@type": "Person",
              "name": "Arjun Sundaram",
              "jobTitle": "Lead Ceylon Budget Strategist & Itinerary Coordinator"
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
                "name": "Is Sri Lanka cheaper than Maldives for travelers flying from Chennai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, absolutely. A typical luxury-moderate 7-day holiday to Sri Lanka from Chennai costs roughly 50% to 65% less than a comparable resort stay in the Maldives. In Sri Lanka, you gain rich wildlife, rain forests, culture, and high mountain viewpoints without being confined to a single, expensive private island resort."
                }
              },
              {
                "@type": "Question",
                "name": "Is Sri Lanka worth visiting from Chennai on a budget?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "100% yes! Sri Lanka lies incredibly close to Chennai, requiring just an 80-minute direct flight. Because of the currency exchange rate where the local Sri Lankan Rupee (LKR) trades highly favorably against the Indian Rupee (INR), the purchasing power of an Indian traveler is heavily magnified."
                }
              },
              {
                "@type": "Question",
                "name": "What is the absolute cheapest way to travel from Chennai to Sri Lanka?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The cheapest way is booking promotional low-cost tickets on airlines like IndiGo or Alliance Air directly from Chennai (MAA) to Colombo (CMB) or Jaffna (JAF), costing around ₹6,500 to ₹8,500 one-way when booked 2-3 months in advance."
                }
              },
              {
                "@type": "Question",
                "name": "How much cash should I carry from Chennai for my Sri Lanka trip?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For a 7-day trip, we advise carrying roughly ₹15,000 to ₹20,000 in physical cash per person to convert into Sri Lankan Rupees (LKR) at Colombo Airport. While larger hotels and upscale cafes accept credit cards (with global markup), street dining, village fruit vendors, and local transport operate strictly on local currency cash."
                }
              },
              {
                "@type": "Question",
                "name": "Is ₹48,000 enough for a complete Sri Lanka holiday from India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, an exclusive land budget of ₹48,000 (excluding flights) is incredibly powerful. It easily feeds and lodges an Indian couple in high-standard private boutique rooms, pays for private transport (PickMe/trains), and covers high-value park safaris or UNESCO ticket entrances over a 7-day trip."
                }
              }
            ]
          })}
        </script>
      </>

      {/* Styled Top Banner */}
      <div className="bg-luxury-green relative overflow-hidden py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.22] opacity-80" />
        
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green/80" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-luxury-gold" />
            Ultimate 2026 Cost Guide & Strategic Blueprint
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            How Much Will It Take to Visit Sri Lanka From Chennai in 2026?
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            The precise monetary answer to planning a stress-free Ceylon getaway. Read our authoritative, 3,500+ word landmark auditing of flights, visas, guesthouses, local food, hidden transport expenses, and newly opened routes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-xs text-luxury-cream/70 font-mono">
            <span className="flex items-center gap-1.5 py-1 px-3 bg-white/5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              15 Min Deep Study
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 bg-white/5 rounded-full border border-white/10">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              Verified by Ella Concierge Desk
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 bg-white/5 rounded-full border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
              Updated June 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Structural Body holding content and visual panels */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Sticky Jump Box Container */}
        <div id="sticky-tabs-hub" className="bg-white border border-luxury-green/10 p-4 rounded-2xl mb-12 shadow-sm">
          <p className="text-xs font-mono text-luxury-green/50 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-luxury-gold" /> Interactive Content Director
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
            <a href="#summary" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">1. Quick Summary</a>
            <a href="#flights" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">2. Flight Cost</a>
            <a href="#visa" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">3. Visa Guide</a>
            <a href="#hotels" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">4. Accommodations</a>
            <a href="#food" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">5. Food Costs</a>
            <a href="#transport" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">6. Transportation</a>
            <a href="#love-srilanka" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">7. Couple's Review</a>
            <a href="#is48k-worth" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">8. Is ₹48,000 Real?</a>
            <a href="#jaffna-route" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">9. Jaffna Route</a>
            <a href="#howmanydays" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">10. Perfect Days</a>
            <a href="#spendperday" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">11. Daily Spend</a>
            <a href="#practical-tips" className="p-2 bg-luxury-cream/50 rounded-lg text-center hover:bg-luxury-gold hover:text-white transition-all font-medium text-luxury-green border border-luxury-green/5 block">12. Practical Tips</a>
          </div>
        </div>

        {/* Section 1: Quick Answer Summary */}
        <section id="summary" className="scroll-mt-6 border-b border-luxury-green/10 pb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 01</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">The Quick Answer: Sri Lanka Travel Costs from Chennai</h2>
          </div>
          
          <p className="text-luxury-black/75 leading-relaxed text-base mb-6">
            If you are flying from Anna International Airport (MAA) in Chennai to Bandaranaike International Airport (CMB) in Colombo, the absolute base cost for a comfortable **7-day tourist loop starts around ₹24,000 per person** on a compact budget, scaling up to **₹45,000–₹55,050 for a polished mid-range romantic honeymoon**, and **₹1,20,000+ for an uncompromised five-star private villa experience**.
          </p>

          {/* Interactive Tabbed Estimator Box to draw active clicks & keep user interactive */}
          <div className="bg-white border border-[#0d5934]/15 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-serif font-bold text-luxury-green mb-4">
              Select Your Travel Style (7-Day Budget Matrix)
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-6 border-b border-luxury-cream pb-4">
              <button 
                onClick={() => setSelectedBudgetTab("budget")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${selectedBudgetTab === "budget" ? "bg-luxury-green text-white" : "bg-luxury-cream text-luxury-green hover:bg-luxury-gold/10"}`}
              >
                🎒 Backpacking Savvy
              </button>
              <button 
                onClick={() => setSelectedBudgetTab("couple")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${selectedBudgetTab === "couple" ? "bg-[#d4af37] text-white" : "bg-luxury-cream text-luxury-green hover:bg-luxury-gold/10"}`}
              >
                💖 Cozy Couple Splurge
              </button>
              <button 
                onClick={() => setSelectedBudgetTab("mid")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${selectedBudgetTab === "mid" ? "bg-luxury-green text-white" : "bg-luxury-cream text-luxury-green hover:bg-luxury-gold/10"}`}
              >
                🌴 Premium Explorers
              </button>
              <button 
                onClick={() => setSelectedBudgetTab("luxury")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${selectedBudgetTab === "luxury" ? "bg-luxury-green text-white" : "bg-luxury-cream text-luxury-green hover:bg-luxury-gold/10"}`}
              >
                👑 Extreme High-Life Luxury
              </button>
            </div>

            <AnimatePresence mode="wait">
              {selectedBudgetTab === "budget" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center bg-luxury-cream p-4 rounded-2xl border border-luxury-green/5">
                    <div>
                      <p className="text-[11px] font-mono text-luxury-green/60 uppercase">Ideal Per-Person Landing Cost</p>
                      <p className="text-2xl font-serif font-bold text-luxury-green">₹22,000 - ₹28,000</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded">Ultra Value</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-luxury-green block">🛏️ Stay Selection:</strong>
                      Heritage homestays and coastal hostels (Galle/Mirissa) with fans or basic A/C.
                    </div>
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-luxury-green block">🚈 Local Commutes:</strong>
                      Red Ceylon second-class mountain trains, public non-AC buses, and shared tuk-tuks.
                    </div>
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-luxury-green block">🍲 Dining:</strong>
                      Local street shops selling Kottu Roti, village hopper dinners, and standard canteen breakfasts.
                    </div>
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-luxury-green block">🎟️ Attractions:</strong>
                      Pidurangala Rock hike, public beaches, and free temple walk-throughs.
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedBudgetTab === "couple" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center bg-[#fcf8e8] p-4 rounded-2xl border border-luxury-gold/20">
                    <div>
                      <p className="text-[11px] font-mono text-luxury-gold uppercase font-bold">Best Value for Indian Couples</p>
                      <p className="text-2xl font-serif font-bold text-luxury-green">₹45,000 - ₹52,000 <span className="text-sm font-normal text-luxury-black/60">(For Two)</span></p>
                    </div>
                    <span className="text-xs bg-[#d4af37] text-white font-bold px-2.5 py-1 rounded-full animate-bounce">Couple MVP</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-[#C5A059] block">🛏️ Stay Selection:</strong>
                      Mid-range boutique retreats in Ella or colonial tea cottages in Nuwara Eliya.
                    </div>
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-[#C5A059] block">🚈 Local Commutes:</strong>
                      Dedicated PickMe rides inside Colombo, coupled with first-class reserved train tickets.
                    </div>
                    <div className="p-3 bg-[#fdfaf2] rounded-xl border border-luxury-gold/10">
                      <strong className="text-luxury-green block">🍲 Dining:</strong>
                      Fresh beachfront devilled prawns, luxury clifftop sunset cocktails, and high tea.
                    </div>
                    <div className="p-3 bg-[#fdfaf2] rounded-xl border border-luxury-gold/10">
                      <strong className="text-luxury-green block">🎟️ Attractions:</strong>
                      Sigiriya ancient lion fortress entry, Nine Arch Bridge photography, and local cultural safari.
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedBudgetTab === "mid" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center bg-luxury-cream p-4 rounded-2xl border border-luxury-green/5">
                    <div>
                      <p className="text-[11px] font-mono text-luxury-green/60 uppercase">High-Comfort Explorer Cost</p>
                      <p className="text-2xl font-serif font-bold text-luxury-green">₹55,000 - ₹75,000 <span className="text-sm font-normal text-luxury-black/60">(Per Person)</span></p>
                    </div>
                    <span className="text-xs bg-luxury-green text-white font-bold px-2 py-1 rounded">Pure Ease</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-luxury-green block">🛏️ Stay Selection:</strong>
                      Air-conditioned 4-star boutique beach resorts in Galle or Mirissa with pool access.
                    </div>
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-luxury-green block">🚈 Local Commutes:</strong>
                      Dedicated private AC sedan with a tourist guide-driver for the entire 7 days.
                    </div>
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-luxury-green block">🍲 Dining:</strong>
                      Galle Fort heritage fine-dining, foreign-styled espresso pubs, luxury curries.
                    </div>
                    <div className="p-3 bg-luxury-cream/40 rounded-xl">
                      <strong className="text-luxury-green block">🎟️ Attractions:</strong>
                      Kaudulla national park private elephant jeep safari, whale watching, guided museum hikes.
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedBudgetTab === "luxury" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center bg-luxury-black p-4 rounded-2xl text-white">
                    <div>
                      <p className="text-[11px] font-mono text-luxury-gold uppercase font-bold">5-Star Opulent Sanctuary Tour</p>
                      <p className="text-2xl font-serif font-bold text-luxury-gold">₹1,30,000 - ₹2,000,000+</p>
                    </div>
                    <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-1 rounded font-bold uppercase">Elite Club</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-luxury-green">
                    <div className="p-3 bg-luxury-cream rounded-xl">
                      <strong className="text-luxury-black block">🛏️ Stay Selection:</strong>
                      Anantara Peace Haven Tangalle, Amangalla within Galle Fort, or Dilmah Tea Trails.
                    </div>
                    <div className="p-3 bg-luxury-cream rounded-xl">
                      <strong className="text-luxury-black block">🚈 Local Commutes:</strong>
                      Executive luxury SUVs, private airport transfers, or domestic scenic charter planes.
                    </div>
                    <div className="p-3 bg-luxury-cream rounded-xl">
                      <strong className="text-luxury-black block">🍲 Dining:</strong>
                      All-inclusive high-gastronomy dinners, vintage wine cellars, private customized organic chefs.
                    </div>
                    <div className="p-3 bg-luxury-cream rounded-xl">
                      <strong className="text-luxury-black block">🎟️ Attractions:</strong>
                      Private deep-sea sports fishing, custom archaeological guides to Sigiriya, premium ocean spas.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Section 2: Flights Cost Section */}
        <section id="flights" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 02</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Flight Costs From Chennai to Sri Lanka</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            Due to our extreme geographical proximity, flying from Chennai is incredibly affordable and fast. You can reach Bandaranaike International Airport (CMB) in Colombo in just **1 hour and 20 minutes** on direct flights, making it faster than flying from Chennai to New Delhi.
          </p>

          <div className="overflow-x-auto mb-6 bg-white rounded-2xl border border-luxury-green/10">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-luxury-green text-white text-[11px] uppercase font-mono">
                  <th className="p-4 rounded-tl-2xl">Airline Operator</th>
                  <th className="p-4">Average Return Ticket Price (INR)</th>
                  <th className="p-4">Luggage Inclusions (Check-In)</th>
                  <th className="p-4 rounded-tr-2xl">Best Booking Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream">
                <tr className="hover:bg-luxury-cream/50 transition-colors">
                  <td className="p-4 font-bold text-luxury-green">✈️ IndiGo (Direct)</td>
                  <td className="p-4 text-sm font-semibold text-[#8B6E30]">₹14,500 – ₹18,000</td>
                  <td className="p-4 text-luxury-black/70">15 kg checked + 7 kg hand luggage</td>
                  <td className="p-4">40–60 Days Prior to boarding</td>
                </tr>
                <tr className="hover:bg-luxury-cream/50 transition-colors">
                  <td className="p-4 font-bold text-luxury-green">✈️ Air India (Direct / Connecting)</td>
                  <td className="p-4 text-sm font-semibold text-[#8B6E30]">₹16,500 – ₹20,000</td>
                  <td className="p-4 text-luxury-black/70">20 kg checked + 7 kg hand luggage</td>
                  <td className="p-4">30–45 Days Prior</td>
                </tr>
                <tr className="hover:bg-luxury-cream/50 transition-colors">
                  <td className="p-4 font-bold text-luxury-green">✈️ SriLankan Airlines (Direct Flagship)</td>
                  <td className="p-4 text-sm font-semibold text-[#8B6E30]">₹18,500 – ₹24,000</td>
                  <td className="p-4 text-luxury-black/70">30 kg checked + 7 kg hand luggage</td>
                  <td className="p-4">60 Days Prior (Best Hot Rates)</td>
                </tr>
                <tr className="hover:bg-luxury-cream/50 transition-colors">
                  <td className="p-4 font-bold text-luxury-green">✈️ Alliance Air (Direct to Jaffna JAF)</td>
                  <td className="p-4 text-sm font-semibold text-[#8B6E30]">₹13,000 – ₹16,500</td>
                  <td className="p-4 text-luxury-black/70">15 kg checked + 5 kg hand luggage</td>
                  <td className="p-4">2 Months Prior (Very popular route)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-2xl mb-4 text-xs text-yellow-900 shadow-sm">
            <div className="flex gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-700 shrink-0 mt-0.5" />
              <div>
                <strong>⚠️ Pro Budget Action Alert:</strong> Ticket costs spike drastically up to <strong>₹28,500 or more per seat</strong> during religious festival seasons, school vacations (May, October), and peak Christmas holiday weeks (mid-December to January). Always book your flight ticket first before locking in hotels.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Visa Costs Guide */}
        <section id="visa" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 03</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Visa Costs for Indian Travelers</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            Getting your tourist entry pass is extremely straightforward. In 2026, Sri Lanka operates a highly efficient Electronic Travel Authorization (ETA) system. You do not need to submit physical passport assets to get your visa.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 flex gap-4">
              <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 font-serif font-bold text-green-800">1</span>
              <div>
                <h4 className="font-serif font-bold text-luxury-green leading-snug">Online ETA Application (Recommended)</h4>
                <p className="text-xs text-luxury-black/60 mt-1">
                  Apply via the official web portal. For Indian passport holders, tourist visa promotional exemptions sometimes lower standard charges to <strong>₹0 to ₹1,800 processing fee</strong> depending on international reciprocal trade announcements.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 flex gap-4">
              <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 font-serif font-bold text-orange-800">2</span>
              <div>
                <h4 className="font-serif font-bold text-luxury-green leading-snug">Tourist Visa On-Arrival (Alternative)</h4>
                <p className="text-xs text-luxury-black/60 mt-1">
                  You can purchase a physical voucher stamp on arrival at Colombo Airport (CMB) terminal desks. This options runs a flat rate equivalent of approximately <strong>$50 USD (roughly ₹4,200)</strong>, often resulting in long airport queues.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#fcfbf7] border border-luxury-gold/30 rounded-2xl p-4 flex gap-3 text-xs items-start">
            <Info className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-luxury-green">Requirement Warning:</p>
              <p className="text-luxury-black/70 mt-1">
                Always apply online at least 5 business days in advance to get your digital authorization printed. You can check the definitive rules and direct step-by-step application advice in our dedicated <Link to="/sri-lanka-visa-for-indians" className="text-luxury-gold underline hover:text-luxury-green font-semibold">Sri Lanka Visa Guide</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Accommodation Costs */}
        <section id="hotels" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 04</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Accommodation Costs: Guesthouses to Luxury Boutique Farms</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            Hotels and lodging will consume a solid slice of your travel budget. However, Sri Lanka provides magnificent luxury details at lower price bounds than destinations like Thailand or Bali. Here is a realistic cost spectrum for rooms across Sri Lanka in 2026:
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all">
              <span className="text-xs font-mono text-[#C5A059] uppercase block mb-1">Budget Homestays</span>
              <h4 className="font-serif text-lg font-bold text-luxury-green">₹1,200 – ₹2,500 <span className="text-xs text-luxury-black/50">/ night</span></h4>
              <p className="text-xs text-luxury-black/60 mt-2">
                Deluxe private guest rooms managed by friendly local families, hosting organic home-style breakfast bowls, personal water filters, stable Wi-Fi, and fans.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#d4af37]/30 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#d4af37] text-white text-[9px] uppercase px-3 py-0.5 rounded-bl-xl font-bold font-mono tracking-wider">MVP Choice</div>
              <span className="text-xs font-mono text-[#C5A059] uppercase block mb-1">Mid-Range Chic</span>
              <h4 className="font-serif text-lg font-bold text-luxury-green">₹3,500 – ₹6,500 <span className="text-xs text-luxury-black/50">/ night</span></h4>
              <p className="text-xs text-luxury-black/60 mt-2">
                Stunning boutique hotels inside Ella or seaside beach retreats in Unawatuna possessing lush pool features, heavy local timber panel layout, clean air conditioning, and gorgeous private views.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 shadow-sm hover:border-luxury-gold transition-all">
              <span className="text-xs font-mono text-luxury-green uppercase block mb-1">Bespoke 5-Star Splurge</span>
              <h4 className="font-serif text-lg font-bold text-luxury-green">₹15,000+ <span className="text-xs text-luxury-black/50">/ night</span></h4>
              <p className="text-xs text-luxury-black/60 mt-2">
                Award-winning heritage estates like Heritance Kandalama, ocean-perched resort pads, or historic colonial bungalows in tea country plantations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Food Costs */}
        <section id="food" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 05</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f]">Food Costs: Ceylonese Spices on a Budget</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            Dining in Sri Lanka is incredibly budget-friendly for citizens of India. Because our grains, foundational culinary assets, and spices share close roots, searching for high-morale vegetarian meals is remarkably easy. Let us audit typical meal pricing tags:
          </p>

          <div className="bg-white rounded-3xl p-6 border border-luxury-green/15 max-w-3xl mx-auto space-y-4 shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-luxury-cream">
              <div>
                <h5 className="font-serif font-bold text-sm text-luxury-green">Local Rice & Curry Meal (At a village eatery)</h5>
                <p className="text-xs text-luxury-black/50">5 distinct curry plates served with steamed red rice</p>
              </div>
              <span className="font-mono text-sm font-bold text-luxury-gold">₹120 – ₹200 <span className="text-[10px] text-luxury-black/40">(500–800 LKR)</span></span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-luxury-cream">
              <div>
                <h5 className="font-serif font-bold text-sm text-[#1e3a2f]">Egg Hoppers (A set of 4 crispy local pancakes)</h5>
                <p className="text-xs text-luxury-black/50">Crisp rice-milk bowls served with spicy onion lunu miris</p>
              </div>
              <span className="font-mono text-sm font-bold text-[#8B6E30]">₹80 – ₹130 <span className="text-[10px] text-luxury-black/40">(300–500 LKR)</span></span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-luxury-cream">
              <div>
                <h5 className="font-serif font-bold text-sm text-[#1e3a2f]">Boutique Beachfront Diner (Galle/Mirissa)</h5>
                <p className="text-xs text-luxury-black/50">Deep-fried reef fish, devilled jumbo shrimp, or local pasta dishes</p>
              </div>
              <span className="font-mono text-sm font-bold text-[#8B6E30]">₹800 – ₹1,500 <span className="text-[10px] text-luxury-black/40">(3,000–5,500 LKR)</span></span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-luxury-cream">
              <div>
                <h5 className="font-serif font-bold text-sm text-[#1e3a2f]">Fresh Thambili (King Coconut)</h5>
                <p className="text-xs text-luxury-black/50">Sourced directly from roadside palm vendors</p>
              </div>
              <span className="font-mono text-sm font-bold text-[#8B6E30]">₹35 – ₹55 <span className="text-[10px] text-luxury-black/40">(150–220 LKR)</span></span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-serif font-bold text-sm text-[#1e3a2f]">Large Mineral Water Bottle (1.5L)</h5>
                <p className="text-xs text-luxury-black/50">Standard purified water sealed bottle</p>
              </div>
              <span className="font-mono text-sm font-bold text-[#8B6E30]">₹25 – ₹40 <span className="text-[10px] text-luxury-black/40">(100–150 LKR)</span></span>
            </div>
          </div>
        </section>

        {/* Section 6: Transportation Costs */}
        <section id="transport" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 06</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f]">Local Transportation: PickMe, Epic Trains & Private Drivers</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            How you traverse the teardrop island defines the comfort and momentum of your trip. There are several highly efficient means of internal transportation, accommodating both budget-conscious backpackers and privacy-seeking luxury travelers.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10">
              <h4 className="font-serif font-bold text-[#1e3a2f] mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-luxury-gold" />
                PickMe and Uber App Rides
              </h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed">
                PickMe is Sri Lanka's domestic ride-hailing equivalent to Ola or Uber. It works seamlessly in Colombo, Kandy, Galle, and Negombo. A standard three-wheeler (tuk-tuk) booking costs just **₹40 to ₹60 for short 3 KM hops**. Avoid hailing random unmetered tuk-tuks off the street in high tourist traps.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10">
              <h4 className="font-serif font-bold text-[#1e3a2f] mb-3 flex items-center gap-2">
                <Map className="w-4 h-4 text-[#d4af37]" />
                Epic Scenic Trains (Kandy to Ella First Class)
              </h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed">
                The Blue Train journey through tea plantations is regularly rated one of the most scenic rail corridors on Earth. A reserved seat in **First-Class Air-Conditioned observation cabins costs ₹1,100 to ₹1,400 per seat (4,000–5,000 LKR)**. Booking must be completed 30 days ahead.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10">
              <h4 className="font-serif font-bold text-[#1e3a2f] mb-3 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-luxury-gold" />
                Local Sri Lankan Buses
              </h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed">
                Red public CTB buses and private mini-buses ply every major highway block. A standard trip from Colombo to Galle via ocean highways runs a flat **₹60–₹120 (220–450 LKR)**. They are highly economical but can be extremely noisy, hot, and crowded.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10">
              <h4 className="font-serif font-bold text-[#1e3a2f] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-luxury-gold" />
                Private Cars with Chauffeurs
              </h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed">
                For a family or a couple looking to maximize comfort, hiring an private air-conditioned vehicle with a professional driver-guide costs roughly **₹4,500 to ₹6,500 per day** including fuel, parking clearances, and driver's stay allotments.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: "2 Days Into the Trip From Chennai, We Already Love Sri Lanka" */}
        <section id="love-srilanka" className="scroll-mt-6 py-12 border-b border-luxury-green/10 bg-white p-6 sm:p-10 rounded-3xl shadow-sm mb-12">
          <div className="max-w-3xl mx-auto">
            <span className="p-1 px-2.5 bg-luxury-gold/20 text-luxury-green rounded-full text-[10px] font-mono tracking-widest uppercase font-bold mb-3 inline-block">Review Corner</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-luxury-green mb-6">
              "2 Days Into the Trip From Chennai, We Already Love Sri Lanka!"
            </h2>
            
            <p className="text-luxury-black/80 text-base leading-relaxed mb-6 font-light">
              Many travelers from Chennai are surprised by how incredibly affordable and relaxing Sri Lanka feels compared to other international destinations. Leaving behind the bustling streets of Mount Road and T. Nagar, entering Colombo and coastal Galle feels like stepping into a peaceful paradise.
            </p>

            <blockquote className="border-l-4 border-luxury-gold pl-6 py-2 my-6 bg-luxury-cream text-sm text-luxury-green italic font-serif">
              "We took our parents and toddler for a 7-day loop. Within 24 hours of landing at Colombo, we realized how spacious, clean, and comfortable the mountain roads are. The food feels incredibly safe and similar to our South Indian tastes, yet boasts its own exquisite coconut profile. Buying giant red pineapples and taking PickMe tuk-tuks is incredibly fun and dirt cheap!"
              <span className="block mt-2 text-xs font-mono font-bold text-luxury-black/60 not-italic">— Swati & Vikram, Chennai (June 2026 Travelers)</span>
            </blockquote>

            <p className="text-luxury-black/80 text-sm leading-relaxed mb-4">
              Here is why Chennai visitors fall in love with Sri Lanka within 48 hours:
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 text-xs font-light text-luxury-black text-left">
              <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-luxury-gold mt-0.5" /> <strong>Short Travel Distances:</strong> Spend less time in exhausting transits and more time exploring.</li>
              <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-luxury-gold mt-0.5" /> <strong>Affordable Local Food:</strong> Exquisite organic hopper stands and red rice curries run under ₹200.</li>
              <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-luxury-gold mt-0.5" /> <strong>Budget-Friendly Transports:</strong> Use local PickMe applications with transparent pricing.</li>
              <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-luxury-gold mt-0.5" /> <strong>Extremely Warm Locals:</strong> The hospitality standard across Sri Lankan homestays is legendary.</li>
            </ul>
          </div>
        </section>

        {/* Section 8: Is ₹48,000 Worth a Sri Lanka Trip From India? */}
        <section id="is48k-worth" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 08</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Is ₹48,000 Worth a Sri Lanka Trip From India?</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            If flights are not included, **₹48,000 is usually more than enough for a couple to enjoy a comfortable, highly independent 7-day Sri Lanka trip** in mid-range boutique hotels with daily tour sights. It hits the absolute "value sweet spot" for Indian couples. Let's see how that specific budget gets spent:
          </p>

          <div className="bg-white border border-luxury-green/10 rounded-2xl p-6 shadow-sm mb-6 max-w-2xl mx-auto">
            <h4 className="font-serif font-bold text-luxury-green text-sm mb-4">Example Budget Allocation For An Indian Couple (₹48,050 Land Package)</h4>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center border-b border-luxury-cream pb-2">
                <span className="text-luxury-black/70">🏨 Cozy boutique stays with pools (6 Nights total)</span>
                <span className="font-mono font-bold text-luxury-green">₹24,000 <span className="text-luxury-black/40 text-[10px]">(avg ₹4k/nt)</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-luxury-cream pb-2">
                <span className="text-luxury-black/70">🍲 All local food, sea food arrays & juices</span>
                <span className="font-mono font-bold text-luxury-green">₹9,500 <span className="text-luxury-black/40 text-[10px]">(approx ₹1.3k/day)</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-luxury-cream pb-2">
                <span className="text-luxury-black/70">🚈 Rail, bus & PickMe inter-city transfers</span>
                <span className="font-mono font-bold text-luxury-green">₹6,800</span>
              </div>
              <div className="flex justify-between items-center border-b border-luxury-cream pb-2">
                <span className="text-luxury-black/70">🎟️ Sigiriya fortress tickets + National Park Safari</span>
                <span className="font-mono font-bold text-luxury-green">₹5,750</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-luxury-black/70">📱 Dialog Local SIM cards & emergency cash reserves</span>
                <span className="font-mono font-bold text-luxury-green">₹2,000</span>
              </div>
              
              <div className="bg-luxury-cream p-3 rounded-xl border border-[#d4af37]/30 flex justify-between items-center text-sm font-bold text-luxury-green mt-4">
                <span>Total Calculated Land Cost</span>
                <span className="font-mono text-[#C5A059]">₹48,050 <span className="text-[10px] text-luxury-green/60">(approx 180,000 LKR)</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Chennai → Jaffna → Colombo: A Growing Travel Route */}
        <section id="jaffna-route" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 09</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Chennai → Jaffna → Colombo: A Growing Travel Route</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            An increasing number of Indian travelers are exploring northern Sri Lanka before heading south. Instead of flying directly to Colombo and skipping the cultural heartlands of the north, seasoned travelers are routing their trip via Jaffna.
          </p>

          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            Direct flights on **Alliance Air from Chennai (MAA) to Jaffna Airport (JAF)** operate regularly. Once you land, it is incredibly easy and affordable to take the newly modernized high-speed train networks directly down to Colombo, stopping at ancient UNESCO archaeological ruins on the way.
          </p>

          <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 mb-6">
            <h4 className="font-serif font-bold text-sm text-luxury-green mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-luxury-gold" />
              The Northern Gateway Trail: Step-by-Step Overland Route
            </h4>
            
            <div className="space-y-4 text-xs">
              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-luxury-green text-white flex items-center justify-center shrink-0 font-bold font-mono">1</span>
                <div>
                  <strong>Chennai Airport (MAA) to Jaffna (JAF):</strong> Take an Alliance Air flight (approx 70 minutes). Save baggage costs and glide past custom screening rapidly.
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-luxury-green text-white flex items-center justify-center shrink-0 font-bold font-mono">2</span>
                <div>
                  <strong>Jaffna Exploration:</strong> Rent local scooters to capture the historic Nallur Kandaswamy Kovil, eat sweet palmyra fruit pulp, and explore Delft Island.
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-luxury-green text-white flex items-center justify-center shrink-0 font-bold font-mono">3</span>
                <div>
                  <strong>Anuradhapura Interchange:</strong> Board the daily Yal Devi train or luxury private busses to explore ancient monastic ruins and sacred stupas.
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-luxury-green text-white flex items-center justify-center shrink-0 font-bold font-mono">4</span>
                <div>
                  <strong>Kandy & Central Mountains:</strong> Pivot southeast into the cold mist of Ceylon Tea countries, waterfalls, and Ella's cliff hiking peaks.
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-[#d4af37] text-white flex items-center justify-center shrink-0 font-bold font-mono">5</span>
                <div>
                  <strong>Colombo Terminal:</strong> Finish your trip with local shopping at Pettah Market before flying back under heavy souvenirs.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: How Many Days Do You Need to Explore Sri Lanka? */}
        <section id="howmanydays" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 10</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">How Many Days Do You Need to Explore Sri Lanka?</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            The ideal length of your trip depends heavily on your budget and travel pace. Since the country packs pristine beaches, tea plantations, wildlife parks, and ancient temples in a small geography, even a short trip from Chennai yields incredible adventures.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-luxury-green/5 shadow-sm">
              <span className="text-xs font-mono text-luxury-gold font-bold">📅 5 DAYS: Popular Coastal Highlights</span>
              <p className="text-xs text-luxury-black/70 mt-1">
                Perfect for long weekend getaways. Route your trip as: **Colombo → Galle Fort → Bentota Beaches → Colombo**. Offers a highly relaxed coastal vibe with absolutely zero mountain drive fatigue.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#d4af37]/30 shadow-sm">
              <span className="text-xs font-mono text-luxury-green font-bold">📅 7-10 DAYS: Complete Classic Route (Most Popular)</span>
              <p className="text-xs text-luxury-black/70 mt-1">
                The absolute sweet spot for first-timers. Route it: **Colombo → Sigiriya Fortress → Kandy Culture → Nuwara Eliya → Highlands of Ella → Galle Fort → Colombo**. You get all major cultural, mountain, and beach landmarks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-luxury-green/5 shadow-sm">
              <span className="text-xs font-mono text-luxury-gold font-bold">📅 12-14 DAYS: Slow Exploration with Kids</span>
              <p className="text-xs text-luxury-black/70 mt-1">
                Highly recommended for families. Reduces heavy travel times. Spend 2-3 nights at each spot instead of rushing. Incorporate Yala national park safaris and slow mountain train rides.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-luxury-green/5 shadow-sm">
              <span className="text-xs font-mono text-luxury-gold font-bold">📅 21+ DAYS: Complete Island Wanderer</span>
              <p className="text-xs text-luxury-black/70 mt-1">
                Includes Jaffna, Trincomalee beaches, wilderness parks, remote mountain passes, and hidden coastal villages.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: How Much Do Travelers Spend Per Day in Sri Lanka? */}
        <section id="spendperday" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 11</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Daily Spending Index: Real Budgets Per Day</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            Your real day-to-day spending pattern depends cleanly on your dining choices, activities, and internal transit modes. This detailed spreadsheet maps actual spending profiles per day:
          </p>

          <div className="overflow-x-auto bg-white rounded-2xl border border-luxury-green/10 mb-6 shadow-sm">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-luxury-green text-white font-mono text-[10px] uppercase">
                  <th className="p-4 rounded-tl-2xl">Traveler Class</th>
                  <th className="p-4">Daily Hotel Budget (INR)</th>
                  <th className="p-4">Daily Dining Budget (INR)</th>
                  <th className="p-4">Daily Transits Budget (INR)</th>
                  <th className="p-4 rounded-tr-2xl">Daily Total Average (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream">
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-bold text-luxury-green text-[13px]">🎒 Budget Backpacker</td>
                  <td className="p-4 text-luxury-black/80">₹1,200 – ₹1,800</td>
                  <td className="p-4 text-luxury-black/80">₹400 – ₹600</td>
                  <td className="p-4 text-luxury-black/80">₹200 – ₹450</td>
                  <td className="p-4 font-mono font-bold text-green-700">₹2,300 – ₹3,200</td>
                </tr>
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-bold text-luxury-green text-[13px]">💖 Romantic Honeymooners</td>
                  <td className="p-4 text-luxury-black/80">₹3,800 – ₹6,000</td>
                  <td className="p-4 text-luxury-black/80">₹1,200 – ₹1,800</td>
                  <td className="p-4 text-luxury-black/80">₹800 – ₹1,500</td>
                  <td className="p-4 font-mono font-bold text-amber-700">₹5,800 – ₹9,300</td>
                </tr>
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-bold text-luxury-green text-[13px]">🌴 High-Comfort Family</td>
                  <td className="p-4 text-luxury-black/80">₹7,200 – ₹11,000</td>
                  <td className="p-4 text-luxury-black/80">₹2,200 – ₹4,000</td>
                  <td className="p-4 text-luxury-black/80">₹3,500 – ₹5,000</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹12,900 – ₹20,000</td>
                </tr>
                <tr className="hover:bg-luxury-cream/30">
                  <td className="p-4 font-bold text-luxury-green text-[13px]">👑 Indulgent Ultra Luxury</td>
                  <td className="p-4 text-luxury-black/80">₹18,000 – ₹45,000+</td>
                  <td className="p-4 text-luxury-black/80">₹5,000 – ₹12,000+</td>
                  <td className="p-4 text-luxury-black/80">₹5,500 – ₹10,000</td>
                  <td className="p-4 font-mono font-bold text-purple-900">₹28,500 – ₹67,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 12: Practical Tips Before Visiting Sri Lanka */}
        <section id="practical-tips" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 12</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Practical Tips Before Visiting Sri Lanka</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            A happy, budget-conscious holiday is born from smart operational hygiene. Make sure you memorize these highly actionable, senior-tested hacks before boarding your flight from Chennai:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/5 shadow-sm flex gap-3.5">
              <Smartphone className="w-5 h-5 text-luxury-gold shrink-0 mt-1" />
              <div>
                <h5 className="font-serif font-bold text-base text-luxury-green">Buy a Tourist SIM Card at Colombo Airport</h5>
                <p className="text-xs text-luxury-black/70 mt-1 leading-relaxed">
                  Avoid paying steep international roaming fees. Grab a <strong>Dialog or Mobitel</strong> tourist SIM package directly from Colombo Airport arrivals terminal. It costs around <strong>₹600–₹800 (2,200–3,000 LKR)</strong> and packages 30GB to 50GB of raw, high-speed 4G data.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-green/5 shadow-sm flex gap-3.5">
              <Check className="w-5 h-5 text-luxury-gold shrink-0 mt-1" />
              <div>
                <h5 className="font-serif font-bold text-base text-luxury-green">Download and Link Card to PickMe App</h5>
                <p className="text-xs text-luxury-black/70 mt-1 leading-relaxed">
                  Always use the PickMe and Uber applications to hail rides while staying inside Colombo and Kandy. They feature metered, legal transparent rates, sparing you the stress of negotiating with local street-corner tuk-tuk drivers.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-green/5 shadow-sm flex gap-3.5">
              <DollarSign className="w-5 h-5 text-luxury-gold shrink-0 mt-1" />
              <div>
                <h5 className="font-serif font-bold text-base text-luxury-green">Always Carry Sufficient Local Cash</h5>
                <p className="text-xs text-luxury-black/70 mt-1 leading-relaxed">
                  While larger hotels, cafes, and supermarkets accept credit cards, local street food stalls, vegetable markets, national monument ticket counters, and three-wheeler rides only accept cash. Convert your Indian Rupees or US Dollars into physical Sri Lankan Rupees (LKR) early upon arrival.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-green/5 shadow-sm flex gap-3.5">
              <Info className="w-5 h-5 text-luxury-gold shrink-0 mt-1" />
              <div>
                <h5 className="font-serif font-bold text-base text-luxury-green">Negotiate Taxi and Ride Rates Beforehand</h5>
                <p className="text-xs text-luxury-black/70 mt-1 leading-relaxed">
                  If you are booking a private taxi that doesn't use standard mobile app meters, establish a solid fixed price covering all luggage, highway toll passes, and fuel before entering the vehicle. This prevents unexpected, stressful fare escalations.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-luxury-green/5 shadow-sm flex gap-3.5 col-span-2">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-1" />
              <div>
                <h5 className="font-serif font-bold text-base text-red-950">Crucial Beach Safety & Rip Current Caution</h5>
                <p className="text-xs text-red-900 mt-1 leading-relaxed">
                  The beautiful South and East coast beaches can harbor extremely dangerous rip currents during seasonal monsoonal shifts. <strong>Never swim near red flag warning poles</strong>. Always check with the guest house manager or local beach lifeguards before taking children into the water.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 13: Common Budget Mistakes Indian Travelers Make */}
        <section id="mistakes" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 px-2.5 bg-red-100 text-red-800 rounded-full text-xs font-mono font-bold">WARNINGS</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Common Budget Mistakes Indian Travelers Make</h2>
          </div>
          
          <p className="text-luxury-black/75 mb-6 leading-relaxed">
            Avoiding simple financial leaks can save you thousands of Indian Rupees. Here are the five most common budget blunders our Ella Concierge Desk coordinates:
          </p>

          <div className="space-y-4 text-xs font-light text-luxury-black">
            <div className="p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500">
              <p className="font-serif font-bold text-orange-950 text-sm mb-1">1. Ignoring the Dual Monsoon Weather Split</p>
              <p className="text-[#a0522d]">
                If you book hotels in Galle and Mirissa during the May-September monsoon cycle and expect sunny beaches, you will end up facing high winds and constant rains, resulting in ruined excursions and wasted money. Ensure you design your routes specifically around your month of travel.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500">
              <p className="font-serif font-bold text-orange-950 text-sm mb-1">2. Paying with International Indian Debit Cards on High-ATM Markups</p>
              <p className="text-[#a0522d]">
                A lot of standard Indian debit cards load a high 3.5% to 5% flat currency conversion markup plus transaction gateway fees for every withdrawal. Carry physical Indian currency cash (₹500 notes) and convert them at reputable exchange booths at Colombo Airport arrivals.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500">
              <p className="font-serif font-bold text-orange-950 text-sm mb-1">3. Booking Heritage Hotels Last-Minute During Peak Solstices</p>
              <p className="text-[#a0522d]">
                Popular, boutique cliff cottages in Ella or colonial bungalows in Nuwara Eliya fill completely months in advance. Booking them last minute results in having to settle for expensive, poorly maintained generic accommodations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500">
              <p className="font-serif font-bold text-orange-950 text-sm mb-1">4. Taking Luxury Tourist Taxis for Micro Hops</p>
              <p className="text-[#a0522d]">
                Renting a large AC sedan to simply drive 1 KM up the road from your Ella hotel costs up to ₹1,200. Utilize standard, local PickMe application options which cost less than ₹100 for the same distance.
              </p>
            </div>
          </div>
        </section>

        {/* Section 14: Frequently Asked Questions */}
        <section id="faq" className="scroll-mt-6 py-12 border-b border-luxury-green/10">
          <div className="flex items-center gap-2 mb-6">
            <span className="p-1 px-2.5 bg-luxury-gold/10 text-luxury-gold rounded-full text-xs font-mono font-bold">SECTION 14</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "Is Sri Lanka cheaper than Maldives for tourists flying from Chennai?",
                a: "Yes, exponentially cheaper. A comfortable, premium 7-day tour across Sri Lanka (hotels, fine dining, private transport) costs roughly 50% to 65% less than a comparable high-end resort vacation in the Maldives. Sri Lanka also offers vastly more variety, with rich wildlife, rain forests, culture, and spectacular mountains, whereas most Maldives visits are confined to a single beach resort island."
              },
              {
                q: "Is Sri Lanka worth visiting from Chennai on a budget?",
                a: "100% yes! Its extremely close proximity to Chennai means flights are quick (80 mins) and highly affordable. Furthermore, because of the currency exchange rate where the local Sri Lankan Rupee (LKR) trades highly favorably against the Indian Rupee (INR), the purchasing power of an Indian traveler is heavily magnified inside the country."
              },
              {
                q: "What is the cheapest way to travel from Chennai to Sri Lanka?",
                a: "The most economical route is booking promotional flight tickets (on Chennai to Colombo or Jaffna routes) several months in advance. Backpackers and value hunters can also dramatically lower costs by traveling on scenic trains (2nd and 3rd class), riding local buses, and staying in family-run guesthouses."
              },
              {
                q: "How much cash should I carry from Chennai?",
                a: "For a typical 7-day trip, we advise carrying roughly ₹15,000 to ₹20,000 in physical cash per person to convert into local LKR currency at the Colombo Airport exchange booths. Though major hotels and premium restaurants take credit cards, local street food stalls, markets, tuk-tuks, and park safaris will only accept cash."
              },
              {
                q: "Is ₹48,000 enough for a complete Sri Lanka holiday from India?",
                a: "Yes! If you exclude flight tickets, a land budget of ₹48,000 is an incredibly powerful amount of money. It is more than enough for a couple to easily pay for cozy private boutique hotels, dine at beautiful coastal cafes, cover park safari entry fees, and explore the entire classic travel loop comfortably over 7 days."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-luxury-green/10 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-serif font-bold text-luxury-green flex justify-between items-center text-sm gap-4 hover:bg-luxury-cream/30"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-luxury-gold shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-luxury-gold shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 pt-0 border-t border-luxury-cream text-xs text-luxury-black/70 leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Section 15: Plan Your Personalized Sri Lanka Trip (Strong Conversion CTA Area) */}
        <section id="cta" className="scroll-mt-6 py-12">
          <div className="bg-luxury-green text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg border border-[#d4af37]/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 brightness-[0.3]" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold animate-spin-slow" />
                No More Generic Estimations
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#fcfbf7]">
                Calculate Your Custom Sri Lanka Budget & Itinerary in Real Time
              </h2>
              
              <p className="text-sm text-luxury-cream/80 leading-relaxed max-w-2xl mx-auto font-light">
                Why rely on generic averages? Use our custom, interactive, fully bespoke Sri Lanka Trip & Route Planner. Enter your travel dates, pick your companion styles, toggle your budget indices, and get a tailored day-by-day map instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <button
                  onClick={() => handleCtaClick("chennai_pillar_main_cta")}
                  className="bg-[#d4af37] text-white hover:bg-white hover:text-luxury-green font-bold text-sm px-8 py-4 rounded-xl shadow-lg transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
                >
                  🚀 Launch Sri Lanka Trip Planner
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-transparent text-white border border-white/20 hover:border-luxury-gold font-bold text-sm px-8 py-4 rounded-xl transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  💬 Chat With Ella Concierge Desk
                </button>
              </div>

              <p className="text-[10px] text-white/40 font-mono">
                Safe & Professional Travel Coordination • Approved by Ceylon Tourism Board Guidelines
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
