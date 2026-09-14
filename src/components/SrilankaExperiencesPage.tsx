import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  Check, 
  ChevronDown, 
  X, 
  Search, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  Eye, 
  Plus, 
  MessageCircle, 
  Heart, 
  Info, 
  Camera, 
  Trees, 
  Waves, 
  Flame, 
  Train, 
  Utensils, 
  HelpCircle,
  Award,
  ShieldCheck,
  CheckCircle2,
  Compass as CompassIcon,
  Layers,
  Sliders,
  Scale
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

// --- INTERFACES ---
export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  image: string;
  description: string;
  destinationsCount: number;
  bestSeason: string;
}

export interface Experience {
  id: string;
  title: string;
  slug: string;
  image: string;
  shortSummary: string;
  description: string;
  categories: string[];
  travelStyles: string[];
  budgetTier: 'Low' | 'Medium' | 'Luxury';
  bestMonths: string[];
  duration: 'Half Day' | '1 Day' | '2 Days' | 'Multi Day';
  region: 'South' | 'East' | 'Hill Country' | 'North' | 'West' | 'Cultural Triangle';
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  estimatedCost: string;
  crowdLevel: 'Low' | 'Moderate' | 'High';
  popularityScore: number;
  locationName: string;
  coords: { x: number; y: number };
  highlights: string[];
  whatsIncluded: string[];
  comparison: {
    animals: string;
    crowds: string;
    price: string;
    travelTime: string;
    bestSeason: string;
    familyFriendly: string;
    photography: string;
  };
  provider?: string;
}

// --- DATA DEFINITIONS ---

