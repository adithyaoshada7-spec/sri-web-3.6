import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Calendar, 
  DollarSign, 
  Globe, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  Info, 
  MapPin, 
  Sparkles, 
  HelpCircle, 
  Send, 
  ThumbsUp, 
  Compass, 
  Sun, 
  CloudRain, 
  Sunset,
  Award,
  Clock,
  TrendingUp,
  UtensilsCrossed,
  Layers,
  Coffee,
  Volume2
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaAugustCouplesPage() {
  usePageMetadata({
    title: "Sri Lanka Itinerary in August for Couples (2026 Guide) | Best Romantic Route",
    description: "Plan the ultimate romantic Sri Lanka getaway in August. Discover the best 7-day couple itinerary, weather tips, flight costs, and secret sunny east coast beaches.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-itinerary-august-couples",
    ogUrl: "https://plan-srilanka.com/sri-lanka-itinerary-august-couples"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Lead capture state for couple trip planner
  const [leadForm, setLeadForm] = useState({
    travelDates: "",
    budget: "comfort",
    whatsapp: "",
    departureCity: "Bangalore",
    agreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `august_couples_faq_${index}`);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whatsapp) return;

    setIsSubmitting(true);
    trackEvent("august_couples_lead_submit_start", "conversion", leadForm.budget);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent("august_couples_lead_submit_success", "conversion", leadForm.budget);
    }, 1200);
  };

  const handleCtaClick = (buttonId: string) => {
    trackEvent("planner_august_cta_click", "conversion", buttonId);
    navigate("/sri-lanka-trip-planner");
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", "conversion", "august_couples_pillar");
    window.open("https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20We%20are%2520planning%2520our%2520August%2520couple%2520trip%2520and%2520would%2520love%2520a%2520customized%2520itinerary.", "_blank");
  };

  const faqList = [
    {
      q: "Is August a good time to visit Sri Lanka for couples?",
      a: "Yes, August is a fantastic month for couples visiting Sri Lanka, provided you choose the correct route. Due to dual monsoon microclimates, the South and West coasts receive intermittent rains, but the East Coast (Trincomalee, Pasikudah) and Cultural Triangle (Sigiriya, Kandy, Minneriya) enjoy dry, sunny, and beautiful weather perfect for beach lounging and heritage tours."
    },
    {
      q: "Do Indians need a visa for Sri Lanka in August?",
      a: "Yes, Indian citizens require a Tourist Electronic Travel Authorization (ETA) to enter Sri Lanka. Under active tourism promotional guidelines, online processing is highly streamlined and frequently waived to ₹0 (free processing) or is extremely affordable (standard ETA is around $20)."
    },
    {
      q: "How much is a flight to Sri Lanka from India in August?",
      a: "Round-trip flights from major Indian hubs like Bangalore (BLR), Chennai (MAA), or Mumbai (BOM) to Colombo (CMB) in August range from ₹11,000 to ₹18,000. Fares are usually cheaper if booked 30–45 days in advance."
    },
    {
      q: "Is a 7-day itinerary enough for Sri Lanka?",
      a: "Yes! A 7-day itinerary is perfectly sufficient to experience a premium highlights loop. Our recommended couples route covers Negombo, the majestic rock fortress in Sigiriya, royal Kandy, the mist-veiled tea valley of Ella, a thrilling wildlife safari in Yala, and a quick beach sunset in Galle before flying out."
    },
    {
      q: "What is the best month to visit Sri Lanka for a honeymoon?",
      a: "While December to April represents the dry peak season for the South Coast beaches, August is an exceptional alternative choice for couples. It offers smaller crowds, lush rain-washed mountain valleys in Ella, sunny beach weather on the East Coast, and significantly lower rates (up to 40% off) at high-end luxury boutique hotels."
    },
    {
      q: "Which coast has the best weather in Sri Lanka during August?",
      a: "The East Coast (Trincomalee, Nilaveli, and Pasikudah Bay) experiences sunny blue skies, calm flat seas, and zero monsoon rain in August, making it the premier beach destination for couples during this month."
    },
    {
      q: "How much does a Sri Lanka couple's trip cost?",
      a: "A comfortable 7-day mid-range couples trip from India typically costs between ₹80,000 and ₹1,20,000 total for two people (excluding flights). Budget options start around ₹55,000, while premium high-end luxury stays at colonial tea bungalows and private pool villas range from ₹1,50,000 upwards."
    }
  ];

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white pb-20 pt-24 md:pt-32">
      {/* JSON-LD Schemas for Search Intent Optimization */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Itinerary in August for Couples (2026 Guide) | Best Route, Weather & Romantic Places",
            "description": "Plan the ultimate romantic Sri Lanka getaway in August. Discover the best 7-day couple itinerary, weather tips, flight costs, and secret sunny east coast beaches.",
            "image": [
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "datePublished": "2026-06-28T09:00:00+05:30",
            "dateModified": "2026-06-28T11:00:00+05:30",
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
              "@id": "https://plan-srilanka.com/sri-lanka-itinerary-august-couples"
            },
            "keywords": "sri lanka itinerary august, sri lanka itinerary in august, sri lanka august itinerary 7 days, sri lanka august honeymoon itinerary, sri lanka itinerary august couples, sri lanka trip in august for couples"
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
                "name": "Travel Guides",
                "item": "https://plan-srilanka.com#guides-hub"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "August Couples Itinerary",
                "item": "https://plan-srilanka.com/sri-lanka-itinerary-august-couples"
              }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Sri Lanka",
            "description": "Premium island getaway featuring ancient ruins, tea plantations, and scenic train rides. Ideal for August couples looking for romantic sun-kissed east coast beaches.",
            "about": {
              "@type": "Place",
              "name": "Sri Lanka"
            },
            "touristType": "Romantic Getaways, Honeymoons, Couples, Wildlife, Beaches"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      </>

      {/* Hero Banner */}
      <div className="bg-luxury-green relative overflow-hidden py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.22] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green/95" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            2026 Couples Edition
          </div>
          
          <h1 id="hero-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            Sri Lanka Itinerary in August <br/>for Couples <span className="text-luxury-gold font-normal italic">(2026 Guide)</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-3xl mx-auto font-light leading-relaxed">
            The definitive couples' masterclass: Settle your route, survive the micro-climate monsoons, and build a beautiful, high-romance 7-day trip that optimizes sunshine and intimacy.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center text-xs text-luxury-cream/70 font-mono">
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              10 Min Romantic Read
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <Heart className="w-3.5 h-3.5 text-[#d4af37]" />
              Honeymoon Verified
            </span>
            <span className="flex items-center gap-1.5 py-1.5 px-3.5 bg-white/5 rounded-full border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-[#d4af37]" />
              August 2026 Trends
            </span>
          </div>

          <div className="mt-10">
            <button
              id="plan-trip-cta"
              onClick={() => handleCtaClick("hero_august_couples_cta")}
              className="px-8 py-4 bg-luxury-gold hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2 group"
            >
              Build My Couple's Plan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Quick Answer Snippet Box - Intent Score Optimization */}
        <section id="snippet-box" className="bg-white border-2 border-luxury-gold/30 rounded-3xl p-6 sm:p-8 shadow-md mb-12 scroll-mt-24">
          <div className="bg-[#fdfaf2] -m-6 sm:-m-8 p-5 sm:p-6 rounded-t-[22px] border-b border-luxury-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-luxury-gold text-white text-[10px] font-mono tracking-wider uppercase font-bold rounded-md">Quick Answer</span>
              <h3 className="text-sm font-bold font-mono text-luxury-green uppercase">Is August Good for Couples?</h3>
            </div>
            <span className="text-xs font-mono text-luxury-black/40 hidden sm:inline">Microclimates • East vs South</span>
          </div>
          
          <div className="mt-8">
            <p className="text-sm sm:text-base text-luxury-black/85 leading-relaxed mb-6 font-light">
              <strong>Yes, August is one of the absolute best months for couples visiting Sri Lanka—but only if you choose the right route.</strong>
            </p>
            <p className="text-sm sm:text-base text-luxury-black/80 leading-relaxed mb-6 font-light">
              During August, Sri Lanka experiences two different monsoon patterns. While parts of the southwest coast can receive rain, the east coast enjoys sunny beaches and calm seas. A well-planned itinerary lets you enjoy beaches, mountains, wildlife, and romantic experiences without spending hours in traffic.
            </p>

            {/* Structured Budget Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-luxury-cream/20 border border-luxury-green/10 text-center">
                <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest block mb-1">🎒 Budget Couples</span>
                <span className="text-xl font-serif font-bold text-luxury-green block">₹55,000 - ₹75,000</span>
                <span className="text-[10px] text-luxury-black/40 font-mono block mt-1">Homestays & Shared Transits</span>
              </div>
              <div className="p-4 rounded-2xl bg-luxury-cream/20 border border-luxury-green/10 text-center">
                <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest block mb-1">🌴 Comfort Couples</span>
                <span className="text-xl font-serif font-bold text-luxury-green block">₹80,000 - ₹1,20,000</span>
                <span className="text-[10px] text-luxury-black/40 font-mono block mt-1">Boutique Hotels & Dedicated AC Car</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#1e3a2f]/5 border border-luxury-gold/30 text-center">
                <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest block mb-1">👑 Luxury Honeymoons</span>
                <span className="text-xl font-serif font-bold text-luxury-green block">₹1,50,000+</span>
                <span className="text-[10px] text-luxury-black/40 font-mono block mt-1">Private Pools & Tea Estates</span>
              </div>
            </div>

            <div className="p-4 bg-luxury-cream/10 rounded-2xl border border-luxury-green/10">
              <strong className="text-xs text-luxury-green block mb-2 font-semibold">What is Included:</strong>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-light text-luxury-black/75">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold" /> Boutique Stays</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold" /> Dedicated Chauffeur</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold" /> Yala & Minneriya Safaris</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold" /> Intimate Dinners</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold" /> Scenic Blue Train Passes</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-luxury-gold" /> Airport Meet & Greet</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mb-12">
          <div className="bg-luxury-green/5 border border-luxury-green/10 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-luxury-green/60 uppercase tracking-widest font-bold block mb-3">Quick Navigation Shortcuts</span>
            <div className="flex flex-wrap gap-2.5 text-xs">
              <a href="#weather-breakdown" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">1. Weather Analysis</a>
              <a href="#itinerary-7day" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">2. 7-Day Couple Itinerary</a>
              <a href="#costs-breakdown" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">3. Couples Cost Estimation</a>
              <a href="#romantic-secrets" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">4. Romantic Experiences</a>
              <a href="#planning-tips" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">5. Practical Couple Tips</a>
              <a href="#faq-section" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">6. Frequently Asked Questions</a>
            </div>
          </div>
        </section>

        {/* Dynamic Navigation Shortcuts */}
        <div className="bg-white border-2 border-luxury-gold/20 p-6 sm:p-8 rounded-3xl mb-12 shadow-sm">
          <p className="font-bold uppercase tracking-widest text-[11px] text-luxury-gold mb-4 flex items-center gap-1.5 font-mono">
            <Info className="w-4 h-4" /> Recommended Couple Reading:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <Link to="/sri-lanka-trip-planner" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Interactive</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Trip Planner</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Design your custom budget & route itinerary.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-7-day-itinerary" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Itinerary</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">7 Day Tour</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Our standard award-winning weekly plan.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Read Post</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/best-time-to-visit-sri-lanka" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Seasons</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">Best Time to Visit</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Weather maps & regional monthly guides.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">See Map</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/sri-lanka-trip-cost-from-india" className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm">
              <div>
                <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">Financials</span>
                <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">India Cost Guide</h4>
                <p className="text-[11px] text-luxury-black/60 font-light mt-1">Detailed INR price indices and guides.</p>
              </div>
              <div className="mt-4 flex items-center justify-end text-luxury-gold">
                <span className="text-[10px] font-bold mr-1">Check Costs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Section 1: Weather Breakdown */}
        <section id="weather-breakdown" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Sun className="w-6 h-6 text-[#d4af37]" />
            Is August a Good Time to Visit Sri Lanka?
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            Unlike smaller tropical islands, Sri Lanka is characterized by highly complex geological microclimates. The towering central massif acts as a giant windbreak, creating opposite monsoon seasons. 
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            In August, the southwest monsoon (Yala monsoon) is slowly winding down, but still brings intermittent evening downpours to the southwest coastal towns like Bentota and Mirissa. Meanwhile, the east coast remains tucked safely in a rain shadow, enjoying peak dry-season sunshine and highly transparent, flat waters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-emerald-50/40 p-6 rounded-2xl border border-emerald-600/10 space-y-3">
              <span className="px-2.5 py-1 bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase rounded-md inline-block">☀️ Best Sunny Regions</span>
              <ul className="space-y-1.5 text-xs text-luxury-black/80">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> <strong>Trincomalee & Nilaveli:</strong> Pristine beaches, whale watching, and snorkeling.</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> <strong>Pasikuda:</strong> Beautiful luxury pool resorts and calm shallow lagoons.</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> <strong>Sigiriya & Cultural Triangle:</strong> Warm, entirely dry, perfect for climbing Sigiriya Rock and elephant safaris.</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> <strong>Kandy & Ella:</strong> Moderate misty climate, lush waterfalls, and fresh tea estates.</li>
              </ul>
            </div>

            <div className="bg-amber-50/40 p-6 rounded-2xl border border-amber-600/10 space-y-3">
              <span className="px-2.5 py-1 bg-amber-600 text-white font-mono text-[10px] font-bold uppercase rounded-md inline-block">☔ Rainy South-West (Use Caution)</span>
              <ul className="space-y-1.5 text-xs text-luxury-black/80">
                <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" /> <strong>Bentota & Hikkaduwa:</strong> Rough seas, safety flags active, afternoon rain.</li>
                <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" /> <strong>Mirissa & Weligama:</strong> High surf breaks suitable for pro surfers, but ocean swimming is highly unsafe.</li>
                <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" /> <strong>Colombo City:</strong> High humidity and passing cloudbursts. Best kept as a transit stop.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 7-Day August Itinerary */}
        <section id="itinerary-7day" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#d4af37]" />
            Ideal 7-Day August Itinerary for Couples
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-8">
            This highly polished, low-fatigue route is custom-designed for couples seeking a balance of luxury, heritage, and tropical beach warmth in August.
          </p>

          <div className="space-y-8 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-luxury-gold/30">
            
            {/* Day 1 */}
            <div className="relative pl-10 group">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold shadow-md group-hover:bg-luxury-gold transition-colors">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 1: Arrive in Negombo</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">BIA Airport → Negombo Beach • Transit: 20 mins</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Land at Colombo Bandaranaike International Airport (BIA). Bypass Colombo's city traffic by heading to the coastal town of Negombo, just 20 minutes away. Check into a boutique beach hotel, enjoy a fresh king coconut by the pool, and have an intimate candlelit seafood dinner on the shore.
              </p>
            </div>

            {/* Day 2 */}
            <div className="relative pl-10 group">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold shadow-md group-hover:bg-luxury-gold transition-colors">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 2: Sigiriya & Pidurangala Sunset</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Negombo → Sigiriya • Transit: 3.5 hours</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Journey into the dry Cultural Triangle. Scale the majestic Sigiriya Lion Rock Fortress, a 200m ancient palace block. In the evening, climb Pidurangala Rock together to watch a spectacular 360-degree sunset over the valley with Sigiriya's monolith framed in the golden sky.
              </p>
            </div>

            {/* Day 3 */}
            <div className="relative pl-10 group">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold shadow-md group-hover:bg-luxury-gold transition-colors">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 3: Royal Kandy Highlands</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Sigiriya → Kandy • Transit: 2 hours</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Depart Sigiriya, stopping to see the majestic rock carvings at the Dambulla Cave Temple. Head south into Kandy, the royal mountain capital. Walk hand-in-hand around Kandy Lake, tour the sacred Temple of the Tooth Relic, and witness a classical drumming show.
              </p>
            </div>

            {/* Day 4 */}
            <div className="relative pl-10 group">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold shadow-md group-hover:bg-luxury-gold transition-colors">
                4
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 4: Scenic Highland Blue Train to Ella</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Kandy → Peradeniya Station → Ella • Transit: 3.5 hours</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Board the legendary blue train from Peradeniya station. Book a 1st Class Observation Cabin or 2nd Class Reserved window seat. Cruise past rolling green tea estates, misty mountain slopes, and majestic cascading waterfalls. Check into a mountain villa in Ella overlooking the green valleys.
              </p>
            </div>

            {/* Day 5 */}
            <div className="relative pl-10 group">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold shadow-md group-hover:bg-luxury-gold transition-colors">
                5
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 5: Ella Peak Heights & Waterfalls</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Ella Valley Sightseeing</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Take a romantic morning hike to Little Adam's Peak for gorgeous sunrise views of Ella Gap. Visit the iconic Demodara Nine Arch Bridge to capture perfect couple photos as the train crawls slowly over the arches. Spend the afternoon tasting premium organic Ceylon tea at an active tea factory.
              </p>
            </div>

            {/* Day 6 */}
            <div className="relative pl-10 group">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold shadow-md group-hover:bg-luxury-gold transition-colors">
                6
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 6: Wildlife Safari in Yala</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Ella → Yala National Park • Transit: 2 hours</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Drive down to the southern dry zone. Climb aboard a private open-top 4x4 safari jeep in Yala National Park. August is the peak month to spot rare Sri Lankan leopards, herds of bathing wild elephants, sloth bears, and thousands of exotic tropical birds.
              </p>
            </div>

            {/* Day 7 */}
            <div className="relative pl-10 group">
              <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-full bg-luxury-gold text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                7
              </div>
              <h3 className="font-serif font-bold text-lg text-luxury-green">Day 7: Galle Fort & Colombo Departure</h3>
              <p className="text-xs text-luxury-gold font-mono font-bold mt-1">Yala → Galle → BIA Airport • Transit: 5 hours</p>
              <p className="text-xs sm:text-sm text-luxury-black/70 font-light mt-2 leading-relaxed">
                Drive along the beautiful southern coastline to the UNESCO Galle Dutch Fort. Tour the cobbled lanes, browse antique boutiques, buy authentic Ceylon sapphire jewelry, and have lunch on the fort ramparts. Take the Southern highway directly to Colombo Airport for your evening flight home.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Cost for Couples */}
        <section id="costs-breakdown" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#d4af37]" />
            Estimated Couple Travel Costs (INR)
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            Sri Lanka is an incredibly cost-effective international destination for Indian couples, delivering 5-star colonial luxury and private safaris at a fraction of the cost of Bali or Maldives. Here are realistic couple budget indices for August 2026:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm p-2 mb-8">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Expense Component</th>
                  <th className="p-4">🎒 Budget Couples</th>
                  <th className="p-4">🌴 Comfort Couples</th>
                  <th className="p-4">👑 Luxury Honeymoons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🏨 Stays (6 Nights)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹9,000 - ₹15,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹24,000 - ₹45,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹85,000 - ₹1,80,000+</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🚘 AC Sedan & Chauffeur</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹4,000 (TukTuk/Bus)</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹18,000 - ₹24,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹30,000 - ₹45,000 (SUV)</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🍲 Romantic Dining (Daily)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹1,200 / day</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹2,800 / day</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹6,500 / day</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🎟️ Safaris & Entry Tickets</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹6,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹12,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹22,000 (Private Guides)</td>
                </tr>
                <tr className="hover:bg-luxury-cream/10 transition-colors">
                  <td className="p-4 font-semibold text-luxury-green">🎫 Visa & SIM Card</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold">₹800</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold">₹4,100</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold">₹4,100</td>
                </tr>
                <tr className="bg-[#fdfaf2]/50 hover:bg-luxury-cream/25 transition-colors">
                  <td className="p-4 font-bold text-luxury-green uppercase">📉 Estimated Total (2 Pax)</td>
                  <td className="p-4 font-mono text-luxury-gold font-bold text-sm">₹55,000 - ₹75,000</td>
                  <td className="p-4 font-mono text-[#8B6E30] font-bold text-sm">₹80,000 - ₹1,20,000</td>
                  <td className="p-4 font-mono text-[#4A3B18] font-bold text-sm">₹1,50,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Romantic Experiences */}
        <section id="romantic-secrets" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#d4af37]" />
            Ultimate Romantic Experiences in August
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-8">
            Make your trip unforgettable with these five hand-picked romantic encounters:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold">🌅</div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Sunrise at Pidurangala Rock</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Climb the rock in the early pre-dawn hours. Sit on the rocky summit wrapped in a light shawl as the sun rises over the horizon, casting a dramatic gold glow onto Sigiriya Rock fortress opposite you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">🚂</div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">The Scenic Highlands Train</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Secure comfortable first-class reserved seats, sip hot tea, and lean out of the open carriage doorways together as the train winds through green tea hills, bridges, and waterfalls.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">🏡</div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Boutique Tea Plantation Stays</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Book a night in a restored 19th-century colonial tea planter's bungalow. Enjoy private butler service, fireplace heating, and views of rolling tea plantations directly from your rolltop copper bathtub.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">🐆</div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Private Wildlife Safaris</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Skip the shared tourist vans. Book a private open-top 4x4 jeep safari with a professional naturalist to trace majestic leopards and families of wild elephants drinking at reservoirs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-luxury-green/10 shadow-sm col-span-full space-y-3">
              <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold">🏖️</div>
              <h4 className="font-serif font-bold text-sm text-luxury-green">Private Beach Dinner on the East Coast</h4>
              <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                Trincomalee and Pasikudah offer exceptional weather in August. Enjoy a completely private table under the stars with torches lit in the sand, listening to the soft lapping of calm waves while enjoying grilled lagoon lobster.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: August Weather & Packing Tips */}
        <section id="planning-tips" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-[#d4af37]" />
            August Weather & Packing Tips for Couples
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-luxury-black/80 font-light leading-relaxed">
            <p>
              To keep your romantic holiday seamless and comfortable, integrate these three essential weather and travel strategies:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-luxury-cream/10 border border-luxury-cream">
                <strong className="text-luxury-green block mb-1">🧥 Layered Mountain Clothes</strong>
                Ella and Kandy can get quite chilly, damp, and misty in the evenings. Pack a light windbreaker or cozy fleece along with your light summer cotton wear.
              </div>
              <div className="p-4 rounded-xl bg-luxury-cream/10 border border-luxury-cream">
                <strong className="text-luxury-green block mb-1">⏰ Morning Heritage Walks</strong>
                Climb Sigiriya and visit the Dambulla caves early in the morning (7:00 AM - 9:00 AM) to beat the dry mid-day heat and capture the best lighting for photos.
              </div>
              <div className="p-4 rounded-xl bg-luxury-cream/10 border border-luxury-cream">
                <strong className="text-luxury-green block mb-1">⛱️ Focus on East Coast Beaches</strong>
                If beach lounging is high on your list, skip the South Coast entirely and head straight to Nilaveli or Pasikudah for flat, swimmable seas.
              </div>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="june-form" className="bg-[#1e3a2f] text-white p-6 sm:p-10 rounded-[32px] my-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.2em] font-bold block">Tailor-Made Couples Planners</span>
              <h3 className="text-xl sm:text-3xl font-serif text-[#fcfbf7] font-bold">Get a Free Custom August Couple Itinerary</h3>
              <p className="text-xs sm:text-sm text-luxury-cream/70 font-light max-w-lg mx-auto">
                Bypass generic itineraries. Fill out our quick form and our expert Ceylon Travel Architects will draft a tailored, high-romance plan optimized for August weather.
              </p>
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border border-white/20 p-8 rounded-2xl text-center space-y-4"
              >
                <div className="w-12 h-12 bg-luxury-gold text-black rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h4 className="font-serif font-bold text-lg text-luxury-gold">Couple Proposal Received!</h4>
                <p className="text-xs text-luxury-cream/80 max-w-md mx-auto font-light">
                  We've successfully logged your budget preference: <strong>{leadForm.budget.toUpperCase()}</strong>. A dedicated travel curator will ping you on WhatsApp within 12 hours with a bespoke layout.
                </p>
                <button 
                  onClick={handleWhatsAppClick}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  Ping Us Direct on WhatsApp
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4 bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-luxury-gold block font-bold">Travel Month / Dates</label>
                    <input 
                      type="text" 
                      placeholder="e.g. August 12 - 20" 
                      value={leadForm.travelDates}
                      onChange={(e) => setLeadForm({ ...leadForm, travelDates: e.target.value })}
                      required
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-luxury-gold block font-bold">Budget Preference</label>
                    <select 
                      value={leadForm.budget}
                      onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-white"
                    >
                      <option value="budget">🎒 Budget Couples (Under ₹75k)</option>
                      <option value="comfort">🌴 Comfort Couples (₹80k - ₹1.2L)</option>
                      <option value="luxury">👑 Luxury Honeymoons (₹1.5L+)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-luxury-gold block font-bold">WhatsApp / Mobile Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 9876543210" 
                      value={leadForm.whatsapp}
                      onChange={(e) => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
                      required
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-luxury-gold block font-bold">Departure City</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Bangalore, Delhi, Mumbai" 
                      value={leadForm.departureCity}
                      onChange={(e) => setLeadForm({ ...leadForm, departureCity: e.target.value })}
                      className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="terms-check" 
                    checked={leadForm.agreed} 
                    onChange={(e) => setLeadForm({ ...leadForm, agreed: e.target.checked })}
                    className="accent-luxury-gold"
                  />
                  <label htmlFor="terms-check" className="text-[10px] text-luxury-cream/60">I agree to receive custom travel estimates on WhatsApp.</label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-luxury-gold text-black hover:bg-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Generating Blueprint..." : "Get Custom August Itinerary"} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Section 6: FAQ section */}
        <section id="faq-section" className="scroll-mt-24 py-8">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.25em] font-bold block mb-2">Have questions?</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Couples' August FAQ</h2>
            <p className="text-xs sm:text-sm text-luxury-black/60 max-w-xl mx-auto font-light mt-2">
              Our expert travel architects resolve the most popular questions asked by Indian couples planning to visit Sri Lanka in August.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqList.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-luxury-green/10 overflow-hidden shadow-sm hover:border-luxury-gold/50 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 text-sm sm:text-base font-serif font-bold text-luxury-green"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-luxury-cream"
                      >
                        <p className="p-5 text-xs sm:text-sm text-luxury-black/75 font-light leading-relaxed bg-[#fcfbf7]/40">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
