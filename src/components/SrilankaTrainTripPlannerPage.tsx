import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  Train, 
  MapPin, 
  Compass, 
  Sun, 
  CloudRain, 
  CloudFog,
  Users, 
  Ticket, 
  TrendingUp, 
  Coins, 
  Activity, 
  Eye, 
  Coffee, 
  Hotel, 
  Utensils, 
  ChevronRight, 
  Sparkles, 
  Map as MapIcon, 
  Navigation, 
  Heart, 
  Info, 
  Lock, 
  Settings, 
  Layers, 
  Route,
  Camera,
  AlertTriangle,
  Flame,
  Award,
  ArrowRight,
  Maximize2,
  Check,
  Calendar,
  DollarSign,
  Clock,
  Share2,
  Download,
  Bookmark,
  Sparkle,
  ArrowLeftRight,
  Sliders,
  HelpCircle,
  EyeOff,
  Percent,
  BookOpen
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as ChartTooltip, 
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { trainRoutes, Station, POI, TrainRoute } from "../data/trainRoutes";
import { trackEvent } from "../lib/analytics";

// Extract Google Maps API Key
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY" && API_KEY.trim() !== "";

// Component to render custom Polyline on Google Maps
function TrainTrackPolyline({ path, color }: { path: google.maps.LatLngLiteral[]; color: string }) {
  const map = useMap();
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !path || path.length === 0) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    polylineRef.current = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 4,
    });

    polylineRef.current.setMap(map);

    // Zoom map to bounds of polyline
    const bounds = new google.maps.LatLngBounds();
    path.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds);

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, path, color]);

  return null;
}

