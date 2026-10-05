import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  Compass,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Users,
  Wallet,
  Car,
  MapPin,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  ChevronDown,
  Globe,
  Award,
  HelpCircle,
  Share2,
  Check,
  Star,
  Zap,
  PhoneCall
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import InteractiveRouteFunnelModal from "./InteractiveRouteFunnelModal";

export default function WhyChoosePlanSriLankaPage() {
  usePageMetadata({
    title: "Why Choose Plan Sri Lanka? The Ultimate Guide to Stress-Free, Custom Island Travel",
    description: "Discover why modern travelers choose Plan Sri Lanka over traditional tour operators. 100% free interactive route planner, verified local drivers, transparent multi-currency budgets, and flexible bespoke itineraries.",
    canonicalUrl: "https://plan-srilanka.com/why-choose-plan-sri-lanka",
    ogUrl: "https://plan-srilanka.com/why-choose-plan-sri-lanka",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [isFunnelOpen, setIsFunnelOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleOpenFunnel = (source: string) => {
    trackEvent("open_funnel_click", "engagement", `why_choose_page_${source}`);
    setIsFunnelOpen(true);
  };

  const faqs = [
    {
      q: "Is the Plan Sri Lanka trip planner really 100% free to use?",
      a: "Yes, absolutely 100% free. Unlike traditional travel agencies that charge hefty consultation fees or lock itinerary templates behind paywalls, our interactive route planner and validation tool allows you to customize routes, travel vibes, group counts, and budgets without paying a single cent."
    },
    {
      q: "How does Plan Sri Lanka outperform traditional tour agencies?",
      a: "Traditional agencies often push rigid, cookie-cutter tour packages with hidden commission markups, forced souvenir stops, and outsourced drivers. Plan Sri Lanka provides total flexibility, transparent multi-currency pricing, direct route customization, and dedicated verified local driver-guides who know the island intimately."
    },
    {
      q: "How are Plan Sri Lanka's local drivers vetted and verified?",
      a: "Every driver in our network is fully licensed by the Sri Lanka Tourism Development Authority (SLTDA), holds comprehensive passenger insurance, speaks fluent English, and possesses years of proven route experience. They act as trusted companions and cultural guides, not just chauffeurs."
    },
    {
      q: "Can I adjust my itinerary once I arrive in Sri Lanka?",
      a: "Yes! Because your route is completely private and customized, you retain full day-to-day flexibility. If you want to spend an extra hour watching elephants in Minneriya or linger at a hillside tea estate in Ella, your schedule adapts smoothly to your personal travel pace."
    },
    {
      q: "Which currencies does Plan Sri Lanka support for budget estimation?",
      a: "Our interactive planning tools support all major global currencies including USD ($), EUR (€), GBP (£), AUD (A$), CAD (C$), INR (₹), LKR (Rs), AED, SGD, and CHF. You can also specify any custom target budget per person or group."
    }
  ];

  return (
    <div className="bg-[#FCFBF7] text-[#1A2D24] min-h-screen pt-24 md:pt-32 pb-20 font-sans selection:bg-[#D4AF37]/30 selection:text-[#1F3D2B]">
      {/* STRUCTURED DATA (JSON-LD) FOR GOOGLE TRUST */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": "https://plan-srilanka.com/why-choose-plan-sri-lanka#article",
                "isPartOf": {
                  "@type": "WebPage",
                  "@id": "https://plan-srilanka.com/why-choose-plan-sri-lanka"
                },
                "headline": "Why Choose Plan Sri Lanka? The Ultimate Guide to Stress-Free, Custom Island Travel (Outperforming Traditional Competitors)",
                "description": "Discover why modern travelers choose Plan Sri Lanka over traditional tour operators. 100% free interactive route planner, verified local drivers, transparent multi-currency budgets, and flexible bespoke itineraries.",
                "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
                "datePublished": "2026-06-01T08:00:00+05:30",
                "dateModified": "2026-10-04T12:00:00+05:30",
                "mainEntityOfPage": "https://plan-srilanka.com/why-choose-plan-sri-lanka",
                "author": {
                  "@type": "Person",
                  "name": "Oshada Adithya",
                  "url": "https://plan-srilanka.com/about-founder",
                  "jobTitle": "Founder & Travel Logistics Architect"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Plan Sri Lanka",
                  "url": "https://plan-srilanka.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://plan-srilanka.com/logo.png"
                  }
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://plan-srilanka.com/why-choose-plan-sri-lanka#breadcrumb",
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
                    "name": "Travel Guides",
                    "item": "https://plan-srilanka.com/blog"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Why Choose Plan Sri Lanka",
                    "item": "https://plan-srilanka.com/why-choose-plan-sri-lanka"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://plan-srilanka.com/why-choose-plan-sri-lanka#faq",
                "mainEntity": faqs.map((f) => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* TOP BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <ol className="flex items-center space-x-2 text-xs font-mono text-[#5A5448]">
          <li>
            <Link to="/" className="hover:text-[#1F3D2B] transition-colors">Home</Link>
          </li>
          <li><span>/</span></li>
          <li>
            <Link to="/blog" className="hover:text-[#1F3D2B] transition-colors">Travel Guides</Link>
          </li>
          <li><span>/</span></li>
          <li className="text-[#1F3D2B] font-bold truncate">Why Choose Plan Sri Lanka</li>
        </ol>
      </nav>

      {/* ARTICLE HEADER / HERO */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F3D2B]/10 border border-[#1F3D2B]/20 text-[#1F3D2B] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Next-Generation Travel Platform</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F3D2B] leading-tight md:leading-[1.15] mb-6">
          Why Choose Plan Sri Lanka? The Ultimate Guide to Stress-Free, Custom Island Travel
          <span className="block text-xl sm:text-2xl font-sans font-normal text-[#5A5448] mt-3">
            (Outperforming Traditional Competitors with Transparent Tools & Verified Local Support)
          </span>
        </h1>

        {/* AUTHOR & TRUST METADATA */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-4 border-y border-[#E8E4D9] text-xs text-[#5A5448]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1F3D2B] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-sm shadow-sm">
              OA
            </div>
            <div>
              <span className="font-bold text-[#1F3D2B] block">Oshada Adithya</span>
              <span className="text-[11px] text-[#7A7365]">Founder & Travel Logistics Architect</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#7A7365]" />
            <span>Updated: June 2026 (Live Guide)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#7A7365]" />
            <span>8 Min Read</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fact-Checked & Verified</span>
          </div>
        </div>
      </header>

      {/* MAIN ARTICLE CONTENT */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* HERO IMAGE */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 border border-[#E8E4D9]">
          <img
            src="/Sigiriya-Lion-Rock-Citadel.jpeg"
            alt="Sigiriya Lion Rock Fortress - The iconic wonder of Sri Lanka"
            className="w-full h-72 sm:h-96 md:h-[460px] object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#1F3D2B] font-mono font-bold text-xs uppercase tracking-wider inline-block mb-2">
                100% Custom Travel
              </span>
              <p className="text-sm sm:text-base font-serif italic text-white/90">
                Experience authentic Sri Lanka at your own pace—from ancient ruins to misty tea valleys and sun-drenched beaches.
              </p>
            </div>
          </div>
        </div>

        {/* QUICK VALUE PROPOSITION CALLOUT */}
        <div className="bg-[#FAF8F3] border-l-4 border-[#1F3D2B] p-6 sm:p-8 rounded-r-3xl shadow-sm mb-10">
          <h2 className="text-lg font-serif font-bold text-[#1F3D2B] mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            The Plan Sri Lanka Promise
          </h2>
          <p className="text-sm sm:text-base text-[#4A453A] leading-relaxed">
            Are you dreaming of an escape to the tropical paradise of Sri Lanka? From the misty, emerald-green peaks of the Central Highlands and the ancient ruins of the Cultural Triangle to the golden, sun-kissed shores of Nilaveli and Bentota, Sri Lanka packs an astonishing variety of landscapes, cultures, and wildlife into one compact island.
          </p>
          <p className="text-sm sm:text-base text-[#4A453A] leading-relaxed mt-3">
            However, planning a trip to a foreign destination can quickly transform from an exciting adventure into an overwhelming chore. With countless travel agencies, rigid tour packages, and conflicting online advice, how do you ensure your vacation is everything you dreamed of without breaking the bank or stressing over logistics?
          </p>
          <p className="text-sm sm:text-base font-bold text-[#1F3D2B] mt-3">
            The answer is simple: <span className="underline decoration-[#D4AF37] decoration-2">Plan Sri Lanka (plan-srilanka.com)</span>.
          </p>
        </div>

        {/* TABLE OF CONTENTS */}
        <div className="bg-white border border-[#E8E4D9] rounded-2xl p-6 mb-12 shadow-sm">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A7365] block mb-3">
            Quick Navigation (Table of Contents)
          </span>
          <ul className="space-y-2 text-sm font-medium text-[#1F3D2B]">
            <li>
              <a href="#section-1" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <span className="text-xs font-mono text-[#D4AF37]">01.</span>
                The Flaw with Traditional Travel Agencies and Competitors
              </a>
            </li>
            <li>
              <a href="#section-2" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <span className="text-xs font-mono text-[#D4AF37]">02.</span>
                A 100% Free Interactive Trip Planner vs. Expensive Competitor Consultations
              </a>
            </li>
            <li>
              <a href="#section-3" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <span className="text-xs font-mono text-[#D4AF37]">03.</span>
                Trusted, Verified Local Drivers vs. Unreliable Public Transport
              </a>
            </li>
            <li>
              <a href="#section-4" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <span className="text-xs font-mono text-[#D4AF37]">04.</span>
                Fully Adjustable Itineraries vs. Rigid Mass-Market Tour Packages
              </a>
            </li>
            <li>
              <a href="#comparison-table" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <span className="text-xs font-mono text-[#D4AF37]">05.</span>
                Detailed Comparison Matrix: Plan Sri Lanka vs. Competitors
              </a>
            </li>
            <li>
              <a href="#section-5" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <span className="text-xs font-mono text-[#D4AF37]">06.</span>
                Experiencing the Best of Sri Lanka with Us (Iconic Highlights)
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <span className="text-xs font-mono text-[#D4AF37]">07.</span>
                Frequently Asked Questions (FAQs)
              </a>
            </li>
          </ul>
        </div>

        {/* INTRODUCTORY PARAGRAPHS */}
        <section className="prose prose-stone max-w-none mb-12 text-[#3D382E] leading-relaxed text-base sm:text-lg space-y-4">
          <p>
            In this comprehensive guide, we will explore why savvy modern travelers are choosing <strong>Plan Sri Lanka</strong> over traditional tour operators and cookie-cutter travel agencies.
          </p>
          <p>
            Discover how our unique approach—featuring a <strong>100% free interactive trip planner</strong>, <strong>trusted local drivers</strong>, and <strong>fully adjustable itineraries</strong>—guarantees an unforgettable, seamless journey across the pearl of the Indian Ocean.
          </p>
        </section>

        {/* SECTION 1: THE FLAW WITH TRADITIONAL OPERATORS */}
        <section id="section-1" className="mb-14 scroll-mt-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-mono font-bold text-sm flex items-center justify-center">
              01
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              The Flaw with Traditional Travel Agencies and Competitors
            </h2>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed mb-6">
            Before diving into why Plan Sri Lanka is revolutionizing island travel, it is worth looking at why traditional travel planning and competing operators often fall short:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Flaw 1 */}
            <div className="p-5 rounded-2xl bg-white border border-red-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Rigid Itineraries</h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Most conventional agencies force you into fixed schedules. If you want to spend an extra hour watching elephants in Minneriya National Park or lingering over a cup of Ceylon tea in Ella, a rigid package tour from a standard competitor won't let you.
              </p>
            </div>

            {/* Flaw 2 */}
            <div className="p-5 rounded-2xl bg-white border border-red-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Hidden Costs & Paywalls</h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Many online planning tools and generic agencies lure you in with "free" templates only to gatekeep essential details behind expensive consultation fees, unexpected booking markups, or mandatory commissions.
              </p>
            </div>

            {/* Flaw 3 */}
            <div className="p-5 rounded-2xl bg-white border border-red-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">Impersonal Experiences</h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Mass-market tourism treats travelers like numbers on a spreadsheet, shuttling them through overcrowded tourist traps with little regard for their personal pace or travel style.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>The Plan Sri Lanka Solution:</strong> Plan Sri Lanka was built from the ground up to solve these exact frustrations, putting total control, transparency, and personalization directly into the hands of the traveler.
            </p>
          </div>
        </section>

        {/* SECTION 2: 100% FREE INTERACTIVE TRIP PLANNER */}
        <section id="section-2" className="mb-14 scroll-mt-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-sm flex items-center justify-center">
              02
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              A 100% Free Interactive Trip Planner vs. Expensive Competitor Consultations
            </h2>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed mb-6">
            One of the standout reasons travelers choose Plan Sri Lanka over traditional competitors is our state-of-the-art, interactive route validator funnel and trip planner.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-700 block mb-2">
                The Competitor Flaw
              </span>
              <p className="text-sm text-[#5A5448] leading-relaxed">
                Traditional travel agencies and competing tour platforms often charge hefty consultation fees just to draft an itinerary, or they lock standard templates behind annoying paywalls and subscription models.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                The Plan Sri Lanka Advantage
              </span>
              <p className="text-sm text-[#1F3D2B] font-medium leading-relaxed">
                We provide a <strong>100% free interactive trip planner tool</strong>. You can design, customize, and test your travel routes, group sizes, and budget styles directly on our platform without spending a single penny before booking. Total transparency and freedom are always guaranteed.
              </p>
            </div>
          </div>

          {/* Sub-features of Planner */}
          <div className="space-y-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1F3D2B] mb-1">
                  Tailored Travel Vibes
                </h3>
                <p className="text-sm text-[#5A5448] leading-relaxed">
                  Whether you are looking for a romantic honeymoon escape, a deep dive into ancient culture and UNESCO heritage sites, a wildlife safari adventure, or a laid-back beach holiday, our planner lets you filter experiences based on your exact travel style.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1F3D2B] mb-1">
                  Complete Budget and Multi-Currency Flexibility
                </h3>
                <p className="text-sm text-[#5A5448] leading-relaxed">
                  Travel planning shouldn't be one-size-fits-all. Our tool allows you to specify your exact group size—whether you are a solo traveler, a couple, or a large family—and select your preferred travel budget tier (from economical stays to 5-star villas). Plus, you can seamlessly view estimates in any global currency (USD, EUR, GBP, AUD, CAD, INR, LKR, AED). For a detailed real-world cost case study, explore our dedicated <Link to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" className="text-[#1F3D2B] font-bold underline hover:text-[#D4AF37]">Chennai to Sri Lanka Trip Cost Guide</Link>.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1F3D2B] mb-1">
                  Zero Financial Risk
                </h3>
                <p className="text-sm text-[#5A5448] leading-relaxed">
                  Experiment with different routes, durations, and activities as many times as you like. The planning stage is entirely risk-free, transparent, and designed to give you absolute clarity before you make any booking decisions.
                </p>
              </div>
            </div>
          </div>

          {/* INLINE INTERACTIVE CTA BANNER */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1F3D2B] text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  Test Your Route In 60 Seconds
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Ready to test your custom Sri Lanka itinerary?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-md">
                  Select your travel vibe, pick destinations, and preview realistic drive times & budgets with zero commitment.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenFunnel("section_2_inline")}
                className="btn-shine cta-pulse-glow inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#D4AF37] text-[#1F3D2B] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shrink-0 hover:bg-white hover:text-[#1F3D2B] transition-all transform hover:-translate-y-0.5"
              >
                <span>Create My Own Route (Free) 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: TRUSTED LOCAL DRIVERS */}
        <section id="section-3" className="mb-14 scroll-mt-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-sm flex items-center justify-center">
              03
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Trusted, Verified Local Drivers vs. Unreliable Public Transport
            </h2>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed mb-6">
            Navigating a foreign country's roads, public transport schedules, and local traffic can be one of the most stressful parts of traveling. At Plan Sri Lanka, we believe your vacation should be relaxing from the moment you land at Bandaranaike International Airport (CMB).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-700 block mb-2">
                The Competitor Flaw
              </span>
              <p className="text-sm text-[#5A5448] leading-relaxed">
                Booking through random third-party networks or attempting to navigate Sri Lanka via local public transport can be exhausting, unpredictable, and unsafe for international tourists. Many competitors outsource drivers randomly, leading to poor communication and unverified service.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                The Plan Sri Lanka Advantage
              </span>
              <p className="text-sm text-[#1F3D2B] font-medium leading-relaxed">
                We connect you exclusively with professional, experienced, and trusted local drivers who also serve as knowledgeable guides. Your safety, comfort, and peace of mind are prioritized, ensuring a smooth, secure journey from the moment you arrive.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center mb-3">
                <Car className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B] mb-1">
                Local Expertise & Insider Knowledge
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Our drivers are seasoned guides who know the island inside and out. They share fascinating historical insights about ancient temples, recommend authentic local restaurants that tourists usually miss, and help you dodge long ticket lines or tourist scams.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center mb-3">
                <Compass className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B] mb-1">
                A Stress-Free Travel Companion
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Having a trusted local driver means you don't have to stress about mountain hairpins, parking, or negotiating with random roadside vendors. You can sit back, relax, enjoy the breathtaking window views, and focus entirely on making memories.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: FULLY ADJUSTABLE ITINERARIES */}
        <section id="section-4" className="mb-14 scroll-mt-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-sm flex items-center justify-center">
              04
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Fully Adjustable Itineraries vs. Rigid Mass-Market Tour Packages
            </h2>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed mb-6">
            No two travelers are alike. Why should your vacation itinerary be identical to everyone else's?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-700 block mb-2">
                The Competitor Flaw
              </span>
              <p className="text-sm text-[#5A5448] leading-relaxed">
                Most mainstream competitors rely on cookie-cutter, mass-market tour packages. They force you into strict schedules, rushing you through tourist traps and ignoring your personal pace or changing preferences.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                The Plan Sri Lanka Advantage
              </span>
              <p className="text-sm text-[#1F3D2B] font-medium leading-relaxed">
                Every traveler is unique, and we believe your vacation should reflect that. Our plans are fully adjustable and flexible, allowing you to tailor everything—whether you want cultural heritage exploration, wildlife safaris, or beach relaxation—to match your exact schedule and pace.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 font-bold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1F3D2B] mb-1">
                  Seamless Geographic Route Optimization
                </h3>
                <p className="text-sm text-[#5A5448] leading-relaxed">
                  Our platform ensures that even as you customize your stops, your route remains geographically logical. You won't waste precious vacation hours backtracking across the island because every transition is calculated for efficiency and scenic comfort.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E4D9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 font-bold" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1F3D2B] mb-1">
                  Dynamic Real-Time Adjustments
                </h3>
                <p className="text-sm text-[#5A5448] leading-relaxed">
                  Plans change, and flexibility is key to an extraordinary holiday. Our team works closely with you to ensure your journey adapts smoothly to weather shifts, spontaneous excursion ideas, or relaxing sleep-ins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE: PLAN SRI LANKA VS COMPETITORS */}
        <section id="comparison-table" className="mb-14 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
              Side-by-Side Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Plan Sri Lanka vs. Traditional Competitors
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5448] mt-1">
              See how our transparent, traveler-first platform compares directly against standard agency packages.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#E8E4D9] bg-white shadow-xl">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-[#E8E4D9] bg-[#FAF8F3]">
                  <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase text-[#7A7365]">Feature</th>
                  <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase text-[#1F3D2B] bg-emerald-50/80 border-x border-emerald-200">
                    Plan Sri Lanka 🌟
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-mono font-bold uppercase text-gray-500">
                    Traditional Tour Agencies & Competitors
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4D9] text-xs sm:text-sm">
                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-[#1F3D2B]">Itinerary Customization</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold bg-emerald-50/40 border-x border-emerald-200">
                    ✅ 100% Bespoke & fully adjustable day-by-day
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600">
                    ❌ Rigid fixed-group schedules, zero flexibility
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-[#1F3D2B]">Interactive Trip Planning Tool</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold bg-emerald-50/40 border-x border-emerald-200">
                    ✅ 100% Free interactive route validation tool
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600">
                    ❌ Paid consultations, PDF paywalls, or zero tools
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-[#1F3D2B]">Driver & Guide Quality</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold bg-emerald-50/40 border-x border-emerald-200">
                    ✅ Dedicated, verified, English-fluent local drivers
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600">
                    ❌ Randomly outsourced drivers or public bus routes
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-[#1F3D2B]">Pricing Transparency</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold bg-emerald-50/40 border-x border-emerald-200">
                    ✅ Multi-currency estimates with zero hidden fees
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600">
                    ❌ Hidden commission markups & mandatory tip quotas
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-[#1F3D2B]">Tourist Trap Avoidance</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold bg-emerald-50/40 border-x border-emerald-200">
                    ✅ Authentic local spots, no forced shopping stops
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600">
                    ❌ Frequent forced visits to commission spice/gem stores
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-[#1F3D2B]">Direct WhatsApp Support</td>
                  <td className="p-4 sm:p-5 text-emerald-800 font-semibold bg-emerald-50/40 border-x border-emerald-200">
                    ✅ Instant human WhatsApp concierge support
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600">
                    ❌ Slow email tickets or unhelpful automated call centers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: EXPERIENCING THE BEST OF SRI LANKA */}
        <section id="section-5" className="mb-14 scroll-mt-28">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold text-sm flex items-center justify-center">
              05
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Experiencing the Best of Sri Lanka with Us
            </h2>
          </div>

          <p className="text-base text-[#4A453A] leading-relaxed mb-6">
            When you build your journey with Plan Sri Lanka, you unlock the island's most iconic destinations tailored precisely to your schedule:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Highlight 1: Cultural Triangle */}
            <div className="rounded-3xl overflow-hidden border border-[#E8E4D9] bg-white shadow-md group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="/Sigiriya-Lion-Rock-Citadel.jpeg"
                  alt="Ancient Sigiriya Rock Fortress in Cultural Triangle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#1F3D2B]/90 backdrop-blur-md text-[#D4AF37] font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                  UNESCO Heritage
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-lg text-[#1F3D2B] mb-2">
                  The Cultural Triangle
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                  Explore the magnificent 5th-century rock fortress of Sigiriya, the sacred Temple of the Tooth Relic in Kandy, and the awe-inspiring painted cave temples of Dambulla with seasoned historical guidance.
                </p>
              </div>
            </div>

            {/* Highlight 2: Hill Country */}
            <div className="rounded-3xl overflow-hidden border border-[#E8E4D9] bg-white shadow-md group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="/Kandy-Tourism-Richard.jpg"
                  alt="Scenic Hill Country, Tea Estates, and Ella train"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#1F3D2B]/90 backdrop-blur-md text-[#D4AF37] font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                  Highland Panorama
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-lg text-[#1F3D2B] mb-2">
                  The Misty Hill Country
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                  Ride one of the world's most scenic blue trains through cloud-draped mountain passes, emerald Ceylon tea plantations, and roaring waterfalls, lingering at boutique bungalows in Ella and Nuwara Eliya.
                </p>
              </div>
            </div>

            {/* Highlight 3: Pristine Coastlines */}
            <div className="rounded-3xl overflow-hidden border border-[#E8E4D9] bg-white shadow-md group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="/Nilaveli-Beach-background-image.jpg"
                  alt="Nilaveli Beach and Golden Coastline"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#1F3D2B]/90 backdrop-blur-md text-[#D4AF37] font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                  Sun & Surf
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-lg text-[#1F3D2B] mb-2">
                  Pristine Coastlines & Beaches
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                  Unwind on golden sands, catch world-class waves, go ethical whale watching in Mirissa, or snorkel coral reefs along the pristine eastern shores (including iconic coastal escapes like our featured <Link to="/nilaveli-beach-travel-guide" className="text-[#1F3D2B] font-bold underline hover:text-[#D4AF37]">Nilaveli Beach Travel Guide</Link>). Wondering which coast is dry and sunny during summer? Check our seasonal breakdown on <Link to="/where-to-go-in-sri-lanka-in-june" className="text-[#1F3D2B] font-bold underline hover:text-[#D4AF37]">Where to Go in Sri Lanka in June</Link>.
                </p>
              </div>
            </div>

            {/* Highlight 4: Wildlife Sanctuaries */}
            <div className="rounded-3xl overflow-hidden border border-[#E8E4D9] bg-white shadow-md group">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="/BEN-tours-&-travels-sri-lanka.jpg"
                  alt="Wild elephants and safari in Sri Lanka"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#1F3D2B]/90 backdrop-blur-md text-[#D4AF37] font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                  Wildlife Safari
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-lg text-[#1F3D2B] mb-2">
                  Wildlife Sanctuaries & Safaris
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                  Witness majestic Asian elephants gather by the hundreds, track wild leopards in Yala and Wilpattu, and spot endemic birds during thrilling private 4x4 safaris led by ethical trackers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ESSENTIAL RELATED REGIONAL & PLANNING GUIDES */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#FAF8F3] border border-[#E8E4D9] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1F3D2B]">
              Recommended Regional Intelligence & Gateway Guides
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3D2B] mb-6">
            Continue Crafting Your Sri Lanka Itinerary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] block mb-1">Gateway Costs</span>
                <h3 className="font-serif font-bold text-sm text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                  Chennai to Sri Lanka Cost
                </h3>
                <p className="text-xs text-[#5A5448] mt-1.5 leading-relaxed">
                  Direct 80-minute flights, realistic INR budgets, driver costs & 5-day sample loops.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1F3D2B] mt-4 pt-3 border-t border-[#E8E4D9]/60">
                <span>Explore Cost Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/where-to-go-in-sri-lanka-in-october"
              className="p-5 rounded-2xl bg-white border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all group flex flex-col justify-between shadow-xs hover:shadow-md ring-1 ring-[#D4AF37]/20"
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] block mb-1">Seasonal Feature</span>
                <h3 className="font-serif font-bold text-sm text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                  Where to Go in October
                </h3>
                <p className="text-xs text-[#5A5448] mt-1.5 leading-relaxed">
                  October inter-monsoon weather, itemized family budgets & 7-day route from Chennai.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1F3D2B] mt-4 pt-3 border-t border-[#E8E4D9]/60">
                <span>Read October Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/nilaveli-beach-travel-guide"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] block mb-1">East Coast Paradise</span>
                <h3 className="font-serif font-bold text-sm text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                  Nilaveli Beach Travel Guide
                </h3>
                <p className="text-xs text-[#5A5448] mt-1.5 leading-relaxed">
                  Pigeon Island snorkeling, golden beaches, ocean swimming & Trincomalee sights.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1F3D2B] mt-4 pt-3 border-t border-[#E8E4D9]/60">
                <span>View Beach Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/where-to-go-in-sri-lanka-in-june"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] block mb-1">Monsoon Strategy</span>
                <h3 className="font-serif font-bold text-sm text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                  Where to Go in June
                </h3>
                <p className="text-xs text-[#5A5448] mt-1.5 leading-relaxed">
                  Navigate seasonal dual monsoons, find dry sunny coasts, and avoid vacation rainouts.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1F3D2B] mt-4 pt-3 border-t border-[#E8E4D9]/60">
                <span>Read Season Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* SECTION 6: FAQS WITH ACCORDION & SCHEMA */}
        <section id="faqs" className="mb-14 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block mb-1">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5448] mt-1">
              Everything you need to know about planning your dream trip with Plan Sri Lanka.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E8E4D9] bg-white overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1F3D2B] hover:text-[#D4AF37] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#7A7365] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#1F3D2B]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5A5448] leading-relaxed border-t border-[#E8E4D9]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* AUTHOR BIO / E-E-A-T TRUST CARD */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E4D9] shadow-md mb-14 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-2xl shrink-0 shadow-lg border border-[#D4AF37]/30">
            OA
          </div>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">Oshada Adithya</h3>
              <span className="text-[11px] font-mono text-[#D4AF37] bg-[#1F3D2B] px-2.5 py-0.5 rounded-full inline-block self-center sm:self-auto">
                Founder, Plan Sri Lanka
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
              Oshada is a Sri Lanka native and travel logistics architect dedicated to transparent, stress-free tourism. After seeing thousands of international visitors trapped in cookie-cutter tours and overpriced packages, he founded Plan Sri Lanka to connect modern travelers with verified local drivers, authentic culture, and 100% customizable routes.
            </p>
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-mono">
              <Link to="/about-founder" className="text-[#1F3D2B] font-bold underline hover:text-[#D4AF37]">
                Read Founder Story & Methodology →
              </Link>
            </div>
          </div>
        </div>

        {/* CONCLUSION & PRIMARY BOTTOM CALL TO ACTION */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1F3D2B] via-[#142A1D] to-[#0D1C13] text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-mono font-bold text-xs uppercase tracking-widest inline-block">
              Experience The Difference Today
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Ready to Design Your Stress-Free Sri Lanka Vacation?
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Choosing how to spend your precious vacation time and hard-earned money is a big decision. While traditional competitors offer rigid packages, hidden fees, and impersonal service, Plan Sri Lanka delivers complete freedom, transparent planning, and trusted local support.
            </p>

            <p className="text-xs sm:text-sm text-gray-400">
              Stop wrestling with rigid tour groups and confusing guidebooks. Take advantage of our free interactive trip planner, secure a trusted local driver, and design a custom itinerary that reflects your ultimate dream vacation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenFunnel("bottom_conclusion")}
                className="btn-shine cta-pulse-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#1F3D2B] font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl hover:bg-white transition-all transform hover:-translate-y-0.5"
              >
                <span>Create My Own Route (Free) 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20I%20read%20your%20guide%20and%20want%20to%20plan%20a%20custom%20trip."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", "engagement", "why_choose_conclusion")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border-2 border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>Chat on WhatsApp (+94 722 968 210)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* INTERACTIVE ROUTE FUNNEL MODAL */}
      <InteractiveRouteFunnelModal
        isOpen={isFunnelOpen}
        onClose={() => setIsFunnelOpen(false)}
      />
    </div>
  );
}
