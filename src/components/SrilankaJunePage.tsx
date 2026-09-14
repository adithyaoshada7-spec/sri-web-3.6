import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Calendar, 
  DollarSign, 
  Globe, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  Info, 
  MapPin, 
  Sparkles, 
  HelpCircle, 
  Send, 
  ThumbsUp, 
  Compass, 
  Sun,
  CloudRain,
  Sunset,
  Volume2,
  Mountain,
  Droplets,
  Banknote,
  Languages,
  Footprints,
  Bus,
  Train,
  Car,
  Bike,
  XCircle,
  CheckCircle2,
  Waves,
  ShieldAlert,
  Clock
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaJunePage() {
  usePageMetadata({
    title: "Where To Go In Sri Lanka In June (2026 Guide) | Beat The Monsoon",
    description: "An expert, high-standard guide on travel to Sri Lanka in June. Learn which coasts are sunny (East Coast, Trincomalee, Pasikudah), what areas to avoid, monsoon updates, and how to plan safely.",
    canonicalUrl: "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-june",
    ogUrl: "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-june"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeRegion, setActiveRegion] = useState<number>(0);

  const regionWeather = [
    {
      name: "East Coast",
      icon: Sun,
      summary: "Sunny & Calm",
      description: "June is one of the most reliable months here — long sunny days, calm seas, great snorkeling visibility, and peak conditions for surfing at Arugam Bay."
    },
    {
      name: "South & West Coast",
      icon: CloudRain,
      summary: "Monsoon & Rough",
      description: "Firmly inside the southwest monsoon — rough seas, strong winds, frequent rain. Swimming is often unsafe and beach days unreliable."
    },
    {
      name: "Hill Country",
      icon: Mountain,
      summary: "Cool & Misty",
      description: "Cool and misty with beautiful scenery. Expect clear mornings and rainy afternoons — plan outdoor activities early in the day."
    },
    {
      name: "Cultural Triangle",
      icon: Droplets,
      summary: "Hot & Mostly Dry",
      description: "Hot, mostly dry, and easy to explore, though humidity rises as the month goes on."
    }
  ];

  // Lead capture state
  const [leadForm, setLeadForm] = useState({
    travelDates: "",
    budget: "luxury",
    travelStyle: "couple",
    departureCity: "Mumbai",
    whatsapp: "",
    agreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form submission handler
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whatsapp || !leadForm.travelDates) return;

    setIsSubmitting(true);
    trackEvent("june_lead_form_submit_start", "conversion", leadForm.travelStyle);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent("june_lead_form_submit_success", "conversion", leadForm.travelStyle, {
        phone: leadForm.whatsapp
      });
    }, 1200);
  };

  // FAQ Listing (20 items - comprehensive and highly structured)
  const faqList = [
    {
      q: "Is June a good time to visit Sri Lanka?",
      a: "Yes, June is an exceptional month for Sri Lanka, provided you choose the East Coast (Trincomalee, Nilaveli, Passikudah, Arugam Bay) and the Cultural Triangle (Sigiriya, Dambulla). While the south-west coast experiences monsoon rains and rough seas, the east coast is dry, sunny, and enjoys calm, crystal-clear ocean waters."
    },
    {
      q: "Should I completely avoid the South Coast in June?",
      a: "If dry beach days and calm ocean swimming are non-negotiable for you, then yes, avoid booking beach resorts on the South Coast (such as Mirissa, Galle, Hikkaduwa or Bentota). However, if you do not mind afternoon rain showers, want to enjoy lush greenery, surf-oriented vibe cultures, and take advantage of incredibly low luxury hotel rates, the south is still very much visitable."
    },
    {
      q: "Can I still visit Mirissa and swim in June?",
      a: "You can visit Mirissa for its highly rated restaurants, cafes, and boutique properties, but swimming in the ocean is highly discouraged. The southwest monsoon makes the waves very powerful and produces dangerous undercurrents. Safe ocean swimming in June is found on the East Coast instead."
    },
    {
      q: "Which coast has the absolute best weather in June?",
      a: "The East Coast has the absolute best weather, with average daily temperatures around 29°C to 33°C, minimal rainfall, and calm, glassy seas. The Cultural Triangle (in the north-central area) also enjoys wonderfully dry, sunny days."
    },
    {
      q: "Where can I swim safely in the ocean in June?",
      a: "The safest places to swim in June are Trincomalee (Nilaveli and Uppuveli beaches) and Passikudah. Passikudah is particularly famous for having a shallow, protected bay where you can walk hundreds of meters out with calm, waist-deep water perfect for children."
    },
    {
      q: "How much rain should I expect in June?",
      a: "On the southwest coast (Colombo, Galle, Bentota), expect heavy, short cloudbursts, usually in the late afternoon or evening, averaging 150-240mm for the month. On the East Coast (Trincomalee, Passikudah), rainfall is extremely sparse, often averaging less than 50mm, with most days remaining entirely dry and bright."
    },
    {
      q: "Is Colombo rainy and wet in June?",
      a: "Yes, Colombo is in the southwest wet zone and experiences frequent rain showers and high humidity in June. It is best to use Colombo simply as an overnight transit stop upon arrival and head inland to the Cultural Triangle the following morning."
    },
    {
      q: "Can I see wild elephants in Sri Lanka in June?",
      a: "Yes, absolutely! June is a brilliant month for elephant safaris. Minneriya National Park, located in the dry zone near Sigiriya, becomes a focal point as herds gather around the ancient reservoir. You can also spot them easily in Kaudulla or Hurulu Eco Park."
    },
    {
      q: "Is Ella worth visiting in June or is it too rainy?",
      a: "Ella is absolutely worth visiting in June. Situated in the central highlands, its weather is highly dynamic. While you will likely experience fog, mist, and occasional afternoon rain showers, this actually enhances Ella's ethereal beauty, making the tea estates and waterfalls look spectacular. Mornings are often clear for hiking Little Adam’s Peak."
    },
    {
      q: "What clothes should I pack for a June trip to Sri Lanka?",
      a: "You need a dual pack: light, breathable linen or cotton garments, swimwear, sunglasses, and high-factor sunscreen for the sunny East Coast beaches, combined with a light rain jacket, hiking shoes, and a light fleece or sweater for the cooler, mistier central hills like Ella and Nuwara Eliya."
    },
    {
      q: "Is Kandy rainy in June?",
      a: "Kandy is in a transition zone and experiences moderate showers, typically towards the late afternoon. The historic Temple of the Tooth is mostly indoors, making Kandy an easy and pleasant cultural stopover regardless of weather."
    },
    {
      q: "Is snorkeling good at Pigeon Island in June?",
      a: "Yes, June is the absolute peak season for snorkeling at Pigeon Island National Park (off Nilaveli). The water clarity is superb, the ocean is extremely calm, and visitors regularly swim alongside green sea turtles and harmless blacktip reef sharks in waist-deep water."
    },
    {
      q: "Is Arugam Bay good for beginner surfers in June?",
      a: "June is world-famous in Arugam Bay for surfing, attracting professionals with its massive, consistent Right Hand point breaks. While the main break is suited for experienced surfers, adjacent points like Baby Point and Elephant Rock are excellent, gentle spots for beginners with active surf schools."
    },
    {
      q: "Are there flight connections between the south and east coast in June?",
      a: "While there are no major commercial scheduled jet lines, Cinnamon Air operates domestic air taxi sea planes linking Colombo International Airport (BIA) directly to Trincomalee and Dickwella, allowing couples and luxury travelers to bypass driving times entirely."
    },
    {
      q: "Are Sri Lankan trains comfortable and safe during the monsoon?",
      a: "The legendary train journey between Kandy, Hatton, and Ella is fully operational in June. The trains travel at low, safe speeds. Booking a 1st Class air-conditioned cabin or 2nd Class reserved seat ensures total comfort, and the misty atmospheric mountain landscape is stunningly beautiful in June."
    },
    {
      q: "Do Indian passport holders need a visa to visit in June?",
      a: "Yes, Indian travelers need to apply for an online Electronic Travel Authorization (ETA). You can check our detailed step-by-step visa guidelines over at our dedicated page to successfully apply."
    },
    {
      q: "What is the average sea temperature in June?",
      a: "Around the East Coast, the sea temperature in June is a blissful 28°C to 29°C (82°F to 84°F), creating bath-like warmth that is incredibly comfortable for toddlers and long family snorkeling sessions."
    },
    {
      q: "Can we still climb Sigiriya Rock Fortress in June?",
      a: "Yes, you can! Sigiriya sits in the dry zone and has excellent climbing conditions in June. It is highly recommended to start your climb at 7:00 AM to beat the mid-day dry heat and enjoy clear, endless views of the surrounding forest reserves."
    },
    {
      q: "Are luxury boutique hotels offering cheap rates in June?",
      a: "Yes! Because many travelers mistakenly assume the entire island is under monsoon, five-star luxury resorts on the South Coast (traditional high-season zones) drop their rates by 40% to 60%, offering phenomenal luxury value. Even East Coast resorts offer great rates because the region is less commercialized."
    },
    {
      q: "How do driving times compare in June due to monsoon rains?",
      a: "Sri Lanka's major highways (such as the Southern Expressway) are built to international standards with great drainage, keeping travel times constant. Normal interior routes can see minor delays during afternoon downpours, which is why we recommend choosing our customized, pre-vetted private drivers."
    }
  ];

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      <>
        {/* JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Where To Go In Sri Lanka In June (2026 Guide): Most Travelers Choose the Wrong Coast",
            "description": "Planning a trip to Sri Lanka in June? Avoid the southwest monsoon and discover why Trincomalee, Nilaveli, Passikudah, and the Cultural Triangle are the top choices for Indian families and couples.",
            "image": [
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=630"
            ],
            "author": {
              "@type": "Person",
              "name": "Bespoke Intel Desk",
              "worksFor": {
                "@type": "Organization",
                "name": "Plan Sri Lanka"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "url": "https://plan-srilanka.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            },
            "datePublished": "2026-06-09T06:00:00Z",
            "dateModified": "2026-06-09T06:00:00Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-june"
            },
            "inLanguage": "en-US",
            "keywords": "where to go in sri lanka in june, sri lanka weather in june, best places to visit in sri lanka in june, east coast sri lanka june"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
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
                "item": "https://plan-srilanka.com#guides-hub"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Where To Go In June",
                "item": "https://plan-srilanka.com/where-to-go-in-sri-lanka-in-june"
              }
            ]
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.slice(0, 10).map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      </>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#1e3a2f] text-white">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            Exclusive June Pacing Guide (2026)
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white leading-tight max-w-4xl mx-auto">
            Where To Go In Sri Lanka In June
          </h1>
          
          <p className="text-sm md:text-xl text-[#a3bfae] font-light max-w-2xl mx-auto leading-relaxed">
            Avoid the biggest mistake travelers make in June. Discover which parts of Sri Lanka offer the best weather, beaches, and experiences, so you don't waste your limited vacation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#june-form"
              className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-[#1e3a2f] text-xs rounded-full shadow-lg transition-all"
            >
              Get My June Route Plan
            </a>
            <a
              href="#june-mistake"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-full border border-white/10 transition-all"
            >
              Learn The Big Mistake
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE QUICK ANSWER VISUAL GUIDE BOX */}
      <section className="py-16 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Direct Destination Intelligence
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              Quick Answer: Sri Lanka June Heatmap
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Recommended */}
            <div className="bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold font-serif">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-sm">✓</div>
                <span>Recommended</span>
              </div>
              <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
                These regions are dry, sunny, and deliver pristine calm waters, perfect for swimming and sightseeing:
              </p>
              <ul className="space-y-2 font-mono text-xs text-[#1e3a2f]">
                {["Trincomalee", "Nilaveli Beach", "Passikudah Bay", "Sigiriya", "Dambulla Caves", "Minneriya Park"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Consider Carefully */}
            <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-bold font-serif">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-sm">⚠</div>
                <span>Consider Carefully</span>
              </div>
              <p className="text-xs text-amber-950 font-light leading-relaxed">
                Atmospheric and beautiful, but you must accept intermittent late afternoon showers or active outdoor surf vibes:
              </p>
              <ul className="space-y-2 font-mono text-xs text-amber-900">
                {["Ella Highlands", "Kandy Cultural Center", "Arugam Bay (Advanced Surf)", "Nuwara Eliya (Chilly)"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid for Beach */}
            <div className="bg-red-50/40 border border-red-100 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-red-800 font-bold font-serif">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-sm">✗</div>
                <span>Avoid For Beaches</span>
              </div>
              <p className="text-xs text-red-950 font-light leading-relaxed">
                Subject to the Southwest Monsoon. Expect strong oceanic undercurrents, rough shorebreaks, and rain:
              </p>
              <ul className="space-y-2 font-mono text-xs text-red-900">
                {["Mirissa Beach", "Weligama Beach", "Galle Fort Coastline", "Hiriketiya Beach", "Bentota Resort Line"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE BIGGEST JUNE TRAVEL MISTAKE */}
      <section id="june-mistake" className="py-20 px-4 md:px-8 bg-[#f5f2e8]/40 border-b border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-red-600 font-bold block">
              Monsoon Warning
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a2f] leading-snug">
              Most Travelers Pick the Wrong Coast in June
            </h2>
            <p className="text-sm text-[#3a4d44] leading-relaxed font-light">
              Every year, thousands of Indian travelers automatically head straight to places like <strong className="font-semibold text-black">Mirissa, Weligama, Galle, and Hiriketiya</strong> simply because they've seen them featured on Instagram or YouTube.
            </p>
            <p className="text-sm text-[#3a4d44] leading-relaxed font-light">
              They book beautiful boutique luxury hotels on the south and west coasts, completely unaware that June falls squarely inside the Southwest Monsoon cycle.
            </p>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl space-y-1">
              <h4 className="text-xs font-bold text-red-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                The Consequence of the Mistake
              </h4>
              <p className="text-xs text-red-900 font-light">
                Rough, churned-up waters, strong red-flagged waves unsuitable for children, afternoon cloudbursts, and highly humid days. Popularity doesn't change geography!
              </p>
            </div>
          </div>

          <div className="relative bg-white p-8 rounded-[32px] border border-[#1e3a2f]/5 shadow-xl space-y-6">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#d4af37]/10 rounded-full blur-xl" />
            <h3 className="font-serif font-bold text-lg text-[#1e3a2f] border-b pb-4 border-neutral-100 flex items-center gap-2">
              <Compass className="text-[#d4af37] w-5 h-5" /> The Micro-Climate Shield
            </h3>
            <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
              Sri Lanka is a highly unique country with independent localized weather barriers. Because of the massive Central Highlands mountain block acting as a rainwater barrier (or rain shadow):
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/40">
                <span className="text-[10px] text-emerald-800 uppercase font-mono block">East Coast Status</span>
                <span className="text-lg font-serif font-bold text-emerald-950 flex items-center justify-center gap-1 mt-1">
                  <Sun className="w-4 h-4 text-[#d4af37] animate-spin" style={{ animationDuration: "12s" }} /> Sunny & Dry
                </span>
              </div>
              <div className="bg-red-50/30 p-3 rounded-2xl border border-red-100/40">
                <span className="text-[10px] text-red-800 uppercase font-mono block">South Coast Status</span>
                <span className="text-lg font-serif font-bold text-red-950 flex items-center justify-center gap-1 mt-1">
                  <CloudRain className="w-4 h-4 text-slate-500" /> Humid & Rain
                </span>
              </div>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono text-center">
              *Choose the East Coast in June for clean sand and calm turquoise bays.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3.5: WEATHER BY REGION (INTERACTIVE) */}
      <section className="py-20 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Region By Region
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              Sri Lanka's Weather In June
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              Tap a region to see what June actually looks like there.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {regionWeather.map((region, i) => (
              <button
                key={region.name}
                onClick={() => setActiveRegion(i)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeRegion === i
                    ? "bg-[#1e3a2f] text-[#d4af37] border-[#1e3a2f]"
                    : "bg-white text-[#1e3a2f]/60 border-[#1e3a2f]/15 hover:border-[#d4af37] hover:text-[#1e3a2f]"
                }`}
              >
                <region.icon className="w-3.5 h-3.5" />
                {region.name}
              </button>
            ))}
          </div>

          {/* All 4 regions render in the DOM at all times (prerender/crawler friendly) — the buttons above only toggle highlight styling below */}
          <div className="grid sm:grid-cols-2 gap-5">
            {regionWeather.map((region, i) => (
              <div
                key={region.name}
                className={`p-6 md:p-7 rounded-3xl border transition-all space-y-3 ${
                  activeRegion === i
                    ? "bg-[#1e3a2f] border-[#1e3a2f] shadow-xl scale-[1.02]"
                    : "bg-[#fcfbf7] border-[#1e3a2f]/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    activeRegion === i ? "bg-[#d4af37] text-[#1e3a2f]" : "bg-[#1e3a2f] text-[#d4af37]"
                  }`}>
                    <region.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`font-serif font-bold text-base ${activeRegion === i ? "text-white" : "text-[#1e3a2f]"}`}>
                      {region.name}
                    </h3>
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${activeRegion === i ? "text-[#d4af37]" : "text-[#d4af37]"}`}>
                      {region.summary}
                    </span>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed font-light ${activeRegion === i ? "text-white/80" : "text-[#3a4d44]"}`}>
                  {region.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: EAST COAST VS SOUTH COAST COMPARISON TABLE */}
      <section className="py-20 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Side-By-Side Intelligence
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              East Coast vs South Coast (June Edition)
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              Before booking hotels, compare how both regions perform in June across crucial factors like water clarity, swimming safety, and pricing.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[32px] border border-[#1e3a2f]/10 shadow-lg bg-white">
            <table className="w-full text-left min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-[#1e3a2f] text-[#d4af37] text-xs font-mono uppercase tracking-wider">
                  <th className="p-6">Feature Factor</th>
                  <th className="p-6 bg-[#1a332a]">East Coast (June Winner)</th>
                  <th className="p-6">South Coast (Monsoon Wet)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e3a2f]/5 text-xs text-[#3a4d44]">
                <tr>
                  <td className="p-6 font-semibold text-[#1e3a2f]">Daily Average Weather</td>
                  <td className="p-6 bg-[#1a332a]/5 text-[#1e3a2f] font-medium font-serif text-sm">Sunny & Dry (29–33°C)</td>
                  <td className="p-6">Humid with Afternoon Cloudbursts (27-30°C)</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1e3a2f]">Beach Conditions</td>
                  <td className="p-6 bg-[#1a332a]/5 text-[#1e3a2f]">Pristine, dry white sands, calm shores</td>
                  <td className="p-6">Wet, storm-tossed sand and high tides</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1e3a2f]">Ocean Swimming</td>
                  <td className="p-6 bg-[#1a332a]/5 text-[#1e3a2f] font-bold text-emerald-800">Perfect & Safe (Flat Bay Surface)</td>
                  <td className="p-6 text-red-600 font-medium">Dangerous; red flag warnings on beaches</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1e3a2f]">Snorkeling & Coral Diving</td>
                  <td className="p-6 bg-[#1a332a]/5 text-[#1e3a2f] font-bold">Excellent at Pigeon Island (Superb Visibility)</td>
                  <td className="p-6">Poor visibility, silted reefs and choppy waters</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1e3a2f]">Crowd & Quietness</td>
                  <td className="p-6 bg-[#1a332a]/5 text-[#1e3a2f]">Boutique, peaceful, untouched</td>
                  <td className="p-6">Fewer tourists but quiet cafes, some seasonal closures</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1e3a2f]">Driving Travel Time (from BIA Airport)</td>
                  <td className="p-6 bg-[#1a332a]/5 text-[#1e3a2f]">5.5–6 Hrs (or domestic transfer)</td>
                  <td className="p-6">2.5–3 Hrs via the Southern Expressway</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1e3a2f]">Couple Experience Score</td>
                  <td className="p-6 bg-[#1a332a]/5 text-[#1e3a2f] font-semibold">⭐⭐⭐⭐⭐ (9.5 / 10)</td>
                  <td className="p-6">⭐⭐⭐ (6 / 10)</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1e3a2f]">Family & Kids Comfort Score</td>
                  <td className="p-6 bg-[#1a332a]/5 text-[#1e3a2f] font-semibold">⭐⭐⭐⭐⭐ (9.8 / 10)</td>
                  <td className="p-6">⭐⭐ (5 / 10)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHAT TO SKIP IN JUNE SECTION */}
      <section id="what-to-skip" className="py-20 px-4 md:px-8 bg-[#f5f2e8]/50 border-b border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 text-xs font-mono uppercase tracking-wider font-bold">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Critical Route Intelligence
            </div>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              What To Skip In Sri Lanka In June
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              Don't let outdated guidebooks ruin your holiday. Avoid these 5 monsoon traps, rough-sea zones, and midday heat hazards — and see where to go instead.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skip 1 */}
            <div className="bg-white p-7 rounded-[28px] border border-red-200/80 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-500" /> Do Not Swim Here
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">Trap #01</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">
                  South & Southwest Coast Beaches
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  <strong className="font-semibold text-neutral-800">Mirissa, Unawatuna, Hikkaduwa, Bentota & Weligama</strong>: The southwest monsoon produces heavy 2.5–3.5m shorebreaks, dangerous undertows, and churning brown water. Red warning flags line the sands, and ocean swimming is prohibited or extremely perilous.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Go Here Instead:
                </span>
                <p className="text-xs text-emerald-950 font-medium">
                  Head to <strong className="font-bold text-emerald-900">Nilaveli Beach</strong> or <strong className="font-bold text-emerald-900">Passikudah Bay</strong> on the East Coast for glassy, mirror-flat 29°C turquoise lagoons with zero monsoon swell.
                </p>
              </div>
            </div>

            {/* Skip 2 */}
            <div className="bg-white p-7 rounded-[28px] border border-red-200/80 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-500" /> High Rainfall & Leeches
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">Trap #02</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">
                  Sinharaja Rainforest & Off-Season Adam's Peak
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  Sinharaja experiences its heaviest, relentless monsoon deluges in June, turning dirt tracks into slick mud slides filled with active forest land-leeches. Adam's Peak (Sri Pada) pilgrimage season ended in May — the summit trail is pitch-black, freezing, drenched, and tea shacks are closed.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Go Here Instead:
                </span>
                <p className="text-xs text-emerald-950 font-medium">
                  Hike <strong className="font-bold text-emerald-900">Little Adam's Peak in Ella</strong> (crisp, misty morning views) or scramble up <strong className="font-bold text-emerald-900">Pidurangala Rock</strong> in the rain-free Cultural Triangle.
                </p>
              </div>
            </div>

            {/* Skip 3 */}
            <div className="bg-white p-7 rounded-[28px] border border-red-200/80 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-500" /> Choppy Sea Swells
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">Trap #03</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">
                  Mirissa Whale Watching Charters
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  Boats leaving Mirissa harbor in June face severe open-ocean swells, leading to violent rolling, near-universal seasickness among passengers, and frequent morning cancellations by harbor authorities due to gale warnings.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Go Here Instead:
                </span>
                <p className="text-xs text-emerald-950 font-medium">
                  Book boat cruises out of <strong className="font-bold text-emerald-900">Trincomalee (Dutch Bay / Swami Rock)</strong>, where offshore submarine canyons host resident blue whales in calm, flat seas.
                </p>
              </div>
            </div>

            {/* Skip 4 */}
            <div className="bg-white p-7 rounded-[28px] border border-red-200/80 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-500" /> Scorching Heat Trap
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">Trap #04</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">
                  Climbing Sigiriya Rock at Midday
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  The Cultural Triangle is dry in June, but midday temperatures climb to 34°C (93°F). The black volcanic gneiss rock absorbs heat, turning the 1,200 exposed metal steps into an exhausting, unshaded oven between 11:30 AM and 2:30 PM.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Do This Instead:
                </span>
                <p className="text-xs text-emerald-950 font-medium">
                  Start your climb at <strong className="font-bold text-emerald-900">6:45 AM – 7:00 AM sharp</strong> right at gate opening, or wait until <strong className="font-bold text-emerald-900">4:00 PM</strong> for the cooling late-afternoon golden hour.
                </p>
              </div>
            </div>

            {/* Skip 5 */}
            <div className="bg-white p-7 rounded-[28px] border border-red-200/80 shadow-sm flex flex-col justify-between space-y-5 md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-500" /> Exhausting Travel Day
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">Trap #05</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">
                  Rushing Coast-to-Coast in a Single Driving Leg
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  Trying to transfer directly from Colombo or Galle all the way to Trincomalee, Passikudah, or Arugam Bay in one continuous drive takes 7 to 9 grueling hours. Monsoon cloudbursts across the central transition zone can cause road slowdowns and extreme driver exhaustion.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Do This Instead:
                </span>
                <p className="text-xs text-emerald-950 font-medium">
                  Break up the drive with a <strong className="font-bold text-emerald-900">2-night stay in the Cultural Triangle (Sigiriya/Dambulla)</strong> or a scenic mountain pause in <strong className="font-bold text-emerald-900">Kandy/Ella</strong>, dividing the journey into relaxed 3–3.5 hour legs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDED PLACES TO VISIT IN JUNE WITH 'WHY VISIT' BREAKDOWN */}
      <section id="june-places" className="py-20 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Curated Destination Intelligence
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              Recommended Places To Visit In June
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              We break down the top destinations in Sri Lanka positioned inside the dry zone rain shadow, detailing exactly <em>Why Visit</em> each location in June.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Place 1: Trincomalee & Nilaveli */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[30px] p-6 flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono uppercase font-bold">
                    East Coast • Dry Zone
                  </span>
                  <span className="text-xs font-mono text-[#d4af37] font-bold">30–33°C</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f] group-hover:text-[#d4af37] transition-colors">
                  Trincomalee & Nilaveli Beach
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  A historic coastal haven boasting miles of untouched white sands, deep natural harbors, and calm turquoise water.
                </p>

                {/* Why Visit Box */}
                <div className="p-4 rounded-2xl bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#1e3a2f] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Why Visit in June:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#3a4d44] font-light">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Glass-Calm Seas:</strong> Zero monsoon undertows; safe for toddler bathing and long ocean swims.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Pigeon Island Snorkeling:</strong> Superb water clarity with blacktip reef sharks and sea turtles.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Whale Watching:</strong> Blue whales and dolphin pods actively pass off Swami Rock in flat waters.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e3a2f]/10 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Vibe: Calm Luxury & Marine</span>
                <Link to="/nilaveli-beach-travel-guide" className="text-xs font-mono font-bold text-[#1e3a2f] hover:text-[#d4af37] flex items-center gap-1">
                  Explore Guide →
                </Link>
              </div>
            </div>

            {/* Place 2: Passikudah Bay */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[30px] p-6 flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono uppercase font-bold">
                    East Coast • Coral Lagoon
                  </span>
                  <span className="text-xs font-mono text-[#d4af37] font-bold">31–34°C</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f] group-hover:text-[#d4af37] transition-colors">
                  Passikudah Bay
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  A breathtaking, wide crescent bay protected by an offshore barrier reef, creating one of the world's longest shallow ocean stretches.
                </p>

                {/* Why Visit Box */}
                <div className="p-4 rounded-2xl bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#1e3a2f] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Why Visit in June:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#3a4d44] font-light">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Natural Lagoon Safety:</strong> Walk 150m out into the ocean with waist-deep, crystal-clear water.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Zero Wave Breakers:</strong> Absolute safest beach in the country for non-swimmers, babies, and elderly.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Boutique Resort Value:</strong> 5-star beachfront luxury properties at uncrowded shoulder-season rates.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e3a2f]/10 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Vibe: Absolute Beach Tranquility</span>
                <span className="text-xs font-mono font-bold text-emerald-700">Top Family Choice</span>
              </div>
            </div>

            {/* Place 3: Arugam Bay */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[30px] p-6 flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono uppercase font-bold">
                    Southeast • Surf Capital
                  </span>
                  <span className="text-xs font-mono text-[#d4af37] font-bold">29–33°C</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f] group-hover:text-[#d4af37] transition-colors">
                  Arugam Bay
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  Sri Lanka's premier surf capital and bohemian surf town, blessed with sunny skies and consistent Indian Ocean swells.
                </p>

                {/* Why Visit Box */}
                <div className="p-4 rounded-2xl bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#1e3a2f] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Why Visit in June:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#3a4d44] font-light">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Peak Right-Hand Point Breaks:</strong> Main Point, Whiskey Point, and Peanut Farm are firing daily.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Dry Offshore Winds:</strong> Sunny, rain-free days with gentle evening coastal breezes.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Kumana Safari Access:</strong> Spot leopards and elephant herds at nearby Kumana without crowds.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e3a2f]/10 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Vibe: Surfing, Yoga & Cafes</span>
                <span className="text-xs font-mono font-bold text-amber-700">Active Adventure</span>
              </div>
            </div>

            {/* Place 4: Sigiriya & Cultural Triangle */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[30px] p-6 flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono uppercase font-bold">
                    North-Central • Rain Shadow
                  </span>
                  <span className="text-xs font-mono text-[#d4af37] font-bold">31–34°C</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f] group-hover:text-[#d4af37] transition-colors">
                  Sigiriya & Cultural Triangle
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  The ancient heartland of kings, monumental stupas, rock citadels, and UNESCO World Heritage ruins sheltered from the monsoon.
                </p>

                {/* Why Visit Box */}
                <div className="p-4 rounded-2xl bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#1e3a2f] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Why Visit in June:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#3a4d44] font-light">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Mountain Rain Shadow:</strong> Completely sheltered from southwest monsoon rain; sunny and dry.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Dry Rock Climbing:</strong> Clear morning skies for ascending Sigiriya Lion Rock & Pidurangala.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Ruins Exploration:</strong> Cycle through ancient Polonnaruwa palaces without rain delays.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e3a2f]/10 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Vibe: Ancient Heritage & Forest</span>
                <span className="text-xs font-mono font-bold text-emerald-700">Essential Cultural Stop</span>
              </div>
            </div>

            {/* Place 5: Minneriya & Kaudulla Parks */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[30px] p-6 flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono uppercase font-bold">
                    Dry Zone • Wildlife Hub
                  </span>
                  <span className="text-xs font-mono text-[#d4af37] font-bold">30–33°C</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f] group-hover:text-[#d4af37] transition-colors">
                  Minneriya & Kaudulla Parks
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  Ancient King-built reservoirs surrounded by dry grasslands that host the largest Asian elephant gathering on the planet.
                </p>

                {/* Why Visit Box */}
                <div className="p-4 rounded-2xl bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#1e3a2f] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Why Visit in June:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#3a4d44] font-light">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>The Elephant Gathering Begins:</strong> Receding waters expose fresh grass, drawing 100–250+ elephants.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Firm, Dry Safari Tracks:</strong> Zero deep mud or vehicle entrapment compared to wet southwest reserves.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Abundant Birdlife:</strong> Painted storks, pelicans, and fish eagles congregate around the tank edges.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e3a2f]/10 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Vibe: Iconic Asian Safari</span>
                <span className="text-xs font-mono font-bold text-emerald-700">Must-Do Wildlife</span>
              </div>
            </div>

            {/* Place 6: Ella & Central Highlands */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[30px] p-6 flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-sm group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono uppercase font-bold">
                    Central Highlands • Cool Oasis
                  </span>
                  <span className="text-xs font-mono text-[#d4af37] font-bold">19–24°C</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f] group-hover:text-[#d4af37] transition-colors">
                  Ella & Central Highlands
                </h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  A lush mountain sanctuary of emerald tea estates, cascading waterfalls, and misty mountain passes offering cool respite.
                </p>

                {/* Why Visit Box */}
                <div className="p-4 rounded-2xl bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#1e3a2f] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Why Visit in June:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#3a4d44] font-light">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Cool 20°C Climate Relief:</strong> Refreshing break from coastal temperatures; great for cozy evenings.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Clear Morning Hikes:</strong> Crisp morning air for Little Adam's Peak & Nine Arch Bridge photos.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Lush Flowing Waterfalls:</strong> Ravana Falls and Diyaluma are flowing at full dramatic majesty.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e3a2f]/10 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Vibe: Mountain Mist & Cafes</span>
                <span className="text-xs font-mono font-bold text-blue-800">Scenic Mountain Pause</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: BEST ROUTE MAPPER FOR JUNE */}
      <section className="py-20 px-4 md:px-8 bg-[#f5f2e8]/40 border-b border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Proven Path Blueprint
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              The Recommended June Route
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              We highly recommend this 8-to-10-day loop optimized to maximize your sunshine hours while eliminating long travel fatigue with our private chauffeur partners.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Visual Timeline Steps (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[32px] border border-[#1e3a2f]/5 shadow-xl space-y-8">
              <h3 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2 pb-4 border-b border-neutral-100">
                <Globe className="w-5 h-5 text-[#d4af37]" /> The June Optimization Loop
              </h3>

              <div className="space-y-8 relative before:absolute before:top-4 before:bottom-4 before:left-3 mt-4 before:w-0.5 before:bg-[#1e3a2f]/10">
                {/* Step 1 */}
                <div className="flex gap-4 items-start relative pl-10">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold">1</div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-[#1e3a2f] text-sm flex items-center gap-2">
                      Sigiriya (2 Nights)
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-mono uppercase font-bold">Cultural Triangle Dry Zone</span>
                    </h4>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                      Climb the ancient Sigiriya Rock Fortress at 7 AM. Tour the ancient forest kingdom of Polonnaruwa, and trace wild elephant paths at Minneriya Reservoir, completely dry in June.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 items-start relative pl-10">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold">2</div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-[#1e3a2f] text-sm flex items-center gap-2">
                      Kandy Cultural Stopover (1 Night)
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] font-mono uppercase font-bold">Transition Stop</span>
                    </h4>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                      Climb through beautiful hillcountry roads to visit Kandy. Witness the Temple of the Tooth and traditional Kandyan dance recitals. Afternoon rains are perfect for relaxing at a boutique villa.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 items-start relative pl-10">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-mono text-xs font-bold">3</div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-[#1e3a2f] text-sm flex items-center gap-2">
                      Ella (2 Nights)
                      <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-neutral-900 text-[9px] font-mono uppercase font-bold">Ethereal Highlands</span>
                    </h4>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                      Ride the iconic mountainside blue train, trek to Little Adam's Peak during clear mornings, and photograph Demodara Nine Arch Bridge framed by morning mountain mist.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4 items-start relative pl-10">
                  <div className="absolute left-0 w-6 h-6 rounded-full bg-[#d4af37] text-white flex items-center justify-center font-mono text-xs font-bold">4</div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-[#1e3a2f] text-sm flex items-center gap-2">
                      Trincomalee & Nilaveli (3-4 Nights)
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-mono uppercase font-bold">Beach Heaven</span>
                    </h4>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                      Unwind on dry, bright white sands. Embark on whale and dolphin watching cruises, visit Koneswaram Hindu Cliff temple, and snorkel alongside green sea turtles at Pigeon Island in flat seas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why This Route Works (5 cols) */}
            <div className="lg:col-span-5 bg-[#1e3a2f] rounded-[32px] p-6 md:p-8 text-white space-y-6 flex flex-col justify-between min-h-[460px]">
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block">
                  Optimized Logistics Blueprint
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight text-white">
                  Why This Specific Route Works Perfectly
                </h3>

                <div className="space-y-4 pt-2">
                  <div className="flex gap-3 items-start text-xs font-light">
                    <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] shrink-0 flex items-center justify-center text-[10px]">☀</div>
                    <p className="leading-relaxed text-[#c4dccf]">
                      <strong className="text-white font-medium">Weather Shield:</strong> By bypassing Galle and heading to Trincomalee, your beach days are virtually guaranteed to have bright sunshine and clear skies instead of messy showers.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start text-xs font-light">
                    <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] shrink-0 flex items-center justify-center text-[10px]">⚖</div>
                    <p className="leading-relaxed text-[#c4dccf]">
                      <strong className="text-white font-medium">Reduced Travel Stress:</strong> Instead of pushing driving limits, this itinerary balances active hiking times, culture walks, and rich, multi-day lazy beach sequences.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start text-xs font-light">
                    <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] shrink-0 flex items-center justify-center text-[10px]">🐋</div>
                    <p className="leading-relaxed text-[#c4dccf]">
                      <strong className="text-white font-medium">Breathtaking Wildlife:</strong> June brings giant blue whale sightings to Trincomalee and huge elephant gatherings to Minneriya, delivering ultimate natural spectacles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Internal contextual links matching SEO requirements */}
              <div className="pt-6 border-t border-white/10 space-y-2">
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#d4af37]/75 block">Related Planning Handbooks:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <Link to="/sri-lanka-7-day-itinerary" className="text-white/80 hover:text-[#d4af37] underline transition-colors">
                    → 7-Day Epic Itinerary
                  </Link>
                  <Link to="/sri-lanka-trip-cost-from-india" className="text-white/80 hover:text-[#d4af37] underline transition-colors">
                    → Indian Flight Costs
                  </Link>
                  <Link to="/sri-lanka-family-itinerary" className="text-white/80 hover:text-[#d4af37] underline transition-colors">
                    → Kids Low-Fatigue Routes
                  </Link>
                  <Link to="/sri-lanka-visa-for-indians" className="text-white/80 hover:text-[#d4af37] underline transition-colors">
                    → Fast Visa Application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BEST BEACHES IN JUNE */}
      <section className="py-20 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              The Gold Beaches Ranked
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              Top 4 Sri Lankan Beaches for June
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              We rank the absolute best sandy spots on the island specifically during the month of June, based on water conditions and activities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Nilaveli */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all rounded-[28px] overflow-hidden flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">Nilaveli Beach</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  A serene, miles-long expanse of fine white sand located north of Trincomalee. Known for clear, shallow warm water and quiet shores.
                </p>
                <div className="pt-3 border-t border-[#1e3a2f]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#d4af37]">
                    Top Activity: Pigeon Island Snorkeling
                  </span>
                  <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                    Short boat trip from Nilaveli to swim with sea turtles and reef fish at Pigeon Island National Park.
                  </p>
                  <Link
                    to="/nilaveli-beach-travel-guide"
                    className="btn-shine inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 border border-[#1e3a2f]/15 text-[#1e3a2f] font-bold uppercase tracking-wider text-[10px] rounded-full hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
                  >
                    Direct Book Nilaveli Activities
                  </Link>
                </div>
              </div>
              <div className="p-6 bg-emerald-50 text-emerald-800 text-[10px] font-mono uppercase font-bold text-center border-t border-neutral-100">
                ⭐ Best For: Families & Snorkelers
              </div>
            </div>

            {/* Trincomalee / Uppuveli */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all rounded-[28px] overflow-hidden flex flex-col justify-between">
              <img
                src="https://images.unsplash.com/photo-1607153333879-c174d265f1d2?auto=format&fit=crop&q=80&w=600&h=360"
                alt="Dolphin watching boat cruise off Trincomalee, Sri Lanka"
                referrerPolicy="no-referrer"
                className="w-full h-32 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">Trincomalee / Uppuveli</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  Lively and atmospheric with highly rated beach resorts, juice hubs, and local boat captains offering dolphin cruises on demand.
                </p>
                <div className="pt-3 border-t border-[#1e3a2f]/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#d4af37]">
                    Top Activity: Dolphin Watching Cruise
                  </span>
                  <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                    Sunrise boat tours from Uppuveli/Trincomalee harbor to spot spinner dolphin pods in calm June waters.
                  </p>
                  <Link
                    to="/trincomalee-travel-guide"
                    className="btn-shine inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 border border-[#1e3a2f]/15 text-[#1e3a2f] font-bold uppercase tracking-wider text-[10px] rounded-full hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
                  >
                    Direct Book Trincomalee Activities
                  </Link>
                </div>
              </div>
              <div className="p-6 bg-emerald-50 text-emerald-800 text-[10px] font-mono uppercase font-bold text-center border-t border-neutral-100">
                ⭐ Best For: Beach Cafes & Socials
              </div>
            </div>

            {/* Passikudah */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all rounded-[28px] overflow-hidden flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">Passikudah Bay</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  A quiet, crescent-shaped shallow bay. You can walk 150+ meters into the ocean with zero waves, ideal for toddlers to play.
                </p>
                <div className="pt-3 border-t border-[#1e3a2f]/10">
                  <span className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 border border-[#1e3a2f]/10 text-[#1e3a2f]/40 font-bold uppercase tracking-wider text-[10px] rounded-full cursor-not-allowed">
                    Direct Booking Not Available Right Now
                  </span>
                </div>
              </div>
              <div className="p-6 bg-emerald-50 text-emerald-800 text-[10px] font-mono uppercase font-bold text-center border-t border-neutral-100">
                ⭐ Best For: Absolute Safety & Toddlers
              </div>
            </div>

            {/* Arugam Bay */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all rounded-[28px] overflow-hidden flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-mono font-bold text-sm">
                  04
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">Arugam Bay</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  The absolute surfing capital of Sri Lanka. Enjoys brilliant consistent warm point breaks and a wonderful backpacker night vibe.
                </p>
                <div className="pt-3 border-t border-[#1e3a2f]/10">
                  <span className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 border border-[#1e3a2f]/10 text-[#1e3a2f]/40 font-bold uppercase tracking-wider text-[10px] rounded-full cursor-not-allowed">
                    Direct Booking Not Available Right Now
                  </span>
                </div>
              </div>
              <div className="p-6 bg-emerald-50 text-emerald-800 text-[10px] font-mono uppercase font-bold text-center border-t border-neutral-100">
                ⭐ Best For: Surfers & Solo Outings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GETTING AROUND SRI LANKA IN JUNE (TRANSPORT & LOGISTICS) */}
      <section id="getting-around" className="py-20 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Mobility & Transit Blueprint
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              Getting Around Sri Lanka In June
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              From historic highland locomotives to coast-hugging tuk-tuks and private air-conditioned chauffeurs, here is your definitive field guide to transport across the island in June.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Walkability */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[28px] p-7 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1e3a2f]/5 text-[#1e3a2f] flex items-center justify-center">
                  <Footprints className="w-6 h-6 text-[#1e3a2f]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Walkability</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  Sri Lanka is not uniformly walkable between towns, but specific June hubs are exceptionally pedestrian-friendly:
                </p>
                <ul className="space-y-2 text-xs text-[#3a4d44] font-light">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Highland Towns (Ella):</strong> Compact main streets with easy foot access to cafes, viewpoints, and Nine Arch Bridge paths.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Beach Strips (Arugam Bay / Nilaveli):</strong> Flat sandy beachfronts where you can stroll directly between stays, surf shacks, and seafood grills.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>June Heat Advisory:</strong> In the dry Cultural Triangle and Trincomalee, daytime sun is intense. Do all extended walking before 10:00 AM or after 4:30 PM, carry 1.5L water, and wear breathable sun-protective layers.</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-[#1e3a2f]/5 rounded-xl text-[11px] font-mono text-[#1e3a2f] font-semibold">
                🚶 Score: 8/10 in Ella & Beach strips; Tuk-tuk required for regional transfers.
              </div>
            </div>

            {/* 2. Buses */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[28px] p-7 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1e3a2f]/5 text-[#1e3a2f] flex items-center justify-center">
                  <Bus className="w-6 h-6 text-[#1e3a2f]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Buses (CTB & AC Intercity)</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  The most pervasive public transit on the island, linking virtually every rural junction and city:
                </p>
                <ul className="space-y-2 text-xs text-[#3a4d44] font-light">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Red CTB State Buses:</strong> Dirt-cheap ($0.50 – $3.00 USD), frequent, but non-air-conditioned and driven aggressively along winding hill roads.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Express AC Luxury Buses:</strong> Operated between Colombo Central (Bastian Mawatha) and major eastern destinations like Trincomalee, Batticaloa, and Jaffna. Air-conditioned, assigned seats, fast highway routes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>June Pro-Tip:</strong> For long multi-hour cross-island transits in June heat, avoid standard non-AC red buses. Book Highway Express AC coaches or private cars.</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-[#1e3a2f]/5 rounded-xl text-[11px] font-mono text-[#1e3a2f] font-semibold">
                🚌 Best For: Budget backpackers & Colombo–Trinco express links.
              </div>
            </div>

            {/* 3. Trains */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[28px] p-7 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1e3a2f]/5 text-[#1e3a2f] flex items-center justify-center">
                  <Train className="w-6 h-6 text-[#1e3a2f]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Trains (Scenic Mountain & Coast)</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  One of the world's most cinematic rail networks, winding through high mountain tea plantations and misty pine forests:
                </p>
                <ul className="space-y-2 text-xs text-[#3a4d44] font-light">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Kandy to Ella Mountain Line:</strong> Dramatic vistas over cloud valleys, tea estates, and viaducts. June brings mystical misty cloud cover with afternoon clearing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Colombo to Trincomalee Express:</strong> Daily night-mail train and daytime express service crossing straight to the northeast coast.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Booking Rule:</strong> Reserved 1st & 2nd class tickets open exactly 30 days ahead online (via Sri Lanka Railways seat reservation portal). Secure seats early!</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-[#1e3a2f]/5 rounded-xl text-[11px] font-mono text-[#1e3a2f] font-semibold">
                🚆 Best For: Romantic scenery & leisurely transit between Kandy and Ella.
              </div>
            </div>

            {/* 4. Taxis & Private Chauffeurs */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[28px] p-7 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1e3a2f]/5 text-[#1e3a2f] flex items-center justify-center">
                  <Car className="w-6 h-6 text-[#1e3a2f]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Taxis & Private Chauffeurs</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  The undisputed gold standard for stress-free travel in Sri Lanka, especially with children or heavy luggage:
                </p>
                <ul className="space-y-2 text-xs text-[#3a4d44] font-light">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Private Dedicated Chauffeur:</strong> An English-speaking professional driver with a modern air-conditioned sedan, hybrid, or van. Typical cost: $60–$90 USD/day including fuel, insurance, driver lodging, and highway tolls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>App-Based Cabs (PickMe & Uber):</strong> Highly reliable in Greater Colombo, Kandy, and Galle for short hops with metered fair pricing. Rarely available in remote East Coast pockets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Monsoon Shield:</strong> Allows effortless routing adjustments if an afternoon tropical rain shower passes over the central hills.</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-[#1e3a2f]/5 rounded-xl text-[11px] font-mono text-[#1e3a2f] font-semibold">
                🚗 Best For: Families, couples & hassle-free June multi-city exploration.
              </div>
            </div>

            {/* 5. Bike & Tuk-Tuk Rentals */}
            <div className="bg-[#fcfbf7] border border-[#1e3a2f]/10 rounded-[28px] p-7 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#1e3a2f]/5 text-[#1e3a2f] flex items-center justify-center">
                  <Bike className="w-6 h-6 text-[#1e3a2f]" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Bike & Tuk-Tuk Rentals (Self-Drive & Cruising)</h3>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  For travelers who crave complete independence and authentic roadside discoveries:
                </p>
                <div className="grid md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-2">
                    <span className="font-serif font-bold text-sm text-[#1e3a2f] block">Bicycles</span>
                    <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
                      Rental cost: $3–$6 USD/day. Perfect for exploring ancient ruins in Polonnaruwa and pedal pathways around Sigiriya's paddy fields.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-2">
                    <span className="font-serif font-bold text-sm text-[#1e3a2f] block">Scooters / Motorbikes</span>
                    <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
                      Rental cost: $8–$14 USD/day. Outstanding along the calm East Coast (Arugam Bay to Peanut Farm, or Trincomalee to Nilaveli). International Driving Permit (IDP) required.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-2">
                    <span className="font-serif font-bold text-sm text-[#1e3a2f] block">Self-Drive Tuk-Tuk</span>
                    <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
                      Rental cost: $14–$22 USD/day. Hugely popular adventure option. Requires Sri Lankan endorsement permit issued in Colombo (or pre-arranged through your licensed rental company).
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-[#1e3a2f]/5 rounded-xl text-[11px] font-mono text-[#1e3a2f] font-semibold">
                🛵 Best For: Independent coastal exploration in Arugam Bay & Nilaveli.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ESSENTIAL JUNE TRAVEL INFO (INFO) */}
      <section id="june-travel-info" className="py-20 px-4 md:px-8 bg-[#f5f2e8]/40 border-b border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Practical Field Guide
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              Essential June Travel Info
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              Everything you need to navigate local money, communication, and the rich cultural calendar during your June stay.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* INFO 1: Currency */}
            <div className="bg-white border border-[#1e3a2f]/10 rounded-[28px] p-7 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Banknote className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold tracking-wider">Money & Payments</span>
                  <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Currency (LKR)</h3>
                </div>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  The local currency is the <strong>Sri Lankan Rupee (LKR)</strong>. Understanding how and when to use cash versus cards is vital:
                </p>
                <ul className="space-y-2 text-xs text-[#3a4d44] font-light">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Cards Accepted:</strong> Visa and Mastercard are standard at 4/5-star hotels, supermarkets, and upscale restaurants in Colombo, Kandy, and resort zones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Cash is King:</strong> Local tuk-tuks, street stalls, king coconut vendors, beach cafes, and entrance fees for small cultural monuments demand cash.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>ATMs & Cash Machines:</strong> Readily available in all towns (Commercial Bank, Sampath, HNB). Always choose "Without Conversion" at the ATM screen to avoid inflated DCC bank rates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Small Notes:</strong> Keep a stash of Rs. 100, 500, and 1,000 notes for everyday tips and tuk-tuk drivers who seldom carry change for Rs. 5,000 notes.</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl text-[11px] font-mono text-emerald-900 font-semibold">
                💡 Tip: Exchange a small amount at Colombo Airport arrivals counters for instant cash on hand.
              </div>
            </div>

            {/* INFO 2: Language */}
            <div className="bg-white border border-[#1e3a2f]/10 rounded-[28px] p-7 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Languages className="w-6 h-6 text-blue-700" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold tracking-wider">Communication & Greetings</span>
                  <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Language & Culture</h3>
                </div>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  Sri Lanka has two official national languages: <strong>Sinhala</strong> (spoken predominantly in the South, Central, and West) and <strong>Tamil</strong> (predominantly in the North and East, including Trincomalee and Passikudah).
                </p>
                <ul className="space-y-2 text-xs text-[#3a4d44] font-light">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>English Widely Spoken:</strong> English is the recognized link language and is spoken fluently by hotel staff, drivers, guides, and restaurant hosts throughout tourist corridors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Helpful Sinhala Phrases:</strong> <em>"Ayubowan"</em> (May you live long / Hello with hands pressed), <em>"Bohoma Sthuthi"</em> (Thank you very much), <em>"Hari"</em> (Okay / Understood).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Helpful Tamil Phrases:</strong> <em>"Vanakkam"</em> (Welcome / Hello), <em>"Nandri"</em> (Thank you), <em>"Nalla irukku"</em> (It is good / tasty).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Connectivity:</strong> Buy a local tourist eSIM or physical SIM (Dialog or Mobitel) at Colombo airport arrivals ($8–$12 for 30–50 GB).</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-[11px] font-mono text-blue-900 font-semibold">
                📱 Tip: Dialog has the widest coverage across both the Central Highlands and the East Coast.
              </div>
            </div>

            {/* INFO 3: Cultural Calendar Tip */}
            <div className="bg-white border border-[#1e3a2f]/10 rounded-[28px] p-7 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-700" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold tracking-wider">Festival Intelligence</span>
                  <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Cultural Calendar Tip: Poson Poya</h3>
                </div>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                  The most significant national cultural event in June is <strong>Poson Poya</strong> (the June full moon day), commemorating the introduction of Buddhism to Sri Lanka in the 3rd century BCE:
                </p>
                <ul className="space-y-2 text-xs text-[#3a4d44] font-light">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Mihintale & Anuradhapura Festivities:</strong> Hundreds of thousands of pilgrims dressed in pure white gather at the ancient rock temple of Mihintale under breathtaking illuminations and decorated paper lanterns (<em>Vesak Kudu</em>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Free Food Stalls (Dansalas):</strong> Locals set up roadside community stalls offering free meals, sweet drinks, ice cream, and snacks to all passers-by as an act of generosity. Tourists are warmly welcomed to stop and share.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Dry Day Regulations:</strong> On Poson Poya day (and the day before/after in sacred cities), all wine stores, bars, and butcheries are closed nationwide. Alcohol is not served in hotel restaurants. Plan your purchases ahead if you want personal drinks.</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl text-[11px] font-mono text-amber-900 font-semibold">
                🏮 Tip: Dress respectfully in white covering shoulders and knees if visiting temples during Poson.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: BEST PLACES FOR COUPLES */}
      <section className="py-20 px-4 md:px-8 bg-[#1e3a2f] text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Romantic Escapes
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">
              Sri Lanka in June for Couples
            </h2>
            <p className="text-sm text-[#a3bfae] font-light max-w-2xl mx-auto">
              Enjoy peaceful luxury and bespoke visual experiences without commercialized crowd noise on the golden sands of the East.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-[#d4af37] font-serif font-bold text-lg">
                <Sunset className="w-5 h-5 text-[#d4af37]" /> Spectacular Sunrise Spots
              </div>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                As the sun rises over the Indian Ocean, watch local fishing catamarans set out on calm skies from Uppuveli Beach, or enjoy a champagne breakfast directly on your private sea-view deck in Nilaveli.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-[#d4af37] font-serif font-bold text-lg">
                <Heart className="w-5 h-5 text-[#d4af37]" /> Private Luxury Ocean Stays
              </div>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                Stay at ultra-exclusive luxury properties such as Jungle Beach Resort in Trincomalee. Experience private plunge pools hidden among forest trees just a few steps away from an empty beachline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: BEST PLACES FOR FAMILIES */}
      <section className="py-20 px-4 md:px-8 bg-white border-b border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">
              Family Travel Safeties
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1e3a2f]">
              Sri Lanka in June for Families
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-2xl mx-auto">
              Keep children and toddlers highly safe and friction-free with ocean swimming spots selected specifically for safety.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#f5f2e8]/40 border border-[#1e3a2f]/5 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm">✓</div>
              <h4 className="font-serif font-bold text-base text-[#1e3a2f]">Shallow Bay Walks</h4>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                Passikudah's barrier reef prevents open ocean surf from entering, making the shoreline look like a giant, calm swimming pool where kids can splash safely.
              </p>
            </div>

            <div className="bg-[#f5f2e8]/40 border border-[#1e3a2f]/5 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm">✓</div>
              <h4 className="font-serif font-bold text-base text-[#1e3a2f]">Pigeon Island Snorkeling</h4>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                The water is so calm and shallow that even children wearing life vests can snorkel safely right off the main sandy beach, watching dozens of color fish pass.
              </p>
            </div>

            <div className="bg-[#f5f2e8]/40 border border-[#1e3a2f]/5 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm">✓</div>
              <h4 className="font-serif font-bold text-base text-[#1e3a2f]">Private Air-Con Taxis</h4>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                We organize private driving transfers with custom, toddler-appropriate child seats, taking the exhaustion and stress out of intermediate inland legs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8.5: IS IT WORTH VISITING IN JUNE OR JULY? */}
      <section className="py-20 px-4 md:px-8 bg-[#1e3a2f] text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              June vs. July
            </span>
            <h2 className="text-2xl md:text-5xl font-serif text-white">
              Is It Worth Visiting In June Or July?
            </h2>
            <p className="text-sm text-[#a3bfae] font-light max-w-2xl mx-auto leading-relaxed">
              Both months sit inside the East Coast's dry season, so the weather question is basically a tie. The real difference is crowds, pricing, and how far in advance you need to plan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border-2 border-[#d4af37]/50 p-7 rounded-3xl space-y-4 relative">
              <span className="absolute -top-3 left-6 px-3 py-1 bg-[#d4af37] text-[#1e3a2f] text-[10px] font-mono font-bold uppercase tracking-wider rounded-full">
                Better Value
              </span>
              <div className="flex items-center gap-2 text-[#d4af37] font-serif font-bold text-lg pt-1">
                <Calendar className="w-5 h-5" /> June
              </div>
              <ul className="space-y-2.5 text-sm text-white/80 font-light leading-relaxed">
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" /> East Coast is already fully dry and calm — same flat seas and snorkeling visibility as July.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" /> Noticeably fewer crowds at Pigeon Island, Nilaveli and Trincomalee before the July–August rush.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" /> Hotel rates are lower — you're booking just ahead of peak season pricing, not during it.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" /> Boats, guides and rooms are easier to secure last-minute.</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-7 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-white/70 font-serif font-bold text-lg">
                <Calendar className="w-5 h-5" /> July
              </div>
              <ul className="space-y-2.5 text-sm text-white/70 font-light leading-relaxed">
                <li className="flex gap-2"><Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Sea conditions are just as good, arguably at their absolute peak clarity alongside August.</li>
                <li className="flex gap-2"><Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> This is peak East Coast season — expect busier beaches, boats, and restaurants.</li>
                <li className="flex gap-2"><Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Accommodation prices rise and popular hotels sell out — advance booking becomes essential.</li>
                <li className="flex gap-2"><Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Overlaps with European and Indian school-holiday travel, adding to the crowd.</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex gap-4">
            <ThumbsUp className="w-6 h-6 text-[#d4af37] shrink-0" />
            <p className="text-sm text-white/80 font-light leading-relaxed">
              <strong className="text-white font-bold">Our take: June is the better option.</strong> You get the exact same dry-season weather, calm seas, and snorkeling conditions as July, but with smaller crowds, lower prices, and far more flexible booking. Save July/August for if June simply doesn't fit your calendar — you won't get meaningfully better weather by waiting, just a busier and pricier trip.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#fcfbf7] border-b border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3 animate-fade-in">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">
              Bespoke Intel Desk FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1e3a2f]">
              20 Essential June FAQs
            </h2>
            <p className="text-sm text-[#3a4d44] font-light max-w-xl mx-auto">
              Get objective entries from our local experts solving flight confusion, weather fluctuations, and transport safety.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqList.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-[24px] border border-[#1e3a2f]/5 hover:border-[#1e3a2f]/20 transition-all overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => {
                      setActiveFaq(isOpen ? null : idx);
                      trackEvent("june_faq_click", "engagement", `q_${idx}`);
                    }}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 transition-colors"
                  >
                    <span className="font-serif font-bold text-sm md:text-base text-[#1e3a2f] leading-snug">
                      {faq.q}
                    </span>
                    <span className={`w-8 h-8 rounded-full bg-[#1e3a2f]/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#1e3a2f] text-white" : "text-[#1e3a2f]"}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs md:text-sm text-[#3a4d44] font-light leading-relaxed border-t border-[#1e3a2f]/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: LEAD GENERATION FORM */}
      <section id="june-form" className="py-20 md:py-32 px-4 md:px-8 bg-[#1e3a2f] text-white">
        <div className="max-w-3xl mx-auto bg-white text-[#1a2d24] p-6 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl" />
          
          <div className="text-center space-y-4 mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37] font-bold block">
              June Weather Concierge
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              Not Sure Which Coast Matches Your Dates?
            </h2>
            <p className="text-xs text-[#3a4d44]/70 max-w-lg mx-auto font-light leading-relaxed">
              Fill below to get a highly customized June route recommendation based on your group dynamics, budget range, and weather preferences, delivered fast via WhatsApp.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form 
                onSubmit={handleLeadSubmit} 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Travel Dates */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                      Estimated Travel Dates (June 2026)
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g., June 10 to June 20"
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300Focus border-[#1e3a2f] text-xs font-medium focus:outline-none"
                      value={leadForm.travelDates}
                      onChange={(e) => setLeadForm({...leadForm, travelDates: e.target.value})}
                    />
                  </div>

                  {/* Departure City */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                      Departure City (India)
                    </label>
                    <select
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#1e3a2f] bg-white font-medium"
                      value={leadForm.departureCity}
                      onChange={(e) => setLeadForm({...leadForm, departureCity: e.target.value})}
                    >
                      {["Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad", "Kolkata", "Other"].map((ct) => (
                        <option key={ct} value={ct}>{ct}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                      Budget Class
                    </label>
                    <select
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#1e3a2f] bg-white font-medium"
                      value={leadForm.budget}
                      onChange={(e) => setLeadForm({...leadForm, budget: e.target.value})}
                    >
                      <option value="luxury">Luxury Elite (Airplanes, 5-Star Villas)</option>
                      <option value="midrange">Mid-Range (Private Driver, 4-Star Rest)</option>
                      <option value="budget">Value Paced (Slower, Budget Friendly)</option>
                    </select>
                  </div>

                  {/* Travel Style */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                      Travel Style
                    </label>
                    <select
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#1e3a2f] bg-white font-medium"
                      value={leadForm.travelStyle}
                      onChange={(e) => setLeadForm({...leadForm, travelStyle: e.target.value})}
                    >
                      <option value="couple">Couple / Honeymoon</option>
                      <option value="family_baby">Family with Baby / Toddler</option>
                      <option value="family_teen">Family with Teenagers</option>
                      <option value="solo_group">Solo / Adventure Friends</option>
                    </select>
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                    Your WhatsApp Number (For Direct Map Dispatch)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-400">
                      +91
                    </span>
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="99999 99999"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#1e3a2f] text-xs font-medium font-mono"
                      value={leadForm.whatsapp}
                      onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    required
                    id="chk-agree"
                    type="checkbox"
                    checked={leadForm.agreed}
                    onChange={(e) => setLeadForm({...leadForm, agreed: e.target.checked})}
                    className="rounded border-neutral-300 text-[#1e3a2f] focus:ring-[#1e3a2f]"
                  />
                  <label htmlFor="chk-agree" className="text-[10px] text-neutral-400 font-light">
                    I agree to receive custom travel routes on WhatsApp from Colombo Travel Desk.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 bg-[#1e3a2f] text-white font-bold rounded-xl uppercase text-xs tracking-widest hover:bg-[#d4af37] hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#d4af37]" /> Solve My June Trip Weather
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                className="text-center py-10 space-y-6"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="w-16 h-16 bg-[#1e3a2f] text-[#d4af37] rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg">
                  ✓
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1e3a2f]">Bespoke Route Dispatch Active!</h3>
                  <p className="text-xs text-[#3a4d44] max-w-sm mx-auto mt-2 font-light leading-relaxed">
                    Hello traveler from <strong className="font-semibold">{leadForm.departureCity}</strong>! Our Colombo team is analyzing June weather patterns for your <strong className="font-semibold">{leadForm.travelStyle}</strong> style.
                  </p>
                </div>
                <div className="bg-[#f5f2e8] p-4 rounded-2xl max-w-md mx-auto text-xs space-y-2 border border-[#1e3a2f]/5">
                  <p className="font-mono text-[10px] text-[#2c4438] font-bold">
                    [DISPATCH LOG 2026-ACTIVE]
                  </p>
                  <p className="text-neutral-500 font-light">
                    Map dispatched to +91 {leadForm.whatsapp}. Standby for private driver quotes, custom luxury hotel bookings, and weather clearances.
                  </p>
                </div>
                <a
                  href="https://wa.me/94722968210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black font-bold uppercase tracking-wider text-[10px] rounded-full hover:bg-[#1e3a2f] hover:text-[#d4af37] transition-all"
                >
                  Chat Live with Advisor Now
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* RELATED INTERNAL TRAVEL GUIDES & TOOLS */}
      <section className="py-12 bg-[#fcfbf7] border-t border-[#1e3a2f]/10 max-w-7xl mx-auto px-4 md:px-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold mb-6 text-center">
          Explore Other Seasonal & Regional Sri Lanka Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to="/sri-lanka-itinerary-august-couples"
            className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/10 hover:border-[#d4af37] transition-all group flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#d4af37] block mb-1">August Special</span>
              <h4 className="font-serif font-bold text-[#1e3a2f] text-sm group-hover:text-[#d4af37] transition-colors">Sri Lanka August Couples Itinerary</h4>
              <p className="text-[11px] text-[#1a2d24]/70 mt-1 font-light">Kandy Esala Perahera festival & east coast beach weather.</p>
            </div>
            <div className="flex items-center justify-end mt-4">
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            to="/best-time-to-visit-sri-lanka"
            className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/10 hover:border-[#d4af37] transition-all group flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#d4af37] block mb-1">Seasonality Master Guide</span>
              <h4 className="font-serif font-bold text-[#1e3a2f] text-sm group-hover:text-[#d4af37] transition-colors">Best Time to Visit Sri Lanka</h4>
              <p className="text-[11px] text-[#1a2d24]/70 mt-1 font-light">Year-round climate breakdown & monsoon matrix.</p>
            </div>
            <div className="flex items-center justify-end mt-4">
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            to="/sri-lanka-7-day-itinerary"
            className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/10 hover:border-[#d4af37] transition-all group flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#d4af37] block mb-1">Itinerary Guide</span>
              <h4 className="font-serif font-bold text-[#1e3a2f] text-sm group-hover:text-[#d4af37] transition-colors">7-Day Signature Sri Lanka Itinerary</h4>
              <p className="text-[11px] text-[#1a2d24]/70 mt-1 font-light">Curated road map comparing route pacing and transit times.</p>
            </div>
            <div className="flex items-center justify-end mt-4">
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            to="/sri-lanka-visa-for-indians"
            className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/10 hover:border-[#d4af37] transition-all group flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#d4af37] block mb-1">Visa & Immigration</span>
              <h4 className="font-serif font-bold text-[#1e3a2f] text-sm group-hover:text-[#d4af37] transition-colors">Sri Lanka Visa For Indians</h4>
              <p className="text-[11px] text-[#1a2d24]/70 mt-1 font-light">ETA fees, online application & airport entry guidelines.</p>
            </div>
            <div className="flex items-center justify-end mt-4">
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
