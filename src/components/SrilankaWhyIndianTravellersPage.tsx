import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Landmark,
  Waves,
  Mountain,
  PawPrint,
  Flower2,
  Utensils,
  Layers,
  Users,
  Heart,
  Gem,
  Compass,
  Trees,
  MapPin,
  Check,
  MessageCircle,
  Briefcase
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

const HERO_IMAGE = "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1600&h=900";
const CULTURE_IMAGE = "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=1200&h=800";
const BEACH_IMAGE = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200&h=800";
const HILLS_IMAGE = "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1200&h=800";
const WILDLIFE_IMAGE = "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1200&h=800";
const FOOD_IMAGE = "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1200&h=800";

const WHATSAPP_BASE = "https://wa.me/94722968210";

const travelStyleOptions = [
  "Family",
  "Honeymoon",
  "Adventure",
  "Culture",
  "Wildlife",
  "Wellness",
  "Beach"
];

const travelStyleCards = [
  {
    id: "families",
    icon: <Users className="w-5 h-5" />,
    title: "Families",
    mix: "Culture + Wildlife + Beaches",
    desc: "Ancient sites that hold a child's attention, an open-jeep safari that feels like an adventure, and a calm beach stretch to unwind for a couple of days.",
    link: "/sri-lanka-family-itinerary",
    linkLabel: "See the family itinerary"
  },
  {
    id: "honeymooners",
    icon: <Heart className="w-5 h-5" />,
    title: "Honeymooners",
    mix: "Hill Country + Scenic Train + Beach",
    desc: "Misty tea estates, a slow train ride through the hills, and a quiet stretch of coastline to close out the trip.",
    link: "/sri-lanka-itinerary-august-couples",
    linkLabel: "See the couples' route"
  },
  {
    id: "friends",
    icon: <Gem className="w-5 h-5" />,
    title: "Friends & Groups",
    mix: "Adventure + Beaches + Entertainment",
    desc: "Hikes, surf towns, beachside cafés and a livelier evening scene — built for a group that wants more than one type of day.",
    link: "/sri-lanka-trip-planner",
    linkLabel: "Build a group itinerary"
  },
  {
    id: "wildlife-lovers",
    icon: <PawPrint className="w-5 h-5" />,
    title: "Wildlife Lovers",
    mix: "National Parks + Birdlife + Nature Stays",
    desc: "A trip that can be built around one or two national parks without giving up the beach or hill country entirely.",
    link: "/things-to-do-in-sri-lanka",
    linkLabel: "Explore wildlife experiences"
  },
  {
    id: "wellness",
    icon: <Flower2 className="w-5 h-5" />,
    title: "Wellness Travellers",
    mix: "Ayurveda + Nature + Slow Travel",
    desc: "Fewer stops, longer pauses — an itinerary that leaves room for treatments, yoga and doing very little in between.",
    link: "/sri-lanka-trip-planner",
    linkLabel: "Plan a slower route"
  },
  {
    id: "culture-seekers",
    icon: <Landmark className="w-5 h-5" />,
    title: "Culture & Heritage Seekers",
    mix: "UNESCO Sites + Temples + Ramayana Trail",
    desc: "A route built around the ancient cities, sacred sites, and places traditionally associated with the Ramayana.",
    link: "/best-things-to-do-sri-lanka-first-time-visitors",
    linkLabel: "See heritage highlights"
  }
];

const agencyPackages = [
  { persona: "Family", mix: "Culture + Wildlife + Beaches", note: "Anchors the trip around one safari and one beach stay, with an ancient site en route." },
  { persona: "Honeymoon", mix: "Hill Country + Scenic Train + Luxury Stay + Beach", note: "Leads with the train journey and a tea-country stay, then closes on the coast." },
  { persona: "Friends", mix: "Adventure + Beaches + Entertainment", note: "Built around surf towns, hikes and a livelier evening circuit rather than heritage sites." },
  { persona: "Wellness", mix: "Ayurveda + Nature + Yoga + Relaxation", note: "Fewer locations, longer stays, and an itinerary that isn't measured in sightseeing stops." }
];

