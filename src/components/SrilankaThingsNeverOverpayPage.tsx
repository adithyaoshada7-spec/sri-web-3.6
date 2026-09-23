import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  ShieldAlert,
  Car,
  Wifi,
  ShoppingBag,
  Binoculars,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Info,
  DollarSign,
  MessageSquare,
  ShieldCheck,
  Check,
  HelpCircle
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaThingsNeverOverpayPage() {
  usePageMetadata({
    title: "5 Things You Should Never Overpay For in Sri Lanka (2026 Price Guide)",
    description: "Avoid tourist traps and inflated prices in Sri Lanka. Expert guidance on tuk-tuks, airport transfers, tourist SIM cards, gem shops, and safari tour quotes.",
    canonicalUrl: "https://plan-srilanka.com/things-never-to-overpay-for-in-sri-lanka",
    ogUrl: "https://plan-srilanka.com/things-never-to-overpay-for-in-sri-lanka",
    ogImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "5 Things You Should Never Overpay For in Sri Lanka (2026 Tourist Price Guide)",
    "description": "Essential insider guide to avoiding tourist markups in Sri Lanka. Learn how to get clear, fair prices on tuk-tuks, airport transfers, SIM cards, gem shops, and safari tours.",
    "url": "https://plan-srilanka.com/things-never-to-overpay-for-in-sri-lanka",
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
      q: "Which ride-hailing apps work best for tuk-tuks and cars in Sri Lanka?",
      a: "PickMe is the leading local ride-hailing app in Sri Lanka for tuk-tuks, cars, and vans. Uber is also widely available in Colombo and Negombo. Using these apps gives you benchmark prices so you never overpay for street tuk-tuks."
    },
    {
      q: "Are highway tolls included in airport transfer quotes?",
      a: "Not always! Disreputable touts often quote low initial prices and add expressway tolls (E01/E03) or parking fees at the destination. Always request an all-inclusive quote covering fuel, tolls, parking, and driver charges."
    },
    {
      q: "Where is the best place to buy a tourist SIM card in Sri Lanka?",
      a: "Buy directly at the official telecom arrival counters (Dialog or Mobitel) at Bandaranaike International Airport (CMB) in Colombo. Packages cost around $8 to $12 USD for 30GB-50GB of data. You will need your passport for mandatory registration."
    },
    {
      q: "How can I avoid driver commission stops at spice gardens or gem shops?",
      a: "Politely state your itinerary preferences upfront to your driver. Remember that you are under no obligation to buy anything. When purchasing high-value items like gems, insist on official National Gem and Jewellery Authority (NGJA) certificates."
    },
    {
      q: "What should an all-inclusive safari or private driver quote include?",
      a: "For safaris, verify whether the 4x4 open jeep, driver, and official park entrance tickets are included. For private chauffeur tours, confirm that fuel, highway express tolls, vehicle parking, unlimited kilometers, and driver meals/lodging are fully covered."
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
      { "@type": "ListItem", "position": 2, "name": "Travel Guides", "item": "https://plan-srilanka.com/things-to-do-in-sri-lanka" },
      { "@type": "ListItem", "position": 3, "name": "5 Things Never to Overpay For", "item": "https://plan-srilanka.com/things-never-to-overpay-for-in-sri-lanka" }
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
          alt="Sri Lanka Travel Price Transparency Guide"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
        />

        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
              <ShieldAlert className="w-4 h-4" /> 2026 Tourist Price Transparency Blueprint
            </div>
            <a
              href="https://wa.me/94722968210?text=Hi!%20I'd%20like%20a%20clear,%20transparent%20quote%20for%20my%20Sri%20Lanka%20trip."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("overpay_hero_whatsapp", "cta", "hero_badge")}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/60 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md shadow-md"
            >
              <MessageSquare className="w-4 h-4" /> Ask Clear Quote On WhatsApp 💬
            </a>
          </div>

          <h1 className="text-3xl md:text-6xl font-serif text-white leading-tight">
            5 Things You Should Never <br />
            <span className="italic text-[#d4af37]">Overpay For in Sri Lanka 🇱🇰</span>
          </h1>

          <p className="text-sm md:text-base text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            Sri Lanka offers exceptional value for travelers, but it's easy to pay inflated rates if you don't know the local standards. Here is your essential checklist before handing over your money.
          </p>

          {/* Quick Quote Highlight */}
          <div className="pt-2">
            <div className="inline-block bg-white/10 border border-[#d4af37]/50 p-4 rounded-2xl backdrop-blur-md text-center max-w-xl mx-auto">
              <span className="text-[11px] font-mono text-[#d4af37] font-bold uppercase tracking-widest block mb-1">
                ⭐ Golden Rule Of Sri Lanka Travel
              </span>
              <p className="text-sm font-serif italic text-white">
                "Don't chase the cheapest price. Chase a clear price."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY CARDS / AT-A-GLANCE GRID */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
            The 5 Checklist Items
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
            What To Check Before You Pay
          </h2>
          <p className="text-xs md:text-sm text-[#3a4d44] font-light max-w-2xl mx-auto">
            Click through any of the 5 categories below or scroll down for practical benchmarks and insider tips.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <a href="#tuk-tuks" className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-5 hover:border-[#d4af37] transition-all space-y-3 shadow-sm hover:shadow-lg text-center group">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1e3a2f]/5 text-[#1e3a2f] group-hover:bg-[#1e3a2f] group-hover:text-[#d4af37] flex items-center justify-center font-bold transition-all">
              01
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1e3a2f]">Tuk-Tuks</h3>
            <p className="text-[11px] text-[#3a4d44] font-light">Metered rates & PickMe benchmarks</p>
          </a>

          <a href="#airport-transfers" className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-5 hover:border-[#d4af37] transition-all space-y-3 shadow-sm hover:shadow-lg text-center group">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1e3a2f]/5 text-[#1e3a2f] group-hover:bg-[#1e3a2f] group-hover:text-[#d4af37] flex items-center justify-center font-bold transition-all">
              02
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1e3a2f]">Airport Transfers</h3>
            <p className="text-[11px] text-[#3a4d44] font-light">No surprise tolls or hidden parking</p>
          </a>

          <a href="#sim-cards" className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-5 hover:border-[#d4af37] transition-all space-y-3 shadow-sm hover:shadow-lg text-center group">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1e3a2f]/5 text-[#1e3a2f] group-hover:bg-[#1e3a2f] group-hover:text-[#d4af37] flex items-center justify-center font-bold transition-all">
              03
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1e3a2f]">SIM Cards</h3>
            <p className="text-[11px] text-[#3a4d44] font-light">Official CMB airport tourist counters</p>
          </a>

          <a href="#souvenirs-gems" className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-5 hover:border-[#d4af37] transition-all space-y-3 shadow-sm hover:shadow-lg text-center group">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1e3a2f]/5 text-[#1e3a2f] group-hover:bg-[#1e3a2f] group-hover:text-[#d4af37] flex items-center justify-center font-bold transition-all">
              04
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1e3a2f]">Gems & Shops</h3>
            <p className="text-[11px] text-[#3a4d44] font-light">Avoid high-pressure commission stops</p>
          </a>

          <a href="#tours-safaris" className="bg-white border border-[#1e3a2f]/10 rounded-2xl p-5 hover:border-[#d4af37] transition-all space-y-3 shadow-sm hover:shadow-lg text-center group">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1e3a2f]/5 text-[#1e3a2f] group-hover:bg-[#1e3a2f] group-hover:text-[#d4af37] flex items-center justify-center font-bold transition-all">
              05
            </div>
            <h3 className="font-serif font-bold text-sm text-[#1e3a2f]">Tours & Safaris</h3>
            <p className="text-[11px] text-[#3a4d44] font-light">Compare itemized inclusions inside quotes</p>
          </a>
        </div>
      </section>

      {/* DETAILED SECTIONS */}
      <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto space-y-16">
        
        {/* NUMBER 1: TUK-TUKS */}
        <div id="tuk-tuks" className="scroll-mt-32 bg-white border border-[#1e3a2f]/10 rounded-3xl p-8 space-y-6 shadow-sm hover:border-[#d4af37] transition-all">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-serif font-bold text-xl flex-shrink-0">
              01
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-wider block">
                Local Urban Transportation
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f]">
                Number 1 — Tuk-Tuks
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#3a4d44] leading-relaxed font-light">
            Don't just jump into the first tuk-tuk at a crowded train station or hotel gate and ask the price after you arrive. Street tuk-tuks outside tourist hotspots frequently quote double or triple the actual local rate to unsuspecting visitors.
          </p>

          <div className="grid md:grid-cols-2 gap-6 bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-2xl p-6 text-xs space-y-3 md:space-y-0">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1e3a2f] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Best Practices:
              </h3>
              <ul className="space-y-2 text-[#3a4d44] font-light">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Agree Before Departing:</strong> Always confirm the exact fare before putting your bags inside.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Use Ride-Hailing Apps:</strong> Download <strong>PickMe</strong> or <strong>Uber</strong> to check standard live rates in Colombo, Kandy, and Galle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Insist on Metered Tuk-Tuks:</strong> In Colombo, look for digital "Metered" signs on the roof or windshield.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#1e3a2f]/10 pt-4 md:pt-0 md:pl-6">
              <h3 className="font-serif font-bold text-base text-[#1e3a2f] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Red Flags & Golden Rule:
              </h3>
              <p className="text-[#3a4d44] leading-relaxed font-light">
                If a street quote sounds ridiculous, no dramas! Politely thank them, walk a few meters away, and hail another driver or book through PickMe. You are never obliged to accept the first price offered.
              </p>
            </div>
          </div>

          {/* Section Image */}
          <div className="rounded-2xl overflow-hidden border border-[#1e3a2f]/10 shadow-sm mt-4">
            <img
              src="/things-never-to-overpay-for-in-sri-lanka.jpg"
              alt="Sri Lanka Tuk-Tuk Fair Pricing and Metered Rates Guide"
              className="w-full h-auto max-h-[450px] object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>

        {/* NUMBER 2: AIRPORT TRANSFERS */}
        <div id="airport-transfers" className="scroll-mt-32 bg-white border border-[#1e3a2f]/10 rounded-3xl p-8 space-y-6 shadow-sm hover:border-[#d4af37] transition-all">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-serif font-bold text-xl flex-shrink-0">
              02
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-wider block">
                Arrival & Long-Distance Transit
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f]">
                Number 2 — Airport Transfers (CMB Airport)
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#3a4d44] leading-relaxed font-light">
            After a long international flight, fatigue makes it easy to accept the very first transport offer you find in the arrival hall. Unscrupulous drivers often quote a low base fare, only to demand extra cash for expressway tolls or airport parking upon arrival at your hotel.
          </p>

          <div className="grid md:grid-cols-2 gap-6 bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-2xl p-6 text-xs">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-[#1e3a2f] flex items-center gap-2">
                <Car className="w-4 h-4 text-[#d4af37]" /> What Your Airport Quote MUST Include:
              </h3>
              <ul className="space-y-2 text-[#3a4d44] font-light">
                <li className="flex items-center gap-2">✓ Expressway / Highway toll fees (E01 & E03 expressways)</li>
                <li className="flex items-center gap-2">✓ Airport exit parking fees</li>
                <li className="flex items-center gap-2">✓ Fuel and driver allowance</li>
                <li className="flex items-center gap-2">✓ Fixed door-to-door dropoff rate</li>
              </ul>
            </div>

            <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#1e3a2f]/10 pt-4 md:pt-0 md:pl-6">
              <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Why Pre-Booking Matters:</h3>
              <p className="text-[#3a4d44] leading-relaxed font-light">
                A slightly cheaper initial quote isn't necessarily cheaper if unexpected extras suddenly appear later. Pre-booking a verified tourist driver guarantees your driver is waiting with your name sign in arrivals, with all tolls pre-included.
              </p>
              <p className="text-xs text-[#1e3a2f] font-light pt-2">
                ✈️ <strong>Flying in from India?</strong> Read our complete breakdown on <Link to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" className="font-bold underline hover:text-[#d4af37] transition-colors">How Much Will It Take to Visit Sri Lanka from Chennai</Link> for flight rates and 5-day vs 7-day budget plans.
              </p>
            </div>
          </div>
        </div>

        {/* NUMBER 3: SIM CARDS */}
        <div id="sim-cards" className="scroll-mt-32 bg-white border border-[#1e3a2f]/10 rounded-3xl p-8 space-y-6 shadow-sm hover:border-[#d4af37] transition-all">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-serif font-bold text-xl flex-shrink-0">
              03
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-wider block">
                Connectivity & Mobile Data
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f]">
                Number 3 — Tourist SIM Cards
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#3a4d44] leading-relaxed font-light">
            Don't pay random inflated prices at unofficial roadside shops just because you've landed and urgently need internet. Sri Lanka's official mobile network operators offer standardized tourist SIM packages with generous high-speed 4G/5G data allowances.
          </p>

          <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-2xl p-6 text-xs space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#1e3a2f]/10 rounded-xl p-4 space-y-1 text-center">
                <span className="text-[10px] font-mono text-[#d4af37] font-bold block uppercase">Official Counters</span>
                <p className="font-serif font-bold text-[#1e3a2f] text-sm">Dialog & Mobitel</p>
                <p className="text-[#3a4d44] font-light">Located in CMB Arrival Lobby</p>
              </div>
              <div className="bg-white border border-[#1e3a2f]/10 rounded-xl p-4 space-y-1 text-center">
                <span className="text-[10px] font-mono text-[#d4af37] font-bold block uppercase">Average Cost</span>
                <p className="font-serif font-bold text-[#1e3a2f] text-sm">$8 – $12 USD</p>
                <p className="text-[#3a4d44] font-light">30GB to 50GB Tourist Data</p>
              </div>
              <div className="bg-white border border-[#1e3a2f]/10 rounded-xl p-4 space-y-1 text-center">
                <span className="text-[10px] font-mono text-[#d4af37] font-bold block uppercase">Registration</span>
                <p className="font-serif font-bold text-[#1e3a2f] text-sm">Passport Required</p>
                <p className="text-[#3a4d44] font-light">Instant digital activation</p>
              </div>
            </div>
            <p className="text-[#3a4d44] font-light leading-relaxed">
              👉 <strong>Tip:</strong> Always check what data package you are actually receiving (anytime data vs nighttime data split) before handing over cash.
            </p>
          </div>

          {/* Section Image */}
          <div className="rounded-2xl overflow-hidden border border-[#1e3a2f]/10 shadow-sm mt-4">
            <img
              src="/things-never-to-overpay-for-in-sri-lanka1.jpg"
              alt="Official Tourist SIM Card Counter Packages in Sri Lanka"
              className="w-full h-auto max-h-[450px] object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>

        {/* NUMBER 4: SOUVENIRS, GEMS AND TOURIST SHOPS */}
        <div id="souvenirs-gems" className="scroll-mt-32 bg-white border border-[#1e3a2f]/10 rounded-3xl p-8 space-y-6 shadow-sm hover:border-[#d4af37] transition-all">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-serif font-bold text-xl flex-shrink-0">
              04
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-wider block">
                Shopping & Gem Merchants
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f]">
                Number 4 — Souvenirs, Gems & Tourist Shops
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#3a4d44] leading-relaxed font-light">
            This is where you should slow down. If you're buying expensive items — especially gemstones, jewellery, or high-end Ceylon crafts — never feel pressured into buying immediately because someone says: <em>"Special price just for you, mate."</em>
          </p>

          <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-2xl p-6 text-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Smart Shopping Safeguards:</h3>
            <ul className="space-y-2.5 text-[#3a4d44] font-light">
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">•</span>
                <span><strong>Compare Prices:</strong> Don't buy at the very first store. Compare across multiple shops in town.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">•</span>
                <span><strong>Verify Gem Certification:</strong> For gemstone purchases, insist on authentic certification from the National Gem and Jewellery Authority (NGJA).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">•</span>
                <span><strong>Remember Driver Stops:</strong> Your driver suggesting a spice garden or craft workshop doesn't mean you have to buy anything. You are in full control of your spending.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* NUMBER 5: TOURS AND SAFARIS */}
        <div id="tours-safaris" className="scroll-mt-32 bg-white border border-[#1e3a2f]/10 rounded-3xl p-8 space-y-6 shadow-sm hover:border-[#d4af37] transition-all">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-serif font-bold text-xl flex-shrink-0">
              05
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-wider block">
                Excursions & Chauffeur Packages
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f]">
                Number 5 — Tours and Safaris
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#3a4d44] leading-relaxed font-light">
            Don't look only at the cheapest or most expensive quote. Ask: <strong>"What is actually included inside?"</strong> Two quotes can look completely different until you break down the individual line items.
          </p>

          <div className="grid md:grid-cols-2 gap-6 bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-2xl p-6 text-xs">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-[#1e3a2f] flex items-center gap-2">
                <Binoculars className="w-4 h-4 text-[#d4af37]" /> Safari Excursions Checklist:
              </h3>
              <ul className="space-y-2 text-[#3a4d44] font-light">
                <li className="flex items-center gap-2">✓ Does price include 4x4 Jeep hire?</li>
                <li className="flex items-center gap-2">✓ Are official park entrance tickets included?</li>
                <li className="flex items-center gap-2">✓ Are park service taxes & tracker tips listed?</li>
              </ul>
            </div>

            <div className="space-y-3 border-t md:border-t-0 md:border-l border-[#1e3a2f]/10 pt-4 md:pt-0 md:pl-6">
              <h3 className="font-serif font-bold text-base text-[#1e3a2f] flex items-center gap-2">
                <Car className="w-4 h-4 text-[#d4af37]" /> Round Tour Driver Checklist:
              </h3>
              <ul className="space-y-2 text-[#3a4d44] font-light">
                <li className="flex items-center gap-2">✓ Are driver meals and overnight lodging covered?</li>
                <li className="flex items-center gap-2">✓ Are expressway tolls & parking fees included?</li>
                <li className="flex items-center gap-2">✓ Is fuel and daily km allowance unlimited?</li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      {/* MY SIMPLE RULE - HIGHLIGHTED BANNER */}
      <section className="py-16 px-4 md:px-8 bg-[#1e3a2f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
            The Golden Takeaway
          </span>

          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            My Simple Rule
          </h2>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md space-y-4 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-serif italic text-[#d4af37]">
              "Don't chase the cheapest price. Chase a clear price."
            </p>
            <p className="text-sm text-white/85 font-light leading-relaxed">
              Always ask what you are paying for before you agree. A reputable operator will never have a problem explaining their costs transparently. If somebody is putting heaps of pressure on you to buy immediately? Take your time. Your holiday isn't going anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* CLEAR QUOTE WHATSAPP CONCIERGE CARD */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#1e3a2f] via-[#142921] to-[#0d1d17] text-white border-2 border-[#d4af37]/40 shadow-2xl p-8 md:p-12">
          {/* Ambient Orbs */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#2e5a49]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#d4af37]" /> Planning A Sri Lanka Trip?
              </div>

              <h2 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
                Get A Clear, Transparent Quote <br className="hidden sm:inline" />
                <span className="text-[#d4af37] italic">Before You Book</span>
              </h2>

              <p className="text-xs md:text-sm text-white/85 font-light leading-relaxed">
                If you'd like a clear, upfront quote for an airport transfer or private round tour, send us your travel dates, number of travelers, and preferred route. We will tell you exactly what's included before you spend a single dollar.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-[#d4af37] font-bold block uppercase">✓ Zero Hidden Fees</span>
                  <p className="text-[11px] text-white/80 font-light mt-0.5">Fuel, tolls & parking included</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-[#d4af37] font-bold block uppercase">✓ Verified Drivers</span>
                  <p className="text-[11px] text-white/80 font-light mt-0.5">SLTDA-licensed chauffeurs</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-[#d4af37] font-bold block uppercase">✓ Fast Response</span>
                  <p className="text-[11px] text-white/80 font-light mt-0.5">Instant WhatsApp assistance</p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full lg:w-auto">
              <a
                href="https://wa.me/94722968210?text=Hi!%20I'd%20like%20a%20clear,%20transparent%20quote%20for%20my%20Sri%20Lanka%20trip.%20Here%20are%20my%20details:"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("overpay_whatsapp_click", "cta", "main_card")}
                className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold text-xs md:text-sm uppercase tracking-wider rounded-full hover:bg-[#20ba59] transition-all shadow-2xl scale-105 hover:scale-110 group"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Get Clear Quote on WhatsApp</span>
              </a>
              <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider font-semibold">
                📱 Direct WhatsApp: +94 722 968 210
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED COST GUIDES & BACKLINKS */}
      <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-white border border-[#1e3a2f]/10 rounded-3xl p-6 md:p-8 space-y-4 text-center shadow-sm">
          <span className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-widest block">
            Explore Related Budget & Transport Guides
          </span>
          <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">
            More Insider Sri Lanka Price Guides
          </h3>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-mono font-bold pt-2">
            <Link
              to="/things-to-do-in-sri-lanka"
              className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/15 rounded-full text-[#1e3a2f] hover:border-[#d4af37] hover:text-[#d4af37] transition-all shadow-sm"
            >
              🏝️ Find Things to Do in Sri Lanka
            </Link>
            <Link
              to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
              className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/15 rounded-full text-[#1e3a2f] hover:border-[#d4af37] hover:text-[#d4af37] transition-all shadow-sm"
            >
              🇮🇳 Sri Lanka Trip Cost From Chennai
            </Link>
            <Link
              to="/sri-lanka-tourist-drivers"
              className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/15 rounded-full text-[#1e3a2f] hover:border-[#d4af37] hover:text-[#d4af37] transition-all shadow-sm"
            >
              🚗 Licensed Tourist Driver Rates
            </Link>
            <Link
              to="/sri-lanka-trip-cost-from-india"
              className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/15 rounded-full text-[#1e3a2f] hover:border-[#d4af37] hover:text-[#d4af37] transition-all shadow-sm"
            >
              💰 Sri Lanka Trip Cost Master Guide
            </Link>
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
            Sri Lanka Pricing FAQs
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
            Plan Your Sri Lanka Trip With Confidence
          </h2>
          <p className="text-xs md:text-sm text-white/80 font-light leading-relaxed">
            Use our free interactive trip planner to build your custom itinerary and compare realistic daily budgets.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/things-to-do-in-sri-lanka"
              className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d4af37] text-[#1e3a2f] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-xl"
            >
              Find Things to Do in Sri Lanka <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/sri-lanka-trip-planner"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/30 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
            >
              Use Free Trip Planner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
