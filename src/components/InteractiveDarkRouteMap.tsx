import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap
} from "@vis.gl/react-google-maps";
import {
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  RotateCcw,
  Plane,
  MapPin,
  Car,
  Hotel,
  Clock,
  Sparkles,
  Layers,
  Compass,
  ArrowRight,
  Info,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import {
  DayItineraryItem,
  REGIONAL_AIRPORTS,
  RegionalAirportNode,
  SRI_LANKA_HUBS,
  CURRENCY_RATES
} from "../lib/tripRuleEngine";

// Google Maps API Key extraction
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY" && API_KEY.trim() !== "";

// Midnight Deep Navy theme style JSON (Flight radar / Google flights aesthetic)
const MIDNIGHT_NAVY_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#0d2235" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#081724" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7497b0" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9eb9cc" }]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1b405e" }]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#14334d" }]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#0c2836" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#16344d" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0f2638" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#1f4566" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#122a3d" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#143047" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#001329" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3a6280" }]
  }
];

// Helper to render polyline inside Google Maps
function RoutePolylines({
  path,
  flightPath
}: {
  path: google.maps.LatLngLiteral[];
  flightPath?: google.maps.LatLngLiteral[];
}) {
  const map = useMap();
  const roadPolylineRef = useRef<google.maps.Polyline | null>(null);
  const flightPolylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map) return;

    // Clean previous polylines
    if (roadPolylineRef.current) roadPolylineRef.current.setMap(null);
    if (flightPolylineRef.current) flightPolylineRef.current.setMap(null);

    // Draw Golden Tour Route Polyline
    if (path && path.length > 1) {
      roadPolylineRef.current = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: "#D4AF37",
        strokeOpacity: 0.9,
        strokeWeight: 4,
        icons: [
          {
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 2.5,
              fillColor: "#D4AF37",
              fillOpacity: 1,
              strokeColor: "#0d2235",
              strokeWeight: 1
            },
            offset: "50%",
            repeat: "100px"
          }
        ]
      });
      roadPolylineRef.current.setMap(map);
    }

    // Draw Cyan Flight Arc
    if (flightPath && flightPath.length > 1) {
      const lineSymbol = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 3
      };
      flightPolylineRef.current = new google.maps.Polyline({
        path: flightPath,
        geodesic: true,
        strokeColor: "#38bdf8",
        strokeOpacity: 0,
        strokeWeight: 2.5,
        icons: [
          {
            icon: lineSymbol,
            offset: "0",
            repeat: "12px"
          }
        ]
      });
      flightPolylineRef.current.setMap(map);
    }

    return () => {
      if (roadPolylineRef.current) roadPolylineRef.current.setMap(null);
      if (flightPolylineRef.current) flightPolylineRef.current.setMap(null);
    };
  }, [map, path, flightPath]);

  return null;
}

interface InteractiveDarkRouteMapProps {
  itinerary: DayItineraryItem[];
  currencyCode?: string;
  departureCity?: string;
  onSelectDay?: (dayNumber: number) => void;
  selectedDay?: number | null;
}

