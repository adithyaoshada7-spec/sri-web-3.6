import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { trackEvent } from "../lib/analytics";

const WA_LINK = "https://wa.me/94722968210";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const trustPoints = [
  "Based in Colombo, on the ground every day",
  "Private vehicles & English-speaking guides",
  "Direct WhatsApp — no call centres, no forms",
  "Visa & ETA guidance for Indian and Australian passports"
];

const journeys = [
  {
    image: "/kandy-temple-tooth-relic-lake-sri-lanka.jpg",
    alt: "Temple of the Sacred Tooth, Kandy",
    eyebrow: "Cultural Triangle & Ancient Cities",
    title: "History, Unhurried",
    desc: "Sigiriya's rock fortress, the cave temples of Dambulla, and the Temple of the Sacred Tooth in Kandy — with private, English-fluent guides."
  },
  {
    image: "/nuwara-eliya-tea-plantation-sri-lanka.jpg",
    alt: "Tea plantation, Nuwara Eliya",
    eyebrow: "Tea Country & Misty Highlands",
    title: "The Slow Green Climb",
    desc: "Colonial bungalows, emerald tea estates, and the scenic train through Nanu Oya and Ella."
  },
  {
    image: "/minneriya-elephant-safari-sri-lanka.jpg",
    alt: "Elephant safari, Minneriya",
    eyebrow: "Wildlife Safari",
    title: "Into the Dry Zone",
    desc: "Private 4x4 safaris through Yala and Wilpattu, tracking leopards, elephants, and the island's birdlife."
  },
  {
    image: "/mirissa-bentota-beach-sunset-sri-lanka.jpg",
    alt: "Coastal sunset, Mirissa",
    eyebrow: "Coastal Vibe Tour",
    title: "The Island's Easier Side",
    desc: "Colombo's marina at golden hour, artisan coastal dining, and the beaches of the south coast."
  }
];

const planTools = [
  {
    number: "01",
    title: "Trip Cost Calculator",
    desc: "A realistic daily budget from Chennai, Mumbai, Sydney or Melbourne — flights, stays and touring, broken down.",
    to: "/sri-lanka-trip-cost-from-india"
  },
  {
    number: "02",
    title: "Visa & ETA Guide",
    desc: "Step-by-step ETA guidance for Indian and Australian passport holders, and what to carry at immigration.",
    to: "/sri-lanka-visa-for-indians"
  },
  {
    number: "03",
    title: "Sample Itineraries",
    desc: "7 and 10-day routes built from journeys we've actually run, with realistic day-by-day pacing.",
    to: "/sri-lanka-7-day-itinerary"
  }
];

const faqs = [
  {
    q: "Do we need a visa to enter Sri Lanka?",
    a: "Yes. Most passport holders, including Indian and Australian citizens, need a Sri Lanka ETA before arrival. It's a short online form — we'll send you the checklist and confirm it's approved before you fly."
  },
  {
    q: "When's the best time for us to travel?",
    a: "It depends which coast. December to April suits the west and south coast and the hill country; May to September is drier on the east coast and around the ancient cities. We build your route around the season you're travelling in."
  },
  {
    q: "What should we budget for, beyond flights?",
    a: "A private, fully-guided trip with good mid-range to upscale stays typically runs from about $150 a day per couple, inclusive of vehicle, guide and entries. We send an exact daily breakdown before you book anything."
  },
  {
    q: "How do we get around once we land?",
    a: "Most guests travel by private air-conditioned car with an English-speaking driver-guide — the easiest way to cover the hill country and coast comfortably. For the Kandy–Ella stretch, we book you onto the scenic train instead."
  }
];

const photoStrip = [
  { image: "/nine-arch-bridge-ella-sri-lanka.jpg", alt: "Nine Arch Bridge, Ella" },
  { image: "/colombo-galle-face-green-sunset-sri-lanka.jpg", alt: "Galle Face Green, Colombo" },
  { image: "/trincomalee-coastal-lagoon-boats-sri-lanka.jpg", alt: "Trincomalee lagoon" }
];

