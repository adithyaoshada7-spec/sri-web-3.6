import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Info,
  Calendar,
  Plane,
  Building,
  Utensils,
  Car,
  Ticket,
  ShieldCheck,
  Users,
  Clock,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  Heart,
  Train,
  Shield,
  Smartphone,
  Wallet,
  AlertTriangle,
  Award,
  Backpack,
  Compass,
  Sunrise,
  ShoppingBag
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import FaqAccordion, { FaqItem } from "./FaqAccordion";

interface DayPlan {
  day: number;
  title: string;
  driveInfo: string;
  morning: string;
  afternoon: string;
  evening: string;
  food: string;
  hotel: string;
  budget: string;
  tip: string;
}

const days: DayPlan[] = [
  {
    day: 1,
    title: "Colombo",
    driveInfo: "Airport to city: ~45–60 min",
    morning: "Land at Bandaranaike International Airport, clear immigration, collect your SIM card or activate your eSIM, and meet your driver.",
    afternoon: "Ease in with a walk along Galle Face Green, Colombo's breezy seafront promenade. If you have energy, swing by Gangaramaya Temple.",
    evening: "Sunset at Galle Face Green, followed by dinner at a seafront terrace or a local seafood spot nearby.",
    food: "Short eats from a Galle Face Green cart, then kottu roti for dinner.",
    hotel: "Near Galle Face or Colpetty (Kollupitiya) for easy access to the seafront.",
    budget: "₹4,000 – ₹7,000",
    tip: "Don't over-plan Day 1 — the flight and transfer already use up plenty of energy."
  },
  {
    day: 2,
    title: "Sigiriya",
    driveInfo: "Colombo to Sigiriya: 170 km, 3.5–4 hrs",
    morning: "Set off early (by 7 AM if possible). Traffic out of Colombo is the main variable, so an early start pays off.",
    afternoon: "Climb the legendary Sigiriya Rock Fortress — a 5th-century royal citadel with ancient frescoes, mirror walls, and the famous stone lion's paw entrance.",
    evening: "Relax at your hotel pool, or take an optional village tour with a traditional home-cooked dinner.",
    food: "Rice and curry platter — the everyday Sri Lankan meal, similar in structure to a Tamil Nadu meals plate.",
    hotel: "Sigiriya or nearby Habarana for jungle-adjacent properties with easy rock access.",
    budget: "₹6,000 – ₹9,000",
    tip: "Buy your Sigiriya ticket at the official counter, not from touts near the entrance."
  },
  {
    day: 3,
    title: "Kandy",
    driveInfo: "Sigiriya to Kandy: 90 km, 2.5–3 hrs",
    morning: "Drive to Kandy, Sri Lanka's cultural and religious heart, stopping at Dambulla Cave Temple en route if time allows.",
    afternoon: "Visit the Temple of the Sacred Tooth Relic (dress modestly), then walk around Kandy Lake right beside it.",
    evening: "Catch a traditional Kandyan cultural dance show — drumming, fire-walking, and elaborate costumes.",
    food: "Lamprais — a Dutch-Burgher dish of rice and curries baked together in a banana leaf parcel.",
    hotel: "Hotels with lake or hill views close to the city center — Kandy is very walkable once based centrally.",
    budget: "₹5,500 – ₹8,500",
    tip: "Visit the temple in the late afternoon to catch the evening puja with drumming, and to avoid the crowds."
  },
  {
    day: 4,
    title: "Nuwara Eliya",
    driveInfo: "Kandy to Nuwara Eliya: 75–80 km, ~3 hrs",
    morning: "Head into the hills — winding mountain roads make this a solid 3-hour drive, so leave after breakfast.",
    afternoon: "Tour a working tea plantation and factory, ending with a tasting. Expect a temperature drop of up to 10–12°C.",
    evening: "Stroll around Gregory Lake, or take a boat ride if the weather cooperates.",
    food: "A proper Ceylon high tea — delicate sandwiches, scones, and tea grown on the hillsides around you.",
    hotel: "Colonial-era bungalow-style hotels — several converted planters' residences offer genuine period charm.",
    budget: "₹5,000 – ₹8,000",
    tip: "Pack a light jacket. Chennai travelers are consistently caught off guard by how cold it gets here at night."
  },
  {
    day: 5,
    title: "Ella",
    driveInfo: "Nanu Oya to Ella by train: 3–4 hrs",
    morning: "Board the scenic train from Nanu Oya to Ella — one of the most celebrated rail journeys in the world. Reserve seats at least 30 days ahead.",
    afternoon: "Walk out to the Nine Arch Bridge, or tackle Little Adam's Peak for sweeping valley views.",
    evening: "Ella's relaxed, backpacker-friendly cafe scene is good for a casual dinner.",
    food: "Ravana Falls area cafes for fresh juices and simple, well-cooked Sri Lankan and fusion food.",
    hotel: "A property with a valley or \"Ella Gap\" view — one town where the view genuinely matters.",
    budget: "₹4,500 – ₹7,500",
    tip: "Can't get train tickets in time? The 2.5–3 hr road journey from Nuwara Eliya is scenic in its own right."
  },
  {
    day: 6,
    title: "Mirissa or Bentota",
    driveInfo: "Ella to Mirissa: ~150 km, 4–4.5 hrs · Ella to Bentota: ~195 km, 5–5.5 hrs",
    morning: "Depart Ella early — this is the longest driving day of the trip either way.",
    afternoon: "Mirissa: check in, then head to the beach (whale watching runs Nov–Apr). Bentota: settle into a calmer, resort-style beach with river safaris nearby.",
    evening: "Mirissa: sunset from Coconut Tree Hill with fresh seafood. Bentota: a quiet beachfront dinner or an Ayurvedic spa session.",
    food: "Grilled fish, prawns, and crab curry along the coast. Vegetarians can ask for jackfruit curry (polos).",
    hotel: "Mirissa: close to the main beach strip. Bentota: a resort directly on the river or beach.",
    budget: "₹6,000 – ₹10,000",
    tip: "Flight home before 2 PM on Day 7? Choose Bentota — its much shorter drive back removes a lot of last-day stress."
  },
  {
    day: 7,
    title: "Colombo — Shopping & Departure",
    driveInfo: "Bentota to Colombo: ~1.5 hrs · Mirissa to Colombo: ~2.5–3 hrs",
    morning: "Depart your coastal base early and head back toward Colombo via the Southern Expressway.",
    afternoon: "Shop at Barefoot (textiles), Spa Ceylon (Ayurvedic gifts), and Dilmah tea boutiques for souvenirs that don't feel like tourist-trap junk.",
    evening: "Head to Bandaranaike International Airport — build in at least 3 hours before departure given city traffic.",
    food: "A proper string hoppers and curry breakfast, or a final splurge on crab at a Colombo institution if lunch timing allows.",
    hotel: "If your flight is late night, consider a day-use room or an airport-adjacent Negombo hotel instead of fighting Colombo traffic twice.",
    budget: "₹5,000 – ₹8,000",
    tip: "Keep 5,000–10,000 LKR aside for last-minute souvenirs and airport snacks — easy to run short right when you need it most."
  }
];

