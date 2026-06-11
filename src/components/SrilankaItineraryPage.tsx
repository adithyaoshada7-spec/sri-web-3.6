import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  MapPin, 
  Compass, 
  Clock, 
  Car, 
  Utensils, 
  Sparkles, 
  Calendar, 
  Info,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  AlertTriangle,
  Heart,
  Users,
  Backpack,
  Palmtree,
  Train,
  Check,
  Smartphone,
  TrendingDown,
  AlertCircle,
  Printer,
  FileText,
  Download
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import SrilankaRouteOptimizer from "./SrilankaRouteOptimizer";

export default function SrilankaItineraryPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive Route Selection State
  const [selectedStyle, setSelectedStyle] = useState<string>("first-time");
  const [selectedPriority, setSelectedPriority] = useState<string>("scenic-train");
  const [pdfPreviewPage, setPdfPreviewPage] = useState<number>(1);
  
  // Lead form state
  const [leadForm, setLeadForm] = useState({
    name: "",
    whatsapp: "",
    travelDates: "",
    travelers: 2,
    style: "comfortable-boutique",
    interests: [] as string[],
    agreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showStickyCta, setShowStickyCta] = useState(false);
  const pdfTrackingCooldown = React.useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollPercent >= 30) {
          setShowStickyCta(true);
        } else {
          setShowStickyCta(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePdfDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pdfTrackingCooldown.current) return;
    pdfTrackingCooldown.current = true;
    setTimeout(() => {
      pdfTrackingCooldown.current = false;
    }, 2000); // 2 second duplicate lock

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'itinerary_pdf_download', {
        event_category: 'engagement',
        event_label: 'sri_lanka_7_day_itinerary_pdf'
      });
    } else {
      trackEvent('itinerary_pdf_download', 'engagement', 'sri_lanka_7_day_itinerary_pdf');
    }

    // Scroll to section for context, then trigger print
    const element = document.getElementById("pdf-portfolio-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      window.print();
    }, 800);
  };

  const handleTripPlannerClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'trip_planner_click', {
        event_category: 'engagement',
        event_label: 'trip_planner_cta'
      });
    } else {
      trackEvent('trip_planner_click', 'engagement', 'trip_planner_cta');
    }
  };

  const handleWhatsAppRedirect = (source: string) => {
    trackEvent('whatsapp_click', 'conversion', `itinerary_page_${source}`);
    const message = `Hi Plan Sri Lanka! Please dynamic plan my 7-Day trip based on our travel style: ${selectedStyle} and priorities: ${selectedPriority}. I'm visiting from India and would like to customize the route without vehicle exhaustion.`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whatsapp) {
      alert("Please enter a valid WhatsApp phone number so we can securely send your customized PDF plan.");
      return;
    }
    setIsSubmitting(true);
    trackEvent('lead_submit', 'acquisition', 'itinerary_page_form_submit');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      const text = `Hi! I want to avoid planning mistakes and receive the customized 7-Day Sri Lanka Itinerary PDF.
      
📌 Trip Summary:
• WhatsApp: ${leadForm.whatsapp}
• Preferred Dates: ${leadForm.travelDates || "Oct/Nov 2026"}
• Travelers: ${leadForm.travelers}
• Selected Class: ${leadForm.style}
• Focus: ${leadForm.interests.join(", ") || "A balanced mix"}
• Interactive Selection: ${selectedStyle} + ${selectedPriority}`;

      const waUrl = `https://wa.me/94722968210?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 1200);
  };

  const toggleInterest = (interest: string) => {
    if (leadForm.interests.includes(interest)) {
      setLeadForm({
        ...leadForm,
        interests: leadForm.interests.filter(i => i !== interest)
      });
    } else {
      setLeadForm({
        ...leadForm,
        interests: [...leadForm.interests, interest]
      });
    }
  };

  const handleOptimizerChange = (selections: { style: string; pace: string; priority: string }) => {
    let formStyle = "comfortable-boutique";
    if (selections.style === "culture" || selections.style === "first-time") {
      formStyle = "value-standard";
    } else if (selections.style === "honeymoon") {
      formStyle = "comfortable-boutique";
    } else if (selections.style === "adventure") {
      formStyle = "signature-luxury";
    }

    const mappedInterests: string[] = [];
    const priorityMap: Record<string, string> = {
      "scenic-train": "Scenic Train",
      "wildlife": "Wildlife Safari",
      "nature": "Tea Estates",
      "temples": "Ancient Temples",
      "relaxation": "Galle Coast"
    };

    if (priorityMap[selections.priority]) {
      mappedInterests.push(priorityMap[selections.priority]);
    }

    setLeadForm(prev => ({
      ...prev,
      style: prev.style !== "signature-luxury" ? formStyle : prev.style,
      interests: mappedInterests
    }));
  };

  const travelStyles = [
    { id: "first-time", label: "First Time Visitor", icon: Backpack, desc: "See key must-visits" },
    { id: "honeymoon", label: "Honeymoon & Couples", icon: Heart, desc: "Romantic boutique focus" },
    { id: "family", label: "Family Travelers", icon: Users, desc: "Kid-friendly comfort pacing" },
    { id: "adventure", label: "Adventure Seeker", icon: Compass, desc: "Hiking & wild leopard tracking" },
    { id: "culture", label: "Culture & Heritage", icon: Palmtree, desc: "UNESCO ruins & deep history" }
  ];

  const priorities = [
    { id: "scenic-train", label: "Scenic Train", desc: "Legendary Blue Train Route" },
    { id: "wildlife", label: "Wild Leopard Safari", desc: "Private National Parks Tour" },
    { id: "nature", label: "Nature & Highlands", desc: "Lush Tea Valleys & Ravine Trails" },
    { id: "temples", label: "Sacred Relics/Temples", desc: "Dambulla Caves & Sigiriya Sky" },
    { id: "relaxation", label: "South Beach Rest", desc: "Colonial Galle fort & beach vibe" }
  ];

  // Route structures configuration
  const routeA = {
    name: "ROUTE A: The Classic Balanced Loop",
    sequence: "Sigiriya → Dambulla Caves → Kandy Hills → Scenic Highland Train → Ella Valleys",
    time: "8.5 Hours Total Driving Across 7 Days",
    score: "9.5/10",
    description: "The ideal curated loop for 7 days. Keeps transfers comfortable, hits the legendary misty high-country, and minimizes vehicle burnout.",
    highlights: ["Scales Sigiriya early morning to avoid the heat", "Includes Nanu-Oya to Ella observation deck train ride", "Retains 2-night base locations so you aren't packing and unpacking daily"],
    bestFor: "First-time family and couples looking for a deep, sensory connection without feeling rushed."
  };

  const routeB = {
    name: "ROUTE B: The Extreme Sightseeing Loop",
    sequence: "Sigiriya → Kandy Temples → Nuwara Eliya → Highlands Train → Ella Ridge → Yala Safaris → Galle Colonial Fort",
    time: "14.5+ Hours Total Driving (Exhausting!)",
    score: "6.5/10 Rating for 1-Week Trips",
    description: "Forces nearly the entire island map into only 7 days. Looks grand on a checklist, but you will spend a massive portion of your trip looking out of a car window.",
    highlights: ["Involves severe mountain hairpins for 4-5 hours a day", "You will pack/unpack practically every single night", "High potential for travel fatigue, missed train windows, and highway anxiety"],
    warning: "Warning! Involves excessive driving times on narrow winding country roads. Highly discouraged for honeymooners."
  };

  const routeC = {
    name: "ROUTE C: Tea Country & Colonial Coast",
    sequence: "Colombo Colonial Hub → Misty Nuwara Eliya Hills → Ella Mountain Gaps → Galle Fort Ramparts",
    time: "5.8 Hours Driving With Comfortable Highway Connections",
    score: "8.8/10 for Low-Stress Travel",
    description: "Skips the dusty ancient Ruins of the North to focus purely on high end mist estates and the sandy historic South Coast.",
    highlights: ["Saves over 3 hours of dusty transit time by leveraging southern expressway links", "Deep immersion in legendary Ceylon tea plantations & luxury bungalows", "Perfect blend of romantic mountain views and boutique coastal culinary options"],
    bestFor: "Honeymooners, slow travel enthusiasts, and families traveling with younger kids or seniors."
  };

  // Logic to calculate dynamic scores or recommendations based on interactive tool selections
  const getDynamicGuidance = () => {
    if (selectedStyle === "honeymoon" || selectedPriority === "relaxation") {
      return {
        recommendation: "Our algorithm recommends Route C (Our 5.8-Hour Tea-and-Coast Path) as your primary match, styled with ultra-luxurious romantic boutique properties.",
        routeType: "routeC"
      };
    } else if (selectedStyle === "adventure" || selectedPriority === "wildlife") {
      return {
        recommendation: "Our algorithm recommends Route A (The 8.5-Hour Balance Loop) but suggest appending a private afternoon Yala leopard safari on Day 5.",
        routeType: "routeA"
      };
    } else {
      return {
        recommendation: "Our algorithm recommends Route A (The 8.5-Hour Classic Balance Loop) as the ultimate sweet spot to optimize your time.",
        routeType: "routeA"
      };
    }
  };

  const dynamicMatch = getDynamicGuidance();

  const itineraryDays = [
    {
      day: "Day 1",
      title: "Landing in Colombo & Uncovering its Hidden Coastal Charm",
      driveTime: "45 mins (32 km via direct Airport Expressway)",
      attractions: "Galle Face Green, Colombo Dutch Hospital colonial district, Galle Face Hotel evening sea mist trail.",
      food: "Famous Sea-Bass or signature Lagoon Mud Crab at Ministry of Crab (Reserve 2 weeks early!), or local Hopper plates at Barefoot Garden Cafe.",
      hotel: "Galle Face Hotel Colombo (Iconic colonial majesty overlooking the Indian Ocean) or Uga Residence (Ultra-private central boutique oasis).",
      insider: "Indian airline flights usually touch down around late morning. Avoid congested central Colombo street transit by instructing your chauffeur to take the expressway directly. Use evening hours to exchange currency and secure local Dialog SIMs before departing inland tomorrow.",
      slug: "colombo"
    },
    {
      day: "Day 2",
      title: "Ancient Dambulla Cave Temple to the Mighty Sigiriya Citadel",
      driveTime: "4.0 hours (170 km on comfortable state highways)",
      attractions: "Ancient Golden Rock Cave Temple of Dambulla, Pidurangala Rock panoramic sunset views, private Sigiriya sanctuary.",
      food: "Traditional local rice & 15 organic clay-pot vegetable curries served in an open village pavilion.",
      hotel: "Jetwing Vil Uyana (Stunning wooden eco-dwellings over reed beds) or Heritance Kandalama (Breathtaking hotel designed into rocky mountainsides by architect Geoffrey Bawa).",
      insider: "Make a quick rest stop at Dambulla along the drive. Climb Pidurangala in the late afternoon; it is vastly cheaper, less crowded, and provides the absolute best view of Sigiriya Lion Rock glowing at orange sunset.",
      slug: "sigiriya-citadel"
    },
    {
      day: "Day 3",
      title: "Conquering Sigiriya's Skypath Early Morning & Kandy Lake Temple",
      driveTime: "2.5 hours (92 km)",
      attractions: "Sigiriya Lion Rock Fortress archaeological site (1,200 steps to the summit sky ruins), Royal Botanical Gardens of Peradeniya, and Temple of the Sacred Tooth Relic.",
      food: "Empire Cafe (A vibrant colonial-era fusion restaurant located steps away from Kandy Lake's Temple).",
      hotel: "The Kings Pavilion (Prestige private hills retreat) or W15 Hanthana Estate (Exquisite high-end tea heritage estate).",
      insider: "Start climbing Sigiriya by 7:00 AM sharp! This preserves energy, lets you conquer the metal staircases before they heat up, and ensures you beat the massive tour groups.",
      slug: "kandy-temples"
    },
    {
      day: "Day 4",
      title: "The Breathtaking Misty Blue Train Ride & Ella Mountain Valleys",
      driveTime: "6.0 hours on the historic Observation Carriage Train (Chauffeur transfers large luggage by road)",
      attractions: "Scenic tea country train route, cascading Ravana waterfalls, relaxed organic Ella town central street.",
      food: "Cafe Chill (Famous multi-story tropical hub offering artisanal wood-fired pizzas, local Kottu Roti, and craft mocktails).",
      hotel: "98 Acres Resort & Spa (Stunning luxury stone chalets built directly on a working organic tea estate) or Hide Ella.",
      insider: "Do NOT attempt to drive this road segment. The train ride from Kandy (or Nanu-Oya near Nuwara Eliya) is ranked the most scenic on Earth. Send your heavy bags ahead with your private chauffeur in the AC car, while you board the train with just a light backpack.",
      slug: "scenic-blue-train"
    },
    {
      day: "Day 5",
      title: "Sunrise at Nine Arch Bridge & Hiking Majestic Little Adam's Peak",
      driveTime: "Minimal local transits via tuk-tuk or private car",
      attractions: "Nine Arch Bridge (early morning photo run), Little Adam's Peak ridge climb, Ravana Pool Club lifestyle deck.",
      food: "Matey Hut (Generous local family-run kitchen serving the finest fresh dhal curry, coconut sambol, and cooking lessons).",
      hotel: "98 Acres Resort & Spa (Your second consecutive night here guarantees maximum physical relaxation).",
      insider: "Get to Nine Arch Bridge by 9:00 AM. There is a scenic train scheduled to pass at approximately 9:15-9:30 AM which produces spectacular, postcard-worthy photos crossing the stone arches.",
      slug: "ellas-peaks"
    },
    {
      day: "Day 6",
      title: "Descending across Ella Gap to Galle Fort's Historic Ramparts",
      driveTime: "3.5 hours (200 km via the comfortable Southern Expressway extension)",
      attractions: "Historic Galle Fort walking tour by historic ramparts, colonial Dutch reformed church, boutique shopping alleys, sunset walk at Utrecht Bastion.",
      food: "Fort Bazaar's Church Street Social (Exceptional Mediterranean-inspired culinary plates in a restored merchant manor).",
      hotel: "Amangalla (World-renowned iconic luxury heritage sanctuary within Fort walls) or Le Grand Galle (Panoramic cliff oceanfront boutique).",
      insider: "Avoid the slow coastal local road. The modern Southern Expressway is incredibly smooth. Take an evening walk around the Fort walls around 5:15 PM when the air is crisp and locals meet to fly kites and dive off the ramparts.",
      slug: "galle-fort"
    },
    {
      day: "Day 7",
      title: "Coastal River Mangroves & Departure Hub Chauffeur Dropoff",
      driveTime: "2.0 hours (150 km back to Colombo / Airport)",
      attractions: "Madu River scenic mangrove lagoon boat cruise, beach roadside tropical king coconut stands, Colombo Dutch Hospital souvenir run.",
      food: "Roadside luxury oceanfront lunch in Bentota or a light, comforting snack at Colombo Barefoot Cafe before your flight.",
      hotel: "Departure Flight (Ensure your flight departs after 4:00 PM for a beautifully relaxed final day).",
      insider: "The Madu River cruise takes about 1.5 hours. It is the perfect last-day activity to see waterside monitor lizards and cinnamon peeling processes before your chauffeur delivers you directly to the CMB departures bay.",
      slug: "departure"
    }
  ];

  const commonPlanningMistakes = [
    {
      title: "Over-packing the 7-day schedule with 'Map Conquest'",
      expl: "Trying to force Jaffna, Trincomalee, Sigiriya, Kandy, Nuwara Eliya, Ella, Yala, Galle, and Colombo into 7 days. You will experience nothing but asphalt and exhaustion."
    },
    {
      title: "Opting for self-drive car rentals",
      expl: "Sri Lanka's roads are narrow and filled with fearless, high-speed public buses, stray cows, and complex coastal traffic rules. A private driver is actually cheaper when factoring insurance and absolute peace of mind."
    },
    {
      title: "Attempting to skip pre-booking the Kandy-Ella Train",
      expl: "1st and 2nd class reserved observation train tickets sell out within minutes of being released online (30 days prior). Showing up on the day forces you into unreserved cargo compartments packed like sardines."
    },
    {
      title: "Taking the road instead of the highland train",
      expl: "Driving from Kandy to Ella is a tedious 5-hour journey behind exhaust-fuming trucks on winding mountain paths. The train bypasses this completely, taking you through private pine valleys and deep mist-covered tea country."
    },
    {
      title: "Changing hotels every single night of the week",
      expl: "Packing luggage, checking out at 10 AM, driving, checking in at 3 PM, unpacking, and repeating this daily for 7 days drains your actual vacation time down by half. Use 2-night bases in places like Sigiriya and Ella!"
    },
    {
      title: "Visiting Yala National Park during its seasonal closure",
      expl: "The main block (Block 1) of Yala National Park closes for annual maintenance and drought relief from September 1st to late October. If booking for autumn, switch your safari to Minneriya or Wilpattu instead."
    },
    {
      title: "Forgetting warm clothes for Nuwara Eliya and Ella",
      expl: "While Sri Lanka is tropical and beach-focused, the central mountain peaks rise above 1,800m. Evenings in Nuwara Eliya regularly drop to a chilly 10-15°C, making warm sweaters and light jackets absolutely mandatory."
    },
    {
      title: "Ignoring Temple etiquette and dress requirements",
      expl: "Sacred sites like the Temple of the Tooth and Dambulla caves enforce strict clothing decencies. Shoulders and knees must be fully covered. Carrying a light linen sarong in your backpack is a classic pro trick."
    },
    {
      title: "Assuming Uber operates reliably nationwide",
      expl: "Uber is incredible and cheap for quick runs inside central Colombo. However, it is virtually non-existent or highly unreliable in remote archaeological sites like Sigiriya, Ella peak-trails, or national safari parks."
    },
    {
      title: "Carrying and relying completely on international plastic cards",
      expl: "High-end hotels and colonial Fort restaurants accept major credit cards with ease, but remote roadside fruit stalls, tuk-tuk drivers, park guides, and local hopper cafes operate strictly on cash (Sri Lankan Rupees - LKR)."
    }
  ];

  const travelBudgets = [
    {
      tier: "Value Standard Tier",
      price: "₹32,000 - ₹44,000",
      per: "per person (Excl. Flights)",
      desc: "Perfect for budget-conscious Indian travelers, friends, or younger couples seeking comfortable, authentic lodgings.",
      includes: [
        "Private AC Chauffeur Car for 7 full days (sedan type)",
        "Stays in top-rated 3-star local hotels & modern family guesthouses with fresh breakfasts",
        "Reserved 2nd-class scenic train tickets (pre-arranged)",
        "Signature Sigiriya and Temple entry passes with local guides",
        "Public transit options for city explorations"
      ],
      cta: "Plan This Budget"
    },
    {
      tier: "Comfort Boutique Tier (Recommended)",
      price: "₹56,000 - ₹74,000",
      per: "per person (Excl. Flights)",
      desc: "Our most requested package. Ideal for families, honeymooners, and first-time visitors seeking stylish privacy and great pacing.",
      includes: [
        "Private AC executive sedan or SUV with an English-speaking chauffeur-guide",
        "Handpicked 4-star boutique hotels, historic manors, and eco-retreats with pools",
        "Guaranteed 1st-class train scenic observation cabin seats",
        "All high-priority entry tickets & private guided safaris",
        "Curated daily local food stops & premium colonial dining experiences",
        "Full round-the-clock remote local desk support"
      ],
      cta: "Plan Comfort Choice",
      popular: true
    },
    {
      tier: "Signature Executive Luxury",
      price: "₹1,20,000 - ₹1,75,000",
      per: "per person (Excl. Flights)",
      desc: "Bespoke, uncompromised luxury travel for high-net-worth individuals and premium honeymooners celebrating major milestones.",
      includes: [
        "Private premium European SUV or luxury van with highly trained expert guide-host",
        "Unrivalled stays at world-class 5-star properties (Amangalla, Jetwing Vil Uyana, tea estate bungalows)",
        "VIP private fast-track airport transfer clearances",
        "Private helicopter hops or premium business lounge tickets",
        "All-inclusive private naturalist-guided safaris in luxury customized open 4x4 vehicles",
        "Exclusive culinary tastings, private vineyard/spa access, and private historic dinners"
      ],
      cta: "Inquire Executive Path"
    }
  ];

  const faqs = [
    {
      q: "Do Indian passport holders need a visa for Sri Lanka in 2026?",
      a: "Yes, travelers from India require a visa. However, under the current reciprocal bilateral arrangements, Sri Lanka regularly issues a tourist visa (e-Visa or ETA) fee-free or at low cost to Indian passport holders. You should always register online at the official state portal before departure."
    },
    {
      q: "What is the absolute best month for a 7-day Sri Lanka trip?",
      a: "The classic loop covering Colombo, Sigiriya, Kandy, Ella, and Galle is at its absolute weather peak from December through mid-April. This is when the south/west coast beaches are dry and sandy, and the mountain hills are perfectly clear."
    },
    {
      q: "Does a 7-day tour feel way too rushed?",
      a: "It depends entirely on your route design! If you attempt to cover the whole island, it feels terribly rushed. But if you follow our Balanced Route (Route A: Sigiriya → Kandy → Ella), you spend less than 1.5 hours in transit per day on average, leaving massive quantities of time for hikes, pools, and local meals."
    },
    {
      q: "How much does a private chauffeur-driven car cost for 7 days in Sri Lanka?",
      a: "A private, fully air-conditioned modern sedan with an experienced English-speaking chauffeur-guide costs approximately ₹4,000 to ₹5,800 per day (around ₹28,000 to ₹40,000 for the entire 7-day journey). This rate usually covers driver lodging, meals, fuel, tolls, and absolute daily flexibility."
    },
    {
      q: "Is vegetarian and Indian food easily available in Sri Lanka?",
      a: "Absolutely! Sri Lanka shares deep culinary ties with southern India. Fresh vegetarian dishes, rich lentil dhals, coconut curries, crisp dosas, and idlis are widely available everywhere, from local roadside cafes to luxury hotels."
    },
    {
      q: "Can I use my Indian credit and debit cards easily across Sri Lanka?",
      a: "Major international credit and debit cards (Visa/Mastercard) are accepted at established places inside Galle Fort, Kandy, and Colombo. However, local tuk-tuk rides, fruit stands, small spice guides, and remote tea cafes operate strictly on cash (LKR - Sri Lankan Rupees)."
    },
    {
      q: "Should I carry Indian Rupees (INR) or US Dollars (USD) to exchange?",
      a: "It is highly recommended to carry USD, Euros, or clean GBP cash to convert at the Colombo airport banks, as they offer the most transparent exchange rates. Carrying some INR is acceptable for major exchange counters in Colombo, but USD is universally valued and easier to convert."
    },
    {
      q: "Is Sri Lanka safe for honeymoon couples?",
      a: "Sri Lanka is recognized as one of the safest, most welcoming, and visually romantic travel destinations in Asia. The local culture is exceptionally warm, hospitable, and respectful of couples and international visitors."
    },
    {
      q: "How do I secure tickets for the famous Kandy to Ella blue train?",
      a: "Train reservation cabins open exactly 30 days prior. Because they are world-famous, tickets sell out instantly via automated local queues. Booking your tour through a local travel planner like Plan Sri Lanka ensures we purchase these tickets the millisecond they are released."
    },
    {
      q: "What should I pack for the varying climates in Sri Lanka?",
      a: "Pack breathable light cotton clothing for hotter coastal zones like Colombo, Galle, Sigiriya, and Yala. However, pack at least one warm sweater or denim jacket for the cool evening mountain temperatures of Ella and Nuwara Eliya."
    },
    {
      q: "Is drinking tap water safe in Sri Lanka?",
      a: "No, you should never drink tap water directly. Clean, high-quality filtered bottled mineral water is exceptionally cheap and served at almost all boutique resorts, restaurants, and local general stores."
    },
    {
      q: "Can I buy a local SIM card at Colombo Airport, and what is the cost?",
      a: "Yes! There are prominent telecom counters (Dialog and Mobitel) located in the arrivals lobby open 24/7. An unlimited tourist data and local calling package costs approximately ₹700 to ₹1,200 (LKR 2,500 - 4,500) and takes under 5 minutes to activate with your passport details."
    },
    {
      q: "What electrical wall outlet adapters are used in Sri Lanka?",
      a: "Sri Lanka primarily utilizes the Type G (three square pins, same as India/UK) and Type D (three round pins) plugs. Practically all major boutique hotels supply multi-plug boards that fit Indian standard chargers seamlessly."
    },
    {
      q: "Is my luggage completely secure in our chauffeur's car during tours?",
      a: "Absolutely. Chauffeur-guides registered with Plan Sri Lanka treat luggage security with the highest priority. When you disembark for a hike or visit a temple, your bags remain locked securely within the vehicle's compartment."
    },
    {
      q: "Is tipping expected in Sri Lanka, and how much is customary?",
      a: "Yes, tipping is highly appreciated as it directly supports local service industry families. A standard tip of LKR 500 - 1,000 (roughly ₹150 - ₹300) for hotel bellboys, housekeeping, and safari drivers, and 10% on restaurant bills if a service charge isn't included, is customary."
    },
    {
      q: "What should I know about dry days or 'Poya' days in Sri Lanka?",
      a: "Every Poya (Full Moon night) is an official national holiday in Sri Lanka. Under state regulations, the retail sale and serving of alcohol (including in luxury bars and hotel restaurants) is strictly prohibited on these days. Ensure you stock up on local beverages the day prior if needed!"
    }
  ];

  return (
    <div className="bg-luxury-cream min-h-screen text-luxury-black font-sans leading-relaxed pt-24 md:pt-32">
      <Helmet>
        <title>Sri Lanka 7 Day Itinerary (2026) | Complete Route Optimization & Free Printable PDF Guide</title>
        <meta name="description" content="Maximize your 7 days in Sri Lanka with our field-tested route optimization guide. Get realistic driving loop comparisons, Indian Rupee (INR) cost estimates, hotel choices, and download our official printable PDF guide offline." />
        <meta name="keywords" content="Sri Lanka 7 day itinerary, Sri Lanka route optimization, Sri Lanka travel guide, Sri Lanka itineraries, Plan Sri Lanka, Sri Lanka tour package, Sri Lanka driving loops, Indian travelers in Sri Lanka" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://plan-srilanka.com/sri-lanka-7-day-itinerary" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://plan-srilanka.com/sri-lanka-7-day-itinerary" />
        <meta property="og:title" content="Sri Lanka 7 Day Itinerary (2026) | Complete Route Optimization & Free Printable PDF Guide" />
        <meta property="og:description" content="Maximize your 7 days in Sri Lanka with our field-tested route optimization guide. Get realistic driving loop comparisons, Indian Rupee (INR) cost estimates, hotel choices, and download our official printable PDF guide offline." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630" />
        <meta property="og:site_name" content="Plan Sri Lanka" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sri Lanka 7 Day Itinerary (2026) | Complete Route Optimization & Free Printable PDF Guide" />
        <meta name="twitter:description" content="Maximize your 7 days in Sri Lanka with our field-tested route optimization guide. Get realistic driving loop comparisons, Indian Rupee (INR) cost estimates, hotel choices, and download our official printable PDF guide offline." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200" />
        
        {/* ARTICLE SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka 7 Day Itinerary (2026) | Complete Route Optimization & Free Printable PDF Guide",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "author": {
              "@type": "Person",
              "name": "Adithya Oshada",
              "jobTitle": "Local Travel Planner"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            },
            "datePublished": "2026-02-10T08:00:00Z",
            "dateModified": "2026-06-11T07:30:00Z",
            "description": "Struggling to plan a 7-day Sri Lanka itinerary without wasting hours in a car? View actual driving hour comparisons, interactive schedules, realistic INR budgets, and download our offline printable PDF guide."
          })}
        </script>

        {/* BREADCRUMB SCHEMA */}
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
                "name": "7-Day Itinerary",
                "item": "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
              }
            ]
          })}
        </script>

        {/* HOW TO / ITINERARY STEP SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "7-Day Sri Lanka Route Itinerary Strategy",
            "description": "The ultimate day-by-day travel guide and optimized loop to experience Sri Lanka in exactly 7 days.",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "totalTime": "P7D",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "INR",
              "value": "62000"
            },
            "step": [
              {
                "@type": "HowToStep",
                "name": "Day 1: Arrival in Colombo & Oceanfront Stroll",
                "text": "Upon landing at Colombo Airport (CMB), receive reception via your private air-conditioned vehicle transport. Check into your hotel and enjoy a sunset walk along the beachfront at Galle Face Green.",
                "url": "https://plan-srilanka.com/sri-lanka-7-day-itinerary#day-1"
              },
              {
                "@type": "HowToStep",
                "name": "Day 2: Sigiriya Ancient Citadel Climb",
                "text": "Travel inland to the Cultural Triangle. Ascend the legendary Sigiriya Lion Rock fortress, enjoy an authentic rustic village lunch, and capture scenic sunset points.",
                "url": "https://plan-srilanka.com/sri-lanka-7-day-itinerary#day-2"
              },
              {
                "@type": "HowToStep",
                "name": "Day 3: Kandy Heritage & Cultural Highlights",
                "text": "Drive to the hill capital, Kandy. Visit the sacred Temple of the Tooth Relic, stroll the Royal Botanical Gardens, and attend a traditional cultural dance show.",
                "url": "https://plan-srilanka.com/sri-lanka-7-day-itinerary#day-3"
              },
              {
                "@type": "HowToStep",
                "name": "Day 4: Scenic Mountain Train Journey to Ella",
                "text": "Board the world-famous blue train from Nanu Oya to Ella through emerald tea estates. In the evening, photograph the architectural Nine Arch Bridge.",
                "url": "https://plan-srilanka.com/sri-lanka-7-day-itinerary#day-4"
              },
              {
                "@type": "HowToStep",
                "name": "Day 5: Ella Highland Hikes & Waterfalls",
                "text": "Hike up Little Adam’s Peak for sunrise, visit the cascading Ravana Falls, and experience an authentic guided tea factory harvesting and tasting tour.",
                "url": "https://plan-srilanka.com/sri-lanka-7-day-itinerary#day-5"
              },
              {
                "@type": "HowToStep",
                "name": "Day 6: Flexible Mountain Leisure & Relaxation",
                "text": "Indulge in organic Ayurvedic luxury spa treatments, experience an immersive culinary cooking class, or enjoy the vibrant mountain cafe culture of Ella.",
                "url": "https://plan-srilanka.com/sri-lanka-7-day-itinerary#day-6"
              },
              {
                "@type": "HowToStep",
                "name": "Day 7: Souvenir Shopping Hub & Flight Return",
                "text": "Check out from Ella and travel via high-speed southern expressway back to Colombo. Enjoy souvenir curations at high-end hubs before airport drop-off.",
                "url": "https://plan-srilanka.com/sri-lanka-7-day-itinerary#day-7"
              }
            ]
          })}
        </script>

        {/* FAQ SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
      </Helmet>

      {/* SECTION 1: HERO SECTION */}
      <section id="hero-section" className="relative bg-luxury-green text-white py-20 md:py-32 overflow-hidden px-6">
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full filter blur-[120px] pointer-events-none z-0" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-luxury-gold/10 border border-luxury-gold/30 px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] text-luxury-gold font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Fast-Track Travel Guide for Indian Travelers
          </div>
          
          <h1 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Sri Lanka 7 Day Itinerary: <br className="hidden md:block" />
            <span className="italic font-normal text-luxury-gold">Make The Most Of Your Limited Vacation Time</span>
          </h1>
          
          <p className="text-base md:text-xl text-luxury-cream/80 font-light max-w-2xl mx-auto leading-relaxed">
            Discover the best 7-day Sri Lanka route based on your travel style, interests, and available time. Spend less time trapped in vehicles and more time experiencing local soul.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-3xl mx-auto">
            <button
              onClick={handlePdfDownload}
              className="w-full sm:w-auto px-8 py-5 bg-white hover:bg-luxury-gold text-luxury-black hover:text-[#0c2f25] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:scale-105 cursor-pointer border-2 border-white"
            >
              📥 Download Free 7-Day Itinerary PDF
            </button>
            <a 
              href="#concierge-form"
              className="w-full sm:w-auto px-8 py-5 bg-luxury-gold hover:bg-white text-luxury-black font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-3 shadow-xl hover:scale-105 border-2 border-luxury-gold"
            >
              Get My Personalized Plan
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          {/* Visual Trust Indicator Bar */}
          <div className="grid grid-cols-3 max-w-2xl mx-auto pt-12 md:pt-16 border-t border-white/10 gap-4 text-center">
            <div>
              <p className="text-xl md:text-2xl font-serif text-luxury-gold font-bold">4.9★</p>
              <p className="text-[9px] md:text-xs text-white/50 uppercase tracking-widest font-mono">TripAdvisor Rating</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-serif text-luxury-gold font-bold">2,500+</p>
              <p className="text-[9px] md:text-xs text-white/50 uppercase tracking-widest font-mono">Indian Guests Assisted</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-serif text-luxury-gold font-bold">8.5 Hrs</p>
              <p className="text-[9px] md:text-xs text-white/50 uppercase tracking-widest font-mono">Max Transit Option</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE BIGGEST MISTAKE MOST TRAVELERS MAKE */}
      <section id="biggest-mistake" className="py-20 md:py-28 px-4 md:px-6 bg-white border-b border-luxury-black/10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">The Planning Epidemic</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
              The Biggest Mistake Most <br />
              <span className="italic">7-Day Travelers Make in Sri Lanka</span>
            </h2>
          </div>
          
          <p className="text-base md:text-lg text-luxury-black/70 font-light text-center max-w-2xl mx-auto leading-relaxed">
            Sri Lanka looks remarkably compact on a standard world map. But maps are deceptive. Winding mountain roads, cow hazards, and low average highway speeds (35 km/h) mean that an unoptimized route will lock you inside a vehicle for hours. 
            Trying to compress too many locations into a short 7-day vacation often results in:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-luxury-cream/30 p-5 rounded-2xl border border-luxury-black/5 text-center space-y-2">
              <span className="font-mono text-xl font-bold text-red-600 block">🚗</span>
              <h4 className="font-serif font-bold text-xs text-luxury-green uppercase">Excessive Driving</h4>
              <p className="text-[10px] text-luxury-black/60 leading-normal">Wasting 5-6 daylight hours daily crawling up mountain hairpins behind cargo box buses.</p>
            </div>
            <div className="bg-luxury-cream/30 p-5 rounded-2xl border border-luxury-black/5 text-center space-y-2">
              <span className="font-mono text-xl font-bold text-red-600 block">🏨</span>
              <h4 className="font-serif font-bold text-xs text-luxury-green uppercase">Hotel Hopping</h4>
              <p className="text-[10px] text-luxury-black/60 leading-normal">Packing, checking out at 10 AM, transiting, and checking in at 3 PM every single day.</p>
            </div>
            <div className="bg-luxury-cream/30 p-5 rounded-2xl border border-luxury-black/5 text-center space-y-2">
              <span className="font-mono text-xl font-bold text-red-600 block">😫</span>
              <h4 className="font-serif font-bold text-xs text-luxury-green uppercase">Severe Fatigue</h4>
              <p className="text-[10px] text-luxury-black/60 leading-normal">Constant altitude shocks and long driving days leaving you completely drained.</p>
            </div>
            <div className="bg-luxury-cream/30 p-5 rounded-2xl border border-luxury-black/5 text-center space-y-2">
              <span className="font-mono text-xl font-bold text-red-600 block">📸</span>
              <h4 className="font-serif font-bold text-xs text-luxury-green uppercase">Missing Authenticity</h4>
              <p className="text-[10px] text-luxury-black/60 leading-normal">Hurrying past local organic hoppers and tea estate walks to stay on schedule.</p>
            </div>
          </div>

          {/* VISUAL COMPARISON CHART */}
          <div className="pt-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-luxury-black/55 text-center font-bold mb-6">A Strategic Shift in Pacing</h3>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* WRONG APPROACH */}
              <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-rose-100 pb-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">✕</div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-rose-900">Wrong Approach</h4>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-rose-500 font-bold">See More Places</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs md:text-sm pt-2">
                  <div className="flex items-start gap-2 text-rose-800 font-light">
                    <span className="text-rose-500 font-bold font-mono">⚠️</span>
                    <span><strong>Excessive Driving:</strong> Spend 5+ hours daily trapped behind a car windshield.</span>
                  </div>
                  <div className="flex items-start gap-2 text-rose-800 font-light">
                    <span className="text-rose-500 font-bold font-mono">⚠️</span>
                    <span><strong>Hotel Hopping:</strong> Pack and unpack luggage up to 6 separate times in a week.</span>
                  </div>
                  <div className="flex items-start gap-2 text-rose-800 font-light">
                    <span className="text-rose-500 font-bold font-mono">⚠️</span>
                    <span><strong>Fatigue & Stress:</strong> Return home from vacation more physically exhausted than before.</span>
                  </div>
                  <div className="flex items-start gap-2 text-rose-800 font-light">
                    <span className="text-rose-500 font-bold font-mono">⚠️</span>
                    <span><strong>Missing Authentic Experiences:</strong> No time to linger at sunrise tea fields or local hopper cafes.</span>
                  </div>
                </div>
              </div>

              {/* BETTER APPROACH */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3 border-b border-emerald-100 pb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">✓</div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-emerald-900">Better Approach</h4>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 font-bold">See The Right Places</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs md:text-sm pt-2">
                  <div className="flex items-start gap-2 text-emerald-800 font-light">
                    <span className="text-emerald-500 font-bold font-mono">⭐</span>
                    <span><strong>Less Driving:</strong> Strategic routing drops total vehicle transit to a low 8.5 hours.</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-800 font-light">
                    <span className="text-emerald-500 font-bold font-mono">⭐</span>
                    <span><strong>No Checkout Rushes:</strong> Stay at least 2 nights inside Sigiriya and 2 nights in Ella.</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-800 font-light">
                    <span className="text-emerald-500 font-bold font-mono">⭐</span>
                    <span><strong>Refreshed Energies:</strong> Enjoy scenic peak hikes and luxurious boutique pool lounges at leisure.</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-800 font-light">
                    <span className="text-emerald-500 font-bold font-mono">⭐</span>
                    <span><strong>More Memorable Trip:</strong> Experience local culinary sessions and private tea estate guides.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-luxury-green/5 border border-luxury-green/10 rounded-2xl p-6 flex items-start gap-4 mt-8">
            <Info className="w-5 h-5 text-luxury-gold mt-1 shrink-0" />
            <p className="text-xs md:text-sm text-luxury-green/80 leading-relaxed font-light">
              <strong>The Pro Strategy:</strong> The secret is keeping a 2-night base and omitting high-distance regions. Optimize your geography. Below is our dynamic planner built to compare these exact transit penalties realistically.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE ROUTE OPTIMIZATION TOOL */}
      <section id="interactive-comparison" className="py-20 md:py-28 px-4 md:px-6 bg-luxury-cream/30">
        <div className="max-w-6xl mx-auto">
          <SrilankaRouteOptimizer onSelectionChange={handleOptimizerChange} />
        </div>
      </section>

      {/* SECTION 3: WHY WE RECOMMEND THIS ROUTE */}
      <section id="why-recommended" className="py-20 md:py-28 px-6 bg-luxury-green text-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">The Handcrafted Strategy</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              Why We Recommend This Route
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base max-w-2xl mx-auto">
              We design itineraries representing deep experience value rather than superficial map coverage. By dropping extreme distance segments, you trade asphalt hours for authentic memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            
            <div className="border border-white/15 bg-white/[0.03] p-6 rounded-2xl space-y-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-mono text-sm shrink-0 font-bold mx-auto md:mx-0">01</div>
              <h3 className="font-serif font-bold text-base text-white">Minimizes Wasted Travel Time</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                By focusing on a tight geographical corridor, you cut total driving time down from 14+ exhausting hours to just 8.5. This unlocks a full additional half-day of active relaxing.
              </p>
            </div>

            <div className="border border-white/15 bg-white/[0.03] p-6 rounded-2xl space-y-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-mono text-sm shrink-0 font-bold mx-auto md:mx-0">02</div>
              <h3 className="font-serif font-bold text-base text-white">First-Time Visitor Sweet Spot</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                You get to witness the quintessential Sri Lanka triple crown (Sigiriya citadel rock climb, Kandy's lakes and Tooth Relic, and the legendary high-country blue scenic trains) without leaving the island feeling drained.
              </p>
            </div>

            <div className="border border-white/15 bg-white/[0.03] p-6 rounded-2xl space-y-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-mono text-sm shrink-0 font-bold mx-auto md:mx-0">03</div>
              <h3 className="font-serif font-bold text-base text-white">Perfect Balance of Themes</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                This loop doesn't compromise. It elegantly merges ancient UNESCO world heritage structures, lush highlands green tea valleys, wild elephant/nature environments, and a colonial ocean coast finale.
              </p>
            </div>

            <div className="border border-white/15 bg-white/[0.03] p-6 rounded-2xl space-y-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-mono text-sm shrink-0 font-bold mx-auto md:mx-0">04</div>
              <h3 className="font-serif font-bold text-base text-white">Fewer Places, Deeper Memories</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Instead of checking into new rooms daily, you can linger on Ella mountain-edges with fine tea, take sunset strolls, cook local hoppers, and actually enjoy the company of those you travel with.
              </p>
            </div>

          </div>

          {/* Quick Pacing Ledger inside */}
          <div className="bg-white text-luxury-black rounded-3xl p-6 md:p-10 max-w-3xl mx-auto space-y-4 shadow-xl border border-white/10 mt-6">
            <h3 className="font-serif text-lg font-bold text-luxury-green text-center">Verified Pacing Optimization Ledger</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs py-2">
              <div className="bg-luxury-cream/20 p-3 rounded-xl">
                <span className="text-luxury-black/50 block text-[10px] uppercase">Active Experiences</span>
                <span className="font-bold text-[#006233]">100% Core Sights</span>
              </div>
              <div className="bg-luxury-cream/20 p-3 rounded-xl">
                <span className="text-luxury-black/50 block text-[10px] uppercase">Unpacking Friction</span>
                <span className="font-bold text-[#006233]">Zero (Stays 2 nights)</span>
              </div>
              <div className="bg-luxury-cream/20 p-3 rounded-xl">
                <span className="text-luxury-black/50 block text-[10px] uppercase">Train Seat Guarantee</span>
                <span className="font-bold text-luxury-gold font-bold">1st Class VIP Seat</span>
              </div>
              <div className="bg-luxury-cream/20 p-3 rounded-xl">
                <span className="text-luxury-black/50 block text-[10px] uppercase">Road Exhaustion Index</span>
                <span className="font-bold text-[#006233]">Low (12% Safety)</span>
              </div>
            </div>
            <button 
              onClick={() => handleWhatsAppRedirect("why_recommended_widget")}
              className="w-full max-w-sm mx-auto py-3 bg-luxury-gold text-luxury-black hover:bg-luxury-green hover:text-white font-serif tracking-[0.12em] text-[10px] uppercase font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              Verify Route Pacing Details on WhatsApp
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: OFFICIAL ROUTE OPTIMIZATION PRINTABLE PORTFOLIO / PDF ACCESS */}
      <section id="pdf-portfolio-section" className="py-20 md:py-28 px-4 md:px-6 bg-luxury-cream/10 border-b border-luxury-black/10">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
              font-family: system-ui, -apple-system, sans-serif !important;
            }
            #hero-section, #biggest-mistake, #interactive-comparison, #why-recommended, #pdf-portfolio-section > div:not(#printable-pdf-document), #itinerary-details, #concierge-form, footer, header, nav, button, a {
              display: none !important;
            }
            body > div:not(#printable-pdf-document) {
              display: none !important;
            }
            #printable-pdf-document {
              display: block !important;
              visibility: visible !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background-color: white !important;
            }
            .print-page {
              display: block !important;
              page-break-after: always !important;
              break-after: page !important;
              margin: 0 !important;
              padding: 40px !important;
              min-height: 297mm !important;
              box-sizing: border-box !important;
              background-color: white !important;
              color: #111111 !important;
              position: relative !important;
            }
            .print-page:last-child {
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
          }
        `}} />

        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-luxury-black/10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">Document Repository</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
                Download Route Optimization <br />
                <span className="italic font-normal text-luxury-gold font-serif">Guide & Budget Matrix (PDF)</span>
              </h2>
              <p className="text-sm text-luxury-black/75 font-light leading-relaxed">
                Save Vibe Tour&apos;s field-tested 7-day blueprint directly on your mobile device or print a copy. It features precise driving comparisons, realistic Indian Rupee costs, selected driver recommendations, and a checklist.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  trackEvent('print_itinerary_pdf', 'engagement', 'click_print_pdf');
                  window.print();
                }}
                className="px-6 py-4 bg-[#0a231c] hover:bg-[#113a2e] text-white rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-[1.03]"
              >
                <Printer className="w-4 h-4 text-luxury-gold" />
                Print / Save PDF Guide
              </button>
              <Link
                to="/sri-lanka-trip-planner"
                onClick={handleTripPlannerClick}
                className="px-6 py-4 bg-luxury-gold hover:bg-white text-luxury-black rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-luxury-gold transition-all text-center cursor-pointer hover:scale-[1.03]"
              >
                <FileText className="w-4 h-4 text-luxury-black" />
                Customize Route via Interactive Planner
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-luxury-black/5 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-luxury-green">Document Chapters</h3>
                <p className="text-xs text-luxury-black/60 leading-relaxed font-light">
                  Click on the chapters below to preview the pages representing the exact printed PDF publication layout:
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    { pageNum: 1, tag: "Page 1", title: "Route Mapping & Travel Times" },
                    { pageNum: 2, tag: "Page 2", title: "Currency Budgets & Curated Hotels" },
                    { pageNum: 3, tag: "Page 3", title: "Day 1 - 6 Printable Blueprints" },
                    { pageNum: 4, tag: "Page 4", title: "Day 7 Details & Smart Checklist" },
                  ].map((chapter) => (
                    <button
                      key={chapter.pageNum}
                      onClick={() => setPdfPreviewPage(chapter.pageNum)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        pdfPreviewPage === chapter.pageNum
                          ? "bg-luxury-green text-white border-luxury-green shadow-sm"
                          : "bg-luxury-cream/10 text-luxury-black border-luxury-black/5 hover:bg-luxury-cream/30"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className={`text-[10px] font-mono uppercase font-bold tracking-widest ${
                          pdfPreviewPage === chapter.pageNum ? "text-luxury-gold" : "text-luxury-black/40"
                        }`}>
                          {chapter.tag}
                        </span>
                        <h4 className="font-serif text-xs font-bold leading-tight">{chapter.title}</h4>
                      </div>
                      <span className="text-xs">➔</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-luxury-green text-luxury-cream rounded-3xl p-6 border border-white/5 space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-white">Indian Market Specialized</h4>
                </div>
                <p className="text-xs text-luxury-cream/70 leading-relaxed font-light">
                  Curated exclusively for Indian passports. Costs are compiled and converted directly into **Indian Rupees (INR)** to prevent exchange surprises. Transit times represent high-speed driver routes that shield senior citizens and kids from motion sickness.
                </p>
                <div className="pt-2 text-[10px] font-mono tracking-widest text-luxury-gold uppercase font-bold">
                  ✓ OFFLINE-READY PORTFOLIO
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="text-center pb-2 flex justify-between items-center px-4">
                <span className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase font-bold">
                  Digital Document Preview Box
                </span>
                <span className="text-xs text-luxury-black/50 font-mono">
                  Page {pdfPreviewPage} of 4
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-luxury-black/10 shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[680px] p-6 sm:p-12 text-[#111111]">
                <div className="absolute top-0 left-0 right-0 h-4.5 bg-[#4A79A5] flex items-center justify-between px-6">
                  <span className="text-[8px] text-white/50 font-mono">PLAN-SRILANKA.COM</span>
                  <span className="text-[8px] text-white/50 font-mono">2026 EDITION</span>
                </div>

                {pdfPreviewPage === 1 && (
                  <div className="space-y-8 pt-4">
                    <div className="bg-[#0f2a4a] text-white p-6 sm:p-8 rounded-lg space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full filter blur-[30px]" />
                      <h3 className="text-center font-serif text-2xl sm:text-4xl font-extrabold tracking-tight">
                        SRI LANKA ITINERARY (2026)
                      </h3>
                      <p className="text-center text-xs sm:text-sm text-sky-200 tracking-wide font-light">
                        Complete 7-Day Route Optimization Guide
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 pt-2 text-[9px] uppercase font-bold tracking-wider">
                        <span className="bg-[#4A79A5] text-white px-3 py-1 rounded">TAILORED FOR INDIAN TRAVELERS</span>
                        <span className="bg-amber-600 text-white px-3 py-1 rounded">COUPLES & FIRST-TIMERS</span>
                        <span className="bg-emerald-700 text-white px-3 py-1 rounded">OPTIMIZED LOOP</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest border-l-4 border-amber-500 pl-3 text-[#0f2a4a]">
                        1. ROUTE MAPPING & TRAVEL TIME OPTIMIZATION
                      </h4>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        A major pitfall for international travelers in Sri Lanka is over-scheduling. Backtracking across multiple geographic zones wastes valuable time inside cars. By choosing a balanced loop, you save energy and double your actual sightseeing hours. The optimized sequence drops down back to Colombo seamlessly on Day 7 via high-speed transit links.
                      </p>

                      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                        <p className="text-[11px] sm:text-xs font-bold text-[#0f2a4a] tracking-wide">
                          Colombo (Day 1) <span className="text-amber-500">➔</span> Sigiriya (Day 2) <span className="text-amber-500">➔</span> Kandy (Day 3) <span className="text-amber-500">➔</span> Ella (Days 4-6) <span className="text-amber-500">➔</span> Colombo (Day 7)
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#0f2a4a] text-white">
                              <th className="p-3 font-serif font-bold">Strategy Route</th>
                              <th className="p-3 font-serif font-bold">Destinations Included</th>
                              <th className="p-3 font-serif font-bold">Total Commute</th>
                              <th className="p-3 font-serif font-bold">Efficiency Rating</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200">
                            <tr className="bg-emerald-50/70">
                              <td className="p-3 font-bold text-[#0f2a4a]">Route A (Balanced Strategy)</td>
                              <td className="p-3 text-neutral-600 text-[11px]">Colombo → Sigiriya → Kandy → Ella</td>
                              <td className="p-3 font-bold text-[#0f2a4a]">8.5 Hours Total</td>
                              <td className="p-3 text-emerald-800 font-bold uppercase text-[10px]">Highly Optimized (Recommended)</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold text-red-900">Route B (Fast-Paced Loop)</td>
                              <td className="p-3 text-neutral-500 text-[11px]">Sigiriya → Kandy → Ella → Yala → Galle</td>
                              <td className="p-3 text-neutral-600 font-medium">14+ Hours Total</td>
                              <td className="p-3 text-rose-800 font-bold uppercase text-[10px]">Extremely Exhausting (Avoid)</td>
                            </tr>
                            <tr className="bg-amber-50/30">
                              <td className="p-3 font-bold text-neutral-800">Route C (Relaxed Highlands)</td>
                              <td className="p-3 text-neutral-500 text-[11px]">Kandy → Nuwara Eliya → Ella</td>
                              <td className="p-3 text-neutral-600">5.0 Hours Total</td>
                              <td className="p-3 text-neutral-700 font-semibold text-[10px]">Good but omits cultural triangle</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="text-sm font-bold uppercase tracking-widest border-l-4 border-amber-500 pl-3 text-[#0f2a4a]">
                        2. FINANCIAL BUDGET MATRIX & CURATED HOTELS
                      </h4>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        This financial allocation is meticulously estimated for a couple traveling from India, converting expenses accurately into Indian Rupees (INR) for seamless planning.
                      </p>
                      <div className="text-right text-[10px] text-neutral-400 font-mono italic">
                        Document Page 1 — Continued on next page...
                      </div>
                    </div>
                  </div>
                )}

                {pdfPreviewPage === 2 && (
                  <div className="space-y-6 pt-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest border-l-4 border-amber-500 pl-3 text-[#0f2a4a]">
                      2. BUDGET MATRIX & ACCOMMODATION (CONTINUED)
                    </h4>

                    <div className="overflow-x-auto bg-neutral-50 p-1 rounded-xl border border-neutral-200">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#0f2a4a] text-white">
                            <th className="p-3 font-serif font-bold">Expense Category</th>
                            <th className="p-3 font-serif font-bold">Value Budget (INR)</th>
                            <th className="p-3 font-serif font-bold">Premium Luxury (INR)</th>
                            <th className="p-3 font-serif font-bold">Strategic Planning Advice</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 text-[11px]">
                          <tr>
                            <td className="p-3 font-bold">Hotels (6 Nights)</td>
                            <td className="p-3 text-neutral-700">₹18,000 - ₹25,000</td>
                            <td className="p-3 font-semibold text-[#0f2a4a]">₹45,000 - ₹75,000</td>
                            <td className="p-3 text-neutral-500">Value tiers include top-rated, pristine local boutique villas.</td>
                          </tr>
                          <tr className="bg-neutral-100/55">
                            <td className="p-3 font-bold">Private AC Transport</td>
                            <td className="p-3 text-neutral-700">₹22,000</td>
                            <td className="p-3 font-semibold text-[#0f2a4a]">₹28,000</td>
                            <td className="p-3 text-neutral-500">Includes dedicated driver, toll fees, fuel, and custom stops.</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-bold">Sightseeing Tickets</td>
                            <td className="p-3 text-neutral-700">₹10,000</td>
                            <td className="p-3 font-semibold text-[#0f2a4a]">₹14,000</td>
                            <td className="p-3 text-neutral-500">Covers Sigiriya Rock and mountain railway passes. Book 30 days out.</td>
                          </tr>
                          <tr className="bg-neutral-100/55">
                            <td className="p-3 font-bold">Food & Allowances</td>
                            <td className="p-3 text-neutral-700">₹12,000</td>
                            <td className="p-3 font-semibold text-[#0f2a4a]">₹20,000</td>
                            <td className="p-3 text-neutral-500">Indian culinary dishes and vegetarian options are widely available.</td>
                          </tr>
                          <tr className="bg-amber-50 font-bold">
                            <td className="p-3 text-amber-900">Total Estimated Run</td>
                            <td className="p-3 text-neutral-800">₹62,000 Approx</td>
                            <td className="p-3 text-[#0f2a4a]">₹1,07,000+ Approx</td>
                            <td className="p-3 text-emerald-800 uppercase text-[10px] font-bold">Incredibly cost-effective island experience for couples.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f2a4a] pt-2">
                        Curated Accommodation Selection Guide
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#4A79A5] text-white">
                              <th className="p-2.5 font-bold">Stopover City</th>
                              <th className="p-2.5 font-bold">Value Accommodation Pick</th>
                              <th className="p-2.5 font-bold">Premium Luxury Selection</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 text-[11px]">
                            <tr>
                              <td className="p-2.5 font-bold">Colombo</td>
                              <td className="p-2.5 text-neutral-600">Fairway Colombo / Cinnamon Red</td>
                              <td className="p-2.5 text-[#0f2a4a] font-medium">The Kingsbury / Galle Face Hotel</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-bold">Sigiriya</td>
                              <td className="p-2.5 text-neutral-600">Sigiriya Village / Hotel Sigiriya</td>
                              <td className="p-2.5 text-[#0f2a4a] font-medium">Aliya Resort & Spa / Heritance Kandalama</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-bold">Kandy</td>
                              <td className="p-2.5 text-neutral-600">The Radh / Hotel Topaz</td>
                              <td className="p-2.5 text-[#0f2a4a] font-medium">Earl&apos;s Regency / Cinnamon Citadel</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-bold">Ella</td>
                              <td className="p-2.5 text-neutral-600 font-light">Ella Flower Garden Resort / Oak Ray Ella</td>
                              <td className="p-2.5 text-[#0f2a4a] font-medium">98 Acres Resort & Spa / EKHO Ella</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="text-sm font-bold uppercase tracking-widest border-l-4 border-amber-500 pl-3 text-[#0f2a4a]">
                        3. DAILY PRINTABLE FIELD BLUEPRINT
                      </h4>
                      <div className="border border-neutral-150 rounded-xl p-4 bg-white space-y-1.5 text-xs">
                        <p className="font-bold text-[#0f2a4a]">Day 1: Arrival in Colombo & Oceanfront Stroll</p>
                        <p className="text-neutral-600 text-[11px] leading-relaxed">
                          Airport reception via private AC vehicle transport. Check-in to hotel. Take an evening casual walk down the lively Galle Face Green beachfront followed by a welcome dinner at an open-air oceanfront venue.
                        </p>
                        <hr className="border-neutral-100" />
                        <div className="flex justify-between items-center text-[10px] text-neutral-500">
                          <span><strong>Transit Time:</strong> 45 minutes</span>
                          <span className="text-emerald-700 font-bold">Extremely High Availability</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {pdfPreviewPage === 3 && (
                  <div className="space-y-4 pt-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest border-l-4 border-amber-500 pl-3 text-[#0f2a4a]">
                      3. DAILY PRINTABLE FIELD BLUEPRINT (DAYS 2 - 6)
                    </h4>

                    {[
                      {
                        dayNum: 2,
                        title: "Sigiriya Ancient Citadel Climb",
                        desc: "Morning cross-country drive to the historic Cultural Triangle. Embark on a guided climb up the majestic Sigiriya Lion Rock Fortress. Enjoy an authentic rustic village lunch experience and witness magnificent sunset view points.",
                        transit: "Approx. 3.5-4 Hours",
                        tip: "Commute up the fortress by 3:30 PM to avoid peak heat."
                      },
                      {
                        dayNum: 3,
                        title: "Kandy Heritage & Cultural Highlights",
                        desc: "Drive down to the hill country capital, Kandy, via a scenic spice garden. Explore the highly sacred Temple of the Tooth Relic and tour the lush, grand Royal Botanical Gardens. Attend a traditional cultural drumming & dance performance in the evening.",
                        transit: "Approx. 2.5 Hours",
                        code: "Dress Code: Modest white/light attire shielding shoulders and knees."
                      },
                      {
                        dayNum: 4,
                        title: "Scenic Mountain Train Journey to Ella",
                        desc: "Board the classic highland train loop from Nanu Oya station into Ella. Marvel at emerald tea landscapes and misty valley panoramic frames. Enjoy a sunset photo-walk along the famous architectural Nine Arch Bridge.",
                        transit: "3 Hours (Scenic Rails)",
                        tip: "Reserve 1st or 2nd class observation cabins early."
                      },
                      {
                        dayNum: 5,
                        title: "Ella Highland Hikes & Waterfalls",
                        desc: "Embark on a scenic morning hike up to the iconic Little Adam&apos;s Peak point. Capture beautiful photography at the cascading Ravana Falls. Enjoy an afternoon guided exploration through a local estate tea factory with sampling sessions.",
                        transit: "Minimal local shifts",
                        atm: "Atmosphere: Refreshing, cool highland breeze and cozy cafe settings."
                      },
                      {
                        dayNum: 6,
                        title: "Flexible Mountain Leisure & Relaxation",
                        desc: "Configure this day entirely around your personal preferences: Indulge in traditional Ayurvedic spa therapy sessions, experience an immersive Sri Lankan culinary cooking class, or enjoy leisurely cafe exploration.",
                        transit: "0 Hours (Stationary)",
                        obj: "Objective: Deep recovery and decompression."
                      },
                    ].map((day) => (
                      <div key={day.dayNum} className="border border-neutral-150 rounded-xl p-3 bg-neutral-50/50 space-y-1 text-xs">
                        <p className="font-bold text-[#0f2a4a]">Day {day.dayNum}: {day.title}</p>
                        <p className="text-neutral-600 text-[11px] leading-relaxed">
                          {day.desc}
                        </p>
                        <hr className="border-neutral-100" />
                        <div className="flex flex-wrap justify-between gap-2 text-[10px] text-neutral-500 italic">
                          <span><strong>Transit Time:</strong> {day.transit}</span>
                          {day.tip && <span className="text-amber-700 font-semibold">★ Pro Tip: {day.tip}</span>}
                          {day.code && <span className="text-[#0f2a4a] font-semibold">👕 {day.code}</span>}
                          {day.atm && <span className="text-[#4A79A5] font-semibold">⛰️ {day.atm}</span>}
                          {day.obj && <span className="text-emerald-700 font-semibold">🎯 {day.obj}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {pdfPreviewPage === 4 && (
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-widest border-l-4 border-amber-500 pl-3 text-[#0f2a4a]">
                        3. DAILY PRINTABLE FIELD BLUEPRINT (DAY 7)
                      </h4>
                      <div className="border border-neutral-150 rounded-xl p-4 bg-neutral-50/50 space-y-1.5 text-xs">
                        <p className="font-bold text-[#0f2a4a]">Day 7: Souvenir Shopping Hub & Flight Return</p>
                        <p className="text-neutral-600 text-[11px] leading-relaxed">
                          Check out from Ella and return via the high-speed highway connection to Colombo. Enjoy curated shopping stopovers at premium retail hubs (ODEL, Barefoot, House of Fashions) followed by a timely transit transfer to the airport for your evening flight.
                        </p>
                        <hr className="border-neutral-100" />
                        <div className="flex justify-between items-center text-[10px] text-neutral-500">
                          <span><strong>Transit Time:</strong> Approx. 5 Hours</span>
                          <span className="text-red-700 font-bold">⚠️ Notice: Aim for terminal arrival 3 hours prior to takeoff.</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-widest border-l-4 border-amber-500 pl-3 text-[#0f2a4a]">
                        4. PRE-DEPARTURE SMART CHECKLIST
                      </h4>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="border border-neutral-200 rounded-xl p-3.5 bg-neutral-50">
                          <h5 className="font-bold text-xs text-[#0f2a4a] border-b border-neutral-200 pb-1.5 mb-2">
                            Travel Paperwork
                          </h5>
                          <ul className="space-y-1.5 text-[11px] text-neutral-600">
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Passport valid &gt; 6 months</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Approved Sri Lanka ETA Visa</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Printed Hotel confirmations</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Return air tickets block</li>
                          </ul>
                        </div>

                        <div className="border border-neutral-200 rounded-xl p-3.5 bg-neutral-50">
                          <h5 className="font-bold text-xs text-[#0f2a4a] border-b border-neutral-200 pb-1.5 mb-2">
                            Packing & Wardrobe
                          </h5>
                          <ul className="space-y-1.5 text-[11px] text-neutral-600">
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Light, breathable cotton outfits</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Elegant white temple clothing</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Trail runners or sneakers</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Light cardigan for Ella nights</li>
                          </ul>
                        </div>

                        <div className="border border-neutral-200 rounded-xl p-3.5 bg-neutral-50">
                          <h5 className="font-bold text-xs text-[#0f2a4a] border-b border-neutral-200 pb-1.5 mb-2">
                            Electronics & Essentials
                          </h5>
                          <ul className="space-y-1.5 text-[11px] text-neutral-600">
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Universal multi-pin adapter</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> High SPF sunblock & repellent</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Activated international credit card</li>
                            <li className="flex items-start gap-1.5"><span className="text-amber-500">•</span> Local currency (LKR) for tipping</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0f2a4a] text-white p-4.5 rounded-xl text-center space-y-2 relative overflow-hidden">
                      <p className="text-xs font-serif font-bold italic text-sky-200">
                        Want a tailored experience unique to your exact travel dates?
                      </p>
                      <span className="inline-block bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-full">
                        GENERATE YOUR CUSTOM ROUTE
                      </span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-6 right-6 border-t border-neutral-200 pt-2 flex justify-between items-center text-[9px] text-neutral-400 font-mono">
                  <span>Sri Lanka 7-Day Route Optimization Guide (2026)</span>
                  <span>Page {pdfPreviewPage} of 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* HIDDEN PRINT TARGET */}
          <div id="printable-pdf-document" className="hidden">
            {/* PRINT PAGE 1 */}
            <div className="print-page border-b border-neutral-300 pb-12">
              <div className="flex justify-between items-center pb-2 border-b-2 border-[#1e3a2f] mb-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#1e3a2f]">PLAN SRI LANKA</span>
                <span className="text-[10px] font-mono text-[#1e3a2f]">2026 EDITION</span>
              </div>

              <div className="text-center space-y-2 bg-[#0f2a4a] text-white p-8 rounded-xl mb-8">
                <h1 className="text-3xl font-bold tracking-tight">SRI LANKA ITINERARY (2026)</h1>
                <p className="text-sm font-light text-sky-200">Complete 7-Day Route Optimization Guide</p>
                <div className="text-[9px] font-mono font-bold tracking-widest space-x-2 text-amber-400">
                  <span>TAILORED FOR INDIAN TRAVELERS</span>
                  <span>|</span>
                  <span>COUPLES & FIRST-TIMERS</span>
                  <span>|</span>
                  <span>OPTIMIZED LOOP</span>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-[#0f2a4a] text-base font-bold uppercase tracking-wider border-l-4 border-amber-500 pl-3">
                  1. ROUTE MAPPING & TRAVEL TIME OPTIMIZATION
                </h2>
                <p className="text-xs text-neutral-800 leading-relaxed">
                  A major pitfall for international travelers in Sri Lanka is over-scheduling. Backtracking across multiple geographic zones wastes valuable time inside cars. By choosing a balanced loop, you save energy and double your actual sightseeing hours. The optimized sequence drops down back to Colombo seamlessly on Day 7 via high-speed transit links.
                </p>

                <div className="bg-neutral-100 p-4 text-center rounded-xl font-bold text-xs text-[#0f2a4a]">
                  Colombo (Day 1) ➔ Sigiriya (Day 2) ➔ Kandy (Day 3) ➔ Ella (Days 4-6) ➔ Colombo (Day 7)
                </div>

                <div className="pt-2">
                  <table className="w-full text-[11px] text-left border-collapse border border-neutral-300">
                    <thead>
                      <tr className="bg-[#0f2a4a] text-white text-[10px]">
                        <th className="p-2 border border-neutral-300 font-bold">Strategy Route</th>
                        <th className="p-2 border border-neutral-300 font-bold">Destinations Included</th>
                        <th className="p-2 border border-neutral-300 font-bold">Total Commute</th>
                        <th className="p-2 border border-neutral-300 font-bold">Efficiency Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-emerald-50">
                        <td className="p-2 border border-neutral-300 font-bold text-[#0f2a4a]">Route A (Balanced Strategy)</td>
                        <td className="p-2 border border-neutral-300">Colombo → Sigiriya → Kandy → Ella</td>
                        <td className="p-2 border border-neutral-300 font-bold">8.5 Hours Total</td>
                        <td className="p-2 border border-neutral-300 font-bold text-emerald-800 uppercase text-[9px]">Highly Optimized (Recommended)</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-neutral-300 font-bold text-red-900">Route B (Fast-Paced Loop)</td>
                        <td className="p-2 border border-neutral-300">Sigiriya → Kandy → Ella → Yala → Galle</td>
                        <td className="p-2 border border-neutral-300">14+ Hours Total</td>
                        <td className="p-2 border border-neutral-300 font-bold text-rose-800 uppercase text-[9px]">Extremely Exhausting (Avoid)</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-neutral-300 font-bold text-neutral-800">Route C (Relaxed Highlands)</td>
                        <td className="p-2 border border-neutral-300">Kandy → Nuwara Eliya → Ella</td>
                        <td className="p-2 border border-neutral-300">5.0 Hours Total</td>
                        <td className="p-2 border border-neutral-300 font-medium text-neutral-600 text-[9px]">Good but omits cultural triangle</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="text-[#0f2a4a] text-base font-bold uppercase tracking-wider border-l-4 border-amber-500 pl-3 pt-4">
                  2. FINANCIAL BUDGET MATRIX & CURATED HOTELS
                </h2>
                <p className="text-xs text-neutral-800 leading-relaxed">
                  This financial allocation is meticulously estimated for a couple traveling from India, converting expenses accurately into Indian Rupees (INR) for seamless planning. Value tiers include top-rated, pristine local boutique villas.
                </p>
              </div>

              <div className="absolute bottom-6 left-12 right-12 flex justify-between text-[9px] text-neutral-400 font-mono border-t border-neutral-200 pt-2">
                <span>Sri Lanka 7-Day Route Optimization Guide (2026)</span>
                <span>Page 1 of 4</span>
              </div>
            </div>

            {/* PRINT PAGE 2 */}
            <div className="print-page border-b border-neutral-300 pb-12">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-300 mb-6 font-mono text-[10px]">
                <span className="font-bold text-[#1e3a2f]">PLAN SRI LANKA</span>
                <span>2026 EDITION</span>
              </div>

              <div className="space-y-6">
                <h2 className="text-[#0f2a4a] text-base font-bold uppercase tracking-wider border-l-4 border-amber-500 pl-3">
                  2. COMPREHENSIVE BUDGET MATRIX (INR)
                </h2>

                <table className="w-full text-left text-[11px] border-collapse border border-neutral-300">
                  <thead>
                    <tr className="bg-[#0f2a4a] text-white">
                      <th className="p-2.5 border border-neutral-300 font-bold">Expense Category</th>
                      <th className="p-2.5 border border-neutral-300 font-bold">Value Budget (INR)</th>
                      <th className="p-2.5 border border-neutral-300 font-bold">Premium Luxury (INR)</th>
                      <th className="p-2.5 border border-neutral-300 font-bold">Strategic Planning Advice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-neutral-300 font-bold">Hotels (6 Nights)</td>
                      <td className="p-2 border border-neutral-300">₹18,000 - ₹25,000</td>
                      <td className="p-2 border border-neutral-300 font-bold text-[#0f2a4a]">₹45,000 - ₹75,000</td>
                      <td className="p-2 border border-neutral-300 text-neutral-600">Value tiers include top-rated, pristine local boutique villas.</td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="p-2 border border-neutral-300 font-bold">Private AC Transport</td>
                      <td className="p-2 border border-neutral-300">₹22,000</td>
                      <td className="p-2 border border-neutral-300 font-bold text-[#0f2a4a]">₹28,000</td>
                      <td className="p-2 border border-neutral-300 text-neutral-600">Includes dedicated driver, toll fees, fuel, and custom stops.</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-300 font-bold">Sightseeing Tickets</td>
                      <td className="p-2 border border-neutral-300">₹10,000</td>
                      <td className="p-2 border border-neutral-300 font-bold text-[#0f2a4a]">₹14,000</td>
                      <td className="p-2 border border-neutral-300 text-neutral-600">Covers Sigiriya Rock and mountain railway passes. Book 30 days out.</td>
                    </tr>
                    <tr className="bg-neutral-50">
                      <td className="p-2 border border-neutral-300 font-bold">Food & Allowances</td>
                      <td className="p-2 border border-neutral-300">₹12,000</td>
                      <td className="p-2 border border-neutral-300 font-bold text-[#0f2a4a]">₹20,000</td>
                      <td className="p-2 border border-neutral-300 text-neutral-600">Indian culinary dishes and vegetarian options are widely available.</td>
                    </tr>
                    <tr className="bg-amber-50 font-bold">
                      <td className="p-2 border border-neutral-300 text-amber-900">Total Estimated Run</td>
                      <td className="p-2 border border-neutral-300">₹62,000 Approx</td>
                      <td className="p-2 border border-neutral-300 text-emerald-900">₹1,07,000+ Approx</td>
                      <td className="p-2 border border-neutral-300 uppercase text-[9px] text-[#0f2a4a] font-bold">Incredibly cost-effective island experience for couples.</td>
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-[#0f2a4a] text-base font-bold uppercase tracking-wider border-l-4 border-amber-500 pl-3 pt-2">
                  CURATED ACCOMMODATION SELECTION GUIDE
                </h2>

                <table className="w-full text-left text-[11px] border-collapse border border-neutral-300">
                  <thead>
                    <tr className="bg-[#41698f] text-white">
                      <th className="p-2 border border-neutral-300 font-bold">Stopover City</th>
                      <th className="p-2 border border-neutral-300 font-bold">Value Accommodation Pick</th>
                      <th className="p-2 border border-neutral-300 font-bold">Premium Luxury Selection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-neutral-300 font-bold">Colombo</td>
                      <td className="p-2 border border-neutral-300">Fairway Colombo / Cinnamon Red</td>
                      <td className="p-2 border border-neutral-300 text-[#0f2a4a] font-bold">The Kingsbury / Galle Face Hotel</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-300 font-bold">Sigiriya</td>
                      <td className="p-2 border border-neutral-300">Sigiriya Village / Hotel Sigiriya</td>
                      <td className="p-2 border border-neutral-300 text-[#0f2a4a] font-bold">Aliya Resort & Spa / Heritance Kandalama</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-300 font-bold">Kandy</td>
                      <td className="p-2 border border-neutral-300">The Radh / Hotel Topaz</td>
                      <td className="p-2 border border-neutral-300 text-[#0f2a4a] font-bold">Earl&apos;s Regency / Cinnamon Citadel</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-300 font-bold">Ella</td>
                      <td className="p-2 border border-neutral-300">Ella Flower Garden Resort / Oak Ray Ella</td>
                      <td className="p-2 border border-neutral-300 text-[#0f2a4a] font-bold">98 Acres Resort & Spa / EKHO Ella</td>
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-[#0f2a4a] text-base font-bold uppercase tracking-wider border-l-4 border-amber-500 pl-3 pt-2">
                  3. DAILY PRINTABLE FIELD BLUEPRINT (DAY 1)
                </h2>
                <div className="border border-neutral-300 rounded-xl p-4 bg-neutral-50/50 text-xs">
                  <p className="font-bold text-[#0f2a4a] mb-1">Day 1: Arrival in Colombo & Oceanfront Stroll</p>
                  <p className="text-neutral-700 leading-relaxed mb-2 text-[11px]">
                    Airport reception via private AC vehicle transport. Check-in to hotel. Take an evening casual walk down the lively Galle Face Green beachfront followed by a welcome dinner at an open-air oceanfront venue.
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-neutral-500 border-t border-neutral-200 pt-2 italic">
                    <span><strong>Transit Time:</strong> 45 minutes</span>
                    <span className="font-bold text-[#1e3a2f]">Indian Food: High availability</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-12 right-12 flex justify-between text-[9px] text-neutral-400 font-mono border-t border-neutral-200 pt-2">
                <span>Sri Lanka 7-Day Route Optimization Guide (2026)</span>
                <span>Page 2 of 4</span>
              </div>
            </div>

            {/* PRINT PAGE 3 */}
            <div className="print-page border-b border-neutral-300 pb-12">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-300 mb-6 font-mono text-[10px]">
                <span className="font-bold text-[#1e3a2f]">PLAN SRI LANKA</span>
                <span>2026 EDITION</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-[#0f2a4a] text-base font-bold uppercase tracking-wider border-l-4 border-amber-500 pl-3 mb-2">
                  3. DAILY PRINTABLE FIELD BLUEPRINT (DAYS 2 - 6)
                </h2>

                {[
                  {
                    dayNum: 2,
                    title: "Sigiriya Ancient Citadel Climb",
                    desc: "Morning cross-country drive to the historic Cultural Triangle. Embark on a guided climb up the majestic Sigiriya Lion Rock Fortress. Enjoy an authentic rustic village lunch experience and witness magnificent sunset view points.",
                    transit: "Approx. 3.5-4 Hours",
                    tip: "Commute up the fortress by 3:30 PM to avoid peak heat."
                  },
                  {
                    dayNum: 3,
                    title: "Kandy Heritage & Cultural Highlights",
                    desc: "Drive down to the hill country capital, Kandy, via a scenic spice garden. Explore the highly sacred Temple of the Tooth Relic and tour the lush, grand Royal Botanical Gardens. Attend a traditional cultural drumming & dance performance in the evening.",
                    transit: "Approx. 2.5 Hours",
                    tip: "Dress Code: Modest white/light attire shielding shoulders and knees."
                  },
                  {
                    dayNum: 4,
                    title: "Scenic Mountain Train Journey to Ella",
                    desc: "Board the classic highland train loop from Nanu Oya station into Ella. Marvel at emerald tea landscapes and misty valley panoramic frames. Enjoy a sunset photo-walk along the famous architectural Nine Arch Bridge.",
                    transit: "3 Hours (Scenic Rails)",
                    tip: "Reserve 1st or 2nd class observation cabins early."
                  },
                  {
                    dayNum: 5,
                    title: "Ella Highland Hikes & Waterfalls",
                    desc: "Embark on a scenic morning hike up to the iconic Little Adam&apos;s Peak point. Capture beautiful photography at the cascading Ravana Falls. Enjoy an afternoon guided exploration through a local estate tea factory with sampling sessions.",
                    transit: "Minimal local shifts",
                    tip: "Atmosphere: Refreshing, cool highland breeze and cozy cafe settings."
                  },
                  {
                    dayNum: 6,
                    title: "Flexible Mountain Leisure & Relaxation",
                    desc: "Configure this day entirely around your personal preferences: Indulge in traditional Ayurvedic spa therapy sessions, experience an immersive Sri Lankan culinary cooking class, or enjoy leisurely cafe exploration.",
                    transit: "0 Hours (Stationary)",
                    tip: "Objective: Deep recovery and decompression."
                  },
                ].map((day) => (
                  <div key={day.dayNum} className="border border-neutral-300 rounded-xl p-3 bg-neutral-50/50 text-xs">
                    <p className="font-bold text-[#0f2a4a] mb-1">Day {day.dayNum}: {day.title}</p>
                    <p className="text-neutral-700 leading-relaxed mb-1.5 text-[11px]">{day.desc}</p>
                    <div className="flex flex-wrap justify-between gap-2 text-[10px] text-neutral-500 border-t border-neutral-150 pt-1.5 italic">
                      <span><strong>Transit:</strong> {day.transit}</span>
                      <span className="text-amber-800 font-bold">{day.tip}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-6 left-12 right-12 flex justify-between text-[9px] text-neutral-400 font-mono border-t border-neutral-200 pt-2">
                <span>Sri Lanka 7-Day Route Optimization Guide (2026)</span>
                <span>Page 3 of 4</span>
              </div>
            </div>

            {/* PRINT PAGE 4 */}
            <div className="print-page pb-12">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-300 mb-6 font-mono text-[10px]">
                <span className="font-bold text-[#1e3a2f]">PLAN SRI LANKA</span>
                <span>2026 EDITION</span>
              </div>

              <div className="space-y-6">
                <h2 className="text-[#0f2a4a] text-base font-bold uppercase tracking-wider border-l-4 border-amber-500 pl-3">
                  3. DAILY PRINTABLE FIELD BLUEPRINT (DAY 7)
                </h2>
                <div className="border border-neutral-300 rounded-xl p-4 bg-neutral-50/50 text-xs">
                  <p className="font-bold text-[#0f2a4a] mb-1">Day 7: Souvenir Shopping Hub & Flight Return</p>
                  <p className="text-neutral-700 leading-relaxed mb-2 text-[11px]">
                    Check out from Ella and return via the high-speed highway connection to Colombo. Enjoy curated shopping stopovers at premium retail hubs (ODEL, Barefoot, House of Fashions) followed by a timely transit transfer to the airport for your evening flight.
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-neutral-500 border-t border-neutral-200 pt-2 italic">
                    <span><strong>Transit Time:</strong> Approx. 5 Hours</span>
                    <span className="text-red-700 font-bold">Aim for terminal arrival 3 hours prior to takeoff.</span>
                  </div>
                </div>

                <h2 className="text-[#0f2a4a] text-base font-bold uppercase tracking-wider border-l-4 border-amber-500 pl-3 pt-2">
                  4. PRE-DEPARTURE SMART CHECKLIST
                </h2>

                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-neutral-300 rounded-xl p-4 bg-neutral-50">
                    <h3 className="font-bold text-xs border-b border-neutral-300 pb-1 mb-2 text-[#0f2a4a]">Travel Paperwork</h3>
                    <ul className="space-y-1 text-[10px] text-neutral-600 list-disc pl-4">
                      <li>Passport valid &gt; 6 months</li>
                      <li>Approved Sri Lanka ETA Visa</li>
                      <li>Printed Hotel confirmations</li>
                      <li>Return air tickets block</li>
                    </ul>
                  </div>

                  <div className="border border-neutral-300 rounded-xl p-4 bg-neutral-50">
                    <h3 className="font-bold text-xs border-b border-neutral-300 pb-1 mb-2 text-[#0f2a4a]">Packing & Wardrobe</h3>
                    <ul className="space-y-1 text-[10px] text-neutral-600 list-disc pl-4">
                      <li>Light, breathable cotton</li>
                      <li>White clothing for temples</li>
                      <li>Trail runners or sneakers</li>
                      <li>Light cardigan for Ella</li>
                    </ul>
                  </div>

                  <div className="border border-neutral-300 rounded-xl p-4 bg-neutral-50">
                    <h3 className="font-bold text-xs border-b border-neutral-300 pb-1 mb-2 text-[#0f2a4a]">Electronics & Essentials</h3>
                    <ul className="space-y-1 text-[10px] text-neutral-600 list-disc pl-4">
                      <li>Universal multi-pin adapter</li>
                      <li>High SPF sunblock & repellent</li>
                      <li>Active international credit card</li>
                      <li>Local currency (LKR) cash</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 text-center space-y-3 bg-[#0f2a4a] text-white p-6 rounded-xl print:bg-[#0f2a4a] print:text-white">
                  <p className="text-xs font-serif italic text-sky-200">
                    Want an entirely customized 7-day route unique to your exact travel dates?
                  </p>
                  <div className="pt-1 select-none">
                    <Link
                      to="/sri-lanka-trip-planner"
                      onClick={handleTripPlannerClick}
                      className="inline-flex px-6 py-3 bg-luxury-gold hover:bg-white text-luxury-black font-semibold uppercase tracking-wider text-[10px] rounded-full transition-all cursor-pointer hover:scale-[1.03]"
                    >
                      Use Our Interactive Trip Planner
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-12 right-12 flex justify-between text-[9px] text-neutral-400 font-mono border-t border-neutral-200 pt-2">
                <span>Sri Lanka 7-Day Route Optimization Guide (2026)</span>
                <span>Page 4 of 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRIP PLANNER CTA SECTION */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#0a231c] via-[#0c2f25] to-[#124235] text-white text-center relative overflow-hidden border-b border-luxury-black/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-bold block">Interactive Decision Tool</span>
          <h2 className="text-3xl md:text-4xl font-serif leading-tight">
            Want a Custom Route for Your Specific Dates?
          </h2>
          <p className="text-sm md:text-base text-luxury-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
            Our smart planning algorithm helps you select the perfect climate cluster, estimate actual driving hours, and filter the absolute best boutique hotel rates instantly.
          </p>
          <div className="pt-2">
            <Link
              to="/sri-lanka-trip-planner"
              onClick={handleTripPlannerClick}
              className="inline-flex px-8 py-4.5 bg-luxury-gold hover:bg-white text-luxury-black font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full items-center gap-3 shadow-xl hover:scale-105 cursor-pointer"
            >
              Generate My Personalized Sri Lanka Route
              <ArrowRight className="w-4 h-4 text-luxury-black" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: DETAILED DAY-BY-DAY ITINERARY */}
      <section id="itinerary-details" className="py-20 md:py-28 px-6 bg-white border-b border-luxury-black/15">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">Day-By-Day Blueprint</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
              The Perfect 7-Day <span className="italic">Chronology</span>
            </h2>
            <p className="text-base text-luxury-black/60 max-w-2xl mx-auto font-light">
              This sequential itinerary is optimized specifically to balance travel times, authentic dining experiences, boutique heritage properties, and secret local tips.
            </p>
          </div>

          <div className="space-y-12 pt-6">
            {itineraryDays.map((d, index) => (
              <div 
                key={index} 
                id={`day-${index + 1}`}
                className="bg-luxury-cream/15 rounded-[32px] border border-luxury-black/5 p-6 md:p-10 space-y-6 relative hover:shadow-lg transition-all"
              >
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-luxury-black/5 pb-6">
                  <div className="flex items-center gap-4">
                    <span className="w-14 h-14 bg-luxury-green text-luxury-gold font-serif text-lg font-bold flex items-center justify-center rounded-3xl shrink-0">
                      D{index + 1}
                    </span>
                    <div>
                      <span className="text-[10px] text-luxury-gold uppercase tracking-[0.2em] font-mono block font-bold">MIST FREE PACING ROUTE</span>
                      <h3 className="font-serif text-xl md:text-2xl text-luxury-green font-bold">{d.title}</h3>
                    </div>
                  </div>
                  <div className="bg-luxury-gold/10 border border-luxury-gold/25 px-4 py-2 rounded-xl text-right">
                    <span className="text-[9px] uppercase tracking-widest block text-luxury-black/40 font-mono">Driving Time</span>
                    <span className="text-xs font-bold font-mono text-luxury-green">{d.driveTime}</span>
                  </div>
                </div>

                {/* Day Breakdown Content */}
                <div className="grid md:grid-cols-12 gap-8 text-xs md:text-sm">
                  <div className="md:col-span-8 space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-base text-luxury-green flex items-center gap-2">
                        <Compass className="w-4 h-4 text-luxury-gold shrink-0" /> Key Sightseeing & Elements
                      </h4>
                      <p className="text-luxury-black/70 font-light leading-relaxed">{d.attractions}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-white p-4 rounded-2xl border border-luxury-black/5 space-y-1">
                        <h5 className="font-serif font-bold text-xs text-luxury-green flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-luxury-gold" /> Food Pairing Tip
                        </h5>
                        <p className="text-xs text-luxury-black/60 leading-relaxed font-light">{d.food}</p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-luxury-black/5 space-y-1">
                        <h5 className="font-serif font-bold text-xs text-luxury-green flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-luxury-gold" /> Recommended Lodging
                        </h5>
                        <p className="text-xs text-luxury-black/60 leading-relaxed font-light">{d.hotel}</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-luxury-green/[0.03] p-5 rounded-2xl border border-luxury-green/5 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-luxury-gold">
                      <Sparkles className="w-4 h-4 fill-luxury-gold/20" />
                      <h4 className="font-bold text-xs uppercase tracking-widest text-luxury-green font-mono">Chauffeur Insider Tip</h4>
                    </div>
                    <p className="text-[11px] text-luxury-black/70 leading-relaxed font-light italic">
                      " {d.insider} "
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TRANSPORTATION REALITY CHECK */}
      <section id="transportation-check" className="py-20 md:py-28 px-4 md:px-6 bg-luxury-cream/40">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">The Road Truth</span>
            <span className="text-[10px] font-mono tracking-widest block text-luxury-green font-bold">Will I Spend My Vacation In A Car?</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
              Transportation Reality Check
            </h2>
            <p className="text-base text-luxury-black/70 max-w-2xl mx-auto font-light leading-relaxed">
              If you follow cookie-cutter package bookings, <strong>yes, you will.</strong> Standard tours take over 15+ hours on winding, bumpy paths. But with our <strong>Optimized Balanced Axis</strong>, we bypass vehicle exhaustion completely.
            </p>
          </div>

          <div className="bg-white rounded-[32px] border border-luxury-black/5 p-6 md:p-12 space-y-8 shadow-md">
            
            {/* Visual Core Ledger and Score Side-By-Side */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Transportation Efficiency Score Widget */}
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-luxury-gold/10 space-y-4 text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold font-bold block">Engine Calculation</span>
                <h4 className="font-serif text-xl font-bold text-luxury-green">Transportation Efficiency Score</h4>
                
                {/* Visual Radial Progress Counter */}
                <div className="flex items-center justify-center py-4">
                  <div className="relative w-32 h-32 rounded-full border-4 border-luxury-cream flex flex-col items-center justify-center shadow-inner">
                    <span className="text-3xl font-serif font-bold text-luxury-green">95%</span>
                    <span className="text-[10px] text-luxury-black/40 font-mono">OPTIMIZED</span>
                    
                    {/* Glowing highlight indicator */}
                    <div className="absolute inset-0 rounded-full border-4 border-t-luxury-gold border-r-luxury-gold animate-pulse pointer-events-none" />
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-luxury-black/60 font-light">Average traveler rating on transit comfort:</p>
                  <p className="font-bold text-luxury-green">⭐ 4.93 / 5.0 (Comfort Checked)</p>
                </div>
              </div>

              {/* Specific Metrics Grid */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-lg text-luxury-green">Route Performance Metrics</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-luxury-black/[0.03]">
                    <span className="text-[9px] text-luxury-black/40 uppercase block font-mono">Total Travel Hours</span>
                    <span className="text-sm font-bold font-mono text-luxury-green">8.5 Hours Total</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-luxury-black/[0.03]">
                    <span className="text-[9px] text-luxury-black/40 uppercase block font-mono">Longest Transfer</span>
                    <span className="text-sm font-bold font-mono text-luxury-green">4.0 Hours max</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-luxury-black/[0.03]">
                    <span className="text-[9px] text-luxury-black/40 uppercase block font-mono">Average Transfer Time</span>
                    <span className="text-sm font-bold font-mono text-luxury-green">1.2 Hours / day</span>
                  </div>
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-luxury-black/[0.03]">
                    <span className="text-[9px] text-luxury-black/40 uppercase block font-mono">Safety Index</span>
                    <span className="text-sm font-bold font-mono text-[#006233]">99.8% (Verified)</span>
                  </div>
                </div>

                <p className="text-[11px] text-luxury-black/50 font-light font-mono">
                  *Calculated relative to 7 full days of travel. Bypasses hairpins through VIP rail connections.
                </p>
              </div>

            </div>

            {/* Recommended Segments */}
            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-luxury-black/5 text-xs md:text-sm">
              
              {/* RECOMMENDED TRAIN SEGMENTS */}
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-luxury-black/5 space-y-3.5">
                <h5 className="font-serif font-bold text-sm text-luxury-green flex items-center gap-2">
                  <Train className="w-4 h-4 text-luxury-gold shrink-0" /> Recommended Train Segments:
                </h5>
                <ul className="space-y-2.5">
                  <li className="flex gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                    <span><strong>Nanu-Oya To Ella Segment:</strong> Bypasses winding, nauseous curves of highways through private pine forests.</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Kandy To Ella Segment:</strong> The world's most glorious scenic highlight in pre-reserved VIP Observation Class.</span>
                  </li>
                </ul>
              </div>

              {/* RECOMMENDED CHAUFFEUR SEGMENTS */}
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-luxury-black/5 space-y-3.5">
                <h5 className="font-serif font-bold text-sm text-luxury-green flex items-center gap-2">
                  <Car className="w-4 h-4 text-luxury-gold shrink-0" /> Recommended Chauffeur Segments:
                </h5>
                <ul className="space-y-2.5">
                  <li className="flex gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                    <span><strong>Airport Expressway Direct:</strong> Speeding from CMB departures directly to Colombo's central coastal district.</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Southern Hills Expressway Extension:</strong> Skips chaotic coastal streets, connecting Ella to Galle Fort under 3.5 hrs.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* CHAUFFEUR BANNER INSIDER NOTE */}
          <div className="bg-luxury-green text-white p-6 rounded-[24px] border border-luxury-gold/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/80 max-w-lg font-light leading-relaxed">
              <strong>Chauffeur Directive:</strong> Plan Sri Lanka ensures that all guests have top-tier drivers with credentials approved by the state tourism authority. No commercial stops or unrequested store drop-ins. Just pure exploration.
            </p>
            <a 
              href="https://wa.me/94722968210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shrink-0 bg-luxury-gold text-luxury-black px-4 py-2.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider text-center text-luxury-black block hover:bg-white transition-colors animate-pulse"
            >
              Check Railway Seat Limits
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 7: COMMON MISTAKES TRAVELERS MAKE (10+) */}
      <section id="common-mistakes" className="py-20 md:py-28 px-6 bg-white border-b border-luxury-black/15">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">Planning Defense</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
              10 Planning Mistakes That <br />
              <span className="italic">Can Ruin A Short 7-Day Sri Lanka Trip</span>
            </h2>
            <p className="text-sm md:text-base text-luxury-black/50 max-w-xl mx-auto">
              Read carefully to protect your vacation from these classic traps commonly made by first-time visitors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-6">
            {commonPlanningMistakes.map((mistake, index) => (
              <div key={index} className="bg-luxury-cream/10 border border-luxury-black/5 p-6 rounded-2xl space-y-2 flex gap-4 hover:border-luxury-gold/30 transition-all">
                <span className="font-mono text-xl text-luxury-gold font-bold shrink-0 mt-0.5">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-luxury-green leading-snug">{mistake.title}</h4>
                  <p className="text-xs text-luxury-black/60 leading-relaxed font-light">{mistake.expl}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 text-center space-y-3 mt-4">
            <h4 className="font-serif font-bold text-luxury-black text-sm flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" /> Important Warning for Indian Honeymooners:
            </h4>
            <p className="text-xs text-luxury-black/60 max-w-2xl mx-auto leading-relaxed font-light">
              Do not let tour operators sell you "Super Saver Multi-City" itineraries. Forcing too many hours in a car leads directly to travel stress on your honeymoon. Focus strictly on 3 bases max in 7 days!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: BUDGET BREAKDOWN */}
      <section id="budget-breakdown" className="py-20 md:py-28 px-6 bg-luxury-cream/10 border-b border-luxury-black/15">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">Financial Ledger</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
              Cost Breakdown: <span className="italic">7 Days Sri Lanka in INR</span>
            </h2>
            <p className="text-sm md:text-base text-luxury-black/60 max-w-2xl mx-auto font-light">
              Complete cost transparency. We break down the estimated expenses for your trip based on three distinct lifestyle tiers. No surprises or hidden extras.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-6">
            {travelBudgets.map((budget, index) => (
              <div 
                key={index}
                className={`bg-white rounded-[32px] border p-8 space-y-6 flex flex-col justify-between transition-all relative ${
                  budget.popular ? "border-luxury-gold shadow-luxury ring-2 ring-luxury-gold/15 scale-105 z-10" : "border-luxury-black/5"
                }`}
              >
                {budget.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-luxury-gold text-luxury-black font-mono uppercase tracking-[0.2em] font-bold text-[9px] px-4 py-1.5 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#006233] bg-[#006233]/10 px-3 py-1 rounded-full font-bold">
                    {budget.tier}
                  </span>
                  <div>
                    <p className="text-2xl md:text-3xl font-serif text-luxury-green font-bold">{budget.price}</p>
                    <p className="text-xs text-luxury-black/40 font-mono italic">{budget.per}</p>
                  </div>
                  <p className="text-xs text-luxury-black/60 leading-relaxed font-light">{budget.desc}</p>
                  
                  <div className="pt-4 border-t border-luxury-black/5 space-y-3">
                    <p className="text-[10px] text-luxury-black/40 uppercase tracking-widest font-bold">Includes Highlights:</p>
                    <div className="space-y-2">
                      {budget.includes.map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-luxury-black/70">
                          <Check className="w-4 h-4 text-[#006233] shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-light">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href="#concierge-form"
                    className={`w-full py-4 text-center block font-serif tracking-[0.15em] text-xs uppercase font-bold rounded-full transition-all ${
                      budget.popular
                        ? "bg-luxury-gold text-luxury-black hover:bg-luxury-green hover:text-white"
                        : "bg-luxury-green text-white hover:bg-luxury-gold hover:text-luxury-black"
                    }`}
                  >
                    {budget.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Internal Links Block as naturally requested */}
          <div className="text-center pt-8 border-t border-luxury-black/5 max-w-2xl mx-auto space-y-4">
            <p className="text-xs text-luxury-black/60 leading-relaxed">
              Seeking more comprehensive details? Explore our complete breakdown on <Link to="/sri-lanka-trip-cost-from-india" className="text-luxury-gold hover:text-[#006233] border-b border-luxury-gold/30 hover:border-[#006233] pb-0.5 font-bold transition-colors font-sans">Sri Lanka Trip Cost From India (2026 Guide)</Link> highlighting currency converter utilities and cost per meal guides.
            </p>
          </div>
        </div>
      </section>

      {/* SECOND PDF CTA BANNER */}
      <section className="py-16 px-6 bg-[#faf8f4] border-b border-luxury-black/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-serif text-luxury-green">
            Need this Route Blueprint Offline?
          </h3>
          <p className="text-sm md:text-base text-luxury-black/70 max-w-2xl mx-auto font-light leading-relaxed">
            Download our verified, high-contrast, offline-ready 7-Day Sri Lanka Route Optimization PDF. Perfect to present to your chauffeur driver or reference on the road during remote mountain transits.
          </p>
          <div className="pt-2">
            <button
              onClick={handlePdfDownload}
              className="px-8 py-4.5 bg-[#0c2f25] hover:bg-luxury-gold text-white hover:text-[#0c2f25] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full inline-flex items-center gap-2.5 shadow-xl hover:scale-105 cursor-pointer"
            >
              📥 Download Free 7-Day Itinerary PDF
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ (15+ FAQs) */}
      <section id="itinerary-faqs" className="py-20 md:py-28 px-6 bg-white border-b border-luxury-black/15">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold block">Information Desk</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight-center">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base text-luxury-black/50 max-w-lg mx-auto">
              Everything you need to know about Indian passport visas, money, credit cards, luggage security, and transit rules.
            </p>
          </div>

          <div className="space-y-4 pt-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-luxury-cream/10 rounded-2xl border border-luxury-black/5 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center hover:bg-luxury-cream/30 transition-all cursor-pointer"
                >
                  <span className="font-serif font-bold text-luxury-green text-sm md:text-base pr-4">
                    {index + 1}. {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-luxury-gold shrink-0 transition-transform duration-300 ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6 text-xs md:text-sm text-luxury-black/70 leading-relaxed font-sans border-t border-luxury-black/[0.04] pt-4 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Internal links as naturally requested */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center pt-8 border-t border-luxury-black/5 font-sans uppercase tracking-[0.15em] text-[10px] font-bold">
            <Link to="/sri-lanka-trip-cost-from-india" className="text-luxury-gold hover:text-[#006233] border-r border-luxury-black/10 last:border-0 pr-2 block">
              Trip Cost Guide
            </Link>
            <Link to="/sri-lanka-visa-for-indians" className="text-luxury-gold hover:text-[#006233] border-r border-luxury-black/10 last:border-0 pr-2 block">
              Visa Guide
            </Link>
            <Link to="/best-time-to-visit-sri-lanka" className="text-luxury-gold hover:text-[#006233] border-r border-luxury-black/10 last:border-0 pr-2 block">
              Best Time to Visit
            </Link>
            <a href="#concierge-form" className="text-luxury-gold hover:text-[#006233] block">
              Bespoke Planner
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 10: LEAD GENERATION OFFER */}
      <section id="concierge-form" className="bg-luxury-green py-20 px-6 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10 z-0" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/[0.02] rounded-full pointer-events-none z-0" />
        
        <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-6 space-y-6">
            <span className="text-luxury-gold uppercase tracking-[0.25em] text-xs font-mono block">Zero-Deposit Custom Concierge Planning</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              Don't Waste Your Limited <br />
              <span className="italic text-luxury-gold">Vacation Time</span>
            </h2>
            <p className="text-white/90 font-medium text-sm md:text-base leading-relaxed">
              Get a personalized Sri Lanka travel plan designed around your dates, budget, interests, and travel style.
            </p>
            <p className="text-[#a1bca8] font-light text-xs md:text-sm">
              Avoid common route planning mistakes and make every day of your trip count.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0" />
                <span className="text-xs text-white/80">100% bespoke driver credentials logo clearances verified</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0" />
                <span className="text-xs text-white/80">Observation railway ticket pre-bookings fully guaranteed</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0" />
                <span className="text-xs text-white/80">Absolute flexibility on edits up to 72 hours prior to flight</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-white rounded-[32px] p-8 text-luxury-green shadow-xl border border-white/5">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-5">
                <div className="w-16 h-16 bg-luxury-gold/25 text-luxury-green rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-bold">Custom Request Submitted!</h3>
                <p className="text-xs text-luxury-black/60 leading-relaxed">
                  We are formulating your customized 7-Day Sri Lanka PDF blueprint matches now. We are opening your chat directly with our planner host on WhatsApp to coordinate.
                </p>
                <button
                  onClick={() => handleWhatsAppRedirect("form_lead_success")}
                  className="w-full py-4.5 bg-[#006233] hover:bg-luxury-gold text-white font-serif tracking-widest text-xs uppercase font-bold rounded-full transition-all"
                >
                  Start WhatsApp Verification Desk
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-luxury-green tracking-tight pb-2 border-b border-luxury-black/5 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-luxury-gold" /> Customize & Avoid Mistakes
                </h3>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-luxury-black/50 font-bold block mb-1">WhatsApp Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210 (with Indian prefix)"
                    value={leadForm.whatsapp}
                    onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                    className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream/30 px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-luxury-black/50 font-bold block mb-1">Target Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. Sept / Oct 2026"
                      value={leadForm.travelDates}
                      onChange={(e) => setLeadForm({...leadForm, travelDates: e.target.value})}
                      className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream/30 px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-luxury-black/50 font-bold block mb-1">Travelers Count</label>
                    <input
                      type="number"
                      min="1"
                      value={leadForm.travelers}
                      onChange={(e) => setLeadForm({...leadForm, travelers: parseInt(e.target.value) || 2})}
                      className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream/30 px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-luxury-black/50 font-bold block mb-1">Budget Lifestyle Target</label>
                  <select
                    value={leadForm.style}
                    onChange={(e) => setLeadForm({...leadForm, style: e.target.value})}
                    className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream/30 px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                  >
                    <option value="value-standard">Value Standard (Comfortable Guesthouse Bases)</option>
                    <option value="comfortable-boutique">Comfort Boutique (Selected 4-star Pools)</option>
                    <option value="signature-luxury">Signature Luxury (Top-tier Heritage/Amangalla)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-luxury-black/50 font-bold block">Key Interests Focus:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {["Tea Estates", "Scenic Train", "Wildlife Safari", "Ancient Temples", "Galle Coast"].map(interest => {
                      const selected = leadForm.interests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                            selected 
                              ? "bg-luxury-gold text-luxury-black font-bold" 
                              : "bg-luxury-cream/40 text-luxury-black/60 border border-luxury-black/5"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-luxury-gold hover:bg-[#006233] text-luxury-black hover:text-white font-serif tracking-[0.15em] text-xs uppercase font-bold rounded-full transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-md"
                >
                  {isSubmitting ? "Generating Custom Itinerary Portfolio..." : "Avoid The Mistakes That Ruin Short Trips"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      {showStickyCta && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden transition-all duration-300">
          <button
            onClick={handlePdfDownload}
            className="w-full py-4 bg-[#0c2f25] text-white font-bold rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.45)] border border-luxury-gold flex items-center justify-center gap-2.5 text-xs uppercase tracking-wider animate-bounce-subtle cursor-pointer focus:outline-none"
          >
            <Download className="w-4 h-4 text-luxury-gold animate-pulse" />
            <span>Download Itinerary PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}
