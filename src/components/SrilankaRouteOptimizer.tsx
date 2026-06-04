import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Users, 
  Compass, 
  Palmtree, 
  Backpack, 
  Check, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Train, 
  CheckCircle, 
  Activity, 
  ArrowRight,
  Shield,
  ThumbsUp
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface SrilankaRouteOptimizerProps {
  onSelectionChange?: (selections: {
    style: string;
    pace: string;
    priority: string;
  }) => void;
}

export interface RouteDetail {
  id: string;
  name: string;
  destinations: string;
  travelTime: string;
  experienceScore: string;
  stress: "Very Low" | "Low" | "High";
  bestFor: string;
  description: string;
  highlights: string[];
}

export default function SrilankaRouteOptimizer({ onSelectionChange }: SrilankaRouteOptimizerProps) {
  // 1. Inputs State
  const [selectedStyle, setSelectedStyle] = useState<string>("first-time");
  const [selectedPace, setSelectedPace] = useState<string>("balanced");
  const [selectedPriority, setSelectedPriority] = useState<string>("scenic-train");

  // 2. Data Lists
  const stylesList = [
    { id: "first-time", label: "First-Time Visitor", icon: Backpack, desc: "See the absolute must-visits" },
    { id: "honeymoon", label: "Honeymoon & Couples", icon: Heart, desc: "Intimate settings, slower pacing" },
    { id: "family", label: "Family Travelers", icon: Users, desc: "Kid-friendly comfort & safety" },
    { id: "adventure", label: "Adventure Seeker", icon: Compass, desc: "Hiking, safari & leopard tracking" },
    { id: "culture", label: "Culture & Heritage", icon: Palmtree, desc: "UNESCO ruins & sacred shrines" }
  ];

  const pacesList = [
    { id: "relaxed", label: "Relaxed Pace", desc: "Unpack slowly, linger longer" },
    { id: "balanced", label: "Balanced Pace", desc: "Best mix of sightseeing & rest" },
    { id: "fast-paced", label: "Fast-Paced Pace", desc: "Cover maximum ground daily" }
  ];

  const prioritiesList = [
    { id: "scenic-train", label: "Scenic Train", icon: Train, desc: "Highland mist observation rail" },
    { id: "wildlife", label: "Wildlife Safari", icon: Compass, desc: "Leopard tracking in national reserves" },
    { id: "nature", label: "Nature & Tea Hills", icon: ThumbsUp, desc: "Misty peak hikes and tea estates" },
    { id: "temples", label: "Ancient Temples", icon: Palmtree, desc: "Sigiriya Lion Rock & Kandy tooth relic" },
    { id: "relaxation", label: "Coastal Rest", icon: Heart, desc: "Colonial Galle fort & golden bays" }
  ];

  // 3. Official Routes
  const routesDatabase: Record<string, RouteDetail> = {
    relaxed: {
      id: "relaxed",
      name: "Relaxed Route: Tea Country Slow Escape",
      destinations: "Kandy → Nuwara Eliya → Ella",
      travelTime: "5 Hours Total Driving",
      experienceScore: "8/10",
      stress: "Very Low",
      bestFor: "Romance, couples, honeymooners, and families traveling with elders demanding physical ease and luxury pools.",
      description: "Skips the dusty ancient plains of the dry North entirely. Leverages Southern Expressway links to transition easily, giving you double-night relaxation and cozy mountain tea estate views.",
      highlights: [
        "Keeps total in-car transit at an ultra-low 5 hours, by far the least exhausting way to visit Sri Lanka.",
        "Focuses cleanly on romantic misty atmospheres, Colonial boutique tea villas, and high-quality meals.",
        "Features the best observation cabin rail segments from Nuwara Eliya to Ella."
      ]
    },
    balanced: {
      id: "balanced",
      name: "Balanced Route: The Classic Highland Loop",
      destinations: "Sigiriya → Kandy → Ella",
      travelTime: "8.5 Hours Total Driving",
      experienceScore: "9/10",
      stress: "Low",
      bestFor: "First-time visitors, families with children, and travelers seeking deep cultural exposure without fatigue.",
      description: "This is Sri Lanka's cultural crown loop. It optimizes geographic order to prevent travel exhaustion, reserving plenty of daylight for Sigiriya climbs, rail journeys, and relaxing.",
      highlights: [
        "Perfect 2-night bases in Sigiriya and Ella so you do not unpack your bags every single morning.",
        "Cuts out 6+ hours of hot tarmac driving by bypassing the extreme southern sand bays on short trips.",
        "Includes the breathtaking highland mountain railway crossing scenic pine canyons."
      ]
    },
    "fast-paced": {
      id: "fast-paced",
      name: "Fast-Paced Route: Grand Cross-Island Conquest",
      destinations: "Sigiriya → Kandy → Ella → Yala → Galle",
      travelTime: "14 Hours Total Driving",
      experienceScore: "7/10",
      stress: "High",
      bestFor: "High-stamina backpackers and checklist climbers who must compress everything into 7 days.",
      description: "Forces nearly the entire island map (ruins, mountains, safaris, forts, and beaches) into 1 week. It hits stunning hot spots but leaves you with very high driving fatigue.",
      highlights: [
        "Checklist perfection: Sigiriya ruins, Kandy lakes, Ella peaks, Yala leopards, and Galle ramparts.",
        "Mandates private chauffeur driving for 4-5 hours daily on winding mountain hairpins.",
        "Requires unpacking and checking out of a different hotel practically every night of the week."
      ]
    }
  };

  const currentRoute = routesDatabase[selectedPace] || routesDatabase.balanced;

  // 4. Dynamic Warnings Engine
  const getActiveWarnings = (): string[] => {
    const warnings: string[] = [];

    if (selectedPace === "fast-paced") {
      warnings.push("⚠ You may be trying to fit too much into your trip. Packing ruins, tea peaks, safaris, and beaches in 7 days reduces actual relaxation.");
      warnings.push("⚠ This route may involve long travel days. Drivers will face complex mountain hairpins with daily vehicle transits averaging 4.5+ hours.");
      warnings.push("⚠ Consider slowing down to improve your overall experience. Switching to a 'Balanced Pace' cuts driving times by 40% and preserves your energy.");
    }

    if (selectedStyle === "honeymoon" && selectedPace === "fast-paced") {
      warnings.push("⚠ Romantic Mood Warning: The fast-paced loop forces daily hotel checkout rushes which can trigger high travel friction on couples' celebrations.");
    }

    if (selectedStyle === "family" && selectedPace === "fast-paced") {
      warnings.push("⚠ Kids Comfort Warning: Prolonged car rides on narrow winding roads are highly prone to causing car-sickness in children.");
    }

    return warnings;
  };

  const activeWarnings = getActiveWarnings();

  // 5. Build dynamic personalized explanation
  const getDynamicCustomFit = () => {
    const styleLabel = stylesList.find(s => s.id === selectedStyle)?.label || "your style";
    const priorityLabel = prioritiesList.find(p => p.id === selectedPriority)?.label || "your preferences";

    if (selectedPace === "relaxed") {
      return `Since you are a ${styleLabel} looking for a slow sensory experience focusing on ${priorityLabel}, our 5-hour Relaxed Route is a pristine fit. It drops dusty archaeological loops entirely to maximize long pools hours, premium Ceylon tea dining, and scenic walks with zero hotel-hopping weariness.`;
    } else if (selectedPace === "balanced") {
      return `As a ${styleLabel} looking for the ultimate sweet spot prioritizing ${priorityLabel}, our 8.5-hour Balanced Route is the perfect formula. It keeps transit times highly manageable (only 1.2 hrs/day average), uses dual-night base stays, and lets you experience the absolute cultural peaks and misty Ella mountains in deep comfort.`;
    } else {
      return `You have selected a high-intensity checklist approach. While it matches a high-stamina ${styleLabel} focused on seeing ${priorityLabel}, we heavily caution you on the physical toll. This route covers vast distances over 14 hours behind the windshield. Ensure you book a premium comfort car to survive the winding roads.`;
    }
  };

  const activeFitExplanation = getDynamicCustomFit();

  // 6. Handle Change & Callbacks
  const handleStyleChange = (id: string) => {
    setSelectedStyle(id);
    trackEvent("optimizer_style_change", "engagement", id);
  };

  const handlePaceChange = (id: string) => {
    setSelectedPace(id);
    trackEvent("optimizer_pace_change", "engagement", id);
  };

  const handlePriorityChange = (id: string) => {
    setSelectedPriority(id);
    trackEvent("optimizer_priority_change", "engagement", id);
  };

  // Keep reference to latest callback to avoid re-triggering effect on callback re-creation
  const callbackRef = useRef(onSelectionChange);
  useEffect(() => {
    callbackRef.current = onSelectionChange;
  }, [onSelectionChange]);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current({
        style: selectedStyle,
        pace: selectedPace,
        priority: selectedPriority
      });
    }
  }, [selectedStyle, selectedPace, selectedPriority]);

  const handleScrollToConcierge = () => {
    trackEvent("optimizer_cta_click", "conversion", `${selectedStyle}_${selectedPace}`);
    const el = document.getElementById("concierge-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#FAF8F5] rounded-[32px] border border-luxury-black/5 shadow-2xl overflow-hidden" id="sri-lanka-route-optimizer">
      {/* HEADER SECTION */}
      <div className="bg-luxury-green text-white p-6 md:p-10 border-b border-luxury-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-gold/5 rounded-full filter blur-[80px]" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-luxury-gold/20 border border-luxury-gold/30 px-3.5 py-1 rounded-full text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Sri Lanka Route Optimizer
          </div>
          <h2 className="text-2xl md:text-4xl font-serif text-white tracking-tight">
            Which Route Avoids <span className="italic text-luxury-gold">Road Weariness?</span>
          </h2>
          <p className="text-xs md:text-sm text-luxury-cream/70 max-w-xl font-light">
            Adjust your pace and travel parameters below. Our interactive decision engine calculates driving hours and warns you where fatigue risks lie.
          </p>
        </div>
      </div>

      {/* THREE-COLUMN GRID / TWO-COLUMN LAYOUT OPTIMIZED FOR MOBILE */}
      <div className="grid lg:grid-cols-12 gap-0">
        
        {/* INPUTS COLUMN: 12 on mobile, 5 on desktop */}
        <div className="lg:col-span-5 p-4 sm:p-6 md:p-8 bg-white border-b lg:border-b-0 lg:border-r border-luxury-black/5 space-y-6">
          
          {/* STEP 1: TRAVEL STYLE - Stacked vertically for mobile touch precision */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-black/40 font-bold block flex items-center gap-2">
              <span className="w-5 h-5 bg-luxury-green text-luxury-gold text-[10px] rounded-full flex items-center justify-center font-bold font-mono">1</span>
              Travel Style Selection
            </label>
            <div className="space-y-1.5">
              {stylesList.map((style) => {
                const Icon = style.icon;
                const isSelected = selectedStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => handleStyleChange(style.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 min-h-[46px] ${
                      isSelected 
                        ? "bg-luxury-green text-white border-luxury-green shadow-md" 
                        : "bg-luxury-cream/30 text-luxury-black hover:bg-luxury-cream/60 border-luxury-black/5"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 transition-colors mt-0.5 ${
                      isSelected ? "bg-luxury-gold/20 text-luxury-gold" : "bg-luxury-green/10 text-luxury-green"
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold flex items-center gap-1.5 text-xs">
                        {style.label}
                        {isSelected && <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full inline-block animate-ping" />}
                      </p>
                      <p className={`text-[10px] font-light ${isSelected ? "text-luxury-cream/85" : "text-luxury-black/50"}`}>
                        {style.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: TRIP PACE - Thumb-friendly responsive buttons */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-black/40 font-bold block flex items-center gap-2">
              <span className="w-5 h-5 bg-luxury-green text-luxury-gold text-[10px] rounded-full flex items-center justify-center font-bold font-mono">2</span>
              Preferred Trip Pace
            </label>
            <div className="space-y-1.5">
              {pacesList.map((p) => {
                const isSelected = selectedPace === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePaceChange(p.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between min-h-[46px] ${
                      isSelected 
                        ? "bg-luxury-gold text-luxury-black border-luxury-gold shadow-md font-bold" 
                        : "bg-luxury-cream/30 text-luxury-black hover:bg-luxury-cream/60 border-luxury-black/5"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="font-bold text-xs">{p.label}</p>
                      <p className={`text-[10px] font-light ${isSelected ? "text-luxury-black/70" : "text-luxury-black/50"}`}>
                        {p.desc}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? "border-luxury-black bg-luxury-black text-luxury-gold" : "border-luxury-black/10"
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: PRIORITIES - Stacking as thumb-friendly list on mobile */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] text-luxury-black/40 font-bold block flex items-center gap-2">
              <span className="w-5 h-5 bg-luxury-green text-luxury-gold text-[10px] rounded-full flex items-center justify-center font-bold font-mono">3</span>
              Select Key Priority
            </label>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5">
              {prioritiesList.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPriority === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePriorityChange(p.id)}
                    className={`text-left p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-2.5 ${
                      isSelected 
                        ? "bg-luxury-green text-white border-luxury-green shadow-xs font-bold" 
                        : "bg-white text-luxury-black/80 hover:bg-white border-luxury-black/5"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-luxury-gold" : "text-luxury-green/60"}`} />
                    <span className="truncate text-xs">{p.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-luxury-gold ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* OUTPUT COLUMN: Recommendation and details */}
        <div className="lg:col-span-7 p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-6 bg-[#FAF9F6]">
          <div className="space-y-5">
            
            {/* Header Badge */}
            <div className="border-b border-luxury-black/5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-bold block">Decision Matrix Output</span>
                <h4 className="text-lg font-serif text-luxury-green font-bold">Recommended Route Blueprint</h4>
              </div>
              <div className="inline-flex bg-luxury-green text-white px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-bold">
                🔒 Pacing Score: {selectedPace === "relaxed" ? "98%" : selectedPace === "balanced" ? "92%" : "44%"}
              </div>
            </div>

            {/* MAIN DYNAMIC OUTPUT CARD */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPace}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-luxury-black/5 p-4 sm:p-6 space-y-5 shadow"
              >
                {/* Visual Route Info */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-luxury-gold tracking-widest font-bold block">
                    RECOMMENDED ROUTE
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-luxury-green font-bold leading-snug">
                    {currentRoute.name}
                  </h3>
                  <div className="text-xs font-mono font-bold text-luxury-gold uppercase tracking-wider bg-luxury-cream/40 p-2 rounded-lg border border-luxury-gold/10">
                    Map Axis: {currentRoute.destinations}
                  </div>
                </div>

                {/* Specific outputs */}
                <div className="grid grid-cols-3 gap-2 text-center border-y border-luxury-black/5 py-4 my-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-mono text-luxury-black/40 block">Travel Time</span>
                    <span className="text-xs sm:text-sm font-bold text-luxury-green font-mono">{currentRoute.travelTime}</span>
                  </div>
                  <div className="space-y-0.5 border-x border-luxury-black/5">
                    <span className="text-[9px] uppercase font-mono text-luxury-black/40 block">Experience Score</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-600 font-serif">{currentRoute.experienceScore}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-mono text-luxury-black/40 block">Stress Level</span>
                    <span className={`text-xs sm:text-sm font-bold font-mono tracking-tight uppercase ${
                      currentRoute.stress === "High" ? "text-red-600" : currentRoute.stress === "Low" ? "text-teal-600" : "text-emerald-600"
                    }`}>
                      {currentRoute.stress}
                    </span>
                  </div>
                </div>

                {/* Best For */}
                <div className="space-y-1 bg-luxury-cream/15 p-3 rounded-xl border border-luxury-black/[0.03]">
                  <span className="text-[10px] font-bold text-luxury-green uppercase tracking-wide flex items-center gap-1.5 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-luxury-gold shrink-0" /> Best For:
                  </span>
                  <p className="text-xs text-luxury-black/75 leading-relaxed font-light">
                    {currentRoute.bestFor}
                  </p>
                </div>

                {/* Why This Route Fits You */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-luxury-green uppercase tracking-wide font-mono">
                    Why This Route Fits You:
                  </span>
                  <p className="text-xs text-luxury-black/70 leading-relaxed font-light">
                    {activeFitExplanation}
                  </p>
                </div>

                {/* Highlights Checklist */}
                <div className="space-y-2 pt-2 border-t border-luxury-black/5">
                  <p className="text-[10px] uppercase text-luxury-black/40 tracking-wider font-bold">Key Route Optimizations Included:</p>
                  <div className="space-y-1.5">
                    {currentRoute.highlights.map((hlt, i) => (
                      <div key={i} className="flex gap-2 items-start text-xs text-luxury-black/70">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="font-light">{hlt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* CONTEXTUAL WARNING SYSTEM CARD */}
            <AnimatePresence>
              {activeWarnings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-red-50/50 border border-red-100 rounded-2xl p-4 space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-red-700 font-semibold text-xs">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Transit Fatigue Risk Profile Warnings</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeWarnings.map((warn, i) => (
                      <p key={i} className="text-[11px] text-red-800 leading-relaxed font-light pl-5 relative">
                        <span className="absolute left-0 top-0 text-red-500">•</span>
                        {warn.replace("⚠ ", "")}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* DRIVER CONVERSION ZONE - CTA CARD */}
          <div className="pt-2">
            <div className="bg-luxury-green text-white p-5 rounded-2xl border border-luxury-gold/20 relative overflow-hidden flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
              <div className="space-y-1 relative z-10">
                <h4 className="font-serif text-sm text-white font-bold tracking-tight">Do Not Settle For Travel Exhaustion</h4>
                <p className="text-[10px] text-white/75 max-w-sm font-light">
                  Avoid winding road weariness. Let us lock in your private AC English-speaking chauffeur-guide and reserved observation cabin train tickets today.
                </p>
              </div>
              <button
                type="button"
                onClick={handleScrollToConcierge}
                className="w-full xs:w-auto shrink-0 px-4 py-2.5 bg-luxury-gold hover:bg-white text-luxury-black font-bold uppercase tracking-wider text-[10px] transition-all rounded-full flex items-center justify-center gap-1.5 hover:scale-105 cursor-pointer"
              >
                <span>Customize This Route Now</span>
                <ArrowRight className="w-3 h-3 text-luxury-black" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
