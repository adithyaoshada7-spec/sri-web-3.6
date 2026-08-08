import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, MapPin, Compass, Clock, Car, Utensils, Sparkles, Calendar, Info, 
  CheckCircle, HelpCircle, ChevronDown, AlertTriangle, Heart, Users, Backpack, 
  Palmtree, Train, Check, AlertCircle, Printer, Download, Map, CloudRain, 
  TrendingDown, Search, ShieldAlert, BookOpen, ExternalLink, Sparkles as SparklesIcon, 
  FileText, Shield, DollarSign, Camera, Compass as CompassIcon, Sun, Luggage, Navigation
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
  mainActivities: {
    time: string;
    activity: string;
    desc: string;
  }[];
  alternativeOptions: {
    title: string;
    desc: string;
    type: "adventure" | "relaxation" | "cultural";
  }[];
  accommodationArea: string;
  recommendedHotels: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  budgetBreakdown: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  practicalTips: {
    bestTime: string;
    whatToPack: string[];
    advanceBookings: string[];
  };
  proConsultantTip: string;
}

export const tenDayItineraryData: DayPlan[] = [
  {
    day: 1,
    title: "Colombo to Sigiriya (Cultural Triangle Entry)",
    from: "Colombo / Airport (CMB)",
    to: "Sigiriya / Habarana",
    distanceKm: 165,
    drivingTime: "3.5 - 4.0 hours",
    routeHighlights: "Katunayake Expressway → Kurunegala → Dambulla → Sigiriya",
    mainActivities: [
      {
        time: "10:00 AM",
        activity: "Airport Arrival & Private Driver Meet & Greet",
        desc: "Meet your private English-speaking chauffeur-guide at CMB arrivals. Board your air-conditioned vehicle and stop for fresh king coconut water along the highway."
      },
      {
        time: "01:30 PM",
        activity: "Arrive in Sigiriya & Jungle Resort Check-in",
        desc: "Arrive in the lush eco-zone of Sigiriya/Habarana. Enjoy a traditional Sri Lankan rice & curry lunch overlooking paddy fields."
      },
      {
        time: "04:30 PM",
        activity: "Golden Hour Climb of Pidurangala Rock",
        desc: "Ascend Pidurangala Rock for a 360-degree panoramic sunset view of the iconic Sigiriya Lion Rock rising above the jungle canopy."
      },
      {
        time: "07:30 PM",
        activity: "Welcome Dinner & Stargazing",
        desc: "Relax at your resort with traditional hopper stations and spiced tea."
      }
    ],
    alternativeOptions: [
      {
        title: "Dambulla Cave Temple Express Tour",
        desc: "If landing early, visit the 2,000-year-old Dambulla UNESCO caves en route to Sigiriya.",
        type: "cultural"
      },
      {
        title: "Herbal Ayurveda Welcome Massage",
        desc: "Skip the evening hike and indulge in an authentic 90-minute Ayurvedic oil massage in Habarana.",
        type: "relaxation"
      }
    ],
    accommodationArea: "Sigiriya / Habarana Jungle Corridor",
    recommendedHotels: {
      budget: "Sigiriya Village / Rock Cascade Eco Lodge ($35 - $60)",
      midRange: "Aliya Resort & Spa / Cinnamon Lodge Habarana ($120 - $190)",
      luxury: "Water Garden Sigiriya / Heritance Kandalama ($350 - $650)"
    },
    budgetBreakdown: {
      budget: "$45 - $65",
      midRange: "$140 - $220",
      luxury: "$380 - $750"
    },
    practicalTips: {
      bestTime: "Climb Pidurangala strictly between 4:30 PM and 5:30 PM to catch golden light without intense midday humidity.",
      whatToPack: ["Light breathable linen shirt", "Sturdy grip sneakers or trail shoes", "Headlamp / flashlight for descending Pidurangala after dark", "Insect repellent"],
      advanceBookings: ["Private AC sedan/van with chauffeur-guide", "Sigiriya/Habarana hotel pre-booking"]
    },
    proConsultantTip: "Never rush directly up Sigiriya Lion Rock on Day 1 afternoon if you've had a long international flight. Pidurangala offers a gentler climb with superior views of Lion Rock itself, saving your energy for Sigiriya early on Day 2!"
  },
  {
    day: 2,
    title: "Sigiriya Rock Citadel to Kandy (Royal Capital)",
    from: "Sigiriya",
    to: "Kandy",
    distanceKm: 90,
    drivingTime: "2.5 - 3.0 hours",
    routeHighlights: "Sigiriya Fortress → Dambulla Caves → Matale Spice Belt → Kandy Lake",
    mainActivities: [
      {
        time: "06:30 AM",
        activity: "Early Morning Ascend of Sigiriya Lion Rock (UNESCO)",
        desc: "Beat the heat and crowds by climbing King Kassapa's 5th-century sky palace, admiring the ancient frescoes, Mirror Wall, and summit ruins."
      },
      {
        time: "10:30 AM",
        activity: "Dambulla Cave Temple (UNESCO)",
        desc: "Explore five cave shrines carved into a granite cliff, housing over 150 pristine golden Buddha statues and ancient ceiling frescoes."
      },
      {
        time: "01:30 PM",
        activity: "Matale Spice Garden Walk & Scenic Drive",
        desc: "Drive through the Matale hills, stopping at an organic spice garden to learn about Ceylon cinnamon, cardamom, and herbal remedies."
      },
      {
        time: "06:30 PM",
        activity: "Evening Sacred Pujah at Temple of the Tooth Relic",
        desc: "Arrive in hill capital Kandy. Join local devotees dressed in white at Sri Dalada Maligawa during the evening drum ceremony."
      }
    ],
    alternativeOptions: [
      {
        title: "Hiriwadunna Village Eco-Trek",
        desc: "Catamaran boat ride across a lily-covered lake followed by an authentic village mud-kitchen cooking class.",
        type: "cultural"
      },
      {
        title: "Minneriya / Kaudulla Elephant Gathering Safari",
        desc: "Swap Kandy afternoon arrival for a 3:00 PM safari to witness hundreds of wild elephants grazing around ancient reservoirs.",
        type: "adventure"
      }
    ],
    accommodationArea: "Kandy Lake Upper Elevation / Hanthana Ridge",
    recommendedHotels: {
      budget: "Kandy City Stay / Oak Ray Regency ($30 - $55)",
      midRange: "Elephant Stables / Amaya Hills Kandy ($110 - $180)",
      luxury: "The Kandy House / W15 Hanthana Estate ($380 - $700)"
    },
    budgetBreakdown: {
      budget: "$50 - $70",
      midRange: "$150 - $240",
      luxury: "$400 - $850"
    },
    practicalTips: {
      bestTime: "Sigiriya gate opens at 6:30 AM — entering by 6:45 AM avoids 2-hour stair bottlenecks. Tooth Temple Puja runs 6:30 PM - 7:30 PM.",
      whatToPack: ["Modest white or light clothing covering shoulders & knees for Tooth Temple", "Slip-on shoes (shoes must be removed at temples)", "Socks (courtyard granite gets hot)"],
      advanceBookings: ["Sigiriya Lion Rock entrance ticket ($36 USD)", "Temple of the Tooth Relic ticket ($7 USD)"]
    },
    proConsultantTip: "Kandy traffic bottlenecks between 4:00 PM and 6:00 PM around the lake. Have your driver drop you near the Temple of the Tooth around 5:45 PM so you can stroll along the lake promenade."
  },
  {
    day: 3,
    title: "Kandy to Nuwara Eliya (Little England Highlands)",
    from: "Kandy",
    to: "Nuwara Eliya",
    distanceKm: 75,
    drivingTime: "2.5 - 3.0 hours",
    routeHighlights: "Peradeniya Gardens → Ramboda Pass → Damro Tea Plantation → Gregory Lake",
    mainActivities: [
      {
        time: "08:30 AM",
        activity: "Royal Botanical Gardens Peradeniya Walk",
        desc: "Stroll beneath giant Javan fig trees, towering palm avenues, and the world-renowned orchid house once enjoyed by Kandyan royalty."
      },
      {
        time: "11:00 AM",
        activity: "Ramboda Falls Viewpoint & Mountain Drive",
        desc: "Ascend into the misty central highlands, stopping at Ramboda Falls (329 ft) for waterfall photography and fresh mountain air."
      },
      {
        time: "01:00 PM",
        activity: "Ceylon Tea Estate & Factory Plucking Experience",
        desc: "Visit Damro or Pedro Tea Estate. Learn orthodox tea processing from leaf picking to grading, concluding with a fresh Ceylon tea tasting."
      },
      {
        time: "04:30 PM",
        activity: "Colonial Nuwara Eliya Stroll & High Tea",
        desc: "Arrive in Nuwara Eliya (1,868m elevation). Walk through Victoria Park, Lake Gregory, and savor high tea at the Tudor-style Grand Hotel."
      }
    ],
    alternativeOptions: [
      {
        title: "Kandy to Nanu Oya Morning Scenic Train",
        desc: "Take the 08:45 AM train from Kandy to Nanu Oya station through misty pine forests while your driver transfers luggage by car.",
        type: "cultural"
      },
      {
        title: "Moon Plains 4x4 Highland Viewpoint Safari",
        desc: "Jeep ride to Moon Plains for 360-degree views of Sri Lanka's highest peaks, including Pidurutalagala.",
        type: "adventure"
      }
    ],
    accommodationArea: "Nuwara Eliya Town / Lake Gregory Shore",
    recommendedHotels: {
      budget: "Sultan Palace / The Glendower ($35 - $60)",
      midRange: "Jetwing St. Andrew's / The Secret Ythan ($110 - $180)",
      luxury: "Grand Hotel Nuwara Eliya / Heritance Tea Factory ($280 - $550)"
    },
    budgetBreakdown: {
      budget: "$40 - $65",
      midRange: "$130 - $210",
      luxury: "$350 - $700"
    },
    practicalTips: {
      bestTime: "Visit Peradeniya early at 8:30 AM before heat builds. High Tea at Grand Hotel runs 3:30 PM - 6:00 PM.",
      whatToPack: ["Warm fleece jacket / sweater (temperatures drop to 10°C - 14°C at night)", "Rain jacket or compact umbrella", "Comfortable walking shoes"],
      advanceBookings: ["Grand Hotel High Tea reservation", "Peradeniya Botanical Garden ticket"]
    },
    proConsultantTip: "Nuwara Eliya is significantly colder than the coast! Pack a warm fleece or light down jacket. The temperature shift from 30°C in Colombo to 12°C in Nuwara Eliya surprises many travelers."
  },
  {
    day: 4,
    title: "Nuwara Eliya to Ella via Iconic Blue Train",
    from: "Nuwara Eliya (Nanu Oya)",
    to: "Ella",
    distanceKm: 55,
    drivingTime: "2.0 hours car OR 2.5 hours Train",
    routeHighlights: "Nanu Oya Station → Pattipola Tunnel → Demodara Loop → Nine Arch Bridge",
    mainActivities: [
      {
        time: "09:00 AM",
        activity: "Nanu Oya Railway Station Departure",
        desc: "Board the world-famous blue train at Nanu Oya. Grab an open-window seat to soak in emerald tea valleys, eucalyptus forests, and dramatic drop-offs."
      },
      {
        time: "12:15 PM",
        activity: "Arrive in Ella Station & Café Chill Lunch",
        desc: "Step into relaxed, hippie-chic Ella town. Enjoy gourmet wood-fired pizza or fresh avocado toast at Café Chill."
      },
      {
        time: "03:30 PM",
        activity: "Nine Arch Bridge Walk & Train Watching",
        desc: "Walk through pine groves down to the majestic 1921 British colonial stone viaduct. Watch the blue train cross over 100-foot arches."
      },
      {
        time: "06:30 PM",
        activity: "Ella Town Nightlife & Sunset Cocktails",
        desc: "Sip passionfruit cocktails at a cliffside bar overlooking Ella Gap as dusk falls over the mountains."
      }
    ],
    alternativeOptions: [
      {
        title: "Early Morning Horton Plains & World's End Trek",
        desc: "Start at 5:30 AM from Nuwara Eliya to hike 9 km across Horton Plains to the 880-meter vertical drop at World's End before train to Ella.",
        type: "adventure"
      },
      {
        title: "Flying Ravana Mega Zipline",
        desc: "Fly 500 meters over tea estates at speeds up to 80 km/h at Flying Ravana adventure park.",
        type: "adventure"
      }
    ],
    accommodationArea: "Ella Gap Ridge / Pass View Point",
    recommendedHotels: {
      budget: "Ella Mount Heaven / Downtown Hostel Ella ($25 - $45)",
      midRange: "Hide Ella Hotel & Resort / Ekho Ella ($90 - $160)",
      luxury: "98 Acres Resort & Spa / Ceylon Tea Trails ($350 - $900)"
    },
    budgetBreakdown: {
      budget: "$45 - $70",
      midRange: "$140 - $230",
      luxury: "$380 - $800"
    },
    practicalTips: {
      bestTime: "Nine Arch Bridge train passes around 3:30 PM and 5:30 PM — arrive 30 minutes early for prime photo spots.",
      whatToPack: ["Sturdy trail sneakers", "Camera / phone with ample storage", "Sunscreen and sunglasses"],
      advanceBookings: ["CRITICAL: Train tickets (1st class observation car or 2nd class reserved seats) MUST be booked 30 days in advance via Sri Lanka Railways online system!"]
    },
    proConsultantTip: "If 1st class train tickets are sold out, don't worry! 2nd class reserved seats actually have windows that open fully, making them far better for landscape photography than sealed 1st class AC cars!"
  },
  {
    day: 5,
    title: "Ella Ridge & Waterfalls Exploration (Full Day)",
    from: "Ella",
    to: "Ella",
    distanceKm: 0,
    drivingTime: "0 hours (Local short rides)",
    routeHighlights: "Little Adam's Peak → Ravana Falls → Diyaluma Waterfall → Ella Gap",
    mainActivities: [
      {
        time: "06:00 AM",
        activity: "Sunrise Hike up Little Adam's Peak",
        desc: "Easy 45-minute trail winding through tea bushes to the summit peak. Marvel at sunrise rays illuminating Ella Rock and the Southern Plains."
      },
      {
        time: "09:30 AM",
        activity: "Relaxing Breakfast & Organic Ceylon Coffee",
        desc: "Savor local egg hoppers, fresh papaya juice, and specialty Ceylon espresso at an eco-café overlooking the ridge."
      },
      {
        time: "11:30 AM",
        activity: "Ravana Falls & Natural Pool Dip",
        desc: "Visit the roaring 25-meter Ravana Waterfall steeped in Ramayana mythology, stopping for fresh king coconut."
      },
      {
        time: "03:00 PM",
        activity: "Ravana Pool Club Beach Club Vibe in the Clouds",
        desc: "Unwind at Sri Lanka's premiere mountain pool club with infinity pools, daybeds, DJ beats, and gourmet tapas."
      }
    ],
    alternativeOptions: [
      {
        title: "Challenging Ella Rock Summit Trek",
        desc: "A rigorous 4-hour round-trip hike along train tracks and eucalyptus forests to Ella Rock summit.",
        type: "adventure"
      },
      {
        title: "Diyaluma Waterfall Upper Infinity Pools Excursion",
        desc: "Drive 1 hour south to Sri Lanka's 2nd highest waterfall and swim in natural rock pools perched on the cliff edge.",
        type: "adventure"
      }
    ],
    accommodationArea: "Ella Ridge / Town Rim",
    recommendedHotels: {
      budget: "Country Homes Ella / Countryside Ella ($30 - $50)",
      midRange: "Chill Ville Ella / Zion View Ella Green Retreat ($100 - $170)",
      luxury: "98 Acres Resort & Spa / Planters Bungalow ($350 - $750)"
    },
    budgetBreakdown: {
      budget: "$35 - $55",
      midRange: "$110 - $180",
      luxury: "$320 - $650"
    },
    practicalTips: {
      bestTime: "Little Adam's Peak is best at 6:00 AM for sunrise or 5:00 PM for sunset.",
      whatToPack: ["Light hiking gear", "Swimwear & microfiber towel for Ravana Pool Club or Diyaluma pools", "Reef-safe sunscreen"],
      advanceBookings: ["Ravana Pool Club daybed reservation (especially on weekends)"]
    },
    proConsultantTip: "Day 5 provides a vital rest-and-active balance in the middle of your 10-day tour! Little Adam's Peak is a very easy gradient suitable for all fitness levels compared to the intense Ella Rock."
  },
  {
    day: 6,
    title: "Ella to Yala National Park (Big Game Safari)",
    from: "Ella",
    to: "Yala / Tissamaharama",
    distanceKm: 95,
    drivingTime: "2.5 hours",
    routeHighlights: "Ella Gap Descent → Wellawaya → Rawana Falls → Tissamaharama Lake → Yala",
    mainActivities: [
      {
        time: "08:30 AM",
        activity: "Scenic Highland Descent to Southern Dry Zone",
        desc: "Drive down the dramatic Ella Gap highway. Watch the terrain transition from lush cloud forest to arid acacia scrubland."
      },
      {
        time: "11:30 AM",
        activity: "Arrive in Yala & Jungle Glamping Lodge Check-in",
        desc: "Check into your eco-safari lodge or glamping tent near the park boundary. Enjoy an authentic wild lunch."
      },
      {
        time: "02:30 PM",
        activity: "Private 4x4 Jeep Safari in Yala National Park",
        desc: "Enter Yala Block 1 or Block 5 with an expert ranger. Track the highest density of leopards on earth, sloth bears, wild elephants, crocodiles, and peacocks."
      },
      {
        time: "06:30 PM",
        activity: "Bush Camp Dinner Under the Stars",
        desc: "Return to camp for a traditional jungle barbecue dinner around a roaring campfire."
      }
    ],
    alternativeOptions: [
      {
        title: "Udawalawe Elephant Transit Home & Safari",
        desc: "Detour to Udawalawe to watch orphaned baby elephants being milk-fed before an elephant-dense park safari.",
        type: "adventure"
      },
      {
        title: "Buduruwagala Ancient Rock Sculptures Stop",
        desc: "Visit 9th-century giant rock carvings of Mahayana Buddhas set hidden inside a serene forest wetland.",
        type: "cultural"
      }
    ],
    accommodationArea: "Yala National Park Buffer Zone / Kirinda",
    recommendedHotels: {
      budget: "Tissa Inn / Elephant Camp Yala ($30 - $55)",
      midRange: "Cinnamon Wild Yala / Jetwing Yala ($140 - $240)",
      luxury: "Wild Coast Tented Lodge / Chena Huts by Uga ($700 - $1,400)"
    },
    budgetBreakdown: {
      budget: "$60 - $90",
      midRange: "$180 - $320",
      luxury: "$450 - $1,200"
    },
    practicalTips: {
      bestTime: "Afternoon safari gates open at 2:30 PM. Leopards emerge onto granite boulders between 4:30 PM and 6:00 PM.",
      whatToPack: ["Earth-toned / khaki cotton clothing (avoid bright neon colors)", "Dust bandana or face mask", "Telephoto camera lens or 10x binoculars", "High SPF sunscreen"],
      advanceBookings: ["Private 4x4 Jeep Safari with tracker", "Yala National Park entrance permits"]
    },
    proConsultantTip: "Yala Block 1 is the most famous for leopards but can get busy with jeeps. Ask your chauffeur-guide or lodge tracker about Yala Block 5 or Katagamuwa gate for a quieter, pristine safari experience!"
  },
  {
    day: 7,
    title: "Yala to Mirissa (Southern Gold Coast)",
    from: "Yala",
    to: "Mirissa / Weligama",
    distanceKm: 120,
    drivingTime: "2.0 - 2.5 hours",
    routeHighlights: "Hambantota Highway → Tangalle → Hiriketiya Bay → Mirissa Coast",
    mainActivities: [
      {
        time: "08:30 AM",
        activity: "Southern Highway Coastal Drive to Mirissa",
        desc: "Drive west along the turquoise Indian Ocean coastline, passing tranquil fishing villages and coconut palms."
      },
      {
        time: "10:30 AM",
        activity: "Hiriketiya Horseshoe Bay Surf & Beach Break",
        desc: "Stop at trendy Hiriketiya Bay. Swim in gentle waves, enjoy woodfired pizza under palm trees, and watch surfers."
      },
      {
        time: "02:00 PM",
        activity: "Mirissa Beachfront Hotel Check-in",
        desc: "Check into your oceanfront resort in Mirissa or Weligama Bay. Unwind by the pool with a tropical cocktail."
      },
      {
        time: "05:15 PM",
        activity: "Coconut Tree Hill Sunset Photography",
        desc: "Walk up the famous red-earth hill dotted with towering palms jutting into the ocean for golden hour sunset shots."
      },
      {
        time: "07:30 PM",
        activity: "Candlelit Beachside Seafood Dinner",
        desc: "Pick fresh jumbo prawns, red snapper, or calamari directly from fishermen's ice displays cooked to order on the sand."
      }
    ],
    alternativeOptions: [
      {
        title: "Hummanaya Blowhole & Tangalle Lagoon Stop",
        desc: "See the world's 2nd largest natural blowhole blasting ocean spray up to 30 meters high.",
        type: "adventure"
      },
      {
        title: "Beginner Surf Lesson at Weligama Bay",
        desc: "Take a 1-hour beginner surfing lesson on Weligama's safe, sandy break waves.",
        type: "adventure"
      }
    ],
    accommodationArea: "Mirissa Beach / Weligama Cliff",
    recommendedHotels: {
      budget: "Silly Monkey Hostel / Spice House Mirissa ($25 - $50)",
      midRange: "Mandara Resort / Glamour Hotel Mirissa ($100 - $170)",
      luxury: "Weligama Bay Marriott Resort / Cape Weligama ($320 - $800)"
    },
    budgetBreakdown: {
      budget: "$40 - $65",
      midRange: "$130 - $220",
      luxury: "$360 - $750"
    },
    practicalTips: {
      bestTime: "Reach Coconut Tree Hill by 5:15 PM to claim a good photography vantage point before sunset at 6:00 PM.",
      whatToPack: ["Swimwear", "Flip-flops & beach cover-up", "Polarized sunglasses", "Reef-safe sunscreen"],
      advanceBookings: ["Beachfront table reservation at Mirissa Bay restaurants during high season"]
    },
    proConsultantTip: "Coconut Tree Hill gets crowded right at sunset. If you want pristine photos without people in your frame, visit early at 7:00 AM the next morning when the ocean is glass-calm!"
  },
  {
    day: 8,
    title: "Mirissa Marine Safari & Coastal Relaxation (Full Day)",
    from: "Mirissa",
    to: "Mirissa",
    distanceKm: 0,
    drivingTime: "0 hours (Local tuk-tuk)",
    routeHighlights: "Mirissa Harbor → Deep Ocean Blue Whale Corridor → Secret Beach",
    mainActivities: [
      {
        time: "06:00 AM",
        activity: "Blue Whale & Dolphin Watching Ocean Safari",
        desc: "Board an eco-certified boat into the deep oceanic trench south of Mirissa to spot blue whales (largest animal on earth), sperm whales, and super-pod dolphins."
      },
      {
        time: "11:30 AM",
        activity: "Return to Port & Tropical Brunch",
        desc: "Enjoy fresh tropical smoothie bowls, poached eggs, and coconut coffee at a beach café."
      },
      {
        time: "02:30 PM",
        activity: "Secret Beach Mirissa Hidden Cove Dip",
        desc: "Tuk-tuk to Secret Beach, a secluded tidal lagoon protected by reef rocks, ideal for safe swimming and cold beers."
      },
      {
        time: "06:00 PM",
        activity: "Parrot Rock Sunset Walk & Beach Lounge",
        desc: "Climb Parrot Rock during low tide for views across Mirissa's crescent bay."
      }
    ],
    alternativeOptions: [
      {
        title: "Snorkeling with Wild Sea Turtles at Polhena",
        desc: "Swim alongside gentle green sea turtles in Polhena's shallow coral lagoon.",
        type: "adventure"
      },
      {
        title: "Ayurvedic Spa & Cinnamon Plantation Tour",
        desc: "Guided tour of a colonial cinnamon estate followed by a full-body herbal oil massage.",
        type: "relaxation"
      }
    ],
    accommodationArea: "Mirissa Crescent / Weligama Bay",
    recommendedHotels: {
      budget: "Hangover Hostels Mirissa / Morning Star ($25 - $45)",
      midRange: "Triple O Six / Lantern Boutique Hotel ($110 - $180)",
      luxury: "Sri Sharavi Beach Villas / Eraeliya Villas ($300 - $650)"
    },
    budgetBreakdown: {
      budget: "$45 - $70",
      midRange: "$130 - $220",
      luxury: "$350 - $700"
    },
    practicalTips: {
      bestTime: "Whale watching boats depart strictly between 6:00 AM and 6:30 AM (peak season Nov - Apr).",
      whatToPack: ["Seasickness medication (take 30 mins BEFORE boarding!)", "Waterproof phone pouch", "Beach towel & sun hat"],
      advanceBookings: ["Eco-certified whale watching operator (e.g. Raja & the Whales)"]
    },
    proConsultantTip: "The ocean off Mirissa can have heavy swells even on sunny days. Taking a motion sickness pill 30 minutes before boarding guarantees an enjoyable 3-4 hour marine excursion!"
  },
  {
    day: 9,
    title: "Mirissa to UNESCO Galle Dutch Fort",
    from: "Mirissa",
    to: "Galle Fort",
    distanceKm: 35,
    drivingTime: "45 minutes - 1.0 hour",
    routeHighlights: "Koggala Stilt Fishermen → Ahangama → Unawatuna Bay → Galle Dutch Fort Ramparts",
    mainActivities: [
      {
        time: "09:00 AM",
        activity: "Koggala Stilt Fishermen Photography",
        desc: "Drive along the coast and witness traditional stilt fishermen perched over coral reefs—a iconic Sri Lankan cultural sight."
      },
      {
        time: "11:00 AM",
        activity: "Arrive inside UNESCO Galle Dutch Fort",
        desc: "Check into your boutique heritage hotel inside the 17th-century Dutch rampart walls."
      },
      {
        time: "02:30 PM",
        activity: "Cobblestone Heritage Walk & Boutique Shopping",
        desc: "Explore Pedlar Street and Church Street. Browse designer linen boutiques, artisanal gem shops, antique stores, and gelaterias."
      },
      {
        time: "05:30 PM",
        activity: "Sunset Rampart Walk at Flag Rock Bastion",
        desc: "Join locals and travelers walking along the ancient Dutch fort walls, watching cliff divers and golden sunsets over the Indian Ocean lighthouse."
      },
      {
        time: "07:30 PM",
        activity: "Colonial Fine Dining Experience",
        desc: "Dine at a restored 18th-century Dutch mansion like The Fort Printers, Heritage Cafe, or Amangalla."
      }
    ],
    alternativeOptions: [
      {
        title: "Virgin White Tea Factory Tour (Handunugoda)",
        desc: "Visit the world-famous tea estate where tea leaves are harvested with golden scissors without touching human skin.",
        type: "cultural"
      },
      {
        title: "Unawatuna Jungle Beach & Japanese Peace Pagoda",
        desc: "Hike through Rumassala headland down to pristine Jungle Beach and visit the white stupa overlooking Galle Harbor.",
        type: "adventure"
      }
    ],
    accommodationArea: "Inside Galle Dutch Fort Ramparts",
    recommendedHotels: {
      budget: "Fort Inn Guest House / Pedlar 62 ($35 - $60)",
      midRange: "Fort Bazaar / The Fort Printers ($140 - $240)",
      luxury: "Amangalla / Galle Fort Hotel ($450 - $950)"
    },
    budgetBreakdown: {
      budget: "$45 - $70",
      midRange: "$140 - $240",
      luxury: "$380 - $850"
    },
    practicalTips: {
      bestTime: "Stroll Galle Fort streets in the late afternoon (3:30 PM onwards) when midday heat subsides and shops glow.",
      whatToPack: ["Light elegant linen clothing", "Comfortable walking sandals / boat shoes", "Camera"],
      advanceBookings: ["Galle Fort dinner reservation (e.g. Church Street Social or Fort Printers)"]
    },
    proConsultantTip: "Staying *inside* the fort ramparts overnight is a magical experience! At night, the day-tour buses leave, transforming the cobblestone lanes into a tranquil, romantic European-style village."
  },
  {
    day: 10,
    title: "Galle Fort to Colombo Souvenirs & Airport Departure",
    from: "Galle Fort",
    to: "Colombo / Airport (CMB)",
    distanceKm: 125,
    drivingTime: "2.0 - 2.5 hours via Southern Expressway E01",
    routeHighlights: "Southern Expressway E01 → Colombo Dutch Hospital → Barefoot Souvenirs → Airport",
    mainActivities: [
      {
        time: "09:00 AM",
        activity: "Relaxed Galle Fort Breakfast & Coffee",
        desc: "Enjoy a final Ceylon tea or artisan flat white on Pedlar Street."
      },
      {
        time: "10:30 AM",
        activity: "Southern Expressway Drive to Colombo City",
        desc: "Smooth 1.5-hour highway drive straight into commercial capital Colombo."
      },
      {
        time: "12:30 PM",
        activity: "Gourmet Farewell Seafood Lunch at Ministry of Crab",
        desc: "Dine at Chef Dharshan Munidasa's world-famous restaurant set inside the 400-year-old restored Dutch Hospital precinct."
      },
      {
        time: "02:30 PM",
        activity: "Colombo Souvenir Shopping Extravaganza",
        desc: "Stock up on Ceylon single-origin tea at Dilmah Tea Lounge, handloom textiles at Barefoot, spices at Laksala, and Ceylon sapphires."
      },
      {
        time: "06:00 PM",
        activity: "Private Transfer to CMB Airport for Departure Flight",
        desc: "Direct 35-minute expressway transfer to Bandaranaike International Airport (CMB) for your evening / night outbound flight home."
      }
    ],
    alternativeOptions: [
      {
        title: "Madu River Mangrove Eco Safari & Cinnamon Island",
        desc: "En route to Colombo, take a 1-hour boat safari through mangrove tunnels and visit fish therapy spas in Balapitiya.",
        type: "adventure"
      },
      {
        title: "Kosgoda Sea Turtle Conservation Hatchery",
        desc: "Release newly hatched baby sea turtles into the ocean at a ethical turtle sanctuary.",
        type: "cultural"
      }
    ],
    accommodationArea: "Colombo City / Direct Airport Transit",
    recommendedHotels: {
      budget: "Cinnamon Red Colombo / Radisson Hotel ($50 - $80)",
      midRange: "Cinnamon Grand / Marino Beach Hotel ($110 - $180)",
      luxury: "Galle Face Hotel / Shangri-La Colombo ($250 - $550)"
    },
    budgetBreakdown: {
      budget: "$35 - $50",
      midRange: "$100 - $180",
      luxury: "$300 - $650"
    },
    practicalTips: {
      bestTime: "Allow 3 hours prior to international departure flights at CMB Airport.",
      whatToPack: ["Pack souvenirs carefully with bubble wrap", "Keep passport & ETA printout accessible"],
      advanceBookings: ["Ministry of Crab lunch table reservation", "Expressway airport transfer"]
    },
    proConsultantTip: "Ministry of Crab requires table bookings 2-3 weeks in advance! If full, the nearby Monsoon restaurant or Old Dutch Hospital pubs offer fantastic international dining."
  }
];

