import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  ArrowRight,
  Car,
  MessageCircle,
  Phone,
  Compass,
  MapPin,
  Users,
  Briefcase,
  HeartHandshake,
  Backpack,
  ShieldCheck,
  Gauge,
  HelpCircle,
  CheckCircle2,
  ListChecks,
  ClipboardCheck,
  KeyRound,
  Navigation,
  Sparkles
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

const WA_NUMBER = "94773269593";
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const TEL_LINK = "tel:+94773269593";

interface Vehicle {
  name: string;
  category: string;
  price100: string;
  price200: string;
  price300: string;
  deposit: string;
  extraKm: string;
}

const vehicles: Vehicle[] = [
  { name: "Audi A1", category: "Premium Hatchback", price100: "LKR 12,000", price200: "LKR 14,500", price300: "LKR 16,500", deposit: "LKR 50,000", extraKm: "LKR 65/km" },
  { name: "Honda Freed", category: "Family MPV", price100: "LKR 10,000", price200: "LKR 12,000", price300: "LKR 14,500", deposit: "LKR 45,000", extraKm: "LKR 55/km" },
  { name: "Honda GP5", category: "Compact Sedan", price100: "LKR 10,000", price200: "LKR 12,000", price300: "LKR 14,500", deposit: "LKR 45,000", extraKm: "LKR 55/km" },
  { name: "Suzuki Alto", category: "Economy Hatchback", price100: "LKR 5,000", price200: "LKR 6,000", price300: "LKR 7,500", deposit: "LKR 30,000", extraKm: "LKR 40/km" },
  { name: "Suzuki Wagon R", category: "Compact Hatchback", price100: "LKR 7,000", price200: "LKR 8,500", price300: "LKR 10,000", deposit: "LKR 40,000", extraKm: "LKR 45/km" },
  { name: "Honda Vezel", category: "Crossover SUV", price100: "LKR 11,000", price200: "LKR 12,500", price300: "LKR 15,000", deposit: "LKR 50,000", extraKm: "LKR 60/km" }
];

const faqs = [
  {
    q: "How much does it cost to rent a car in Sri Lanka?",
    a: "It depends on the vehicle. With Vacay Lanka, daily rental packages currently range from around LKR 5,000 (Suzuki Alto, 100km) up to LKR 16,500 (Audi A1, 300km), with a refundable security deposit and an extra-km rate on top. See the full price comparison table below for every model."
  },
  {
    q: "Can tourists rent a car in Sri Lanka?",
    a: "Yes, tourists can rent a car in Sri Lanka. Exact eligibility requirements (such as licence documentation) can vary by provider, so please confirm the specific requirements directly with Vacay Lanka when you check availability."
  },
  {
    q: "Can I self-drive a rental car in Sri Lanka?",
    a: "Self-drive rentals are available. Driving conditions vary a lot across the island — coastal roads are generally easier, while hill country routes are narrower and windier — so consider your comfort level with local driving conditions before booking. Confirm self-drive terms and conditions with Vacay Lanka."
  },
  {
    q: "What cars can I rent in Sri Lanka?",
    a: "Vacay Lanka's current lineup includes the Audi A1, Honda Freed, Honda GP5, Suzuki Alto, Suzuki Wagon R, and Honda Vezel — ranging from budget-friendly hatchbacks to more spacious family and premium options. If you need something else, additional vehicles may be available on request."
  },
  {
    q: "How much is the security deposit for a rental car?",
    a: "Security deposits vary by vehicle, ranging from LKR 30,000 for the Suzuki Alto up to LKR 50,000 for the Audi A1 and Honda Vezel. See the vehicle cards below for the exact deposit on each model."
  },
  {
    q: "Can I rent a car in Sri Lanka for a week?",
    a: "The rates shown here are structured as per-day distance packages (100km / 200km / 300km). For a full week or longer, contact Vacay Lanka directly to confirm availability and rental terms for your dates."
  },
  {
    q: "Is car rental suitable for a Sri Lanka road trip?",
    a: "Yes. Having your own vehicle gives you the flexibility to design your own route and stop wherever you like, which suits multi-stop road trips such as Colombo–Kandy–Ella or Colombo–Galle–Mirissa well. See our road trip ideas below."
  },
  {
    q: "Can I rent a car in Colombo?",
    a: "Yes, Vacay Lanka's car rental service is available for pickup arrangements around Colombo. Contact Vacay Lanka on WhatsApp or by phone to confirm pickup location and availability."
  }
];

