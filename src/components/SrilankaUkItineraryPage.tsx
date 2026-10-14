import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  Compass,
  MapPin,
  Clock,
  Car,
  Train,
  Plane,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  Info,
  DollarSign,
  Sun,
  Coffee,
  HelpCircle,
  Camera,
  Layers,
  Check,
  Luggage,
  Award
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface ItineraryDay {
  day: number;
  title: string;
  route: string;
  driveTime: string;
  summary: string;
  highlights: string[];
  ukTip: string;
  stayArea: string;
  hotelSuggestion: string;
}

const UK_ITINERARY_DAYS: ItineraryDay[] = [
  {
    day: 1,
    title: "London Heathrow to Colombo CMB & Coastal Soft Landing",
    route: "London Heathrow (LHR) ➔ CMB Airport ➔ Negombo",
    driveTime: "25 mins from airport (15 km)",
    summary:
      "Arrive on SriLankan Airlines flight UL504 from London Heathrow or via Qatar/Emirates. Skip the heavy Colombo commuter traffic on day one with a 25-minute transfer to the golden coastal lagoon of Negombo.",
    highlights: [
      "Meet your dedicated English-speaking licensed chauffeur at CMB arrivals hall",
      "Complimentary Dialog 4G/5G eSIM setup and fresh king coconut refresh",
      "Unwind at a beachfront hotel with an evening catamaran sail across Negombo lagoon",
      "Enjoy fresh ginger butter mud crab dinner listening to the Indian Ocean waves"
    ],
    ukTip:
      "Jetlag is minimal: Sri Lanka is only 4.5 hours ahead of the UK during British Summer Time (BST) and 5.5 hours ahead during GMT winter. A relaxing beachfront afternoon in Negombo completely resets your circadian clock.",
    stayArea: "Negombo Beachfront",
    hotelSuggestion: "Heritance Negombo (4★ Luxury Ocean View) / Jetwing Blue"
  },
  {
    day: 2,
    title: "Sigiriya Lion Rock Citadel & Dambulla Golden Cave Temple",
    route: "Negombo ➔ Dambulla ➔ Sigiriya Cultural Triangle",
    driveTime: "3.5 hrs (150 km via Central Expressway)",
    summary:
      "Journey northeast into the lush Cultural Triangle. Explore the UNESCO World Heritage Dambulla Cave Temple before ascending the iconic 5th-century Sigiriya Rock Fortress at golden hour.",
    highlights: [
      "Walk through the 2,000-year-old painted cave sanctuaries of Dambulla filled with 150+ Buddha statues",
      "Ascend Sigiriya Lion Rock at 04:00 PM when the tropical heat subsides and golden hour paints the granite",
      "Inspect the mirror wall, ancient frescoes, and royal water gardens engineered 1,500 years ago",
      "Sip Ceylon ginger tea overlooking paddy fields from your jungle boutique chalet"
    ],
    ukTip:
      "British travellers often climb in the midday heat and get exhausted. Always schedule Sigiriya for either 07:00 AM or 04:00 PM. Book your private chauffeur to handle tickets in advance to skip queue bottlenecks.",
    stayArea: "Sigiriya / Habarana",
    hotelSuggestion: "Aliya Resort & Spa (4★ Paddy View) / Cinnamon Lodge Habarana"
  },
  {
    day: 3,
    title: "Minneriya Wild Elephant Safari & Pidurangala Sunset Vista",
    route: "Sigiriya Corridor ➔ Minneriya National Park ➔ Pidurangala",
    driveTime: "Local sanctuary transfers (under 45 mins)",
    summary:
      "Witness one of wildlife's greatest spectacles: hundreds of wild Asian elephant herds gathering around the Minneriya reservoir, followed by a rewarding sunset trek atop Pidurangala rock.",
    highlights: [
      "Open-top 4x4 private jeep safari inside Minneriya or Kaudulla National Park",
      "Observe matriarch elephants, playful calves, and majestic tuskers grazing peacefully at the water's edge",
      "Late afternoon climb up Pidurangala Rock for an iconic postcard photo with Sigiriya framed in the backdrop",
      "Traditional Sri Lankan village rice and curry feast cooked in clay pots over open wood fires"
    ],
    ukTip:
      "If visiting during the UK summer school holidays (July to September), you will witness 'The Gathering'—up to 300 elephants in a single clearing. Never ride captive elephants; ethical wild safaris support genuine conservation.",
    stayArea: "Sigiriya / Habarana",
    hotelSuggestion: "Water Garden Sigiriya / Jetwing Vil Uyana"
  },
  {
    day: 4,
    title: "Spices of Matale & Kandy Sacred Temple of the Tooth",
    route: "Sigiriya ➔ Matale Heritage Spice Belt ➔ Kandy Sacred Hills",
    driveTime: "2.5 hrs (90 km)",
    summary:
      "Ascend from the dry plains into the mist-draped central highlands. Stroll through certified aromatic spice gardens before entering the sacred lakeside kingdom of Kandy.",
    highlights: [
      "Smell real Ceylon cinnamon bark, cardamom pods, and vanilla beans in Matale",
      "Visit the sacred Temple of the Tooth Relic (Sri Dalada Maligawa) beside Kandy Lake during evening puja ceremonies",
      "Walk the Royal Botanical Gardens at Peradeniya, home to giant Javan fig trees and orchid houses",
      "Traditional Kandyan cultural dance and fire-walking performance"
    ],
    ukTip:
      "Dress code for temples: knees and shoulders must be covered. Lightweight linen trousers and a scarf are perfect. Temple floors get warm in the afternoon sun, so keep socks in your day bag.",
    stayArea: "Kandy Hillcrest",
    hotelSuggestion: "Earl's Regency (4★ River View) / Cinnamon Citadel Kandy"
  },
  {
    day: 5,
    title: "Colonial Nuwara Eliya: 'Little England' & Pure Ceylon Tea Trails",
    route: "Kandy ➔ Ramboda Waterfalls ➔ Nuwara Eliya",
    driveTime: "2.5 hrs winding mountain ascent (75 km)",
    summary:
      "Climb to 1,868 metres above sea level into Nuwara Eliya, christened 'Little England' by British planters in the 19th century. Marvel at emerald tea terraces, colonial mock-Tudor bungalows, and cool mountain air.",
    highlights: [
      "Panoramic photo stop at twin Ramboda Waterfalls plunging 109 metres down sheer cliffs",
      "Guided tour of an operational vintage tea factory founded by British pioneers (taste single-estate Orange Pekoe)",
      "Traditional afternoon high tea with warm scones, clotted cream, and strawberry jam at The Grand Hotel",
      "Photograph the iconic red-brick 1897 Nuwara Eliya Post Office and Victoria Park"
    ],
    ukTip:
      "Temperatures drop to 12°C - 16°C in the evenings! Pack a light fleece or jumper. The British heritage here is unmistakable—from the 1889 Hill Club to red phone boxes.",
    stayArea: "Nuwara Eliya Hills",
    hotelSuggestion: "The Grand Hotel (Heritage Colonial 4★) / Jetwing St. Andrew's"
  },
  {
    day: 6,
    title: "The World-Famous Blue Train to Ella & Nine Arch Bridge",
    route: "Nuwara Eliya (Nanu Oya) ➔ Scenic Railway ➔ Ella",
    driveTime: "3.0 hrs breathtaking train journey",
    summary:
      "Board the legendary Sri Lanka blue train from Nanu Oya to Ella. Travel past cascading waterfalls, eucalyptus forests, and endless carpet-like tea estates, culminating in an afternoon walk across the 1921 Nine Arch Bridge.",
    highlights: [
      "Reserved 1st Class AC or 2nd Class open-window seats on the world's most scenic railway line",
      "Feel the crisp highland mountain breeze and capture world-famous doorway travel photos safely",
      "Arrive in the bohemian mountain town of Ella, surrounded by cloud forests and hip cafés",
      "Golden hour walk along the railway tracks to witness the vintage blue express cross Nine Arch Bridge"
    ],
    ukTip:
      "Train tickets sell out 30 days in advance on the Sri Lanka Railways portal. Plan your booking early or have our concierge secure your reserved seats. Your private chauffeur transports all your heavy luggage ahead by road!",
    stayArea: "Ella Mountain Ridge",
    hotelSuggestion: "98 Acres Resort & Spa / EKHO Ella (Overlooking Ella Gap)"
  },
  {
    day: 7,
    title: "Little Adam's Peak Hike & Yala Leopard Wilderness Safari",
    route: "Ella ➔ Ravana Falls ➔ Wellawaya ➔ Yala National Park",
    driveTime: "2.2 hrs descent to the southern plains (100 km)",
    summary:
      "Kick off the morning with a gentle sunrise hike up Little Adam's Peak before descending past Ravana Falls into the arid coastal wilderness of Yala, home to the highest density of wild leopards on earth.",
    highlights: [
      "Easy 45-minute sunrise stroll to Little Adam's Peak with 360-degree views of Ella Rock gorge",
      "Stop at 25-metre Ravana Falls cascading beside the mountain pass",
      "Afternoon private 4x4 game safari inside Yala National Park Block 1 with an expert naturalist tracker",
      "Track elusive Sri Lankan leopards (*Panthera pardus kotiya*), sloth bears, saltwater crocodiles, and Asian tuskers"
    ],
    ukTip:
      "Block 1 of Yala has the highest leopard density in the world. Request an open-air modified safari jeep with forward-facing tiered seating for optimal wildlife photography.",
    stayArea: "Yala Wilderness Border",
    hotelSuggestion: "Cinnamon Wild Yala (4★ Jungle Chalet) / Jetwing Yala"
  },
  {
    day: 8,
    title: "Southern Ocean Waves: Weligama Surf & Mirissa Whale Coast",
    route: "Yala ➔ Matara ➔ Mirissa / Weligama Bay",
    driveTime: "2.5 hrs smooth coastal highway (135 km)",
    summary:
      "Drive along the southern coastline to the turquoise shores of Weligama and Mirissa. Spend the afternoon swimming in warm 28°C ocean waters, learning to surf, or chilling with fresh coconut cocktails.",
    highlights: [
      "Smooth cruise along the Southern Expressway directly to the palm-fringed coast",
      "Optional gentle surf lesson in the safe sandy bay of Weligama with certified local instructors",
      "Sunset drinks on Coconut Tree Hill overlooking Mirissa's curving golden headland",
      "Candlelit fresh grilled mahi-mahi and jumbo prawns right on the sand"
    ],
    ukTip:
      "November to April is the prime season for Blue Whale and Sperm Whale excursions departing Mirissa harbour. If visiting in July/August, the waves are ideal for surfing and beach relaxation.",
    stayArea: "Mirissa / Weligama Bay",
    hotelSuggestion: "W15 Weligama (4★ Beachfront) / Mandara Resort Mirissa"
  },
  {
    day: 9,
    title: "UNESCO Galle Dutch Fort Ramparts & Cinnamon Lagoon",
    route: "Mirissa ➔ Weligama ➔ Galle Dutch Fort",
    driveTime: "40 mins coastal drive (30 km)",
    summary:
      "Step back into 400 years of living history inside the UNESCO-listed Galle Dutch Fort. Stroll cobblestone alleyways, artisan jewelry boutiques, Dutch colonial churches, and sunset ramparts.",
    highlights: [
      "Observe iconic Sri Lankan stilt fishermen balancing over the breaking surf",
      "Stroll along the 17th-century granite sea ramparts facing the breaking Indian Ocean waves",
      "Explore independent British-Sri Lankan boutique cafes, antique stores, and artisan Ceylon gem jewelers",
      "Cocktails on the lighthouse ramparts as the sun sets over the ocean horizon"
    ],
    ukTip:
      "Galle Fort is entirely pedestrian-friendly and safe. Have dinner inside the fort at Church Street Social or The Tuna & The Crab for an exquisite fusion of British, Dutch, and Sri Lankan culinary traditions.",
    stayArea: "Galle Fort / Thalpe",
    hotelSuggestion: "Jetwing Lighthouse (4★ Geoffrey Bawa Architecture) / Fort Bazaar"
  },
  {
    day: 10,
    title: "Colombo Galle Face Green, Souvenirs & Flight Home to London",
    route: "Galle ➔ Southern Expressway ➔ Colombo ➔ CMB Airport",
    driveTime: "1.8 hrs expressway into Colombo (125 km) + 35 mins to CMB",
    summary:
      "A leisurely morning swim followed by a smooth highway transfer into Colombo. Savor an iconic farewell lunch at the Ministry of Crab and collect premium Ceylon tea souvenirs before your evening flight back to the UK.",
    highlights: [
      "Smooth 100 km/h drive up the Southern Expressway with your private chauffeur",
      "Ocean promenade walk along Galle Face Green with views of the modern Colombo Port City skyline",
      "Pick up vacuum-sealed Single Estate Ceylon Tea, artisan batiks, and cinnamon sticks at Laksala or Barefoot",
      "Farewell lunch at the Old Dutch Hospital (Ministry of Crab / Dutch Pub)",
      "Direct drop-off at Bandaranaike International Airport departures terminal with plenty of buffer time"
    ],
    ukTip:
      "Direct flights to London Heathrow (SriLankan Airlines UL504 / UL506) typically depart late morning or late evening. The expressway makes the airport transfer completely predictable with zero city traffic delays.",
    stayArea: "Flight Home to London",
    hotelSuggestion: "Overnight Direct Flight to London Heathrow (LHR)"
  }
];