const CATEGORIES: Category[] = [
  {
    id: "wildlife-safaris",
    name: "Wildlife Safaris",
    icon: <Trees className="w-5 h-5 text-emerald-600" />,
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=600",
    description: "Encounter majestic leopards, wild elephant herds, and rare tropical birds in pristine sanctuaries.",
    destinationsCount: 4,
    bestSeason: "May to September & Feb to April"
  },
  {
    id: "train-journeys",
    name: "Train Journeys",
    icon: <Train className="w-5 h-5 text-cyan-600" />,
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=600",
    description: "Ride the world's most scenic rails through misty highland tea fields and past iconic stone bridges.",
    destinationsCount: 3,
    bestSeason: "Year-Round (Best Dec to April)"
  },
  {
    id: "surfing",
    name: "Surfing",
    icon: <Waves className="w-5 h-5 text-blue-600" />,
    image: "/arugam-bay-surfing-plan-srilanka.jpg",
    description: "Ride world-class reef breaks and gentle sandy points tailored for both beginners and pros.",
    destinationsCount: 3,
    bestSeason: "May to Sept (East) & Nov to April (South)"
  },
  {
    id: "snorkeling-diving",
    name: "Snorkeling & Diving",
    icon: <Compass className="w-5 h-5 text-teal-600" />,
    image: "/snorkeler-trincomalee-nilaveli.jpg",
    description: "Explore marine sanctuaries, vibrant coral reefs, and historical shipwrecks in crystal clear waters.",
    destinationsCount: 2,
    bestSeason: "Nov to April (South) & April to Sept (East)"
  },
  {
    id: "hiking",
    name: "Hiking & Trekking",
    icon: <Flame className="w-5 h-5 text-orange-600" />,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=600",
    description: "Scale iconic monoliths, misty mountain ridges, and verdant ridges for breathtaking sunrises.",
    destinationsCount: 5,
    bestSeason: "December to May"
  },
  {
    id: "cultural-experiences",
    name: "Cultural Experiences",
    icon: <CompassIcon className="w-5 h-5 text-amber-600" />,
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600",
    description: "Unlock centuries of royal history, visit sacred clifftop temples, and walk UNESCO heritage fortresses.",
    destinationsCount: 6,
    bestSeason: "Year-Round"
  },
  {
    id: "food-experiences",
    name: "Food Experiences",
    icon: <Utensils className="w-5 h-5 text-rose-600" />,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600",
    description: "Savor aromatic claypot curries, learn street food secrets, and experience high tea in colonial estates.",
    destinationsCount: 4,
    bestSeason: "Year-Round"
  },
  {
    id: "photography-spots",
    name: "Photography Spots",
    icon: <Camera className="w-5 h-5 text-indigo-600" />,
    image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=600",
    description: "Capture iconic coconut-fringed hills, ancient stilt fishermen, and mist-laden sunrise peaks.",
    destinationsCount: 6,
    bestSeason: "Year-Round"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "yala-safari-morning",
    title: "Yala Safari - Morning",
    slug: "yala-safari-morning",
    image: "/yala-safari-morning.jpg.avif",
    shortSummary: "Embark on an early morning adventure to witness Yala's active wildlife at sunrise.",
    description: "The morning safari is the prime window to witness Yala National Park's famous leopards, elephants, and sloth bears as they wake and hunt at dawn. Operating from 5:00 AM to 10:00 AM, this open-jeep excursion provides cool morning temperatures and spectacular golden hour lighting, perfect for capturing active predators and diverse bird species near waterholes.",
    categories: ["Wildlife Safaris", "Photography Spots"],
    travelStyles: ["Wildlife", "Adventure", "Couple", "Family"],
    budgetTier: "Medium",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "December"],
    duration: "Half Day",
    region: "South",
    difficulty: "Easy",
    estimatedCost: "$45 - $85",
    crowdLevel: "High",
    popularityScore: 4.8,
    locationName: "Yala National Park",
    coords: { x: 68, y: 81 },
    highlights: [
      "Spot active leopards and sloth bears hunting during cool dawn hours",
      "Spectacular golden sunrise landscape views over salt flats and lakes",
      "Travel in a customized 4x4 open safari jeep with elevated viewing",
      "Free hotel pickup and drop-off from Yala, Tissa, or Kirinda"
    ],
    whatsIncluded: [
      "Customized 4x4 open safari jeep with elevated seats",
      "Experienced local driver-guide fluent in English",
      "Complimentary cold bottled water & light breakfast/fruit pack",
      "Free pickup and drop-off from nearby hotels"
    ],
    comparison: {
      animals: "Excellent chances for leopards, elephants, crocodiles, deer, and birds.",
      crowds: "Moderate to high; early morning has the most vehicles entering the park gates.",
      price: "$$ Affordable & High Value Half Day Package",
      travelTime: "Pickup at 5:00 AM from local hotels, return by 10:00 AM.",
      bestSeason: "Year-Round, with peak predator sightings from February to September.",
      familyFriendly: "Highly recommended for families. Engaging and cooler than afternoon tours.",
      photography: "Stellar (10/10) morning golden hour lighting for crisp, warm wildlife shots."
    }
  },
  {
    id: "yala-leopard-safari",
    title: "Yala Leopard Safari",
    slug: "yala-leopard-safari",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=800",
    shortSummary: "Embark on an open-jeep quest to spot the world's most concentrated leopard population.",
    description: "Yala National Park borders the Indian Ocean and boasts a unique coastal scrubland ecosystem. It holds the highest density of leopards in the world, making it the premier destination for big cat photography. In addition to leopards, you'll track sloth bears, Asian elephants, crocodiles, and painted storks across salt flats and dunes.",
    categories: ["Wildlife Safaris", "Photography Spots"],
    travelStyles: ["Wildlife", "Adventure", "Luxury", "Family"],
    budgetTier: "Luxury",
    bestMonths: ["February", "March", "April", "May", "June", "July", "August", "September"],
    duration: "Half Day",
    region: "South",
    difficulty: "Easy",
    estimatedCost: "$90 - $180",
    crowdLevel: "High",
    popularityScore: 4.9,
    locationName: "Yala National Park",
    coords: { x: 68, y: 81 },
    highlights: [
      "Track leopards with an expert naturalist in a custom private 4x4",
      "Stunning coastal sand dunes meeting dense dry-zone forest",
      "Observe sloth bears, wild elephants, and rich birdlife",
      "Optional premium luxury glamping borders right at the park boundary"
    ],
    whatsIncluded: [
      "Private customized 4x4 safari jeep",
      "English-speaking expert park ranger",
      "National Park entrance permits",
      "Gourmet cold refreshments & picnic lunch box"
    ],
    comparison: {
      animals: "Highest leopard density, elephants, sloth bears, jackals, crocodiles.",
      crowds: "High popularity, can feel congested at main tracks.",
      price: "$$$ Premium",
      travelTime: "approx. 5.5 hours drive from Colombo.",
      bestSeason: "February to September (Dry season is prime tracking window).",
      familyFriendly: "Excellent, though children must remain seated in the jeep.",
      photography: "Outstanding (10/10) for predators and open-space tracking views."
    }
  },
  {
    id: "kumana-bird-safari",
    title: "Kumana Bird Safari",
    slug: "kumana-bird-safari",
    image: "https://images.unsplash.com/photo-1470115636472-8d21172be5fa?auto=format&fit=crop&q=80&w=800",
    shortSummary: "A tranquil sanctuary for bird lovers and those seeking leopards away from the crowds.",
    description: "Known as Yala East, Kumana is incredibly quiet and peaceful. Centered around a massive 200-hectare mangrove swamp, it is a key nesting ground for tens of thousands of migratory waterfowl, including rare Black-necked Storks and Spoonbills. Leopards and elephants frequently roam here, but without the tourist crowd.",
    categories: ["Wildlife Safaris", "Photography Spots"],
    travelStyles: ["Wildlife", "Solo", "Photography"],
    budgetTier: "Medium",
    bestMonths: ["May", "June", "July", "August", "September"],
    duration: "Half Day",
    region: "East",
    difficulty: "Easy",
    estimatedCost: "$50 - $90",
    crowdLevel: "Low",
    popularityScore: 4.6,
    locationName: "Kumana National Park",
    coords: { x: 74, y: 78 },
    highlights: [
      "Extremely peaceful safari experience with zero crowd congestion",
      "Majestic nesting trees surrounded by a pristine mangrove lagoon",
      "Over 250 species of rare aquatic and forest birds",
      "Frequent sightings of lone leopards and bull elephants on quiet roads"
    ],
    whatsIncluded: [
      "4x4 Safari Cruiser",
      "Expert local birding guide",
      "Entrance permits",
      "Binoculars on loan"
    ],
    comparison: {
      animals: "Tens of thousands of nesting birds, elephants, occasional leopards.",
      crowds: "Very low, pristine and undisturbed nature.",
      price: "$$ Moderate",
      travelTime: "approx. 7 hours drive from Colombo, close to Arugam Bay.",
      bestSeason: "May to September (Nesting peak peaks June/July).",
      familyFriendly: "Good for older children who love quiet nature observation.",
      photography: "Top tier (9/10) for birding, flight photography, and landscapes."
    }
  },
  {
    id: "udawalawe-elephant-safari",
    title: "Udawalawe Elephant Safari",
    slug: "udawalawe-elephant-safari",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=800",
    shortSummary: "Guaranteed wild elephant sightings in an African-style open savanna reservoir.",
    description: "Udawalawe National Park is famous for its massive reservoir backdrop and dry-zone grasslands that resemble the East African savanna. Wild elephants are 100% guaranteed here on any given day. You'll watch families of giants bathing, feeding, and playing, and can also visit the Elephant Transit Home nearby.",
    categories: ["Wildlife Safaris"],
    travelStyles: ["Wildlife", "Family", "Couple"],
    budgetTier: "Medium",
    bestMonths: ["January", "February", "March", "May", "June", "July", "August", "September", "December"],
    duration: "Half Day",
    region: "South",
    difficulty: "Easy",
    estimatedCost: "$45 - $80",
    crowdLevel: "Moderate",
    popularityScore: 4.8,
    locationName: "Udawalawe",
    coords: { x: 50, y: 80 },
    highlights: [
      "100% Guaranteed wild elephant encounters up close",
      "Stunning open landscape with the scenic Kaltota mountain range backdrop",
      "Observe baby elephants being fed milk at the Transit Home",
      "Great bird watching including eagles and peacock swarms"
    ],
    whatsIncluded: [
      "Open-top 4x4 safari jeep",
      "English-speaking driver-guide",
      "Park entry tickets",
      "Drinking water"
    ],
    comparison: {
      animals: "Hundreds of elephants, water buffaloes, monitors, raptors.",
      crowds: "Moderate, well spread across vast open savannas.",
      price: "$$ Moderate",
      travelTime: "approx. 4 hours from Colombo or 2 hours from Ella.",
      bestSeason: "Year-Round (Dry months of Dec-March and May-Sept are best).",
      familyFriendly: "Outstanding (10/10) - highly engaging for children of all ages.",
      photography: "Excellent (8/10) for clear herd interactions and open lighting."
    }
  },
  {
    id: "scenic-train-ride",
    title: "Scenic Highlands Train Ride",
    slug: "scenic-train-ride",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800",
    shortSummary: "Hang out of the open doors of the iconic blue train through the mist-shrouded Tea Country.",
    description: "Consistently voted one of the most beautiful train journeys in the world, the route between Kandy and Ella takes you through pine forests, terraced organic tea fields, cascading waterfalls, and local mountain villages. The fresh mountain air and slow pacing make this a classic must-do.",
    categories: ["Train Journeys", "Tea Country", "Photography Spots"],
    travelStyles: ["Solo", "Couple", "Photography", "Family"],
    budgetTier: "Low",
    bestMonths: ["January", "February", "March", "April", "May", "August", "September", "December"],
    duration: "Half Day",
    region: "Hill Country",
    difficulty: "Easy",
    estimatedCost: "$10 - $25",
    crowdLevel: "High",
    popularityScore: 4.9,
    locationName: "Kandy to Ella Route",
    coords: { x: 50, y: 63 },
    highlights: [
      "The classic blue train click-clack winding through misty mountains",
      "Waving at tea pluckers in endless terraced estates",
      "Crossing colonial stone arches and deep scenic gorges",
      "Fresh local tropical snacks sold by vendors at rural train stops"
    ],
    whatsIncluded: [
      "Reserved 1st or 2nd class carriage ticket",
      "Baggage handling service",
      "Hotel transfer to the train terminal",
      "Local travel documentation & guide notes"
    ],
    comparison: {
      animals: "None, purely scenic landscape and tea village focus.",
      crowds: "Very high, reservations must be booked 30 days in advance.",
      price: "$ Budget Friendly",
      travelTime: "3.5 hours for the best segment (Nanu Oya to Ella).",
      bestSeason: "January to April & August (avoiding heavy monsoon washouts).",
      familyFriendly: "Fun, but parents must hold young kids close to open doors.",
      photography: "Legendary (10/10) for lifestyle and epic mountain snaps."
    }
  },
  {
    id: "surfing-arugam-bay",
    title: "Surfing at Arugam Bay",
    slug: "surfing-arugam-bay",
    image: "/arugam-bay-surfing-plan-srilanka.jpg",
    shortSummary: "Ride legendary point breaks and enjoy laidback beach party vibes on the East Coast.",
    description: "Arugam Bay is a world-class surfing crescent on the dry east coast of Sri Lanka. Famously relaxed, it draws surfers globally for its long, consistent right-hand point breaks. From May to September, the town becomes a lively surf haven filled with beachfront music, healthy cafes, and coastal wellness retreats.",
    categories: ["Surfing", "Beaches"],
    travelStyles: ["Adventure", "Solo", "Couple"],
    budgetTier: "Low",
    bestMonths: ["May", "June", "July", "August", "September"],
    duration: "1 Day",
    region: "East",
    difficulty: "Moderate",
    estimatedCost: "$25 - $60",
    crowdLevel: "High",
    popularityScore: 4.8,
    locationName: "Arugam Bay",
    coords: { x: 73, y: 72 },
    highlights: [
      "Surfing 'Main Point' right-hand break or learning at 'Baby Point'",
      "Sunset views at Elephant Rock where wild elephants roam the dunes",
      "Laid-back lifestyle with organic eateries, live DJ bars, and yoga camps",
      "Vibrant beach bonfires under the stars"
    ],
    whatsIncluded: [
      "Premium surfboard rental for full day",
      "Private 2-hour lesson with ISA certified surf coach",
      "Tuk-tuk transfer to secret point breaks",
      "Fresh king coconut recovery drink"
    ],
    comparison: {
      animals: "Occasional wild elephants on adjacent sand hills.",
      crowds: "High density of surfers in season, but friendly community.",
      price: "$ Budget Friendly",
      travelTime: "approx. 6.5 hours from Colombo.",
      bestSeason: "May to September (Dry east monsoon peaks).",
      familyFriendly: "Moderate (Beaches have strong currents, great for teen lessons).",
      photography: "Excellent (8/10) for action sports and drone seaside captures."
    }
  },
  {
    id: "whale-watching-mirissa",
    title: "Whale Watching in Mirissa",
    slug: "whale-watching-mirissa",
    image: "/whale-watching-sri-lanka-Copy.jpg",
    shortSummary: "Set sail with Geeth's Whale Watching Mirissa, the premier direct operator to witness majestic Blue Whales on their ocean highway.",
    description: "The deep continental shelf off Mirissa is one of the world's finest pathways for marine giants. Experience this once-in-a-lifetime journey with the premier official team of www.whale-watching-mirissa.com (operated by Geeth). You will witness majestic Blue Whales, Fin Whales, Sperm Whales, and mega-pods of Spinner Dolphins jumping, while on an eco-friendly double-decker cruiser respecting safe and ethical viewing distances.",
    categories: ["Whale Watching", "Beaches", "Photography Spots"],
    travelStyles: ["Wildlife", "Family", "Luxury", "Couple"],
    budgetTier: "Medium",
    bestMonths: ["January", "February", "March", "April", "November", "December"],
    duration: "Half Day",
    region: "South",
    difficulty: "Easy",
    estimatedCost: "$55 - $110",
    crowdLevel: "Moderate",
    popularityScore: 4.7,
    locationName: "Mirissa Harbor",
    coords: { x: 38, y: 92 },
    highlights: [
      "Witness massive Blue Whales surfacing and showing their majestic tail flukes",
      "Spinner dolphin pods racing alongside the bow of the cruiser",
      "Fully licensed vessel respecting safe distances to protect marine life",
      "Breathtaking open ocean breakfast with sea breeze views"
    ],
    whatsIncluded: [
      "Seats on a modern, double-decker observation vessel",
      "Certified marine naturalist guide",
      "Hot breakfast, tea/coffee, and fresh tropical fruit platter",
      "Sea-sickness prevention bands"
    ],
    comparison: {
      animals: "Blue Whales, Sperm Whales, Spinner Dolphins, Sea Turtles.",
      crowds: "Moderate, regulated boat counts out at deep sea.",
      price: "$$ Moderate to $$$ Premium",
      travelTime: "approx. 2.5 hours from Colombo via Southern Expressway.",
      bestSeason: "November to April (Sea is calmest and whale highway is highly active).",
      familyFriendly: "Good, though toddlers might get sea sick on choppy days.",
      photography: "Challenging but rewarding (8/10) - telephoto lens required."
    },
    provider: "Whale Watching Mirissa"
  },
  {
    id: "pigeon-island-snorkeling",
    title: "Pigeon Island Coral Snorkeling",
    slug: "pigeon-island-snorkeling",
    image: "/snorkeler-trincomalee-nilaveli.jpg",
    shortSummary: "Swim with blacktip reef sharks and green sea turtles in a protected marine sanctuary.",
    description: "Pigeon Island is a designated marine national park off Nilaveli. Encircled by a gorgeous shallow powder-coral reef, it is a haven for rich tropical fish, colorful hard corals, Hawksbill Turtles, and harmless Blacktip Reef Sharks gliding right in the clear turquoise shallows.",
    categories: ["Snorkeling & Diving", "Beaches"],
    travelStyles: ["Adventure", "Couple", "Family"],
    budgetTier: "Medium",
    bestMonths: ["May", "June", "July", "August", "September"],
    duration: "Half Day",
    region: "East",
    difficulty: "Easy",
    estimatedCost: "$40 - $75",
    crowdLevel: "Moderate",
    popularityScore: 4.8,
    locationName: "Trincomalee / Nilaveli",
    coords: { x: 61, y: 19 },
    highlights: [
      "Snorkel alongside harmless Blacktip Reef Sharks in 3-foot deep shallows",
      "Unwind on the beach of a remote uninhabited island made of coral powder",
      "Float over 100 species of corals and colorful surgeonfish clusters",
      "Sighting ancient nesting Sea Turtles"
    ],
    whatsIncluded: [
      "Private speedboat charter to/from Nilaveli beach",
      "Marine National Park entrance permits",
      "Full high-quality snorkel gear (mask, snorkel, fins)",
      "Accompanied certified snorkel safety guide"
    ],
    comparison: {
      animals: "Blacktip Reef Sharks, Green Turtles, Hawksbill Turtles, Clownfish.",
      crowds: "Moderate, national park caps daily boat landings.",
      price: "$$ Moderate",
      travelTime: "approx. 5.5 hours drive from Colombo, close to Trincomalee.",
      bestSeason: "May to October (Trinco dry window features flat, glassy seas).",
      familyFriendly: "Fantastic (9/10) - shallow reef makes shark spotting safe and easy.",
      photography: "Excellent (8/10) for underwater GoPros and tropical island drone views."
    },
    provider: "Nilaveli & Pigeon Island Snorkeling"
  },
  {
    id: "sigiriya-rock-fortress",
    title: "Sigiriya Lion Rock Citadel",
    slug: "sigiriya-rock-fortress",
    image: "/Sigiriya-Lion-Rock-Citadel.jpeg",
    shortSummary: "Ascend a sheer 200m volcanic monolith housing a royal fortress, frescoes, and gardens.",
    description: "Known as the 8th Wonder of the Ancient World, Sigiriya is a massive columns of rock rising 200m from the forest. Built by King Kasyapa in the 5th century, it features symmetric water gardens, 1500-year-old plaster frescoes, a glistening mirror wall, and colossal lion paws guarding the summit stairway.",
    categories: ["Cultural Experiences", "Hiking & Trekking", "Photography Spots"],
    travelStyles: ["Culture", "Adventure", "Family", "Couple"],
    budgetTier: "Luxury",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "December"],
    duration: "Half Day",
    region: "Cultural Triangle",
    difficulty: "Moderate",
    estimatedCost: "$36 - $50",
    crowdLevel: "High",
    popularityScore: 5.0,
    locationName: "Sigiriya",
    coords: { x: 44, y: 39 },
    highlights: [
      "Climb 1,200 ancient steps between massive stone Lion Claws",
      "Admire the hand-painted celestial maidens frescoes inside high rock alcoves",
      "Stroll the symmetry of the oldest royal water gardens in Asia",
      "Witness 360° jungle vistas from the palace ruins of the summit"
    ],
    whatsIncluded: [
      "VIP Fast-Track entrance ticket avoiding queues",
      "Expert UNESCO-licensed history archaeologist guide",
      "Cold eucalyptus towels upon descent",
      "Chilled fresh coconut at the base exit"
    ],
    comparison: {
      animals: "Wild grey langur monkeys, giant squirrels, eagles.",
      crowds: "Very high, can get slow on the narrow summit steel staircases.",
      price: "$$$ Premium ticket ($36 USD for international visitors).",
      travelTime: "approx. 4 hours from Colombo.",
      bestSeason: "Year-Round (Superb, dry breeze peaks June to September).",
      familyFriendly: "Great for active families; toddlers may need to be carried.",
      photography: "Monumental (10/10) - drone shots around the buffer zone are epic."
    }
  },
  {
    id: "pidurangala-sunrise-trek",
    title: "Pidurangala Sunrise Hike",
    slug: "pidurangala-sunrise-trek",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=800",
    shortSummary: "Scale the neighboring monastery peak for the ultimate sunrise view of Sigiriya Rock.",
    description: "Pidurangala is a rugged companion rock located just 2km north of Sigiriya. It offers a wilder, spiritual trek through ancient forest monasteries and reclining stone Buddhas. The flat, windswept summit is the absolute best viewpoint on earth to watch the sun rise directly behind the iconic Sigiriya monolith.",
    categories: ["Hiking & Trekking", "Cultural Experiences", "Photography Spots"],
    travelStyles: ["Adventure", "Solo", "Photography"],
    budgetTier: "Low",
    bestMonths: ["January", "February", "March", "April", "June", "July", "August", "September", "December"],
    duration: "Half Day",
    region: "Cultural Triangle",
    difficulty: "Moderate",
    estimatedCost: "$5 - $15",
    crowdLevel: "Moderate",
    popularityScore: 4.9,
    locationName: "Pidurangala",
    coords: { x: 45, y: 37 },
    highlights: [
      "Scramble up a wild boulder trail lit by starlight/headlamps",
      "Pass ancient cave temples and a massive historic reclining brick Buddha",
      "Sit on the vast, flat summit slab as the valley mist clears with the dawn",
      "Unparalleled eye-level views of Sigiriya Rock fortress"
    ],
    whatsIncluded: [
      "Local temple donation entry permit",
      "Guided sunrise escort with high-lumen headlamps",
      "Bottled mineral water & hot tea at the peak",
      "First aid support"
    ],
    comparison: {
      animals: "Temple monkeys, birds, geckos.",
      crowds: "Moderate, much quieter and cheaper than Sigiriya.",
      price: "$ Budget Friendly (approx $3 USD entry).",
      travelTime: "approx 4 hours from Colombo, adjacent to Sigiriya.",
      bestSeason: "Year-round (Best during clear-dry months to avoid slippery rocks).",
      familyFriendly: "Moderate (The final 15 minutes require climbing over big boulders).",
      photography: "Legendary (10/10) - The classic 'Instagram shot' of Sigiriya is taken here."
    }
  },
  {
    id: "ella-rock-hiking",
    title: "Ella Rock & Little Adam's Peak Trek",
    slug: "ella-rock-hiking",
    image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&q=80&w=800",
    shortSummary: "Hike through mountain cloud forests for dramatic panoramic vistas of the southern plains.",
    description: "The highlands around Ella are a trekker's paradise. Little Adam's Peak is an easy, panoramic trail through tea terraces, while Ella Rock is a deeper, forested expedition that takes you along active train tracks, Eucalyptus groves, and high craggy ridges framing the famous Ella Gap pass.",
    categories: ["Hiking & Trekking", "Photography Spots"],
    travelStyles: ["Adventure", "Solo", "Couple"],
    budgetTier: "Low",
    bestMonths: ["January", "February", "March", "April", "July", "August", "September", "December"],
    duration: "Half Day",
    region: "Hill Country",
    difficulty: "Challenging",
    estimatedCost: "$10 - $35",
    crowdLevel: "Moderate",
    popularityScore: 4.8,
    locationName: "Ella Village",
    coords: { x: 57, y: 70 },
    highlights: [
      "Walk along active highland train lines surrounded by lush wild ginger fields",
      "Reach the summit ledge with views stretching all the way to the southern coastline",
      "Optional ziplining over lush valleys near Little Adam's Peak",
      "Rest at misty mountain crest viewpoints drinking hot spiced ginger tea"
    ],
    whatsIncluded: [
      "Local licensed trekking guide",
      "Traditional ginger tea & mountain snacks",
      "Hiking pole rental",
      "Hotel pick-up/drop-off within Ella"
    ],
    comparison: {
      animals: "Mountain birds, highland eagles, lizards, butterflies.",
      crowds: "Low on Ella Rock, moderate on Little Adam's Peak.",
      price: "$ Budget Friendly to $$ Moderate",
      travelTime: "approx. 5.5 hours from Colombo, directly in Ella.",
      bestSeason: "January to April & July to September for dry trails.",
      familyFriendly: "Little Adam's is 10/10; Ella Rock is 6/10 due to steepness.",
      photography: "Breathtaking (9/10) for wide canyon gaps and misty sunrise slopes."
    }
  },
  {
    id: "nine-arch-bridge-walk",
    title: "Nine Arch Bridge Walkway",
    slug: "nine-arch-bridge-walk",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800",
    shortSummary: "Walk the tracks of the spectacular 91m colonial stone viaduct framed by green jungle.",
    description: "Hidden in a lush tropical valley between Ella and Demodara, this architectural masterpiece was built during the British colonial period entirely out of brick, stone, and cement—without a single piece of structural steel. Walking along its curved span as the blue train slowly passes is a classic Sri Lankan memory.",
    categories: ["Train Journeys", "Photography Spots"],
    travelStyles: ["Photography", "Couple", "Family", "Solo"],
    budgetTier: "Low",
    bestMonths: ["January", "February", "March", "April", "May", "August", "September", "December"],
    duration: "Half Day",
    region: "Hill Country",
    difficulty: "Easy",
    estimatedCost: "$5 - $12",
    crowdLevel: "High",
    popularityScore: 4.9,
    locationName: "Demodara / Ella",
    coords: { x: 58, y: 69 },
    highlights: [
      "Walk on the historic brick railway bridge surrounded by dense banana trees",
      "Grab fresh juice at a cliffside wooden cafe looking down over the arches",
      "Wait for the legendary blue train to cross the curve and wave to passengers",
      "Descend below the columns into the green tea bushes to see the massive height"
    ],
    whatsIncluded: [
      "Tuk-tuk transfer from your hotel to the forest trailhead",
      "Refreshment voucher at a premier viewpoint cafe",
      "Professional photo assistance (angle guidance)",
      "Train timetable escort tracking"
    ],
    comparison: {
      animals: "Nesting swallows under the arches, squirrels.",
      crowds: "High, especially during scheduled train crossing windows.",
      price: "$ Free (Tuk-tuk transport is just $3-5 USD).",
      travelTime: "Located just 10 mins from Ella town center.",
      bestSeason: "Year-round (early mornings are best to beat the heat and crowds).",
      familyFriendly: "Excellent (9/10) - flat railway bed is highly accessible.",
      photography: "Outstanding (10/10) - one of the most photographed bridges globally."
    }
  },
  {
    id: "tea-plantation-high-tea",
    title: "High Country Tea Estate Tour",
    slug: "tea-plantation-high-tea",
    image: "https://images.unsplash.com/photo-1524350302447-3a888d716823?auto=format&fit=crop&q=80&w=800",
    shortSummary: "Harvest organic tea buds with local pluckers and enjoy high tea in colonial bungalows.",
    description: "Nestled in the emerald valleys of Nuwara Eliya, also known as 'Little England', you will walk through endless rows of Ceylon tea plants. You'll learn the delicate art of harvesting 'two leaves and a bud', tour a 150-year-old active steam-dry factory, and end with an elite English high tea session overlooking the estates.",
    categories: ["Tea Country", "Food Experiences", "Cultural Experiences"],
    travelStyles: ["Luxury", "Family", "Couple"],
    budgetTier: "Luxury",
    bestMonths: ["January", "February", "March", "April", "May", "August", "September", "December"],
    duration: "Half Day",
    region: "Hill Country",
    difficulty: "Easy",
    estimatedCost: "$40 - $95",
    crowdLevel: "Low",
    popularityScore: 4.8,
    locationName: "Nuwara Eliya / Tea Country",
    coords: { x: 48, y: 66 },
    highlights: [
      "Wear traditional harvest baskets and pluck tea with third-generation pickers",
      "See the industrial drying, rolling, and grading machinery from the 19th century",
      "Exclusive tea tasting masterclass exploring silver tips and broken orange pekoes",
      "Elegant high tea served on silver platters in a manicured colonial lawn garden"
    ],
    whatsIncluded: [
      "Private VIP guided estate and active factory tour",
      "Full traditional plucking attire and basket experience",
      "Expert tea master tasting session",
      "Colonial Estate premium High Tea reservation"
    ],
    comparison: {
      animals: "Highland birds, occasional mountain deer.",
      crowds: "Low, private and sophisticated estate grounds.",
      price: "$$ Moderate to $$$ Premium (high tea experience).",
      travelTime: "approx. 4.5 hours from Colombo.",
      bestSeason: "January to April (Dry spring creates the finest tea leaves).",
      familyFriendly: "Delightful (10/10) - very educational and charming for family members.",
      photography: "Gorgeously green (9/10) - lush, geometric crop lines and colonial estates."
    }
  },
  {
    id: "galle-fort-heritage-walk",
    title: "Galle Fort UNESCO Walkway",
    slug: "galle-fort-heritage-walk",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=800",
    shortSummary: "Wander cobblestone streets, Dutch colonial villas, and ocean battlements at sunset.",
    description: "Built by the Portuguese in 1588 and fortified heavily by the Dutch in the 17th century, Galle Fort is an outstanding living museum. Enclosed by thick granite sea walls, the fort is home to cobblestone alleys, ancient churches, boutique spice stores, vintage gem galleries, and the iconic white lighthouse.",
    categories: ["Cultural Experiences", "Photography Spots", "Food Experiences"],
    travelStyles: ["Culture", "Couple", "Luxury", "Family"],
    budgetTier: "Medium",
    bestMonths: ["January", "February", "March", "April", "May", "October", "November", "December"],
    duration: "Half Day",
    region: "South",
    difficulty: "Easy",
    estimatedCost: "$15 - $35",
    crowdLevel: "Moderate",
    popularityScore: 4.9,
    locationName: "Galle Fort",
    coords: { x: 32, y: 88 },
    highlights: [
      "Walk the sunset ramparts as kids fly kites and locals dive from high walls",
      "Photograph the postcard-perfect Galle Lighthouse framed by palm trees",
      "Browse sophisticated art galleries, vintage bookstores, and local linen shops",
      "Sip craft tea or premium cocktails in a restored 17th-century Dutch villa courtyard"
    ],
    whatsIncluded: [
      "UNESCO history expert walking guide",
      "Artisan gelato or fresh coconut stop",
      "VIP access inside the Dutch reformed church archives",
      "Curated shopping discount voucher book"
    ],
    comparison: {
      animals: "Marine turtles in adjacent coves, sea birds.",
      crowds: "Moderate, gets lively around sunset times.",
      price: "$ Free to walk, $$ Moderate for dining and boutique guides.",
      travelTime: "approx. 2 hours from Colombo via Southern Highway.",
      bestSeason: "December to April (perfect coastal dry winter skies).",
      familyFriendly: "Superb (10/10) - paved flat pathways are stroller-friendly.",
      photography: "Phenomenal (10/10) - colonial terracotta roofs, white stone, sunset sea walls."
    }
  },
  {
    id: "paddy-lake-trail",
    title: "The Paddy & Lake Trail",
    slug: "paddy-lake-trail",
    image: "https://idlebikes.com/wp-content/uploads/2025/04/Paddy-Lake.jpg",
    shortSummary: "A premium guided cycling tour through the emerald paddy fields and peaceful villages surrounding Koggala Lake.",
    description: "Experience the soul of southern Sri Lanka with a guided 26km cycling tour. Winding past lush rice fields, local temples, cinnamon gardens, and Koggala Lake, this gentle ride offers a deep dive into rural village life. Led by professional cycling guides, it features high-quality mountain bikes and helmet gear, a fresh king coconut refreshment stop, and seamless support.",
    categories: ["Hiking & Trekking", "Cultural Experiences", "Photography Spots"],
    travelStyles: ["Culture", "Adventure", "Couple", "Family"],
    budgetTier: "Low",
    bestMonths: ["January", "February", "March", "April", "May", "October", "November", "December"],
    duration: "Half Day",
    region: "South",
    difficulty: "Easy",
    estimatedCost: "$35",
    crowdLevel: "Low",
    popularityScore: 4.9,
    locationName: "Galle & Koggala",
    coords: { x: 35, y: 86 },
    highlights: [
      "Cycle 26km of pristine backcountry trails, paddy paths, and quiet lake-side roads",
      "Stop at a traditional family-run cinnamon garden to learn ancient harvesting secrets",
      "Bespoke high-quality mountain bikes, professional helmets, and safety gear included",
      "Quench your thirst with fresh king coconuts harvested straight from local palms"
    ],
    whatsIncluded: [
      "Premium well-maintained mountain bike & professional helmet safety gear",
      "English-speaking certified cycling guide & support crew",
      "Fresh local king coconuts and chilled bottled spring water",
      "Traditional home-hosted herbal tea & snack pit stop"
    ],
    comparison: {
      animals: "Spot peacocks, monitor lizards, purple-faced langur monkeys, and rich lake birdlife.",
      crowds: "Extremely peaceful; cycle away from vehicle exhaust on quiet village and farm tracks.",
      price: "$35 Fixed Price - High-value, premium guided eco-tour.",
      travelTime: "2.5 hours active cycling and touring, easily accessible from Galle Fort (15-min drive).",
      bestSeason: "December to April for dry weather, though beautiful year-round.",
      familyFriendly: "Excellent (9/10) - flat trails suitable for adults and children with basic riding skills.",
      photography: "Gorgeous (9/10) - vibrant green rice crop geometries, rural temples, and shimmering lake reflections."
    },
    provider: "Idle Bikes"
  },
  {
    id: "kitulgala-white-water-rafting",
    title: "White Water Rafting in Kitulgala",
    slug: "kitulgala-white-water-rafting",
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=800",
    shortSummary: "An exhilarating rafting adventure down the Kelani River, featuring 5 major rapids and 4 minor rapids through tropical rainforest.",
    description: "Dive into an epic aquatic adventure in Kitulgala, Sri Lanka's premier destination for eco-adventure sports. Navigating the majestic Kelani River, you will tackle Class II and III rapids, including iconic runs like 'Head Chopper', 'Virgin's Breast', and 'Butter Knife'. Guided by highly experienced international raft masters from Go Kitulgala and fully equipped with certified rescue gear, this tour delivers pure adrenaline in a safe and pristine jungle river environment.",
    categories: ["Hiking & Trekking", "Photography Spots"],
    travelStyles: ["Adventure", "Couple", "Family"],
    budgetTier: "Low",
    bestMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    duration: "Half Day",
    region: "Hill Country",
    difficulty: "Moderate",
    estimatedCost: "$30",
    crowdLevel: "Low",
    popularityScore: 4.8,
    locationName: "Kitulgala",
    coords: { x: 38, y: 55 },
    highlights: [
      "Navigate 5 major rapids and 4 minor rapids on the scenic Kelani River",
      "Action-packed 5km river run surrounded by pristine rainforest walls",
      "Modern, state-of-the-art raft gear, high-buoyancy life jackets, and rescue helmets",
      "Experience the famous 'Head Chopper' and 'Virgin's Breast' Class III rapids"
    ],
    whatsIncluded: [
      "Premium, certified life jackets, helmets, and composite paddles",
      "Professional, internationally certified river rafting instructor & safety briefing",
      "Access to modern changing rooms, shower facilities, and lockers",
      "Complimentary hot Ceylon tea after the river adventure"
    ],
    comparison: {
      animals: "Spot river monitors, kingfishers, and rare endemic butterflies along the lush banks.",
      crowds: "Moderately active on weekends; peaceful and highly private during weekdays.",
      price: "$30 Per Person - Incredible value for a fully guided professional water sports package.",
      travelTime: "2 hours from Colombo or Kandy, located conveniently along the Avissawella-Hatton road.",
      bestSeason: "December to April for optimal water levels, though available year-round.",
      familyFriendly: "Great (8/10) - safe for children over 8 years with adult supervision.",
      photography: "Sensational (9/10) - action photos of water splashes framed by tropical jungle cliffs."
    },
    provider: "Go Kitulgala"
  },
  {
    id: "kitesurf-lessons-kalpitiya",
    title: "Kitesurf Lessons in Kalpitiya",
    slug: "kitesurf-lessons-kalpitiya",
    image: "https://tse1.explicit.bing.net/th/id/OIP.wVpFFYsu6pTsZSRaSJh8YwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    shortSummary: "Master the wind at Kalpitiya Lagoon with certified IKO instructors from Margarita Kite School. We guide you, you do the magic!",
    description: "Kalpitiya is Sri Lanka's premier kitesurfing destination, boasting world-class wind conditions and flat shallow lagoons perfect for all levels. Experience personal, safe, and professional kitesurfing lessons with Margarita Kite School, an official IKO-certified center. Learn wind theory, safety systems, power zone kite flying, and board riding under the guidance of passionate local and international instructors. Using state-of-the-art Cabrinha and Core kites and specialized radio helmets, you'll fast-track your progression in a fun, safe, and highly encouraging environment.",
    categories: ["Surfing", "Photography Spots"],
    travelStyles: ["Adventure", "Couple", "Family"],
    budgetTier: "Medium",
    bestMonths: ["May", "June", "July", "August", "September", "December", "January", "February", "March"],
    duration: "Half Day",
    region: "North",
    difficulty: "Moderate",
    estimatedCost: "$65 - $420",
    crowdLevel: "Low",
    popularityScore: 4.9,
    locationName: "Kalpitiya Lagoon",
    coords: { x: 22, y: 35 },
    highlights: [
      "Learn from professional, IKO-certified multi-lingual kite instructors",
      "Train in the safe, shallow, and flat waters of Kalpitiya Lagoon",
      "Utilize premium, state-of-the-art Cabrinha and Core kite gear",
      "Two-way radio communication helmets for instant feedback while in the water"
    ],
    whatsIncluded: [
      "Full rental of premium kite, board, harness, and safety leash",
      "IKO Member Card certifying your level globally after the course",
      "Personalized instruction with specialized radio helmet guidance",
      "Boat rescue service and beach assistants on active standby"
    ],
    comparison: {
      animals: "Spot pods of dolphins on nearby boat tours and migratory seabirds over the sandspits.",
      crowds: "Wide, open lagoons with ample space; lessons are highly personalized and well-spaced.",
      price: "$65/hr or $420 for a 9-hour full course - Premium private or semi-private expert training.",
      travelTime: "3.5 hours drive north from Bandaranaike International Airport (Colombo).",
      bestSeason: "May to October (strong average 20-25 knots) and December to March (afternoon thermal wind).",
      familyFriendly: "Great (8/10) - children from 10+ years can learn safely with light-wind trainer kites.",
      photography: "Epic (10/10) - dynamic shots of kites against brilliant blue lagoons and golden sand dunes."
    },
    provider: "Margarita Kite School"
  }
];