const faqList = [
  {
    q: "Why do so many Indian travellers choose Sri Lanka for a holiday?",
    a: "It combines a short international trip with a wide range of experiences — beaches, hill country, wildlife, ancient heritage and wellness — inside one relatively compact island. Cultural familiarity and long-standing historical and religious connections also make the island feel less unfamiliar than many other international destinations."
  },
  {
    q: "How many days do you need to cover beaches, hill country and wildlife in Sri Lanka?",
    a: "This depends entirely on your pace and which regions you want to combine. Many Indian travellers build their first Sri Lanka trip around a 7 to 10 day route, which is generally enough to move between the cultural triangle, the hill country and the south coast without feeling rushed. Our 7-day itinerary and 10-day itinerary guides break this down in more detail."
  },
  {
    q: "Is Sri Lanka a good honeymoon destination for Indian couples?",
    a: "Yes — the combination of tea-country stays, the scenic hill country train, and quieter beach stretches makes it easy to build a honeymoon itinerary that mixes romance, scenery and relaxation without long travel days in between."
  },
  {
    q: "What are the Ramayana-linked places in Sri Lanka?",
    a: "Sri Lanka is home to a number of sites traditionally associated with the Ramayana, often referred to together as the Ramayana Trail — including locations linked to Sita in the hill country around Nuwara Eliya, and several temples and landmarks across the island. These associations are part of local tradition and pilgrimage circuits rather than formally documented historical fact, and we'd encourage travellers to treat them with that context in mind."
  },
  {
    q: "Can you really see wildlife and beaches on the same Sri Lanka trip?",
    a: "Yes, and this is one of the island's biggest advantages. Several national parks sit close enough to the south coast that a safari and a beach stay can both fit into the same loop without a long detour. Sightings during a safari are never guaranteed, but the parks are known for healthy leopard, elephant and bird populations."
  },
  {
    q: "Is Sri Lanka suitable for a family holiday from India?",
    a: "Yes. Families often build a route that balances an ancient site or two, a wildlife safari, and a few unhurried days at the beach, so that the trip doesn't feel like non-stop sightseeing for children or grandparents. See our dedicated family itinerary for a sample route."
  },
  {
    q: "What is Ayurveda, and do most Sri Lanka itineraries include it?",
    a: "Ayurveda is a traditional wellness system practised in Sri Lanka, offered at dedicated retreats and as spa treatments within many hotels. It isn't part of every itinerary by default, but travellers who want to slow down can build in a wellness stay or a single Ayurvedic treatment day alongside the rest of their trip. We don't make medical claims about these treatments — they're best treated as relaxation and tradition, not medical care."
  },
  {
    q: "How is Sri Lanka different from planning a longer multi-region trip elsewhere?",
    a: "The main difference is geography. Because the island is relatively compact, an itinerary can move between very different landscapes — coast, hills, ancient cities, national parks — without the long transfer days that a similar range of experiences might need in a larger country. It's this experience density, more than any single attraction, that shapes most itineraries here."
  }
];

