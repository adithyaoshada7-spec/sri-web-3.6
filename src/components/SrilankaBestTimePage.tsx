import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Info, 
  Sun, 
  CloudRain, 
  Calendar, 
  Sparkles, 
  Heart, 
  Compass, 
  Users, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight, 
  PartyPopper, 
  MapPin, 
  Train, 
  Activity,
  Luggage,
  ShieldAlert,
  ThumbsUp
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

// Definition for interactive quick selector
type TargetExperience = "beaches" | "culture" | "festivals" | "wildlife" | "honeymoon" | "train" | "family";

interface SelectionOutput {
  months: string;
  reason: string;
  experience: string;
  icon: React.ReactNode;
}

export default function SrilankaBestTimePage() {
  const renderFaqAnswerWithLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }
      const anchorText = match[1];
      const path = match[2];
      
      parts.push(
        <Link key={matchIndex} to={path} className="font-bold underline text-[#1e3a2f] hover:text-[#d4af37] transition-colors">
          {anchorText}
        </Link>
      );
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? <>{parts}</> : text;
  };

  usePageMetadata({
    title: "Best Time to Visit Sri Lanka (2026): Weather Guide",
    description: "Find the best time to visit Sri Lanka based on weather, festivals, beaches, wildlife, and train journeys — the perfect month for your trip.",
    canonicalUrl: "https://plan-srilanka.com/best-time-to-visit-sri-lanka",
    ogUrl: "https://plan-srilanka.com/best-time-to-visit-sri-lanka"
  });

  const [selectedExperience, setSelectedExperience] = useState<TargetExperience>("beaches");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Lead Form state
  const [leadForm, setLeadForm] = useState({
    preferMonth: "October",
    duration: "7 Days",
    vibe: "luxury-romance",
    whathappNumber: "",
    agreed: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Quick Decision Tool Data
  const selectorsData: Record<TargetExperience, SelectionOutput> = {
    beaches: {
      months: "December to April (West & South) | May to September (East Cost)",
      reason: "Sri Lanka has a unique dual monsoon. When rain sweeps the east, the south coast is bone dry and sunny—offering perfect blue waters for sea bathing and surfing in Mirissa and Hikkaduwa.",
      experience: "Pristine white sand coastal strolls, golden sunbathing, beach clubs in Galle, and calm turquoise waters without heavy swell risk.",
      icon: <Sun className="w-5 h-5 text-[#d4af37]" />
    },
    culture: {
      months: "January, February, April, and August",
      reason: "These months coincide with major historic cultural celebrations, temperate mountain climate in Kandy, and ideal wandering temperatures of dry Sigiriya boulders.",
      experience: "Climb Sigiriya fortress in clear skies, observe ancient Buddhist relics without heavy storms, and take gorgeous spice garden strolls.",
      icon: <Compass className="w-5 h-5 text-[#d4af37]" />
    },
    festivals: {
      months: "April (Avurudu - Sinhala & Tamil New Year) | May (Vesak Lantern Festival)",
      reason: "These two core cultural months turn the entire island into a glowing communal celebration. Experience beautiful lantern-lit streets and participate in local food stalls.",
      experience: "Witness traditional games like Kotta Pora (pillow fighting), see giant hand-crafted floating paper lanterns, and enjoy complimentary 'Dansal' food spreads.",
      icon: <PartyPopper className="w-5 h-5 text-[#d4af37]" />
    },
    wildlife: {
      months: "December to April (Blue Whales & Dolphins) | July to September (Elephants Gathering)",
      reason: "Winter brings calm ocean streams perfect for whale watching in Mirissa. Meanwhile, the dry summer peaks witness 'The Gathering' of 300+ wild elephants at Minneriya National Park.",
      experience: "Spot elusive Sri Lankan leopards in Yala, sail alongside giant blue whales, and capture memories of jumbo herds drinking at majestic water reservoirs.",
      icon: <Activity className="w-5 h-5 text-[#d4af37]" />
    },
    honeymoon: {
      months: "December to March (South Coast luxury) | July to September (Hill country cozy mood)",
      reason: "Couples looking for elite privacy enjoy tranquil luxury resorts under dry blue skies, or cooler mystic rains across Ella's high elevation valleys.",
      experience: "Candlelit dinners on secluded Tangalle beaches, private luxury pool villas, scenic morning tea plucking, and serene couples' massage sessions at boutique eco-spas.",
      icon: <Heart className="w-5 h-5 text-[#d4af37]" />
    },
    train: {
      months: "January to April | July to September",
      reason: "Clear skies and dry hill country climates ensure completely safe train tracks, spectacular unobstructed sunrise panoramas over Nine Arch Bridge, and lush scenery.",
      experience: "Board the legendary blue train from Kandy to Ella, experience deep emerald green valleys, breeze past dramatic waterfalls, and snap pristine open-door shots.",
      icon: <Train className="w-5 h-5 text-[#d4af37]" />
    },
    family: {
      months: "December to April (School winter holidays) | July & August (Summer breaks)",
      reason: "Fits regional school holidays across India. Offers mild, warm humidity perfect for toddlers, multi-generational family resort rooms, and smooth safe roadways.",
      experience: "Explore sea turtle hatcheries, try child-friendly traditional Avurudu games, enjoy private estate dining, and take mild, secure open-air safaris.",
      icon: <Users className="w-5 h-5 text-[#d4af37]" />
    }
  };

  // Month-by-month calendar data
  const calendarMonths = [
    { name: "January", weather: "Sunny & dry in west & south; cool in hill country.", crowds: "Peak Season", cost: "Premium rates", best: "Whale watching & beach escapes", unique: "Dunhinda waterfall trail" },
    { name: "February", weather: "Extremely dry and warm across coastal areas.", crowds: "High Season", cost: "Upper mid-range", best: "Sigiriya strolls & surfing", unique: "National Independence Day parades" },
    { name: "March", weather: "Transitioning month, warm seaside breeze, low rain.", crowds: "Moderately Busy", cost: "Favorable", best: "Yala safaris & Galle fort", unique: "Stilt fishing photography" },
    { name: "April", weather: "Sunny, high humidity; brief evening thunderstorms.", crowds: "Festive Peak", cost: "Slight holiday surge", best: "Avurudu local festivals", unique: "Traditional pillow-fight games" },
    { name: "May", weather: "Southwest monsoon begins; wet in Colombo & south.", crowds: "Quiet / Low", cost: "Excellent value", best: "Vesak glow festival", unique: "Dansal free buffet stalls" },
    { name: "June", weather: "Monsoon active in south; sunny and warm in East.", crowds: "Quiet Season", cost: "Very affordable", best: "Arugam Bay surfing", unique: "Secluded resort stays" },
    { name: "July", weather: "Dry summer break. Best weather on east coast.", crowds: "Moderate Summer", cost: "Mid-range", best: "Elephant gathering & East beaches", unique: "Kandy Esala Perahera build-up" },
    { name: "August", weather: "Warm and dry. Great weather overall.", crowds: "Peak Summer", cost: "Holiday rates", best: "Cultural festivals", unique: "Kandy Esala Perahera parade" },
    { name: "September", weather: "Monsoon transitions; moderate showers late month.", crowds: "Shoulder Season", cost: "Favorable", best: "Minneriya safari & trekking", unique: "Tea factory gourmet tea tasting" },
    { name: "October", weather: "Primary monsoon transition; humid with rainfall.", crowds: "Quiet Season", cost: "Unbeatable discounts", best: "Indoor luxury spa & culinary", unique: "Ayurvedic wellness retreats" },
    { name: "November", weather: "Transitioning skies; clearing up by mid-month.", crowds: "Rising Demand", cost: "Standard rates", best: "Waterfall trails & Kandy", unique: "Lush green emerald paddy views" },
    { name: "December", weather: "Perfect blue skies resume in west and south.", crowds: "Super Peak", cost: "Premium rates", best: "Mirissa whale safaris & beaches", unique: "Festive seaside dinners" }
  ];

  // 20+ FAQs list
  const faqList = [
    {
      q: "What is the absolute best month to visit Sri Lanka for an Indian traveler?",
      a: "For an all-around great experience with beautiful weather, January and February are the gold standard. Sky views are incredibly clear, perfect for beaches, and the hill country is cool. However, if you are looking to fit summer holidays, July and August are excellent dry options for the cultural triangle & East Coast beaches."
    },
    {
      q: "How does the Sri Lanka weather vary by region?",
      a: "Sri Lanka has two distinct weather zones active at different times. The Southwest Monsoon brings rain to Colombo, Galle, and the hill country from May to September. The Northeast Monsoon targets the North and East coast (Trincomalee, Jaffna) from October to January. This means whenever you travel, one side of the island is always hosting a pristine dry season!"
    },
    {
      q: "When is the cheapest time to book a holiday to Sri Lanka?",
      a: "The shoulder and off-peak months of May, September, and October offer breathtaking value. During these times, boutique luxury villas and five-star resorts slashing rates up to 40% are common, and flights from cities like Mumbai, Chennai, and Bangalore are at their absolute lowest."
    },
    {
      q: "When is the elephant gathering in Minneriya?",
      a: "The legendary gathering of wild elephants occurs during the dry summer months, peaking from July to September. Hundreds of wild elephants congregate around the receding waters of the Minneriya reservoir, providing one of the most stunning wildlife spectacles on the planet."
    },
    {
      q: "Is April a good time to visit Sri Lanka as a tourist?",
      a: "April is exceptional. While it's one of the warmer and more humid months, it is home to Avurudu (Sinhala & Tamil New Year). Visiting in mid-April lets you experience authentic local food, joyful traditional street festivals, and massive warmth from villagers. Just ensure you book transport in advance as locals travel to reunite with family."
    },
    {
      q: "What is Vesak, and is it worth visiting in May?",
      a: "Vesak (typically in May) is the festival of lights celebrating Buddha. The entire island lights up with giant hand-crafted paper lanterns, illuminated streets, and volunteers setting up 'Dansal' (free dining stalls offering tea, ice cream, and meals to passersby). It is an incredibly magical time that showcases the ultimate hospitality of Sri Lanka."
    },
    {
      q: "What is the best time for a scenic train journey from Kandy to Ella?",
      a: "The most beautiful train views with clear skies and bright blue horizons occur between January and April. The tracks are fully dry, minimizing delays, and the high-elevation valleys around Ella are painted in deep emerald greens."
    },
    {
      q: "Which month is best for water sports and surfing?",
      a: "If you want to surf Weligama or Mirissa (South), visit between November and April. If you prefer the world-class curls of Arugam Bay (East Coast), head there from May to September."
    },
    {
      q: "Can Indians travel to Sri Lanka during the monsoon season?",
      a: "Yes, easily! Since monsoons are highly regional, a monsoon on the southwest coast means beautiful, sunny blue skies on the east coast. You can easily pivot draft routes using our curated guides to enjoy sunny spots year-round."
    },
    {
      q: "What are the core requirements of the Sri Lanka Visa (ETA) for Indians in 2026?",
      a: "All Indian tourists need a pre-approved digital ETA. You should complete the quick application online 3 days before flight. For absolute peace of mind, consult the official guidelines in our deep-dive [Sri Lanka Visa For Indians](/sri-lanka-visa-for-indians) handbook to evade check-in stress."
    },
    {
      q: "How many days are recommended for a full-experience family holiday?",
      a: "A 7-day to 10-day itinerary is the absolute sweet spot to cover the historical ruins, tea country, elephant safari, and Galle beach. Check out our proven [Sri Lanka 7 Day Itinerary](/sri-lanka-7-day-itinerary) for a ready-to-use, high-end route, or read our extensive [Sri Lanka Family Itinerary](/sri-lanka-family-itinerary) to design a vacation centered around child comfort and zero transport fatigue."
    },
    {
      q: "Is Sri Lanka safe for a honeymoon trip during September?",
      a: "September is a lovely transitional month. While you might experience minor romantic evening drizzles in Ella, it is incredibly lush and peaceful. There are fewer tourists, guaranteeing supreme privacy at boutique pool villas."
    },
    {
      q: "What is peak tourist season in Sri Lanka?",
      a: "Peak season runs from December to March, fueled by winter escape travelers from Europe and India, as well as July-August for summer festivals."
    },
    {
      q: "How cold does it get in Nuwara Eliya and the mountains?",
      a: "Nuwara Eliya sits at high altitude. While the coast might be 30°C, the mountains can drop to 12°C or lower at night, especially in January and December. Carry a light jacket, sweater, or shawl!"
    },
    {
      q: "When is the Kandy Esala Perahera festival held?",
      a: "This historic, grand Buddhist parade of beautifully adorned elephants, traditional fire dancers, and drummers takes place over 10 days in late July or August. It is an unforgettable cultural masterclass."
    },
    {
      q: "Is it easy to get vegetarian food in Sri Lanka during festival seasons?",
      a: "Extremely easy. Sri Lankan cuisine relies heavily on coconut milk, fresh lentils (dhal), jackfruit, and gotukola. During major religious events like Vesak in May, almost all family food stalls ('Dansal') serve 100% complimentary vegetarian food."
    },
    {
      q: "What is the sea swimming status in June on the South Coast?",
      a: "June is during the Southwest monsoon, meaning the south coast beaches can have strong undercurrents and high waves. Sea bathing is discouraged here; head to the calm, safe, shallow bays of Trincomalee on the East Coast instead."
    },
    {
      q: "How much pocket budget is needed for an Indian family of four?",
      a: "It depends heavily on your choice of accommodation and dining style. From budget-friendly local guesthouses to elite private boutique stays, read our exhaustive [Sri Lanka Trip Cost From India](/sri-lanka-trip-cost-from-india) breakdown to plan and calculate your budget with zero stress."
    },
    {
      q: "Are national parks open during monsoon months?",
      a: "Most national parks stay open year-round, but specific dirt roads inside Yala or Wilpattu can become mud-logged during heavy downpours in November/December. Safari drivers easily adapt routes."
    },
    {
      q: "When can we spot blue whales off the coast of Mirissa?",
      a: "Blue whale sightings speak of extremely high probability from December to March, as the marine currents are warm and calm, drawing these gentle giants close to the southern shelf."
    }
  ];

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whathappNumber) return;
    setIsSubmitting(true);
    trackEvent("best_time_lead_form_submit_start", "conversion", leadForm.vibe);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent("best_time_lead_form_submit_success", "conversion", leadForm.preferMonth);

      // Create pre-filled WhatsApp message to trigger personalized agent interaction
      const message = `Hi Plan Sri Lanka! I'm planning my dream vacation around the best local experiences. Here's my preference:
Preferred Month: ${leadForm.preferMonth}
Duration: ${leadForm.duration}
Preferred Vibe: ${leadForm.vibe}
WhatsApp Contact: ${leadForm.whathappNumber}
Please draw up my custom experience plan!`;

      const whatsappUrl = `https://wa.me/94722968210?text=${encodeURIComponent(message)}`;

      // UX redirect
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 800);
    }, 1500);
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      <>
        {/* JSON-LD Schema Implementations */}
        {/* 1. Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best Time To Visit Sri Lanka (2026): Weather, Festivals & Travel Experiences",
            "description": "Discover when to plan your trip to Sri Lanka based on local monsoons, historic festivals like Vesak and Avurudu, and epic wildlife migrations rather than basic meteorological charts.",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "author": {
              "@type": "Organization",
              "name": "Plan Sri Lanka Editorial Desk"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            },
            "datePublished": "2026-06-06",
            "dateModified": "2026-06-06"
          })}
        </script>

        {/* 2. FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>

        {/* 3. Breadcrumb Schema */}
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
                "item": "https://plan-srilanka.com/#destinations"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Best Time To Visit Sri Lanka",
                "item": "https://plan-srilanka.com/best-time-to-visit-sri-lanka"
              }
            ]
          })}
        </script>
      </>

      {/* SECTION 1: HERO SECTION - ATTENTION Phase */}
      <section id="best-time-hero" className="relative py-16 md:py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl -z-10 pointer-events-none" />
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-xs text-[#b8941c] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Luxury Traveler Intelligence
          </div>
          
          <h1 className="text-3xl md:text-6xl font-serif text-[#1e3a2f] leading-tight select-none">
            Best Time To Visit <span className="italic block mt-1">Sri Lanka (2026)</span>
            <span className="text-lg md:text-xl font-sans uppercase tracking-[0.3em] text-[#d4af37] block mt-4 font-bold">
              Weather, Festivals & Travel Experiences
            </span>
          </h1>

          <p className="text-base md:text-xl text-[#3a4d44] font-light max-w-3xl mx-auto leading-relaxed">
            Stop looking at generic, clinical meteorology logs. Don't just choose a month on a dry rainfall chart. 
            <strong> Choose the raw experience you want to tell stories about.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a 
              href="#quick-tool-section"
              className="px-8 py-4 bg-[#1e3a2f] hover:bg-[#d4af37] text-white rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Find My Ideal Travel Month <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#month-calendar-section"
              className="px-8 py-4 bg-white border border-[#1e3a2f]/10 text-[#1e3a2f] rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:bg-[#fcfbf7]/50 hover:border-[#1e3a2f]/30 flex items-center justify-center"
            >
              View Month-by-Month Table
            </a>
          </div>

          <div className="flex justify-center items-center gap-8 pt-10 text-xs text-[#3a4d44]/60 font-mono">
            <span className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#d4af37]" /> microclimates parsed
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#d4af37]" /> updated for 2026
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE SELECTOR - EXPERIENCE Phase */}
      <section id="quick-tool-section" className="py-12 md:py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-[32px] border border-[#1e3a2f]/5 shadow-2xl overflow-hidden">
          <div className="bg-[#1e3a2f] p-6 md:p-8 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-full bg-[#d4af37]/5 rounded-l-full pointer-events-none" />
            <h2 className="font-serif text-xl md:text-3xl font-bold tracking-tight text-center">
              What type of experience are you looking for?
            </h2>
            <p className="text-center text-xs text-white/70 font-light mt-1.5 font-sans uppercase tracking-widest">
              Select one to unlock the flawless recommended months & reasons
            </p>
          </div>

          <div className="p-6 md:p-10 space-y-8">
            {/* Horizontal selection tabs */}
            <div className="flex flex-wrap gap-2.5 justify-center">
              {[
                { id: "beaches", name: "Beaches", icon: <Sun className="w-3.5 h-3.5" /> },
                { id: "culture", name: "Culture", icon: <Compass className="w-3.5 h-3.5" /> },
                { id: "festivals", name: "Festivals", icon: <PartyPopper className="w-3.5 h-3.5" /> },
                { id: "wildlife", name: "Wildlife & Safari", icon: <Activity className="w-3.5 h-3.5" /> },
                { id: "honeymoon", name: "Honeymoon Escape", icon: <Heart className="w-3.5 h-3.5" /> },
                { id: "train", name: "Scenic Train Journeys", icon: <Train className="w-3.5 h-3.5" /> },
                { id: "family", name: "Family Holiday", icon: <Users className="w-3.5 h-3.5" /> }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedExperience(opt.id as TargetExperience);
                    trackEvent("experience_selector_click", "engagement", opt.id);
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                    selectedExperience === opt.id
                      ? "bg-[#1e3a2f] border-[#1e3a2f] text-white shadow-lg"
                      : "bg-[#fcfbf7] border-[#1e3a2f]/10 text-[#1e3a2f] hover:bg-[#1e3a2f]/5"
                  }`}
                >
                  {opt.icon}
                  {opt.name}
                </button>
              ))}
            </div>

            {/* Displaying output box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExperience}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#fcfbf7] border border-[#1e3a2f]/5 rounded-2xl p-6 md:p-8 grid md:grid-cols-6 gap-6 items-center"
              >
                {/* Left Large Icon Column */}
                <div className="md:col-span-1 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 flex items-center justify-center text-2xl">
                    {selectorsData[selectedExperience].icon}
                  </div>
                </div>

                {/* Right Text Column */}
                <div className="md:col-span-5 space-y-4">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Recommended Months</h4>
                    <p className="text-base md:text-lg font-serif font-bold text-[#1e3a2f] mt-0.5">
                      {selectorsData[selectedExperience].months}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-1 border-t border-[#1e3a2f]/5">
                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-[#1e3a2f]/60 font-medium">Under the Hood (Reason Why)</h5>
                      <p className="text-xs text-[#3a4d44] leading-relaxed font-light mt-1">
                        {selectorsData[selectedExperience].reason}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-[#1e3a2f]/60 font-medium">Expected Experience</h5>
                      <p className="text-xs text-[#3a4d44] leading-relaxed font-light mt-1 text-[#b8941c] font-medium">
                        ✦ {selectorsData[selectedExperience].experience}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-amber-50/40 border border-amber-200/50 rounded-xl gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] shrink-0" />
                <p className="text-[11px] text-[#3a4d44] font-light">
                  Indian travelers enjoy excellent flight connectivity to Colombo from Chennai, Mumbai, and Bangalore.
                </p>
              </div>
              <Link 
                to="/sri-lanka-visa-for-indians"
                className="text-[11px] uppercase tracking-wider font-bold text-[#1e3a2f] hover:text-[#d4af37] transition-colors flex items-center gap-1 shrink-0"
              >
                Review Visa Rules <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SRI LANKA TRAVEL SEASONS EXPLAINED - TRUST Phase */}
      <section id="travel-seasons" className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Meteorology Simplified</span>
          <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
            The Sri Lankan Rainfall & Monsoon Map
          </h2>
          <p className="text-sm md:text-base text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
            Forget complex barometric charts. Sri Lanka's geography means there are safe valleys and sunny bays at any moment if you understand the cycle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-4">
          {[
            {
              title: "Southwest Monsoon",
              period: "May to September",
              focus: "East Coast Pristine Season",
              desc: "Wind and rains saturate the southwestern beaches (Galle, Hembantota, Colombo). But here is the secret: the entire East Coast (Trincomalee, Passikudah, Arugam Bay) remains beautifully dry, sunny, and experiences calm oceans perfect for bathing."
            },
            {
              title: "Northeast Monsoon",
              period: "October to January",
              focus: "South & West Coastal Premium",
              desc: "Rains affect the north and east. Meanwhile, the southern coast beaches of Hikkaduwa, Weligama, and Tangalle shift into bone-dry paradise. Sea heights subside, and pristine days emerge."
            },
            {
              title: "The Shoulder Windows",
              period: "February to April | July to August",
              focus: "Perfect All-Around Balance",
              desc: "These magical weeks have minimal rain across almost the entire island. It is the gold standard for travelers wanting a complete transit covering both the historic ruins of Sigiriya and Southern beaches under a single path."
            }
          ].map((season, idx) => (
            <div key={idx} className="bg-white p-7 rounded-[24px] border border-[#1e3a2f]/5 shadow-xl hover:shadow-2xl transition-all space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#1e3a2f]/5 flex items-center justify-center text-[#d4af37] font-mono font-bold text-sm">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-[#1e3a2f]">{season.title}</h4>
                <div className="text-[11px] font-mono text-[#d4af37] font-bold uppercase tracking-wider">
                  {season.period} • {season.focus}
                </div>
              </div>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                {season.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Contextual link to Itinerary */}
        <div className="p-6 bg-[#1e3a2f]/5 rounded-2xl text-center border border-[#1e3a2f]/10 max-w-3xl mx-auto">
          <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
            Ready to layout your route around these monsoons? Avoid rookie detours and use our complete 
            <Link to="/sri-lanka-7-day-itinerary" className="font-bold text-[#1e3a2f] underline mx-1 hover:text-[#d4af37]">
              Sri Lanka 7 Day Itinerary
            </Link> 
            blueprint to organize your family steps beautifully.
          </p>
        </div>
      </section>

      {/* SECTION 4: MONTH-BY-MONTH EXPERIENCE CALENDAR - EXPERIENCE Phase */}
      <section id="month-calendar-section" className="py-16 md:py-24 px-4 md:px-8 bg-[#1e3a2f] text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">The Experience Reference Table</span>
            <h2 className="text-2xl md:text-5xl font-serif text-white">
              Month-By-Month Experience Calendar
            </h2>
            <p className="text-sm text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Explore weather patterns, seasonal crowd scales, standard hotel pricing trends, and best premium excursions to schedule your landing.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10 border-b border-white/10 text-[10px] uppercase tracking-wider font-mono text-[#d4af37]">
                  <th className="p-5 font-bold">Month</th>
                  <th className="p-5 font-bold">Weather Outlook</th>
                  <th className="p-5 font-bold">Resort Crowds</th>
                  <th className="p-5 font-bold">Est. Costs</th>
                  <th className="p-5 font-bold">Best Excursions</th>
                  <th className="p-5 font-bold">Unique Local Highlight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-white/90">
                {calendarMonths.map((m, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-5 font-serif font-bold text-sm text-[#d4af37]">{m.name}</td>
                    <td className="p-5 font-light leading-relaxed">{m.weather}</td>
                    <td className="p-5">
                      <span className="px-2 py-1 rounded bg-white/10 font-mono text-[9px] uppercase">
                        {m.crowds}
                      </span>
                    </td>
                    <td className="p-5 font-mono text-[11px] text-white/70">{m.cost}</td>
                    <td className="p-5 font-light text-[#b8941c] font-medium">{m.best}</td>
                    <td className="p-5 font-serif italic text-white/80">{m.unique}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {calendarMonths.map((m, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-serif font-bold text-base text-[#d4af37]">{m.name}</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[8px] uppercase text-white/70">
                    {m.crowds}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider font-mono">Weather</span>
                    <p className="font-light mt-0.5">{m.weather}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider font-mono">Pricing</span>
                      <p className="font-light mt-0.5 font-mono text-[11px]">{m.cost}</p>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider font-mono">Best Activity</span>
                      <p className="font-light mt-0.5 text-[#d4af37]">{m.best}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider font-mono">Unique Highlight</span>
                    <p className="font-serif italic text-white/80 mt-0.5">“{m.unique}”</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Budget contextual links callout */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold font-mono">Budget Alignment Note</span>
              <p className="text-xs text-white/70 font-light mt-1">
                Wondering how these seasonal charges map to your travel pocket? Secure high-end estimates and comparison values.
              </p>
            </div>
            <Link 
              to="/sri-lanka-trip-cost-from-india"
              className="px-6 py-3 bg-[#d4af37] hover:bg-white text-white hover:text-black text-xs font-bold uppercase tracking-wider rounded-full transition-all shrink-0"
            >
              Estimate Your Sri Lanka Budget
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: APRIL & AVURUDU - CULTURAL ENRICHMENT */}
      <section id="april-avurudu" className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-12 text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Cultural Masterclass</span>
            <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f]">
              April: Experience Sri Lanka Like A Local During Avurudu
            </h2>
            <p className="text-sm md:text-base text-[#3a4d44] font-light max-w-3xl mx-auto leading-relaxed">
              When deep local heritage takes center stage. If you visit Sri Lanka in mid-April, you don't just see historical cities; 
              you are welcomed into the beautiful, beating heart of the community.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-xl md:text-3xl font-bold text-[#1e3a2f]">
              The Sinhala & Tamil New Year
            </h3>

            <p className="text-xs md:text-sm text-[#3a4d44] leading-relaxed font-light">
              Known as **Aluth Avurudu**, this is the absolute peak cultural celebration in Sri Lanka. Marking the sun’s journey from Pisces to Aries and celebrating the conclusion of harvest, the atmosphere is brimming with community joy.
            </p>

            <div className="space-y-4 text-xs font-light text-[#3a4d44]">
              <div className="flex gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span><strong>Warm Family Reunions:</strong> Cities empty out as locals head to rural villages to cook milk rice (Kiribath) at precise auspicious times.</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span><strong>Traditional Food & Sweets:</strong> Savor complimentary Kokis (crispy fried batter), Kevum (oil cake), and fresh bananas in every guesthouse.</span>
              </div>
              <div className="flex gap-3">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span><strong>Vibrant Temple Visits:</strong> Families wear brand-new traditional colors and visit community temples, where elders bless younger generations with oil.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[32px] border border-[#1e3a2f]/5 shadow-xl space-y-6">
            <h4 className="font-serif text-lg font-bold text-[#1e3a2f]">Traditional Games You Can Experience</h4>
            <p className="text-xs text-[#3a4d44] font-light leading-relaxed">
              Villages host open street sports competitions. Visitors are warmly welcomed to join or view with cold king coconuts in hand:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "Kotta Pora (Pillow Fighting)", desc: "Competitors balance on a single horizontal log above soft cushions or mud, trying to knock each other off with one hand using pillows." },
                { name: "Kana Mutti Bindeema", desc: "A blindfolded player holding a wooden stick tries to find and break hanging clay pots filled with dye and water." },
                { name: "Tug Of War (Kamba Adeema)", desc: "A classic show of physical power and roaring team spirit across the sandy beaches and muddy paddy flats." },
                { name: "Sack Race & Spoon Race", desc: "Hilarious traditional neighborhood races, including balancing a small sour lime on a spoon carried in the mouth." },
                { name: "Greased Pole Climbing", desc: "Competitors work in teams to climb a vertical, heavily greased high wooden pillar to grab a dry bag of cash at the top." },
                { name: "Banis Kema (Bun Eating)", desc: "Contestants with hands tied behind their backs try to finish sweet hanging yeast buns fast without using any fingers." }
              ].map((game, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#fcfbf7] border border-[#1e3a2f]/5">
                  <h5 className="font-serif font-bold text-xs text-[#1e3a2f]">{game.name}</h5>
                  <p className="text-[10px] text-[#3a4d44]/80 leading-relaxed font-light mt-1">{game.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7-8: MAY & VESAK - CELESTIAL LIGHTS */}
      <section id="may-vesak" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#1e3a2f] to-[#12231c] text-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">The Celestial Transformation</span>
            <h2 className="text-2xl md:text-5xl font-serif">
              May: Experience The Magic Of Vesak
            </h2>
            <p className="text-sm text-white/75 font-light max-w-2xl mx-auto leading-relaxed">
              Vesak is not just a standard holiday; it is the moment the entire country turns into a peaceful, floating, luminescent canvas of hospitality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center pt-4">
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="text-[#d4af37] font-mono text-[9px] uppercase font-bold">Highlight 01</div>
                <h4 className="font-serif font-bold text-lg text-white">Beautiful Vesak Lanterns</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Known as **Vesak Kudu**, massive colorful lanterns-shaped like stars, lotuses, and octagons are hand-crafted from bamboo and tissue. Families hang them outside gates, turning entire roads into a magical, warm, candlelit fantasy land.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="text-[#d4af37] font-mono text-[9px] uppercase font-bold">Highlight 02</div>
                <h4 className="font-serif font-bold text-lg text-white">Dansal (Free Public Food Stalls)</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Experience true, unmatched local generosity. Volunteers spend weeks preparing food to distribute **100% free** to any passerby. From tea and fruit ice cream to hot rice curry, tourists are warmly invited to queue up alongside locals.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="text-[#d4af37] font-mono text-[9px] uppercase font-bold">Highlight 03</div>
                <h4 className="font-serif font-bold text-lg text-white">Illuminated Streets & Floating Pandols</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Giant structures known as **Thoranas** (illustrated panels) showing Buddhist teachings are erected across public intersections. They feature thousands of colorful bulbs flashing in intricate visual patterns, creating a beautiful evening spectacle.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                <div className="text-[#d4af37] font-mono text-[9px] uppercase font-bold">Highlight 04</div>
                <h4 className="font-serif font-bold text-lg text-white">Unbeatable Community Spirit</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  The absolute highlight of Vesak is the tangible kindness, generosity, and togetherness felt throughout the island. There is no commercial hype—just pure smiling connections, quiet temple chants, and serene family walks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: EXPERIENCE-BASED TRAVEL RECOMMENDATIONS */}
      <section id="experience-recs" className="py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Tailored Matchmaking</span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
            Find Your Calendar Target Match
          </h2>
          <p className="text-xs md:text-sm text-[#3a4d44] font-light max-w-xl mx-auto leading-relaxed">
            Direct recommendations based strictly on the memories you plan to secure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: "Golden Beaches", months: "Dec to Apr (South) | May to Sep (East)", desc: "Clean sands, minimal currents for swimming, and warm tropical temperatures." },
            { tag: "Whale Watching", months: "December to March", desc: "Whale safaris out of southern Mirissa have near-perfect sightings during quiet winter seas." },
            { tag: "Wild Elephants & Safari", months: "July to September", desc: "Coincides with 'The Gathering' of 300+ jumbo herds at Minneriya reservoir parks." },
            { tag: "Cultural Festivals", months: "April (Avurudu) | May (Vesak) | Aug (Esala)", desc: "Witness massive illuminated processions, fire dances, and festive street games." },
            { tag: "Scenic Train Journeys", months: "January to April", desc: "Extremely dry climates ensure tracks remain mud-free and valleys stunningly emerald." },
            { tag: "Elite Honeymoons", months: "December to March", desc: "Couples enjoy complete seclusion, romantic oceanside dinners, and warm sunset breeze." },
            { tag: "Family Holiday Breaks", months: "Dec to Apr (Winter) | Jul & Aug (Summer)", desc: "Syncs with holiday breaks. Safe, slow ocean currents and lots of baby turtle activities." },
            { tag: "Historic Sigiriya Wandering", months: "January to March", desc: "Clear dry skies make the steep 1,200-step vertical climb comfortable without midday rain." }
          ].map((rec, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#1e3a2f]/5 flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#1e3a2f]">{rec.tag}</h4>
                <div className="text-[10px] font-mono text-[#d4af37] font-bold uppercase tracking-wider">
                  {rec.months}
                </div>
                <p className="text-[11px] text-[#3a4d44]/80 leading-relaxed font-light">
                  {rec.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: COMMON TRAVEL MISTAKES */}
      <section id="travel-mistakes" className="py-16 md:py-24 px-4 md:px-8 bg-[#fcfbf7] border-y border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Guard Your Holiday</span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              10 Fatal Mistakes Indian Travelers Make (When Picking Dates)
            </h2>
            <p className="text-xs md:text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
              Choosing the wrong calendar slot under false assumptions can lead to rain-logged days and logistical issues. Keep these rules close:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: "01", title: "Assuming Sri Lanka gets rained out overall during monsoon months", desc: "Since monsoons are highly regional, when one side of the island gets rain, the other coast is beautifully sunny." },
              { num: "02", title: "Ignoring major national festival closures", desc: "During Sinhala & Tamil New Year (Avurudu) in mid-April, local transport is heavily booked as families reunite." },
              { num: "03", title: "Booking Nuwara Eliya hotels without cold climate prep", desc: "While the sandy coasts are 30°C year-round, Nuwara Eliya high elevation valleys can plummet below 12°C in January." },
              { num: "04", title: "Assuming whale watching operates year-round", desc: "Whale boats only sail safely from Mirissa from December to April. Off-season months bring high waves and zero launch approvals." },
              { num: "05", title: "Skipping ahead to book holiday hotels past the 90-day mark", desc: "During peak August (Esala process) and December, the best boutique resorts sell out incredibly fast." },
              { num: "06", title: "Trying to swim on the South Coast during southern monsoons (June)", desc: "June currents are extremely rough in Galle. Swim on the shallow, calm coast of Trincomalee instead." },
              { num: "07", title: "Not checking passport validity before booking airline sales", desc: "If your passport expires in less than 6 months on arrival, immigration officer gates will block entry. Check visa rules in our [Sri Lanka Visa For Indians](/sri-lanka-visa-for-indians) handbook." },
              { num: "08", title: "Not carrying physical cash during rural temple excursions", desc: "While major city resorts process credit cards easily, local fruit stalls and tuk-tuks rely completely on currency." },
              { num: "09", title: "Allotting massive travel time to long mountain bus transits", desc: "Winding mountain trails slow down average vehicle speeds. Pivot and check our [Sri Lanka 7 Day Itinerary](/sri-lanka-7-day-itinerary) for smooth layout times." },
              { num: "10", title: "Underestimating cost differences in super peak weeks", desc: "Resorts apply heavy surcharges on Christmas and New Year. Look up our exhaustive [Sri Lanka Trip Cost From India](/sri-lanka-trip-cost-from-india) matrix to align your wallet." }
            ].map((mistake, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#1e3a2f]/5 flex gap-4 items-start">
                <span className="font-mono text-xs text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded">
                  {mistake.num}
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#1e3a2f]">{mistake.title}</h4>
                  <p className="text-[11px] text-[#3a4d44]/80 leading-relaxed font-light">{renderFaqAnswerWithLinks(mistake.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ SECTION - PROOF Phase (20 Questions for absolute coverage) */}
      <section id="faq-detail-section" className="py-16 md:py-24 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Deep Database Coverage</span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f] text-center">
            20 Essential Questions We Solve Weekly
          </h2>
          <p className="text-xs md:text-sm text-[#3a4d44] font-light max-w-xl mx-auto leading-relaxed">
            Everything your family wants to know regarding monsoons, costs, packing, transit options, and clearances.
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-[#1e3a2f]/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => {
                    setActiveFaq(isOpen ? null : index);
                    trackEvent("faq_best_time_toggle", "engagement", `faq_${index}`);
                  }}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 text-[#1e3a2f] font-serif"
                >
                  <span className="font-bold text-sm md:text-base leading-snug">
                    {index + 1}. {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-[#d4af37] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-[#1e3a2f]/5 text-xs md:text-sm text-[#3a4d44] leading-relaxed font-light">
                        {renderFaqAnswerWithLinks(faq.a)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 12: LEAD GENERATION OFFER - OFFER & CTA Phase */}
      <section id="lead-offer" className="py-16 md:py-24 px-4 md:px-8 bg-white border-t border-[#1e3a2f]/5 animate-fade-in">
        <div className="max-w-4xl mx-auto bg-[#1e3a2f] rounded-[40px] text-white overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-bl-[200px] pointer-events-none" />
          <div className="p-8 md:p-16 space-y-10 relative z-10">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono">
                Bespoke Travel Engineering
              </span>
              <h2 className="text-2xl md:text-4xl font-serif leading-tight">
                Plan Your Sri Lanka Trip Around The Experiences You'll Remember Forever
              </h2>
              <p className="text-xs md:text-sm text-white/75 font-light leading-relaxed">
                Connect with our Elite Concierge Desk. Get a personalized Sri Lanka travel plan designed around your exact travel dates, travel budget, and signature interests.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8 max-w-2xl mx-auto">
              {formSubmitted ? (
                <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-[#12231c] flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                  <h3 className="font-serif text-xl font-bold">Dream Journey Ignited!</h3>
                  <p className="text-xs text-white/80 font-light max-w-md mx-auto">
                    We've initialized your curation parameters. You are now being forwarded directly to our premium WhatsApp Desk (+94 722 968 210) to finalize your elite itinerary mapping.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/80">Preferred Month</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                        value={leadForm.preferMonth}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, preferMonth: e.target.value }))}
                      >
                        <option value="January" className="bg-[#1e3a2f]">January (Dry Winter)</option>
                        <option value="April" className="bg-[#1e3a2f]">April (Avurudu)</option>
                        <option value="May" className="bg-[#1e3a2f]">May (Vesak Lights)</option>
                        <option value="August" className="bg-[#1e3a2f]">August (Kandy Festivals)</option>
                        <option value="October" className="bg-[#1e3a2f]">October (Affordable Luxury)</option>
                        <option value="December" className="bg-[#1e3a2f]">December (Peak Beach)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/80">Travel Duration</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                        value={leadForm.duration}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, duration: e.target.value }))}
                      >
                        <option value="5-6 Days" className="bg-[#1e3a2f]">5 - 6 Days (Short Haul)</option>
                        <option value="7 Days" className="bg-[#1e3a2f]">7 Days (Classic Route)</option>
                        <option value="10+ Days" className="bg-[#1e3a2f]">10+ Days (All-Island)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/80">Desired Travel Vibe</label>
                      <select 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                        value={leadForm.vibe}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, vibe: e.target.value }))}
                      >
                        <option value="luxury-romance" className="bg-[#1e3a2f]">Luxury & Romantic</option>
                        <option value="family-discovery" className="bg-[#1e3a2f]">Family Discovery</option>
                        <option value="heritage-trains" className="bg-[#1e3a2f]">Heritage & Trains</option>
                        <option value="coastal-surf" className="bg-[#1e3a2f]">Coastal Surf & Wildlife</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/80">WhatsApp Contact Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. +91 98765 43210" 
                        value={leadForm.whathappNumber}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, whathappNumber: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="optin"
                      checked={leadForm.agreed}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, agreed: e.target.checked }))}
                      className="mt-0.5 rounded accent-[#d4af37]"
                    />
                    <label htmlFor="optin" className="text-[10px] text-white/60 font-light leading-normal select-none">
                      I agree to let the Plan Sri Lanka Editorial Desk compile my travel parameters & initiate custom contact via WhatsApp.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !leadForm.whathappNumber}
                    className="w-full py-4 bg-[#d4af37] hover:bg-white text-white hover:text-black rounded-xl font-bold uppercase tracking-wider text-xs transition-colors shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>Analyzing Experience Matrix...</>
                    ) : (
                      <>Get My Personalized Sri Lanka Travel Plan <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