const faqs: FaqItem[] = [
  {
    category: "Planning",
    question: "Is 7 days enough for Sri Lanka from Chennai?",
    answer: "Yes. Seven days comfortably covers this loop — Colombo, Sigiriya, Kandy, Nuwara Eliya, Ella, and a south-coast beach stop — without feeling rushed. Add Yala or Galle by extending to 9–10 days."
  },
  {
    category: "Budget",
    question: "How much does a 7-day Sri Lanka trip from Chennai cost?",
    answer: "Mid-range: ₹45,000–₹70,000 per person, including return flights, accommodation, private transport, food, and activities. Budget: ₹31,500–₹44,660. Luxury: ₹1,64,000+."
  },
  {
    category: "Safety",
    question: "Is Sri Lanka safe for Indian tourists?",
    answer: "Yes — widely regarded as one of the safer countries in the region for solo travelers, couples, and families, with standard precautions applying as they would anywhere."
  },
  {
    category: "Visa & Entry",
    question: "Do Indians need a visa for Sri Lanka?",
    answer: "Yes, an Electronic Travel Authorization (ETA) applied for online before departure. Approval usually takes under 24 hours; the fee is sometimes waived under bilateral tourism promotions — check the official portal for current rules."
  },
  {
    category: "Weather",
    question: "Which month is best to visit Sri Lanka from Chennai?",
    answer: "December to March offers the most reliable weather across this route. April, September, and October are solid shoulder-season alternatives with fewer crowds."
  },
  {
    category: "Money",
    question: "Can I use Indian Rupees in Sri Lanka?",
    answer: "Not directly for most purchases — you'll need Sri Lankan Rupees (LKR) in cash. Indian debit/credit cards work at most hotels and city restaurants, and UPI acceptance is growing at select merchants."
  },
  {
    category: "Planning",
    question: "How many days should I spend in each place?",
    answer: "One day each for Colombo (arrival), Sigiriya, Kandy, and Nuwara Eliya, with Ella and the coastal stop each getting roughly a day and a half. Extending Ella or the beach leg is the easiest way to slow the pace."
  },
  {
    category: "Train Journey",
    question: "Is the Kandy to Ella train worth it?",
    answer: "Yes, almost universally — one of the most scenic rail journeys in the world. Book a reserved seat 30 days ahead for a window view instead of standing in a crowded unreserved carriage."
  },
  {
    category: "Family Travel",
    question: "Is Sri Lanka good for a family trip with kids?",
    answer: "Yes, particularly for kids aged 7 and above who can manage moderate walking, such as the Sigiriya climb and hill-country hikes. Private transport makes the trip far more manageable with children."
  },
  {
    category: "Couple Travel",
    question: "Is Sri Lanka good for couples and honeymoons?",
    answer: "Very much so. Hill-country romance in Nuwara Eliya and Ella, paired with beach relaxation in Mirissa or Bentota, makes this a well-rounded honeymoon route without compromising between mountains and beaches."
  },
  {
    category: "Planning",
    question: "What's the difference between Mirissa and Bentota for Day 6?",
    answer: "Mirissa has a livelier beach scene and seasonal whale watching but a longer drive from Ella. Bentota is calmer and family-friendly, with a much shorter final drive to Colombo airport — better if your Day 7 flight is early."
  },
  {
    category: "Transport",
    question: "Do I need a private driver, or can I manage with public transport?",
    answer: "A private driver is strongly recommended given how many regions this route covers in a short time. Budget backpackers comfortable with buses and trains can do it cheaper, at a slower, less flexible pace."
  },
  {
    category: "Planning",
    question: "Is it better to book a package tour or plan independently?",
    answer: "Independent planning with a hired driver typically costs less and offers more flexibility than a rigid package tour, especially with a planning tool to structure the logistics for you."
  },
  {
    category: "Planning",
    question: "Can this itinerary be extended or shortened?",
    answer: "Yes. Shortening to 5 days usually means dropping Nuwara Eliya or the beach leg. Extending to 9–10 days comfortably adds a Yala safari and/or Galle Fort."
  },
  {
    category: "Planning",
    question: "What should first-time visitors from Chennai know before booking?",
    answer: "Book your ETA and Ella train tickets well in advance, hire a private driver rather than self-driving, and don't over-schedule Day 1 — the flight and transfer already use up plenty of energy."
  }
];