function WhatsAppLink(text: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export default function SrilankaWhyIndianTravellersPage() {
  usePageMetadata({
    title: "Why Sri Lanka Wins the Hearts of Indian Travellers (2026)",
    description: "Sri Lanka packs beaches, hill country, wildlife safaris, ancient heritage and Ayurveda into one compact trip. See why Indian travellers keep returning.",
    canonicalUrl: "https://plan-srilanka.com/blog/why-sri-lanka-is-popular-with-indian-travellers",
    ogUrl: "https://plan-srilanka.com/blog/why-sri-lanka-is-popular-with-indian-travellers",
    ogImage: HERO_IMAGE
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `why_indian_travellers_faq_${index}`);
  };

  const handlePlannerClick = (label: string) => {
    trackEvent("planner_cta_click", "conversion", label);
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
    trackEvent("travel_style_poll_select", "engagement", style);
  };

  const handleStyleWhatsApp = () => {
    if (!selectedStyle) return;
    trackEvent("whatsapp_click", "conversion", `travel_style_poll_${selectedStyle}`);
    window.open(
      WhatsAppLink(`Hi Plan Sri Lanka! I'm most interested in a ${selectedStyle}-focused Sri Lanka trip. Could you help me plan one?`),
      "_blank"
    );
  };

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-luxury-black font-sans selection:bg-luxury-gold selection:text-white pb-20 pt-24 md:pt-32">
      {/* JSON-LD Schemas */}
      <>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Why Sri Lanka Continues to Win the Hearts of Indian Travellers",
            "description": "Sri Lanka packs beaches, hill country, wildlife safaris, ancient heritage and Ayurveda into one compact trip. See why Indian travellers keep returning.",
            "image": [HERO_IMAGE],
            "datePublished": "2026-08-10T09:00:00+05:30",
            "dateModified": "2026-08-10T09:00:00+05:30",
            "author": {
              "@type": "Person",
              "name": "Adithya Oshada",
              "jobTitle": "Lead Ceylon Travel Stylist"
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
              "@id": "https://plan-srilanka.com/blog/why-sri-lanka-is-popular-with-indian-travellers"
            },
            "keywords": "Sri Lanka for Indian travellers, Sri Lanka trip for Indians, Sri Lanka holiday for Indian travellers, Sri Lanka itinerary for Indians, Sri Lanka honeymoon, Sri Lanka family holiday, Sri Lanka Ramayana tour, Sri Lanka beaches, Sri Lanka hill country, Sri Lanka wildlife safari, Sri Lanka Ayurveda, Sri Lanka travel"
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com" },
              { "@type": "ListItem", "position": 2, "name": "Travel Guides", "item": "https://plan-srilanka.com/blog" },
              { "@type": "ListItem", "position": 3, "name": "Why Sri Lanka Wins Indian Travellers' Hearts", "item": "https://plan-srilanka.com/blog/why-sri-lanka-is-popular-with-indian-travellers" }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
          })}
        </script>
      </>

      {/* Hero */}
      <div className="bg-luxury-green relative overflow-hidden py-16 md:py-24 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.22] opacity-80"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green/95" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-[11px] font-mono uppercase tracking-widest text-luxury-cream/60 flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-luxury-gold transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-luxury-gold">Why Indian Travellers Choose Sri Lanka</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            Sri Lanka for Indian Travellers
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#fcfbf7] font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            Why Sri Lanka Continues to Win <br className="hidden sm:block" /> the Hearts of Indian Travellers
          </h1>

          <p className="mt-6 text-base sm:text-lg text-luxury-cream/80 max-w-3xl mx-auto font-light leading-relaxed">
            One island, several completely different holidays. Here's why so many Indian travellers keep coming back to Sri Lanka — and how to think about your own trip.
          </p>

          <div className="mt-10">
            <Link
              to="/sri-lanka-trip-planner"
              onClick={() => handlePlannerClick("hero_why_indian_travellers_cta")}
              className="px-8 py-4 bg-luxury-gold hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2 group"
            >
              Build Your Sri Lanka Itinerary <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">

        {/* Intro */}
        <section className="mb-12">
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            For a growing number of Indian travellers, Sri Lanka has become the default answer to "where should we go this year?" Part of it is practical — it's a short international getaway that doesn't eat up an entire annual leave balance. Part of it is cultural familiarity — the food, the temples, the warmth of the welcome, and centuries of shared history make the island feel closer than the flight time suggests.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            But the bigger reason is variety. In the space of one trip, you can move from a golden beach to misty tea hills, from an ancient rock fortress to a national park safari, without the itinerary feeling stretched. Few destinations let you combine this many completely different landscapes and experiences into a single, manageable journey — and that's really what this article is about.
          </p>
        </section>

        {/* Summary Box */}
        <section id="summary-box" className="bg-white border-2 border-luxury-gold/30 rounded-3xl p-6 sm:p-8 shadow-md mb-14 scroll-mt-24">
          <div className="bg-[#fdfaf2] -m-6 sm:-m-8 p-5 sm:p-6 rounded-t-[22px] border-b border-luxury-gold/20 flex items-center gap-3">
            <span className="px-2.5 py-1 bg-luxury-gold text-white text-[10px] font-mono tracking-wider uppercase font-bold rounded-md">Quick Summary</span>
            <h2 className="text-sm font-bold font-mono text-luxury-green uppercase">Why Indian Travellers Choose Sri Lanka</h2>
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "A short international trip that doesn't require a long stretch of leave",
              "Cultural and historical familiarity, including sites linked to the Ramayana",
              "Beaches, hill country, wildlife and heritage inside one compact island",
              "Short travel times between very different types of landscapes",
              "A well-established, mostly English-speaking tourism infrastructure",
              "Ayurveda and wellness stays for travellers who want to slow down",
              "Itineraries that flex easily for families, couples, groups or solo trips"
            ].map((reason, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-luxury-black/80 font-light">
                <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                {reason}
              </li>
            ))}
          </ul>
        </section>

        {/* Quick Nav */}
        <section className="mb-14">
          <div className="bg-luxury-green/5 border border-luxury-green/10 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-luxury-green/60 uppercase tracking-widest font-bold block mb-3">On This Page</span>
            <div className="flex flex-wrap gap-2.5 text-xs">
              <a href="#culture-ramayana" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Culture &amp; Ramayana</a>
              <a href="#beaches" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Beaches</a>
              <a href="#hill-country" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Hill Country</a>
              <a href="#wildlife" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Wildlife</a>
              <a href="#ancient-cities" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Ancient Cities</a>
              <a href="#wellness" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Wellness</a>
              <a href="#evenings" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Evenings &amp; Food</a>
              <a href="#experience-density" className="px-3.5 py-1.5 bg-luxury-green text-white rounded-lg font-medium">The Big Advantage</a>
              <a href="#travel-styles" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">Travel Styles</a>
              <a href="#for-agencies" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">For Travel Agencies</a>
              <a href="#faq-section" className="px-3.5 py-1.5 bg-white border border-luxury-green/5 rounded-lg text-luxury-green hover:bg-luxury-gold hover:text-white transition-all font-medium">FAQ</a>
            </div>
          </div>
        </section>

        {/* Section 1: Culture, History & Ramayana */}
        <section id="culture-ramayana" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#d4af37]" />
            Culture, History &amp; Ramayana Connections
          </h2>
          <div className="rounded-2xl overflow-hidden mb-6 h-56 sm:h-72 bg-neutral-100">
            <img
              src={CULTURE_IMAGE}
              alt="Ancient temple architecture in Sri Lanka's cultural triangle"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            India and Sri Lanka share a long history of trade, migration, and religious exchange, and that history is still visible across the island today. Buddhism arrived in Sri Lanka from India over two thousand years ago and remains central to the island's culture, expressed through the great stupas of the ancient cities, the Temple of the Sacred Tooth Relic in Kandy, and the daily rhythm of temple life in almost every town.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Sri Lanka is also home to a number of sites <strong>traditionally associated with the Ramayana</strong>, sometimes grouped together as the "Ramayana Trail" — including locations in the hill country around Nuwara Eliya linked to Sita, and various temples and landmarks elsewhere on the island. These associations are rooted in local tradition and pilgrimage practice, and are best approached with that context rather than as settled historical fact.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light">
            For Indian travellers, this layer of shared history changes how the trip feels. Temples aren't just sightseeing stops — many carry a sense of recognition that's hard to find in an unfamiliar destination.
          </p>
        </section>

        {/* Section 2: Beaches */}
        <section id="beaches" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Waves className="w-6 h-6 text-[#d4af37]" />
            Beautiful Beaches Just a Few Hours Away
          </h2>
          <div className="rounded-2xl overflow-hidden mb-6 h-56 sm:h-72 bg-neutral-100">
            <img
              src={BEACH_IMAGE}
              alt="A quiet Sri Lankan beach along the southern coastline"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Sri Lanka's southern and eastern coastlines cover everything from lively surf towns to quiet, near-empty stretches of sand — often just a short drive apart. That range makes it easy to match the beach to the trip: a lively strip for friends who want cafés and evening energy, or a calmer bay for a couple who mostly want to switch off.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            For honeymooners, a beach stay is usually the final chapter of the trip rather than the whole thing — a way to unwind after the hill country and the safari. For families, the coast tends to work best as a slower, low-effort couple of days after busier sightseeing, rather than the base for the entire holiday.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light">
            Because the coast can be combined so easily with heritage sites and hill country further inland, beach time in Sri Lanka rarely feels like a separate trip of its own — it's simply one part of a larger loop. See our <Link to="/sri-lanka-itinerary-august-couples" className="text-luxury-green font-semibold underline decoration-luxury-gold/50 hover:text-luxury-gold">honeymoon and couples' itinerary</Link> for one way this is commonly built.
          </p>
        </section>

        {/* Section 3: Hill Country */}
        <section id="hill-country" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Mountain className="w-6 h-6 text-[#d4af37]" />
            Escape to the Cool Hill Country
          </h2>
          <div className="rounded-2xl overflow-hidden mb-6 h-56 sm:h-72 bg-neutral-100">
            <img
              src={HILLS_IMAGE}
              alt="Tea plantations and misty hills in Sri Lanka's central highlands"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            After the heat of the coast, the central highlands feel like a different country. Kandy sits at the gateway to the hills, with its sacred lake and temple; Nuwara Eliya is cooler still, with colonial-era bungalows and rolling tea estates; and Ella has become a magnet for travellers who want hiking trails, viewpoints and a slower pace.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            The hill country is also where Sri Lanka's tea industry is most visible — plantation walks, factory visits, and tastings are easy to build into a day here. And for many travellers, the train journey through this region (particularly the stretch between Kandy and Ella) is the single most memorable part of the whole trip.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light">
            Explore how to plan this leg in our <Link to="/how-to-plan-a-train-trip-in-sri-lanka" className="text-luxury-green font-semibold underline decoration-luxury-gold/50 hover:text-luxury-gold">train trip guide</Link> or use the <Link to="/sri-lanka-train-trip-planner" className="text-luxury-green font-semibold underline decoration-luxury-gold/50 hover:text-luxury-gold">interactive train route planner</Link>.
          </p>
        </section>

        {/* Section 4: Wildlife */}
        <section id="wildlife" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <PawPrint className="w-6 h-6 text-[#d4af37]" />
            Wildlife Adventures in the Wild
          </h2>
          <div className="rounded-2xl overflow-hidden mb-6 h-56 sm:h-72 bg-neutral-100">
            <img
              src={WILDLIFE_IMAGE}
              alt="An open-jeep safari inside a Sri Lankan national park"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Sri Lanka's national parks punch well above their size. Yala is known for one of the world's highest leopard densities in a protected area, Udawalawe for its resident elephant herds, and Kumana and Bundala for the birdlife that draws in dedicated bird-watchers. A safari here means open-jeep drives through dry-zone scrub and wetlands, tracking whatever the park's rangers are seeing that day.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            As with any wildlife safari anywhere in the world, sightings are never guaranteed — the parks are managed for conservation first, not for photo opportunities, and every visit is different. What is consistent is the variety a safari adds to a trip: it's a completely different rhythm from a heritage site or a beach day, and it's usually the part travellers talk about most once they're home.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light">
            Because several parks sit close to the south coast, a safari morning and a beach afternoon can often happen on the same loop — one more example of how compactly Sri Lanka's experiences sit next to each other.
          </p>
        </section>

        {/* Section 5: Ancient Cities & UNESCO */}
        <section id="ancient-cities" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#d4af37]" />
            Ancient Cities, Temples &amp; UNESCO Heritage
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Sri Lanka's Cultural Triangle holds several UNESCO World Heritage Sites within a fairly small radius. Sigiriya — the rock fortress with its frescoes and water gardens — is the most photographed of them, but Anuradhapura and Polonnaruwa, the island's two ancient capitals, hold centuries of stupas, monasteries and royal architecture that reward slower exploration.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Kandy, the last royal capital before colonial rule, bridges this ancient history with the hill country beyond it, and Galle's fortified old town — a separate UNESCO site on the south coast — adds a completely different, colonial-era layer to the story.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light">
            Taken together, these sites give Sri Lanka a depth of history that surprises a lot of first-time visitors, who often arrive expecting mainly beaches and leave equally impressed by the ruins.
          </p>
        </section>

        {/* Section 6: Wellness & Ayurveda */}
        <section id="wellness" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Flower2 className="w-6 h-6 text-[#d4af37]" />
            Wellness, Ayurveda &amp; Time to Slow Down
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Not every Sri Lanka trip needs to be a checklist of sights. Ayurveda is a traditional wellness system with deep roots on the island, and it's offered both as a full retreat experience and as standalone spa treatments within many hotels — usually as a way to unwind rather than as medical treatment.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Wellness-focused travellers tend to build very different itineraries from the rest of this list: fewer stops, longer stays in one place, and time set aside for yoga, treatments, or simply sitting somewhere quiet. The island's nature — jungle, hill country, and calm coastal stretches — makes this kind of slow travel easy to build around.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light">
            We don't make medical claims about Ayurveda or any wellness treatment — think of it as a relaxing, traditional practice worth experiencing on its own terms.
          </p>
        </section>

        {/* Section 7: Evenings & Entertainment */}
        <section id="evenings" className="scroll-mt-24 py-8 border-b border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-6 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#d4af37]" />
            Evenings, Entertainment &amp; Local Experiences
          </h2>
          <div className="rounded-2xl overflow-hidden mb-6 h-56 sm:h-72 bg-neutral-100">
            <img
              src={FOOD_IMAGE}
              alt="Sri Lankan food and evening dining by the coast"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={800}
            />
          </div>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Days in Sri Lanka are easy to plan around; evenings are where the island shows a different side. Beachside dining, seafood shacks, and small cafés along the south coast draw a mixed, easygoing crowd, while towns like Ella and Galle have their own scene of live music, boutique bars and quieter conversation spots.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-5">
            Local food itself deserves its own mention — rice and curry, hoppers, and fresh seafood along the coast are as much a part of the trip as any landmark, and trying them in a beach café or a family-run spot is often more memorable than a formal restaurant meal.
          </p>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light">
            For younger travellers and groups, the south coast towns generally offer the liveliest evenings; for couples and families, a quieter dinner setting is just as easy to find a short walk away.
          </p>
        </section>

        {/* Section 8: Experience Density */}
        <section id="experience-density" className="scroll-mt-24 py-10 mb-12 bg-luxury-green rounded-[32px] px-6 sm:px-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-luxury-gold/10 rounded-full blur-3xl" />
          <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.25em] font-bold block mb-3">The Key Idea</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-luxury-cream mb-6 flex items-center gap-2">
            <Layers className="w-7 h-7 text-[#d4af37]" />
            The Biggest Advantage: So Much in One Journey
          </h2>
          <p className="text-luxury-cream/85 leading-relaxed text-sm sm:text-base font-light mb-6">
            If there's one idea that explains Sri Lanka's pull for Indian travellers, it's <strong className="text-white">experience density</strong> — how much genuinely different terrain and culture sits within a small, well-connected island. A single loop can move between an ancient cultural site, cool hill country and tea plantations, a wildlife safari, a tropical beach, and a local food-and-entertainment evening, often without doubling back or losing a full day to transit.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 mb-6">
            <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest font-bold block mb-4">Example Loop</span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
              {["Ancient Cultural Site", "Hill Country", "Tea Plantations", "Wildlife Safari", "Tropical Beach", "Local Food & Entertainment"].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span className="px-3 py-2 rounded-xl bg-luxury-gold/15 border border-luxury-gold/30 text-luxury-cream font-medium whitespace-nowrap">
                    {step}
                  </span>
                  {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-luxury-gold shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className="text-luxury-cream/85 leading-relaxed text-sm sm:text-base font-light">
            This matters because it changes what a "well-planned trip" looks like. In destinations where beaches, mountains, wildlife and heritage sit far apart, travellers often have to choose one type of experience or spend a disproportionate share of the trip in transit to get more than one. Sri Lanka's compact geography means the itinerary can be built around variety itself, rather than around a single theme — which is exactly why it suits such a wide range of travellers.
          </p>
        </section>

        {/* Travel Styles */}
        <section id="travel-styles" className="scroll-mt-24 py-8 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-3 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#d4af37]" />
            Build Your Sri Lanka Trip Around Your Travel Style
          </h2>
          <p className="text-luxury-black/70 leading-relaxed text-sm sm:text-base font-light mb-8">
            Because Sri Lanka offers so many types of experiences, the same island can produce very different itineraries depending on who's travelling.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {travelStyleCards.map((card) => (
              <Link
                key={card.id}
                to={card.link}
                onClick={() => handlePlannerClick(`travel_style_card_${card.id}`)}
                className="group flex flex-col justify-between bg-white p-6 rounded-2xl border border-luxury-green/10 hover:border-luxury-gold shadow-sm hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-luxury-green/5 text-luxury-green flex items-center justify-center mb-3 group-hover:bg-luxury-gold group-hover:text-white transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-luxury-green mb-1">{card.title}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-luxury-gold font-bold block mb-3">{card.mix}</span>
                  <p className="text-xs sm:text-sm text-luxury-black/70 font-light leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-luxury-green group-hover:text-luxury-gold transition-colors">
                  {card.linkLabel} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 9: For Travel Agencies */}
        <section id="for-agencies" className="scroll-mt-24 py-8 border-t border-luxury-green/10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green mb-3 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#d4af37]" />
            Why This Matters for Indian Travel Agencies
          </h2>
          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            Experience density isn't just a nice idea for individual travellers — it's a genuine advantage for agencies selling Sri Lanka. Instead of pitching one generic itinerary to everyone, the same island can be packaged around traveller intent, with each package built from a different mix of the same underlying regions.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-luxury-green/10 bg-white shadow-sm mb-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-luxury-green/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-luxury-green">
                  <th className="p-4">Traveller Intent</th>
                  <th className="p-4">Suggested Mix</th>
                  <th className="p-4 hidden sm:table-cell">Why It Works</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-cream text-luxury-black">
                {agencyPackages.map((pkg) => (
                  <tr key={pkg.persona} className="hover:bg-luxury-cream/10 transition-colors align-top">
                    <td className="p-4 font-semibold text-luxury-green whitespace-nowrap">{pkg.persona}</td>
                    <td className="p-4 font-mono text-[#8B6E30] font-bold">{pkg.mix}</td>
                    <td className="p-4 text-luxury-black/70 font-light hidden sm:table-cell">{pkg.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-luxury-black/80 leading-relaxed text-sm sm:text-base font-light mb-6">
            The practical takeaway: build a small set of intent-based templates — family, honeymoon, friends, wellness — rather than one "standard" Sri Lanka package, and adjust the mix of regions per client rather than the destination itself.
          </p>

          <div className="bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-luxury-black/75 font-light">
              Working with Indian travel agencies and building custom Sri Lanka packages? We're happy to talk through routing and logistics.
            </p>
            <a
              href={WhatsAppLink("Hi Plan Sri Lanka! I run a travel agency and would like to discuss building Sri Lanka packages for our clients.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", "conversion", "agency_partner_cta")}
              className="shrink-0 px-6 py-3 bg-luxury-green hover:bg-luxury-gold text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Partner With Us
            </a>
          </div>
        </section>

        {/* Continue Planning - Internal Links */}
        <div className="bg-white border-2 border-luxury-gold/20 p-6 sm:p-8 rounded-3xl mb-12 shadow-sm">
          <p className="font-bold uppercase tracking-widest text-[11px] text-luxury-gold mb-4 flex items-center gap-1.5 font-mono">
            <Trees className="w-4 h-4" /> Continue Planning:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            {[
              { path: "/sri-lanka-trip-planner", tag: "Interactive", title: "Trip Planner", desc: "Design your custom route & budget.", cta: "Open Tool" },
              { path: "/sri-lanka-7-day-itinerary", tag: "Itinerary", title: "7-Day Itinerary", desc: "Our classic first-timer loop.", cta: "Read Guide" },
              { path: "/sri-lanka-trip-cost-from-india", tag: "Budgeting", title: "Trip Cost From India", desc: "Realistic INR cost breakdowns.", cta: "Check Costs" },
              { path: "/best-time-to-visit-sri-lanka", tag: "Seasons", title: "Best Time to Visit", desc: "Match your dates to the weather.", cta: "See Guide" }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handlePlannerClick(`why_indian_travellers_related_${item.path}`)}
                className="flex flex-col justify-between p-4 bg-luxury-cream/40 border border-luxury-green/10 rounded-2xl hover:border-luxury-gold transition-all duration-300 group hover:shadow-sm"
              >
                <div>
                  <span className="font-mono text-[10px] text-luxury-gold font-bold uppercase block mb-1">{item.tag}</span>
                  <h4 className="font-serif font-bold text-sm text-luxury-green group-hover:text-luxury-gold transition-colors">{item.title}</h4>
                  <p className="text-[11px] text-luxury-black/60 font-light mt-1">{item.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-end text-luxury-gold">
                  <span className="text-[10px] font-bold mr-1">{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <section className="scroll-mt-24 py-10 mb-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-luxury-green mb-8">
            Sri Lanka Is Not Just One Destination
          </h2>
          <div className="max-w-2xl mx-auto space-y-2 text-base sm:text-lg text-luxury-black/75 font-light leading-relaxed mb-8">
            <p>Sri Lanka is a beach holiday.</p>
            <p>It is a cultural journey.</p>
            <p>It is a wildlife adventure.</p>
            <p>It is a mountain escape.</p>
            <p>It is a wellness retreat.</p>
            <p>It is a honeymoon destination.</p>
            <p>It is a family holiday.</p>
          </div>
          <p className="text-lg sm:text-2xl font-serif italic text-luxury-green">
            That is why Sri Lanka continues to win the hearts of Indian travellers.
          </p>
        </section>

        {/* Interactive Poll CTA */}
        <section className="bg-[#1e3a2f] text-white p-6 sm:p-10 rounded-[32px] mb-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl" />
          <div className="max-w-2xl mx-auto space-y-6 relative z-10 text-center">
            <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.2em] font-bold block">Tell Us</span>
            <h3 className="text-xl sm:text-3xl font-serif text-[#fcfbf7] font-bold">
              What type of Sri Lanka holiday do you — or your clients — ask for most?
            </h3>

            <div className="flex flex-wrap justify-center gap-2.5 pt-2">
              {travelStyleOptions.map((style) => (
                <button
                  key={style}
                  onClick={() => handleStyleSelect(style)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                    selectedStyle === style
                      ? "bg-luxury-gold text-black border-luxury-gold"
                      : "bg-white/5 text-white border-white/15 hover:border-luxury-gold hover:text-luxury-gold"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {selectedStyle && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-2"
                >
                  <button
                    onClick={handleStyleWhatsApp}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-luxury-gold hover:bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat About a {selectedStyle} Trip
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq-section" className="scroll-mt-24 py-8">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-[0.25em] font-bold block mb-2">Have questions?</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-green">Sri Lanka for Indian Travellers: FAQ</h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqList.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-luxury-green/10 overflow-hidden shadow-sm hover:border-luxury-gold/50 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 text-sm sm:text-base font-serif font-bold text-luxury-green"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-luxury-gold shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-luxury-cream"
                      >
                        <p className="p-5 text-xs sm:text-sm text-luxury-black/75 font-light leading-relaxed bg-[#fcfbf7]/40">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
