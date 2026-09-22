import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  Compass,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Info,
  Car,
  Trees,
  Binoculars,
  Bird,
  Anchor,
  HelpCircle,
  AlertTriangle,
  Check,
  Share2,
  MessageSquare,
  DollarSign
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface ParkInfo {
  id: string;
  name: string;
  region: string;
  primaryAnimals: string[];
  bestMonths: string;
  crowdLevel: "High" | "Moderate" | "Low (Peaceful)";
  highlights: string;
  bestFor: string;
  category: "leopard" | "elephant" | "bear" | "bird" | "boat";
  image: string;
}

const PARKS_LIST: ParkInfo[] = [
  {
    id: "yala",
    name: "Yala National Park",
    region: "Southeast (Tissamaharama)",
    primaryAnimals: ["Leopards", "Elephants", "Spotted Deer", "Crocodiles", "Sloth Bears"],
    bestMonths: "February – July",
    crowdLevel: "High",
    highlights: "World's highest density of Sri Lankan leopards (Panthera pardus kotiya). Coastal shrubland and lagoons.",
    bestFor: "First-timers & Leopard Seekers",
    category: "leopard",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "wilpattu",
    name: "Wilpattu National Park",
    region: "Northwest (Anuradhapura)",
    primaryAnimals: ["Leopards", "Sloth Bears", "Elephants", "Barking Deer", "Villus Birdlife"],
    bestMonths: "February – October",
    crowdLevel: "Moderate",
    highlights: "Sri Lanka's largest national park famous for natural rainwater lakes ('Villus') and dense jungle tracks.",
    bestFor: "Peaceful Safaris & Sloth Bears",
    category: "leopard",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "udawalawe",
    name: "Udawalawe National Park",
    region: "South-Central (Embilipitiya)",
    primaryAnimals: ["Asian Elephants", "Water Buffalo", "Monitor Lizards", "Eagles"],
    bestMonths: "Year-Round (Best Oct – April)",
    crowdLevel: "Moderate",
    highlights: "Open grasslands and reservoir backdrop offering 99% guaranteed elephant herd sightings.",
    bestFor: "Guaranteed Elephant Herd Encounters",
    category: "elephant",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "minneriya",
    name: "Minneriya National Park",
    region: "Cultural Triangle (Sigiriya/Habarana)",
    primaryAnimals: ["Asian Elephants (Gathering)", "Painted Storks", "Pelicans", "Deer"],
    bestMonths: "July – October (The Gathering)",
    crowdLevel: "High (In Peak Season)",
    highlights: "The seasonal 'Elephant Gathering' where up to 300+ wild elephants assemble around the ancient reservoir.",
    bestFor: "The World-Famous Elephant Gathering",
    category: "elephant",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kaudulla",
    name: "Kaudulla National Park",
    region: "Cultural Triangle (Polonnaruwa)",
    primaryAnimals: ["Asian Elephants", "Sambhur Deer", "Water Birds", "Wild Boar"],
    bestMonths: "August – December",
    crowdLevel: "Moderate",
    highlights: "Connected wildlife corridor with Minneriya. Elephants migrate between the two parks based on water levels.",
    bestFor: "Cultural Triangle Safari Add-on",
    category: "elephant",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "wasgamuwa",
    name: "Wasgamuwa National Park",
    region: "Central-East (Matale/Polonnaruwa)",
    primaryAnimals: ["Wild Elephants", "Sloth Bears", "Purple-faced Langurs", "Marsh Crocodiles"],
    bestMonths: "November – May",
    crowdLevel: "Low (Peaceful)",
    highlights: "Off-the-beaten-track wilderness with lush riverine forests and uncrowded safari trails.",
    bestFor: "Quiet Nature & Uncrowded Safaris",
    category: "bear",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "bundala",
    name: "Bundala National Park",
    region: "Deep South (Hambantota)",
    primaryAnimals: ["Greater Flamingos", "Migratory Waders", "Estuarine Crocodiles", "Elephants"],
    bestMonths: "September – March (Bird Migration)",
    crowdLevel: "Low (Peaceful)",
    highlights: "UNESCO Biosphere Reserve & RAMSAR wetland. Over 200 species of resident and migratory birds.",
    bestFor: "Bird Watching & Coastal Wetlands",
    category: "bird",
    image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "galoya",
    name: "Gal Oya National Park",
    region: "Eastern Border (Ampara)",
    primaryAnimals: ["Swimming Elephants", "Rare Birds", "White-bellied Sea Eagles", "Mugger Crocodiles"],
    bestMonths: "March – July",
    crowdLevel: "Low (Peaceful)",
    highlights: "Sri Lanka's only national park offering boat safaris on Senanayake Samudra lake to spot elephants swimming between islands.",
    bestFor: "Unique Boat Safaris & Island Elephants",
    category: "boat",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  }
];

