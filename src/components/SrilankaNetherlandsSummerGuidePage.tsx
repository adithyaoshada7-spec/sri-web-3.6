import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  Sun,
  CloudRain,
  Compass,
  MapPin,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Waves,
  Mountain,
  Train,
  CheckCircle2,
  AlertTriangle,
  Plane,
  Euro,
  Info,
  Car,
  PhoneCall,
  Search,
  ExternalLink,
  Glasses
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import InteractiveRouteFunnelModal from "./InteractiveRouteFunnelModal";

export default function SrilankaNetherlandsSummerGuidePage() {
  usePageMetadata({
    title: "Sri Lanka Rondreis in de Zomer (Juni, Juli & Augustus) | Weer, Oostkust & Route Gids",
    description: "De complete gids voor een rondreis door Sri Lanka in de zomervakantie (juni, juli & augustus). Ontdek zonnige stranden in Nilaveli, Ella Rock hikes, privé chauffeur tips en het weer.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-summer-roundtrip-guide-june-july-august",
    ogUrl: "https://plan-srilanka.com/sri-lanka-summer-roundtrip-guide-june-july-august"
  });

  const [isFunnelOpen, setIsFunnelOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeDayTab, setActiveDayTab] = useState<number>(1);

  // Structured Article & TouristTrip Schema for Google Crawl Bots
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://plan-srilanka.com/sri-lanka-summer-roundtrip-guide-june-july-august"
    },
    "headline": "Sri Lanka Rondreis in de Zomer: De Ultieme Reisgids voor Juni, Juli en Augustus",
    "description": "Volledige reisgids voor Nederlandse reizigers: route door de Culturele Driehoek, zonnige stranden aan de oostkust (Nilaveli), kano- en wandeltochten in Ella, en vervoer met privéchauffeur.",
    "author": {
      "@type": "TravelAgency",
      "name": "Plan Sri Lanka",
      "url": "https://plan-srilanka.com"
    },
    "publisher": {
      "@type": "TravelAgency",
      "name": "Plan Sri Lanka",
      "logo": "https://plan-srilanka.com/logo.png"
    }
  };

  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "14-Day Sri Lanka Summer Roundtrip (Zomer Rondreis)",
    "description": "Weather-optimized summer itinerary combining Cultural Triangle, Ella Rock hikes, scenic highland train, Nilaveli beach snorkeling, and Dutch heritage in Galle Fort.",
    "touristType": ["European Travelers", "Dutch Vacationers", "Families with Kids", "Couples"],
    "itinerary": [
      { "@type": "TouristAttraction", "name": "Cultural Triangle: Sigiriya & Dambulla", "description": "Climb ancient citadel & Pidurangala for sunset" },
      { "@type": "TouristAttraction", "name": "East Coast: Nilaveli Beach & Pigeon Island", "description": "Calm ocean swimming & snorkeling with reef turtles" },
      { "@type": "TouristAttraction", "name": "Hill Country: Kandy to Ella Train", "description": "Scenic blue train through misty tea estates" },
      { "@type": "TouristAttraction", "name": "Ella Rock & Nine Arch Bridge", "description": "Spectacular sunrise mountain trek" },
      { "@type": "TouristAttraction", "name": "Galle Dutch Fort", "description": "Historic VOC colonial ramparts and Dutch architecture" }
    ]
  };

  const dutchFaqs = [
    {
      q: "Is Sri Lanka geschikt voor een rondreis in de zomervakantie (juni, juli & augustus)?",
      a: "Ja, absoluut! Veel Nederlandse reizigers denken ten onrechte dat heel Sri Lanka onbegaanbaar is door de moesson. Sri Lanka kent echter een uniek microklimaat met twee verschillende moessons. Terwijl het zuidwesten regen kan ervaren, is het weer aan de oostkust (Nilaveli, Trincomalee, Passikudah) en in de Culturele Driehoek in juni, juli en augustus prachtig: strakblauwe luchten, rustige zeeën en zonovergoten dagen."
    },
    {
      q: "Wat is het weer in Sri Lanka in juni en juli?",
      a: "In juni en juli ligt de gemiddelde temperatuur tussen 28°C en 33°C. Aan de oostkust (Trincomalee/Nilaveli) en in het binnenland (Sigiriya/Anuradhapura) is het droog en zeer zonnig. In het centrale heuvelland (Ella, Nuwara Eliya) is het koeler (ca. 16°C–22°C) met af en toe een middagbui. De zuidwestkust (Galle, Mirissa) heeft korte, krachtige tropische buien."
    },
    {
      q: "Waarom kiezen Nederlandse reizigers voor Nilaveli Beach in plaats van Mirissa in de zomer?",
      a: "In de zomermaanden zorgt de zuidwestmoesson voor ruwe zeeën en sterke stromingen aan de zuidkust (Mirissa, Bentota, Hikkaduwa), waardoor zwemmen vaak gevaarlijk is. Aan de oostkust bij Nilaveli is de zee daarentegen zo kalm als een zwembad. Het is de beste tijd voor snorkelen met zeeschildpadden en rifhaaien bij Pigeon Island National Park."
    },
    {
      q: "Hoeveel kost een rondreis met privéchauffeur door Sri Lanka in euro's (€)?",
      a: "Een privéchauffeur met airconditioned auto kost gemiddeld €55 tot €75 per dag (inclusief brandstof, tolwegen, verzekering en het verblijf van de chauffeur). Voor een complete 14-daagse zomerrondreis (incl. nette comfort hotels, ontbijt en chauffeur) ligt het totale budget rond de €1.200 tot €1.800 per persoon, wat aanzienlijk voordeliger en flexibeler is dan groepsreizen via grote reisorganisaties."
    },
    {
      q: "Heb ik als Nederlander een visum (ETA) nodig voor Sri Lanka?",
      a: "Ja. Reizigers met een Nederlands paspoort moeten vooraf online een Electronic Travel Authorization (ETA) aanvragen via het officiële portaal. De verwerking duurt doorgaans 24 tot 48 uur. Zorg dat je paspoort bij aankomst nog minimaal 6 maanden geldig is."
    },
    {
      q: "Hoe bereik je Sri Lanka het beste vanuit Nederland (Schiphol Amsterdam)?",
      a: "Er zijn uitstekende 1-stop verbindingen vanaf Amsterdam Schiphol (AMS) naar Colombo (CMB) met Qatar Airways (via Doha), Emirates (via Dubai) en Etihad Airways (via Abu Dhabi). De totale reistijd inclusief overstap bedraagt circa 12 tot 14 uur."
    },
    {
      q: "Is de Ella Rock hike veilig en goed te doen voor actieve reizigers?",
      a: "Zeker! Nederlandse reizigers houden van actieve wandelingen. De Ella Rock hike duurt circa 3,5 tot 4 uur heen en terug en voert over treinsporen, rubberplantages en door eucalyptusbossen naar een adembenemend uitzicht over de Ella Gap. Begin vroeg in de ochtend (06:30 uur) om de middagwarmte en eventuele wolken voor te zijn."
    },
    {
      q: "Wat is de historische Nederlandse connectie met Sri Lanka (Galle Fort)?",
      a: "Tussen 1640 en 1796 was de Verenigde Oostindische Compagnie (VOC) actief in Sri Lanka. Het UNESCO Galle Dutch Fort is een van de best bewaarde voorbeelden van Nederlandse koloniale vestingbouw in Azië. Je vindt er de Groote Kerk (Nederlands Hervormde Kerk), oude VOC-pakhuizen, Nederlandse straatnamen (zoals Kerkstraat en Leyn Baan Street) en typische gevels."
    }
  ];

  const summerItineraryDays = [
    {
      day: "Dag 1 - 2",
      region: "Negombo & De Culturele Driehoek",
      highlight: "Aankomst & Sigiriya Lion Rock",
      desc: "Zachte landing in Negombo na de vlucht vanuit Amsterdam. Vroeg vertrek naar Sigiriya. Beklim 's middags de Pidurangala rots voor een magische zonsondergang met direct zicht op de Leeuwenrots.",
      drive: "3.5 uur rijden",
      weather: "☀️ Droog & Warm (31°C)"
    },
    {
      day: "Dag 3 - 4",
      region: "Dambulla & Minneriya National Park",
      highlight: "Grottempels & 'The Gathering' Olifanten",
      desc: "Bezoek de gouden rotstempels van Dambulla met eeuwenoude Boeddhabeelden. In juli en augustus vindt in Minneriya/Kaudulla 'The Elephant Gathering' plaats: honderden wilde olifanten die samenkomen rond het waterreservoir.",
      drive: "Korte lokale transfers",
      weather: "☀️ Droog & Zonnig (32°C)"
    },
    {
      day: "Dag 5 - 8",
      region: "Oostkust (Nilaveli Beach & Trincomalee)",
      highlight: "4 Dagen Strandrust & Pigeon Island Snorkelen",
      desc: "Hét hoogtepunt van de zomervakantie. Uitgestrekte witte zandstranden, kristalhelder water en geen moessonregen. Stap op een bootje naar Pigeon Island om te snorkelen met karetschildpadden en vriendelijke zwartpuntrifhaaien.",
      drive: "2 uur vanaf Sigiriya",
      weather: "🌊 Zonovergoten & Rimpelloze Zee (32°C)"
    },
    {
      day: "Dag 9 - 10",
      region: "Kandy & Het Groene Heuvelland",
      highlight: "Tempel van de Tand & Koninklijke Botanische Tuinen",
      desc: "Reis landinwaarts naar de culturele hoofdstad Kandy. Bezoek de heilige Tempel van de Tand (Sri Dalada Maligawa) en wandel door de spectaculaire botanische tuinen van Peradeniya vol reusachtige bamboe en orchideeën.",
      drive: "3 uur comfortabele rit",
      weather: "⛅ Aangenaam & Fris (25°C)"
    },
    {
      day: "Dag 11 - 12",
      region: "De Blauwe Trein & Ella",
      highlight: "Wereldberoemde Treinreis & Ella Rock Hike",
      desc: "Stap in de iconische blauwe trein van Kandy naar Ella en geniet van uitzichten over felgroene theevelden en watervallen. Maak de vroege ochtendwandeling naar Ella Rock en bewonder de Nine Arch Bridge wanneer de ochtendtrein passeert.",
      drive: "Schilderachtige treinrit (bagage mee met chauffeur)",
      weather: "🍃 Koel & Mistig (18°C - 23°C)"
    },
    {
      day: "Dag 13 - 14",
      region: "Galle Dutch Fort & Vertrek Colombo",
      highlight: "VOC Geschiedenis, Ramparts & Vlucht naar Schiphol",
      desc: "Via de zuidelijke snelweg naar het historische Galle Fort. Wandel langs de Nederlandse vestingmuren, bezoek de VOC Groote Kerk en geniet van artisanale koffiebars. Vervoer naar Bandaranaike Airport voor de terugvlucht naar Nederland.",
      drive: "2 uur via Southern Expressway",
      weather: "🌤️ Warme zeebries & namiddagbui (29°C)"
    }
  ];

  const handleOpenFunnel = (source: string) => {
    trackEvent("open_funnel_netherlands_guide", "engagement", source);
    setIsFunnelOpen(true);
  };

  const handleWhatsAppContact = () => {
    trackEvent("whatsapp_netherlands_guide", "conversion", "summer_roundtrip");
    const msg = `Hallo Plan Sri Lanka! 🇳🇱 Wij plannen een rondreis door Sri Lanka in de zomervakantie (juni/juli/augustus). Kunnen jullie ons adviseren over een privéchauffeur en route inclusief Nilaveli en Ella?`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0F1412] font-sans leading-relaxed selection:bg-[#C5A059]/20 pt-24 md:pt-32">
      
      {/* JSON-LD Schemas for SEO Indexing */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": dutchFaqs.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          })
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative px-6 pb-20 pt-8 overflow-hidden bg-gradient-to-b from-[#1A2F23]/10 to-transparent">
        <div className="max-w-5xl mx-auto space-y-8 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> 🇳🇱 Gids voor Nederlandse Reizigers • Zomer Editie 2026 / 2027
          </div>

          <h1 className="text-4xl md:text-7xl font-serif text-[#1A2F23] tracking-tight leading-[1.08] max-w-4xl mx-auto font-bold">
            Sri Lanka Rondreis in de Zomer <br />
            <span className="italic text-[#C5A059] font-normal">
              De Ultieme Gids voor Juni, Juli & Augustus
            </span>
          </h1>

          <p className="text-base md:text-xl text-[#0F1412]/80 font-light max-w-3xl mx-auto leading-relaxed">
            Twijfel je of Sri Lanka geschikt is tijdens de zomervakantie? Laat je niet misleiden door algemene moessonwaarschuwingen. Terwijl het zuidwesten regent, schijnt aan de <strong>oostkust (Nilaveli Beach & Trincomalee)</strong> volop de zon en geniet je in de hooglanden van actieve wandelingen zoals de <strong>Ella Rock trek</strong>.
          </p>

          {/* Quick At-A-Glance Bar for Dutch Travelers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-left">
            <div className="bg-white p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm">
              <span className="text-[10px] uppercase font-mono text-[#C5A059] font-bold block">Beste Strandregio</span>
              <p className="font-serif font-bold text-sm text-[#1A2F23] mt-0.5">Nilaveli & Trincomalee</p>
              <span className="text-[11px] text-gray-500">Zon, kalme zee & snorkelen</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm">
              <span className="text-[10px] uppercase font-mono text-[#C5A059] font-bold block">Actieve Natuur</span>
              <p className="font-serif font-bold text-sm text-[#1A2F23] mt-0.5">Ella Rock & Blauwe Trein</p>
              <span className="text-[11px] text-gray-500">Koele berglucht & theevelden</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm">
              <span className="text-[10px] uppercase font-mono text-[#C5A059] font-bold block">Vervoerstype</span>
              <p className="font-serif font-bold text-sm text-[#1A2F23] mt-0.5">Privéchauffeur met AC</p>
              <span className="text-[11px] text-gray-500">Flexibel, veilig & ontspannen</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm">
              <span className="text-[10px] uppercase font-mono text-[#C5A059] font-bold block">Gem. Budget</span>
              <p className="font-serif font-bold text-sm text-[#1A2F23] mt-0.5">€50 - €85 p.p./dag</p>
              <span className="text-[11px] text-gray-500">Inclusief auto & comfort hotels</span>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-2xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(197, 160, 89, 0.7)",
                  "0 0 0 16px rgba(197, 160, 89, 0)",
                  "0 0 0 0 rgba(197, 160, 89, 0.7)"
                ]
              }}
              transition={{
                boxShadow: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
              }}
              onClick={() => handleOpenFunnel("hero_button")}
              className="w-full sm:w-auto px-8 py-4.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F46] text-white hover:brightness-110 font-bold uppercase tracking-[0.14em] text-xs sm:text-sm rounded-full flex items-center justify-center gap-3 shadow-2xl cursor-pointer border-2 border-white/20"
            >
              <Sparkles className="w-4 h-4 text-white animate-spin" />
              <span>Stel Gratis Je Zomerrondreis Samen</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.button>

            <button
              onClick={handleWhatsAppContact}
              className="w-full sm:w-auto px-7 py-4 bg-[#1A2F23] text-white hover:bg-[#C5A059] font-bold uppercase tracking-[0.12em] text-xs transition-all rounded-full flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-white" /> WhatsApp Concierge (Direct Contact)
            </button>
          </div>

        </div>
      </section>

      {/* 2. THE WEATHER & MONSOON REALITY CHECK */}
      <section className="py-20 px-6 bg-white border-t border-b border-[#0F1412]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Het Weer Begrijpen • Microklimaat Uitleg
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              De Waarheid over de Zomermoesson in Sri Lanka
            </h2>
            <p className="text-[#0F1412]/75 font-light text-sm md:text-base max-w-2xl mx-auto">
              Veel reisgidsen schrijven oppervlakkig: <em>&quot;In juni, juli en augustus regent het in Sri Lanka&quot;</em>. Dat klopt slechts voor de helft van het eiland. Hier is hoe het echt zit:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* East Coast Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 p-7 rounded-3xl border border-amber-200/60 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1A2F23]">
                    Oostkust (Nilaveli, Trincomalee, Passikudah)
                  </h3>
                  <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
                    ☀️ Hoogseizoen & Droge Periode (Zomer)
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#0F1412]/80 font-light leading-relaxed">
                De centrale bergketen blokkeert de zuidwestelijke moessonwinden. Daardoor heerst er aan de oostkust een gortdroog, zonovergoten klimaat met temperaturen rond 30°C–33°C. De zee is kalm, helder en perfect om te zwemmen, duiken en snorkelen bij Pigeon Island.
              </p>
              <div className="p-3 bg-white/80 rounded-xl border border-amber-200/50 text-xs text-amber-900 font-medium">
                💡 <strong>Tip voor Nederlanders:</strong> Plan 4 tot 6 nachten in Nilaveli of Trincomalee voor jouw ultieme strandvakantie in juli of augustus.
              </div>
            </div>

            {/* Southwest Coast Card */}
            <div className="bg-[#FAF8F5] p-7 rounded-3xl border border-[#0F1412]/10 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1A2F23] text-white rounded-2xl shadow">
                  <CloudRain className="w-6 h-6 text-[#C5A059]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1A2F23]">
                    Zuidwestkust (Bentota, Galle, Mirissa)
                  </h3>
                  <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                    🌧️ Yala Moesson (Korte buien & Ruwe zee)
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#0F1412]/80 font-light leading-relaxed">
                De zuidwestkust vangt de regen van de Indische Oceaan op. Dit betekent niet dat het 24 uur per dag regent — vaak zijn het korte, hevige tropische buien in de namiddag. De zee is echter ruw met sterke onderstromingen, waardoor zwemmen afgeraden wordt.
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#0F1412]/10 text-xs text-gray-700 font-light">
                ℹ️ <strong>Slimme reisroute:</strong> Bezoek Galle Dutch Fort voor de VOC-cultuur en lekker eten, maar bewaar je stranddagen voor de oostkust!
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. THE 14-DAY OPTIMAL SUMMER RONDREIS BLUEPRINT */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              De Ideale Reisroute • 14 tot 21 Dagen
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              Het Weer-Geoptimaliseerde Zomer Rondreis Schema
            </h2>
            <p className="text-[#0F1412]/75 font-light text-sm md:text-base max-w-2xl mx-auto">
              Speciaal ontworpen voor de Nederlandse zomervakantie. Deze route vermijdt lange reisdagen en combineert cultuur, natuurhikes en ontspannen stranddagen aan de oostkust.
            </p>
          </div>

          <div className="space-y-4">
            {summerItineraryDays.map((stop, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0F1412]/10 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#0F1412]/5">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-[#1A2F23] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0 shadow">
                      {stop.day.split(" ")[1]}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                        {stop.region}
                      </span>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1A2F23]">
                        {stop.highlight}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="bg-amber-50 text-amber-900 border border-amber-200/60 px-3 py-1 rounded-full font-bold">
                      {stop.weather}
                    </span>
                    <span className="text-gray-500 bg-[#FAF8F5] px-3 py-1 rounded-full border border-gray-200">
                      🚗 {stop.drive}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#0F1412]/80 font-light leading-relaxed">
                  {stop.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive route builder callout */}
          <div className="bg-[#1A2F23] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#C5A059]/30 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                100% Maatwerk Zonder Kosten
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Wil je deze route aanpassen aan jouw wensen?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Of je nu met jonge kinderen reist, een actieve huwelijksreis plant, of 3 weken de tijd hebt: onze route planner berekent direct je ideale tempo en dagbudget in Euro&apos;s.
              </p>
            </div>
            <button
              onClick={() => handleOpenFunnel("mid_itinerary_banner")}
              className="px-8 py-4 bg-[#C5A059] hover:bg-white hover:text-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-full transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <span>Personaliseer Mijn Rondreis Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. ACTIVE NATURE & HIKES: ELLA ROCK & HIGH PEAKS */}
      <section className="py-20 px-6 bg-white border-t border-b border-[#0F1412]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Actieve Zomervakantie • Voor Wandelliefhebbers
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              Ella Rock & Wandelen in het Groene Heuvelland
            </h2>
            <p className="text-[#0F1412]/75 font-light text-sm md:text-base max-w-2xl mx-auto">
              Nederlanders houden van actieve vakanties. Ella is het wandelhart van Sri Lanka, omgeven door theevelden, mistige bergtoppen en diepe kloven.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#0F1412]/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1A2F23] text-white flex items-center justify-center text-xl">
                🥾
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A2F23]">Ella Rock Trail</h3>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Een tocht van ca. 4 uur heen en terug. Je wandelt eerst over het treinspoor en steekt dan via theeplantages de berg op. Het panoramische uitzicht over de Ella Gap is onvergetelijk.
              </p>
              <span className="text-[11px] font-mono text-emerald-800 font-bold block">
                Niveau: Gemiddeld • Start om 06:30 uur
              </span>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#0F1412]/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1A2F23] text-white flex items-center justify-center text-xl">
                🚂
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A2F23]">De Blauwe Treinrit</h3>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                De beroemde treinrit van Kandy naar Ella kronkelt langs kliffen en watervallen. Je privéchauffeur rijdt vooruit met je grote koffers, zodat jij enkel met je camera instapt.
              </p>
              <span className="text-[11px] font-mono text-emerald-800 font-bold block">
                Tip: 2e klasse gereserveerd (open ramen)
              </span>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#0F1412]/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1A2F23] text-white flex items-center justify-center text-xl">
                🌉
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A2F23]">Nine Arch Bridge</h3>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Gebouwd zonder staal tijdens het koloniale tijdperk. Bezoek deze iconische stenen brug bij zonsopgang voor spectaculaire foto&apos;s wanneer de eerste ochtendtrein door de jungle dendert.
              </p>
              <span className="text-[11px] font-mono text-emerald-800 font-bold block">
                Beste tijd: 06:15 - 07:00 ochtendmist
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 5. EAST COAST NILAVELI & PIGEON ISLAND SPOTLIGHT */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Zomer Strandparadijs • Snorkelen & Rust
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              Nilaveli Beach & Pigeon Island National Park
            </h2>
            <p className="text-[#0F1412]/75 font-light text-sm md:text-base max-w-2xl mx-auto">
              Waarom is Nilaveli in juli en augustus de beste keuze van heel Sri Lanka? Ontdek ongerept zand en een levendige onderwaterwereld.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#0F1412]/10 shadow-lg grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-[#C5A059] font-bold tracking-wider">
                🐠 Beschermd Koraalrif & Zeeschildpadden
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A2F23]">
                Snorkelen bij Pigeon Island
              </h3>
              <p className="text-xs sm:text-sm text-[#0F1412]/80 font-light leading-relaxed">
                Op slechts 15 minuten varen met een lokale boot vanaf Nilaveli Beach ligt Pigeon Island. In de zomer is het water hier kraakhelder met een zicht tot wel 20 meter.
              </p>
              <ul className="space-y-2 text-xs text-[#0F1412]/85 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Zwem zij aan zij met grote karetschildpadden en soepschildpadden.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Veilige ontmoetingen met ongevaarlijke zwartpuntrifhaaien in ondiep koraalwater.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Geen gevaarlijke golven of onderstroom zoals aan de zuidkust in deze periode.
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/nilaveli-beach-travel-guide"
                  className="text-xs font-mono font-bold text-[#1A2F23] hover:text-[#C5A059] inline-flex items-center gap-1.5 underline decoration-[#C5A059] underline-offset-4"
                >
                  Lees onze complete Nilaveli Beach Gids (Bootjes & Kaartjes) ➔
                </Link>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#0F1412]/10 space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1A2F23]">Praktische Zomertips voor Nilaveli</h4>
              <div className="space-y-3 text-xs text-[#0F1412]/80">
                <div className="p-3 bg-white rounded-xl border border-[#0F1412]/5">
                  <strong>Aanbevolen Verblijfsduur:</strong> 3 tot 5 nachten om volledig tot rust te komen na de rondreis door het binnenland.
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#0F1412]/5">
                  <strong>Eten & Drinken:</strong> Verse krab, gegrilde zeebaars en garnalen bij strandtentjes op blote voeten.
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#0F1412]/5">
                  <strong>Koraalbescherming:</strong> Gebruik rif-veilige zonnebrandcrème en raak het koraal nooit aan met zwemvliezen.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. DUTCH HERITAGE & VOC IN GALLE FORT */}
      <section className="py-20 px-6 bg-white border-t border-b border-[#0F1412]/5">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Gedeelde Geschiedenis • VOC Erfgoed
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              De Nederlandse Sporen in Sri Lanka (Galle Fort)
            </h2>
            <p className="text-[#0F1412]/75 font-light text-sm md:text-base max-w-2xl mx-auto">
              Wist je dat de VOC ruim 150 jaar over de kustgebieden van Sri Lanka heerste? Voor Nederlandse bezoekers is Galle Fort een fascinerende reis terug in de tijd.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-2">
              <span className="text-xl">⛪</span>
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">De Groote Kerk</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Gebouwd in 1755 door de Nederlandse Hervormde gemeente. De vloer bestaat uit authentieke grafstenen met Hollandse inscripties en familiewapens.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-2">
              <span className="text-xl">🏰</span>
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">De Vestingmuren (Ramparts)</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Enorme granieten bastions zoals Bastion Zwart en Bastion Akersloot, ontworpen om de specerijenhandel tegen Europese rivalen te verdedigen.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-2">
              <span className="text-xl">🏥</span>
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">Old Dutch Hospital</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Het 17e-eeuwse ziekenhuis voor VOC-zeelui is nu een sfeervol plein met boetieks en toprestaurants zoals Ministry of Crab.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5 space-y-2">
              <span className="text-xl">🇳🇱</span>
              <h4 className="font-serif font-bold text-sm text-[#1A2F23]">Nederlandse Straatnamen</h4>
              <p className="text-gray-600 font-light leading-relaxed">
                Wandel door de Kerkstraat, Leyn Baan Street (Lijnbaan) en Zeeburg Street vol monumentale herenhuizen met Hollandse dakpannen.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. DUTCH TRAVELER LOGISTICS: FLIGHTS, COSTS & PRIVATE DRIVER */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Praktische Zaken • Vluchten, Visum & Kosten
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              Alles wat je moet weten voor vertrek vanaf Schiphol
            </h2>
            <p className="text-[#0F1412]/75 font-light text-sm md:text-base max-w-2xl mx-auto">
              Reizen op eigen tempo met een privéchauffeur is vaak goedkoper dan een georganiseerde groepsreis en biedt maximale vrijheid.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-[#0F1412]/10 space-y-3 shadow-sm">
              <Plane className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-base text-[#1A2F23]">Vluchten vanaf Amsterdam (AMS)</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Vlieg comfortabel met 1 overstap via Qatar Airways (Doha), Emirates (Dubai) of Etihad (Abu Dhabi). Gemiddelde retourtickets in de zomervakantie kosten tussen €750 en €1.150 p.p. afhankelijk van hoe vroeg je boekt.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#0F1412]/10 space-y-3 shadow-sm">
              <Euro className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-base text-[#1A2F23]">Kosten & Valuta (LKR & Euro)</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                De lokale munt is de Sri Lankaanse Roepie (LKR). Betalen met creditcard kan in hotels, maar contant geld is handig voor fooien, lokale eettentjes en tuk-tuks. Pinnen kan probleemloos bij Bank of Ceylon en Commercial Bank automaten.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#0F1412]/10 space-y-3 shadow-sm">
              <Car className="w-6 h-6 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-base text-[#1A2F23]">Waarom een Privéchauffeur?</h4>
              <p className="text-xs text-[#0F1412]/75 font-light leading-relaxed">
                Zelf rijden met een huurauto in het bergverkeer is vermoeiend en stressvol. Een gediplomeerde lokale chauffeur regelt de tolwegen, parkeerplekken en kent de verborgen uitzichtpunten, zodat jij ontspannen van het landschap geniet.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. DUTCH LANGUAGE FAQ ACCORDION (VEELGESTELDE VRAGEN) */}
      <section className="py-20 px-6 bg-white border-t border-b border-[#0F1412]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
              Veelgestelde Vragen • FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A2F23] tracking-tight font-bold">
              Veelgestelde Vragen over Reizen naar Sri Lanka in de Zomer
            </h2>
            <p className="text-[#0F1412]/75 font-light text-sm md:text-base max-w-xl mx-auto">
              Antwoorden op de meest gestelde vragen van Nederlandse vakantiegangers en gezinnen.
            </p>
          </div>

          <div className="space-y-3">
            {dutchFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] rounded-2xl border border-[#0F1412]/5 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-serif font-bold text-[#1A2F23] text-sm sm:text-base flex justify-between items-center gap-4 cursor-pointer hover:bg-gray-100/60"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C5A059] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[#0F1412]/5 overflow-hidden bg-white"
                      >
                        <p className="p-5 text-xs sm:text-sm text-[#0F1412]/80 font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. BOTTOM CONVERSION FOOTER & DIRECT WHATSAPP */}
      <section className="py-24 px-6 bg-[#1A2F23] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
              Plan Jouw Zomervakantie Zonder Zorgen
            </span>
            <h2 className="text-3xl md:text-6xl font-serif text-white font-bold leading-tight">
              Klaar voor een Onvergetelijke <br />
              <span className="italic text-[#C5A059] font-normal">Rondreis door Sri Lanka?</span>
            </h2>
            <p className="text-xs md:text-base text-white/75 font-light max-w-xl mx-auto leading-relaxed">
              Gebruik onze gratis interactieve routeplanner of stuur direct een berichtje naar onze lokale Nederlandse desk in Colombo. Binnen enkele minuten heb je een heldere, vrijblijvende route met privé chauffeur.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => handleOpenFunnel("bottom_cta_bar")}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-white hover:text-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-full transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Start Gratis Route Planner ➔
            </button>
            <button
              onClick={handleWhatsAppContact}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white hover:text-[#1A2F23] text-white font-serif font-bold uppercase tracking-widest text-xs rounded-full transition-all border border-white/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Stel Je Vraag op WhatsApp 💬
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROUTE FEASIBILITY FUNNEL MODAL */}
      <InteractiveRouteFunnelModal
        isOpen={isFunnelOpen}
        onClose={() => setIsFunnelOpen(false)}
      />

    </div>
  );
}