// --- FAQ PRESET ---
const FAQ_ITEMS = [
  {
    category: "General Planning",
    question: "How do I choose between wildlife safaris in Sri Lanka?",
    answer: "Yala is the absolute best for spotting leopards, but it can get very crowded. Udawalawe is a flat savanna where wild elephant herds are 100% guaranteed, making it outstanding for families with young children. Kumana (Yala East) is a pristine bird-watcher's dream with zero crowds and occasional leopard tracking."
  },
  {
    category: "Seasonal Weather",
    question: "How does the dual monsoon affect activity planning?",
    answer: "Sri Lanka has two distinct weather systems. From May to September, the South & West coast experiences rains, making it the perfect time for the East Coast (Arugam Bay surfing, Trincomalee snorkeling). From December to April, the South & West are gloriously sunny (Mirissa whale watching, Galle Fort, Hill Country trains)."
  },
  {
    category: "Booking & Tickets",
    question: "Do I need to book the blue train tickets in advance?",
    answer: "Yes, absolutely. High-demand first and second-class reserved seats on the Kandy-Ella railway line must be secured 30 days prior. Plan Sri Lanka takes care of all ticket reservations, station boarding assistance, and baggage transfers for our clients."
  },
  {
    category: "Family Travel",
    question: "Which experiences are best suited for children and elders?",
    answer: "Galle Fort heritage walking, the Udawalawe elephant safari, and tea plantation high teas are low-fatigue, stroller-friendly, and highly engaging for multi-generational families. Challenging treks like Ella Rock or sunrise boulder climbing at Pidurangala are best suited for teenagers and active adults."
  }
];



