import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Check,
  Compass,
  ShieldCheck,
  DollarSign,
  Sun,
  Send,
  Smartphone,
  Share2,
  Award,
  Zap,
  Luggage,
  Navigation,
  Star,
  Fuel,
  Wrench,
  Radio,
  FileCheck,
  Shield,
  MessageCircle,
  Camera,
  Coffee,
  ExternalLink
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
  tukTukTip: string;
}

export default function SrilankaThirteenDayTukTukItineraryPage() {
  usePageMetadata({
    title: "13-Day Sri Lanka Tuk-Tuk Itinerary & WhatsApp Rental Booking (2026)",
    description: "Self-drive Sri Lanka in 13 days by Tuk-Tuk! Complete loop itinerary (Negombo, Sigiriya, Kandy, Ella, Yala, Hiriketiya, Galle), driving permit guide, and direct WhatsApp Tuk-Tuk booking.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-13-day-tuk-tuk-itinerary",
    ogUrl: "https://plan-srilanka.com/sri-lanka-13-day-tuk-tuk-itinerary",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
    ogType: "article"
  });

  const [activeDay, setActiveDay] = useState<number>(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Tuk Tuk Booking Widget State
  const [tukTukCount, setTukTukCount] = useState<number>(1);
  const [rentalDays, setRentalDays] = useState<number>(13);
  const [driverOption, setDriverOption] = useState<"self-drive" | "with-driver">("self-drive");
  const [pickupCity, setPickupCity] = useState<string>("Negombo (Near CMB Airport)");
  const [dropoffCity, setDropoffCity] = useState<string>("Negombo (Near CMB Airport)");
  const [needLicensePermit, setNeedLicensePermit] = useState<boolean>(true);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [includeSurfRacks, setIncludeSurfRacks] = useState<boolean>(false);
  const [includeBluetooth, setIncludeBluetooth] = useState<boolean>(true);
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  // Booking Form State
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerTravelMonth, setCustomerTravelMonth] = useState<string>("October 2026");
  const [customerNotes, setCustomerNotes] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `tuktuk_13day_faq_${index}`);
  };

  // Pricing Calculation logic
  const calculatePricing = () => {
    // Base daily rate per Tuk-Tuk
    let baseDailyUSD = driverOption === "self-drive" ? 17 : 35; // $17/day self drive, $35/day with driver
    if (rentalDays >= 14) baseDailyUSD -= 2;
    else if (rentalDays <= 5) baseDailyUSD += 3;

    const baseRentalTotalUSD = baseDailyUSD * rentalDays * tukTukCount;

    // Permit endorsement per self-drive vehicle
    const permitTotalUSD = (driverOption === "self-drive" && needLicensePermit) ? (40 * tukTukCount) : 0;

    // Addons
    const insuranceUSD = includeInsurance ? (3 * rentalDays * tukTukCount) : 0;
    const surfRacksUSD = includeSurfRacks ? (15 * tukTukCount) : 0;
    const bluetoothUSD = includeBluetooth ? 0 : 0; // Free perk

    // Inter-city relocation fee if pickup != dropoff
    const relocationFeeUSD = pickupCity !== dropoffCity ? 30 * tukTukCount : 0;

    const grandTotalUSD = baseRentalTotalUSD + permitTotalUSD + insuranceUSD + surfRacksUSD + relocationFeeUSD;
    const inrRate = 84.5;
    const grandTotalINR = Math.round(grandTotalUSD * inrRate);

    return {
      baseDailyUSD,
      baseRentalTotalUSD,
      permitTotalUSD,
      insuranceUSD,
      surfRacksUSD,
      relocationFeeUSD,
      grandTotalUSD,
      grandTotalINR
    };
  };

  const pricing = calculatePricing();

  // WhatsApp Booking Handler
  const handleWhatsAppBooking = (source: string) => {
    trackEvent("tuktuk_whatsapp_booking_click", "conversion", source);
    
    const formattedPrice = currency === "USD" 
      ? `$${pricing.grandTotalUSD} USD (~₹${pricing.grandTotalINR.toLocaleString("en-IN")})`
      : `₹${pricing.grandTotalINR.toLocaleString("en-IN")} INR (~$${pricing.grandTotalUSD} USD)`;

    const msgLines = [
      `🛺 *13-DAY SRI LANKA TUK-TUK BOOKING REQUEST*`,
      `-----------------------------------------`,
      `👤 *Name:* ${customerName.trim() || "Traveler"}`,
      `📱 *Phone / WhatsApp:* ${customerPhone.trim() || "Not provided yet"}`,
      `🗓️ *Travel Month / Dates:* ${customerTravelMonth}`,
      `🛺 *Tuk-Tuks Required:* ${tukTukCount} Three-Wheeler(s)`,
      `⏳ *Duration:* ${rentalDays} Days`,
      `🕹️ *Type:* ${driverOption === "self-drive" ? "Self-Drive Adventure (with Driving Lesson & Test)" : "With Private Local Chauffeur / Guide"}`,
      `📍 *Pick-Up:* ${pickupCity}`,
      `🏁 *Drop-Off:* ${dropoffCity}`,
      `📄 *Sri Lanka Driving Permit (AAC):* ${needLicensePermit && driverOption === "self-drive" ? "YES (Please arrange endorsement)" : "No / Already have"}`,
      `🛡️ *Full Comprehensive Insurance:* ${includeInsurance ? "YES (Included)" : "Basic"}`,
      `🏄 *Surfboard Roof Racks:* ${includeSurfRacks ? "YES" : "No"}`,
      `🎵 *Bluetooth Audio System:* ${includeBluetooth ? "YES (Included Free)" : "No"}`,
      `💰 *Estimated Total:* ${formattedPrice}`,
      customerNotes.trim() ? `📝 *Special Notes:* ${customerNotes.trim()}` : ``,
      `-----------------------------------------`,
      `Hi Plan Sri Lanka team! Please check Tuk-Tuk availability for these dates, confirm our reservation, and send the license endorsement process. Thank you!`
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/94722968210?text=${encodeURIComponent(msgLines)}`;
    window.open(waUrl, "_blank");
  };

  // 13-Day Detailed Itinerary Data
  const itineraryDays: DayPlan[] = [
    {
      day: 1,
      title: "Airport Arrival, Tuk-Tuk Driving Lesson & Negombo Coast",
      from: "Bandaranaike Airport (CMB)",
      to: "Negombo Beach",
      distanceKm: 15,
      drivingTime: "45 mins",
      routeHighlights: "Quiet coconut plantation backroads, golden Negombo lagoon, Dutch canal",
      activities: [
        {
          time: "09:00 AM - 11:00 AM",
          activity: "Arrival & Handover",
          desc: "Touchdown at CMB Airport, short 15-min transfer to our Negombo Tuk-Tuk depot. Review your AAC Sri Lanka Driving Permit paperwork."
        },
        {
          time: "11:30 AM - 01:30 PM",
          activity: "Comprehensive Driving Lesson & Safety Test",
          desc: "1-on-1 driving lesson with our licensed instructor: master the twist-grip throttle, 4-speed foot-clutch gearbox, reverse gear, and roundabout navigation."
        },
        {
          time: "04:30 PM - 06:30 PM",
          activity: "First Maiden Drive & Sunset at Negombo Beach",
          desc: "Cruise along Lewis Place, sip your first fresh King Coconut (Thambili), and test your Bluetooth sound system at sunset."
        }
      ],
      overnight: "Boutique Coastal Villa or Surf Hotel in Negombo",
      foodHighlight: "Fresh butter garlic jumbo prawns and Negombo fish curry at a beachside shack.",
      tukTukTip: "Remember: In Sri Lanka we drive on the LEFT side of the road. Keep your headlights on low-beam if required and test your horn gently."
    },
    {
      day: 2,
      title: "Negombo to Sigiriya Citadel via Rural Coconut Highways",
      from: "Negombo",
      to: "Sigiriya / Cultural Triangle",
      distanceKm: 145,
      drivingTime: "4.5 hours",
      routeHighlights: "Scenic A3/A6 highways through Kurunegala, giant rock temples, roadside fruit stalls",
      activities: [
        {
          time: "07:30 AM",
          activity: "Early Departure via Kurunegala",
          desc: "Beat the morning heat and navigate inland through Kurunegala. Watch giant granite boulder peaks emerge from the horizon."
        },
        {
          time: "01:00 PM",
          activity: "Village Rice & Curry Pitstop",
          desc: "Park your Tuk-Tuk outside a rural roadside clay-pot buffet. Savor 8 authentic curries with wild red rice for less than $2.50."
        },
        {
          time: "04:00 PM",
          activity: "Arrival in Sigiriya Jungle Oasis",
          desc: "Check into your jungle treehouse or eco-lodge nestled beneath Sigiriya's ancient canopy. Spot wild peacocks crossing your track."
        }
      ],
      overnight: "Eco-Lodge or Treehouse Resort in Sigiriya / Habarana",
      foodHighlight: "Fresh lotus root curry, pol sambol, and wood-fired kottu roti in Habarana village.",
      tukTukTip: "Tuk-Tuk speed limit is strictly 40 km/h in Sri Lanka. Take your time, pull over easily for photos, and yield to express buses."
    },
    {
      day: 3,
      title: "Sigiriya Lion Rock, Pidurangala Sunrise & Polonnaruwa Ruins",
      from: "Sigiriya",
      to: "Polonnaruwa & Back",
      distanceKm: 65,
      drivingTime: "2 hours total",
      routeHighlights: "Gravel jungle trails, Habarana elephant corridor, ancient tank bunds",
      activities: [
        {
          time: "05:00 AM",
          activity: "Pidurangala Rock Sunrise Hike",
          desc: "Short Tuk-Tuk ride to Pidurangala base. 30-minute sunrise scramble for the world-famous golden 360-degree panorama of Sigiriya Fortress."
        },
        {
          time: "10:00 AM",
          activity: "Climb the 1,200 Steps of Sigiriya Citadel",
          desc: "Ascend King Kashyapa's 5th-century UNESCO marvel between the colossal Lion paws to explore royal rooftop palace foundations."
        },
        {
          time: "03:00 PM",
          activity: "Tuk-Tuk Safari around Minneriya / Kaudulla Border",
          desc: "Drive along the ancient water tanks at sunset; you will frequently spot wild Asian elephant herds grazing freely on the edges."
        }
      ],
      overnight: "Sigiriya / Habarana",
      foodHighlight: "Tropical jackfruit curry (Polos) and buffalo curd with organic kithul treacle.",
      tukTukTip: "Never approach wild elephants in a Tuk-Tuk. If you see elephants on the Habarana jungle road, stay at a safe 100m distance and allow them right of way."
    },
    {
      day: 4,
      title: "Sigiriya to Royal Kandy via Dambulla Caves & Matale Spices",
      from: "Sigiriya",
      to: "Kandy (Hill Capital)",
      distanceKm: 90,
      drivingTime: "3.5 hours",
      routeHighlights: "A9 highway, Dambulla Golden Rock Temple, lush spice groves of Matale",
      activities: [
        {
          time: "08:30 AM",
          activity: "Dambulla Golden Cave Temples",
          desc: "Climb the granite slope to 5 ancient cave sanctuaries housing 150+ gilded Buddha statues and 2,000-year-old ceiling frescoes."
        },
        {
          time: "12:30 PM",
          activity: "Matale Spice Valley Drive",
          desc: "Wind through lush vanilla, cardamom, and clove groves. Stop for hot herbal ginger tea and organic essential oil demonstrations."
        },
        {
          time: "04:30 PM",
          activity: "Kandy Lake Cruise & Temple of the Sacred Tooth",
          desc: "Park by Kandy Lake, watch evening Buddhist drumming rituals (Thevava) at the UNESCO Sri Dalada Maligawa."
        }
      ],
      overnight: "Colonial Hillside Hotel or Boutique Manor in Kandy",
      foodHighlight: "Authentic Kandyan egg hoppers and spiced cardamom milk tea near the lake.",
      tukTukTip: "The road from Matale into Kandy starts gaining elevation. Shift into 2nd gear on steep inclines to keep your 200cc engine humming smoothly."
    },
    {
      day: 5,
      title: "Kandy to Nuwara Eliya: Climbing Ramboda Pass & Tea Highlands",
      from: "Kandy",
      to: "Nuwara Eliya (Little England)",
      distanceKm: 78,
      drivingTime: "3.5 hours",
      routeHighlights: "Endless emerald tea hills, Ramboda Waterfall curves, cool 15°C mountain air",
      activities: [
        {
          time: "08:00 AM",
          activity: "Ascend the Great Tea Route (A5)",
          desc: "Feel the climate drop from tropical warmth to crisp mountain breezes as you zigzag past cascading waterfalls and tea pluckers."
        },
        {
          time: "11:30 AM",
          activity: "Damro Labookellie Tea Factory Tour",
          desc: "Pull your Tuk-Tuk right into the working tea estate. Walk through orthodox drying rollers and sip steaming single-estate Orange Pekoe."
        },
        {
          time: "03:30 PM",
          activity: "Explore Nuwara Eliya & Gregory Lake",
          desc: "Admire red-brick British colonial post offices, race course, and cruise along Gregory Lake with mountain mist rolling in."
        }
      ],
      overnight: "Colonial Tea Bungalow or Historic Inn in Nuwara Eliya",
      foodHighlight: "English high tea with fresh highland strawberry tarts and warm scones.",
      tukTukTip: "Pack a warm fleece or jacket! Nuwara Eliya sits at 1,868m elevation and night temperatures drop to 12°C-15°C. Your Tuk-Tuk has windshield rain curtains for comfort."
    },
    {
      day: 6,
      title: "Nuwara Eliya to Ella: Nine Arch Bridge & Misty Hairpins",
      from: "Nuwara Eliya",
      to: "Ella Valley",
      distanceKm: 60,
      drivingTime: "2.5 hours",
      routeHighlights: "Spectacular Ella Gap descents, Ravana Falls highway, eucalyptus forests",
      activities: [
        {
          time: "09:00 AM",
          activity: "Scenic Highland Descent to Ella",
          desc: "One of the most cinematic Tuk-Tuk driving stretches in the world. Sweep through hairpin bends with jaw-dropping valley drops."
        },
        {
          time: "01:30 PM",
          activity: "Nine Arch Bridge Train Spotting",
          desc: "Park near the jungle trailhead and walk down to the iconic 1921 British stone viaduct. Watch the blue passenger train rumble across."
        },
        {
          time: "05:00 PM",
          activity: "Sunset Cocktails at Cafe Chill",
          desc: "Soak in the bohemian backpacking energy of Ella town with wood-fired pizzas, coconut mojitos, and acoustic live tunes."
        }
      ],
      overnight: "Valley-View Cliff Eco Lodge in Ella",
      foodHighlight: "Sri Lankan Lamprais wrapped in charred banana leaves and local passionfruit smoothies.",
      tukTukTip: "Test your Tuk-Tuk footbrake before descending long slopes. Use engine braking in 2nd/3rd gear rather than riding the brake continuously."
    },
    {
      day: 7,
      title: "Ella Exploration: Little Adam's Peak & Secret Ravana Pools",
      from: "Ella",
      to: "Ella & Surroundings",
      distanceKm: 30,
      drivingTime: "1 hour total",
      routeHighlights: "Off-road mountain dirt tracks, Ravana Pool Club, cliff viewpoints",
      activities: [
        {
          time: "06:30 AM",
          activity: "Little Adam's Peak Morning Hike",
          desc: "Gentle 45-minute trek through tea terraces to the razorback summit. Gaze out at the boundless southern plains 1,000 meters below."
        },
        {
          time: "11:00 AM",
          activity: "Flying Ravana Mega Zipline",
          desc: "Soar over tea valleys at 80 km/h on South Asia's longest dual zipline."
        },
        {
          time: "03:00 PM",
          activity: "Ravana Falls & Secret Natural Rock Pools",
          desc: "Drive your Tuk-Tuk down the canyon to dip your feet in the thunderous lower cascades of Ravana Ella."
        }
      ],
      overnight: "Ella",
      foodHighlight: "Kottu roti cooking masterclass with a local hill-country family.",
      tukTukTip: "Ella has several steep gravel tracks leading to hillside villas. If carrying two passengers and luggage, keep the engine in 1st gear."
    },
    {
      day: 8,
      title: "Ella to Udawalawe: Descending to the Elephant Savannah",
      from: "Ella",
      to: "Udawalawe National Park",
      distanceKm: 100,
      drivingTime: "3.5 hours",
      routeHighlights: "Ella pass descent, Wellawaya agricultural plains, giant reservoir bunds",
      activities: [
        {
          time: "08:30 AM",
          activity: "Drive Down through Wellawaya",
          desc: "Descend from the mountains into the dry-zone plains. The landscape transitions from tea to swaying palmyra palms and paddy fields."
        },
        {
          time: "01:30 PM",
          activity: "Udawalawe Elephant Transit Home",
          desc: "Watch 40+ orphaned baby elephants receive their afternoon milk feeding before being rehabilitated back into the wild."
        },
        {
          time: "03:30 PM - 06:30 PM",
          activity: "Private 4x4 Jeep Safari into Udawalawe",
          desc: "Switch your Tuk-Tuk for an open-top 4x4 safari jeep. Spot 50+ wild elephants, water buffaloes, crocodiles, and painted storks."
        }
      ],
      overnight: "Safari Glamping Tent or River Eco-Resort in Udawalawe",
      foodHighlight: "Authentic dry-zone wild honey pancakes and traditional wood-apple juice.",
      tukTukTip: "Fuel up in Wellawaya town before heading into the national park area. Gas stations are 20km apart in rural safari zones."
    },
    {
      day: 9,
      title: "Udawalawe to Hiriketiya: Ocean Arrival at the Horseshoe Bay",
      from: "Udawalawe",
      to: "Hiriketiya / Dikwella Coast",
      distanceKm: 75,
      drivingTime: "2.5 hours",
      routeHighlights: "Southern inland rubber plantations, turquoise Indian Ocean emergence",
      activities: [
        {
          time: "08:30 AM",
          activity: "Drive to the Golden South Coast",
          desc: "Feel the salty ocean breeze as you arrive in Hiriketiya, Sri Lanka's trendiest bohemian horseshoe surf bay."
        },
        {
          time: "01:00 PM",
          activity: "Surfing & Ocean Swimming in the Bay",
          desc: "Strap your rental surfboard off your Tuk-Tuk roof rack and paddle out into the mellow peeling left-hand point break."
        },
        {
          time: "05:30 PM",
          activity: "Sunset Wood-Fired Pizza & Craft Beers",
          desc: "Relax on beanbags under swaying coconut palms at Smoke & Bitters (voted among Asia's Top 50 Bars)."
        }
      ],
      overnight: "Boutique Surf Villa or Cabana in Hiriketiya / Dikwella",
      foodHighlight: "Catch-of-the-day grilled red snapper, coconut ceviche, and local craft cocktails.",
      tukTukTip: "Park your Tuk-Tuk under palm trees, but check overhead for falling coconuts! Experienced locals always look up before parking."
    },
    {
      day: 10,
      title: "Hiriketiya to Mirissa & Weligama: Coconut Hills & Secret Beaches",
      from: "Hiriketiya",
      to: "Mirissa / Weligama Bay",
      distanceKm: 35,
      drivingTime: "1 hour",
      routeHighlights: "Coastal Matara road, Dondra Head Lighthouse (southernmost tip of Sri Lanka)",
      activities: [
        {
          time: "09:00 AM",
          activity: "Dondra Lighthouse Pitstop",
          desc: "Drive to the southernmost tip of Sri Lanka. Admire the towering 1889 white stone lighthouse overlooking endless open ocean to Antarctica."
        },
        {
          time: "11:30 AM",
          activity: "Coconut Tree Hill Photoshoot",
          desc: "Tuk-Tuk straight to Mirissa's famous cliff top studded with angled palm trees for postcard-perfect ocean snapshots."
        },
        {
          time: "04:00 PM",
          activity: "Sunset Longboard Surf Session in Weligama",
          desc: "Cruise along Weligama's 2km sand-bottom bay—the safest surf spot in South Asia for beginners and intermediate surfers."
        }
      ],
      overnight: "Beachfront Boutique Resort in Weligama or Mirissa",
      foodHighlight: "Fresh tuna poke bowls, avocado toast, and beachside charcoal grilled seafood.",
      tukTukTip: "The coastal road between Matara and Weligama is flat and smooth. Watch out for colourful private buses overtaking on straight stretches."
    },
    {
      day: 11,
      title: "Weligama to Galle Fort: Stilt Fishermen & UNESCO Ramparts",
      from: "Weligama",
      to: "Galle Dutch Fort",
      distanceKm: 30,
      drivingTime: "50 mins",
      routeHighlights: "Ahangama surf shacks, Koggala stilt fishermen, colonial Dutch bastions",
      activities: [
        {
          time: "09:30 AM",
          activity: "Koggala Stilt Fishermen & Ahangama Cafes",
          desc: "Cruise past iconic fishermen perched on wooden poles above coral reefs. Stop at specialty coffee roasteries in Ahangama."
        },
        {
          time: "02:00 PM",
          activity: "Drive Inside UNESCO 17th-Century Galle Fort",
          desc: "Navigate narrow cobblestone lanes lined with Portuguese and Dutch colonial mansions, jewelry boutiques, and gelato parlours."
        },
        {
          time: "05:30 PM",
          activity: "Sunset Walk along the Fort Ocean Ramparts",
          desc: "Join locals and travelers watching cliff divers leap into the sea as the sun dips into the Indian Ocean by the lighthouse."
        }
      ],
      overnight: "Historic Colonial Manor inside Galle Fort",
      foodHighlight: "Artisan Italian gelato at Pedlar's Inn and Ceylon crab curry dinner inside the fort.",
      tukTukTip: "Tuk-Tuks are permitted inside Galle Fort, but pedestrian lanes are narrow. Drive at 10-15 km/h and respect walkers."
    },
    {
      day: 12,
      title: "Galle Fort to Bentota: Mangrove Boat Safaris & Sea Turtles",
      from: "Galle",
      to: "Bentota & Madu Ganga",
      distanceKm: 55,
      drivingTime: "1.5 hours",
      routeHighlights: "Scenic coastal A2 highway, Hikkaduwa coral sanctuary, Madu River wetlands",
      activities: [
        {
          time: "09:30 AM",
          activity: "Hikkaduwa Sea Turtle Encounter",
          desc: "Wade into the shallow reef at Hikkaduwa beach where giant green sea turtles swim right up to the shoreline."
        },
        {
          time: "01:30 PM",
          activity: "Madu Ganga Mangrove River Safari",
          desc: "Glide through 64 mangrove islands, visit cinnamon peeling island, and experience a natural fish foot spa."
        },
        {
          time: "04:30 PM",
          activity: "Golden Sunset on Bentota Beach",
          desc: "Relax on Sri Lanka's widest golden sand spit, with water sports, jet skiing, and calm ocean swimming."
        }
      ],
      overnight: "Luxury Riverside or Beachfront Resort in Bentota",
      foodHighlight: "River lobster curry, grilled calamari, and cold ginger beer.",
      tukTukTip: "Remember: Three-wheelers cannot enter the Southern Expressway (E01). Stick to the scenic coastal Galle Road (A2) which runs right by the ocean!"
    },
    {
      day: 13,
      title: "Bentota to Negombo / CMB Airport: Final Drive & Handover",
      from: "Bentota",
      to: "Colombo / CMB Airport (Negombo)",
      distanceKm: 85,
      drivingTime: "2.5 hours",
      routeHighlights: "Colombo coastal marine drive, Dutch hospital shopping, smooth vehicle return",
      activities: [
        {
          time: "09:00 AM",
          activity: "Coastal Cruise to Colombo",
          desc: "Drive alongside the ocean railway tracks up into Colombo. Stop at Barefoot for artisan handloom souvenirs and Ceylon tea gifts."
        },
        {
          time: "02:00 PM",
          activity: "Return to Negombo Depot & Vehicle Handover",
          desc: "Complete the easy 10-minute return vehicle check, return your keys, receive your security deposit refund, and celebrate 1,100 km of epic memories!"
        },
        {
          time: "04:30 PM",
          activity: "Complimentary Transfer to CMB Departure Terminal",
          desc: "Short 10-minute shuttle directly to Bandaranaike International Airport for your flight home."
        }
      ],
      overnight: "Departure Flight Home",
      foodHighlight: "Ministry of Crab or seaside Kottu feast at Galle Face Green before airport drop-off.",
      tukTukTip: "Give your Tuk-Tuk a quick brush down and return with the fuel tank at the same level as pickup (usually full)."
    }
  ];

  // FAQ list
  const faqs = [
    {
      q: "Can foreigners legally drive a Tuk-Tuk in Sri Lanka?",
      a: "Yes! However, you CANNOT drive on just an International Driving Permit (IDP) alone. Sri Lankan law strictly requires your regular home driving license or IDP to be officially endorsed by the Automobile Association of Ceylon (AAC) to issue a legal Sri Lankan Three-Wheeler Driving Permit. When you book with us, we handle the entire AAC government endorsement paperwork ahead of time so your legal permit is ready upon arrival!"
    },
    {
      q: "I have never driven a Tuk-Tuk before. Is it easy to learn?",
      a: "Absolutely! 95% of our self-drive travelers have never driven a three-wheeler before. On Day 1 in Negombo, we provide a mandatory, comprehensive 1-on-1 driving lesson with our patient English-speaking instructor on quiet practice roads. You will learn the 4-speed hand/foot clutch, steering, braking, reversing, and Sri Lankan traffic etiquette until you feel 100% confident."
    },
    {
      q: "What happens if my Tuk-Tuk breaks down or gets a flat tire in the mountains?",
      a: "Every rental includes 24/7 on-demand roadside assistance across the entire island. Because Tuk-Tuks are Sri Lanka's national vehicle, every single village has local mechanics and spare parts within 5-10 minutes. In addition, our team is on live WhatsApp standby to dispatch our mobile repair network or replace your vehicle if needed."
    },
    {
      q: "Are Tuk-Tuks allowed on Sri Lankan highways and expressways?",
      a: "No. By national law, three-wheelers, motorcycles, and tractors are prohibited from entry on Class-E Expressways (such as the Southern Expressway E01 or Airport Expressway E03). You must travel via the scenic A and B roads (e.g., A2 Coastal Road, A6 Cultural Triangle, A5 Highland Pass), which is actually much more scenic, cultural, and fun!"
    },
    {
      q: "How much luggage can fit inside a Tuk-Tuk?",
      a: "A standard Bajaj RE Tuk-Tuk comfortably carries 2 to 3 passengers plus 2 large 70L backpack/suitcases in the dedicated rear luggage compartment, plus daypacks on the floorboard. If you are carrying surfboards, we install secure foam-padded surfboard roof racks upon request."
    },
    {
      q: "What is the fuel economy and cost for this 13-day trip?",
      a: "Tuk-Tuks are remarkably fuel efficient, delivering between 25 to 30 km per Liter of 92 Octane petrol. For this entire 13-day ~1,100 km island loop, your total petrol expenditure will only be approximately $35 to $45 USD (₹3,000 – ₹3,800 INR) in total!"
    },
    {
      q: "Can I pick up in Negombo and drop off in Galle or Ella?",
      a: "Yes! We support flexible one-way rentals across Sri Lanka (Negombo, Colombo, Kandy, Ella, Galle, Weligama, Mirissa, Arugam Bay, Sigiriya). A modest inter-city vehicle relocation fee applies if dropping off in a different city."
    },
    {
      q: "How does the WhatsApp booking process work?",
      a: "Simply select your dates and preferred options in our interactive booking configurator on this page, and click 'Book Instantly on WhatsApp'. You will chat directly with our Sri Lanka operations team on WhatsApp (+94 72 296 8210) to confirm your dates, review your driving license photos, lock in your vehicle, and receive your comprehensive itinerary pack!"
    }
  ];

  // Structured Data Schema for SEO & Rich Snippets
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "13-Day Sri Lanka Tuk-Tuk Itinerary & Self-Drive Booking Guide (2026)",
      "description": "The ultimate 13-day self-drive Tuk-Tuk itinerary across Sri Lanka: Negombo, Sigiriya, Kandy, Nuwara Eliya, Ella, Yala, Hiriketiya, Galle Fort. Includes driving license endorsement and direct WhatsApp booking.",
      "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
      "author": {
        "@type": "Person",
        "name": "Oshada Adithya",
        "jobTitle": "Lead Island Travel Stylist",
        "url": "https://plan-srilanka.com/about-founder"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Plan Sri Lanka",
        "logo": {
          "@type": "ImageObject",
          "url": "https://plan-srilanka.com/logo.png"
        }
      },
      "datePublished": "2026-01-20T08:00:00+05:30",
      "dateModified": "2026-08-25T10:00:00+05:30",
      "mainEntityOfPage": "https://plan-srilanka.com/sri-lanka-13-day-tuk-tuk-itinerary"
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Sri Lanka 13-Day Self-Drive Tuk-Tuk Rental & Adventure Package",
      "description": "Comprehensive self-drive Tuk-Tuk rental in Sri Lanka including AAC driving permit endorsement, comprehensive insurance, 1-on-1 driving lesson, 24/7 roadside assistance, and phone mount.",
      "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
      "brand": {
        "@type": "Brand",
        "name": "Plan Sri Lanka Tuk-Tuk Adventures"
      },
      "offers": {
        "@type": "Offer",
        "price": "17.00",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://plan-srilanka.com/sri-lanka-13-day-tuk-tuk-itinerary"
      }
    },
    {
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
          "name": "Itineraries",
          "item": "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "13-Day Tuk-Tuk Itinerary & Booking",
          "item": "https://plan-srilanka.com/sri-lanka-13-day-tuk-tuk-itinerary"
        }
      ]
    },
    {
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
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#E5D5B8] selection:text-[#1A1A1A] pb-24">
      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* HERO SECTION */}
      <header className="relative pt-12 pb-14 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#E8E4D9]">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#7A7365]">
            <li>
              <Link to="/" className="hover:text-[#1F3D2B] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/sri-lanka-7-day-itinerary" className="hover:text-[#1F3D2B] transition-colors">
                Itineraries
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#1F3D2B] font-bold" aria-current="page">
              13-Day Tuk-Tuk Self-Drive & Booking
            </li>
          </ol>
        </nav>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF3ED] text-[#1F3D2B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#C5DAC9]">
          <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
          <span>The Ultimate Self-Drive Island Adventure</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F3D2B] tracking-tight leading-[1.15] mb-6">
          Sri Lanka 13-Day Tuk-Tuk Itinerary: Self-Drive Loop & Direct WhatsApp Booking (2026)
        </h1>

        <p className="text-lg sm:text-xl text-[#4A453A] leading-relaxed max-w-3xl mb-6 font-sans">
          Driving your own Tuk-Tuk (three-wheeler) across Sri Lanka is the ultimate bucket-list road trip. Cover <strong>1,100 km of jungle trails, ancient fortresses, misty tea mountains, elephant savannas, and secret surf beaches</strong> at your own pace.
        </p>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#332F28] font-mono border-t border-[#E8E4D9] pt-4">
          <div className="bg-white p-3 rounded-xl border border-[#E8E4D9] flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#1F3D2B] shrink-0" />
            <div>
              <span className="text-[10px] text-[#7A7365] uppercase block">Duration</span>
              <strong>13 Full Days</strong>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#E8E4D9] flex items-center gap-2.5">
            <Navigation className="w-4 h-4 text-[#1F3D2B] shrink-0" />
            <div>
              <span className="text-[10px] text-[#7A7365] uppercase block">Total Distance</span>
              <strong>~1,100 km Loop</strong>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#E8E4D9] flex items-center gap-2.5">
            <Fuel className="w-4 h-4 text-[#1F3D2B] shrink-0" />
            <div>
              <span className="text-[10px] text-[#7A7365] uppercase block">Fuel Cost</span>
              <strong>~$35-$45 Total</strong>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#E8E4D9] flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#1F3D2B] shrink-0" />
            <div>
              <span className="text-[10px] text-[#7A7365] uppercase block">AAC License</span>
              <strong>Endorsement Done</strong>
            </div>
          </div>
        </div>
      </header>

      {/* QUICK JUMP TO BOOKING BUTTON BAR */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-[#1F3D2B] text-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2C523B] flex items-center justify-center text-2xl shrink-0">
              🛺
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg">Want to Book a Tuk-Tuk Instantly?</h3>
              <p className="text-xs text-[#C5DAC9]">Self-drive rentals from $17/day with full insurance, driving lessons & AAC permit endorsement.</p>
            </div>
          </div>
          <a
            href="#whatsapp-booking-section"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Go to WhatsApp Booking</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">

        {/* ========================================================================= */}
        {/* ⭐ DEDICATED DIRECT WHATSAPP TUK-TUK BOOKING ENGINE SECTION ⭐ */}
        {/* ========================================================================= */}
        <section
          id="whatsapp-booking-section"
          className="scroll-mt-24 rounded-3xl bg-gradient-to-b from-[#FFFFFF] to-[#F5F8F6] border-2 border-[#1F3D2B] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Top Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#E8E4D9] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B] text-2xl shadow-inner">
                🛺
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-[#1F3D2B] uppercase tracking-wider bg-[#EBF3ED] px-2.5 py-0.5 rounded-full border border-[#C5DAC9]">
                  Direct WhatsApp Reservation Engine
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B] mt-1">
                  Book Your Sri Lanka Tuk-Tuk & Itinerary on WhatsApp
                </h2>
              </div>
            </div>

            {/* Currency Toggle */}
            <div className="flex items-center gap-1.5 bg-[#EFECE6] p-1 rounded-xl text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 rounded-lg transition-all ${currency === "USD" ? "bg-[#1F3D2B] text-white shadow-sm" : "text-[#5A5448] hover:text-black"}`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-3 py-1 rounded-lg transition-all ${currency === "INR" ? "bg-[#1F3D2B] text-white shadow-sm" : "text-[#5A5448] hover:text-black"}`}
              >
                INR (₹)
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#4A453A] leading-relaxed mb-8">
            Configure your rental options below. Our calculator instantly determines your quotation. When you click <strong>"Book Instantly on WhatsApp"</strong>, your customized details are pre-formatted so you can lock in your dates directly with our local Sri Lanka concierge team in real-time.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Driver Type Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block">
                  1. How Do You Want to Explore?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDriverOption("self-drive");
                      trackEvent("tuktuk_driver_toggle", "engagement", "self_drive");
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      driverOption === "self-drive"
                        ? "border-[#1F3D2B] bg-[#EBF3ED] ring-2 ring-[#1F3D2B]/20 shadow-sm"
                        : "border-[#E8E4D9] bg-white hover:bg-[#FAF8F3]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-sm font-serif text-[#1F3D2B]">Self-Drive Freedom</strong>
                      <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-white px-2 py-0.5 rounded-md border border-[#C5DAC9]">
                        $17 / day
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5A5448]">Drive yourself! Includes 1-on-1 driving lesson, test & 24/7 roadside assist.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDriverOption("with-driver");
                      trackEvent("tuktuk_driver_toggle", "engagement", "with_driver");
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      driverOption === "with-driver"
                        ? "border-[#1F3D2B] bg-[#EBF3ED] ring-2 ring-[#1F3D2B]/20 shadow-sm"
                        : "border-[#E8E4D9] bg-white hover:bg-[#FAF8F3]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-sm font-serif text-[#1F3D2B]">With Private Chauffeur</strong>
                      <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-white px-2 py-0.5 rounded-md border border-[#C5DAC9]">
                        $35 / day
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5A5448]">Sit back & relax! English-speaking licensed driver-guide handles the driving.</p>
                  </button>
                </div>
              </div>

              {/* 2. Duration & Vehicle Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2">
                    2. Rental Duration (Days)
                  </label>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setRentalDays(Math.max(3, rentalDays - 1))}
                      className="w-10 h-10 rounded-xl bg-[#EFECE6] hover:bg-[#E2DDD5] text-lg font-bold flex items-center justify-center text-[#1F3D2B] transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-mono font-bold text-[#1F3D2B]">{rentalDays} Days</span>
                    <button
                      type="button"
                      onClick={() => setRentalDays(Math.min(30, rentalDays + 1))}
                      className="w-10 h-10 rounded-xl bg-[#EFECE6] hover:bg-[#E2DDD5] text-lg font-bold flex items-center justify-center text-[#1F3D2B] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] text-[#7A7365] block text-center mt-1">Recommended for full loop: 13 Days</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2">
                    3. Number of Tuk-Tuks
                  </label>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setTukTukCount(Math.max(1, tukTukCount - 1))}
                      className="w-10 h-10 rounded-xl bg-[#EFECE6] hover:bg-[#E2DDD5] text-lg font-bold flex items-center justify-center text-[#1F3D2B] transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-mono font-bold text-[#1F3D2B]">
                      {tukTukCount} {tukTukCount === 1 ? "Vehicle" : "Vehicles"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTukTukCount(Math.min(6, tukTukCount + 1))}
                      className="w-10 h-10 rounded-xl bg-[#EFECE6] hover:bg-[#E2DDD5] text-lg font-bold flex items-center justify-center text-[#1F3D2B] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] text-[#7A7365] block text-center mt-1">Fits 2-3 adults + luggage per Tuk-Tuk</span>
                </div>
              </div>

              {/* 3. Pick-up and Drop-off locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1F3D2B]" /> Pick-Up City
                  </label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                  >
                    <option value="Negombo (Near CMB Airport)">Negombo (Near CMB Airport)</option>
                    <option value="Colombo City Center">Colombo City Center</option>
                    <option value="Kandy Hill Country">Kandy Hill Country</option>
                    <option value="Galle Fort">Galle Fort</option>
                    <option value="Ella Mountain Valley">Ella Mountain Valley</option>
                    <option value="Mirissa / Weligama">Mirissa / Weligama Coast</option>
                    <option value="Sigiriya / Cultural Triangle">Sigiriya / Cultural Triangle</option>
                  </select>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#1F3D2B]" /> Drop-Off City
                  </label>
                  <select
                    value={dropoffCity}
                    onChange={(e) => setDropoffCity(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                  >
                    <option value="Negombo (Near CMB Airport)">Negombo (Near CMB Airport)</option>
                    <option value="Colombo City Center">Colombo City Center</option>
                    <option value="Galle Fort">Galle Fort</option>
                    <option value="Ella Mountain Valley">Ella Mountain Valley</option>
                    <option value="Mirissa / Weligama">Mirissa / Weligama Coast</option>
                    <option value="Kandy Hill Country">Kandy Hill Country</option>
                    <option value="Arugam Bay (East Coast)">Arugam Bay (East Coast)</option>
                  </select>
                </div>
              </div>

              {/* 4. Add-ons and Essentials Checkboxes */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E4D9] space-y-3">
                <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2">
                  4. Add-ons & Legal Road Trip Inclusions
                </label>

                {driverOption === "self-drive" && (
                  <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] transition-colors cursor-pointer border border-[#E8E4D9]">
                    <input
                      type="checkbox"
                      checked={needLicensePermit}
                      onChange={(e) => setNeedLicensePermit(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#1F3D2B] focus:ring-[#1F3D2B]"
                    />
                    <div className="text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#1F3D2B] flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Sri Lanka Driving Permit Endorsement (AAC)
                        </strong>
                        <span className="font-mono font-bold text-[#1F3D2B]">+$40 one-time</span>
                      </div>
                      <p className="text-[#7A7365] text-[11px] mt-0.5">
                        Mandatory by Sri Lankan law. We process your home license / IDP at the Automobile Association of Ceylon so it is legally ready on arrival.
                      </p>
                    </div>
                  </label>
                )}

                <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] transition-colors cursor-pointer border border-[#E8E4D9]">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#1F3D2B] focus:ring-[#1F3D2B]"
                  />
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#1F3D2B] flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-600" />
                        Comprehensive Full Coverage Insurance ($0 Excess)
                      </strong>
                      <span className="font-mono font-bold text-[#1F3D2B]">+$3 / day</span>
                    </div>
                    <p className="text-[#7A7365] text-[11px] mt-0.5">
                      Covers third party, passenger liability, vehicle damages, and 24/7 towing with zero deductible stress.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] transition-colors cursor-pointer border border-[#E8E4D9]">
                  <input
                    type="checkbox"
                    checked={includeSurfRacks}
                    onChange={(e) => setIncludeSurfRacks(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#1F3D2B] focus:ring-[#1F3D2B]"
                  />
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#1F3D2B] flex items-center gap-1.5">
                        <Palmtree className="w-3.5 h-3.5 text-emerald-600" />
                        Surfboard Foam Roof Racks & Tie-Down Straps
                      </strong>
                      <span className="font-mono font-bold text-[#1F3D2B]">+$15 one-time</span>
                    </div>
                    <p className="text-[#7A7365] text-[11px] mt-0.5">
                      Custom roof-mounted foam racks to securely strap up to 2 longboards or shortboards for southern surf safaris.
                    </p>
                  </div>
                </label>

                {/* Free Included Perks */}
                <div className="p-3 bg-[#EBF3ED] rounded-xl border border-[#C5DAC9] flex flex-wrap items-center gap-3 text-[11px] text-[#1F3D2B]">
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free Bluetooth Audio
                  </span>
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Phone Mount & USB Charger
                  </span>
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Spare Wheel & Tool Roll
                  </span>
                  <span className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 1-on-1 Driving Lesson
                  </span>
                </div>
              </div>

              {/* 5. Contact Details Inputs */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E4D9] space-y-4">
                <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block">
                  5. Your Details (For Instant WhatsApp Confirmation)
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-[#5A5448] font-medium block mb-1">Your Full Name:</span>
                    <input
                      type="text"
                      placeholder="e.g. Alex Henderson"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#5A5448] font-medium block mb-1">WhatsApp Phone Number:</span>
                    <input
                      type="text"
                      placeholder="e.g. +44 7700 900077 / +91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-[#5A5448] font-medium block mb-1">Travel Month / Start Date:</span>
                    <input
                      type="text"
                      placeholder="e.g. Oct 15 - Oct 28, 2026"
                      value={customerTravelMonth}
                      onChange={(e) => setCustomerTravelMonth(e.target.value)}
                      className="w-full text-xs bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#5A5448] font-medium block mb-1">Special Requests / Questions:</span>
                    <input
                      type="text"
                      placeholder="e.g. Need hotel recommendations too"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full text-xs bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Quotation Summary & WhatsApp Button */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-[#1F3D2B] text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6 sticky top-28">
                
                <div className="flex items-center justify-between border-b border-[#2C523B] pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5DAC9] uppercase tracking-wider block">Estimated Quotation</span>
                    <h3 className="text-xl font-serif font-bold text-white">Your Tuk-Tuk Package</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-[#2C523B] text-[#F2C94C] text-xs font-mono font-bold rounded-lg border border-[#3E6B4F]">
                    {rentalDays} Days Loop
                  </span>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-2.5 text-xs text-[#E8E4D9]">
                  <div className="flex justify-between">
                    <span>
                      {driverOption === "self-drive" ? "Self-Drive Rental" : "Chauffeur Rental"} ({tukTukCount}x {rentalDays}d):
                    </span>
                    <span className="font-mono font-semibold text-white">
                      ${pricing.baseRentalTotalUSD} USD
                    </span>
                  </div>

                  {pricing.permitTotalUSD > 0 && (
                    <div className="flex justify-between">
                      <span>Sri Lanka AAC Driving Permits ({tukTukCount}x):</span>
                      <span className="font-mono font-semibold text-white">${pricing.permitTotalUSD} USD</span>
                    </div>
                  )}

                  {pricing.insuranceUSD > 0 && (
                    <div className="flex justify-between">
                      <span>Comprehensive Insurance ($0 Excess):</span>
                      <span className="font-mono font-semibold text-white">${pricing.insuranceUSD} USD</span>
                    </div>
                  )}

                  {pricing.surfRacksUSD > 0 && (
                    <div className="flex justify-between">
                      <span>Surfboard Roof Racks:</span>
                      <span className="font-mono font-semibold text-white">${pricing.surfRacksUSD} USD</span>
                    </div>
                  )}

                  {pricing.relocationFeeUSD > 0 && (
                    <div className="flex justify-between">
                      <span>One-Way Relocation ({pickupCity.split(" ")[0]} → {dropoffCity.split(" ")[0]}):</span>
                      <span className="font-mono font-semibold text-white">${pricing.relocationFeeUSD} USD</span>
                    </div>
                  )}

                  <div className="flex justify-between text-emerald-300">
                    <span>1-on-1 Driving Lesson & Test:</span>
                    <span className="font-mono font-bold">FREE INCLUDED</span>
                  </div>

                  <div className="flex justify-between text-emerald-300">
                    <span>Bluetooth Sound System & Phone Mount:</span>
                    <span className="font-mono font-bold">FREE INCLUDED</span>
                  </div>

                  <div className="flex justify-between text-emerald-300">
                    <span>24/7 Islandwide WhatsApp Roadside Assist:</span>
                    <span className="font-mono font-bold">FREE INCLUDED</span>
                  </div>
                </div>

                {/* Grand Total Display */}
                <div className="bg-[#142A1D] p-4 rounded-2xl border border-[#2C523B] text-center space-y-1">
                  <span className="text-[11px] font-mono uppercase text-[#C5DAC9] tracking-wider block">
                    Total Estimated Package Cost
                  </span>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#F2C94C]">
                    {currency === "USD" ? `$${pricing.grandTotalUSD} USD` : `₹${pricing.grandTotalINR.toLocaleString("en-IN")} INR`}
                  </div>
                  <span className="text-[11px] text-[#A3BFAB] block">
                    {currency === "USD" ? `(~₹${pricing.grandTotalINR.toLocaleString("en-IN")} INR)` : `(~$${pricing.grandTotalUSD} USD)`} • For {tukTukCount} vehicle(s)
                  </span>
                </div>

                {/* Big WhatsApp CTA Button */}
                <button
                  type="button"
                  onClick={() => handleWhatsAppBooking("booking_widget_sidebar")}
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Book Instantly on WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-[#C5DAC9] pt-2 border-t border-[#2C523B]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant Reply
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Vehicles
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Hidden Fees
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: 13-DAY ITINERARY INTERACTIVE TABBED VIEWER */}
        {/* ========================================================================= */}
        <section aria-labelledby="itinerary-heading" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">The Classic 1,100 km Loop</span>
              <h2 id="itinerary-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                13-Day Sri Lanka Tuk-Tuk Route Day-by-Day
              </h2>
            </div>
            <span className="text-xs font-mono bg-[#EBF3ED] text-[#1F3D2B] px-3 py-1.5 rounded-full border border-[#C5DAC9] font-bold">
              Negombo → Sigiriya → Kandy → Nuwara Eliya → Ella → Yala → South Coast → Colombo
            </span>
          </div>

          {/* Horizontal Day Selector Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin">
            {itineraryDays.map((d) => (
              <button
                key={d.day}
                type="button"
                onClick={() => {
                  setActiveDay(d.day);
                  trackEvent("tuktuk_day_tab_click", "engagement", `day_${d.day}`);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeDay === d.day
                    ? "bg-[#1F3D2B] text-white shadow-md scale-105"
                    : "bg-white border border-[#E8E4D9] text-[#5A5448] hover:border-[#1F3D2B] hover:text-[#1F3D2B]"
                }`}
              >
                <span>Day {d.day}</span>
                {activeDay === d.day && <span className="w-1.5 h-1.5 rounded-full bg-[#F2C94C]"></span>}
              </button>
            ))}
          </div>

          {/* Active Day Detail Card */}
          {(() => {
            const day = itineraryDays.find((d) => d.day === activeDay) || itineraryDays[0];
            return (
              <div className="bg-white rounded-3xl border border-[#E8E4D9] p-6 sm:p-8 shadow-lg space-y-6">
                
                {/* Header of Active Day */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4D9] pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Day {day.day} of 13
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3D2B] mt-2">
                      {day.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5A5448]">
                    <span className="bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E8E4D9] flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-[#1F3D2B]" />
                      <strong>{day.from} → {day.to}</strong>
                    </span>
                    <span className="bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E8E4D9] flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#1F3D2B]" />
                      <strong>{day.distanceKm} km</strong> ({day.drivingTime})
                    </span>
                  </div>
                </div>

                {/* Route Overview */}
                <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#E8E4D9] text-xs sm:text-sm text-[#4A453A]">
                  <strong className="text-[#1F3D2B] font-mono uppercase text-xs block mb-1">Route Highlights:</strong>
                  {day.routeHighlights}
                </div>

                {/* Activities Schedule */}
                <div className="space-y-4">
                  <h4 className="text-sm font-mono font-bold uppercase text-[#7A7365] tracking-wider">
                    Recommended Schedule & Stops:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.activities.map((act, idx) => (
                      <div key={idx} className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E8E4D9] shadow-sm space-y-2">
                        <span className="text-[10px] font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2 py-0.5 rounded-md">
                          {act.time}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-[#1F3D2B]">{act.activity}</h5>
                        <p className="text-xs text-[#5A5448] leading-relaxed">{act.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overnight, Food & Tuk Tuk Pro-Tip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8E4D9] text-xs">
                  <div className="bg-[#FAF8F3] p-3.5 rounded-xl border border-[#E8E4D9]">
                    <span className="text-[10px] font-mono uppercase text-[#7A7365] block mb-1">Recommended Stay</span>
                    <strong className="text-[#1F3D2B] block">{day.overnight}</strong>
                  </div>
                  <div className="bg-[#FAF8F3] p-3.5 rounded-xl border border-[#E8E4D9]">
                    <span className="text-[10px] font-mono uppercase text-[#7A7365] block mb-1">Food Highlight</span>
                    <span className="text-[#4A453A] block">{day.foodHighlight}</span>
                  </div>
                  <div className="bg-[#EBF3ED] p-3.5 rounded-xl border border-[#C5DAC9]">
                    <span className="text-[10px] font-mono uppercase text-[#1F3D2B] font-bold block mb-1 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-[#1F3D2B]" /> Tuk-Tuk Driving Tip
                    </span>
                    <span className="text-[#1F3D2B] block font-medium">{day.tukTukTip}</span>
                  </div>
                </div>

                {/* Quick Next Day / Prev Day Navigation */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={activeDay === 1}
                    onClick={() => setActiveDay(activeDay - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold border border-[#E8E4D9] text-[#5A5448] hover:bg-[#FAF8F3] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous Day {activeDay > 1 ? activeDay - 1 : ""}
                  </button>
                  <button
                    type="button"
                    disabled={activeDay === 13}
                    onClick={() => setActiveDay(activeDay + 1)}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#1F3D2B] text-white hover:bg-[#142A1D] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next Day {activeDay < 13 ? activeDay + 1 : ""} →
                  </button>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: TUK-TUK DRIVING LEGAL RULES & WHAT'S INCLUDED */}
        {/* ========================================================================= */}
        <section aria-labelledby="rules-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Official Legal Handbook</span>
              <h2 id="rules-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Sri Lanka Tuk-Tuk Driving Rules & Requirements
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">
                Sri Lanka Driving Permit (AAC Endorsement)
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                By law, foreigners cannot drive in Sri Lanka on just an International Driving Permit (IDP). You need your national driver's license endorsed by the <strong>Automobile Association of Ceylon (AAC)</strong> in Colombo. We take care of this entire bureaucratic process beforehand so your legal permit is waiting when you touch down.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">
                40 km/h Speed Limit & Left-Side Driving
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Three-wheelers in Sri Lanka have a strict, legal maximum speed limit of <strong>40 km/h</strong> across all roads. Traffic travels on the left side of the road. Sri Lankan police are friendly but enforce speed radar checks on straight highways.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">
                No Expressways (Class-E Roads)
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Tuk-Tuks are banned on expressways (E01, E02, E03). You travel on the scenic coastal Galle Road (A2) and inland highways (A6, A5), allowing you to experience local roadside markets, fruit stalls, and ocean vistas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                4
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">
                24/7 Islandwide Mechanics & Spare Parts
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                With over 1.2 million Tuk-Tuks on Sri Lankan roads, spare parts and skilled roadside mechanics are present in virtually every village. Our rentals include 24/7 WhatsApp mechanic dispatch and emergency replacement support.
              </p>
            </div>
          </div>

          {/* Dedicated Partner Callout: TukTukRental.com */}
          <div className="bg-gradient-to-br from-[#1F3D2B] via-[#162D20] to-[#0E1F16] text-white p-6 sm:p-8 rounded-3xl border border-[#2C523B] shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C523B] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛺</span>
                <div>
                  <span className="text-[10px] font-mono text-[#F2C94C] uppercase tracking-wider block font-bold">
                    Official Fleet & Permit Partner
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                    TukTukRental.com × Plan Sri Lanka
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#2C523B] text-[#A3BFAB] text-xs font-mono rounded-full border border-[#3E6B4F] self-start sm:self-auto">
                Direct Community-Owned Fleet
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#C5DAC9] leading-relaxed">
              We partner directly with <strong>TukTukRental.com</strong> to offer safe, fully insured, and legally licensed self-drive vehicles. Every tuk-tuk is rented directly from local Sri Lankan families, ensuring genuine community economic impact alongside a 1-on-1 practical driving lesson, 24/7 on-road mechanics, and legal AAC driving permit endorsements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#E8E4D9]">
              <div className="bg-[#244632] p-3 rounded-xl border border-[#386146] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F2C94C] shrink-0" />
                <span>AAC Permit Pre-Approval</span>
              </div>
              <div className="bg-[#244632] p-3 rounded-xl border border-[#386146] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F2C94C] shrink-0" />
                <span>$0 Excess Full Insurance</span>
              </div>
              <div className="bg-[#244632] p-3 rounded-xl border border-[#386146] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F2C94C] shrink-0" />
                <span>Negombo Practical Lesson</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                to="/sri-lanka-self-drive-tuk-tuk-rental-guide"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F2C94C] hover:bg-[#e0b83e] text-[#1F3D2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-105"
              >
                <span>Read Full Self-Drive Tuk-Tuk Rules & Booking Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  const message = encodeURIComponent("Hi Plan Sri Lanka! I'm interested in booking a Self-Drive Tuk-Tuk for my 13-day Sri Lanka trip. Could you please share vehicle availability, pricing, and permit details?");
                  window.open(`https://wa.me/94722968210?text=${message}`, "_blank");
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: 13-DAY ESTIMATED BUDGET BREAKDOWN */}
        {/* ========================================================================= */}
        <section aria-labelledby="budget-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Estimated Expenses</span>
              <h2 id="budget-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                13-Day Sri Lanka Tuk-Tuk Trip Budget Breakdown
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E8E4D9] bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1F3D2B] text-white font-serif">
                  <th className="p-4 font-semibold">Expense Category</th>
                  <th className="p-4 font-semibold">Budget Tier (2 Pax)</th>
                  <th className="p-4 font-semibold">Comfort Boutique (2 Pax)</th>
                  <th className="p-4 font-semibold">What is Included</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4D9]">
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B] flex items-center gap-2">
                    <span>🛺</span> Tuk-Tuk Rental (13 Days)
                  </td>
                  <td className="p-4 font-mono font-bold">$221 USD (~₹18,600)</td>
                  <td className="p-4 font-mono font-bold">$260 USD (~₹22,000)</td>
                  <td className="p-4 text-[#5A5448]">Vehicle, AAC permit, insurance, lesson, 24/7 assist</td>
                </tr>
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B] flex items-center gap-2">
                    <span>⛽</span> 92-Octane Petrol (~1,100 km)
                  </td>
                  <td className="p-4 font-mono font-bold">$38 USD (~₹3,200)</td>
                  <td className="p-4 font-mono font-bold">$45 USD (~₹3,800)</td>
                  <td className="p-4 text-[#5A5448]">~40 Liters total (25-30 km/L economy)</td>
                </tr>
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B] flex items-center gap-2">
                    <span>🏨</span> Stays (12 Nights for 2)
                  </td>
                  <td className="p-4 font-mono font-bold">$360 USD (~₹30,000)</td>
                  <td className="p-4 font-mono font-bold">$780 USD (~₹65,000)</td>
                  <td className="p-4 text-[#5A5448]">Surf cabanas, eco treehouses, colonial fort manors</td>
                </tr>
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B] flex items-center gap-2">
                    <span>🍲</span> Food & Drinks (13 Days)
                  </td>
                  <td className="p-4 font-mono font-bold">$260 USD (~₹22,000)</td>
                  <td className="p-4 font-mono font-bold">$520 USD (~₹44,000)</td>
                  <td className="p-4 text-[#5A5448]">Roadside hoppers, seafood crab dinners, smoothies</td>
                </tr>
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B] flex items-center gap-2">
                    <span>🎟️</span> Safaris & Monument Tickets
                  </td>
                  <td className="p-4 font-mono font-bold">$160 USD (~₹13,500)</td>
                  <td className="p-4 font-mono font-bold">$240 USD (~₹20,000)</td>
                  <td className="p-4 text-[#5A5448]">Sigiriya Fortress, Udawalawe 4x4, Madu River boat</td>
                </tr>
                <tr className="bg-[#EBF3ED] font-bold text-[#1F3D2B]">
                  <td className="p-4">Total Estimated Land Cost (For 2 Pax):</td>
                  <td className="p-4 font-mono text-base text-[#1F3D2B]">$1,039 USD (~₹87,300)</td>
                  <td className="p-4 font-mono text-base text-[#1F3D2B]">$1,845 USD (~₹1,54,800)</td>
                  <td className="p-4 text-xs font-mono">~$520 – $920 per person for 13 full days!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS ACCORDION */}
        {/* ========================================================================= */}
        <section aria-labelledby="faq-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Everything You Need to Know</span>
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Frequently Asked Questions (Tuk-Tuk Rentals & Driving)
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1F3D2B] hover:bg-[#FAF8F3] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7A7365] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#1F3D2B]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm text-[#5A5448] leading-relaxed border-t border-[#E8E4D9]/60 font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM FINAL HIGH CONVERSION CTA */}
        <section className="bg-gradient-to-r from-[#1F3D2B] to-[#142A1D] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-mono uppercase bg-[#2C523B] text-[#F2C94C] px-3 py-1 rounded-full font-bold border border-[#3E6B4F]">
              Ready for the Adventure of a Lifetime?
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Reserve Your Tuk-Tuk on WhatsApp Today
            </h3>
            <p className="text-xs sm:text-sm text-[#C5DAC9] leading-relaxed">
              Vehicles sell out fast during peak travel months (December to April and July to August). Message our team directly to lock in your rental dates, license processing, and tailored itinerary.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleWhatsAppBooking("bottom_page_cta")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-transform hover:scale-105 shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp (+94 72 296 8210)</span>
          </button>
        </section>

      </main>
    </div>
  );
}
