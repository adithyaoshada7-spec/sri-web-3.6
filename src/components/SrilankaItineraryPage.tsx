import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  MapPin, 
  Compass, 
  Clock, 
  Car, 
  Utensils, 
  Sparkles, 
  Calendar, 
  Info,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  AlertTriangle,
  Heart,
  Users,
  Backpack,
  Palmtree,
  Train,
  Check,
  AlertCircle,
  Printer,
  Download,
  Map,
  CloudRain,
  TrendingDown
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaItineraryPage() {
  usePageMetadata({
    title: "Sri Lanka 7-Day Itinerary (2026): Costs, Route & June Travel Guide",
    description: "The ultimate optimized 7-day Sri Lanka itinerary: Negombo, Sigiriya, Kandy, Ella train, Yala leopard safari, Galle Fort, and Colombo. Get daily cost guides, June monsoon updates, and free PDF.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-7-day-itinerary",
    ogUrl: "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
  });

  // State Management
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive Diagnostic State (Relevance)
  const [answers, setAnswers] = useState({
    firstTime: false,
    fromIndia: false,
    sevenDays: false,
    avoidFatigue: false
  });
  const allYes = answers.firstTime && answers.fromIndia && answers.sevenDays && answers.avoidFatigue;

  // Interactive SVG Map Active Day Selector (Confidence)
  const [activeMapDay, setActiveMapDay] = useState<number>(2); // Default Day 2 Sigiriya

  // Dynamic Budget Calculator (Confidence)
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedHotelClass, setSelectedHotelClass] = useState<"value" | "comfort" | "luxury">("comfort");

  // Dynamic Customizer Widget State (Personalization)
  const [customDays, setCustomDays] = useState<number>(7);
  const [customBudget, setCustomBudget] = useState<"value" | "comfort" | "luxury">("comfort");
  const [customMonth, setCustomMonth] = useState<string>("December");
  const [customProfile, setCustomProfile] = useState<"couple" | "family" | "friends" | "solo">("couple");

  // Lead Form State (Action)
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadDate, setLeadDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll to top and tracking
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Budget calculations
  const calculateEstimate = () => {
    // Standard transport flat cost
    const vehicleCost = guestCount <= 3 ? 24000 : 32000; // Whole week flat LKR/INR ratio
    
    // Stays flat rates (for 6 nights)
    const hotelRoomCount = Math.ceil(guestCount / 2);
    let ratePerNight = 8000; // comfort
    if (selectedHotelClass === "value") ratePerNight = 4000;
    if (selectedHotelClass === "luxury") ratePerNight = 25000;
    const totalStays = ratePerNight * 6 * hotelRoomCount;

    // Sightseeing per head
    let ticketCostPerHead = 12000; // Comfort (includes Sigiriya, tooth temple, safari, train)
    if (selectedHotelClass === "value") ticketCostPerHead = 7000;
    if (selectedHotelClass === "luxury") ticketCostPerHead = 24000; // VIP tours, fast tracks
    const totalTickets = ticketCostPerHead * guestCount;

    // Food & Dining per head
    let foodCostPerHead = 8000;
    if (selectedHotelClass === "value") foodCostPerHead = 4000;
    if (selectedHotelClass === "luxury") foodCostPerHead = 18000;
    const totalFood = foodCostPerHead * guestCount;

    const grandTotal = vehicleCost + totalStays + totalTickets + totalFood;
    const perPerson = Math.round(grandTotal / guestCount);

    return {
      vehicle: vehicleCost,
      stays: totalStays,
      tickets: totalTickets,
      food: totalFood,
      total: grandTotal,
      perPerson: perPerson
    };
  };

  const costResult = calculateEstimate();

  // Dynamic Customizer Output Generator
  const generateDynamicOutput = () => {
    const profileLabels = {
      couple: "Romantic Couple / Honeymooners",
      family: "Indian Family (with Kids & Seniors)",
      friends: "Energetic Friends Group",
      solo: "Independent Solo Explorer"
    };

    const budgetLabels = {
      value: "Cozy Value Standard",
      comfort: "Handpicked Premium Boutique",
      luxury: "Milestone Signature Elite Luxury"
    };

    const isRainyJuneInSouth = customMonth === "May" || customMonth === "June" || customMonth === "July" || customMonth === "August" || customMonth === "September";

    let paceAdvice = "";
    if (customProfile === "family") {
      paceAdvice = "Low-fatigue transfers, spacious multi-room villas with pools, kids' activity spots, and frequent comfort stops.";
    } else if (customProfile === "couple") {
      paceAdvice = "Scenic candlelit dinners, beautiful mist-facing boutique balconies, and relaxed private moments with zero checkout rushes.";
    } else {
      paceAdvice = "Active adventure peaks, evening cafe social hops, and rich safari safaris.";
    }

    let weatherNote = "";
    if (isRainyJuneInSouth) {
      weatherNote = `⚠️ Monsoon Alert for ${customMonth}: The Southwest beaches will experience scattered rain. Our planning engine shifts your itinerary towards the dry, sunny North-Central Ruins (Sigiriya & Dambulla) and East Coast beaches (Trincomalee) instead of heavy southern Mirissa surf.`;
    } else {
      weatherNote = `☀️ Perfect Climate Match: ${customMonth} is in the prime dry window. Clear sunny coastal drives in Galle and pristine mountain peak views in Ella are guaranteed!`;
    }

    let itineraryFlow = [];
    if (customDays === 5) {
      itineraryFlow = [
        { day: "Day 1", title: "Arrive Colombo / Negombo", desc: "Check in to beachside resort. Unwind from flight fatigue instantly.", drive: "20 mins" },
        { day: "Day 2", title: "Sigiriya Rock Citadel & Dambulla Caves", desc: "Scale the sky fortress and admire ancient cave art.", drive: "3.5 hrs" },
        { day: "Day 3", title: "Cultural Kandy & Tooth Relic Temple", desc: "Lakeside stroll and spiritual oil-lamp lighting ceremony.", drive: "2.5 hrs" },
        { day: "Day 4", title: "Misty Mountain Blue Train Ride to Ella", desc: "The legendary highland pine forest observation train ride.", drive: "3.0 hrs train" },
        { day: "Day 5", title: "Ella Ridge Hikes & Colombo Departures", desc: "Sunrise trek to Nine Arch Bridge, Expressway drive to airport.", drive: "4.5 hrs total" }
      ];
    } else if (customDays === 10) {
      itineraryFlow = [
        { day: "Day 1", title: "Arrive Negombo Lagoon", desc: "A relaxing welcome evening with coastal lagoon sunset catamaran tours.", drive: "20 mins" },
        { day: "Day 2", title: "Travel Inland to Sigiriya Ruins", desc: "Witness wild elephant herds gathering at Minneriya plains.", drive: "3.5 hrs" },
        { day: "Day 3", title: "Climb Sigiriya Fortress early", desc: "Explore 5th-century sky gardens and murals by cool morning air.", drive: "Local" },
        { day: "Day 4", title: "Polonnaruwa Medieval Kingdom", desc: "Bicycle rides around pristine lakeside royal palace structures.", drive: "1.0 hr" },
        { day: "Day 5", title: "Sacred Hill Capital Kandy", desc: "Explore botanical orchards and hear traditional drumming rituals.", drive: "2.5 hrs" },
        { day: "Day 6", title: "Misty Tea Estates Nuwara Eliya", desc: "Stay at colonial bungalow estates and sample fresh hand-picked tea.", drive: "2.0 hrs" },
        { day: "Day 7", title: "Legendary Ella Scenic Railway Ride", desc: "Witness Ravana ravine falls and active peaks.", drive: "2.0 hrs train" },
        { day: "Day 8", title: "Leopard Safari Plains of Yala", desc: "Private 4x4 evening safari tracking majestic wild big cats.", drive: "2.5 hrs" },
        { day: "Day 9", title: "Historic Dutch Galle Fort Heritage", desc: "Walk historical ramparts, boutique cafes, and sunset lighthouses.", drive: "2.5 hrs" },
        { day: "Day 10", title: "Colombo Seafood Feast & CMB Departures", desc: "Gourmet lunch at Ministry of Crab, final shopping, and transfer to airport.", drive: "2.0 hrs" }
      ];
    } else {
      itineraryFlow = [
        { day: "Day 1", title: "Arrive in Negombo (CMB Airport)", desc: "Avoid Colombo traffic. Stay by the beach, rest, and adapt immediately.", drive: "20 mins" },
        { day: "Day 2", title: "Dambulla Caves & Sigiriya base", desc: "Explore 150+ golden Buddha statues and hike Pidurangala for sunset.", drive: "3.5 hrs" },
        { day: "Day 3", title: "Sigiriya Citadel & Kandy", desc: "Climb Lion Rock by 7 AM. Travel to Kandy to visit Temple of the Tooth.", drive: "2.5 hrs" },
        { day: "Day 4", title: "Kandy to Ella Scenic Train Ride", desc: "World-famous tea estate train journey. Driver carries your heavy luggage.", drive: "Observation deck" },
        { day: "Day 5", title: "Ella Mountains & Yala Plains", desc: "Sunrise walk to Nine Arch Bridge, descend to wild leopard safaris.", drive: "2.0 hrs" },
        { day: "Day 6", title: "Galle Dutch Fort Heritage", desc: "Stilt fishermen photography, Weligama coastal walk, sunset Fort ramparts.", drive: "2.5 hrs" },
        { day: "Day 7", title: "Colombo Ministry of Crab & Departure", desc: "Expressway fast-track return. Crab feast and final souvenir curation.", drive: "2.0 hrs" }
      ];
    }

    return {
      title: `Customized ${customDays}-Day Sri Lanka Plan`,
      badge: `${profileLabels[customProfile]} • ${budgetLabels[customBudget]}`,
      pacing: paceAdvice,
      weather: weatherNote,
      route: itineraryFlow
    };
  };

  const customPlan = generateDynamicOutput();

  // Handle WhatsApp Link Redirection with prefilled state
  const handleWhatsAppRedirect = (source: string) => {
    trackEvent('whatsapp_click', 'conversion', `itinerary_page_${source}`);
    const msg = `Hi Plan Sri Lanka! I visited your 7-Day Itinerary page. 
    
My Selected Custom Profile:
- Duration: ${customDays} Days
- Travel Style: ${customProfile.toUpperCase()}
- Budget Tier: ${customBudget.toUpperCase()}
- Travel Month: ${customMonth}
- Passenger Count: ${guestCount} Guests

Please send me the optimized free PDF copy and a customized quote. Thank you!`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  // Lead submission simulation and WhatsApp forwarding
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert("Please fill in your Name and WhatsApp phone number to continue.");
      return;
    }
    setIsSubmitting(true);
    trackEvent('lead_submit', 'acquisition', 'itinerary_page_form_submit');

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);

      const msg = `Hi! I completed the Sri Lanka 7-Day Planner journey. Here are my details:
👤 Name: ${leadName}
📞 WhatsApp: ${leadPhone}
📅 Travel Month: ${leadDate || customMonth}
👥 Guests: ${guestCount} Passengers
🛠️ Choices: ${customDays} Days | ${customBudget.toUpperCase()} Class | ${customProfile.toUpperCase()} Flow

Please send my customized PDF itinerary and guide. Thank you!`;
      
      const waUrl = `https://wa.me/94722968210?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 1200);
  };

  // PDF Print Trigger
  const handlePrintPdf = () => {
    trackEvent('print_itinerary_pdf', 'engagement', 'print_pdf_trigger');
    window.print();
  };

  const faqs = [
    {
      q: "Is 7 days really enough to see Sri Lanka?",
      a: "Yes, 7 days is the absolute sweet spot for first-time visitors, provided you stick to a single, linear geographical corridor (like our Colombo-Sigiriya-Kandy-Ella-Galle loop). Trying to conquer the entire island forces you to spend 6+ hours in a vehicle daily. By utilizing expressway links and choosing strategic 2-night bases, you maximize active sightseeing and rest."
    },
    {
      q: "Why is a private driver recommended over self-driving?",
      a: "Self-driving in Sri Lanka is highly stressful due to narrow mountain roads, fast public buses, stray livestock, and complex local rules. Hiring an air-conditioned private vehicle with an experienced English-speaking chauffeur-guide is surprisingly affordable, covers fuel/tolls, protects you from motion sickness, and guarantees absolute safety and comfort."
    },
    {
      q: "How do I secure tickets for the famous Kandy-to-Ella blue train?",
      a: "Reserved observation cabins and 1st/2nd class seats sell out within minutes of release online (30 days prior). We handle this the millisecond the state reservation window opens, ensuring you enjoy the world's most beautiful rail route in comfort while your driver carries your heavy luggage by road."
    },
    {
      q: "Is June a safe month to travel to Sri Lanka?",
      a: "Yes! Sri Lanka has a dual monsoon system. While June brings light rain to south-western beaches like Galle and Mirissa, the cultural ruins of Sigiriya, Dambulla, and eastern beaches (Trincomalee) are gloriously dry, sunny, and hot. We adapt your daily route dynamically depending on your travel month to avoid weather disappointment."
    },
    {
      q: "Is Indian vegetarian food easily available across the route?",
      a: "Absolutely. Sri Lanka shares deep culinary ties with Southern India. Fresh lentils (dhal), coconut sambol, potato curries, crispy paper-thin dosas, idli, and vegetable hoppers are readily available everywhere, from local roadside cafes to 5-star colonial resorts."
    }
  ];

  const mapWaypoints = [
    { 
      day: 1, 
      city: "Negombo (CMB Airport)", 
      drive: "20 mins", 
      coord: { x: "28%", y: "60%" },
      highlight: "Beachside Sunset & Acclimatization",
      tip: "Stay next to the airport to avoid grueling Colombo city traffic on night 1.",
      food: "Fresh lagoon crab curry & tropical fruit nectars."
    },
    { 
      day: 2, 
      city: "Sigiriya Sky Citadel", 
      drive: "3.5 hrs", 
      coord: { x: "42%", y: "41%" },
      highlight: "UNESCO Ruins & Pidurangala Climb",
      tip: "Climb Pidurangala Rock at 4:30 PM for the most breathtaking view of Lion Rock.",
      food: "Rustic clay-pot rice buffet featuring 15+ local organic curries."
    },
    { 
      day: 3, 
      city: "Kandy (Hill Capital)", 
      drive: "2.5 hrs", 
      coord: { x: "44%", y: "55%" },
      highlight: "Sacred Tooth Relic & Royal Gardens",
      tip: "Wear humble light-colored clothes covering shoulders and knees to enter temples.",
      food: "Aromatic Ceylon tea infusions & warm honey ginger hoppers."
    },
    { 
      day: 4, 
      city: "Ella Mountain Valleys", 
      drive: "Scenic Blue Train", 
      coord: { x: "50%", y: "65%" },
      highlight: "Nine Arch Bridge & Tea Ridges",
      tip: "Keep a light backpack; your chauffeur carries heavy luggage directly by road.",
      food: "Local coconut roti & artisan stone-fired pizzas at Cafe Chill."
    },
    { 
      day: 5, 
      city: "Yala National Safaris", 
      drive: "2.0 hrs", 
      coord: { x: "60%", y: "75%" },
      highlight: "Tracking Wild Leopards",
      tip: "Yala Block 1 has the world's highest leopard density. Pre-book an afternoon 4x4 entry.",
      food: "Open-air lakeside barbecue skewers under clear starry skies."
    },
    { 
      day: 6, 
      city: "Historic Galle Fort", 
      drive: "2.5 hrs", 
      coord: { x: "36%", y: "82%" },
      highlight: "Dutch Architecture & Weligama Surf",
      tip: "Stroll Fort ramparts at 5:15 PM when temperature drops and locals fly kites.",
      food: "Gourmet coastal Mediterranean-Sri Lankan fusion dishes."
    },
    { 
      day: 7, 
      city: "Colombo Hub", 
      drive: "2.0 hrs", 
      coord: { x: "29%", y: "68%" },
      highlight: "Ministry of Crab & Departures",
      tip: "Leverage fast expressway lanes. Book Ministry of Crab tables 2 weeks early.",
      food: "World-famous giant pepper mud crab feast."
    }
  ];

  return (
    <div className="bg-[#fdfbf7] min-h-screen text-[#0F1412] font-sans leading-relaxed selection:bg-[#C5A059]/20 pt-24 md:pt-32">
      
      {/* =========================================================================
          SEO SCHEMAS & METADATA
          ========================================================================= */}
      <>
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka 7-Day Itinerary (2026): Costs, Route & June Travel Guide",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
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
            "datePublished": "2026-02-10T08:00:00Z",
            "dateModified": "2026-06-24T17:00:00Z",
            "description": "The ultimate optimized 7-day Sri Lanka itinerary: Negombo, Sigiriya, Kandy, Ella train, Yala leopard safari, Galle Fort, and Colombo. Get daily cost guides, June monsoon updates, and free PDF."
          })}
        </script>

        {/* Breadcrumb Schema */}
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
                "name": "7-Day Itinerary",
                "item": "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
              }
            ]
          })}
        </script>

        {/* HowTo Step Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "7-Day Sri Lanka Route Itinerary Strategy",
            "description": "The ultimate day-by-day travel guide and optimized loop to experience Sri Lanka in exactly 7 days.",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "totalTime": "P7D",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "INR",
              "value": "62000"
            },
            "step": mapWaypoints.map(wp => ({
              "@type": "HowToStep",
              "name": `Day ${wp.day}: ${wp.city}`,
              "text": wp.highlight,
              "url": `https://plan-srilanka.com/sri-lanka-7-day-itinerary#day-${wp.day}`
            }))
          })}
        </script>

        {/* FAQ Schema */}
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

      {/* =========================================================================
          1. ATTENTION (0-5 seconds)
          ========================================================================= */}
      <section className="relative px-6 pb-16 pt-6 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> 100% Optimized First-Time Visitor Corridor
          </div>
          
          <h1 className="text-4xl md:text-7xl font-serif text-[#1A2F23] tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Spend 7 Days in Sri Lanka <br />
            <span className="italic text-[#C5A059] font-normal">Without Wasting a Single Hour</span>
          </h1>
          
          <p className="text-base md:text-xl text-[#0F1412]/75 font-light max-w-2xl mx-auto leading-relaxed">
            Maps are deceptive. Narrow roads and slow traffic average 35 km/h. This optimized itinerary ensures first-time visitors see Sri Lanka&apos;s most magnificent peaks and heritage loops with the absolute least travel fatigue.
          </p>

          {/* INSTANT VALUE TABLE - Direct answer within 5 seconds */}
          <div className="bg-white rounded-3xl border border-[#0F1412]/5 shadow-xl p-4 md:p-6 max-w-3xl mx-auto overflow-hidden">
            <div className="text-left pb-3 mb-3 border-b border-[#0F1412]/5 flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F1412]/40 font-bold block">
                🏁 At-A-Glance Optimal Route Loop
              </span>
              <span className="text-xs bg-[#1A2F23] text-white px-3 py-1 rounded-full font-mono text-[10px] font-bold">
                8.5 Hours Driving Total
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5">
              {mapWaypoints.map((wp) => (
                <div 
                  key={wp.day} 
                  onClick={() => {
                    setActiveMapDay(wp.day);
                    document.getElementById('confidence-map-view')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer group ${
                    activeMapDay === wp.day 
                      ? "bg-[#1A2F23] text-white border-[#1A2F23] shadow-md scale-105" 
                      : "bg-[#FDFBF7]/50 text-[#0F1412] hover:bg-[#FDFBF7] border-[#0F1412]/5 hover:border-[#C5A059]/30"
                  }`}
                >
                  <p className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-1 ${
                    activeMapDay === wp.day ? "text-[#C5A059]" : "text-[#0F1412]/40"
                  }`}>
                    Day {wp.day}
                  </p>
                  <p className="font-serif text-sm font-bold truncate tracking-tight">{wp.city.split(" ")[0]}</p>
                  <span className={`text-[9px] block mt-1.5 font-light ${
                    activeMapDay === wp.day ? "text-white/70" : "text-[#0F1412]/50 group-hover:text-[#C5A059]"
                  }`}>
                    {wp.day === 4 ? "Scenic Train" : `🚗 ${wp.drive}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-2xl mx-auto">
            <button
              onClick={handlePrintPdf}
              className="w-full sm:w-auto px-8 py-4.5 bg-[#1A2F23] text-white hover:bg-[#C5A059] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <Printer className="w-4 h-4 text-white" /> Print / Save 7-Day PDF
            </button>
            <a 
              href="#personalized-planner"
              className="w-full sm:w-auto px-8 py-4.5 bg-[#C5A059] text-white hover:bg-[#1A2F23] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-2.5 shadow-xl"
            >
              Customize This Itinerary <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. RELEVANCE (Is this guide made for me?)
          ========================================================================= */}
      <section className="py-16 bg-[#1A2F23] text-white px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Diagnostic Alignment</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              Is This 7-Day Blueprint Written For You?
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Tap &quot;YES&quot; below to evaluate whether your trip goals align with this local route optimization formula.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "firstTime", title: "First-Time Visitor?", desc: "Want to witness the iconic must-visits without guessing." },
              { key: "fromIndia", title: "Flying From India?", desc: "Seeking flight alignment, South/North Indian food and e-Visas." },
              { key: "sevenDays", title: "Exactly 5-10 Days?", desc: "Have exactly a week to spend and can&apos;t waste daylight." },
              { key: "avoidFatigue", title: "Avoid Exhaustion?", desc: "Want to stay 2 nights per base and limit car sickness." }
            ].map((q) => {
              const checked = (answers as any)[q.key];
              return (
                <div 
                  key={q.key}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.key]: !checked }))}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-center select-none flex flex-col justify-between ${
                    checked 
                      ? "bg-[#C5A059] text-white border-[#C5A059] shadow-lg scale-[1.02]" 
                      : "bg-white/5 text-white/90 border-white/10 hover:border-white/25 hover:bg-white/10"
                  }`}
                >
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-base">{q.title}</h3>
                    <p className={`text-[11px] leading-normal font-light ${checked ? "text-white/95" : "text-white/60"}`}>
                      {q.desc}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase transition-all tracking-wider ${
                      checked ? "bg-white text-[#C5A059]" : "bg-white/10 text-white/70"
                    }`}>
                      {checked ? "✓ YES, THAT'S ME" : "TAP TO SAY YES"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Confirmation Message */}
          <AnimatePresence mode="wait">
            {allYes ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/5 border border-[#C5A059]/40 p-6 rounded-2xl text-center space-y-2.5 max-w-2xl mx-auto"
              >
                <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center font-bold text-lg mx-auto">🌟</div>
                <p className="font-serif font-bold text-lg text-[#C5A059]">Perfect Match Confirmed!</p>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  Because you are a first-timer flying from India with limited days and a desire to avoid vehicle fatigue, this guide was built specifically for you. It skips the deep, dusty bypass loops and ensures comfortable luxury transfers with trusted chauffeurs. Read on with confidence.
                </p>
              </motion.div>
            ) : (
              <p className="text-[11px] font-mono tracking-widest text-white/40 text-center uppercase">
                💡 Tip: Tap and select &quot;YES&quot; on all 4 questions to unlock your alignment confirmation.
              </p>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          3. TRUST (5-30 seconds - Why this isn't a random blog)
          ========================================================================= */}
      <section className="py-20 px-6 bg-white border-b border-[#0F1412]/10">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Scientific Craftsmanship</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Why This Route Works (No Guesswork)
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Most standard blog itineraries are written by copywriters who have never navigated a single Sri Lankan hair-pin turn. Here is how we engineered safety and direct comfort.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-[#fdfbf7] rounded-3xl border border-[#0F1412]/5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A2F23]">Real Transit Times</h3>
              <p className="text-xs text-[#0F1412]/70 leading-relaxed font-light">
                We don&apos;t fake travel timings. Every road duration is logged from active GPS drivers, taking winding roads and bus traffic into account. Average driving is kept under 2 hours/day.
              </p>
              <div className="text-[10px] text-[#C5A059] font-mono font-bold uppercase tracking-wider">
                ✓ Max Transit: 3.5 hrs (Expressway)
              </div>
            </div>

            <div className="p-6 bg-[#fdfbf7] rounded-3xl border border-[#0F1412]/5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A2F23]">Indian Passport Specialized</h3>
              <p className="text-xs text-[#0F1412]/70 leading-relaxed font-light">
                Aligned with short direct flights out of Chennai, Mumbai, Bangalore, and Delhi. Includes e-Visa/ETA registration rules and matches Indian culinary and vegetarian requirements easily.
              </p>
              <div className="text-[10px] text-[#C5A059] font-mono font-bold uppercase tracking-wider">
                ✓ Vegetarian Food Spotlights Included
              </div>
            </div>

            <div className="p-6 bg-[#fdfbf7] rounded-3xl border border-[#0F1412]/5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A2F23]">2-Night Bases</h3>
              <p className="text-xs text-[#0F1412]/70 leading-relaxed font-light">
                Packing and unpacking every single night wastes half your holiday time in checkout lanes. We use strategic 2-night bases in Sigiriya and Ella so you can relax by the pool.
              </p>
              <div className="text-[10px] text-[#C5A059] font-mono font-bold uppercase tracking-wider">
                ✓ Zero Daily Checkout Friction
              </div>
            </div>

          </div>

          {/* Social Proof Stats Banner */}
          <div className="bg-[#1A2F23] text-white rounded-[2rem] p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xl">
            <div className="space-y-1">
              <p className="text-2xl md:text-4xl font-serif text-[#C5A059] font-bold">2,500+</p>
              <p className="text-[9px] text-white/50 uppercase tracking-widest font-mono">Indian Families Assisted</p>
            </div>
            <div className="space-y-1 border-l border-white/15">
              <p className="text-2xl md:text-4xl font-serif text-[#C5A059] font-bold">4.9★</p>
              <p className="text-[9px] text-white/50 uppercase tracking-widest font-mono">Verified Travel Rating</p>
            </div>
            <div className="space-y-1 border-l border-white/15">
              <p className="text-2xl md:text-4xl font-serif text-[#C5A059] font-bold">8.5 Hrs</p>
              <p className="text-[9px] text-white/50 uppercase tracking-widest font-mono">Total Driving Hours</p>
            </div>
            <div className="space-y-1 border-l border-white/15">
              <p className="text-2xl md:text-4xl font-serif text-[#C5A059] font-bold">100%</p>
              <p className="text-[9px] text-white/50 uppercase tracking-widest font-mono">Train Tickets Guaranteed</p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. CONFIDENCE (Interactive Evidence Deck)
          ========================================================================= */}
      <section className="py-20 px-6 bg-[#fdfbf7]/50" id="confidence-map-view">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Interactive Map & Details</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight">
              Interactive Route Map & Evidence Deck
            </h2>
            <p className="text-[#0F1412]/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Hover or tap on any waypoint day below. Witness how the route bypasses extreme driving to deliver high-yield scenic sights.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: SVG MAP VISUALIZER (Interactive evidence) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#0F1412]/5 shadow-lg relative min-h-[460px] flex flex-col justify-between overflow-hidden">
              <div className="space-y-1.5 border-b border-[#0F1412]/5 pb-3 mb-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A059] font-bold block">Interactive Island Blueprint</span>
                <p className="text-xs text-[#0F1412]/60">Select a day waypoint to plot daily highlights.</p>
              </div>

              {/* Styled SVG Map of Sri Lanka */}
              <div className="relative w-full aspect-[4/5] max-w-[320px] mx-auto my-4 flex items-center justify-center bg-[#FAF8F5]/30 rounded-2xl">
                <svg viewBox="0 0 100 120" className="w-full h-full max-h-[380px]">
                  {/* Styled Teardrop Island Silhouette */}
                  <path 
                    d="M50 5 C62 10, 72 25, 75 45 C78 65, 75 85, 68 100 C62 112, 50 115, 38 110 C28 105, 25 85, 24 65 C23 45, 30 25, 38 15 C42 10, 46 5, 50 5 Z" 
                    fill="#1A2F23" 
                    fillOpacity="0.06" 
                    stroke="#1A2F23" 
                    strokeWidth="0.5"
                    strokeDasharray="1,1"
                  />
                  
                  {/* Dashed Route Path Connecting all hubs */}
                  <path 
                    d="M28 60 Q42 41, 42 41 T44 55 T50 65 T60 75 T36 82 T28 60" 
                    fill="none" 
                    stroke="#C5A059" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    strokeDasharray="3,3"
                    className="animate-[dash_15s_linear_infinite]"
                  />

                  {/* Dynamic glow overlay for active day */}
                  {mapWaypoints.map(wp => {
                    const isActive = activeMapDay === wp.day;
                    if (!isActive) return null;
                    return (
                      <circle 
                        key={`glow-${wp.day}`}
                        cx={wp.coord.x.replace("%","")} 
                        cy={wp.coord.y.replace("%","")} 
                        r="5" 
                        fill="#C5A059" 
                        fillOpacity="0.3" 
                        className="animate-ping"
                      />
                    );
                  })}

                  {/* Interactive Waypoint Pins */}
                  {mapWaypoints.map(wp => {
                    const isActive = activeMapDay === wp.day;
                    return (
                      <g 
                        key={wp.day} 
                        className="cursor-pointer group"
                        onClick={() => {
                          setActiveMapDay(wp.day);
                          trackEvent('map_waypoint_click', 'engagement', wp.city);
                        }}
                      >
                        <circle 
                          cx={wp.coord.x.replace("%","")} 
                          cy={wp.coord.y.replace("%","")} 
                          r={isActive ? "3.5" : "2"} 
                          fill={isActive ? "#C5A059" : "#1A2F23"} 
                          stroke="white" 
                          strokeWidth="0.8"
                          className="transition-all duration-300"
                        />
                        <text
                          x={parseInt(wp.coord.x.replace("%","")) + 4}
                          y={parseInt(wp.coord.y.replace("%","")) + 1}
                          fontSize="3.2"
                          fontFamily="serif"
                          fontWeight="bold"
                          fill={isActive ? "#C5A059" : "#0F1412"}
                          opacity={isActive ? 1 : 0.6}
                          className="transition-all duration-300 pointer-events-none"
                        >
                          D{wp.day}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Waypoint select drawer */}
              <div className="grid grid-cols-7 gap-1 bg-[#FAF8F5] p-1 rounded-xl">
                {mapWaypoints.map(wp => (
                  <button
                    key={wp.day}
                    onClick={() => setActiveMapDay(wp.day)}
                    className={`py-1.5 rounded-lg font-mono text-[10px] font-bold ${
                      activeMapDay === wp.day 
                        ? "bg-[#C5A059] text-white" 
                        : "text-[#0F1412]/60 hover:bg-[#0F1412]/5"
                    }`}
                  >
                    D{wp.day}
                  </button>
                ))}
              </div>
            </div>

            {/* COLUMN 2: SELECTED WAYPOINT DETAILS */}
            <div className="lg:col-span-7 space-y-6">
              
              <AnimatePresence mode="wait">
                {mapWaypoints.map(wp => {
                  if (activeMapDay !== wp.day) return null;
                  return (
                    <motion.div
                      key={wp.day}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white p-6 sm:p-8 rounded-3xl border border-[#0F1412]/5 shadow-lg space-y-5"
                    >
                      <div className="flex justify-between items-start border-b border-[#0F1412]/5 pb-4">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#C5A059] font-bold block uppercase">
                            DAILY BLUEPRINT SCHEDULE
                          </span>
                          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A2F23] font-bold mt-1">
                            Day {wp.day}: {wp.city}
                          </h3>
                        </div>
                        <div className="bg-[#1A2F23] text-white px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold tracking-tight text-center shrink-0">
                          {wp.day === 4 ? "Scenic Rail" : `🚗 Drive: ${wp.drive}`}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#0F1412]/40 block font-bold">
                            Primary Experience Highlight:
                          </span>
                          <p className="text-sm font-serif italic text-[#1A2F23] text-lg leading-relaxed font-bold">
                            &ldquo;{wp.highlight}&rdquo;
                          </p>
                        </div>

                        {/* Tip box */}
                        <div className="bg-[#FAF8F5] p-4 rounded-2xl border-l-4 border-[#C5A059] flex items-start gap-3">
                          <Info className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                          <div className="space-y-0.5">
                            <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#1A2F23]/60 block">Chauffeur Pro-Tip (Avoid Planning Mistakes):</span>
                            <p className="text-xs text-[#0F1412]/80 font-light leading-relaxed">
                              {wp.tip}
                            </p>
                          </div>
                        </div>

                        {/* Local Food Spotlight */}
                        <div className="bg-[#1A2F23]/5 p-4 rounded-2xl border border-[#1A2F23]/10 flex items-start gap-3">
                          <Utensils className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                          <div className="space-y-0.5">
                            <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#1A2F23]/80 block">Local Food Spotlight:</span>
                            <p className="text-xs text-[#0F1412]/80 font-light">
                              {wp.food}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#0F1412]/5 flex justify-between items-center text-xs">
                        <span className="text-[#0F1412]/50 font-mono">Select another waypoint to explore daily details.</span>
                        <button 
                          onClick={() => handleWhatsAppRedirect(`map_day_${wp.day}`)}
                          className="text-[#C5A059] hover:text-[#1A2F23] font-bold flex items-center gap-1 cursor-pointer transition-all"
                        >
                          Lock This Day ➔
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* ROUTE COMPARISON SLIDER */}
              <div className="bg-[#1A2F23]/5 rounded-3xl p-6 border border-[#1A2F23]/10 space-y-4">
                <h4 className="font-serif font-bold text-lg text-[#1A2F23] flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-[#C5A059]" /> Compare Driving Fatigue vs Alternative Routes
                </h4>
                
                <div className="space-y-3.5">
                  <div className="p-4 bg-white rounded-2xl border border-teal-600/20 relative">
                    <span className="absolute top-2.5 right-2.5 bg-teal-100 text-teal-800 text-[8px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full font-bold">
                      Our Recommended Corridor
                    </span>
                    <h5 className="font-bold text-sm text-[#1A2F23]">Route A: Classic Optimized Loop</h5>
                    <p className="text-xs text-[#0F1412]/75 font-light mt-1">Sigiriya → Kandy → Ella. Focuses on bases, bypasses southern extreme loops.</p>
                    <div className="flex gap-4 text-[10px] font-mono font-bold mt-2 pt-2 border-t border-[#0F1412]/5 text-[#1A2F23]/60">
                      <span>Total Commute: 8.5 Hrs</span>
                      <span className="text-teal-600">Friction Level: Low (Safe)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100 relative">
                    <span className="absolute top-2.5 right-2.5 bg-red-100 text-red-800 text-[8px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full font-bold">
                      The Checklist Trap
                    </span>
                    <h5 className="font-bold text-sm text-red-900">Route B: The Map Conquest Route</h5>
                    <p className="text-xs text-red-800/80 font-light mt-1">Forces Sigiriya, Kandy, Nuwara Eliya, Yala and Galle Fort in 7 days. Backtracking nightmare.</p>
                    <div className="flex gap-4 text-[10px] font-mono font-bold mt-2 pt-2 border-t border-red-100/50 text-red-700">
                      <span>Total Commute: 15.5+ Hrs</span>
                      <span className="text-red-600">Friction Level: Extreme Fatigue</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ==========================================
              DYNAMIC INR BUDGET CALCULATOR
              ========================================== */}
          <div className="bg-white rounded-[2.5rem] border border-[#0F1412]/5 shadow-2xl p-6 sm:p-10 space-y-8">
            <div className="border-b border-[#0F1412]/5 pb-6 text-center space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Cost Transparency</span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#1A2F23]">Dynamic Indian Rupee Cost Estimator</h3>
              <p className="text-xs sm:text-sm text-[#0F1412]/60"> factor in your passenger counts and accommodations. Instantly calculate standard local packages.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* SLIDERS ZONE */}
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-serif font-bold text-[#1A2F23]">Number of Passengers:</span>
                    <span className="font-mono font-bold text-[#C5A059] text-base bg-[#C5A059]/10 px-3 py-1 rounded-xl">
                      {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={guestCount} 
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full accent-[#C5A059] cursor-pointer h-1.5 bg-[#FAF8F5] rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-[#0F1412]/40 font-mono">
                    <span>1 Traveler</span>
                    <span>10 Travelers</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="font-serif font-bold text-sm text-[#1A2F23] block">Preferred Hotel Tier Class:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "value", title: "Standard Cozy", rate: "₹3.5k - ₹5k / night" },
                      { key: "comfort", title: "Comfort Boutique", rate: "₹8k - ₹12k / night" },
                      { key: "luxury", title: "Executive Luxury", rate: "₹22k - ₹40k / night" }
                    ].map(h => (
                      <button
                        key={h.key}
                        onClick={() => setSelectedHotelClass(h.key as any)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          selectedHotelClass === h.key 
                            ? "bg-[#1A2F23] text-white border-[#1A2F23] shadow" 
                            : "bg-[#FAF8F5] text-[#0F1412] border-[#0F1412]/5 hover:bg-[#FAF8F5]/80"
                        }`}
                      >
                        <p className="font-serif font-bold text-xs">{h.title}</p>
                        <p className={`text-[9px] mt-0.5 ${selectedHotelClass === h.key ? "text-[#C5A059]" : "text-[#0F1412]/50"}`}>
                          {h.rate}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#0F1412]/5 space-y-1.5">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#0F1412]/40">Included Core Allocations:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#0F1412]/70 font-light">
                    <div>✓ Private Chauffeur AC Car</div>
                    <div>✓ Chauffeur Lodge/Meals covered</div>
                    <div>✓ Fuel, Expressway Toll Fees</div>
                    <div>✓ Train Tickets pre-secured</div>
                    <div>✓ Sightseeing entries & guides</div>
                    <div>✓ Hot fresh daily breakfasts</div>
                  </div>
                </div>

              </div>

              {/* VALUE CALCULATOR OUTPUT */}
              <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-[2rem] border border-[#0F1412]/5 shadow-sm text-center space-y-5">
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#C5A059] font-bold block">
                  ESTIMATED LAND PACKAGE TOTALS
                </span>

                <div className="space-y-1">
                  <p className="text-4xl sm:text-5xl font-serif text-[#1A2F23] font-bold">
                    ₹{costResult.perPerson.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-[#0F1412]/55">
                    Estimated Cost Per Person (Excl. Flights)
                  </p>
                </div>

                <div className="border-t border-[#0F1412]/5 pt-4 space-y-2 text-xs text-left">
                  <div className="flex justify-between font-light">
                    <span>Private AC Chauffeur Sedan:</span>
                    <span className="font-mono font-bold">₹{costResult.vehicle.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-light">
                    <span>Accommodations (6 Nights):</span>
                    <span className="font-mono font-bold">₹{costResult.stays.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-light">
                    <span>Experience Tickets & Train:</span>
                    <span className="font-mono font-bold">₹{costResult.tickets.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-light">
                    <span>Gourmet & Dining Buffer:</span>
                    <span className="font-mono font-bold">₹{costResult.food.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-serif text-sm font-bold border-t border-[#0F1412]/10 pt-2.5 text-[#1A2F23]">
                    <span>Grand Total Land Budget:</span>
                    <span className="font-mono text-base">₹{costResult.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleWhatsAppRedirect("budget_calc")}
                  className="w-full py-4 bg-[#C5A059] text-white hover:bg-[#1A2F23] font-serif tracking-[0.12em] text-xs uppercase font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  Verify This Quote on WhatsApp ➔
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. PERSONALIZATION (Customize this Itinerary)
          ========================================================================= */}
      <section className="py-20 px-6 bg-[#1A2F23] text-white" id="personalized-planner">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Live Plan Customizer</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              Personalize Your Sri Lanka Experience
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base max-w-xl mx-auto">
              Change the length, budget tier, and travel style to see how your customized day-by-day itinerary maps out instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* WIDGET PARAMETERS */}
            <div className="lg:col-span-4 bg-white/5 border border-white/15 p-6 rounded-3xl space-y-5">
              
              {/* Parameter 1: Days */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest uppercase text-white/50 block font-bold">
                  1. Duration Selection:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 7, 10].map(d => (
                    <button
                      key={d}
                      onClick={() => setCustomDays(d)}
                      className={`py-2 rounded-xl border font-serif text-xs font-bold cursor-pointer transition-all ${
                        customDays === d 
                          ? "bg-[#C5A059] border-[#C5A059] text-white" 
                          : "bg-white/5 border-white/10 hover:border-white/30 text-white"
                      }`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 2: Budget */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest uppercase text-white/50 block font-bold">
                  2. Budget Tier Preferences:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["value", "comfort", "luxury"].map(b => (
                    <button
                      key={b}
                      onClick={() => setCustomBudget(b as any)}
                      className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded-xl border cursor-pointer transition-all ${
                        customBudget === b 
                          ? "bg-[#C5A059] border-[#C5A059] text-white" 
                          : "bg-white/5 border-white/10 hover:border-white/30 text-white"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 3: Traveler Profile */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest uppercase text-white/50 block font-bold">
                  3. Traveler Family Profile:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "couple", title: "Couple / Honeymoon" },
                    { key: "family", title: "Family with Kids" },
                    { key: "friends", title: "Friends Group" },
                    { key: "solo", title: "Solo Explorer" }
                  ].map(p => (
                    <button
                      key={p.key}
                      onClick={() => setCustomProfile(p.key as any)}
                      className={`p-2.5 text-left rounded-xl border cursor-pointer text-[11px] leading-tight transition-all font-bold ${
                        customProfile === p.key 
                          ? "bg-[#C5A059] border-[#C5A059] text-white" 
                          : "bg-white/5 border-white/10 hover:border-white/30 text-white"
                      }`}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 4: Month */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest uppercase text-white/50 block font-bold">
                  4. Expected Travel Month:
                </label>
                <select
                  value={customMonth}
                  onChange={(e) => setCustomMonth(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-[#C5A059] cursor-pointer"
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                    <option key={m} value={m} className="bg-[#1A2F23] text-white">{m}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 border-t border-white/10 text-xs text-white/60 space-y-1">
                <p>💡 Climate tip: Sri Lanka is perfect year-round if you pick the correct coast.</p>
              </div>

            </div>

            {/* LIVE DYNAMIC PLAN DISPLAY */}
            <div className="lg:col-span-8 bg-white text-[#0F1412] p-6 sm:p-10 rounded-[2rem] shadow-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0F1412]/5 pb-4">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A059] font-bold block">
                    {customPlan.badge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A2F23] mt-1">
                    {customPlan.title}
                  </h3>
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full text-center">
                  Live Custom Mock
                </div>
              </div>

              {/* Climate Warning integration */}
              <div className="text-xs p-4 rounded-xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-1.5 font-light">
                <p className="font-semibold text-[#1A2F23] flex items-center gap-1.5 font-sans">
                  ⛅ Climate & Route Mitigation Insight:
                </p>
                <p className="leading-relaxed text-[#0F1412]/85">{customPlan.weather}</p>
              </div>

              <div className="text-xs p-4 rounded-xl bg-[#1A2F23]/5 border border-[#1A2F23]/10 space-y-1 font-light">
                <p className="font-semibold text-[#1A2F23] flex items-center gap-1.5 font-sans">
                  👨‍👩‍👧 Pacing Adjustment for Travel Style:
                </p>
                <p className="leading-relaxed text-[#0F1412]/85">{customPlan.pacing}</p>
              </div>

              {/* Day-by-Day Agenda List */}
              <div className="space-y-3.5 pt-2">
                <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#0F1412]/40">Your Dynamic Schedule Blueprint:</p>
                
                <div className="space-y-2.5">
                  {customPlan.route.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start text-xs border-b border-[#0F1412]/5 pb-2.5 last:border-b-0 last:pb-0">
                      <span className="font-mono font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded-md text-[10px] shrink-0 mt-0.5">
                        {item.day}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-sm text-[#1A2F23]">{item.title}</h4>
                        <p className="text-[#0F1412]/70 font-light">{item.desc}</p>
                        <p className="text-[9px] text-[#0F1412]/40 font-mono">🚙 Est. commute: {item.drive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#0F1412]/5 text-center">
                <a 
                  href="#concierge-form-submit"
                  className="inline-flex px-8 py-4 bg-[#C5A059] hover:bg-[#1A2F23] text-white rounded-full font-serif font-bold text-xs uppercase tracking-wider items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  Send My Custom {customDays}-Day Plan to WhatsApp ➔
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. ACTION (Lead Captures / Conversions)
          ========================================================================= */}
      <section className="py-24 px-6 bg-white" id="concierge-form-submit">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-[#FAF8F5] rounded-[3rem] border border-[#0F1412]/5 shadow-2xl p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="w-[15%] h-full bg-[#006233]" />
              <div className="w-[15%] h-full bg-[#FFBE29]" />
              <div className="flex-grow h-full bg-[#8D153B]" />
            </div>

            <div className="max-w-2xl mx-auto space-y-8 text-center pt-4">
              
              <div className="space-y-2">
                <span className="text-[#C5A059] font-serif italic text-lg block">Micro-Commitment Planning Form</span>
                <h2 className="text-3xl sm:text-5xl font-serif text-[#1A2F23] tracking-tight leading-tight font-bold">
                  Get Your Personalized <br />
                  <span className="italic font-normal text-[#C5A059] font-serif">Sri Lanka Itinerary Details</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#0F1412]/70 font-light max-w-lg mx-auto">
                  Submit your estimated holiday window below. We will secure your e-Visa ETA registration guide, print-ready PDF, and launch direct WhatsApp concierge support.
                </p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-5 text-left max-w-md mx-auto">
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#0F1412]/50">Your Full Name:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Rajesh Kumar" 
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full p-4 bg-white border border-[#0F1412]/10 rounded-2xl focus:outline-none focus:border-[#C5A059] text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#0F1412]/50">WhatsApp Phone Number (for PDF delivery):</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g., +91 98765 43210" 
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full p-4 bg-white border border-[#0F1412]/10 rounded-2xl focus:outline-none focus:border-[#C5A059] text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#0F1412]/50">Expected Travel Window (Optional):</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Late December 2026" 
                      value={leadDate}
                      onChange={(e) => setLeadDate(e.target.value)}
                      className="w-full p-4 bg-white border border-[#0F1412]/10 rounded-2xl focus:outline-none focus:border-[#C5A059] text-xs"
                    />
                  </div>

                  <div className="text-[10px] text-[#0F1412]/40 text-center space-y-1 py-1">
                    <p>🔒 We value your privacy. No spam. Direct local coordinator support.</p>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 bg-[#1A2F23] hover:bg-[#C5A059] text-white rounded-full font-serif font-bold text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>Get My Personalized 7-Day Plan <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                </form>
              ) : (
                <div className="bg-[#1A2F23]/5 p-6 rounded-3xl border border-[#1A2F23]/10 max-w-md mx-auto space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xl mx-auto">✓</div>
                  <h4 className="font-serif font-bold text-xl text-[#1A2F23]">Itinerary Submitted Successfully!</h4>
                  <p className="text-xs text-[#0F1412]/75 leading-relaxed font-light">
                    Your details have been registered on-the-ground. If WhatsApp did not open automatically, click the button below to connect directly with your dedicated local concierge planner.
                  </p>
                  <button 
                    onClick={() => handleWhatsAppRedirect("form_success_bypass")}
                    className="w-full py-4 bg-[#C5A059] text-white hover:bg-[#1A2F23] font-serif tracking-widest text-xs uppercase font-bold rounded-full transition-all block text-center cursor-pointer shadow-md"
                  >
                    Start Chat on WhatsApp ➔
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SEO RICH CONTENT & FAQS
          ========================================================================= */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">Frequent Queries</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A2F23] font-bold">Frequently Asked Questions</h2>
            <p className="text-xs text-[#0F1412]/50 font-mono">Expert planning advice for 7-day travelers.</p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-[#0F1412]/5 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-serif font-bold text-[#1A2F23] text-sm sm:text-base flex justify-between items-center cursor-pointer hover:bg-[#FAF8F5]/40"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-[#0F1412]/5 overflow-hidden"
                    >
                      <p className="p-5 text-xs sm:text-sm text-[#0F1412]/75 font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Quick link hub footer */}
          <div className="pt-8 border-t border-[#0F1412]/10 text-center space-y-4">
            <p className="text-xs text-[#0F1412]/50 font-light">
              Explore other helpful planning resources:
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <Link to="/sri-lanka-trip-cost-from-india" className="text-[#C5A059] hover:underline font-bold">
                Trip Costs From India Guide
              </Link>
              <span className="text-[#0F1412]/20">•</span>
              <Link to="/best-time-to-visit-sri-lanka" className="text-[#C5A059] hover:underline font-bold">
                Best Time to Visit
              </Link>
              <span className="text-[#0F1412]/20">•</span>
              <Link to="/sri-lanka-visa-for-indians" className="text-[#C5A059] hover:underline font-bold">
                e-Visa ETA Walkthrough
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
