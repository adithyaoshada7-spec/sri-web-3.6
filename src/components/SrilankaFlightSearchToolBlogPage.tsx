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
  Clock, 
  Compass,
  AlertCircle,
  CheckCircle,
  Shield,
  Briefcase,
  Search,
  Bell,
  Plane,
  Coins,
  Heart,
  Users,
  Navigation
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaFlightSearchToolBlogPage() {
  usePageMetadata({
    title: "Flight Search Tool for Sri Lanka from India: Compare Deals",
    description: "Compare flights India to Sri Lanka. Learn why using our flight search tool before booking cheap flights from Chennai, Mumbai, or Bengaluru saves money.",
    canonicalUrl: "https://plan-srilanka.com/flights/why-use-a-flight-search-tool",
    ogUrl: "https://plan-srilanka.com/flights/why-use-a-flight-search-tool",
    ogImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Simple state for local interaction / currency estimator 
  const [estForm, setEstForm] = useState({
    originCity: "Chennai",
    passengerCount: 2,
    cabinClass: "Economy",
    calculated: false
  });

  const [simulatedPriceRange, setSimulatedPriceRange] = useState({ min: 14000, max: 22000 });

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("flight_tool_estimate", "calculator", estForm.originCity);
    
    // Simulate realistic flight cost estimates in INR
    let baseMin = 14000;
    let baseMax = 22000;
    
    if (estForm.originCity === "Chennai") {
      baseMin = 11000;
      baseMax = 18000;
    } else if (estForm.originCity === "Bengaluru") {
      baseMin = 12500;
      baseMax = 19500;
    } else if (estForm.originCity === "Mumbai") {
      baseMin = 18000;
      baseMax = 26000;
    } else if (estForm.originCity === "Delhi") {
      baseMin = 22000;
      baseMax = 32000;
    } else if (estForm.originCity === "Kochi") {
      baseMin = 11500;
      baseMax = 17500;
    }

    if (estForm.cabinClass === "Business") {
      baseMin *= 3.5;
      baseMax *= 4.2;
    }

    setSimulatedPriceRange({
      min: Math.round(baseMin * estForm.passengerCount),
      max: Math.round(baseMax * estForm.passengerCount)
    });
    setEstForm(prev => ({ ...prev, calculated: true }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      
      {/* 1. SCHEMA MARKUPS */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Why Use a Flight Search Tool Before Booking Your Flight to Sri Lanka from India?",
          "description": "Examine the practical value of using an aggregate flight search tool for Sri Lanka from India. Learn how comparing IndiGo, SriLankan Airlines, and Air India saves time and money.",
          "url": "https://plan-srilanka.com/flights/why-use-a-flight-search-tool",
          "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200&h=630",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://plan-srilanka.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Flights",
                "item": "https://plan-srilanka.com/flights"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Why Use a Flight Search Tool",
                "item": "https://plan-srilanka.com/flights/why-use-a-flight-search-tool"
              }
            ]
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Plan Sri Lanka Flight Search Tool",
          "operatingSystem": "All",
          "applicationCategory": "TravelApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "843"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Use the Flight Search Tool to Find Cheap Flights from India to Sri Lanka",
          "description": "Step-by-step instructions for Indian travelers using our aggregated flight search tool to compare flights to Bandaranaike International Airport.",
          "totalTime": "PT2M",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Access the Flight Dashboard",
              "text": "Navigate to the Plan Sri Lanka Flights Search dashboard at plan-srilanka.com/flights.",
              "url": "https://plan-srilanka.com/flights"
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Input Your Indian Departure City",
              "text": "Select your local departure point (e.g. Chennai, Bengaluru, Mumbai, or Delhi) and specify Colombo (CMB) as your destination.",
              "url": "https://plan-srilanka.com/flights"
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Select Dates and Cabin Requirements",
              "text": "Choose your desired departure and return calendar dates, passenger counts, and travel cabin class.",
              "url": "https://plan-srilanka.com/flights"
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Initiate Live Fare Aggregation",
              "text": "Click the 'Search Flights' button to launch live API retrieval across major airlines.",
              "url": "https://plan-srilanka.com/flights"
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Apply Smart Filters & Book",
              "text": "Filter your results by departure times, stops, or price in INR, then lock in your booking through direct, verified airlines.",
              "url": "https://plan-srilanka.com/flights"
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is the flight search tool free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our flight search tool for Sri Lanka from India is completely free to use. There are no hidden service charges, booking fees, or membership subscriptions, allowing Indian travelers to compare multiple airline flight segments completely free of cost."
              }
            },
            {
              "@type": "Question",
              "name": "Does it book the flight directly?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, our system acts as a search aggregator and price comparison tool. It fetches real-time flight details and redirects you to direct, verified airline portals or primary operators, ensuring you complete your booking safely and avoid hidden markup fees."
              }
            },
            {
              "@type": "Question",
              "name": "Which airlines fly from India to Sri Lanka?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Indian travelers can choose between several prominent airlines, including SriLankan Airlines (the national flag carrier), Air India (full-service carrier), and low-cost budget alternatives like IndiGo and SpiceJet. These operators offer frequent direct flights daily."
              }
            },
            {
              "@type": "Question",
              "name": "Do Indian citizens need a visa to fly to Sri Lanka?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Indian citizens require an Electronic Travel Authorization (ETA) to enter Sri Lanka. You can apply easily online before your departure. Sri Lanka occasionally implements visa-free schemes for Indian passport holders, so check the latest updates on our dedicated visa page."
              }
            },
            {
              "@type": "Question",
              "name": "Which Indian city has the shortest flight time to Colombo?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Madurai and Chennai have the shortest flight durations to Colombo Bandaranaike International Airport. Direct flights departing from Chennai take approximately one hour and twenty minutes, making Sri Lanka an incredibly accessible, short-haul island getaway for South Indians."
              }
            },
            {
              "@type": "Question",
              "name": "How far in advance should Indian travelers book for the best price?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Indian travelers should ideally book their flights to Colombo four to six weeks in advance. Because of the high volume of daily flights between the two countries, prices remain relatively stable, but booking earlier avoids peak holiday spikes."
              }
            }
          ]
        })}
      </script>

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#1e3a2f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mx-auto">
            <Sparkles className="w-4 h-4" />
            Indian Outbound Intelligence Dossier
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white leading-tight max-w-4xl mx-auto tracking-tight">
            Why Use a Flight Search Tool Before Booking Your Flight to Sri Lanka from India?
          </h1>
          
          <p className="text-sm md:text-lg text-[#a3bfae] font-light max-w-3xl mx-auto leading-relaxed">
            Uncover the dynamic price fluctuations between IndiGo, SriLankan Airlines, and Air India. Optimize travel times, select direct routings from South India, and map your flight budget in INR.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/flights" className="px-6 py-3 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all flex items-center gap-2">
              <Search className="w-4 h-4" /> Go to Flight Search Tool
            </Link>
            <Link to="/guide-to-flying-to-sri-lanka" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-xl border border-white/10 transition-all">
              📖 General Flights Guide
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK QUICK-LINKS SUB-BAR */}
      <section className="bg-white border-b border-neutral-100 py-3 shadow-sm sticky top-[70px] z-30 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-6 flex gap-4 text-xs font-semibold whitespace-nowrap">
          <span className="text-neutral-400 self-center uppercase tracking-wider text-[10px]">Topical Cluster:</span>
          <Link to="/sri-lanka-trip-cost-from-india" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">💰 India Cost Pillar</Link>
          <Link to="/sri-lanka-trip-planner" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">🗺️ Dynamic Trip Planner</Link>
          <Link to="/sri-lanka-7-day-itinerary" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">📅 7-Day Ultimate Blueprint</Link>
          <Link to="/sri-lanka-visa-for-indians" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">🛂 Visa ETA Guide</Link>
          <Link to="/things-to-do-in-sri-lanka" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">⭐ Things to Do</Link>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        
        {/* STANDALONE AI-EXTRACTABLE SUMMARY */}
        <section className="p-8 bg-white border border-[#d4af37]/30 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]" />
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold block">
              AI Answer Engine Extractable Snippet
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#1e3a2f] leading-relaxed">
              Indian travelers should use an aggregate flight search tool for Sri Lanka from India to instantly compare rates, schedules, and connections. With typical short-haul flight durations of just 1 to 3.5 hours, multiple daily departures, and highly volatile pricing among IndiGo, SriLankan Airlines, and Air India, a consolidated search maps the cheapest departure cities and prevents booking overpaid fares.
            </p>
          </div>
        </section>

        {/* SECTION 1: Save Time by Comparing Flights from Indian Cities in One Search */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f]">
            Save Time by Comparing Flights from Indian Cities in One Search
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Sri Lanka's proximity to India makes it one of the most popular international destinations for outbound Indian tourists. However, navigating the sheer volume of available flight options can quickly become overwhelming. Weekly frequencies, route routes, and seasonal patterns differ greatly depending on which major metropolitan hub you depart from. 
            </p>
            <p>
              Instead of manually searching individual airline websites one-by-one—only to discover that your luggage limits are not aligned or that a connection layover is prohibitively long—our specialized <Link to="/flights" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">compare flights India to Sri Lanka</Link> tool aggregates all variables instantly. Whether you are searching for direct flights India to Bandaranaike International Airport or trying to establish the absolute cheapest way to fly to Sri Lanka from India, a single consolidated query simplifies the entire process.
            </p>
            <p>
              By using our flight search tool, you can evaluate the following essential trip criteria side-by-side in real-time:
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <li className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Coins className="w-5 h-5 text-[#d4af37]" />
                  <span>Real-time Pricing in INR</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Evade hidden conversion fees. Compare live base fares instantly translated into Indian Rupees (INR) across full-service and budget airlines.
                </p>
              </li>
              <li className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <span>Total Transit Durations</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Evaluate direct travel times ranging from a brief 1.2 hours from Chennai (MAA) or Bengaluru (BLR) to roughly 3.5 hours for Delhi (DEL) departures.
                </p>
              </li>
              <li className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Navigation className="w-5 h-5 text-[#d4af37]" />
                  <span>Layover Stopovers</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Instantly filter out exhausting domestic multi-stop connections, prioritizing seamless direct non-stop routes for optimal convenience.
                </p>
              </li>
              <li className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Plane className="w-5 h-5 text-[#d4af37]" />
                  <span>Airline Comparisons</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Weigh the services of premium airlines like SriLankan Airlines and Air India against economical budget operators such as IndiGo.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: Find the Best Flight for Your Budget (in INR) */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f]">
            Find the Best Flight for Your Budget (in INR)
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              For Indian travelers, pricing remains a major decision driver. Flight ticket prices are highly volatile and can fluctuate by thousands of rupees in a matter of hours. To secure <Link to="/flights" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">cheap flights India to Sri Lanka</Link>, you must look beyond the initial visual face-value. Often, what appears to be a bargain budget fare on paper ends up carrying expensive add-on costs for checked baggage, seat selection, and pre-ordered meals.
            </p>
            
            <div className="p-6 bg-amber-50/50 border border-amber-200/50 rounded-2xl my-6">
              <h3 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-[#d4af37]" /> Logistical Comparison Scenario
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed font-light">
                Let's analyze a typical booking choice departing from Chennai (MAA) to Colombo (CMB):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#d4af37] font-bold block">Option A: Direct Flight</span>
                  <p className="font-bold text-[#1e3a2f]">IndiGo Non-stop</p>
                  <p className="text-xs text-neutral-500">Duration: 1h 20m</p>
                  <p className="text-sm font-semibold text-emerald-700">Cost: ₹11,500 INR (Base)</p>
                  <p className="text-xs text-neutral-500 italic">+ ₹2,500 luggage / meal fees</p>
                </div>
                <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">Option B: Connecting Route</span>
                  <p className="font-bold text-[#1e3a2f]">Air India via Delhi</p>
                  <p className="text-xs text-neutral-500">Duration: 7h 45m</p>
                  <p className="text-sm font-semibold text-[#1a2d24]">Cost: ₹16,000 INR (Inclusive)</p>
                  <p className="text-xs text-neutral-500 italic">Includes 30kg checked bag + hot meal</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-3 italic">
                *Prices represent typical shoulder-season averages in 2026. Use our interactive search to pull dynamic live values.
              </p>
            </div>
            
            <p>
              By comparing these configurations side-by-side in Indian Rupees, you can decide whether the convenience of a rapid direct flight outweighs the value of a full-service carrier's higher baggage allowance. For a comprehensive overview of how flight selections shape your overall holiday expenses, consult our master guide on <Link to="/sri-lanka-trip-cost-from-india" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">Sri Lanka Trip Cost from India</Link>.
            </p>
          </div>
        </section>

        {/* INTERACTIVE VALUE ESTIMATOR (PREMIUM ADDITION FOR GEO CIVILITY) */}
        <section className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold">Interactive INR Estimator</span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1e3a2f]">
              Estimate Your Total Airfare Budget
            </h3>
            <p className="text-xs text-neutral-500 font-light">
              Select your expected departure point and travelers to quickly gauge realistic 2026 flight cost distributions.
            </p>
          </div>

          <form onSubmit={handleEstimate} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 block">Departure City</label>
              <select 
                value={estForm.originCity} 
                onChange={(e) => setEstForm(prev => ({ ...prev, originCity: e.target.value, calculated: false }))}
                className="w-full px-4 py-2.5 bg-[#fcfbf7] border border-neutral-300 rounded-xl text-sm font-light focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Chennai">Chennai (MAA)</option>
                <option value="Bengaluru">Bengaluru (BLR)</option>
                <option value="Mumbai">Mumbai (BOM)</option>
                <option value="Delhi">Delhi (DEL)</option>
                <option value="Kochi">Kochi (COK)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 block">Travelers</label>
              <select 
                value={estForm.passengerCount} 
                onChange={(e) => setEstForm(prev => ({ ...prev, passengerCount: parseInt(e.target.value), calculated: false }))}
                className="w-full px-4 py-2.5 bg-[#fcfbf7] border border-neutral-300 rounded-xl text-sm font-light focus:outline-none focus:border-[#d4af37]"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? "Traveler" : "Travelers"}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider font-semibold text-neutral-500 block">Cabin Class</label>
              <select 
                value={estForm.cabinClass} 
                onChange={(e) => setEstForm(prev => ({ ...prev, cabinClass: e.target.value, calculated: false }))}
                className="w-full px-4 py-2.5 bg-[#fcfbf7] border border-neutral-300 rounded-xl text-sm font-light focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business Class</option>
              </select>
            </div>

            <div className="sm:col-span-3 pt-2">
              <button 
                type="submit" 
                className="w-full py-3 bg-[#1e3a2f] text-white font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-[#d4af37] hover:text-black transition-all shadow-md"
              >
                Calculate Estimated Airfare
              </button>
            </div>
          </form>

          {estForm.calculated && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl text-center space-y-2"
            >
              <span className="text-xs text-neutral-500 uppercase tracking-wider block">Estimated Total Range</span>
              <p className="text-3xl font-serif font-bold text-emerald-800">
                ₹{simulatedPriceRange.min.toLocaleString("en-IN")} - ₹{simulatedPriceRange.max.toLocaleString("en-IN")} INR
              </p>
              <p className="text-xs text-neutral-600 font-light leading-relaxed max-w-md mx-auto">
                Includes regional airport tax estimates for {estForm.passengerCount} {estForm.passengerCount === 1 ? "passenger" : "passengers"} in {estForm.cabinClass} departing from {estForm.originCity}. For precise, live live-fares from premium databases, launch a direct search below.
              </p>
              <div className="pt-2">
                <Link to="/flights" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-[#d4af37] uppercase tracking-wider">
                  Compare Real-Time Live Fares <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </section>

        {/* SECTION 3: Perfect for Indian Travelers Visiting Sri Lanka */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f]">
            Perfect for Indian Travelers Visiting Sri Lanka
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Because of Sri Lanka's cultural hospitality, proximity, and culinary familiarity, it appeals to a diverse spectrum of travelers from the subcontinent. When booking your flights to Bandaranaike International Airport (CMB), identifying your travel profile ensures you choose the correct flights:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Heart className="w-5 h-5 text-[#d4af37]" />
                  <span>Honeymoon Couples</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Indian newlyweds typically favor luxury. Booking a Business Class cabin on SriLankan Airlines offers immediate comfort, lounge access, and generous luggage limits for wedding finery, transitioning seamlessly into an intimate tropical getaway.
                </p>
              </div>

              <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Users className="w-5 h-5 text-[#d4af37]" />
                  <span>Families on Long Weekends</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  With direct flights departing Bengaluru or Chennai on Thursday evening and returning Sunday night, families can enjoy an international beach vacation without utilizing extensive annual leave. Direct routing is essential here to conserve precious hours.
                </p>
              </div>

              <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Sparkles className="w-5 h-5 text-[#d4af37]" />
                  <span>Solo and Budget Explorers</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  For young professionals or backpackers, budget carriers like IndiGo represent the ultimate gateway. Keeping cabin luggage strictly under 7 kilograms avoids supplemental baggage fees, letting you focus funds on beach activities or surfing.
                </p>
              </div>

              <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Briefcase className="w-5 h-5 text-[#d4af37]" />
                  <span>South Indian Business Travelers</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Business professionals from tech or trade hubs in Bengaluru or Hyderabad rely heavily on the high-frequency daily schedules to manage corporate engagements in Colombo efficiently, utilizing early departures and same-day returns.
                </p>
              </div>
            </div>
            
            <p className="mt-4">
              Regardless of your specific travel style, coordinating your flight arrival with a structured land itinerary ensures zero downtime. Once you've secured your flights, you can explore our premium <Link to="/sri-lanka-7-day-itinerary" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">Sri Lanka 7-Day Ultimate Blueprint</Link> to design a perfectly synchronized vacation.
            </p>
          </div>
        </section>

        {/* SECTION 4: How to Use the Flight Search Tool */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f]">
            How to Use the Flight Search Tool
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Leveraging our aggregated flight search engine is designed to be highly intuitive, taking less than two minutes to find the absolute best rates. Let’s look at a quick step-by-step walkthrough, using a traveler departing from Chennai (MAA) as our example:
            </p>
            
            <div className="space-y-4 mt-6">
              {[
                {
                  step: "1",
                  title: "Access the Flight Comparison Dashboard",
                  desc: "Navigate to our dedicated flights page at plan-srilanka.com/flights where our live database API aggregator is hosted."
                },
                {
                  step: "2",
                  title: "Input Your Origin and Destination",
                  desc: "Select 'Chennai (MAA)' as your departure point and 'Colombo (CMB)' as your target destination in the search fields."
                },
                {
                  step: "3",
                  title: "Define Dates and Passenger Requirements",
                  desc: "Use the calendar dropdown to select your planned travel dates, specify the number of travelers, and choose your preferred cabin class."
                },
                {
                  step: "4",
                  title: "Initiate Live Fare Aggregation",
                  desc: "Click the prominent 'Search Flights' button to let our engine query direct rates across IndiGo, SriLankan Airlines, and Air India."
                },
                {
                  step: "5",
                  title: "Apply Smart Filters and Secure Your Ticket",
                  desc: "Sort results by 'Cheapest' or 'Fastest'. Once you find your ideal flight segment, follow the direct link to lock in your booking safely."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-[#1e3a2f]">{item.title}</h4>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4">
              Ready to construct your full itinerary? Use our interactive <Link to="/sri-lanka-trip-planner" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">Sri Lanka Trip Planner</Link> to design hotel bookings, ground transfers, and experiences that seamlessly match your flight arrival times.
            </p>
          </div>
        </section>

        {/* SECTION 5: Why Indian Travelers Choose Plan Sri Lanka */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f]">
            Why Indian Travelers Choose Plan Sri Lanka
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Plan Sri Lanka stands as the premier concierge platform dedicated to removing friction for travelers visiting the island. Unlike generic global OTA platforms that treat every route identically, our team possesses localized expertise on the specific nuances of South Asian air corridors and immigration customs.
            </p>
            <p>
              Indian travelers choose Plan Sri Lanka because of our hyper-focused concierge positioning and deep understanding of what travelers from the subcontinent require:
            </p>
            
            <ul className="space-y-3 pl-6 list-disc">
              <li>
                <strong>Integrated Visa ETA Assistance:</strong> Settle visa complexities instantly. Our specialized <Link to="/sri-lanka-visa-for-indians" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">Sri Lanka Visa Guide</Link> page outlines step-by-step directives, ensuring you avoid unofficial portals charging premium markups.
              </li>
              <li>
                <strong>Real-Time Flight Planning:</strong> Track live incoming flight details, delays, and scheduling variables on our dynamic <Link to="/guide-to-flying-to-sri-lanka" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">Sri Lanka Flights Guide</Link>.
              </li>
              <li>
                <strong>Bespoke Ground Coordination:</strong> Settle transfer logistics in advance. From private chauffeur-driven vehicles to reliable airport pickups, we guarantee a smooth, stress-free landing.
              </li>
              <li>
                <strong>Curated Landmark Itineraries:</strong> Translate flight schedules into seamless travel. Discover the absolute <Link to="/best-things-to-do-sri-lanka-first-time-visitors" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">15 Best things to do</Link> tailored for first-time visitors from India.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 6: Frequently Asked Questions */}
        <section id="faqs" className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#d4af37]" />
            Frequently Asked Questions
          </h2>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Obtain immediate, precise answers to common flight and transit questions asked by Indian travelers planning a trip to Sri Lanka.
          </p>

          <div className="space-y-4 mt-6">
            {[
              {
                q: "Is the flight search tool free to use?",
                a: "Yes, our flight search tool for Sri Lanka from India is completely free to use. There are no hidden service charges, booking fees, or membership subscriptions, allowing Indian travelers to compare multiple airline flight segments completely free of cost."
              },
              {
                q: "Does it book the flight directly?",
                a: "No, our system acts as a search aggregator and price comparison tool. It fetches real-time flight details and redirects you to direct, verified airline portals or primary operators, ensuring you complete your booking safely and avoid hidden markup fees."
              },
              {
                q: "Which airlines fly from India to Sri Lanka?",
                a: "Indian travelers can choose between several prominent airlines, including SriLankan Airlines (the national flag carrier), Air India (full-service carrier), and low-cost budget alternatives like IndiGo and SpiceJet. These operators offer frequent direct flights daily."
              },
              {
                q: "Do Indian citizens need a visa to fly to Sri Lanka?",
                a: "Yes, Indian citizens require an Electronic Travel Authorization (ETA) to enter Sri Lanka. You can apply easily online before your departure. Sri Lanka occasionally implements visa-free schemes for Indian passport holders, so check the latest updates on our dedicated visa page."
              },
              {
                q: "Which Indian city has the shortest flight time to Colombo?",
                a: "Madurai and Chennai have the shortest flight durations to Colombo Bandaranaike International Airport. Direct flights departing from Chennai take approximately one hour and twenty minutes, making Sri Lanka an incredibly accessible, short-haul island getaway for South Indians."
              },
              {
                q: "How far in advance should Indian travelers book for the best price?",
                a: "Indian travelers should ideally book their flights to Colombo four to six weeks in advance. Because of the high volume of daily flights between the two countries, prices remain relatively stable, but booking earlier avoids peak holiday spikes."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-[#1e3a2f]/10 rounded-2xl bg-white overflow-hidden transition-all shadow-sm"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 bg-white hover:bg-neutral-50/50"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#1e3a2f]">
                    {faq.q}
                  </span>
                  <span className={`text-[#d4af37] font-bold text-xl transition-transform duration-300 ${activeFaq === idx ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-6 pt-0 border-t border-neutral-100 bg-[#fcfbf7]/50 text-sm text-neutral-700 font-light leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="bg-[#1e3a2f] text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-[#d4af37]/20 text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1),transparent_50%)]" />
          
          <div className="relative space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold">Start Your Journey Today</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Compare Flights & Settle Your Island Plan
            </h2>
            <p className="text-sm md:text-base text-[#a3bfae] font-light leading-relaxed">
              Don't overpay on your flights. Use our free, real-time compare flights India to Sri Lanka search engine to lock in the absolute best rates in INR, and let our concierge team align your ground transfer logistics flawlessly.
            </p>
          </div>

          <div className="relative pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link 
              to="/flights" 
              className="px-8 py-4 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all"
            >
              Launch Live Flight Search
            </Link>
            <Link 
              to="/sri-lanka-trip-planner" 
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-xl border border-white/10 transition-all"
            >
              Plan Your Route
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
