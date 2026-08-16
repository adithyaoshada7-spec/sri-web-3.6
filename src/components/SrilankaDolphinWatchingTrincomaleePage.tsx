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
  CheckCircle2,
  ChevronDown,
  Sparkles,
  MapPin,
  MessageCircle,
  Waves,
  Camera,
  Users,
  Info,
  ArrowRight,
  Image as ImageIcon
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

const WHATSAPP_NUMBER = "94770424646";
const WHATSAPP_DISPLAY = "+94 77 042 4646";

const buildWaLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export default function SrilankaDolphinWatchingTrincomaleePage() {
  usePageMetadata({
    title: "Dolphin Watching Trincomalee (2026 Guide) | Book Your Boat Tour Direct",
    description: "Book a dolphin watching boat tour in Trincomalee / Uppuveli, Sri Lanka. Sunrise departures, spinner dolphin pods, calm June-to-September seas & direct WhatsApp booking — no agents.",
    canonicalUrl: "https://plan-srilanka.com/dolphin-watching-trincomalee",
    ogUrl: "https://plan-srilanka.com/dolphin-watching-trincomalee",
    ogImage: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Dolphin Watching Trincomalee",
    "description": "Morning dolphin watching boat tours departing from Trincomalee / Uppuveli harbor, Sri Lanka, best from May to September.",
    "url": "https://plan-srilanka.com/dolphin-watching-trincomalee",
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
      { "@type": "ListItem", "position": 3, "name": "Dolphin Watching Trincomalee", "item": "https://plan-srilanka.com/dolphin-watching-trincomalee" }
    ]
  };

  const faqs = [
    {
      q: "What time do dolphin watching boats leave from Trincomalee?",
      a: "Boats depart early, typically between 6:00 AM and 6:30 AM from the Uppuveli / Trincomalee harbor area, when the sea is calmest and dolphin pods are most active near the surface."
    },
    {
      q: "What is the best month to see dolphins in Trincomalee?",
      a: "May to September is the best window. This is when Sri Lanka's East Coast enjoys its dry, calm season (while the South and West coasts are in monsoon), giving flat seas and good visibility for spotting spinner dolphin pods."
    },
    {
      q: "How long does the tour take?",
      a: "Most trips run 2.5 to 4 hours, returning to harbor by mid-morning, leaving the rest of your day free for Nilaveli beach or Pigeon Island."
    },
    {
      q: "How do I book — do I need to go through an agent?",
      a: "No. You can message the boat operator directly on WhatsApp to check today's conditions, confirm a departure time, and reserve your seats."
    },
    {
      q: "Is dolphin watching in Trincomalee guaranteed?",
      a: "Sightings are frequent in season but never 100% guaranteed, as pods move with the tide and weather. A reputable captain will be upfront with you about conditions on the day before you head out."
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

  const waBase = "Hi! I want to book a dolphin watching boat tour in Trincomalee.";

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
          alt="Dolphin watching boat cruise off Trincomalee, Sri Lanka"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 mb-6">
            <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/where-to-go-in-sri-lanka-in-june" className="hover:text-[#d4af37] transition-colors">Where To Go In June</Link>
            <span>/</span>
            <span className="text-[#d4af37]">Dolphin Watching Trincomalee</span>
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Booking • No Agent Fees</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.05]">
              Dolphin Watching in <span className="italic text-[#d4af37]">Trincomalee</span>
            </h1>

            <p className="text-lg text-white/80 font-light leading-relaxed">
              A sunrise boat cruise out of Uppuveli / Trincomalee harbor to spot pods of wild spinner dolphins on the calm, dry-season East Coast waters. Message the captain directly on WhatsApp to check today's conditions and book your seats.
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
                  <Clock className="w-4 h-4" /> Departure
                </div>
                <div className="text-xl font-serif font-bold text-white">~6:00 AM</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-mono uppercase mb-1">
                  <Anchor className="w-4 h-4" /> Duration
                </div>
                <div className="text-xl font-serif font-bold text-white">2.5 – 4 hrs</div>
              </div>
            </div>

            <a
              href={buildWaLink(waBase)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", "dolphin_watching_trincomalee", "hero_cta")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold uppercase tracking-wider text-xs rounded-full hover:bg-[#1ebe57] transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> Book on WhatsApp: {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-14 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-[#d4af37]" /> On The Water
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">What To Expect On The Boat</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              src: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&q=80&w=700&h=500",
              alt: "Spinner dolphins jumping near a boat off Sri Lanka's East Coast",
              caption: "Spinner dolphin pods surfacing near the boat"
            },
            {
              src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=700&h=500",
              alt: "Fishing boat departing Trincomalee harbor at sunrise",
              caption: "Early sunrise departure from the harbor"
            },
            {
              src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=700&h=500",
              alt: "Calm turquoise ocean water off Nilaveli and Trincomalee",
              caption: "Flat, calm East Coast waters in season"
            }
          ].map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-[#1e3a2f]/10 bg-white shadow-sm">
              <img src={img.src} alt={img.alt} referrerPolicy="no-referrer" className="w-full h-48 object-cover" />
              <p className="text-xs text-[#3a4d44] p-3 font-light">{img.caption}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[#3a4d44]/60 text-center font-mono">
          Representative photos. Confirm live conditions and boat details directly with the captain over WhatsApp.
        </p>
      </section>

      {/* WHY TRINCOMALEE / HONEST OVERVIEW */}
      <section className="py-14 md:py-20 bg-white border-y border-[#1e3a2f]/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Why Book This Out Of Trincomalee</h2>
            <p className="text-[#3a4d44] leading-relaxed font-light">
              While Mirissa on the South Coast is Sri Lanka's most famous whale watching hub, its season shuts down during the Southwest monsoon (May–September). That's exactly when the East Coast — Trincomalee, Uppuveli and Nilaveli — flips into its dry, calm season. Local boat captains run shorter, more relaxed dolphin watching trips from the Trincomalee/Uppuveli harbor area, which pairs naturally with a beach day at Nilaveli or a snorkel trip to Pigeon Island.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Waves className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">Calm, Shallow-Friendly Seas</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                June-to-September East Coast waters are typically dry and settled, making for a smoother, less seasick-prone ride than monsoon-season boats elsewhere on the island.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/10 space-y-3">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-[#1e3a2f]">Small, Local Boat Captains</h3>
              <p className="text-sm text-[#3a4d44] font-light leading-relaxed">
                Trips run on smaller local boats rather than large tourist fleets — message the captain directly to agree on timing, group size, and price before you go.
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
                Message The Boat Captain On WhatsApp
              </h2>
              <p className="text-white/70 font-light leading-relaxed max-w-2xl">
                Send your preferred date, number of travelers, and hotel area (Uppuveli / Nilaveli / Trincomalee town). You'll get today's sea conditions, departure time, and price confirmed before you commit.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {[
                  { label: "Check a specific date", text: "Hi! I'd like to check availability for a dolphin watching tour on [date]. How many people can join?" },
                  { label: "Ask about group / private boat", text: "Hi! Do you offer a private boat for dolphin watching for a small group? What would that cost?" },
                  { label: "General price & timing", text: waBase }
                ].map((opt, i) => (
                  <a
                    key={i}
                    href={buildWaLink(opt.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", "dolphin_watching_trincomalee", `booking_option_${i}`)}
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
                onClick={() => trackEvent("whatsapp_click", "dolphin_watching_trincomalee", "booking_section_main")}
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
              { icon: Clock, title: "Arrive on time", text: "Boats leave early to catch calm morning seas — being 20-30 minutes ahead of departure is worth it." },
              { icon: MapPin, title: "Pair it with Nilaveli", text: "Trips return mid-morning, leaving time to head to Nilaveli beach or Pigeon Island for the rest of the day." }
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
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#1e3a2f] uppercase tracking-widest bg-[#1e3a2f]/5 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#d4af37]" /> FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1e3a2f]">Dolphin Watching Trincomalee — Questions</h2>
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
          onClick={() => trackEvent("whatsapp_click", "dolphin_watching_trincomalee", "mobile_sticky_bar")}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-bold uppercase tracking-wider text-xs rounded-full"
        >
          <MessageCircle className="w-4 h-4" /> Book Now — {WHATSAPP_DISPLAY}
        </a>
      </div>
      <div className="h-16 md:hidden" />
    </div>
  );
}