const waClick = (label: string) => {
  trackEvent("whatsapp_click", "conversion", label);
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Lead");
  }
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-luxury-cream">
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <img
          src="/sigiriya-rock-fortress-sri-lanka.jpg"
          alt="Sri Lanka"
          className="absolute inset-0 w-full h-full object-cover"
          {...{ fetchPriority: "high" } as any}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/45 via-luxury-black/35 to-luxury-black/65" />
        <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
          <span className="text-luxury-gold text-[11px] tracking-[0.4em] uppercase font-semibold mb-6">
            For Travellers From Australia &amp; India
          </span>
          <motion.h1
            {...fadeUp}
            className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-semibold mb-6 tracking-tight"
          >
            Sri Lanka, Planned
            <br />
            Around <span className="italic text-luxury-gold">You.</span>
          </motion.h1>
          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl mb-9 font-light">
            A private travel concierge run from Colombo — real local guides, honest planning, and a WhatsApp line that actually answers. Under two hours from South India, one convenient stopover from Australia.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => waClick("hero_start_planning")}
              className="px-9 py-4 bg-luxury-gold text-luxury-black rounded-full text-xs font-bold uppercase tracking-[0.14em] hover:bg-white transition-colors"
            >
              Start Planning on WhatsApp
            </a>
            <a
              href="#journeys"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("journeys")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-9 py-4 border border-white/40 text-white rounded-full text-xs font-semibold uppercase tracking-[0.14em] hover:border-luxury-gold hover:text-luxury-gold transition-colors"
            >
              See The Journeys
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-luxury-cream px-6 md:px-14 py-10 border-b border-luxury-black/[0.08]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {trustPoints.map((point, i) => (
            <div key={i} className="flex gap-3.5 items-start">
              <span className="font-serif italic text-luxury-gold text-xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-snug text-luxury-black/75 m-0">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEYS */}
      <section id="journeys" className="px-6 md:px-14 py-16 md:py-28">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="max-w-xl mx-auto mb-14 text-center">
            <span className="font-serif italic text-luxury-gold text-base md:text-lg">The Signature Routes</span>
            <h2 className="font-serif text-luxury-green text-3xl md:text-5xl leading-tight mt-3 font-semibold">
              Four Ways to See the Island
            </h2>
            <p className="text-luxury-black/55 text-sm md:text-base mt-4 leading-relaxed">
              Choose a starting point — every route is rebuilt around your dates, pace, and who's travelling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {journeys.map((j, i) => (
              <motion.div
                key={j.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="rounded overflow-hidden bg-white border border-luxury-black/[0.06]"
              >
                <div className="h-[280px] overflow-hidden">
                  <img src={j.image} alt={j.alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-black/40 font-bold">
                    {j.eyebrow}
                  </span>
                  <h3 className="font-serif text-luxury-green text-2xl mt-3 mb-3.5 font-semibold">{j.title}</h3>
                  <p className="text-luxury-black/65 text-sm leading-relaxed m-0">{j.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="px-6 md:px-14 pb-16 md:pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-1">
          {photoStrip.map((p) => (
            <div key={p.alt} className="h-[260px] overflow-hidden">
              <img src={p.image} alt={p.alt} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* PLAN WITH REAL NUMBERS */}
      <section id="plan" className="bg-luxury-green px-6 md:px-14 py-16 md:py-28">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="max-w-xl mx-auto mb-14 text-center">
            <span className="font-serif italic text-luxury-gold text-base md:text-lg">Before You Book</span>
            <h2 className="font-serif text-white text-3xl md:text-5xl leading-tight mt-3 font-semibold">
              Plan With Real Numbers
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {planTools.map((tool, i) => (
              <motion.div key={tool.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <span className="font-serif italic text-luxury-gold text-3xl">{tool.number}</span>
                <h4 className="font-serif text-white text-xl mt-4 mb-3 font-semibold">{tool.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{tool.desc}</p>
                <Link
                  to={tool.to}
                  onClick={() => trackEvent("plan_tool_click", "engagement", tool.to)}
                  className="text-[11px] uppercase tracking-[0.2em] text-luxury-gold font-bold hover:text-white transition-colors"
                >
                  Explore →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" className="px-6 md:px-14 py-16 md:py-28 bg-luxury-cream">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div {...fadeUp} className="h-[460px] overflow-hidden rounded">
            <img
              src="/adithya-oshada-founder-plan-sri-lanka.jpg"
              alt="Adithya Oshada, Founder"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div {...fadeUp}>
            <span className="font-serif italic text-luxury-gold text-base md:text-lg">A Local Desk, Not a Call Centre</span>
            <h2 className="font-serif text-luxury-green text-3xl md:text-5xl leading-tight mt-3.5 mb-5 font-semibold">
              Planned by someone who's driven the route.
            </h2>
            <p className="text-luxury-black/70 text-sm md:text-base leading-loose mb-4">
              Plan Sri Lanka is run by Adithya Oshada and a small team based in Colombo. Every itinerary is planned by someone who has stayed at the hotel, driven the road, and can tell you honestly whether it's worth your time.
            </p>
            <p className="text-luxury-black/70 text-sm md:text-base leading-loose mb-7">
              We work with families and couples from Australia and India most often — so we already know the flight routes, the visa paperwork, and the questions you're likely to have.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => waClick("founder_message_desk")}
                className="inline-flex px-8 py-4 bg-luxury-green text-white rounded-full text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-luxury-gold hover:text-luxury-black transition-colors"
              >
                Message The Desk
              </a>
              <Link
                to="/about-founder"
                className="text-[11px] uppercase tracking-[0.2em] text-luxury-black/50 font-bold hover:text-luxury-gold transition-colors"
              >
                Read the full story →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="px-6 md:px-14 pb-16 md:pb-28 bg-luxury-cream">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <p className="font-serif italic text-luxury-green text-2xl md:text-3xl leading-relaxed mb-6">
            "It felt like we were suddenly in a bespoke coastal paradise, but with the warmth of Sri Lankan hospitality — the first time our family felt truly away, without the trip we worried about."
          </p>
          <span className="text-[11px] tracking-[0.2em] uppercase text-luxury-black/45 font-bold">
            The Silva Family — Coastal Vibe Tour
          </span>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-14 pb-20 md:pb-32 bg-luxury-cream">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-11">
            <span className="font-serif italic text-luxury-gold text-base md:text-lg">Questions From Travellers</span>
            <h2 className="font-serif text-luxury-green text-3xl md:text-4xl mt-3 font-semibold">Frequently Asked</h2>
          </motion.div>
          <div>
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.q} className="border-b border-luxury-black/10">
                  <button
                    onClick={() => {
                      const next = isOpen ? -1 : i;
                      setOpenFaq(next);
                      trackEvent("faq_accordion_toggle", "engagement", `home_${i}_${next !== -1}`);
                    }}
                    aria-expanded={isOpen}
                    className="w-full py-5 px-1 flex justify-between items-center gap-4 text-left"
                  >
                    <span className="font-serif text-luxury-green text-base md:text-lg font-semibold">{item.q}</span>
                    <span className="text-luxury-gold shrink-0">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-1 pb-5 m-0 text-luxury-black/65 text-sm md:text-[14.5px] leading-relaxed max-w-xl">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 md:px-14 py-16 md:py-28 bg-[#F3EEE3] border-t border-luxury-black/[0.06]">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-luxury-green text-4xl md:text-6xl mb-5 font-semibold leading-[1.1]">
            Begin Your Story.
          </h2>
          <p className="text-luxury-black/60 text-sm md:text-base mb-9 leading-relaxed">
            Send us your dates and who's travelling — we'll reply with a route and a real price, usually within a day.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => waClick("final_cta")}
            className="inline-flex items-center gap-3 px-10 py-5 bg-luxury-green text-white rounded-full font-serif italic text-lg hover:bg-luxury-gold hover:text-luxury-black transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Message Us on WhatsApp
          </a>
          <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-luxury-black/35 font-bold">
            Colombo Concierge Desk • +94 72 296 8210
          </p>
        </motion.div>
      </section>
    </div>
  );
}
