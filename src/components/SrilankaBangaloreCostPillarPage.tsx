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
  Smartphone,
  Navigation,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Users,
  UtensilsCrossed,
  ShieldAlert,
  Moon,
  Train,
  DollarSign,
  Shield,
  Wallet,
  CreditCard,
  Ticket,
  Camera,
  PiggyBank,
  Landmark,
  Bus,
  Heart
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

const faqItems = [
  {
    q: "How much does a Sri Lanka trip cost from Bangalore?",
    a: "A standard 5-day trip from Bangalore costs ₹27,000–₹42,000 per person on a budget itinerary, ₹48,000–₹78,000 for a comfortable mid-range trip, and ₹95,000+ for a luxury experience. This includes return BLR–CMB flights, stays, meals, private transport, and entry tickets. A 7-day trip typically adds another ₹10,000–₹35,000 depending on your travel style."
  },
  {
    q: "How much is a Bangalore to Colombo flight?",
    a: "A direct round-trip flight from Kempegowda International Airport (BLR) to Colombo (CMB) typically costs ₹11,000–₹18,000 on IndiGo or SriLankan Airlines, and can rise to ₹22,000–₹24,000 during peak December–April dates. Booking 45–60 days in advance usually secures the lowest fares."
  },
  {
    q: "Do Indians need a visa for Sri Lanka, and is it free?",
    a: "Yes, all Indian travellers need a Tourist Electronic Travel Authorization (ETA), but since 25 May 2026 Sri Lanka has waived the ETA fee for India and 39 other countries under its tourism promotion programme, making entry effectively free. You still must apply online at the official ETA portal before you fly — only the fee is waived, not the application itself."
  },
  {
    q: "Is Sri Lanka cheaper than the Maldives?",
    a: "Yes, significantly. The Maldives is built around costly overwater private-island resorts, while Sri Lanka offers affordable heritage stays, PickMe tuk-tuks, public trains, and inexpensive local dining — making a comparable trip roughly 50–60% cheaper than the Maldives."
  },
  {
    q: "Is Sri Lanka cheaper than Bali or Goa?",
    a: "Sri Lanka is generally on par with Bali and only slightly pricier than a budget Goa trip, but it delivers far more variety — ancient cities, hill-country trains, national park safaris, and uncrowded beaches — within a similar or lower per-day budget than Bali's increasingly tourist-priced south coast."
  },
  {
    q: "Is 5 days enough for Sri Lanka?",
    a: "Five days is perfect for a focused loop — either the south coast (Colombo, Negombo, Galle Fort) or the Cultural Triangle (Sigiriya and Kandy). If you also want the Kandy–Ella scenic train and a wildlife safari, we recommend extending to 7–9 days."
  },
  {
    q: "What's the cheapest month to travel to Sri Lanka from Bangalore?",
    a: "June, September, and October are historically the cheapest months for both flights and hotels, since they fall in the shoulder season between peak tourist waves. Boutique resorts often discount rates by up to 40% during these windows."
  },
  {
    q: "Is Sri Lanka a good weekend trip from Bangalore?",
    a: "Yes. Because the direct BLR–CMB flight takes only about 1 hour 25 minutes, a Friday-night-out, Monday-night-return long weekend easily covers Colombo, Negombo, and Galle Fort, or a short Sigiriya–Kandy cultural loop, without feeling rushed."
  },
  {
    q: "Is Sri Lanka good for solo travelers?",
    a: "Absolutely. Sri Lanka has a friendly, safe local culture, an established hostel and guesthouse network, widely spoken English, and cheap PickMe/tuk-tuk transport, making it one of the easiest solo-travel destinations in South Asia."
  },
  {
    q: "Can I travel to Sri Lanka without a tour package?",
    a: "Yes, easily. DIY travel in Sri Lanka is very simple — private chauffeurs, hotels, and train tickets can all be booked online in advance, letting you skip rigid agency packages entirely while still having a seamless trip."
  },
  {
    q: "How much does a Sri Lanka safari cost?",
    a: "A shared jeep safari (entry fee + vehicle, split among 4–6 people) typically costs ₹1,200–₹3,000 per person for a half-day visit to Udawalawe or Yala National Park. August–October is peak season for 'The Gathering' at Minneriya and Kaudulla, when hundreds of wild elephants congregate around the reservoir."
  },
  {
    q: "How much is the Kandy to Ella train ticket?",
    a: "Second-class reserved seats cost roughly ₹115–₹170 (LKR 400–600), while the glass-roofed 1st-class Observation Saloon costs around ₹430–₹570 (LKR 1,500–2,000) but must be booked about 30 days in advance online, as it sells out quickly."
  },
  {
    q: "Can I use UPI or Indian debit/credit cards in Sri Lanka?",
    a: "UPI is accepted at a growing number of merchants and major tourist hubs under bilateral payment agreements, and standard Visa/Mastercard debit or credit cards work at hotels, restaurants, and supermarkets. Keep some Sri Lankan Rupees in cash for tuk-tuks, small cafes, and rural vendors."
  },
  {
    q: "How much cash should I carry from Bangalore?",
    a: "We recommend carrying the equivalent of ₹8,000–₹15,000 in cash (exchanged into Sri Lankan Rupees or US Dollars) for tuk-tuks, tipping, street food, and small entry fees. Larger expenses like hotels and private drivers can usually be paid by card or bank transfer in advance."
  },
  {
    q: "What is the daily travel budget for Sri Lanka?",
    a: "Excluding flights and visa, budget travellers can expect to spend ₹3,000–₹4,500 a day, mid-range travellers ₹6,000–₹8,500 a day, and luxury travellers ₹14,000–₹22,000+ a day on stays, food, local transport, and entry tickets."
  },
  {
    q: "How much does a 7-day Sri Lanka trip cost from Bangalore?",
    a: "A 7-day trip typically costs ₹38,000–₹55,000 per person on a budget itinerary, ₹68,000–₹1,10,000 for mid-range comfort, and ₹1,35,000+ for a luxury experience, including flights, a full Cultural Triangle and hill-country loop, and one national park safari."
  },
  {
    q: "Do I need travel insurance for Sri Lanka?",
    a: "It isn't a strict entry requirement, but we strongly recommend it. A week-long policy usually costs under ₹1,000 and covers flight delays, lost baggage, and emergency medical costs — cheap insurance against an expensive problem."
  },
  {
    q: "What are the hidden costs of a Sri Lanka trip?",
    a: "Watch out for foreigner-priced entry tickets (often 2–3x the local rate), camera or drone fees at national parks, informal 'parking'/guide tips, dynamic currency conversion fees on card payments, and inflated bottled-water or sunscreen prices at resorts. Budgeting an extra 10% covers these comfortably."
  }
];

