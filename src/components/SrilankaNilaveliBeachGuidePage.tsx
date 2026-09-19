import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  Waves,
  Sun,
  Calendar,
  ShieldCheck,
  Clock,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  MapPin,
  MessageCircle,
  Users,
  Info,
  ArrowRight,
  Image as ImageIcon,
  Car,
  TrainFront,
  Plane,
  BedDouble,
  ListChecks,
  CheckCircle2,
  Fish,
  Backpack,
  CalendarDays
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

const WHATSAPP_NUMBER = "94770424646";
const WHATSAPP_DISPLAY = "+94 77 042 4646";

const buildWaLink = (text: string, number: string = WHATSAPP_NUMBER) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export default function SrilankaNilaveliBeachGuidePage() {
  usePageMetadata({
    title: "Nilaveli Beach Travel Guide (2026) | Pigeon Island Snorkeling & Direct Booking",
    description: "Everything to know about Nilaveli Beach, Sri Lanka: calm shallow swimming, Pigeon Island National Park snorkeling with turtles, best time to visit, where to stay, and direct WhatsApp booking — no agent fees.",
    canonicalUrl: "https://plan-srilanka.com/nilaveli-beach-travel-guide",
    ogUrl: "https://plan-srilanka.com/nilaveli-beach-travel-guide",
    ogImage: "https://plan-srilanka.com/Nilaveli-Beach-background-image.jpg"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Nilaveli Beach Travel Guide",
    "description": "Guide to Nilaveli Beach, Sri Lanka: calm shallow swimming, Pigeon Island National Park snorkeling, family safety, and where to stay.",
    "url": "https://plan-srilanka.com/nilaveli-beach-travel-guide",
    "image": "https://plan-srilanka.com/Nilaveli-Beach-background-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nilaveli",
      "addressRegion": "Eastern Province",
      "addressCountry": "Sri Lanka"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.7,
      "longitude": 81.1833
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com/" },
      { "@type": "ListItem", "position": 2, "name": "Where To Go In June", "item": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-june" },
      { "@type": "ListItem", "position": 3, "name": "Nilaveli Beach Travel Guide", "item": "https://plan-srilanka.com/nilaveli-beach-travel-guide" }
    ]
  };

  const faqs = [
    {
      q: "What is Nilaveli Beach known for?",
      a: "Nilaveli is a long, quiet stretch of fine white sand north of Trincomalee, known for calm, shallow, warm water that's safe for families, and as the launch point for boat trips to Pigeon Island National Park."
    },
    {
      q: "What is the best time to visit Nilaveli Beach?",
      a: "May to September is the best window. This is when Sri Lanka's East Coast enjoys its dry, calm season — flat seas, clear water, and ideal snorkeling conditions at Pigeon Island — while the South and West coasts are in monsoon."
    },
    {
      q: "Can you snorkel at Pigeon Island from Nilaveli?",
      a: "Yes. Pigeon Island National Park is a short boat ride from Nilaveli beach and is one of the best easily-accessible snorkeling spots in Sri Lanka, with regular sightings of sea turtles, reef fish, and blacktip reef sharks in shallow water."
    },
    {
      q: "Is Nilaveli Beach safe for children?",
      a: "Yes, the shallow, gentle waters make it one of the safer swimming beaches on the island during the May–September season, though it's still worth checking conditions with your hotel before swimming out."
    },
    {
      q: "How do I get to Nilaveli from Colombo?",
      a: "By private car or taxi it's about 5 to 6 hours (roughly 260 km) via the Central Expressway and A6 through Trincomalee. Direct trains from Colombo Fort run to Trincomalee (around 7–8 hours), with a short 20-30 minute onward tuk-tuk or taxi ride to Nilaveli."
    },
    {
      q: "How do I book a Pigeon Island boat trip — do I need an agent?",
      a: "No. You can message a local boat operator directly on WhatsApp to confirm timing, group size, and price, and skip the hotel agent markup."
    },
    {
      q: "How many days should I spend in Nilaveli?",
      a: "1 to 2 full days is enough: one morning for the Pigeon Island snorkeling trip, and the rest of your time relaxing on the beach. Many travelers combine it with 1-2 extra days in nearby Uppuveli or Trincomalee town."
    },
    {
      q: "Nilaveli or Uppuveli — which should I stay in?",
      a: "Nilaveli is quieter, wider, and closest to the Pigeon Island boat launch — best for a relaxed, low-key stay. Uppuveli is livelier with more beach cafés and is closer to Trincomalee harbor for dolphin and whale watching."
    },
    {
      q: "Is Nilaveli Beach better than Uppuveli Beach?",
      a: "Honestly, many travelers rate Uppuveli slightly higher for a general beach stay — it's less crowded, cleaner, and the water shelves much more gently than Nilaveli's deeper, steeper drop-off. Nilaveli still wins if your main goal is being close to the Pigeon Island boat launch, but for calm, shallow swimming and a laid-back cafe scene, Uppuveli is the stronger all-round pick."
    },
    {
      q: "How does Marble Beach compare to Nilaveli Beach, and is it better?",
      a: "Marble Beach (about 30 minutes from Nilaveli, on Sri Lanka Navy land) is a different kind of beach entirely — smaller waves, noticeably clearer water, and a quieter, more sheltered feel. Many visitors who've done all three would rank the trio roughly Uppuveli > Marble Beach > Nilaveli for overall swimming experience, though Nilaveli still leads for snorkeling access thanks to Pigeon Island right offshore. It's worth combining a day trip to Marble Beach with your Nilaveli stay rather than treating it as a replacement."
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

  const waBase = "Hi! I'm planning a trip to Nilaveli and want to check the beach and Pigeon Island snorkeling.";

  return (
    <div className="bg-[#fcfbf7] text-[#1e3a2f] min-h-screen font-sans antialiased selection:bg-[#d4af37]/30">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-[#1e3a2f] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a2f]/50 via-[#1e3a2f]/85 to-[#1e3a2f] z-10" />
        <img
          src="/Nilaveli-Beach-background-image.jpg"
          alt="Calm shallow water on Nilaveli Beach, Sri Lanka"
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 mb-6">
            <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/where-to-go-in-sri-lanka-in-june" className="hover:text-[#d4af37] transition-colors">Where To Go In June</Link>
            <span>/</span>
            <span className="text-[#d4af37]">Nilaveli Beach Travel Guide</span>
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Booking • No Agent Fees</span>
              </div>
              <div className="inline-flex items-center gap-3 text-white/60 text-[11px] font-mono uppercase tracking-wider">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Updated 2026
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>8 min read</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.05]">
              Things To Do In <span className="italic text-[#d4af37]">Nilaveli Beach</span>
            </h1>

            <p className="text-lg text-white/80 font-light leading-relaxed">
              A serene, miles-long stretch of white sand north of Trincomalee — calm, shallow, warm water and the launch point for Pigeon Island snorkeling. Message us directly on WhatsApp to check conditions and book the boat trip.
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
                <div className="text-xl font-serif font-bold text-white">1 – 2 Days</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <Fish className="w-4 h-4" /> Top Activity
                </div>
                <div className="text-xl font-serif font-bold text-white">Pigeon Island Snorkeling</div>
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
            Nilaveli Beach is Sri Lanka's East Coast base for <strong className="font-bold">calm, shallow, family-friendly swimming</strong> and <strong className="font-bold">Pigeon Island National Park snorkeling</strong> — best visited <strong className="font-bold">May to September</strong>, when this coast is dry and calm while the South and West are in monsoon. Give it <strong className="font-bold">1–2 days</strong>, and book the Pigeon Island boat trip directly on WhatsApp below rather than through a hotel agent.
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

      {/* THINGS TO DO */}
      <section id="things-to-do" className="pt-14 md:pt-20 pb-14 md:pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-[#d4af37]" /> Things To Do
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">What Nilaveli Is Actually Good For</h2>
          <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto">
            Book the boat trip yourself directly on WhatsApp — no agent in between.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all rounded-[28px] overflow-hidden flex flex-col justify-between">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600&h=360"
              alt="Sea turtle snorkeling at Pigeon Island National Park near Nilaveli"
              referrerPolicy="no-referrer"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 space-y-3 flex-1 flex flex-col">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Fish className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Pigeon Island Snorkeling</h3>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light flex-1">
                A short boat ride from Nilaveli beach to Pigeon Island National Park, where you can swim alongside green sea turtles, colorful reef fish, and harmless blacktip reef sharks in waist-deep water.
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#d4af37]">
                ⭐ Best For: Snorkelers & Families
              </span>
              <a
                href={buildWaLink("Hi! I want to arrange a Pigeon Island snorkeling boat trip from Nilaveli.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", "nilaveli_beach_guide", "pigeon_island_snorkeling")}
                className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-[#25D366] text-white font-bold uppercase tracking-wider text-[10px] rounded-full hover:bg-[#1ebe57] transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Directly Book On WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          <div className="bg-white border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all rounded-[28px] overflow-hidden flex flex-col justify-between">
            <img
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600&h=360"
              alt="Long white sand shoreline at Nilaveli Beach"
              referrerPolicy="no-referrer"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 space-y-3 flex-1 flex flex-col">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Waves className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Calm Shallow Beach Swimming</h3>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light flex-1">
                Miles of quiet, fine white sand with gentle, warm, shallow water — one of the safer swimming beaches on the island during the dry East Coast season, and a good fit for young children.
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#d4af37]">
                ⭐ Best For: Families & Quiet Relaxation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BEST TIME TO VISIT */}
      <section id="best-time" className="py-14 md:py-20 bg-white border-y border-[#1e3a2f]/5 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#d4af37]" /> Best Time To Visit
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Why Visit Nilaveli, And When</h2>
            <p className="text-[#3a4d44] leading-relaxed font-light">
              While the South and West coasts are hit by the Southwest monsoon from May to September, that's exactly when the East Coast — Trincomalee, Uppuveli and Nilaveli — flips into its dry, calm season, opening up flat, clear water for snorkeling and safe beach swimming.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Waves className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">Calm, Shallow-Friendly Seas</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                June-to-September waters are typically dry and settled, making the Pigeon Island boat crossing smoother and the beach itself safer to swim than the monsoon-hit coasts elsewhere on the island.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">Small, Local Boat Captains</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                Pigeon Island trips run on smaller local boats rather than large tourist fleets — message the captain directly to agree on timing, group size, and price before you go.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Water conditions can vary with weather and tide — always confirm today's sea conditions and departure time on WhatsApp before heading to the beach.
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
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">How To Get To Nilaveli</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">By Private Car / Taxi</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                About 5 to 6 hours from Colombo (roughly 260 km) via the Central Expressway and A6 through Trincomalee. The most flexible option, and easy to combine with Sigiriya or Dambulla en route.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <TrainFront className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">By Train + Taxi</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                Direct trains run from Colombo Fort to Trincomalee, typically taking around 7 to 8 hours, followed by a short 20-30 minute tuk-tuk or taxi ride onward to Nilaveli.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Plane className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">By Domestic Flight</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                FitsAir and other domestic carriers occasionally connect Colombo (Ratmalana) to Trincomalee's China Bay Airport in under 90 minutes. Fares typically run USD 50–120 one way — check current schedules directly with the carrier, then a short taxi covers the final stretch to Nilaveli.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE TO STAY */}
      <section id="where-to-stay" className="py-14 md:py-20 bg-white border-y border-[#1e3a2f]/5 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-[#d4af37]" /> Where To Stay
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Basing Yourself In Nilaveli</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-2">
              <h3 className="font-serif font-bold text-[#1e3a2f]">Right On Nilaveli Beach</h3>
              <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
                Quiet, wider beach with fewer crowds than Uppuveli — closest base for the Pigeon Island boat launch, best for a relaxed, low-key stay.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-2">
              <h3 className="font-serif font-bold text-[#1e3a2f]">Uppuveli (20 min away)</h3>
              <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
                Livelier with more beach cafés and guesthouses, and closer to Trincomalee harbor if you also want dolphin or whale watching.
              </p>
            </div>
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
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">A Simple 2-Day Nilaveli Plan</h2>
          </div>

          <div className="space-y-4">
            {[
              { day: "Day 1", title: "Arrive & Beach Time", text: "Travel in from Colombo or Trincomalee, check into your Nilaveli hotel, and spend the afternoon swimming in the calm shallow water." },
              { day: "Day 2", title: "Pigeon Island Snorkeling", text: "Morning boat trip to Pigeon Island National Park to snorkel with turtles and reef fish. Confirm your seats and today's conditions on WhatsApp the evening before." }
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
                Message Us On WhatsApp To Plan Your Nilaveli Days
              </h2>
              <p className="text-white/70 font-light leading-relaxed max-w-2xl">
                Send your travel dates, number of travelers, and hotel area (Nilaveli / Uppuveli). You'll get today's sea conditions, activity timing, and pricing confirmed before you commit.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  { label: "Arrange Pigeon Island snorkeling", text: "Hi! I want to arrange a Pigeon Island snorkeling boat trip from Nilaveli." },
                  { label: "General trip planning", text: waBase }
                ].map((opt, i) => (
                  <a
                    key={i}
                    href={buildWaLink(opt.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", "nilaveli_beach_guide", `booking_option_${i}`)}
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
                onClick={() => trackEvent("whatsapp_click", "nilaveli_beach_guide", "booking_section_main")}
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
              { icon: Clock, title: "Boats leave early", text: "Pigeon Island trips depart in the morning to catch calm seas — arrive 20-30 minutes ahead." },
              { icon: MapPin, title: "Base yourself in Nilaveli or Uppuveli", text: "Both are close to the beach and boat launch, and a short drive from Koneswaram Temple and Trincomalee town." }
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

      {/* WHAT TO PACK */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <Backpack className="w-4 h-4 text-[#d4af37]" /> What To Pack
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Nilaveli Beach Packing Checklist</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 bg-white border border-[#1e3a2f]/10 rounded-3xl p-6 md:p-8">
            {[
              "Reef-safe, high-SPF sunscreen — protect the coral at Pigeon Island",
              "Rash guard or UV-protective swimwear for long stretches in the water",
              "Waterproof bag or dry sack for valuables on the boat",
              "Insect repellent for evening use",
              "Light, breathable clothing — modest dress if visiting Koneswaram Temple",
              "Underwater camera or a waterproof phone case",
              "Reusable water bottle",
              "Cash in Sri Lankan Rupees — nearest ATMs are in Trincomalee town"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span className="text-sm text-[#3a4d44] font-light leading-relaxed">{item}</span>
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
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Nilaveli Beach Travel Guide — Questions</h2>
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
            <Link to="/trincomalee-travel-guide" className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37] transition-all flex flex-col gap-2 group">
              <span className="font-serif font-bold text-sm group-hover:text-[#d4af37]">Trincomalee Travel Guide</span>
              <span className="text-[11px] text-white/60 font-light">Dolphin & whale watching, temples, hot springs</span>
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
          onClick={() => trackEvent("whatsapp_click", "nilaveli_beach_guide", "mobile_sticky_bar")}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-bold uppercase tracking-wider text-xs rounded-full"
        >
          <MessageCircle className="w-4 h-4" /> Chat Now — {WHATSAPP_DISPLAY}
        </a>
      </div>
      <div className="h-16 md:hidden" />
    </div>
  );
}