const UK_FAQS = [
  {
    q: "Do British passport holders need a visa for Sri Lanka in 2026?",
    a: "Yes. UK citizens require an electronic travel authorization (ETA / e-Visa) before arrival. The standard tourist visa grants a 30-day stay and can easily be applied for online. Ensure your British passport has at least 6 months validity from your date of arrival."
  },
  {
    q: "Do I need a plug adapter when travelling from the UK to Sri Lanka?",
    a: "In 90% of hotels and villas, no! Sri Lanka officially uses the British standard 3-pin Type G plug (230V, 50Hz)—the exact same plug used in the UK. Some older guesthouses may feature round-pin Type D sockets, but all modern 4★ and 5★ properties have standard UK sockets."
  },
  {
    q: "How much does a private chauffeur-guide cost in British Pounds (£)?",
    a: "A dedicated licensed English-speaking chauffeur with an air-conditioned car, all petrol, highway tolls, and driver lodging/food costs approximately £30 to £35 per day (approx. LKR 11,500 - 13,000). Compared to car rentals in the UK or Europe, this provides unbeatable luxury and total peace of mind on Sri Lanka's winding roads."
  },
  {
    q: "What is the best time of year for UK travellers to visit Sri Lanka?",
    a: "Sri Lanka has two distinct weather zones, making it a year-round destination: For UK Winter Sun (November to April), the South and West coasts (Galle, Mirissa, Bentota, Yala) are sunny and calm. For UK Summer School Holidays (July and August), the Cultural Triangle (Sigiriya) and East Coast (Trincomalee, Nilaveli) offer dry, hot, and pristine beach conditions."
  },
  {
    q: "Is 10 days enough time to see Sri Lanka from the UK?",
    a: "Yes! A 10-day itinerary allows you to experience the classic golden loop: Sigiriya citadel, Kandy cultural hills, Nuwara Eliya tea trails, the blue train to Ella, Yala leopard safari, and the beaches of Galle and Mirissa. If you have 14 days, you can add 3-4 days of pure beach relaxation in Trincomalee or Tangalle."
  },
  {
    q: "Which airlines fly direct from the UK to Sri Lanka?",
    a: "SriLankan Airlines operates direct nonstop flights from London Heathrow (LHR) to Colombo (CMB) with a flight time of approximately 10.5 hours. Excellent 1-stop alternatives include Qatar Airways (via Doha) and Emirates (via Dubai) departing from Heathrow, Gatwick, Manchester, and Birmingham."
  }
];