export default function SrilankaTrainTripPlannerPage() {
  usePageMetadata({
    title: "AI Train Experience Predictor - Sri Lanka Rail Planner",
    description: "An elegant AI decision platform to predict, compare, and map Sri Lanka's beautiful train journeys with live weather, crowd levels, and seat intelligence.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-train-trip-planner",
    ogUrl: "https://plan-srilanka.com/sri-lanka-train-trip-planner"
  });

  // --- Theme State (Elegant Light / Obsidian Dark) ---
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // --- Trip Details Form State ---
  const [selectedRouteId, setSelectedRouteId] = useState<string>("highland");
  const [fromStationId, setFromStationId] = useState<string>("colombo-fort");
  const [toStationId, setToStationId] = useState<string>("ella");
  const [travelDate, setTravelDate] = useState<string>("2026-08-20");
  const [passengers, setPassengers] = useState<number>(2);
  const [nationality, setNationality] = useState<string>("International");
  const [budgetTier, setBudgetTier] = useState<string>("premium");
  const [travelStyle, setTravelStyle] = useState<string>("Photography");
  const [preferredClass, setPreferredClass] = useState<string>("2nd Reserved");

  // --- Experience Preference Sliders (0-100) ---
  const [sliders, setSliders] = useState({
    scenery: 85,
    comfort: 70,
    budget: 50,
    photography: 90,
    avoidCrowds: 60,
    adventure: 75,
    luxury: 55,
    familyFriendly: 45
  });

  // --- Interactive/Simulated State ---
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStage, setGenerationStage] = useState<string>("");
  const [hasGenerated, setHasGenerated] = useState<boolean>(true); // initially true for beautiful pre-load, updates on generate click
  const [savedJourneys, setSavedJourneys] = useState<boolean>(false);
  const [compareMonth, setCompareMonth] = useState<string>("December");
  const [compareClass, setCompareClass] = useState<string>("1st Class");
  const [selectedComparisonTab, setSelectedComparisonTab] = useState<string>("classes"); // classes, dates, routes

  // --- Map Layer Controls State ---
  const [layers, setLayers] = useState({
    hotels: true,
    restaurants: true,
    scenic: true,
    weather: true,
    elevation: true,
    stops: true
  });

  // --- Active Station State ---
  const [selectedStationId, setSelectedStationId] = useState<string>("ella");
  const [hoveredStationId, setHoveredStationId] = useState<string | null>(null);

  // --- Active Info Window State on Google Maps ---
  const [activePoi, setActivePoi] = useState<POI | null>(null);
  const [activeStation, setActiveStation] = useState<Station | null>(null);

  // --- Find Active Route & Stations ---
  const activeRoute = useMemo(() => {
    return trainRoutes.find(r => r.id === selectedRouteId) || trainRoutes[0];
  }, [selectedRouteId]);

  const activeStationDetails = useMemo(() => {
    return activeRoute.stations.find(s => s.id === selectedStationId) || activeRoute.stations[0];
  }, [activeRoute, selectedStationId]);

  // Set default stations when route changes
  useEffect(() => {
    if (activeRoute.stations.length > 0) {
      setFromStationId(activeRoute.stations[0].id);
      setToStationId(activeRoute.stations[activeRoute.stations.length - 1].id);
      setSelectedStationId(activeRoute.stations[Math.floor(activeRoute.stations.length / 2)].id);
    }
  }, [selectedRouteId]);

  // Handle Layer Toggle
  const toggleLayer = (layerName: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
    trackEvent("toggle_layer", "map_interaction", String(layerName));
  };

  // --- AI DECISION & PREDICTION ENGINE ---
  const predictions = useMemo(() => {
    // Determine month string from date
    const dateObj = new Date(travelDate);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const travelMonth = isNaN(dateObj.getTime()) ? "August" : months[dateObj.getMonth()];

    // Calculations based on style, budget, sliders, month, and route
    let scoreBase = 75;
    
    // Sliders alignment
    const scenicWeight = sliders.scenery / 100;
    const comfortWeight = sliders.comfort / 100;
    const budgetWeight = sliders.budget / 100;
    const photoWeight = sliders.photography / 100;
    const crowdWeight = (100 - sliders.avoidCrowds) / 100; // high avoid crowd means lower tolerance for unreserved
    const luxuryWeight = sliders.luxury / 100;

    let overallScore = scoreBase;
    
    // Adjust overall score depending on travel style and route selection
    if (selectedRouteId === "highland") {
      overallScore += scenicWeight * 15;
      overallScore += photoWeight * 10;
      if (travelStyle === "Photography" || travelStyle === "Adventure") overallScore += 8;
      if (travelStyle === "Luxury") overallScore += luxuryWeight * 8;
    } else if (selectedRouteId === "ocean") {
      overallScore += scenicWeight * 10;
      overallScore += comfortWeight * 8;
      if (travelStyle === "Honeymoon" || travelStyle === "Solo") overallScore += 7;
    } else {
      overallScore += comfortWeight * 12;
      if (travelStyle === "Cultural" || travelStyle === "Backpacker") overallScore += 9;
    }

    // Budget alignment
    if (budgetTier === "luxury" && sliders.luxury > 70) overallScore += 6;
    if (budgetTier === "budget" && sliders.budget > 70) overallScore += 5;

    // Dual monsoon impact prediction
    const wetMonthsHighland = ["May", "June", "September", "October"];
    const wetMonthsCoastal = ["May", "June", "September", "October", "November"];
    
    let rainProbability = 15;
    let fogProbability = 20;
    let visibility = "95% (Excellent)";
    let sunIndex = 85;
    let tempRange = "24 - 30°C";
    let delayProbability = "5% (Minimal)";
    let weatherScore = 92;
    let weatherBadge = "Excellent";

    if (selectedRouteId === "highland") {
      tempRange = "14 - 22°C";
      if (wetMonthsHighland.includes(travelMonth)) {
        rainProbability = 78;
        fogProbability = 82;
        visibility = "25% (Challenging)";
        sunIndex = 25;
        delayProbability = "65% (Heavy monsoon signal pauses)";
        weatherScore = 48;
        weatherBadge = "Poor";
        overallScore -= 12; // lower satisfaction due to downpours and zero viewpoint visibility
      } else if (["December", "January", "February"].includes(travelMonth)) {
        rainProbability = 12;
        fogProbability = 30;
        visibility = "90% (Stunning Peaks)";
        sunIndex = 92;
        delayProbability = "8% (Rare technical resets)";
        weatherScore = 96;
        weatherBadge = "Excellent";
        overallScore += 10;
      } else {
        // Shoulder season
        rainProbability = 45;
        fogProbability = 50;
        visibility = "65% (Misty afternoons)";
        sunIndex = 65;
        delayProbability = "20% (Low weather delay)";
        weatherScore = 75;
        weatherBadge = "Good";
      }
    } else if (selectedRouteId === "ocean") {
      tempRange = "27 - 32°C";
      if (wetMonthsCoastal.includes(travelMonth)) {
        rainProbability = 82;
        fogProbability = 10;
        visibility = "40% (Overcast sunsets)";
        sunIndex = 20;
        delayProbability = "40% (High tide track sprays)";
        weatherScore = 42;
        weatherBadge = "Poor";
        overallScore -= 15;
      } else if (["December", "January", "February", "March"].includes(travelMonth)) {
        rainProbability = 8;
        fogProbability = 5;
        visibility = "98% (Perfect Sunsets)";
        sunIndex = 95;
        delayProbability = "2% (Negligible)";
        weatherScore = 98;
        weatherBadge = "Excellent";
        overallScore += 12;
      } else {
        rainProbability = 35;
        visibility = "75% (Occasional clouds)";
        sunIndex = 70;
        weatherScore = 80;
        weatherBadge = "Good";
      }
    } else {
      // Northern Line
      tempRange = "29 - 34°C";
      if (["November", "December"].includes(travelMonth)) {
        rainProbability = 65;
        sunIndex = 40;
        visibility = "60%";
        weatherScore = 65;
        weatherBadge = "Fair";
      } else {
        rainProbability = 10;
        sunIndex = 90;
        visibility = "95%";
        weatherScore = 90;
        weatherBadge = "Excellent";
      }
    }

    // Crowd & Density prediction
    let touristDensity = 55;
    let expectedWaiting = "15 mins";
    let peakHours = "08:00 AM - 11:30 AM";
    let recommendedTime = "06:30 AM (Morning Air)";
    let crowdScore = 55;
    let crowdReason = "Steady travel volume";

    if (["December", "January", "February", "August"].includes(travelMonth)) {
      touristDensity = 95;
      expectedWaiting = "1.5 hours at counter";
      crowdScore = 92;
      crowdReason = "Peak global holidays. Tickets resell at massive markup. Carriages are ultra-packed.";
      overallScore -= 8;
    } else if (["May", "June", "September"].includes(travelMonth)) {
      touristDensity = 25;
      expectedWaiting = "5 mins";
      crowdScore = 28;
      crowdReason = "Monsoon off-season. Serene carriages, easy counter-boarding, empty door-steps.";
      overallScore += 5;
    }

    // Class recommendations evaluation
    let bestClass = "2nd Class Reserved";
    let classConfidence = 85;
    let reasons = [];
    let sideTip = "Right side for valleys";

    if (sliders.comfort > 75 || sliders.luxury > 70) {
      bestClass = "1st Class Observation / AC";
      classConfidence = 94;
      reasons = ["Climate-sealed peaceful atmosphere", "Premium reclining cushioned seats", "Quiet environment to read or sleep"];
      sideTip = selectedRouteId === "highland" ? "Right side seats from Kandy to Ella for sprawling valleys" : "Right side for the coastal wave breakers";
    } else if (sliders.photography > 75 || sliders.adventure > 70) {
      bestClass = "2nd Class Reserved (Open Windows)";
      classConfidence = 98;
      reasons = ["Windows can be pushed open fully for photos", "Access to open vestibules to feel the mountain breeze", "Unrestricted viewpoints without glass reflections"];
      sideTip = selectedRouteId === "highland" ? "Left side from Nanu Oya to Ella for Nine Arch Bridge view" : "Right side for ocean sunsets departing Colombo";
    } else if (sliders.budget > 75) {
      bestClass = "3rd Class Unreserved (Local Vibe)";
      classConfidence = 80;
      reasons = ["Dirt-cheap price accessible instantly on platform", "Vibrant local interactions with vendors", "Acoustic music and local snacks on board"];
      sideTip = "Hanging near the carriage doorway is the best spot";
    } else {
      bestClass = "2nd Class Reserved";
      classConfidence = 90;
      reasons = ["Perfect balance of budget and reserved seat peace", "Open windows for mountain breeze", "Safe luggage overhead space"];
      sideTip = "Right side for all-round estate views";
    }

    // Risk Predictor scores
    let bookingRisk = 40;
    let delayRisk = 15;
    let scamRisk = 20;
    let weatherRisk = 25;
    let holidayRisk = 10;

    if (["December", "January", "February"].includes(travelMonth)) {
      bookingRisk = 95; // peak season booking risk
      holidayRisk = 85;
      scamRisk = 65; // agent markups
    }
    if (rainProbability > 70) {
      delayRisk = 75;
      weatherRisk = 80;
    }

    const overallJourneyRisk = Math.round((bookingRisk + delayRisk + scamRisk + weatherRisk) / 4);
    const safetyScore = 100 - Math.round(delayRisk * 0.3 + scamRisk * 0.5);

    // Official vs Agency Price Indexing
    let baseTicketPrice = 15;
    if (bestClass.includes("1st")) baseTicketPrice = 40;
    else if (bestClass.includes("3rd")) baseTicketPrice = 4;

    const agencyPrice = baseTicketPrice * 3.5;
    const fairPriceScore = 90;
    const expectedSavings = agencyPrice - baseTicketPrice;

    // Bounds limit overallScore
    overallScore = Math.min(99, Math.max(50, Math.round(overallScore)));

    return {
      overallScore,
      confidenceScore: Math.round(90 + (sliders.comfort + sliders.scenery) / 20),
      travelMonth,
      weather: {
        rainProbability,
        fogProbability,
        visibility,
        sunIndex,
        tempRange,
        delayProbability,
        weatherScore,
        weatherBadge
      },
      crowds: {
        density: touristDensity,
        waitingTime: expectedWaiting,
        peakHours,
        recommendedTime,
        crowdScore,
        reason: crowdReason
      },
      bestClass,
      classConfidence,
      reasons,
      sideTip,
      risks: {
        bookingRisk,
        delayRisk,
        scamRisk,
        weatherRisk,
        holidayRisk,
        safetyScore,
        overallJourneyRisk
      },
      price: {
        baseTicketPrice,
        agencyPrice,
        fairPriceScore,
        expectedSavings
      }
    };
  }, [selectedRouteId, travelDate, budgetTier, travelStyle, sliders]);

  // Run dynamic progress simulator
  const handleGenerateExperience = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setHasGenerated(false);
    
    trackEvent("generate_prediction", "ai_platform", selectedRouteId);

    const stages = [
      { prg: 15, msg: "Connecting to Sri Lanka Meteorological Department satellite feeds..." },
      { prg: 35, msg: "Analyzing historical crowd levels and ticketing speed indices..." },
      { prg: 60, msg: "Simulating mountain locomotive weight constraints and signal logs..." },
      { prg: 80, msg: "Correlating seat orientation with route visual highlights..." },
      { prg: 95, msg: "Calculating risk profiles, scam safety indexes, and budget options..." },
      { prg: 100, msg: "Experience profile synthesized! Loading report..." }
    ];

    let currentStageIndex = 0;

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setHasGenerated(true);
            // Smooth scroll to results
            const resultsPane = document.getElementById("results-dashboard-anchor");
            if (resultsPane) {
              resultsPane.scrollIntoView({ behavior: "smooth" });
            }
          }, 400);
          return 100;
        }

        const nextProgress = prev + Math.floor(Math.random() * 8) + 4;
        const currentPrg = Math.min(100, nextProgress);

        // Find match stage
        const matchingStage = stages.find(s => currentPrg <= s.prg);
        if (matchingStage) {
          setGenerationStage(matchingStage.msg);
        }

        return currentPrg;
      });
    }, 180);
  };

  // Simulated Save Journey handler
  const handleSaveJourney = () => {
    setSavedJourneys(true);
    trackEvent("save_journey", "user_action", selectedRouteId);
    alert("✨ Your predicted train journey has been saved to your Plan Sri Lanka profile drawer.");
  };

  // Simulated Share Journey handler
  const handleShareJourney = () => {
    trackEvent("share_journey", "user_action", selectedRouteId);
    navigator.clipboard.writeText(window.location.href);
    alert("🔗 Shareable simulation dashboard URL copied to clipboard successfully!");
  };

  // Elevation data
  const chartData = useMemo(() => {
    return activeRoute.stations.map(s => ({
      name: s.name,
      altitude: s.elevation,
      distance: s.distance,
      station: s
    }));
  }, [activeRoute]);

  // Map coordinates
  const routeCoordinates = useMemo(() => {
    return activeRoute.stations.map(s => ({ lat: s.lat, lng: s.lng }));
  }, [activeRoute]);

  // Projected SVG coordinates for simulation map
  const svgProjectedPoints = useMemo(() => {
    if (activeRoute.stations.length === 0) return [];
    const lats = activeRoute.stations.map(s => s.lat);
    const lngs = activeRoute.stations.map(s => s.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;

    const width = 500;
    const height = 620;
    const padding = 60;

    return activeRoute.stations.map(s => {
      const x = padding + ((s.lng - minLng) / lngRange) * (width - 2 * padding);
      const y = height - padding - ((s.lat - minLat) / latRange) * (height - 2 * padding);
      return { station: s, x, y };
    });
  }, [activeRoute]);

  const handleStationClick = (stationId: string) => {
    setSelectedStationId(stationId);
    trackEvent("select_station", "map_navigation", stationId);
    
    const element = document.getElementById(`station-detail-view`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode ? "bg-[#0b120e] text-[#f0f4f1]" : "bg-[#fdfbf7] text-[#121915]"
    } pt-24 pb-20`}>
      
      {/* GLOW DECORATIONS (GLASSMORPHISM EFFECT) */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-emerald-950/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* FIXED FLOATING ACTION PANEL */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3.5 rounded-full border shadow-2xl backdrop-blur-md transition-all flex items-center justify-center ${
            darkMode 
              ? "bg-[#16271c] text-[#d4af37] border-emerald-800/50 hover:bg-[#1e3425]" 
              : "bg-white text-emerald-950 border-amber-800/15 hover:bg-amber-50/50"
          }`}
          title="Toggle Screen Aura"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <CloudFog className="w-5 h-5 text-emerald-950" />}
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 mb-12">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[460px] md:h-[520px] flex items-center">
          {/* Hero background image */}
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 hover:scale-105" style={{
            backgroundImage: `url(${activeRoute.image})`
          }} />
          {/* Apple/Airbnb premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
          
          <div className="relative z-10 px-8 md:px-16 max-w-3xl space-y-6 text-white">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/35 px-4 py-1.5 rounded-full backdrop-blur-md text-amber-300 font-mono text-[10px] uppercase tracking-widest animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Sri Lanka Rail Intelligence Suite</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif leading-tight tracking-tight text-white font-semibold">
              AI Train <br className="hidden md:block" />
              <span className="text-[#d4af37] italic font-light">Experience Predictor</span>
            </h1>
            
            <p className="text-sm md:text-lg text-gray-200/90 font-light leading-relaxed max-w-xl">
              An elegant decision engine forecasting microclimatic weather, booking risk indexes, real-time ticket inflation, and crowding density before you travel.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  const element = document.getElementById("trip-configurator-section");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3.5 bg-[#d4af37] text-emerald-950 hover:bg-[#c5a059] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 scale-100 hover:scale-105"
              >
                <span>Configure My Journey</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <Link
                to="/how-to-plan-a-train-trip-in-sri-lanka"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors backdrop-blur-sm border border-white/10 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>Read Planning Handbook</span>
              </Link>
            </div>
          </div>

          {/* Floating badge details */}
          <div className="absolute bottom-6 right-8 hidden lg:flex items-center gap-4 bg-black/75 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-xs text-white">
              <span className="opacity-50 block font-mono text-[9px]">ACTIVE CLUSTER</span>
              <span className="font-serif font-bold text-amber-400">{activeRoute.displayName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE INPUT & PREFERENCES WORKBENCH */}
      <div id="trip-configurator-section" className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* LEFT COMPONENT: TRIP DETAILS FORM */}
        <section className={`lg:col-span-6 rounded-3xl p-6 md:p-8 border transition-all ${
          darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-150/10">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#d4af37] flex items-center justify-center font-bold text-sm font-mono border border-amber-500/25">1</span>
              <div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-emerald-800 dark:text-[#f0f4f1]">Trip Blueprint</h2>
                <p className="text-[11px] opacity-60">Input logistics to calibrate the neural model</p>
              </div>
            </div>
            
            {/* Quick Route Swappers */}
            <div className="flex items-center gap-1.5 bg-amber-500/5 p-1 rounded-xl border border-amber-500/15">
              {trainRoutes.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRouteId(r.id);
                    trackEvent("switched_route_selector", "inputs", r.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-bold transition-all ${
                    selectedRouteId === r.id
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "text-emerald-800/50 hover:text-emerald-800"
                  }`}
                >
                  {r.id === "highland" ? "🌋 Highland" : r.id === "ocean" ? "🌊 Coast" : "⛩️ North"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            
            {/* Dynamic Station Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600/90 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Departure Station</span>
                </label>
                <select
                  value={fromStationId}
                  onChange={(e) => setFromStationId(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                    darkMode ? "bg-emerald-950/40 border-emerald-800/40 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {activeRoute.stations.map(st => (
                    <option key={st.id} value={st.id} className={darkMode ? "bg-[#111a14]" : ""}>
                      {st.name} ({st.distance} km)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600/90 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 rotate-185" />
                  <span>Arrival Station</span>
                </label>
                <select
                  value={toStationId}
                  onChange={(e) => setToStationId(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                    darkMode ? "bg-emerald-950/40 border-emerald-800/40 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {activeRoute.stations.map(st => (
                    <option key={st.id} value={st.id} className={darkMode ? "bg-[#111a14]" : ""}>
                      {st.name} ({st.distance} km)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Date & Passengers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600/90 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Target Travel Date</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                    darkMode ? "bg-emerald-950/40 border-emerald-800/40 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600/90 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Number of Passengers</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                    darkMode ? "bg-emerald-950/40 border-emerald-800/40 text-white" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>
            </div>

            {/* Nationality & Budget Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600/90">Nationality</label>
                <div className="grid grid-cols-2 gap-2">
                  {["International", "Local Citizen"].map(n => (
                    <button
                      key={n}
                      onClick={() => setNationality(n)}
                      className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                        nationality === n
                          ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                          : darkMode
                            ? "bg-emerald-950/20 border-emerald-800/30 text-gray-400 hover:border-emerald-700"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {n === "International" ? "✈️ Tourist" : "🇱🇰 Local"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600/90">Seating Budget Level</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "budget", label: "Local Ticket" },
                    { id: "premium", label: "Reserved" },
                    { id: "luxury", label: "VIP Carriage" }
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBudgetTier(b.id)}
                      className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        budgetTier === b.id
                          ? "bg-[#d4af37] text-emerald-950 font-extrabold"
                          : darkMode
                            ? "bg-emerald-950/20 text-gray-400 border border-emerald-800/30"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Style Buttons */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600/90 block">Travel Style Persona</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {["Photography", "Backpacker", "Luxury", "Family", "Honeymoon", "Solo", "Adventure"].map(style => (
                  <button
                    key={style}
                    onClick={() => setTravelStyle(style)}
                    className={`py-2.5 px-1 text-center rounded-xl text-[10px] font-bold transition-all border ${
                      travelStyle === style
                        ? "bg-emerald-800 text-white border-emerald-800"
                        : darkMode
                          ? "bg-emerald-950/20 border-emerald-800/20 text-gray-400"
                          : "bg-gray-50 border-gray-200 text-gray-700"
                    }`}
                  >
                    {style === "Photography" && "📸 Photo"}
                    {style === "Backpacker" && "🥾 Backpack"}
                    {style === "Luxury" && "💎 Luxury"}
                    {style === "Family" && "👨‍👩‍👧 Family"}
                    {style === "Honeymoon" && "👩‍❤️‍👨 Romance"}
                    {style === "Solo" && "🚶 Solo"}
                    {style === "Adventure" && "🌋 Adventure"}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Carriage Class (Optional) */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600/90 block">Preferred Coach Class (Optional)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["1st Class AC", "2nd Reserved", "2nd Unreserved", "3rd Class Local"].map(cls => (
                  <button
                    key={cls}
                    onClick={() => setPreferredClass(cls)}
                    className={`py-2.5 rounded-lg text-[10px] font-bold border transition-all ${
                      preferredClass === cls
                        ? "border-[#d4af37] bg-amber-500/10 text-[#d4af37] font-extrabold"
                        : darkMode
                          ? "border-emerald-800/25 text-gray-500"
                          : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* RIGHT COMPONENT: EXPERIENCE PREFERENCES SLIDERS */}
        <section className={`lg:col-span-6 rounded-3xl p-6 md:p-8 border transition-all ${
          darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
        }`}>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-150/10">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#d4af37] flex items-center justify-center font-bold text-sm font-mono border border-amber-500/25">2</span>
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-emerald-800 dark:text-[#f0f4f1]">Experience Sliders</h2>
              <p className="text-[11px] opacity-60">Tune priorities to shape recommended cabins and tips</p>
            </div>
          </div>

          <div className="space-y-5">
            {[
              { key: "scenery", label: "🏞️ Scenery Priority", desc: "Waterfalls, tea slopes, or beaches" },
              { key: "comfort", label: "🛋️ Comfort & Cushioning", desc: "A/C cooling, spacious reclining chairs" },
              { key: "budget", label: "💰 Low Cost Focus", desc: "Save on booking margins" },
              { key: "photography", label: "📸 Door-Hanging / Photos", desc: "Open window viewpoints and carriage curves" },
              { key: "avoidCrowds", label: "🚪 Avoid Crowds & Queues", desc: "Prevent unreserved standing room" },
              { key: "adventure", label: "🧗 Adventure Appetite", desc: "Local snack sellers and tunnel speeds" },
              { key: "luxury", label: "👑 Luxury Level Vibe", desc: "Tea high-service, vintage salons" },
              { key: "familyFriendly", label: "👪 Family/Kids Safety", desc: "Secure restrooms and window locks" }
            ].map(slider => (
              <div key={slider.key} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold">{slider.label}</span>
                  <span className="font-mono font-bold text-[#d4af37]">
                    {sliders[slider.key as keyof typeof sliders]}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliders[slider.key as keyof typeof sliders]}
                  onChange={(e) => setSliders(prev => ({ ...prev, [slider.key]: Number(e.target.value) }))}
                  className="w-full accent-[#d4af37] h-1 bg-gray-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[9px] opacity-50 italic">{slider.desc}</p>
              </div>
            ))}

            {/* LIVE PREVIEW BANNER */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-400/20 text-xs flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-emerald-800 dark:text-[#d4af37]">Live Predictor Calibrations</span>
                <p className="opacity-75 leading-relaxed mt-0.5 text-[11px]">
                  Configured for <strong className="text-emerald-700 dark:text-emerald-300">{travelStyle}</strong> style. Model estimates a <strong className="text-[#d4af37]">{predictions.bestClass}</strong> with an overall alignment probability of <strong className="text-amber-500 font-mono text-xs">{predictions.overallScore}/100</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* GENERATE ACTION BUTTON & LOG PROGRESS VIEW */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-16">
        <AnimatePresence mode="wait">
          {!isGenerating ? (
            <motion.button
              key="button"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={handleGenerateExperience}
              className="relative group overflow-hidden px-12 py-5 bg-[#162a1e] dark:bg-emerald-900 border border-amber-500/30 text-[#d4af37] hover:text-white font-serif font-bold text-lg md:text-xl rounded-2xl shadow-2xl hover:bg-emerald-950 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="flex items-center justify-center gap-3">
                <Sparkle className="w-5 h-5 text-[#d4af37] group-hover:rotate-180 transition-transform duration-500" />
                <span>Generate My Experience</span>
                <Sparkle className="w-5 h-5 text-[#d4af37] group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-xl mx-auto rounded-3xl p-6 border text-left ${
                darkMode ? "bg-emerald-950/40 border-emerald-800/40" : "bg-white border-amber-800/15"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase font-bold text-[#d4af37] tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-spin text-[#d4af37]" />
                  <span>AI Thinking Process...</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400">{generationProgress}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-250 dark:bg-emerald-950 h-2 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-[#d4af37] to-amber-500 transition-all duration-200"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>

              {/* Log messages */}
              <p className="text-xs font-mono text-gray-500 dark:text-gray-300 italic">
                &gt; {generationStage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* RESULTS DASHBOARD */}
      {hasGenerated && (
        <div id="results-dashboard-anchor" className="max-w-7xl mx-auto px-6 space-y-8 scroll-mt-24">
          
          {/* OVERVIEW INTRO HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-150/10 pb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block font-mono">Simulated Predictive Analytics</span>
              <h2 className="text-3xl md:text-5xl font-serif text-emerald-800 dark:text-[#f0f4f1] mt-1 font-bold">
                Experience Alignment <span className="italic font-light">Dashboard</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={handleSaveJourney}
                className="px-4 py-2 bg-emerald-800/10 hover:bg-emerald-800/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 border border-emerald-800/20"
              >
                <Bookmark className="w-4 h-4" />
                <span>{savedJourneys ? "Saved" : "Save Prediction"}</span>
              </button>
              <button 
                onClick={handleShareJourney}
                className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-[#d4af37] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 border border-amber-500/20"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Suite</span>
              </button>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 border border-gray-400/20"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* BENTO GRID RESTRUCTURE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* CARD 1: OVERALL ALIGNMENT EXPERIENCE SCORE */}
            <div className={`md:col-span-4 rounded-3xl p-6 border flex flex-col justify-between transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600/90 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Overall Alignment Score</span>
                </span>
                
                <div className="py-6 flex items-center justify-center relative">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" className="stroke-gray-100 dark:stroke-emerald-950" strokeWidth="8" fill="transparent" />
                      <circle 
                        cx="80" 
                        cy="80" 
                        r="70" 
                        className="stroke-[#d4af37]" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 70}
                        strokeDashoffset={2 * Math.PI * 70 * (1 - predictions.overallScore / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-4xl font-serif font-extrabold block text-emerald-800 dark:text-white">
                        {predictions.overallScore}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-widest">
                        out of 100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[#d4af37] text-sm font-bold">
                  <span>★ ★ ★ ★ ★</span>
                  <span className="text-xs text-gray-400 font-normal">({predictions.confidenceScore}% Model Confidence)</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-emerald-950 text-xs leading-relaxed text-gray-500 dark:text-gray-300">
                <strong>Synthesized Summary:</strong> Your selected travel date in <strong className="text-amber-500">{predictions.travelMonth}</strong> on the <strong className="text-amber-500">{activeRoute.displayName}</strong> matches your <strong className="text-amber-500">{travelStyle}</strong> style exceptionally. Climate parameters and expected tourist occupancy index are fully optimized.
              </div>
            </div>

            {/* CARD 2: CLIMATE & WEATHER PREDICTOR */}
            <div className={`md:col-span-4 rounded-3xl p-6 border flex flex-col justify-between transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600/90 flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5" />
                    <span>Climatic Weather Predictor</span>
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase font-mono font-bold ${
                    predictions.weather.weatherBadge === "Excellent" 
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" 
                      : predictions.weather.weatherBadge === "Good"
                        ? "bg-amber-100 text-[#d4af37]"
                        : "bg-red-100 text-red-800"
                  }`}>
                    {predictions.weather.weatherBadge}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="space-y-1 bg-amber-500/5 p-3 rounded-2xl border border-amber-500/10">
                    <span className="text-[9px] text-gray-400 block uppercase">Temperature</span>
                    <span className="text-base font-bold text-emerald-800 dark:text-[#d4af37] font-mono">{predictions.weather.tempRange}</span>
                  </div>
                  <div className="space-y-1 bg-amber-500/5 p-3 rounded-2xl border border-amber-500/10">
                    <span className="text-[9px] text-gray-400 block uppercase">Rain Chance</span>
                    <span className="text-base font-bold text-emerald-800 dark:text-[#d4af37] font-mono">{predictions.weather.rainProbability}%</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="opacity-70">Mist & Fog Chance:</span>
                    <span className="font-bold font-mono">{predictions.weather.fogProbability}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Peak Sunshine Index:</span>
                    <span className="font-bold font-mono">{predictions.weather.sunIndex}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Mountain Visibility:</span>
                    <span className="font-bold font-mono">{predictions.weather.visibility}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-emerald-950">
                <p className="text-[11px] leading-relaxed text-gray-400">
                  ⚠️ <strong>Delay Index Forecast:</strong> Landslides risk or signals stop duration is estimated at <strong>{predictions.weather.delayProbability}</strong>.
                </p>
              </div>
            </div>

            {/* CARD 3: CROWD & OCCUPANCY FORECASTER */}
            <div className={`md:col-span-4 rounded-3xl p-6 border flex flex-col justify-between transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600/90 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Crowd Density Forecast</span>
                </span>

                <div className="py-2 space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Expected Carriage Occupancy</span>
                    <span className="text-amber-500">{predictions.crowds.density}%</span>
                  </div>
                  
                  {/* Visual gauge bar */}
                  <div className="w-full h-2.5 bg-gray-100 dark:bg-emerald-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        predictions.crowds.density > 80 
                          ? "bg-red-500" 
                          : predictions.crowds.density > 50 
                            ? "bg-[#d4af37]" 
                            : "bg-emerald-500"
                      }`}
                      style={{ width: `${predictions.crowds.density}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs bg-amber-500/5 p-3 rounded-2xl border border-amber-500/10">
                  <div className="flex justify-between">
                    <span className="opacity-70">Peak Commute Hours:</span>
                    <span className="font-bold font-mono">{predictions.crowds.peakHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Expected Platform Waiting:</span>
                    <span className="font-bold font-mono">{predictions.crowds.waitingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Optimal Boarding Departure:</span>
                    <span className="font-bold font-mono text-emerald-800 dark:text-[#d4af37]">{predictions.crowds.recommendedTime}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-emerald-950 text-[11px] leading-normal opacity-75">
                💡 <strong>Climatic telemetry:</strong> {predictions.crowds.reason}
              </div>
            </div>

            {/* CARD 4: BEST CARRIAGE CLASS RECOMMENDATIONS COMPARE */}
            <div className={`md:col-span-12 rounded-3xl p-6 md:p-8 border transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block font-mono">Bespoke Options Deck</span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-emerald-800 dark:text-[#f0f4f1] mt-0.5">Carriage Tier Comparisons</h3>
                </div>
                
                {/* Visual Highlight indicator */}
                <div className="bg-amber-500/10 text-[#d4af37] border border-amber-500/25 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>AI Optimal Match: {predictions.bestClass}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "1st Class Observation / AC",
                    score: Math.round(predictions.overallScore * 0.95),
                    comfort: "★★★★★",
                    photo: "★★★☆☆",
                    crowd: "★☆☆☆☆ (Extremely Private)",
                    price: "$35 - $45",
                    pros: "Quiet, dust-free cabin; leather seats; high reliability.",
                    cons: "Sealed double-glazed glass windows prevent door-hanging photos."
                  },
                  {
                    name: "2nd Class Reserved",
                    score: Math.round(predictions.overallScore * 0.99),
                    comfort: "★★★★☆",
                    photo: "★★★★★",
                    crowd: "★★★☆☆ (Balanced)",
                    price: "$15 - $22",
                    pros: "Pushed-up windows for breeze; allocated seat guaranteed; excellent photography.",
                    cons: "Can get noisy; seat configuration is fixed and cannot face opposite directions."
                  },
                  {
                    name: "2nd Class Unreserved",
                    score: Math.round(predictions.overallScore * 0.70),
                    comfort: "★★☆☆☆",
                    photo: "★★★★☆",
                    crowd: "★★★★☆ (Crowded)",
                    price: "$6 - $9",
                    pros: "High flexibility; purchase instantly at the station platform counters.",
                    cons: "Heavy risk of standing for 6+ hours with heavy tourist luggage."
                  },
                  {
                    name: "3rd Class Local unreserved",
                    score: Math.round(predictions.overallScore * 0.55),
                    comfort: "★☆☆☆☆",
                    photo: "★★★☆☆",
                    crowd: "★★★★★ (Dense Local Vibe)",
                    price: "$3 - $5",
                    pros: "Brilliant, rich local cultural integration; traditional spices, wade vendors.",
                    cons: "No space; seats are hard wooden/metal frames; massive luggage risk."
                  }
                ].map(cls => {
                  const isBest = cls.name.toLowerCase().includes(predictions.bestClass.split(" (")[0].toLowerCase()) || 
                                 (predictions.bestClass.toLowerCase().includes("2nd") && cls.name.includes("2nd Class Reserved"));
                  return (
                    <div 
                      key={cls.name}
                      className={`rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
                        isBest 
                          ? "bg-amber-500/5 border-[#d4af37] shadow-lg ring-2 ring-[#d4af37]/20" 
                          : "bg-gray-50/50 dark:bg-emerald-950/20 border-gray-100 dark:border-emerald-950/40 opacity-80"
                      }`}
                    >
                      {isBest && (
                        <span className="absolute -top-3 left-4 bg-[#d4af37] text-emerald-950 px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase font-bold tracking-widest shadow-md">
                          Recommended Match
                        </span>
                      )}
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-sm text-emerald-800 dark:text-[#f0f4f1] leading-tight pr-4">
                            {cls.name}
                          </h4>
                          <span className="font-mono text-xs font-bold text-[#d4af37] whitespace-nowrap">{cls.price}</span>
                        </div>

                        <div className="text-[10px] space-y-1 border-t border-b border-gray-100 dark:border-emerald-950 py-2">
                          <div className="flex justify-between">
                            <span className="opacity-60">Vibe Score:</span>
                            <span className="font-bold text-[#d4af37]">{cls.score}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Comfort:</span>
                            <span className="font-bold">{cls.comfort}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Crowding Density:</span>
                            <span className="font-semibold text-[9px]">{cls.crowd}</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-[11px] leading-relaxed">
                          <p className="text-emerald-800 dark:text-emerald-400"><strong>Pros:</strong> {cls.pros}</p>
                          <p className="text-red-500 dark:text-red-300"><strong>Cons:</strong> {cls.cons}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-150/10">
                        <button 
                          onClick={() => {
                            setCompareClass(cls.name);
                            trackEvent("selected_comparison_class", "carriage_card", cls.name);
                          }}
                          className={`w-full py-2 rounded-xl text-[9px] uppercase tracking-wider font-bold transition-all ${
                            isBest 
                              ? "bg-emerald-800 text-white" 
                              : "bg-transparent text-[#d4af37] border border-amber-500/20 hover:bg-amber-500/5"
                          }`}
                        >
                          Select for Detail Analysis
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 5: INTERACTIVE GOOGLE ROUTE MAP */}
            <div className={`md:col-span-8 rounded-3xl p-6 border transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 pb-3 border-b border-gray-100 dark:border-emerald-950">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600/90 flex items-center gap-1">
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>Interactive Route Canvas Overlay</span>
                  </span>
                  <h3 className="font-serif font-bold text-lg text-emerald-800 dark:text-white mt-0.5">
                    Map Track Visualizer ({activeRoute.name})
                  </h3>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedStationId(activeRoute.stations[0].id);
                    setActiveStation(null);
                    setActivePoi(null);
                  }}
                  className="text-[10px] uppercase font-bold text-[#d4af37] hover:text-emerald-800 flex items-center gap-1 self-end sm:self-auto"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Center Start View</span>
                </button>
              </div>

              {/* LAYER CONTROLS CHIPS */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {[
                  { key: "stops", label: "🛑 Stations", tooltip: "Stops along track" },
                  { key: "scenic", label: "📸 Scenic Spots", tooltip: "Nine Arch Bridge, Tea estates, outlooks" },
                  { key: "hotels", label: "🏨 Signature Stays", tooltip: "Bungalows & Lodges" },
                  { key: "restaurants", label: "🍽️ Fusion Bistros", tooltip: "Heritage Dining options" },
                  { key: "weather", label: "🌤️ Climatic Clouds", tooltip: "Overlay precipitation and fog maps" },
                  { key: "elevation", label: "⛰️ Grade Incline", tooltip: "Topographic tracks elevation lines" }
                ].map(layer => (
                  <button
                    key={layer.key}
                    onClick={() => toggleLayer(layer.key as keyof typeof layers)}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase transition-all flex items-center gap-1.5 ${
                      layers[layer.key as keyof typeof layers]
                        ? "bg-amber-500/15 text-[#d4af37] border border-amber-500/30"
                        : "bg-gray-100 dark:bg-emerald-950 text-gray-400 border border-transparent"
                    }`}
                    title={layer.tooltip}
                  >
                    <span>{layer.label}</span>
                  </button>
                ))}
              </div>

              {/* MAP DIV ELEMENT CONTAINER */}
              <div className="relative w-full h-[480px] bg-slate-900 rounded-2xl overflow-hidden border border-amber-500/15">
                {hasValidKey ? (
                  <APIProvider apiKey={API_KEY} version="weekly">
                    <Map
                      defaultCenter={{ lat: activeStationDetails.lat, lng: activeStationDetails.lng }}
                      defaultZoom={9}
                      mapId="TRAIN_PLATFORM_MAP_ID"
                      internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                      style={{ width: "100%", height: "100%" }}
                      gestureHandling="greedy"
                    >
                      <TrainTrackPolyline path={routeCoordinates} color={activeRoute.color} />

                      {layers.stops && activeRoute.stations.map(st => {
                        const isSelected = st.id === selectedStationId;
                        return (
                          <AdvancedMarker
                            key={st.id}
                            position={{ lat: st.lat, lng: st.lng }}
                            onClick={() => {
                              setSelectedStationId(st.id);
                              setActiveStation(st);
                              setActivePoi(null);
                            }}
                          >
                            <Pin 
                              background={isSelected ? "#064e3b" : "#d4af37"} 
                              borderColor="#ffffff"
                              glyphColor="#fff"
                              scale={isSelected ? 1.25 : 0.9}
                            />
                          </AdvancedMarker>
                        );
                      })}

                      {activeRoute.pois.map(poi => {
                        if (poi.type === "hotel" && !layers.hotels) return null;
                        if (poi.type === "restaurant" && !layers.restaurants) return null;
                        if ((poi.type === "scenic" || poi.type === "viewpoint") && !layers.scenic) return null;

                        const isSelected = activePoi?.id === poi.id;
                        const emoji = poi.type === "hotel" ? "🏨" : poi.type === "restaurant" ? "🍽️" : "📸";

                        return (
                          <AdvancedMarker
                            key={poi.id}
                            position={{ lat: poi.lat, lng: poi.lng }}
                            onClick={() => {
                              setActivePoi(poi);
                              setActiveStation(null);
                              setSelectedStationId(poi.stationId);
                            }}
                          >
                            <div className={`p-1 rounded-full border shadow-md transition-all flex items-center justify-center cursor-pointer ${
                              isSelected ? "bg-emerald-900 border-amber-500 scale-125" : "bg-white border-gray-200"
                            }`} style={{ width: "26px", height: "26px" }}>
                              <span className="text-[10px]">{emoji}</span>
                            </div>
                          </AdvancedMarker>
                        );
                      })}

                      {activeStation && (
                        <InfoWindow 
                          position={{ lat: activeStation.lat, lng: activeStation.lng }} 
                          onCloseClick={() => setActiveStation(null)}
                        >
                          <div className="text-xs p-1 max-w-[200px] text-gray-900 font-sans">
                            <span className="text-[8px] uppercase font-bold text-[#d4af37] block">Station Stop</span>
                            <h4 className="font-bold">{activeStation.name}</h4>
                            <p className="opacity-80 mt-1">Arrival: {activeStation.arrivalTime}</p>
                            <button
                              onClick={() => {
                                setSelectedStationId(activeStation.id);
                                setActiveStation(null);
                              }}
                              className="w-full mt-2 py-1 bg-emerald-800 text-white rounded font-mono text-[9px] uppercase tracking-wider text-center font-bold"
                            >
                              Show Details
                            </button>
                          </div>
                        </InfoWindow>
                      )}

                      {activePoi && (
                        <InfoWindow 
                          position={{ lat: activePoi.lat, lng: activePoi.lng }} 
                          onCloseClick={() => setActivePoi(null)}
                        >
                          <div className="text-xs p-1 max-w-[200px] text-gray-900 font-sans">
                            <span className="text-[8px] uppercase font-bold text-[#d4af37] block">★ {activePoi.rating} Rating</span>
                            <h4 className="font-bold">{activePoi.name}</h4>
                            <p className="opacity-80 mt-1 leading-snug">{activePoi.description}</p>
                          </div>
                        </InfoWindow>
                      )}

                    </Map>
                  </APIProvider>
                ) : (
                  // HIGH-FIDELITY VECTOR GRAPHIC SIMULATOR FOR MAP OVERLAYS
                  <div className="w-full h-full relative bg-[#09150e] p-6 flex flex-col justify-between overflow-hidden">
                    {/* Retro coordinate lines background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#d4af37_0.4px,transparent_0.4px)] [background-size:16px_16px] opacity-10" />
                    
                    <div className="relative z-10 flex-grow flex items-center justify-center">
                      <svg className="w-full h-[85%] max-h-[380px]" viewBox="0 0 500 620" fill="none" xmlns="http://www.w3.org/2000/svg">
                        
                        {/* Interactive Mist Overlays */}
                        {layers.weather && predictions.weather.rainProbability > 50 && (
                          <g opacity="0.35">
                            <path d="M50 120 C 50 100, 75 90, 100 100 C 115 80, 150 80, 165 100 C 180 90, 205 100, 205 120 Z" fill="#4B5563" />
                            <path d="M55 130 L55 155 M75 130 L75 155 M95 130 L95 155 M115 130 L115 155" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                            <path d="M360 220 C 360 200, 385 190, 410 200 C 425 180, 460 180, 475 200 C 490 190, 515 200, 515 220 Z" fill="#4B5563" />
                            <path d="M370 230 L370 255 M390 230 L390 255 M410 230 L410 255" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                          </g>
                        )}

                        {/* Topographical grid lines */}
                        {layers.elevation && (
                          <g stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.15">
                            <line x1="10" y1="60" x2="490" y2="60" strokeDasharray="4 4" />
                            <line x1="10" y1="160" x2="490" y2="160" strokeDasharray="4 4" />
                            <line x1="10" y1="260" x2="490" y2="260" strokeDasharray="4 4" />
                            <line x1="10" y1="360" x2="490" y2="360" strokeDasharray="4 4" />
                            <line x1="10" y1="460" x2="490" y2="460" strokeDasharray="4 4" />
                            <text x="20" y="55" fill="#d4af37" fillOpacity="0.4" fontSize="8" fontFamily="monospace">ALT 1800m</text>
                            <text x="20" y="155" fill="#d4af37" fillOpacity="0.4" fontSize="8" fontFamily="monospace">ALT 1400m</text>
                            <text x="20" y="255" fill="#d4af37" fillOpacity="0.4" fontSize="8" fontFamily="monospace">ALT 1000m</text>
                            <text x="20" y="355" fill="#d4af37" fillOpacity="0.4" fontSize="8" fontFamily="monospace">ALT 600m</text>
                          </g>
                        )}

                        {/* Path lines */}
                        <g>
                          <path
                            d={svgProjectedPoints.map((pt, idx) => `${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ")}
                            stroke="#000"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.5"
                          />
                          <path
                            d={svgProjectedPoints.map((pt, idx) => `${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ")}
                            stroke={activeRoute.color}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Rail dashboard effect */}
                          <path
                            d={svgProjectedPoints.map((pt, idx) => `${idx === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ")}
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeDasharray="4 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.8"
                          />
                        </g>

                        {/* POI Vector underlay markers */}
                        {activeRoute.pois.map(poi => {
                          if (poi.type === "hotel" && !layers.hotels) return null;
                          if (poi.type === "restaurant" && !layers.restaurants) return null;
                          if ((poi.type === "scenic" || poi.type === "viewpoint") && !layers.scenic) return null;

                          const stationProj = svgProjectedPoints.find(p => p.station.id === poi.stationId);
                          if (!stationProj) return null;

                          const offsetX = poi.id.charCodeAt(5) % 2 === 0 ? 30 : -30;
                          const offsetY = poi.id.charCodeAt(6) % 2 === 0 ? -30 : 30;

                          const x = stationProj.x + offsetX;
                          const y = stationProj.y + offsetY;
                          const isSelected = activePoi?.id === poi.id;
                          const emoji = poi.type === "hotel" ? "🏨" : poi.type === "restaurant" ? "🍽️" : "📸";

                          return (
                            <g 
                              key={poi.id}
                              className="cursor-pointer transition-transform duration-300 hover:scale-125"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePoi(poi);
                                setSelectedStationId(poi.stationId);
                                trackEvent("select_poi_vector", "vector_map", poi.id);
                              }}
                            >
                              <line x1={stationProj.x} y1={stationProj.y} x2={x} y2={y} stroke="#d4af37" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
                              <circle cx={x} cy={y} r={isSelected ? "13" : "10"} fill={isSelected ? "#111a14" : "#fdfbf7"} stroke="#d4af37" strokeWidth="1.2" />
                              <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9">{emoji}</text>
                            </g>
                          );
                        })}

                        {/* Station Stops Markers Layer */}
                        {layers.stops && svgProjectedPoints.map((pt, idx) => {
                          const isSelected = pt.station.id === selectedStationId;
                          const isHovered = pt.station.id === hoveredStationId;

                          return (
                            <g
                              key={pt.station.id}
                              className="cursor-pointer"
                              onClick={() => handleStationClick(pt.station.id)}
                              onMouseEnter={() => setHoveredStationId(pt.station.id)}
                              onMouseLeave={() => setHoveredStationId(null)}
                            >
                              {isSelected && (
                                <circle cx={pt.x} cy={pt.y} r="11" className="fill-none stroke-[#d4af37] animate-ping" strokeWidth="2" opacity="0.6" />
                              )}
                              <circle 
                                cx={pt.x} 
                                cy={pt.y} 
                                r={isSelected ? "7" : isHovered ? "6" : "4"} 
                                fill={isSelected ? "#d4af37" : "#fdfbf7"}
                                stroke={isSelected ? "#ffffff" : activeRoute.color}
                                strokeWidth="1.5"
                              />
                              {(isSelected || isHovered || idx === 0 || idx === svgProjectedPoints.length - 1) && (
                                <g>
                                  <rect x={pt.x + 8} y={pt.y - 10} width={pt.station.name.length * 6 + 10} height="16" rx="4" fill="#09150e" opacity="0.85" />
                                  <text x={pt.x + 13} y={pt.y + 1} fill={isSelected ? "#d4af37" : "#fff"} fontSize="9" fontWeight={isSelected ? "bold" : "normal"}>
                                    {pt.station.name}
                                  </text>
                                </g>
                              )}
                            </g>
                          );
                        })}

                      </svg>

                      {/* Map info locking panel */}
                      <div className="absolute inset-x-4 bottom-4 bg-black/90 border border-amber-500/20 rounded-2xl p-4 text-center space-y-2">
                        <div className="flex items-center justify-center gap-1.5 text-[#d4af37] font-serif text-xs uppercase tracking-wider font-bold">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Google Maps Sandbox View Active</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal max-w-sm mx-auto font-light">
                          Our vector simulation accurately represents coordinates, altitude profiles, and scenic markers. Provide your private key in settings to unlock full Street View controls.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CARD 5 (SIDEBAR STATION DETAIL PANEL) */}
            <div id="station-detail-view" className={`md:col-span-4 rounded-3xl p-6 border flex flex-col justify-between transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] font-mono">Platform Insight</span>
                  <span className="text-[10px] font-mono text-gray-400 font-bold">{activeStationDetails.distance} km mark</span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-serif font-bold text-emerald-800 dark:text-white leading-tight">
                    {activeStationDetails.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
                    <span>⏱️ Stop: {activeStationDetails.stopTime}</span>
                    <span>⛰️ Alt: {activeStationDetails.elevation}m</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-400/20 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-60">Estimated Stop Weather:</span>
                    <span className="font-bold">{activeStationDetails.weather}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Iconic Attraction:</span>
                    <span className="font-bold text-[#d4af37]">{activeStationDetails.attractions[0]}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block">🎯 Elite Photo Spots</span>
                  <ul className="space-y-1.5">
                    {activeStationDetails.photoSpots.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed text-gray-500 dark:text-gray-300">
                        <Camera className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-emerald-950">
                <span className="text-[10px] uppercase font-bold text-amber-600/90 tracking-widest block mb-2">🏨 Elite Lodge Stays Nearby</span>
                <div className="space-y-2">
                  {activeRoute.pois.filter(p => p.stationId === activeStationDetails.id && p.type === "hotel").slice(0, 1).map(poi => (
                    <div key={poi.id} className="p-3 rounded-xl border border-amber-500/10 bg-amber-500/5 text-xs">
                      <div className="flex justify-between font-bold">
                        <span>{poi.name}</span>
                        <span className="text-[#d4af37]">★ {poi.rating}</span>
                      </div>
                      <p className="text-[10px] opacity-75 mt-1 leading-normal">{poi.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CARD 6: TICKET PRICE INTELLIGENCE */}
            <div className={`md:col-span-6 rounded-3xl p-6 border transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600/90 flex items-center gap-1 mb-4">
                <Coins className="w-3.5 h-3.5" />
                <span>Ticket Price Intelligence</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div className="bg-emerald-800/5 border border-emerald-800/15 p-4 rounded-2xl">
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">Official Counter Price</span>
                    <span className="text-3xl font-serif font-extrabold text-emerald-800 dark:text-[#d4af37] font-mono">
                      ${predictions.price.baseTicketPrice}
                    </span>
                    <span className="text-[10px] block opacity-55 mt-0.5">Approx LKR {(predictions.price.baseTicketPrice * 300).toLocaleString()}</span>
                  </div>

                  <div className="bg-red-500/5 border border-red-500/15 p-4 rounded-2xl">
                    <span className="text-[10px] text-gray-400 block uppercase font-bold">Average Agency Resell Price</span>
                    <span className="text-xl font-bold text-red-500 font-mono">
                      ${predictions.price.agencyPrice}
                    </span>
                    <span className="text-[10px] block opacity-55 mt-0.5">Expected reseller markup premium</span>
                  </div>
                </div>

                {/* Price Charts */}
                <div className="space-y-4">
                  <div className="p-3 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-xs">
                    <div className="flex justify-between font-bold text-[#d4af37]">
                      <span>Fair Price Index</span>
                      <span>{predictions.price.fairPriceScore}/100</span>
                    </div>
                    <p className="text-[10px] opacity-70 mt-1 leading-normal">
                      We predict a massive potential savings of <strong className="text-emerald-800 dark:text-emerald-300">${predictions.price.expectedSavings}</strong> per seat by utilizing direct official self-bookings precisely 30 days prior.
                    </p>
                  </div>

                  <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: "Official", val: predictions.price.baseTicketPrice, fill: "#065f46" },
                        { name: "Fair Agency", val: predictions.price.baseTicketPrice * 1.8, fill: "#d4af37" },
                        { name: "Resell", val: predictions.price.agencyPrice, fill: "#dc2626" }
                      ]}>
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <ChartTooltip />
                        <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                          <Cell fill="#065f46" />
                          <Cell fill="#d4af37" />
                          <Cell fill="#dc2626" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 7: SYSTEMATIC RISK PREDICTOR */}
            <div className={`md:col-span-6 rounded-3xl p-6 border transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600/90 flex items-center gap-1 mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Systematic Risk Predictor</span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                {[
                  { label: "Scam Risk", score: predictions.risks.scamRisk, color: predictions.risks.scamRisk > 60 ? "bg-red-500" : "bg-emerald-500" },
                  { label: "Booking Jam", score: predictions.risks.bookingRisk, color: predictions.risks.bookingRisk > 80 ? "bg-red-500" : "bg-[#d4af37]" },
                  { label: "Signal Delay", score: predictions.risks.delayRisk, color: predictions.risks.delayRisk > 50 ? "bg-red-500" : "bg-emerald-500" },
                  { label: "Weather Risk", score: predictions.risks.weatherRisk, color: predictions.risks.weatherRisk > 70 ? "bg-red-500" : "bg-emerald-500" },
                  { label: "Holiday Jam", score: predictions.risks.holidayRisk, color: predictions.risks.holidayRisk > 60 ? "bg-red-500" : "bg-emerald-500" }
                ].map(r => (
                  <div key={r.label} className="p-2.5 rounded-xl bg-gray-50 dark:bg-emerald-950/20 border border-gray-100 dark:border-emerald-950/40 text-center space-y-1">
                    <span className="text-[9px] opacity-60 block truncate">{r.label}</span>
                    <span className="text-sm font-bold font-mono block">{r.score}%</span>
                    <div className="w-full h-1 bg-gray-200 dark:bg-emerald-900 rounded-full overflow-hidden">
                      <div className={`h-full ${r.color}`} style={{ width: `${r.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-red-500/5 border border-red-500/10 text-xs flex justify-between items-center">
                <div>
                  <span className="font-semibold text-red-700 dark:text-red-300 block">Overall Journey Threat Index</span>
                  <p className="text-[10px] opacity-70 leading-normal mt-0.5">Dual-monsoon weather triggers and agent reservation queues evaluated.</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-extrabold text-red-500">{predictions.risks.overallJourneyRisk}%</span>
                  <span className="text-[8px] uppercase block font-bold text-gray-400">Total Threat</span>
                </div>
              </div>
            </div>

            {/* CARD 8: CHRONOLOGICAL EXPERIENCE TIMELINE */}
            <div className={`md:col-span-12 rounded-3xl p-6 md:p-8 border transition-all ${
              darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
            }`}>
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block font-mono">Simulated Chronology</span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-emerald-800 dark:text-[#f0f4f1] mt-0.5">Journey Experience Timeline</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative before:absolute before:left-4 md:before:left-0 md:before:top-1/2 md:before:h-0.5 before:h-full md:before:w-full before:w-0.5 before:bg-amber-500/15">
                {[
                  { time: "05:00 AM", event: "Hotel Departure Concierge Pickup", icon: "🚗", desc: "Private host meets you for station transfers." },
                  { time: "05:35 AM", event: "Colombo Fort Platform Boarding", icon: "🎫", desc: "Acquire refreshments, secure carriage luggage racks." },
                  { time: "10:30 AM", event: "Climbing Hatton Tea Slopes", icon: "⛰️", desc: "Open window vistas begin; high mountain wind breezy gusts." },
                  { time: "02:50 PM", event: "Nine Arch Bridge Peak Approach & Ella", icon: "📸", desc: "The train slows down for the ultimate historic stone bridge curving shot." }
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-0 pt-2 md:pt-6 text-xs space-y-2">
                    <div className="absolute left-1 md:left-1/2 md:-translate-x-1/2 top-0 w-8 h-8 rounded-full bg-[#111a14] border border-[#d4af37] text-white flex items-center justify-center font-mono text-xs z-10 shadow-md">
                      {item.icon}
                    </div>
                    <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10 space-y-1">
                      <span className="font-mono text-[#d4af37] font-bold block">{item.time}</span>
                      <strong className="block text-emerald-800 dark:text-[#f0f4f1] leading-tight">{item.event}</strong>
                      <p className="text-[11px] opacity-70 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 9: AI FINAL VERDICT */}
            <div className="md:col-span-12 rounded-3xl p-6 md:p-8 border bg-[#122318] text-white border-amber-500/20 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] px-4 py-1.5 rounded-full w-fit font-mono text-[9px] uppercase tracking-widest font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Synthesized Final Verdict</span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-serif leading-tight font-semibold">
                    The Ultimate <span className="text-[#d4af37] italic font-light">Sri Lanka Rail Blueprint</span>
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    Your optimal setup for {predictions.travelMonth} is the <strong className="text-white font-bold">{predictions.bestClass}</strong> on the {activeRoute.displayName}. 
                    We highly advise booking seats on the <strong className="text-[#d4af37] font-bold">{predictions.sideTip}</strong> exactly 30 days prior at 10:00 AM LKR. Avoid high reseller black-market markups. 
                    Pack light fleece layers since Nuwara Eliya peaks will plunge to 14°C by afternoon.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <span className="opacity-50 block text-[10px]">RECOM. SIDE SEATS</span>
                      <strong className="text-white">{selectedRouteId === "highland" ? "Right Side (Kandy → Ella)" : "Right Side (Departing Colombo)"}</strong>
                    </div>
                    <div>
                      <span className="opacity-50 block text-[10px]">BOOKING COOLDOWN</span>
                      <strong className="text-white">Exactly 30 Days Prior</strong>
                    </div>
                    <div>
                      <span className="opacity-50 block text-[10px]">WEATHER RISK LEVEL</span>
                      <strong className="text-white">{predictions.weather.weatherScore}/100 Rating</strong>
                    </div>
                    <div>
                      <span className="opacity-50 block text-[10px]">SUCCESS ALIGNMENT</span>
                      <strong className="text-white font-mono">{predictions.overallScore}% Probability</strong>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white/5 border border-white/10 p-6 rounded-3xl text-center space-y-4 backdrop-blur-md">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-[#d4af37] tracking-widest block font-bold">VIP Booking Probability</span>
                    <span className="text-5xl font-serif font-extrabold text-[#d4af37] font-mono">98%</span>
                    <span className="text-[10px] text-gray-400 block font-light leading-normal">High priority counter allocation</span>
                  </div>

                  <a 
                    href="https://wa.me/94722968210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#d4af37] hover:bg-[#c5a059] text-emerald-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Inquire via WhatsApp Desk</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* BONUS COMPARISON MODULE */}
          <section className={`rounded-3xl p-6 md:p-8 border transition-all ${
            darkMode ? "bg-[#111a14] border-emerald-900/30 shadow-2xl" : "bg-white border-amber-800/10 shadow-sm"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-emerald-950">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block font-mono">Simulation Playground</span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-emerald-800 dark:text-white mt-0.5">Compare Live Parameters</h3>
              </div>

              {/* Tab Toggles */}
              <div className="flex gap-1 bg-amber-500/5 p-1 rounded-xl border border-amber-500/15 self-start sm:self-auto">
                {[
                  { id: "classes", label: "🚂 Classes" },
                  { id: "dates", label: "📅 Dates" },
                  { id: "routes", label: "🛣️ Routes" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedComparisonTab(tab.id);
                      trackEvent("switched_comparison_tab", "playground", tab.id);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedComparisonTab === tab.id
                        ? "bg-emerald-800 text-white shadow-md"
                        : "text-emerald-800/60 hover:text-emerald-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {selectedComparisonTab === "classes" && (
                <motion.div 
                  key="classes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-xs"
                >
                  <p className="opacity-70 leading-relaxed">
                    Compare pricing index, door-hanging safety ratings, and A/C capabilities across all Sri Lankan rail carriage classes.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-emerald-950 text-amber-600 dark:text-[#d4af37] font-bold text-[10px] uppercase tracking-wider">
                          <th className="py-3 px-4">Class Carriage</th>
                          <th className="py-3 px-4">Average Ticket</th>
                          <th className="py-3 px-4">A/C Units</th>
                          <th className="py-3 px-4">Open Windows (Photos)</th>
                          <th className="py-3 px-4">Platform Booking Ease</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-emerald-950/40">
                        {[
                          { name: "1st Class Observation Salon", price: "$35 - $45", ac: "✅ Yes (Sealed)", open: "❌ Sealed Glass", ease: "Challenging (30 days prior)" },
                          { name: "1st Class Compartment", price: "$30 - $38", ac: "✅ Yes (Sealed)", open: "❌ Sealed Glass", ease: "Challenging (30 days prior)" },
                          { name: "2nd Class Reserved Coach", price: "$15 - $22", ac: "❌ Fan cooling", open: "✅ Yes (Full open)", ease: "Moderate (Counter / Agent)" },
                          { name: "3rd Class Local Carriage", price: "$3 - $5", ac: "❌ None", open: "✅ Yes (Full open)", ease: "Instant on departure day" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-amber-500/5 transition-colors">
                            <td className="py-3 px-4 font-bold text-emerald-800 dark:text-white">{row.name}</td>
                            <td className="py-3 px-4 font-mono font-bold text-[#d4af37]">{row.price}</td>
                            <td className="py-3 px-4">{row.ac}</td>
                            <td className="py-3 px-4">{row.open}</td>
                            <td className="py-3 px-4">{row.ease}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {selectedComparisonTab === "dates" && (
                <motion.div 
                  key="dates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-xs"
                >
                  <p className="opacity-70 leading-relaxed">
                    Sri Lanka’s dual-monsoon winds shift rainfall patterns dynamically. Select another target month to compare sunshine indices side-by-side:
                  </p>
                  
                  <div className="flex gap-2 flex-wrap mb-4">
                    {["December", "January", "May", "June", "August"].map(m => (
                      <button
                        key={m}
                        onClick={() => {
                          setCompareMonth(m);
                          trackEvent("compare_month_playground", "playground", m);
                        }}
                        className={`px-3 py-1.5 rounded-xl border font-bold text-[10px] uppercase transition-all ${
                          compareMonth === m
                            ? "bg-emerald-800 text-white border-emerald-800"
                            : "border-amber-500/20 text-gray-500"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-amber-500/5 p-4 rounded-3xl border border-amber-400/20">
                    <div>
                      <strong className="text-emerald-800 dark:text-[#d4af37] block text-sm">Selected Month ({predictions.travelMonth})</strong>
                      <div className="mt-2 space-y-1.5">
                        <p>🌤️ Sunshine Index: <strong className="text-[#d4af37]">{predictions.weather.sunIndex}%</strong></p>
                        <p>🌧️ Rain Chance: <strong>{predictions.weather.rainProbability}%</strong></p>
                        <p>🚌 Landslides risk: <strong>{predictions.weather.delayProbability}</strong></p>
                        <p>👥 Carriage Crowding: <strong>{predictions.crowds.density}%</strong></p>
                      </div>
                    </div>
                    <div>
                      <strong className="text-emerald-800 dark:text-[#d4af37] block text-sm">Comparison Month ({compareMonth})</strong>
                      <div className="mt-2 space-y-1.5">
                        <p>🌤️ Sunshine Index: <strong className="text-[#d4af37]">{["December", "January"].includes(compareMonth) ? "95%" : ["May", "June"].includes(compareMonth) ? "25%" : "80%"}</strong></p>
                        <p>🌧️ Rain Chance: <strong>{["December", "January"].includes(compareMonth) ? "10%" : ["May", "June"].includes(compareMonth) ? "85%" : "30%"}</strong></p>
                        <p>🚌 Landslides risk: <strong>{["December", "January"].includes(compareMonth) ? "Low" : ["May", "June"].includes(compareMonth) ? "High" : "Moderate"}</strong></p>
                        <p>👥 Carriage Crowding: <strong>{["December", "January"].includes(compareMonth) ? "95% (Extreme Peak)" : ["May", "June"].includes(compareMonth) ? "20% (Low off-season)" : "60%"}</strong></p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedComparisonTab === "routes" && (
                <motion.div 
                  key="routes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs"
                >
                  {trainRoutes.map(route => (
                    <div key={route.id} className="p-4 rounded-2xl bg-amber-500/5 border border-amber-400/10 space-y-3">
                      <h4 className="font-serif font-bold text-sm text-emerald-800 dark:text-[#d4af37]">{route.name}</h4>
                      <p className="text-[11px] opacity-75 leading-relaxed">{route.description}</p>
                      <div className="space-y-1 text-[11px] font-mono">
                        <p>📏 Distance: {route.distance} km</p>
                        <p>⏱️ Travel Duration: {route.duration}</p>
                        <p>🌋 Peak Altitude: {route.id === "highland" ? "1,898 m" : "8 m"}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

        </div>
      )}

    </div>
  );
}
