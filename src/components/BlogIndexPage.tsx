import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Globe, 
  Users, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  Wrench, 
  Zap, 
  MapPin, 
  Clock, 
  CheckCircle2,
  Plane
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import Footer from "./Footer";

interface ArticleMeta {
  path: string;
  title: string;
  desc: string;
  image: string;
  readTime: string;
  badge: string;
  tag: string;
}

const articleCategories = [
  {
    id: "tools",
    title: "Interactive Trip Planning Tools",
    subtitle: "Real-time route calculators & step-by-step master blueprints",
    icon: <Wrench className="w-5 h-5 text-luxury-gold" />,
    isToolSection: true,
    articles: [
      {
        path: "/how-to-plan-a-trip-to-sri-lanka",
        title: "Master Trip Planner Pillar (Step-by-Step Blueprint)",
        desc: "Our comprehensive 15-minute coordination handbook. Learn how to map climate zones, allocate daily budgets, and sequence driving hours without transit exhaustion.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "Master Pillar",
        badge: "Interactive Guide",
        tag: "Core Blueprint"
      },
      {
        path: "/sri-lanka-trip-planner",
        title: "Instant Bespoke Route & Cost Generator Tool",
        desc: "An interactive decision tool that dynamically calculates driving times between beaches, hills, and safaris while forecasting accurate Indian Rupee expenses.",
        image: "https://images.unsplash.com/photo-1588598176944-4fc3a2862c93?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "Real-Time Tool",
        badge: "Instant Optimizer",
        tag: "Dynamic Calculator"
      }
    ]
  },
  {
    id: "finance",
    title: "Financial Planning & Cost Guides",
    subtitle: "Realistic budgets compiled directly in Indian Rupees (INR)",
    icon: <DollarSign className="w-5 h-5 text-luxury-gold" />,
    articles: [
      {
        path: "/sri-lanka-trip-cost-from-india",
        title: "Sri Lanka Trip Cost From India (2026 Master Guide)",
        desc: "Complete financial breakdown comparing Budget (₹32k), Mid-Range (₹48k), and Luxury tiers. Includes local meal costs, tuk-tuk benchmarks, and currency tips.",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200",
        readTime: "6 Min Read",
        badge: "Calculator Included",
        tag: "Budget & Costs"
      },
      {
        path: "/sri-lanka-trip-cost-from-bangalore",
        title: "Sri Lanka Trip Cost From Bangalore (2026 Guide)",
        desc: "Settle your total holiday budget. Compare direct flight costs from Kempegowda (BLR), hotel stay tiers, visa fee waivers, and local transport options.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "12 Min Read",
        badge: "Bangalore Gateway",
        tag: "Specialized Intel"
      },
      {
        path: "/how-much-will-it-take-to-visit-sri-lanka-from-chennai",
        title: "How Much Will It Take to Visit Sri Lanka From Chennai?",
        desc: "Specialized gateway dossier for Tamil Nadu travelers. Deep-dive into short 80-minute flight schedules out of MAA airport, Chennai weekend escapes, and overland routes.",
        image: "https://images.unsplash.com/photo-1588598176944-4fc3a2862c93?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "12 Min Read",
        badge: "Chennai Gateway",
        tag: "Specialized Intel"
      },
      {
        path: "/sri-lanka-trip-cost-from-mumbai",
        title: "Sri Lanka Trip Cost From Mumbai (2026 Guide)",
        desc: "Plan your ultimate holiday from Mumbai. Compare direct flight costs from CSMIA (BOM), hotel stay tiers, visa fee waivers, and luxury beach resorts.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "10 Min Read",
        badge: "Mumbai Gateway",
        tag: "Specialized Intel"
      },
      {
        path: "/sri-lanka-trip-cost-from-hyderabad",
        title: "Sri Lanka Trip Cost From Hyderabad (2026 Guide)",
        desc: "Plan your ultimate holiday from Hyderabad. Compare flight rates from Rajiv Gandhi Airport (HYD), 5-day and 7-day trip costs, honeymoon escapes, and family budgets.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "8 Min Read",
        badge: "Hyderabad Gateway",
        tag: "Specialized Intel"
      }
    ]
  },
  {
    id: "itineraries",
    title: "Curated Itineraries & Route Maps",
    subtitle: "Low-fatigue loops engineered for scenic enjoyment",
    icon: <Globe className="w-5 h-5 text-luxury-gold" />,
    articles: [
      {
        path: "/best-things-to-do-sri-lanka-first-time-visitors",
        title: "Best Things to Do in Sri Lanka for First-Time Visitors (2026 Guide)",
        desc: "The ultimate field-tested first timer's guide. Discover what experiences are worth paying for, what to avoid, interactive activity matchers, local datasets, and before-you-fly checklists.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "14 Min Read",
        badge: "First-Timer Special",
        tag: "Ultimate Guide"
      },
      {
        path: "/sri-lanka-travel-guide-for-americans",
        title: "Sri Lanka Travel Guide for Americans (2026)",
        desc: "The definitive guide for US travelers: free 30-day visa details, flight routings, monsoonal splits, 7 and 10-day loop itineraries, costs, and safety guidelines.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "9 Min Read",
        badge: "US Travelers Special",
        tag: "7-Day US Route"
      },
      {
        path: "/sri-lanka-7-day-itinerary",
        title: "Sri Lanka 7-Day Classic Itinerary (Optimized Loop)",
        desc: "The gold-standard first timer loop: Negombo coastal sunsets, Sigiriya Lion Rock climbing, Kandy sacred temples, Ella blue train carriages, Yala safaris, and Galle Fort.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "8 Min Read",
        badge: "Most Popular",
        tag: "7-Day Classic"
      },
      {
        path: "/sri-lanka-family-itinerary",
        title: "12-Day Stress-Free Family Itinerary With Kids",
        desc: "Engineered specifically for parents and grandparents. Features high-speed express highways to prevent toddler carsickness, gentle swimming bays, and baby safety mandates.",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200",
        readTime: "12 Min Read",
        badge: "Family Gold Standard",
        tag: "Kids Route"
      },
      {
        path: "/sri-lanka-itinerary-august-couples",
        title: "Sri Lanka Itinerary in August for Couples (2026 Guide)",
        desc: "Plan the ultimate romantic August getaway. Balance lush tea country peaks, scenic train rides, and secret sunny East Coast beaches while avoiding monsoon-swept South Coast shores.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "10 Min Read",
        badge: "Romantic Getaway",
        tag: "August Couples"
      },
      {
        path: "/how-to-plan-a-train-trip-in-sri-lanka",
        title: "How to Plan a Train Trip in Sri Lanka: The Ultimate 2026 Guide",
        desc: "The definitive handbook for planning your Sri Lanka train journey. Learn how to secure reserved tickets, select classes, map Kandy to Ella landmarks, and naturally sync with our AI Planner.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "15 Min Read",
        badge: "Comprehensive Guide",
        tag: "Train Trip Guide"
      }
    ]
  },
  {
    id: "weather",
    title: "Seasonality & Weather Intelligence",
    subtitle: "Navigate the island's unique dual-monsoon climate cycle",
    icon: <Calendar className="w-5 h-5 text-luxury-gold" />,
    articles: [
      {
        path: "/best-time-to-visit-sri-lanka",
        title: "Best Time to Visit Sri Lanka (Monthly Weather Guide)",
        desc: "Understand the opposite monsoons of the East and West coasts. Find out exactly which month matches golden sunny beach surfing versus cool misty tea estate walks.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "5 Min Read",
        badge: "Monsoon Matrix",
        tag: "Seasonal Guide"
      },
      {
        path: "/where-to-go-in-sri-lanka-in-june",
        title: "Where to Go in Sri Lanka in June (Summer Optimizer)",
        desc: "Don't ruin your summer vacation with South-West rain! Learn why June Indian travelers must pivot directly to Trincomalee, Nilaveli, Passikudah, and the Cultural Triangle.",
        image: "https://images.unsplash.com/photo-1588598176944-4fc3a2862c93?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "9 Min Read",
        badge: "Summer Escape",
        tag: "June Optimizer"
      }
    ]
  },
  {
    id: "entry",
    title: "Visa, Flights & Airport Protocols",
    subtitle: "Stress-free entry clearance and premium flight optimization",
    icon: <ShieldCheck className="w-5 h-5 text-luxury-gold" />,
    articles: [
      {
        path: "/guide-to-flying-to-sri-lanka",
        title: "The Complete Guide to Flights to Sri Lanka (2026)",
        desc: "Our master planning directory for air routing. Settle your airline choice, secure cheap flight deals, optimize transit layovers, and navigate Colombo customs flawlessly.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "12 Min Read",
        badge: "Air Travel Master",
        tag: "Flights Guide"
      },
      {
        path: "/sri-lanka-visa-for-indians",
        title: "Sri Lanka Visa For Indians (2026 ETA Clearance Guide)",
        desc: "Evade fake copycat visa portals charging 4x markups. Step-by-step instructions on applying for your Electronic Travel Authorization (ETA), fee waivers, and airport check-in rules.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
        readTime: "4 Min Read",
        badge: "Fast Approval",
        tag: "Visa & ETA"
      }
    ]
  }
];

