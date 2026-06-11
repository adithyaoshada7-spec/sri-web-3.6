import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Send,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Award,
  ShieldCheck,
  Zap,
  DollarSign,
  ThumbsUp,
  X,
  Map as MapIcon,
  HelpCircle,
  Share2,
  Bookmark,
  Compass,
  Star
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

// Fully localized & interactive Sri Lanka travel coordinator database
interface ItineraryDay {
  day: number;
  location: string;
  subtitle: string;
  description: string;
  image: string;
  activityCode: string;
}

interface HotelPreview {
  name: string;
  hotel: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  image: string;
  day: number;
}

interface MapMarker {
  id: string;
  name: string;
  x: number; // percentage coordinate x (West to East)
  y: number; // percentage coordinate y (North to South)
  isActive: boolean;
  order?: number;
}

// Localized geographic, weather and highlight details for interactive map exploration
const locationDetails: Record<string, {
  title: string;
  weather: string;
  bestTime: string;
  desc: string;
  highlights: string[];
  image: string;
  isMonsoonWet: boolean;
}> = {
  negombo: {
    title: "Negombo Lagoon",
    weather: "Humid coastal breezes, warm waters (29°C)",
    bestTime: "December to April",
    desc: "A seaside colonial-era lagoon port close to Colombo Airport, famous for authentic orange sail catamarans, centuries-old canals, and delicious fresh lobsters.",
    highlights: ["Muthurajawela Mangrove Safari", "Lively Fish Market Auctions", "Charming Dutch Canal paddle"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: true
  },
  sigiriya: {
    title: "Sigiriya Rock Citadel",
    weather: "Breezy afternoons, warm, sunny and dry (32°C)",
    bestTime: "Superb year round breezes, pristine dry June-September conditions",
    desc: "The spectacular UNESCO Lion's Rock fortress featuring sheer 200-meter cliffs, royal water fountains, ancient graffiti mirrors, and magnificent scenic lookout vistas.",
    highlights: ["Fresco drawings & Lion Claws", "Pidurangala Monastery trek", "Minneriya National wild elephants"],
    image: "https://images.unsplash.com/photo-1588598126710-530ced49b914?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: false
  },
  kandy: {
    title: "Kandy Royal Highlands",
    weather: "Crisp hills, cozy evening mist, mild drizzle (25°C)",
    bestTime: "December to May, August Festival Perahera",
    desc: "The historic lakeside royal capital nested in tropical highland mountains, preserving the sacred Tooth relic temples and royal forest sanctuaries.",
    highlights: ["Buddhist Temple of the Tooth Relic", "Traditional Kandyan Drum Dance Show", "Royal Botanical Gardens of Peradeniya"],
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: false
  },
  ella: {
    title: "Ella Tea Pass",
    weather: "Cool high-altitude valleys, light fresh mist (21°C)",
    bestTime: "Year-round breeze, beautifully dry trails",
    desc: "A magical mountain village draped in golden tea crop terracing, cascading mountain waterfalls, majestic trekking viewpoints, and iconic blue trains.",
    highlights: ["Nine Arch Bridge photo walking", "Little Adam's Peak scenic hike", "Halpewatte Organic Tea Factory"],
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: false
  },
  yala: {
    title: "Yala Coastal Reserve",
    weather: "Hot, sunny, clear clear wilderness skies (31°C)",
    bestTime: "February to September (prime tracking dry season)",
    desc: "A mesmerizing seaside safari park of golden sand dunes, salt lakes, and dry shrubs containing the highest leopard population concentration on earth.",
    highlights: ["Open Jeep Leopard & Sloth Bear tracking", "Lagoon wading flamingo flocks", "Sithulpawwa Ancient Cave Hermitage"],
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: false
  },
  mirissa: {
    title: "Mirissa Sandy Crescent",
    weather: "Balmy tropical weather, refreshing surf ripples (29°C)",
    bestTime: "November to April (prime oceanic migration)",
    desc: "A lovely crescent bay populated by tilting coconut palms, vibrant coastal beach restaurants, tide peaks, and blue whale boats.",
    highlights: ["Giant Blue Whales aquatic safari", "Insta-famous Coconut Tree Hill", "Parrot Rock coastal tide pool"],
    image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: true
  },
  galle: {
    title: "Galle Fort UNESCO",
    weather: "Brilliant ocean spray, evening coastal wind (28°C)",
    bestTime: "December to April",
    desc: "An pristine 17th-century colonial fortress preserving lovely cobblestone alleys, vintage gem galleries, red tile roofs, and tall granite ocean battlements.",
    highlights: ["White Galle Lighthouse walk", "Sunset from Triton Sea Wall", "Boutique art & spice cafes"],
    image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: true
  },
  anuradhapura: {
    title: "Anuradhapura Holy Ruins",
    weather: "Dry, serene, hot and golden sunshine (33°C)",
    bestTime: "June to September",
    desc: "The sacred oldest capital of Sri Lanka, dotted with colossal white dome stupas, 2300-year-old Bodhi trees, and stone craving water reservoirs.",
    highlights: ["Ruwanwelisaya White Master Stupa", "Sri Maha Bodhi Sacred Tree", "Jaya Sri Maha Bodhi royal gardens"],
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: false
  },
  trincomalee: {
    title: "Trincomalee Bay",
    weather: "Superb sapphire sea breeze, crystal clear & sunny (34°C)",
    bestTime: "May to October (Perfect dry coastal summer)",
    desc: "A gorgeous deep harbor sanctuary in the northeast with pristine white-sand shores, coral snorkeling, and clifftop Hindu temples.",
    highlights: ["Pigeon Island Marine Snorkel", "Koneswaram Temple Path Cliff", "Nilaveli Beach soft relaxation"],
    image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: false
  },
  colombo: {
    title: "Colombo City Skyline",
    weather: "Humid waterfront gusts, passing cloudbursts (30°C)",
    bestTime: "January to March",
    desc: "The energetic multi-cultural ocean metropolis, blending British-era landmarks, red brick bazaars, modern skylines, and lakeside temples.",
    highlights: ["Galle Face Green sunset kites", "Red Mosque of Pettah Market", "Seema Malaka Lake temple design"],
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: true
  },
  jaffna: {
    title: "Jaffna Peninsular North",
    weather: "Desert dry warmth, palmyrah drafts (33°C)",
    bestTime: "January to August",
    desc: "The unique high-heritage Northern gateway filled with magnificent giant colorful Hindu towers, shallow causeways, and flavorful mango fields.",
    highlights: ["Nallur Kandaswamy Royal Kovil", "Delft Island wild pony trails", "Casuarina Beach shallow waters"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
    isMonsoonWet: false
  }
};

export default function SrilankaTripPlannerPage() {
  // --- STATE SYSTEM ---
  const [planningDays, setPlanningDays] = useState<number>(7);
  const [planningBudget, setPlanningBudget] = useState<number>(700);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [selectedCompanion, setSelectedCompanion] = useState<string>("couple");
  const [travelMonth, setTravelMonth] = useState<string>("June 2026");
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(["beaches", "nature", "culture"]);

  // --- GA4 GOOGLE ANALYTICS SPECIFIC TRACKING REFS & HANDLERS ---
  const plannerStartedTracked = useRef(false);
  const plannerCompletedTracked = useRef(false);

  const trackPlannerStarted = () => {
    if (!plannerStartedTracked.current) {
      plannerStartedTracked.current = true;
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'planner_started');
      }
      console.log("[GA4 DEBUG] Event triggered: planner_started");
    }
  };

  const trackPlannerCompleted = () => {
    if (!plannerCompletedTracked.current) {
      plannerCompletedTracked.current = true;
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'planner_completed');
      }
      console.log("[GA4 DEBUG] Event triggered: planner_completed");
    }
  };

  // Event 1: planner_page_view
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'planner_page_view');
    }
    console.log("[GA4 DEBUG] Event triggered: planner_page_view");
  }, []);

  // Monitor edits to trigger planner_started / planner_completed
  useEffect(() => {
    const isDifferent = 
      planningDays !== 7 || 
      planningBudget !== 700 || 
      selectedCompanion !== "couple" || 
      travelMonth !== "June 2026" || 
      selectedExperiences.length !== 3 ||
      !selectedExperiences.includes("beaches") ||
      !selectedExperiences.includes("nature") ||
      !selectedExperiences.includes("culture");

    if (isDifferent) {
      if (!plannerStartedTracked.current) {
        trackPlannerStarted();
      } else if (!plannerCompletedTracked.current) {
        trackPlannerCompleted();
      }
    }
  }, [planningDays, planningBudget, selectedCompanion, travelMonth, selectedExperiences]);

  // Mobile navigation tabs
  const [mobileTab, setMobileTab] = useState<"configure" | "itinerary" | "hotels">("configure");

  // Brand-new interactive map state variables
  const [selectedMapMarker, setSelectedMapMarker] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [showClimateOverlay, setShowClimateOverlay] = useState<boolean>(true);
  const [mapSearch, setMapSearch] = useState<string>("");

  // Interactive step stepper UI indicators top bar
  const [activeStep, setActiveStep] = useState<number>(1);
  const [savedTripsCount, setSavedTripsCount] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);

  // Map Zoom UI states
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 0 });

  // Slider/Carousel Accommodations state
  const hotelSliderRef = useRef<HTMLDivElement>(null);

  // Leads submission modal state
  const [leadModalOpen, setLeadModalOpen] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    whatsapp: "",
    departureCity: "Mumbai",
    estimatedBudget: "premium"
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // --- DYNAMIC DATA ENG CALCULATOR ---
  // Re-evaluates based on days, budget & choices
  const destinationsCount = Math.min(6, Math.max(3, Math.ceil(planningDays * 0.75)));
  
  // Calculate travel times dynamically to look ultra realistic
  const getTravelTimeText = (days: number, exps: string[]) => {
    let baseHours = 5;
    let baseMins = 30;
    
    // incremental travel hours based on total stops
    baseHours += Math.min(10, days * 1.15);
    if (exps.includes("wildlife")) baseHours += 1.5;
    if (exps.includes("nature")) baseHours += 1;
    
    return `${Math.floor(baseHours)}h ${Math.floor(baseMins + (days * 3) % 60)}m`;
  };

  const travelTimeText = getTravelTimeText(planningDays, selectedExperiences);
  const averageSpendPerDay = Math.round(planningBudget / planningDays);

  // Dynamic budget division algorithm
  const getBudgetDistribution = (total: number) => {
    return [
      { name: "Accommodation", value: Math.round(total * 0.45), percentage: 45, color: "#1e3a2f" },
      { name: "Transport", value: Math.round(total * 0.22), percentage: 22, color: "#2e5e4b" },
      { name: "Food", value: Math.round(total * 0.18), percentage: 18, color: "#d4af37" },
      { name: "Activities", value: Math.round(total * 0.11), percentage: 11, color: "#cda02a" },
      { name: "Others", value: Math.round(total * 0.04), percentage: 4, color: "#efece6" },
    ];
  };

  const budgetBreakdown = getBudgetDistribution(planningBudget);

  // Generates real customized day-by-day timeline loops
  const getCustomizedDays = (): ItineraryDay[] => {
    const pool = [
      {
        location: "Negombo Coastal",
        subtitle: "Beach relaxation & local markets",
        description: "Decompress at the seaside lagoon, explore old fish markets and unwind from your international flight with a fresh coconut by the Indian ocean.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
        activityCode: "beaches"
      },
      {
        location: "Sigiriya Citadel",
        subtitle: "Explore the ancient Rock Fortress",
        description: "Climb the magnificent Lion's Rock fortress at dawn to bypass long queues. In the afternoon, embark on an elephant-watching safari in Minneriya National Park.",
        image: "https://images.unsplash.com/photo-1588598126710-530ced49b914?auto=format&fit=crop&q=80&w=600",
        activityCode: "culture"
      },
      {
        location: "Kandy Highlands",
        subtitle: "Visit the Sacred Temple of the Tooth",
        description: "Wander through the tropical lakeside sanctuary of the Tooth Relic, stop by royal botanical gardens, and admire traditional Kandyan drumming routines.",
        image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600",
        activityCode: "culture"
      },
      {
        location: "Ella Mountain Pass",
        subtitle: "Scenic train ride & mountain valleys",
        description: "Ride the legendary turquoise Blue Mountain Train from Kandy, pass remote tea plantations, hike Little Adam's Peak, and photograph Nine Arch Bridge.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=600",
        activityCode: "nature"
      },
      {
        location: "Yala Sanctuary",
        subtitle: "Wild leopard jungle safari",
        description: "Climb aboard a private open-top 4x4 cruiser for a thrilling morning leopard-spotting track across dry shrublands and coastal salty lagoons.",
        image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=600",
        activityCode: "wildlife"
      },
      {
        location: "Mirissa Crescent",
        subtitle: "Beach time & whale watching",
        description: "Relax on sandy shores, watch iconic stilt fishermen balance above high tides, and enjoy romantic beachfront candle-lit seafood dining under coconut trees.",
        image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=600",
        activityCode: "beaches"
      },
      {
        location: "Galle Fort",
        subtitle: "UNESCO Dutch rampart walkways",
        description: "Walk inside 400-year-old stone fortifications, browse boutique watercolor shops, enjoy Italian gelatos, and experience colonial architectural history.",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=600",
        activityCode: "culture"
      }
    ];

    // Ensure we customize based on experiences and match the exact days count requested
    let filtered = pool;
    if (selectedExperiences.length > 0) {
      filtered = pool.sort((a, b) => {
        const aMatch = selectedExperiences.includes(a.activityCode) ? 1 : 0;
        const bMatch = selectedExperiences.includes(b.activityCode) ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    const result: ItineraryDay[] = [];
    for (let i = 1; i <= planningDays; i++) {
      const template = filtered[(i - 1) % filtered.length];
      result.push({
        day: i,
        location: template.location,
        subtitle: template.subtitle,
        description: template.description,
        image: template.image,
        activityCode: template.activityCode
      });
    }

    return result;
  };

  const itineraryDays = getCustomizedDays();

  // Dynamic Accommodation generation matching active days & budget
  const getDynamicHotels = (): HotelPreview[] => {
    const isHighRange = planningBudget / planningDays > 150;
    
    // List of gorgeous high fidelity hotels
    const hotelsPool = [
      { name: "Negombo", hotel: isHighRange ? "The Heritance Negombo" : "Jetwing Blue Resort", pricePerNight: isHighRange ? 140 : 55, rating: 4.8, reviews: 310, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400", day: 1 },
      { name: "Sigiriya", hotel: isHighRange ? "Water Garden Sigiriya" : "Sigiriya Village Resort", pricePerNight: isHighRange ? 195 : 68, rating: 4.9, reviews: 247, image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400", day: 2 },
      { name: "Kandy", hotel: isHighRange ? "The Golden Crown Kandy" : "Kandyan View Bungalow", pricePerNight: isHighRange ? 160 : 62, rating: 4.7, reviews: 185, image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=400", day: 3 },
      { name: "Ella", hotel: isHighRange ? "98 Acres Resort & Spa" : "Ella Gap View Chalets", pricePerNight: isHighRange ? 220 : 75, rating: 4.9, reviews: 412, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400", day: 4 },
      { name: "Yala", hotel: isHighRange ? "Chena Huts Luxury Wilderness" : "Wild Safari Lodge", pricePerNight: isHighRange ? 350 : 88, rating: 4.8, reviews: 194, image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=400", day: 5 },
      { name: "Mirissa", hotel: isHighRange ? "Weligama Bay Marriott Spa" : "Mirissa Beach Resort", pricePerNight: isHighRange ? 180 : 58, rating: 4.6, reviews: 290, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400", day: 6 }
    ];

    return hotelsPool.slice(0, Math.min(itineraryDays.length, hotelsPool.length));
  };

  const accommodationPreviews = getDynamicHotels();

  // Dynamic Map dots highlights matching active destinations
  const getDynamicMarkers = (): MapMarker[] => {
    const list: MapMarker[] = [
      { id: "negombo", name: "Negombo", x: 26, y: 65, isActive: false },
      { id: "sigiriya", name: "Sigiriya", x: 44, y: 39, isActive: false },
      { id: "kandy", name: "Kandy", x: 45, y: 56, isActive: false },
      { id: "ella", name: "Ella", x: 57, y: 70, isActive: false },
      { id: "yala", name: "Yala", x: 68, y: 81, isActive: false },
      { id: "mirissa", name: "Mirissa", x: 38, y: 92, isActive: false },
      { id: "galle", name: "Galle Fort", x: 32, y: 88, isActive: false },
      { id: "anuradhapura", name: "Anuradhapura", x: 40, y: 25, isActive: false },
      { id: "trincomalee", name: "Trincomalee", x: 61, y: 21, isActive: false },
      { id: "colombo", name: "Colombo", x: 24, y: 69, isActive: false },
      { id: "jaffna", name: "Jaffna", x: 35, y: 8, isActive: false }
    ];

    return list.map(marker => {
      const matchIndex = itineraryDays.findIndex(d => {
        const stopPrefix = d.location.toLowerCase().split(" ")[0];
        return stopPrefix.startsWith(marker.id) || marker.id.startsWith(stopPrefix);
      });

      return {
        ...marker,
        isActive: matchIndex !== -1,
        order: matchIndex !== -1 ? matchIndex + 1 : undefined
      };
    });
  };

  const mapMarkers = getDynamicMarkers();

  // --- ACTIONS ---
  const handleSaveTrip = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      setSavedTripsCount(prev => prev + 1);
      trackEvent("trip_planner_saved", "engagement", "save_trip");
    } else {
      setSavedTripsCount(prev => Math.max(0, prev - 1));
    }
  };

  const handleShareTrip = () => {
    setShareOpen(true);
    trackEvent("trip_planner_share", "engagement", "share_trip");
    // Auto copies current link
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setShareOpen(false), 2500);
  };

  const toggleExperience = (code: string) => {
    if (selectedExperiences.includes(code)) {
      setSelectedExperiences(prev => prev.filter(item => item !== code));
    } else {
      setSelectedExperiences(prev => [...prev, code]);
    }
    trackEvent("trip_planner_experience_toggle", "planner", code);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.whatsapp) return;

    setIsSubmitting(true);
    trackEvent("trip_planner_lead_submit_start", "conversion", leadForm.estimatedBudget);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      trackEvent("trip_planner_lead_submit_success", "conversion", leadForm.estimatedBudget);
      
      // GA4 Event 4 Trigger: Form submit
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'planner_lead');
      }
      console.log("[GA4 DEBUG] Event triggered: planner_lead (Form submit)");
    }, 1200);
  };

  // Slider navigation
  const slideHotels = (direction: "left" | "right") => {
    if (hotelSliderRef.current) {
      const scrollAmt = 260;
      hotelSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmt : scrollAmt,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-[#FAF9F5] text-[#1e3a2f] min-h-screen font-sans antialiased overflow-x-hidden pt-2">
      <Helmet>
        <title>Sri Lanka Trip Planner & Interactive Route Creator (2026)</title>
        <meta name="description" content="Design your custom Sri Lanka itinerary with our real-time interactive route planner. Map daily destinations, preview climatic monsoon alerts, allocate budgets, and generate a downloadable day-by-day travel plan." />
        <meta name="keywords" content="sri lanka trip planner, custom route creator, interactive travel map, sri lanka itinerary generator, monsoon climate advisor, hotel budget planner, travel sri lanka" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://plan-srilanka.com/sri-lanka-trip-planner" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Plan Sri Lanka" />
        <meta property="og:title" content="Sri Lanka Trip Planner & Interactive Route Creator (2026)" />
        <meta property="og:description" content="Design your custom Sri Lanka itinerary with our real-time interactive route planner. Map daily destinations, preview climatic monsoon alerts, allocate budgets, and generate a downloadable day-by-day travel plan." />
        <meta property="og:url" content="https://plan-srilanka.com/sri-lanka-trip-planner" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sri Lanka Trip Planner & Interactive Route Creator (2026)" />
        <meta name="twitter:description" content="Design your custom Sri Lanka itinerary with our real-time interactive route planner. Map daily destinations, preview climatic monsoon alerts, allocate budgets, and generate a downloadable day-by-day travel plan." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630" />

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
                "name": "Trip Planner",
                "item": "https://plan-srilanka.com/sri-lanka-trip-planner"
              }
            ]
          })}
        </script>

        {/* 1. WebApplication Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Sri Lanka Custom Route & Trip Planner",
            "operatingSystem": "All",
            "applicationCategory": "TravelApplication",
            "browserRequirements": "Requires JavaScript. Requires HTML5.",
            "url": "https://plan-srilanka.com/sri-lanka-trip-planner",
            "description": "An interactive, web-based travel assistant designed to help user customized routes across Sri Lanka while factoring in the seasonal southwest monsoons, region weather forecasts, and customized accommodation budget guides.",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            }
          })}
        </script>

        {/* 2. FAQ Page Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does the Sri Lanka Trip Planner helper work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The custom planner allows travelers to dynamically configure their timeline length (7 to 15 days), adjust traveling pacing styles, choose local hotel price brackets (Hostel, Boutique, or Luxury Resorts) and view real-time climate warnings for the southwest monsoon wet zone. It visualizes daily paths on an interactive map."
                }
              },
              {
                "@type": "Question",
                "name": "Can I download my finalized Sri Lanka trip schedule?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our trip planning application features a fully offline-friendly PDF export utility and live messaging prompts to share or print complete daily pacing details, hotel recommendations, and navigation markers."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* STICKY TOP STATUS / STEPPER HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#1e3a2f]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1e3a2f] flex items-center justify-center text-white font-serif font-black text-sm shadow-md">
              🇱🇰
            </div>
            <div>
              <h1 className="text-sm md:text-base font-serif font-bold text-[#1e3a2f] leading-none mb-0.5">Plan My Sri Lanka Trip</h1>
              <span className="text-[10px] text-[#5a7065] leading-none block">Plan smart. Travel better.</span>
            </div>
          </div>

          {/* Stepper Wizard Display */}
          <div className="hidden lg:flex items-center gap-6">
            {[
              { num: 1, text: "Trip Details", active: activeStep === 1 },
              { num: 2, text: "Travel Style", active: activeStep === 2 },
              { num: 3, text: "Interests", active: activeStep === 3 },
              { num: 4, text: "Review Trip", active: activeStep === 4 }
            ].map((step) => (
              <button 
                key={step.num}
                onClick={() => {
                  setActiveStep(step.num);
                  trackEvent("trip_planner_header_step_click", "engagement", `step_${step.num}`);
                }}
                className="flex items-center gap-2 text-xs transition-colors"
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step.active 
                    ? "bg-[#1e3a2f] text-white shadow-sm" 
                    : "bg-[#1e3a2f]/5 text-[#1e3a2f]"
                }`}>
                  {step.num}
                </span>
                <span className={`font-semibold ${step.active ? "text-[#1e3a2f]" : "text-[#1e3a2f]/40 font-normal"}`}>
                  {step.text}
                </span>
                {step.num < 4 && <div className="w-8 h-[1px] bg-[#1e3a2f]/10" />}
              </button>
            ))}
          </div>

          {/* Utility Top Actions */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={handleSaveTrip}
              className={`p-2 px-3 rounded-full border text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                isSaved 
                  ? "bg-red-50 text-red-600 border-red-200" 
                  : "bg-white text-[#1e3a2f] border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-red-600 text-red-600" : "text-[#1e3a2f]"}`} />
              <span className="hidden sm:inline">{isSaved ? "Saved" : "Save Trip"}</span>
            </button>

            <button 
              onClick={handleShareTrip}
              className="p-2 px-3 rounded-full border bg-white border-neutral-200 hover:bg-neutral-50 text-xs text-[#1e3a2f] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-[#1e3a2f]" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* SHARE TOAST POPUP */}
      <AnimatePresence>
        {shareOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-18 right-4 bg-[#1e3a2f] text-white py-3 px-5 rounded-xl shadow-2xl z-50 flex items-center gap-2 text-xs font-mono border border-emerald-400/20"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Sitemap Link Copied to Clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE SEGMENTED TAB BAR */}
      <div className="lg:hidden sticky top-[57px] z-30 bg-[#FAF9F5]/90 backdrop-blur-md py-3 px-4 border-b border-[#1e3a2f]/5">
        <div className="grid grid-cols-3 p-1 bg-white rounded-2xl border border-[#1e3a2f]/10 shadow-sm max-w-sm mx-auto">
          <button
            onClick={() => {
              setMobileTab("configure");
              trackEvent("trip_planner_mobile_tab", "navigation", "configure");
            }}
            className={`py-3 px-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${
              mobileTab === "configure"
                ? "bg-[#1e3a2f] text-white shadow-sm"
                : "text-[#1e3a2f]/60 hover:text-[#1e3a2f] hover:bg-neutral-50"
            }`}
          >
            <span className="text-sm">⚙️</span>
            <span className="text-[10px] font-bold">1. Setup</span>
          </button>

          <button
            onClick={() => {
              setMobileTab("itinerary");
              trackEvent("trip_planner_mobile_tab", "navigation", "itinerary");
            }}
            className={`py-3 px-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${
              mobileTab === "itinerary"
                ? "bg-[#1e3a2f] text-white shadow-sm"
                : "text-[#1e3a2f]/60 hover:text-[#1e3a2f] hover:bg-neutral-50"
            }`}
          >
            <span className="text-sm">🗺️</span>
            <span className="text-[10px] font-bold">2. Route</span>
          </button>

          <button
            onClick={() => {
              setMobileTab("hotels");
              trackEvent("trip_planner_mobile_tab", "navigation", "hotels");
            }}
            className={`py-3 px-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${
              mobileTab === "hotels"
                ? "bg-[#1e3a2f] text-white shadow-sm"
                : "text-[#1e3a2f]/60 hover:text-[#1e3a2f] hover:bg-neutral-50"
            }`}
          >
            <span className="text-sm">🏡</span>
            <span className="text-[10px] font-bold">3. Hotels</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-10 grid lg:grid-cols-12 gap-8">
        
        {/* ========================================================
            LEFT COL: planning parameters sidebar forms & controls
            ======================================================== */}
        <div className={`lg:col-span-4 space-y-6 ${mobileTab === "configure" ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-3xl border border-[#1e3a2f]/10 shadow-sm p-6 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-serif text-[#1e3a2f] tracking-tight leading-none">
                Let's plan your perfect
              </h2>
              <div className="text-2xl md:text-3xl font-serif font-black text-emerald-800 leading-tight">
                Sri Lanka <span className="text-[#d4af37]">trip</span>
              </div>
              <p className="text-xs text-[#5a7065] font-light">Tell us a few details about your trip.</p>
            </div>

            {/* INPUT 1: HOW MANY DAYS */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1e3a2f] flex justify-between">
                <span>1. How many days are you planning to stay?</span>
                <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">{planningDays} Days</span>
              </label>
              <div className="relative">
                <select 
                  value={planningDays}
                  onChange={(e) => {
                    const daysVal = parseInt(e.target.value);
                    setPlanningDays(daysVal);
                    trackEvent("trip_planner_change_days", "planner", daysVal.toString());
                  }}
                  className="w-full px-4 py-3.5 bg-[#FAF9F5] border border-neutral-200 text-xs rounded-xl focus:ring-1 focus:ring-emerald-800 outline-none font-medium text-[#1e3a2f] appearance-none"
                >
                  <option value={5}>5 Days</option>
                  <option value={6}>6 Days</option>
                  <option value={7}>7 Days (Recommended Loop)</option>
                  <option value={8}>8 Days</option>
                  <option value={9}>9 Days</option>
                  <option value={10}>10 Days</option>
                  <option value={12}>12 Days</option>
                  <option value={14}>14 Days (Complete Peak Sweep)</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#1e3a2f]/50">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* INPUT 2: TOTAL BUDGET */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1e3a2f] flex justify-between">
                <span>2. What is your total budget?</span>
                <span className="font-mono text-[#d4af37] font-extrabold text-[11px]">Avg ${averageSpendPerDay} / day</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input 
                    type="range"
                    min={400}
                    max={5000}
                    step={50}
                    value={planningBudget}
                    onChange={(e) => {
                      const budgetVal = parseInt(e.target.value);
                      setPlanningBudget(budgetVal);
                      trackEvent("trip_planner_change_budget_slider", "planner", budgetVal.toString());
                    }}
                    className="w-full accent-emerald-800"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-neutral-400 font-mono">$400</span>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      ${planningBudget.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">$5,000</span>
                  </div>
                </div>
                <div className="w-20">
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full px-2.5 py-2 border border-neutral-200 text-xs rounded-xl outline-none font-bold bg-[#FAF9F5] text-center"
                  >
                    <option value="USD">USD</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>
              <p className="text-[10px] text-neutral-400 leading-normal font-light">
                Total budget for the entire trip (not per day, exclusive of international air flights).
              </p>
            </div>

            {/* INPUT 3: COMPANIONS SEGMENTED */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1e3a2f] block">
                3. Who are you traveling with?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "solo", name: "Solo", icon: <Users className="w-3.5 h-3.5 shrink-0" /> },
                  { id: "couple", name: "Couple", icon: <Heart className="w-3.5 h-3.5 shrink-0" /> },
                  { id: "friends", name: "Friends", icon: <Users className="w-3.5 h-3.5 shrink-0 animate-pulse" /> },
                  { id: "family", name: "Family", icon: <Users className="w-3.5 h-3.5 shrink-0" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCompanion(item.id);
                      trackEvent("trip_planner_change_companion", "planner", item.id);
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      selectedCompanion === item.id 
                        ? "bg-[#1e3a2f] text-white border-[#1e3a2f] shadow-md" 
                        : "bg-[#FAF9F5] hover:bg-neutral-50 border-neutral-200 text-[#1e3a2f]/70"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* INPUT 4: TRAVEL MONTH */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1e3a2f] block">
                4. When are you traveling?
              </label>
              <div className="relative">
                <select 
                  value={travelMonth}
                  onChange={(e) => {
                    setTravelMonth(e.target.value);
                    trackEvent("trip_planner_change_month", "planner", e.target.value);
                  }}
                  className="w-full px-4 py-3.5 bg-[#FAF9F5] border border-neutral-200 text-xs rounded-xl focus:ring-1 focus:ring-emerald-800 outline-none font-medium text-[#1e3a2f] appearance-none"
                >
                  <option value="June 2026">June 2026 (Monsoon Active)</option>
                  <option value="July 2026">July 2026</option>
                  <option value="August 2026">August 2026</option>
                  <option value="September 2026">September 2026</option>
                  <option value="December 2026">December 2026 (High Peak Winter)</option>
                  <option value="January 2027">January 2027</option>
                  <option value="February 2027">February 2027</option>
                  <option value="March 2027">March 2027</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#1e3a2f]/50">
                  <Clock className="w-4 h-4 text-emerald-800" />
                </div>
              </div>
            </div>

            {/* INPUT 5: MUST-DO EXPERIENCES PILLES */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1e3a2f] block">
                5. What are your must-do experiences?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "beaches", name: "Beaches", color: "text-blue-600 bg-blue-50 border-blue-100" },
                  { id: "nature", name: "Nature", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
                  { id: "culture", name: "Culture", color: "text-amber-800 bg-amber-50 border-amber-100" },
                  { id: "wildlife", name: "Wildlife", color: "text-orange-700 bg-orange-50 border-orange-100" },
                  { id: "adventure", name: "Adventure", color: "text-purple-700 bg-purple-50 border-purple-100" },
                  { id: "relaxation", name: "Relaxation", color: "text-pink-700 bg-pink-50 border-pink-100" }
                ].map((pill) => {
                  const isChosen = selectedExperiences.includes(pill.id);
                  return (
                    <button
                      key={pill.id}
                      onClick={() => toggleExperience(pill.id)}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        isChosen 
                          ? "bg-[#1e3a2f] text-white border-[#1e3a2f] font-bold" 
                          : `${pill.color} hover:opacity-85`
                      }`}
                    >
                      {isChosen ? `✓ ${pill.name}` : pill.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA TRIGGER PACK BUTTON */}
            <button 
              onClick={() => {
                // Ensure recommended route generation is marked completed in GA4 if clicked
                trackPlannerCompleted();
                setLeadModalOpen(true);
                trackEvent("trip_planner_button_main_cta_click", "engagement", "plan_my_trip");
              }}
              className="w-full py-4 bg-[#1e3a2f] hover:bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Plan My Trip</span>
            </button>
          </div>

          {/* BUDGET BREAKDOWN DYNAMIC DONUT CHART */}
          <div className="bg-white rounded-3xl border border-[#1e3a2f]/10 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e3a2f] border-b border-[#1e3a2f]/5 pb-2">
              Budget Breakdown (Est.)
            </h3>

            {/* HIGH-END INTERACTIVE CUSTOM SVG CIRCLE/DONUT CHART */}
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#efece6" strokeWidth="6"></circle>
                  
                  {/* Accommodation Arc - 45% */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#1e3a2f" strokeWidth="6" 
                    strokeDasharray="45 55" strokeDashoffset="0"></circle>
                  
                  {/* Transport Arc - 22% */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#2e5e4b" strokeWidth="6" 
                    strokeDasharray="22 78" strokeDashoffset="-45"></circle>
                  
                  {/* Food Arc - 18% */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#d4af37" strokeWidth="6" 
                    strokeDasharray="18 82" strokeDashoffset="-67"></circle>
                  
                  {/* Activities Arc - 11% */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#cda02a" strokeWidth="6" 
                    strokeDasharray="11 89" strokeDashoffset="-85"></circle>

                  {/* Others Arc - 4% */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#a4c9b7" strokeWidth="6" 
                    strokeDasharray="4 96" strokeDashoffset="-96"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] text-[#5a7065] uppercase font-mono tracking-tight leading-none">Est. Total</span>
                  <span className="text-sm font-bold font-serif text-[#1e3a2f] leading-none mt-0.5">${planningBudget}</span>
                </div>
              </div>

              {/* Chart Legend displaying calculations */}
              <div className="flex-1 space-y-1.5">
                {budgetBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-neutral-500 font-light">{item.name}</span>
                    </div>
                    <span className="font-semibold text-[#1e3a2f] font-mono">
                      ${item.value} <span className="text-[9px] text-neutral-400 font-normal">({item.percentage}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SMART TIP BOX */}
            <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-2 items-start mt-2">
              <Zap className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-[#4d5c52] leading-normal font-light">
                <strong className="text-emerald-950 font-bold">Smart Tip:</strong> This budget is perfect for a comfortable, boutique-tier trip with private English-speaking chauffeur service and zero rush.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COL: Dynamically Calculated Itinerary + Map Area
            ======================================================== */}
        <div className={`lg:col-span-8 space-y-6 ${mobileTab !== "configure" ? "block animate-fade-in" : "hidden lg:block"}`}>
          <div className="bg-white rounded-3xl border border-[#1e3a2f]/10 shadow-sm p-6 md:p-8 space-y-8">
            
            {/* TRIP OVERVIEW SUMMARY MATRICES */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#1e3a2f]/5">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-[10px] uppercase tracking-widest font-bold mb-1.5">
                  Best Balance Recommended Loop
                </span>
                <h3 className="text-2xl font-serif font-black text-[#1e3a2f] tracking-tight">
                  Your Recommended Trip
                </h3>
                <p className="text-xs text-neutral-400 font-light">Perfect mix of scenery, wildlife tracks, and leisure beach closures.</p>
              </div>

              {/* Real-time counters showing save states */}
              {isSaved && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-serif font-bold">
                  <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 shrink-0" /> Checked by {124 + savedTripsCount} Travelers Today
                </div>
              )}
            </div>

            {/* DETAILED FOUR METRIC BADGES CARD */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Total Budget", val: `$${planningBudget}`, desc: `${selectedCurrency} currency class`, color: "border-neutral-100" },
                { title: "Per Day (Avg)", val: `$${averageSpendPerDay}`, desc: "Very comfortable balance", color: "border-neutral-100" },
                { title: "Destinations", val: destinationsCount.toString(), desc: "Top highlights visited", color: "border-neutral-100" },
                { title: "Travel Time", val: travelTimeText, desc: "Completely optimized", color: "border-amber-100/60 bg-amber-50/25", icon: <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> }
              ].map((metric, index) => (
                <div key={index} className={`p-4 rounded-2xl border text-left ${metric.color}`}>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">{metric.title}</span>
                  <div className="text-xl md:text-2xl font-bold font-serif text-[#1e3a2f] flex items-center gap-1">
                    {metric.val}
                    {metric.icon}
                  </div>
                  <span className="text-[10px] text-[#5a7065] font-light leading-none block mt-1">{metric.desc}</span>
                </div>
              ))}
            </div>

            {/* SCREEN SPLIT: ITINERARY (LEFT) MAP SIMULATION (RIGHT) */}
            <div className={`grid md:grid-cols-12 gap-6 pt-2 ${mobileTab === "itinerary" ? "grid animate-fade-in" : "hidden md:grid"}`}>
              
              {/* Daily stops - col span 7 */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Your {planningDays}-Day Itinerary Timeline
                </h4>

                <div className="relative pl-6 border-l-2 border-emerald-800/10 space-y-6">
                  {itineraryDays.map((stop) => {
                    const stopPrefix = stop.location.toLowerCase().split(" ")[0];
                    const isHovered = hoveredDay === stop.day;
                    const isActiveOnMap = selectedMapMarker === stopPrefix;

                    return (
                      <div 
                        key={stop.day} 
                        className="relative group transition-all cursor-pointer"
                        onMouseEnter={() => setHoveredDay(stop.day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        onClick={() => {
                          setSelectedMapMarker(stopPrefix);
                          trackEvent("trip_planner_timeline_click", "engagement", stopPrefix);
                        }}
                      >
                        
                        {/* Left timeline dot indicator with numbering */}
                        <span className={`absolute -left-[35px] top-1 w-[18px] h-[18px] rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 ${
                          isHovered || isActiveOnMap
                            ? "bg-emerald-850 text-white scale-125 border-emerald-900"
                            : "bg-white border-2 border-emerald-800 text-emerald-800"
                        }`}>
                          {stop.day}
                        </span>

                        <div className={`flex gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                          isHovered || isActiveOnMap
                            ? "bg-emerald-50/50 border-[#1e3a2f]/20 shadow-sm"
                            : "bg-neutral-50/40 hover:bg-neutral-50 border-transparent hover:border-[#1e3a2f]/5"
                        }`}>
                          {/* Thumbnail image with subtle zoom */}
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
                            <img 
                              src={stop.image} 
                              alt={stop.location} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            <div className="absolute top-1 left-1 px-1 py-0.5 rounded bg-black/50 text-white text-[8px] font-bold">
                              D{stop.day}
                            </div>
                          </div>

                          {/* Stop details */}
                          <div className="space-y-0.5 min-w-0">
                            <h5 className="font-serif font-black text-sm text-[#1e3a2f] flex items-center gap-1">
                              {stop.location}
                              <span className="text-[10px] font-sans font-normal text-emerald-700 bg-emerald-50 px-1 py-0.1 rounded">
                                {stop.activityCode}
                              </span>
                            </h5>
                            <span className="text-[11px] text-[#d4af37] font-semibold leading-none block">{stop.subtitle}</span>
                            <p className="text-[11.5px] text-[#5a7065] font-light leading-snug line-clamp-2 md:line-clamp-3">
                              {stop.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sri Lanka interactive stylized vector map - col span 5 */}
              <div className="md:col-span-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                      Interactive Route Map
                    </h4>
                    <span className="text-[9px] font-mono text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full select-none">
                      <MapIcon className="w-3 h-3 text-emerald-600 animate-pulse" /> Live Route Trace
                    </span>
                  </div>

                  {/* QUICK MAP SEARCH & MONSOON TOGGLE */}
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <input 
                        type="text"
                        placeholder="Search places..."
                        value={mapSearch}
                        onChange={(e) => {
                          setMapSearch(e.target.value);
                          if (e.target.value) {
                            trackEvent("trip_planner_map_search", "planner", e.target.value);
                          }
                        }}
                        className="w-full text-xs py-1.5 pl-6 pr-3 bg-white border border-[#1e3a2f]/10 rounded-xl focus:outline-none focus:border-emerald-800 transition-all text-[#1e3a2f] font-light placeholder-neutral-400 shadow-sm"
                      />
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] opacity-50">🔍</span>
                      {mapSearch && (
                        <button 
                          onClick={() => setMapSearch("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-black font-extrabold"
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setShowClimateOverlay(!showClimateOverlay);
                        trackEvent("trip_planner_toggle_climate_overlay", "planner", (!showClimateOverlay).toString());
                      }}
                      type="button"
                      className={`py-1.5 px-2.5 rounded-xl text-[10px] font-bold border transition-all flex items-center gap-1 shrink-0 shadow-sm focus:outline-none ${
                        showClimateOverlay 
                          ? "bg-blue-50 border-blue-200 text-blue-700" 
                          : "bg-white border-neutral-205 text-neutral-500 hover:text-emerald-800"
                      }`}
                      title="Toggle Climatic Monsoon Overlay"
                    >
                      <span>⛈️ Monsoon</span>
                    </button>
                  </div>

                  {/* Stylized Simulated Map Component Frame */}
                  <div className="w-full h-[400px] bg-[#EEEDEA] rounded-3xl border border-[#1e3a2f]/10 shadow-inner relative overflow-hidden flex items-center justify-center p-4">
                    
                    {/* Compass Rose Accent */}
                    <div className="absolute top-3 left-3 z-15 w-8 h-8 opacity-25 border border-dashed border-[#1e3a2f]/30 rounded-full flex items-center justify-center select-none pointer-events-none">
                      <span className="text-[8px] font-mono font-black text-[#1e3a2f]">N</span>
                    </div>

                    {/* Minimal map grids and lines */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1e3a2f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                    
                    {/* SVG silhouette representation of Sri Lanka to anchor visual nodes */}
                    <svg viewBox="0 0 100 100" className="absolute w-[80%] h-[95%] text-emerald-800/5 select-none pointer-events-none transition-transform" style={{ transform: `scale(${mapZoom}) translate(${mapCenter.x}px, ${mapCenter.y}px)` }}>
                      <path fill="#FAF9F5" stroke="rgba(30,58,47,0.15)" strokeWidth="0.4" d="M48,5 C55,8 65,18 69,28 C74,38 78,50 78,65 C76,75 70,88 62,94 C54,98 44,98 38,91 C32,84 28,72 26,60 C24,48 26,35 32,24 C38,13 42,5 48,5 Z" />
                      
                      {/* Climatic Monsoon Zone Overlay */}
                      {showClimateOverlay && (
                        <path 
                          d="M 23 59 Q 36 67 42 75 T 36 91 C 32 87 30 83 23 59 Z" 
                          fill="rgba(59, 130, 246, 0.08)" 
                          stroke="rgba(59, 130, 246, 0.25)" 
                          strokeWidth="0.3" 
                          strokeDasharray="1,1" 
                        />
                      )}

                      {/* Connection trace route vectors between selected markers dynamically calculated */}
                      {(() => {
                        const activeSequence = mapMarkers
                          .filter(m => m.isActive && m.order !== undefined)
                          .sort((a, b) => (a.order || 0) - (b.order || 0));

                        let pathStr = "";
                        if (activeSequence.length > 1) {
                          pathStr = `M ${activeSequence[0].x} ${activeSequence[0].y}`;
                          for (let i = 1; i < activeSequence.length; i++) {
                            pathStr += ` L ${activeSequence[i].x} ${activeSequence[i].y}`;
                          }
                          pathStr += ` Z`;
                        }

                        return pathStr ? (
                          <path 
                            fill="transparent" 
                            stroke="#1e3a2f" 
                            strokeWidth="1.2" 
                            strokeDasharray="1.5,1.5" 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={pathStr} 
                            className="drop-shadow-sm transition-all"
                          />
                        ) : null;
                      })()}
                    </svg>

                    {/* Dynamic Interactive Node Points on absolute grid layout */}
                    <div 
                      className="absolute inset-0 transition-transform duration-300"
                      style={{ transform: `scale(${mapZoom}) translate(${mapCenter.x}px, ${mapCenter.y}px)` }}
                    >
                      {/* Monsoon zone Labels */}
                      {showClimateOverlay && (
                        <div className="absolute left-[13%] top-[78%] bg-blue-100/75 backdrop-blur-sm text-blue-700 text-[8px] font-sans px-1 py-0.2 rounded border border-blue-200 pointer-events-none flex items-center gap-1 select-none">
                          <span>⛈️ SW Wet Zone</span>
                        </div>
                      )}
                      {showClimateOverlay && (
                        <div className="absolute left-[54%] top-[32%] bg-amber-50/80 backdrop-blur-sm text-[#d4af37] text-[8px] font-sans px-1 py-0.2 rounded border border-amber-200 pointer-events-none flex items-center gap-1 select-none">
                          <span>☀️ East Sun Shield</span>
                        </div>
                      )}

                      {mapMarkers
                        .filter(marker => 
                          !mapSearch || 
                          marker.name.toLowerCase().includes(mapSearch.toLowerCase()) ||
                          marker.id.toLowerCase().includes(mapSearch.toLowerCase())
                        )
                        .map((marker) => {
                          const isHovered = hoveredDay !== null && itineraryDays[hoveredDay - 1] && (
                            itineraryDays[hoveredDay - 1].location.toLowerCase().startsWith(marker.id) ||
                            marker.id.startsWith(itineraryDays[hoveredDay - 1].location.toLowerCase().split(" ")[0])
                          );
                          const isSelected = selectedMapMarker === marker.id;

                          return (
                            <button 
                              key={marker.id}
                              type="button"
                              onClick={() => {
                                setSelectedMapMarker(marker.id);
                                trackEvent("trip_planner_map_marker_click", "planner", marker.id);
                              }}
                              className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                            >
                              {/* Pulsing expand-glow on active hover or selection */}
                              {(isHovered || isSelected) && (
                                <span className="absolute -inset-4 rounded-full bg-emerald-600/20 animate-ping duration-1500 pointer-events-none" />
                              )}

                              <div className={`w-5 h-5 rounded-full flex items-center justify-center relative shadow-md transition-all duration-300 ${
                                isSelected 
                                  ? "bg-amber-500 ring-4 ring-amber-500/30 text-white scale-125" 
                                  : marker.isActive 
                                    ? "bg-emerald-800 ring-2 ring-emerald-800/10 text-white hover:scale-110" 
                                    : "bg-[#efece6] hover:bg-neutral-100 text-neutral-400 border border-neutral-300 scale-95"
                              }`}>
                                {marker.isActive && marker.order ? (
                                  <span className="text-[9px] font-sans font-black">{marker.order}</span>
                                ) : (
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    isSelected ? "bg-white" : marker.isActive ? "bg-white" : "bg-neutral-400"
                                  }`} />
                                )}
                                
                                {/* Marker tooltip */}
                                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1e3a2f] text-white text-[9px] font-bold font-mono px-2 py-0.5 rounded whitespace-nowrap shadow-md opacity-90 transition-all ${
                                  isHovered || isSelected ? "opacity-100 scale-100" : "opacity-0 scale-90 translate-y-1 pointer-events-none"
                                }`}>
                                  <MapPin className="w-2.5 h-2.5 text-[#d4af37]" />
                                  {marker.name} {marker.isActive && "✓"}
                                </div>
                              </div>
                            </button>
                          );
                        })}

                      {/* Landmarks to assist orientation */}
                      <div className="absolute left-[40%] top-[25%] opacity-35 text-[8px] font-mono text-neutral-500 select-none pointer-events-none">Anuradhapura</div>
                      <div className="absolute left-[61%] top-[23%] opacity-35 text-[8px] font-mono text-neutral-500 select-none pointer-events-none">Trincomalee</div>
                      <div className="absolute left-[81%] top-[34%] opacity-25 text-[8px] font-mono text-neutral-500 select-none pointer-events-none">Batticaloa</div>
                      <div className="absolute left-[34%] top-[86%] opacity-35 text-[8px] font-mono text-neutral-500 select-none pointer-events-none">Galle</div>
                      <div className="absolute left-[18%] top-[68%] opacity-25 text-[9px] font-mono text-neutral-400 select-none pointer-events-none">Indian Ocean</div>
                    </div>

                    {/* Absolute Map Zoom Controls floating panel */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl border border-[#1e3a2f]/10 shadow z-20">
                      <button 
                        onClick={() => {
                          setMapZoom(prev => Math.min(2.5, prev + 0.25));
                          trackEvent("trip_planner_map_zoom_in", "engagement", "zoom");
                        }} 
                        type="button"
                        className="w-7 h-7 bg-neutral-50 hover:bg-neutral-100 text-[#1e3a2f] rounded-lg text-xs font-bold flex items-center justify-center transition-all focus:outline-none"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => {
                          setMapZoom(prev => Math.max(0.75, prev - 0.25));
                          trackEvent("trip_planner_map_zoom_out", "engagement", "zoom");
                        }} 
                        type="button"
                        className="w-7 h-7 bg-neutral-50 hover:bg-neutral-100 text-[#1e3a2f] rounded-lg text-xs font-bold flex items-center justify-center transition-all focus:outline-none"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => {
                          setMapZoom(1);
                          setMapCenter({ x: 0, y: 0 });
                          trackEvent("trip_planner_map_zoom_reset", "engagement", "zoom");
                        }} 
                        type="button"
                        className="w-7 h-7 bg-neutral-100 text-neutral-500 hover:text-black rounded-lg text-[9px] font-mono flex items-center justify-center transition-all mt-1 focus:outline-none"
                        title="Reset View"
                      >
                        🧭
                      </button>
                    </div>

                    {/* SLIDE CARD DRAWER: Display gorgeous spot details when clicked */}
                    <AnimatePresence>
                      {selectedMapMarker && locationDetails[selectedMapMarker] && (() => {
                        const info = locationDetails[selectedMapMarker];
                        const matchedMarker = mapMarkers.find(m => m.id === selectedMapMarker);
                        const isStopActive = matchedMarker?.isActive;

                        return (
                          <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute bottom-0 inset-x-0 bg-[#FAF9F5] border-t border-[#1e3a2f]/15 shadow-2xl p-3 z-30 flex gap-3 rounded-t-2xl max-h-[175px] select-text"
                          >
                            {/* Card Image */}
                            <div className="w-20 h-full rounded-xl overflow-hidden shrink-0 shadow-inner relative hidden sm:block">
                              <img 
                                src={info.image} 
                                alt={info.title} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Card details */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                              <div className="space-y-0.5">
                                <div className="flex justify-between items-start gap-1">
                                  <div>
                                    <span className="text-[8px] uppercase font-mono tracking-wider font-extrabold text-[#d4af37]">
                                      {isStopActive ? "📍 Scheduled Itinerary Hub" : "ℹ️ Explore Tourist Hub"}
                                    </span>
                                    <h5 className="font-serif font-black text-xs text-[#1e3a2f] leading-tight truncate">
                                      {info.title}
                                    </h5>
                                  </div>
                                  <button 
                                    onClick={() => setSelectedMapMarker(null)}
                                    type="button"
                                    className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-200 transition-colors focus:outline-none"
                                    title="Close details"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>

                                <p className="text-[10px] text-[#5a7065] leading-snug font-light line-clamp-2">
                                  {info.desc}
                                </p>

                                <div className="flex flex-wrap gap-1 pt-1">
                                  {info.highlights.slice(0, 2).map((h, i) => (
                                    <span key={i} className="text-[8px] bg-emerald-800/5 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                                      ✦ {h}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Interactive suitability alert */}
                              <div className="flex justify-between items-center bg-[#1e3a2f]/5 p-1 rounded-lg border border-[#1e3a2f]/5 mt-1 shrink-0">
                                <div className="flex items-center gap-1 text-[9px] min-w-0">
                                  <span>🌦️</span>
                                  <span className="truncate text-stone-605 font-medium">
                                    <strong>Weather:</strong> {info.isMonsoonWet ? "Slight rains in June" : "Dry & Clear Skies"}
                                  </span>
                                </div>
                                <span className="text-[8px] font-extrabold text-emerald-800 bg-emerald-100/50 px-1.5 py-0.5 rounded ml-1 uppercase shrink-0">
                                  {info.isMonsoonWet ? "Monsoon Alert" : "Sunny & Dry"}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>

                  </div>
                </div>

                {/* WHY THIS TRIP IS PERFECT FOR YOU */}
                <div className="mt-4 pt-4 border-t border-[#1e3a2f]/5 space-y-3">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a2f]">Why This Trip is Perfect for You</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { icon: <DollarSign className="w-4 h-4 text-emerald-700" />, title: "Budget Friendly", desc: "Fits your budget perfectly" },
                      { icon: <Clock className="w-4 h-4 text-emerald-700" />, title: "Travel Efficient", desc: "Less travel time, more experiences" },
                      { icon: <Compass className="w-4 h-4 text-emerald-700" />, title: "Diverse Highlights", desc: "Beaches, culture, wildlife & nature" },
                      { icon: <Sparkles className="w-4 h-4 text-emerald-700" />, title: "Well Balanced", desc: "Perfect mix of adventure & relaxation" }
                    ].map((perk, idx) => (
                      <div key={idx} className="flex gap-2 p-2 rounded-xl bg-neutral-50/50 hover:bg-neutral-50 transition-all border border-neutral-100">
                        <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                          {perk.icon}
                        </div>
                        <div className="min-w-0">
                          <h6 className="font-bold text-[#1e3a2f] text-[11px] leading-tight">{perk.title}</h6>
                          <p className="text-[10px] text-neutral-500 leading-tight font-light truncate">{perk.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* ========================================================
                CAROUSEL SECTION: Accommodation Live Previews
                ======================================================== */}
            <div className={`space-y-4 pt-6 border-t border-[#1e3a2f]/5 ${mobileTab === "hotels" ? "block animate-fade-in" : "hidden lg:block"}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 leading-none">
                    Accommodation Previews
                  </h4>
                  <span className="text-[10px] text-neutral-400 font-light mt-1 block">Selected based on your ${planningBudget} budget limits.</span>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => slideHotels("left")}
                    className="p-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-[#1e3a2f] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => slideHotels("right")}
                    className="p-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-[#1e3a2f] transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slider list */}
              <div 
                ref={hotelSliderRef}
                className="overflow-x-auto flex gap-4 scrollbar-hidden pb-2"
                style={{ scrollbarWidth: "none" }}
              >
                {accommodationPreviews.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="w-[240px] shrink-0 bg-[#FAF9F5] border border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
                  >
                    {/* Hotel Image */}
                    <div className="h-32 w-full overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.hotel} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[9px] font-bold rounded">
                        Day {item.day} Destination
                      </div>
                    </div>

                    {/* Hotel Details */}
                    <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37] font-semibold">{item.name} stops</span>
                        <h5 className="font-serif font-black text-xs text-[#1e3a2f] leading-tight truncate">{item.hotel}</h5>
                        
                        {/* Rating row */}
                        <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-1">
                          <div className="flex text-amber-500">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          </div>
                          <span className="font-bold text-neutral-700">{item.rating}</span>
                          <span>({item.reviews} reviews)</span>
                        </div>
                      </div>

                      {/* Pricing row */}
                      <div className="pt-2 border-t border-neutral-100 flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-emerald-800">
                          ${item.pricePerNight} <span className="text-[9px] text-neutral-400 font-normal">/ night</span>
                        </span>
                        <span className="text-[9px] text-neutral-400 bg-white border border-neutral-100 px-1.5 py-0.5 rounded uppercase font-mono">
                          Vetted
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                <span>ℹ️</span> 
                <span>Accommodations represent handpicked mid-range/boutique choices matched automatically. Over 50+ alternatives are available on booking requests.</span>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* ========================================================
          STICKY BOTTOM BAR FOOTER CONTROLS
          ======================================================== */}
      <footer className="sticky bottom-0 z-45 bg-[#1e3a2f] text-white border-t border-emerald-800/20 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Summary stats left side */}
          <div className="flex items-center gap-6 text-xs font-mono text-emerald-100/80">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white text-sm font-serif">{planningDays}</strong> Days
              </span>
            </div>
            <div className="w-[1px] h-4 bg-emerald-800" />
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white text-sm font-serif">{destinationsCount}</strong> Cities
              </span>
            </div>
            <div className="w-[1px] h-4 bg-emerald-800" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white text-sm font-serif">{travelTimeText}</strong> Drive
              </span>
            </div>
            <div className="w-[1px] h-4 bg-emerald-800" />
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#d4af37]" />
              <span>
                <strong className="text-[#d4af37] text-sm font-serif">${planningBudget}</strong> Budget
              </span>
            </div>
          </div>

          {/* Core action right side */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={handleSaveTrip}
              className={`flex-1 sm:flex-none p-3 px-5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                isSaved 
                  ? "bg-red-500 text-white border-red-500" 
                  : "bg-emerald-900 border-emerald-800 hover:bg-emerald-800 text-white"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-white text-white animate-ping" : "text-emerald-300"}`} />
              <span>{isSaved ? "Trip Guarded!" : "Save Trip"}</span>
            </button>

            <button 
              onClick={() => {
                // Ensure recommended route generation is marked completed in GA4 if clicked
                trackPlannerCompleted();
                setLeadModalOpen(true);
                trackEvent("trip_planner_footer_main_cta_click", "engagement", "customize_trip");
              }}
              className="flex-1 sm:flex-none p-3 px-8 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-950 shrink-0" />
              <span>Customize Trip</span>
            </button>
          </div>

        </div>
      </footer>

      {/* ========================================================
          LEAD CAPTURE / DETAILED ITINERARY GENERATOR MODAL VIEW
          ======================================================== */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-neutral-100 relative max-h-[90vh] flex flex-col">
            
            {/* Modal header button close */}
            <button 
              onClick={() => {
                setLeadModalOpen(false);
                setSubmitSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-all z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {!submitSuccess ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-[#1e3a2f]/5 rounded-full flex items-center justify-center text-[#d4af37] mx-auto">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-black text-xl md:text-2xl text-[#1e3a2f] tracking-tight">
                      Export Your Full Digital Route Map & Pricing
                    </h3>
                    <p className="text-xs text-neutral-500 leading-normal max-w-md mx-auto">
                      Get a direct private high-speed transit calculation, complete chauffeur quotes, and handpicked boutique hotel links with exclusive direct booking rates with zero commissions.
                    </p>
                  </div>

                  {/* Form fields */}
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-wider">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Adithya Sharma"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 outline-none font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-wider">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={leadForm.whatsapp}
                        onChange={(e) => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 outline-none font-medium"
                      />
                      <p className="text-[9px] text-neutral-400">Used strictly to send your custom interactive maps and rates instantly.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-wider">Indian Departure Port</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Mumbai"
                          value={leadForm.departureCity}
                          onChange={(e) => setLeadForm({ ...leadForm, departureCity: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF9F5] border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 outline-none font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-wider">Comfort Tier Class</label>
                        <select 
                          value={leadForm.estimatedBudget}
                          onChange={(e) => setLeadForm({ ...leadForm, estimatedBudget: e.target.value })}
                          className="w-full px-3 py-3 bg-[#FAF9F5] border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 outline-none font-bold"
                        >
                          <option value="premium">4-Star Heritage (Classic Comfort)</option>
                          <option value="luxury">5-Star Boutique Pools (Luxury Plunge)</option>
                          <option value="organic">Wilderness Eco-Resorts</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#1e3a2f] hover:bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#d4af37]" />
                          <span>Generating Dynamic Blueprint Map...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Download Free Custom Map PDF</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center p-4 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif font-black text-xl text-[#1e3a2f] tracking-tight">
                    Custom Route Blueprint Created!
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
                    Ayu bowan, <strong className="text-[#1e3a2f]">{leadForm.name}</strong>! We have mapped out your bespoke {planningDays}-Day travel loop. Our local transport desk will share with you the detailed itinerary and private chauffeur rates directly to your WhatsApp at <span className="font-bold">{leadForm.whatsapp}</span>.
                  </p>
                  
                  <div className="pt-2">
                    <a 
                      href={`https://wa.me/94722968210?text=Hi%20Vibe%20Tour,%20I%20just%20planned%20my%20Srilanka%20trip%20online!%20My%20name%20is%20${encodeURIComponent(leadForm.name)}.%20Requesting%20my%20${planningDays}-day%20itinerary.`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => {
                        // GA4 Event 4 Trigger: WhatsApp CTA click
                        if (typeof window !== 'undefined' && (window as any).gtag) {
                          (window as any).gtag('event', 'planner_lead');
                        }
                        console.log("[GA4 DEBUG] Event triggered: planner_lead (WhatsApp click)");
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all"
                    >
                      Connect Instantly on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-neutral-50/85 text-center text-[10px] text-neutral-400 border-t border-neutral-100">
              🔒 We never sell or spam your numbers. Handled securely by Vibe Tour Colombo dispatch team under SLTDA regulations.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
