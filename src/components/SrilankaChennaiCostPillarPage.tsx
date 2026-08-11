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
  Users,
  Wallet,
  Globe,
  Wifi,
  Calculator,
  BadgeCheck,
  XCircle,
  BookOpen
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaChennaiCostPillarPage() {
  usePageMetadata({
    title: "Sri Lanka Trip Cost From Chennai (2026): Flights & Budget",
    description: "Planning a Sri Lanka trip from Chennai? See flight, hotel, food, and transport costs, plus our Jaffna overland route guide.",
    canonicalUrl: "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai",
    ogUrl: "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [calcDays, setCalcDays] = useState<3 | 5 | 7 | 10>(5);
  const [calcTier, setCalcTier] = useState<"budget" | "mid" | "luxury">("budget");
  const [calcTravelers, setCalcTravelers] = useState<1 | 2 | 4>(1);

  const perDayRate: Record<string, number> = {
    budget: 4800,
    mid: 9800,
    luxury: 19500
  };
  const flightBase: Record<string, number> = {
    budget: 11000,
    mid: 15500,
    luxury: 22000
  };
  const calcTotalPerPerson = flightBase[calcTier] + perDayRate[calcTier] * calcDays;
  const calcGrandTotal = calcTotalPerPerson * calcTravelers;

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
            "headline": "Sri Lanka Trip Cost From Chennai (2026) | Flights, Hotels & Budget Guide",
            "description": "Find the real cost of visiting Sri Lanka from Chennai. Compare 5-day, 7-day, family and honeymoon budgets, flight prices, hotels and transport costs.",
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

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com/" },
              { "@type": "ListItem", "position": 2, "name": "Sri Lanka Trip Cost", "item": "https://plan-srilanka.com/sri-lanka-trip-cost-from-india" },
              { "@type": "ListItem", "position": 3, "name": "From Chennai", "item": "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai" }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "How Much Will It Take to Visit Sri Lanka From Chennai? (2026 Cost Guide)",
            "url": "https://plan-srilanka.com/how-much-will-it-take-to-visit-sri-lanka-from-chennai",
            "inLanguage": "en-IN",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Plan Sri Lanka Concierge",
              "url": "https://plan-srilanka.com/"
            },
            "about": {
              "@type": "Thing",
              "name": "Sri Lanka trip cost from Chennai"
            },
            "reviewedBy": {
              "@type": "Person",
              "name": "Adithya Oshada",
              "jobTitle": "Lead Ceylon Travel Stylist"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Plan Sri Lanka Concierge",
            "url": "https://plan-srilanka.com/",
            "logo": "https://plan-srilanka.com/favicon.png",
            "sameAs": []
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
            Simple 2026 Budget Guide
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            How Much Will It Take to Visit Sri Lanka From Chennai? <br/>
            <span className="text-luxury-gold font-normal italic">(2026 Cost Guide)</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Planning a short escape from the Chennai heat? Sri Lanka is just an 80-minute flight away. This guide shows you the real costs of flights, visa rules, hotels, and daily budgets.
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

        {/* EEAT: Author & Trust Strip */}
        <section className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-luxury-green/10 rounded-2xl p-5 mb-12 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
            alt="Adithya Oshada, Lead Ceylon Travel Stylist"
            className="w-14 h-14 rounded-full object-cover border-2 border-luxury-gold/40 shrink-0"
          />
          <div className="text-center sm:text-left flex-1">
            <p className="text-sm font-serif font-bold text-luxury-green">
              Written & priced by Adithya Oshada <BadgeCheck className="w-4 h-4 text-luxury-gold inline -mt-1 ml-1" />
            </p>
            <p className="text-xs text-luxury-black/60 font-light leading-relaxed mt-1">
              Lead Ceylon Travel Stylist, 8+ years planning Chennai-to-Sri Lanka trips on the ground in Colombo, Galle, and Ella. Every price on this page is cross-checked against live Chennai-Colombo airfares, hotel rate cards, and 2026 ETA visa fees.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1 text-[10px] font-mono text-luxury-black/50 shrink-0">
            <span>Fact-checked: <strong className="text-luxury-green">Jul 2026</strong></span>
            <span>Sources: <strong className="text-luxury-green">SriLankan Airlines, IndiGo, Sri Lanka Immigration ETA Portal</strong></span>
          </div>
        </section>

        {/* Dynamic Mid-Page High-Conversion CTA for Chennai travelers */}
        <div className="bg-gradient-to-r from-luxury-green to-[#132c21] text-white p-6 sm:p-8 rounded-3xl mb-12 shadow-md border border-[#d4af37]/20 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-4">
            <Compass className="w-40 h-40 text-luxury-gold" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-2">
              <span className="px-2.5 py-0.5 bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-gold text-[10px] font-mono uppercase tracking-wider rounded-full font-bold">Chennai Direct Concierge</span>
              <h4 className="text-lg sm:text-xl font-serif font-bold text-[#fcfbf7]">Planning from Chennai?</h4>
              <p className="text-xs text-luxury-cream/80 max-w-sm font-light">
                Get a free personalized Sri Lanka travel plan tailored to Chennai flight timings, custom budgets, and your unique style.
              </p>
            </div>
            <button
              onClick={() => handleCtaClick("mid_page_chennai_quick_cta")}
              className="bg-luxury-gold text-white hover:bg-white hover:text-luxury-green text-xs font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-lg group w-full md:w-auto justify-center"
            >
              🚀 Get Your Free Plan <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Links Header Grid */}
        <section className="mb-12">
          <div className="bg-luxury-green/5 border border-luxury-green/10 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-luxury-green/60 uppercase tracking-widest font-bold block mb-3">Quick Navigation Navigation</span>
            <div className="flex flex-wrap gap-2.5 text-xs">
              <a href="#glance" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">1. Cost Breakdown</a>
              <a href="#calculator" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">2. Budget Calculator</a>
              <a href="#distance" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">3. Distance</a>
              <a href="#flights" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">4. Flight Costs</a>
              <a href="#visa" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">5. Visa Cost</a>
              <a href="#sim-currency" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">6. SIM & Currency</a>
              <a href="#3day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">7. 3-Day Costs</a>
              <a href="#5day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">8. 5-Day Costs</a>
              <a href="#7day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">9. 7-Day Costs</a>
              <a href="#family" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">10. Family Budgets</a>
              <a href="#honeymoon" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">11. Honeymoon Costs</a>
              <a href="#itinerary-chennai" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">12. 7-Day Itinerary</a>
              <a href="#best-time" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">13. Best Time to Visit</a>
              <a href="#flight-schedule" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">14. Flight Schedule</a>
              <a href="#reduce" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">15. Cost Saving Tips</a>
              <a href="#mistakes" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">16. Common Mistakes</a>
              <a href="#faq" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">17. FAQs</a>
            </div>
          </div>
        </section>

        {/* Dynamic Inner Link Box: Sequential Planning Pipeline */}
        <div className="bg-white border-2 border-luxury-gold/20 p-6 sm:p-8 rounded-3xl mb-12 shadow-sm">
          <p className="font-bold uppercase tracking-widest text-[11px] text-luxury-gold mb-4 flex items-center gap-1.5 font-mono">
            <Info className="w-4 h-4" /> Sri Lanka Planning Pipeline (Step-by-Step):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch relative">
            <Link to="/how-to-plan-a-trip-to-sri-lanka" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Step 1</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Sri Lanka Trip Planner</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Our master step-by-step master planner guide.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-7-day-itinerary-from-chennai" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Step 2</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">7 Day Itinerary from Chennai</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Day-by-day route built specifically for MAA flyers.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">View Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-visa-for-indians" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Step 3</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Visa Guide</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Complete online ETA registration & waivers.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Check Rules</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/best-time-to-visit-sri-lanka" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Step 4</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Best Time to Visit</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Dual monsoon mapping & ideal seasonal months.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">See Weather</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-car-rental" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Step 5</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Car Rental in Sri Lanka</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Self-drive vehicle options and daily prices.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">See Prices</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-trip-cost-from-india" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Step 6</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Cost From Other Indian Cities</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Compare budgets from anywhere in India.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Compare Costs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/flights" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Step 6</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Flights Guide</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Find and time the cheapest fares.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Search Flights</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* H2: Sri Lanka Trip Cost From Chennai Breakdown */}
        <section id="glance" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Trip Cost From Chennai Breakdown
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-8">
            How do you plan your expenses? When estimating your <strong>sri lanka travel cost from chennai</strong>, budgets can be split into five main categories so you can plan easily.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 text-blue-700">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Flights</h4>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">₹10,000 - ₹18,000</p>
              <span className="text-[10px] text-luxury-black/50 block mt-1 leading-snug">Return ticket if booked early.</span>
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

        {/* H2: Interactive Sri Lanka Budget Calculator */}
        <section id="calculator" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Trip Cost Calculator (From Chennai)
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Get an instant, personalized estimate. Choose your trip length, comfort level, and group size below — the numbers update immediately using the same 2026 flight, hotel, and transport rates used throughout this guide.
          </p>

          <div className="bg-white border border-luxury-green/10 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-luxury-green/70 font-bold block mb-2">Trip Length</label>
                <div className="flex gap-2 flex-wrap">
                  {[3, 5, 7, 10].map((d) => (
                    <button
                      key={d}
                      onClick={() => setCalcDays(d as 3 | 5 | 7 | 10)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${calcDays === d ? "bg-luxury-green text-white border-luxury-green" : "bg-luxury-cream/20 text-luxury-green border-luxury-green/10 hover:border-luxury-gold"}`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-luxury-green/70 font-bold block mb-2">Comfort Level</label>
                <div className="flex gap-2 flex-wrap">
                  {(["budget", "mid", "luxury"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setCalcTier(t)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold border capitalize transition-all ${calcTier === t ? "bg-luxury-green text-white border-luxury-green" : "bg-luxury-cream/20 text-luxury-green border-luxury-green/10 hover:border-luxury-gold"}`}
                    >
                      {t === "mid" ? "Mid-range" : t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-luxury-green/70 font-bold block mb-2">Travelers</label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 4].map((p) => (
                    <button
                      key={p}
                      onClick={() => setCalcTravelers(p as 1 | 2 | 4)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${calcTravelers === p ? "bg-luxury-green text-white border-luxury-green" : "bg-luxury-cream/20 text-luxury-green border-luxury-green/10 hover:border-luxury-gold"}`}
                    >
                      {p === 1 ? "Solo" : p === 2 ? "Couple" : "Family (4)"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-luxury-green to-[#132c21] rounded-2xl p-6 text-center text-white">
              <p className="text-[10px] font-mono uppercase tracking-wider text-luxury-cream/60 mb-1">Estimated Total ({calcDays} Days, {calcTravelers === 1 ? "Solo" : calcTravelers === 2 ? "Couple" : "Family of 4"}, {calcTier === "mid" ? "Mid-range" : calcTier})</p>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-luxury-gold">₹{calcGrandTotal.toLocaleString("en-IN")}</p>
              <p className="text-xs text-luxury-cream/70 mt-2 font-light">≈ ₹{calcTotalPerPerson.toLocaleString("en-IN")} per person, including flights, hotels, food, transport & entry tickets.</p>
              <button
                onClick={() => handleCtaClick("calculator_cta")}
                className="mt-4 bg-luxury-gold text-white hover:bg-white hover:text-luxury-green text-xs font-bold py-2.5 px-5 rounded-xl transition-all inline-flex items-center gap-1.5"
              >
                Get an Exact Quote <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-luxury-black/40 mt-3 italic font-light text-center">
              *Estimate only. Actual cost varies with season, hotel brand, and booking window — see the detailed tables below.
            </p>
          </div>
        </section>

        {/* H2: Chennai to Sri Lanka Distance */}
        <section id="distance" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Navigation className="w-6 h-6 text-[#d4af37]" />
            Chennai to Sri Lanka Distance
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            When planning a trip, understanding the geographical proximity makes the journey feel even closer. The actual physical distance between Chennai and Sri Lanka is incredibly short, making it quicker to reach than many domestic Indian destinations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-luxury-green">Chennai → Colombo (Air Route)</h4>
                <p className="text-base font-mono font-bold text-luxury-gold mt-1">≈ 650 km</p>
              </div>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold transition-all flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-luxury-green">Flight Duration</h4>
                <p className="text-base font-mono font-bold text-luxury-gold mt-1">≈ 1 hour 20 minutes</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-luxury-green/10 bg-white p-2">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2]">
                  <th className="p-4 font-serif font-bold text-luxury-green">Route</th>
                  <th className="p-4 font-serif font-bold text-luxury-green">Distance</th>
                  <th className="p-4 font-serif font-bold text-luxury-green">Flight Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-luxury-green/5 hover:bg-[#fdfaf2]/40 transition-colors">
                  <td className="p-4 font-medium text-[#333333]">Chennai to Colombo</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">650 km</td>
                  <td className="p-4 font-medium text-[#333333]">1h 20m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* H2: Chennai to Sri Lanka Tour Package Cost */}
        <section id="package-cost" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#d4af37]" />
            Chennai to Sri Lanka Tour Package Cost
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Compare all-inclusive standard packages departing from Chennai. These projections cover direct airfares, standard accommodations, breakfast plans, basic tourist entry cards, and daily private car commutes.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm p-2">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Duration</th>
                  <th className="p-4">Budget Package (Solo)</th>
                  <th className="p-4">Mid-Range Package (Per Person)</th>
                  <th className="p-4">Luxury Package (Per Person)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream">
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-serif font-bold text-luxury-green">3 Days (Weekend Escape)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹18,000 - ₹24,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹28,000 - ₹38,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹55,000 - ₹75,000</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-serif font-bold text-luxury-green">5 Days (Coastal Beach Tour)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹25,000 - ₹34,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹45,000 - ₹62,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹90,000 - ₹1,20,000</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-serif font-bold text-luxury-green">7 Days (Classic Highlands Loop)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹33,000 - ₹45,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹58,000 - ₹78,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹1,20,000 - ₹1,65,000</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-serif font-bold text-luxury-green">10 Days (Comprehensive Tour)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹45,000 - ₹58,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹78,000 - ₹1,10,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹1,75,000 - ₹2,40,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-luxury-black/50 mt-3 italic font-light text-center">
            *Note: Package estimates are comprehensive of average seasonal flight fares from Chennai (MAA) and are updated for the 2026 travel season.
          </p>
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

        {/* H2: Sri Lanka Visa Cost For Chennai/Indian Travelers */}
        <section id="visa" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Visa Cost From Chennai
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Every Indian passport holder needs a <strong>Tourist Electronic Travel Authorization (ETA)</strong> before boarding a Chennai-Colombo flight — there is no physical visa stamp or embassy visit required. Apply online at the official Sri Lanka ETA portal 3-7 days before departure.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm p-2 mb-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Visa Type</th>
                  <th className="p-4">Validity</th>
                  <th className="p-4 text-right">Cost (Per Person)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream">
                <tr>
                  <td className="p-4 font-serif font-bold text-luxury-green">Tourist ETA (standard)</td>
                  <td className="p-4 font-light text-luxury-black/80">30 days, single entry</td>
                  <td className="p-4 text-right font-mono font-bold text-luxury-gold">$20 (≈ ₹1,700)</td>
                </tr>
                <tr>
                  <td className="p-4 font-serif font-bold text-luxury-green">Tourist ETA (promotional waiver)</td>
                  <td className="p-4 font-light text-luxury-black/80">30 days, single entry</td>
                  <td className="p-4 text-right font-mono font-bold text-luxury-gold">₹0 (during active schemes)</td>
                </tr>
                <tr>
                  <td className="p-4 font-serif font-bold text-luxury-green">Double Entry ETA</td>
                  <td className="p-4 font-light text-luxury-black/80">30 days, 2 entries</td>
                  <td className="p-4 text-right font-mono font-bold text-luxury-gold">$35 (≈ ₹2,950)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light">
            Apply only via the government ETA portal — never through third-party agents charging a markup. You'll need a passport valid for 6+ months, a return flight ticket, and a debit/credit card for online payment. Approval usually lands in your inbox within 24 hours. Full document checklist and step-by-step screenshots are in our <Link to="/sri-lanka-visa-for-indians" className="text-luxury-green font-bold underline decoration-luxury-gold/50 hover:text-luxury-gold">Sri Lanka Visa for Indians guide</Link>.
          </p>
        </section>

        {/* H2: SIM Card & Currency Exchange */}
        <section id="sim-currency" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Wifi className="w-6 h-6 text-[#d4af37]" />
            SIM Card & Currency Exchange Costs
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm">
              <h4 className="font-serif font-bold text-sm text-luxury-green mb-2 flex items-center gap-1.5"><Smartphone className="w-4 h-4 text-luxury-gold" /> Local SIM Card</h4>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                Dialog, Mobitel, and Airtel Lanka counters at Bandaranaike Airport (CMB) sell tourist SIM packs with 20-50GB data for <strong>₹350 - ₹800</strong>. eSIMs (Airalo, Holafly) can be activated before you even leave Chennai for ₹500 - ₹1,200.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm">
              <h4 className="font-serif font-bold text-sm text-luxury-green mb-2 flex items-center gap-1.5"><Globe className="w-4 h-4 text-luxury-gold" /> Currency Exchange</h4>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                Convert INR cash to Sri Lankan Rupees (LKR) at the airport or licensed city exchange counters — rates are typically better in Colombo/Fort than at the airport kiosk. 1 INR ≈ 3.9 - 4.1 LKR (check live rates before you fly). Avoid unlicensed street changers.
              </p>
            </div>
          </div>
        </section>

        {/* H2: 3 Day Sri Lanka Trip Cost From Chennai */}
        <section id="3day" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#d4af37]" />
            3 Day Sri Lanka Trip Cost From Chennai (Weekend Escape)
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Since Chennai is only 80 minutes from Colombo, a 3-day weekend trip is genuinely doable without burning a full leave block — fly out Friday evening, return Sunday night. This window is best spent entirely around Colombo, Negombo, or Bentota rather than the hill country.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-luxury-green/10">
            <div>
              <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Budget</span>
              <p className="text-xl font-serif font-bold text-luxury-green">₹18,000 - ₹24,000</p>
              <p className="text-[11px] text-luxury-black/60 font-light mt-1">Guesthouse stays, tuk-tuk/PickMe transit, local cafes.</p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Mid-range</span>
              <p className="text-xl font-serif font-bold text-luxury-green">₹28,000 - ₹38,000</p>
              <p className="text-[11px] text-luxury-black/60 font-light mt-1">3-star beach hotel, private car for 2 days, sit-down dinners.</p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Luxury</span>
              <p className="text-xl font-serif font-bold text-luxury-green">₹55,000 - ₹75,000</p>
              <p className="text-[11px] text-luxury-black/60 font-light mt-1">Boutique beach resort, chauffeured sedan, fine dining.</p>
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

          {/* Detailed Budget Breakdown Sub-Section */}
          <div className="mt-8 space-y-4">
            <h3 className="font-serif font-bold text-lg text-luxury-green border-b border-luxury-cream pb-2">📦 Budget Breakdown for Families</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Flights</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹40,000 - ₹55,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Direct round-trip flights from Chennai (MAA) to Colombo (CMB) for a family of 4 on budget carriers like IndiGo or Alliance Air.</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Hotels</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹48,000 - ₹90,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">6 nights in adjoining family rooms or beachside villa rentals with swimming pools (averaging ₹8,000 - ₹15,000 per night).</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Food</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹12,000 - ₹24,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Kid-safe local hoppers, mild coconut white curries, organic fruits, and standard family cafe dinners.</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Transport</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹30,000 - ₹42,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Spacious private AC van (Toyota HiAce/KDH) with dedicated driver-guide covering all local travel and luggage.</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Visa</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹0 - ₹5,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Online ETA is free (₹0) under dynamic booster schemes or standard ₹1,650/adult depending on the promotional season.</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Activities</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹15,000 - ₹25,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Entrance fees to Sigiriya Lion Rock Fortress, botanical garden walks, Yala national park safaris, and train tickets.</p>
              </div>
            </div>
          </div>
          
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mt-6">
            With standard direct flights from Chennai making flight fatigue extremely minimal, Sri Lanka serves as the ultimate international family introductory getaway.
          </p>
        </section>

        {/* H2: Sri Lanka Honeymoon Package Cost From Chennai */}
        <section id="honeymoon" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Honeymoon Package Cost From Chennai
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

          {/* Detailed Budget Breakdown Sub-Section */}
          <div className="mt-8 space-y-4">
            <h3 className="font-serif font-bold text-lg text-luxury-green border-b border-luxury-cream pb-2">📦 Budget Breakdown for Honeymoons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Flights</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹24,000 - ₹32,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Round-trip flights from Chennai (MAA) to Colombo (CMB) for 2 adults on premier carriers (e.g., SriLankan Airlines) with full luggage allowance.</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Hotels</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹60,000 - ₹1,50,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">6 nights in premium honeymoon suites, cozy cliff villas, and private plunge pool beach properties (averaging ₹10,000 - ₹25,000 per night).</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Food</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹18,000 - ₹36,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Fine dining, beachside candlelit seafood dinners, fresh ocean cocktails, and colonial high tea.</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Transport</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹24,000 - ₹33,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Private comfortable sedan with a professional English-speaking chauffeur-guide for highly personalized touring.</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Visa</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹0 - ₹3,300</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Tourist online ETA registration for 2 travelers (regularly waived to ₹0, standard is ₹1,650/person).</p>
              </div>
              <div className="p-4 bg-white border border-luxury-green/10 rounded-xl hover:border-luxury-gold/50 transition-colors shadow-sm">
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Activities</span>
                <p className="text-base font-serif font-bold text-luxury-green mb-1">₹12,000 - ₹22,000</p>
                <p className="text-xs text-luxury-black/70 leading-relaxed font-light">Romantic whale watching, couples' spa massage, private Yala leopard safari drives, and scenic highlands train tickets.</p>
              </div>
            </div>
          </div>
        </section>

        {/* H2: Best 7-Day Sri Lanka Itinerary From Chennai */}
        <section id="itinerary-chennai" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#d4af37]" />
            Best 7-Day Sri Lanka Itinerary From Chennai
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Looking for a perfectly balanced route optimized for flights originating from Chennai? Since flights out of Anna International Airport (MAA) are short, they arrive early or mid-day, leaving your very first afternoon completely open for exploration.
          </p>
          <div className="space-y-4">
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold/50 transition-colors">
              <span className="font-mono text-xs font-bold text-luxury-gold uppercase block mb-1">Day 1: Arrival & Coastal Breeze</span>
              <p className="text-xs text-luxury-black/80 font-light leading-relaxed">
                Depart Chennai in the morning. Touch down at CMB by noon, retrieve currency, and settle in your cozy boutique beach hotel in Negombo or Bentota (approx. ₹3,500). Spend a relaxing afternoon overlooking the Indian Ocean.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold/50 transition-colors">
              <span className="font-mono text-xs font-bold text-luxury-gold uppercase block mb-1">Day 2: The Mighty Sigiriya Rock Fortress</span>
              <p className="text-xs text-luxury-black/80 font-light leading-relaxed">
                Take a private AC sedan ride to the Cultural Triangle. Climb the legendary <strong>Sigiriya Lion Rock Fortress</strong> in the cool morning hours, followed by an authentic wood-fired organic village lunch.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold/50 transition-colors">
              <span className="font-mono text-xs font-bold text-luxury-gold uppercase block mb-1">Day 3: Sacred Kandy & High-Altitude Tea Estates</span>
              <p className="text-xs text-luxury-black/80 font-light leading-relaxed">
                Settle in the royal castle capital of Kandy. Savor beautiful flower offerings inside the <strong>Temple of the Tooth Relic</strong> and stroll through aromatic spice forests.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold/50 transition-colors">
              <span className="font-mono text-xs font-bold text-luxury-gold uppercase block mb-1">Day 4: Epic Highland Train Carriage to Ella</span>
              <p className="text-xs text-luxury-black/80 font-light leading-relaxed">
                Board the legendary blue train departing Kandy, snaking past cascading waterfalls and vast terraced tea gardens to the mist-shrouded village of Ella.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold/50 transition-colors">
              <span className="font-mono text-xs font-bold text-luxury-gold uppercase block mb-1">Day 5: Iconic Hikes & Southern Waves</span>
              <p className="text-xs text-luxury-black/80 font-light leading-relaxed">
                Snap photos at the <strong>Nine Arch Bridge</strong> and hike Little Adam’s Peak. Drive down the mountain foothills for a beautiful sunset at Mirissa Beach or Weligama.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm hover:border-luxury-gold/50 transition-colors">
              <span className="font-mono text-xs font-bold text-luxury-gold uppercase block mb-1">Day 6: Whale Watching & UNESCO Galle Fort</span>
              <p className="text-xs text-luxury-black/80 font-light leading-relaxed">
                Stroll the historic cobblestone streets of <strong>UNESCO Galle Fort</strong>. Find beautiful gelato stores, chic boutiques, and colonial architectures.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#d4af37]/25 shadow-sm bg-[#fdfaf2]">
              <span className="font-mono text-xs font-bold text-luxury-gold uppercase block mb-1">Day 7: Souvenirs & Flight back to Chennai</span>
              <p className="text-xs text-luxury-black/80 font-light leading-relaxed">
                Drive up to Colombo for some quick hand-loomed shopping, enjoy Colombo's famous crab specialties, and hop onto your short flight returning to Chennai.
              </p>
            </div>
          </div>
        </section>

        {/* H2: Best Time to Visit Sri Lanka From Chennai */}
        <section id="best-time" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#d4af37]" />
            Best Time to Visit Sri Lanka From Chennai
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            The climate of Sri Lanka is characterized by a "dual monsoon" cycle, meaning different sides of the island experience perfect weather at different periods of the year. This weather profile is ideal for travelers escaping the intense Chennai summer or looking for cool winter breaks.
          </p>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Chennai travelers have a unique planning advantage: since the flight duration is just about 1 hour 20 minutes, any weekend, national holiday, or major festival such as Pongal, Diwali, or summer school vacations can be seamlessly transformed into a tropical escape. By matching your travel dates with the right side of the island (the West/South coast from December to April, or the East coast from May to September), you can guarantee a perfect, sun-kissed vacation without worrying about heavy rains.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm">
              <strong className="text-sm font-serif text-luxury-green block mb-2">🌴 Winter Peak (December to April)</strong>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                This is the best season to explore the South and West Coast beaches (Galle, Bentota, Hikkaduwa, Mirissa) and central hill country (Nuwara Eliya, Ella). Safe from rain, sunny, and perfect for sunset beach dining.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-luxury-green/5 shadow-sm">
              <strong className="text-sm font-serif text-luxury-green block mb-2">☀️ Summer Escapes (May to September)</strong>
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                If you are planning to travel during Chennai's school vacations, head to Sri Lanka's beautiful Northern and Eastern beaches (Nilaveli, Trincomalee, Passikudah) or explore historical ancient cities which remain wonderfully dry.
              </p>
            </div>
          </div>
        </section>

        {/* H2: Chennai to Colombo Flight Schedule Guide */}
        <section id="flight-schedule" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Plane className="w-6 h-6 text-[#d4af37]" />
            Chennai to Colombo Flight Schedule Guide
          </h2>
          <p className="text-[#333333]/90 leading-relaxed text-sm sm:text-base font-light mb-6">
            Thanks to the high volume of business and leisure travel between Tamil Nadu and Sri Lanka, there are multiple daily direct flights connecting Chennai (MAA) to Colombo (CMB):
          </p>
          <div className="overflow-hidden border border-luxury-green/10 rounded-2xl mb-6 bg-white">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-luxury-green/5 text-luxury-green font-mono text-[10px] uppercase border-b border-luxury-green/10">
                  <th className="p-4">Airline</th>
                  <th className="p-4">Flight Details</th>
                  <th className="p-4 text-right">Luggage Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream">
                <tr className="hover:bg-luxury-cream/10">
                  <td className="p-4 font-bold text-luxury-green">IndiGo Airlines</td>
                  <td className="p-4 leading-relaxed font-light text-luxury-black/80">
                    Multiple daily direct flights. Great for mid-morning and late evening departures.
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-luxury-gold">15 Kg Check-in</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10">
                  <td className="p-4 font-bold text-luxury-green">SriLankan Airlines</td>
                  <td className="p-4 leading-relaxed font-light text-luxury-black/80">
                    Premium full-service airline. Daily departures. Hot inflight dining with delicious South-Asian flavors.
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-luxury-gold">30 Kg Checked</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10">
                  <td className="p-4 font-bold text-luxury-green">Alliance Air / Others</td>
                  <td className="p-4 leading-relaxed font-light text-luxury-black/80">
                    Direct flights connecting Chennai to Jaffna (JAF) Airport—highly recommended for travelers seeking a deep cultural tour of northern Sri Lanka.
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-luxury-gold">15 Kg Check-in</td>
                </tr>
              </tbody>
            </table>
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

        {/* H2: Common Mistakes Chennai Travelers Make */}
        <section id="mistakes" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <XCircle className="w-6 h-6 text-[#d4af37]" />
            Common Mistakes Chennai Travelers Make
          </h2>
          <div className="space-y-3">
            <div className="p-4 bg-white border border-luxury-green/5 rounded-2xl flex gap-3 items-start shadow-sm">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-luxury-black/75 font-light leading-relaxed"><strong>Booking flights less than 2 weeks out.</strong> Chennai-Colombo fares can double during festival weekends (Pongal, Diwali) — book 45-60 days ahead for the ₹10,000-₹12,000 fares.</p>
            </div>
            <div className="p-4 bg-white border border-luxury-green/5 rounded-2xl flex gap-3 items-start shadow-sm">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-luxury-black/75 font-light leading-relaxed"><strong>Skipping the ETA and assuming Aadhaar/PAN works.</strong> Sri Lanka is an international destination — you need a valid passport and an approved ETA before check-in, not just an Indian ID card.</p>
            </div>
            <div className="p-4 bg-white border border-luxury-green/5 rounded-2xl flex gap-3 items-start shadow-sm">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-luxury-black/75 font-light leading-relaxed"><strong>Cramming the hill country into a 3-day trip.</strong> Kandy, Ella, and Nuwara Eliya need at least 2 extra travel days — attempting them on a short weekend causes exhausting backtracking.</p>
            </div>
            <div className="p-4 bg-white border border-luxury-green/5 rounded-2xl flex gap-3 items-start shadow-sm">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-luxury-black/75 font-light leading-relaxed"><strong>Relying only on card payments.</strong> Small guesthouses, tuk-tuks, and roadside cafes outside Colombo are cash-only — always carry LKR cash converted from INR.</p>
            </div>
            <div className="p-4 bg-white border border-luxury-green/5 rounded-2xl flex gap-3 items-start shadow-sm">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-luxury-black/75 font-light leading-relaxed"><strong>Negotiating with unmetered tuk-tuks.</strong> Always use PickMe or Uber for transparent, metered fares instead of street-hailed three-wheelers that quote 3x the local rate to tourists.</p>
            </div>
          </div>
        </section>

        {/* Interactive FAQ Accordion Area */}
        <section id="faq" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-2 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#d4af37]" />
            Frequently Asked Questions
          </h2>
          <p className="text-sm font-light text-luxury-black/75 mb-8">
            Clear, authoritative answers to help you structure your logistics and expenses perfectly from Chennai.
          </p>

          <div className="space-y-4">
            {[
              {
                q: "Is a passport required to visit Sri Lanka from India?",
                a: "Yes, a physical passport is absolutely required. Your passport must have at least 6 months of validity from your date of arrival in Sri Lanka. You cannot travel to Sri Lanka using an Aadhaar card, PAN card, or Voter ID, as it is an international flight destination."
              },
              {
                q: "Can I use Indian Rupees (INR) in Sri Lanka?",
                a: "No, you cannot spend Indian Rupees directly in Sri Lankan shops, restaurants, or taxis. You must convert your INR cash into Sri Lankan Rupees (LKR) at Bandaranaike Airport (CMB) on arrival, or use international debit/credit cards at local ATMs to withdraw LKR."
              },
              {
                q: "How many days are enough to visit Sri Lanka?",
                a: "For most Chennai travelers, 5 to 7 days is the perfect sweet spot. A 5-day trip is ideal for a coastal getaway (Colombo, Bentota, Galle Fort). A 7-day trip is perfect if you want to include the famous Ella-Kandy scenic train ride, tea country, and a wildlife safari. If you want to explore the northern historic cities like Sigiriya and Anuradhapura, plan for 10 days."
              },
              {
                q: "Is Sri Lanka safe for Indian tourists and families?",
                a: "Yes, Sri Lanka is incredibly safe and welcoming for Indian travelers, including families, couples, and solo female backpackers. The local people are warm and hospitable. Just follow basic travel safety habits: use trusted metered ride-hailing apps like PickMe or Uber instead of random roadside tuk-tuks, and keep an eye on your belongings in busy markets."
              },
              {
                q: "Do Indians need travel insurance to enter Sri Lanka?",
                a: "No, travel insurance is not legally mandatory to pass through immigration in Sri Lanka. However, we highly recommend getting a basic budget travel insurance plan before leaving Chennai. It costs very little and covers unexpected flight cancellations, lost baggage, and any medical emergencies."
              },
              {
                q: "Is Sri Lanka cheaper than Maldives for Chennai travelers?",
                a: "Yes, Sri Lanka is significantly cheaper than the Maldives. While a basic 4-night stay in a Maldives overwater resort starts at ₹1,50,000+ per couple (with mandatory premium ferry/seaplane transfers costing ₹30,000+), you can complete a magnificent 7-day tour across Sri Lanka's beaches, heritage forts, and tea plantations for under ₹75,000 total per couple, including round-trip flights from Chennai."
              },
              {
                q: "How much money should I carry from Chennai to Sri Lanka?",
                a: "We recommend holding approximately ₹15,000 to ₹25,000 in physical Indian Cash (preferably clean ₹500 notes) per person to convert directly at Bandaranaike Airport (CMB) for street food, tuk-tuks, and small tips. For hotels, high-end dinners, and tickets, you can safely use standard international credit cards or zero-markup travel cards."
              },
              {
                q: "What is the cheapest month to visit Sri Lanka from Chennai?",
                a: "The cheapest months to secure low-priced flights and off-season hotel yields from Chennai are September and October. During these shoulder-season transitional months, hotel tariffs drop up to 40% and round-trip flight tickets can be regularly booked for under ₹11,000."
              },
              {
                q: "Do Indian citizens need physical visa stamps for Sri Lanka?",
                a: "No physical stamps or embassy visits are necessary. You can apply for a Tourist Electronic Travel Authorization (ETA) online in under 24 hours. Under dynamic tourism booster schemes, the standard $20 USD visa fee is regularly waived to ₹0 for Indian passport holders."
              }
            ].map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-luxury-green/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1e3a2f] hover:text-luxury-gold transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-luxury-gold" : "text-luxury-green"}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-6 border-t border-luxury-green/5 pt-4 text-xs sm:text-sm text-luxury-black/75 font-light leading-relaxed bg-[#fdfaf2]/40">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
