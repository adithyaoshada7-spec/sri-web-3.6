import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  HelpCircle, 
  Info, 
  Calendar, 
  Plane, 
  Building, 
  Utensils, 
  Car, 
  Ticket, 
  ShieldCheck, 
  TrendingDown, 
  Sliders, 
  Users, 
  Clock, 
  Compass, 
  Star, 
  AlertCircle, 
  MapPin, 
  Heart, 
  Briefcase, 
  DollarSign, 
  ThumbsUp, 
  Sparkles,
  PhoneCall,
  User,
  CheckCircle,
  FileText
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface CalculatorInputs {
  departureCity: string;
  travelers: number;
  days: number;
  travelStyle: 'budget' | 'midrange' | 'luxury';
}

interface BudgetBreakdown {
  flights: number;
  hotels: number;
  food: number;
  transport: number;
  attractions: number;
  visaAndMisc: number;
  total: number;
}

export default function SrilankaCostPage() {
  usePageMetadata({
    title: "Sri Lanka Trip Cost From India (2026 Guide) | Budget Calculator & Cost Breakdown",
    description: "Discover the complete Sri Lanka trip cost from India. Compare budget, mid-range and luxury travel costs, flights, hotels, visa fees and use our free trip budget calculator.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-india",
    ogUrl: "https://plan-srilanka.com/sri-lanka-trip-cost-from-india",
    ogImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [calcInputs, setCalcInputs] = useState<CalculatorInputs>({
    departureCity: "Mumbai",
    travelers: 2,
    days: 7,
    travelStyle: "midrange"
  });
  
  // Lead form states
  const [leadForm, setLeadForm] = useState({
    name: "",
    whatsapp: "",
    travelDates: "",
    travelers: 2,
    style: "midrange",
    departure: "Mumbai",
    agreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculator price calculations (values in INR)
  const calculateBudget = (): BudgetBreakdown => {
    const flightRates: Record<string, number> = {
      Delhi: 24000,
      Mumbai: 21000,
      Bangalore: 14000,
      Chennai: 11000,
      Hyderabad: 17000
    };

    const hotelRates = {
      budget: 2000,   // standard guest house
      midrange: 7000, // beautiful boutique hotel / garden villa
      luxury: 25000   // elite beachfront resort
    };

    const foodRates = {
      budget: 800,
      midrange: 2500,
      luxury: 8000
    };

    const transportRates = {
      budget: 600,   // local bus, train, tuktuks occasionally
      midrange: 4500, // private air-conditioned car + english guide/driver
      luxury: 14000  // private premium SUV with concierge service
    };

    const attractionRates = {
      budget: 4000,   // public temples, beach walks
      midrange: 12000, // Sigiriya lion rock, Yala safari, scenic blue train, Kandy temple
      luxury: 35000   // private yacht harbor cruise, heli-tour leg, private VIP wildlife guide
    };

    const visaAndMiscRates = {
      budget: 2500, // Visa ETA, standard local SIM
      midrange: 4500, // Fast tracked visa, custom high speed local 5G eSIM, travel insurance
      luxury: 10000 // VIP runway meet and greet arrival, fast customs, unlimited data, premium insurance
    };

    const baseFlights = flightRates[calcInputs.departureCity] || 21000;
    const totalFlights = baseFlights * calcInputs.travelers;

    // Hotels are shared where possible (assume double occupancies)
    const roomsCount = Math.ceil(calcInputs.travelers / 2);
    const totalHotels = hotelRates[calcInputs.travelStyle] * calcInputs.days * roomsCount;

    const totalFood = foodRates[calcInputs.travelStyle] * calcInputs.days * calcInputs.travelers;
    
    // Transport is shared per group
    const totalTransport = transportRates[calcInputs.travelStyle] * calcInputs.days;

    const totalAttractions = attractionRates[calcInputs.travelStyle] * calcInputs.travelers;
    const totalVisaAndMisc = visaAndMiscRates[calcInputs.travelStyle] * calcInputs.travelers;

    const total = totalFlights + totalHotels + totalFood + totalTransport + totalAttractions + totalVisaAndMisc;

    return {
      flights: totalFlights,
      hotels: totalHotels,
      food: totalFood,
      transport: totalTransport,
      attractions: totalAttractions,
      visaAndMisc: totalVisaAndMisc,
      total
    };
  };

  const budget = calculateBudget();

  // WhatsApp click handler for custom quote request
  const handleWhatsAppRedirect = (source: string) => {
    trackEvent('whatsapp_click', 'conversion', `cost_page_${source}`);
    const message = `Hi Plan Sri Lanka! I am planning a Sri Lanka trip from India. 
City: ${calcInputs.departureCity}
Travelers: ${calcInputs.travelers}
Days: ${calcInputs.days}
Style: ${calcInputs.travelStyle}
Could you share a free travel itinerary blueprint and cost quote? Thank you.`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  // Live submit of lead form
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.whatsapp) {
      alert("Please enter both your Name and WhatsApp phone number.");
      return;
    }
    setIsSubmitting(true);
    trackEvent('lead_submit', 'acquisition', 'cost_page_form_submit');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      const text = `Hi! I just requested a free personalized Sri Lanka travel plan from India.
Name: ${leadForm.name}
WhatsApp: ${leadForm.whatsapp}
Travel Dates: ${leadForm.travelDates || "Flexi / Autumn 2026"}
Travelers: ${leadForm.travelers}
Budget Style: ${leadForm.style}
Departure: ${leadForm.departure}`;

      const waUrl = `https://wa.me/94722968210?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 1200);
  };

  // FAQ array targeting Search Console queries
  const faqs = [
    {
      q: "How much does a Sri Lanka trip cost from India?",
      a: "An average 7-day Sri Lanka comfort trip from India costs about ₹45,000 to ₹65,000 per traveler. Budget backpackers can complete the journey for ₹25,000 to ₹40,000 using public trains and guesthouses, while couples seeking premium boutique hotels range from ₹80,000 to ₹1,20,000 total. Custom luxury stays start at ₹1,50,000+ per traveler."
    },
    {
      q: "Is Sri Lanka cheaper than Thailand?",
      a: "Yes, Sri Lanka is generally more wallet-friendly than Thailand for Indian tourists. Flight routes from southern Indian cities to Colombo are shorter and cheaper than flights to Bangkok. Additionally, hiring a private English-speaking chauffeur-driven AC car in Sri Lanka is almost half the price of equivalent private transports in Thailand or Bali."
    },
    {
      q: "Do Indians need a visa for Sri Lanka?",
      a: "Yes, Indian passport holders need a valid ETA (Electronic Travel Authorization) visa standard for a 30-day stay. Sri Lanka regularly waives visa fees dynamically for Indian citizens as part of bilateral tourism booster campaigns (making it ₹0). When standard fees apply, it costs approximately $20 USD (₹1,660)."
    },
    {
      q: "Can I visit Sri Lanka under ₹50,000?",
      a: "Absolutely! A single traveler or budget couple can easily explore Sri Lanka under ₹50,000 per person. By starting from southern flight terminals like Chennai or Bangalore, choosing high-rated local guest villas (₹2,000/night), using localized train tracks, and eating standard Ceylon rice and curries, you can comfortably spend 7 action-packed days."
    },
    {
      q: "Which Indian city has the cheapest flights?",
      a: (
        <>
          Chennai (MAA) offers the cheapest direct flight tickets to Sri Lanka, with round-trips regularly starting as low as ₹9,000 - ₹12,000. For of-the-moment flight guides and package comparisons, read our dedicated <Link to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" className="text-luxury-gold hover:underline font-bold">Chennai to Sri Lanka trip cost guide</Link>. Bangalore (BLR) runs closely behind with options from ₹11,000 - ₹14,000. Flights from northern or western hubs like Delhi or Mumbai are slightly premium, running upwards of ₹18,000.
        </>
      )
    },
    {
      q: "How much does a 7 day Sri Lanka trip cost?",
      a: "A 7-day comfortable tour costs about ₹48,000 to ₹75,000 per person including round-trip flights, cozy boutique accommodations, a continuously available private vehicle with an English concierge driver, entry passes (Sigiriya, Temple of Tooth), and dining."
    }
  ];

  return (
    <div className="bg-luxury-cream min-h-screen text-luxury-black font-sans leading-relaxed selection:bg-luxury-gold/30 pt-24 md:pt-32">
      <>
        {/* ARTICLE SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Trip Cost From India (2026 Guide)",
            "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1",
            "author": {
              "@type": "Person",
              "name": "Adithya Oshada",
              "jobTitle": "Local Travel Planner"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            },
            "datePublished": "2026-01-15T08:00:00Z",
            "dateModified": "2026-06-20T17:54:02-07:00",
            "description": "How much does a Sri Lanka trip cost from India? Calculate exact expenses for flights, visa, hotels, food & travel styles. Get a free personalized holiday budget plan."
          })}
        </script>

        {/* BREADCRUMB SCHEMA */}
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
                "name": "Sri Lanka Trip Cost From India",
                "item": "https://plan-srilanka.com/sri-lanka-trip-cost-from-india"
              }
            ]
          })}
        </script>

        {/* TRIP CALCULATOR PRODUCT SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Sri Lanka Trip Cost Estimator & Luxury Calculator (2026)",
            "description": "Real-time cost planning engine for Indian travelers. Computes flights, hotels, private tour guides, safari pricing, and localized chauffeur rates in Indian Rupees.",
            "brand": {
              "@type": "Brand",
              "name": "Plan Sri Lanka"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "25000",
              "highPrice": "150000",
              "offerCount": "100"
            }
          })}
        </script>

        {/* FAQ SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
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

      {/* HEADER HERO AREA */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-black/50 mb-6 bg-transparent" aria-label="Breadcrumb">
          <a href="/" className="hover:text-luxury-gold transition-colors">Home</a>
          <span>/</span>
          <span className="text-luxury-gold font-semibold">Sri Lanka Trip Cost From India</span>
        </nav>
        
        <div className="border-l-4 border-luxury-gold pl-6 space-y-3">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="bg-luxury-green/10 text-luxury-green font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[10px]">
              EEAT Certified Expert Guide
            </span>
            <span className="text-luxury-black/40 font-mono">2026 Edition</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-luxury-green tracking-tight leading-tight">
            Sri Lanka Trip Cost From India <br className="hidden md:block"/>
            <span className="italic font-normal text-luxury-gold">(2026 Guide)</span>
          </h1>
          <p className="text-lg md:text-xl text-luxury-black/70 font-light max-w-4xl tracking-wide">
            Your comprehensive visual cost guide. Learn standard expenditures in Indian Rupees (INR) for flights, visas, heritage boutique stays, private English guides, and utilize our smart estimator.
          </p>
        </div>
      </div>

      {/* SECTION 1 - QUICK ANSWER (FEATURED SNIPPET GOLDEN CAPTURE) */}
      <section className="max-w-7xl mx-auto px-6 mb-16" id="quick-answer">
        <div className="bg-[#1A2F23] text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-luxury-gold">
                <Info className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-serif text-luxury-gold font-bold">Quick Answer Guide</span>
            </div>

            <div className="space-y-4 max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-serif leading-snug">
                How Much Does a Sri Lanka Trip Cost From India?
              </h2>
              <p className="text-white/80 font-light text-base md:text-lg leading-relaxed">
                On average, a <strong>7-day mid-range Sri Lanka trip from India</strong> costs roughly <strong>₹45,000 to ₹65,000 per person</strong>. Your overall cost is directly determined by your traveler profile and preferred comfort tier:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-luxury-gold/30 transition-all">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Budget Traveler</span>
                <p className="text-2xl md:text-3xl font-serif text-luxury-gold font-bold mb-2">₹25,000 – ₹40,000</p>
                <p className="text-xs text-white/70 font-light">Scenic local trains, seaside guest houses, traditional curry rice.</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 border border-luxury-gold/30 relative hover:border-luxury-gold transition-all">
                <span className="absolute -top-3 right-4 bg-luxury-gold text-luxury-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Popular
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Couple Travel</span>
                <p className="text-2xl md:text-3xl font-serif text-luxury-gold font-bold mb-2">₹80,000 – ₹120,000</p>
                <p className="text-xs text-white/70 font-light">Boutique heritage villas, continuous private AC driver sedan total stay.</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-luxury-gold/30 transition-all">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Family Group</span>
                <p className="text-2xl md:text-3xl font-serif text-luxury-gold font-bold mb-2">₹150,000 – ₹250,000</p>
                <p className="text-xs text-white/70 font-light">Multi-room resort properties, comfortable 4x4 private transport van.</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-luxury-gold/30 transition-all">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Luxury Escape</span>
                <p className="text-2xl md:text-3xl font-serif text-luxury-gold font-bold mb-2">₹150,000+</p>
                <p className="text-xs text-white/70 font-light">5-star clifftop suites, private safaris, fine gourmet lagoons dining.</p>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => handleWhatsAppRedirect("featured_snippet_quick")}
                className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-luxury-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-luxury-green transition-all shadow-lg flex items-center justify-center gap-3"
              >
                Claim Free Custom Cost Blueprint <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-white/40 italic">Planning customized blueprints takes only 2 hours • Verified Colombo Concierge</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - SRI LANKA TRIP COST IN INDIAN RUPEES */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="cost-in-inr">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Targeted Real conversion Values</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Sri Lanka Trip Cost in Indian Rupees
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Complete baseline comparison in INR</p>
        </div>

        <div className="overflow-x-auto rounded-[32px] border border-luxury-black/5 shadow-luxury bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-luxury-green text-white text-xs md:text-sm font-serif">
                <th className="p-6 md:p-8 rounded-tl-[32px]">Metric Category</th>
                <th className="p-6 md:p-8">Solo Traveler</th>
                <th className="p-6 md:p-8">Couple (Double Room)</th>
                <th className="p-6 md:p-8">Family of 4</th>
                <th className="p-6 md:p-8 rounded-tr-[32px]">Luxury Preference</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm text-luxury-black/70 divide-y divide-luxury-black/[0.04]">
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Round Flights (Delhi/Mumbai/BLR)</td>
                <td className="p-6 md:p-8">₹11,000 – ₹18,000</td>
                <td className="p-6 md:p-8">₹22,000 – ₹36,000</td>
                <td className="p-6 md:p-8">₹44,000 – ₹72,000</td>
                <td className="p-6 md:p-8">₹75,000+ (Business Tiers)</td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Visa ETA Fee</td>
                <td className="p-6 md:p-8">₹0 – ₹1,660</td>
                <td className="p-6 md:p-8">₹0 – ₹3,320</td>
                <td className="p-6 md:p-8">₹0 – ₹6,640</td>
                <td className="p-6 md:p-8">Registered Free Waiver</td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Boutique Hotel / Rest Night</td>
                <td className="p-6 md:p-8">₹1,500 – ₹3,000</td>
                <td className="p-6 md:p-8">₹5,000 – ₹10,000</td>
                <td className="p-6 md:p-8">₹11,000 – ₹18,000</td>
                <td className="p-6 md:p-8">₹25,000 – ₹80,000+</td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Daily Food & Culinary</td>
                <td className="p-6 md:p-8">₹800 – ₹1,200</td>
                <td className="p-6 md:p-8">₹2,000 – ₹4,000</td>
                <td className="p-6 md:p-8">₹4,000 – ₹8,000</td>
                <td className="p-6 md:p-8">₹10,000 – ₹20,000+</td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Ground Chauffeur Car (Daily)</td>
                <td className="p-6 md:p-8">Local train/tuk (₹500)</td>
                <td className="p-6 md:p-8">AC Sedan (₹4,500)</td>
                <td className="p-6 md:p-8">Spacious Van (₹6,000)</td>
                <td className="p-6 md:p-8">4x4 Premium SUV (₹14,000+)</td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Activities & Sightseeings</td>
                <td className="p-6 md:p-8">₹3,000</td>
                <td className="p-6 md:p-8">₹12,000</td>
                <td className="p-6 md:p-8">₹24,000</td>
                <td className="p-6 md:p-8">₹50,000+</td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-gold bg-luxury-gold/5">Total Estimated (7 Days Base)</td>
                <td className="p-6 md:p-8 font-bold bg-luxury-gold/5 text-luxury-black">₹25,000 – ₹40,000</td>
                <td className="p-6 md:p-8 font-bold bg-luxury-gold/5 text-luxury-green">₹80,000 – ₹120,000</td>
                <td className="p-6 md:p-8 font-bold bg-luxury-gold/5 text-luxury-black">₹150,000 – ₹250,000</td>
                <td className="p-6 md:p-8 font-bold bg-luxury-gold/5 text-luxury-gold">₹150,000+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3 - INDIA TO SRI LANKA TRIP COST BY DEPARTURE CITY */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="departure-cities">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Flight & Package Hub comparison</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            India to Sri Lanka Trip Cost by Departure City
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Based on actual 2026 direct carrier routing flight prices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Chennai */}
          <div className="bg-white rounded-3xl p-8 border border-luxury-black/5 shadow-sm space-y-4 hover:border-luxury-gold/30 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-serif text-luxury-green font-bold flex justify-between items-center border-b border-luxury-black/5 pb-3">
                <span>Chennai to Sri Lanka Cost</span>
                <span className="text-xs bg-luxury-green/10 text-luxury-green uppercase tracking-widest px-2.5 py-1 rounded-full font-mono font-bold">Cheapest Route</span>
              </h3>
              <div className="space-y-2 text-sm text-luxury-black/70">
                <p className="flex justify-between font-mono"><span className="font-light">Direct Flights (RT):</span> <strong className="text-luxury-green">₹9,000 – ₹12,000</strong></p>
                <p className="flex justify-between font-mono"><span className="font-light">Avg Accommodation Segment:</span> <strong>₹2,000 – ₹6,000/night</strong></p>
                <p className="flex justify-between font-mono"><span className="font-light">Total comfortable 7-day budget:</span> <strong>₹30,000+ per seat</strong></p>
              </div>
              <p className="text-xs text-luxury-black/50 leading-relaxed italic font-light">
                *Pro-Tip: Direct flights out of Chennai (MAA) take barely 1 hour and frequently offer promotional fares via IndiGo or Air India.
              </p>
            </div>
            <Link 
              to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
              className="mt-6 w-full text-center block bg-luxury-green text-white hover:bg-luxury-gold hover:text-white text-xs font-bold py-3 px-4 rounded-xl transition-all"
            >
              Analyze Chennai Flight Schedules & Budgets →
            </Link>
          </div>

          {/* Mumbai */}
          <div className="bg-white rounded-3xl p-8 border border-luxury-black/5 shadow-sm space-y-4 hover:border-luxury-gold/30 transition-all">
            <h3 className="text-xl md:text-2xl font-serif text-luxury-green font-bold flex justify-between items-center border-b border-luxury-black/5 pb-3">
              <span>Mumbai to Sri Lanka Cost</span>
              <span className="text-xs bg-luxury-gold/10 text-luxury-gold uppercase tracking-widest px-2.5 py-1 rounded-full font-mono font-bold">Western Hub</span>
            </h3>
            <div className="space-y-2 text-sm text-luxury-black/70">
              <p className="flex justify-between font-mono"><span className="font-light">Direct Flights (RT):</span> <strong className="text-luxury-green">₹18,000 – ₹24,000</strong></p>
              <p className="flex justify-between font-mono"><span className="font-light">Avg Accommodation Segment:</span> <strong>₹4,000 – ₹9,000/night</strong></p>
              <p className="flex justify-between font-mono"><span className="font-light">Total comfortable 7-day budget:</span> <strong>₹45,000+ per seat</strong></p>
            </div>
            <p className="text-xs text-luxury-black/50 leading-relaxed italic font-light">
              *Pro-Tip: Direct routes on SriLankan Airlines are faster, avoiding time delays via overnight southern connectors.
            </p>
          </div>

          {/* Delhi */}
          <div className="bg-white rounded-3xl p-8 border border-luxury-black/5 shadow-sm space-y-4 hover:border-luxury-gold/30 transition-all">
            <h3 className="text-xl md:text-2xl font-serif text-luxury-green font-bold flex justify-between items-center border-b border-luxury-black/5 pb-3">
              <span>Delhi to Sri Lanka Cost</span>
              <span className="text-xs bg-luxury-gold/10 text-luxury-gold uppercase tracking-widest px-2.5 py-1 rounded-full font-mono font-bold">Northern Hub</span>
            </h3>
            <div className="space-y-2 text-sm text-luxury-black/70">
              <p className="flex justify-between font-mono"><span className="font-light">Direct Flights (RT):</span> <strong className="text-luxury-green">₹19,000 – ₹28,000</strong></p>
              <p className="flex justify-between font-mono"><span className="font-light">Avg Accommodation Segment:</span> <strong>₹5,000 – ₹10,000/night</strong></p>
              <p className="flex justify-between font-mono"><span className="font-light">Total comfortable 7-day budget:</span> <strong>₹48,000+ per seat</strong></p>
            </div>
            <p className="text-xs text-luxury-black/50 leading-relaxed italic font-light">
              *Pro-Tip: Direct roundtrip ticket ranges are premium, booking at least 60 days before festive seasons locks lower price caps.
            </p>
          </div>

          {/* Bangalore */}
          <div className="bg-white rounded-3xl p-8 border border-luxury-black/5 shadow-sm space-y-4 hover:border-luxury-gold/30 transition-all">
            <h3 className="text-xl md:text-2xl font-serif text-luxury-green font-bold flex justify-between items-center border-b border-luxury-black/5 pb-3">
              <span>Bangalore to Sri Lanka Cost</span>
              <span className="text-xs bg-luxury-green/10 text-luxury-green uppercase tracking-widest px-2.5 py-1 rounded-full font-mono font-bold">High Value</span>
            </h3>
            <div className="space-y-2 text-sm text-luxury-black/70">
              <p className="flex justify-between font-mono"><span className="font-light">Direct Flights (RT):</span> <strong className="text-luxury-green">₹11,000 – ₹14,000</strong></p>
              <p className="flex justify-between font-mono"><span className="font-light">Avg Accommodation Segment:</span> <strong>₹2,500 – ₹7,000/night</strong></p>
              <p className="flex justify-between font-mono"><span className="font-light">Total comfortable 7-day budget:</span> <strong>₹32,000+ per seat</strong></p>
            </div>
            <p className="text-xs text-luxury-black/50 leading-relaxed italic font-light">
              *Pro-Tip: Ideal route. Take advantage of weekly high-frequency Indigo or SriLankan Airlines choices.
            </p>
          </div>

          {/* Hyderabad */}
          <div className="bg-white rounded-3xl p-8 border border-luxury-black/5 shadow-sm space-y-4 hover:border-luxury-gold/30 transition-all">
            <h3 className="text-xl md:text-2xl font-serif text-luxury-green font-bold flex justify-between items-center border-b border-luxury-black/5 pb-3">
              <span>Hyderabad to Sri Lanka Cost</span>
              <span className="text-xs bg-luxury-gold/10 text-luxury-gold uppercase tracking-widest px-2.5 py-1 rounded-full font-mono font-bold">Deccan Hub</span>
            </h3>
            <div className="space-y-2 text-sm text-luxury-black/70">
              <p className="flex justify-between font-mono"><span className="font-light">Direct Flights (RT):</span> <strong className="text-luxury-green">₹14,000 – ₹19,000</strong></p>
              <p className="flex justify-between font-mono"><span className="font-light">Avg Accommodation Segment:</span> <strong>₹3,000 – ₹8,000/night</strong></p>
              <p className="flex justify-between font-mono"><span className="font-light">Total comfortable 7-day budget:</span> <strong>₹36,000+ per seat</strong></p>
            </div>
            <p className="text-xs text-luxury-black/50 leading-relaxed italic font-light">
              *Pro-Tip: Checking mid-week departures can reduce flight rates significantly across Hyderabad CMB corridors.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 - COMPLETE COST BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="cost-breakdown font-sans">
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-luxury-black/5 shadow-luxury">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-luxury-gold uppercase tracking-[0.25em] text-xs font-mono font-bold">The Golden Ratio</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
                What Makes Up Your Sri Lanka Travel Budget?
              </h2>
              <p className="text-sm text-luxury-black/60 font-light leading-relaxed">
                Break down individual category ratios to ensure full control over flexible expenditures. Flights, stays, private guided SUVs, street plates, or landmarks each compose explicit ratios:
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Flights */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-luxury-green flex items-center gap-2">
                    <Plane className="w-4 h-4 text-luxury-gold" />
                    1. Flights Cost from India (DEL/BOM/BLR/MAA)
                  </span>
                  <span className="font-mono text-luxury-black/60 font-bold">~ 30% - 35% of Total Budget</span>
                </div>
                <div className="w-full bg-luxury-cream h-3 rounded-full overflow-hidden">
                  <div className="bg-luxury-gold h-full rounded-full" style={{ width: "35%" }} />
                </div>
                <p className="text-xs text-luxury-black/50 pl-6 leading-relaxed font-light">
                  Direct round-trip tickets range from ₹9,000 to ₹25,000. Booking 45 days in advance filters out surge valuations.
                </p>
              </div>

              {/* Visa */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-luxury-green flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                    2. Visa ETA Fees & Local High-Speed SIM Card
                  </span>
                  <span className="font-mono text-luxury-black/60 font-bold">~ 2% - 4% of Total Budget</span>
                </div>
                <div className="w-full bg-luxury-cream h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-800 h-full rounded-full" style={{ width: "4%" }} />
                </div>
                <p className="text-xs text-luxury-black/50 pl-6 leading-relaxed font-light">
                  ETA remains completely free during dynamic waiver promos (otherwise standard at $20 / ₹1,660). Dialog or Mobitel local high-speed 5G tourist SIM runs ₹700 flat.
                </p>
              </div>

              {/* Hotels */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-luxury-green flex items-center gap-2">
                    <Building className="w-4 h-4 text-luxury-gold" />
                    3. Hotels & Heritage Boutique Accommodations
                  </span>
                  <span className="font-mono text-luxury-black/60 font-bold">~ 25% - 30% of Total Budget</span>
                </div>
                <div className="w-full bg-luxury-cream h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "28%" }} />
                </div>
                <p className="text-xs text-luxury-black/50 pl-6 leading-relaxed font-light">
                  Clean boutique stays or garden villas run ₹5,000 - ₹12,000/night featuring swimming pools and local breakfast inclusions. Guesthouses run ₹2,000/night.
                </p>
              </div>

              {/* Food */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-luxury-green flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-luxury-gold" />
                    4. Food, Cafe Dining & Oceanside Seafood spreads
                  </span>
                  <span className="font-mono text-luxury-black/60 font-bold">~ 12% - 15% of Total Budget</span>
                </div>
                <div className="w-full bg-luxury-cream h-3 rounded-full overflow-hidden">
                  <div className="bg-teal-700 h-full rounded-full" style={{ width: "15%" }} />
                </div>
                <p className="text-xs text-luxury-black/50 pl-6 leading-relaxed font-light">
                  Local cafe meals start from ₹300, while romantic beach dinners with fresh jumbo crabs, lagoons prawns and mocktails average ₹2,500 per couple.
                </p>
              </div>

              {/* Transport */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-luxury-green flex items-center gap-2">
                    <Car className="w-4 h-4 text-luxury-gold" />
                    5. Private Chauffeur AC SUV & Transport Logistics
                  </span>
                  <span className="font-mono text-luxury-black/60 font-bold">~ 15% - 20% of Total Budget</span>
                </div>
                <div className="w-full bg-luxury-cream h-3 rounded-full overflow-hidden">
                  <div className="bg-yellow-600 h-full rounded-full" style={{ width: "18%" }} />
                </div>
                <p className="text-xs text-luxury-black/50 pl-6 leading-relaxed font-light">
                  Dedicated private vehicles with accredited guide drivers inclusive of gas, toll roads and driver boarding average ₹4,500 – ₹6,500 daily.
                </p>
              </div>

              {/* Activities */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-luxury-green flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-luxury-gold" />
                    6. Monument Entrances, Jeeps & National Park Safaris
                  </span>
                  <span className="font-mono text-luxury-black/60 font-bold">~ 8% - 12% of Total Budget</span>
                </div>
                <div className="w-full bg-luxury-cream h-3 rounded-full overflow-hidden">
                  <div className="bg-orange-850 h-full bg-amber-700 rounded-full" style={{ width: "10%" }} />
                </div>
                <p className="text-xs text-luxury-black/50 pl-6 leading-relaxed font-light">
                  UNSECO coordinates have fixed entry fees. Sigiriya lion rock counts approx ₹2,500 per head, while custom private 4x4 wildlife safari ranges ₹8,000 total.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION - SRI LANKA VISA COST FOR INDIANS */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="visa-cost">
        <div className="bg-[#FAF8F5] rounded-[40px] p-8 md:p-12 border border-luxury-gold/15 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-luxury-gold uppercase tracking-[0.25em] text-xs font-mono font-bold">Official Document Guidelines</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
                Sri Lanka Visa Cost for Indians
              </h2>
              <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Crucial entry requirement updates for 2026</p>
            </div>
            <div className="text-sm text-luxury-black/75 font-light leading-relaxed space-y-4 pt-4">
              <p className="text-center">
                The standard **Sri Lanka Visa Cost for Indians** is usually **$20 USD (approx. ₹1,660)** for a 30-day double-entry Electronic Travel Authorization (ETA). However, Sri Lanka periodically offers completely free visa waiver schemes for Indian tourists, reducing the visa fee to **₹0**.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-luxury-black/5">
                  <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">Standard ETA Visa Fee</span>
                  <p className="text-lg font-serif font-bold text-luxury-green">$20 USD (~₹1,660)</p>
                  <p className="text-xs text-luxury-black/50 mt-1">Processed online within 24 hours.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-luxury-black/5">
                  <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">Fee Waiver Seasons</span>
                  <p className="text-lg font-serif font-bold text-luxury-green">₹0 (Zero Fee)</p>
                  <p className="text-xs text-luxury-black/50 mt-1">When bilateral visa-free campaigns run regularly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - SUGGESTED 7 DAY ITINERARY */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="itinerary">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Recommended 2026 Loop</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Suggested 7 Day Sri Lanka Itinerary
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Optimized for monsoons, travel time, and budget efficiency (Best Itinerary for Sri Lanka for 7 Days)</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 bg-white rounded-[40px] p-8 md:p-12 border border-luxury-black/5 shadow-luxury relative overflow-hidden">
            <div className="relative border-l border-luxury-gold/30 ml-4 pl-8 space-y-10 py-2 text-xs md:text-sm">
              
              {/* Day 1 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-luxury-green border-2 border-luxury-gold flex items-center justify-center font-serif text-[10px] font-bold text-white">1</div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-luxury-green">Day 1: Colombo Arrival</h3>
                  <p className="text-luxury-black/75 leading-relaxed font-light">
                    Land at Bandaranaike International Airport (CMB). Meet your accredited personal driver guide and cruise straight to your sea-facing resort. Witness spectacular golden sunset walks at Galle Face Green and experience traditional egg hoppers.
                  </p>
                  <p className="font-mono text-xs text-luxury-gold font-bold">Est. cost: ₹2,500 (Heritage dining & street comfort)</p>
                </div>
              </div>

              {/* Day 2 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-luxury-green border-2 border-luxury-gold flex items-center justify-center font-serif text-[10px] font-bold text-white">2</div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-luxury-green">Day 2: Ancient Sigiriya Citadel</h3>
                  <p className="text-luxury-black/75 leading-relaxed font-light">
                    Embark toward the legendary Sigiriya Cultural Triangle. Ascend the world-renowned Sigiriya Lion Rock fortress (₹2,500 entrance card) with breathtaking 360-degree jungle views, followed by typical clay-pot village buffet style lunch.
                  </p>
                  <p className="font-mono text-xs text-luxury-gold font-bold">Est. cost: ₹6,000 (Historic entry & traditional village tour)</p>
                </div>
              </div>

              {/* Day 3 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-luxury-green border-2 border-luxury-gold flex items-center justify-center font-serif text-[10px] font-bold text-white">3</div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-luxury-green">Day 3: Sacred Kandy Lakes</h3>
                  <p className="text-luxury-black/75 leading-relaxed font-light">
                    Drive up to sacred Kandy Hill Station. Tour beautiful UNESCO sanctuary Temple of the Sacred Tooth Relic (₹550 ticket), witness cultural drumming ceremonies, and leisurely walk around mirror-like Kandy Lake.
                  </p>
                  <p className="font-mono text-xs text-luxury-gold font-bold">Est. cost: style stay and entry passes around ₹5,500</p>
                </div>
              </div>

              {/* Day 4 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-luxury-green border-2 border-luxury-gold flex items-center justify-center font-serif text-[10px] font-bold text-white">4</div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-luxury-green">Day 4: Nuwara Eliya Highlands</h3>
                  <p className="text-luxury-black/75 leading-relaxed font-light">
                    Climb up into misty Nuwara Eliya, also known as &quot;Little England&quot;. Leisurely tour heritage tea plantations, learn Ceylon tea harvesting secrets, capture magnificent waterfalls, and witness mist creeping over hills.
                  </p>
                  <p className="font-mono text-xs text-luxury-gold font-bold">Est. cost: ₹3,500 (Colonial estate tea walks & local cafe meals)</p>
                </div>
              </div>

              {/* Day 5 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-luxury-green border-2 border-luxury-gold flex items-center justify-center font-serif text-[10px] font-bold text-white">5</div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-luxury-green">Day 5: Ella Blue Train</h3>
                  <p className="text-luxury-black/75 leading-relaxed font-light">
                    Board the legendary Kandy to Ella Scenic Blue Train (₹1,500 reserved card). Pass through sprawling green valleys, take incredible photos at colonial Nine Arch Bridge, and hike local Little Adams Peak tracks.
                  </p>
                  <p className="font-mono text-xs text-luxury-gold font-bold">Est. cost: ₹4,800 (Ella Odyssey train, local pub dinners)</p>
                </div>
              </div>

              {/* Day 6 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-luxury-green border-2 border-luxury-gold flex items-center justify-center font-serif text-[10px] font-bold text-white">6</div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-luxury-green">Day 6: Yala Safari / Mirissa Gold Beaches</h3>
                  <p className="text-luxury-black/75 leading-relaxed font-light">
                    Descend to southern coast wild sands. Explore the gold palm reserves of Mirissa, climb famous Coconut Tree Hill for the sunset, or optionally book an exciting open jeep safari through Yala National Park tracking leopards.
                  </p>
                  <p className="font-mono text-xs text-luxury-gold font-bold">Est. cost: ₹8,000 (Beach resorts & oceanside seafood dinners)</p>
                </div>
              </div>

              {/* Day 7 */}
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-luxury-green border-2 border-luxury-gold flex items-center justify-center font-serif text-[10px] font-bold text-white">7</div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-luxury-green">Day 7: Galle Colonial Dutch Fort & Departure</h3>
                  <p className="text-luxury-black/75 leading-relaxed font-light">
                    Discover historic white-walled Galle Fort, snap photos under the iconic Galle Lighthouse, collect premium Ceylon spice souvenirs, and take the express highway direct to Colombo airport for evening return flights.
                  </p>
                  <p className="font-mono text-xs text-luxury-gold font-bold">Est. cost: ₹3,000 (Souvenir shopping & highway transfers)</p>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-4 bg-[#FAF8F5] rounded-[40px] p-8 border border-luxury-gold/20 space-y-6 sticky top-28 shadow-sm">
            <h3 className="font-serif text-2xl text-luxury-green font-bold">7-Day Journey Cost</h3>
            <p className="text-sm text-luxury-black/60 font-light leading-relaxed">
              Looking for a complete step-by-step roadmap breakdown covering transport logistics, hotels, and custom spots? Read our comprehensive 7-day master itinerary.
            </p>
            <div className="pt-4">
              <Link 
                to="/sri-lanka-7-day-itinerary"
                className="w-full inline-flex px-6 py-4 bg-luxury-green hover:bg-luxury-gold text-white font-bold uppercase text-[11px] tracking-widest rounded-full justify-center items-center gap-2 transition-all shadow-md"
              >
                <span>Read Full Sri Lanka 7 Day Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - COST BY TRAVELER TYPE */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="traveler-styles">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Bespoke segment Profiles</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Sri Lanka Trip Cost for Different Travelers
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Pricing profiles tailored to group dynamic limits</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Solo */}
          <div className="bg-white p-8 rounded-3xl border border-luxury-black/5 space-y-4 hover:border-luxury-gold/30 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-luxury-green font-bold">Solo Travelers</h3>
              <p className="font-mono text-sm text-luxury-gold font-bold">₹25,000 – ₹40,000 Base</p>
              <p className="text-xs text-luxury-black/60 leading-relaxed font-light">
                Perfect for independent backpackers or remote digital creators who prioritize local connection and heritage adventure trails over resort stays.
              </p>
              <ul className="text-xs space-y-2 text-luxury-black/70 list-disc pl-5 font-light">
                <li>Hostel dorms or clean family guest houses (₹1,500/night).</li>
                <li>Commute on scenic public train routes & local tuktuks.</li>
                <li>Dining on authentic pocket-friendly rice and curries (₹250/plate).</li>
              </ul>
            </div>
            <p className="text-[10px] text-luxury-black/40 italic font-mono pt-4 border-t border-luxury-black/5">*Excludes international aviation cards</p>
          </div>

          {/* Couples */}
          <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-luxury-gold/30 space-y-4 hover:border-luxury-gold transition-all relative flex flex-col justify-between">
            <span className="absolute -top-3.5 right-6 bg-luxury-gold text-luxury-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</span>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-luxury-green font-bold">Couples</h3>
              <p className="font-mono text-sm text-luxury-gold font-bold">₹80,000 – ₹120,000 Total</p>
              <p className="text-xs text-luxury-black/60 leading-relaxed font-light">
                Designed specifically for high-contrast romantic escapes, stunning oceanside boutique villas, and scenic sunset deck dining.
              </p>
              <ul className="text-xs space-y-2 text-luxury-black/70 list-disc pl-5 font-light">
                <li>Comfortable garden villas or plunge-pool boutique resorts (₹7,500/night).</li>
                <li>Continuously available dedicated private Sedan (all-inclusive fuel/accommodation).</li>
                <li>Local organic cafes and beachfront private dinners (₹1,500/meal).</li>
              </ul>
            </div>
            <p className="text-[10px] text-luxury-black/40 italic font-mono pt-4 border-t border-luxury-black/5">*Includes custom VIP airport transfers</p>
          </div>

          {/* Families */}
          <div className="bg-white p-8 rounded-3xl border border-luxury-black/5 space-y-4 hover:border-luxury-gold/30 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-luxury-green font-bold">Families</h3>
              <p className="font-mono text-sm text-luxury-gold font-bold">₹150,000 – ₹250,000 Total</p>
              <p className="text-xs text-luxury-black/60 leading-relaxed font-light">
                Specifically configured for multi-generational families requesting spacious vehicles, kid-friendly dining grids, and multi-bed stays.
              </p>
              <ul className="text-xs space-y-2 text-luxury-black/70 list-disc pl-5 font-light">
                <li>Comfortable connected family villas or premium sea resorts (₹12,000/night).</li>
                <li>Spacious high-roof private AC vehicle van with certified guide driver.</li>
                <li>Customized kid-friendly culinary plates & safe beaches guides.</li>
              </ul>
            </div>
            <p className="text-[10px] text-luxury-black/40 italic font-mono pt-4 border-t border-luxury-black/5">*Includes national safari entry jeep passes</p>
          </div>
        </div>
      </section>

      {/* SECTION 7 - BEST TIME TO VISIT & SAVE MONEY */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="seasonal-savings">
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-luxury-black/5 shadow-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:items-center">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-4xl font-serif text-luxury-green font-bold">
                  Best Time to Visit Sri Lanka for Indian Travelers
                </h2>
              </div>
              <p className="text-sm text-luxury-black/70 font-light leading-relaxed">
                Sri Lanka experiences dual monsoons, meaning when one coast is rainy, the other is completely sunny. Strategically picking months matching your desired routes can save you over <strong>40% on luxury boutique stays</strong>.
              </p>

              <div className="space-y-4 text-xs md:text-sm text-luxury-black/75">
                <div className="border-l-4 border-luxury-gold pl-4 space-y-1">
                  <p className="font-bold text-luxury-green font-serif text-base">Peak Season (December to March)</p>
                  <p className="font-light">Best sunny weather on West & South coast sandy shores. Resort bookings are premium. Reserve 60+ days early.</p>
                </div>
                <div className="border-l-4 border-luxury-gold pl-4 space-y-1">
                  <p className="font-bold text-luxury-green font-serif text-base">Shoulder Season (April & October – November)</p>
                  <p className="font-light">Beautiful transition weather. Dynamic pricing drops 20-30%, delivering magnificent comfort value for couples.</p>
                </div>
                <div className="border-l-4 border-luxury-gold pl-4 space-y-1">
                  <p className="font-bold text-luxury-green font-serif text-base">Off-Season (May to September)</p>
                  <p className="font-light">Southwest rains affect Galle/Mirissa, but East Coast beaches (Trincomalee) are perfectly sunny, offering 50% hotel discounts.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { month: "Dec - Mar", stay: "Peak Season", desc: "Dry West & South. Absolute best skies.", style: "border-luxury-gold bg-luxury-gold/5" },
                { month: "Apr & Sep", stay: "Shoulder Month", desc: "Lush green. Great resort savings.", style: "border-luxury-black/5 bg-white" },
                { month: "Jun - Aug", stay: "Value Off-Peak", desc: "Trincomalee dry beaches. 50% off.", style: "border-emerald-600/35 bg-emerald-500/5" },
                { month: "Oct - Nov", stay: "Shoulder Month", desc: "Lush skies, highly cost-efficient.", style: "border-luxury-black/5 bg-white" }
              ].map((item, index) => (
                <div key={index} className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${item.style}`}>
                  <div>
                    <span className="font-serif font-bold text-sm text-luxury-green block">{item.month}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-gold font-bold">{item.stay}</span>
                  </div>
                  <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light font-sans">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 - INTERACTIVE COST CALCULATOR */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="calculator">
        <div className="text-center mb-8 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Real-time Budget Planner</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Interactive Cost Calculator
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Adjust configurations on the fly to estimate Ceylon travel costs in INR & LKR</p>
        </div>

        <div className="bg-luxury-green text-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_40%)]" />
          <div className="grid lg:grid-cols-12 gap-12 lg:items-center relative z-10">
            
            {/* Input fields */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 block font-mono font-bold">1. Departure Indian Hub</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"].map((city) => (
                    <button
                      key={city}
                      onClick={() => setCalcInputs({...calcInputs, departureCity: city})}
                      className={`py-2 px-1 rounded-xl text-xs font-mono transition-all border ${
                        calcInputs.departureCity === city 
                          ? "bg-luxury-gold border-luxury-gold text-luxury-green font-bold" 
                          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-white/50 font-mono font-bold">
                  <span>2. Traveler Count</span>
                  <span className="text-luxury-gold font-bold">{calcInputs.travelers} Persons</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCalcInputs({...calcInputs, travelers: num})}
                      className={`flex-grow py-2.5 rounded-xl text-xs font-serif transition-all ${
                        calcInputs.travelers === num 
                          ? "bg-white text-luxury-green font-bold" 
                          : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {num === 6 ? "5+" : `${num}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-white/50 font-mono font-bold">
                  <span>3. Trip Length ({calcInputs.days} Days)</span>
                </div>
                <input 
                  type="range"
                  min="3"
                  max="14"
                  value={calcInputs.days}
                  onChange={(e) => setCalcInputs({...calcInputs, days: parseInt(e.target.value)})}
                  className="w-full accent-luxury-gold h-1 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-white/40 font-mono">
                  <span>3 Days</span>
                  <span>7 Days</span>
                  <span>14 Days</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 block font-mono font-bold">4. Experience Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "budget", name: "Budget" },
                    { id: "midrange", name: "Mid-Range" },
                    { id: "luxury", name: "Luxury" }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCalcInputs({...calcInputs, travelStyle: style.id as any})}
                      className={`p-2 rounded-xl text-center transition-all border flex flex-col justify-center items-center ${
                        calcInputs.travelStyle === style.id 
                          ? "bg-luxury-gold border-luxury-gold text-luxury-green font-bold" 
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="font-serif text-xs block">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations layout display */}
            <div className="lg:col-span-7 bg-white text-luxury-green rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-luxury-black/40 font-bold block">Live Estimated Overall Cost</span>
                <p className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tighter">
                  ₹{budget.total.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-luxury-black/40 font-mono mt-1">
                  *Approx LKR {(budget.total * 3.75).toLocaleString("en-IN", {maximumFractionDigits:0})} (Based on local conversion scale)
                </p>
              </div>

              <div className="space-y-3 font-sans text-xs border-y border-luxury-black/5 py-4">
                <div className="flex justify-between">
                  <span className="text-luxury-black/60 flex items-center gap-1.5"><Plane className="w-3.5 h-3.5 text-luxury-gold" /> Estimated Flight Airfares</span>
                  <span className="font-bold text-luxury-green">₹{budget.flights.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-black/60 flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-luxury-gold" /> Boutique Stay & Hotels</span>
                  <span className="font-bold text-luxury-green">₹{budget.hotels.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-black/60 flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5 text-luxury-gold" /> Dining & Food Allocations</span>
                  <span className="font-bold text-luxury-green">₹{budget.food.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-black/60 flex items-center gap-1.5"><Car className="w-3.5 h-3.5 text-luxury-gold" /> Private Chauffeur AC Car / SUV</span>
                  <span className="font-bold text-luxury-green">₹{budget.transport.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-black/60 flex items-center gap-1.5"><Ticket className="w-3.5 h-3.5 text-luxury-gold" /> Safaris & Sightseeings Entries</span>
                  <span className="font-bold text-luxury-green">₹{budget.attractions.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-luxury-cream p-3 rounded-xl border border-luxury-gold/20">
                <div className="space-y-0.5">
                  <p className="font-bold text-xs text-luxury-green font-serif">Average Cost Per Traveler</p>
                  <p className="text-[10px] text-luxury-black/40">Includes highway toll roads & private driver guides.</p>
                </div>
                <span className="font-serif text-lg text-luxury-gold font-bold">₹{Math.round(budget.total / calcInputs.travelers).toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={() => handleWhatsAppRedirect("calculator_outcome")}
                  className="w-full sm:w-auto px-6 py-3.5 bg-luxury-green hover:bg-luxury-gold text-white rounded-full font-serif text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Connect This Setup to My Direct Chat</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9 - FREE PERSONALIZED TRIP PLAN */}
      <section className="bg-luxury-green text-white py-20 px-6 relative" id="planner-form">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Co-create Your Bespoke Escape</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tighter">
              Get a Free Personalized <br /> Sri Lanka Travel Plan
            </h2>
            <p className="text-white/60 font-sans font-light max-w-2xl mx-auto text-sm md:text-base">
              Takes 45 seconds. Outline your dates, styles, and group demographics below. Our accredited destination concierge will engineer your exact tour timeline directly on WhatsApp for free.
            </p>
          </div>

          <div className="bg-white rounded-[40px] text-luxury-black p-8 md:p-12 text-left border border-white/10 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="lead-form"
                  onSubmit={handleLeadSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-luxury-black/40 font-bold block flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-luxury-gold" /> Your Full Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                        placeholder="e.g. Vikram Malhotra"
                        className="w-full px-5 py-4 rounded-xl bg-luxury-cream border border-luxury-black/10 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm font-sans"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-luxury-black/40 font-bold block flex items-center gap-2">
                        <PhoneCall className="w-3.5 h-3.5 text-luxury-gold" /> WhatsApp Mobile Number *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={leadForm.whatsapp}
                        onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-5 py-4 rounded-xl bg-luxury-cream border border-luxury-black/10 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Dates */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-luxury-black/40 font-bold block flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-luxury-gold" /> Preferred Dates
                      </label>
                      <input 
                        type="text"
                        value={leadForm.travelDates}
                        onChange={(e) => setLeadForm({...leadForm, travelDates: e.target.value})}
                        placeholder="e.g. October 2026 or Diwali"
                        className="w-full px-5 py-4 rounded-xl bg-luxury-cream border border-luxury-black/10 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm font-sans"
                      />
                    </div>

                    {/* Travelers count */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-luxury-black/40 font-bold block flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-luxury-gold" /> Total Travelers
                      </label>
                      <select 
                        value={leadForm.travelers}
                        onChange={(e) => setLeadForm({...leadForm, travelers: parseInt(e.target.value)})}
                        className="w-full px-5 py-4 rounded-xl bg-luxury-cream border border-luxury-black/10 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm font-sans text-luxury-black/70"
                      >
                        <option value={1}>Solo</option>
                        <option value={2}>Couple / Double room</option>
                        <option value={3}>3 Adults / Family</option>
                        <option value={4}>4 Adults / Family</option>
                        <option value={6}>5 + Group Stay</option>
                      </select>
                    </div>

                    {/* Style preference */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-luxury-black/40 font-bold block flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-luxury-gold" /> Vacation Budget style
                      </label>
                      <select 
                        value={leadForm.style}
                        onChange={(e) => setLeadForm({...leadForm, style: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-luxury-cream border border-luxury-black/10 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm font-sans text-luxury-black/70"
                      >
                        <option value="budget">Backpacker / Budget</option>
                        <option value="midrange">Comfort Boutique (Recommended)</option>
                        <option value="luxury">Curated Elite Luxury</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox"
                      id="opt-in-form"
                      checked={leadForm.agreed}
                      onChange={(e) => setLeadForm({...leadForm, agreed: e.target.checked})}
                      className="w-4 h-4 rounded border-luxury-black/20 text-luxury-gold focus:ring-luxury-gold mt-0.5 accent-luxury-gold"
                    />
                    <label htmlFor="opt-in-form" className="text-xs text-luxury-black/50 leading-relaxed font-sans font-light">
                      I agree to receive personalized tour timelines, LKR conversions manuals, and direct flight itineraries over WhatsApp from Plan Sri Lanka operators.
                    </label>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 bg-luxury-green hover:bg-luxury-gold text-white rounded-2xl font-serif text-lg md:text-xl font-bold transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Preparing Your Bespoke Planner...</span>
                        </>
                      ) : (
                        <>
                          <span>Deploy Free Travel Planner on WhatsApp</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="form-success"
                  className="text-center py-10 space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-luxury-green font-bold">Plan Dispatched!</h3>
                    <p className="text-sm text-luxury-black/60 max-w-lg mx-auto">
                      Thank you for trusting Plan Sri Lanka. Your direct WhatsApp conversation draft has opened! Please send the pre-written message to our team to lock in your free custom routing.
                    </p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3 bg-luxury-cream text-luxury-green hover:bg-luxury-gold/15 rounded-xl text-xs uppercase tracking-widest font-mono transition-all font-semibold"
                    >
                      Plan Another Segment
                    </button>
                    <a 
                      href="https://wa.me/94722968210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-luxury-green text-white rounded-xl text-xs uppercase tracking-widest font-mono font-bold hover:bg-luxury-gold transition-all"
                    >
                      Direct Chat Box
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Local contact safety and trust points */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 text-xs text-white/50 border-t border-white/5">
            <div className="space-y-1">
              <p className="font-serif text-white font-bold text-sm">SLTDA Accreditations</p>
              <p>Registered Sri Lanka Tourism SLTDA license holder.</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-white font-bold text-sm">100% Free Iterations</p>
              <p>Claim fully personalized 2026 planner maps for free.</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-white font-bold text-sm">Dedicated English Driver</p>
              <p>Comfortable modern fleets, priority accessibility support.</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-white font-bold text-sm">Global Operations</p>
              <p>Registered across both United Kingdom & Colombo offices.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10 - FAQs */}
      <section className="max-w-4xl mx-auto px-6 mb-20" id="faqs">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Discerning Answers</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-luxury-black/40 uppercase tracking-widest">Answering trending travel budget queries from search console</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-luxury-black/5 overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-luxury-gold/5 transition-colors"
                >
                  <span className="font-serif text-sm md:text-base text-luxury-green font-bold leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-luxury-gold transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-xs md:text-sm text-luxury-black/60 leading-relaxed font-sans italic border-t border-luxury-black/[0.03] pt-3 bg-luxury-cream/25">
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

      {/* MOVE DOWN SECTIONS: MONEY SAVING TIPS & VISUAL SITEMAP DIRECTORY */}
      <div className="bg-white border-t border-luxury-black/10 py-20 divide-y divide-luxury-black/10 space-y-20">
        
        {/* 20 Pro Money Saving Tips */}
        <section className="max-w-7xl mx-auto px-6" id="money-tips">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-4xl font-serif text-luxury-green tracking-tight font-bold">
                20 Pro Money Saving Tips
              </h2>
            </div>
            <p className="text-sm text-luxury-black/70 font-light leading-relaxed">
              Explore Sri Lanka comfortably without breaking your budget constraint. Our travel concierge curators compiled these 20 expert pointers specifically for Indian travelers:
            </p>

            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm text-luxury-black/80 font-light font-sans">
              <ul className="space-y-3.5">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Fly from Southern Terminals:</strong> Flights from Bangalore/Chennai save ₹10,000+ per passenger.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Secure Train Seats Early:</strong> Reserving 30 days prior on the Ella Odyssey bypasses high agency premiums.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Eat Traditional Rice & Curry:</strong> Local seaside diners serve authentic, unlimited buffet curries under ₹250.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Check Free Visa schemes:</strong> Keep updated on periodic bilateral waivers that eliminate tourist ETA fees.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Decline Paper INR transactions:</strong> Local stores accept only LKR (or withdraw cash at local ATMs).</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Depart mid-week:</strong> Flights scheduled on Tuesdays/Wednesdays are normally 15-20% cheaper than weekends.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Skip temple-gate guides:</strong> Verify guide licenses and negotiate flat-rate pricing up front.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Use Local PickMe App:</strong> Book local tuktuks and city cabs via local App to prevent tourist markup.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Avoid hotel water bottles:</strong> Request secure filtered drinking carafes from your boutique resort hosts.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Collect Dialog eSIMs at Colombo:</strong> Large data plans run barely ₹700, escaping expensive roaming bills.</span>
                </li>
              </ul>

              <ul className="space-y-3.5">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Route Counter-Clockwise:</strong> Traveling reverse direction in peak season often opens cheaper resort rates.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Stay Outside Galle Fort Walls:</strong> Cozy boutique villas in adjacent Unawatuna save up to 50% on rooms.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Rent gear directly at beaches:</strong> Secure surfboards or snorkels from local stalls rather than booking via resorts.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Join Shared Wildlife Safaris:</strong> Assemble families at national park gates to share jeep driver costs.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Avoid resort dry cleaning:</strong> Local laundry huts adjacent to beaches charge by lightweight kilo rates.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Carry proper change denominations:</strong> Exchange currency notes at airport arrival booths to get smaller bills.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Opt for Double Rooms:</strong> Request secondary bedding configuration inside single double-rooms for smaller families.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Hire continuous chauffeured SUVs:</strong> Day-by-day transfer taxi booking is significantly pricier in the long run.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Explore Pidurangala Rock instead:</strong> The entrance card is only ₹250, featuring unmatched panoramas of Sigiriya.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span><strong>Bargain with smiles:</strong> Gentle, respectful conversation at souvenir shops can shave up to 20% off listed prices.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Visual Sitemap / Ceylon Travel Hub Directory */}
        <section className="max-w-7xl mx-auto px-6 pt-20" id="sitemap">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="space-y-3">
              <span className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold block">Indexable Site Directory</span>
              <h3 className="font-serif text-2xl md:text-3xl text-luxury-green font-bold">Sitemap Directory</h3>
              <p className="text-xs sm:text-sm text-luxury-black/60 leading-relaxed font-light">
                Discover our complete registry of verified 2026 Ceylon travel timelines, border manuals, and interactive estimators:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              {/* Category A: Itineraries */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-luxury-green bg-luxury-gold/15 px-3 py-1 rounded-full">
                  1. Multi-Day Ceylon Itineraries
                </span>
                <div className="space-y-3">
                  <Link 
                    to="/sri-lanka-7-day-itinerary"
                    className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                          7-Day Sri Lanka Classic Itinerary
                        </p>
                        <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                          Our flagship first-journey blueprint. Connects Colombo, Sigiriya, Nuwara Eliya, Ella, and gold beach coasts.
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                    </div>
                  </Link>

                  <Link 
                    to="/sri-lanka-family-itinerary"
                    className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                          12-Day Family Journey
                        </p>
                        <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                          Designed with kids and elderly safety checklists, comfortable driving lengths, and resort selections.
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Category B: Interactive and border info */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-luxury-green bg-luxury-gold/15 px-3 py-1 rounded-full">
                  2. Planning Resources & Visa Manuals
                </span>
                <div className="space-y-3">
                  <Link 
                    to="/sri-lanka-visa-for-indians"
                    className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                          Sri Lanka Visa For Indians Checklist
                        </p>
                        <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                          Official guidelines for tourist ETA applications, approval times, free waiver campaigns, and entry tips.
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                    </div>
                  </Link>

                  <Link 
                    to="/sri-lanka-trip-planner"
                    className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                          Interactive Sri Lanka Trip Planner
                        </p>
                        <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                          Select destinations, examine driving hours, check monsoon guides, and co-create bespoke itineraries dynamically.
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
