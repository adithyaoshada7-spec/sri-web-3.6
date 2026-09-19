import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ShieldCheck, 
  Car, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  Award, 
  Wifi, 
  Coffee, 
  Users, 
  HelpCircle,
  ChevronDown,
  Sparkles,
  Info
} from "lucide-react";

interface Driver {
  id: string;
  name: string;
  licenseNo: string;
  experienceYears: number;
  languages: string[];
  vehicle: string;
  vehicleType: "Sedan" | "Luxury SUV" | "High-Roof Van";
  rating: number;
  totalTrips: number;
  photo: string;
  vehiclePhoto: string;
  startingPricePerDay: string;
  bio: string;
  features: string[];
  recommendedFor: string;
  whatsappNumber?: string;
}

const DRIVERS_LIST: Driver[] = [
  {
    id: "driver-ben-tours",
    name: "BEN Tours & Travels Sri Lanka",
    licenseNo: "SLTDA Certified Fleet",
    experienceYears: 14,
    languages: ["English", "Hindi", "Sinhala"],
    vehicle: "Toyota Allion Premier (AC Sedan)",
    vehicleType: "Sedan",
    rating: 4.98,
    totalTrips: 340,
    photo: "/BEN-tours-&-travels-sri-lanka.jpg",
    vehiclePhoto: "/BEN-tours-&-travels-sri-lanka.jpg",
    startingPricePerDay: "$55 / day",
    bio: "Premier Sri Lanka tourist chauffeur & fleet agency with over 14 years serving international couples and small families. Expert on island routes, mountain curves, and bespoke sightseeing.",
    features: ["Free Wi-Fi Hotspot", "Cold Bottled Water", "Child Safety Seat Available", "Unlimited Tolls Included"],
    recommendedFor: "Couples & Small Families (1-3 Passengers)",
    whatsappNumber: "94766031721"
  },
  {
    id: "driver-rashika",
    name: "Rashika Mahesh",
    licenseNo: "SLTDA / V-9104",
    experienceYears: 11,
    languages: ["English", "Tamil", "Sinhala"],
    vehicle: "Toyota HiAce Super GL (High-Roof Luxury Van)",
    vehicleType: "High-Roof Van",
    rating: 4.95,
    totalTrips: 285,
    photo: "/Rashika-Mahesh.jpg",
    vehiclePhoto: "/Rashika-Mahesh.jpg",
    startingPricePerDay: "$75 / day",
    bio: "Spacious luxury van chauffeur specializing in group trips, multi-generational families, and heavy luggage transfers. Known for smooth driving and excellent restaurant tips across the island.",
    features: ["Dual AC Units", "Reclining Captain Seats", "Luggage Roof Rack", "Free Onboard Refreshments"],
    recommendedFor: "Families & Groups (4-8 Passengers)"
  },
  {
    id: "driver-kasun",
    name: "Kasun Sameera",
    licenseNo: "SLTDA / S-3059",
    experienceYears: 9,
    languages: ["English", "German", "Sinhala"],
    vehicle: "Toyota Land Cruiser Prado 4x4 (Luxury SUV)",
    vehicleType: "Luxury SUV",
    rating: 4.99,
    totalTrips: 210,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    vehiclePhoto: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600&h=380",
    startingPricePerDay: "$95 / day",
    bio: "Premium 4WD luxury chauffeur for travelers seeking high-end comfort, off-the-beaten-path exploration, and safari sanctuary transfers. Fully fluent in German & English.",
    features: ["Leather Interior", "High Ground Clearance 4WD", "Premium Sound System", "Airport VIP Pick-up"],
    recommendedFor: "VIP Travel & Luxury Couples"
  }
];