export default function BlogIndexPage() {
  usePageMetadata({
    title: "Sri Lanka Travel Blog & Expert Guides (2026) | Plan Sri Lanka",
    description: "Explore our organized collection of Sri Lanka travel journals, budget breakdowns, 7-day itineraries, seasonal monsoon advisories, and interactive trip planning tools.",
    canonicalUrl: "https://plan-srilanka.com/blog",
    ogUrl: "https://plan-srilanka.com/blog"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 md:pt-32 flex flex-col justify-between">
      {/* Top Navigation Anchor Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Editorial Journal Header */}
        <div className="text-center md:text-left border-b border-luxury-green/10 pb-12 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/15 text-luxury-gold text-xs font-mono uppercase tracking-widest font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Plan Sri Lanka Master Library
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-luxury-green tracking-tight leading-tight mb-4">
            Ceylon Travel Intel & Blueprints
          </h1>
          <p className="text-base sm:text-lg text-luxury-black/75 font-light max-w-3xl leading-relaxed">
            We organize our complete travel guidance into structured architectural pillars so you can plan with zero ambiguity. Separate dynamic decision tools from detailed field-tested articles below.
          </p>

          {/* Quick Category Jump Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-6">
            <span className="text-xs font-mono uppercase tracking-wider text-luxury-black/50 mr-2">Category Jump:</span>
            {articleCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-4 py-2 rounded-xl bg-white border border-luxury-green/10 text-xs font-medium text-luxury-green hover:bg-luxury-gold hover:text-white hover:border-luxury-gold transition-all shadow-sm"
              >
                {cat.title.split("&")[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Render Each Categorized Pillar Section */}
        <div className="space-y-16 pb-20">
          {articleCategories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-32">
              
              {/* Category Header Bar */}
              <div className={`p-6 sm:p-8 rounded-3xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                category.isToolSection 
                  ? "bg-gradient-to-r from-luxury-green to-[#132c21] text-white shadow-xl border border-luxury-gold/30" 
                  : "bg-white border border-luxury-green/10 shadow-sm"
              }`}>
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`p-3 rounded-2xl ${category.isToolSection ? "bg-white/10 text-luxury-gold" : "bg-luxury-green/5 text-luxury-green"}`}>
                    {category.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className={`text-xl sm:text-2xl font-serif font-bold ${category.isToolSection ? "text-white" : "text-luxury-green"}`}>
                        {category.title}
                      </h2>
                      {category.isToolSection && (
                        <span className="px-2.5 py-0.5 rounded-full bg-luxury-gold text-white text-[10px] font-mono font-bold uppercase tracking-widest">
                          Interactive Tools
                        </span>
                      )}
                    </div>
                    <p className={`text-xs sm:text-sm font-light mt-0.5 ${category.isToolSection ? "text-luxury-cream/80" : "text-luxury-black/60"}`}>
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 font-mono text-xs opacity-75 md:self-center">
                  [{category.articles.length} {category.articles.length === 1 ? "Blueprint" : "Blueprints"}]
                </div>
              </div>

              {/* Articles Grid in this Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {category.articles.map((art) => (
                  <Link
                    key={art.path}
                    to={art.path}
                    onClick={() => trackEvent("blog_index_click", "engagement", art.path)}
                    className={`group relative flex flex-col justify-between rounded-3xl overflow-hidden transition-all duration-300 ${
                      category.isToolSection
                        ? "bg-[#183528] border-2 border-luxury-gold/40 hover:border-luxury-gold text-white shadow-lg hover:shadow-2xl hover:-translate-y-1"
                        : "bg-white border border-luxury-green/10 hover:border-luxury-gold text-luxury-black shadow-sm hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-neutral-200">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${category.isToolSection ? "from-[#183528] via-transparent" : "from-black/40 via-transparent"} to-transparent opacity-80`} />
                        
                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold shadow-sm ${
                            category.isToolSection ? "bg-luxury-gold text-black" : "bg-luxury-green text-white"
                          }`}>
                            {art.tag}
                          </span>
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold bg-white/90 backdrop-blur-sm text-black shadow-sm">
                            {art.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-6 sm:p-8 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono opacity-70">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-luxury-gold" /> {art.readTime}
                          </span>
                          <span className="text-luxury-gold font-bold">100% Free Access</span>
                        </div>

                        <h3 className={`text-xl sm:text-2xl font-serif font-bold group-hover:text-luxury-gold transition-colors leading-snug ${
                          category.isToolSection ? "text-white" : "text-luxury-green"
                        }`}>
                          {art.title}
                        </h3>

                        <p className={`text-xs sm:text-sm font-light leading-relaxed ${
                          category.isToolSection ? "text-luxury-cream/80" : "text-luxury-black/75"
                        }`}>
                          {art.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className={`px-6 sm:px-8 py-4 border-t flex items-center justify-between mt-4 ${
                      category.isToolSection ? "border-white/10 bg-black/10" : "border-luxury-green/5 bg-[#fdfaf2]/50"
                    }`}>
                      <span className="text-xs font-bold font-mono tracking-wider uppercase text-luxury-gold group-hover:underline flex items-center gap-1.5">
                        {category.isToolSection ? "Launch Interactive Tool" : "Read Full Blueprint"}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-luxury-gold text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Concierge Offer CTA */}
        <div className="bg-[#1e3a2f] text-white rounded-3xl p-8 sm:p-12 mb-20 text-center relative overflow-hidden border border-luxury-gold/30 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-luxury-gold font-mono text-xs uppercase tracking-[0.3em] font-bold block">
              Personalized Assistance
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-cream">
              Want Us to Combine These Pillars For You?
            </h3>
            <p className="text-sm font-light text-luxury-cream/80 leading-relaxed">
              Skip the manual planning entirely. Tell our concierge your departure city and dates on WhatsApp, and we will build an exact day-by-day luxury or comfort plan within 2 hours.
            </p>
            <a
              href="https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20I%20browsed%20your%20blog%20library%20and%20would%20love%20a%20custom%20itinerary%20designed%20for%20us."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("blog_index_whatsapp_cta", "conversion", "bottom_hero")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-luxury-gold text-black hover:bg-white transition-all font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg"
            >
              💬 WhatsApp Our Concierge Desk
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