export default function SrilankaBangaloreCostPillarPage() {
  usePageMetadata({
    title: "Sri Lanka Trip Cost From Bangalore (2026): ₹27K–95K Guide",
    description: "Planning a Sri Lanka trip from Bangalore? See flight, hotel, food, transport & activity costs for a 7-day trip, with budget options for couples and families.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-bangalore",
    ogUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-bangalore"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", "conversion", "bangalore_pillar");
    window.open("https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20I'm%20planning%20a%20trip%20from%20Bangalore%20and%20would%20love%20a%20free%20custom%20cost%20estimate%20and%20itinerary.", "_blank");
  };

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white pb-20">
      {/* Real Dynamic Schema Formats for SEO alignment */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Trip Cost From Bangalore (2026 Guide): Flights, Visa, Hotels & Budgets",
            "description": "Planning a Sri Lanka trip from Bangalore? See flight, hotel, food, transport & activity costs for a 7-day trip, with budget options for couples and families.",
            "image": [
              "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "datePublished": "2026-06-27T08:00:00+05:30",
            "dateModified": "2026-08-04T09:00:00+05:30",
            "author": {
              "@type": "Person",
              "name": "Adithya Oshada",
              "jobTitle": "Lead Ceylon Travel Stylist",
              "url": "https://plan-srilanka.com/about-founder"
            },
            "reviewedBy": {
              "@type": "Person",
              "name": "Anura Jayasekera",
              "jobTitle": "SLTDA National Guide Lecturer (No: S-1294)"
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
            "mainEntity": faqItems.map((item) => ({
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.22] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green/90" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            2026 Bangalore Edition · Free Visa ETA
          </div>

          <h1 id="hero-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            Sri Lanka Trip Cost From Bangalore <br/>
            <span className="text-luxury-gold font-normal italic">(2026 Master Guide)</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-3xl mx-auto font-light leading-relaxed">
            Calculate your total budget, compare flight costs, understand the new free visa rules, and plan the perfect Sri Lanka itinerary from Bangalore. Just a quick 90-minute hop from Kempegowda Airport!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center text-xs text-luxury-cream/70 font-mono">
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              15 Min Complete Guide
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              Written by Travel Architects
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
              Updated August 2026
            </span>
          </div>

          {/* E-E-A-T Author / Reviewer Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 text-xs text-luxury-cream/70 font-light">
            <div className="flex items-center gap-2.5">
              <img
                src="/src/assets/images/founder_oshada_adithya_1784092267835.jpg"
                alt="Adithya Oshada, Lead Ceylon Travel Stylist and founder of Plan Sri Lanka"
                width="36"
                height="36"
                className="w-9 h-9 rounded-full border border-luxury-gold/40 object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="text-left">
                <span className="block text-white text-xs font-medium">Adithya Oshada</span>
                <span className="text-[10px] font-mono text-luxury-gold block">Lead Ceylon Travel Stylist</span>
              </div>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="text-left">
              <span className="text-white text-xs font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-luxury-gold" />
                Reviewed by Anura Jayasekera
              </span>
              <span className="text-[10px] text-luxury-cream/60 block">SLTDA National Guide Lecturer (No: S-1294)</span>
            </div>
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

      {/* Visible Breadcrumb (mirrors BreadcrumbList schema) */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 text-[11px] font-mono text-luxury-black/45 flex items-center gap-1.5">
        <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
        <span>/</span>
        <Link to="/sri-lanka-trip-cost-from-india" className="hover:text-luxury-gold transition-colors">Trip Costs</Link>
        <span>/</span>
        <span className="text-luxury-green font-bold">Bangalore</span>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">

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
              Looking to estimate your <strong>Sri Lanka trip cost from Bangalore</strong>? Based on direct flights from Kempegowda Airport, the new fee-free visa ETA, and current local pricing, a <strong>5-day budget backpacking trip starts around ₹27,000 – ₹42,000 per person</strong>. A comfortable <strong>mid-range tour averages ₹48,000 – ₹78,000</strong>, while a premium <strong>luxury getaway runs ₹95,000+ per traveler</strong>.
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
              *Estimates are calculated per-trip/per-person inclusive of direct BLR-CMB return flights, average seasonal hotels, local meals, and inter-city commutes. See our <a href="#pricing-methodology" className="underline hover:text-luxury-gold">pricing methodology</a> below.
            </p>
          </div>
        </section>

        {/* Dynamic Navigation Shortcuts */}
        <section className="mb-12">
          <div className="bg-luxury-green/5 border border-luxury-green/10 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-luxury-green/60 uppercase tracking-widest font-bold block mb-3">Jump to a Section</span>
            <div className="flex flex-wrap gap-2.5 text-xs">
              <a href="#flight-costs" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Flights & Airlines</a>
              <a href="#visa-cost" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Visa Cost (Free ETA)</a>
              <a href="#total-breakdown" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Full Cost Breakdown</a>
              <a href="#daily-budget" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Daily Budget</a>
              <a href="#itinerary-5day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">5-Day Itinerary</a>
              <a href="#itinerary-7day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">7-Day Itinerary</a>
              <a href="#trip-cost-by-traveler" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Solo / Couple / Family / Luxury</a>
              <a href="#transport-train-costs" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Transport & Trains</a>
              <a href="#food-hotel-costs" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Food & Hotel Prices</a>
              <a href="#attractions-safari" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Tickets & Safari Cost</a>
              <a href="#currency-exchange" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Currency Exchange</a>
              <a href="#hidden-costs-tips" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Hidden Costs & Tips</a>
              <a href="#first-timers" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">First-Timer Advice</a>
              <a href="#diy-vs-package" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">DIY vs Tour Package</a>
              <a href="#faq-section" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">FAQs</a>
            </div>
          </div>
        </section>

        {/* Inner Linking sequential block */}
        <div className="bg-white border-2 border-luxury-gold/20 p-6 sm:p-8 rounded-3xl mb-12 shadow-sm">
          <p className="font-bold uppercase tracking-widest text-[11px] text-luxury-gold mb-4 flex items-center gap-1.5 font-mono">
            <Info className="w-4 h-4" /> Sri Lanka Planning Pipeline:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
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

            <Link to="/sri-lanka-7-day-itinerary" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Itinerary</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">7-Day Route</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Full day-by-day highlight loop.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Read Post</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-train-trip-planner" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Rail</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Train Planner</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Book the Kandy–Ella scenic route.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-family-itinerary" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Family</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Family Itinerary</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Kid-friendly routes and pacing.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Read Post</span>
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
            The flight ticket constitutes the most volatile portion of your travel cost, but flying out of <strong>Kempegowda International Airport (BLR)</strong> offers unparalleled benefits. Not only is Colombo (CMB) extremely close, but Bangalore also has regular, daily direct flight choices — making it one of the best-connected Indian gateways to the island.
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

          {/* H3: Airlines from Bangalore */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4">Airlines Flying From Bangalore to Sri Lanka</h3>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm mb-8">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Airline</th>
                  <th className="p-4">Route Type</th>
                  <th className="p-4">Typical Frequency</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">IndiGo</td>
                  <td className="p-4 font-light">Direct (BLR–CMB)</td>
                  <td className="p-4 font-light">Most frequent daily service</td>
                  <td className="p-4 font-light text-luxury-black/70">Usually the most budget-friendly direct option.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">SriLankan Airlines</td>
                  <td className="p-4 font-light">Direct (BLR–CMB)</td>
                  <td className="p-4 font-light">Multiple weekly / daily flights</td>
                  <td className="p-4 font-light text-luxury-black/70">National carrier with fuller in-flight service and baggage allowance.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Air India</td>
                  <td className="p-4 font-light">Connecting via Chennai/Delhi</td>
                  <td className="p-4 font-light">Daily, via layover</td>
                  <td className="p-4 font-light text-luxury-black/70">Useful when direct fares spike around holidays.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">IndiGo (via Chennai)</td>
                  <td className="p-4 font-light">Connecting via MAA</td>
                  <td className="p-4 font-light">Multiple daily options</td>
                  <td className="p-4 font-light text-luxury-black/70">Cheapest fallback when direct BLR flights sell out.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* H3: Cheapest months */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4">Cheapest Months to Fly & Weekend Trip Feasibility</h3>
          <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
              <div className="p-4 rounded-xl bg-luxury-cream/10 border border-luxury-cream">
                <strong className="text-luxury-green flex items-center gap-1.5 mb-1"><TrendingDown className="w-3.5 h-3.5 text-luxury-gold" /> Cheapest Months:</strong>
                September, June, and October are historically the most wallet-friendly months to book flights. Fares frequently drop down to ₹10,000-₹12,000 round trip.
              </div>
              <div className="p-4 rounded-xl bg-luxury-cream/10 border border-luxury-cream">
                <strong className="text-luxury-green flex items-center gap-1.5 mb-1"><TrendingUp className="w-3.5 h-3.5 text-luxury-gold" /> Peak Season Surges:</strong>
                December through April sees high tourist arrivals. Booking less than 30 days before travel — or over Diwali, Christmas, and New Year — can push prices up to ₹24,000.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900">
              <strong className="flex items-center gap-1.5 mb-1"><Clock className="w-3.5 h-3.5 text-emerald-700" /> Yes, it works as a weekend trip:</strong>
              With a flight time of only 1 hr 25 mins, Bangalore techies routinely fly out Friday evening and return Monday night for a compact Colombo–Negombo–Galle loop, or a short Sigiriya–Kandy cultural sprint. Public holiday long weekends (Independence Day, Ganesh Chaturthi, Ayudha Puja) get booked out fastest — reserve flights 3-4 weeks ahead for these dates.
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-2xl text-xs text-yellow-950 flex gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <strong>✈️ Chauffeur Booking tip:</strong> Direct flights on IndiGo generally leave BLR in the early morning or mid-afternoon, allowing you to land at Bandaranaike Airport (CMB) by noon. This leaves ample daylight hours to hire a private taxi and drive directly to Sigiriya or Galle Fort without losing a day.
            </div>
          </div>
        </section>

        {/* Section: Visa Cost */}
        <section id="visa-cost" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Visa Cost From Bangalore (Free in 2026)
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            All Indian travelers need a <strong>Tourist Electronic Travel Authorization (ETA)</strong> before flying. The good news: since <strong>25 May 2026</strong>, Sri Lanka has waived the ETA fee entirely for India and 39 other eligible countries as part of its tourism promotion drive — you now only pay ₹0 for the visa itself.
          </p>
          <div className="p-5 bg-[#edf1ed]/40 border border-luxury-green/10 rounded-2xl space-y-3 mb-4">
            <p className="text-xs sm:text-sm text-luxury-black/80 font-light leading-relaxed">
              <strong>✅ Fee:</strong> ₹0 (waived for Indian passport holders under the 2026 free-ETA programme, down from the earlier $20-$50 standard charge).
            </p>
            <p className="text-xs sm:text-sm text-luxury-black/80 font-light leading-relaxed">
              <strong>📝 Application:</strong> Still mandatory — you must apply online via the official ETA portal before departure. Only the fee is waived, not the paperwork.
            </p>
            <p className="text-xs sm:text-sm text-luxury-black/80 font-light leading-relaxed">
              <strong>⏳ Validity:</strong> Double-entry, valid for 30 days from your first arrival. If you leave and re-enter Sri Lanka once (e.g. a side trip to the Maldives), your second visit must still fall inside that same 30-day window.
            </p>
            <p className="text-xs sm:text-sm text-luxury-black/80 font-light leading-relaxed">
              <strong>⚠️ Good to know:</strong> Promotional fee waivers can end or change with little notice — always confirm the current fee on the official portal a few days before you fly, and beware of third-party "visa agent" sites charging service fees for what is a free government process.
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
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹0 (Free since May 2026)</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹0 (Free since May 2026)</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹0 (Free since May 2026)</td>
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

        {/* Section: Daily Travel Budget */}
        <section id="daily-budget" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-[#d4af37]" />
            Daily Travel Budget in Sri Lanka
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            Once your flight and (now free) visa are sorted, the real question is: what should you budget per day on the ground? These land-only figures cover stays, food, local transport, and entry tickets:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-luxury-gold/10 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <span className="px-2 py-0.5 bg-luxury-black/5 text-luxury-black/60 text-[9px] font-mono uppercase tracking-widest font-bold rounded-md mb-3 inline-block">Budget</span>
              <h3 className="text-base font-bold font-serif text-luxury-black mb-1">Backpacker</h3>
              <p className="text-2xl font-mono font-bold text-luxury-black mb-1">₹3,000 - ₹4,500</p>
              <p className="text-[11px] text-luxury-black/50">per person, per day</p>
            </div>
            <div className="bg-white border-2 border-luxury-gold rounded-2xl p-6 text-center shadow-sm ring-4 ring-luxury-gold/5">
              <span className="px-2.5 py-0.5 bg-luxury-gold text-white text-[9px] font-mono uppercase tracking-widest font-bold rounded-md mb-3 inline-block">Most Popular</span>
              <h3 className="text-base font-bold font-serif text-luxury-green mb-1">Mid-Range</h3>
              <p className="text-2xl font-mono font-bold text-luxury-green mb-1">₹6,000 - ₹8,500</p>
              <p className="text-[11px] text-luxury-black/50">per person, per day</p>
            </div>
            <div className="bg-white border border-luxury-gold/10 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <span className="px-2 py-0.5 bg-luxury-green/10 text-luxury-green text-[9px] font-mono uppercase tracking-widest font-bold rounded-md mb-3 inline-block">Luxury</span>
              <h3 className="text-base font-bold font-serif text-luxury-black mb-1">Premium</h3>
              <p className="text-2xl font-mono font-bold text-luxury-black mb-1">₹14,000 - ₹22,000+</p>
              <p className="text-[11px] text-luxury-black/50">per person, per day</p>
            </div>
          </div>
          <p className="text-[11px] text-luxury-black/40 italic font-light text-center mt-4">
            Figures exclude round-trip flights and visa. Add ₹11,000-₹24,000 per person for flights on top of these daily rates.
          </p>
        </section>

        {/* Section 3: 5-Day Sample Itinerary */}
        <section id="itinerary-5day" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#d4af37]" />
            5-Day Sri Lanka Itinerary & Cost (Bangalore Flyer Route)
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
                Land in the morning, complete ETA clearances (free of charge in 2026), and pick up local Dialog SIMs. Take a short 20-minute highway taxi run to Negombo. Check in to your beach resort, shake off airport fatigue, and enjoy a fresh lagoon mud-crab dinner.
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

          <div className="mt-6 p-4 bg-luxury-cream/15 border border-luxury-gold/20 rounded-2xl text-center">
            <span className="text-[11px] font-mono text-luxury-black/60 uppercase tracking-wide">5-Day Total Cost, All-In</span>
            <p className="text-sm font-bold text-luxury-green mt-1">₹27,000 - ₹42,000 (Budget) · ₹48,000 - ₹78,000 (Mid) · ₹95,000+ (Luxury)</p>
          </div>
        </section>

        {/* Section: 7-Day Itinerary */}
        <section id="itinerary-7day" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#d4af37]" />
            7-Day Sri Lanka Itinerary & Cost from Bangalore
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            Seven days is the sweet spot for first-time Bangalore visitors — enough time to add a wildlife safari and the full hill-country train loop without rushing the Cultural Triangle. Extend Day 4-5 of the 5-day route above with:
          </p>
          <div className="p-6 bg-white border border-luxury-gold/15 rounded-3xl mb-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">1-3</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Days 1-3:</strong> Same as the 5-day route — Negombo, Sigiriya Rock Fortress, and Dambulla → Kandy.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">4</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 4:</strong> Early-morning jeep safari at Udawalawe or Minneriya National Park (peak elephant season is July-October) before continuing to Nuwara Eliya.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">5</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 5:</strong> Ride the scenic Nanu Oya-to-Ella train, hike to Nine Arch Bridge, and watch sunset from Ella Rock.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">6</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 6:</strong> Drive to the south coast (Mirissa or Unawatuna) for beach time and, in season (Nov-Apr), whale watching.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-luxury-cream text-luxury-green font-mono text-xs font-bold flex items-center justify-center shrink-0">7</span>
                <p className="text-xs sm:text-sm text-luxury-black/80 font-light"><strong>Day 7:</strong> Explore Galle Fort's Dutch colonial lanes, shop for tea and gems, then transfer to Colombo Airport for your flight home.</p>
              </div>
            </div>
          </div>

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
                    Lodging (6 Nights)
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹7,000 (Guesthouses)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹18,000 (3-4★ Boutique)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹45,000 (5★ Resorts)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-luxury-gold shrink-0" />
                    Transport & Driver
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹5,500 (Trains & tuk-tuks)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹16,000 (Private sedan)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹30,000 (Private SUV)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-luxury-gold shrink-0" />
                    Daily Dining & Meals
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹4,900 (Street food/cafes)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹12,000 (Cafes/beach clubs)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹24,000 (Fine dining)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Compass className="w-4 h-4 text-luxury-gold shrink-0" />
                    Tours, Tickets & Safari
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹5,500 (Self-guided + 1 safari)</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹13,000 (Sigiriya + safari + train)</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹28,000 (Private guides + safari)</td>
                </tr>
                <tr className="bg-luxury-cream/10 font-bold border-t border-luxury-gold/20">
                  <td className="p-4 text-luxury-green uppercase font-mono text-xs">Local Land Cost</td>
                  <td className="p-4 font-mono text-luxury-black text-sm">₹22,900 - ₹28,000</td>
                  <td className="p-4 font-mono text-luxury-green text-sm">₹55,000 - ₹68,000</td>
                  <td className="p-4 font-mono text-luxury-green text-base">₹1,27,000 - ₹1,65,000+</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-black flex items-center gap-2">
                    <Plane className="w-4 h-4 text-luxury-gold shrink-0" />
                    + Flights (BLR-CMB Return)
                  </td>
                  <td className="p-4 font-mono text-xs text-luxury-black/70">₹11,000 - ₹13,000</td>
                  <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">₹13,500 - ₹16,500</td>
                  <td className="p-4 font-mono text-xs text-luxury-green font-bold">₹17,000 - ₹24,000</td>
                </tr>
                <tr className="bg-luxury-green/5 font-bold border-t-2 border-luxury-gold/30">
                  <td className="p-4 text-luxury-green uppercase font-mono text-xs">Grand Total (7 Days)</td>
                  <td className="p-4 font-mono text-luxury-black text-sm">₹38,000 - ₹55,000</td>
                  <td className="p-4 font-mono text-luxury-green text-sm">₹68,000 - ₹1,10,000</td>
                  <td className="p-4 font-mono text-luxury-green text-base">₹1,35,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Trip Cost By Traveler Type */}
        <section id="trip-cost-by-traveler" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Trip Cost By Traveler Type
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-8">
            Your ideal budget depends heavily on who you're traveling with. Here's how a 5-7 day trip breaks down for the four most common Bangalore traveler profiles:
          </p>

          <div className="space-y-8">
            {/* Solo */}
            <div>
              <h3 className="font-serif font-bold text-lg text-luxury-green mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-luxury-gold" /> Solo Backpacker Budget</h3>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light leading-relaxed mb-2">
                Solo travelers can keep costs remarkably low by staying in hostels and homestays, using public trains and PickMe tuk-tuks, and joining shared safari jeeps. Total 5-day solo cost: <strong className="text-luxury-green">₹27,000 - ₹42,000</strong>. English is widely spoken and the hostel network in Ella, Mirissa, and Kandy makes it easy to meet other travelers to split costs with.
              </p>
            </div>

            {/* Couple */}
            <div>
              <h3 className="font-serif font-bold text-lg text-luxury-green mb-2 flex items-center gap-2"><Heart className="w-4 h-4 text-luxury-gold" /> Couple Trip Budget</h3>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light leading-relaxed mb-2">
                Couples typically upgrade to boutique double rooms and a dedicated private driver for privacy and pace control. Total 5-day couple cost: <strong className="text-luxury-green">₹52,000 (Budget) - ₹88,000 (Mid) - ₹1,75,000+ (Luxury)</strong>. Popular add-ons include a candlelit beach dinner in Mirissa, a couples Ayurvedic spa session, and a first-class train cabin from Kandy to Ella.
              </p>
            </div>

            {/* Family */}
            <div>
              <h3 className="font-serif font-bold text-lg text-luxury-green mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-luxury-gold" /> Family Trip Budget (4 Pax)</h3>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light leading-relaxed mb-2">
                A family of four (2 adults, 2 kids) should budget <strong className="text-luxury-green">₹1,05,000 (Budget) - ₹1,80,000 (Mid) - ₹3,40,000+ (Luxury)</strong> for a 5-day trip. Sharing a private minivan (Toyota KDH) is far cheaper per head than two taxis, and most attractions offer 50% child discounts under age 12 — carry passports for age verification.
              </p>
            </div>

            {/* Luxury */}
            <div>
              <h3 className="font-serif font-bold text-lg text-luxury-green mb-2 flex items-center gap-2"><Award className="w-4 h-4 text-luxury-gold" /> Luxury Travel Budget</h3>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light leading-relaxed mb-2">
                For a fully curated 5-star experience — cliffside pool villas, private SUV with an English-speaking chauffeur guide, fine dining, and a private safari vehicle — budget <strong className="text-luxury-green">₹95,000+ per person</strong> for 5 days, or <strong className="text-luxury-green">₹1,35,000+</strong> for a 7-day version. This tier is where our concierge planning adds the most value versus a generic OTA package.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Transport & Train Costs */}
        <section id="transport-train-costs" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Bus className="w-6 h-6 text-[#d4af37]" />
            Local Transport & Sri Lanka Railways Costs
          </h2>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4">Tuk-Tuks, PickMe & Private Drivers</h3>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm mb-8">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Transport Mode</th>
                  <th className="p-4">Typical Cost</th>
                  <th className="p-4">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">PickMe Tuk-Tuk</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">~₹23-29/km (metered)</td>
                  <td className="p-4 font-light text-luxury-black/70">Short hops within Colombo, Kandy, Galle towns</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">PickMe / Uber Car</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">~₹35-45/km</td>
                  <td className="p-4 font-light text-luxury-black/70">City transfers, airport runs</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Private AC Sedan + Driver</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹4,500 - ₹6,500/day</td>
                  <td className="p-4 font-light text-luxury-black/70">Multi-city itineraries, 1-4 travelers</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Private SUV / Van + Driver</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹7,000 - ₹9,000/day</td>
                  <td className="p-4 font-light text-luxury-black/70">Families and groups of 4+</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Public Bus</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹50-200 per route</td>
                  <td className="p-4 font-light text-luxury-black/70">Ultra-budget backpackers</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4 flex items-center gap-2"><Train className="w-5 h-5 text-luxury-gold" /> Sri Lanka Railways Ticket Costs</h3>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-4">
            The Kandy-to-Ella line through the tea highlands is one of the world's most scenic train rides — and one of the cheapest. Sri Lanka Railways prices scale by class:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm mb-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Class</th>
                  <th className="p-4">Approx. Cost (Kandy-Ella)</th>
                  <th className="p-4">Booking Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">1st Class Observation Saloon</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹430 - ₹570 (LKR 1,500-2,000)</td>
                  <td className="p-4 font-light text-luxury-black/70">Glass-roof, book ~30 days ahead online</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">2nd Class Reserved</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹115 - ₹170 (LKR 400-600)</td>
                  <td className="p-4 font-light text-luxury-black/70">Openable windows, best value</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">3rd Class Reserved</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹70 - ₹100 (LKR 250-350)</td>
                  <td className="p-4 font-light text-luxury-black/70">Budget-friendly, still guaranteed seat</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Unreserved</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹30 - ₹50 (LKR 100-180)</td>
                  <td className="p-4 font-light text-luxury-black/70">No seat guarantee — can mean standing 3+ hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link
            to="/how-to-plan-a-train-trip-in-sri-lanka"
            className="text-xs font-mono font-bold text-luxury-gold hover:text-luxury-green transition-colors inline-flex items-center gap-1.5 underline"
          >
            Read the Full Sri Lanka Train Booking Guide <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Section: Food & Hotel Costs */}
        <section id="food-hotel-costs" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-[#d4af37]" />
            Food Costs & Hotel Price Ranges
          </h2>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4">Daily Food Costs</h3>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm mb-8">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Dining Style</th>
                  <th className="p-4">Cost Per Meal</th>
                  <th className="p-4">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Local "Kade" / Street Food</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹150 - ₹350</td>
                  <td className="p-4 font-light text-luxury-black/70">Rice & curry, egg hoppers, king coconut</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Casual Café / Tourist Restaurant</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹450 - ₹850</td>
                  <td className="p-4 font-light text-luxury-black/70">Seafood curry, kottu roti, fresh juice</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Mid-Range / Hotel Buffet</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹1,200 - ₹2,200</td>
                  <td className="p-4 font-light text-luxury-black/70">Beach club dinner, boutique hotel buffet</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Fine Dining</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹3,500 - ₹7,000+</td>
                  <td className="p-4 font-light text-luxury-black/70">5-star resort dining, lobster/crab specialties</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4">Hotel & Stay Price Ranges (Per Night)</h3>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Stay Category</th>
                  <th className="p-4">Price Range</th>
                  <th className="p-4">Typical Style</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Hostel / Guesthouse</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹1,200 - ₹2,500</td>
                  <td className="p-4 font-light text-luxury-black/70">Homestays, dorm beds, family-run lodges</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">3-Star Hotel</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹3,500 - ₹6,000</td>
                  <td className="p-4 font-light text-luxury-black/70">Clean, AC, reliable Wi-Fi</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">4-Star Boutique</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹7,000 - ₹14,000</td>
                  <td className="p-4 font-light text-luxury-black/70">Design-led boutique resorts, pool access</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">5-Star Luxury Resort</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹15,000 - ₹40,000+</td>
                  <td className="p-4 font-light text-luxury-black/70">Cliffside villas, private pools, full-service spas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Attractions & Safari */}
        <section id="attractions-safari" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#d4af37]" />
            Attraction Ticket Prices & Safari Costs
          </h2>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4">Entry Ticket Prices (Foreigner Rate)</h3>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm mb-8">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Attraction</th>
                  <th className="p-4">Approx. Entry Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Sigiriya Lion Rock Fortress</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">~$30 (≈ ₹2,500)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Temple of the Sacred Tooth Relic, Kandy</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">~$10-15 (≈ ₹850-1,300)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Dambulla Cave Temple</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">~$10 (≈ ₹850)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Polonnaruwa / Anuradhapura Ancient City</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">~$25 (≈ ₹2,100)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Galle Fort (walking the ramparts)</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">Free</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Pinnawala Elephant Orphanage</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">~$15-20 (≈ ₹1,300-1,700)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-luxury-black/40 italic font-light mb-8">
            Entry fees are set by SLTDA/Department of Archaeology and revised periodically — treat these as planning estimates and confirm current rates before you travel.
          </p>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4">Wildlife Safari Costs</h3>
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs text-emerald-900 mb-6 flex gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div><strong>It's peak elephant season right now:</strong> August falls within Minneriya and Kaudulla National Park's famous "Gathering" (roughly July-October), when hundreds of wild elephants congregate around the reservoirs as it dries — one of Asia's greatest wildlife spectacles, and a strong reason to book a safari into your itinerary this month.</div>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">National Park</th>
                  <th className="p-4">Cost Per Person (Shared Jeep, Half-Day)</th>
                  <th className="p-4">Known For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Udawalawe</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹1,200 - ₹2,000</td>
                  <td className="p-4 font-light text-luxury-black/70">Near-guaranteed elephant sightings, budget-friendly</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Yala National Park</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹1,500 - ₹3,000</td>
                  <td className="p-4 font-light text-luxury-black/70">Highest leopard density in the world</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">Minneriya / Kaudulla</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">₹1,500 - ₹2,500</td>
                  <td className="p-4 font-light text-luxury-black/70">"The Gathering" — 200+ elephants (Jul-Oct)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Currency Exchange */}
        <section id="currency-exchange" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#d4af37]" />
            Currency Exchange: INR to LKR Examples
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            As of August 2026, <strong>1 Indian Rupee (INR) ≈ 3.5 Sri Lankan Rupees (LKR)</strong> at the mid-market rate. This is an illustrative reference only — exchange rates move daily, so always check a live converter (Google, XE, or your bank app) close to your travel date.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm mb-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">You Spend (INR)</th>
                  <th className="p-4">Approx. Equivalent (LKR)</th>
                  <th className="p-4">Example Purchase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">₹500</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">≈ LKR 1,750</td>
                  <td className="p-4 font-light text-luxury-black/70">Casual café meal for one</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">₹1,000</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">≈ LKR 3,500</td>
                  <td className="p-4 font-light text-luxury-black/70">A day's PickMe/tuk-tuk transport</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">₹5,000</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">≈ LKR 17,500</td>
                  <td className="p-4 font-light text-luxury-black/70">One night in a 3-star hotel</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-luxury-green">₹10,000</td>
                  <td className="p-4 font-mono font-bold text-luxury-gold">≈ LKR 35,000</td>
                  <td className="p-4 font-light text-luxury-black/70">A full day's private chauffeur + fuel</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-luxury-cream/15 border border-luxury-gold/20 rounded-2xl text-xs text-luxury-black/75 font-light">
            <strong className="text-luxury-green">Where to exchange:</strong> Airport counters at Bandaranaike (CMB) are convenient but usually offer slightly weaker rates than city forex bureaus in Colombo or Kandy. ATM withdrawals in LKR are widely available and often give a fair mid-market rate minus a small fixed fee — check your Indian bank's foreign withdrawal charges before you fly.
          </div>
        </section>

        {/* Section: Hidden Costs & Money-Saving Tips */}
        <section id="hidden-costs-tips" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-[#d4af37]" />
            Hidden Costs & Money-Saving Tips
          </h2>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-luxury-gold" /> Hidden / Unexpected Costs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 shadow-sm">
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light"><strong className="text-luxury-green">Foreigner-tier pricing:</strong> Major attractions charge tourists 2-3x the local entry rate — factor this into ticket budgets.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 shadow-sm">
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light"><strong className="text-luxury-green">Camera/drone fees:</strong> Some temples and national parks charge extra for cameras, video, or drones.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 shadow-sm">
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light"><strong className="text-luxury-green">Tipping culture:</strong> Drivers and guides expect modest tips (₹300-500/day) not usually itemized in package quotes.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 shadow-sm">
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light"><strong className="text-luxury-green">Dynamic currency conversion:</strong> Some card terminals default to billing in INR at a poor rate — always choose to be billed in LKR.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 shadow-sm">
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light"><strong className="text-luxury-green">Resort mark-ups:</strong> Bottled water, sunscreen, and mini-bar items can cost 3-5x city prices inside 5-star resorts.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-luxury-green/10 shadow-sm">
              <p className="text-xs text-luxury-black/75 leading-relaxed font-light"><strong className="text-luxury-green">SIM top-ups:</strong> Buy Dialog/Mobitel SIMs at official airport counters — street resellers often overcharge.</p>
            </div>
          </div>
          <p className="text-[11px] text-luxury-black/40 italic font-light mb-8">Rule of thumb: add a 10% contingency buffer on top of your planned budget to comfortably absorb these.</p>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-luxury-green mb-4 flex items-center gap-2"><DollarSign className="w-4 h-4 text-luxury-gold" /> Money-Saving Tips for Bangalore Travellers</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-luxury-black/75 font-light">
            <li className="flex gap-2 bg-white p-4 rounded-xl border border-luxury-green/10"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Book BLR-CMB flights 6-8 weeks ahead, and avoid Dec-Apr peak dates if flexible.</li>
            <li className="flex gap-2 bg-white p-4 rounded-xl border border-luxury-green/10"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Travel in the June, September, or October shoulder season for 30-40% cheaper hotels.</li>
            <li className="flex gap-2 bg-white p-4 rounded-xl border border-luxury-green/10"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Use the metered PickMe app instead of unmetered hotel-arranged taxis.</li>
            <li className="flex gap-2 bg-white p-4 rounded-xl border border-luxury-green/10"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Eat at local "kade" eateries for lunch, save restaurant budget for one special dinner.</li>
            <li className="flex gap-2 bg-white p-4 rounded-xl border border-luxury-green/10"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Split a safari jeep and a private chauffeur across 4-6 people to cut per-head cost sharply.</li>
            <li className="flex gap-2 bg-white p-4 rounded-xl border border-luxury-green/10"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Take 2nd Class Reserved trains instead of the tourist-priced Observation Saloon.</li>
            <li className="flex gap-2 bg-white p-4 rounded-xl border border-luxury-green/10"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Negotiate a flat multi-day chauffeur rate instead of paying day-by-day.</li>
            <li className="flex gap-2 bg-white p-4 rounded-xl border border-luxury-green/10"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> Since the ETA fee is now free, redirect that ₹1,650/person saving into your safari or spa budget.</li>
          </ul>
        </section>

        {/* Section 4: First Time in Sri Lanka (Reddit & Practical Insights) */}
        <section id="first-timers" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#d4af37]" />
            First-Time Travelers From Bangalore Should Know
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-8">
            These guidelines represent actual field insights compiled from active traveler communities and our own driver-guide network. They are highly practical planning points rather than generic advice:
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
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Carry Some Cash & an eSIM</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                While boutique resorts and high-end restaurants accept Visa/Mastercard, roadside king-coconut vendors and village tuk-tuks operate on cash. Keep about ₹5,000 equivalent in LKR, and grab a Dialog eSIM or physical SIM at the airport for instant data.
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
                  alt="Golden sand beach with palm trees and turquoise water in Mirissa, Sri Lanka"
                  loading="lazy"
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
                  alt="Ancient Sigiriya Lion Rock Fortress rising above the jungle canopy, Sri Lanka Cultural Triangle"
                  loading="lazy"
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
                  alt="Sri Lankan rice and curry spread with hoppers, sambol, and fresh seafood"
                  loading="lazy"
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
                  src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=400&h=300"
                  alt="Colombo rooftop bar skyline at dusk, Sri Lanka nightlife"
                  loading="lazy"
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
                  src="https://images.unsplash.com/photo-1580889240912-c8f0f2c6d5f3?auto=format&fit=crop&q=80&w=400&h=300"
                  alt="Wild elephants gathering near a reservoir in a Sri Lanka national park safari"
                  loading="lazy"
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

        {/* E-E-A-T: Pricing Methodology */}
        <section id="pricing-methodology" className="scroll-mt-24 mb-16">
          <div className="bg-[#fdfaf2] border border-luxury-gold/20 rounded-3xl p-6 sm:p-8">
            <h3 className="font-serif font-bold text-lg text-luxury-green mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-luxury-gold" /> How We Calculate These Prices
            </h3>
            <p className="text-xs sm:text-sm text-luxury-black/75 leading-relaxed font-light mb-3">
              Every figure on this page is compiled from direct BLR-CMB airline fare checks, the official Sri Lanka ETA portal, published national park and heritage-site entry fees, live INR-LKR exchange data, and real quotes from our on-ground driver-guide partners in Sri Lanka. We review and refresh these numbers monthly.
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] text-luxury-black/50 font-mono">
              <span>📅 Published: 27 June 2026</span>
              <span>🔄 Last Updated: 4 August 2026</span>
              <span>✅ Reviewed by: Anura Jayasekera, SLTDA National Guide Lecturer</span>
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

            {/* Contextual internal links for crawl depth */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-luxury-cream/60 font-mono">
              <Link to="/sri-lanka-trip-cost-from-india" className="hover:text-luxury-gold transition-colors underline">India Cost Guide</Link>
              <Link to="/sri-lanka-trip-cost-from-hyderabad" className="hover:text-luxury-gold transition-colors underline">Hyderabad Guide</Link>
              <Link to="/sri-lanka-trip-cost-from-mumbai" className="hover:text-luxury-gold transition-colors underline">Mumbai Guide</Link>
              <Link to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" className="hover:text-luxury-gold transition-colors underline">Chennai Guide</Link>
              <Link to="/things-to-do-in-sri-lanka" className="hover:text-luxury-gold transition-colors underline">Things To Do</Link>
              <Link to="/sri-lanka-10-day-itinerary" className="hover:text-luxury-gold transition-colors underline">10-Day Itinerary</Link>
            </div>
          </div>
        </div>

        {/* Section 7: FAQs */}
        <section id="faq-section" className="scroll-mt-24 py-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-8 text-center">
            Frequently Asked Questions (Bangalore Flyers)
          </h2>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
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