export default function SrilankaUkItineraryPage() {
  usePageMetadata({
    title: "10 to 14-Day Sri Lanka Itinerary & Travel Guide for UK Travellers (2026)",
    description:
      "The definitive Sri Lanka 10-day itinerary for British visitors. Covers direct flights from London Heathrow, UK 3-pin plugs, private chauffeur costs in GBP (£), Sigiriya, the blue train to Ella, Yala safaris, and Galle Fort.",
    canonicalUrl: "https://plan-srilanka.com/10-day-sri-lanka-itinerary-uk",
    ogUrl: "https://plan-srilanka.com/10-day-sri-lanka-itinerary-uk",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [activeDay, setActiveDay] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const generateWhatsAppUrl = () => {
    const text = `Hi Plan Sri Lanka! I'm planning a 10 to 14-day trip from the UK. I'd like to check driver availability, 4-star boutique hotel rates, and customize the UK itinerary.`;
    return `https://wa.me/94777123456?text=${encodeURIComponent(text)}`;
  };

  // Structured Data (Schema.org JSON-LD for SEO & AEO)
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "name": "10-Day Sri Lanka Itinerary for UK Travellers",
        "description": "Comprehensive 10 to 14-day luxury and mid-range Sri Lanka itinerary tailored for British holidaymakers departing from London Heathrow or Manchester.",
        "touristType": ["UK Travellers", "Couples", "Families"],
        "itinerary": {
          "@type": "ItemList",
          "itemListElement": UK_ITINERARY_DAYS.map((d, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": d.title,
            "description": d.summary
          }))
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": UK_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://plan-srilanka.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides",
            "item": "https://plan-srilanka.com/guides"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "10-Day Sri Lanka Itinerary for UK Travellers",
            "item": "https://plan-srilanka.com/10-day-sri-lanka-itinerary-uk"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#1F3D2B] selection:text-white">
      {/* Inject JSON-LD Schema for Google SEO & Answer Engine Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* TOP HERO HEADER */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#E8E4D9]">
        <div className="absolute inset-0 bg-[radial-gradient(#1F3D2B_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#7A7365]">
            <Link to="/" className="hover:text-[#1F3D2B] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/sri-lanka-trip-planner" className="hover:text-[#1F3D2B] transition-colors">
              Trip Planner
            </Link>
            <span>/</span>
            <span className="text-[#1F3D2B] font-bold">UK Travellers 10-14 Day Guide</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F3D2B]/10 border border-[#1F3D2B]/20 text-[#1F3D2B] text-xs font-mono font-bold uppercase tracking-wider">
            <span>🇬🇧 Tailored for British Holidaymakers</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>Updated for 2026 Season</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1F3D2B] leading-tight tracking-tight">
            The Ultimate Sri Lanka Itinerary & Travel Guide for UK Travellers{" "}
            <span className="text-[#D4AF37] italic font-serif">(10 to 14 Days)</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-[#5A5448] max-w-3xl leading-relaxed">
            From direct 10.5-hour flights out of London Heathrow to vintage Ceylon tea estates in "Little England", this curated route balances ancient UNESCO citadels, wild leopard safaris, the famous blue train, and golden Indian Ocean beaches—with real driving times and costs transparently priced in British Pounds (£).
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] shadow-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-[#7A7365] block">
                Flight Time
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#1F3D2B]">
                10h 30m Direct
              </span>
              <p className="text-[11px] text-[#7A7365] mt-0.5">LHR ➔ CMB (SriLankan)</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] shadow-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-[#7A7365] block">
                Time Difference
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#1F3D2B]">
                +4.5 hrs BST
              </span>
              <p className="text-[11px] text-[#7A7365] mt-0.5">Zero severe jetlag</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8E4D9] shadow-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-[#7A7365] block">
                Electrical Plugs
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#1F3D2B]">
                UK 3-Pin Type G
              </span>
              <p className="text-[11px] text-[#7A7365] mt-0.5">No adapters needed</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1F3D2B] text-white border border-[#1F3D2B] shadow-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-[#D4AF37] block">
                Private Chauffeur
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#D4AF37]">
                ~£30 - £35 / day
              </span>
              <p className="text-[11px] text-white/80 mt-0.5">AC car, fuel, tolls incl.</p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/plan-my-trip"
              className="px-6 py-3.5 bg-[#1F3D2B] hover:bg-[#142A1D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Customize Your UK Route on AI Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 fill-current" />
              <span>Speak to UK Travel Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* ESSENTIAL UK TRAVEL TIPS BANNER (Why Sri Lanka is a favorite for Brits) */}
      <section className="py-12 bg-white border-b border-[#E8E4D9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              Practical Logistics
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Why Sri Lanka Feels Naturally Easy for UK Travellers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center font-bold">
                🔌
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">
                Standard UK 3-Pin Plugs
              </h3>
              <p className="text-[#5A5448] leading-relaxed">
                You do not need to buy bulky international travel adapters. Sri Lanka's official national electrical standard is the British rectangular 3-pin Type G plug (230V, 50Hz). Your iPhone, Dyson, and laptop chargers plug directly into the wall.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center font-bold">
                🚗
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">
                Driving on the Left
              </h3>
              <p className="text-[#5A5448] leading-relaxed">
                Just like in the United Kingdom, traffic flows on the left-hand side of the road. However, due to highland hairpin turns, wandering wildlife, and local bus overtakes, self-driving is rarely advised. Having a{" "}
                <Link
                  to="/sri-lanka-tourist-drivers"
                  className="text-[#1F3D2B] font-bold underline decoration-[#D4AF37] decoration-2 hover:text-[#D4AF37] transition-colors"
                >
                  dedicated private tourist chauffeur guide
                </Link>{" "}
                is the standard, stress-free luxury norm.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#1F3D2B]/10 text-[#1F3D2B] flex items-center justify-center font-bold">
                💷
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B]">
                Exceptional Sterling (£) Purchasing Power
              </h3>
              <p className="text-[#5A5448] leading-relaxed">
                With the British Pound trading around £1 = 390 LKR, luxury travel in Sri Lanka offers extraordinary value. A lavish 4-course seafood dinner for two in Galle Fort costs ~£25, freshly picked Ceylon tea is pennies, and luxury heritage 4★ boutique hotels average under £75 per night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WEATHER SEASONS TAILORED FOR UK HOLIDAY PERIODS */}
      <section className="py-12 md:py-16 bg-[#FAF8F5] border-b border-[#E8E4D9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              Weather & Timing
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Best Time to Visit: Matching UK Holiday Calendars
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7365] mt-1">
              For a detailed month-by-month breakdown across all 9 provinces, consult our comprehensive{" "}
              <Link
                to="/best-time-to-visit-sri-lanka"
                className="text-[#1F3D2B] font-bold underline decoration-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                best time to visit Sri Lanka weather guide
              </Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UK Summer Holidays */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E4D9] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E4D9]">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                    ☀️
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">
                      July & August (UK School Holidays)
                    </h3>
                    <span className="text-[11px] font-mono text-[#7A7365]">
                      Cultural Triangle & Pristine East Coast
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                  Peak Summer
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                If you are travelling during the British six-week summer holiday, Sri Lanka is a brilliant choice. While the southwest coast experiences monsoon showers, the **Cultural Triangle (Sigiriya, Dambulla)** and the **East Coast (Trincomalee, Nilaveli, Pasikudah)** are bathed in dry 32°C sunshine with flat turquoise seas perfect for snorkeling at Pigeon Island.
              </p>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4D9] text-xs space-y-1.5">
                <strong className="font-bold text-[#1F3D2B] block">
                  🌟 Must-Do for Summer British Travellers:
                </strong>
                <p className="text-[#5A5448]">
                  Witness the majestic Minneriya Elephant Gathering and the spectacular Kandy Esala Perahera festival in August. Check our guide on{" "}
                  <Link
                    to="/sri-lanka-itinerary-august-couples"
                    className="text-[#1F3D2B] font-bold underline decoration-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    where to travel in Sri Lanka in August for couples and families
                  </Link>.
                </p>
              </div>
            </div>

            {/* UK Winter Sun */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E4D9] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E4D9]">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
                    🌴
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1F3D2B]">
                      November to April (UK Winter Escape)
                    </h3>
                    <span className="text-[11px] font-mono text-[#7A7365]">
                      South Coast, Galle Fort & Yala Safaris
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold">
                  Winter Sun
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Escape British drizzle and freezing temperatures for the tropical golden south coast. November through April delivers glassy calm oceans, warm 29°C waters, and world-class conditions for{" "}
                <Link
                  to="/whale-watching-mirissa"
                  className="text-[#1F3D2B] font-bold underline decoration-[#D4AF37] hover:text-[#D4AF37]"
                >
                  whale watching excursions in Mirissa
                </Link>{" "}
                and sunbathing along Weligama, Tangalle, and Bentota.
              </p>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4D9] text-xs space-y-1.5">
                <strong className="font-bold text-[#1F3D2B] block">
                  🌟 Must-Do for Winter Sun Travellers:
                </strong>
                <p className="text-[#5A5448]">
                  Combine tea estate treks in Ella with an ethical{" "}
                  <Link
                    to="/experience/yala-leopard-safari"
                    className="text-[#1F3D2B] font-bold underline decoration-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    Yala National Park leopard safari
                  </Link>{" "}
                  and sunset cocktails atop the ramparts of UNESCO Galle Fort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 10-DAY ITINERARY TIMELINE */}
      <section className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E4D9]">
          <div>
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              Curated Transfer Flow
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1F3D2B]">
              Day-by-Day 10-Day Route Map & Pacing
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7365] mt-1">
              Engineered strictly within Sri Lanka's ≤ 3.5 hrs/day driving rule to prevent travel fatigue.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/10-day-sri-lanka-itinerary"
              className="px-4 py-2 bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] rounded-xl text-xs font-mono font-bold text-[#1F3D2B] transition-all shadow-xs"
            >
              View General 10-Day Island Route →
            </Link>
          </div>
        </div>

        {/* Day Selector Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {UK_ITINERARY_DAYS.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                activeDay === day.day
                  ? "bg-[#1F3D2B] text-white shadow-md"
                  : "bg-white border border-[#E8E4D9] text-[#5A5448] hover:bg-[#FAF8F5]"
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>

        {/* Active Day Detail Card */}
        {(() => {
          const current = UK_ITINERARY_DAYS.find((d) => d.day === activeDay) || UK_ITINERARY_DAYS[0];
          return (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4D9] shadow-md space-y-6">
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E4D9] gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#1F3D2B] text-[#D4AF37] font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                    {current.day}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
                      Day {current.day} Route
                    </span>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1F3D2B]">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#5A5448] bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#E8E4D9] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{current.driveTime}</span>
                  </span>
                </div>
              </div>

              {/* Route Path */}
              <div className="px-3.5 py-2 rounded-xl bg-[#EAF2ED] border border-[#C5DAC9] text-xs font-mono font-bold text-[#1F3D2B] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#1F3D2B]" />
                <span>Leg: {current.route}</span>
              </div>

              {/* Day Description */}
              <p className="text-sm sm:text-base text-[#5A5448] leading-relaxed">
                {current.summary}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-[#1F3D2B] uppercase tracking-wider block">
                  ✨ Key Experiences Included:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4D9]/80 text-xs text-[#5A5448] flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* UK Specific Advisory Note */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Info className="w-4 h-4" />
                  <span>British Traveller Insider Tip:</span>
                </div>
                <p className="leading-relaxed">{current.ukTip}</p>
              </div>

              {/* Accommodation Suggestion */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#7A7365] block">
                    Recommended Overnight Base
                  </span>
                  <span className="font-serif font-bold text-sm sm:text-base text-[#1F3D2B]">
                    {current.stayArea}
                  </span>
                  <p className="text-[#7A7365] mt-0.5">
                    🏨 Recommended: {current.hotelSuggestion}
                  </p>
                </div>

                <Link
                  to="/plan-my-trip"
                  className="px-4 py-2 bg-[#1F3D2B] hover:bg-[#142A1D] text-white font-mono font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all self-start sm:self-auto"
                >
                  Check Rates On AI Planner →
                </Link>
              </div>
            </div>
          );
        })()}

        {/* 14-DAY EXTENSION CARD */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1F3D2B] to-[#142A1D] text-white shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
                Have 14 Days or More?
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl">
                The 14-Day Extended Island Loop
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold self-start sm:self-auto">
              +4 Days Added
            </span>
          </div>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-3xl">
            If your British holiday spans two full weeks, you don't need to rush! Use the extra 4 days to add either:
            <br />
            <strong>A) The Summer Extension:</strong> 4 days of Robinson-Crusoe beach seclusion at Nilaveli & Trincomalee (Pigeon Island shark snorkeling).
            <br />
            <strong>B) The Winter Wellness Extension:</strong> 4 days in a heritage Ayurvedic ocean retreat in Tangalle or Bentota.
          </p>

          <div className="pt-2">
            <Link
              to="/plan-my-trip"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] text-[#0d2235] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#c49f2f] transition-all"
            >
              <span>Build a 14-Day Route with Live Budget Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COST BREAKDOWN IN BRITISH POUNDS (£) */}
      <section className="py-12 md:py-16 bg-white border-t border-b border-[#E8E4D9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              Transparent Sterling Budgeting
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Realistic 10-Day Trip Costs for UK Holidaymakers (£ GBP)
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7365] mt-1">
              Estimated per person for a couple travelling together with a private chauffeur and verified 4★ sea view or heritage stays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Chauffeur Vehicle */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E4D9] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#1F3D2B]">
                  Dedicated AC Chauffeur
                </span>
                <Car className="w-4 h-4 text-[#1F3D2B]" />
              </div>
              <div className="text-2xl font-mono font-bold text-[#1F3D2B]">
                £320 - £350
              </div>
              <span className="text-[11px] font-mono text-[#7A7365] block">
                Total for vehicle (10 Days)
              </span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Includes private licensed English-speaking chauffeur, all petrol, Southern Expressway highway tolls, parking fees, and driver meals/stay.
              </p>
            </div>

            {/* 4-Star Boutique Stays */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E4D9] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#1F3D2B]">
                  4★ Stays & Resorts
                </span>
                <Coffee className="w-4 h-4 text-[#1F3D2B]" />
              </div>
              <div className="text-2xl font-mono font-bold text-[#1F3D2B]">
                £500 - £750
              </div>
              <span className="text-[11px] font-mono text-[#7A7365] block">
                Total for 9 Nights (per room)
              </span>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Handpicked 4-star sea view resorts, jungle pool villas, and heritage tea bungalows with daily full English/Ceylon breakfast included.
              </p>
            </div>

            {/* Total Package */}
            <div className="p-6 rounded-3xl bg-[#1F3D2B] text-white border border-[#1F3D2B] space-y-3">
              <div className="flex items-center justify-between text-[#D4AF37]">
                <span className="text-xs font-mono font-bold uppercase">
                  Complete Island Tour
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-2xl font-mono font-bold text-[#D4AF37]">
                ~£650 - £850
              </div>
              <span className="text-[11px] font-mono text-white/70 block">
                Per Person (Excl. Intl. Flights)
              </span>
              <p className="text-xs text-white/80 leading-relaxed">
                Covers your private chauffeur for 10 days, all 4★ stays, train tickets, Yala 4x4 safari jeep, and activities buffer.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Want to simulate your exact trip cost with your own traveler count and hotels?
              </span>
            </div>
            <Link
              to="/plan-my-trip"
              className="font-bold underline text-[#1F3D2B] hover:text-[#D4AF37] transition-colors"
            >
              Open Instant AI Trip Route & Budget Planner →
            </Link>
          </div>
        </div>
      </section>

      {/* TOPIC CLUSTERS & RELATED GUIDES (INTERNAL LINKING STRATEGIST SKILL) */}
      <section className="py-12 md:py-16 bg-[#FAF8F5] border-b border-[#E8E4D9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
              Related Topic Clusters & Resources
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
              Explore Essential Sri Lanka Travel Planning Guides
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7365] mt-1">
              Curated by our on-the-ground travel specialists to assist your trip preparation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/sri-lanka-train-trip-planner"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] shadow-xs hover:shadow-md transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-[#1F3D2B]">
                <Train className="w-5 h-5 text-[#D4AF37]" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                Scenic Kandy to Ella Train Planner
              </h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Station-by-station guide, seat reservation timings, right vs left carriage panoramic viewpoints.
              </p>
            </Link>

            <Link
              to="/sri-lanka-tourist-drivers"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] shadow-xs hover:shadow-md transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-[#1F3D2B]">
                <Car className="w-5 h-5 text-[#D4AF37]" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                Private Tourist Chauffeur Guide
              </h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                How to hire verified English-speaking licensed drivers, realistic daily rates, and highway etiquette.
              </p>
            </Link>

            <Link
              to="/guide-to-flying-to-sri-lanka"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] shadow-xs hover:shadow-md transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-[#1F3D2B]">
                <Plane className="w-5 h-5 text-[#D4AF37]" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                Flights to Sri Lanka: Direct & Transit
              </h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Compare nonstop SriLankan flights from Heathrow against Qatar Airways and Emirates routes.
              </p>
            </Link>

            <Link
              to="/sri-lanka-family-itinerary"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] shadow-xs hover:shadow-md transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-[#1F3D2B]">
                <Luggage className="w-5 h-5 text-[#D4AF37]" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                Sri Lanka with Kids & Toddlers
              </h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Pacing tips for British families travelling during February half-term and the 6-week summer holidays.
              </p>
            </Link>

            <Link
              to="/things-never-to-overpay-for-in-sri-lanka"
              className="p-5 rounded-2xl bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] shadow-xs hover:shadow-md transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-[#1F3D2B]">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#1F3D2B] group-hover:text-[#D4AF37] transition-colors">
                Things Never to Overpay For
              </h3>
              <p className="text-xs text-[#5A5448] leading-relaxed">
                Avoid tourist traps, overpriced spice garden tours, and inflated airport transfers.
              </p>
            </Link>

            <Link
              to="/plan-my-trip"
              className="p-5 rounded-2xl bg-[#1F3D2B] text-white border border-[#1F3D2B] shadow-xs hover:shadow-md transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#D4AF37]">
                AI Route Builder & Dark Map
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Type your holiday dates and budget in GBP to generate an instant day-by-day feasibility schedule.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* UK TRAVELLER FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1F3D2B]">
            UK Travellers FAQ
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7365]">
            Everything British holidaymakers need to know before touching down in Colombo.
          </p>
        </div>

        <div className="space-y-3">
          {UK_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#E8E4D9] overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1F3D2B] hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-[#D4AF37]" : "text-[#7A7365]"
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#5A5448] leading-relaxed border-t border-[#E8E4D9]/40 bg-[#FAF8F5]/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 bg-[#1F3D2B] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
            Ready to Plan Your Dream Sri Lanka Holiday from the UK?
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Let our local licensed team customize your 10 to 14-day loop. We handle private chauffeured vehicles, handpicked boutique hotels, and sold-out train seats with complete financial transparency.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/plan-my-trip"
              className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#c49f2f] text-[#0d2235] text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <span>Launch Free AI Trip Planner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 fill-current" />
              <span>WhatsApp Our Sri Lanka Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