// --- SUB-COMPONENTS ---
function FaqItemComponent({ faq }: { faq: typeof FAQ_ITEMS[0]; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-luxury-black/5 bg-luxury-cream/10 hover:border-luxury-gold transition-colors duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex justify-between items-center gap-4 text-luxury-green hover:text-luxury-gold font-serif"
      >
        <span className="font-bold text-sm md:text-base">{faq.question}</span>
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-luxury-black/5">
          <span className="text-xs font-bold">{isOpen ? "−" : "+"}</span>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 text-xs text-neutral-500 leading-relaxed font-light">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function SrilankaExperiencesPage() {
  const navigate = useNavigate();
  const experiencesListRef = useRef<HTMLDivElement>(null);

  // --- STATE MANAGEMENT ---
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  
  // Selected Experiences for Itinerary/Trip Planner
  const [myTripExperiences, setMyTripExperiences] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("plan_srilanka_saved_experiences");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Comparison State
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparisonView, setShowComparisonView] = useState(false);

  // Selected Detail Modal
  const [activeDetailExperience, setActiveDetailExperience] = useState<Experience | null>(null);

  // Success Alert Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Page Metadata SEO injection
  usePageMetadata({
    title: "Discover the Best Things to Do in Sri Lanka | Plan Sri Lanka",
    description: "Explore interactive wildlife safaris, beaches, scenic train journeys, surfing, tea plantation guides, and cultural heritage. Compare activities, filter by season, and add to your custom trip.",
    canonicalUrl: "https://plan-srilanka.com/things-to-do-in-sri-lanka",
    ogUrl: "https://plan-srilanka.com/things-to-do-in-sri-lanka",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  // Save to Local Storage whenever myTripExperiences changes
  useEffect(() => {
    localStorage.setItem("plan_srilanka_saved_experiences", JSON.stringify(myTripExperiences));
  }, [myTripExperiences]);

  // Show dynamic toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    const currentSrc = target.getAttribute("src") || target.src;
    if (currentSrc.toLowerCase().includes("whale-watching") || currentSrc.toLowerCase().includes("mirissa-blue-whale")) {
      const attempts = target.dataset.fallbackAttempts ? parseInt(target.dataset.fallbackAttempts, 10) : 0;
      const variants = [
        "/whale-watching-sri-lanka-Copy.jpg",
        "/whale-watching-sri-lanka-Copy.jpeg",
        "/whale-watching-sri-lanka-Copy.png",
        "/whale-watching-sri-lanka-Copy.webp",
        "/whale-watching-sri-lanka-Copy",
        "/whale-watching-sri-lanka-Copy.jpg.jpg",
        "/Whale-Watching-in-Mirissa-2.jpeg",
        "/Whale-Watching-in-Mirissa-2.jpg",
        "/Whale-Watching-in-Mirissa.jpg",
        "/mirissa-blue-whale-tail.jpg"
      ];
      if (attempts < variants.length) {
        target.dataset.fallbackAttempts = String(attempts + 1);
        target.src = variants[attempts];
      }
    } else if (currentSrc.toLowerCase().includes("sigiriya-lion-rock-citadel")) {
      const attempts = target.dataset.fallbackAttempts ? parseInt(target.dataset.fallbackAttempts, 10) : 0;
      const variants = [
        "/Sigiriya-Lion-Rock-Citadel.jpeg",
        "/Sigiriya-Lion-Rock-Citadel.jpg",
        "/sigiriya-lion-rock-citadel.jpeg",
        "/sigiriya-lion-rock-citadel.jpg",
        "https://images.unsplash.com/photo-1588598126710-530ced49b914?auto=format&fit=crop&q=80&w=800"
      ];
      if (attempts < variants.length) {
        target.dataset.fallbackAttempts = String(attempts + 1);
        target.src = variants[attempts];
      }
    }
  };

  // --- ACTION HANDLERS ---
  const toggleAddToTrip = (experienceId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const experience = EXPERIENCES.find(e => e.id === experienceId);
    if (!experience) return;

    if (myTripExperiences.includes(experienceId)) {
      setMyTripExperiences(prev => prev.filter(id => id !== experienceId));
      triggerToast(`Removed "${experience.title}" from your Trip Planner.`);
      trackEvent("experience_removed_from_trip", "planner_integration", experience.title);
    } else {
      setMyTripExperiences(prev => [...prev, experienceId]);
      triggerToast(`Successfully added "${experience.title}" to your Trip Planner!`);
      trackEvent("experience_added_to_trip", "planner_integration", experience.title);
    }
  };

  const handleToggleCompare = (experienceId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const experience = EXPERIENCES.find(e => e.id === experienceId);
    if (!experience) return;

    if (compareList.includes(experienceId)) {
      setCompareList(prev => prev.filter(id => id !== experienceId));
      trackEvent("compare_removed", "comparison", experience.title);
    } else {
      if (compareList.length >= 3) {
        triggerToast("You can compare a maximum of 3 experiences at once.");
        return;
      }
      setCompareList(prev => [...prev, experienceId]);
      setShowComparisonView(true);
      triggerToast(`Added "${experience.title}" to comparison checklist.`);
      trackEvent("compare_added", "comparison", experience.title);
    }
  };

  const clearAllFilters = () => {
    setSelectedMonth("All");
    trackEvent("all_filters_cleared", "experience_discovery", "reset_button");
    triggerToast("Filters reset successfully.");
  };

  // --- FILTER ENGINE ---
  const filteredExperiences = useMemo(() => {
    return EXPERIENCES.filter(exp => {
      // Month Selected
      if (selectedMonth && selectedMonth !== "All") {
        const matchesMonth = exp.bestMonths.some(m => m.toLowerCase() === selectedMonth.toLowerCase());
        if (!matchesMonth) return false;
      }

      return true;
    });
  }, [selectedMonth]);

  // Months lists
  const MONTHS_LIST = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-luxury-cream text-luxury-black min-h-screen relative font-sans antialiased selection:bg-luxury-gold/30 pt-20">
      
      {/* --------------------------------------------------
          SCHEMAS & SEO SEMANTICS
         -------------------------------------------------- */}
      <>
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
                "name": "Things to Do in Sri Lanka",
                "item": "https://plan-srilanka.com/things-to-do-in-sri-lanka"
              }
            ]
          })}
        </script>

        {/* TouristAttraction Schema / ItemList Schema for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Top Curated Experiences in Sri Lanka",
            "description": "Premium interactive experiences and curated activities in Sri Lanka including leopard safaris, cultural walks, hikes, and blue train rides.",
            "url": "https://plan-srilanka.com/things-to-do-in-sri-lanka",
            "numberOfItems": EXPERIENCES.length,
            "itemListElement": EXPERIENCES.map((exp, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "TouristAttraction",
                "name": exp.title,
                "description": exp.shortSummary,
                "image": exp.image,
                "touristType": exp.travelStyles,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": exp.locationName,
                  "addressCountry": "LK"
                }
              }
            }))
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQ_ITEMS.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </>

      {/* --------------------------------------------------
          DYNAMIC TOAST ALERT
         -------------------------------------------------- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 bg-[#1e3a2f] text-white py-4 px-6 rounded-2xl shadow-2xl z-50 flex items-center gap-3 text-xs font-medium border border-luxury-gold/20 max-w-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-luxury-gold shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------
          CURATED EXPERIENCES PORTAL
         -------------------------------------------------- */}
      <section ref={experiencesListRef} className="py-16 md:py-24 bg-[#FCFBF7] border-y border-luxury-black/5">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-luxury-gold font-serif italic text-sm block">Curated Collection</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight">
              Curated Sri Lanka Experiences
            </h2>
            <p className="text-xs md:text-sm text-luxury-black/60 max-w-xl mx-auto font-light">
              Explore the island's finest activities, from deep jungle wildlife tracking to colonial heritage walks.
            </p>
          </div>

          {/* ACTIVE FILTER STATUS PILLS AND COUNT */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-luxury-black/5 shadow-sm">
            <p className="text-xs font-semibold text-luxury-green">
              Showing <span className="text-luxury-gold font-bold text-sm">{filteredExperiences.length}</span> matching experiences
            </p>

            {selectedMonth !== "All" && (
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-orange-50 border border-orange-100 text-orange-800 text-[10px] px-2 py-1 rounded-full font-bold uppercase flex items-center gap-1">
                  <span>Month: {selectedMonth}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMonth("All")} />
                </span>
              </div>
            )}
          </div>

          {/* EXPERIENCES RESULTS GRID (3 COLUMNS ON DESKTOP) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((exp) => (
                <motion.div
                  layout
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    setActiveDetailExperience(exp);
                    trackEvent("experience_card_click", "experience_discovery", exp.title);
                  }}
                  className="group bg-white rounded-3xl overflow-hidden border border-luxury-black/5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  {/* Experience visual frame */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Rating block */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-luxury-green shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>{exp.popularityScore} Score</span>
                    </div>

                    {/* Add to Trip list button / Direct WhatsApp button */}
                    {exp.id === "pigeon-island-snorkeling" ? (
                      <a
                        href="https://wa.me/94717251024?text=Hi!%20I%20want%20to%20inquire%20about%20Pigeon%20Island%20Coral%20Snorkeling"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackEvent("whatsapp_click", "conversion", "pigeon_island_card_top_button");
                        }}
                        className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-md backdrop-blur-sm transition-all z-10"
                        title="Direct WhatsApp: +94 717 251 024"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                    ) : (
                      <button
                        onClick={(e) => toggleAddToTrip(exp.id, e)}
                        className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all shadow-sm ${
                          myTripExperiences.includes(exp.id)
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white/80 text-[#1e3a2f] hover:bg-white"
                        }`}
                        title={myTripExperiences.includes(exp.id) ? "Remove from my trip planner" : "Add to trip planner"}
                      >
                        <Heart className={`w-4 h-4 ${myTripExperiences.includes(exp.id) ? "fill-white text-white" : ""}`} />
                      </button>
                    )}

                    {/* Region & Location overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-[10px] font-mono uppercase tracking-wider font-bold">
                      <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>{exp.locationName}</span>
                    </div>
                  </div>

                  {/* Content block */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.categories.slice(0, 1).map(cat => (
                          <span key={cat} className="text-[8px] font-mono uppercase font-bold tracking-widest bg-luxury-gold/15 text-luxury-gold px-2 py-0.5 rounded-md">
                            {cat}
                          </span>
                        ))}
                        <span className="text-[8px] font-mono uppercase font-bold tracking-widest bg-luxury-green/10 text-luxury-green px-2 py-0.5 rounded-md">
                          {exp.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-luxury-green font-bold tracking-tight group-hover:text-luxury-gold transition-colors line-clamp-1">
                        {exp.title}
                      </h3>
                      {exp.provider && (
                        <p className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider font-bold">
                          Operator: {exp.provider}
                        </p>
                      )}
                      <p className="text-xs text-luxury-black/60 font-light leading-relaxed line-clamp-3">
                        {exp.shortSummary}
                      </p>
                      {(exp.id === "paddy-lake-trail" || exp.id === "kitulgala-white-water-rafting" || exp.id === "kitesurf-lessons-kalpitiya" || exp.id === "pigeon-island-snorkeling") && (
                        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={
                              exp.id === "paddy-lake-trail" ? "https://wa.me/94777906156" : 
                              exp.id === "kitulgala-white-water-rafting" ? "https://wa.me/94777163543" : 
                              exp.id === "kitesurf-lessons-kalpitiya" ? "https://wa.me/94773686235" : 
                              "https://wa.me/94717251024?text=Hi!%20I%20want%20to%20inquire%20about%20Pigeon%20Island%20Coral%20Snorkeling"
                            } 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all shadow-sm"
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/10" />
                            <span>
                              Contact {exp.provider || "Direct"}: {
                                exp.id === "paddy-lake-trail" ? "+94 77 790 6156" : 
                                exp.id === "kitulgala-white-water-rafting" ? "+94 77 716 3543" : 
                                exp.id === "kitesurf-lessons-kalpitiya" ? "+94 77 368 6235" : 
                                "+94 717 251 024"
                              }
                            </span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Stats grid widget */}
                    <div className="grid grid-cols-3 gap-2 border-y border-luxury-black/5 py-3 text-[10px] font-mono text-neutral-500">
                      <div>
                        <span className="block text-[8px] text-neutral-400 uppercase font-sans">Difficulty</span>
                        <span className="font-bold text-luxury-green">{exp.difficulty}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-neutral-400 uppercase font-sans">Crowds</span>
                        <span className="font-bold text-luxury-green">{exp.crowdLevel}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-neutral-400 uppercase font-sans">Est. Cost</span>
                        <span className="font-bold text-luxury-gold">{exp.estimatedCost}</span>
                      </div>
                    </div>

                    {/* Interactive trigger bar */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={(e) => handleToggleCompare(exp.id, e)}
                        className={`text-[10px] font-mono uppercase font-bold tracking-widest flex items-center gap-1 transition-colors ${
                          compareList.includes(exp.id) 
                            ? "text-luxury-gold" 
                            : "text-luxury-black/40 hover:text-luxury-green"
                        }`}
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>{compareList.includes(exp.id) ? "Comparing" : "Compare"}</span>
                      </button>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-luxury-green uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
                      </span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {filteredExperiences.length === 0 && (
              <div className="col-span-full py-16 text-center space-y-4 bg-white rounded-3xl border border-dashed border-neutral-300">
                <span className="text-4xl">🏝️</span>
                <h3 className="text-lg font-serif font-bold text-luxury-green">
                  No matching experiences found
                </h3>
                <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                  Try adjusting your seasonal month selectors or resetting your filters.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#1A2F23] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow hover:bg-luxury-gold transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------
          BEST EXPERIENCES BY MONTH (TIMELINE BAR)
         -------------------------------------------------- */}
      <section className="py-20 bg-luxury-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-luxury-gold font-serif italic text-lg block">Seasonal Planning Guide</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight animate-pulse">
              Best Experiences By Month
            </h2>
            <p className="text-xs md:text-sm text-luxury-black/60 max-w-xl mx-auto font-light">
              Tap a month to discover which spectacular activities are recommended during that period.
            </p>
          </div>

          {/* Horizontal scroll month bar */}
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-none snap-x justify-start md:justify-center px-4">
            {MONTHS_LIST.map((month) => (
              <button
                key={month}
                onClick={() => {
                  setSelectedMonth(month);
                  trackEvent("month_slider_click", "experience_discovery", month);
                  // scroll down to list
                  setTimeout(() => {
                    experiencesListRef.current?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className={`snap-center px-5 py-3 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                  selectedMonth === month 
                    ? "bg-[#1A2F23] text-white border-[#1A2F23] shadow-md scale-105" 
                    : "bg-white border-luxury-black/5 text-luxury-black/60 hover:border-luxury-gold"
                }`}
              >
                {month === "All" ? "Calendar (All)" : month.slice(0, 3)}
              </button>
            ))}
          </div>

          {/* Mini recommendation teaser board */}
          {selectedMonth !== "All" && (
            <div className="p-6 bg-white rounded-3xl border border-luxury-black/5 shadow-sm max-w-2xl mx-auto text-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-luxury-gold">
                Featured Recommended Spot in {selectedMonth}
              </span>
              <p className="text-xs text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
                {(selectedMonth === "August" || selectedMonth === "September" || selectedMonth === "July" || selectedMonth === "June" || selectedMonth === "May") ? (
                  "The dry East Coast peaks during this window. Outstanding for surfing Arugam Bay, coral snorkeling at Pigeon Island Nilaveli, and safe wildlife elephant safaris at Kumana / Minneriya."
                ) : (
                  "The gorgeous South & West coast and Ella valleys are exceptionally dry and sunny. Excellent for whale watching in Mirissa, Sigiriya Lion Rock ascents, Galle Fort walks, and scenic blue train rides."
                )}
              </p>
              <button 
                onClick={() => experiencesListRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 text-xs text-luxury-green font-bold uppercase tracking-wider border-b border-luxury-gold"
              >
                <span>View {selectedMonth} Experiences</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* --------------------------------------------------
          INTERACTIVE SIDE-BY-SIDE COMPARISON MODAL/DRAWER
         -------------------------------------------------- */}
      <AnimatePresence>
        {showComparisonView && compareList.length > 0 && (
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed inset-x-0 bottom-0 bg-white z-40 border-t border-luxury-black/10 shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.15)] rounded-t-[40px] max-h-[85vh] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto p-6 space-y-6">
              
              <div className="flex items-center justify-between border-b border-luxury-black/5 pb-4">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-luxury-gold" />
                  <h3 className="text-lg font-serif font-bold text-luxury-green">
                    Experience Comparison Checklist ({compareList.length}/3)
                  </h3>
                </div>
                
                <button 
                  onClick={() => setShowComparisonView(false)}
                  className="p-2 border border-neutral-200 hover:border-luxury-gold hover:text-luxury-gold rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Comparison Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start divide-y md:divide-y-0 md:divide-x divide-neutral-200">
                
                {/* Side parameters tag labels column */}
                <div className="hidden md:block space-y-8 pr-4 pt-12 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <div>Animals & Nature</div>
                  <div>Crowds</div>
                  <div>Pricings & Permits</div>
                  <div>Travel Time</div>
                  <div>Best Season</div>
                  <div>Family Friendly</div>
                  <div>Photography Potential</div>
                </div>

                {/* Compared items loop columns */}
                {compareList.map((id) => {
                  const exp = EXPERIENCES.find(e => e.id === id);
                  if (!exp) return null;
                  return (
                    <div key={exp.id} className="space-y-6 pt-4 md:pt-0">
                      
                      {/* Compact card heading */}
                      <div className="flex gap-3 items-center">
                        <img 
                          src={exp.image} 
                          alt={exp.title}
                          className="w-14 h-14 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                        <div className="space-y-1">
                          <h4 className="text-xs font-serif font-black text-luxury-green line-clamp-1">{exp.title}</h4>
                          <span className="text-[9px] font-mono uppercase bg-luxury-cream text-luxury-gold border border-luxury-gold/30 px-1.5 py-0.5 rounded block w-fit">
                            {exp.region} Region
                          </span>
                          <button
                            onClick={() => setCompareList(prev => prev.filter(cid => cid !== exp.id))}
                            className="text-[9px] font-mono text-red-500 underline uppercase hover:text-red-700 block"
                          >
                            Remove comparison
                          </button>
                        </div>
                      </div>

                      {/* Content block row metrics */}
                      <div className="space-y-4 text-xs font-sans text-neutral-600">
                        <div className="md:border-none border-b pb-2">
                          <span className="block md:hidden text-[9px] font-bold text-neutral-400 uppercase">Animals & Nature</span>
                          <p className="font-light leading-relaxed">{exp.comparison.animals}</p>
                        </div>
                        <div className="md:border-none border-b pb-2">
                          <span className="block md:hidden text-[9px] font-bold text-neutral-400 uppercase">Crowds</span>
                          <p className="font-bold text-luxury-green">{exp.comparison.crowds}</p>
                        </div>
                        <div className="md:border-none border-b pb-2">
                          <span className="block md:hidden text-[9px] font-bold text-neutral-400 uppercase">Pricings & Permits</span>
                          <p className="font-bold text-luxury-gold">{exp.comparison.price}</p>
                        </div>
                        <div className="md:border-none border-b pb-2">
                          <span className="block md:hidden text-[9px] font-bold text-neutral-400 uppercase">Travel Time</span>
                          <p className="font-light">{exp.comparison.travelTime}</p>
                        </div>
                        <div className="md:border-none border-b pb-2">
                          <span className="block md:hidden text-[9px] font-bold text-neutral-400 uppercase">Best Season</span>
                          <p className="font-light">{exp.comparison.bestSeason}</p>
                        </div>
                        <div className="md:border-none border-b pb-2">
                          <span className="block md:hidden text-[9px] font-bold text-neutral-400 uppercase">Family Friendly</span>
                          <p className="font-light leading-relaxed">{exp.comparison.familyFriendly}</p>
                        </div>
                        <div className="md:border-none border-b pb-2">
                          <span className="block md:hidden text-[9px] font-bold text-neutral-400 uppercase">Photography Potential</span>
                          <p className="font-light leading-relaxed">{exp.comparison.photography}</p>
                        </div>

                        {/* Interactive actions inside сравнение */}
                        <div className="pt-2 flex flex-col gap-2">
                          <button
                            onClick={(e) => toggleAddToTrip(exp.id, e)}
                            className="w-full py-2.5 bg-luxury-green text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all"
                          >
                            {myTripExperiences.includes(exp.id) ? "✓ Added in Trip" : "Add to My Trip"}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}

                {/* If slot empty box indicator */}
                {compareList.length < 3 && (
                  <div className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 p-8 rounded-2xl h-full text-center space-y-3 min-h-[300px]">
                    <span className="text-2xl text-neutral-400">⚖️</span>
                    <p className="text-xs font-semibold text-neutral-400 uppercase">Empty Compare Slot</p>
                    <p className="text-[10px] text-neutral-400 font-light">Add another experience from cards list above to cross reference.</p>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------
          PERSISTENT FLOATING TRIP PLANNER INTEGRATION PANEL (CART)
         -------------------------------------------------- */}
      <AnimatePresence>
        {myTripExperiences.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-40 bg-white border border-luxury-green/10 p-5 rounded-3xl shadow-2xl flex items-center gap-6 max-w-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold font-bold">
                {myTripExperiences.length}
              </div>
              <div>
                <h4 className="text-sm font-serif font-bold text-luxury-green leading-none mb-1">
                  My Trip Planner
                </h4>
                <p className="text-[10px] text-neutral-400 font-light">
                  {myTripExperiences.length} experiences selected
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  trackEvent("planner_integration_draft_itinerary", "experience_discovery", myTripExperiences.join(","));
                  navigate("/sri-lanka-trip-planner");
                }}
                className="px-5 py-3 bg-[#1A2F23] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-luxury-gold transition-colors block text-center shadow-md whitespace-nowrap"
              >
                Build Itinerary
              </button>
              
              <button 
                onClick={() => {
                  setMyTripExperiences([]);
                  triggerToast("Cleared saved experiences.");
                }}
                className="p-2 border border-neutral-200 hover:border-red-400 text-neutral-400 hover:text-red-500 rounded-xl transition-colors"
                title="Clear selection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------
          EXPERIENCE DETAILS OVERLAY DRAWER MODAL
         -------------------------------------------------- */}
      <AnimatePresence>
        {activeDetailExperience && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex justify-center items-center p-4"
            onClick={() => setActiveDetailExperience(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button overlay */}
              <button 
                onClick={() => setActiveDetailExperience(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                
                {/* Left side Image with stats */}
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <img 
                    src={activeDetailExperience.image} 
                    alt={activeDetailExperience.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 space-y-3 text-white">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[9px] font-mono uppercase bg-luxury-gold tracking-widest px-2.5 py-0.5 rounded-md block w-fit">
                        {activeDetailExperience.region} Region
                      </span>
                      {activeDetailExperience.provider && (
                        <span className="text-[9px] font-mono uppercase bg-emerald-600 text-white tracking-widest px-2.5 py-0.5 rounded-md block w-fit font-bold">
                          Operator: {activeDetailExperience.provider}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif leading-none font-bold">
                      {activeDetailExperience.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-luxury-gold font-mono">
                      <MapPin className="w-4 h-4" />
                      <span>{activeDetailExperience.locationName}</span>
                    </div>
                  </div>
                </div>

                {/* Right side information details */}
                <div className="p-8 space-y-6 overflow-y-auto max-h-[80vh]">
                  
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                      Experience Summary
                    </span>
                    <p className="text-xs text-neutral-500 leading-relaxed font-light font-sans">
                      {activeDetailExperience.description}
                    </p>
                  </div>

                  {/* Highlights section list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-green font-sans border-b pb-2">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {activeDetailExperience.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2 items-start text-xs font-light text-neutral-600">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What's Included */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-luxury-green font-sans border-b pb-2">
                      Included with Plan Sri Lanka Concierge
                    </h4>
                    <ul className="space-y-2">
                      {activeDetailExperience.whatsIncluded.map((w, i) => (
                        <li key={i} className="flex gap-2 items-start text-xs font-light text-neutral-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WhatsApp contact section inside detail modal */}
                  {(activeDetailExperience.id === "paddy-lake-trail" || activeDetailExperience.id === "kitulgala-white-water-rafting" || activeDetailExperience.id === "kitesurf-lessons-kalpitiya" || activeDetailExperience.id === "whale-watching-mirissa" || activeDetailExperience.id === "pigeon-island-snorkeling") && (
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                        <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/10" />
                        <span>Direct Booking & Inquiry</span>
                      </div>
                      <p className="text-[11px] text-emerald-950 font-light leading-relaxed">
                        {activeDetailExperience.id === "paddy-lake-trail" 
                          ? "Have questions about the cycle route, bike sizes, or custom timings? Connect with the tour guides directly on WhatsApp."
                          : activeDetailExperience.id === "kitulgala-white-water-rafting"
                            ? "Have questions about the river rapids, gear requirements, or custom timings? Connect with the raft masters directly on WhatsApp."
                            : activeDetailExperience.id === "kitesurf-lessons-kalpitiya"
                              ? "Have questions about kitesurfing lessons, wind conditions, or course bookings? Connect with the kite masters directly on WhatsApp."
                              : activeDetailExperience.id === "pigeon-island-snorkeling"
                                ? "Have questions about Nilaveli boat transfers, marine park permits, turtle snorkeling, or equipment? Connect directly on WhatsApp."
                                : "Have questions about boat departure times, sea-sickness prevention, or direct bookings? Connect with Geeth directly on WhatsApp."}
                      </p>
                      <a 
                        href={
                          activeDetailExperience.id === "paddy-lake-trail" ? "https://wa.me/94777906156" : 
                          activeDetailExperience.id === "kitulgala-white-water-rafting" ? "https://wa.me/94777163543" : 
                          activeDetailExperience.id === "kitesurf-lessons-kalpitiya" ? "https://wa.me/94773686235" : 
                          activeDetailExperience.id === "pigeon-island-snorkeling" ? "https://wa.me/94717251024?text=Hi!%20I%20want%20to%20inquire%20about%20Pigeon%20Island%20Coral%20Snorkeling" :
                          "https://wa.me/94718324015"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                        <span>
                          Message {
                            activeDetailExperience.id === "paddy-lake-trail" ? "+94 77 790 6156" : 
                            activeDetailExperience.id === "kitulgala-white-water-rafting" ? "+94 77 716 3543" : 
                            activeDetailExperience.id === "kitesurf-lessons-kalpitiya" ? "+94 77 368 6235" : 
                            activeDetailExperience.id === "pigeon-island-snorkeling" ? "+94 717 251 024" :
                            "+94 71 832 4015"
                          }
                        </span>
                      </a>
                    </div>
                  )}

                  {/* Action buttons inside drawer */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {activeDetailExperience.id === "pigeon-island-snorkeling" ? (
                      <a
                        href="https://wa.me/94717251024?text=Hi!%20I%20want%20to%20inquire%20about%20Pigeon%20Island%20Coral%20Snorkeling"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                        <span>WhatsApp: +94 717 251 024</span>
                      </a>
                    ) : (
                      <button
                        onClick={(e) => {
                          toggleAddToTrip(activeDetailExperience.id, e);
                          setActiveDetailExperience(null);
                        }}
                        className="flex-1 py-4 bg-luxury-green hover:bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{myTripExperiences.includes(activeDetailExperience.id) ? "Remove from Itinerary" : "Add to My Trip"}</span>
                      </button>
                    )}
                    
                    <button
                      onClick={(e) => {
                        handleToggleCompare(activeDetailExperience.id, e);
                        setActiveDetailExperience(null);
                      }}
                      className="px-5 py-4 border border-neutral-200 hover:border-luxury-gold hover:text-luxury-gold text-[#1e3a2f] font-bold uppercase tracking-widest text-xs rounded-xl transition-all"
                    >
                      ⚖️ Compare
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------
          WHY TRAVELERS LOVE PLAN SRI LANKA TRUST SECTOR
         -------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-luxury-gold font-serif italic text-lg block">The Concierge Standard</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight">
            Why Discerning Travelers Love This
          </h2>
          <p className="text-sm text-luxury-black/60 max-w-xl mx-auto font-light">
            We operate beyond standard mass-market tour packages. Here is the Plan Sri Lanka commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 bg-white border border-luxury-black/5 rounded-3xl space-y-4 shadow-sm relative group hover:border-luxury-gold transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-luxury-green font-bold">
              Real Local Travel Times
            </h3>
            <p className="text-xs text-luxury-black/70 font-light leading-relaxed">
              We never ignore the real winding curves of mountainous hill roads or coastal traffic. Our route calculators utilize actual historical speed limits so your family never spends the holiday exhausted inside taxis.
            </p>
          </div>

          <div className="p-8 bg-white border border-luxury-black/5 rounded-3xl space-y-4 shadow-sm relative group hover:border-luxury-gold transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100/60 flex items-center justify-center text-cyan-600">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-luxury-green font-bold">
              Monsoon-Safe Scheduling
            </h3>
            <p className="text-xs text-luxury-black/70 font-light leading-relaxed">
              Our platform factors in the dual southwest and northeast monsoons. You will receive customized weather alerts for wet zone regions, guaranteeing sunny skies on whichever coast you decide to explore.
            </p>
          </div>

          <div className="p-8 bg-white border border-luxury-black/5 rounded-3xl space-y-4 shadow-sm relative group hover:border-luxury-gold transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-luxury-green font-bold">
              Expert Naturalist Audits
            </h3>
            <p className="text-xs text-luxury-black/70 font-light leading-relaxed">
              We exclusively partner with ISA-certified surf schools, licensed whale-conservation speedboats, and professional university-educated archaeologists. Enjoy rich, uncompromised historical context.
            </p>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------
          FAQ ACCORDION COMPONENT
         -------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-white border-t border-luxury-black/5">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-luxury-gold font-serif italic text-lg block">Island Intelligence Desk</span>
            <h2 className="text-3xl md:text-4xl font-serif text-luxury-green">
              Frequently Asked Questions
            </h2>
            <p className="text-xs md:text-sm text-luxury-black/60 font-light">
              Eliminate hesitation. Get direct, clear guidance for planning spectacular experiences.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <FaqItemComponent key={index} faq={faq} />
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------
          FINAL EMBEDDED CTA BANNER
         -------------------------------------------------- */}
      <section className="py-24 bg-luxury-green px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-luxury-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-luxury-gold font-serif italic text-lg block">Bespoke Island Tailoring</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white leading-tight">
            Ready to design your <br />
            custom Sri Lanka loop?
          </h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light font-sans">
            Connect with our London or Colombo concierge desks. We will compile your favorite selected experiences into a seamless private family itinerary with luxury transfers and boutique resorts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="https://wa.me/94722968210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-luxury-gold hover:bg-white hover:text-black text-white font-bold rounded-full text-xs uppercase tracking-[0.2em] shadow-xl transition-all"
              onClick={() => trackEvent("experience_cta_whatsapp_click", "conversion", "bottom_banner")}
            >
              Start Private Journey (WhatsApp)
            </a>
            <Link 
              to="/sri-lanka-trip-planner"
              className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-xs uppercase tracking-[0.2em] border border-white/20 transition-all text-center"
            >
              Custom Route Planner
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
