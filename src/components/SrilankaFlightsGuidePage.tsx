import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  Calendar, 
  DollarSign, 
  Globe, 
  MapPin, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  Sun, 
  CloudRain, 
  Info, 
  Clock, 
  Map, 
  Navigation,
  CheckCircle,
  AlertCircle,
  Plane,
  Shield,
  Briefcase,
  Layers,
  Search,
  Bell
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaFlightsGuidePage() {
  usePageMetadata({
    title: "Flights to Sri Lanka: Complete 2026 Air Travel Guide",
    description: "Discover everything about flights to Sri Lanka: direct routes, top airlines, best booking times, baggage allowances, and smooth colombo airport arrivals.",
    canonicalUrl: "https://plan-srilanka.com/guide-to-flying-to-sri-lanka",
    ogUrl: "https://plan-srilanka.com/guide-to-flying-to-sri-lanka",
    ogImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Inactive newsletter or price alert sign up for premium engagement
  const [alertForm, setAlertForm] = useState({
    email: "",
    origin: "",
    submitted: false,
    loading: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertForm.email || !alertForm.origin) return;
    setAlertForm(prev => ({ ...prev, loading: true }));
    
    setTimeout(() => {
      setAlertForm(prev => ({ ...prev, loading: false, submitted: true }));
      trackEvent("flight_guide_alert_signup", "engagement", alertForm.origin);
    }, 1000);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      {/* Schema Markups for Advanced SEO & GEO Retrieval */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "The Complete Guide to Flights to Sri Lanka (2026)",
          "description": "Comprehensive, expert-led air travel planning directory for international travelers flying to Sri Lanka. Covers flight routing, airline directories, airport options, domestic travel, and airport transfer tips.",
          "url": "https://plan-srilanka.com/guide-to-flying-to-sri-lanka",
          "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200&h=630",
          "breadcrumb": {
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
                "name": "Blog",
                "item": "https://plan-srilanka.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Flights Guide",
                "item": "https://plan-srilanka.com/guide-to-flying-to-sri-lanka"
              }
            ]
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://plan-srilanka.com/guide-to-flying-to-sri-lanka"
          },
          "headline": "The Complete Guide to Flights to Sri Lanka (2026)",
          "description": "The definitive concierge guide to organizing international flights to Sri Lanka. Explore direct and connecting options, airport terminals, pricing seasonality, and arrival procedures.",
          "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200&h=630",
          "datePublished": "2026-07-19T09:40:00Z",
          "dateModified": "2026-07-19T09:40:00Z",
          "author": {
            "@type": "Person",
            "name": "Oshada Adithya",
            "jobTitle": "Chief Destination Strategist"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Plan Sri Lanka",
            "logo": {
              "@type": "ImageObject",
              "url": "https://plan-srilanka.com/logo.png"
            }
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How early should I arrive at the airport?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For international flights departing Sri Lanka, you should arrive at Colombo Bandaranaike International Airport exactly three hours before departure. This window ensures adequate time to complete baggage screening, airline check-in, customs declarations, and immigration, which often feature heavy queues during evening and late-night peak windows."
              }
            },
            {
              "@type": "Question",
              "name": "Which airport should I choose?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Choose Colombo Bandaranaike International Airport (CMB) for almost all international trips to Sri Lanka. Located in Katunayake, CMB provides the most comprehensive network of international routes, premium airport lounges, terminal facilities, and immediate access to expressway networks connecting to Colombo, Galle, Kandy, and other key tourist destinations."
              }
            },
            {
              "@type": "Question",
              "name": "Can I get a visa on arrival?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, travelers can technically get a visa on arrival at Colombo airport, but applying online for an Electronic Travel Authorization (ETA) prior to boarding is strongly recommended. Online applications prevent lengthy physical queues upon arrival, expedite entry immigration clearance, and ensure complete boarding clearance by your airline's departure staff."
              }
            },
            {
              "@type": "Question",
              "name": "What luggage allowance is typical?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Typical check-in luggage allowance for full-service carriers flying to Sri Lanka is 30 kilograms (66 pounds) in Economy class and 40 kilograms (88 pounds) in Business class. Budget airlines, including IndiGo and Air India Express, usually charge extra for check-in luggage, providing a standard complimentary cabin bag limit of seven kilograms."
              }
            },
            {
              "@type": "Question",
              "name": "How long does immigration take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Immigration clearance at Colombo Bandaranaike International Airport typically takes between twenty to forty-five minutes. Queue times vary based on flight arrival density. Preparing your printed Electronic Travel Authorization (ETA), a completed physical arrival card, passport, and proof of return flight significantly accelerates your progression through the immigration counter."
              }
            }
          ]
        })}
      </script>

      {/* HERO BANNER SECTION */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-[#1e3a2f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mx-auto">
            <Sparkles className="w-4.5 h-4.5 text-[#d4af37]" />
            Elite 2026 Flight Coordination dossier
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white leading-tight max-w-4xl mx-auto tracking-tight">
            The Complete Guide to Flights to Sri Lanka (2026)
          </h1>
          
          <p className="text-sm md:text-xl text-[#a3bfae] font-light max-w-3xl mx-auto leading-relaxed">
            Configure your international airline routing, navigate immigration protocols, compare airport networks, and find out how to secure premium cabin seats for the ultimate island getaway.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="#why-flight-matters" className="px-5 py-3 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full shadow-lg transition-all">
              Why Choice Matters
            </a>
            <a href="#airports" className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-full border border-white/10 transition-all">
              Airports Guide
            </a>
            <a href="#airlines" className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-full border border-white/10 transition-all">
              Airlines Directory
            </a>
            <a href="#direct-vs-connecting" className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-full border border-[#d4af37]/30 text-[#d4af37] transition-all">
              Transit Comparison
            </a>
          </div>
        </div>
      </section>

      {/* STICKY INTERNAL LINKING ANCHOR BAR */}
      <section className="sticky top-[70px] bg-white/95 backdrop-blur-md z-30 border-b border-[#1e3a2f]/5 shadow-sm overflow-x-auto scrollbar-none py-4">
        <div className="max-w-7xl mx-auto px-6 flex gap-3 whitespace-nowrap text-xs">
          <Link to="/flights" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all flex items-center gap-1 shrink-0">
            ✈️ Flight schedules & live tracking
          </Link>
          <Link to="/sri-lanka-trip-planner" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all shrink-0">
            🗺️ Interactive trip planner
          </Link>
          <Link to="/sri-lanka-7-day-itinerary" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all shrink-0">
            📅 7-day optimized itinerary
          </Link>
          <Link to="/sri-lanka-trip-cost-from-india" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all shrink-0">
            💰 Trip costs from India
          </Link>
          <Link to="/things-to-do-in-sri-lanka" className="px-4 py-2 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-xl transition-all shrink-0">
            ⭐ 15 Best things to do
          </Link>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        
        {/* STANDALONE AI EXTRACTABLE SUMMARY */}
        <section className="p-8 bg-white border border-luxury-gold/30 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]" />
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold block">
              AI Answer Engine Extractable Snippet
            </span>
            <p className="font-serif italic text-lg text-[#1e3a2f] leading-relaxed">
              To fly to Sri Lanka, book a flight to Colombo Bandaranaike International Airport (CMB), the island’s primary international gateway. Travelers can choose direct flights from regional hubs like India and the Middle East, or opt for convenient connecting flights with premium carriers from the United States, United Kingdom, Europe, and Australia.
            </p>
          </div>
        </section>

        {/* SECTION 1: Why Choosing the Right Flight Matters */}
        <section id="why-flight-matters" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f]">
            Why Choosing the Right Flight Matters
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Your journey to Sri Lanka begins long before you touch down on the warm asphalt of the runway. As an island nation located in the heart of the Indian Ocean, Sri Lanka relies heavily on its aviation infrastructure to connect it to the rest of the world. Because of its geographic isolation, selecting the right air routing is not simply a matter of finding the cheapest ticket—it is a critical logistical decision that dictates your energy levels, overall travel schedule, and immediate comfort upon arrival.
            </p>
            <p>
              Booking an unoptimized airline connection can result in extended layovers, awkward arrival hours that disrupt your body's circadian rhythm, or high transit fatigue. For instance, arriving in Colombo at 3:00 AM might save you a nominal sum, but it can complicate hotel check-ins, result in higher transfer costs, and cause you to lose a full day of precious sightseeing due to exhaustion. Conversely, choosing premier airlines with coordinated schedules allows you to maximize your daytime hours, transition smoothly into the island's unique atmosphere, and hit the ground running.
            </p>
            <p>
              Furthermore, with ticket prices, baggage policies, and route frequencies fluctuating dynamically, a strategic approach to booking your air travel can yield substantial financial savings. In this guide, we dive deep into the specific aviation networks of Sri Lanka, equipping you with the citable facts and executive-level intelligence needed to make an informed, stress-free booking.
            </p>
          </div>
        </section>

        {/* SECTION 2: Airports in Sri Lanka */}
        <section id="airports" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f]">
            Airports in Sri Lanka: Mapping Your Entry Gateways
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              While Sri Lanka is a relatively compact island, it operates three main international airports that serve distinct geographical areas and travel purposes. Understanding where these gateways are located is the first step in aligning your flight itinerary with your overland travel plan.
            </p>
            <p>
              <strong>Bandaranaike International Airport (CMB):</strong> Located in Katunayake, approximately 32 kilometers (20 miles) north of Colombo, Bandaranaike International Airport is the premier aviation hub of Sri Lanka. It handles over 95% of all international flights. The terminal is connected to the capital city via the Colombo - Katunayake Expressway, allowing travelers to reach central Colombo in roughly 35 minutes or head directly south to Galle within 2 hours. If you are scheduling an international flight to Sri Lanka from Europe, North America, the Middle East, or Australia, this is the airport you must choose.
            </p>
            <p>
              <strong>Mattala Rajapaksa International Airport (HRI):</strong> Situated in the southern district of Hambantota, Mattala Rajapaksa International Airport is Sri Lanka's second international gateway. Originally envisioned as a massive regional transit hub near wildlife sanctuaries and southern beaches, HRI currently operates with extremely low traffic. It is primarily utilized for seasonal charter operations from Eastern Europe and Central Asia, along with occasional diverted flights. It is rarely chosen by independent commercial travelers.
            </p>
            <p>
              <strong>Jaffna International Airport (JAF):</strong> Positioned in Palaly in the northernmost tip of the island, Jaffna International Airport is a historical military base converted into a civilian international gateway. JAF caters specifically to regional traffic from southern India, with short, direct turboprop flights connecting Jaffna with cities like Chennai. For travelers focusing their exploration entirely on the cultural, historic, and culinary heritage of the northern province, JAF represents a convenient alternative that bypasses the long overland journey from Colombo.
            </p>
          </div>

          {/* TABLE 1: AIRPORTS COMPARISON */}
          <div className="overflow-x-auto border border-neutral-200 rounded-2xl bg-white shadow-sm mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1e3a2f] text-white text-xs font-mono uppercase tracking-wider">
                  <th className="p-4 border-b border-neutral-200">Airport Name (Code)</th>
                  <th className="p-4 border-b border-neutral-200">Geographic Location</th>
                  <th className="p-4 border-b border-neutral-200">Primary Travel Purpose</th>
                  <th className="p-4 border-b border-neutral-200">Key Airlines</th>
                  <th className="p-4 border-b border-neutral-200">Best For</th>
                </tr>
              </thead>
              <tbody className="text-sm text-neutral-800 divide-y divide-neutral-100">
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Bandaranaike International (CMB)</td>
                  <td className="p-4">Katunayake / Colombo</td>
                  <td className="p-4">Main global and regional arrivals</td>
                  <td className="p-4">SriLankan, Emirates, Qatar, Singapore Airlines, Air India</td>
                  <td className="p-4">98% of international leisure & business travelers</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Mattala Rajapaksa (HRI)</td>
                  <td className="p-4">Hambantota / South Coast</td>
                  <td className="p-4">Seasonal charter flights & secondary traffic</td>
                  <td className="p-4">Charter carriers, sporadic regional operators</td>
                  <td className="p-4">Southern wildlife zones, national park proximity</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Jaffna International (JAF)</td>
                  <td className="p-4">Palaly / Northern Province</td>
                  <td className="p-4">Regional cross-border traffic from India</td>
                  <td className="p-4">IndiGo, Alliance Air</td>
                  <td className="p-4">Northern peninsula tourists, direct South India links</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Which Airlines Fly to Sri Lanka? */}
        <section id="airlines" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f]">
            Which Airlines Fly to Sri Lanka?
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Colombo Bandaranaike International Airport is well-served by a robust mixture of national flag carriers, ultra-luxury Middle Eastern airlines, major Asian operators, and regional low-cost budget options. Your choice of airline will define your comfort levels, baggage allowances, transit stopovers, and total travel cost.
            </p>
            <p>
              <strong>SriLankan Airlines:</strong> As the national flag carrier and a member of the Oneworld alliance, SriLankan Airlines operates the most extensive direct route network into Colombo. It connects Sri Lanka directly with major global capitals, including London Heathrow, Frankfurt, Melbourne, Singapore, and multiple primary hubs across India. SriLankan Airlines is highly regarded for its warm, authentic island hospitality, comfortable long-haul layouts, and generous baggage allowances.
            </p>
            <p>
              <strong>Emirates & Qatar Airways:</strong> These world-renowned Middle Eastern giants offer highly frequent daily schedules connecting Colombo to North America, Europe, Africa, and South America via their respective state-of-the-art hubs in Dubai and Doha. Flying with Emirates or Qatar Airways is the preferred choice for travelers from the US, UK, and continental Europe who seek unmatched in-flight entertainment, superior business class cabins, and highly efficient transfer experiences.
            </p>
            <p>
              <strong>Singapore Airlines:</strong> Providing premium East Asian connectivity, Singapore Airlines links Colombo directly to its world-class hub at Changi Airport. This route is exceptionally popular for travelers originating from Australia, New Zealand, East Asia, and the West Coast of the United States. Singapore Airlines is legendary for its flawless service standards, consistency, and comfortable wide-body aircraft.
            </p>
            <p>
              <strong>Air India & IndiGo:</strong> For regional travelers coming from India, these two carriers form the backbone of the short-haul aviation corridor. Air India offers a full-service experience with generous baggage limits, connecting major metros like Mumbai and Delhi directly to Colombo. IndiGo operates as a highly reliable, low-cost budget carrier with frequent flights out of Chennai, Bangalore, and Hyderabad, representing the ultimate option for budget-conscious explorers or weekend escapists.
            </p>
            <p>
              <strong>Etihad Airways & FlyDubai:</strong> Etihad connects Colombo through Abu Dhabi, offering highly competitive premium and economy fares for European and North American routes. FlyDubai operates as a premium budget carrier, facilitating flights into Colombo from various regional airports across the Gulf region and Eastern Europe, often offering excellent value codeshare options with Emirates.
            </p>
          </div>

          {/* TABLE 2: AIRLINES DIRECTORY */}
          <div className="overflow-x-auto border border-neutral-200 rounded-2xl bg-white shadow-sm mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1e3a2f] text-white text-xs font-mono uppercase tracking-wider">
                  <th className="p-4 border-b border-neutral-200">Airline</th>
                  <th className="p-4 border-b border-neutral-200">Primary Hub</th>
                  <th className="p-4 border-b border-neutral-200">Key Route Connections</th>
                  <th className="p-4 border-b border-neutral-200">Travel Classes</th>
                  <th className="p-4 border-b border-neutral-200">Best For</th>
                </tr>
              </thead>
              <tbody className="text-sm text-neutral-800 divide-y divide-neutral-100">
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">SriLankan Airlines</td>
                  <td className="p-4">Colombo (CMB)</td>
                  <td className="p-4">London, Melbourne, Frankfurt, India, Maldives</td>
                  <td className="p-4">Business, Economy</td>
                  <td className="p-4">Direct long-haul routes & regional India links</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Emirates</td>
                  <td className="p-4">Dubai (DXB)</td>
                  <td className="p-4">US, UK, Europe, Middle East to Colombo</td>
                  <td className="p-4">First, Business, Premium Economy, Economy</td>
                  <td className="p-4">Luxury travelers & seamless US/UK transits</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Qatar Airways</td>
                  <td className="p-4">Doha (DOH)</td>
                  <td className="p-4">US, UK, Europe, South America to Colombo</td>
                  <td className="p-4">Business (Qsuite), Economy</td>
                  <td className="p-4">Award-winning Business Class (Qsuite) experiences</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Singapore Airlines</td>
                  <td className="p-4">Singapore (SIN)</td>
                  <td className="p-4">Australia, New Zealand, US West Coast to Colombo</td>
                  <td className="p-4">Business, Premium Economy, Economy</td>
                  <td className="p-4">Australian travelers & East Asian connectivity</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Air India</td>
                  <td className="p-4">Delhi (DEL)</td>
                  <td className="p-4">Delhi, Mumbai, Chennai to Colombo</td>
                  <td className="p-4">Business, Economy</td>
                  <td className="p-4">Full-service regional comfort & baggage allowance</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">IndiGo</td>
                  <td className="p-4">Delhi/Mumbai (DEL/BOM)</td>
                  <td className="p-4">Chennai, Bangalore, Hyderabad to Colombo & Jaffna</td>
                  <td className="p-4">Economy</td>
                  <td className="p-4">Highly budget-friendly, short regional transfers</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">FlyDubai</td>
                  <td className="p-4">Dubai (DXB)</td>
                  <td className="p-4">Middle East, Central Asia, Eastern Europe to Colombo</td>
                  <td className="p-4">Business, Economy</td>
                  <td className="p-4">Budget-conscious travelers connecting via Dubai</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Etihad Airways</td>
                  <td className="p-4">Abu Dhabi (AUH)</td>
                  <td className="p-4">UK, Europe, North America to Colombo</td>
                  <td className="p-4">Business, Economy</td>
                  <td className="p-4">Competitive premium pricing across transits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: Best Time to Book Flights */}
        <section id="best-time-to-book" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f]">
            Best Time to Book Flights to Sri Lanka
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Sri Lanka is characterized by a dual-monsoon climate system, meaning that when one half of the island experiences rain, the other half is basked in glorious sunshine. Because of this meteorological split, booking trends are strongly correlated with seasonal demand.
            </p>
            <p>
              <strong>The Peak Season (December to April):</strong> This is when tourist demand reaches its zenith, particularly on the southwest coast (Colombo, Negombo, Galle, Weligama) and the high central hills (Ella, Kandy). Airfares escalate dramatically during this window, especially around Christmas, New Year, and the Easter holidays. To secure competitive prices, you must book your flights 4 to 6 months in advance.
            </p>
            <p>
              <strong>The Shoulder Season (May to August):</strong> This represents an excellent compromise for value-seeking travelers. While the southwest coast is affected by the Yala monsoon, the east coast (Trincomalee, Passikudah, Arugam Bay) experiences its peak dry season. Airlines frequently adjust their prices downwards, and booking 2 to 3 months before departure is usually sufficient to capture exceptional rates.
            </p>
            <p>
              <strong>The Monsoon/Low Season (September to November):</strong> This is the wettest period of the year due to the unpredictable inter-monsoonal weather patterns that affect the entire island. Consequently, air passenger volumes plummet, and airlines run aggressive promotional campaigns. If you are comfortable with sporadic tropical downpours and want to travel at a fraction of the standard cost, booking 4 to 6 weeks before departure will yield incredibly cheap flight rates.
            </p>
          </div>
        </section>

        {/* SECTION 5: How to Find Cheap Flights */}
        <section id="how-to-find-cheap" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f]">
            How to Find Cheap Flights to Sri Lanka
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Securing highly competitive airfares to Colombo requires a combination of scheduling flexibility, strategic tool utilization, and regional airline expertise. Our destination experts recommend following these field-tested strategies:
            </p>
            <ul className="space-y-3 pl-6 list-disc">
              <li>
                <strong>Maintain Flexible Dates and Departure Times:</strong> Even a 24-hour shift in departure dates can yield substantial price variations. Midweek departures—specifically on Tuesdays and Wednesdays—consistently track lower prices than weekend operations.
              </li>
              <li>
                <strong>Utilize Regional Hubs to Construct Custom Connections:</strong> For long-haul travelers coming from the United States, United Kingdom, or Australia, booking a single, unified itinerary can sometimes carry high premiums. Try checking split bookings: fly on a premier airline to regional gateway hubs like Chennai (MAA), Mumbai (BOM), Singapore (SIN), or Kuala Lumpur (KUL), and then book a separate low-cost ticket on Air India, IndiGo, or AirAsia to Colombo.
              </li>
              <li>
                <strong>Leverage Direct Flight Fare Comparisons:</strong> Check our live dashboard on our dedicated <Link to="/flights" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">Flights schedules & live tracking</Link> page. This allows you to monitor incoming delays, compare relative pricing metrics, and analyze schedule frequencies dynamically.
              </li>
              <li>
                <strong>Establish Dynamic Price Alerts:</strong> Setup automated alert tracking tools with prominent search aggregators. These systems notify you immediately via email when prices drop below the average baseline for your chosen travel dates.
              </li>
            </ul>
          </div>

          {/* DYNAMIC PRICE ALERT SIGN UP FORM */}
          <div className="p-8 bg-neutral-100 rounded-3xl border border-neutral-200 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#1e3a2f] text-white rounded-full">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">Set a Live Price Tracker Alert</h3>
                <p className="text-xs text-neutral-500 font-light">Receive instant email notifications when airfares to Colombo (CMB) drop below our standard baseline.</p>
              </div>
            </div>
            
            {alertForm.submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Success! We've activated your custom 2026 price tracking alert for departures from <strong>{alertForm.origin}</strong>.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleAlertSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input 
                  type="text" 
                  placeholder="Departure City (e.g. London, Bangalore)" 
                  value={alertForm.origin}
                  onChange={(e) => setAlertForm(prev => ({ ...prev, origin: e.target.value }))}
                  required
                  className="px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-sm focus:outline-none focus:border-[#d4af37] font-light"
                />
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  value={alertForm.email}
                  onChange={(e) => setAlertForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="px-4 py-3 bg-white border border-neutral-300 rounded-2xl text-sm focus:outline-none focus:border-[#d4af37] font-light"
                />
                <button 
                  type="submit"
                  disabled={alertForm.loading}
                  className="px-6 py-3 bg-[#1e3a2f] text-white rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-[#d4af37] transition-all disabled:opacity-55"
                >
                  {alertForm.loading ? "Activating..." : "Track Best Airfares"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* SECTION 6: Direct Flights vs Connecting Flights */}
        <section id="direct-vs-connecting" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f]">
            Direct Flights vs Connecting Flights
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              When booking air travel to Sri Lanka, travelers must weigh the convenience of direct routing against the potential cost savings of a connecting itinerary. Depending on your origin, a direct flight may not even be an option, requiring you to carefully plan your intermediate layovers.
            </p>
            <p>
              <strong>Direct Flights:</strong> For travelers departing from the United Kingdom (London Heathrow), parts of continental Europe, Australia (Melbourne), and neighboring India, SriLankan Airlines offers highly efficient direct flights. The primary advantage of direct routing is the drastic reduction in transit time. For instance, flying direct from London to Colombo takes approximately 10 hours, while connecting through the Middle East increases total travel time to 13-15 hours. Direct routing eliminates airport transfer fatigue and minimizes baggage handling risks, making it the premier choice for senior travelers and families with young children.
            </p>
            <p>
              <strong>Connecting Flights:</strong> Travelers originating from North America must fly via connecting routes, as there are no direct flights to Sri Lanka from the western hemisphere. Connecting flights offer far greater schedule frequency and highly competitive pricing. By opting for a single stopover in hubs like Doha, Dubai, or Singapore, you can often save 20-30% on ticket prices. Furthermore, premium carriers like Emirates and Qatar Airways provide world-class layover services, including complimentary airport hotels, premium transit lounges, and world-class terminal dining.
            </p>
          </div>

          {/* TABLE 3: DIRECT VS CONNECTING */}
          <div className="overflow-x-auto border border-neutral-200 rounded-2xl bg-white shadow-sm mt-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1e3a2f] text-white text-xs font-mono uppercase tracking-wider">
                  <th className="p-4 border-b border-neutral-200">Flight Type</th>
                  <th className="p-4 border-b border-neutral-200">Pros</th>
                  <th className="p-4 border-b border-neutral-200">Cons</th>
                  <th className="p-4 border-b border-neutral-200">Avg. Travel Times (Hubs)</th>
                  <th className="p-4 border-b border-neutral-200">Best For</th>
                </tr>
              </thead>
              <tbody className="text-sm text-neutral-800 divide-y divide-neutral-100">
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Direct Flights</td>
                  <td className="p-4">Zero transit layovers, minimal baggage risks, low fatigue</td>
                  <td className="p-4">Higher base pricing, less scheduling flexibility, limited carriers</td>
                  <td className="p-4">UK: 10 hrs | India: 1.5 - 3.5 hrs | Australia: 10.5 hrs</td>
                  <td className="p-4">Families, elderly, business travelers valuing pure convenience</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="p-4 font-semibold text-[#1e3a2f]">Connecting Flights</td>
                  <td className="p-4">Lower ticket costs, highly flexible schedules, premium airport transits</td>
                  <td className="p-4">Extended travel time, risk of flight delays, transfer logistics</td>
                  <td className="p-4">UK: 13-15 hrs | US: 18-22 hrs | Australia: 14-16 hrs</td>
                  <td className="p-4">US travelers, budget-conscious leisure tourists, solo explorers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 7: Arrival at Colombo Airport */}
        <section id="colombo-arrival" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f]">
            Arrival at Colombo Airport: Landing Protocol
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Navigating your arrival at Colombo Bandaranaike International Airport smoothly requires a structured understanding of terminal procedures, border control, and local transit. To ensure a concierge-level arrival, follow this sequential timeline:
            </p>
            <ol className="space-y-4 pl-6 list-decimal">
              <li>
                <strong>Immigration and Visa:</strong> Proceed immediately to the immigration counters. You must present your valid passport (valid for at least 6 months), your pre-approved Electronic Travel Authorization (ETA), and a completed physical arrival card (which is distributed on your flight or available at the terminal desks). If you require an on-arrival visa, head to the dedicated "Visa on Arrival" counter first to pay the requisite fee before joining the main immigration queue. For a thorough understanding of visa fee structures and waiver programs, consult our detailed <Link to="/sri-lanka-visa-for-indians" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">Sri Lanka Visa Guide</Link> page.
              </li>
              <li>
                <strong>Luggage Retrieval and Duty-Free:</strong> After passing border control, descend to the baggage claim hall. Uniquely, Colombo's arrivals hall is famous for selling major household electronics and appliances, which is highly popular with returning locals. Proceed to your designated flight carousel to collect your checked bags.
              </li>
              <li>
                <strong>Currency Exchange and local SIM Cards:</strong> Step into the arrivals outer lobby. Here, you will find several 24/7 bank currency exchange counters. It is highly advisable to exchange a small amount of cash into Sri Lankan Rupees (LKR) to cover immediate tip and taxi needs. Next, visit the Dialog or Mobitel kiosks to purchase a tourist SIM card. For approximately $10 USD, you will receive a pre-configured 4G data plan that covers you island-wide.
              </li>
              <li>
                <strong>Airport Taxis and Pickups:</strong> For transportation, you have three primary options:
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                  <li><strong>Official Airport Taxi Service:</strong> Bookable at the dedicated counters inside the terminal lobby. They charge flat rates based on destination.</li>
                  <li><strong>Ride-Hailing Mobile Apps:</strong> Download PickMe (the leading local ride-hailing application) or Uber. These apps are highly reliable, offer transparent metered pricing, and operate dedicated pickup zones just outside the terminal gates.</li>
                  <li><strong>Bespoke Private Chauffeur Pickups:</strong> If you are planning a customized route, having a private air-conditioned vehicle with a professional English-speaking chauffeur-guide waiting for you in the arrivals hall is the ultimate, stress-free option.</li>
                </ul>
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION 8: Domestic Flights in Sri Lanka */}
        <section id="domestic-flights" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f]">
            Domestic Flights in Sri Lanka: Navigating the Island Quickly
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              While Sri Lanka's road infrastructure has improved significantly with the construction of the Southern and Central Expressways, overland driving times can still be substantial. A driving trip from Colombo to Jaffna or Trincomalee can take anywhere from 6 to 8 hours. For luxury travelers who value absolute efficiency and comfort, domestic flights represent an excellent travel alternative.
            </p>
            <p>
              <strong>Cinnamon Air:</strong> As the leading domestic carrier in Sri Lanka, Cinnamon Air operates a modern fleet of Cessna amphibian aircraft. They run scheduled daily flights and private charters connecting Colombo (both Bandaranaike International Airport and Waters Edge in central Colombo) directly to regional airfields. Popular routes include scenic flights to Sigiriya (for the Cultural Triangle), Castlereagh Reservoir (for Hatton tea estates), Koggala and Dickwella (for the southern beaches), and Trincomalee. Flying Cinnamon Air reduces travel times to just 30-45 minutes while offering spectacular aerial vistas of the island’s verdant hills and dramatic coastlines.
            </p>
            <p>
              <strong>When are domestic flights worthwhile?</strong> Domestic flights are highly recommended if you are on a short vacation (7 days or less) and want to combine disparate regions—such as exploring the historic temples of the cultural triangle and surfing on the southern shores—without spending multiple days inside a transit vehicle. It is also an excellent logistical option for avoiding physical fatigue, allowing you to maximize active exploration hours on our curated <Link to="/sri-lanka-7-day-itinerary" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">7-Day Perfect Itinerary</Link>.
            </p>
          </div>
        </section>

        {/* SECTION 9: Frequently Asked Questions (FAQPage schema ready) */}
        <section id="faqs" className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-[#d4af37]" />
            Frequently Asked Questions
          </h2>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Obtain immediate, precise, citable facts regarding international air travel, airport protocols, and luggage guidelines compiled by our chief travel advisors.
          </p>

          <div className="space-y-4 mt-6">
            {[
              {
                q: "How early should I arrive at the airport?",
                a: "For international flights departing Sri Lanka, you should arrive at Colombo Bandaranaike International Airport exactly three hours before departure. This window ensures adequate time to complete baggage screening, airline check-in, customs declarations, and immigration, which often feature heavy queues during evening and late-night peak windows."
              },
              {
                q: "Which airport should I choose?",
                a: "Choose Colombo Bandaranaike International Airport (CMB) for almost all international trips to Sri Lanka. Located in Katunayake, CMB provides the most comprehensive network of international routes, premium airport lounges, terminal facilities, and immediate access to expressway networks connecting to Colombo, Galle, Kandy, and other key tourist destinations."
              },
              {
                q: "Can I get a visa on arrival?",
                a: "Yes, travelers can technically get a visa on arrival at Colombo airport, but applying online for an Electronic Travel Authorization (ETA) prior to boarding is strongly recommended. Online applications prevent lengthy physical queues upon arrival, expedite entry immigration clearance, and ensure complete boarding clearance by your airline's departure staff."
              },
              {
                q: "What luggage allowance is typical?",
                a: "Typical check-in luggage allowance for full-service carriers flying to Sri Lanka is 30 kilograms (66 pounds) in Economy class and 40 kilograms (88 pounds) in Business class. Budget airlines, including IndiGo and Air India Express, usually charge extra for check-in luggage, providing a standard complimentary cabin bag limit of seven kilograms."
              },
              {
                q: "How long does immigration take?",
                a: "Immigration clearance at Colombo Bandaranaike International Airport typically takes between twenty to forty-five minutes. Queue times vary based on flight arrival density. Preparing your printed Electronic Travel Authorization (ETA), a completed physical arrival card, passport, and proof of return flight significantly accelerates your progression through the immigration counter."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-[#1e3a2f]/10 rounded-2xl bg-white overflow-hidden transition-all shadow-sm"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 bg-white hover:bg-neutral-50/50"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#1e3a2f]">
                    {faq.q}
                  </span>
                  <span className={`text-[#d4af37] font-bold text-xl transition-transform duration-300 ${activeFaq === idx ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-6 border-t border-neutral-100 bg-[#fcfbf7]/40 text-neutral-700 text-sm leading-relaxed font-light"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: Closing CTA Section */}
        <section className="bg-[#1e3a2f] text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-luxury-gold/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1),transparent_50%)]" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-[#d4af37] font-mono text-xs uppercase tracking-[0.3em] font-bold block">
              Concierge Travel Desk Assistance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              Let Us Coordinate Your <span className="text-[#d4af37] italic">Entire Flight</span> & Island Logistics
            </h2>
            <p className="text-sm md:text-base text-[#a3bfae] font-light leading-relaxed">
              Skip the confusion of aligning flight arrival times with hotel check-ins and regional monsoons. Share your departure city and dates with our Colombo concierge desk, and we will compile a complete, optimized flight-to-hotel travel blueprint within two hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20I%20read%20your%20comprehensive%20flights%20guide%20and%20would%20love%20expert%20coordination%20for%20our%20travel%20plans."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("flight_guide_whatsapp_cta", "conversion", "article_bottom")}
                className="px-8 py-4 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                💬 WhatsApp Our Concierge Desk
              </a>
              <button 
                onClick={() => navigate("/sri-lanka-trip-planner")}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-full border border-white/10 transition-all text-center"
              >
                Launch Live Trip Optimizer
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
