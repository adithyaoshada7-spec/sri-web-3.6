import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Info, 
  Sun, 
  CloudRain, 
  Calendar, 
  Sparkles, 
  Heart, 
  Compass, 
  Users, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight, 
  PartyPopper, 
  MapPin, 
  Train, 
  Activity,
  Luggage,
  ShieldAlert,
  ThumbsUp,
  Clock,
  Map,
  Compass as CompassIcon,
  CompassIcon as CompassIcon2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  CartesianGrid
} from "recharts";
import { Car, Smile, Baby, Shield, Eye } from "lucide-react";

// Helper to compile inline anchor links dynamically
const renderFaqAnswerWithLinks = (text: string) => {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }
    const anchorText = match[1];
    const path = match[2];
    
    parts.push(
      <Link key={matchIndex} to={path} className="font-bold underline text-[#1e3a2f] hover:text-[#d4af37] transition-colors">
        {anchorText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? <>{parts}</> : text;
};

interface ItineraryDay {
  dayNum: number;
  label: string;
  location: string;
  leg: string;
  driveTime: number;
  comfortScore: number;
  kidsCheer: string;
  parentHack: string;
  activity: string;
  strollerFriendly: "Yes" | "No" | "Partial";
  napWindow: string;
}

const familyItineraryDays: ItineraryDay[] = [
  {
    dayNum: 1,
    label: "D1",
    location: "Negombo Gateway",
    leg: "Airport to Negombo Beach",
    driveTime: 0.5,
    comfortScore: 98,
    kidsCheer: "Splash play in the beachfront swimming pool under swaying palms!",
    parentHack: "We skip Colombo's peak-hour traffic entirely. Negombo is just 15 minutes from the airport, ensuring cold milk, sandcastle play, and warm family beds are ready minutes after landing.",
    activity: "Private airport pick-up, swift check-in, and poolside jet-lag recovery.",
    strollerFriendly: "Yes",
    napWindow: "Flexible post-flight recovery window"
  },
  {
    dayNum: 2,
    label: "D2",
    location: "Elephant Splashes",
    leg: "Negombo to Sigiriya Heritage Area",
    driveTime: 3.5,
    comfortScore: 82,
    kidsCheer: "Feeding palm reeds and watching baby elephants play at the riverbanks!",
    parentHack: "Instead of driving 3.5 hours straight, we stop halfway at the Maha Oya riverbanks. Kids stretch their legs and eat hot coconut roti, napping soundly in their car seats during the final 1.5 hours.",
    activity: "Riverside elephant observing session and scenic drive to the Cultural Triangle.",
    strollerFriendly: "Partial",
    napWindow: "1:30 PM - 3:00 PM (timed during final road leg)"
  },
  {
    dayNum: 3,
    label: "D3",
    location: "Rock-Climb & Safari",
    leg: "Sigiriya Ruins & Minneriya Gathering",
    driveTime: 1.0,
    comfortScore: 88,
    kidsCheer: "Spotting real-life wild herds of 100+ elephants gathering near the water!",
    parentHack: "Climb Sigiriya fortress right at 7:00 AM when the air is cool. Skip Pidurangala (which has dangerous un-fenced bouldering) and book an open-top afternoon safari so kids can tour without any walking.",
    activity: "Morning Sigiriya fortress climb (using baby carrier) followed by sunset wildlife safari.",
    strollerFriendly: "No",
    napWindow: "12:30 PM - 3:00 PM (cool room nap at hotel)"
  },
  {
    dayNum: 4,
    label: "D4",
    location: "Rustic Lotus Lake",
    leg: "Hiriwadunna Local Village Loop",
    driveTime: 0.5,
    comfortScore: 94,
    kidsCheer: "Riding a real wooden bullock cart and crossing a blooming pink lotus lake on a catamaran!",
    parentHack: "A sensory-rich, low-speed day without city friction or exhaust fumes. Locals love babies and serve a delicious, mild clay-pot organic lunch on leaf platters, making food incredibly playful.",
    activity: "Subtle local village eco-immersion, wood-cart ride, and quiet lake canoe sailing.",
    strollerFriendly: "No",
    napWindow: "2:00 PM - 3:30 PM"
  },
  {
    dayNum: 5,
    label: "D5",
    location: "Spice Forest Path",
    leg: "Sigiriya to Kandy Highland Entry",
    driveTime: 2.5,
    comfortScore: 85,
    kidsCheer: "Tasting fresh cocoa beans, smelling real vanilla pods, and friendly shoulder rubdowns!",
    parentHack: "We split the mountain altitude climb at Matale's shady spice gardens. Touching raw cinnamon bark and seeing massive jackfruit trees breaks up the drive beautifully before entering Kandy town.",
    activity: "Local organic spice garden sensory walking tour and check-in to Kandy resort.",
    strollerFriendly: "Partial",
    napWindow: "1:00 PM - 2:30 PM (mid-drive transition)"
  },
  {
    dayNum: 6,
    label: "D6",
    location: "Royal Garden Play",
    leg: "Peradeniya & Kandy Cultural Loop",
    driveTime: 0.5,
    comfortScore: 92,
    kidsCheer: "Strolling under massive hollow trees that look like fairy castles and watching acrobats!",
    parentHack: "Minimize chaotic city pavements. We allocate hours to the royal gardens' safe, traffic-free lawns so kids can run wild, followed by reserved premium seats at the evening traditional drum show.",
    activity: "Traffic-free Peradeniya gardens exploration, lakeside sunset walk, and evening fire-dance show.",
    strollerFriendly: "Yes",
    napWindow: "1:30 PM - 3:00 PM"
  },
  {
    dayNum: 7,
    label: "D7",
    location: "Highland Blue Train",
    leg: "Kandy to Ella Mountain Trails",
    driveTime: 3.5,
    comfortScore: 84,
    kidsCheer: "Leaning out of open observatory train windows, waving at mountain school kids, and buying snacks!",
    parentHack: "We pre-book first-class observation cabins. Your private AC driver safely transfers all heavy luggage in the car, meeting you directly at the scenic arrival platform in Ella for a stress-free pick-up.",
    activity: "The legendary Tea Country slow train odyssey through waterfalls, emerald valleys, and mist.",
    strollerFriendly: "No",
    napWindow: "Cozy rhythmic sleep on the train tracking mountain rails"
  },
  {
    dayNum: 8,
    label: "D8",
    location: "Nine Arch Wonders",
    leg: "Nine Arch Bridge & Cozy Ella Town",
    driveTime: 0.5,
    comfortScore: 90,
    kidsCheer: "Watching the famous blue locomotive roar across giant colonial hand-carved stone arches!",
    parentHack: "Avoid steep vertical mountain hikes. We coordinate a private tuk-tuk to drop the family right at the Nine Arch cafe access, creating a flat, scenic 500-meter walk suitable for all toddler steps.",
    activity: "Walk to Nine Arch Bridge viewpoint, leisure town shopping, and a visit to Ravana waterfall cascades.",
    strollerFriendly: "No",
    napWindow: "2:00 PM - 4:00 PM (crisp mountain breeze nap)"
  },
  {
    dayNum: 9,
    label: "D9",
    location: "Expressway Descent",
    leg: "Ella Mountains to South Coast Beach",
    driveTime: 3.0,
    comfortScore: 90,
    kidsCheer: "Gazing at cascading ravines before holding a warm shell at our beachside resort!",
    parentHack: "We download the Southern Expressway! The flat, smooth, two-lane national highway bypasses mountain curves completely, safely transporting you from cool mountain air to sunny beaches in 3 flat hours.",
    activity: "Descend from Ella hills, glide along the flat highway, and check into a beachside paradise resort.",
    strollerFriendly: "Yes",
    napWindow: "12:30 PM - 2:30 PM (timed during smooth national highway cruise)"
  },
  {
    dayNum: 10,
    label: "D10",
    location: "Shallow Beach Bay",
    leg: "Weligama Sandy Haven & Turtle Pool",
    driveTime: 0.5,
    comfortScore: 98,
    kidsCheer: "Releasing tiny newly-hatched baby sea-turtles safely into calm sunset surf tides!",
    parentHack: "Weligama has a soft sandbed cascading out super-gradually without dangerous drop-offs or volcanic coral cuts. It is the absolute safest beach in Asia for toddlers to puddle splash.",
    activity: "Sandcastle building, sea paddling, and educational visit to Kosgoda Turtle Hatchery sanctuary.",
    strollerFriendly: "Yes",
    napWindow: "11:00 AM - 2:00 PM (high UV hour room rest / pool canopy nap)"
  },
  {
    dayNum: 11,
    label: "D11",
    location: "Fort Wall & Cones",
    leg: "Galle Fort Walk & Cycling Trails",
    driveTime: 1.0,
    comfortScore: 96,
    kidsCheer: "Wandering completely closed-off street lanes, licking artisan gelato, and flying sunset kites!",
    parentHack: "Galle Fort's ancient ramparts and boutique walking lanes are flat, paved, and fully car-free. Push your baby strollers here while enjoying lovely boutique cafes and ocean sunset views.",
    activity: "Stroller-friendly walking tour in historic Galle, kite flying on ramparts, and seaside gelato bowls.",
    strollerFriendly: "Yes",
    napWindow: "3:00 PM - 4:30 PM"
  },
  {
    dayNum: 12,
    label: "D12",
    location: "Airport Farewell",
    leg: "South Coast Beach to Colombo Airport",
    driveTime: 2.5,
    comfortScore: 92,
    kidsCheer: "Listening to final local songs in our AC private car before boarding the airplane!",
    parentHack: "We glide via the fast Southern Expressway straight into the departures gate, avoiding Colombo's dense metropolitan gridlocks completely. Kids arrive calm, clean, fed, and ready to board.",
    activity: "Final resort coconut smoothie, expressway cruise to Colombo airport, and flight exit.",
    strollerFriendly: "Yes",
    napWindow: "Afternoon nap during our smooth highway car drive"
  }
];

export default function SrilankaFamilyPage() {
  usePageMetadata({
    title: "Sri Lanka Family Itinerary (2026) | The Stress-Free Route For Kids",
    description: "An expert, pre-vetted 7 to 10 day Sri Lanka family dynamic itinerary. Avoid long toddler driving fatigue, discover stroller-friendly pathways, whale watching secrets & baby-safe beaches.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-family-itinerary",
    ogUrl: "https://plan-srilanka.com/sri-lanka-family-itinerary"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedBeach, setSelectedBeach] = useState<"weligama" | "mirissa" | "hiriketiya">("weligama");
  const [selectedRoute, setSelectedRoute] = useState<"optimized" | "backtrack">("optimized");
  const [childrenAgeGroup, setChildrenAgeGroup] = useState<"baby" | "toddler" | "teen">("toddler");
  const [selectedItineraryDay, setSelectedItineraryDay] = useState<number>(1);

  // Lead capture state
  const [leadForm, setLeadForm] = useState({
    travelDates: "",
    childrenAges: "",
    budget: "mid-range",
    travelStyle: "relaxed-luxury",
    whatsappNumber: "",
    agreed: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Visual Breakdown of accommodations by night counts and experiences
  const nightGuidelines = {
    baby: {
      negombo: "1 Night — Critical cushion to settle sleep schedules after flight pressure.",
      sigiriya: "2 Nights — Easy morning strolls around garden base; skip mid-day climbing.",
      kandy: "1 Night — Highly humid; best used as a quick lunch/gardens stop to prevent heat rash.",
      ella: "2 Nights — Cool mountain air, spectacular balcony views. Restful strolls in Ella town.",
      south: "5-6 Nights — Unpack once in Weligama. Massive golden sands; warm baby ocean wading."
    },
    toddler: {
      negombo: "1 Night — Recover, swim, view local canal boat tours.",
      sigiriya: "2 Nights — Early morning Sigiriya steps, afternoon elephant safaris (kids sleep in jeep!).",
      kandy: "2 Nights — Spend hours strolling Botanical Gardens feeding chipmunks.",
      ella: "2 Nights — Short family walks to Nine Arch Bridge to watch blue locomotive roar by.",
      south: "4-5 Nights — Beach sandcastle days, sea turtle hatcheries, and shallow swimmable lagoons."
    },
    teen: {
      negombo: "1 Night — Quick recharge, explore local lagoon kayaking.",
      sigiriya: "2 Nights — Conquer 1,200 steps to the top of Sigiriya Rock Fortress, take aggressive open-air safaris.",
      kandy: "2 Nights — Experience traditional high-energy drum cultural performances.",
      ella: "2 Nights — Hike Little Adam's Peak, try high-altitude ziplines, take awesome open-door train shots.",
      south: "4 Nights — Supervised surf lessons, cycling in rural paddy lanes, and whale watching charters."
    }
  };

  const currentGuidelines = nightGuidelines[childrenAgeGroup];

  const faqList = [
    {
      q: "Is Sri Lanka generally stroller friendly?",
      a: "No. Ancient monuments (Sigiriya, Dambulla), forest hikes, and standard city pavements are highly uneven, rocky, or contain steep steps. We strongly recommend bringing a high-quality ergo baby carrier. Strollers are only useful inside high-end hotels, around Galle Fort walking streets, or coastal beach promenades."
    },
    {
      q: "Can babies climb Sigiriya Rock Fortress?",
      a: "Yes, but never with a stroller. You must use a secure backpack carrier or front baby carrier. Avoid climbing during the high midday sun (11:00 AM - 3:00 PM) as it gets incredibly hot, dehydrating, and crowded. Start right at 7:00 AM when gates open."
    },
    {
      q: "How much driving is too much when traveling with children in Sri Lanka?",
      a: "Road speeds in Sri Lanka average 40-50 km/h due to winding mountain pathways and local traffic. We suggest limiting single-day drives to under 3.5 hours. Always design a route with minimum 2-night stops to reduce vehicle confinement."
    },
    {
      q: "Should I hire a private driver in Sri Lanka or use trains/buses?",
      a: "Hiring a private AC vehicle with a professional English-speaking driver is the absolute gold standard for families. Trains are beautiful for a scenic 2-hour experience in the hills, but public transport is often overcrowded, lacks child seats, and is highly stressful with heavy baggage."
    },
    {
      q: "Do I have to pay or find accommodation for my private driver?",
      a: "Most boutique drivers quote with a flat daily fee that includes their food and accommodation. Many mid-range and luxury resorts provide complimentary driver quarters and meals. Always clarify this with your travel agency before booking."
    },
    {
      q: "What are the core requirements of the Sri Lanka Visa (ETA) for children?",
      a: "All children under 12 receive free entry or massive discounts depending on temporary bilateral rules, but they STILL require a pre-filled tourist e-Visa (ETA) application before boarding. See our comprehensive [Sri Lanka Visa For Indians](/sri-lanka-visa-for-indians) manual to secure yours with zero stress."
    },
    {
      q: "How many nights should we spend in Ella with kids?",
      a: "Two nights is the absolute sweet spot. This allows you one full day for the iconic Blue Train experience, walking the Nine Arch tracks, and taking a mild walk up Little Adam’s Peak."
    },
    {
      q: "Is malaria a threat in Sri Lanka for kids?",
      a: "Sri Lanka has been certified malaria-free by the WHO since 2016. However, dengue fever does exist. Protect your children with high-quality insect repellent (containing DEET or Picardin) and dress them in loose, lightweight long-sleeved clothing during evening safaris."
    },
    {
      q: "Where can we easily buy diapers, baby wipes, and baby formula?",
      a: "Major supermarket chains like Cargills Food City and Keells are widespread in towns like Colombo, Negombo, Kandy, and Galle. They carry international baby wipe brands, standard diapers (Pampers/Huggies), and standard milk powder. If your baby requires a specific medicated formula, pack enough for the entire trip."
    },
    {
      q: "What Sri Lanka travel costs should I plan for a family of four?",
      a: "A family flight/hotel/driver package varies based on tier choices. For exact budget configurations, explore our in-depth [Sri Lanka Trip Cost From India](/sri-lanka-trip-cost-from-india) pricing guidelines."
    },
    {
      q: "Can children participate in traditional games?",
      a: "Absolutely! If you travel during April, locals will gladly invite your kids to try Kana Mutti Bindeema (pot breaking) or eat hanging sweet buns. It is incredibly safe and welcoming."
    },
    {
      q: "Is hotel tap water safe for children to drink?",
      a: "No. Never allow children to drink municipal tap water. Always use bottled or filtered water—even for brushing teeth. Standard hotels provide complimentary bottled water daily."
    },
    {
      q: "Are car seats mandatory in Sri Lanka?",
      a: "Car seats are not strictly mandated by local laws, but local drivers are more than happy to install them if provided or requested in advance. Highly recommended given the winding hilly curves."
    },
    {
      q: "What is the best alternative to Sigiriya if my toddler hates steps?",
      a: "Try an open-air jeep safari in Minneriya National Park or visit the royal spice gardens in Matale. They offer wide open areas with zero steep vertical drops."
    },
    {
      q: "How is the medical system in Sri Lanka for tourists?",
      a: "Major private hospitals in Colombo (Lanka Hospitals, Nawaloka) offer world-class pediatric care and fluent English staff. In regional towns, standard medical clinics are highly accessible for minor ailments like stomach upsets."
    },
    {
      q: "Can teenagers try surfing on the South Coast?",
      a: "Weligama Bay is an absolute global paradise for beginner surfers. The sand bottom is soft, the waves are gentle and crumble slowly, and certified ISA instructors are readily available for private lessons."
    },
    {
      q: "What is the best time of year to take this family trip?",
      a: "Generally, December through April is outstanding. However, we have a complete blueprint in our [Best Time To Visit Sri Lanka](/best-time-to-visit-sri-lanka) guide showcasing regional options if you must travel during summer breaks."
    },
    {
      q: "Is it safe to feed wild monkeys at tourist spots?",
      a: "No. Wild macaques around Sigiriya and Kandy are highly opportunistic. Instruct children never to display open snacks, fruit juice, or reach out to pet them. Keep a respectful distance."
    },
    {
      q: "Which turtle hatchery is recommended for young kids?",
      a: "The Kosgoda Turtle Conservation Project is highly educational, exceptionally managed, and lets kids safely observe baby hatchlings swimming in clean rescue pools."
    },
    {
      q: "Is a 7-day family itinerary too rushed?",
      a: "Yes, 7 days is quite compact for children. If you are constrained to exactly a week, we recommend trimming the route. Check out our pre-packaged [Sri Lanka 7 Day Itinerary](/sri-lanka-7-day-itinerary) for curated adjustments."
    }
  ];

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whatsappNumber) return;
    setIsSubmitting(true);
    trackEvent("family_lead_form_submit_start", "conversion", leadForm.travelStyle);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent("family_lead_form_submit_success", "conversion", leadForm.childrenAges);

      const message = `Hi Plan Sri Lanka! I am mapping out our stress-free family vacation. Please coordinate our custom plan:
Dates: ${leadForm.travelDates}
Children's Ages: ${leadForm.childrenAges}
Budget Preferences: ${leadForm.budget}
Vibe/Style: ${leadForm.travelStyle}
Mobile: ${leadForm.whatsappNumber}
Please draw up our relaxed family experience blueprint!`;

      const whatsappUrl = `https://wa.me/94722968210?text=${encodeURIComponent(message)}`;

      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 800);
    }, 1500);
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      <>
        {/* JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Family Itinerary (2026): The Stress-Free Route For Families With Kids",
            "description": "Planning a family holiday in Sri Lanka without toddler meltdowns or driver exhaustion. Get real insights into routes, strollers, child-appropriate locations, and travel schedules.",
            "image": [
              "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200"
            ],
            "author": {
              "@type": "Person",
              "name": "Plan Sri Lanka Family Desk Team",
              "jobTitle": "Family Travel Specialists",
              "worksFor": {
                "@type": "Organization",
                "name": "Plan Sri Lanka"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "url": "https://plan-srilanka.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            },
            "datePublished": "2026-06-09T05:00:00Z",
            "dateModified": "2026-06-09T05:46:00Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/sri-lanka-family-itinerary"
            },
            "inLanguage": "en-US",
            "keywords": "Sri Lanka family itinerary, Sri Lanka with kids, child safety Sri Lanka, family travel Sri Lanka, kid friendly beaches Sri Lanka"
          })}
        </script>

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
                "name": "Itineraries",
                "item": "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Family Itinerary with Kids",
                "item": "https://plan-srilanka.com/sri-lanka-family-itinerary"
              }
            ]
          })}
        </script>

        {/* Dynamic HowTo Itinerary Snippet with Day-by-Day Steps for Carousel Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "12-Day Sri Lanka Family Itinerary with Kids (Step-by-Step Route)",
            "description": "Follow our proven day-by-day local route to tour Sri Lanka stress-free, avoiding baby stroller issues, transit fatigue, and child food friction.",
            "totalTime": "P12D",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "1800"
            },
            "step": familyItineraryDays.map((day, idx) => ({
              "@type": "HowToStep",
              "position": idx + 1,
              "name": `Day ${day.dayNum}: ${day.location} (${day.leg})`,
              "text": `Activity: ${day.activity} - Kids fun: ${day.kidsCheer} Parent Tip: ${day.parentHack}`,
              "url": `https://plan-srilanka.com/sri-lanka-family-itinerary`
            })),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.95",
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "248"
            }
          })}
        </script>
      </>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative py-16 md:py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl -z-10 pointer-events-none" />
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1e3a2f]/10 border border-[#1e3a2f]/20 text-xs text-[#1e3a2f] font-bold tracking-widest uppercase">
            <Users className="w-4 h-4 text-[#d4af37]" /> Stress-Free Family Engineering
          </div>
          
          <h1 className="text-3xl md:text-6xl font-serif text-[#1e3a2f] leading-tight">
            Sri Lanka Family Itinerary (2026)
            <span className="italic block mt-1">The Stress-Free Route For Families With Kids</span>
          </h1>

          <p className="text-base md:text-xl text-[#3a4d44] font-light max-w-3xl mx-auto leading-relaxed">
            Discover how to experience the majestic wildlife, secret spice mountains, and calm shallow beaches of Sri Lanka 
            <strong> without exhausting long drives, rushed packing schedules, or unnecessary hotel shifts.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a 
              href="#personalized-plan-form"
              className="px-8 py-4 bg-[#1e3a2f] hover:bg-[#d4af37] text-white rounded-full font-bold uppercase tracking-wider text-xs transition-with-shadow flex items-center justify-center gap-2"
              onClick={() => trackEvent("hero_primary_cta_click", "engagement", "family_page")}
            >
              Get My Personalized Family Travel Plan <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#biggest-mistake"
              className="px-8 py-4 bg-white border border-[#1e3a2f]/10 text-[#1e3a2f] rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:bg-[#fcfbf7]/50 flex items-center justify-center"
            >
              Read Why Speed Fails
            </a>
          </div>

          <div className="flex justify-center items-center gap-6 pt-8 text-xs text-[#3a4d44]/60 font-mono">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37]" /> No backtracking
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37]" /> Baby-to-teen customized
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE BIGGEST MISTAKE FAMILIES MAKE */}
      <section id="biggest-mistake" className="py-12 md:py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-red-50/50 border border-red-100 rounded-[32px] p-8 md:p-12 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-red-900 pointer-events-none">
            <ShieldAlert className="w-32 h-32" />
          </div>
          
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-extrabold flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-600" /> Crucial Advisory Warning
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-red-950 font-bold">
              The Grand Mistake: Planning Sri Lanka Like An Adult Solo Traveler
            </h2>
          </div>

          <p className="text-sm md:text-base text-red-900/90 leading-relaxed font-light">
            Most vacation outlines found on public blogs are built for backpackers or solo couples who do not mind hopping from one hotel to another every single morning. When forced upon children, this style disintegrates fast.
          </p>

          <div className="grid md:grid-cols-2 gap-6 pt-4 text-xs">
            <div className="space-y-4 bg-white/70 p-6 rounded-2xl border border-red-100">
              <h4 className="font-bold text-red-950 uppercase tracking-wider flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600 shrink-0" /> The Suboptimal "Blog Route"
              </h4>
              <p className="text-red-900/80 leading-relaxed">
                Trying to squeeze Sigiriya Ruins, Kandy temple drums, Nuwara Eliya tea, Ella hikes, Yala safaris, and 3 different beaches into 8 days.
              </p>
              <ul className="space-y-1 text-red-900/70 pl-2 list-disc">
                <li>Overtired children crying at checkpoints</li>
                <li>Packing and unpacking luggage 6+ times in a week</li>
                <li>Vacation feels like a full-time logistics cargo job</li>
              </ul>
            </div>

            <div className="space-y-4 bg-[#1e3a2f] p-6 rounded-2xl text-white">
              <h4 className="font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-emerald-400 shrink-0" /> The Plan Sri Lanka Way
              </h4>
              <p className="text-white/80 leading-relaxed">
                Spend a minimum of 2 nights in core spots. Select a shallow hub base on the South Coast for a full 4-5 nights.
              </p>
              <ul className="space-y-1 text-white/70 pl-2 list-disc">
                <li>Kids settle into resorts comfortably</li>
                <li>Driver coordinates swift, safe morning excursions</li>
                <li>Relaxing beach afternoons while toddlers nap</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW MANY NIGHTS SHOULD YOU STAY? (Interactive Age Matcher) */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white border-y border-[#1e3a2f]/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Dynamic Timeline Optimizer</span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              How Many Nights Should You Stay?
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              We customize coordinates based on your child's age biology. Toggle your group age category to visualize your tailored night assignments:
            </p>
          </div>

          {/* AGE TABS */}
          <div className="flex justify-center gap-4">
            {[
              { id: "baby", label: "Traveling with Baby / Toddler (0-2)", icon: "👶" },
              { id: "toddler", label: "Traveling with Young Kids (3-11)", icon: "🧒" },
              { id: "teen", label: "Traveling with Teenagers (12+)", icon: "🧑‍💻" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setChildrenAgeGroup(tab.id as "baby" | "toddler" | "teen");
                  trackEvent("family_age_tab_click", "engagement", tab.id);
                }}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all border flex items-center gap-2 ${
                  childrenAgeGroup === tab.id
                    ? "bg-[#1e3a2f] border-[#1e3a2f] text-white shadow-lg"
                    : "bg-[#fcfbf7] border-[#1e3a2f]/10 text-[#1e3a2f] hover:bg-[#1e3a2f]/5"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Accommodations map */}
          <div className="grid md:grid-cols-5 gap-6 pt-4">
            {[
              { key: "negombo", title: "Negombo Gateway", nights: "1 Night", highlight: "Recover & Unwind", desc: currentGuidelines.negombo },
              { key: "sigiriya", title: "Sigiriya Heritage", nights: "2 Nights", highlight: "Boulders & Safaris", desc: currentGuidelines.sigiriya },
              { key: "kandy", title: "Kandy Cultural Hub", nights: "2 Nights", highlight: "Gardens & Temples", desc: currentGuidelines.kandy },
              { key: "ella", title: "Ella Mountains", nights: "2 Nights", highlight: "Bridges & Waterfalls", desc: currentGuidelines.ella },
              { key: "south", title: "South Coast Beach", nights: "4-5 Nights", highlight: "Sandcastles & Safety", desc: currentGuidelines.south }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#fcfbf7] p-6 rounded-2xl border border-[#1e3a2f]/5 relative space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="w-6 h-6 rounded-full bg-[#1e3a2f]/5 flex items-center justify-center text-xs font-bold font-mono">
                      0{idx + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/10 text-[#b8941c] text-[10px] font-mono uppercase tracking-wider font-extrabold">
                      {item.nights}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#1e3a2f]">{item.title}</h4>
                  <p className="text-[10px] uppercase font-mono text-[#d4af37] font-bold">{item.highlight}</p>
                </div>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light pt-2 border-t border-[#1e3a2f]/5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 & 5: BEST ROUTE COMPARISON & TRAVEL REALITY CHECK */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Route Architecture</span>
          <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
            The Best Family-Friendly Route (Route A vs Route B)
          </h2>
          <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
            Many travel itineraries online make families backtrack over mountain roads. Let's look at the dry structural comparison of Route A (The Loop) vs Route B (The Broken Spiral):
          </p>
        </div>

        {/* COMPARATOR TOOL */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-[#1e3a2f]/5 rounded-[32px] p-6 md:p-10 shadow-xl">
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setSelectedRoute("optimized");
                  trackEvent("route_selector_click", "engagement", "optimized");
                }}
                className={`p-4 rounded-xl text-left transition-all border ${
                  selectedRoute === "optimized"
                    ? "bg-[#1e3a2f] text-white border-[#1e3a2f]"
                    : "bg-[#fcfbf7] text-[#1e3a2f] border-[#1e3a2f]/5 hover:bg-neutral-50"
                }`}
              >
                <div className="font-serif font-bold text-sm">✓ Route A: The Plan Sri Lanka Loop</div>
                <p className="text-[10px] opacity-75 mt-1">Negombo → Sigiriya → Kandy → Ella → South Coast. Elegant, continuous line.</p>
              </button>

              <button
                onClick={() => {
                  setSelectedRoute("backtrack");
                  trackEvent("route_selector_click", "engagement", "backtrack");
                }}
                className={`p-4 rounded-xl text-left transition-all border ${
                  selectedRoute === "backtrack"
                    ? "bg-[#1e3a2f] text-white border-[#1e3a2f]"
                    : "bg-[#fcfbf7] text-[#1e3a2f] border-[#1e3a2f]/5 hover:bg-neutral-50"
                }`}
              >
                <div className="font-serif font-bold text-sm">✗ Route B: Common Blog Spiral</div>
                <p className="text-[10px] opacity-75 mt-1">Negombo → Kandy → Sigiriya → Kandy → Ella. Messy backtracking bottleneck.</p>
              </button>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-[#b8941c] flex items-center gap-1">
                <Info className="w-3 h-3" /> Geographer's Secret
              </span>
              <p className="text-[11px] text-amber-900 leading-relaxed font-light">
                Route B forces your driver to cross Kandy's dense internal bottleneck block TWICE, adding 4.5 exhausting driving hours on slow mountain curves.
              </p>
            </div>
          </div>

          {/* STATS VISUALIZATIONS */}
          <div className="lg:col-span-8 bg-[#fcfbf7] p-6 md:p-8 rounded-2xl border border-[#1e3a2f]/5">
            <h4 className="font-serif font-bold text-lg text-[#1e3a2f] mb-6">Travel Reality Check Stats Summary</h4>
            <div className="space-y-6">
              {[
                { 
                  label: "Total Driving Hours in Car", 
                  routeA: "12 Hours Total", 
                  routeB: "19 Hours Total", 
                  unit: "hrs", 
                  valA: 12, 
                  valB: 19,
                  better: "routeA"
                },
                { 
                  label: "Hotel Packing Changes Required", 
                  routeA: "4 Changes", 
                  routeB: "6+ Changes", 
                  unit: "times", 
                  valA: 4, 
                  valB: 6,
                  better: "routeA"
                },
                { 
                  label: "Family Comfort Score", 
                  routeA: "9.5 / 10", 
                  routeB: "3.2 / 10", 
                  unit: "score", 
                  valA: 9.5, 
                  valB: 3.2,
                  better: "routeA"
                },
                { 
                  label: "Toddler Meltdown Pressure Risk", 
                  routeA: "Low", 
                  routeB: "Severe", 
                  unit: "risk", 
                  valA: 2, 
                  valB: 9,
                  better: "routeA" // here A is lower so better
                }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[#1e3a2f]">
                    <span>{stat.label}</span>
                    <span className="font-mono text-[#d4af37]">
                      {selectedRoute === "optimized" ? stat.routeA : stat.routeB}
                    </span>
                  </div>
                  {/* Progress bar overlay */}
                  <div className="h-2 w-full bg-neutral-200/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        selectedRoute === "optimized" ? "bg-emerald-600" : "bg-red-500"
                      }`}
                      style={{ 
                        width: `${
                          stat.unit === "hrs" 
                            ? (selectedRoute === "optimized" ? 12 : 19) * 5
                            : stat.unit === "times" 
                            ? (selectedRoute === "optimized" ? 4 : 6) * 15
                            : stat.unit === "score"
                            ? (selectedRoute === "optimized" ? 9.5 : 3.2) * 10
                            : (selectedRoute === "optimized" ? 2 : 9) * 10
                        }%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5.5: DYNAMIC 12-DAY TIMELINE ROUTE MAPPER */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#f5f2e8]/40 border-b border-[#1e3a2f]/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Interactive Visual Mapper</span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              The 12-Day Stress-Free Route Map
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              Hover or click any day node below to visualize driving hours vs children's comfort ratings. Notice how we keep single-day traveling legs low to defend against toddler fatigue.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Recharts interactive visualizer (8 cols on large screen) */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[32px] border border-[#1e3a2f]/5 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">Dynamic Route Profile</h3>
                  <p className="text-xs text-[#3a4d44]/70">Pacing distribution across the 12-day loop</p>
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#d4af37]">
                    <span className="w-3 h-3 bg-[#d4af37]/80 rounded-sm inline-block" />
                    Driving Time (Hrs)
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <span className="w-3 h-1.5 bg-emerald-600 rounded-full inline-block" />
                    Kids Comfort (%)
                  </span>
                </div>
              </div>

              {/* Recharts Wrapper */}
              <div className="h-[280px] md:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={familyItineraryDays}
                    margin={{ top: 10, right: 10, bottom: 5, left: -10 }}
                    onClick={(state) => {
                      if (state && state.activeTooltipIndex !== undefined) {
                        const day = Number(state.activeTooltipIndex) + 1;
                        setSelectedItineraryDay(day);
                        trackEvent("itinerary_chart_click", "engagement", `day_${day}`);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a2f/5" vertical={false} />
                    <XAxis 
                      dataKey="label" 
                      tick={{ fill: "#1e3a2f", fontSize: 11, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="left"
                      label={{ value: "Drive Time (Hours)", angle: -90, position: "insideLeft", fontSize: 10, fill: "#b8941c", offset: 10 }}
                      tick={{ fill: "#b8941c", fontSize: 10 }}
                      domain={[0, 5]}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      label={{ value: "Kids Comfort (%)", angle: 90, position: "insideRight", fontSize: 10, fill: "#10b981", offset: 10 }}
                      tick={{ fill: "#10b981", fontSize: 10 }}
                      domain={[50, 100]}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as ItineraryDay;
                          return (
                            <div className="bg-[#1e3a2f] text-white p-3.5 rounded-xl border border-white/10 shadow-2xl text-xs space-y-1 z-50">
                              <p className="font-bold font-serif text-[#d4af37]">Day {data.dayNum}: {data.location}</p>
                              <p className="opacity-75 font-light text-[10px]">{data.leg}</p>
                              <div className="pt-1.5 grid grid-cols-2 gap-x-4 border-t border-white/10 mt-1 font-mono text-[9px]">
                                <span>🚗 Car Leg: {data.driveTime} hrs</span>
                                <span>🧸 Comfort: {data.comfortScore}%</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    {/* Background Comfort Area Cover */}
                    <Area 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="comfortScore" 
                      fill="rgba(16, 185, 129, 0.04)" 
                      stroke="#059669" 
                      strokeWidth={2.5}
                      dot={(props: any) => {
                        const { cx, cy, payload } = props;
                        const isSelected = payload.dayNum === selectedItineraryDay;
                        return (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={isSelected ? 6 : 4} 
                            fill={isSelected ? "#d4af37" : "#059669"} 
                            stroke={isSelected ? "#1e3a2f" : "#ffffff"} 
                            strokeWidth={2}
                          />
                        );
                      }}
                    />
                    {/* Driving Time representation as columns */}
                    <Bar 
                      yAxisId="left"
                      dataKey="driveTime" 
                      radius={[4, 4, 0, 0]}
                    >
                      {familyItineraryDays.map((entry, index) => {
                        const isSelected = entry.dayNum === selectedItineraryDay;
                        return (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={isSelected ? "#1e3a2f" : "rgba(212, 175, 55, 0.5)"} 
                            stroke={isSelected ? "#d4af37" : "transparent"}
                            strokeWidth={1.5}
                          />
                        );
                      })}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Tappable Horizontal Days Navigation - Mobile-First scrollable rail with touch targets */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#3a4d44]/60 block">
                  Tap to select any day sequence:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
                  {familyItineraryDays.map((day) => {
                    const isSelected = day.dayNum === selectedItineraryDay;
                    return (
                      <button
                        key={day.dayNum}
                        onClick={() => {
                          setSelectedItineraryDay(day.dayNum);
                          trackEvent("itinerary_day_btn_click", "engagement", `day_${day.dayNum}`);
                        }}
                        className={`min-w-11 h-11 rounded-xl font-mono text-xs font-bold transition-all shrink-0 snap-center select-none flex flex-col justify-center items-center border ${
                          isSelected
                            ? "bg-[#1e3a2f] border-[#1e3a2f] text-[#d4af37] shadow-md scale-105"
                            : "bg-[#fcfbf7] border-neutral-300/40 text-[#1e3a2f] hover:bg-[#1e3a2f]/5"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-extrabold">D{day.dayNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Active Day Detail Card Card (5 cols on large screen) */}
            <div className="lg:col-span-5 bg-white rounded-[32px] border border-[#1e3a2f]/5 shadow-xl overflow-hidden flex flex-col min-h-[420px] justify-between">
              {/* Highlight Top border */}
              <div className="h-2 w-full bg-[#1e3a2f]" />
              
              <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta Header */}
                  <div className="flex justify-between items-center pb-4 border-b border-[#1e3a2f]/5">
                    <div className="flex items-center gap-2">
                      <span className="w-10 h-10 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-bold font-serif text-sm">
                        D{familyItineraryDays[selectedItineraryDay - 1].dayNum}
                      </span>
                      <div>
                        <span className="text-[9px] font-mono uppercase font-bold text-[#b8941c] block">Current Focus</span>
                        <h4 className="font-serif font-bold text-sm text-[#1e3a2f]">
                          {familyItineraryDays[selectedItineraryDay - 1].location}
                        </h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">Leg Category</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase font-bold">
                        Day {selectedItineraryDay} of 12
                      </span>
                    </div>
                  </div>

                  {/* Main Activity details */}
                  <div className="space-y-4 mt-4">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                        <Map className="w-3 h-3 text-[#d4af37]" /> The Daily Route Leg
                      </span>
                      <p className="text-xs font-bold text-[#1e3a2f]">
                        {familyItineraryDays[selectedItineraryDay - 1].leg}
                      </p>
                      <p className="text-xs text-[#3a4d44] leading-relaxed font-light mt-1">
                        {familyItineraryDays[selectedItineraryDay - 1].activity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kids Highs & Parent Hacks */}
                <div className="space-y-3 mt-4">
                  <div className="bg-amber-50/50 border border-amber-100/60 p-3.5 rounded-2xl relative overflow-hidden">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-amber-800 flex items-center gap-1">
                      🧸 Kids Fun Highlight
                    </span>
                    <p className="text-xs text-amber-900 font-medium leading-relaxed mt-1">
                      "{familyItineraryDays[selectedItineraryDay - 1].kidsCheer}"
                    </p>
                  </div>

                  <div className="bg-[#1e3a2f]/5 p-3.5 border border-[#1e3a2f]/10 rounded-2xl">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-[#1e3a2f] flex items-center gap-1">
                      💡 Zero-Fatigue Parent Secret
                    </span>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light mt-1">
                      {familyItineraryDays[selectedItineraryDay - 1].parentHack}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Guide Indicators */}
              <div className="bg-[#1e3a2f] p-4 text-white text-xs grid grid-cols-3 divide-x divide-white/10 text-center font-mono">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#d4af37] block">Drive Time</span>
                  <span className="font-bold">{familyItineraryDays[selectedItineraryDay - 1].driveTime} Hrs</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#d4af37] block">Stroller Room</span>
                  <span className="font-bold">{familyItineraryDays[selectedItineraryDay - 1].strollerFriendly}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#d4af37] block">Leisure Pacing</span>
                  <span className="font-bold text-emerald-300">{familyItineraryDays[selectedItineraryDay - 1].comfortScore}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CAN YOU VISIT SIGIRIYA WITH A BABY? */}
      <section className="py-16 bg-[#1e3a2f] text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Parenting Reality Check</span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">
              Can You Truly Conquer Sigiriya With A Baby?
            </h2>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              Sigiriya is a stunning vertical granite monolith rising 200 meters, with **1,200 sheer steps** wrapped around cliff walls. Going up is absolutely achievable with a young family, but only if you avoid romanticized blog advice:
            </p>

            <div className="space-y-4 text-xs font-light text-white/90">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span><strong>Absolute Carrier Mandate:</strong> Pavements are highly uneven. Leave heavy strollers behind and secure baby safely in a breathable front carrier.</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span><strong>7:00 AM Gate Strategy:</strong> Avoid the scorching, humid heat block or narrow queues by climbing right at opening coordinates.</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span><strong>Avoid Pidurangala:</strong> Many influencers recommend Pidurangala Rock for sunrise. This carries extreme bouldering and steep drops at the peak, making it highly unsafe with babies or toddlers.</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-6 relative overflow-hidden">
            <div className="flex gap-3 items-start border-b border-white/10 pb-4">
              <span className="text-2xl">🍼</span>
              <div>
                <h4 className="font-serif font-bold text-base text-[#d4af37]">Baby Safety Packing Checklist</h4>
                <p className="text-[10px] text-white/55 font-mono uppercase tracking-wider mt-0.5">Prepare checklist before taking flight</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs font-light text-white/80">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" /> Pack high-DEET insect block.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" /> Lightweight linen wrap to shield baby from direct sun.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" /> High capacity thermos for warm baby water.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" /> Keep an emergency sachet of ORS (Oral Rehydration Salts).
              </li>
            </ul>

            <Link 
              to="/sri-lanka-visa-for-indians"
              className="mt-4 block text-center py-3 bg-[#d4af37] hover:bg-white text-white hover:text-black font-bold uppercase tracking-wider text-[11px] rounded-full transition-all"
            >
              Secure Sri Lanka ETA Tourist Visa Guide
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: BEST KID-FRIENDLY ACTIVITIES */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Memories Over Logistics</span>
          <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
            The 6 Ultimate Kid-Friendly Experiences
          </h2>
          <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
            These activities have been tested and approved by hundreds of families, offering the perfect combination of thrills, safety, and cultural immersion:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Pinnawala Elephant Bathing",
              spot: "Near Kandy Path",
              desc: "See dozens of gentle giants bathing in the Maha Oya river up close. It offers an incredible, safe perspective for children from riverbank cafes.",
              icon: "🐘"
            },
            {
              title: "Dambulla Open Jeep Safari",
              spot: "Minneriya / Hurulu Eco",
              desc: "Witness herds of hundreds of wild elephants grazing around water reservoirs. Seeing baby elephants trot alongside parents in deep wild landscapes is unforgettable.",
              icon: "🚜"
            },
            {
              title: "Royal Botanical Gardens",
              spot: "Peradeniya (Kandy)",
              desc: "Massive open green lawns, ancient hollow giant trees that look like fairy castles, and monkeys swinging in safe tree lines. Perfect for letting kids run wild.",
              icon: "🌴"
            },
            {
              title: "Ella Hill Country Train Ride",
              spot: "Nanu Oya to Ella Route",
              desc: "Board the legendary blue train. Breeze past cascading waterfalls, tea field hills, and misty ravines. Opt for first-class observing windows or try safe lookouts.",
              icon: "🚂"
            },
            {
              title: "Shallow Coastal Beach Play",
              spot: "Weligama Sandy Bay",
              desc: "Unlike steeper beaches, Weligama features shallow, calm sandy waters for at least 50 meters out. Safest spot on the island for baby wading and teen surf tasks.",
              icon: "🌊"
            },
            {
              title: "Kosgoda Sea Turtle Hatchery",
              spot: "South Coast Region",
              desc: "Learn about conservation efforts, touch rescued adult green turtles, and coordinate with guides to release baby hatchlings safely into calm evening tides.",
              icon: "🐢"
            }
          ].map((act, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[24px] border border-[#1e3a2f]/5 shadow-lg space-y-3 flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-2">
                <span className="text-3xl block">{act.icon}</span>
                <h4 className="font-serif font-bold text-base text-[#1e3a2f]">{act.title}</h4>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-bold">{act.spot}</span>
              </div>
              <p className="text-xs text-[#3a4d44]/90 font-light leading-relaxed pt-2 border-t border-[#1e3a2f]/5">
                {act.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: WHICH SOUTH COAST BEACH IS BEST FOR FAMILIES? */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#f5f2e8]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Coastal Matchmaker</span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              Which South Coast Beach Is Best For Families?
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              Not all beaches in Sri Lanka are safe for young children. Many have strong, dangerous shore breaks and heavy undertows. Let's compare the three premier options:
            </p>
          </div>

          {/* Beach selector tabs */}
          <div className="flex justify-center gap-3">
            {["weligama", "mirissa", "hiriketiya"].map((beach) => (
              <button
                key={beach}
                onClick={() => {
                  setSelectedBeach(beach as "weligama" | "mirissa" | "hiriketiya");
                  trackEvent("beach_tab_click", "engagement", beach);
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border uppercase tracking-wider ${
                  selectedBeach === beach
                    ? "bg-[#1e3a2f] text-white border-[#1e3a2f] shadow-md"
                    : "bg-white text-[#1e3a2f] border-neutral-300/60 hover:bg-neutral-50"
                }`}
              >
                {beach}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[32px] border border-[#1e3a2f]/5 shadow-2xl p-6 md:p-10 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {selectedBeach === "weligama" && (
                <motion.div
                  key="weligama"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-5 space-y-4">
                    <span className="text-xs font-mono text-[#d4af37] font-bold uppercase tracking-wider">🏆 Best All-Around for Kids</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#1e3a2f] font-bold">Weligama Sandy Bay</h3>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                      A beautiful crescent bay protected from heavy winds. The soft sand bottom cascades outward very gradually, creating zero deep drop-off hazards for at least 50 meters.
                    </p>
                    <div className="pt-2 border-t border-[#1e3a2f]/5">
                      <span className="text-[10px] uppercase font-mono tracking-wider block text-neutral-400">Perfect for:</span>
                      <p className="text-xs font-bold text-emerald-600">First-time beach babies, toddler splash plays, and teen beginner surfing.</p>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="bg-[#fcfbf7] p-5 rounded-2xl border border-[#1e3a2f]/5 space-y-2">
                      <h4 className="text-xs uppercase font-mono font-bold text-emerald-600">✓ The Pros:</h4>
                      <p className="text-xs text-[#3a4d44] font-light">
                        Shallow calm bay, sand bottom (no sharp coral risk), top-tier pediatric-certified resorts, and dozens of beachside dining spots.
                      </p>
                    </div>

                    <div className="bg-[#fcfbf7] p-5 rounded-2xl border border-[#1e3a2f]/5 space-y-2">
                      <h4 className="text-xs uppercase font-mono font-bold text-amber-600">✗ The Cons:</h4>
                      <p className="text-xs text-[#3a4d44] font-light">
                        Highly dynamic and popular with surf lessons—not as quiet or visually "isolated raw" as southern remote bays.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedBeach === "mirissa" && (
                <motion.div
                  key="mirissa"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-5 space-y-4">
                    <span className="text-xs font-mono text-[#d4af37] font-bold uppercase tracking-wider">🐳 Best for Adventure & Whales</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#1e3a2f] font-bold">Mirissa Golden Beach</h3>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                      A gorgeous golden sand crescent with a lively, trendy beach vibe. This is the main entry point for certified luxury catamaran whale-watching tours.
                    </p>
                    <div className="pt-2 border-t border-[#1e3a2f]/5">
                      <span className="text-[10px] uppercase font-mono tracking-wider block text-neutral-400">Perfect for:</span>
                      <p className="text-xs font-bold text-[#b8941c]">Older children, teenagers, marine enthusiasts, and seaside family sunsets.</p>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="bg-[#fcfbf7] p-5 rounded-2xl border border-[#1e3a2f]/5 space-y-2">
                      <h4 className="text-xs uppercase font-mono font-bold text-emerald-600">✓ The Pros:</h4>
                      <p className="text-xs text-[#3a4d44] font-light">
                        Fantastic sunset backdrops, beachfront cafes, whale safari docks, and beautiful walking rock lookouts (Coconut Tree Hill).
                      </p>
                    </div>

                    <div className="bg-[#fcfbf7] p-5 rounded-2xl border border-[#1e3a2f]/5 space-y-2">
                      <h4 className="text-xs uppercase font-mono font-bold text-amber-600">✗ The Cons:</h4>
                      <p className="text-xs text-[#3a4d44] font-light">
                        Slightly steeper beach drop-off. Waves can pick up rapidly, requiring active hand-holding for toddlers and non-swimmers.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedBeach === "hiriketiya" && (
                <motion.div
                  key="hiriketiya"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-5 space-y-4">
                    <span className="text-xs font-mono text-[#d4af37] font-bold uppercase tracking-wider">🌴 Best for Surfer Vibe</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#1e3a2f] font-bold">Hiriketiya Horseshoe Bay</h3>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                      An exquisite jungle-fringed horseshoe bay with a laid-back, bohemian surf spirit. Tall palm trees lean over the sandy shore, providing natural shade from direct sun.
                    </p>
                    <div className="pt-2 border-t border-[#1e3a2f]/5">
                      <span className="text-[10px] uppercase font-mono tracking-wider block text-neutral-400">Perfect for:</span>
                      <p className="text-xs font-bold text-red-600">Teenagers, couples with independent kids, and fans of boutique organic cafes.</p>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="bg-[#fcfbf7] p-5 rounded-2xl border border-[#1e3a2f]/5 space-y-2">
                      <h4 className="text-xs uppercase font-mono font-bold text-emerald-600">✓ The Pros:</h4>
                      <p className="text-xs text-[#3a4d44] font-light">
                        Stunning natural aesthetics, natural shade areas, and fantastic treehouse cafes. High surf waves are beautifully confined.
                      </p>
                    </div>

                    <div className="bg-[#fcfbf7] p-5 rounded-2xl border border-[#1e3a2f]/5 space-y-2">
                      <h4 className="text-xs uppercase font-mono font-bold text-amber-600">✗ The Cons:</h4>
                      <p className="text-xs text-[#3a4d44] font-light">
                        Small crowded bay, highly uneven entry tracks, and less stroller-friendly walking paths. Not convenient for babies.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 9: MAY WEATHER GUIDE */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Summer Holiday Reality</span>
          <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
            Can You Enjoy Sri Lanka in May?
          </h2>
          <p className="text-sm text-[#3a4d44]/90 font-light max-w-2xl mx-auto leading-relaxed">
            Many Indian families have their primary school holidays in May. If you read generic weather logs, it says "May is monsoon, avoid everything!" Here is the expert regional reality:
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { region: "Cultural Triangle", status: "Perfect (80% Dry)", desc: "Sigiriya and Dambulla enjoy beautiful sunny skies. Ideal morning climbs." },
            { region: "Hill Country", status: "Cool & Misty (60% Dry)", desc: "Refreshingly crisp Ella, temporary cozy afternoon showers, very lush greenery." },
            { region: "South Coast", status: "Partially Wet (50% Dry)", desc: "Winds pick up, but mornings are beautifully dry and calm before afternoon showers." },
            { region: "East Coast Beaches", status: "Outstanding (95% Dry)", desc: "Trincomalee and Passikudah are bone dry! Glass-calm, shallow oceans." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-[#1e3a2f]/5 text-center space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-400 block">Region {idx+1}</span>
              <h4 className="font-serif font-bold text-base text-[#1e3a2f]">{item.region}</h4>
              <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-mono uppercase font-bold block">
                {item.status}
              </span>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light pt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-[#1e3a2f]/5 rounded-2xl text-center border border-[#1e3a2f]/10 max-w-2xl mx-auto">
          <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
            <strong>Can you still enjoy beach days in May?</strong> Yes! If traveling in May, let us design your path heading <strong>East (Trincomalee / Nilaveli)</strong> rather than South. You will secure pristine calm, swimmable turquoise seas perfect for kids.
          </p>
        </div>
      </section>

      {/* SECTION 10: COMMON MISTAKES FAMILIES MAKE */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Expert Safeguards</span>
          <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
            10 Common Family Travel Mistakes To Avoid
          </h2>
          <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
            Avoid these rookie travel design mistakes to preserve your vacation peace of mind:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { num: "01", title: "Trying to visit too many attractions in 7 days", desc: "Results in packing fatigue. Keep your route focused. For shorter stays, check our [Sri Lanka 7 Day Itinerary](/sri-lanka-7-day-itinerary) guidelines." },
            { num: "02", title: "Packing a giant folding plastic stroller", desc: "Steps and garden tracks are highly uneven. Strollers are practically useless; choose a high-end baby carrier instead." },
            { num: "03", title: "Booking single-night hotel stays sequentially", desc: "Packing and repaking luggage every morning with kids is exhausting. Aim for a minimum 2-night rule." },
            { num: "04", title: "Neglecting region-specific monsoons", desc: "A rainy south coast means a bone-dry, sunny east coast. Always plan your route around active seasons as defined in [Best Time To Visit Sri Lanka](/best-time-to-visit-sri-lanka)." },
            { num: "05", title: "Booking public third-class trains with heavy luggage", desc: "Buses and standard third-class trains are packed and highly stressful with children. Always hire an AC private driver." },
            { num: "06", title: "Climbing Pidurangala rock with babies thinking it's Sigiriya", desc: "Pidurangala requires heavy vertical rock hopping and has steep un-fenced drop-offs. Keep young kids on Sigiriya's safe steel stairs." },
            { num: "07", title: "Booking national park safaris during the hot midday hour", desc: "Elephants hide in deep shade during extreme midday heat. Always book early morning (6:00 AM) or sunset (4:00 PM) safaris." },
            { num: "08", title: "Skipping simple emergency pediatric aid kits", desc: "Diarrhea medication, dehydration salts, child paracetamol, and mosquito spray are hard to procure in tiny, rural highland villages." },
            { num: "09", title: "Allowing kids to pet or feed wild temple macaques", desc: "Wild temple monkeys are highly opportunistic and can bite or scratch. Never let children showcase open food or snacks near them." },
            { num: "10", title: "Forgetting to review e-Visa entry requirements", desc: "Indian travelers require an ETA before boarding. Review our quick, complete [Sri Lanka Visa For Indians](/sri-lanka-visa-for-indians) handbook to avoid check-in stress." }
          ].map((mistake, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#1e3a2f]/5 flex gap-4 items-start shadow-sm">
              <span className="text-xl font-mono text-[#d4af37] font-bold shrink-0">
                {mistake.num}
              </span>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-sm text-[#1e3a2f]">{mistake.title}</h4>
                <p className="text-[11px] text-[#3a4d44]/80 leading-relaxed font-light">{renderFaqAnswerWithLinks(mistake.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: FAQ — 20+ EXHAUSTIVE FAQS */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-neutral-100/50 border-y border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Got Questions?</span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              Family Travel FAQ
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              Real concerns answered simply by our expert destination managers:
            </p>
          </div>

          <div className="space-y-4">
            {faqList.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#1e3a2f]/5 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => {
                    setActiveFaq(activeFaq === idx ? null : idx);
                    trackEvent("faq_family_toggle", "engagement", `faq_${idx}`);
                  }}
                  className="w-full text-left p-5 flex justify-between items-center bg-[#fcfbf7]/40 hover:bg-[#1e3a2f]/5 transition-colors"
                >
                  <span className="font-serif font-bold text-xs md:text-sm text-[#1e3a2f] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-[#1e3a2f]/5 text-xs md:text-sm text-[#3a4d44] leading-relaxed font-light">
                        {renderFaqAnswerWithLinks(faq.a)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: LEAD GENERATION OFFER — TRUST / ACQUISITION Phase */}
      <section id="personalized-plan-form" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-[32px] border border-[#1e3a2f]/5 shadow-2xl overflow-hidden relative">
          <div className="bg-[#1e3a2f] p-8 md:p-12 text-white relative text-center">
            <div className="absolute top-0 right-0 w-32 h-full bg-[#d4af37]/5 rounded-l-full pointer-events-none" />
            <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
              Get A Personalized Family Travel Plan
            </h2>
            <p className="text-white/70 text-xs md:text-sm font-light mt-3 max-w-xl mx-auto leading-relaxed">
              Tell us your travel dates, children's ages, and preferred budget limits. Our expert planners will map out the ideal, slow-paced route for your family.
            </p>
          </div>

          <form onSubmit={handleLeadFormSubmit} className="p-8 md:p-12 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f]">Travel Dates (or Month)</label>
                <input 
                  type="text" 
                  placeholder="e.g., May 2026 or Dec holidays" 
                  required
                  value={leadForm.travelDates}
                  onChange={(e) => setLeadForm({...leadForm, travelDates: e.target.value})}
                  className="w-full px-4 py-3 bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-xl text-xs text-[#1e3a2f] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f]">Children's Ages</label>
                <input 
                  type="text" 
                  placeholder="e.g., 2 and 5 years old" 
                  required
                  value={leadForm.childrenAges}
                  onChange={(e) => setLeadForm({...leadForm, childrenAges: e.target.value})}
                  className="w-full px-4 py-3 bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-xl text-xs text-[#1e3a2f] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f]">Preferred Budget Tier</label>
                <select 
                  value={leadForm.budget}
                  onChange={(e) => setLeadForm({...leadForm, budget: e.target.value})}
                  className="w-full px-4 py-3 bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-xl text-xs text-[#1e3a2f] focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="economy">Comfort Economy (Guesthouses + Driver)</option>
                  <option value="mid-range">Mid-Range (4-Star Resorts + Driver)</option>
                  <option value="luxury">Luxury Boutique (Private pool villas + Premium driver)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f]">Travel Vibe Style</label>
                <select 
                  value={leadForm.travelStyle}
                  onChange={(e) => setLeadForm({...leadForm, travelStyle: e.target.value})}
                  className="w-full px-4 py-3 bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-xl text-xs text-[#1e3a2f] focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="relaxed-luxury">Ultra Relaxed (More beaches & pools)</option>
                  <option value="balanced">Balanced (Culture + Safaris + Beaches)</option>
                  <option value="adventure">Active Adventure (Hikes + Surf + Whales)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-[#1e3a2f] block">WhatsApp Number (For Direct Concierge Delivery)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#1e3a2f]/40 font-bold font-mono">🇮🇳 (+91)</span>
                <input 
                  type="tel" 
                  placeholder="9876543210" 
                  required
                  value={leadForm.whatsappNumber}
                  onChange={(e) => setLeadForm({...leadForm, whatsappNumber: e.target.value})}
                  className="w-full pl-24 pr-4 py-3 bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-xl text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <input 
                type="checkbox" 
                id="agree-checkbox-family" 
                checked={leadForm.agreed}
                onChange={(e) => setLeadForm({...leadForm, agreed: e.target.checked})}
                className="mt-1 accent-[#1e3a2f]"
              />
              <label htmlFor="agree-checkbox-family" className="text-[10px] text-[#3a4d44] font-light leading-normal select-none">
                I agree to let Plan Sri Lanka's Cardiff and Colombo concierge desks coordinate a completely bespoke Vibe Tour itinerary and contact us via WhatsApp with updates.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !leadForm.whatsappNumber}
              className="w-full py-4 bg-[#1e3a2f] hover:bg-[#d4af37] disabled:bg-neutral-300 text-white font-bold uppercase tracking-wider text-xs rounded-full transition-all shadow-xl active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Stress-Free Plan...
                </div>
              ) : (
                "Plan My Family Trip"
              )}
            </button>

            {formSubmitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-medium">
                🎉 Success! We are launching your personalized travel coordinator via WhatsApp. Please hold on!
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
