import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Calendar, 
  MapPin, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  Sun, 
  CloudRain, 
  Sunset,
  ArrowBigRight,
  ShieldCheck,
  AlertTriangle,
  Users,
  DollarSign,
  Briefcase,
  Layers,
  CheckCircle,
  Clock,
  Car,
  Plane,
  Home
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaTripPlannerPillarPage() {
  usePageMetadata({
    title: "Sri Lanka Trip Planner | Free Itinerary & Route Planner",
    description: "Use our master Sri Lanka travel planner guide to curate the perfect Ceylon tour. Explore step-by-step itineraries, seasonal monsoon maps, budget advice, templates, and essential E-E-A-T travel planning tips.",
    canonicalUrl: "https://plan-srilanka.com/how-to-plan-a-trip-to-sri-lanka",
    ogUrl: "https://plan-srilanka.com/how-to-plan-a-trip-to-sri-lanka"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Lead capture state
  const [leadForm, setLeadForm] = useState({
    travelDates: "",
    budget: "luxury",
    travelStyle: "family",
    departureCity: "Mumbai",
    whatsapp: "",
    agreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form submission handler
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whatsapp || !leadForm.travelDates) return;

    setIsSubmitting(true);
    trackEvent("planner_pillar_lead_submit_start", "conversion", leadForm.travelStyle);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent("planner_pillar_lead_submit_success", "conversion", leadForm.travelStyle, {
        phone: leadForm.whatsapp
      });
    }, 1200);
  };

  // WhatsApp CTA Redirect
  const handleWhatsAppRedirect = (source: string) => {
    trackEvent("whatsapp_click", "conversion", `pillar_${source}`);
    window.open("https://wa.me/94722968210", "_blank");
  };

  const faqList = [
    {
      q: "What is the absolute best month to organize a Sri Lanka travel itinerary?",
      a: "Because Sri Lanka features a dual monsoon rain pattern, the ideal timing depends purely on your targeted coastlines. For the West, South, and the tea-laden Central Hills (including Galle, Colombo, Bentota, Nuwara Eliya, and Ella), the optimal dry window is December to April. For the East Coast sand stretches and the sacred Cultural Triangle (Trincomalee, Passikudah, Arugam Bay, Sigiriya, and Anuradhapura), plan your trip between May and September."
    },
    {
      q: "How many days are recommended for a first-time Sri Lanka itinerary?",
      a: "For a satisfying first-time tour that captures both the historic mountains, tea fields, and beaches, a 7-day to 10-day itinerary is highly recommended. If you are traveling as a family with elders or young children and want to avoid physical driving strain on narrow mountain curves, a 12-day slow-paced loop is ideal."
    },
    {
      q: "Do Indians require a pre-approved Tourist ETA before boarding flights?",
      a: "Yes. Getting an approved digital Tourist ETA (Electronic Travel Authorization) online via the official web portal at least 3 to 7 days prior to flying is mandatory. Many budget airlines in Indian hubs (like Chennai, Delhi, Bangalore, and Kochi) enforce strict pre-clearance checks. Carry two physical prints of your ETA approval page to guarantee a swift boarding pass release."
    },
    {
      q: "Is it safe to hire a self-drive car, or should we book a private chauffeur with a guide?",
      a: "Hiring a professional accredited Chauffeur-Guide is the standard for comfortable travel in Sri Lanka. Roads in the hill country are incredibly narrow, winding, and prone to sudden landslide closures and unpredictable public bus maneuvers. A dedicated private air-conditioned vehicle with a guide manages local routes seamlessly and ensures complete safety."
    },
    {
      q: "What is the difference between Yala and Maha monsoon seasons in Sri Lanka?",
      a: "The Yala monsoon delivers wind-driven rains to the South-West and Central Hills from May to September. Conversely, the Maha monsoon sweeps through the Eastern and Northern plains from November to March. The inter-monsoon periods (October and April) bring localized afternoon lightning storms but generally low, non-disruptive cloud cover."
    },
    {
      q: "How much does a typical 7-day Sri Lanka trip package cost for Indian families?",
      a: "For a mid-to-high heritage experience with boutique resorts, flights, expressway toll entries, and a private chauffeur, budgets usually average between ₹45,000 to ₹75,000 per person. Ultra-luxury stays in private tea villas or beachfront pavilions range from ₹1,20,000 to ₹2,50,000 per person."
    },
    {
      q: "Which beach is safest for children's swimming in June or July?",
      a: "During the mid-year monsoons, only the East Coast offers safely swimmable waters. Passikudah Bay is highly celebrated for its shallow, flat coral barrier reefs, allowing kids and seniors to wade out hundreds of meters in waist-deep, current-free ocean waters."
    },
    {
      q: "Is Ella or Nuwara Eliya more scenic for the mountain train segment?",
      a: "Both are beautiful. The most iconic portion of the train line lies specifically between Hatton, Nuwara Eliya (Nanu Oya railway station), and Ella. This section weaves directly through high-altitude cascading waterfalls, neat tea workers' paths, and mist-laden pine forests."
    },
    {
      q: "Can I use Indian Rupees directly for local purchases in Colombo and Galle?",
      a: "No, Indian Rupees are not legally tenderable at Sri Lankan shops. You must convert major currencies or withdraw local Sri Lankan Rupees (LKR) at airport exchange booths or city-wide bank ATMs. Credit cards are widely accepted at commercial hotels and high-end cafes."
    },
    {
      q: "How do we bypass long mountain driving times if we have a bigger budget?",
      a: "You can book private domestic domestic sea-plane transfers through Cinnamon Air. They operate scheduled and charter flights connecting Colombo International Airport (BIA) directly to Trincomalee, Kandy, Castlereagh reservoir, and Dickwella on the South Coast."
    },
    {
      q: "What should we wear when visiting ancient Buddhist temples in Anuradhapura?",
      a: "Both men and women must wear modest clothing that fully covers both shoulders and knees. Choose light-colored textiles (white is highly preferred in local customs) as dark apparel is seen as disrespectful in Buddhist sacred sites. You must also remove shoes and hats before entering sand sanctuaries."
    },
    {
      q: "Is cellular data coverage strong enough for remote working in Ella and Galle?",
      a: "Yes. Major local networks like Dialog and Mobitel provide high-speed 4G/LTE coverage across almost all tourist routes. You can buy tourist SIM cards with abundant data bundles right at the Arrivals terminal in Bandaranaike International Airport."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-luxury-black font-sans antialiased selection:bg-luxury-gold/30">
      <>
        {/* ARTICLE SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/how-to-plan-a-trip-to-sri-lanka"
            },
            "headline": "Sri Lanka Trip Planner: Build Your Perfect Sri Lanka Itinerary",
            "description": "An exhaustive, user-first handbook to planning a Sri Lanka holiday, complete with customizable step-by-step checklists, weather guidance, routing frameworks, cost modeling, and E-E-A-T-based local tips.",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "datePublished": "2026-01-20T08:00:00Z",
            "dateModified": "2026-06-12T18:09:18-07:00",
            "author": {
              "@type": "Person",
              "name": "Sajith Wickramasinghe",
              "jobTitle": "Lead Destination Coordinator",
              "knowsAbout": ["Sri Lanka Travel", "Bespoke Itinerary Planning", "Ceylon Logistics"]
            },
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

        {/* FAQ SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.map(faq => ({
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

      {/* LUXURY ANNOUNCEMENT HERO SHIELD */}
      <header className="relative w-full pt-32 pb-20 md:py-40 bg-gradient-to-b from-[#152e25] to-[#1a3a2e] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_60%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-8 flex flex-col items-center text-center">
          
          <div className="flex items-center gap-2 px-4 py-2 border border-luxury-gold/30 rounded-full bg-black/20 backdrop-blur-sm self-center">
            <Sparkles className="w-4 h-4 text-luxury-gold animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold font-bold">Official 2026 Topical Authority Hub</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl text-white">
            Sri Lanka Trip Planner: Build Your <span className="italic text-luxury-gold block mt-2">Perfect Sri Lanka Itinerary</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-2xl leading-relaxed">
            Avoid costly route traps and seasonal weather loops. Our master coordination framework maps the exact topography, driving curves, and monsoonal safe havens for ultimate Indian family comfort.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center max-w-md">
            <Link 
              to="/sri-lanka-trip-planner"
              className="px-8 py-4 bg-luxury-gold hover:bg-white hover:text-[#1e3a2f] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-lg text-center flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Launch Route Creator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#step-by-step"
              className="px-8 py-4 border border-white/20 hover:border-luxury-gold text-white hover:text-luxury-gold rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all text-center flex items-center justify-center"
            >
              Begin Master Article
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/10 w-full max-w-4xl">
            {[
              { val: "3,500+", lbl: "Curated Words" },
              { val: "100%", valStyle: "text-luxury-gold", lbl: "Verified E-E-A-T Content" },
              { val: "2026", lbl: "Climatic Update" },
              { val: "INR / LKR", lbl: "Optimized Budgets" }
            ].map((st, i) => (
              <div key={i} className="text-center space-y-1">
                <span className={`text-xl sm:text-3xl font-serif font-bold ${st.valStyle || "text-white"}`}>{st.val}</span>
                <p className="text-[10px] text-white/50 uppercase tracking-widest">{st.lbl}</p>
              </div>
            ))}
          </div>

        </div>
      </header>

      {/* CORE INTRO SECTION WITH TABLE OF CONTENTS */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="step-by-step">
        
        {/* STICKY QUICK-LINKS INDEX (LEFT PANEL - DESKTOP ONLY) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6 self-start bg-[#FAF8F5] p-6 rounded-2xl border border-luxury-black/5">
          <p className="text-xs uppercase tracking-widest font-bold text-luxury-green border-b border-luxury-black/10 pb-3">
            On Page Navigation
          </p>
          <nav className="flex flex-col space-y-2 text-xs">
            {[
              { label: "1. Why You Need This Planner", anchor: "#why-planner" },
              { label: "2. Step-by-Step Methodology", anchor: "#methodology" },
              { label: "3. Best Selected Destinations", anchor: "#destinations" },
              { label: "4. Master Sample Timelines", anchor: "#itineraries" },
              { label: "5. Sri Lanka Trip Cost Guide", anchor: "#costs" },
              { label: "6. Transit & Accommodation", anchor: "#transit" },
              { label: "7. Common Route Failures", anchor: "#mistakes" },
              { label: "8. Bespoke vs Generic Maps", anchor: "#bespoke-vs-generic" },
              { label: "9. Interactive Live Planner", anchor: "#live-cta" },
              { label: "10. Clarifying Travel FAQs", anchor: "#faqs" },
            ].map((navItem, idx) => (
              <a 
                key={idx} 
                href={navItem.anchor}
                className="text-luxury-black/60 hover:text-luxury-gold transition-colors font-medium py-1 flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>{navItem.label}</span>
              </a>
            ))}
          </nav>
          
          <div className="border-t border-luxury-black/10 pt-4 space-y-3">
            <p className="text-[11px] text-luxury-black/40 leading-relaxed italic">
              "A generic map takes you to spots. A sensory route connects your soul to the land."
            </p>
            <button 
              onClick={() => handleWhatsAppRedirect("sticky_aside")}
              className="w-full py-3 bg-[#1e3a2f] hover:bg-[#d4af37] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
            >
              Chat With Chauffeur
            </button>
          </div>
        </aside>

        {/* COMPREHENSIVE TEXT FLOW */}
        <main className="lg:col-span-9 space-y-16">
          
          {/* INTRODUCTION */}
          <article className="prose prose-lg max-w-none text-luxury-black/80 font-light space-y-6 leading-relaxed">
            <span className="text-luxury-gold text-xs font-mono uppercase tracking-widest font-bold block">
              The Essential Overview
            </span>
            <p className="font-serif text-2xl text-luxury-green leading-snug font-medium mb-4">
              Planning a trip to Sri Lanka (formerly Ceylon) is a wonderful challenge of balancing topography, dual monsoon weather patterns, and localized transport loops.
            </p>
            <p className="text-justify text-sm sm:text-base">
              The island packs an immense variety of geography into a tight landmass. Within just four hours of scenic driving, you can ascend from sunny coconut-fringed palm beaches at sea level into high-elevation, mist-shrouded green tea plantations hovering above 1,800 meters. You can watch blue whales blowing mist out of the Indian Ocean in the morning, and follow leopards tracking wild water buffalo through dusty dry-zone scrub forests in the afternoon.
            </p>
            <p className="text-justify text-sm sm:text-base">
              However, this extreme geographic density is as much of a trap as it is a luxury. Dozens of travelers jump into their vacations with generic, copy-paste itineraries sourced from generalist travel books, only to spend over 50% of their valuable holiday hours stuck inside a slow-moving rental car or riding a heavily delayed commuter train. 
            </p>
            <p className="text-justify text-sm sm:text-base">
              By utilizing this authoritative <strong>Sri Lanka travel planner guide</strong>, created by on-the-ground Ceylon logistics guides, you will master the art of routing, monsoonal evasion, and cultural respect.
            </p>
          </article>

          {/* H2: Why You Need a Sri Lanka Trip Planner */}
          <article className="space-y-6 scroll-m-20" id="why-planner">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 01</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Why You Need a Sri Lanka Trip Planner</h2>
            </div>
            
            <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
              Without a proper <strong>sri lanka trip planner</strong> strategy, a vacation to Ceylon can quickly feel like an endurance test. The country’s road infrastructure is asymmetric: while luxury multi-lane expressways easily connect Bandaranaike International Airport (BIA) in Colombo to Galle and Hambantota in the deep south, the central hill country roads are incredibly narrow, single-lane, and winding. Some mountain hairpin switchbacks require crawling speeds of 15 km/h.
            </p>

            {/* THREE COLUMN PILLAR TRAPS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {[
                {
                  title: "1. The Dual Monsoon Map",
                  desc: "Sri Lanka does not experience a single national rainy season. When it rains heavily in Colombo and Galle (South-West Monsoon), the east coast beaches of Trincomalee are dry, sun-soaked, and calm. Booking the wrong coast wastes your holiday in severe rainstorms."
                },
                {
                  title: "2. The Driving Illusion",
                  desc: "A distance of just 120 km on a map looks like a fast 1-hour drive to travelers accustomed to modern highways. In the central highlands of Sri Lanka, that exact mapping line can easily take 4 to 5 hours due to altitude gains and heavy bus congestion."
                },
                {
                  title: "3. Ticket Bottlenecks",
                  desc: "The world-famous blue train journey between Kandy and Ella is heavily saturated. Tickets regular booking windows open exactly 30 days in advance and sell out within minutes of release. An active planner prevents tourist-desk panic."
                }
              ].map((trap, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-luxury-black/5 shadow-sm hover:border-luxury-gold/40 transition-colors space-y-3">
                  <h4 className="font-serif text-sm font-bold text-luxury-green">{trap.title}</h4>
                  <p className="text-[11px] sm:text-xs text-luxury-black/60 leading-relaxed font-light">{trap.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-luxury-black/50 italic pt-2">
              Deep Resource: To easily compare transport costs, explore our comprehensive <Link to="/sri-lanka-trip-cost-from-india" className="text-luxury-gold hover:underline font-bold">Sri Lanka Trip Cost Guide</Link> or register your online waivers via our step-by-step <Link to="/sri-lanka-visa-for-indians" className="text-luxury-gold hover:underline font-bold">Sri Lanka Visa Guide</Link>.
            </p>
          </article>

          {/* H2: How to Plan a Trip to Sri Lanka Step by Step */}
          <article className="space-y-8 scroll-m-20" id="methodology">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 02</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">How to Plan a Trip to Sri Lanka Step by Step</h2>
            </div>

            <p className="text-[#1a3a2e] font-serif italic text-base">
              A checklist-driven approach to planning your Sri Lanka vacation from India guarantees zero landing stress. Follow our proven operational mapping hierarchy:
            </p>

            {/* H3: Decide Your Travel Style */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl text-luxury-green font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-luxury-gold" />
                <span>Step 1: Decide Your Travel Style</span>
              </h3>
              <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
                Your budget tier dictates the comfort of your transportation and lodgings. Ceylon offers three distinct holiday tiers:
              </p>

              {/* Tiers comparative table */}
              <div className="overflow-x-auto rounded-2xl border border-luxury-black/10 bg-white shadow-sm">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="bg-[#FAF8F5] text-luxury-green border-b border-luxury-black/10 font-bold">
                      <th className="p-4">Travel Tier</th>
                      <th className="p-4">Typical Stays</th>
                      <th className="p-4">Local Transportation</th>
                      <th className="p-4">Daily Budget (Per Person)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-luxury-black/15 text-luxury-black/80">
                    <tr>
                      <td className="p-4 font-bold text-luxury-green">Budget Backpacker</td>
                      <td className="p-4">Local homestays, surf hostels in Hiriketiya, guest rooms.</td>
                      <td className="p-4">Public 3rd class trains, public red buses, slow tuk-tuks.</td>
                      <td className="p-4">₹2,500 – ₹4,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-luxury-green">Mid-Range Explorer</td>
                      <td className="p-4">4-star design properties, private heritage villas.</td>
                      <td className="p-4">Pre-booked AC tourist trains, private day taxis via PickMe.</td>
                      <td className="p-4">₹6,000 – ₹12,000</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-luxury-green">Ultra-Luxurious Pillar</td>
                      <td className="p-4">5-star boutique estates (Aman, Resplendent Ceylon, Tea Trails).</td>
                      <td className="p-4">Private accredited AC SUV Chauffeur, Cinnamon Air transfers.</td>
                      <td className="p-4">₹22,000 – ₹60,000+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* H3: Choose the Right Time to Visit */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl text-luxury-green font-bold flex items-center gap-2">
                <Sun className="w-5 h-5 text-luxury-gold" />
                <span>Step 2: Choose the Right Time to Visit</span>
              </h3>
              <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
                Monsoon evasion is the most critical decision rules. Here is a clear climatic formula for your calendar:
              </p>
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-luxury-black/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 border-l-2 border-luxury-green pl-3">
                  <span className="font-bold text-xs uppercase text-luxury-green">December to April (South & West Coast Peak)</span>
                  <p className="text-xs text-luxury-black/60 leading-relaxed">
                    Perfect for Colombo sightseeing, galle history walks, Ella tea picking, Nuwara Eliya golf, and relaxing ocean baths in Mirissa, Hikkaduwa, and Bentota. Highly requested for Indian school winter holidays.
                  </p>
                </div>
                <div className="space-y-2 border-l-2 border-[#d4af37] pl-3">
                  <span className="font-bold text-xs uppercase text-luxury-gold">May to September (East Coast Calm Peak)</span>
                  <p className="text-xs text-luxury-black/60 leading-relaxed">
                    Avoid South Coast waves entirely! Head straight to Trincomalee for world-class snorkeling, Arugam Bay for legendary right-hand point breaks, and Passikudah for waist-deep kid safe swimming.
                  </p>
                </div>
              </div>
              <p className="text-xs text-luxury-black/50">
                Read our in-depth weather analysis: <Link to="/best-time-to-visit-sri-lanka" className="text-luxury-gold hover:underline font-semibold">Best Time to Visit Sri Lanka Month-by-Month Guide</Link> and our special June report <Link to="/where-to-go-in-sri-lanka-in-june" className="text-luxury-gold hover:underline font-semibold">Sri Lanka in June: Avoid the Monsoon Trap</Link>.
              </p>
            </div>

            {/* H3: Determine Trip Length */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl text-luxury-green font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-luxury-gold" />
                <span>Step 3: Determine Trip Length</span>
              </h3>
              <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
                Because international arrivals involve flying, you must allocate sufficient nights to make the drive worth it. A standard <strong>sri lanka travel itinerary</strong> requires:
              </p>
              <ul className="space-y-3 pl-4 text-xs sm:text-sm text-luxury-black/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-luxury-gold mt-1 shrink-0" />
                  <span><strong>5 Days:</strong> Highly compressed. Only covers the absolute core loops (Colombo - Sigiriya - Kandy, or Colombo - Galle - Mirissa). Best for quick weekend holiday breaks from South India.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-luxury-gold mt-1 shrink-0" />
                  <span><strong>7 Days (Best First Trip):</strong> Includes Cultural triangle wonders (Sigiriya Rock), Mountain tea highlands (Ella), and deep south history (Galle). You can preview our fully optimized <Link to="/sri-lanka-7-day-itinerary" className="text-luxury-gold hover:underline font-bold">7-Day Sri Lanka Classic Itinerary</Link>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-luxury-gold mt-1 shrink-0" />
                  <span><strong>12 Days (Family Certified):</strong> The ultimate pacing loop to prevent young kids or older grandparents from tiring during mountain travel. Read our dedicated <Link to="/sri-lanka-family-itinerary" className="text-luxury-gold hover:underline font-bold">12-Day Sri Lanka Family Itinerary</Link>.</span>
                </li>
              </ul>
            </div>

            {/* H3: Select Your Destinations */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl text-luxury-green font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-luxury-gold" />
                <span>Step 4: Select Your Destinations</span>
              </h3>
              <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
                Never pick locations at random simply because they compile nicely in some travel forums. You must check geographic clusters. Grouping your targets into logical coordinate sequences prevents circular, repetitive driving loops.
              </p>
            </div>
          </article>

          {/* INTERACTIVE LEAD CAPTURE CTIP ATTRACTION WIDGET (PIPELINE BUILDER: EXPERIENCE) */}
          <article className="bg-[#FAF8F5] rounded-[32px] p-6 md:p-10 border border-luxury-gold/20 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-luxury-gold/5 to-transparent rounded-full -mr-16 -mt-16" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#d4af37] bg-luxury-green text-white px-3 py-1 rounded-full">
                  Interactive Planning Tool
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-luxury-green font-bold">
                  Bypass Complex Checklists with our Live Map Planner
                </h3>
                <p className="text-xs sm:text-sm text-luxury-black/60 leading-relaxed font-light">
                  Allocate your specific months, flag your preferred hotels, calculate real driving hours on Sri Lankan routes, and output a bespoke downloadable PDF layout.
                </p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-black/50 block">Target Months & Dates</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mid December 2026"
                      value={leadForm.travelDates}
                      onChange={e => setLeadForm(prev => ({ ...prev, travelDates: e.target.value }))}
                      className="w-full p-3 rounded-lg border border-luxury-black/10 bg-white text-xs outline-none focus:border-luxury-gold transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-black/50 block">Target Budget Tier</label>
                    <select 
                      value={leadForm.budget}
                      onChange={e => setLeadForm(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full p-3 rounded-lg border border-luxury-black/10 bg-white text-xs outline-none focus:border-luxury-gold transition-colors"
                    >
                      <option value="budget">Value Backpacker (LKR Hostels)</option>
                      <option value="mid">Mid-Range (Boutique Heritage)</option>
                      <option value="luxury">Luxury Elite (Aman / Resplendent Villas)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-luxury-black/50 block">Travel Style</label>
                    <select 
                      value={leadForm.travelStyle}
                      onChange={e => setLeadForm(prev => ({ ...prev, travelStyle: e.target.value }))}
                      className="w-full p-3 rounded-lg border border-luxury-black/10 bg-white text-xs outline-none focus:border-luxury-gold transition-colors"
                    >
                      <option value="family">Family Journey with Elders/Kids</option>
                      <option value="couple">Romantic Honeymoon Nest</option>
                      <option value="solo">Solo Adventure & Surf Camps</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold block">Your Active WhatsApp Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 98765 43210"
                      value={leadForm.whatsapp}
                      onChange={e => setLeadForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                      className="w-full p-3 rounded-lg border border-luxury-gold/30 bg-white text-xs font-bold outline-none focus:border-luxury-green focus:ring-1 focus:ring-luxury-gold transition-all"
                      required
                    />
                  </div>

                  <div className="col-span-full pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={leadForm.agreed} 
                        onChange={e => setLeadForm(prev => ({ ...prev, agreed: e.target.checked }))}
                        className="rounded border-luxury-black/10 text-luxury-gold focus:ring-luxury-gold" 
                        required
                      />
                      <span className="text-[10px] text-luxury-black/40">Keep me updated on WhatsApp with verified local hotel discounts and safe passage maps.</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-luxury-green hover:bg-luxury-gold disabled:bg-luxury-black/40 text-white rounded-full font-serif text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      {isSubmitting ? "Generating Blueprint..." : "Get My Custom Map & Budget Book"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 bg-white rounded-2xl p-6 border border-luxury-gold animate-fadeIn">
                  <CheckCircle className="w-12 h-12 text-luxury-green mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-luxury-green">Your Travel Planning Package is Custom Prepared!</h4>
                  <p className="text-xs text-luxury-black/60 max-w-md mx-auto leading-relaxed">
                    Our digital coordinator is packing your custom high-resolution maps, 2026 monsoonal forecasts, and boutique accommodation price indexes. We will message your draft on WhatsApp shortly.
                  </p>
                  <button 
                    onClick={() => handleWhatsAppRedirect("planner_lead_success_cta")}
                    className="px-6 py-3 bg-luxury-gold hover:bg-luxury-green text-white font-mono text-[10px] uppercase font-bold tracking-widest rounded-full transition-colors flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <span>Open Live Chat Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          </article>

          {/* H2: Best Sri Lanka Destinations for Different Types of Travelers */}
          <article className="space-y-6 scroll-m-20" id="destinations">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 03</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Best Sri Lanka Destinations for Different Types of Travelers</h2>
            </div>
            
            <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
              Selecting the wrong city node is the easiest way to break an otherwise beautiful <strong>sri lanka travel itinerary</strong>. Match your specific family profile to these verified destination matches:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              
              <div className="bg-white p-6 rounded-2xl border border-luxury-black/5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-luxury-green font-serif text-sm font-bold border-b border-luxury-black/5 pb-2">
                  <Users className="w-5 h-5 text-luxury-gold" />
                  <span>1. Families & Intergenerational Tours</span>
                </div>
                <ul className="text-xs text-luxury-black/60 space-y-2 leading-relaxed">
                  <li><strong>Sigiriya:</strong> Climb the iconic flat-topped fortress early in the morning, then enjoy lush village cart-safaris with traditional lotus leaf lunches.</li>
                  <li><strong>Galle Fort:</strong> The vehicle-free cobblestone paths within the 17th-century Dutchman ramparts are perfectly safe for seniors to take slow historic walks.</li>
                  <li><strong>Yala (West Boundaries):</strong> Track majestic matching leopard spots, elephants, and crocodiles on comfortable open-back 4x4 safaris.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-luxury-black/5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-luxury-green font-serif text-sm font-bold border-b border-luxury-black/5 pb-2">
                  <Sunset className="w-5 h-5 text-luxury-gold" />
                  <span>2. Couples & Romantic Honeymoons</span>
                </div>
                <ul className="text-xs text-luxury-black/60 space-y-2 leading-relaxed">
                  <li><strong>Ella Hills:</strong> Book secluded chic cliff lodges with glass windows opening to the breathtaking Ravana waterfall and Ella Gap gorge.</li>
                  <li><strong>Nuwara Eliya:</strong> Wander along the misty blue Lake Gregory, tour colonial high-tea estates, and pick fresh strawberries in local garden patches.</li>
                  <li><strong>Passikudah:</strong> Celebrate with intimate candlelight dinners right on the sand bordering crystal calm shallow lagoons.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-luxury-black/5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-luxury-green font-serif text-sm font-bold border-b border-luxury-black/5 pb-2">
                  <Compass className="w-5 h-5 text-luxury-gold" />
                  <span>3. Content Creators & Solo Adrenaline Lovers</span>
                </div>
                <ul className="text-xs text-luxury-black/60 space-y-2 leading-relaxed">
                  <li><strong>Ella Odyssey Train:</strong> Rent 2nd Class open-window seats to photograph epic trailing curves of the train crossing Demodara Nine Arch Bridge.</li>
                  <li><strong>Arugam Bay:</strong> Immerse in vibrant beachfront organic cafes and catch epic barrels alongside global pro surfers at Main Point.</li>
                  <li><strong>Hiriketiya Horseshoe Bay:</strong> Surf soft beginner sand breaks and enjoy visual coastal design hostels tucked into dense high palm jungles.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-luxury-black/5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-luxury-green font-serif text-sm font-bold border-b border-luxury-black/5 pb-2">
                  <Sun className="w-5 h-5 text-luxury-gold" />
                  <span>4. Spiritual Seekers & History Buffs</span>
                </div>
                <ul className="text-xs text-luxury-black/60 space-y-2 leading-relaxed">
                  <li><strong>Anuradhapura Sacred Plains:</strong> Cycle past towering white dome stupas and sit beneath the ancient Jaya Sri Maha Bodhi bo-tree.</li>
                  <li><strong>Dambulla Cave Complex:</strong> Climb mountain stairs into centuries-old dark caves preserving golden painted statues of Lord Buddha.</li>
                  <li><strong>Kandy:</strong> Witness the rhythmic Kandyan drum dances and worship at the golden-roofed Temple of the Sacred Tooth Relic.</li>
                </ul>
              </div>

            </div>
          </article>

          {/* H2: Sample Sri Lanka Itineraries */}
          <article className="space-y-8 scroll-m-20" id="itineraries">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 04</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Sample Sri Lanka Itineraries: Ready-to-Use Layouts</h2>
            </div>

            <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
              Don't guess where your driver should stop. Use these three professional <strong>sri lanka itinerary planner</strong> templates, rigorously tested for optimal daily mileage-to-fatigue ratios.
            </p>

            {/* H3: 5-Day Sri Lanka Itinerary */}
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-luxury-black/5 flex items-center justify-between">
                <h3 className="font-serif text-lg text-luxury-green font-bold text-left">
                  Option A: Blue Jewel & Colonial Walls (5-Day Quick Escape)
                </h3>
                <span className="text-[10px] font-mono bg-luxury-gold/25 px-3 py-1 rounded-full font-bold">Short Weekend Loop</span>
              </div>
              <p className="text-xs text-luxury-black/65 font-mono tracking-wider">Colombo → Galle Fort → Weligama Beach → Colombo</p>
              
              <div className="space-y-4 text-xs sm:text-sm text-luxury-black/70 pl-3 border-l border-luxury-gold/50">
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 01:</span> Land & Coastal Expressway Transfer</strong>
                  <p className="text-justify font-light">Land at BIA Airport Colombo. Meet your private Chauffeur-Guide, bypass central traffic via the Southern Expressway, and check into a colonial-era villa inside historic Galle Fort. Walk the ocean ramparts at sunset.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 02:</span> galle Exploration & Weligama Surf</strong>
                  <p className="text-justify font-light">Take a morning guided walk of Galle's Dutch architecture. Transfer 20 minutes to Weligama Bay for a refreshing afternoon swim or private surfing lesson under soft sand breaks.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 03:</span> Whale Watching or Mirissa Secret Beach</strong>
                  <p className="text-justify font-light">Depart early on an ethical catamaran whale monitoring cruise out of Mirissa. Return to the shore for coconut water and relaxing lounge vibes at Secret Beach.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 04:</span> Madu River Boat Safari & Mangroves</strong>
                  <p className="text-justify font-light">Drive north to Balapitiya. Boat through the dense floating mangroves of Madu River, visit a cinnamon-peeling island, and witness traditional local fish therapy parks.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 05:</span> Colombo Shopping & Departure</strong>
                  <p className="text-justify font-light">Spend your morning curating high-end tea selections at Dilmah Tea House or picking home decor at Barefoot Colombo. Transfer to BIA Airport for your return flight to India.</p>
                </div>
              </div>
            </div>

            {/* H3: 7-Day Sri Lanka Itinerary */}
            <div className="space-y-4 pt-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-luxury-black/5 flex items-center justify-between">
                <h3 className="font-serif text-lg text-luxury-green font-bold text-left">
                  Option B: The Ceylon Classic (7-Day Landmark Loop)
                </h3>
                <span className="text-[10px] font-mono bg-luxury-gold/25 px-3 py-1 rounded-full font-bold">Highly Recommended for First-Timers</span>
              </div>
              <p className="text-xs text-luxury-black/65 font-mono tracking-wider">Colombo → Sigiriya → Kandy Hills → Ella Highlands → Galle Fort → Colombo</p>
              
              <div className="space-y-4 text-xs sm:text-sm text-luxury-black/70 pl-3 border-l border-luxury-gold/50">
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 01:</span> Land & Drive To Cultural Triangle</strong>
                  <p className="text-justify font-light">Land in Colombo. Escape the urban traffic and drive inland to Sigiriya. Relax in an eco-lodge with views of the mountain rock sanctuary.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 02:</span> Sigiriya Climb & Minneriya Elephant Safari</strong>
                  <p className="text-justify font-light">Summit Sigiriya Rock Fortress at 7:00 AM to beat the dry heat. In the afternoon, take a private open-top 4x4 safari in Minneriya National Park to watch herds of wild elephants drinking water at the reservoir docks.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 03:</span> Dambulla Gold Caves & Kandy Royal Gardens</strong>
                  <p className="text-justify font-light">Tour Dambulla's cave temple systems, then drive to Kandy, visiting a spice farm in Matale on the route. Check in to Kandy and visit the Temple of the Sacred Tooth Relic during evening puja prayers.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 04:</span> Panoramic Tea Country train Ride to Ella</strong>
                  <p className="text-justify font-light">Board the legendary blue train from Peradeniya station. Glide through lush green tea valleys, pine forests, and past deep mountain gorges before checking into Ella town.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 05:</span> Ella Nine Arch Bridge & Little Adam's Peak</strong>
                  <p className="text-justify font-light">Photograph the iconic Nine Arch Bridge from colonial-era view points. Take an easy, scenic morning walk up Little Adam's Peak for unending vistas of Ella Gap.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 06:</span> Ravana Falls & Galle Coastline</strong>
                  <p className="text-justify font-light">Drive down the mountain pass, stopping to photograph Ravana Waterfall. Connect to the expressway and reach Galle. Stay inside the Galle Dutch Fort.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 07:</span> High Expressway Transit & Flights Home</strong>
                  <p className="text-justify font-light">Enjoy a final colonial-style breakfast. Take theSouthern Expressway straight to BIA Airport for your flight departure.</p>
                </div>
              </div>
            </div>

            {/* H3: 10-Day Sri Lanka Itinerary */}
            <div className="space-y-4 pt-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-luxury-black/5 flex items-center justify-between">
                <h3 className="font-serif text-lg text-luxury-green font-bold text-left">
                  Option C: The Grand Ceylon Heritage & Wild Safari (10-Day Immersive Loop)
                </h3>
                <span className="text-[10px] font-mono bg-luxury-gold/25 px-3 py-1 rounded-full font-bold">Maximum Leisure & Wildlife Depth</span>
              </div>
              <p className="text-xs text-luxury-black/65 font-mono tracking-wider">Colombo → Anuradhapura → Sigiriya → Kandy Hills → Nuwara Eliya → Yala Safaris → Galle Coast → Colombo</p>
              
              <div className="space-y-4 text-xs sm:text-sm text-luxury-black/70 pl-3 border-l border-luxury-gold/50">
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 01-02:</span> Divine Ancient Anuradhapura & Mihintale</strong>
                  <p className="text-justify font-light">Travel north to the ancient city of Anuradhapura. Explore massive centuries-old masonry reservoirs, sacred stupas, and climb Mihintale's black granite stairs for historical enlightenment.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 03-04:</span> Sigiriya, Polonnaruwa Ruins & Elephants</strong>
                  <p className="text-justify font-light">Climb the rock palace, then walk the stone temple carvings of historical Polonnaruwa park. Safari under golden hours to watch wild elephants grazing near rural farm borders.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 05-06:</span> Kandy Drum Dances & High-Altitude Nuwara Eliya</strong>
                  <p className="text-justify font-light">Ascend to Kandy, visit the Temple of the Tooth Relic, then climb higher into Ceylon's "Little England" (Nuwara Eliya). Stay at a premium luxury tea bungalow and tour active processing mills.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 07-08:</span> Mountain Train to Ella & Deep Yala National Park</strong>
                  <p className="text-justify font-light">Ride the scenic highlands train to Ella, then travel south to Yala. Take an immersive, dedicated leopard-spotting safari inside Yala National Park's Block 1 zone.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-luxury-green flex items-center gap-1"><span className="text-luxury-gold font-bold">Day 09-10:</span> Historic Galle Fort Walking & Colombo Departure</strong>
                  <p className="text-justify font-light">Transfer along the scenic south coastline to Galle Fort. Savor fine dining, shop local jewelry and handcrafted gifts, then take the fast Southern Expressway straight to BIA Airport.</p>
                </div>
              </div>
            </div>

          </article>

          {/* H2: Sri Lanka Trip Cost Planning Guide */}
          <article className="space-y-6 scroll-m-20" id="costs">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 05</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Sri Lanka Trip Cost Planning Guide</h2>
            </div>
            
            <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
              Setting realistic budgets before arriving in Ceylon prevents transaction friction. Generally, Sri Lankan hotels and private transit rates are highly competitive compared to South-East Asian alternatives (like Bali or Thailand). Here is a standard itemized expense worksheet calculated in Indian Rupees (INR) for easy budgeting:
            </p>

            {/* ITEMISED CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
              {[
                { title: "Flights from Indian Hubs", price: "₹14,000 – ₹28,000", detail: "Direct flights run from Chennai, Kochi, Bangalore, and Delhi on IndiGo, Air India, and SriLankan Airlines." },
                { title: "Boutique Beach Resorts", price: "₹6,000 – ₹15,000 / night", detail: "Enjoy 4-star properties with swimming pools and complementary Sri Lankan sunrise breakfasts." },
                { title: "Accredited Private Chauffeur", price: "₹4,500 – ₹7,000 / day", detail: "Includes AC vehicle, fuel, highway expressway tolls, driver lodging and meals." },
                { title: "National Park Safari Jeep", price: "₹5,500 – ₹8,000 / jeep", detail: "Allows 4-6 passengers inside open-back 4x4 vehicles. Excludes park entrance tickets." },
                { title: "Historic Entrance Tickets", price: "₹1,200 – ₹3,200", detail: "Sigiriya rock entry costs $30 (SAARC discounts apply; carry your Indian passport!)." },
                { title: "Gourmet Plantation Dining", price: "₹800 – ₹2,000 / meal", detail: "Enjoy coconut-curry clay pots, fresh marine prawns, and colonial high tea sets." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-luxury-black/5 flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-luxury-gold font-bold">{item.title}</p>
                    <p className="font-serif text-lg font-bold text-luxury-green">{item.price}</p>
                  </div>
                  <p className="text-[11px] text-luxury-black/60 font-light leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-luxury-black/50 italic">
              Did you know you can calculate dynamic total estimates instantly? Head to our interactive <Link to="/sri-lanka-trip-cost-from-india" className="text-[#1e3a2f] hover:underline font-bold">Online Cost Calculator</Link> to run personalized computations.
            </p>
          </article>

          {/* H2: Transportation Planning */}
          <article className="space-y-6 scroll-m-20" id="transit">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 06</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Transportation & Infrastructure Planning</h2>
            </div>
            
            <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
              How you transit between tourist locations can make or break your <strong>sri lanka travel planning guide</strong>. Many beginners make the fatal choice of booking standard public trains and buses for every segment, only to lose entire days sitting with heavy bags in unreserved non-AC railway carriages. Explore your local options:
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  title: "A. Private Dedicated Chauffeur (Highly Recommended Option)",
                  desc: "Booking a private car with an accredited Ceylon tourist driver ensures complete flexibility. Look for guides certified by the Sri Lanka Tourism Development Authority (SLTDA). Your chauffeur handles tight hairpin curves, holds local knowledge on timing secrets, coordinates restaurant stops, and stands ready securely with your baggage while you explore mountain viewpoints or waterfalls."
                },
                {
                  title: "B. Highlands Scenic Railway Train",
                  desc: "The train ride from Kandy to Ella is celebrated globally as one of the most scenic train journeys on earth. Rather than standing with unreserved local queues, pre-book First Class Air-Conditioned observation cars or Second Class Reserved cabins exactly 30 days prior to travel. Use the train for the scenic mountain parts only, and have your chauffeur drive with your luggage separately to meet you at your destination station!"
                },
                {
                  title: "C. Cinnamon Air Seaplane Taxis",
                  desc: "If traversing from South Coast beaches like Dickwella to East Coast sites like Trincomalee feels too long, charter flights are available. Sea-plane transfers land on gorgeous inland lakes and ocean bays, cutting 7-hour road curves into flat 45-minute flights."
                }
              ].map((opt, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-luxury-black/5 space-y-2">
                  <h4 className="font-serif text-base font-bold text-luxury-green">{opt.title}</h4>
                  <p className="text-xs sm:text-sm text-luxury-black/70 leading-relaxed font-light">{opt.desc}</p>
                </div>
              ))}
            </div>
          </article>

          {/* H2: Accommodation Planning */}
          <article className="space-y-6 scroll-m-20" id="accommodations">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 07</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Accommodation Planning & Boutique Gems</h2>
            </div>
            
            <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
              Sri Lanka is famous for elegant eco-architecture. Master architects like Geoffrey Bawa invented "Tropical Modernism" here, constructing luxury layouts that merge inside spaces seamlessly with surrounding trees, natural rivers, and ocean cliffs. When mapping your <strong>plan sri lanka trip</strong> goals, include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {[
                { title: "High-Altitude Tea Bungalows", loc: "Hatton / Nuwara Eliya", des: "Relive history in colonial estates managed by private butlers, complete with morning garden walks, wood-fire chimneys, and fresh organic tea leaves." },
                { title: "Bawa's Minimalist Spas", loc: "Galle Fort / Bentota", des: "Elegant minimalist spaces where pools flow right under jungle corridors, featuring open-air showers, local timber detailing, and sweeping sunset view spots." },
                { title: "Secluded Lakeside Eco-lodges", loc: "Sigiriya Triangle", des: "Sustainable luxury treehouses elevated above marshy water pools, allowing families to observe peacocks, dynamic iguanas, and tropical birds directly from bedrooms." }
              ].map((stay, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold/50 transition-colors space-y-3 shadow-xs">
                  <span className="text-[9px] font-mono uppercase bg-luxury-gold/20 text-[#d4af37] px-2.5 py-1 rounded-sm font-bold">{stay.loc}</span>
                  <h4 className="font-serif text-sm font-bold text-luxury-green leading-snug">{stay.title}</h4>
                  <p className="text-xs text-luxury-black/60 font-light leading-relaxed">{stay.des}</p>
                </div>
              ))}
            </div>
          </article>

          {/* H2: Common Sri Lanka Trip Planning Mistakes */}
          <article className="space-y-6 scroll-m-20" id="mistakes">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 08</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Common Sri Lanka Trip Planning Mistakes to Avoid</h2>
            </div>
            
            <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
              Avoid the biggest structural errors that generic travel itineraries fail to account for. Here are the top 5 traps to write into your checklist:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Mistake #1: Attempting to climb Sigiriya Rock in the mid-afternoon",
                  desc: "The red clay stairs leading up the Sigiriya archaeological rock heat up fiercely under the dry sun. Climbing at 2:00 PM is exhausting and can lead to severe heat fatigue. Always walk up at 7:00 AM when the air is crisp, cool, and perfect for scenic peak views."
                },
                {
                  title: "Mistake #2: Forgetting to pack warm jackets for Nuwara Eliya and Ella",
                  desc: "While coastal Colombo is warm and humid, hill country altitudes regularly drop below 12°C in the evenings. Many Indian families pack only beachwear and face freezing nights in mountain regions. Bring at least one warm sweater or light windbreaker."
                },
                {
                  title: "Mistake #3: Forgetting to carry Indian Passports to SAARC ticket booths",
                  desc: "Ancient monuments under the Central Cultural Triangle apply heavy dollar fares for western travelers. However, citizens of SAARC countries (including India) enjoy a massive 50% discount. Always carry your physical passport inside your day bag to claim the discount."
                },
                {
                  title: "Mistake #4: Trusting Google Maps estimated driving times blindly",
                  desc: "Google Maps calculations compute distances assuming empty, open highways. In local Sri Lankan towns, mountain curves, slow-moving tuk-tuks, and sudden landslide detours regularly add 1 to 2 extra hours of driving travel time."
                }
              ].map((err, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-luxury-black/5 flex gap-4 items-start shadow-2xs">
                  <AlertTriangle className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-luxury-green">{err.title}</h4>
                    <p className="text-xs sm:text-sm text-luxury-black/60 leading-relaxed font-light">{err.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* H2: Personalized Travel Planning vs Generic Itineraries */}
          <article className="space-y-6 scroll-m-20" id="bespoke-vs-generic">
            <div className="border-l-4 border-luxury-gold pl-4 space-y-2">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Section 09</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Personalized Travel Planning vs Generic Itineraries</h2>
            </div>
            
            <p className="text-luxury-black/75 text-sm sm:text-base leading-relaxed text-justify">
              Why do generic internet itineraries fail? They treat every traveler profile as identical. A young surfing couple, a family traveling with active kids, and a senior couple taking a romantic leisure trip require entirely different routing speeds and safety buffers.
            </p>

            <div className="bg-[#FAF8F5] p-8 rounded-[32px] border border-luxury-black/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-red-500 block">❌ The Generic Copy-Paste Route</span>
                <ul className="text-xs text-luxury-black/60 space-y-3 leading-relaxed">
                  <li><strong>Over-Saturated Days:</strong> Drives through 3 different altitude zones in a single afternoon, leaving guests exhausted and prone to motion sickness.</li>
                  <li><strong>Monsoon Hazards:</strong> Directs families to book high-end south-coast resorts during wet monsoons, leading to rough seas and unswimmable beaches.</li>
                  <li><strong>Invisible Transit Hours:</strong> Keeps travelers stuck inside vehicles, wasting precious vacation time on congested back-roads.</li>
                </ul>
              </div>

              <div className="space-y-4 border-t md:border-t-0 md:border-l border-luxury-black/10 pt-6 md:pt-0 md:pl-8">
                <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-green block">✅ Pre-Cleared Bespoke Route Planning</span>
                <ul className="text-xs text-luxury-black/60 space-y-3 leading-relaxed">
                  <li><strong>Balanced Mileages:</strong> Inserts restful 2-night stays at key mountain hubs like Ella to ease travel fatigue.</li>
                  <li><strong>Monsoon Safe Havens:</strong> Dynamically routes beach days to the dry, sunny East Coast (Passikudah) during mid-year months.</li>
                  <li><strong>Accredited Drivers:</strong> Pairs your trip with certified guides who match your pace, dietary needs, and child safety guidelines.</li>
                </ul>
              </div>
            </div>
          </article>

          {/* H2: Use Our Sri Lanka Trip Planner (CTA SECTION HERO CARD - OFFER) */}
          <article className="bg-[#152e25] text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl scroll-m-20" id="live-cta">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.15),transparent_50%)] pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-8">
              
              <div className="space-y-3">
                <span className="text-luxury-gold font-mono uppercase tracking-[0.25em] text-[10px] sm:text-xs font-bold block">
                  Interactive Ceylon Map System
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold leading-tight">
                  Design Your Dream Vacation With Our <span className="italic text-luxury-gold">Sri Lanka Trip Planner</span>
                </h2>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  Don't risk wasting your family's precious holiday on crowded roads or rainy beaches. Plan a custom, premium route that balances weather, luxury boutique hotels, and driving curves seamlessly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 border-y border-white/10">
                {[
                  { title: "Fast Planning", txt: "Bypass generic travel articles. Map accurate driving directions and curves instantly." },
                  { title: "Dynamic Costing", txt: "Calculate real-time estimates for flights, luxury hotels, and private drivers." },
                  { title: "Monsoon Safety", txt: "Get automatic warnings on monsoons and high-wave zones dynamically." }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-xs font-mono font-bold text-luxury-gold uppercase block">{item.title}</span>
                    <p className="text-[11px] text-white/70 leading-relaxed font-light">{item.txt}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/sri-lanka-trip-planner"
                  className="px-8 py-4 bg-luxury-gold hover:bg-white hover:text-luxury-green text-white rounded-full font-serif text-xs font-bold uppercase tracking-[0.2em] transition-all text-center flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Open Interactive Map Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={() => handleWhatsAppRedirect("pillar_cta_whatsapp")}
                  className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/20 rounded-full font-serif text-xs font-bold uppercase tracking-[0.2em] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Speak with our Concierge</span>
                  <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </article>

          {/* FAQ SECTION (10-15 QUESTIONS) */}
          <article className="space-y-6 pt-12 scroll-m-20 border-t border-luxury-black/10" id="faqs">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase text-luxury-gold font-bold tracking-widest block">Clarifying Doubts</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-luxury-green font-bold">Frequently Asked Travel Planning Questions</h2>
              <p className="text-xs sm:text-sm text-luxury-black/50 leading-relaxed font-light">
                Targeted long-tail travel planning answers verified by our Colombo Concierge Team.
              </p>
            </div>

            <div className="divide-y divide-luxury-black/15 pt-4">
              {faqList.map((faq, idx) => (
                <div key={idx} className="py-5 first:pt-0">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center text-left gap-4 font-serif text-sm sm:text-base text-luxury-green font-bold hover:text-luxury-gold transition-colors py-2 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-luxury-gold transition-transform shrink-0 ${activeFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-luxury-black/70 leading-relaxed pt-2 pb-4 text-justify font-light">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </article>

          {/* REPUTATION AUTHENTICITY / EEAT AUTHOR BOX / PROOF */}
          <article className="bg-[#FAF8F5] rounded-[32px] p-6 md:p-10 border border-luxury-black/5 flex flex-col md:flex-row gap-8 items-center hover:border-luxury-gold/30 transition-all shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=300&h=300"
              alt="Sajith Wickramasinghe - Sri Lanka Travel Expert"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-luxury-gold/40 shadow-md shrink-0"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="space-y-3 text-center md:text-left">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-bold block">Pillar Author & Reviewer</span>
                <h4 className="font-serif text-lg font-bold text-luxury-green">Sajith Wickramasinghe</h4>
                <p className="text-xs text-luxury-black/50">Lead Destination Coordinator at Plan Sri Lanka | 14+ Years Curating Tea Field Logistics</p>
              </div>
              <p className="text-xs text-luxury-black/65 leading-relaxed font-light text-justify">
                "I have spent more than a decade driving tourists across every single mountain bend in Hatton, Nuwara Eliya, and Ella. I wrote this planner guide to prevent fellow Indian families from getting stuck on congested routes during critical monsoon shifts. If you need any advice on vehicle safety or hotel clearances, feel free to send us a message."
              </p>
              <div className="flex justify-center md:justify-start gap-4 pt-1">
                <button 
                  onClick={() => handleWhatsAppRedirect("author_box_chat")}
                  className="text-[11px] font-bold text-luxury-gold hover:text-luxury-green transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Chat directly with Sajith</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </article>

          {/* IN-SITE DIRECTORY DIRECT VISUAL LINKS INDEX */}
          <article className="pt-8 border-t border-luxury-black/10">
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold text-luxury-green uppercase tracking-wider">Expand Your Ceylon Roadmap</h4>
              <p className="text-xs text-luxury-black/45 leading-relaxed">
                Connect your planning strategy across our indexed digital travel manuals:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "7-Day Sri Lanka Classic Itinerary", desc: "Our flagship ready-to-use first trip roadmap.", link: "/sri-lanka-7-day-itinerary" },
                  { title: "Sri Lanka Visa ETA Guide for Indians", desc: "Official steps to register entry clearance waivers.", link: "/sri-lanka-visa-for-indians" },
                  { title: "Sri Lanka Family Itinerary (Kids Focus)", desc: "Slow-paced routing sheets designed with kid safety.", link: "/sri-lanka-family-itinerary" },
                  { title: "Sri Lanka Month-by-Month Weather", desc: "Demystifying dual monsoonal rain patterns.", link: "/best-time-to-visit-sri-lanka" }
                ].map((node, index) => (
                  <Link 
                    to={node.link} 
                    key={index}
                    className="bg-white p-4 rounded-xl border border-luxury-black/5 hover:border-luxury-gold transition-all block group"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="space-y-1">
                        <p className="font-serif text-xs font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">{node.title}</p>
                        <p className="text-[10px] text-luxury-black/40 font-light truncate">{node.desc}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-luxury-gold group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>

        </main>

      </section>

      {/* FINAL BACKHOME QUICKBAR FOOTER AREA */}
      <footer className="bg-luxury-green text-white py-12 text-center border-t border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 space-y-4 relative z-10">
          <Link to="/" className="font-serif text-lg uppercase tracking-[0.2em] font-bold hover:text-luxury-gold transition-colors">
            Vibe Tour Sri Lanka
          </Link>
          <p className="text-xs text-white/50 leading-relaxed font-light">
            Plan Sri Lanka is an independent premium travel concierge. London • Mumbai • Colombo.
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <Link to="/" className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] hover:text-white transition-colors">Home Page</Link>
            <Link to="/sri-lanka-trip-planner" className="text-[10px] uppercase font-bold tracking-widest text-white/50 hover:text-white transition-colors">Interactive Map Tool</Link>
            <Link to="/sri-lanka-trip-cost-from-india" className="text-[10px] uppercase font-bold tracking-widest text-white/50 hover:text-white transition-colors">Cost Calculators</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
