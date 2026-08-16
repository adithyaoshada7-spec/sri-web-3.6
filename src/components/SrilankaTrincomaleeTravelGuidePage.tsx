import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  Anchor,
  Sun,
  Calendar,
  ShieldCheck,
  Clock,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  MapPin,
  MessageCircle,
  Waves,
  Users,
  Info,
  ArrowRight,
  Image as ImageIcon,
  Landmark,
  Fish,
  Droplets,
  Compass,
  Car,
  TrainFront,
  BedDouble,
  ListChecks,
  CheckCircle2
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

const WHATSAPP_NUMBER = "94770424646";
const WHATSAPP_DISPLAY = "+94 77 042 4646";

const WHALE_WATCHING_WHATSAPP_NUMBER = "94776487757";
const WHALE_WATCHING_WHATSAPP_DISPLAY = "+94 77 648 7757";

const buildWaLink = (text: string, number: string = WHATSAPP_NUMBER) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

interface Activity {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  bestFor: string;
  description: string;
  bookable: boolean;
  waText?: string;
  waNumber?: string;
  waDisplay?: string;
  image: string;
}

const activities: Activity[] = [
  {
    icon: Waves,
    title: "Dolphin Watching Boat Cruise",
    bestFor: "Sunrise wildlife trips",
    description: "Morning boat tour out of the Uppuveli / Trincomalee harbor area to spot wild spinner dolphin pods. Calmest and most reliable May to September.",
    bookable: true,
    waText: "Hi! I want to book the Dolphin Watching Cruise in Trincomalee.",
    image: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&q=80&w=700&h=500"
  },
  {
    icon: Anchor,
    title: "Whale Watching Trincomalee",
    bestFor: "Blue & sperm whale season",
    description: "Boat tours heading further offshore from Trincomalee to look for blue whales and sperm whales, alongside dolphin pods, during the East Coast's calm dry season.",
    bookable: true,
    waText: "Hi! I want to book the Whale Watching tour in Trincomalee.",
    waNumber: WHALE_WATCHING_WHATSAPP_NUMBER,
    waDisplay: WHALE_WATCHING_WHATSAPP_DISPLAY,
    image: "https://images.unsplash.com/photo-1568430460464-02e7078e7c33?auto=format&fit=crop&q=80&w=700&h=500"
  },
  {
    icon: Fish,
    title: "Pigeon Island Snorkeling",
    bestFor: "Coral reefs & sea turtles",
    description: "Short boat ride from Nilaveli to Pigeon Island National Park. Shallow reef snorkeling with reef fish, occasional blacktip reef sharks, and green turtles.",
    bookable: true,
    waText: "Hi! I want to arrange a Pigeon Island snorkeling boat trip from Nilaveli.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=700&h=500"
  },
  {
    icon: Sun,
    title: "Nilaveli & Uppuveli Beaches",
    bestFor: "Swimming & relaxing",
    description: "Wide, quiet stretches of white sand with warm, shallow, calm water — Sri Lanka's most reliably swimmable beaches during the June–September dry season.",
    bookable: false,
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=700&h=500"
  },
  {
    icon: Landmark,
    title: "Koneswaram Temple & Fort Frederick",
    bestFor: "Culture & sunset views",
    description: "A cliffside Hindu temple perched on Swami Rock inside the old Dutch/British Fort Frederick grounds, with sweeping ocean views — an easy half-day stop in Trincomalee town.",
    bookable: false,
    image: "https://images.unsplash.com/photo-1580746738099-79ea3b7f4b5f?auto=format&fit=crop&q=80&w=700&h=500"
  },
  {
    icon: Droplets,
    title: "Kanniya Hot Springs",
    bestFor: "A quick, offbeat stop",
    description: "Seven small square wells of natural hot water a short drive from Trincomalee town — a quick, unusual stop to combine with a day trip.",
    bookable: false,
    image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&q=80&w=700&h=500"
  },
  {
    icon: Compass,
    title: "Scuba Diving & WWII Wrecks",
    bestFor: "Certified & trial divers",
    description: "Trincomalee's natural deep-water harbor holds WWII shipwrecks and reef dive sites, arranged through local dive operators during the dry season.",
    bookable: false,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=700&h=500"
  }
];

