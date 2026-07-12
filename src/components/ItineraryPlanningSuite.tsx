import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Car, Train, ShieldAlert, CloudRain, Briefcase, HelpCircle, AlertCircle, Info, CheckCircle2, DollarSign, Clock, Users, ArrowRight, Play, Check, Navigation, AlertTriangle, UserCheck
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface ToolSuiteProps {
  onWhatsAppRequest: (msg: string) => void;
}

export default function ItineraryPlanningSuite({ onWhatsAppRequest }: ToolSuiteProps) {
  const [activeTab, setActiveTab] = useState<string>("cost");

  // 1. Cost Calculator State
  const [passengers, setPassengers] = useState<number>(2);
  const [hotelTier, setHotelTier] = useState<"value" | "comfort" | "luxury">("comfort");
  const [origin, setOrigin] = useState<"india" | "uk" | "europe" | "usa" | "australia">("india");

  // 2. Transit Fatigue State
  const [selectedStops, setSelectedStops] = useState<string[]>(["negombo", "sigiriya", "kandy", "ella", "yala", "galle"]);

  // 3. Monsoon Planner State
  const [travelMonth, setTravelMonth] = useState<string>("December");

  // 4. Packing List State
  const [packingChecked, setPackingChecked] = useState<string[]>([]);

  // 5. Route Optimizer State
  const [routeOrder, setRouteOrder] = useState<string[]>(["Negombo", "Sigiriya", "Kandy", "Ella", "Yala", "Galle"]);

  // 7. Travel Pace State
  const [activityCount, setActivityCount] = useState<number>(5);

  // 8. Family/Senior Filter State
  const [travelerAge, setTravelerAge] = useState<"toddler" | "senior" | "adult">("adult");

  // 9. Train Countdown State
  const [departureDate, setDepartureDate] = useState<string>("2026-08-15");

  // 10. ATM State
  const [selectedBank, setSelectedBank] = useState<string>("boc");

  // 11. Tipping Calculator State
  const [driverDays, setDriverDays] = useState<number>(7);
  const [hotelBags, setHotelBags] = useState<number>(4);

  // 12. Entrance Fee State
  const [checkedSights, setCheckedSights] = useState<string[]>(["sigiriya", "dambulla", "tooth", "yala"]);

  // 14. Local Override State
  const [overridePlans, setOverridePlans] = useState<{ [key: string]: boolean }>({
    pinnawala: true,
    selfDrive: false,
    colomboStay: false
  });

  // 15. Solo Female State
  const [femaleSafetyToggle, setFemaleSafetyToggle] = useState<boolean>(false);

  // 16. Audio State
  const [playedAudio, setPlayedAudio] = useState<string | null>(null);

  // --- Calculations ---

  // 1. Cost Estimation
  const calculateCosts = () => {
    let multiplier = 1;
    let baseCurrency = "INR";
    let exchangeRate = 1; // LKR to currency
    
    if (origin === "india") {
      multiplier = 1;
      baseCurrency = "₹";
    } else if (origin === "uk") {
      multiplier = 1.1;
      baseCurrency = "£";
    } else if (origin === "europe") {
      multiplier = 1.05;
      baseCurrency = "€";
    } else {
      multiplier = 1.15;
      baseCurrency = "$";
    }

    const flatTransport = passengers <= 3 ? 24000 : 32000;
    const hotelRate = hotelTier === "value" ? 4000 : hotelTier === "luxury" ? 25000 : 8000;
    const hotelRooms = Math.ceil(passengers / 2);
    const staysTotal = hotelRate * 6 * hotelRooms;

    const ticketsRate = hotelTier === "value" ? 7000 : hotelTier === "luxury" ? 24000 : 12000;
    const ticketsTotal = ticketsRate * passengers;

    const foodRate = hotelTier === "value" ? 4000 : hotelTier === "luxury" ? 18000 : 8000;
    const foodTotal = foodRate * passengers;

    const totalLKR = flatTransport + staysTotal + ticketsTotal + foodTotal;
    
    // Simple mock exchange conversions
    let exchange = 3.6; // 1 INR = 3.6 LKR
    if (origin === "uk") exchange = 380;
    if (origin === "europe") exchange = 320;
    if (origin === "usa" || origin === "australia") exchange = 300;

    const finalTotal = Math.round(totalLKR / (origin === "india" ? 3.6 : exchange));
    const perPerson = Math.round(finalTotal / passengers);

    return { total: finalTotal, perPerson, currency: baseCurrency };
  };

  const costData = calculateCosts();

  // 2. Transit Fatigue Score
  const getFatigueMetrics = () => {
    const hoursMap: { [key: string]: number } = {
      negombo: 0.3,
      sigiriya: 3.5,
      kandy: 2.5,
      ella: 3.0,
      yala: 2.0,
      galle: 2.5,
      trincomalee: 5.5,
      jaffna: 7.5
    };

    let totalHours = 0;
    selectedStops.forEach(stop => {
      totalHours += hoursMap[stop] || 0;
    });

    let rating = "Low (Safe & Relaxed)";
    let style = "text-teal-600";
    if (totalHours > 12) {
      rating = "Extreme (Checkout Burnout Trap!)";
      style = "text-red-600 font-bold animate-pulse";
    } else if (totalHours > 8) {
      rating = "Moderate (Balanced Vacation)";
      style = "text-amber-600";
    }

    return { hours: totalHours.toFixed(1), rating, style };
  };

  const fatigueMetrics = getFatigueMetrics();

  // 3. Monsoon planner
  const getMonsoonAnalysis = () => {
    const isDryMonth = ["December", "January", "February", "March", "April"].includes(travelMonth);
    const isMidMonth = ["September", "October", "November"].includes(travelMonth);
    
    if (isDryMonth) {
      return {
        status: "☀️ PERFECT DRY WINDOW",
        advice: "South Coast beaches (Galle, Mirissa) and Cultural Triangle (Sigiriya) are fully sunny. The ocean is crystal clear for snorkeling and whale watching.",
        color: "bg-teal-50 border-teal-200 text-teal-900"
      };
    } else if (isMidMonth) {
      return {
        status: "⛈️ SHOULDER SEASON MONSOON LINK",
        advice: "Intermittent afternoon rain. Safaris are very green and less crowded. High-value resort discounts are everywhere.",
        color: "bg-amber-50 border-amber-200 text-amber-900"
      };
    } else {
      return {
        status: "🌧️ SOUTHWEST MONSOON WAVE",
        advice: "South coast beaches will have high surf. Switch Nilaveli/Trincomalee beaches (East Coast) which are completely sunny and clear right now!",
        color: "bg-sky-50 border-sky-200 text-sky-900"
      };
    }
  };

  const monsoonAnalysis = getMonsoonAnalysis();

  // 4. Packing checklist
  const packingItems = [
    { id: "socks", label: "Thick socks (to walk on hot temple stone ruins)", cat: "temple" },
    { id: "sarong", label: "Modest shoulder/knee wraps or sarong", cat: "temple" },
    { id: "fleece", label: "Warm cardigan/jacket for cool Ella evenings", cat: "hills" },
    { id: "deet", label: "20% DEET Mosquito Repellent (Dengue prevention)", cat: "jungle" },
    { id: "powerbank", label: "High-yield Power Bank (essential for long safaris)", cat: "general" },
    { id: "adapter", label: "Type G & D universal socket adapter", cat: "general" }
  ];

  const handlePackingToggle = (id: string) => {
    setPackingChecked(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const packingPercent = Math.round((packingChecked.length / packingItems.length) * 100);

  // 5. Route feasibility optimizer
  const getFeasibilityScore = () => {
    const firstStop = routeOrder[0];
    const lastStop = routeOrder[routeOrder.length - 1];

    if (firstStop === "Galle" && lastStop === "Sigiriya") {
      return { score: 45, label: "Poor: Extreme backtracking. Galle to Sigiriya takes 5.5 hours." };
    }
    if (routeOrder.includes("Ella") && routeOrder.indexOf("Kandy") > routeOrder.indexOf("Ella")) {
      return { score: 60, label: "Sub-optimal: Taking the train from Ella to Kandy goes uphill against scenic schedules." };
    }
    return { score: 98, label: "Excellent: Linear progression. Perfectly aligned with expressways." };
  };

  const feasibility = getFeasibilityScore();

  // 8. Tipping guide
  const tippingEstimate = (driverDays * 3000) + (hotelBags * 150);

  // 12. Ticket pricing summing
  const sightsPricing: { [key: string]: { lkr: number, usd: number, label: string } } = {
    sigiriya: { lkr: 11500, usd: 36, label: "Sigiriya Sky Lion Rock" },
    dambulla: { lkr: 2000, usd: 6, label: "Dambulla Golden Cave Caves" },
    tooth: { lkr: 2000, usd: 6, label: "Kandy Sacred Tooth Temple" },
    yala: { lkr: 18000, usd: 56, label: "Yala Entrance & Shared Jeep Fees" },
    pidurangala: { lkr: 1000, usd: 3, label: "Pidurangala Rock Sunset" }
  };

  const calculateEntranceTotal = () => {
    let lkrTotal = 0;
    let usdTotal = 0;
    checkedSights.forEach(sight => {
      const price = sightsPricing[sight];
      if (price) {
        lkrTotal += price.lkr;
        usdTotal += price.usd;
      }
    });
    return { lkr: lkrTotal, usd: usdTotal };
  };

  const entranceTotal = calculateEntranceTotal();

  // 9. Countdown Calculation
  const getCountdownDate = () => {
    if (!departureDate) return "Pick a date";
    const dep = new Date(departureDate);
    const target = new Date(dep.getTime() - (30 * 24 * 60 * 60 * 1000));
    return target.toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Audio simulation
  const playAudioSimulation = (phrase: string) => {
    setPlayedAudio(phrase);
    trackEvent('phrase_audio_click', 'engagement', phrase);
    setTimeout(() => {
      setPlayedAudio(null);
    }, 1200);
  };

  const handleShareWhatsApp = () => {
    const msg = `Hi Plan Sri Lanka! I customized my itinerary with your Interactive Suite:
- Travel Style: ${origin.toUpperCase()} | ${hotelTier.toUpperCase()} Stays
- Pacing Choice: ${activityCount} major sights per day (${travelerAge} age alignment)
- Chosen travel window: ${travelMonth}
- Fuel & Toll coverage pre-checked: Yes

Please confirm private driver availability and send the free PDF download.`;
    onWhatsAppRequest(msg);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-[#0F1412]/5 shadow-2xl overflow-hidden">
      
      {/* TOOLBAR NAVIGATION BAR */}
      <div className="bg-[#1A2F23] px-4 py-3 overflow-x-auto flex gap-1.5 scrollbar-none border-b border-white/10">
        {[
          { id: "cost", label: "💰 Cost Calculator", ga: "cost_calculator" },
          { id: "fatigue", label: "🚗 Fatigue Simulator", ga: "fatigue_sim" },
          { id: "weather", label: "⛅ Weather Decider", ga: "weather_planner" },
          { id: "pack", label: "🧳 Packing Checklist", ga: "packing_gen" },
          { id: "optimizer", label: "🗺️ Route Optimizer", ga: "route_opt" },
          { id: "misc", label: "🛠️ Quick Utilities", ga: "misc_tools" }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              trackEvent('tool_tab_click', 'engagement', t.ga);
            }}
            className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id 
                ? "bg-[#C5A059] text-white shadow-sm" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ACTIVE SCREEN CONTENT CANVAS */}
      <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            
            {/* TAB 1: DYNAMIC COST ESTIMATOR */}
            {activeTab === "cost" && (
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059]">Cost Estimator</span>
                    <h4 className="font-serif text-xl sm:text-2xl text-[#1A2F23] font-bold">Trip Cost & Currency Calculator</h4>
                    <p className="text-xs text-[#0F1412]/60 font-light leading-relaxed">
                      Factor in flight origins, hotel class tiers, and traveler sizes to calculate complete land packages instantly.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold block text-[#1A2F23]">Travel Group passengers:</label>
                      <div className="flex gap-2">
                        {[1, 2, 4, 6].map(p => (
                          <button
                            key={p}
                            onClick={() => setPassengers(p)}
                            className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold cursor-pointer ${
                              passengers === p ? "bg-[#1A2F23] text-white border-[#1A2F23]" : "bg-[#FAF8F5] text-[#0F1412] hover:bg-gray-100 border-[#0F1412]/5"
                            }`}
                          >
                            {p} {p === 1 ? "Pax" : "Pax"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block text-[#1A2F23]">Hotel Quality Tier:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["value", "comfort", "luxury"].map(tier => (
                          <button
                            key={tier}
                            onClick={() => setHotelTier(tier as any)}
                            className={`py-2 rounded-lg border font-mono text-[10px] font-bold uppercase cursor-pointer ${
                              hotelTier === tier ? "bg-[#1A2F23] text-white border-[#1A2F23]" : "bg-[#FAF8F5] text-[#0F1412] hover:bg-gray-100 border-[#0F1412]/5"
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold block text-[#1A2F23]">Home Origin Hub:</label>
                      <select
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value as any)}
                        className="w-full bg-[#FAF8F5] border border-[#0F1412]/10 rounded-lg p-2 focus:outline-none cursor-pointer"
                      >
                        <option value="india">India (INR conversion / e-Visas)</option>
                        <option value="uk">United Kingdom (GBP £)</option>
                        <option value="europe">Europe (EUR €)</option>
                        <option value="usa">USA / Global (USD $)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F1412]/5 text-center space-y-4">
                  <span className="text-[9px] font-mono tracking-widest text-[#C5A059] font-bold uppercase block">Dynamic Est. Land Package</span>
                  
                  <div className="space-y-1">
                    <p className="text-4xl font-serif text-[#1A2F23] font-bold">
                      {costData.currency}{costData.total.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-[#0F1412]/50">
                      Total land cost for {passengers} {passengers === 1 ? "Traveler" : "Travelers"}
                    </p>
                  </div>

                  <p className="text-[11px] font-mono text-[#C5A059] border-t border-b border-[#0F1412]/5 py-2">
                    Approx: {costData.currency}{costData.perPerson.toLocaleString("en-IN")} Per Person
                  </p>

                  <div className="text-[10px] text-[#0F1412]/50 text-left space-y-1">
                    <p>✓ All fuel, driver allowances & tolls covered.</p>
                    <p>✓ Handpicked properties + breakfast pre-selected.</p>
                    <p>✓ Sri Lanka Railway booking support included.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TRANSIT FATIGUE SIMULATOR */}
            {activeTab === "fatigue" && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059]">Pacing & Transit Analyzer</span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#1A2F23] font-bold">Driving Fatigue & Stop Simulator</h4>
                  <p className="text-xs text-[#0F1412]/60 font-light leading-relaxed">
                    Maps in Sri Lanka are deceptive. Winding peaks restrict driving speeds to 35 km/h. Click and select towns to simulate cumulative vehicle hours and physical stress levels.
                  </p>
                </div>

                <div className="grid md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-7 space-y-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#0F1412]/40 block">Select Planned Destination Stops:</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "negombo", label: "Negombo (0.3h)" },
                        { id: "sigiriya", label: "Sigiriya (3.5h)" },
                        { id: "kandy", label: "Kandy (2.5h)" },
                        { id: "ella", label: "Ella (3.0h)" },
                        { id: "yala", label: "Yala (2.0h)" },
                        { id: "galle", label: "Galle Fort (2.5h)" },
                        { id: "trincomalee", label: "Trincomalee (5.5h)" },
                        { id: "jaffna", label: "Jaffna (7.5h)" }
                      ].map(stop => {
                        const active = selectedStops.includes(stop.id);
                        return (
                          <button
                            key={stop.id}
                            onClick={() => {
                              setSelectedStops(prev => 
                                prev.includes(stop.id) ? prev.filter(x => x !== stop.id) : [...prev, stop.id]
                              );
                            }}
                            className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                              active 
                                ? "bg-[#1A2F23] text-white border-[#1A2F23]" 
                                : "bg-[#FAF8F5] text-[#0F1412] hover:bg-gray-100 border-[#0F1412]/5"
                            }`}
                          >
                            {stop.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="md:col-span-5 bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F1412]/5 space-y-3.5">
                    <div className="text-center">
                      <span className="text-[9px] font-mono tracking-widest text-[#0F1412]/40 block font-bold uppercase">Estimated Vehicle Hours</span>
                      <p className="text-4xl font-serif text-[#1A2F23] font-bold mt-1">
                        {fatigueMetrics.hours} Hours
                      </p>
                    </div>

                    <div className="space-y-1.5 border-t border-[#0F1412]/5 pt-3 text-xs text-center">
                      <p className="font-semibold text-[#1A2F23]">Pace Stress Index:</p>
                      <p className={`text-xs uppercase font-mono tracking-wider ${fatigueMetrics.style}`}>
                        {fatigueMetrics.rating}
                      </p>
                    </div>

                    {parseFloat(fatigueMetrics.hours) > 12 && (
                      <div className="p-3 bg-red-100/50 rounded-xl border border-red-200 text-red-950 text-[10px] font-light leading-relaxed flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>Warning: Your route contains extensive road travel. Consider booking 2-night bases or removing 1 stop to avoid extreme fatigue.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: WEATHER & DUAL-MONSOON PLANNER */}
            {activeTab === "weather" && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059]">Monsoonal Defense</span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#1A2F23] font-bold">Month-by-Month Monsoon Shift Decider</h4>
                  <p className="text-xs text-[#0F1412]/60 font-light leading-relaxed">
                    Sri Lanka has two monsoons. When one coast is rainy, the other is hot and sunny. Pick your month to see which side of the island is safe and clear right now.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-2">
                    <label className="font-semibold block text-xs text-[#1A2F23]">Expected Travel Month:</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {["Jan", "Mar", "May", "Jun", "Aug", "Oct", "Nov", "Dec"].map(m => {
                        const fullNames: { [key: string]: string } = {
                          Jan: "January", Mar: "March", May: "May", Jun: "June", Aug: "August", Oct: "October", Nov: "November", Dec: "December"
                        };
                        const active = travelMonth === fullNames[m];
                        return (
                          <button
                            key={m}
                            onClick={() => setTravelMonth(fullNames[m])}
                            className={`py-2 rounded-lg border text-xs font-serif font-bold transition-all cursor-pointer ${
                              active ? "bg-[#C5A059] text-white border-[#C5A059]" : "bg-[#FAF8F5] text-[#0F1412] hover:bg-gray-100 border-[#0F1412]/5"
                            }`}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border transition-all ${monsoonAnalysis.color} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase">Monsoon Rating Analysis</span>
                      <span className="text-xs font-bold font-mono">{monsoonAnalysis.status}</span>
                    </div>
                    <p className="text-xs leading-relaxed font-light">
                      {monsoonAnalysis.advice}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PACKING CHECKLIST GENERATOR */}
            {activeTab === "pack" && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059]">Smart Logistics Curation</span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#1A2F23] font-bold">Interactive Route Packing Generator</h4>
                  <p className="text-xs text-[#0F1412]/60 font-light leading-relaxed">
                    Your route transitions from hot coastal shores to chilling 10°C highlands. Check off essential items below to track your packing readiness index.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F1412]/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-serif font-bold text-[#1A2F23]">Packing Readiness index:</span>
                    <span className="text-xs font-mono font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded-lg">{packingPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C5A059] h-full transition-all duration-300" style={{ width: `${packingPercent}%` }}></div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                    {packingItems.map(item => {
                      const checked = packingChecked.includes(item.id);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => handlePackingToggle(item.id)}
                          className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition-all ${
                            checked ? "bg-emerald-50 border-emerald-100 text-emerald-950" : "bg-white text-[#0F1412] hover:bg-[#FAF8F5] border-[#0F1412]/5"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            checked ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-300 bg-white"
                          }`}>
                            {checked && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="leading-snug text-[11px] font-light">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ROUTE OPTIMIZER */}
            {activeTab === "optimizer" && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#C5A059]">Backtracking Shield</span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#1A2F23] font-bold">Route Feasibility & Order Optimizer</h4>
                  <p className="text-xs text-[#0F1412]/60 font-light leading-relaxed">
                    Backtracking is the #1 mistake that ruins short trips. Arrange your desired stop sequence and receive real-time feasibility alerts instantly.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#0F1412]/40 block">Your Stops Sequence:</span>
                    <div className="space-y-1.5">
                      {routeOrder.map((stop, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-[#FAF8F5] border border-[#0F1412]/5 rounded-xl text-xs">
                          <span className="font-mono font-bold text-[#C5A059]">Stop {idx + 1}: {stop}</span>
                          <div className="flex gap-1 shrink-0">
                            {idx > 0 && (
                              <button 
                                onClick={() => {
                                  const arr = [...routeOrder];
                                  const temp = arr[idx];
                                  arr[idx] = arr[idx-1];
                                  arr[idx-1] = temp;
                                  setRouteOrder(arr);
                                }}
                                className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold cursor-pointer"
                              >
                                ▲
                              </button>
                            )}
                            {idx < routeOrder.length - 1 && (
                              <button 
                                onClick={() => {
                                  const arr = [...routeOrder];
                                  const temp = arr[idx];
                                  arr[idx] = arr[idx+1];
                                  arr[idx+1] = temp;
                                  setRouteOrder(arr);
                                }}
                                className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold cursor-pointer"
                              >
                                ▼
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F1412]/5 text-center space-y-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#0F1412]/40 block font-bold uppercase">Feasibility Rating Score</span>
                    
                    <div className="space-y-1">
                      <p className={`text-5xl font-serif font-bold ${feasibility.score > 80 ? "text-emerald-600" : "text-amber-600"}`}>
                        {feasibility.score}/100
                      </p>
                      <p className="text-[10px] font-mono tracking-widest text-[#0F1412]/50 uppercase">
                        Route sequence evaluation
                      </p>
                    </div>

                    <p className="text-xs leading-relaxed font-light border-t border-[#0F1412]/5 pt-3 text-[#0F1412]/80">
                      {feasibility.label}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: QUICK UTILITIES */}
            {activeTab === "misc" && (
              <div className="grid md:grid-cols-2 gap-6 items-start">
                
                {/* Countdown & ATM */}
                <div className="space-y-4">
                  <div className="bg-[#FAF8F5] p-4.5 rounded-xl border border-[#0F1412]/5 space-y-2">
                    <h5 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#C5A059]" /> 30-Day Railway Countdown
                    </h5>
                    <div className="space-y-2">
                      <p className="text-[11px] text-[#0F1412]/60 leading-normal">
                        Input your target travel day. Instantly calculate the exact hour the government railway ticket booking system unlocks.
                      </p>
                      <input 
                        type="date" 
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full bg-white border border-[#0F1412]/10 rounded-lg p-2 text-xs text-[#0F1412]/80 outline-none font-mono cursor-pointer"
                      />
                      <p className="text-xs font-mono font-bold text-[#1A2F23]">
                        🎫 Tickets Release Date: <span className="text-[#C5A059]">{getCountdownDate()}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] p-4.5 rounded-xl border border-[#0F1412]/5 space-y-2">
                    <h5 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-[#C5A059]" /> Local Tipping Calculator
                    </h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Driver Days ({driverDays} days):</span>
                        <input 
                          type="range" min="1" max="14" value={driverDays} 
                          onChange={(e) => setDriverDays(parseInt(e.target.value))}
                          className="accent-[#C5A059] w-24 h-1 cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-between">
                        <span>Hotel bags ({hotelBags} bags):</span>
                        <input 
                          type="range" min="1" max="10" value={hotelBags} 
                          onChange={(e) => setHotelBags(parseInt(e.target.value))}
                          className="accent-[#C5A059] w-24 h-1 cursor-pointer"
                        />
                      </div>
                      <p className="font-mono font-bold text-[#1A2F23] border-t border-[#0F1412]/5 pt-2 text-[11px]">
                        Recommended Tip Tip: <span className="text-[#C5A059]">{tippingEstimate.toLocaleString("en-IN")} LKR</span> (approx. ₹{Math.round(tippingEstimate/3.6)} INR)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sights estimator & Audio */}
                <div className="space-y-4">
                  <div className="bg-[#FAF8F5] p-4.5 rounded-xl border border-[#0F1412]/5 space-y-2">
                    <h5 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> Entrance Ticket Sifter
                    </h5>
                    <div className="space-y-2 text-xs">
                      <p className="text-[10px] text-[#0F1412]/60">Sum exact fees instantly in USD & LKR equivalents.</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {Object.keys(sightsPricing).map(sightKey => {
                          const sight = sightsPricing[sightKey];
                          const active = checkedSights.includes(sightKey);
                          return (
                            <button
                              key={sightKey}
                              onClick={() => {
                                setCheckedSights(prev => 
                                  prev.includes(sightKey) ? prev.filter(x => x !== sightKey) : [...prev, sightKey]
                                );
                              }}
                              className={`p-2 rounded border text-[10px] font-light text-left truncate transition-all cursor-pointer ${
                                active ? "bg-teal-50 border-teal-100 text-teal-950 font-bold" : "bg-white border-[#0F1412]/5"
                              }`}
                            >
                              {active ? "✓ " : ""} {sight.label.split(" ")[0]}
                            </button>
                          );
                        })}
                      </div>
                      <p className="font-mono font-bold text-[#1A2F23] border-t border-0f1412/5 pt-1.5 text-[11px] text-right">
                        Total Tickets: <span className="text-[#C5A059]">${entranceTotal.usd} USD</span> / {entranceTotal.lkr.toLocaleString()} LKR
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] p-4.5 rounded-xl border border-[#0F1412]/5 space-y-2">
                    <h5 className="font-serif font-bold text-sm text-[#1A2F23] flex items-center gap-1.5">
                      <Play className="w-4 h-4 text-[#C5A059]" /> Interactive Sinhala Audio Phrasebook
                    </h5>
                    <div className="space-y-2 text-xs">
                      <p className="text-[10px] text-[#0F1412]/60">Select common Sinhala words to play local phonetic guides.</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { word: "Ayubowan", gloss: "Greetings / Hello" },
                          { word: "Keeyada?", gloss: "How much?" },
                          { word: "Niyamaayi!", gloss: "Excellent!" }
                        ].map(ph => {
                          const active = playedAudio === ph.word;
                          return (
                            <button
                              key={ph.word}
                              onClick={() => playAudioSimulation(ph.word)}
                              className={`p-2 rounded-xl border text-[10px] font-mono transition-all text-center cursor-pointer ${
                                active ? "bg-[#C5A059] text-white border-[#C5A059]" : "bg-white border-[#0F1412]/5 hover:bg-gray-50"
                              }`}
                            >
                              <p className="font-bold">{ph.word}</p>
                              <p className="text-[8px] opacity-60 font-light truncate">{ph.gloss}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* PERSISTENT FOOTER CTA TO SYNC STATE */}
        <div className="mt-6 pt-5 border-t border-[#0F1412]/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#0F1412]/50 font-light text-center sm:text-left">
            🔒 These dynamic plans can be forwarded directly to your on-the-ground concierge coordinator.
          </p>
          <button
            onClick={handleShareWhatsApp}
            className="w-full sm:w-auto px-6 py-3 bg-[#1A2F23] hover:bg-[#C5A059] text-white font-serif tracking-wider text-xs uppercase font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
          >
            Send My Tools Config to WhatsApp ➔
          </button>
        </div>

      </div>

    </div>
  );
}