export default function SrilankaWhichNationalParkPage() {
  usePageMetadata({
    title: "Which National Park Should You Visit in Sri Lanka? (2026 Safari Guide)",
    description: "Compare Yala, Wilpattu, Udawalawe, Minneriya, Kaudulla, Wasgamuwa, Bundala & Gal Oya. Find the best Sri Lanka national park based on leopards, elephants, season, and route.",
    canonicalUrl: "https://plan-srilanka.com/which-national-park-to-visit-sri-lanka",
    ogUrl: "https://plan-srilanka.com/which-national-park-to-visit-sri-lanka",
    ogImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredParks = filterCategory === "all"
    ? PARKS_LIST
    : PARKS_LIST.filter(p => p.category === filterCategory);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Which National Park Should You Visit in Sri Lanka? (2026 Safari Guide)",
    "description": "Comprehensive comparative guide to choosing the best national park in Sri Lanka for leopards, elephant herds, sloth bears, birds, and private chauffeur travel routes.",
    "url": "https://plan-srilanka.com/which-national-park-to-visit-sri-lanka",
    "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200&h=630",
    "author": {
      "@type": "Organization",
      "name": "Plan Sri Lanka Concierge Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Plan Sri Lanka",
      "logo": {
        "@type": "ImageObject",
        "url": "https://plan-srilanka.com/logo.png"
      }
    }
  };

  const faqs = [
    {
      q: "Which national park in Sri Lanka is best for seeing leopards?",
      a: "Yala National Park (Block 1) has the highest concentration of leopards in the world, making it the top choice for sightings. However, Wilpattu National Park is an exceptional alternative with large lakes ('villus'), fewer crowds, and equally magnificent leopard tracking."
    },
    {
      q: "Where can I guarantee seeing Asian Elephants in Sri Lanka?",
      a: "Udawalawe National Park offers near 100% year-round wild elephant sightings due to its open grassland reservoir topography. If visiting between July and October, Minneriya and Kaudulla host the world-famous 'Elephant Gathering' where hundreds assemble at the water's edge."
    },
    {
      q: "Can I do a safari in Sri Lanka without booking a tour package?",
      a: "Yes! The most efficient way is hiring a private SLTDA-certified chauffeur driver for your island journey. Your private driver handles highway transit to park gates (Yala, Udawalawe, Wilpattu), while 4x4 safari jeeps and park tickets are purchased directly at the official park entrance."
    },
    {
      q: "What is the best time of day for a Sri Lankan wildlife safari?",
      a: "Early morning (6:00 AM – 9:00 AM) and late afternoon (3:00 PM – 6:00 PM) are peak wildlife hours. Predators like leopards and sloth bears hunt during cooler hours, while elephants congregate around watering holes before sunset."
    },
    {
      q: "Are wildlife sightings guaranteed on a Sri Lanka safari?",
      a: "No. A national park safari is a wild natural habitat — not a zoo. Sightings depend on season, weather, animal movements, and experienced park tracker guides."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com/" },
      { "@type": "ListItem", "position": 2, "name": "Things to Do", "item": "https://plan-srilanka.com/things-to-do-in-sri-lanka" },
      { "@type": "ListItem", "position": 3, "name": "Which National Park to Visit", "item": "https://plan-srilanka.com/which-national-park-to-visit-sri-lanka" }
    ]
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1e3a2f] min-h-screen font-sans antialiased selection:bg-[#d4af37]/30 pt-24 md:pt-28">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO SECTION */}
      <section className="relative bg-[#1e3a2f] text-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a2f]/60 via-[#1e3a2f]/85 to-[#1e3a2f] z-10" />
        <img
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1600&h=900"
          alt="Sri Lanka Wildlife Safari Leopard in Yala National Park"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        />

        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
            <Binoculars className="w-4 h-4" /> 2026 Wildlife Safari & Route Blueprint
          </div>

          <h1 className="text-3xl md:text-6xl font-serif text-white leading-tight">
            Which National Park Should You Visit <br />
            <span className="italic text-[#d4af37]">In Sri Lanka?</span>
          </h1>

          <p className="text-sm md:text-base text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            Planning a wildlife safari in Sri Lanka? Many travelers only know Yala, but the island boasts 8 distinct national parks — each offering a completely unique ecosystem. Instead of picking a park simply because it is famous, choose based on the wildlife you want to see, your travel route, and your schedule.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-[10px] font-mono text-[#d4af37] uppercase font-bold block">For Leopards</span>
              <p className="text-xs text-white font-serif font-bold mt-1">Yala & Wilpattu</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-[10px] font-mono text-[#d4af37] uppercase font-bold block">For Elephants</span>
              <p className="text-xs text-white font-serif font-bold mt-1">Udawalawe & Minneriya</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-[10px] font-mono text-[#d4af37] uppercase font-bold block">For Birds & Boat</span>
              <p className="text-xs text-white font-serif font-bold mt-1">Bundala & Gal Oya</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-[10px] font-mono text-[#d4af37] uppercase font-bold block">Chauffeur Transit</span>
              <p className="text-xs text-white font-serif font-bold mt-1">100% Flexible Routes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER TABS & PARK GRID */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
            Filter By Target Wildlife Experience
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
            Choose Your Park By Animal Preference
          </h2>
          <p className="text-xs md:text-sm text-[#3a4d44] font-light max-w-2xl mx-auto">
            Select what you hope to see most on your safari loop to filter Sri Lanka's top 8 wildlife reserves.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "All 8 Parks" },
            { id: "leopard", label: "🐆 Leopards" },
            { id: "elephant", label: "🐘 Elephant Herds" },
            { id: "bear", label: "🐻 Sloth Bears & Wilds" },
            { id: "bird", label: "🦩 Birds & Wetlands" },
            { id: "boat", label: "🚤 Boat Safaris" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setFilterCategory(tab.id);
                trackEvent("filter_park_category", "engagement", tab.id);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                filterCategory === tab.id
                  ? "bg-[#1e3a2f] text-[#d4af37] shadow-lg scale-105"
                  : "bg-white border border-[#1e3a2f]/15 text-[#1e3a2f] hover:border-[#d4af37]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Parks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredParks.map(park => (
            <div
              key={park.id}
              className="bg-white border border-[#1e3a2f]/10 rounded-[28px] overflow-hidden hover:border-[#d4af37] transition-all flex flex-col justify-between shadow-sm hover:shadow-xl group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={park.image}
                    alt={park.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#1e3a2f]/90 text-[#d4af37] px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                    {park.crowdLevel} Crowds
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 text-[#1e3a2f] px-3 py-1 rounded-full text-[10px] font-mono font-bold shadow">
                    📍 {park.region}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">
                      {park.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-[#d4af37] uppercase tracking-wider block mt-0.5">
                      ⭐ Best For: {park.bestFor}
                    </span>
                  </div>

                  <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                    {park.highlights}
                  </p>

                  <div className="pt-3 border-t border-[#1e3a2f]/10 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#3a4d44] block">
                      Key Wildlife Spotting:
                    </span>
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                      {park.primaryAnimals.map((ani, idx) => (
                        <span key={idx} className="bg-[#fcfbf7] border border-[#1e3a2f]/10 px-2 py-0.5 rounded text-[#1e3a2f]">
                          {ani}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#fcfbf7] border-t border-[#1e3a2f]/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-[11px] text-[#3a4d44]">
                  <span>Prime Season:</span>
                  <span className="font-bold text-[#1e3a2f]">{park.bestMonths}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIES BY SPECIES DETAILED GUIDELINE */}
      <section className="py-16 px-4 md:px-8 bg-white border-y border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
              In-Depth Wildlife Matching
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              Detailed Breakdown By Target Species
            </h2>
          </div>

          <div className="space-y-8">
            {/* 1. Leopards */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-3xl p-8 space-y-4 hover:border-[#d4af37] transition-all">
              <div className="flex items-center gap-3 text-xl font-serif font-bold text-[#1e3a2f]">
                <span className="p-2 bg-[#1e3a2f] text-[#d4af37] rounded-xl text-lg">🐆</span>
                <h3>Looking For Leopards? (Yala vs. Wilpattu)</h3>
              </div>
              <p className="text-xs md:text-sm text-[#3a4d44] leading-relaxed font-light">
                Sri Lanka is home to the endemic Sri Lankan Leopard (<em>Panthera pardus kotiya</em>). Because there are no lions or tigers competing for apex predator status on the island, Sri Lankan leopards move confidently during daytime hours.
              </p>
              <div className="grid md:grid-cols-2 gap-6 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-[#1e3a2f]/5 space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#1e3a2f]">Yala National Park</h4>
                  <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                    Yala boasts the highest leopard density in the world. Block 1 is the primary safari zone. Expect dramatic rocky outcrops and scrubland, but be prepared for higher jeep traffic during peak months.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#1e3a2f]/5 space-y-2">
                  <h4 className="font-serif font-bold text-base text-[#1e3a2f]">Wilpattu National Park</h4>
                  <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                    Wilpattu is Sri Lanka's largest reserve, renowned for pristine freshwater lakes ('villus'). Leopards are frequently spotted drinking at waterholes. It offers a much quieter, authentic safari experience with far fewer jeeps.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Elephants */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-3xl p-8 space-y-4 hover:border-[#d4af37] transition-all">
              <div className="flex items-center gap-3 text-xl font-serif font-bold text-[#1e3a2f]">
                <span className="p-2 bg-[#1e3a2f] text-[#d4af37] rounded-xl text-lg">🐘</span>
                <h3>Mainly Want To See Wild Elephants?</h3>
              </div>
              <p className="text-xs md:text-sm text-[#3a4d44] leading-relaxed font-light">
                Asian Elephants roam free across multiple reserves in Sri Lanka. Choosing the right park depends heavily on your travel month:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
                <div className="bg-white p-4 rounded-2xl border border-[#1e3a2f]/5 space-y-1.5">
                  <span className="font-bold text-[#1e3a2f] block">Udawalawe</span>
                  <p className="text-[#3a4d44] font-light">Year-round guaranteed sightings. Open plains resembling African savannas.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#1e3a2f]/5 space-y-1.5">
                  <span className="font-bold text-[#1e3a2f] block">Minneriya</span>
                  <p className="text-[#3a4d44] font-light">Famous for the seasonal 'Gathering' (July–Oct) where 300+ elephants assemble.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#1e3a2f]/5 space-y-1.5">
                  <span className="font-bold text-[#1e3a2f] block">Kaudulla</span>
                  <p className="text-[#3a4d44] font-light">Convenient Cultural Triangle park. Elephants migrate here when Minneriya lakes fill.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#1e3a2f]/5 space-y-1.5">
                  <span className="font-bold text-[#1e3a2f] block">Wasgamuwa</span>
                  <p className="text-[#3a4d44] font-light">Lush riverine wilderness with large resident herds and zero commercial crowd pressure.</p>
                </div>
              </div>
            </div>

            {/* 3. Sloth Bears & Birds */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-3xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-lg font-serif font-bold text-[#1e3a2f]">
                  <span>🐻</span>
                  <h3>Sloth Bears (Wilpattu, Yala & Wasgamuwa)</h3>
                </div>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  The elusive Sri Lankan Sloth Bear is best spotted during the <strong>Palu fruit ripening season (May to July)</strong> when bears climb trees to gorge on sweet fruits. Wilpattu and Wasgamuwa provide exceptional bear sightings.
                </p>
              </div>

              <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-3xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-lg font-serif font-bold text-[#1e3a2f]">
                  <span>🦩</span>
                  <h3>Birds & Wetlands (Bundala & Gal Oya)</h3>
                </div>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  <strong>Bundala</strong> is a RAMSAR UNESCO wetland housing 200+ bird species including Greater Flamingos and migratory waders. <strong>Gal Oya</strong> offers boat safaris on Senanayake Samudra lake to spot swimming elephants!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROUTE-BASED SELECTION ("YOUR ROUTE MATTERS") */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
            Seamless Transport Logistics
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
            Choose A Park That Fits Your Route
          </h2>
          <p className="text-xs md:text-sm text-[#3a4d44] font-light max-w-2xl mx-auto">
            Instead of adding 6 extra hours of driving, pick the national park that aligns naturally with your itinerary loop.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-6 space-y-3 hover:border-[#d4af37] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Cultural Triangle</h3>
            <p className="text-xs text-[#3a4d44] font-mono font-bold">Sigiriya / Dambulla / Kandy</p>
            <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
              👉 Choose <strong>Minneriya</strong> or <strong>Kaudulla</strong>. Only 30–45 mins drive from Sigiriya rock fortress hotels.
            </p>
          </div>

          <div className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-6 space-y-3 hover:border-[#d4af37] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-serif font-bold text-base text-[#1e3a2f]">South Coast Loop</h3>
            <p className="text-xs text-[#3a4d44] font-mono font-bold">Galle / Mirissa / Ella</p>
            <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
              👉 Choose <strong>Udawalawe</strong>, <strong>Yala</strong>, or <strong>Bundala</strong>. Easily accessible along the southern highway.
            </p>
          </div>

          <div className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-6 space-y-3 hover:border-[#d4af37] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Northwest Loop</h3>
            <p className="text-xs text-[#3a4d44] font-mono font-bold">Anuradhapura / Kalpitiya</p>
            <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
              👉 Choose <strong>Wilpattu</strong>. Perfect stopover between Colombo airport and ancient northern cities.
            </p>
          </div>

          <div className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-6 space-y-3 hover:border-[#d4af37] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-serif font-bold text-base text-[#1e3a2f]">East Coast Loop</h3>
            <p className="text-xs text-[#3a4d44] font-mono font-bold">Arugam Bay / Passikudah</p>
            <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
              👉 Choose <strong>Gal Oya</strong>. Offers stunning lake boat safaris en route to eastern beaches.
            </p>
          </div>
        </div>
      </section>

      {/* PRIVATE CHAUFFEUR TRANSPORTATION INTEGRATION */}
      <section className="py-16 px-4 md:px-8 bg-[#1e3a2f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
              Private Driver & Safari Logistics
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">
              Connecting Your Safari Plans With Private Chauffeur Transport
            </h2>
            <p className="text-sm text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
              Our SLTDA-certified tourist drivers provide private air-conditioned transportation throughout Sri Lanka, helping you seamlessly link your safari destinations with the rest of your island itinerary.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            {/* What's Included */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#d4af37] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37]" /> What's Included In Driver Service:
              </h3>
              <ul className="space-y-2.5 text-xs text-white/80 font-light">
                <li className="flex items-center gap-2">✓ Private late-model AC sedan, SUV, or high-roof van</li>
                <li className="flex items-center gap-2">✓ English-speaking, SLTDA-approved tourist chauffeur</li>
                <li className="flex items-center gap-2">✓ All gasoline / fuel and unlimited daily kilometer allowance</li>
                <li className="flex items-center gap-2">✓ Highway express tolls & vehicle parking fees pre-included</li>
                <li className="flex items-center gap-2">✓ Driver meals & overnight lodging fully covered</li>
                <li className="flex items-center gap-2">✓ Flexible daily schedules & roadside coconut/fruit stops</li>
              </ul>
            </div>

            {/* Clear Exclusions */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
              <h3 className="font-serif font-bold text-lg text-white/90 flex items-center gap-2">
                <Info className="w-5 h-5 text-white/60" /> Clear Exclusions (Paid Direct At Park):
              </h3>
              <ul className="space-y-2.5 text-xs text-white/70 font-light">
                <li className="flex items-center gap-2">✖ National Park official entrance ticket fees</li>
                <li className="flex items-center gap-2">✖ 4x4 Open-top Safari Jeep hire charges (paid at gate)</li>
                <li className="flex items-center gap-2">✖ Guest hotel accommodation & personal meals</li>
                <li className="flex items-center gap-2">✖ Attraction / activity entrance passes</li>
              </ul>
              <p className="text-[11px] text-[#d4af37] italic font-light pt-2">
                *Keeping transport costs transparent ensures zero hidden agent markups on official park tickets.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/sri-lanka-tourist-drivers"
              className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#d4af37] text-[#1e3a2f] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-lg"
            >
              Browse Tourist Drivers & Rates <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/94722968210?text=Hi!%20I'm%20planning%20a%20wildlife%20safari%20in%20Sri%20Lanka%20and%20need%20a%20private%20driver."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#d4af37]" /> WhatsApp Concierge Desk
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
            Sri Lanka Safari FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#1e3a2f]/10 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left font-serif font-bold text-base text-[#1e3a2f] flex justify-between items-center gap-4 hover:text-[#d4af37] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#d4af37] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs text-[#3a4d44] leading-relaxed font-light border-t border-[#1e3a2f]/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="bg-[#1e3a2f] text-white py-16 px-4 md:px-8 text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-4xl font-serif text-white">
            Explore Sri Lanka's Wild Side — At Your Own Pace
          </h2>
          <p className="text-xs md:text-sm text-white/80 font-light leading-relaxed">
            Send your travel dates and preferred safari parks to our concierge desk. We will build a customized driving route matching your schedule within 2 hours.
          </p>
          <div className="pt-2">
            <Link
              to="/sri-lanka-trip-planner"
              className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d4af37] text-[#1e3a2f] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-xl"
            >
              Plan Your Custom Route <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
