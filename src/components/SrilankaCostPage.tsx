import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
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

  // FAQ array
  const faqs = [
    {
      q: "How much does a Sri Lanka trip cost from India on average?",
      a: "For an average 7-day mid-range comfort trip, expect to spend about ₹45,000 to ₹65,000 per person including direct flights, premium boutique accommodation, a private English-speaking chauffeur/guide, daily dining, and landmark entry tickets. Budget trips can run under ₹30,000, while premium custom luxury itineraries start around ₹1,10,000 to ₹2,50,000+ per traveler."
    },
    {
      q: "Can I explore Sri Lanka under ₹30,000 for Sri Lanka budget travel?",
      a: "Yes, Sri Lanka budget travel is highly feasible! By flying from southern hubs like Chennai or Bangalore (roundtrip under ₹12,000), booking local guesthouses (₹1,500/night/room), eating traditional rice & curry (₹250/meal), using Sri Lanka's beautiful railways instead of private cars, and choosing major free beaches and lower-cost viewpoints, a backpacking-style 5-day journey can easily stay under ₹30,000."
    },
    {
      q: "Do Indian citizens need a visa to visit Sri Lanka, and what does it cost?",
      a: "Yes, Indian citizens need a valid ETA (Electronic Travel Authorization) visa to enter Sri Lanka. Under recent tourism policies, government visa fees are periodically waived entirely for Indian tourists, or cost around $20 (approx ₹1,660). Visas are valid standard for a 30-day stay and easily booked online."
    },
    {
      q: "Which Indian city has the cheapest direct flights to Sri Lanka?",
      a: "Chennai (MAA) offers the cheapest flight tickets, often starting as low as ₹9,000 for a round-trip direct flight to Colombo. Bangalore (BLR) runs closely from ₹11,000 to ₹14,000. Flight prices from northern hubs like Delhi (DEL) or western hubs like Mumbai (BOM) are generally higher, starting at ₹18,000 to ₹25,000 round-trip."
    },
    {
      q: "Is Sri Lanka cheaper than Thailand or Bali for Indian families?",
      a: "Yes, Sri Lanka is significantly cheaper in several key areas. For Indian travelers, Colombo flights are generally shorter and less expensive than flight routes to Bangkok or Denpasar (especially from Bangalore and Chennai). Additionally, premier private luxury SUV transport and private English-speaking chauffeur guides are highly affordable, costing less than half of equivalent services in Southeast Asia, with food costs keeping incredibly budget-friendly."
    },
    {
      q: "Can I use Indian Rupees (INR) or credit cards in Sri Lanka to pay for travel expenses?",
      a: "While you cannot spend paper Indian Rupees directly in Sri Lankan markets, you can easily exchange INR cash for Sri Lankan Rupees (LKR) at Colombo airport arrival counters, or withdraw cash from local ATMs using international debit cards. Visa and MasterCard are widely accepted at boutique hotels, premium seaside restaurants, and major national park desks with minimal transactional markup. Keeping cash is highly recommended for small expenses."
    },
    {
      q: "How is the overall Sri Lanka itinerary cost structured for a 1-week trip?",
      a: "A standard 7-day Sri Lanka itinerary cost is split into: Flights (30-35%), Accommodation (25-30%), Chauffeur-driven Transport (15-20%), Fine Dining & Meals (12-15%), and Monument Entries/Safaris (10-12%). Booking a dynamic trip plan lets you customize these ratios to match your exact budget constraints."
    },
    {
      q: "What are the key hidden Sri Lanka travel expenses I should anticipate?",
      a: "The most common hidden travel expenses are monument entry tickets (such as Sigiriya at ₹2,500/person and Yala National Park entry + vehicle at around ₹8,000), tipping guides and driver/chauffeurs (customary around ₹500 - ₹1,000/day for great service), and dynamic peak-season hotel surcharges. Factoring these in early avoids surprise budgeting spikes."
    },
    {
      q: "How much does public transport save compared to booking a private chauffeur?",
      a: "Sri Lankan public trains (like the scenic Ella Odyssey) are incredibly cheap (usually ₹100 - ₹500 per ticket), but they operate on rigid timetables, lack absolute luxury, and cannot stop for scenic pictures. Booking a private custom air-conditioned sedan or high-contrast SUV with an accredited Chauffeur-Guide usually costs ₹4,000 to ₹7,000 per day including fuel, tolls, and driver lodging. It provides unmatched privacy and flexibility for Indian families."
    },
    {
      q: "What is the official ETA (Electronic Travel Authorization) filing timeline and channel for Indians in 2026?",
      a: "Indian passport holders should obtain a Tourist ETA online via the official government portal at least 3 to 7 days before flying. Approval is normally granted digitally within 12 to 24 hours. Because airline check-in desks in hubs like Chennai, Bangalore, and Delhi enforce strict pre-clearance rules, we highly advise carrying two physical prints of your ETA approval."
    },
    {
      q: "Where can I find the official sitemap directory for Plan Sri Lanka routes?",
      a: "To help search crawlers and travelers find our verified Ceylon travel guides, our complete system of pages is listed in our official XML sitemap at https://plan-srilanka.com/sitemap.xml. You can also trace all routes using our in-page visual HTML Sitemap Directory at the bottom of this page."
    }
  ];

  return (
    <div className="bg-luxury-cream min-h-screen text-luxury-black font-sans leading-relaxed selection:bg-luxury-gold/30 pt-24 md:pt-32">
      <Helmet>
        <title>Sri Lanka Trip Cost From India (2026 Guide) | Budget Calculator & Cost Breakdown</title>
        <meta name="description" content="Discover the complete Sri Lanka trip cost from India. Compare budget, mid-range and luxury travel costs, flights, hotels, visa fees and use our free trip budget calculator." />
        <link rel="canonical" href="https://plan-srilanka.com/sri-lanka-trip-cost-from-india" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://plan-srilanka.com/sri-lanka-trip-cost-from-india" />
        <meta property="og:title" content="Sri Lanka Trip Cost From India (2026 Guide) | Budget Calculator & Cost Breakdown" />
        <meta property="og:description" content="Discover the complete Sri Lanka trip cost from India. Compare budget, mid-range and luxury travel costs, flights, hotels, visa fees and use our free trip budget calculator." />
        <meta property="og:image" content="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1" />
        <meta property="og:site_name" content="Plan Sri Lanka" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sri Lanka Trip Cost From India (2026 Guide) | Budget Calculator & Cost Breakdown" />
        <meta name="twitter:description" content="Discover the complete Sri Lanka trip cost from India. Compare budget, mid-range and luxury travel costs, flights, hotels, visa fees and use our free trip budget calculator." />
        <meta name="twitter:image" content="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1" />
        
        {/* ARTICLE SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Trip Cost From India: The Definitive 2026 Cost & Budget Guide",
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
            "dateModified": "2026-06-12T17:54:02-07:00",
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

        {/* TRIP CALCULATOR PRODUCT & AGGREGATE OFFER SCHEMA */}
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
              "lowPrice": "28000",
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
      </Helmet>

      {/* SEO HEADER / BREADCRUMBS & BACKGROUND INTRO */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-black/50 mb-6 bg-transparent" aria-label="Breadcrumb">
          <a href="/" className="hover:text-luxury-gold transition-colors">Home</a>
          <span>/</span>
          <span className="text-luxury-gold font-semibold">Sri Lanka Trip Cost From India</span>
        </nav>
        
        <div className="border-l-4 border-luxury-gold/50 pl-6 space-y-3">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="bg-luxury-green/10 text-luxury-green font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[10px]">
              EEAT Certified Expert Guide
            </span>
            <span className="text-luxury-black/40 font-mono">Last Updated: June 2026</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif text-luxury-green tracking-tight leading-tight">
            Sri Lanka Trip Cost From India: <br className="hidden md:block"/>
            <span className="italic font-normal text-luxury-gold">The Ultimate 2026 Budget Blueprint</span>
          </h1>
          <p className="text-lg md:text-2xl text-luxury-black/70 font-light max-w-4xl tracking-wide">
            Ditch the guesswork. Discover exact rates for flights, boutique hotels, visual private yachts, visa waivers, and localized chauffeur routes custom-tailored for families and couples traveling from major Indian hubs.
          </p>
        </div>
      </div>

      {/* COMPANION TRUST BANNER */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl p-6 border border-luxury-black/5 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif text-base text-luxury-green font-bold">Skip the standard commercial calculators.</p>
              <p className="text-xs text-luxury-black/50">Plan Sri Lanka is London & Colombo's premier private concierge. No forms or deposits to claim your bespoke itinerary slots.</p>
            </div>
          </div>
          <button 
            onClick={() => document.getElementById('budget-planner')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full md:w-auto px-8 py-4 bg-luxury-green hover:bg-luxury-gold text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shrink-0 shadow-md"
          >
            Launch Cost Calculator
          </button>
        </div>
      </div>

      {/* QUICK ANSWER / FEATURED SNIPPET TARGET BOX */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-[#1A2F23] text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-luxury-gold">
                <Info className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-serif text-luxury-gold font-bold">Quick Answer / Featured Snippet Box</span>
            </div>

            <div className="space-y-4 max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-serif leading-snug">
                How much does a Sri Lanka trip typically cost from India?
              </h2>
              <p className="text-white/80 font-light text-base md:text-lg leading-relaxed">
                An average <strong className="text-luxury-gold text-white font-bold">7-day Sri Lanka holiday package from India</strong> costs roughly <strong className="text-luxury-gold text-white font-bold">₹45,000 to ₹65,000 per person</strong> for a mid-range comfort style. This covers direct round-trip economy flights, stylish boutique resort rooms, a private customized car with driver/guide, sightseeing entries, and local sea-views dining. Let’s look at standard total ballpark budgets per traveler archetype:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-luxury-gold/30 transition-all">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Backpacker / Budget</span>
                <p className="text-2xl font-serif text-luxury-gold font-bold mb-2">₹25,000 - ₹35,000</p>
                <p className="text-xs text-white/70 font-light">Train journeys, beach hostels, public dining & minimal entrance cards.</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 border border-luxury-gold/30 relative hover:border-luxury-gold transition-all">
                <span className="absolute -top-3 right-4 bg-luxury-gold text-luxury-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Popular Comfort
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Bespoke Mid-Range</span>
                <p className="text-2xl font-serif text-luxury-gold font-bold mb-2">₹48,000 - ₹72,000</p>
                <p className="text-xs text-white/70 font-light">Boutique heritage villas, private chauffeured SUV, authentic lagoon lunches.</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-luxury-gold/30 transition-all">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">Bespoke Ultra-Luxury</span>
                <p className="text-2xl font-serif text-luxury-gold font-bold mb-2">₹1,15,000 - ₹3,50,000+</p>
                <p className="text-xs text-white/70 font-light">Accredited Relais & Châteaux resorts, private helipads, luxury sailing.</p>
              </div>
            </div>
            
            {/* CTA #1: Above the fold visual */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => handleWhatsAppRedirect("featured_snippet")}
                className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-luxury-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-luxury-green transition-all shadow-lg flex items-center justify-center gap-3"
              >
                Get Custom Quote Via WhatsApp <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-white/40 italic">First customized planning blueprint is free • Contact our Colombo & London team</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE BUDGET SUMMARY COMPARISON BLOCK */}
      <section className="max-w-7xl mx-auto px-6 mb-20" id="budget-tiers">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Comprehensive Tiers</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight">
            Sri Lanka Budget vs Mid-Range vs Luxury Cost Analysis
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Calculated per double occupancy stay in Indian Rupees (INR)</p>
        </div>

        <div className="overflow-x-auto rounded-[32px] border border-luxury-black/5 shadow-luxury">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-luxury-green text-white text-xs md:text-sm font-serif">
                <th className="p-6 md:p-8 rounded-tl-[32px]">Cost Category</th>
                <th className="p-6 md:p-8">Budget Style (Backpacker)</th>
                <th className="p-6 md:p-8">Bespoke Mid-Range (Boutique)</th>
                <th className="p-6 md:p-8 rounded-tr-[32px]">Elite Luxury (Connoisseur)</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm text-luxury-black/70 divide-y divide-luxury-black/[0.04]">
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Direct Round flights (DEL/BOM)</td>
                <td className="p-6 md:p-8">₹15,000 - ₹20,000</td>
                <td className="p-6 md:p-8">₹19,000 - ₹28,000</td>
                <td className="p-6 md:p-8">₹45,000 - ₹85,000 (Biz Class)</td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Stay per night (Room)</td>
                <td className="p-6 md:p-8">₹1,200 - ₹2,500 <br/><span className="text-[10px] text-luxury-black/40">Clean local homestay</span></td>
                <td className="p-6 md:p-8">₹5,000 - ₹12,000 <br/><span className="text-[10px] text-luxury-black/40">Styled boutique garden villa</span></td>
                <td className="p-6 md:p-8">₹25,000 - ₹80,000+ <br/><span className="text-[10px] text-luxury-black/40">Relais & Châteaux suite</span></td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Food & Fine Dining (Daily)</td>
                <td className="p-6 md:p-8">₹600 - ₹1,000</td>
                <td className="p-6 md:p-8">₹2,000 - ₹4,500</td>
                <td className="p-6 md:p-8">₹8,000 - ₹18,000+</td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Ground Commute (Daily)</td>
                <td className="p-6 md:p-8">₹500 - ₹1,000 <br/><span className="text-[10px] text-luxury-black/40">Scenic trains / tuktuks</span></td>
                <td className="p-6 md:p-8">₹4,000 - ₹6,000 <br/><span className="text-[10px] text-luxury-black/40">Private Sedan + chauffeur guide</span></td>
                <td className="p-6 md:p-8">₹12,000 - ₹25,000 <br/><span className="text-[10px] text-luxury-black/40">Elite SUV / Land Cruiser / Heli</span></td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-green">Activity card & Entries</td>
                <td className="p-6 md:p-8">₹3,000 total <br/><span className="text-[10px] text-luxury-black/40">Local beach, public temples</span></td>
                <td className="p-6 md:p-8">₹12,000 - ₹18,000 total <br/><span className="text-[10px] text-luxury-black/40">Sigiriya Rock, Ella safari, train leg</span></td>
                <td className="p-6 md:p-8">₹35,000 - ₹1,10,000 total <br/><span className="text-[10px] text-luxury-black/40">Private yacht sail, helicopter leg</span></td>
              </tr>
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-6 md:p-8 font-serif font-bold text-luxury-gold bg-luxury-gold/5">Total Estimated Budget (7 Days)</td>
                <td className="p-6 md:p-8 font-bold bg-luxury-gold/5 text-luxury-black">₹28,000 - ₹38,000</td>
                <td className="p-6 md:p-8 font-bold bg-luxury-gold/5 text-luxury-green">₹48,000 - ₹75,000</td>
                <td className="p-6 md:p-8 font-bold bg-luxury-gold/5 text-luxury-gold">₹1,60,000 - ₹3,80,000+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CORE INTERACTIVE BUDGER PLANNER CALCULATOR TOOL (SECTION 3) */}
      <section className="bg-luxury-green py-20 px-6 text-white overflow-hidden relative" id="budget-planner">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/[0.01] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:items-center">
            
            {/* Left side column: The Interactive Inputs Form */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-mono block">Personalized Applet</span>
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-none text-white">
                  Interactive Sri Lanka Budget Calculator
                </h2>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Toggle departures, traveler counts, duration, and tailored styles. Watch our local Sri Lankan cost matrix compute direct package expectations in real-time.
                </p>
              </div>

              <div className="bg-white/5 rounded-[32px] p-8 border border-white/10 space-y-6">
                
                {/* 1. Departure City Select */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 block font-mono">Departure Indian Hub</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
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

                {/* 2. Travelers Slider/Buttons */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest text-white/50 font-mono">
                    <span>Traveler Count</span>
                    <span className="text-luxury-gold font-bold">{calcInputs.travelers} Persons</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCalcInputs({...calcInputs, travelers: num})}
                        className={`flex-grow py-3 rounded-xl text-xs font-serif transition-all ${
                          calcInputs.travelers === num 
                            ? "bg-white text-luxury-green font-bold" 
                            : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {num === 6 ? "5+ (Group)" : `${num} ${num === 1 ? 'Solo' : 'Travelers'}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Duration Days Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest text-white/50 font-mono">
                    <span>Trip Length</span>
                    <span className="text-luxury-gold font-bold">{calcInputs.days} Days</span>
                  </div>
                  <input 
                    type="range"
                    min="3"
                    max="14"
                    value={calcInputs.days}
                    onChange={(e) => setCalcInputs({...calcInputs, days: parseInt(e.target.value)})}
                    className="w-full accent-luxury-gold h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 font-mono">
                    <span>3 Days (Short)</span>
                    <span>7 Days (Classic)</span>
                    <span>14 Days (Leisure)</span>
                  </div>
                </div>

                {/* 4. Travel style choice */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 block font-mono">Curated Experience Style</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "budget", name: "Budget", desc: "Local Homestays" },
                      { id: "midrange", name: "Bespoke Mid-Range", desc: "Boutique Comfort" },
                      { id: "luxury", name: "Elite Luxury", desc: "Premium Stays" }
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setCalcInputs({...calcInputs, travelStyle: style.id as any})}
                        className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                          calcInputs.travelStyle === style.id 
                            ? "bg-luxury-gold border-luxury-gold text-luxury-green" 
                            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                        }`}
                      >
                        <span className="font-serif text-sm font-bold block">{style.name}</span>
                        <span className="text-[9px] opacity-65 block mt-1">{style.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right side column: Outputted live breakdown visual */}
            <div className="lg:col-span-7">
              <div className="bg-white text-luxury-green rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[550px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-8">
                  <div className="flex justify-between items-start border-b border-luxury-black/5 pb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold block mb-1">Live Estimated Total Budget</span>
                      <p className="text-4xl md:text-6xl font-serif text-luxury-green tracking-tighter">
                        ₹{budget.total.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-luxury-black/40 mt-1 font-mono">
                        *Roughly equals LKR {(budget.total * 3.75).toLocaleString("en-IN", {maximumFractionDigits:0})} (Sri Lankan Rupee exchange)
                      </p>
                    </div>
                    <div className="text-right bg-luxury-cream px-4 py-2 border border-luxury-black/5 rounded-2xl">
                      <p className="text-[9px] uppercase tracking-widest text-luxury-black/30 font-bold">Per Person Average</p>
                      <p className="font-serif text-lg text-luxury-gold font-bold">
                        ₹{Math.round(budget.total / calcInputs.travelers).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Progressive visual bar breakdown */}
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-widest text-luxury-black/50 font-bold">Cost Categories Split</p>
                    
                    {/* Flights bar line */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="flex items-center gap-2"><Plane className="w-3.5 h-3.5 text-luxury-gold" /> Airfare ({calcInputs.departureCity} - Colombo)</span>
                        <span className="font-bold">₹{budget.flights.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="w-full bg-luxury-cream h-2.5 rounded-full overflow-hidden">
                        <div className="bg-luxury-gold h-full rounded-full transition-all duration-500" style={{width: `${(budget.flights/budget.total)*100}%`}} />
                      </div>
                    </div>

                    {/* Stays bar line */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="flex items-center gap-2"><Building className="w-3.5 h-3.5 text-luxury-gold" /> Boutique Hotels & Rooms</span>
                        <span className="font-bold font-semibold text-luxury-black">₹{budget.hotels.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="w-full bg-luxury-cream h-2.5 rounded-full overflow-hidden">
                        <div className="bg-luxury-green h-full rounded-full transition-all duration-500" style={{width: `${(budget.hotels/budget.total)*100}%`}} />
                      </div>
                    </div>

                    {/* Dining bar line */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="flex items-center gap-2"><Utensils className="w-3.5 h-3.5 text-luxury-gold" /> Dining & Coastal Food</span>
                        <span className="font-bold">₹{budget.food.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="w-full bg-luxury-cream h-2.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-800 h-full rounded-full transition-all duration-500" style={{width: `${(budget.food/budget.total)*100}%`}} />
                      </div>
                    </div>

                    {/* Commute bar line */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="flex items-center gap-2"><Car className="w-3.5 h-3.5 text-luxury-gold" /> Ground Transport Chauffeur SUV</span>
                        <span className="font-bold">₹{budget.transport.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="w-full bg-luxury-cream h-2.5 rounded-full overflow-hidden">
                        <div className="bg-teal-700 h-full rounded-full transition-all duration-500" style={{width: `${(budget.transport/budget.total)*100}%`}} />
                      </div>
                    </div>

                    {/* Ticket bar line */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="flex items-center gap-2"><Ticket className="w-3.5 h-3.5 text-luxury-gold" /> Sightseeing / Activity Cards</span>
                        <span className="font-bold">₹{budget.attractions.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="w-full bg-luxury-cream h-2.5 rounded-full overflow-hidden">
                        <div className="bg-yellow-600 h-full rounded-full transition-all duration-500" style={{width: `${(budget.attractions/budget.total)*100}%`}} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-luxury-cream p-4 rounded-2xl border border-luxury-black/5 text-xs text-luxury-black/60 italic flex gap-3">
                    <Info className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <span>
                      Rates are live-mode and computed for 2026 travel season. All mid-range and luxury routes include our signature dedicated air-conditioned vehicles, premium tolls, and private bilingual certified drivers.
                    </span>
                  </div>
                </div>

                {/* Interactive CTA bottom layout */}
                {/* CTA #2: After budget calculator */}
                <div className="mt-8 pt-6 border-t border-luxury-black/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-luxury-black/40 font-bold">Claim My Trip Plan?</h4>
                    <p className="font-serif italic text-lg text-luxury-green font-semibold">Start Customizing Free of Charge</p>
                  </div>
                  <button 
                    onClick={() => handleWhatsAppRedirect("calculator_outcome")}
                    className="px-8 py-4 bg-luxury-green hover:bg-luxury-gold text-white rounded-full font-serif text-xs font-semibold uppercase tracking-[0.15em] transition-all flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Receive This Budget Book</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPREHENSIVE COST ARTICLE CONTENT (SECTION 2 - SEO HUB & TOPICAL COVERAGE) */}
      <section className="max-w-4xl mx-auto px-6 py-20 divide-y divide-luxury-black/15 space-y-20">
        
        {/* DETAILED CATEGORY BREAKDOWNS */}
        <article className="space-y-12">
          <div className="space-y-4">
            <span className="text-luxury-gold uppercase tracking-[0.2em] text-xs font-bold block">Topical Cost Breakdown</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-snug tracking-tight">
              Detailed Breakdown: Airfare, Accommodation, Transport, Food & Activities
            </h2>
            <p className="text-luxury-black/70 font-light text-base leading-relaxed">
              When calculating your total <strong className="font-semibold text-luxury-green">Sri Lanka travel expenses</strong>, it is vital to segment costs into distinct categories. This allows you to scale up on experiences that matter to you (such as elite beachfront resorts or customized safaris) while cutting back on simpler components. Let's look at exact Indian Rupee (INR) cost mappings based on live 2026 travel data:
            </p>
          </div>

          <div className="space-y-10 pt-6">
            
            {/* 1. FLIGHTS */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-serif text-luxury-green flex items-center gap-2 border-b border-luxury-gold/20 pb-2">
                <Plane className="w-5 h-5 text-luxury-gold" /> Flights from India: Routes & Average Airfares
              </h3>
              <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                Direct flights represent your core initial outflow. Tickets standard-route into Bandaranaike International Airport (CMB) in Colombo. Flying from southern cities (Chennai, Bangalore) is highly cost-effective, while flights from northern or western hubs (Delhi, Mumbai) are generally higher:
              </p>
              <div className="bg-white p-5 rounded-3xl border border-luxury-black/5 shadow-sm">
                <ul className="space-y-2.5 text-xs font-mono text-luxury-black/70">
                  <li className="flex justify-between border-b border-luxury-black/[0.04] pb-2">
                    <span>Chennai (MAA) to Colombo (CMB) - Direct (Air India, IndiGo)</span>
                    <span className="font-bold text-luxury-green">₹9,500 - ₹13,500 round-trip</span>
                  </li>
                  <li className="flex justify-between border-b border-luxury-black/[0.04] pb-2">
                    <span>Bangalore (BLR) to Colombo (CMB) - Direct (IndiGo, SriLankan)</span>
                    <span className="font-bold text-luxury-green">₹11,500 - ₹16,000 round-trip</span>
                  </li>
                  <li className="flex justify-between border-b border-luxury-black/[0.04] pb-2">
                    <span>Mumbai (BOM) to Colombo (CMB) - Direct (SriLankan, Vistara)</span>
                    <span className="font-bold text-luxury-green">₹18,000 - ₹24,000 round-trip</span>
                  </li>
                  <li className="flex justify-between border-b border-luxury-black/[0.04] pb-2">
                    <span>Delhi (DEL) to Colombo (CMB) - Direct (Air India, SriLankan)</span>
                    <span className="font-bold text-luxury-green">₹19,000 - ₹28,000 round-trip</span>
                  </li>
                  <li className="flex justify-between border-b border-luxury-black/[0.04] pb-2">
                    <span>Hyderabad (HYD) to Colombo (CMB) - Direct (IndiGo)</span>
                    <span className="font-bold text-luxury-green">₹14,500 - ₹19,500 round-trip</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-luxury-black/50 italic">
                *Pro-Tip: Ensure your passports are valid for at least 6 months. Review the quick steps in our official <Link to="/sri-lanka-visa-for-indians" className="text-luxury-gold underline hover:text-luxury-green transition-colors">Sri Lanka Tourist Visa Guide</Link> before booking.
              </p>
            </div>

            {/* 2. ACCOMMODATION */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-serif text-luxury-green flex items-center gap-2 border-b border-luxury-gold/20 pb-2">
                <Building className="w-5 h-5 text-luxury-gold" /> Accommodation Pricing: From Homestays to Luxury Boutiques
              </h3>
              <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                Sri Lanka offers legendary hospitality standards. You can choose cozy local beach cabanas, lush green tea bungalows in Nuwara Eliya, or award-winning luxury preserves in Yala. Hotel rates are significantly more affordable than in neighboring destinations like Bali:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-luxury-black/5 space-y-2">
                  <p className="font-bold text-xs uppercase tracking-wider text-luxury-gold font-mono">Budget Guesthouses</p>
                  <p className="text-lg font-serif font-bold text-luxury-green">₹1,200 - ₹2,500 / night</p>
                  <p className="text-xs text-luxury-black/50 font-light font-sans">Clean homestays, fan or basic AC, shared or private baths, breakfast optionally included.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-luxury-gold/20 space-y-2">
                  <span className="text-[8px] bg-luxury-gold text-luxury-black font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest block w-max">Highly Preferred</span>
                  <p className="font-bold text-xs uppercase tracking-wider text-luxury-gold font-mono">Boutique Comfort</p>
                  <p className="text-lg font-serif font-bold text-luxury-green">₹5,000 - ₹12,000 / night</p>
                  <p className="text-xs text-luxury-black/50 font-light font-sans">Elegantly styled heritage tea bungalows, lagoon-facing garden villas, swimming pools, full breakfast feasts.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-luxury-black/5 space-y-2">
                  <p className="font-bold text-xs uppercase tracking-wider text-luxury-gold font-mono">Ultra-Luxury Resorts</p>
                  <p className="text-lg font-serif font-bold text-luxury-green">₹25,000 - ₹75,000+ / night</p>
                  <p className="text-xs text-luxury-black/50 font-light font-sans">Elite Relais & Châteaux residences, clifftop private infinity pools, wellness sanctuaries (Aman, Resplendent Ceylon).</p>
                </div>
              </div>
            </div>

            {/* 3. TRANSPORT */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-serif text-luxury-green flex items-center gap-2 border-b border-luxury-gold/20 pb-2">
                <Car className="w-5 h-5 text-luxury-gold" /> Local Transportation Options: Chauffeur-Driven SUV vs. Public Rail
              </h3>
              <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                Getting around Sri Lanka efficiently is critical because driving distances look short on maps but can stretch to 4-5 hours due to winding mountain terrains. While public trains (like the scenic Ella Blue Train) are very cheap, booking a private chauffeur is the gold standard for stress-free exploration:
              </p>
              <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-luxury-black/5 space-y-4">
                <div className="grid md:grid-cols-2 gap-6 text-xs text-luxury-black/70">
                  <div className="space-y-1">
                    <p className="font-serif font-bold text-sm text-luxury-green">Option A: Private Chauffeur-Guide (Recommended)</p>
                    <p className="font-mono text-luxury-gold font-bold">₹4,000 - ₹6,500 per day (All-Inclusive)</p>
                    <p className="leading-relaxed font-light">Includes a dedicated, modern air-conditioned sedan or rugged SUV, premium highway tolls, fuel, insurance, and the driver's own overnight accommodation/food. It gives you 100% flexibility to stop at waterfalls and viewpoints.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif font-bold text-sm text-luxury-black/80">Option B: Trains, Public Buses, & TukTuks</p>
                    <p className="font-mono text-luxury-black/60 font-medium">₹150 - ₹1,800/segment</p>
                    <p className="leading-relaxed font-light">Third-class unreserved trains cost almost nothing can get crowded. Scenic first-class observation seats on the Kandy to Ella train must be reserved up to 30 days in advance and cost around ₹1,800.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-luxury-gold/10 text-xs text-luxury-black/60 italic flex gap-3">
                  <Info className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>
                    Need to figure out realistic driving times between Sigiriya, Kandy, and Ella? Our interactive <Link to="/sri-lanka-trip-planner" className="text-luxury-gold underline hover:text-luxury-green font-bold">Sri Lanka Trip Planner</Link> generates custom map routing with actual, traffic-calibrated driving hours instantly!
                  </span>
                </div>
              </div>
            </div>

            {/* 4. FOOD */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-serif text-luxury-green flex items-center gap-2 border-b border-luxury-gold/20 pb-2">
                <Utensils className="w-5 h-5 text-luxury-gold" /> Daily Food & dining Costs
              </h3>
              <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                Sri Lankan cuisine is incredibly vibrant, rich in spices, coconut, and freshly caught seafood. Food is extremely budget-friendly for Indian travelers:
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-luxury-black/70 list-disc pl-5 font-light">
                <li><strong>Local Rice & Curry Buffets:</strong> Running under ₹200 - ₹350 per meal. Includes red heirloom rice, dhal curry, sambol, and up to 5 seasonal veggie curries.</li>
                <li><strong>Mid-range Mountain/Beach Cafes:</strong> ₹1,200 - ₹2,200 per meal. Covers fresh avocado toasts, wood-fired pizzas, delicious Ceylon teas, or fresh fruit shakes.</li>
                <li><strong>High-end Seafood & Colonial Dining (Galle Fort):</strong> ₹3,500 - ₹6,000 per couple. Includes premium lagoon-crab platters, jumbo prawns, mocktails, and decadent curd desserts.</li>
              </ul>
            </div>

            {/* 5. ATTRACTIONS */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-serif text-luxury-green flex items-center gap-2 border-b border-luxury-gold/20 pb-2">
                <Ticket className="w-5 h-5 text-luxury-gold" /> Attractions & Sightseeing Monument Entries
              </h3>
              <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                UNESCO preserved ruins and pristine wildlife reserves carry official ticketing in USD, which constitutes the second largest fixed expense on your itinerary. Check out average ticketing fees below:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-luxury-black/5">
                  <p className="font-bold text-xs text-luxury-green">Sigiriya Lion Rock Citadel</p>
                  <p className="font-mono text-xs text-luxury-gold font-bold mt-1">₹2,500 ($30 USD)</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-luxury-black/5">
                  <p className="font-bold text-xs text-luxury-green">Yala National Park Safari (4x4 Jeep)</p>
                  <p className="font-mono text-xs text-luxury-gold font-bold mt-1">₹7,500 - ₹11,000 / group</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-luxury-black/5">
                  <p className="font-bold text-xs text-luxury-green">Temple of the Sacred Tooth Relic</p>
                  <p className="font-mono text-xs text-luxury-gold font-bold mt-1">₹550 (LKR 2,000)</p>
                </div>
              </div>
              <p className="text-xs text-luxury-black/50 italic leading-relaxed">
                *Pro-Tip: Map these monuments across a realistic loop. See our step-by-step <Link to="/sri-lanka-7-day-itinerary" className="text-luxury-gold underline hover:text-luxury-green font-bold">Sri Lanka 7-Day Itinerary</Link> to structure your daily sightseeing entries with travel flow maps.
              </p>
            </div>

            {/* 6. MISCELLANEOUS */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-serif text-luxury-green flex items-center gap-2 border-b border-luxury-gold/20 pb-2">
                <ShieldCheck className="w-5 h-5 text-luxury-gold" /> Miscellaneous Expenses: Visas, eSIMs, & SIM Tariffs
              </h3>
              <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                Minor incidentals like keeping high speed 5G data connectivity and official visa registrations are quite straightforward:
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-luxury-black/70 list-disc pl-5 font-light">
                <li><strong>ETA Visa Fee:</strong> Under periodic campaigns, e-visa ETA fees for Indian passport holders are waived (₹0) or run around $20 (₹1,660).</li>
                <li><strong>5G Local eSIM:</strong> Dialog or Mobitel eSIM counters at Colombo Airport arrival counter charge just ₹700 (Approx LKR 2,500) for a 50GB high-speed data package.</li>
                <li><strong>Customary Tipping:</strong> Tipping is deeply customary in Sri Lankan hospitality. Budget around ₹500 - ₹800 per day for your private chauffeur, and LKR 200 - 500 for hotel bellboys.</li>
              </ul>
            </div>

          </div>
        </article>

        {/* MONTH-BY-MONTH CALENDAR */}
        <article className="pt-20 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-green tracking-tight">
              Month-by-Month Sri Lanka Cost & Humidity Calendar
            </h2>
          </div>
          <p className="text-luxury-black/70 font-light text-base leading-relaxed">
            Sri Lanka experiences dual monsoons, creating distinct high and low cost opportunities across alternate coasts. Understanding this monsoonal rhythm can save you over <strong className="text-luxury-gold font-bold">40% on hotel stays</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { month: "Dec - Mar (Peak)", stay: "High Rates", trend: "Fully Dry (West/South)", color: "border-luxury-gold bg-luxury-gold/5", tag: "Best Weather" },
              { month: "Apr - May (Shoulder)", stay: "Moderate Rates", trend: "Inter-monsoon, Festive", color: "border-luxury-black/5 bg-white" },
              { month: "Jun - Sep (Value Off)", stay: "Up to 50% Off", trend: "Monsoon West/South", color: "border-emerald-600/35 bg-emerald-500/5", tag: "Max Savings" },
              { month: "Oct - Nov (Shoulder)", stay: "Discounted Rates", trend: "Lush botanical skies", color: "border-luxury-black/5 bg-white" }
            ].map((item, index) => (
              <div key={index} className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 relative overflow-hidden ${item.color}`}>
                {item.tag && (
                  <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-widest bg-luxury-green/15 text-luxury-green px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                )}
                <div>
                  <p className="font-serif font-bold text-sm text-luxury-green">{item.month}</p>
                  <p className="text-xs text-luxury-gold font-mono font-bold uppercase mt-1">{item.stay}</p>
                </div>
                <p className="text-[11px] text-luxury-black/50 leading-relaxed font-sans">{item.trend}</p>
              </div>
            ))}
          </div>
        </article>

        {/* COMPARISON WITH OTHER HUB TARGETS */}
        <article className="pt-20 space-y-8">
          <h2 className="text-2xl md:text-4xl font-serif text-luxury-green tracking-tight">
            Sri Lanka vs Thailand vs Bali vs Vietnam: Indian Holiday Cost Duel
          </h2>
          <p className="text-luxury-black/70 font-light">
            How does Sri Lanka stack up against other legendary Southeast Asian getaways? Let's benchmark equivalent 7-day mid-range couples trips:
          </p>

          <div className="overflow-x-auto rounded-3xl border border-luxury-black/5 shadow-md">
            <table className="w-full text-left bg-white text-xs md:text-sm">
              <thead>
                <tr className="bg-luxury-cream text-luxury-green font-serif border-b border-luxury-black/5">
                  <th className="p-4 md:p-6 font-bold">Metric (Approx INR)</th>
                  <th className="p-4 md:p-6 bg-luxury-gold/5 text-luxury-green font-bold">Sri Lanka</th>
                  <th className="p-4 md:p-6 text-luxury-black/60">Thailand</th>
                  <th className="p-4 md:p-6 text-luxury-black/60">Bali (Indonesia)</th>
                  <th className="p-4 md:p-6 text-luxury-black/60">Vietnam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-black/[0.04] text-luxury-black/70">
                <tr>
                  <td className="p-4 md:p-6 font-semibold">Avg Round Flight (DEL)</td>
                  <td className="p-4 md:p-6 bg-luxury-gold/10 font-bold text-luxury-green">₹22,000</td>
                  <td className="p-4 md:p-6">₹24,000</td>
                  <td className="p-4 md:p-6">₹32,000</td>
                  <td className="p-4 md:p-6">₹26,000</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-semibold">Visa Charge (Indians)</td>
                  <td className="p-4 md:p-6 bg-luxury-gold/10 font-bold text-luxury-green">₹0 - ₹1,660 <br/><span className="text-[9px] text-luxury-black/40">Frequent Waiver campaigns</span></td>
                  <td className="p-4 md:p-6">₹0 <br/><span className="text-[9px] text-luxury-black/40">Visa Free Promo</span></td>
                  <td className="p-4 md:p-6">₹2,700 <br/><span className="text-[9px] text-luxury-black/40">Visa on Arrival</span></td>
                  <td className="p-4 md:p-6">₹2,100 <br/><span className="text-[9px] text-luxury-black/40">E-Visa Fee</span></td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-semibold">Private Chauffeur Commute</td>
                  <td className="p-4 md:p-6 bg-luxury-gold/10 font-bold text-luxury-green">₹4,500/day <br/><span className="text-[9px] text-luxury-black/40">Driver stay included</span></td>
                  <td className="p-4 md:p-6 font-semibold">₹6,800/day</td>
                  <td className="p-4 md:p-6">₹5,200/day</td>
                  <td className="p-4 md:p-6">₹6,500/day</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 font-semibold">Attraction Entry (Avg)</td>
                  <td className="p-4 md:p-6 bg-luxury-gold/10 font-bold text-luxury-green">₹2,500 <br/><span className="text-[9px] text-luxury-black/40">Sigiriya Rock</span></td>
                  <td className="p-4 md:p-6">₹1,200</td>
                  <td className="p-4 md:p-6">₹800</td>
                  <td className="p-4 md:p-6">₹1,500</td>
                </tr>
                <tr className="bg-luxury-cream">
                  <td className="p-4 md:p-6 font-serif font-bold text-luxury-green">Total 7-Day Spend Range</td>
                  <td className="p-4 md:p-6 bg-luxury-gold/20 font-bold text-luxury-green">₹48,000 - ₹72,000</td>
                  <td className="p-4 md:p-6 font-semibold">₹55,000 - ₹85,000</td>
                  <td className="p-4 md:p-6">₹68,000 - ₹1,10,000</td>
                  <td className="p-4 md:p-6">₹58,000 - ₹88,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* CTA #3: MIDDLE OF ARTICLE */}
        <article className="pt-20">
          <div className="bg-[#FAF8F5] rounded-[32px] p-8 md:p-12 border border-luxury-gold/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="space-y-3">
              <span className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] font-bold block">Tailored Blueprints</span>
              <h3 className="text-2xl font-serif text-luxury-green font-bold">Why guess the conversion rate arithmetic?</h3>
              <p className="text-xs text-luxury-black/60 max-w-xl font-sans">
                Our in-house Colombo travel directors can outline a customized, high-contrast digital roadmap matching your preferred dates and flight timings—completely free of charge. Let us design your itinerary down to the best oceanview deck.
              </p>
            </div>
            <a 
              href="https://wa.me/94722968210?text=Hi!+Interested+in+a+custom+itinerary+to+Sri+Lanka."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', 'conversion', 'cost_page_mid_article')}
              className="px-8 py-5 bg-luxury-green hover:bg-luxury-gold text-white font-serif text-xs font-semibold uppercase tracking-widest rounded-full transition-all shrink-0 flex items-center gap-2 group shadow-lg cursor-pointer"
            >
              <span>Get Free Personalized Itinerary</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
            </a>
          </div>
        </article>

        {/* SIGHTSEEING ENTRANCE FEES TABLE (Yala, Galle, Sigiriya, train) */}
        <article className="pt-20 space-y-8">
          <h2 className="text-2xl md:text-4xl font-serif text-luxury-green tracking-tight">
            Sri Lanka Landmark Entry & Safari Activity Costs (2026 Prices)
          </h2>
          <p className="text-luxury-black/70 font-light text-base leading-relaxed">
            Attraction entry tickets represent the secondary major fixed expense category. While gorgeous local white-sand beaches, central tea plantation walks, and bustling Colombo markets carry zero entry fees, historic cultural UNESCO preserves require official international cards:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Sigiriya Lion Rock Fortress", cost: "USD $30 (Approx ₹2,500)", detail: "Absolutely essential climb. Best experienced at golden sunrise before crowds assemble." },
              { title: "Yala or Udawalawe Safari Jeep", cost: "₹7,500 - ₹12,000 total", detail: "Covers private custom 4x4 rugged safari jeep, expert wildlife spotter, and national park card entries." },
              { title: "Ella to Kandy Scenic Rail Ticket", cost: "₹650 - ₹1,800/seat", detail: "Breathtaking tea plantation ride. Reserved observation decks must be secured weeks in advance." },
              { title: "Polonnaruwa or Anuradhapura", cost: "USD $25 (Approx ₹2,080)", detail: "Sacred ruins walk. Includes historical museum entries and curated bike rentals." },
              { title: "Temple of the Sacred Tooth (Kandy)", cost: "LKR 2,000 (Approx ₹550)", detail: "High spiritual central sanctuary. Requires respectful clothing covering knees and shoulders." },
              { title: "Mirissa Blue Whale Cruise", cost: "₹5,000 - ₹7,500/passenger", detail: "Professional marine vessel cruise with conservationist breakfast board." }
            ].map((landmark, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-luxury-black/5 space-y-2 hover:border-luxury-gold/50 transition-colors">
                <p className="font-serif font-bold text-sm text-luxury-green">{landmark.title}</p>
                <p className="text-xs font-mono font-bold text-luxury-gold">{landmark.cost}</p>
                <p className="text-xs text-luxury-black/60 leading-relaxed italic">{landmark.detail}</p>
              </div>
            ))}
          </div>
        </article>

        {/* SPECIAL TOUR ARCHETYPES DETAILS: SOLO, COUPLE, FAMILY */}
        <article className="pt-20 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-green tracking-tight">
              Bespoke Cost Profiles: Solo Travelers, Couples, and Families
            </h2>
            <p className="text-luxury-black/70 font-light leading-relaxed">
              Every travel crew has specialized needs and budget constraints. Let's look at average real-world totals based on actual travelers, describing exactly where your money is allocated:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white p-6 rounded-3xl border border-luxury-black/5 space-y-4 hover:border-luxury-gold/30 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-luxury-green font-bold">
                  Solo Travelers & Backpackers
                </h3>
                <p className="font-mono text-xs text-luxury-gold font-bold">₹25,000 - ₹35,000 (5-7 Days)</p>
                <p className="text-xs text-luxury-black/60 leading-relaxed font-light font-sans">
                  Best for independent backpackers or budget creators who prioritize culture, heritage hostels, and self-guided tracks.
                </p>
                <ul className="text-[11px] space-y-1.5 text-luxury-black/70 list-disc pl-4 font-light font-sans">
                  <li><strong>Accommodation:</strong> Cozy hostel dorms or clean family homestays (₹1,500/night).</li>
                  <li><strong>Transport:</strong> Beautiful local public trains & seasonal tuktuks.</li>
                  <li><strong>Dining:</strong> Authentically local Sri Lankan rice & curry buffets.</li>
                </ul>
              </div>
              <p className="text-[10px] text-luxury-black/40 italic mt-4">*Excludes international flight ticketing</p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-luxury-gold/30 space-y-4 hover:border-luxury-gold transition-all relative flex flex-col justify-between">
              <span className="absolute -top-3 right-4 bg-luxury-gold text-luxury-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Most Selected</span>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-luxury-green font-bold">
                  Couples & Honeymooners
                </h3>
                <p className="font-mono text-xs text-luxury-gold font-bold">₹95,000 - ₹1,40,000 (7-8 Days)</p>
                <p className="text-xs text-luxury-black/60 leading-relaxed font-light font-sans">
                  Specifically tailored for high-contrast romance, stylish oceanview comfort, and secluded clifftop sunset decks.
                </p>
                <ul className="text-[11px] space-y-1.5 text-luxury-black/70 list-disc pl-4 font-light font-sans">
                  <li><strong>Accommodation:</strong> Premium boutique resorts & heritage garden villas (₹7,500/night).</li>
                  <li><strong>Transport:</strong> Private AC sedan with bilingual driver-guide.</li>
                  <li><strong>Dining:</strong> Daily gourmet breakfasts, beachfront seaside seafood dinners.</li>
                </ul>
              </div>
              <p className="text-[10px] text-luxury-black/40 italic mt-4">*Includes private airport pick-up services</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-luxury-black/5 space-y-4 hover:border-luxury-gold/30 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-luxury-green font-bold">
                  Families (2 Adults + 2 Kids)
                </h3>
                <p className="font-mono text-xs text-luxury-gold font-bold">₹1,80,000 - ₹2,50,000 (10 Days)</p>
                <p className="text-xs text-luxury-black/60 leading-relaxed font-light font-sans">
                  Perfect for multi-generational families prioritising kid-friendly menus, pool villas, and large private vehicles.
                </p>
                <ul className="text-[11px] space-y-1.5 text-luxury-black/70 list-disc pl-4 font-light font-sans">
                  <li><strong>Accommodation:</strong> Family-friendly multi-room boutique resorts (₹12,000/night).</li>
                  <li><strong>Transport:</strong> Dedicated spacious private van with certified guide.</li>
                  <li><strong>Dining:</strong> Customized, less-spicy local curries and continental meals.</li>
                </ul>
              </div>
              <p className="text-[10px] text-luxury-black/40 italic mt-4">*Includes high-comfort private highway transfers</p>
            </div>
          </div>
        </article>

        {/* SEASONAL COST BREAKDOWN */}
        <article className="pt-20 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-green tracking-tight">
              Understanding Seasonal Cost Differences
            </h2>
          </div>
          <p className="text-luxury-black/70 font-light text-base leading-relaxed">
            The monsoonal cycles of Sri Lanka split the country into alternate wet and dry zones. When planning, selecting the correct season saves you massive tourist markups or protects you from non-stop rain:
          </p>
          <div className="space-y-6 text-sm font-light text-luxury-black/70 leading-relaxed">
            <div className="border-l-4 border-luxury-gold pl-6 space-y-1.5">
              <h4 className="font-bold text-luxury-green font-serif text-base">1. Peak Season (December to March)</h4>
              <p>Ideal weather for exploring the southwest beaches (Hikkaduwa, Mirissa, Bentota) and the central hill countryside. Because skies are perfectly blue, hotel tariffs spike to their highest limits. Flights from major Indian hubs must be secured 60 days in advance of the year-end holidays to escape double-rate ticketing.</p>
            </div>
            <div className="border-l-4 border-luxury-gold pl-6 space-y-1.5">
              <h4 className="font-bold text-luxury-green font-serif text-base">2. Shoulder Season (April & October - November)</h4>
              <p>Outstanding transition windows. Skies remain lush, bright, and botanical with minor regional dusk showers. Premium boutique resorts drop their peak rates by 20-30%, making it the absolute finest timing for couples seeking high luxury without extreme costs.</p>
            </div>
            <div className="border-l-4 border-luxury-gold pl-6 space-y-1.5">
              <h4 className="font-bold text-luxury-green font-serif text-base">3. Off-Season (May to September)</h4>
              <p>The southwest monsoon brings high seas and frequent rain across the south coast. However, the east coast (Arugam Bay, Trincomalee) is completely dry, sunny, and beach-perfect. Best of all, luxury resorts and tea chalets in the cultural triangle offer discounts of up to 50% on bookings.</p>
            </div>
          </div>
        </article>

        {/* COMMON BUDGETING MISTAKES */}
        <article className="pt-20 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cherry-subtle bg-red-500/10 flex items-center justify-center text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-green tracking-tight">
              Common Budgeting Mistakes Made by Indian Travelers
            </h2>
          </div>
          <p className="text-luxury-black/70 font-light text-base leading-relaxed">
            Our Colombo and Delhi destination experts frequently correct minor planning blunders. Steering clear of these five central pitfalls will save you thousands of Rupees and prevent massive vacation delays:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 pt-4 text-xs md:text-sm text-luxury-black/80 font-light">
            <div className="bg-white p-6 rounded-3xl border border-luxury-black/5 space-y-2">
              <p className="font-serif font-bold text-sm text-red-600">1. Expecting Paper INR Cash Acceptance</p>
              <p className="leading-relaxed font-light">Paper Indian Rupees are legally not accepted directly by local markets or restaurants. Do not carry bulk paper INR expecting to pass them to tuktuks. Buy local Sri Lankan Rupees (LKR) at airport exchange booths, or withdraw cash from local ATMs using multi-currency corporate cards.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-luxury-black/5 space-y-2">
              <p className="font-serif font-bold text-sm text-red-600">2. Booking Fragmented Point-to-Point Transfers</p>
              <p className="leading-relaxed font-light">Booking different taxis on a daily basis is highly inefficient and expensive. It will cost you nearly double the tariff of booking a continuous, dedicated cruise-SUV chauffeur. A dedicated loop chauffeur operates with standardized regional mileage, eliminating stressful haggling.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-luxury-black/5 space-y-2">
              <p className="font-serif font-bold text-sm text-red-600">3. Setting Dates with active Coast Monsoons</p>
              <p className="leading-relaxed font-light">Visiting Bentota or Mirissa in June expecting pristine white beaches leads to monsoon disappointments. Due to central highlands weather dual monsoons, always match your coastal targets with active dry climates to get real value out of your beach villa tariffs.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-luxury-black/5 space-y-2">
              <p className="font-serif font-bold text-sm text-red-600">4. Underestimating Monument Ticket Outflows</p>
              <p className="leading-relaxed font-light">UNESCO cards (Sigiriya, Polonnaruwa, Temple of Tooth) are priced in US Dollars for international travelers, which can surprise you if you only budget for food/commute. Ensure you set aside approximately ₹6,000 per person specifically for major monument entrances.</p>
            </div>
          </div>
        </article>

        {/* 20 PRO MONEY SAVING TACTICS FOR TOURISTS */}
        <article className="pt-20 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-green tracking-tight">
              20 Pro Money-Saving Tactics For Indian Tourists
            </h2>
          </div>
          <p className="text-luxury-black/70 font-light">
            You don't need to cut corners to stay within a comfortable budget. Here are the twenty most effective insider vacation tips compiled by our local Colombo concierge desk:
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm text-luxury-black/80 font-light font-sans">
            <ul className="space-y-3.5">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Fly from Southern Hubs:</strong> Standard Chennai or Bangalore flights save ₹10,000+ per seat over Delhi direct flights.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Book Train Seats Early:</strong> Avoid tourist agency markup on scenic trains by reserving with local portals 30 days prior.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Enjoy Local Rice & Curry:</strong> Traditional coastal spots offer unlimited delicious buffet-style curries under ₹250.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Check Visa Fee Waivers:</strong> Keep up to date on Sri Lanka tourism campaigns—Indian visa ETA fees are frequently free.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Avoid International Cards for Retail:</strong> Exchange physical cash at Colombo airport or use zero-markup debit cards.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Travel During Shoulder Months:</strong> Late April, September, and early October offer dry coastal gaps with 30-40% villa markdowns.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Skip Private Guides Inside Temples:</strong> Hire local official guides only at Kandy gates after validating fixed price boards.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Buy a Local eSIM:</strong> Colombo airport Dialog or Mobitel eSIMs cost ₹700 with 50GB data, saving huge roaming costs.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Rent Scuba Gear Locally:</strong> Avoid premium booking hotel activity packages—secure boards directly at beaches.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Share Jeep Safaris:</strong> Assemble with other travelers at Yala park entrances to split standard jeep driver booking rates.</span>
              </li>
            </ul>

            <ul className="space-y-3.5">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Travel Counter-Clockwise:</strong> In high season, booking routes in reverse often unlocks cheaper resort vacancies.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Stay Outside Galle Fort:</strong> Choose cozy coastal villas in close proximity (Unawatuna) to save up to 50% on boutique rooms.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Use PickMe App:</strong> Book tuktuks and city cabs via local PickMe app in Colombo/Kandy to avoid tourist markup.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Fill Your Own Water:</strong> Ensure your premium boutique villas provide free filtered water carafes to reduce bottle count.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Carry Proper Cash Denominations:</strong> Drivers and tuktuk drivers often lack change, exchange notes at bank booths early.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Avoid Hotel Laundry:</strong> Local laundry kiosks adjacent to beach cafes charge by weight, saving on dynamic resort tariffs.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Opt for Double-Occupancy Rooms:</strong> For small groups, request supplementary bedding to save on booking dual rooms.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Book Long Tailor Trips:</strong> Request complete chauffeur services instead of day-to-day transfers to secure lower daily mileage fees.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Enjoy Free Landmark Trails:</strong> Hikes like Pidurangala Rock charge under ₹250 while offering gorgeous direct views of Sigiriya.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span><strong>Bargain Respectfully:</strong> Gentle smile-driven negotiations on beach shawls and souvenirs usually save 15-20%.</span>
              </li>
            </ul>
          </div>
        </article>

        {/* HIGH-CONVERTING TRANSITION CALLOUT TO INTERACTIVE PLANNER */}
        <article className="pt-20 pb-4">
          <div className="bg-gradient-to-br from-[#0c2f25] to-[#124235] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-luxury-gold/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.08),transparent_50%5)]" />
            
            <div className="relative z-10 space-y-6 text-center max-w-3xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">Need a Personalized Sri Lanka Travel Plan?</span>
              <h2 className="text-2xl md:text-4.5xl font-serif leading-tight">
                Your Style, Your Group Size, Your Perfect Budget Constraints.
              </h2>
              <p className="text-xs md:text-sm text-luxury-cream/80 leading-relaxed max-w-2xl mx-auto font-light">
                Actual travel costs shift dramatically based on your personal travel style, preferred hotel vibes, group sizes, and seasonal weather gaps. Standard package guides can only give you general guidelines. 
              </p>
              <p className="text-xs md:text-sm text-luxury-cream/80 leading-relaxed max-w-2xl mx-auto font-light">
                Use our localized smart route curator to custom-select climate-appropriate beaches, calculate realistic driving hours, allocate budgets on the fly, and download a custom day-by-day blueprint.
              </p>
              <div className="pt-4">
                <Link
                  to="/sri-lanka-trip-planner"
                  className="inline-flex px-8 py-4 bg-luxury-gold hover:bg-white text-luxury-black font-bold uppercase tracking-wider text-xs transition-all rounded-full items-center gap-2.5 shadow-xl hover:scale-105 cursor-pointer"
                >
                  Configure My Custom Route and Cost Estimate
                  <ArrowRight className="w-4 h-4 text-luxury-black" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* EEAT DESIGNER AUTHOR BOX */}
        <article className="pt-20">
          <div className="bg-[#FAF8F5] rounded-[32px] p-8 md:p-12 border border-luxury-black/5 flex flex-col sm:flex-row gap-8 items-start hover:border-luxury-gold/30 transition-all shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=clamp&w=300&h=300&q=80" 
              alt="Adithya Oshada - Plan Sri Lanka Concierge Planner" 
              className="w-20 h-20 rounded-full object-cover border-2 border-luxury-gold"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-luxury-gold uppercase tracking-widest text-[9px] font-bold block">Author & Chief Curator</span>
                <h4 className="font-serif text-xl text-luxury-green font-bold">Written by Adithya Oshada</h4>
                <p className="text-xs text-luxury-black/40 font-mono">Operations Director & Local Concierge, Plan Sri Lanka</p>
              </div>
              <p className="text-xs text-luxury-black/60 leading-relaxed font-sans font-light">
                Adithya has spent over 12 years coordinating luxury travel packages across Colombo, Galle, Nuwara Eliya, and Ella. Her field experience ensures that every calculated rate, toll road, private safari jeep, and luxury boutique villa mentioned is verified against actual local costs for peak authenticity.
              </p>
              <div className="flex gap-3">
                <span className="text-[10px] bg-luxury-green/10 text-luxury-green px-2.5 py-1 rounded-full font-bold">Verified Local Guide</span>
                <span className="text-[10px] bg-luxury-gold/10 text-luxury-gold px-2.5 py-1 rounded-full font-bold">750+ Custom Trips Planned</span>
              </div>
            </div>
          </div>
        </article>

        {/* FAQ ACCORDION HUB FOR HIGH-RANKINGS */}
        <article className="pt-20 space-y-8" id="faqs">
          <div className="space-y-2">
            <span className="text-luxury-gold font-serif italic text-sm uppercase tracking-wider block">Discerning Answers</span>
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-green">
              Sri Lanka Trip Cost From India FAQs
            </h2>
            <p className="text-xs text-luxury-black/40 uppercase tracking-widest">Answering trending travel budget queries</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-luxury-black/5 overflow-hidden transition-all duration-300"
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
                        <div className="px-6 pb-5 text-xs md:text-sm text-luxury-black/60 leading-relaxed font-sans italic border-t border-luxury-black/[0.03] pt-3 bg-luxury-cream/20">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </article>

        {/* VISUAL HTML SITEMAP & CEYLON TRAVEL HUB DIRECTORY */}
        <article className="pt-20 pb-10 space-y-10">
          <div className="space-y-3">
            <span className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold block">Indexable Site Directory</span>
            <h3 className="font-serif text-2xl md:text-3xl text-luxury-green font-bold">The Visual Ceylon Travel Directory & Sitemap</h3>
            <p className="text-xs sm:text-sm text-luxury-black/60 leading-relaxed font-light max-w-2xl">
              Track your exact path. Navigate our complete, officially registered system of 2026 digital blueprints, interactive estimators, and border entry clearance manuals:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Category A: Accredited multi-day loops */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-luxury-green bg-luxury-gold/15 px-3 py-1 rounded-full">
                1. Accredited Ceylon Itineraries
              </span>
              <div className="space-y-3">
                <Link 
                  to="/sri-lanka-7-day-itinerary"
                  className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                        7-Day Sri Lanka Classic Loop
                      </p>
                      <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                        Our flagship ready-to-use first trip roadmap. Connects Colombo, Sigiriya, Kandy, Nuwara Eliya, Ella, and coastal Mirissa.
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
                        12-Day Family Journey (Safety Certified)
                      </p>
                      <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                        Designed with kids and elders in mind. Solves vehicle fatigue, provides child-friendly beaches, and child safety checklists.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Category B: Interactive Planners */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-luxury-green bg-luxury-gold/15 px-3 py-1 rounded-full">
                2. Live Planning & Cost Tools
              </span>
              <div className="space-y-3">
                <Link 
                  to="/sri-lanka-trip-planner"
                  className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-[#d4af37] transition-colors">
                        Bespoke Interactive Route Planner
                      </p>
                      <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                        Select destination nodes, obtain real-time monsoonal safety indicators, and estimate driving durations between hotel stops dynamically.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                  </div>
                </Link>

                <div 
                  className="bg-white/45 p-4 rounded-2xl border border-luxury-gold/30 block relative overflow-hidden"
                >
                  <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-widest bg-luxury-green text-white px-2 py-0.5 rounded-full">
                    Active Page
                  </span>
                  <div className="space-y-1">
                    <p className="font-serif text-sm font-bold text-luxury-green">
                      Sri Lanka Trip Cost Calculator (From India)
                    </p>
                    <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                      Estimate flights, boutique accommodation tiers, private guided chauffeurs, dining budgets, and miscellaneous entry tickets in INR.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category C: Weather Advice */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-luxury-green bg-luxury-gold/15 px-3 py-1 rounded-full">
                3. Weather Advisories & Monsoon Safe Havens
              </span>
              <div className="space-y-3">
                <Link 
                  to="/best-time-to-visit-sri-lanka"
                  className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                        Best Time to Visit Sri Lanka Month-by-Month
                      </p>
                      <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                        Demystifying Ceylon's dual monsoon climate. Detailed coastal weather calendar to find matching sunny beach months.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                  </div>
                </Link>

                <Link 
                  to="/where-to-go-in-sri-lanka-in-june"
                  className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                        Where to Go in Sri Lanka in June
                      </p>
                      <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                        Avoid common traveler weather traps in June. Map sunny East Coast surf coordinates and avoid rain-heavy West Coast towns.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Category D: Border entry */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-luxury-green bg-luxury-gold/15 px-3 py-1 rounded-full">
                4. Border Entry & Tourist Visa ETA Manuals
              </span>
              <div className="space-y-3">
                <Link 
                  to="/sri-lanka-visa-for-indians"
                  className="bg-white p-4 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold hover:shadow-sm transition-all block group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="font-serif text-sm font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                        Sri Lanka ETA Visa For Indians Checklist
                      </p>
                      <p className="text-[11px] text-luxury-black/50 leading-relaxed font-light">
                        Official step-by-step Tourist ETA Electronic Travel Authorization guide. Learn requirements, check-in rules, and entry waivers.
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                  </div>
                </Link>

                <div 
                  className="p-5 bg-luxury-cream/40 rounded-2xl border border-luxury-black/5 text-center flex flex-col justify-center items-center"
                >
                  <p className="text-[10px] text-luxury-black/40 font-mono tracking-widest uppercase mb-1">Indexable Feed URL</p>
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold text-luxury-gold hover:text-luxury-green underline"
                  >
                    /sitemap.xml Raw Sitemap Feed
                  </a>
                </div>
              </div>
            </div>

          </div>
        </article>

      </section>

      {/* LEAD CAPTURE SECTION & CHATTER COMPONENT (SECTION 4 - CONVERSION OPTIMIZATION) */}
      <section className="bg-luxury-green text-white py-24 px-6 relative" id="capture-form">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Let's Co-create Your Getting Away</span>
            <h2 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-tighter">
              Get Your Free Personalized <br /> Sri Lanka Travel Plan
            </h2>
            <p className="text-white/60 font-sans font-light max-w-2xl mx-auto text-sm md:text-base">
              Zero obligation. Take 45 seconds to brief our accredited destination experts, and receive a curated cost proposal directly over WhatsApp matching your family’s style.
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
                        <PhoneCall className="w-3.5 h-3.5 text-luxury-gold" /> WhatsApp Mobile *
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
                    {/* Travel Dates */}
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

                    {/* Number of Travelers */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-luxury-black/40 font-bold block flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-luxury-gold" /> Total Travelers
                      </label>
                      <select 
                        value={leadForm.travelers}
                        onChange={(e) => setLeadForm({...leadForm, travelers: parseInt(e.target.value)})}
                        className="w-full px-5 py-4 rounded-xl bg-luxury-cream border border-luxury-black/10 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm font-sans"
                      >
                        <option value={1}>Solo Trip</option>
                        <option value={2}>Double occupancy / Couple</option>
                        <option value={3}>3 Adults / Family</option>
                        <option value={4}>4 Adults / Family</option>
                        <option value={6}>5 + Group Stay</option>
                      </select>
                    </div>

                    {/* Preferred Travel Style */}
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-luxury-black/40 font-bold block flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-luxury-gold" /> Vacation Budget Tier
                      </label>
                      <select 
                        value={leadForm.style}
                        onChange={(e) => setLeadForm({...leadForm, style: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-luxury-cream border border-luxury-black/10 focus:outline-none focus:ring-1 focus:ring-luxury-gold text-sm font-sans"
                      >
                        <option value="budget">Backpacker / Budget</option>
                        <option value="midrange">Premium Comfort (Recommended)</option>
                        <option value="luxury">Curated Elite Luxury</option>
                      </select>
                    </div>
                  </div>

                  {/* Agree Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox"
                      id="opt-in"
                      checked={leadForm.agreed}
                      onChange={(e) => setLeadForm({...leadForm, agreed: e.target.checked})}
                      className="w-4 h-4 rounded border-luxury-black/20 text-luxury-gold focus:ring-luxury-gold mt-0.5 accent-luxury-gold"
                    />
                    <label htmlFor="opt-in" className="text-xs text-luxury-black/50 leading-relaxed font-sans">
                      I agree to receive custom travel plans, personalized PDF quotation blueprints, and direct WhatsApp flight advice from the local Plan Sri Lanka concierge desk.
                    </label>
                  </div>

                  {/* Final Submit action button */}
                  {/* CTA #4: End of article CTA */}
                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 bg-luxury-green hover:bg-luxury-gold text-white rounded-2xl font-serif text-lg md:text-xl font-bold transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Drafting Your Custom Itinerary...</span>
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
                    <h3 className="font-serif text-3xl text-luxury-green">Calculations Dispatched!</h3>
                    <p className="text-sm text-luxury-black/60 max-w-lg mx-auto">
                      Thank you for trusting Plan Sri Lanka. Your direct WhatsApp conversation draft has opened! Please send the drafted message to our team to lock in your free custom package.
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
              <p className="font-serif text-white font-bold text-sm">Verified Operator</p>
              <p>Registered Sri Lanka Tourism SLTDA license holder.</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-white font-bold text-sm">Zero Upfront Cash</p>
              <p>Claim fully personalized 2026 planner maps for free.</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-white font-bold text-sm">Dedicated English SUV</p>
              <p>Clean modern fleets, priority accessibility support.</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-white font-bold text-sm">Direct London Support</p>
              <p>Complies with global premium tourist standards.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
