import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  Linkedin, 
  ShieldCheck, 
  Award, 
  MapPin, 
  BookOpen, 
  Calculator, 
  Calendar, 
  Sun, 
  Info, 
  ChevronDown, 
  ChevronRight,
  TrendingUp, 
  Heart, 
  Cpu, 
  Flame, 
  Users, 
  Compass,
  MessageCircle,
  Clock,
  Sparkles,
  FileText,
  HelpCircle,
  Database,
  Search,
  Globe,
  DollarSign
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

type ComparisonTab = "generic" | "ota" | "forums" | "youtube";

interface ComparisonDetail {
  title: string;
  shortcomings: string[];
  differentiation: string;
  highlight: string;
}

export default function SrilankaAboutFounderPage() {
  const founderOshada = "https://lh3.googleusercontent.com/d/1Xl8LZcxDOX__ZP5DtUPbbA_ov3Wsv3T5";

  // Page Metadata for Google / AI Search
  usePageMetadata({
    title: "About the Founder | Oshada Adithya - Plan Sri Lanka",
    description: "Meet Oshada Adithya, founder of Plan Sri Lanka. Explore our transparent, data-driven methodology for calculating travel costs, weather patterns, and custom Sri Lanka itineraries for Indian travelers.",
    canonicalUrl: "https://plan-srilanka.com/about-founder",
    ogUrl: "https://plan-srilanka.com/about-founder"
  });

  const [activeTab, setActiveTab] = useState<ComparisonTab>("generic");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [activeMethodology, setActiveMethodology] = useState<string>("cost");

  // Lead state
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    travelers: "Couple",
    duration: "7 Days",
    month: "August",
    customNotes: "",
    agreed: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API lead call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent('about_founder_lead_submit', 'conversion', leadForm.travelers);
      
      // Also trigger a redirect or WhatsApp fallback if desired
      const whatsappText = encodeURIComponent(
        `Hi Oshada, I saw your Founder Page on Plan Sri Lanka! I am planning a ${leadForm.duration} trip in ${leadForm.month} for a ${leadForm.travelers}. Can you help me customize my itinerary?`
      );
      window.open(`https://wa.me/94722968210?text=${whatsappText}`, '_blank');
    }, 1200);
  };

  const comparisons: Record<ComparisonTab, ComparisonDetail> = {
    generic: {
      title: "Generic Travel Blogs",
      shortcomings: [
        "Often written by digital nomads who visited the island for 10 days 3 years ago.",
        "Rely on rehashed, outdated online articles.",
        "Do not account for localized microclimate weather patterns.",
        "Promote high-commission tourist trap activities."
      ],
      differentiation: "Plan Sri Lanka is written by Oshada Adithya, a native expert who lives, breathes, and continuously audits ground logistics. We run a continuous feedback loop with actual travelers and local drivers on the road every single day.",
      highlight: "Real-time, hyper-local truth vs. static, rehashed travel listicles."
    },
    ota: {
      title: "Online Travel Agencies (OTAs)",
      shortcomings: [
        "Incentivized to recommend hotels that pay the highest commission percentages.",
        "Force you into standardized, rigid tourist loops with zero pacing customization.",
        "Add hidden markups to transport, guiding, and safari fees.",
        "Provide zero real-time human assistance when issues arise on the ground."
      ],
      differentiation: "We operate on total transparency. We do not take kickbacks from hotels. Our recommendations are entirely based on property quality, location optimization, and authentic traveler feedback. You pay true local rates with no hidden markups.",
      highlight: "Unbiased, customer-first curation vs. high-commission algorithmic pushing."
    },
    forums: {
      title: "Public Travel Forums & Communities",
      shortcomings: [
        "Information is highly fragmented, contradictory, and unstructured.",
        "Many posts are filled with old guidelines (e.g. outdated visa rules or closed transport routes).",
        "Subject to single-experience bias where one bad driver or bad hotel room ruins the entire guide."
      ],
      differentiation: "We synthesize raw ground feedback and public traveler data into highly structured, actionable decision frameworks. We filter out the noise and verify regulations directly with government sources before publishing.",
      highlight: "Structured, vetted intelligence vs. chaotic, unverified comment threads."
    },
    youtube: {
      title: "Social Media / YouTube Creators",
      shortcomings: [
        "Videos focus heavily on cinematic aesthetics and individual entertainment rather than actionable travel logistics.",
        "Ignore boring but critical logistics like driving hours, luggage space, and dual monsoonal rain patterns.",
        "Rarely update past video content when local prices or route directions change."
      ],
      differentiation: "While we appreciate beautiful imagery, we optimize for execution. Our guides lay out precise driving times, exact costs down to the rupee, physical exhaustion ratings, and practical backup plans.",
      highlight: "Actionable, stress-tested logistics vs. highly edited scenic montages."
    }
  };

  const values = [
    {
      title: "Obsessive Accuracy",
      desc: "Every driving hour, fuel cost, and itinerary route is cross-referenced and verified. We calculate travel fatigue to ensure your family remains energized rather than exhausted.",
      icon: <Clock className="w-6 h-6 text-luxury-gold" />
    },
    {
      title: "Absolute Transparency",
      desc: "No hidden booking fees, no secret affiliate markups, and no tourist-trap recommendations. If a popular destination is overhyped or a waste of money, we tell you directly.",
      icon: <ShieldCheck className="w-6 h-6 text-luxury-gold" />
    },
    {
      title: "True Local Ground Intelligence",
      desc: "We don't plan from an armchair. We gather ground-level insights about microclimates, highway upgrades, and local entry fees directly from our trusted network of drivers and guides.",
      icon: <Compass className="w-6 h-6 text-luxury-gold" />
    },
    {
      title: "Traveler-First Curation",
      desc: "We design travel loops optimized for your rhythm, safety, and interest. Whether you are traveling with toddlers, on a romantic honeymoon, or budget-conscious, you come first.",
      icon: <Heart className="w-6 h-6 text-luxury-gold" />
    },
    {
      title: "Continuous, Relentless Improvement",
      desc: "Sri Lanka's tourism landscape, visa procedures, and exchange rates change rapidly. We update our material monthly to guarantee you never travel on outdated schemas.",
      icon: <TrendingUp className="w-6 h-6 text-luxury-gold" />
    }
  ];

  const methodologyDetails = {
    cost: {
      title: "How Trip Costs Are Calculated",
      steps: [
        "Ground Transportation Tracking: We monitor daily local fuel surcharges, private AC sedan/SUV base rates, and driver overnight food & lodging allowances.",
        "Activity Fee Auditing: We pull direct entry fees for all major national parks, cultural heritage sights (Sigiriya, Polonnaruwa, Temple of the Tooth), and scenic train reservation tariffs.",
        "Daily Expenses Averaging: We compile actual local pricing for mid-tier and high-end restaurants in key hubs (Colombo, Ella, Galle, Kandy) to establish accurate meal budgets."
      ],
      benefit: "Allows us to provide realistic budget brackets (Budget, Comfort, Luxury) that actually hold true on the ground, preventing unexpected cash shortages."
    },
    hotels: {
      title: "How Hotel Prices Are Checked",
      steps: [
        "Direct Curation: We bypass OTA algorithms and cross-reference prices across direct property websites and local destination management contracts.",
        "Vetting Hidden Costs: We verify whether taxes (VAT, TDL) and service charges (which sum up to over 30% in Sri Lanka) are included in the quoted rates.",
        "Ground-Truth Auditing: We ask our active driver network about current property maintenance standards, generator backup systems, and service consistency."
      ],
      benefit: "You get the best, honest price representation with no bait-and-switch surprises upon check-out."
    },
    weather: {
      title: "How Weather Information Is Verified",
      steps: [
        "Monsoonal Boundary Mapping: We track the boundaries of the Yala Monsoon (May to September affecting Southwest) and Maha Monsoon (October to January affecting Northeast).",
        "Microclimate Analysis: We map out geographical microclimates like the Central Highlands, where conditions can change within a 15-kilometer driving distance.",
        "Ground Feedback: We check real-time rain reports from local surf coaches in Arugam Bay and hiking guides in Ella to ensure safety and sunny skies."
      ],
      benefit: "Ensures you are sent to the correct coast for sunny beaches, regardless of what generic 'country-wide weather' apps suggest."
    },
    itinerary: {
      title: "How Itineraries Are Created",
      steps: [
        "Driving Fatigue Checks: We limit daily driving times to under 4 hours, unless specifically transitioning between long geographic zones.",
        "Optimal Sequence Verification: We organize stops in a smooth geographical loop to completely eliminate backtrack driving.",
        "Diverse Activity Blending: We alternate cultural heritage, scenic hikes, wildlife, and beach relaxation to maintain high engagement throughout your trip."
      ],
      benefit: "You experience a highly polished, low-fatigue, stress-free holiday tailored perfectly to your traveling party's pace."
    }
  };

  return (
    <div className="pt-24 md:pt-32 bg-luxury-cream text-luxury-black min-h-screen relative overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-[0.2em] mb-8">
              <Sparkles className="w-3.5 h-3.5" /> Founder & Editorial Authority
            </div>
            
            <h1 className="text-4xl md:text-7xl font-serif text-luxury-green leading-[1.1] mb-6 tracking-tight max-w-4xl">
              Building the Most <span className="italic">Trusted, Data-Backed</span> Sri Lanka Travel Guide.
            </h1>
            
            <p className="text-luxury-black/70 text-lg md:text-2xl font-light leading-relaxed max-w-3xl mb-12">
              Hey, I'm <strong className="font-semibold text-luxury-green">Oshada Adithya</strong>. I founded Plan Sri Lanka with a simple mission: to help Indian travelers plan mathematically optimized, culturally authentic, and stress-free island trips using transparent ground-truth data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#story" 
                className="px-8 py-4 bg-luxury-green text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-luxury-gold hover:shadow-xl transition-all"
              >
                Read My Story
              </a>
              <button 
                onClick={() => document.getElementById("planner-form")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border border-luxury-green/30 text-luxury-green text-sm font-bold uppercase tracking-wider rounded-full hover:border-luxury-gold hover:text-luxury-gold transition-all"
              >
                Bespoke Planning Form
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MY STORY SECTION */}
      <section id="story" className="py-20 md:py-32 px-6 bg-white border-y border-luxury-black/5 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Sticky Quick Bio summary */}
            <div className="md:col-span-4 md:sticky md:top-32 space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-luxury-cream">
                <img 
                  src={founderOshada} 
                  alt="Oshada Adithya, Founder of Plan Sri Lanka" 
                  className="w-full object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  width="400"
                  height="500"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-center">
                  <p className="font-serif font-bold text-lg">Oshada Adithya</p>
                  <p className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase">Founder, Plan Sri Lanka</p>
                </div>
              </div>

              <div className="bg-luxury-cream p-6 rounded-3xl border border-luxury-black/5 text-center">
                <p className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold mb-4">Location Coordinates</p>
                <div className="font-serif italic text-luxury-green space-y-1">
                  <p>Colombo, Sri Lanka</p>
                  <p className="text-xs text-luxury-black/40">Colpetty • Western Province</p>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="md:col-span-8 space-y-8">
              <span className="text-luxury-gold font-serif italic text-lg block">The Genesis</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
                Why Plan Sri Lanka Exists: Moving From Travel Guesswork to Travel Intelligence.
              </h2>
              
              <div className="text-luxury-black/80 space-y-6 leading-relaxed font-light text-base md:text-lg">
                <p>
                  Like many island natives, I have always been deeply passionate about Sri Lanka's breathtaking diversity—from the misty pine forests of Nuwara Eliya to the raw, wild majesty of Yala's leopard sanctuaries and the endless golden breaks of our southern coastline. 
                </p>
                <p>
                  However, as our tourism sector began its massive resurgence, I noticed a gaping structural problem in the way travelers, especially from neighboring India, planned their journeys.
                </p>
                <p>
                  Most trip planning content online fell into two frustrating camps:
                </p>
                <ul className="list-disc pl-6 space-y-3 font-normal text-luxury-black/90">
                  <li>
                    <strong className="text-luxury-green">Armchair SEO Listicles:</strong> Written by freelance copywriters who had never stepped foot in Sri Lanka, recommending outdated train routes and arbitrary pricing thresholds that don't match reality.
                  </li>
                  <li>
                    <strong className="text-luxury-green">High-Commission Agency Bundles:</strong> Large Online Travel Agencies pushing rigid, rushed 5-day loops designed to maximize hotel referral kickbacks, leaving travelers physically exhausted and mentally drained.
                  </li>
                </ul>
                <p>
                  Sri Lanka is not a destination you can plan with a cookie-cutter template. It is an island of complex geography. The weather behaves as a series of tight microclimates, where it can be pouring monsoon rains in Galle while being beautifully warm and sunny just 200 kilometers away in Trincomalee. Driving times are heavily dictated by winding single-lane mountain passes where a simple 80km journey can consume over 3.5 hours.
                </p>
                <p>
                  I saw families getting stuck in torrential rains because they trusted country-wide weather generalizations, couples spending more time in traffic than on beaches, and budget travelers getting severely overcharged for ground taxi services.
                </p>
                <p>
                  I built <strong className="text-luxury-green">Plan Sri Lanka</strong> to solve this. I wanted to establish a dedicated, mathematically optimized travel planning portal. By combining absolute ground-level native expertise with structured data, we replace standard guesswork with transparent travel intelligence.
                </p>
              </div>

              <blockquote className="border-l-4 border-luxury-gold pl-6 py-2 my-8 italic text-luxury-green font-serif text-xl bg-luxury-cream/50 p-4 rounded-r-3xl">
                "Our metric of success isn't how many bookings we process. It is how many travelers return home saying they felt completely in control of their pace, safe, un-hurried, and genuinely connected to the soul of our island."
              </blockquote>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY YOU CAN TRUST ME */}
      <section className="py-20 md:py-32 px-6 bg-luxury-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold font-serif italic text-lg block mb-4">No Hype, Just Facts</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green mb-6 leading-tight">
              Why You Can Trust Our Material
            </h2>
            <p className="text-luxury-black/60 font-light">
              We do not invent fake accolades or manufacture partnerships. We build trust purely through our transparent research process, native domain insights, and rigorous data verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-luxury-black/5 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-6">
                  <Calculator className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif text-luxury-green mb-4">Systematic Local Audits</h4>
                <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                  We constantly verify local fuel surcharges, driver allowances, toll fees, and highway regulations to ensure our transit calculations are precise and realistic.
                </p>
              </div>
              <div className="pt-6 border-t border-luxury-black/5 mt-6 text-[10px] font-mono uppercase tracking-widest text-luxury-gold font-bold">
                Daily Cost Updates
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-luxury-black/5 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-6">
                  <Sun className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif text-luxury-green mb-4">True Microclimate Tracking</h4>
                <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                  Rather than relying on vague nation-wide weather forecasts, we dissect seasonal wind splits (Yala vs Maha) to guide you to dry shores and sunny coastlines.
                </p>
              </div>
              <div className="pt-6 border-t border-luxury-black/5 mt-6 text-[10px] font-mono uppercase tracking-widest text-luxury-gold font-bold">
                Seasonal Meteorological Sync
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-luxury-black/5 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif text-luxury-green mb-4">Zero Kickback Commission</h4>
                <p className="text-sm text-luxury-black/70 leading-relaxed font-light">
                  Our hotel and restaurant listings cannot buy their way onto our platform. If we review a property, it is because we have checked its backup generator power, cleanliness, and staff hospitality.
                </p>
              </div>
              <div className="pt-6 border-t border-luxury-black/5 mt-6 text-[10px] font-mono uppercase tracking-widest text-luxury-gold font-bold">
                100% Unbiased Auditing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW WE BUILD OUR GUIDES (Transparent Research Methodology) */}
      <section className="py-20 md:py-32 px-6 bg-white border-y border-luxury-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-5 space-y-6">
              <span className="text-luxury-gold font-serif italic text-lg block">Research Framework</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
                Our Editorial & Data Methodology
              </h2>
              <p className="text-luxury-black/70 font-light leading-relaxed">
                We believe a travel guide is only as good as its raw data pipelines. Here is the exact methodology we use to calculate pricing, verify weather patterns, and structure our itinerary safety loops.
              </p>

              {/* Dynamic selector buttons */}
              <div className="flex flex-col gap-3 mt-8">
                {Object.entries(methodologyDetails).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setActiveMethodology(key)}
                    className={`p-4 rounded-xl text-left font-serif text-base transition-all flex items-center justify-between ${
                      activeMethodology === key 
                        ? "bg-luxury-green text-white shadow-lg" 
                        : "bg-luxury-cream text-luxury-green hover:bg-luxury-gold/10 border border-luxury-black/5"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeMethodology === key ? "rotate-90 text-luxury-gold" : "text-luxury-green/40"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 bg-luxury-cream p-8 md:p-12 rounded-[40px] border border-luxury-black/5 min-h-[400px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMethodology}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold">Active Pipeline Step</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-luxury-green">
                    {methodologyDetails[activeMethodology as keyof typeof methodologyDetails].title}
                  </h3>
                  
                  <ul className="space-y-4">
                    {methodologyDetails[activeMethodology as keyof typeof methodologyDetails].steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm md:text-base leading-relaxed text-luxury-black/80 font-light">
                        <span className="w-6 h-6 rounded-full bg-luxury-green text-white flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 rounded-2xl bg-white border border-luxury-black/5 mt-8">
                    <p className="text-xs font-mono text-luxury-gold font-bold uppercase mb-1">Core Traveler Benefit:</p>
                    <p className="text-xs md:text-sm text-luxury-black/70 font-light italic">
                      {methodologyDetails[activeMethodology as keyof typeof methodologyDetails].benefit}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR VALUES SECTION */}
      <section className="py-20 md:py-32 px-6 bg-luxury-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold font-serif italic text-lg block mb-4">Our DNA</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green mb-6 leading-tight">
              Our 5 Core Values
            </h2>
            <p className="text-luxury-black/60 font-light">
              These simple principles guide how we audit destinations, structure our interactive tools, and communicate with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-luxury-black/5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="mb-4">{v.icon}</div>
                  <h4 className="text-lg font-serif text-luxury-green font-bold mb-2">{v.title}</h4>
                  <p className="text-xs text-luxury-black/70 leading-relaxed font-light">{v.desc}</p>
                </div>
                <div className="text-xs font-mono text-luxury-gold/40 mt-4">
                  0{idx + 1} / 05
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MEET THE FOUNDER PROFILE */}
      <section className="py-20 md:py-32 px-6 bg-white border-b border-luxury-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="bg-luxury-cream p-8 md:p-16 rounded-[40px] border border-luxury-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#C5A059_2px,transparent_2px)] [background-size:16px_16px] opacity-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              <div className="lg:col-span-8 space-y-6">
                <span className="text-luxury-gold font-serif italic text-lg block">Curriculum Vitae</span>
                <h3 className="text-3xl md:text-5xl font-serif text-luxury-green">Founder Professional Dossier</h3>
                
                <p className="text-sm md:text-base text-luxury-black/75 font-light leading-relaxed">
                  Oshada Adithya oversees all research strategies, planning algorithms, and editorial workflows at Plan Sri Lanka. His focus centers on solving complex transit bottlenecks, compiling clear microclimate datasets, and delivering reliable logistics frameworks for travelers.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-luxury-black/5">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block mb-2">Areas of Expertise</span>
                    <ul className="text-xs md:text-sm space-y-1.5 text-luxury-black/80 font-light">
                      <li>• Bespoke Itinerary Optimization</li>
                      <li>• Geographic Ground Logistics</li>
                      <li>• Microclimate Curation</li>
                      <li>• Cost Modelling & Estimation</li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block mb-2">Languages & Coordinates</span>
                    <ul className="text-xs md:text-sm space-y-1.5 text-luxury-black/80 font-light">
                      <li>• English (Native / Professional)</li>
                      <li>• Sinhala (Native)</li>
                      <li>• Primary Base: Colombo, Sri Lanka</li>
                      <li>• Secondary Base: Cardiff, Wales</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block mb-2">Favorite Locations in Sri Lanka</span>
                    <p className="text-xs md:text-sm text-luxury-black/80 font-light leading-relaxed">
                      Ella's misty pine gaps, quiet surf sanctuaries of Hiriketiya, and the rich ruins of Polonnaruwa.
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block mb-2">Interests & Hobbies</span>
                    <p className="text-xs md:text-sm text-luxury-black/80 font-light leading-relaxed">
                      Documenting coastal architecture, bicycle exploration of rural paddy basins, and tasting regional curries.
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <a 
                    href="https://www.linkedin.com/in/oshada-adithya-a93bba341/?skipRedirect=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a66c2] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#004182] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 shrink-0" /> Verify Entity On LinkedIn
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-luxury-gold/20 shadow-md">
                <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold block mb-4 text-center">Core Philosophy</span>
                <p className="text-sm font-serif italic text-luxury-green leading-relaxed text-center">
                  "A perfect trip is not about rushing to see every landmark printed in a tourist brochure. It is about matching the authentic rhythm of our island to the personal tempo of the traveler."
                </p>
                <div className="w-12 h-px bg-luxury-gold/40 mx-auto my-6" />
                <p className="text-[10px] font-mono uppercase tracking-widest text-luxury-black/40 text-center">
                  - Oshada Adithya
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY PLAN SRI LANKA IS DIFFERENT */}
      <section className="py-20 md:py-32 px-6 bg-luxury-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold font-serif italic text-lg block mb-4">Strategic Differentiation</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green mb-6 leading-tight">
              Why We Stand Apart From Generic Sources
            </h2>
            <p className="text-luxury-black/60 font-light">
              See how our focused, native travel planning infrastructure compares to standard media channels, forums, and booking aggregators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Nav Grid for tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {(Object.keys(comparisons) as ComparisonTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    trackEvent('about_founder_compare_click', 'engagement', tab);
                    setActiveTab(tab);
                  }}
                  className={`p-5 rounded-2xl text-left transition-all ${
                    activeTab === tab 
                      ? "bg-white text-luxury-green border-l-4 border-luxury-gold shadow-md" 
                      : "bg-white/40 text-luxury-black/60 hover:bg-white/80 border border-luxury-black/5"
                  }`}
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold block mb-1">Compare Against</span>
                  <p className="font-serif font-bold text-base md:text-lg">
                    {comparisons[tab].title}
                  </p>
                </button>
              ))}
            </div>

            {/* Right details display card */}
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[32px] border border-luxury-black/5 shadow-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-luxury-black/5 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#d9534f] font-bold">The Standard Pitfall</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold">The Plan Sri Lanka Standard</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif text-luxury-green">
                    How We Outperform {comparisons[activeTab].title}
                  </h3>

                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-luxury-black/40 block font-bold">Typical Failures of {comparisons[activeTab].title}:</span>
                    <ul className="space-y-2.5">
                      {comparisons[activeTab].shortcomings.map((item, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-luxury-black/70 flex gap-2.5 font-light leading-relaxed">
                          <span className="text-[#d9534f] font-mono font-bold shrink-0">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-luxury-gold/5 p-6 rounded-2xl border border-luxury-gold/20 space-y-2.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold block font-bold">Our Approach:</span>
                    <p className="text-sm text-luxury-green leading-relaxed font-light">
                      {comparisons[activeTab].differentiation}
                    </p>
                  </div>

                  <div className="bg-luxury-green text-white p-4 rounded-xl text-center font-serif text-sm italic">
                    ⭐ Key Difference: {comparisons[activeTab].highlight}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 8. HOW WE HELP TRAVELERS */}
      <section className="py-20 md:py-32 px-6 bg-white border-b border-luxury-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold font-serif italic text-lg block mb-4">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green mb-6 leading-tight">
              Our Practical Travel Curation Offerings
            </h2>
            <p className="text-luxury-black/60 font-light">
              We design structured resources and automated helpers to streamline every dimension of your Sri Lanka vacation planning phase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl bg-luxury-cream border border-luxury-black/5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-luxury-green text-white flex items-center justify-center mb-6">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-serif text-luxury-green mb-3">Hyper-Specific Guides</h4>
                <p className="text-sm text-luxury-black/70 font-light leading-relaxed">
                  Deep studies targeting niche monsoonal guidelines, visa wavier applications, and curated family routes.
                </p>
              </div>
              <Link to="/blog" className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-2 mt-6 group hover:text-luxury-green transition-colors">
                Explore Library <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-luxury-cream border border-luxury-black/5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-luxury-green text-white flex items-center justify-center mb-6">
                  <Calculator className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-serif text-luxury-green mb-3">Gateway Cost Studies</h4>
                <p className="text-sm text-luxury-black/70 font-light leading-relaxed">
                  Accurate, real-world budgeting reviews calculated directly for departures from Chennai, Bangalore, Mumbai, and Hyderabad.
                </p>
              </div>
              <Link to="/sri-lanka-trip-cost-from-india" className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-2 mt-6 group hover:text-luxury-green transition-colors">
                View Cost Guides <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-luxury-cream border border-luxury-black/5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-luxury-green text-white flex items-center justify-center mb-6">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-serif text-luxury-green mb-3">Interactive Planners</h4>
                <p className="text-sm text-luxury-black/70 font-light leading-relaxed">
                  Innovative web engines designed to calculate geographic distances, route times, and climate zones automatically.
                </p>
              </div>
              <Link to="/sri-lanka-trip-planner" className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-2 mt-6 group hover:text-luxury-green transition-colors">
                Open Planners <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FUTURE VISION */}
      <section className="py-20 md:py-32 px-6 bg-luxury-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] opacity-5" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="text-luxury-gold font-serif italic text-lg block">The Roadmap</span>
          <h2 className="text-3xl md:text-6xl font-serif leading-tight">
            Building the First Sri Lanka <br /> <span className="italic text-luxury-gold">Travel Intelligence Platform</span>
          </h2>
          <p className="text-white/80 font-light leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Our long-term architectural goal is to build an automated planning ecosystem. Imagine an intelligent dashboard where you enter your flight times, family size, and activity preferences, and our software calculates optimized geographic schedules, references live weather monsoon streams, and coordinates vetted private drivers.
          </p>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto my-8" />
          <p className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold">
            Projected Launch: Winter 2026
          </p>
        </div>
      </section>

      {/* 10. TRUST SIGNALS */}
      <section className="py-20 md:py-32 px-6 bg-white border-b border-luxury-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold font-serif italic text-lg block mb-4">Verification Audits</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green mb-6 leading-tight">
              Our Authority Ecosystem
            </h2>
            <p className="text-luxury-black/60 font-light">
              While we are a growing boutique provider, we anchor our reliability on verified ground-level statistics, partner collaborations, and customer feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-luxury-cream p-8 rounded-2xl border border-luxury-black/5">
              <span className="text-3xl md:text-4xl font-serif font-bold text-luxury-green block mb-2">500+</span>
              <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold">Indian Families Guided</span>
            </div>

            <div className="bg-luxury-cream p-8 rounded-2xl border border-luxury-black/5">
              <span className="text-3xl md:text-4xl font-serif font-bold text-luxury-green block mb-2">12,000+</span>
              <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold">Monthly Readers</span>
            </div>

            <div className="bg-luxury-cream p-8 rounded-2xl border border-luxury-black/5">
              <span className="text-3xl md:text-4xl font-serif font-bold text-luxury-green block mb-2">4.9/5</span>
              <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold">Average Ground Rating</span>
            </div>

            <div className="bg-luxury-cream p-8 rounded-2xl border border-luxury-black/5">
              <span className="text-3xl md:text-4xl font-serif font-bold text-luxury-green block mb-2">100%</span>
              <span className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold">Ground Logistics Vetting</span>
            </div>
          </div>

          {/* Placeholders for Partners and Press */}
          <div className="mt-16 pt-16 border-t border-luxury-black/5 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold mb-6">Registered Affiliation Standards</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-luxury-cream border border-luxury-black/5 text-center text-xs font-serif text-luxury-green/60">
                  SLTDA Registered Chauffeurs
                </div>
                <div className="p-4 rounded-xl bg-luxury-cream border border-luxury-black/5 text-center text-xs font-serif text-luxury-green/60">
                  Boutique Villa Certification Standard
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold mb-6">Upcoming Editorial & Media Mentions</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-luxury-cream border border-luxury-black/5 text-center text-xs font-serif text-luxury-green/40 italic">
                  [ Conde Nast Traveller Feature Pending ]
                </div>
                <div className="p-4 rounded-xl bg-luxury-cream border border-luxury-black/5 text-center text-xs font-serif text-luxury-green/40 italic">
                  [ Outlook Travel Interview Pending ]
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 11. AI & GOOGLE ENTITY OPTIMIZATION (Entity Accordion) */}
      <section className="py-20 md:py-32 px-6 bg-luxury-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-luxury-gold font-serif italic text-lg block mb-4">Semantic Web Authority</span>
            <h2 className="text-3xl md:text-5xl font-serif text-luxury-green mb-6 leading-tight">
              Google Entity & EEAT Curation Architecture
            </h2>
            <p className="text-luxury-black/60 font-light">
              We format this founder page to strengthen the semantic web relations between Oshada Adithya, Plan Sri Lanka, and authoritative entities for AI crawlers and the Google Knowledge Graph.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Person Schema (Oshada Adithya)",
                desc: "Declares Oshada Adithya as an actual, verified person entity, linking him directly as the owner/founder of the Plan Sri Lanka brand.",
                detail: "By supplying a detailed professional biography, precise language proficiencies, and regional location coordinates, search engines categorize the founder as a primary topical entity in Sri Lankan travel logistics."
              },
              {
                title: "Organization Schema (Plan Sri Lanka)",
                desc: "Formulates the website as a verified corporate organization, rather than a generic blogging address.",
                detail: "Links our registered phone contacts (+94722968210), physical support offices, Cardiff business locations, and price indexes, establishing corporate trust with major AI indexes."
              },
              {
                title: "Author & Publisher EEAT Authority",
                desc: "Demonstrates high Experience, Expertise, Authoritativeness, and Trustworthiness.",
                detail: "By anchoring our editorial work to a verified native person with a structured LinkedIn authority profile, we defend our library guides from AI-generated content penalties."
              },
              {
                title: "sameAs Mapping Signals",
                desc: "Forms a semantic bridge between our web pages and verified third-party records.",
                detail: "Links our structural data directly to LinkedIn profiles and local register coordinates, allowing AI search systems like Gemini, Copilot, and Perplexity to attribute quotes and data points to Oshada's entity."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-luxury-black/5 overflow-hidden shadow-sm">
                <button
                  onClick={() => {
                    trackEvent('about_founder_entity_accordion_click', 'engagement', item.title);
                    setActiveAccordion(activeAccordion === idx ? null : idx);
                  }}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-luxury-cream transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-luxury-gold font-bold">Strategy Element {idx + 1}</span>
                    <p className="font-serif font-bold text-lg text-luxury-green">{item.title}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-luxury-green transition-transform duration-300 ${activeAccordion === idx ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-6 border-t border-luxury-black/5 bg-luxury-cream/30 text-sm space-y-3 font-light leading-relaxed">
                        <p className="text-luxury-black font-semibold">{item.desc}</p>
                        <p className="text-luxury-black/70">{item.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CALL TO ACTION / CONVERSION ENGINE */}
      <section id="planner-form" className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-luxury-gold font-serif italic text-lg block">Direct Assistance</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green leading-tight">
                Let's Build a Smarter Itinerary.
              </h2>
              <p className="text-sm md:text-base text-luxury-black/70 font-light leading-relaxed">
                Planning your first Sri Lanka trip can feel overwhelming with monsoon boundaries and transit logistics. I would love to help you mathematically optimize your journey.
              </p>
              
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">✔</div>
                  <span className="text-luxury-black/70">100% Custom Sequence (No generic templates)</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">✔</div>
                  <span className="text-luxury-black/70">Monsoon Boundary Verification</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold shrink-0">✔</div>
                  <span className="text-luxury-black/70">Realistic Local Cost Breakdowns</span>
                </div>
              </div>

              <div className="p-6 bg-luxury-cream rounded-3xl border border-luxury-black/5">
                <p className="text-xs font-mono uppercase tracking-widest text-luxury-gold font-bold mb-2">Want to skip forms?</p>
                <a 
                  href="https://wa.me/94722968210" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-luxury-green text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-luxury-gold transition-all w-full justify-center shadow-md"
                >
                  <MessageCircle className="w-4 h-4" /> Message Oshada On WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-luxury-cream p-8 md:p-10 rounded-[40px] border border-luxury-black/5 shadow-md">
              <h3 className="text-2xl font-serif text-luxury-green mb-6">Request Private Curation Plan</h3>
              
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-luxury-green text-white flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                  <h4 className="text-xl font-serif text-luxury-green font-bold">Request Sent Safely!</h4>
                  <p className="text-sm text-luxury-black/70 leading-relaxed max-w-sm mx-auto font-light">
                    Your itinerary request was submitted. I have also opened a WhatsApp connection to sync your details instantly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-luxury-green/60">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Aditya Sharma"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                        className="w-full p-3 rounded-xl bg-white border border-luxury-black/10 focus:border-luxury-gold focus:outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-luxury-green/60">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210"
                        value={leadForm.whatsapp}
                        onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                        className="w-full p-3 rounded-xl bg-white border border-luxury-black/10 focus:border-luxury-gold focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-luxury-green/60">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="aditya@gmail.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                      className="w-full p-3 rounded-xl bg-white border border-luxury-black/10 focus:border-luxury-gold focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-luxury-green/60">Party Size</label>
                      <select 
                        value={leadForm.travelers}
                        onChange={(e) => setLeadForm({...leadForm, travelers: e.target.value})}
                        className="w-full p-3 rounded-xl bg-white border border-luxury-black/10 focus:border-luxury-gold focus:outline-none transition-all"
                      >
                        <option value="Couple">Couple</option>
                        <option value="Family with Kids">Family</option>
                        <option value="Solo Traveler">Solo</option>
                        <option value="Group of Friends">Group</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-luxury-green/60">Duration</label>
                      <select 
                        value={leadForm.duration}
                        onChange={(e) => setLeadForm({...leadForm, duration: e.target.value})}
                        className="w-full p-3 rounded-xl bg-white border border-luxury-black/10 focus:border-luxury-gold focus:outline-none transition-all"
                      >
                        <option value="5 Days">5 Days</option>
                        <option value="7 Days">7 Days</option>
                        <option value="10 Days">10 Days</option>
                        <option value="12+ Days">12+ Days</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-luxury-green/60">Month</label>
                      <select 
                        value={leadForm.month}
                        onChange={(e) => setLeadForm({...leadForm, month: e.target.value})}
                        className="w-full p-3 rounded-xl bg-white border border-luxury-black/10 focus:border-luxury-gold focus:outline-none transition-all"
                      >
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-luxury-green/60">Custom Notes (Interests / Concerns)</label>
                    <textarea 
                      placeholder="e.g. Vegetarian diet, traveling with infant, looking for off-beat beach stays..."
                      value={leadForm.customNotes}
                      onChange={(e) => setLeadForm({...leadForm, customNotes: e.target.value})}
                      className="w-full p-3 h-24 rounded-xl bg-white border border-luxury-black/10 focus:border-luxury-gold focus:outline-none transition-all resize-none text-xs"
                    />
                  </div>

                  <div className="flex gap-2 items-center text-xs text-luxury-black/60 pt-2">
                    <input 
                      type="checkbox" 
                      required
                      checked={leadForm.agreed}
                      onChange={(e) => setLeadForm({...leadForm, agreed: e.target.checked})}
                      className="accent-luxury-green"
                    />
                    <span>I authorize Oshada to contact me regarding my trip plan.</span>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-luxury-green text-white font-bold uppercase tracking-wider rounded-xl hover:bg-luxury-gold hover:shadow-lg transition-all mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        Generate My Plan Now <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* JSON-LD Schemas for Search Engines (Person and Organization Schema) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Oshada Adithya",
          "url": "https://plan-srilanka.com/about-founder",
          "sameAs": [
            "https://www.linkedin.com/in/oshada-adithya-a93bba341/?skipRedirect=true"
          ],
          "jobTitle": "Founder & Editorial Director",
          "worksFor": {
            "@type": "Organization",
            "name": "Plan Sri Lanka",
            "url": "https://plan-srilanka.com/"
          },
          "description": "Oshada Adithya is the founder of Plan Sri Lanka, specializing in data-driven itinerary mapping, travel cost analysis, and local ground logistics for Sri Lankan tourism.",
          "knowsLanguage": ["en", "si"],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Colombo",
            "addressRegion": "Western Province",
            "addressCountry": "LK"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Person",
            "name": "Oshada Adithya",
            "url": "https://plan-srilanka.com/about-founder"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Plan Sri Lanka",
            "url": "https://plan-srilanka.com/",
            "logo": "https://plan-srilanka.com/logo.png"
          }
        })}
      </script>

    </div>
  );
}