export default function SrilankaCarRentalPage() {
  usePageMetadata({
    title: "Sri Lanka Car Rental | Self-Drive Cars & Rental Prices",
    description: "Sri Lanka car rental made simple — self-drive cars for tourists with transparent rental prices from LKR 5,000/day. Compare vehicles and check availability now.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-car-rental",
    ogUrl: "https://plan-srilanka.com/sri-lanka-car-rental",
    ogImage: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `car_rental_faq_${index}`);
  };

  const handleCtaClick = (label: string) => {
    trackEvent("car_rental_cta_click", "conversion", label);
  };

  const handleAvailabilityClick = (label: string) => {
    trackEvent("vehicle_availability_click", "conversion", label);
  };

  const handleWhatsAppClick = (label: string) => {
    trackEvent("car_rental_whatsapp_click", "conversion", label);
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  };

  const handlePhoneClick = (label: string) => {
    trackEvent("car_rental_phone_click", "conversion", label);
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      {/* SCHEMA: WebPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Sri Lanka Car Rental | Self-Drive Cars & Rental Prices",
          "description": "Sri Lanka car rental made simple — self-drive cars for tourists with transparent rental prices from LKR 5,000/day. Compare vehicles and check availability now.",
          "url": "https://plan-srilanka.com/sri-lanka-car-rental",
          "inLanguage": "en"
        })}
      </script>

      {/* SCHEMA: BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sri Lanka Car Rental", "item": "https://plan-srilanka.com/sri-lanka-car-rental" }
          ]
        })}
      </script>

      {/* SCHEMA: Service */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Car Rental",
          "name": "Sri Lanka Car Rental by Vacay Lanka",
          "description": "Self-drive and rental car service in Sri Lanka for tourists, with vehicles ranging from economy hatchbacks to premium models.",
          "areaServed": {
            "@type": "Country",
            "name": "Sri Lanka"
          },
          "provider": {
            "@type": "Organization",
            "name": "Vacay Lanka",
            "telephone": "+94773269593"
          }
        })}
      </script>

      {/* SCHEMA: FAQPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}
      </script>

      {/* BREADCRUMB (visual) */}
      <div className="max-w-7xl mx-auto px-6 mb-2">
        <nav aria-label="Breadcrumb" className="text-xs text-neutral-500 flex items-center gap-2">
          <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1e3a2f] font-semibold">Sri Lanka Car Rental</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="relative py-16 md:py-24 mt-6 overflow-hidden bg-[#1e3a2f] text-white rounded-[32px] mx-4 md:mx-6 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-6 md:px-10 relative space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mx-auto">
            <Car className="w-4 h-4" />
            Car Rental in Sri Lanka
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white leading-tight max-w-4xl mx-auto tracking-tight">
            Car Rental in Sri Lanka – Explore Sri Lanka Your Way
          </h1>

          <p className="text-sm md:text-lg text-[#a3bfae] font-light max-w-3xl mx-auto leading-relaxed">
            Rent a reliable vehicle and explore Sri Lanka at your own pace — from beaches and cultural cities to mountains, tea country and hidden villages.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#vehicles"
              onClick={() => handleAvailabilityClick("hero_cta")}
              className="px-6 py-3 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              Check Vehicle Availability <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`${WA_LINK}?text=${encodeURIComponent("Hi Vacay Lanka! I'd like to check car rental availability in Sri Lanka.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("hero_whatsapp")}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-xl border border-white/10 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* QUICK LINKS SUB-BAR */}
      <section className="bg-white border-b border-neutral-100 py-3 shadow-sm sticky top-[70px] z-30 overflow-x-auto scrollbar-none mt-6">
        <div className="max-w-7xl mx-auto px-6 flex gap-4 text-xs font-semibold whitespace-nowrap">
          <span className="text-neutral-400 self-center uppercase tracking-wider text-[10px]">Related Guides:</span>
          <Link to="/sri-lanka-trip-planner" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">🗺️ Trip Planner</Link>
          <Link to="/sri-lanka-trip-cost-from-india" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">💰 Trip Cost Guide</Link>
          <Link to="/sri-lanka-7-day-itinerary" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">📅 7-Day Itinerary</Link>
          <Link to="/private-driver-south-sri-lanka" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">🚙 Private Driver Guide</Link>
          <Link to="/sri-lanka-visa-for-indians" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">🛂 Visa Guide</Link>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">

        {/* WHY RENT A CAR */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
              <Compass className="w-6 h-6 text-[#d4af37]" />
              Why Rent a Car in Sri Lanka?
            </h2>
            <p className="mt-3 text-base text-neutral-700 font-light leading-relaxed">
              Sri Lanka is a small island packed with variety — beaches, ancient cities, tea-covered hills and quiet villages, often just a couple of hours apart. A rental car puts you in control of how you experience it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f] text-lg">
                <Gauge className="w-5 h-5 text-[#d4af37]" />
                Travel at Your Own Pace
              </div>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                No fixed tour schedules. Stop when you want and stay longer where you like.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f] text-lg">
                <Navigation className="w-5 h-5 text-[#d4af37]" />
                More Flexibility
              </div>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Explore beaches, mountains, cultural sites and smaller destinations more easily.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f] text-lg">
                <Users className="w-5 h-5 text-[#d4af37]" />
                Ideal for Different Travellers
              </div>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Suitable for solo travellers, couples, families and business travellers alike.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f] text-lg">
                <MapPin className="w-5 h-5 text-[#d4af37]" />
                Build Your Own Road Trip
              </div>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Connect multiple destinations without depending entirely on public transport schedules.
              </p>
            </div>
          </div>
        </section>

        {/* VEHICLE SECTION */}
        <section id="vehicles" className="space-y-8 scroll-mt-32">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
              <Car className="w-6 h-6 text-[#d4af37]" />
              Choose a Rental Car That Fits Your Journey
            </h2>
            <p className="mt-3 text-base text-neutral-700 font-light leading-relaxed">
              Sri Lanka car rental prices from Vacay Lanka, shown as daily distance packages. Prices are provided by the rental service and are subject to change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <div key={v.name} className="bg-white border border-neutral-100 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                <div className="h-32 bg-[#1e3a2f] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.2),transparent_60%)]" />
                  <Car className="w-14 h-14 text-[#d4af37]/80 relative" strokeWidth={1.2} />
                </div>
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">{v.name}</h3>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">{v.category}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center border-y border-neutral-100 py-3">
                    <div>
                      <div className="text-[10px] uppercase text-neutral-400 tracking-wide">100 km</div>
                      <div className="text-sm font-bold text-[#1e3a2f]">{v.price100}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-neutral-400 tracking-wide">200 km</div>
                      <div className="text-sm font-bold text-[#1e3a2f]">{v.price200}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-neutral-400 tracking-wide">300 km</div>
                      <div className="text-sm font-bold text-[#1e3a2f]">{v.price300}</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm text-neutral-600 font-light">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Security Deposit</span>
                      <span className="font-semibold text-[#1a2d24]">{v.deposit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-[#d4af37]" /> Extra km</span>
                      <span className="font-semibold text-[#1a2d24]">{v.extraKm}</span>
                    </div>
                  </div>

                  <a
                    href={`${WA_LINK}?text=${encodeURIComponent(`Hi Vacay Lanka! I'd like to check availability for the ${v.name} rental car.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAvailabilityClick(`vehicle_card_${v.name}`)}
                    className="mt-auto w-full text-center px-5 py-3 bg-[#1e3a2f] hover:bg-[#d4af37] hover:text-black text-white font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all"
                  >
                    Check Availability
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICE COMPARISON TABLE */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <ListChecks className="w-6 h-6 text-[#d4af37]" />
            Sri Lanka Car Rental Prices
          </h2>
          <p className="text-base text-neutral-700 font-light leading-relaxed max-w-3xl">
            A quick comparison of every model, so you can find the right fit for your budget and group size.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#1e3a2f]/10 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#1e3a2f]/10 bg-[#fdfaf2] text-[10px] sm:text-xs uppercase font-mono text-[#1e3a2f]">
                  <th className="p-4">Vehicle</th>
                  <th className="p-4 text-right">100 km</th>
                  <th className="p-4 text-right">200 km</th>
                  <th className="p-4 text-right">300 km</th>
                  <th className="p-4 text-right">Deposit</th>
                  <th className="p-4 text-right">Extra km</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {vehicles.map((v) => (
                  <tr key={v.name} className="hover:bg-[#fcfbf7] transition-colors">
                    <td className="p-4 font-semibold text-[#1e3a2f]">{v.name}</td>
                    <td className="p-4 text-right font-mono text-neutral-700">{v.price100}</td>
                    <td className="p-4 text-right font-mono text-neutral-700">{v.price200}</td>
                    <td className="p-4 text-right font-mono text-neutral-700">{v.price300}</td>
                    <td className="p-4 text-right font-mono text-neutral-700">{v.deposit}</td>
                    <td className="p-4 text-right font-mono text-neutral-700">{v.extraKm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* LOOKING FOR ANOTHER VEHICLE */}
        <section className="bg-white border border-[#d4af37]/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-sm text-center space-y-4">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1e3a2f]">
            Looking for Something Different?
          </h2>
          <p className="text-base text-neutral-700 font-light leading-relaxed max-w-2xl mx-auto">
            Vacay Lanka has additional vehicles available depending on travel requirements and budget.
          </p>
          <a
            href={`${WA_LINK}?text=${encodeURIComponent("Hi Vacay Lanka! Do you have any other vehicles available for rent besides the ones listed on your site?")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick("more_vehicles")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a2f] hover:bg-[#d4af37] hover:text-black text-white font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all"
          >
            Ask About More Vehicles <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* ROAD TRIP INSPIRATION */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#d4af37]" />
            Popular Sri Lanka Road Trips by Rental Car
          </h2>
          <p className="text-base text-neutral-700 font-light leading-relaxed max-w-3xl">
            Having your own rental car makes it easier to link these popular routes together on your own schedule, without waiting on public transport or fixed tour timings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
              <h3 className="font-serif font-bold text-[#1e3a2f]">Colombo → Kandy → Nuwara Eliya → Ella</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                A classic hill-country route through cultural landmarks, tea estates and mountain scenery. See our{" "}
                <Link to="/sri-lanka-7-day-itinerary" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">7-day itinerary</Link>{" "}
                for a sample route.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
              <h3 className="font-serif font-bold text-[#1e3a2f]">Colombo → Sigiriya → Kandy</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                A cultural triangle loop covering ancient rock fortresses and temple cities, with the freedom to stop at viewpoints along the way.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
              <h3 className="font-serif font-bold text-[#1e3a2f]">Colombo → Galle → Mirissa</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                A relaxed south coast run linking a UNESCO fort city with popular beach towns — great for stopping wherever the coastline looks good.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
              <h3 className="font-serif font-bold text-[#1e3a2f]">Colombo → Ella → Yala</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Combines hill-country scenery with a national park safari. Read our{" "}
                <Link to="/private-driver-south-sri-lanka" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">South Sri Lanka road trip guide</Link>{" "}
                for timing tips along a similar route.
              </p>
            </div>
          </div>
        </section>

        {/* WHO IS THIS FOR */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#d4af37]" />
            Who Is Self-Drive Car Rental Suitable For?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2 text-center">
              <HeartHandshake className="w-7 h-7 text-[#d4af37] mx-auto" />
              <h3 className="font-serif font-bold text-[#1e3a2f]">Couples</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Travel comfortably and create your own itinerary.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2 text-center">
              <Users className="w-7 h-7 text-[#d4af37] mx-auto" />
              <h3 className="font-serif font-bold text-[#1e3a2f]">Families</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Have more flexibility with luggage, children and stops.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2 text-center">
              <Backpack className="w-7 h-7 text-[#d4af37] mx-auto" />
              <h3 className="font-serif font-bold text-[#1e3a2f]">Solo Travellers</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Explore beyond the standard tourist route.
              </p>
            </div>
            <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2 text-center">
              <Briefcase className="w-7 h-7 text-[#d4af37] mx-auto" />
              <h3 className="font-serif font-bold text-[#1e3a2f]">Business Travellers</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Move between destinations without depending on fixed schedules.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-[#d4af37]" />
            How Sri Lanka Car Rental Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { icon: Car, title: "1. Choose Your Vehicle", desc: "Select a vehicle that fits your group and budget." },
              { icon: MessageCircle, title: "2. Check Availability", desc: "Contact the rental provider and confirm availability." },
              { icon: ClipboardCheck, title: "3. Confirm Your Rental", desc: "Review rental terms, deposit and applicable conditions." },
              { icon: KeyRound, title: "4. Start Exploring", desc: "Collect the vehicle and enjoy your trip across Sri Lanka." }
            ].map((step) => (
              <div key={step.title} className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#1e3a2f] flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <h3 className="font-serif font-bold text-[#1e3a2f] text-sm">{step.title}</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RENTAL REQUIREMENTS */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
            Rental Requirements &amp; Important Information
          </h2>
          <div className="p-6 md:p-8 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-3">
            <ul className="space-y-3 text-sm text-neutral-700 font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                Prices shown are subject to change.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                Terms and conditions apply.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                Vehicle availability is subject to confirmation.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                Security deposits and rental conditions depend on the selected vehicle.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                Additional charges may apply depending on rental requirements and agreed terms.
              </li>
            </ul>
            <p className="text-sm text-neutral-500 font-light leading-relaxed pt-2 border-t border-neutral-100">
              Details such as driving licence requirements, international driving permits, insurance coverage, age requirements, fuel policy and refund policy are not listed here — please confirm these directly with Vacay Lanka before booking.
            </p>
          </div>
        </section>

        {/* TRUST / RELATIONSHIP */}
        <section className="p-6 md:p-8 bg-[#fdfaf2] border border-[#d4af37]/20 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-[#1e3a2f] font-serif font-bold text-lg">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            About This Service
          </div>
          <p className="text-sm text-neutral-700 font-light leading-relaxed">
            Plan Sri Lanka connects travellers with trusted local partners for a smoother trip. This car rental service is operated by <strong>Vacay Lanka</strong>, a local rental provider — Plan Sri Lanka features this service to help you plan your trip, but the vehicles, availability and rental terms are managed directly by Vacay Lanka. Reach out to Vacay Lanka via WhatsApp or phone to check availability and confirm rental conditions.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#d4af37]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 mt-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#1e3a2f]/10 rounded-2xl bg-white overflow-hidden transition-all shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 bg-white hover:bg-neutral-50/50"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#1e3a2f]">{faq.q}</span>
                  <span className={`text-[#d4af37] font-bold text-xl transition-transform duration-300 ${activeFaq === idx ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-6 pt-0 border-t border-neutral-100 bg-[#fcfbf7]/50 text-sm text-neutral-700 font-light leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[#1e3a2f] text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-[#d4af37]/20 text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1),transparent_50%)]" />
          <div className="relative space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold flex items-center justify-center gap-2">
              <Car className="w-4 h-4" /> Ready When You Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Ready to Explore Sri Lanka Your Way?
            </h2>
            <p className="text-sm md:text-base text-[#a3bfae] font-light leading-relaxed">
              Choose a vehicle that fits your journey and budget, then contact Vacay Lanka to check availability and rental conditions.
            </p>
          </div>

          <div className="relative pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            <a
              href="#vehicles"
              onClick={() => handleCtaClick("final_availability")}
              className="px-8 py-4 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all"
            >
              Check Vehicle Availability
            </a>
            <a
              href={`${WA_LINK}?text=${encodeURIComponent("Hi Vacay Lanka! I'd like to check car rental availability in Sri Lanka.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("final_cta")}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Call / WhatsApp Vacay Lanka
            </a>
          </div>

          <a
            href={TEL_LINK}
            onClick={() => handlePhoneClick("final_phone")}
            className="relative inline-flex items-center gap-2 text-[#a3bfae] hover:text-[#d4af37] transition-colors text-sm font-mono pt-2"
          >
            <Phone className="w-4 h-4" /> 0094 77 326 9593
          </a>
        </section>

      </main>
    </div>
  );
}