export default function SrilankaTenDayItineraryPage() {
  usePageMetadata({
    title: "Sri Lanka 10-Day Itinerary: Route & Budget (2026)",
    description: "An expert 10-day Sri Lanka itinerary covering Sigiriya, Kandy, Ella, Yala safari, Mirissa & Galle with realistic drive times, budgets, and tips.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-10-day-itinerary",
    ogUrl: "https://plan-srilanka.com/sri-lanka-10-day-itinerary"
  });

  const [activeDay, setActiveDay] = useState<number>(1);
  const [budgetTier, setBudgetTier] = useState<"budget" | "midRange" | "luxury">("midRange");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [numTravelers, setNumTravelers] = useState<number>(2);
  const [travelSeason, setTravelSeason] = useState<"peak" | "shoulder" | "offPeak">("peak");

  // Print Mode Handler
  const handlePrint = () => {
    trackEvent('print_click', 'engagement', '10_day_itinerary_print');
    window.print();
  };

  // WhatsApp Concierge Consultation Trigger
  const handleWhatsAppConsult = (msgText?: string) => {
    trackEvent('whatsapp_click', 'conversion', '10_day_consultation');
    const msg = msgText || `Hi Plan Sri Lanka! I am reviewing your 10-day itinerary (Colombo-Sigiriya-Kandy-Nuwara Eliya-Ella-Yala-Mirissa-Galle). Can you help me customize this for ${numTravelers} travelers in ${travelSeason} season? Thank you!`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  // Calculate Total Estimated Trip Cost for 10 Days
  const getEstimatedCost = () => {
    let perPersonPerDay = 175; // midRange default
    if (budgetTier === "budget") perPersonPerDay = 55;
    if (budgetTier === "luxury") perPersonPerDay = 520;

    let multiplier = 1.0;
    if (travelSeason === "shoulder") multiplier = 0.85;
    if (travelSeason === "offPeak") multiplier = 0.70;

    const totalPerPerson = Math.round(perPersonPerDay * 10 * multiplier);
    const totalGroup = totalPerPerson * numTravelers;

    return { totalPerPerson, totalGroup };
  };

  const { totalPerPerson, totalGroup } = getEstimatedCost();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0F1412] font-sans leading-relaxed selection:bg-[#C5A059]/20 pt-24 md:pt-32">
      
      {/* STRUCTURED JSON-LD SCHEMAS FOR GOOGLE & AI SEARCH OVERVIEWS */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          "name": "Refined 10-Day Sri Lanka Ultimate Master Itinerary",
          "description": "Expert 10-day Sri Lanka travel route covering Cultural Triangle, Tea Highlands, Scenic Blue Train, Yala Wildlife Safari, Mirissa Blue Whales & Galle Fort.",
          "touristType": ["International Travelers", "Couples", "Families", "Culture & Wildlife Enthusiasts"],
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "550",
            "highPrice": "5200"
          },
          "itinerary": tenDayItineraryData.map(day => ({
            "@type": "TouristAttraction",
            "name": `Day ${day.day}: ${day.title}`,
            "description": `${day.from} to ${day.to} (${day.distanceKm} km, ${day.drivingTime}). Main: ${day.mainActivities.map(a => a.activity).join(", ")}.`
          }))
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is 10 days enough for a comprehensive Sri Lanka trip?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! 10 days is the sweet spot for first-time visitors to Sri Lanka. This route covers Sigiriya rock fortress, Kandy Tooth Temple, Nuwara Eliya tea estates, the iconic Ella blue train, Yala leopard safari, Mirissa beach, and UNESCO Galle Fort without feeling rushed."
              }
            },
            {
              "@type": "Question",
              "name": "What is the best way to travel between cities on a 10-day Sri Lanka itinerary?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hiring a private air-conditioned vehicle with an English-fluent chauffeur-guide is the most efficient and comfortable option. For the Nuwara Eliya to Ella leg, taking the scenic 2.5-hour highland train while your driver transfers your luggage by car is the ultimate experience."
              }
            },
            {
              "@type": "Question",
              "name": "How much does a 10-day trip to Sri Lanka cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A budget traveler can cover a 10-day trip for $550 - $700 per person. A comfortable mid-range boutique experience costs $1,400 - $2,200 per person, while luxury bespoke tours run from $3,800 to $7,500 per person."
              }
            }
          ]
        })}
      </script>

      {/* 1. HERO HEADER */}
      <section className="relative px-6 pb-12 pt-6 overflow-hidden bg-gradient-to-b from-[#1A2F23]/10 via-[#1A2F23]/5 to-transparent border-b border-[#0F1412]/5">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/15 border border-[#C5A059]/40 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> 15+ Years Expert Consultant Blueprint • 2026 Edition
          </div>

          <h1 className="text-4xl md:text-7xl font-serif text-[#1A2F23] tracking-tight leading-[1.1] max-w-5xl mx-auto font-bold">
            The Ultimate 10-Day Sri Lanka Itinerary: <br />
            <span className="italic text-[#C5A059] font-normal">Culture, Highlands, Safaris & Coast</span>
          </h1>

          <p className="text-base md:text-xl text-[#0F1412]/80 font-light max-w-3xl mx-auto leading-relaxed">
            Designed by senior Sri Lankan travel consultants. We optimized the classic Colombo-Sigiriya-Kandy-Highlands-Yala-South Coast route with realistic drive times, zero backtracking, balanced rest days, and transparent budget tiers.
          </p>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 print:hidden">
            <button
              onClick={() => handleWhatsAppConsult()}
              className="px-8 py-4 bg-[#1A2F23] text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-[#C5A059] hover:text-black transition-all flex items-center gap-3 group"
            >
              <Compass className="w-4 h-4 text-[#C5A059] group-hover:text-black" /> Request Custom Chauffeur Quote
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-4 bg-white border border-[#0F1412]/15 text-[#0F1412] rounded-full font-bold uppercase tracking-[0.15em] text-xs shadow-sm hover:border-[#C5A059] hover:text-[#C5A059] transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
          </div>

          {/* At-a-Glance Key Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F1412]/50 block mb-1">Total Distance</span>
              <span className="font-serif text-2xl font-bold text-[#1A2F23]">760 km</span>
              <span className="text-[10px] text-[#C5A059] block font-medium">Optimal Loop Flow</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F1412]/50 block mb-1">Driving Time Total</span>
              <span className="font-serif text-2xl font-bold text-[#1A2F23]">21.5 Hours</span>
              <span className="text-[10px] text-[#C5A059] block font-medium">Avg 2.1 hrs / day</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F1412]/50 block mb-1">Pacing Balance</span>
              <span className="font-serif text-2xl font-bold text-[#1A2F23]">6 Active / 4 Rest</span>
              <span className="text-[10px] text-[#C5A059] block font-medium">Zero Backtracking</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F1412]/50 block mb-1">UNESCO Sites</span>
              <span className="font-serif text-2xl font-bold text-[#1A2F23]">4 World Heritage</span>
              <span className="text-[10px] text-[#C5A059] block font-medium">Sigiriya, Dambulla, Tooth, Galle</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. OVERALL ROUTE MAP & DISTANCE MATRIX */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#0F1412]/10 p-6 md:p-10 shadow-lg space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0F1412]/5 pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-1">
                Route Efficiency & Travel Times Matrix
              </span>
              <h2 className="text-2xl md:text-4xl font-serif text-[#1A2F23] font-bold">
                10-Day Route Flow Breakdown
              </h2>
            </div>
            <div className="text-xs text-[#0F1412]/60 max-w-sm">
              <p>💡 <span className="font-bold text-[#1A2F23]">Consultant Rule:</span> Mountain roads (Kandy to Nuwara Eliya & Ella) restrict speeds to 30-40 km/h due to winding turns. We factored real local road conditions into every estimate.</p>
            </div>
          </div>

          {/* Interactive Route Timeline Summary */}
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1A2F23] text-white">
                  <th className="p-3 md:p-4 rounded-l-xl font-mono uppercase text-[11px] tracking-wider">Day & Leg</th>
                  <th className="p-3 md:p-4 font-mono uppercase text-[11px] tracking-wider">From → To</th>
                  <th className="p-3 md:p-4 font-mono uppercase text-[11px] tracking-wider">Distance</th>
                  <th className="p-3 md:p-4 font-mono uppercase text-[11px] tracking-wider">Realistic Time</th>
                  <th className="p-3 md:p-4 font-mono uppercase text-[11px] tracking-wider">Recommended Transit Mode</th>
                  <th className="p-3 md:p-4 rounded-r-xl font-mono uppercase text-[11px] tracking-wider">Primary Highlight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {tenDayItineraryData.map((d) => (
                  <tr 
                    key={d.day}
                    onClick={() => setActiveDay(d.day)}
                    className={`hover:bg-[#FAF8F5] transition-colors cursor-pointer ${
                      activeDay === d.day ? "bg-[#C5A059]/10 font-medium" : ""
                    }`}
                  >
                    <td className="p-3 md:p-4 font-mono font-bold text-[#C5A059]">Day {d.day}</td>
                    <td className="p-3 md:p-4 font-serif text-[#1A2F23] font-bold">{d.from} → {d.to}</td>
                    <td className="p-3 md:p-4">{d.distanceKm === 0 ? "0 km (Local)" : `${d.distanceKm} km`}</td>
                    <td className="p-3 md:p-4 font-mono text-xs text-[#1A2F23] font-bold">{d.drivingTime}</td>
                    <td className="p-3 md:p-4">
                      {d.day === 4 ? (
                        <span className="bg-[#1A2F23] text-white px-2.5 py-1 rounded-full text-[10px] font-mono font-bold inline-flex items-center gap-1">
                          <Train className="w-3 h-3 text-[#C5A059]" /> Scenic Blue Train
                        </span>
                      ) : (
                        <span className="bg-[#FAF8F5] border border-[#0F1412]/10 px-2.5 py-1 rounded-full text-[10px] font-mono text-[#0F1412]/70 inline-flex items-center gap-1">
                          <Car className="w-3 h-3" /> AC Chauffeur Sedan
                        </span>
                      )}
                    </td>
                    <td className="p-3 md:p-4 text-[#0F1412]/80 text-xs">{d.mainActivities[0]?.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC TRIP COST CALCULATOR & BUDGET TIER FILTER */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <div className="bg-[#1A2F23] text-white rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 relative z-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
                Transparent Budget Estimator
              </span>
              <h2 className="text-2xl md:text-4xl font-serif text-white font-bold">
                Calculate Your 10-Day Sri Lanka Budget
              </h2>
            </div>

            {/* Budget Tier Switcher */}
            <div className="flex bg-black/30 p-1.5 rounded-full border border-white/10">
              <button
                onClick={() => setBudgetTier("budget")}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  budgetTier === "budget" ? "bg-[#C5A059] text-black shadow-lg" : "text-white/70 hover:text-white"
                }`}
              >
                🎒 Budget ($55/d)
              </button>
              <button
                onClick={() => setBudgetTier("midRange")}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  budgetTier === "midRange" ? "bg-[#C5A059] text-black shadow-lg" : "text-white/70 hover:text-white"
                }`}
              >
                🌴 Mid-Range ($175/d)
              </button>
              <button
                onClick={() => setBudgetTier("luxury")}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  budgetTier === "luxury" ? "bg-[#C5A059] text-black shadow-lg" : "text-white/70 hover:text-white"
                }`}
              >
                👑 Luxury ($520/d)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Control 1: Travelers */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <label className="text-xs uppercase font-mono tracking-widest text-[#C5A059] font-bold block">
                Number of Travelers
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setNumTravelers(num)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      numTravelers === num 
                        ? "bg-[#C5A059] text-black border-[#C5A059]" 
                        : "border-white/20 text-white/80 hover:border-white"
                    }`}
                  >
                    {num === 1 ? "Solo" : num === 2 ? "Couple (2)" : `Group of ${num}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Travel Season */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
              <label className="text-xs uppercase font-mono tracking-widest text-[#C5A059] font-bold block">
                Travel Season Window
              </label>
              <select 
                value={travelSeason}
                onChange={(e) => setTravelSeason(e.target.value as any)}
                className="w-full bg-black/40 border border-white/20 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#C5A059]"
              >
                <option value="peak">Dec – Apr (Peak Dry Season)</option>
                <option value="shoulder">May – Sep (Shoulder / East Coast)</option>
                <option value="offPeak">Oct – Nov (Monsoon / Low Season -30%)</option>
              </select>
            </div>

            {/* Cost Output Display */}
            <div className="bg-[#C5A059]/15 border border-[#C5A059]/40 rounded-2xl p-5 text-center flex flex-col justify-center space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">Estimated Total (Land Only)</span>
              <div className="text-3xl md:text-4xl font-serif font-bold text-white">
                ${totalGroup.toLocaleString()} <span className="text-xs font-sans text-white/60 font-normal">USD Total</span>
              </div>
              <span className="text-xs text-white/70">
                (~${totalPerPerson.toLocaleString()} per person for 10 Days)
              </span>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-white/70 flex flex-wrap items-center justify-between gap-4">
            <span>Includes: Hotel stays, private AC vehicle with chauffeur, entry fees, train tickets, safaris, & breakfasts.</span>
            <button
              onClick={() => handleWhatsAppConsult(`Hi! I used your 10-day budget estimator for ${numTravelers} travelers in ${budgetTier} tier ($${totalGroup} estimate). Can you send a detailed hotel list?`)}
              className="text-[#C5A059] hover:underline font-bold text-xs inline-flex items-center gap-1"
            >
              Get Custom Itemized Quotation →
            </button>
          </div>

        </div>
      </section>

      {/* 4. DAY-BY-DAY MASTER EXPANDABLE LEDGER */}
      <section id="daily-itinerary-ledger" className="py-12 px-6 max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0F1412]/10 pb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
              Complete Day-by-Day Field Guide
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] font-bold">
              10-Day Detailed Itinerary Breakdown
            </h2>
          </div>

          {/* Quick Day Tab Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 max-w-full">
            {tenDayItineraryData.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  activeDay === d.day
                    ? "bg-[#1A2F23] text-white shadow-md scale-105"
                    : "bg-white text-[#0F1412]/70 border border-[#0F1412]/10 hover:border-[#C5A059]"
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Active Day Detail Card */}
        {tenDayItineraryData.map((dayPlan) => {
          if (dayPlan.day !== activeDay) return null;

          return (
            <motion.div
              key={dayPlan.day}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-[#0F1412]/10 shadow-xl overflow-hidden"
            >
              {/* Day Card Top Banner */}
              <div className="bg-[#1A2F23] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#C5A059]/30">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#C5A059] text-black rounded-lg font-mono font-bold text-xs uppercase tracking-wider">
                      Day {dayPlan.day} of 10
                    </span>
                    <span className="text-xs font-mono text-white/70">
                      🚗 {dayPlan.distanceKm === 0 ? "Local Explorations" : `${dayPlan.distanceKm} km • ${dayPlan.drivingTime}`}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-white">
                    {dayPlan.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#C5A059] font-mono">
                    📍 Route: {dayPlan.routeHighlights}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15 text-right min-w-[200px]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-1">
                    Est. Daily Expense ({budgetTier})
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#C5A059]">
                    {dayPlan.budgetBreakdown[budgetTier]}
                  </span>
                  <span className="text-[10px] text-white/70 block mt-0.5">
                    Per Pax (Hotel, Transport, Entry)
                  </span>
                </div>
              </div>

              {/* Day Card Content Grid */}
              <div className="p-6 md:p-10 space-y-10">
                
                {/* 1. Main Activities Timeline */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm uppercase font-mono tracking-widest text-[#1A2F23] font-bold">
                    <Clock className="w-4 h-4 text-[#C5A059]" /> Main Activities Schedule
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dayPlan.mainActivities.map((act, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#0F1412]/5 space-y-2 hover:border-[#C5A059]/40 transition-all"
                      >
                        <span className="px-2.5 py-0.5 bg-[#1A2F23] text-white rounded text-[10px] font-mono font-bold">
                          {act.time}
                        </span>
                        <h4 className="font-serif font-bold text-base text-[#1A2F23]">
                          {act.activity}
                        </h4>
                        <p className="text-xs text-[#0F1412]/75 leading-relaxed">
                          {act.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Alternative Activity Options (1-2 per day) */}
                <div className="bg-[#C5A059]/10 rounded-2xl p-6 border border-[#C5A059]/30 space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#1A2F23] font-bold">
                    <Compass className="w-4 h-4 text-[#C5A059]" /> Alternative Activity Options (Customize Your Pace)
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dayPlan.alternativeOptions.map((alt, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-[#0F1412]/5 space-y-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-xs text-[#1A2F23]">{alt.title}</h5>
                          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            alt.type === "adventure" ? "bg-orange-100 text-orange-800" :
                            alt.type === "cultural" ? "bg-emerald-100 text-emerald-800" :
                            "bg-purple-100 text-purple-800"
                          }`}>
                            {alt.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#0F1412]/70">{alt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Recommended Accommodation Areas & Hotels */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F1412]/5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold block">
                      🏨 Recommended Area
                    </span>
                    <h5 className="font-serif font-bold text-sm text-[#1A2F23]">
                      {dayPlan.accommodationArea}
                    </h5>
                  </div>

                  <div className="md:col-span-2 bg-[#FAF8F5] p-5 rounded-2xl border border-[#0F1412]/5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold block">
                      🛌 Recommended Hotels by Tier
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="font-bold block text-[#1A2F23]">🎒 Budget:</span>
                        <p className="text-[#0F1412]/70">{dayPlan.recommendedHotels.budget}</p>
                      </div>
                      <div>
                        <span className="font-bold block text-[#1A2F23]">🌴 Mid-Range:</span>
                        <p className="text-[#0F1412]/70">{dayPlan.recommendedHotels.midRange}</p>
                      </div>
                      <div>
                        <span className="font-bold block text-[#1A2F23]">👑 Luxury:</span>
                        <p className="text-[#0F1412]/70">{dayPlan.recommendedHotels.luxury}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Practical Tips (Best Time, Packing, Advance Bookings) */}
                <div className="bg-white rounded-2xl p-6 border border-[#0F1412]/10 space-y-4">
                  <h5 className="font-serif font-bold text-base text-[#1A2F23] flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#C5A059]" /> Practical Tips & Advance Bookings Needed
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="space-y-1">
                      <span className="font-mono font-bold text-[#C5A059] uppercase block">⏱️ Best Time of Day</span>
                      <p className="text-[#0F1412]/80">{dayPlan.practicalTips.bestTime}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono font-bold text-[#C5A059] uppercase block">🎒 What to Pack</span>
                      <ul className="list-disc list-inside text-[#0F1412]/80 space-y-0.5">
                        {dayPlan.practicalTips.whatToPack.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono font-bold text-[#C5A059] uppercase block">🎫 Advance Bookings</span>
                      <ul className="list-disc list-inside text-[#0F1412]/80 space-y-0.5">
                        {dayPlan.practicalTips.advanceBookings.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 5. Senior Consultant Pro Tip */}
                <div className="bg-[#1A2F23] text-white p-5 rounded-2xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <span className="font-mono font-bold text-[#C5A059] uppercase block">Senior Consultant Pro Tip:</span>
                    <p className="text-white/90 leading-relaxed">{dayPlan.proConsultantTip}</p>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}

        {/* Day Navigation Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setActiveDay(prev => Math.max(1, prev - 1))}
            disabled={activeDay === 1}
            className="px-6 py-3 bg-white border border-[#0F1412]/10 text-[#0F1412] rounded-full font-bold text-xs uppercase tracking-wider hover:border-[#C5A059] disabled:opacity-40 disabled:hover:border-[#0F1412]/10 transition-all"
          >
            ← Previous Day ({activeDay > 1 ? activeDay - 1 : 1})
          </button>

          <span className="font-mono text-xs text-[#0F1412]/60 font-bold">
            Day {activeDay} of 10
          </span>

          <button
            onClick={() => setActiveDay(prev => Math.min(10, prev + 1))}
            disabled={activeDay === 10}
            className="px-6 py-3 bg-[#1A2F23] text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-black disabled:opacity-40 transition-all"
          >
            Next Day ({activeDay < 10 ? activeDay + 1 : 10}) →
          </button>
        </div>

      </section>

      {/* 5. OPTIONAL ADD-ONS & DETOURS (ADVENTURE & RELAXATION) */}
      <section className="py-12 px-6 max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl border border-[#0F1412]/10 p-6 md:p-10 shadow-lg space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-1">
              Customization Menu
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A2F23] font-bold">
              Optional Add-Ons & Detours
            </h2>
            <p className="text-xs md:text-sm text-[#0F1412]/70 mt-1">
              Want more thrill or deeper rejuvenation? Swap or extend any leg of the 10-day loop with these popular additions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Adventure Add-Ons */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#0F1412]/5 space-y-4">
              <div className="flex items-center gap-2 text-sm uppercase font-mono font-bold text-[#1A2F23]">
                <Compass className="w-5 h-5 text-orange-600" /> 🧗 Adventure & Thrill Detours
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-white rounded-xl border border-[#0F1412]/5 space-y-1 shadow-sm">
                  <h4 className="font-bold text-sm text-[#1A2F23]">Kitulgala White Water Rafting (En route Kandy)</h4>
                  <p className="text-[#0F1412]/75">Add a 3-hour white-water rafting excursion on the Kelani River (Grade 3/4 rapids) between Colombo and Kandy.</p>
                  <span className="text-[10px] font-mono text-[#C5A059] block font-bold">Recommended: Add +1 Day or swap Day 3 morning</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#0F1412]/5 space-y-1 shadow-sm">
                  <h4 className="font-bold text-sm text-[#1A2F23]">Diyaluma Waterfall Rock Pools Hike (Near Ella)</h4>
                  <p className="text-[#0F1412]/75">Trek to the top of Sri Lanka's second highest waterfall to swim in natural rock infinity pools high above the cliffs.</p>
                  <span className="text-[10px] font-mono text-[#C5A059] block font-bold">Recommended: Include on Day 5 afternoon</span>
                </div>
              </div>
            </div>

            {/* Relaxation Add-Ons */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#0F1412]/5 space-y-4">
              <div className="flex items-center gap-2 text-sm uppercase font-mono font-bold text-[#1A2F23]">
                <Palmtree className="w-5 h-5 text-emerald-600" /> 🧘 Relaxation & Wellness Detours
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-white rounded-xl border border-[#0F1412]/5 space-y-1 shadow-sm">
                  <h4 className="font-bold text-sm text-[#1A2F23]">Tangalle Quiet Beach Escape (Near Yala / Mirissa)</h4>
                  <p className="text-[#0F1412]/75">Prefer empty beaches over surfing hubs? Extend 1 night in Tangalle (Silent Beach or Goyambokka Bay) between Yala and Mirissa.</p>
                  <span className="text-[10px] font-mono text-[#C5A059] block font-bold">Recommended: Add +1 Day after Yala safari</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#0F1412]/5 space-y-1 shadow-sm">
                  <h4 className="font-bold text-sm text-[#1A2F23]">Ayurvedic Wellness Immersion in Kandy / Bentota</h4>
                  <p className="text-[#0F1412]/75">Indulge in a half-day traditional herbal steam bath, shirodhara oil massage, and organic herbal tea tasting at a heritage sanctuary.</p>
                  <span className="text-[10px] font-mono text-[#C5A059] block font-bold">Recommended: Include on Day 2 or Day 9 afternoon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEASONAL CONSIDERATIONS & MONSOON TIMING GUIDE */}
      <section className="py-12 px-6 max-w-6xl mx-auto space-y-8">
        <div className="bg-[#1A2F23] text-white rounded-3xl p-6 md:p-10 shadow-xl space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
              Weather & Climate Master Guide
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white font-bold">
              Seasonal Considerations for This Specific 10-Day Route
            </h2>
            <p className="text-xs md:text-sm text-white/80 mt-1 max-w-3xl">
              Sri Lanka experiences a dual-monsoon pattern. Understanding monsoon windows ensures dry beach days and crystal-clear mountain views!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Dec - Apr */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-2">
              <span className="px-2.5 py-1 bg-emerald-500/30 text-emerald-300 rounded font-mono font-bold text-[10px] uppercase">
                🌟 Dec – Apr (Best Window)
              </span>
              <h4 className="font-serif font-bold text-base text-white">Peak Dry Season Across Route</h4>
              <p className="text-white/80 leading-relaxed">
                Clear sunny skies in Sigiriya, crisp cool mornings in Nuwara Eliya & Ella, calm turquoise sea in Mirissa for whale watching, and dry trails in Yala.
              </p>
            </div>

            {/* May - Sep */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-2">
              <span className="px-2.5 py-1 bg-yellow-500/30 text-yellow-300 rounded font-mono font-bold text-[10px] uppercase">
                ⛅ May – Sep (Shoulder Window)
              </span>
              <h4 className="font-serif font-bold text-base text-white">Southwest Monsoon Influence</h4>
              <p className="text-white/80 leading-relaxed">
                The Cultural Triangle & Tea Highlands remain warm and largely dry with occasional short afternoon showers. Mirissa sea has rougher swells (swap Mirissa for Trincomalee or Pasikuda on East Coast).
              </p>
            </div>

            {/* Oct - Nov */}
            <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-2">
              <span className="px-2.5 py-1 bg-purple-500/30 text-purple-300 rounded font-mono font-bold text-[10px] uppercase">
                🌦️ Oct – Nov (Inter-Monsoon)
              </span>
              <h4 className="font-serif font-bold text-base text-white">Value Season (-30% Rates)</h4>
              <p className="text-white/80 leading-relaxed">
                Passing rains across the island, but hotel prices drop significantly. Perfect for budget-conscious travelers comfortable with rain panchos and lush green landscapes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-12 px-6 max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl border border-[#0F1412]/10 p-6 md:p-10 shadow-lg space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-1">
              Traveler Knowledge Base
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A2F23] font-bold">
              Frequently Asked Questions (10-Day Itinerary)
            </h2>
          </div>

          <div className="space-y-4 text-xs md:text-sm">
            {[
              {
                q: "Is 10 days enough for a full Sri Lanka experience?",
                a: "Yes! 10 days allows you to comfortably cover all core geographic zones: Cultural Triangle (Sigiriya/Dambulla), Hill Country (Kandy/Nuwara Eliya/Ella), Wildlife Safari (Yala), and Southern Beaches (Mirissa/Galle) without excessive fatigue."
              },
              {
                q: "Should I rent a car or hire a private driver?",
                a: "Hiring a private AC vehicle with an English-speaking chauffeur-guide is highly recommended over self-driving. Driving in Sri Lanka involves narrow mountain passes, tuk-tuk traffic, and local bus overtakes. Private drivers are affordable ($50-$70/day including fuel, vehicle, driver lodging & meals) and eliminate transit stress."
              },
              {
                q: "How far in advance must I book train tickets?",
                a: "Reserved train tickets for the Nanu Oya (Nuwara Eliya) to Ella leg go on sale 30 days prior to departure and sell out within minutes during peak season. We recommend securing train tickets through a licensed local consultant 30-45 days ahead."
              },
              {
                q: "What visa do I need for Sri Lanka?",
                a: "Most international travelers require an Electronic Travel Authorization (ETA) applied online via the official Sri Lanka ETA portal prior to departure. Processing typically takes 24-48 hours."
              },
              {
                q: "Can this 10-day itinerary be customized for families with young children or seniors?",
                a: "Absolutely! For families or seniors, we ease the pace by substituting strenuous climbs (like Ella Rock) with gentle walks (Little Adam's Peak), adding extra pool time in Mirissa, and scheduling comfortable private van transfers with frequent stops."
              }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#0F1412]/5 space-y-2"
              >
                <h4 className="font-serif font-bold text-base text-[#1A2F23] flex items-center justify-between">
                  <span>❓ {faq.q}</span>
                </h4>
                <p className="text-[#0F1412]/80 leading-relaxed text-xs md:text-sm">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CONSULTANT CTA & DIRECT CONCIERGE DESK */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <div className="bg-[#1A2F23] text-white rounded-3xl p-8 md:p-14 shadow-2xl space-y-6 relative overflow-hidden border border-[#C5A059]/30">
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 border border-[#C5A059]/40 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> Direct Travel Concierge Desk
          </div>

          <h2 className="text-3xl md:text-6xl font-serif text-white font-bold leading-tight">
            Ready to Turn This 10-Day Itinerary <br />
            <span className="italic text-[#C5A059] font-normal">Into Your Dream Vacation?</span>
          </h2>

          <p className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Speak directly with our senior Sri Lankan travel consultant. We handle private chauffeur bookings, boutique hotel reservations, train ticket seats, and Yala safari permits effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleWhatsAppConsult()}
              className="w-full sm:w-auto px-10 py-5 bg-[#C5A059] text-black rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-white transition-all flex items-center justify-center gap-3"
            >
              💬 Chat on WhatsApp (+94 72 296 8210)
            </button>
            <Link
              to="/sri-lanka-trip-planner"
              className="w-full sm:w-auto px-8 py-5 bg-white/10 border border-white/20 text-white rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              🛠️ Open Interactive Trip Planner Tool
            </Link>
          </div>

          <div className="pt-4 text-[11px] text-white/50 font-mono">
            SLTDA Licensed Concierge • Instant Response • 100% Custom Tailored
          </div>
        </div>
      </section>

    </div>
  );
}
