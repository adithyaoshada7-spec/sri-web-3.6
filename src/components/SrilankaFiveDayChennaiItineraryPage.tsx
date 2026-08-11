import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Car, 
  Utensils, 
  Sparkles, 
  Calendar, 
  Info, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  AlertTriangle, 
  Heart, 
  Users, 
  Palmtree, 
  Train, 
  Check, 
  Plane, 
  Compass, 
  Coffee, 
  ShieldCheck, 
  DollarSign, 
  Sun, 
  Send, 
  Smartphone, 
  Share2, 
  Download, 
  Search,
  Award,
  Zap,
  Luggage,
  Navigation,
  Star
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface DayPlan {
  day: number;
  title: string;
  from: string;
  to: string;
  distanceKm: number;
  drivingTime: string;
  routeHighlights: string;
  activities: {
    time: string;
    activity: string;
    desc: string;
  }[];
  overnight: string;
  foodHighlight: string;
  proTip: string;
}

export default function SrilankaFiveDayChennaiItineraryPage() {
  usePageMetadata({
    title: "Sri Lanka 5-Day Itinerary From Chennai (2026 Guide) | Direct Routes & Cost",
    description: "Plan the ultimate 5-day trip to Sri Lanka from Chennai. Direct 75-min flight schedules, 2 custom 5-day routes (Galle Coast or Kandy Tea Hills), INR budget breakdown & WhatsApp planner.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-5-day-itinerary-from-chennai",
    ogUrl: "https://plan-srilanka.com/sri-lanka-5-day-itinerary-from-chennai"
  });

  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = useState<"coastal" | "highland">("coastal");
  const [activeDay, setActiveDay] = useState<number>(1);
  const [travelerType, setTravelerType] = useState<"couple" | "family" | "solo" | "friends">("couple");
  const [comfortTier, setComfortTier] = useState<"budget" | "comfort" | "luxury">("comfort");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([
    "Private Chauffeur Sedan / SUV",
    "Galle Fort Sunset Walk & Coffee",
    "Madu River Mangrove Boat Safari",
    "Colonial Boutique Hotel Stays"
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `chennai_5day_faq_${index}`);
  };

  const handleRouteSwitch = (route: "coastal" | "highland") => {
    setActiveRoute(route);
    setActiveDay(1);
    trackEvent("route_switch", "engagement", route);
  };

  const toggleInclusion = (item: string) => {
    if (selectedInclusions.includes(item)) {
      setSelectedInclusions(selectedInclusions.filter(i => i !== item));
    } else {
      setSelectedInclusions([...selectedInclusions, item]);
    }
  };

  const generateWhatsAppMessage = () => {
    const routeName = activeRoute === "coastal" ? "Option A: Galle Beach & Fort Coast" : "Option B: Kandy & Tea Country Hills";
    const msg = `Hi Vibe Tour Concierge! I'm planning a 5-Day Sri Lanka trip flying from Chennai (MAA).\n\nDetails:\n• Preferred Route: ${routeName}\n• Traveler Type: ${travelerType.toUpperCase()}\n• Style: ${comfortTier.toUpperCase()}\n• Key Preferences: ${selectedInclusions.join(", ")}\n\nPlease send me a custom 5-day itinerary quote and private chauffeur car details!`;
    return encodeURIComponent(msg);
  };

  // Coastal Route Data
  const coastalRoute: DayPlan[] = [
    {
      day: 1,
      title: "Chennai (MAA) to Colombo (CMB) → Highway to Bentota Beach",
      from: "Chennai Airport / Colombo (CMB)",
      to: "Bentota / Ahungalla",
      distanceKm: 85,
      drivingTime: "1.5 hours (via Southern Expressway)",
      routeHighlights: "Chennai Morning Flight → Expressway Transfer → Bentota Sunset Beach",
      activities: [
        {
          time: "07:30 AM",
          activity: "Direct 75-Min Flight from Chennai (MAA) to Colombo (CMB)",
          desc: "Board morning flight from Chennai International Airport. Cross the Gulf of Mannar in just 1h 15m and clear fast-track immigration at CMB."
        },
        {
          time: "10:30 AM",
          activity: "Private Driver Meet & Greet & Expressway Transfer",
          desc: "Meet your dedicated English-speaking chauffeur at CMB arrival gate. Hop into your air-conditioned car and take the Southern Expressway directly towards the golden beaches of Bentota."
        },
        {
          time: "01:30 PM",
          activity: "Beachfront Resort Check-in & Fresh Seafood Lunch",
          desc: "Check into your coastal boutique resort. Enjoy grilled jumbo prawns or authentic Ceylon coconut fish curry with panoramic Indian Ocean views."
        },
        {
          time: "04:30 PM",
          activity: "Madu River Mangrove Boat Safari & Turtle Hatchery",
          desc: "Cruise through secret mangrove tunnels on the Madu Ganga, visit Cinnamon Island, and stop at Kosgoda Sea Turtle Conservation Center."
        },
        {
          time: "07:30 PM",
          activity: "Welcome Sunset Cocktails on Bentota Beach",
          desc: "Kick off your holiday with fresh king coconut or tropical arrack cocktails right by the breaking waves."
        }
      ],
      overnight: "Bentota / Ahungalla Beachfront Resort",
      foodHighlight: "Fresh Ceylon Jumbo Prawns & King Coconut Water",
      proTip: "Booking the 07:30 AM IndiGo or SriLankan Airlines flight out of Chennai gets you on Bentota beach by 1:30 PM — you don't lose a single daylight hour!"
    },
    {
      day: 2,
      title: "Bentota Coastal Scenic Drive → Historic Galle Fort Walk",
      from: "Bentota",
      to: "Galle Fort / Unawatuna",
      distanceKm: 60,
      drivingTime: "1.0 hour",
      routeHighlights: "Coastal Railway Line → Hikkaduwa Coral Reef → Galle Fort (UNESCO)",
      activities: [
        {
          time: "08:30 AM",
          activity: "Water Sports or Lazy Ocean Swim in Bentota",
          desc: "Start your morning with a dip in the calm ocean or try jet-skiing and banana boat rides along Bentota lagoon."
        },
        {
          time: "11:00 AM",
          activity: "Scenic Coastal Drive Past Hikkaduwa Beach",
          desc: "Drive down the palm-lined southern coastal highway. Stop at Hikkaduwa to spot giant wild sea turtles in the shallow coral bays."
        },
        {
          time: "02:00 PM",
          activity: "Check-in at Galle Fort Colonial Villa & Artisan Lunch",
          desc: "Settle into a 300-year-old Dutch colonial villa inside the ramparts. Dine at a boutique cafe serving wood-fired flatbreads and island salads."
        },
        {
          time: "04:30 PM",
          activity: "Guided Galle Fort Rampart Sunset Walking Tour",
          desc: "Stroll past historic Dutch churches, the iconic white lighthouse, artisan gem boutiques, and watch cliff-jumpers leap into the ocean at golden hour."
        },
        {
          time: "08:00 PM",
          activity: "Gourmet Seafood Dinner inside the Fort Ramparts",
          desc: "Enjoy private courtyard dining featuring Jaffna spiced crab or grilled yellowfin tuna."
        }
      ],
      overnight: "Galle Fort Heritage Villa / Unawatuna Beach Resort",
      foodHighlight: "Galle Fort Artisan Gelato & Fresh Catch Seafood",
      proTip: "Galle Fort is entirely pedestrian-friendly. Wear easy walking shoes and bring your camera for sunset at Flag Rock bastion!"
    },
    {
      day: 3,
      title: "Mirissa Palm Rope Swing → Turtle Bay & Sunset Beach Club",
      from: "Galle Fort",
      to: "Mirissa / Weligama",
      distanceKm: 35,
      drivingTime: "45 mins",
      routeHighlights: "Weligama Bay → Stilt Fishermen → Coconut Tree Hill Mirissa",
      activities: [
        {
          time: "08:00 AM",
          activity: "Traditional Stilt Fishermen Photo Spot",
          desc: "Capture iconic photos of Sri Lanka’s famous stilt fishermen perched over turquoise waves in Koggala."
        },
        {
          time: "10:30 AM",
          activity: "Weligama Bay Surf Lesson or Chill at Secret Beach",
          desc: "Beginners can take a fun 1-hour surf lesson on Weligama's soft sandbreaks, or relax under coconut palms at Secret Beach Mirissa."
        },
        {
          time: "02:00 PM",
          activity: "Poke Bowls & Beachside Smoothie Bar Lunch",
          desc: "Savor fresh avocado poke bowls and tropical papaya smoothies at Mirissa's hip beach cafes."
        },
        {
          time: "04:30 PM",
          activity: "Sunset Hike at Coconut Tree Hill",
          desc: "Walk up the famous reddish dome jutting out into the ocean surrounded by hundreds of towering coconut palm trees."
        },
        {
          time: "07:30 PM",
          activity: "Mirissa Oceanfront Seafood BBQ & Live Vibe Music",
          desc: "Pick fresh snappers and lobsters laid out on ice at beachside tables and enjoy bonfire tunes under the stars."
        }
      ],
      overnight: "Mirissa Luxury Beachfront Boutique Hotel",
      foodHighlight: "Beachside Flame-Grilled Snapper & Coconut Cocktails",
      proTip: "If visiting between November and April, you can add a morning 3-hour Whale Watching catamaran cruise from Mirissa Harbor!"
    },
    {
      day: 4,
      title: "Coastal Train / Scenic Highway Back to Colombo (Metropolitan Vibe)",
      from: "Mirissa / Galle",
      to: "Colombo City",
      distanceKm: 150,
      drivingTime: "2.0 hours (Expressway)",
      routeHighlights: "Southern Expressway → Colombo Lotus Tower → Galle Face Green Sunset",
      activities: [
        {
          time: "09:00 AM",
          activity: "Leisurely Breakfast & Last Ocean Dip",
          desc: "Enjoy Ceylon tea, hoppers, and fresh tropical fruit platter over one last ocean breeze."
        },
        {
          time: "11:30 AM",
          activity: "Express Highway Drive to Colombo Capital",
          desc: "Comfortable private AC drive back north to Colombo city center."
        },
        {
          time: "02:00 PM",
          activity: "Colonial High Tea or Gourmet Hopper Lunch at Ministry of Crab",
          desc: "Dine at Dutch Hospital Complex, sampling world-renowned mud crab dishes or traditional String Hoppers."
        },
        {
          time: "04:30 PM",
          activity: "Galle Face Green Sunset Promenade & Street Food",
          desc: "Join locals flying kites on the waterfront, try crisp Isso Vadai (shrimp cakes), and view the Colombo skyline."
        },
        {
          time: "08:00 PM",
          activity: "Rooftop Bar Cocktails overlooking Colombo Harbor",
          desc: "Celebrate your final night at a luxury rooftop lounge with live DJ vibes and city lights."
        }
      ],
      overnight: "Colombo 5-Star City Hotel (Cinnamon Grand / Galle Face Hotel)",
      foodHighlight: "Ministry of Crab / Gourmet Hopper Tasting",
      proTip: "Save your souvenirs and Ceylon Tea shopping for Day 4 evening or Day 5 morning in Colombo where selection is highest and priced fairly."
    },
    {
      day: 5,
      title: "Colombo Luxury Shopping & Cultural Spots → Fly Home to Chennai (MAA)",
      from: "Colombo City",
      to: "Colombo Airport (CMB) → Chennai (MAA)",
      distanceKm: 35,
      drivingTime: "35 mins (Katunayake Expressway)",
      routeHighlights: "Gangaramaya Temple → Barefoot Ceylon → Odel Duty Free → Airport Flight",
      activities: [
        {
          time: "09:00 AM",
          activity: "Gangaramaya Temple & Seema Malaka Lake Shrine",
          desc: "Visit Colombo's most famous lakeside temple filled with brass statues, antique cars, and sacred Bodhi trees."
        },
        {
          time: "11:00 AM",
          activity: "Boutique Shopping for Pure Ceylon Tea & Handlooms",
          desc: "Shop for single-origin Dilmah/Mlesna tea, hand-woven linens, wooden crafts, and souvenirs at Barefoot, Spa Ceylon, and Odel."
        },
        {
          time: "01:30 PM",
          activity: "Farewell Sri Lankan Lunch at Dutch Burgher Union / Paradise Road",
          desc: "Enjoy Lamprais (rice and meat cooked in banana leaf) or curry broth."
        },
        {
          time: "03:30 PM",
          activity: "Expressway Transfer to Colombo Airport (CMB)",
          desc: "Smooth 35-minute drive to CMB. Check-in for your evening return flight."
        },
        {
          time: "06:30 PM",
          activity: "Flight Departure to Chennai International Airport (MAA)",
          desc: "Land in Chennai by 8:00 PM with unforgettable island memories, zero exhaustion, and full battery!"
        }
      ],
      overnight: "Home Sweet Home (Chennai)",
      foodHighlight: "Authentic Banana Leaf Lamprais & Ceylon Spiced Tea",
      proTip: "Duty-free pure Ceylon tea at Colombo Airport is tax-free, but Barefoot in Colombo town offers much prettier gift packaging!"
    }
  ];

  // Highland Route Data
  const highlandRoute: DayPlan[] = [
    {
      day: 1,
      title: "Chennai (MAA) to Colombo (CMB) → Scenic Drive to Kandy Royal Capital",
      from: "Chennai Airport / Colombo (CMB)",
      to: "Kandy Hill Capital",
      distanceKm: 115,
      drivingTime: "3.0 hours",
      routeHighlights: "Pineapple Belt → Kadugannawa Pass → Kandy Lake Promenade",
      activities: [
        {
          time: "07:30 AM",
          activity: "Flight from Chennai (MAA) to Colombo (CMB)",
          desc: "Direct 75-minute morning flight landing at Bandaranaike International Airport."
        },
        {
          time: "10:30 AM",
          activity: "Chauffeur Pick Up & Scenic Drive into Central Hills",
          desc: "Drive past cashew groves and pineapple plantations, ascending into the cooler hills towards Kandy."
        },
        {
          time: "02:00 PM",
          activity: "Hillside Resort Check-in & Traditional Kandyan Lunch",
          desc: "Check into your hotel overlooking Kandy Lake or Hanthana mountain range."
        },
        {
          time: "05:00 PM",
          activity: "Royal Botanical Gardens Peradeniya Walk",
          desc: "Explore 147 acres of giant bamboo, orchid houses, and majestic palm avenues."
        },
        {
          time: "07:00 PM",
          activity: "Kandyan Cultural Dance Performance & Drum Show",
          desc: "Watch traditional fire-walkers and acrobatic dancers performing ancient rituals."
        }
      ],
      overnight: "Kandy Boutique Hotel (Amaya Hills / Earl's Regency)",
      foodHighlight: "Kandyan Rice & Curry with 7 Wild Side Dishes",
      proTip: "Kandy sits at 500m elevation. Temperatures are pleasant (~24°C), making it a refreshingly cool break from Chennai heat!"
    },
    {
      day: 2,
      title: "Temple of the Tooth Relic → Scenic Tea Plantation Drive to Nuwara Eliya",
      from: "Kandy",
      to: "Nuwara Eliya (Little England)",
      distanceKm: 80,
      drivingTime: "2.5 hours",
      routeHighlights: "Temple of Tooth (UNESCO) → Ramboda Falls → Damro Tea Factory → Nuwara Eliya",
      activities: [
        {
          time: "08:00 AM",
          activity: "Sacred Temple of the Tooth Relic (Sri Dalada Maligawa)",
          desc: "Witness morning worship ceremonies at Sri Lanka's most revered Buddhist temple housing the sacred tooth relic of Lord Buddha."
        },
        {
          time: "11:00 AM",
          activity: "Drive Up Ramboda Pass & Waterfall Lookout",
          desc: "Winding road through lush misty mountain passes. Stop for photos at Ramboda Falls viewpoint."
        },
        {
          time: "01:30 PM",
          activity: "Ceylon Tea Factory & Estate Guided Walk",
          desc: "Learn the secrets of tea plucking, rolling, and roasting at Damro Tea Estate. Enjoy complimentary fresh Orange Pekoe tea on the balcony overlooking emerald hills."
        },
        {
          time: "04:30 PM",
          activity: "Arrive in Nuwara Eliya & Colonial Town Stroll",
          desc: "Check into a Tudor-style colonial mansion. Walk around Gregory Lake, Victoria Park, and the red-brick Post Office."
        },
        {
          time: "07:30 PM",
          activity: "Fireplace Dinner & Spiced Wine",
          desc: "Cozy up by an open fireplace in the cool highland air (~15°C evening)."
        }
      ],
      overnight: "Nuwara Eliya Heritage Hotel (The Grand Hotel / Jetwing St. Andrew's)",
      foodHighlight: "Highland English High Tea & Fresh Strawberries with Cream",
      proTip: "Pack a light sweater or jacket for Nuwara Eliya evenings. It gets genuinely crisp and cool at 1,800m altitude!"
    },
    {
      day: 3,
      title: "Iconic Kandy-to-Ella Scenic Train Segment → Ramboda / Sigiriya Rock View",
      from: "Nuwara Eliya",
      to: "Dambulla / Sigiriya Foothills",
      distanceKm: 130,
      drivingTime: "3.5 hours",
      routeHighlights: "Nanu Oya Railway Station → Tea Valley Viewpoints → Dambulla Caves",
      activities: [
        {
          time: "08:30 AM",
          activity: "Short Scenic Highland Train Experience",
          desc: "Board the famous blue train for a 1.5-hour scenic segment through misty tea gardens and mountain tunnels."
        },
        {
          time: "11:30 AM",
          activity: "Chauffeur Reunion & Highway Drive to Cultural Triangle",
          desc: "Rejoin your private driver at station exit and head down towards the warm heritage plains of Dambulla."
        },
        {
          time: "02:30 PM",
          activity: "Dambulla Golden Cave Temple (UNESCO)",
          desc: "Climb the golden rock to view ancient cave temples filled with 150 Buddha statues and murals."
        },
        {
          time: "05:00 PM",
          activity: "Pidurangala Sunset Viewpoint over Sigiriya Lion Rock",
          desc: "Ascend Pidurangala rock for stunning golden hour panoramic views of Sigiriya Fortress."
        },
        {
          time: "08:00 PM",
          activity: "Jungle Eco Lodge Dinner & Barbecue",
          desc: "Relax in a serene eco-lodge with pool views."
        }
      ],
      overnight: "Sigiriya / Habarana Jungle Resort (Aliya Resort / Sigiriya Village)",
      foodHighlight: "Woodapple Juice & Traditional Clay Pot Curries",
      proTip: "Your private chauffeur takes all your main luggage in the car while you enjoy the train ride stress-free!"
    },
    {
      day: 4,
      title: "Sigiriya Lion Rock Citadel → Colombo City Express Highway",
      from: "Sigiriya",
      to: "Colombo City",
      distanceKm: 165,
      drivingTime: "3.5 hours",
      routeHighlights: "Sigiriya Lion Rock Citadel → Kurunegala → Colombo Skylines",
      activities: [
        {
          time: "06:30 AM",
          activity: "Early Morning Climb of Sigiriya Lion Rock Citadel (UNESCO)",
          desc: "Beat the morning heat and ascend King Kassapa's 5th-century sky palace, Mirror Wall, and Lion Gate."
        },
        {
          time: "11:00 AM",
          activity: "Fresh Coconut Refresher & Expressway Drive to Colombo",
          desc: "Depart Sigiriya in your private AC car and drive smoothly back to Colombo metropolis."
        },
        {
          time: "03:00 PM",
          activity: "Check in Colombo 5-Star Hotel & Colombo Heritage Walking Tour",
          desc: "Explore Pettah Floating Market, Dutch Period Museum, and Old Colombo Fort."
        },
        {
          time: "06:30 PM",
          activity: "Galle Face Green Promenade Sunset Walk",
          desc: "Watch the Indian Ocean sunset with street food stalls and ocean breeze."
        },
        {
          time: "08:30 PM",
          activity: "Celebratory Dinner at Ministry of Crab or Dutch Hospital",
          desc: "Indulge in famous garlic butter mud crab or Sri Lankan fusion."
        }
      ],
      overnight: "Colombo 5-Star Hotel",
      foodHighlight: "Jaffna Spiced Mud Crab & Hopper Buffet",
      proTip: "Climbing Sigiriya at 6:30 AM guarantees zero queues on the spiral staircase and perfect morning light for photos!"
    },
    {
      day: 5,
      title: "Colombo Tea & Souvenir Shopping → Evening Direct Flight to Chennai (MAA)",
      from: "Colombo City",
      to: "Colombo Airport (CMB) → Chennai (MAA)",
      distanceKm: 35,
      drivingTime: "35 mins",
      routeHighlights: "Gangaramaya Temple → Barefoot Shopping → CMB Airport Flight Home",
      activities: [
        {
          time: "09:30 AM",
          activity: "Seema Malaka Lake Shrine & Spa Ceylon Indulgence",
          desc: "Relaxing morning visit to Beira Lake temple followed by luxury Ayurveda spa products shopping."
        },
        {
          time: "12:00 PM",
          activity: "Ceylon Tea & Artisan Handicraft Shopping",
          desc: "Pick up premium Dilmah Single Origin teas, cashew nuts, spices, and souvenirs."
        },
        {
          time: "02:00 PM",
          activity: "Farewell Sri Lankan Lunch",
          desc: "Savor coconut sambal, lamprais, and iced Ceylon tea."
        },
        {
          time: "04:00 PM",
          activity: "Airport Transfer to CMB Terminal",
          desc: "Quick 35-minute expressway drive to airport for check-in."
        },
        {
          time: "06:30 PM",
          activity: "Direct Flight Home to Chennai (MAA)",
          desc: "Arrive back at Chennai Airport by 8:00 PM refreshed and fully fulfilled."
        }
      ],
      overnight: "Home Sweet Home (Chennai)",
      foodHighlight: "Ceylon Cardamom Iced Tea & Spiced Cashews",
      proTip: "Keep a spare duffel bag in your luggage — Sri Lankan tea, spices, and Spa Ceylon hand lotions make irresistible gifts!"
    }
  ];

  const currentItinerary = activeRoute === "coastal" ? coastalRoute : highlandRoute;

  // Chennai Flight Data
  const flightSchedule = [
    {
      airline: "IndiGo Airlines (6E 1171)",
      depTime: "07:25 AM (MAA)",
      arrTime: "08:45 AM (CMB)",
      duration: "1h 20m",
      days: "Daily",
      recommended: true,
      perks: "Maximized Day 1 on arrival! Early morning landing."
    },
    {
      airline: "SriLankan Airlines (UL 122)",
      depTime: "09:35 AM (MAA)",
      arrTime: "10:55 AM (CMB)",
      duration: "1h 20m",
      days: "Daily",
      recommended: true,
      perks: "Full-service carrier with complimentary hot breakfast & 30kg luggage."
    },
    {
      airline: "Air India (AI 273)",
      depTime: "11:15 AM (MAA)",
      arrTime: "12:35 PM (CMB)",
      duration: "1h 20m",
      days: "Daily",
      recommended: false,
      perks: "Great for easy late-morning airport departure from Chennai."
    },
    {
      airline: "FitsAir (8D 822)",
      depTime: "02:10 PM (MAA)",
      arrTime: "03:25 PM (CMB)",
      duration: "1h 15m",
      days: "4x Weekly",
      recommended: false,
      perks: "Budget-friendly option for afternoon travelers."
    }
  ];

  // Estimated Cost Calculator Engine
  const calculateBudget = () => {
    let multiplier = 1;
    if (travelerType === "family") multiplier = 2.8;
    if (travelerType === "friends") multiplier = 3.2;
    if (travelerType === "solo") multiplier = 0.65;

    let baseInrPerPerson = 38000;
    if (comfortTier === "budget") baseInrPerPerson = 26000;
    if (comfortTier === "luxury") baseInrPerPerson = 78000;

    const flightInr = 11500;
    const totalInr = Math.round(baseInrPerPerson);
    const totalLkr = Math.round(totalInr * 3.65);

    return {
      totalInr: totalInr.toLocaleString("en-IN"),
      totalLkr: totalLkr.toLocaleString("en-US"),
      flightEstimate: flightInr.toLocaleString("en-IN"),
      hotelStayEstimate: Math.round(baseInrPerPerson * 0.45).toLocaleString("en-IN"),
      carChauffeurEstimate: Math.round(baseInrPerPerson * 0.25).toLocaleString("en-IN"),
      activitiesMealEstimate: Math.round(baseInrPerPerson * 0.30).toLocaleString("en-IN"),
    };
  };

  const budgetInfo = calculateBudget();

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white pb-24">
      {/* Schema EEAT JSON-LD */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka 5-Day Itinerary From Chennai (2026 Guide) | Direct Routes & Cost",
            "description": "Plan the ultimate 5-day trip to Sri Lanka from Chennai. Direct 75-min flight schedules, 2 custom 5-day routes (Galle Coast or Kandy Tea Hills), INR budget breakdown & WhatsApp planner.",
            "image": [
              "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "datePublished": "2026-08-11T08:00:00+05:30",
            "dateModified": "2026-08-11T08:00:00+05:30",
            "author": {
              "@type": "Person",
              "name": "Oshada Adithya",
              "jobTitle": "Founder & Lead Ceylon Travel Stylist"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka Concierge",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/favicon.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/sri-lanka-5-day-itinerary-from-chennai"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is 5 days enough for a trip to Sri Lanka from Chennai?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Because direct flights from Chennai (MAA) to Colombo (CMB) take only 75 minutes and fly multiple times daily, you don't lose days traveling. With a focused 5-day route (either Galle Coast or Kandy Tea Hills) and a private AC chauffeur car, 5 days is the ideal sweet-spot escape."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a 5-day Sri Lanka trip cost from Chennai in INR?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A standard comfortable 5-day trip costs between ₹32,000 and ₹45,000 per person including round-trip flights from Chennai, 4-star boutique hotels with breakfast, a dedicated private AC car with driver-guide, and entrance tickets."
                }
              },
              {
                "@type": "Question",
                "name": "Do Indian passport holders need a visa for 5 days in Sri Lanka?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Indian travelers need a digital Electronic Travel Authorization (ETA) which is applied online in 5 minutes. During free visa promotional windows, the fee is waived ($0), allowing instant clearance upon landing at Colombo airport."
                }
              }
            ]
          })}
        </script>
      </>

      {/* Hero Header */}
      <div className="bg-luxury-green relative overflow-hidden py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center brightness-[0.25] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-green/80 to-luxury-green" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest backdrop-blur-md">
            <Plane className="w-3.5 h-3.5 text-luxury-gold" />
            75-Min Direct Flight From Chennai (MAA)
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            Sri Lanka 5-Day Itinerary From Chennai <br />
            <span className="text-luxury-gold font-normal italic">(2026 Master Travel Blueprint)</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-luxury-cream/90 max-w-2xl mx-auto font-light leading-relaxed">
            Planning a quick 5-day breakaway from Chennai? Skip lengthy domestic drives — Sri Lanka is closer than Bangalore by road! Discover 2 optimized routes, flight schedules, INR budget calculator, and instant private itinerary planning.
          </p>

          {/* Key Facts Pill Grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
              <Clock className="w-8 h-8 text-luxury-gold flex-shrink-0" />
              <div>
                <span className="text-[10px] text-luxury-cream/70 uppercase tracking-wider block font-mono">Flight Duration</span>
                <span className="text-sm font-bold text-white">75 Mins (MAA → CMB)</span>
              </div>
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-luxury-gold flex-shrink-0" />
              <div>
                <span className="text-[10px] text-luxury-cream/70 uppercase tracking-wider block font-mono">Ideal Duration</span>
                <span className="text-sm font-bold text-white">5 Days / 4 Nights</span>
              </div>
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-luxury-gold flex-shrink-0" />
              <div>
                <span className="text-[10px] text-luxury-cream/70 uppercase tracking-wider block font-mono">Est. Cost / Person</span>
                <span className="text-sm font-bold text-white">₹32,000 - ₹45,000</span>
              </div>
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
              <Car className="w-8 h-8 text-luxury-gold flex-shrink-0" />
              <div>
                <span className="text-[10px] text-luxury-cream/70 uppercase tracking-wider block font-mono">Best Transit</span>
                <span className="text-sm font-bold text-white">Private AC Sedan/SUV</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="#route-selector"
              className="px-8 py-3.5 bg-luxury-gold text-luxury-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-xl flex items-center gap-2"
            >
              Explore 5-Day Routes <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#budget-calculator"
              className="px-8 py-3.5 bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-full border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Calculate Trip Budget (INR)
            </a>
          </div>
        </div>
      </div>

      {/* WHY CHENNAI TO SRI LANKA INTENT SECTION */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-luxury-black/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold font-bold block mb-2">
              The Chennai Advantage
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-green font-bold mb-4">
              Why Sri Lanka is Chennai's Favorite 5-Day Escape
            </h2>
            <p className="text-luxury-black/70 text-sm md:text-base leading-relaxed mb-6">
              If you live in Chennai, traveling to Sri Lanka is faster and often cheaper than driving down to Pondicherry on a weekend traffic jam or taking a flight to Goa. Direct flights out of Chennai International Airport (MAA) land at Colombo (CMB) in just 75 minutes with zero hassle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-2xl bg-luxury-cream/50 border border-luxury-black/5">
              <Zap className="w-6 h-6 text-luxury-gold mb-3" />
              <h3 className="font-serif font-bold text-luxury-green text-lg mb-2">75-Minute Flight</h3>
              <p className="text-xs text-luxury-black/70 leading-relaxed">
                Take off from MAA after breakfast, clear fast immigration at CMB, and be sitting at a beachfront restaurant in Bentota by lunchtime.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-luxury-cream/50 border border-luxury-black/5">
              <ShieldCheck className="w-6 h-6 text-luxury-gold mb-3" />
              <h3 className="font-serif font-bold text-luxury-green text-lg mb-2">Simplified Online Visa</h3>
              <p className="text-xs text-luxury-black/70 leading-relaxed">
                Indian passport holders get easy digital Tourist ETA online in under 24 hours. No physical embassy visits or passport courier fees needed.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-luxury-cream/50 border border-luxury-black/5">
              <Award className="w-6 h-6 text-luxury-gold mb-3" />
              <h3 className="font-serif font-bold text-luxury-green text-lg mb-2">Unmatched Value (INR)</h3>
              <p className="text-xs text-luxury-black/70 leading-relaxed">
                Get 5-star beachfront resorts, private chauffeur cars, and gourmet seafood at prices lower than luxury properties in South India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROUTE SELECTOR INTENT SECTION */}
      <section id="route-selector" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold font-bold block mb-2">
            Choose Your 5-Day Vibe
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green font-bold">
            Select Your Preferred 5-Day Itinerary Route
          </h2>
          <p className="text-sm md:text-base text-luxury-black/60 max-w-xl mx-auto mt-3">
            Since 5 days requires smart time management, we have engineered two zero-waste routes so you spend less time driving and more time relaxing.
          </p>

          {/* Route Toggle Buttons */}
          <div className="mt-8 inline-flex p-1.5 bg-luxury-cream border border-luxury-black/10 rounded-full shadow-inner">
            <button
              onClick={() => handleRouteSwitch("coastal")}
              className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeRoute === "coastal"
                  ? "bg-luxury-green text-white shadow-lg"
                  : "text-luxury-black/70 hover:text-luxury-green"
              }`}
            >
              <Palmtree className="w-4 h-4 text-luxury-gold" />
              Option A: Galle Coast & Beaches
            </button>
            <button
              onClick={() => handleRouteSwitch("highland")}
              className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeRoute === "highland"
                  ? "bg-luxury-green text-white shadow-lg"
                  : "text-luxury-black/70 hover:text-luxury-green"
              }`}
            >
              <Compass className="w-4 h-4 text-luxury-gold" />
              Option B: Kandy & Misty Tea Hills
            </button>
          </div>
        </div>

        {/* Route Summary Overview Card */}
        <div className="bg-luxury-cream/60 border border-luxury-gold/30 rounded-3xl p-6 md:p-8 mb-10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-block bg-luxury-gold/20 text-luxury-green px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-2">
              {activeRoute === "coastal" ? "Best For: Beach Lovers, Couples, Seafood & Colonial Fort Walks" : "Best For: Nature Lovers, Cool Mountain Weather, Tea Estates & Culture"}
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-luxury-green">
              {activeRoute === "coastal"
                ? "Galle Fort, Bentota Beach & Mirissa Coast Route"
                : "Kandy Royal Capital, Ramboda Waterfalls & Nuwara Eliya Tea Route"}
            </h3>
            <p className="text-xs md:text-sm text-luxury-black/70 mt-1">
              {activeRoute === "coastal"
                ? "Colombo → Bentota (1 night) → Galle Fort / Mirissa (2 nights) → Colombo City (1 night)"
                : "Colombo → Kandy (1 night) → Nuwara Eliya Tea Hills (1 night) → Sigiriya / Dambulla (1 night) → Colombo City (1 night)"}
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById("whatsapp-planner");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full md:w-auto px-6 py-3 bg-luxury-green text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-all flex items-center justify-center gap-2"
          >
            Customize This Route <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day-by-Day Interactive Schedule Tabs */}
        <div className="space-y-6">
          {/* Day Number Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {currentItinerary.map((plan) => (
              <button
                key={plan.day}
                onClick={() => setActiveDay(plan.day)}
                className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-bold flex-shrink-0 transition-all flex items-center gap-2 border ${
                  activeDay === plan.day
                    ? "bg-luxury-green text-white border-luxury-green shadow-md scale-105"
                    : "bg-white text-luxury-black/70 border-luxury-black/10 hover:border-luxury-gold"
                }`}
              >
                <span className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-mono ${
                  activeDay === plan.day ? "bg-luxury-gold text-black" : "bg-luxury-cream text-luxury-green font-bold"
                }`}>
                  D{plan.day}
                </span>
                <span className="truncate max-w-[140px] md:max-w-none">{plan.title.split("→")[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Day Detail Card */}
          {currentItinerary.map((plan) => {
            if (plan.day !== activeDay) return null;
            return (
              <motion.div
                key={plan.day}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-luxury-black/5"
              >
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-luxury-black/10 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-luxury-gold font-bold uppercase tracking-wider mb-1">
                      <span>Day {plan.day} Schedule</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-luxury-black/60">
                        <MapPin className="w-3.5 h-3.5" /> {plan.from} to {plan.to}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-luxury-green font-bold">
                      {plan.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-3 py-1.5 bg-luxury-cream text-luxury-green font-mono rounded-lg border border-luxury-black/5 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-luxury-gold" /> {plan.drivingTime}
                    </span>
                    <span className="px-3 py-1.5 bg-luxury-cream text-luxury-green font-mono rounded-lg border border-luxury-black/5 flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-luxury-gold" /> {plan.distanceKm} km
                    </span>
                  </div>
                </div>

                {/* Main Hour-by-Hour Timeline */}
                <div className="py-8 space-y-6">
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-black/40 font-bold mb-4">
                    Daily Activity Breakdown
                  </h4>

                  <div className="grid gap-6">
                    {plan.activities.map((act, i) => (
                      <div key={i} className="flex gap-4 md:gap-6 items-start">
                        <div className="px-3 py-1 bg-luxury-green/10 text-luxury-green rounded-lg text-xs font-mono font-bold whitespace-nowrap mt-1 border border-luxury-green/20">
                          {act.time}
                        </div>
                        <div className="flex-1 bg-luxury-cream/30 p-4 md:p-5 rounded-2xl border border-luxury-black/5 hover:border-luxury-gold/30 transition-all">
                          <h5 className="font-serif font-bold text-luxury-green text-base mb-1">
                            {act.activity}
                          </h5>
                          <p className="text-xs md:text-sm text-luxury-black/70 leading-relaxed">
                            {act.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day Footer Cards */}
                <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-luxury-black/10">
                  <div className="p-4 bg-luxury-cream/60 rounded-2xl border border-luxury-black/5">
                    <span className="text-[10px] font-mono uppercase text-luxury-black/40 font-bold block mb-1">
                      🏨 Recommended Stay Area
                    </span>
                    <span className="text-xs md:text-sm font-bold text-luxury-green block">
                      {plan.overnight}
                    </span>
                  </div>

                  <div className="p-4 bg-luxury-cream/60 rounded-2xl border border-luxury-black/5">
                    <span className="text-[10px] font-mono uppercase text-luxury-black/40 font-bold block mb-1">
                      🍤 Food & Dining Highlight
                    </span>
                    <span className="text-xs md:text-sm font-bold text-luxury-green block">
                      {plan.foodHighlight}
                    </span>
                  </div>

                  <div className="p-4 bg-luxury-gold/10 rounded-2xl border border-luxury-gold/20">
                    <span className="text-[10px] font-mono uppercase text-luxury-gold font-bold block mb-1">
                      💡 Local Stylist Insider Tip
                    </span>
                    <span className="text-xs text-luxury-black/80 font-medium block leading-snug">
                      {plan.proTip}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CHENNAI FLIGHT SCHEDULE INTEL SECTION */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-luxury-black/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold font-bold block mb-1">
                Chennai Flight Guide
              </span>
              <h2 className="text-2xl md:text-4xl font-serif text-luxury-green font-bold">
                Direct Flights: Chennai (MAA) to Colombo (CMB)
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-mono bg-luxury-cream px-4 py-2 rounded-xl border border-luxury-black/5 text-luxury-green">
              <Plane className="w-4 h-4 text-luxury-gold" /> Avg Return Fare: ₹10,500 - ₹14,500
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-luxury-black/10 text-[11px] font-mono uppercase tracking-wider text-luxury-black/50">
                  <th className="py-3 px-4">Airline & Flight</th>
                  <th className="py-3 px-4">Departure (MAA)</th>
                  <th className="py-3 px-4">Arrival (CMB)</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Frequency</th>
                  <th className="py-3 px-4">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-black/5 text-xs md:text-sm">
                {flightSchedule.map((flight, idx) => (
                  <tr key={idx} className="hover:bg-luxury-cream/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-luxury-green flex items-center gap-2">
                      {flight.recommended && <Star className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold" />}
                      {flight.airline}
                    </td>
                    <td className="py-4 px-4 font-mono">{flight.depTime}</td>
                    <td className="py-4 px-4 font-mono">{flight.arrTime}</td>
                    <td className="py-4 px-4 font-mono">{flight.duration}</td>
                    <td className="py-4 px-4">{flight.days}</td>
                    <td className="py-4 px-4 text-luxury-black/70 text-xs">{flight.perks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-luxury-cream/50 rounded-2xl border border-luxury-black/5 text-xs text-luxury-black/70 flex items-start gap-3">
            <Info className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-luxury-green">Pro Tip for Chennai Travelers:</strong> Always aim to book morning flights out of Chennai (e.g. 07:25 AM IndiGo or 09:35 AM SriLankan). You'll arrive in Colombo before noon, giving you an entire extra afternoon on the beach or in Kandy without paying for an extra hotel night!
            </p>
          </div>
        </div>
      </section>

      {/* ESTIMATED BUDGET CALCULATOR SECTION */}
      <section id="budget-calculator" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="bg-luxury-green text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold font-bold block mb-2">
              Transparent INR Pricing
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#fcfbf7] font-bold">
              5-Day Sri Lanka Trip Cost Estimator (From Chennai)
            </h2>
            <p className="text-xs md:text-sm text-luxury-cream/80 mt-2">
              Select your traveler group and comfort level to calculate realistic total trip budgets in Indian Rupees (₹) and Sri Lankan Rupees (LKR).
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Traveler Type Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-luxury-gold font-bold block mb-3">
                1. Who is Traveling?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "couple", label: "Couple / 2 Adults", icon: Heart },
                  { id: "family", label: "Family (3-4 Pax)", icon: Users },
                  { id: "friends", label: "Friends Group (4+)", icon: Users },
                  { id: "solo", label: "Solo Traveler", icon: Compass }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTravelerType(item.id as any)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                      travelerType === item.id
                        ? "bg-luxury-gold text-luxury-black border-luxury-gold shadow-md"
                        : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comfort Tier Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-luxury-gold font-bold block mb-3">
                2. Select Preferred Stay Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "budget", label: "Budget (3-Star)" },
                  { id: "comfort", label: "Boutique (4-Star)" },
                  { id: "luxury", label: "Luxury (5-Star)" }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setComfortTier(tier.id as any)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                      comfortTier === tier.id
                        ? "bg-luxury-gold text-luxury-black border-luxury-gold shadow-md"
                        : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Display Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/15">
            <div className="grid md:grid-cols-2 gap-6 items-center border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-luxury-cream/70 tracking-wider block mb-1">
                  Estimated Total Budget Per Person (All-Inclusive)
                </span>
                <div className="text-3xl md:text-5xl font-serif font-bold text-luxury-gold">
                  ₹{budgetInfo.totalInr} <span className="text-xs text-white/70 font-sans font-normal">INR</span>
                </div>
                <div className="text-xs text-luxury-cream/60 mt-1 font-mono">
                  (~LKR {budgetInfo.totalLkr} Sri Lankan Rupees)
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs text-luxury-cream/80 font-mono">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>✈️ MAA-CMB Roundtrip Flight:</span>
                  <span className="font-bold text-white">~₹{budgetInfo.flightEstimate}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>🏨 4 Nights Hotel Accommodation:</span>
                  <span className="font-bold text-white">~₹{budgetInfo.hotelStayEstimate}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>🚗 Dedicated AC Chauffeur Car (5 Days):</span>
                  <span className="font-bold text-white">~₹{budgetInfo.carChauffeurEstimate}</span>
                </div>
                <div className="flex justify-between">
                  <span>🍽️ Food, Tickets & Safaris:</span>
                  <span className="font-bold text-white">~₹{budgetInfo.activitiesMealEstimate}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-luxury-cream/70 leading-relaxed italic">
              *Note: Estimates include roundtrip flights from Chennai, private AC vehicle with English-speaking chauffeur-guide, 4 nights hotel stay with breakfast, and major entry tickets.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE WHATSAPP ITINERARY BUILDER CTA */}
      <section id="whatsapp-planner" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-luxury-gold/30 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 bg-luxury-gold/20 text-luxury-green px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
              Instant Customization Desk
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-luxury-green font-bold">
              Build & Lock Your 5-Day Chennai Itinerary
            </h2>
            <p className="text-xs md:text-sm text-luxury-black/70 mt-2">
              Select what features matter most to you, and send it directly to our London & Colombo concierge team on WhatsApp for an exact quote in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              "Private Chauffeur Sedan / SUV",
              "Galle Fort Sunset Walk & Coffee",
              "Madu River Mangrove Boat Safari",
              "Colonial Boutique Hotel Stays",
              "Kandy Temple of Tooth Entry",
              "Tea Plantation High Tea Experience",
              "Ministry of Crab / Seafood Dinner",
              "Colombo Shopping Concierge"
            ].map((inclusion) => {
              const isSelected = selectedInclusions.includes(inclusion);
              return (
                <button
                  key={inclusion}
                  onClick={() => toggleInclusion(inclusion)}
                  className={`p-4 rounded-2xl text-xs md:text-sm font-bold text-left transition-all flex items-center justify-between border ${
                    isSelected
                      ? "bg-luxury-cream border-luxury-gold text-luxury-green shadow-sm"
                      : "bg-white border-luxury-black/10 text-luxury-black/60 hover:border-luxury-black/30"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${isSelected ? "text-luxury-gold" : "text-luxury-black/20"}`} />
                    {inclusion}
                  </span>
                  <span className="text-[10px] font-mono text-luxury-black/40">
                    {isSelected ? "Included" : "+ Add"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`https://wa.me/94722968210?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", "conversion", "chennai_5day_itinerary")}
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#20ba5a] transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <Send className="w-4 h-4" />
              Get Custom Quote on WhatsApp
            </a>

            <Link
              to="/sri-lanka-trip-planner"
              className="w-full sm:w-auto px-8 py-4 bg-luxury-green text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-all shadow-lg text-center"
            >
              Open Interactive Trip Planner
            </Link>
          </div>
        </div>
      </section>

      {/* CHENNAI TRAVELER FAQ ACCORDION */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold font-bold block mb-2">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-luxury-green font-bold">
            Frequently Asked Questions for Chennai Travelers
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Is 5 days really enough time to visit Sri Lanka from Chennai?",
              a: "Absolutely! Because Chennai to Colombo flights take only 75 minutes, you don't lose days traveling. With a private AC vehicle and driver, you can comfortably explore either the Southern Coast (Bentota, Galle, Mirissa) or the Central Highlands (Kandy, Nuwara Eliya) without feeling rushed."
            },
            {
              q: "Why should I hire a private chauffeur driver instead of taking public transport for 5 days?",
              a: "When you only have 5 days, time is your most precious asset. Public buses and train schedules can suffer delays. A private English-speaking chauffeur picks you up right at airport arrivals, manages all baggage, knows shortcut expressway routes, and acts as your local insider guide."
            },
            {
              q: "How should I handle currency (INR to LKR) during my 5-day trip?",
              a: "Sri Lankan Rupee (LKR) is the local currency. We recommend carrying an international debit/credit card (Visa/Mastercard) for hotel and restaurant payments. For cash needs (tuk-tuks, street coconut sellers, tip money), you can withdraw LKR directly from ATMs at Colombo Airport using your Indian bank card, or exchange USD/INR at airport exchange counters."
            },
            {
              q: "Do Indian passport holders need a physical visa before flying?",
              a: "No physical visa is required. You simply complete a 5-minute online Electronic Travel Authorization (ETA) prior to flying. Print or save the confirmation email on your phone to show at Chennai airport check-in counter."
            },
            {
              q: "What is the best month to plan a 5-day trip from Chennai to Sri Lanka?",
              a: "Sri Lanka is a year-round destination! For the West Coast & Southern Beaches (Galle, Bentota), November through April offers crystal clear sunny days. For the East Coast (Trincomalee, Pasikudah), May through September is prime weather."
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-luxury-black/5 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left font-serif font-bold text-luxury-green text-base md:text-lg flex justify-between items-center gap-4 hover:text-luxury-gold transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-luxury-gold transition-transform duration-300 flex-shrink-0 ${
                    activeFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-xs md:text-sm text-luxury-black/70 font-sans leading-relaxed border-t border-luxury-black/5 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA & RELATED ARTICLES */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="border-t border-luxury-black/10 pt-10">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-luxury-gold font-bold mb-6 text-center">
            Explore More Sri Lanka Travel Resources
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
              className="p-4 bg-white rounded-2xl border border-luxury-black/5 hover:border-luxury-gold transition-all text-xs font-bold text-luxury-green flex items-center justify-between group"
            >
              <span>Chennai Master Cost Guide 2026</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/sri-lanka-7-day-itinerary"
              className="p-4 bg-white rounded-2xl border border-luxury-black/5 hover:border-luxury-gold transition-all text-xs font-bold text-luxury-green flex items-center justify-between group"
            >
              <span>Sri Lanka 7-Day Master Itinerary</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/sri-lanka-visa-for-indians"
              className="p-4 bg-white rounded-2xl border border-luxury-black/5 hover:border-luxury-gold transition-all text-xs font-bold text-luxury-green flex items-center justify-between group"
            >
              <span>Sri Lanka ETA Visa For Indians</span>
              <ArrowRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