export default function SrilankaTrincomaleeTravelGuidePage() {
  usePageMetadata({
    title: "Trincomalee Travel Guide (2026) | Things To Do & Book Activities Direct",
    description: "Everything you can actually do in Trincomalee: dolphin & whale watching, Pigeon Island snorkeling, Nilaveli & Uppuveli beaches, Koneswaram Temple, hot springs & diving — with direct WhatsApp booking, no agents.",
    canonicalUrl: "https://plan-srilanka.com/trincomalee-travel-guide",
    ogUrl: "https://plan-srilanka.com/trincomalee-travel-guide",
    ogImage: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Trincomalee Travel Guide",
    "description": "Guide to activities in Trincomalee, Sri Lanka: dolphin and whale watching, Pigeon Island snorkeling, beaches, temples, hot springs and diving.",
    "url": "https://plan-srilanka.com/trincomalee-travel-guide",
    "image": "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&q=80&w=1200&h=630",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Trincomalee",
      "addressRegion": "Eastern Province",
      "addressCountry": "Sri Lanka"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.5711,
      "longitude": 81.2335
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com/" },
      { "@type": "ListItem", "position": 2, "name": "Where To Go In June", "item": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-june" },
      { "@type": "ListItem", "position": 3, "name": "Trincomalee Travel Guide", "item": "https://plan-srilanka.com/trincomalee-travel-guide" }
    ]
  };

  const faqs = [
    {
      q: "What are the best things to do in Trincomalee?",
      a: "The core lineup is a dolphin watching boat cruise, whale watching further offshore, snorkeling at Pigeon Island National Park, swimming at Nilaveli or Uppuveli beach, visiting Koneswaram Temple inside Fort Frederick, and — if you have extra time — the Kanniya hot springs or a dive trip to the WWII wrecks in the harbor."
    },
    {
      q: "What time do dolphin and whale watching boats leave from Trincomalee?",
      a: "Boats depart early, typically between 6:00 AM and 6:30 AM from the Uppuveli / Trincomalee harbor area, when the sea is calmest and marine life is most active near the surface. Whale watching trips head further offshore and can run a little longer than dolphin cruises."
    },
    {
      q: "Can you see whales in Trincomalee, not just dolphins?",
      a: "Yes. Alongside spinner dolphin pods, boats heading further out from Trincomalee during the dry season can encounter blue whales and sperm whales — this is a separate, longer trip from the shorter dolphin cruise, so confirm which one you're booking."
    },
    {
      q: "What is the best month to visit Trincomalee?",
      a: "May to September is the best window. This is when Sri Lanka's East Coast enjoys its dry, calm season (while the South and West coasts are in monsoon), giving flat seas — good for boat trips, snorkeling and swimming alike."
    },
    {
      q: "How many days do I need in Trincomalee?",
      a: "2 to 3 full days covers the main activities comfortably: one morning for the dolphin cruise, one for Pigeon Island snorkeling, and a half-day for the temple, hot springs, or just relaxing on Nilaveli beach."
    },
    {
      q: "How do I book activities — do I need to go through an agent?",
      a: "No. For the boat-based activities (dolphin watching, Pigeon Island trips), you can message a local captain directly on WhatsApp to check conditions, confirm timing, and reserve your spot."
    },
    {
      q: "Is dolphin watching in Trincomalee guaranteed?",
      a: "Sightings are frequent in season but never 100% guaranteed, as pods move with the tide and weather. A reputable captain will be upfront with you about conditions on the day before you head out."
    },
    {
      q: "How do I get to Trincomalee from Colombo?",
      a: "By private car or taxi it's about 4 to 5 hours (roughly 250 km) via the Central Expressway and A6. Direct trains from Colombo Fort also run to Trincomalee, taking around 7 to 8 hours."
    },
    {
      q: "Should I stay in Uppuveli, Nilaveli, or Trincomalee town?",
      a: "Uppuveli is closest to the harbor for dolphin and whale watching departures. Nilaveli is quieter and closest to the Pigeon Island boat trips. Trincomalee town is best if you want to be near Koneswaram Temple and local markets."
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

  const waBase = "Hi! I'm planning a trip to Trincomalee and want to check activities and boat trips.";

  return (
    <div className="bg-[#fcfbf7] text-[#1e3a2f] min-h-screen font-sans antialiased selection:bg-[#d4af37]/30">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-[#1e3a2f] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a2f]/50 via-[#1e3a2f]/85 to-[#1e3a2f] z-10" />
        <img
          src="https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&q=80&w=1600&h=900"
          alt="Boat on the ocean off Trincomalee, Sri Lanka"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 mb-6">
            <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/where-to-go-in-sri-lanka-in-june" className="hover:text-[#d4af37] transition-colors">Where To Go In June</Link>
            <span>/</span>
            <span className="text-[#d4af37]">Trincomalee Travel Guide</span>
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Booking • No Agent Fees</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.05]">
              Things To Do In <span className="italic text-[#d4af37]">Trincomalee</span>
            </h1>

            <p className="text-lg text-white/80 font-light leading-relaxed">
              Everything you can actually do in Trincomalee, Uppuveli & Nilaveli — dolphin watching cruises, Pigeon Island snorkeling, beaches, temples, hot springs and diving. Message us directly on WhatsApp to check conditions and book the boat trips.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <Calendar className="w-4 h-4" /> Best Season
                </div>
                <div className="text-xl font-serif font-bold text-white">May – Sept</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <Clock className="w-4 h-4" /> Ideal Stay
                </div>
                <div className="text-xl font-serif font-bold text-white">2 – 3 Days</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <Anchor className="w-4 h-4" /> Top Activity
                </div>
                <div className="text-xl font-serif font-bold text-white">Dolphin Cruise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER BOX */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-14 relative z-30">
        <div className="max-w-5xl mx-auto bg-white rounded-[28px] border border-[#1e3a2f]/10 shadow-xl p-6 md:p-8 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#d4af37]">Quick Answer</span>
          <p className="text-sm md:text-base text-[#1e3a2f] leading-relaxed font-light">
            Trincomalee is Sri Lanka's East Coast base for <strong className="font-bold">dolphin & whale watching boat trips</strong>, <strong className="font-bold">Pigeon Island snorkeling</strong>, and calm, swimmable beaches (Nilaveli, Uppuveli) — best visited <strong className="font-bold">May to September</strong>, when this coast is dry while the South and West are in monsoon. Give it <strong className="font-bold">2–3 days</strong>, and book the boat-based activities directly on WhatsApp below rather than through a hotel agent.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { label: "Things To Do", href: "#things-to-do" },
              { label: "Best Time", href: "#best-time" },
              { label: "Getting There", href: "#getting-there" },
              { label: "Where To Stay", href: "#where-to-stay" },
              { label: "Itinerary", href: "#itinerary" },
              { label: "FAQ", href: "#faq" }
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full bg-[#fcfbf7] border border-[#1e3a2f]/10 text-[#1e3a2f] text-[11px] font-bold uppercase tracking-wider hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES GRID */}
      <section id="things-to-do" className="pt-14 md:pt-20 pb-14 md:pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-[#d4af37]" /> Activities
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">What You Can Actually Do Here</h2>
          <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto">
            Real, doable activities in and around Trincomalee — not a padded list. Boat-based trips can be booked directly on WhatsApp.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act, i) => (
            <div key={i} className="bg-white border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all rounded-[28px] overflow-hidden flex flex-col justify-between">
              <img src={act.image} alt={act.title} referrerPolicy="no-referrer" className="w-full h-36 object-cover" />
              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                  <act.icon className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#1e3a2f]">{act.title}</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light flex-1">{act.description}</p>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#d4af37]">
                  ⭐ Best For: {act.bestFor}
                </span>
                {act.bookable && act.waText && (
                  <a
                    href={buildWaLink(act.waText, act.waNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", "trincomalee_travel_guide", act.title)}
                    className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-[#25D366] text-white font-bold uppercase tracking-wider text-[10px] rounded-full hover:bg-[#1ebe57] transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Book On WhatsApp{act.waDisplay ? `: ${act.waDisplay}` : ""}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST TIME TO VISIT */}
      <section id="best-time" className="py-14 md:py-20 bg-white border-y border-[#1e3a2f]/5 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#d4af37]" /> Best Time To Visit
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Why Visit Trincomalee, And When</h2>
            <p className="text-[#3a4d44] leading-relaxed font-light">
              While Mirissa on the South Coast is Sri Lanka's most famous whale watching hub, its season shuts down during the Southwest monsoon (May–September). That's exactly when the East Coast — Trincomalee, Uppuveli and Nilaveli — flips into its dry, calm season, opening up dolphin watching, snorkeling, diving and flat, safe beach swimming all at once.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Waves className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">Calm, Shallow-Friendly Seas</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                June-to-September East Coast waters are typically dry and settled, making boat trips smoother and beaches safer to swim than the monsoon-hit coasts elsewhere on the island.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">Small, Local Boat Captains</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                Boat trips run on smaller local boats rather than large tourist fleets — message the captain directly to agree on timing, group size, and price before you go.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Dolphin sightings depend on weather, tide, and season — no operator can guarantee a sighting on every trip. Always confirm today's sea conditions and departure time on WhatsApp before heading to the harbor.
            </p>
          </div>
        </div>
      </section>

      {/* GETTING THERE */}
      <section id="getting-there" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#d4af37]" /> Getting There
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">How To Get To Trincomalee</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">By Private Car / Taxi</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                About 4 to 5 hours from Colombo (roughly 250 km) via the Central Expressway and A6. The most flexible option, and the easiest way to combine Trincomalee with Sigiriya or Dambulla en route.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <TrainFront className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">By Train</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                Direct trains run from Colombo Fort to Trincomalee, typically taking around 7 to 8 hours. A scenic but slower option — book reserved seats in advance during peak season.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#3a4d44]/70 font-light">
            Once in town, Uppuveli and Nilaveli are a short 15–25 minute tuk-tuk or taxi ride from Trincomalee itself, and most hotels can arrange local transport.
          </p>
        </div>
      </section>

      {/* WHERE TO STAY */}
      <section id="where-to-stay" className="py-14 md:py-20 bg-white border-y border-[#1e3a2f]/5 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-[#d4af37]" /> Where To Stay
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Which Area To Base Yourself In</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: "Uppuveli", desc: "Closest to the harbor and dolphin/whale watching departures. Lively strip of beach cafés and guesthouses, easy tuk-tuk ride to town." },
              { name: "Nilaveli", desc: "Quieter, wider beach a bit further north — closest base for Pigeon Island boat trips, best for a relaxed, low-key stay." },
              { name: "Trincomalee Town", desc: "Closest to Koneswaram Temple, Fort Frederick and the local markets — best if culture and convenience matter more than beachfront." }
            ].map((area, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-2">
                <h3 className="font-serif font-bold text-[#1e3a2f]">{area.name}</h3>
                <p className="text-xs text-[#3a4d44] font-light leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUGGESTED ITINERARY */}
      <section id="itinerary" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-[#d4af37]" /> Suggested Itinerary
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">A Simple 3-Day Trincomalee Plan</h2>
          </div>

          <div className="space-y-4">
            {[
              { day: "Day 1", title: "Arrive & Settle In", text: "Travel in from Colombo or your prior stop, check into Uppuveli or Nilaveli, and spend the afternoon swimming and relaxing on the beach." },
              { day: "Day 2", title: "Dolphin / Whale Watching Cruise", text: "Early 6:00 AM boat departure from the Uppuveli/Trincomalee harbor. Confirm your seats and today's conditions on WhatsApp the evening before." },
              { day: "Day 3", title: "Pigeon Island & Culture", text: "Morning snorkeling trip to Pigeon Island from Nilaveli, then an afternoon visit to Koneswaram Temple and Fort Frederick before you head onward." }
            ].map((step, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white border border-[#1e3a2f]/10">
                <div className="w-16 shrink-0 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#d4af37] block">{step.day}</span>
                  <CheckCircle2 className="w-5 h-5 text-[#1e3a2f]/20 mx-auto mt-1" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#1e3a2f] mb-1">{step.title}</h3>
                  <p className="text-xs text-[#3a4d44] font-light leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING / DIRECT CONTACT */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1e3a2f] text-white rounded-[32px] p-8 md:p-12 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] font-bold block">
                Book Directly — No Middleman
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold">
                Message Us On WhatsApp To Plan Your Trincomalee Days
              </h2>
              <p className="text-white/70 font-light leading-relaxed max-w-2xl">
                Send your travel dates, number of travelers, and hotel area (Uppuveli / Nilaveli / Trincomalee town). You'll get today's sea conditions, activity timing, and pricing confirmed before you commit.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  { label: "Book the dolphin cruise", text: "Hi! I want to book the Dolphin Watching Cruise in Trincomalee." },
                  { label: "Book whale watching", text: "Hi! I want to book the Whale Watching tour in Trincomalee.", waNumber: WHALE_WATCHING_WHATSAPP_NUMBER },
                  { label: "Arrange Pigeon Island snorkeling", text: "Hi! I want to arrange a Pigeon Island snorkeling boat trip from Nilaveli." },
                  { label: "General trip planning", text: waBase }
                ].map((opt, i) => (
                  <a
                    key={i}
                    href={buildWaLink(opt.text, opt.waNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", "trincomalee_travel_guide", `booking_option_${i}`)}
                    className="flex flex-col justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37] transition-all"
                  >
                    <span className="text-sm font-serif font-bold">{opt.label}</span>
                    <span className="inline-flex items-center gap-1.5 text-[#25D366] text-xs font-bold">
                      <MessageCircle className="w-3.5 h-3.5" /> Chat Now
                    </span>
                  </a>
                ))}
              </div>

              <a
                href={buildWaLink(waBase)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", "trincomalee_travel_guide", "booking_section_main")}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-[#25D366] text-white font-bold uppercase tracking-wider text-xs rounded-full hover:bg-[#1ebe57] transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GOOD TO KNOW */}
      <section className="py-14 md:py-20 bg-white border-y border-[#1e3a2f]/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f] text-center">Good To Know Before You Go</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Sun, title: "Bring sun protection", text: "Reef-safe sunscreen, a hat, and sunglasses — there's little shade once you're out on the water." },
              { icon: ShieldCheck, title: "Ask about life jackets", text: "Confirm life jackets are provided for every passenger before boarding, especially for children." },
              { icon: Clock, title: "Boats leave early", text: "Dolphin and snorkeling trips depart around 6:00 AM to catch calm morning seas — arrive 20-30 minutes ahead." },
              { icon: MapPin, title: "Base yourself in Uppuveli or Nilaveli", text: "Both are close to the harbor and the beaches, and a short drive from Koneswaram Temple and Trincomalee town." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10">
                <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#1e3a2f] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#3a4d44] font-light leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#d4af37]" /> FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Trincomalee Travel Guide — Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#1e3a2f]/10 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#1e3a2f] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#d4af37] shrink-0 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm text-[#3a4d44] leading-relaxed font-light">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED LINKS */}
      <section className="py-14 md:py-20 bg-[#1e3a2f] text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center">Continue Planning Your East Coast Trip</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/where-to-go-in-sri-lanka-in-june" className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37] transition-all flex flex-col gap-2 group">
              <span className="font-serif font-bold text-sm group-hover:text-[#d4af37]">Where To Go In June</span>
              <span className="text-[11px] text-white/60 font-light">Full East Coast vs. South Coast weather guide</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/whale-watching-mirissa" className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37] transition-all flex flex-col gap-2 group">
              <span className="font-serif font-bold text-sm group-hover:text-[#d4af37]">Whale Watching Mirissa</span>
              <span className="text-[11px] text-white/60 font-light">South Coast season (Dec – Mar) guide</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/sri-lanka-itinerary-august-couples" className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37] transition-all flex flex-col gap-2 group">
              <span className="font-serif font-bold text-sm group-hover:text-[#d4af37]">August Couples Itinerary</span>
              <span className="text-[11px] text-white/60 font-light">Romantic East Coast route ideas</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY BOOK BAR */}
      <div className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-white border-t border-[#1e3a2f]/10 p-3">
        <a
          href={buildWaLink(waBase)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", "trincomalee_travel_guide", "mobile_sticky_bar")}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-bold uppercase tracking-wider text-xs rounded-full"
        >
          <MessageCircle className="w-4 h-4" /> Chat Now — {WHATSAPP_DISPLAY}
        </a>
      </div>
      <div className="h-16 md:hidden" />
    </div>
  );
}