export default function SrilankaChennaiItineraryPage() {
  usePageMetadata({
    title: "Sri Lanka 7 Day Itinerary from Chennai (2026 Guide)",
    description: "Planning a Sri Lanka trip from Chennai? Get a detailed 7-day itinerary with flights, visa, budget, hotels, food & top places to visit. Plan smarter today.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-7-day-itinerary-from-chennai",
    ogUrl: "https://plan-srilanka.com/sri-lanka-7-day-itinerary-from-chennai",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [activeDay, setActiveDay] = useState<number>(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppRedirect = (source: string) => {
    trackEvent("whatsapp_click", "conversion", `chennai_itinerary_${source}`);
    const message = `Hi Plan Sri Lanka! I'm planning a 7-day Sri Lanka trip from Chennai. Could you share a free personalized itinerary and cost quote? Thank you.`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const activeDayPlan = days.find((d) => d.day === activeDay) ?? days[0];

  return (
    <div className="bg-luxury-cream min-h-screen text-luxury-black font-sans leading-relaxed selection:bg-luxury-gold/30 pt-24 md:pt-32">
      {/* JSON-LD SCHEMA */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka 7 Day Itinerary from Chennai (2026 Complete Guide)",
            "description": "A detailed 7-day Sri Lanka itinerary for travelers from Chennai, covering flights, visa, day-by-day plans, budget, hotels, food, transport and safety tips.",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "author": {
              "@type": "Person",
              "name": "Adithya Oshada",
              "jobTitle": "Lead Ceylon Travel Stylist",
              "url": "https://plan-srilanka.com/about-founder"
            },
            "reviewedBy": {
              "@type": "Person",
              "name": "Anura Jayasekera",
              "jobTitle": "SLTDA National Guide Lecturer (No: S-1294)"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://plan-srilanka.com/sri-lanka-7-day-itinerary-from-chennai"
            },
            "datePublished": "2026-08-06T09:00:00+05:30",
            "dateModified": "2026-08-06T09:00:00+05:30"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com" },
              { "@type": "ListItem", "position": 2, "name": "7 Day Itinerary", "item": "https://plan-srilanka.com/sri-lanka-7-day-itinerary" },
              { "@type": "ListItem", "position": 3, "name": "From Chennai", "item": "https://plan-srilanka.com/sri-lanka-7-day-itinerary-from-chennai" }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          })}
        </script>
      </>

      {/* HEADER / HERO */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-black/50 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/sri-lanka-7-day-itinerary" className="hover:text-luxury-gold transition-colors">7 Day Itinerary</Link>
          <span>/</span>
          <span className="text-luxury-gold font-semibold">From Chennai</span>
        </nav>

        <div className="border-l-4 border-luxury-gold pl-6 space-y-3">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="bg-luxury-green/10 text-luxury-green font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[10px]">
              EEAT Certified Expert Guide
            </span>
            <span className="text-luxury-black/40 font-mono">2026 Edition</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-luxury-green tracking-tight leading-tight">
            Sri Lanka 7 Day Itinerary from Chennai <br className="hidden md:block" />
            <span className="italic font-normal text-luxury-gold">(2026 Complete Guide)</span>
          </h1>
          <p className="text-lg md:text-xl text-luxury-black/70 font-light max-w-4xl tracking-wide">
            A tested day-by-day route for Chennai travelers: Colombo, Sigiriya, Kandy, Nuwara Eliya, Ella, and a south-coast finish — with real flight times, visa steps, budgets, and hotel picks for every day.
          </p>

          {/* E-E-A-T Author / Reviewer Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs">
            <Link to="/about-founder" className="flex items-center gap-2.5 group">
              <img
                src="/adithya-oshada-founder-plan-sri-lanka.jpg"
                alt="Adithya Oshada, Lead Ceylon Travel Stylist and founder of Plan Sri Lanka"
                width="36"
                height="36"
                className="w-9 h-9 rounded-full border border-luxury-gold/40 object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <span className="text-left">
                <span className="block text-luxury-black/80 font-medium group-hover:text-luxury-gold transition-colors">Adithya Oshada</span>
                <span className="text-[10px] font-mono text-luxury-gold block">Lead Ceylon Travel Stylist</span>
              </span>
            </Link>
            <div className="h-6 w-[1px] bg-luxury-black/10 hidden sm:block"></div>
            <span className="text-left">
              <span className="text-luxury-black/80 font-medium flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-luxury-gold" />
                Reviewed by Anura Jayasekera
              </span>
              <span className="text-[10px] text-luxury-black/45 block">SLTDA National Guide Lecturer (No: S-1294)</span>
            </span>
            <div className="h-6 w-[1px] bg-luxury-black/10 hidden sm:block"></div>
            <span className="text-luxury-black/45 font-mono text-[11px]">Updated August 2026</span>
          </div>

          {/* Quick Jump TOC */}
          <nav aria-label="Table of contents" className="flex flex-wrap gap-2 pt-4 text-[11px] font-mono">
            <a href="#quick-summary" className="px-3 py-1.5 bg-white border border-luxury-black/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all">Quick Summary</a>
            <a href="#flights" className="px-3 py-1.5 bg-white border border-luxury-black/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all">Flights</a>
            <a href="#visa" className="px-3 py-1.5 bg-white border border-luxury-black/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all">Visa</a>
            <a href="#itinerary" className="px-3 py-1.5 bg-white border border-luxury-black/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all">Day-by-Day</a>
            <a href="#trip-budget" className="px-3 py-1.5 bg-white border border-luxury-black/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all">Budget</a>
            <a href="#transport" className="px-3 py-1.5 bg-white border border-luxury-black/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all">Transport</a>
            <a href="#safety" className="px-3 py-1.5 bg-white border border-luxury-black/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all">Safety</a>
            <a href="#faq-home-section" className="px-3 py-1.5 bg-white border border-luxury-black/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all">FAQs</a>
          </nav>
        </div>
      </div>

      {/* QUICK TRIP SUMMARY */}
      <section className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24" id="quick-summary">
        <div className="bg-[#1A2F23] text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-luxury-gold">
                <Info className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-serif text-luxury-gold font-bold">Quick Trip Summary</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Duration", value: "7 days / 6 nights", icon: <Calendar className="w-4 h-4" /> },
                { label: "Budget (mid-range)", value: "₹45,000 – ₹70,000 /person", icon: <Wallet className="w-4 h-4" /> },
                { label: "Visa", value: "ETA — apply online in advance", icon: <ShieldCheck className="w-4 h-4" /> },
                { label: "Currency", value: "Sri Lankan Rupee (LKR)", icon: <Wallet className="w-4 h-4" /> },
                { label: "Best Months", value: "December – March (ideal)", icon: <Sun className="w-4 h-4" /> },
                { label: "Flight Time (MAA→CMB)", value: "~1 hr 15–25 min, direct", icon: <Plane className="w-4 h-4" /> },
                { label: "Ideal Travelers", value: "Couples, families, first-timers", icon: <Users className="w-4 h-4" /> },
                { label: "Route", value: "Colombo → Sigiriya → Kandy → Nuwara Eliya → Ella → Coast → Colombo", icon: <MapPin className="w-4 h-4" /> }
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-luxury-gold/30 transition-all">
                  <span className="text-luxury-gold mb-2 block">{item.icon}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-1">{item.label}</span>
                  <p className="text-sm font-serif text-white font-bold leading-snug">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={() => handleWhatsAppRedirect("quick_summary")}
                className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-luxury-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-luxury-green transition-all shadow-lg flex items-center justify-center gap-3"
              >
                Get This Route Customized <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-white/40 italic">Free personalized planning • Verified Colombo Concierge</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SRI LANKA IS PERFECT FOR CHENNAI TRAVELERS */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">The Honest Pitch</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Why Sri Lanka Is Perfect for Chennai Travelers
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Distance, food, flights, and budget — all stacked in your favor</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Plane className="w-5 h-5" />, title: "Unfairly Close", desc: "Chennai to Colombo is roughly 650 km — shorter than a Chennai–Hyderabad flight, with no time-zone adjustment needed." },
            { icon: <Utensils className="w-5 h-5" />, title: "Familiar Food", desc: "Rice, coconut milk, curry leaves, and fresh seafood — the same building blocks as Tamil and coastal Andhra cooking." },
            { icon: <Compass className="w-5 h-5" />, title: "Direct Flights Daily", desc: "IndiGo and SriLankan Airlines run multiple daily direct flights — no layovers, no overnight waits." },
            { icon: <Heart className="w-5 h-5" />, title: "Genuinely Welcoming", desc: "English is widely spoken, UPI and cards are increasingly accepted, and the ETA visa process is refreshingly simple." },
            { icon: <Wallet className="w-5 h-5" />, title: "Budget-Friendly", desc: "A comfortable mid-range week here, flights included, often costs less than a domestic Goa trip in peak season." },
            { icon: <Sparkles className="w-5 h-5" />, title: "Landscape Variety", desc: "Ancient fortresses, misty tea mountains, a world-famous train ride, and beaches — all in a single compact week." }
          ].map((item) => (
            <div key={item.title} className="bg-white p-6 rounded-3xl border border-luxury-black/5 hover:border-luxury-gold/30 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                {item.icon}
              </div>
              <h3 className="font-serif font-bold text-luxury-green">{item.title}</h3>
              <p className="text-xs text-luxury-black/60 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-luxury-black/50 text-center mt-8 font-light">
          For the deeper cost breakdown behind these numbers — solo, couple, or family — see our{" "}
          <Link to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" className="text-luxury-gold hover:underline font-bold">Sri Lanka trip cost from Chennai</Link> guide.
        </p>
      </section>

      {/* FLIGHTS FROM CHENNAI */}
      <section className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24" id="flights">
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-luxury-black/5 shadow-luxury">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-luxury-gold uppercase tracking-[0.25em] text-xs font-mono font-bold">Getting There</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
                Flights from Chennai to Sri Lanka
              </h2>
              <p className="text-xs text-luxury-black/50 uppercase tracking-widest">One of the shortest international routes out of South India</p>
            </div>

            <p className="text-sm text-luxury-black/70 font-light leading-relaxed text-center">
              Direct flights from Chennai International Airport (MAA) to Bandaranaike International Airport (CMB) take approximately <strong className="text-luxury-green">1 hour 15 to 25 minutes</strong>.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-luxury-cream/50 p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">IndiGo</span>
                <p className="text-xs text-luxury-black/60">Most frequent operator — multiple daily departures.</p>
              </div>
              <div className="bg-luxury-cream/50 p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">SriLankan Airlines</span>
                <p className="text-xs text-luxury-black/60">National carrier, fuller service including meals.</p>
              </div>
              <div className="bg-luxury-cream/50 p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">Alliance Air</span>
                <p className="text-xs text-luxury-black/60">Direct route from Chennai to Jaffna, in the north.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-luxury-green text-sm">Booking Tips</h3>
                <ul className="text-xs space-y-2 text-luxury-black/70 list-disc pl-5 font-light">
                  <li>Book 35–50 days ahead for the best price/timing combination.</li>
                  <li>Tuesday/Wednesday departures are consistently cheaper.</li>
                  <li>Avoid Dec–Jan and April (Tamil New Year) if flexible on dates.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-luxury-green text-sm">Approximate Fares</h3>
                <p className="text-xs text-luxury-black/70 font-light leading-relaxed">
                  Round-trip economy fares typically fall between <strong>₹9,000 and ₹18,000</strong> per person, and can exceed ₹22,000 at the last minute in peak weeks. These are indicative ranges only — always check live fares before booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISA REQUIREMENTS */}
      <section className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24" id="visa">
        <div className="bg-[#FAF8F5] rounded-[40px] p-8 md:p-12 border border-luxury-gold/15 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-luxury-gold uppercase tracking-[0.25em] text-xs font-mono font-bold">Entry Requirements</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
                Visa Requirements for Indian Travelers
              </h2>
              <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Simple, if you do it properly</p>
            </div>

            <p className="text-sm text-luxury-black/75 font-light leading-relaxed text-center">
              Indian passport holders need an <strong>Electronic Travel Authorization (ETA)</strong>. Apply online, upload a scan of your passport's photo page, and approval typically arrives within a day.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">Passport Validity</span>
                <p className="text-sm font-serif font-bold text-luxury-green">6+ months from travel date</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">Processing Time</span>
                <p className="text-sm font-serif font-bold text-luxury-green">Usually under 24 hours</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">Standard ETA Fee</span>
                <p className="text-sm font-serif font-bold text-luxury-green">~$20 USD (₹1,660)</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-xs uppercase font-mono tracking-wider text-luxury-gold block mb-1">Fee Waiver Seasons</span>
                <p className="text-sm font-serif font-bold text-luxury-green">₹0 during active promotions</p>
              </div>
            </div>

            <p className="text-xs text-luxury-black/50 leading-relaxed text-center pt-2">
              Documents needed: valid passport, a recent photo, return flight details, your first night's hotel address, and a payment method for the fee if applicable. Apply <strong>3–4 days before departure</strong>, and always confirm current rules on the official Sri Lanka ETA portal before applying — fees and policies do change.
            </p>

            <p className="text-center pt-2">
              <Link to="/sri-lanka-visa-for-indians" className="text-luxury-gold hover:underline font-bold text-sm">
                Read the full Sri Lanka Visa Guide for Indians →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* BEST TIME TO VISIT */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Two Monsoons, One Island</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Best Time to Visit Sri Lanka
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Month-by-month, for this specific hill-country + coast route</p>
        </div>

        <div className="overflow-x-auto rounded-[32px] border border-luxury-black/5 shadow-luxury bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-luxury-green text-white text-xs md:text-sm font-serif">
                <th className="p-5 md:p-6 rounded-tl-[32px]">Month</th>
                <th className="p-5 md:p-6">Weather Outlook</th>
                <th className="p-5 md:p-6 rounded-tr-[32px]">Fit for This Route</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm text-luxury-black/70 divide-y divide-luxury-black/[0.04]">
              {[
                { m: "December – January", w: "Dry, sunny coast; cool hill nights", f: "Excellent — peak season" },
                { m: "February – March", w: "Dry, warm, slightly less crowded", f: "Excellent / Very good" },
                { m: "April", w: "Hot, humid; Tamil New Year rush", f: "Good — book early" },
                { m: "May", w: "Southwest monsoon begins", f: "Fair — hills still enjoyable" },
                { m: "June – August", w: "Wetter west/south coast", f: "Fair — showers in Mirissa/Bentota" },
                { m: "September", w: "Transitional, easing rain", f: "Good shoulder-season pick" },
                { m: "October", w: "Inter-monsoon, brief showers", f: "Fair to good" },
                { m: "November", w: "Hills lovely, coast wetter", f: "Fair — good hotel deals" }
              ].map((row) => (
                <tr key={row.m} className="hover:bg-luxury-cream/40 transition-all">
                  <td className="p-5 md:p-6 font-serif font-bold text-luxury-green">{row.m}</td>
                  <td className="p-5 md:p-6">{row.w}</td>
                  <td className="p-5 md:p-6">{row.f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-luxury-black/50 text-center mt-6 font-light max-w-2xl mx-auto">
          Short version: aim for December–March if your dates are flexible. Traveling in June specifically? See{" "}
          <Link to="/where-to-go-in-sri-lanka-in-june" className="text-luxury-gold hover:underline font-bold">where to go in Sri Lanka in June</Link> for which coast to pick.
        </p>
      </section>

      {/* MAIN ITINERARY */}
      <section className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24" id="itinerary">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Your Chennai to Sri Lanka Itinerary</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Main Itinerary, Day by Day
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Engineered to move forward, not zig-zag across the island</p>
        </div>

        {/* Day tab selector */}
        <div className="flex overflow-x-auto gap-1.5 p-1.5 bg-white rounded-2xl border border-luxury-black/5 mb-8 max-w-4xl mx-auto">
          {days.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`flex-grow py-2.5 px-3 rounded-xl text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                activeDay === d.day ? "bg-luxury-gold text-white shadow" : "text-luxury-black/50 hover:text-luxury-black hover:bg-luxury-cream"
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDayPlan.day}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[40px] p-6 sm:p-10 border border-luxury-black/5 shadow-luxury max-w-4xl mx-auto space-y-8"
          >
            <div className="border-b border-luxury-black/10 pb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-luxury-gold font-bold block uppercase">Day {activeDayPlan.day}</span>
                <h3 className="font-serif text-2xl text-luxury-green font-bold mt-1">{activeDayPlan.title}</h3>
              </div>
              <div className="bg-luxury-green text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-center shrink-0">
                {activeDayPlan.driveInfo}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-5">
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-sm text-luxury-green flex items-center gap-1.5">
                    <Sunrise className="w-4 h-4 text-luxury-gold" /> Morning
                  </h4>
                  <p className="text-xs text-luxury-black/75 font-light leading-relaxed">{activeDayPlan.morning}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-sm text-luxury-green flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-luxury-gold" /> Afternoon
                  </h4>
                  <p className="text-xs text-luxury-black/75 font-light leading-relaxed">{activeDayPlan.afternoon}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif font-bold text-sm text-luxury-green flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-luxury-gold" /> Evening
                  </h4>
                  <p className="text-xs text-luxury-black/75 font-light leading-relaxed">{activeDayPlan.evening}</p>
                </div>
              </div>

              <div className="bg-luxury-cream/60 rounded-2xl p-5 border border-luxury-black/5 space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-luxury-black/40 block">Recommended Food</span>
                  <p className="text-luxury-black/80 font-light leading-tight">{activeDayPlan.food}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-luxury-black/40 block">Hotel Area</span>
                  <p className="text-luxury-black/80 font-light leading-tight">{activeDayPlan.hotel}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-luxury-black/40 block">Estimated Daily Budget</span>
                  <p className="text-luxury-gold font-mono font-bold leading-tight">{activeDayPlan.budget}</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/50 flex gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-amber-800 block">Travel Tip</span>
                <p className="text-xs text-luxury-black/80 font-light leading-relaxed">{activeDayPlan.tip}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-xs text-luxury-black/50 text-center mt-8 font-light">
          Prefer a slightly different pace, or want to add Yala or Galle? See our{" "}
          <Link to="/sri-lanka-7-day-itinerary" className="text-luxury-gold hover:underline font-bold">classic Sri Lanka 7 day itinerary</Link> for an alternate southern-loop structure.
        </p>
      </section>

      {/* TOTAL TRIP BUDGET */}
      <section className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24" id="trip-budget">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Real Numbers, Three Styles</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Total Trip Budget: 7 Days from Chennai
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Per person, double occupancy, including return Chennai–Colombo flights</p>
        </div>

        <div className="overflow-x-auto rounded-[32px] border border-luxury-black/5 shadow-luxury bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-luxury-green text-white text-xs md:text-sm font-serif">
                <th className="p-5 md:p-6 rounded-tl-[32px]">Category</th>
                <th className="p-5 md:p-6">🎒 Budget</th>
                <th className="p-5 md:p-6">🌴 Mid-Range</th>
                <th className="p-5 md:p-6 rounded-tr-[32px]">👑 Luxury</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm text-luxury-black/70 divide-y divide-luxury-black/[0.04]">
              {[
                { c: "Return Flights (Chennai–Colombo)", b: "₹9,000 – ₹12,000", m: "₹10,000 – ₹15,000", l: "₹15,000 – ₹22,000" },
                { c: "Visa (ETA)", b: "₹0 – ₹1,660", m: "₹0 – ₹1,660", l: "₹0 – ₹1,660" },
                { c: "Accommodation (6 nights)", b: "₹9,000 – ₹15,000", m: "₹30,000 – ₹48,000", l: "₹75,000 – ₹1,50,000+" },
                { c: "Food (6 days)", b: "₹4,500 – ₹6,000", m: "₹9,000 – ₹14,000", l: "₹18,000 – ₹28,000" },
                { c: "Local Transport", b: "₹3,500 (train/bus)", m: "₹18,000 – ₹24,000 (driver)", l: "₹35,000+ (premium SUV)" },
                { c: "Activities & Entry Tickets", b: "₹4,000 – ₹5,500", m: "₹8,000 – ₹12,000", l: "₹18,000 – ₹25,000" },
                { c: "SIM Card & Incidentals", b: "₹1,500", m: "₹2,000", l: "₹3,000+" }
              ].map((row) => (
                <tr key={row.c} className="hover:bg-luxury-cream/40 transition-all">
                  <td className="p-5 md:p-6 font-serif font-bold text-luxury-green">{row.c}</td>
                  <td className="p-5 md:p-6">{row.b}</td>
                  <td className="p-5 md:p-6">{row.m}</td>
                  <td className="p-5 md:p-6">{row.l}</td>
                </tr>
              ))}
              <tr className="hover:bg-luxury-cream/40 transition-all">
                <td className="p-5 md:p-6 font-serif font-bold text-luxury-gold bg-luxury-gold/5">Estimated Total (Per Person)</td>
                <td className="p-5 md:p-6 font-bold bg-luxury-gold/5">₹31,500 – ₹44,660</td>
                <td className="p-5 md:p-6 font-bold bg-luxury-gold/5 text-luxury-green">₹77,000 – ₹1,16,660</td>
                <td className="p-5 md:p-6 font-bold bg-luxury-gold/5 text-luxury-gold">₹1,64,000 – ₹2,64,660+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-luxury-black/45 text-center mt-6 font-light max-w-3xl mx-auto">
          In LKR, on-ground daily spending (excluding flights) works out to roughly LKR 8,000–12,000/day (budget), LKR 20,000–30,000/day (mid-range), and LKR 50,000+/day (luxury). Exchange rates fluctuate — treat these as planning anchors, not fixed figures. Solo budget travelers can go cheaper on public transport; families should add roughly 60–70% per extra adult.
        </p>
      </section>

      {/* HOTEL RECOMMENDATIONS */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Location Over Star Rating</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Hotel Recommendations by Budget
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-luxury-black/5 space-y-3 hover:border-luxury-gold/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
              <Backpack className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-luxury-green font-bold">Budget</h3>
            <p className="font-mono text-sm text-luxury-gold font-bold">₹1,500 – ₹2,800/night</p>
            <p className="text-xs text-luxury-black/60 leading-relaxed font-light">
              Guesthouses and family-run homestays are the backbone here — clean rooms, home-cooked breakfast, hosts who double as guides. Sigiriya's outskirts, Ella's hillside cluster, and Mirissa's back streets offer the best value.
            </p>
          </div>
          <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-luxury-gold/30 space-y-3 hover:border-luxury-gold transition-all">
            <div className="w-12 h-12 rounded-xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-luxury-green font-bold">Mid-Range</h3>
            <p className="font-mono text-sm text-luxury-gold font-bold">₹5,000 – ₹9,000/night</p>
            <p className="text-xs text-luxury-black/60 leading-relaxed font-light">
              The sweet spot for most Chennai travelers — boutique hotels and small resorts with pools, at a fraction of similar quality in Goa or the Maldives. Strong picks in Sigiriya, Habarana, Kandy, Nuwara Eliya, Bentota and Mirissa.
            </p>
          </div>
          <div className="bg-luxury-green text-white p-8 rounded-3xl border border-luxury-gold/30 space-y-3 hover:border-luxury-gold transition-all">
            <div className="w-12 h-12 rounded-xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-white font-bold">Luxury</h3>
            <p className="font-mono text-sm text-luxury-gold font-bold">₹15,000 – ₹40,000+/night</p>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Private-pool villas, colonial tea-estate bungalows, and beachfront resorts with full spa programs. Nuwara Eliya's planter bungalows and the clifftop resorts around Mirissa and Bentota shine brightest.
            </p>
          </div>
        </div>
      </section>

      {/* FOOD GUIDE */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-luxury-black/5 shadow-luxury">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-luxury-gold uppercase tracking-[0.25em] text-xs font-mono font-bold">What to Eat</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">Food Guide</h2>
              <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Familiar by day one, exciting by day three</p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3 text-xs text-luxury-black/75 font-light pt-2">
              <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /><span><strong>Rice and curry</strong> — the everyday meal, close to a Tamil meals plate.</span></li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /><span><strong>Kottu roti</strong> — chopped flatbread stir-fried with vegetables, egg, or meat.</span></li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /><span><strong>Hoppers (appa)</strong> — bowl-shaped rice-flour pancakes, often with egg.</span></li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /><span><strong>Lamprais</strong> — rice and curries baked in a banana leaf.</span></li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /><span><strong>Fresh seafood</strong> — grilled fish, prawns, crab curry on the coast.</span></li>
              <li className="flex gap-2"><Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /><span><strong>Ceylon tea</strong> — best enjoyed fresh in Nuwara Eliya, where it's grown.</span></li>
            </ul>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="bg-luxury-cream/50 p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-luxury-gold block mb-1">Approximate Meal Costs</span>
                <p className="text-luxury-black/70 font-light">Local rice-and-curry ₹150–300 · Cafe meal ₹500–900 · Seafood dinner ₹1,200–2,500 · Fine dining ₹3,000–5,000+</p>
              </div>
              <div className="bg-luxury-cream/50 p-5 rounded-2xl border border-luxury-black/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-luxury-gold block mb-1">Vegetarian Travelers</span>
                <p className="text-luxury-black/70 font-light">Dhal curry, jackfruit curry (polos), and pumpkin curry are standard menu items, not an afterthought — genuinely easy here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPORTATION GUIDE */}
      <section className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24" id="transport">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Getting Around</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Transportation Guide
          </h2>
          <p className="text-xs text-luxury-black/50 uppercase tracking-widest">Five real options — not all equally good for this route</p>
        </div>

        <div className="overflow-x-auto rounded-[32px] border border-luxury-black/5 shadow-luxury bg-white mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-luxury-green text-white text-xs md:text-sm font-serif">
                <th className="p-5 md:p-6 rounded-tl-[32px]">Option</th>
                <th className="p-5 md:p-6">Best For</th>
                <th className="p-5 md:p-6">Comfort</th>
                <th className="p-5 md:p-6 rounded-tr-[32px]">Cost</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-sm text-luxury-black/70 divide-y divide-luxury-black/[0.04]">
              {[
                { o: "Private Driver / Car", b: "This exact itinerary", c: "High", p: "₹4,500–6,500/day" },
                { o: "Train", b: "The Kandy–Ella hill leg", c: "Medium-High (scenic)", p: "Very low" },
                { o: "Taxi (PickMe/Uber)", b: "Short city hops", c: "Medium", p: "Low, metered" },
                { o: "Bus", b: "Budget travelers", c: "Low", p: "Very low" },
                { o: "Self-Drive", b: "Not recommended for first-timers", c: "—", p: "—" }
              ].map((row) => (
                <tr key={row.o} className="hover:bg-luxury-cream/40 transition-all">
                  <td className="p-5 md:p-6 font-serif font-bold text-luxury-green">{row.o}</td>
                  <td className="p-5 md:p-6">{row.b}</td>
                  <td className="p-5 md:p-6">{row.c}</td>
                  <td className="p-5 md:p-6">{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-luxury-black/60 font-light max-w-3xl mx-auto text-center leading-relaxed">
          <strong className="text-luxury-green">Bottom line for Chennai travelers:</strong> book a private driver for the full loop — this route covers five distinct regions in six travel days, several with winding mountain roads. Build in the <Train className="w-3.5 h-3.5 inline -mt-0.5" /> Nuwara Eliya-to-Ella train specifically (Day 5); your driver can meet you at the other end with your luggage.
        </p>
      </section>

      {/* PACKING CHECKLIST */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-[#FAF8F5] rounded-[40px] p-8 md:p-12 border border-luxury-gold/15 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-luxury-gold uppercase tracking-[0.25em] text-xs font-mono font-bold">Before You Fly</span>
              <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">Packing Checklist</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-luxury-black/75 font-light pt-2">
              {[
                "Passport (6+ months validity) and printed ETA approval",
                "Lightweight, breathable clothing for the coast and cities",
                "One warm layer for Nuwara Eliya's cold evenings",
                "Comfortable walking shoes (Sigiriya climb, Ella hikes)",
                "Slip-on footwear (temples require removing shoes often)",
                "Modest clothing covering shoulders and knees for temples",
                "Swimwear and a quick-dry towel",
                "Reusable water bottle",
                "Sunscreen, sunglasses, and a hat",
                "Basic first-aid kit and personal medication",
                "Power adapter (Type G and Type D sockets)",
                "Cash in small denominations for tuk-tuks and tips"
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SAFETY TIPS */}
      <section className="max-w-7xl mx-auto px-6 mb-20 scroll-mt-24" id="safety">
        <div className="text-center mb-12 space-y-2">
          <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Travel Smart</span>
          <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight font-bold">
            Safety Tips for Sri Lanka Travel
          </h2>
        </div>

        <div className="overflow-x-auto rounded-[32px] border border-luxury-black/5 shadow-luxury bg-white">
          <table className="w-full text-left border-collapse">
            <tbody className="text-xs md:text-sm text-luxury-black/70 divide-y divide-luxury-black/[0.04]">
              {[
                { icon: <Wallet className="w-4 h-4" />, t: "Money", d: "Carry a mix of cash and cards. ATMs are widely available in cities, scarcer in rural stretches. Notify your bank of travel dates to avoid card blocks." },
                { icon: <Smartphone className="w-4 h-4" />, t: "SIM / eSIM", d: "A tourist SIM (Dialog or Mobitel) from the airport with 20–50GB costs roughly ₹700–900 for the trip. eSIMs can be activated before you land." },
                { icon: <ShieldCheck className="w-4 h-4" />, t: "Payments", d: "Cards work at hotels, resorts, and city restaurants. Small cafes, tuk-tuks, and rural vendors are cash-only — carry LKR in small notes." },
                { icon: <Sun className="w-4 h-4" />, t: "Weather", d: "Check the forecast per leg a few days out — the dual-monsoon system means hills and coast can differ sharply on the same day." },
                { icon: <AlertTriangle className="w-4 h-4" />, t: "Scams to Avoid", d: "Commission-driven “government” gem shops, unofficial ticket sellers, and unmetered tuk-tuk quotes. Stick to official counters and metered/app-based transport." },
                { icon: <Shield className="w-4 h-4" />, t: "Emergency Numbers", d: "119 for police, 1990 for ambulance in many areas. Your hotel and driver's numbers are usually faster first points of contact." }
              ].map((row) => (
                <tr key={row.t} className="hover:bg-luxury-cream/40 transition-all">
                  <td className="p-5 md:p-6 font-serif font-bold text-luxury-green w-[180px]">
                    <span className="flex items-center gap-2"><span className="text-luxury-gold">{row.icon}</span>{row.t}</span>
                  </td>
                  <td className="p-5 md:p-6 font-light">{row.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ (shared accordion component) */}
      <FaqAccordion
        items={faqs}
        title="Frequently Asked Questions"
        subtitle="Straight answers for Chennai travelers planning their first Sri Lanka trip."
        theme="cream"
      />

      {/* FINAL VERDICT + CTA */}
      <section className="bg-luxury-green text-white py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Final Verdict</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              The Best Sri Lanka Tour From Chennai <br className="hidden md:block" /> for First-Timers
            </h2>
            <p className="text-white/70 font-sans font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Genuinely close, refreshingly affordable, and effortlessly comfortable thanks to the food and cultural familiarity — while still delivering ancient fortresses, misty tea mountains, a world-famous train ride, and a beach finish in one week that doesn't demand extended leave. This loop moves in one direction, minimizes backtracking, and matches what a realistic week of energy and driving time can cover.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <button
              onClick={() => handleWhatsAppRedirect("final_cta")}
              className="w-full px-8 py-4 bg-luxury-gold text-luxury-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-luxury-green transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
            >
              Contact Us for a Custom Plan <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/sri-lanka-trip-planner"
              className="w-full px-8 py-4 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-luxury-green transition-all flex items-center justify-center gap-3"
            >
              Use the Trip Planner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-white/60">
            <Link to="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" className="hover:text-luxury-gold transition-colors flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" /> Sri Lanka Trip Cost From Chennai
            </Link>
            <Link to="/sri-lanka-7-day-itinerary" className="hover:text-luxury-gold transition-colors flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Classic Sri Lanka 7 Day Itinerary
            </Link>
            <Link to="/where-to-go-in-sri-lanka-in-june" className="hover:text-luxury-gold transition-colors flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Where to Go in June
            </Link>
          </div>

          <p className="text-[11px] text-white/40 italic max-w-2xl mx-auto pt-2">
            Flight prices, hotel rates, and visa rules mentioned in this guide are estimates based on typical patterns and can change. Please verify current details directly with airlines, hotels, and the official Sri Lanka ETA portal before booking.
          </p>
        </div>
      </section>
    </div>
  );
}
