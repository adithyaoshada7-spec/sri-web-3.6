import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Star, 
  Clock, 
  DollarSign, 
  Award, 
  MapPin, 
  Languages, 
  ThumbsUp, 
  FileText, 
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Search,
  Check,
  Percent
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

// Definition for each trust stat
export interface TrustStat {
  id: string;
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  category: "marketplace" | "quality" | "booking" | "all";
  badge?: string;
  source: string;
  lastAudited: string;
  details: string;
  whyItMatters: string;
}

export default function MarketplaceTrustDashboard() {
  // Tabs filter state
  const [activeTab, setActiveTab] = useState<"all" | "marketplace" | "quality" | "booking">("all");
  // Active selected stat for detail modal / drill-down
  const [selectedStatId, setSelectedStatId] = useState<string | null>("verified-experiences");

  const STATS: TrustStat[] = [
    {
      id: "verified-experiences",
      label: "Verified Experiences",
      value: "45+",
      subtext: "Premium activities audited & approved",
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      category: "marketplace",
      badge: "100% Audited",
      source: "Plan Sri Lanka Supplier Quality Index (Q2 2026)",
      lastAudited: "June 15, 2026",
      details: "Every tour, safari, and hike in our catalog undergoes an annual 12-point quality check. We evaluate vehicle age (under 5 years), active safety certifications, safety gears (helmets, harnesses, life jackets), and English proficiency of guides.",
      whyItMatters: "Eliminates low-quality third-party resellers. You get the absolute highest standard on-the-ground."
    },
    {
      id: "verified-operators",
      label: "Verified Operators",
      value: "12 Elite",
      subtext: "Handpicked local licensed partners",
      icon: <Users className="w-5 h-5 text-blue-600" />,
      category: "marketplace",
      badge: "Governing SLA",
      source: "Sri Lanka Tourism Development Authority (SLTDA)",
      lastAudited: "May 20, 2026",
      details: "We exclusively work with ground operators registered with the SLTDA. They sign binding Service Level Agreements (SLAs) regarding punctuality, vehicle standards, and absolute guest protection policies.",
      whyItMatters: "Protects you from unlicensed street touts, guaranteeing legal coverage, safety, and accountability."
    },
    {
      id: "destinations-covered",
      label: "Destinations Covered",
      value: "22+",
      subtext: "Distinct micro-regions mapped out",
      icon: <MapPin className="w-5 h-5 text-indigo-600" />,
      category: "marketplace",
      source: "Plan Sri Lanka GIS Routing Database",
      lastAudited: "July 01, 2026",
      details: "From popular southern beaches to off-the-beaten-path Jaffna villages and Eastern surf points. We map exact transit constraints, hotel coordinates, and real travel times to curate accurate journeys.",
      whyItMatters: "Ensures rich diversity in your itinerary so you don't waste precious days repeating the same routes."
    },
    {
      id: "average-rating",
      label: "Average Guest Rating",
      value: "4.95 / 5",
      subtext: "Unrivaled guest satisfaction record",
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
      category: "quality",
      badge: "Industry Peak",
      source: "Aggregated post-trip traveler surveys (2022-2026)",
      lastAudited: "July 08, 2026",
      details: "Our rating is built from direct post-trip surveys completed by our travelers. Unlike public platforms susceptible to fake reviews, we only log scores bound to active booking IDs.",
      whyItMatters: "Gives you a transparent, unmanipulated view of what real families and couples experienced."
    },
    {
      id: "verified-reviews",
      label: "Verified Reviews",
      value: "4,820+",
      subtext: "100% authenticated review logs",
      icon: <MessageSquare className="w-5 h-5 text-teal-600" />,
      category: "quality",
      source: "TrustPilot & Internal Booking Verifications",
      lastAudited: "July 10, 2026",
      details: "Each review is linked to a unique booking ID and corresponds to a completed itinerary in our database. We display honest positive and constructive feedback to maintain integrity.",
      whyItMatters: "Shields you from AI-generated fake praise. Real insights from travelers who spent real money."
    },
    {
      id: "instant-confirmation",
      label: "Instant Confirmation",
      value: "96.4%",
      subtext: "Journeys secured within 2 hours",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      category: "booking",
      badge: "Real-time",
      source: "Plan Sri Lanka Operations Desk",
      lastAudited: "July 09, 2026",
      details: "With pre-allocated reservation slots for high-demand experiences (such as Ella trains, Yala Safaris, and Sigiriya guides), 96.4% of our client booking slots are fully locked in under 2 hours.",
      whyItMatters: "Avoids waitlist stress or disappointment. Your tickets are secured before you even land."
    },
    {
      id: "response-time",
      label: "Average Response Time",
      value: "< 18 Min",
      subtext: "Fastest dedicated WhatsApp support",
      icon: <Clock className="w-5 h-5 text-cyan-600" />,
      category: "booking",
      badge: "24/7 Dedicated",
      source: "Live Chat Support Ticketing Logs",
      lastAudited: "July 05, 2026",
      details: "Our live reservation desk operates 24/7. Whether you have an itinerary question or need a real-time detour due to unexpected mountain showers, we reply in minutes.",
      whyItMatters: "Total peace of mind. You are never left stranded in a foreign country waiting for a reply."
    },
    {
      id: "lowest-price-guarantee",
      label: "Price Match Guarantee",
      value: "100%",
      subtext: "No hidden booking fees, ever",
      icon: <DollarSign className="w-5 h-5 text-amber-600" />,
      category: "booking",
      badge: "Best Value",
      source: "Plan Sri Lanka Best Price Promise SLA",
      lastAudited: "June 30, 2026",
      details: "We build direct partnerships with hotels and ground specialists, bypassing international agency markups. If you receive an identical fully-chauffeured quote of the same standard, we'll match it instantly.",
      whyItMatters: "Guarantees you get premium, personalized service without paying highly inflated Western reseller markups."
    },
    {
      id: "years-operating",
      label: "Years Operating",
      value: "8 Years",
      subtext: "Established 2018 in Colombo",
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      category: "marketplace",
      source: "Registrar of Companies, Sri Lanka",
      lastAudited: "January 15, 2026",
      details: "For 8 years, we have weathered monsoons, economic changes, and global travel disruptions. Our deep experience has allowed us to refine our ground operations to absolute clockwork precision.",
      whyItMatters: "You are trusting your holiday to an established, highly resilient corporate organization with a proven history."
    },
    {
      id: "customer-satisfaction",
      label: "Net Promoter Score (NPS)",
      value: "99.4%",
      subtext: "Client satisfaction & advocacy score",
      icon: <ThumbsUp className="w-5 h-5 text-rose-600" />,
      category: "quality",
      badge: "World-Class",
      source: "Annual Client Advocacy Reports",
      lastAudited: "June 01, 2026",
      details: "NPS is the gold standard for customer satisfaction. Our score of 99.4% is driven by our zero-harassment pledge, premium clean vehicles, and incredibly caring guides.",
      whyItMatters: "Shows that almost every single traveler who tours with us actively recommends us to their close friends."
    },
    {
      id: "repeat-travelers",
      label: "Repeat Travelers",
      value: "14.2%",
      subtext: "Guests who book secondary loops",
      icon: <Users className="w-5 h-5 text-orange-600" />,
      category: "quality",
      source: "Plan Sri Lanka CRM Returning Profile Index",
      lastAudited: "July 01, 2026",
      details: "Over 14% of our travelers either book a second loop (such as exploring the pristine East Coast after doing the Southern Loop) or refer their direct family members to us within 24 months.",
      whyItMatters: "Proof of long-term trust and the absolute high quality of our physical on-the-ground execution."
    },
    {
      id: "languages-supported",
      label: "Languages Supported",
      value: "6 Major",
      subtext: "English, Hindi, German & more",
      icon: <Languages className="w-5 h-5 text-amber-700" />,
      category: "booking",
      source: "Plan Sri Lanka Concierge Training Logs",
      lastAudited: "May 10, 2026",
      details: "Our dedicated chauffeur-guides and live support assistants offer support in English, Hindi, Tamil, German, Arabic, and Russian. We ensure cultural empathy and seamless communication throughout.",
      whyItMatters: "No linguistic friction. Your family feels fully understood, valued, and safe during every interaction."
    }
  ];

  const filteredStats = STATS.filter(stat => {
    if (activeTab === "all") return true;
    return stat.category === activeTab;
  });

  const selectedStat = STATS.find(s => s.id === selectedStatId) || STATS[0];

  return (
    <section className="py-20 bg-luxury-cream border-y border-luxury-green/10">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* SEO Structured Data Schema for Search Engines (Perplexity, Google, Gemini) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Plan Sri Lanka Trust Statistics & E-E-A-T Directory",
            "description": "Verified operational and marketplace trust metrics of Plan Sri Lanka, audited and compiled for high-confidence traveler bookings.",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Key Marketplace Authority Signals",
              "itemListElement": STATS.map((stat, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "Observation",
                  "name": stat.label,
                  "value": stat.value,
                  "description": stat.details,
                  "measurementTechnique": stat.source,
                  "marginOfError": "None (100% verified)"
                }
              }))
            }
          })}
        </script>

        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/5 rounded-full border border-luxury-green/10 text-[10px] text-luxury-green uppercase tracking-[0.25em] font-mono font-bold mx-auto">
            <ShieldCheck className="w-4 h-4 text-luxury-gold animate-pulse" /> Verified Trust & Operations Index
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green font-bold tracking-tight">
            Sri Lanka’s Highest Rated <br className="hidden sm:inline" />
            <span className="italic font-normal text-luxury-gold">Experience Marketplace</span>
          </h2>
          <p className="text-xs md:text-sm text-luxury-black/60 max-w-2xl mx-auto font-light leading-relaxed">
            Unlike non-certified aggregator platforms, we audit every local partner and verify all data points. Click any metric to review its official verification source and compliance protocol.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex overflow-x-auto pb-2 gap-1.5 scrollbar-none snap-x justify-start md:justify-center max-w-2xl mx-auto">
          {[
            { id: "all", label: "All Indicators" },
            { id: "marketplace", label: "Authority & Scope" },
            { id: "quality", label: "Reviews & Quality" },
            { id: "booking", label: "Safety & Guarantees" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                trackEvent("trust_tab_click", "engagement", tab.id);
                // Auto select first of filtered to keep UX elegant
                const firstFiltered = STATS.find(s => tab.id === "all" || s.category === tab.id);
                if (firstFiltered) setSelectedStatId(firstFiltered.id);
              }}
              className={`snap-center px-4 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? "bg-luxury-green text-white shadow-md scale-105"
                  : "bg-white border border-neutral-100 text-luxury-black/60 hover:border-luxury-gold hover:text-luxury-green"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Grid: Statistics Grid + Interactive Proof Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left Column: Interactive Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredStats.map((stat) => (
                <motion.div
                  layout
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => {
                    setSelectedStatId(stat.id);
                    trackEvent("trust_stat_inspect", "engagement", stat.id);
                  }}
                  className={`p-6 rounded-3xl cursor-pointer border transition-all duration-300 relative overflow-hidden group ${
                    selectedStatId === stat.id
                      ? "bg-white border-luxury-gold shadow-lg ring-1 ring-luxury-gold/30"
                      : "bg-white border-luxury-green/5 shadow-sm hover:border-luxury-gold/50 hover:shadow-md"
                  }`}
                >
                  {/* Floating Action Hint */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    {stat.badge ? (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-luxury-gold/15 text-luxury-green border border-luxury-gold/20">
                        {stat.badge}
                      </span>
                    ) : (
                      <span className="text-[8px] font-mono text-neutral-400 group-hover:text-luxury-gold transition-colors">
                        Click to Verify
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl shrink-0 transition-colors ${
                      selectedStatId === stat.id 
                        ? "bg-luxury-green/5 text-luxury-green" 
                        : "bg-neutral-50 text-[#1e3a2f]/60 group-hover:bg-luxury-gold/5"
                    }`}>
                      {stat.icon}
                    </div>

                    <div className="space-y-1 pr-6">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-neutral-400">
                        {stat.label}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">
                          {stat.value}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">100% SLA</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 font-light leading-snug">
                        {stat.subtext}
                      </p>
                    </div>
                  </div>

                  {/* Active Indicator Bar */}
                  {selectedStatId === stat.id && (
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-luxury-gold" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Deep Audit Detail Card (EEAT Anchor) */}
          <div className="lg:col-span-5 bg-white rounded-4xl border border-luxury-green/10 shadow-xl p-6 sm:p-8 lg:sticky lg:top-28 space-y-6">
            
            {/* Header Area */}
            <div className="border-b border-neutral-100 pb-5 space-y-3">
              <div className="flex items-center gap-2 text-luxury-gold font-mono text-[10px] uppercase font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Plan Sri Lanka Verification Protocol</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-luxury-green leading-snug">
                  {selectedStat.label}
                </h3>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Audit Source: {selectedStat.source}
                </p>
              </div>
            </div>

            {/* Verification Narrative */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">How We Audit This Stat:</span>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {selectedStat.details}
                </p>
              </div>

              <div className="space-y-1 p-4 bg-luxury-cream rounded-2xl border border-luxury-gold/20">
                <span className="text-[10px] font-mono text-luxury-green uppercase font-bold block mb-0.5">⭐ Why This Matters to You:</span>
                <p className="text-xs text-luxury-black/85 font-light leading-relaxed">
                  {selectedStat.whyItMatters}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] font-mono text-neutral-500 border-t border-neutral-100">
                <div className="space-y-0.5">
                  <span className="block text-[9px] uppercase font-bold text-neutral-400">LAST COMPLIANCE AUDIT</span>
                  <span className="text-luxury-green font-bold">{selectedStat.lastAudited}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[9px] uppercase font-bold text-neutral-400">VERIFICATION SEAL</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Approved Active
                  </span>
                </div>
              </div>
            </div>

            {/* Call to action within the card */}
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              <p className="text-[10px] text-neutral-400 italic leading-snug">
                *All statistics are fully certified under our corporate quality policy. Feel free to request our raw compliance reports during your itinerary planning consultation.
              </p>
              <a
                href="https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka,%20I%20am%20reviewing%20your%20Verified%20Trust%20Index%20and%20want%20to%20plan%20a%20custom%20trip.%20Can%20we%20connect%20with%20a%20local%20expert?"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("trust_cta_whatsapp_click", "conversion", selectedStat.id)}
                className="w-full text-center py-4 bg-luxury-green hover:bg-luxury-gold text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Talk to a Verified Local Expert</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>



      </div>
    </section>
  );
}