export default function SrilankaTouristDriversPage() {
  usePageMetadata({
    title: "Licensed Tourist Drivers & Private Chauffeurs in Sri Lanka | Verified Rates",
    description: "Book verified, English-speaking tourist driver-guides in Sri Lanka. View licensed driver profiles, transparent daily vehicle rates, fuel, toll inclusions, and WhatsApp instant booking.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-tourist-drivers",
    ogUrl: "https://plan-srilanka.com/sri-lanka-tourist-drivers"
  });

  const [selectedType, setSelectedType] = useState<string>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredDrivers = selectedType === "All" 
    ? DRIVERS_LIST 
    : DRIVERS_LIST.filter(d => d.vehicleType === selectedType);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-[#1e3a2f] font-sans pt-24 md:pt-28">
      {/* HERO SECTION */}
      <section className="bg-[#1e3a2f] text-white py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> 100% SLTDA Certified Tourist Chauffeurs
          </div>
          
          <h1 className="text-3xl md:text-6xl font-serif text-white leading-tight">
            Verified Tourist Drivers & <br />
            <span className="italic text-[#d4af37]">Private Vehicles in Sri Lanka</span>
          </h1>

          <p className="text-sm md:text-base text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            Skip untrustworthy taxi apps and stressful mountain roads. Browse our curated directory of licensed, background-checked tourist drivers. All daily quotes include gasoline, expressway tolls, parking fees, and driver lodging.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-mono">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> All Tolls & Gas Included</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> English-Speaking Guides</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Clean Modern AC Fleet</span>
          </div>
        </div>
      </section>

      {/* FILTER & DRIVERS LISTING SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#1e3a2f]/10 pb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f]">
              Available Private Chauffeurs & Vehicles
            </h2>
            <p className="text-xs text-[#3a4d44] font-light mt-1">
              Select a vehicle type to filter experienced drivers for your island itinerary.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["All", "Sedan", "High-Roof Van", "Luxury SUV"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                  selectedType === type
                    ? "bg-[#1e3a2f] text-[#d4af37] shadow-md"
                    : "bg-white border border-[#1e3a2f]/15 text-[#1e3a2f] hover:border-[#d4af37]"
                }`}
              >
                {type} {type === "All" ? `(${DRIVERS_LIST.length})` : ""}
              </button>
            ))}
          </div>
        </div>

        {/* DRIVERS CARDS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-white border border-[#1e3a2f]/10 rounded-[28px] overflow-hidden hover:border-[#d4af37] transition-all flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Vehicle Header Image */}
                <div className="relative h-44 overflow-hidden bg-neutral-100">
                  <img
                    src={driver.vehiclePhoto}
                    alt={driver.vehicle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#1e3a2f]/90 text-[#d4af37] px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                    {driver.vehicleType}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 text-[#1e3a2f] px-3 py-1 rounded-full text-[11px] font-bold font-mono shadow">
                    ⭐ {driver.rating} ({driver.totalTrips} Trips)
                  </div>
                </div>

                {/* Driver Profile Header */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#d4af37]"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-1.5">
                        {driver.name}
                        <Award className="w-4 h-4 text-[#d4af37]" />
                      </h3>
                      <p className="text-[11px] text-[#3a4d44] font-mono">
                        {driver.licenseNo} • {driver.experienceYears} Years Exp.
                      </p>
                      <p className="text-[10px] text-[#d4af37] font-bold uppercase tracking-wider mt-0.5">
                        Languages: {driver.languages.join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* Vehicle Name */}
                  <div className="bg-[#fcfbf7] p-3 rounded-xl border border-[#1e3a2f]/5 flex items-center gap-2 text-xs font-semibold text-[#1e3a2f]">
                    <Car className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{driver.vehicle}</span>
                  </div>

                  <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                    "{driver.bio}"
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 pt-2 border-t border-[#1e3a2f]/10">
                    <span className="text-[10px] uppercase font-mono font-bold text-[#d4af37] block">
                      Included Inclusions:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#3a4d44] font-light">
                      {driver.features.map((feat, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer / CTA */}
              <div className="p-6 bg-[#fcfbf7] border-t border-[#1e3a2f]/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono uppercase text-[#3a4d44]">Est. Daily Rate:</span>
                  <span className="font-serif font-bold text-lg text-[#1e3a2f]">{driver.startingPricePerDay}</span>
                </div>

                <a
                  href={`https://wa.me/${driver.whatsappNumber || "94722968210"}?text=Hi!%20I'm%20interested%20in%20booking%20driver%20${encodeURIComponent(driver.name)}%20(${encodeURIComponent(driver.vehicle)}).%20Please%20share%20availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center justify-center gap-2 w-full py-3 bg-[#1e3a2f] text-[#d4af37] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#d4af37] hover:text-[#1e3a2f] transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Check Driver Availability
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BOOK PRIVATE DRIVER SECTION */}
      <section className="py-16 px-4 md:px-8 bg-white border-y border-[#1e3a2f]/5">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
              Transparent Pricing & Safety
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              Why Hire a Private Tourist Driver in Sri Lanka?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3 bg-[#fcfbf7] p-6 rounded-2xl border border-[#1e3a2f]/5">
              <div className="w-10 h-10 rounded-xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">No Hidden Expenses</h3>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                All daily quotes include vehicle fuel, express highway tolls, parking fees, and driver food/board. You pay zero extra surcharges.
              </p>
            </div>

            <div className="space-y-3 bg-[#fcfbf7] p-6 rounded-2xl border border-[#1e3a2f]/5">
              <div className="w-10 h-10 rounded-xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">Mountain Curve Safety</h3>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                Sri Lanka's hill country roads (Kandy, Nuwara Eliya, Ella) feature steep hairpin turns. Experienced local drivers ensure total peace of mind.
              </p>
            </div>

            <div className="space-y-3 bg-[#fcfbf7] p-6 rounded-2xl border border-[#1e3a2f]/5">
              <div className="w-10 h-10 rounded-xl bg-[#1e3a2f] text-[#d4af37] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1e3a2f]">Luggage Transfer Convenience</h3>
              <p className="text-xs text-[#3a4d44] leading-relaxed font-light">
                Send heavy bags safely ahead in your private vehicle while you ride the famous scenic Kandy-Ella train hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold block">
            Got Questions?
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
            Tourist Driver FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "What is included in the daily driver rate?",
              a: "Our rates include the private air-conditioned vehicle, professional English-speaking driver-guide, all gasoline/fuel, highway toll fees, parking tickets, and the driver's daily meals and accommodation. There are no mandatory hidden extras."
            },
            {
              q: "Do I need to arrange accommodation for my driver?",
              a: "No! Most tourist hotels and resorts in Sri Lanka provide complimentary driver quarters and staff meals. If staying at an Airbnb or boutique guesthouse without driver rooms, the driver accommodation fee is already covered in your booking quote."
            },
            {
              q: "How much should I tip my tourist driver?",
              a: "Tipping is discretionary but customary for good service. The standard tip for a private driver-guide in Sri Lanka is $10 to $15 USD (approx. 3,000 to 4,500 LKR) per day for your entire group."
            },
            {
              q: "Can the driver stop at fruit stalls or viewpoints along the route?",
              a: "Absolutely! Your driver is dedicated solely to your party. You can request stops anytime for fresh king coconuts, photography viewpoints, herbal gardens, or local dining spots."
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#1e3a2f]/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left font-serif font-bold text-base text-[#1e3a2f] flex justify-between items-center gap-4 hover:text-[#d4af37] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#d4af37] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs text-[#3a4d44] leading-relaxed font-light border-t border-[#1e3a2f]/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CONCIERGE CTA BANNER */}
      <section className="bg-[#1e3a2f] text-white py-16 px-4 md:px-8 text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-4xl font-serif text-white">
            Need a Custom Route or Group Van?
          </h2>
          <p className="text-xs md:text-sm text-white/80 font-light leading-relaxed">
            Send your travel dates and passenger count to our Colombo concierge desk. We will match you with the perfect licensed driver within 2 hours.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/94722968210?text=Hi!%20I'd%20like%20to%20get%20a%20custom%20quote%20for%20a%20private%20driver%20in%20Sri%20Lanka."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d4af37] text-[#1e3a2f] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-xl"
            >
              Chat With Concierge Desk On WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