export default function InteractiveDarkRouteMap({
  itinerary,
  currencyCode = "INR",
  departureCity = "Mumbai",
  onSelectDay,
  selectedDay
}: InteractiveDarkRouteMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"route" | "radar">("route");
  const [activeMarkerInfo, setActiveMarkerInfo] = useState<{
    day?: DayItineraryItem;
    airport?: RegionalAirportNode;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const curr = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.INR;

  // Format price helper
  const formatLkrToUserCurrency = (lkr: number) => {
    const val = lkr / curr.toLkr;
    return curr.format(val);
  };

  // Extract road stops coordinates from itinerary
  const routeStops = useMemo(() => {
    return itinerary.map((item) => ({
      lat: item.lat || 7.2008,
      lng: item.lng || 79.8737,
      day: item
    }));
  }, [itinerary]);

  // Determine departure airport node
  const departureNode = useMemo(() => {
    const dep = departureCity.toLowerCase();
    const found = REGIONAL_AIRPORTS.find(
      (a) =>
        dep.includes(a.city.toLowerCase()) ||
        dep.includes(a.name.toLowerCase()) ||
        dep.includes(a.code.toLowerCase())
    );
    return found || REGIONAL_AIRPORTS.find((a) => a.code === "BOM") || REGIONAL_AIRPORTS[0];
  }, [departureCity]);

  // Flight path from departure city to Colombo CMB
  const flightPath = useMemo(() => {
    if (activeTab === "radar" || departureCity) {
      return [
        { lat: departureNode.lat, lng: departureNode.lng },
        { lat: 6.9271, lng: 79.8612 }
      ];
    }
    return undefined;
  }, [departureNode, activeTab, departureCity]);

  // Center coordinates
  const mapCenter = useMemo(() => {
    if (activeTab === "radar") {
      return { lat: 10.5, lng: 79.0 }; // Centered between South India and Sri Lanka
    }
    return { lat: 7.6, lng: 80.6 }; // Centered on Sri Lanka
  }, [activeTab]);

  const mapZoom = useMemo(() => {
    if (activeTab === "radar") return 6;
    return 8;
  }, [activeTab]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden border border-[#1b3d5a] bg-[#001329] shadow-2xl transition-all ${
        isFullscreen ? "h-screen fixed inset-0 z-50 rounded-none border-none" : "h-[540px] md:h-[620px]"
      }`}
    >
      {/* TOP FLOATING OVERLAY BAR (Google Flight Radar Style) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: View Mode Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#081724]/90 backdrop-blur-md border border-[#1b3d5a] shadow-lg pointer-events-auto">
          <button
            type="button"
            onClick={() => setActiveTab("route")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "route"
                ? "bg-[#D4AF37] text-[#0d2235] shadow-md"
                : "text-[#9eb9cc] hover:text-white hover:bg-white/5"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Tour Route ({itinerary.length} Days)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("radar")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "radar"
                ? "bg-[#38bdf8] text-[#001329] shadow-md"
                : "text-[#9eb9cc] hover:text-white hover:bg-white/5"
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Flight Radar & Fares</span>
          </button>
        </div>

        {/* Right: Legend & Fullscreen Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#081724]/90 backdrop-blur-md border border-[#1b3d5a] text-[11px] font-mono text-[#9eb9cc]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-2 ring-[#D4AF37]/30" />
              <span>Chauffeur Leg</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] ring-2 ring-[#38bdf8]/30" />
              <span>Flight Connection</span>
            </span>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-[#081724]/90 backdrop-blur-md border border-[#1b3d5a] text-[#9eb9cc] hover:text-white hover:border-[#38bdf8]/50 transition-all shadow-md cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* BOTTOM FLOATING SUMMARY CARD */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex justify-center">
        <div className="p-3 sm:p-4 rounded-2xl bg-[#081724]/95 backdrop-blur-md border border-[#1b3d5a] shadow-xl pointer-events-auto max-w-xl w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider truncate">
                Interactive Island Route Map
              </div>
              <div className="text-xs text-[#9eb9cc] truncate">
                {activeTab === "route"
                  ? `Click any day pill to inspect hotel stays and driving pacing (≤ 3.5 hrs/day).`
                  : `Showing regional airport gateways to Colombo CMB (${departureCity} connection active).`}
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-[10px] font-mono uppercase text-[#7497b0] block">
              Driver Rate
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {curr.format(11500 / curr.toLkr)} / day
            </span>
          </div>
        </div>
      </div>

      {/* RENDER GOOGLE MAP IF API KEY EXISTS, ELSE VECTOR RADAR SIMULATOR */}
      {hasValidKey ? (
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={mapCenter}
            defaultZoom={mapZoom}
            gestureHandling="greedy"
            disableDefaultUI={true}
            mapId="dark_radar_map"
            className="w-full h-full"
            styles={MIDNIGHT_NAVY_MAP_STYLES}
          >
            {/* Draw Polylines */}
            <RoutePolylines
              path={routeStops.map((s) => ({ lat: s.lat, lng: s.lng }))}
              flightPath={flightPath}
            />

            {/* ITINERARY STOPS MARKERS (Dark floating pill badges) */}
            {activeTab === "route" &&
              routeStops.map((stop, idx) => {
                const isSelected = selectedDay === stop.day.day;
                return (
                  <AdvancedMarker
                    key={idx}
                    position={{ lat: stop.lat, lng: stop.lng }}
                    onClick={() => {
                      setActiveMarkerInfo({ day: stop.day });
                      if (onSelectDay) onSelectDay(stop.day.day);
                    }}
                  >
                    <div
                      className={`group cursor-pointer transition-transform duration-200 hover:scale-105 ${
                        isSelected ? "scale-110 z-30" : "z-10"
                      }`}
                    >
                      {/* Dark Pill Badge matching screenshot */}
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-xl backdrop-blur-md transition-all ${
                          isSelected
                            ? "bg-[#112a42] border-[#D4AF37] ring-2 ring-[#D4AF37]/50"
                            : "bg-[#0b1c2e]/95 border-[#1e4669] hover:border-[#38bdf8]"
                        }`}
                      >
                        {/* Circular Icon */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                            isSelected
                              ? "bg-[#D4AF37] text-[#0d2235]"
                              : "bg-[#1e4669] text-[#9eb9cc] group-hover:bg-[#38bdf8] group-hover:text-[#001329]"
                          }`}
                        >
                          {stop.day.day}
                        </div>

                        {/* Location Name */}
                        <span className="text-xs font-mono font-bold text-white whitespace-nowrap">
                          {stop.day.nightLocation.split("/")[0].trim()}
                        </span>

                        {/* Price Tag / Hotel Badge */}
                        <span className="text-[10px] font-mono font-bold text-[#D4AF37] px-1.5 py-0.5 rounded bg-black/40 border border-white/10 whitespace-nowrap">
                          {formatLkrToUserCurrency(stop.day.hotelPriceLkr || 20000)}
                        </span>
                      </div>

                      {/* Pill Pointer Tip */}
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#1e4669] mx-auto" />
                    </div>
                  </AdvancedMarker>
                );
              })}

            {/* REGIONAL FLIGHT HUBS MARKERS (If Radar Tab Active) */}
            {activeTab === "radar" &&
              REGIONAL_AIRPORTS.map((airport) => (
                <AdvancedMarker
                  key={airport.id}
                  position={{ lat: airport.lat, lng: airport.lng }}
                  onClick={() => setActiveMarkerInfo({ airport })}
                >
                  <div className="group cursor-pointer transition-transform duration-200 hover:scale-105">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-xl backdrop-blur-md transition-all ${
                        airport.id === "colombo"
                          ? "bg-[#112a42] border-[#D4AF37] ring-2 ring-[#D4AF37]/50"
                          : "bg-[#0b1c2e]/95 border-[#1e4669] hover:border-[#38bdf8]"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-[#1e4669] text-[#38bdf8] flex items-center justify-center">
                        <Plane className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white whitespace-nowrap">
                        {airport.city}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#38bdf8] px-1.5 py-0.5 rounded bg-black/40 border border-white/10 whitespace-nowrap">
                        {formatLkrToUserCurrency(airport.priceLkr)}
                      </span>
                    </div>
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#1e4669] mx-auto" />
                  </div>
                </AdvancedMarker>
              ))}

            {/* CLICK INFO WINDOW */}
            {activeMarkerInfo && (
              <InfoWindow
                position={
                  activeMarkerInfo.day
                    ? {
                        lat: activeMarkerInfo.day.lat || 7.2008,
                        lng: activeMarkerInfo.day.lng || 79.8737
                      }
                    : {
                        lat: activeMarkerInfo.airport?.lat || 6.9271,
                        lng: activeMarkerInfo.airport?.lng || 79.8612
                      }
                }
                onCloseClick={() => setActiveMarkerInfo(null)}
              >
                <div className="p-2 max-w-xs text-[#1a1a1a]">
                  {activeMarkerInfo.day ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#1F3D2B]">
                          Day {activeMarkerInfo.day.day}
                        </span>
                        <span className="text-[10px] font-mono text-[#7A7365]">
                          {activeMarkerInfo.day.drivingTime}
                        </span>
                      </div>
                      <div className="font-serif font-bold text-sm text-[#1F3D2B]">
                        {activeMarkerInfo.day.title}
                      </div>
                      <div className="text-xs text-[#5A5448]">
                        🏨 {activeMarkerInfo.day.hotelName}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="font-bold text-sm">
                        {activeMarkerInfo.airport?.city} ({activeMarkerInfo.airport?.code})
                      </div>
                      <div className="text-xs text-gray-600">
                        {activeMarkerInfo.airport?.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-700">
                        Avg Fare: {formatLkrToUserCurrency(activeMarkerInfo.airport?.priceLkr || 50000)}
                      </div>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      ) : (
        /* ========================================================================= */
        /* HIGH-FIDELITY VECTOR RADAR SIMULATOR (Pixel-perfect match to screenshot) */
        /* ========================================================================= */
        <div className="relative w-full h-full bg-[#001329] overflow-hidden select-none">
          {/* Radar Background Grid Lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="radar-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#radar-grid)" />
            </svg>
          </div>

          {/* SVG Map Canvas: Sri Lanka & South India */}
          <svg
            viewBox="0 0 900 600"
            className="w-full h-full object-contain"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Glowing Filters */}
              <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradient for Flight Arc */}
              <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Landmass: South India tip (Realistic silhouette in deep teal-slate) */}
            <path
              d="M 50,40 Q 250,60 380,80 Q 420,140 430,220 Q 380,260 350,300 Q 290,320 220,380 Q 200,430 180,470 Q 140,430 110,350 Q 80,250 50,40 Z"
              fill="#0d2235"
              stroke="#1b405e"
              strokeWidth="1.5"
            />

            {/* Landmass: Sri Lanka (Realistic teardrop island in deep teal-slate) */}
            <path
              d="M 520,240 
                 C 535,215 550,210 560,225 
                 C 575,250 600,280 620,340 
                 C 630,390 625,430 600,470 
                 C 575,510 540,530 505,520 
                 C 475,505 460,460 465,410 
                 C 470,360 485,310 505,270 
                 Z"
              fill="#0f283d"
              stroke="#214b6e"
              strokeWidth="2"
            />

            {/* Northern Jaffna Peninsula */}
            <path
              d="M 495,200 Q 525,185 540,210 Q 520,230 495,200 Z"
              fill="#0f283d"
              stroke="#214b6e"
              strokeWidth="1.5"
            />

            {/* FLIGHT ARC: Departure Gateway (e.g. South India / Kochi / Chennai) to Colombo CMB */}
            <path
              d="M 220,380 Q 340,320 480,390"
              fill="none"
              stroke="url(#flightGradient)"
              strokeWidth="2.5"
              strokeDasharray="6,5"
              filter="url(#cyan-glow)"
              className="animate-pulse"
            />

            {/* GROUND TOUR ROUTE: Connecting Sri Lanka Hubs in golden polyline */}
            {/* Negombo (480,390) -> Sigiriya (545,310) -> Kandy (535,370) -> Ella (565,430) -> Yala (580,480) -> Mirissa (510,515) -> Galle (485,500) -> Colombo (480,410) */}
            <path
              d="M 480,390 L 545,310 L 535,370 L 565,430 L 580,480 L 510,515 L 485,500 L 480,410 Z"
              fill="rgba(212, 175, 55, 0.05)"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#gold-glow)"
            />

            {/* Animated Pulses on Tour Route */}
            <circle cx="545" cy="310" r="4" fill="#D4AF37" className="animate-ping" />
            <circle cx="565" cy="430" r="4" fill="#D4AF37" className="animate-ping" />

            {/* SOUTH INDIA REGIONAL HUBS (Google Flights radar style) */}
            {activeTab === "radar" && (
              <>
                {/* Chennai */}
                <g transform="translate(360, 110)">
                  <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                  <rect x="8" y="-12" width="135" height="24" rx="12" fill="#0b1c2e" stroke="#1e4669" strokeWidth="1" />
                  <circle cx="20" cy="0" r="6" fill="#1e4669" />
                  <text x="32" y="4" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Chennai</text>
                  <text x="85" y="4" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">LKR 54,635</text>
                </g>

                {/* Bengaluru */}
                <g transform="translate(250, 190)">
                  <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                  <rect x="8" y="-12" width="145" height="24" rx="12" fill="#0b1c2e" stroke="#1e4669" strokeWidth="1" />
                  <circle cx="20" cy="0" r="6" fill="#1e4669" />
                  <text x="32" y="4" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Bengaluru</text>
                  <text x="95" y="4" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">LKR 55,274</text>
                </g>

                {/* Kochi */}
                <g transform="translate(140, 360)">
                  <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                  <rect x="8" y="-12" width="125" height="24" rx="12" fill="#0b1c2e" stroke="#1e4669" strokeWidth="1" />
                  <circle cx="20" cy="0" r="6" fill="#1e4669" />
                  <text x="32" y="4" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Kochi</text>
                  <text x="75" y="4" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">LKR 45,073</text>
                </g>

                {/* Thiruvananthapuram */}
                <g transform="translate(130, 440)">
                  <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                  <rect x="8" y="-12" width="165" height="24" rx="12" fill="#0b1c2e" stroke="#1e4669" strokeWidth="1" />
                  <circle cx="20" cy="0" r="6" fill="#1e4669" />
                  <text x="32" y="4" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">Trivandrum</text>
                  <text x="100" y="4" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">LKR 48,716</text>
                </g>

                {/* Madurai */}
                <g transform="translate(240, 320)">
                  <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                  <rect x="8" y="-12" width="130" height="24" rx="12" fill="#0b1c2e" stroke="#1e4669" strokeWidth="1" />
                  <circle cx="20" cy="0" r="6" fill="#1e4669" />
                  <text x="32" y="4" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Madurai</text>
                  <text x="80" y="4" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">LKR 46,071</text>
                </g>

                {/* Jaffna */}
                <g transform="translate(490, 195)">
                  <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                  <rect x="8" y="-12" width="130" height="24" rx="12" fill="#0b1c2e" stroke="#1e4669" strokeWidth="1" />
                  <circle cx="20" cy="0" r="6" fill="#1e4669" />
                  <text x="32" y="4" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Jaffna</text>
                  <text x="75" y="4" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">LKR 82,813</text>
                </g>
              </>
            )}

            {/* SRI LANKA TOUR STOPS (High-contrast floating dark pill badges) */}
            {/* Colombo CMB */}
            <g
              transform="translate(480, 390)"
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => onSelectDay && onSelectDay(1)}
            >
              <circle cx="0" cy="0" r="5" fill="#D4AF37" />
              <rect x="-145" y="-14" width="140" height="26" rx="13" fill="#0c1b2c" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="-130" cy="-1" r="7" fill="#D4AF37" />
              <text x="-133" y="2" fill="#0d2235" fontSize="8" fontFamily="monospace" fontWeight="bold">1</text>
              <text x="-118" y="2" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Colombo</text>
              <text x="-65" y="2" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="bold">LKR 79,473</text>
            </g>

            {/* Sigiriya */}
            <g
              transform="translate(545, 310)"
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => onSelectDay && onSelectDay(2)}
            >
              <circle cx="0" cy="0" r="5" fill="#D4AF37" />
              <rect x="8" y="-14" width="135" height="26" rx="13" fill="#0c1b2c" stroke="#1e4669" strokeWidth="1.2" />
              <circle cx="22" cy="-1" r="7" fill="#1e4669" />
              <text x="19" y="2" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">2</text>
              <text x="34" y="2" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Sigiriya</text>
              <text x="86" y="2" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="bold">4★ Stays</text>
            </g>

            {/* Kandy */}
            <g
              transform="translate(535, 370)"
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => onSelectDay && onSelectDay(3)}
            >
              <circle cx="0" cy="0" r="5" fill="#D4AF37" />
              <rect x="8" y="-14" width="125" height="26" rx="13" fill="#0c1b2c" stroke="#1e4669" strokeWidth="1.2" />
              <circle cx="22" cy="-1" r="7" fill="#1e4669" />
              <text x="19" y="2" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">3</text>
              <text x="34" y="2" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Kandy</text>
              <text x="76" y="2" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="bold">Scenic</text>
            </g>

            {/* Ella */}
            <g
              transform="translate(565, 430)"
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => onSelectDay && onSelectDay(4)}
            >
              <circle cx="0" cy="0" r="5" fill="#D4AF37" />
              <rect x="8" y="-14" width="135" height="26" rx="13" fill="#0c1b2c" stroke="#1e4669" strokeWidth="1.2" />
              <circle cx="22" cy="-1" r="7" fill="#1e4669" />
              <text x="19" y="2" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">4</text>
              <text x="34" y="2" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Ella Train</text>
              <text x="96" y="2" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="bold">Views</text>
            </g>

            {/* Galle & Mirissa */}
            <g
              transform="translate(485, 500)"
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => onSelectDay && onSelectDay(5)}
            >
              <circle cx="0" cy="0" r="5" fill="#D4AF37" />
              <rect x="-140" y="-14" width="135" height="26" rx="13" fill="#0c1b2c" stroke="#1e4669" strokeWidth="1.2" />
              <circle cx="-125" cy="-1" r="7" fill="#1e4669" />
              <text x="-128" y="2" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">5</text>
              <text x="-112" y="2" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Galle Fort</text>
              <text x="-52" y="2" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="bold">Sea View</text>
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
