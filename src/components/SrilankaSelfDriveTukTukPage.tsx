import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  ArrowRight,
  MapPin,
  Clock,
  Car,
  Utensils,
  Sparkles,
  Calendar,
  Info,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  AlertTriangle,
  Heart,
  Users,
  Palmtree,
  Check,
  Compass,
  ShieldCheck,
  DollarSign,
  Sun,
  Send,
  Smartphone,
  Share2,
  Award,
  Zap,
  Luggage,
  Navigation,
  Star,
  Fuel,
  Wrench,
  Radio,
  FileCheck,
  Shield,
  MessageCircle,
  ExternalLink,
  LifeBuoy,
  BadgePercent,
  CheckCheck
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface FaqItem {
  q: string;
  a: string;
}

export default function SrilankaSelfDriveTukTukPage() {
  usePageMetadata({
    title: "Self-Drive Tuk-Tuk in Sri Lanka (2026): Rules, Permits, Safety & Partner Booking",
    description: "Everything you must know before driving a Tuk-Tuk in Sri Lanka: AAC license permits, 40 km/h rules, insurance, mountain safety, and verified rentals powered by tuktukrental.com.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-self-drive-tuk-tuk-rental-guide",
    ogUrl: "https://plan-srilanka.com/sri-lanka-self-drive-tuk-tuk-rental-guide",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
    ogType: "article"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive Rental Pricing Calculator
  const [calcRentalDays, setCalcRentalDays] = useState<number>(13);
  const [calcTukTuks, setCalcTukTuks] = useState<number>(1);
  const [calcPickup, setCalcPickup] = useState<string>("Negombo (Near CMB Airport)");
  const [calcDropoff, setCalcDropoff] = useState<string>("Negombo (Near CMB Airport)");
  const [calcNeedPermit, setCalcNeedPermit] = useState<boolean>(true);
  const [calcFullInsurance, setCalcFullInsurance] = useState<boolean>(true);
  const [calcSurfRacks, setCalcSurfRacks] = useState<boolean>(false);
  const [calcCurrency, setCalcCurrency] = useState<"USD" | "INR">("USD");

  // Lead capture state
  const [userName, setUserName] = useState<string>("");
  const [userWhatsApp, setUserWhatsApp] = useState<string>("");
  const [userTravelMonth, setUserTravelMonth] = useState<string>("October 2026");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `tuktuk_rules_faq_${index}`);
  };

  // Pricing calculation in USD and INR
  const calculateTotal = () => {
    // Base daily rate: $17/day (discounts for longer rentals)
    let dailyRate = 17;
    if (calcRentalDays >= 14) dailyRate = 15;
    else if (calcRentalDays <= 5) dailyRate = 20;

    const baseRentalUSD = dailyRate * calcRentalDays * calcTukTuks;
    const permitFeeUSD = calcNeedPermit ? 40 * calcTukTuks : 0;
    const insuranceFeeUSD = calcFullInsurance ? 3 * calcRentalDays * calcTukTuks : 0;
    const surfRacksUSD = calcSurfRacks ? 15 * calcTukTuks : 0;
    const relocationUSD = calcPickup !== calcDropoff ? 30 * calcTukTuks : 0;

    const grandTotalUSD = baseRentalUSD + permitFeeUSD + insuranceFeeUSD + surfRacksUSD + relocationUSD;
    const inrRate = 84.5;
    const grandTotalINR = Math.round(grandTotalUSD * inrRate);

    return {
      dailyRate,
      baseRentalUSD,
      permitFeeUSD,
      insuranceFeeUSD,
      surfRacksUSD,
      relocationUSD,
      grandTotalUSD,
      grandTotalINR
    };
  };

  const totals = calculateTotal();

  // WhatsApp Booking Handler with Partner attribution
  const handleWhatsAppBooking = (origin: string) => {
    trackEvent("tuktuk_partner_whatsapp_click", "conversion", origin);

    const priceString = calcCurrency === "USD" 
      ? `$${totals.grandTotalUSD} USD (~₹${totals.grandTotalINR.toLocaleString("en-IN")})`
      : `₹${totals.grandTotalINR.toLocaleString("en-IN")} INR (~$${totals.grandTotalUSD} USD)`;

    const text = [
      `🛺 *SELF-DRIVE SRI LANKA TUK-TUK BOOKING (TukTukRental.com Partner)*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${userName || "Traveler"}`,
      `📱 *WhatsApp:* ${userWhatsApp || "Not provided"}`,
      `📅 *Travel Dates:* ${userTravelMonth}`,
      `⏱️ *Duration:* ${calcRentalDays} Days`,
      `🛺 *Vehicles:* ${calcTukTuks} Tuk-Tuk(s)`,
      `📍 *Pick-Up:* ${calcPickup}`,
      `📍 *Drop-Off:* ${calcDropoff}`,
      `📄 *AAC Driving Permit:* ${calcNeedPermit ? "Yes, please process ($40)" : "Already have permit"}`,
      `🛡️ *Comprehensive Insurance:* ${calcFullInsurance ? "Yes ($0 Excess)" : "Standard"}`,
      `🏄 *Surfboard Racks:* ${calcSurfRacks ? "Yes (+$15)" : "No"}`,
      `💰 *Estimated Total:* ${priceString}`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `Please confirm vehicle availability, driving lesson slot, and booking deposit details.`
    ].join("\n");

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/94722968210?text=${encoded}`, "_blank");
  };

  const faqs: FaqItem[] = [
    {
      q: "Can foreigners legally drive a Tuk-Tuk in Sri Lanka?",
      a: "Yes! Foreign tourists can legally drive a tuk-tuk in Sri Lanka, provided they obtain a Sri Lankan Driving Permit endorsement from the Automobile Association of Ceylon (AAC). An ordinary International Driving Permit (IDP) or home country license alone is not legally valid without this official endorsement. Through our partner tuktukrental.com, your AAC endorsement is prepared in advance so you can legally hit the road upon arrival."
    },
    {
      q: "What is the speed limit and road rules for Tuk-Tuks in Sri Lanka?",
      a: "By Sri Lankan law, three-wheelers have a maximum speed limit of 40 km/h across all normal roads and towns. Tuk-tuks are strictly forbidden on expressways (E-class highways like E01 and E02). Traffic moves on the left side. Helmets are not required inside a tuk-tuk, but all passengers must remain seated and luggage must be safely secured in the rear boot."
    },
    {
      q: "What documents are required to get the Sri Lanka AAC Tuk-Tuk permit?",
      a: "You need: 1) A clear photo of your regular national driver's license (which permits car driving in your home country), 2) A copy of your International Driving Permit (IDP) or national license, 3) Your passport bio page, and 4) A clear passport-style selfie. You can submit these online before your trip, and your physical permit will be ready at pickup."
    },
    {
      q: "How does tuktukrental.com support local Sri Lankan families?",
      a: "tuktukrental.com operates on a sustainable community-ownership model. Rather than maintaining a giant corporate fleet, they rent authentic tuk-tuks directly from local Sri Lankan families who have surplus vehicles or rely on seasonal income. Local owners receive fair, consistent rental payments, giving your holiday a direct positive social impact."
    },
    {
      q: "Is it difficult to learn how to drive a manual Tuk-Tuk?",
      a: "Most travelers get comfortable within 30 to 45 minutes! A standard Bajaj RE tuk-tuk has a handlebar twist throttle, a hand clutch, a left-hand twist 4-speed gear shifter, and a right-foot brake pedal. Every rental includes a dedicated 1-on-1 practical driving lesson with a certified local instructor in Negombo before you begin your journey."
    },
    {
      q: "What happens if the Tuk-Tuk breaks down on the road?",
      a: "Sri Lanka has over 1.2 million tuk-tuks on the road, meaning every town, village, and highway has expert mechanics and readily available spare parts. Your rental includes 24/7 islandwide WhatsApp mechanical support. If a major breakdown occurs that cannot be repaired locally within a few hours, a replacement tuk-tuk is dispatched immediately."
    },
    {
      q: "Can I drive a Tuk-Tuk through mountain areas like Nuwara Eliya and Ella?",
      a: "Yes! Tuk-tuks easily handle hill country inclines like Kandy, Nuwara Eliya, and Ella in 1st and 2nd gear. The critical rule is downhill driving: never shift into neutral or coast on brakes alone. Always use low-gear engine braking (2nd gear) to prevent brake pads from overheating."
    },
    {
      q: "How much luggage can fit in a self-drive Tuk-Tuk?",
      a: "A standard tuk-tuk comfortably fits 2 adults plus 2 large backpacks / medium suitcases in the rear luggage shelf, with room for daypacks under the seat or by your feet. If traveling with surfboards, custom roof-mounted foam racks are available."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#E5D5B8] selection:text-[#1A1A1A]">
      
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <header className="relative pt-12 pb-14 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#E8E4D9]">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#7A7365]">
            <li>
              <Link to="/" className="hover:text-[#1F3D2B] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/sri-lanka-13-day-tuk-tuk-itinerary" className="hover:text-[#1F3D2B] transition-colors">
                13-Day Tuk-Tuk Itinerary
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#1F3D2B] font-bold" aria-current="page">
              Self-Drive Tuk-Tuk Rules & Guide
            </li>
          </ol>
        </nav>

        {/* Verified Partnership Badge */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3ED] text-[#1F3D2B] text-xs font-bold uppercase tracking-wider mb-5 border border-[#C5DAC9]">
          <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
          <span>Official Partner Guide • Powered by TukTukRental.com</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F3D2B] tracking-tight leading-[1.15] mb-6">
          Self-Drive Tuk-Tuk in Sri Lanka (2026): Rules, Permits, Safety & Partner Booking
        </h1>

        <p className="text-lg sm:text-xl text-[#4A453A] leading-relaxed max-w-3xl mb-8 font-sans">
          Driving your own three-wheeler across Sri Lanka is the ultimate tropical road trip adventure. Before taking the wheel, explore the essential <strong>Sri Lanka Tuk-Tuk driving rules</strong>, AAC license permit endorsement, highway restrictions, hill country techniques, and verified rentals via our partner <strong>tuktukrental.com</strong>.
        </p>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-[#5A5448]">
          <div className="bg-white p-3.5 rounded-xl border border-[#E8E4D9] text-center">
            <span className="text-[10px] text-[#7A7365] block uppercase">Speed Limit</span>
            <strong className="text-sm font-bold text-[#1F3D2B]">40 km/h Max</strong>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E8E4D9] text-center">
            <span className="text-[10px] text-[#7A7365] block uppercase">Driving Permit</span>
            <strong className="text-sm font-bold text-[#1F3D2B]">AAC Endorsement</strong>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E8E4D9] text-center">
            <span className="text-[10px] text-[#7A7365] block uppercase">Traffic Side</span>
            <strong className="text-sm font-bold text-[#1F3D2B]">Drive on Left</strong>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#E8E4D9] text-center">
            <span className="text-[10px] text-[#7A7365] block uppercase">Fuel Economy</span>
            <strong className="text-sm font-bold text-[#1F3D2B]">25–30 km / Liter</strong>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ========================================================================= */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 py-10">

        {/* ========================================================================= */}
        {/* SECTION 1: OFFICIAL PARTNER CALLOUT (TUKTUKRENTAL.COM) */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-[#1F3D2B] via-[#142A1D] to-[#0D1D13] text-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-8 -translate-y-8">
            <Compass className="w-64 h-64 text-[#F2C94C]" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C523B] pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F2C94C] text-[#1F3D2B] flex items-center justify-center font-bold text-xl shadow-md">
                  🛺
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#F2C94C] uppercase tracking-wider block font-bold">
                    Official Rental & Fleet Partner
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    TukTukRental.com × Plan Sri Lanka
                  </h2>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C523B] text-[#A3BFAB] text-xs font-mono rounded-full border border-[#3E6B4F] self-start sm:self-auto">
                <ShieldCheck className="w-4 h-4 text-[#F2C94C]" />
                Verified & Community-Owned Fleet
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#C5DAC9] leading-relaxed max-w-3xl">
              We proudly partner with <strong>TukTukRental.com</strong> — Sri Lanka’s premier self-drive three-wheeler organization. When you rent through our partnership, your vehicle is sourced directly from a local Sri Lankan family, providing them with transparent and dignified income while giving you unbeatable road trip support.
            </p>

            {/* 4 Key Partner Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#244632] p-4 rounded-2xl border border-[#386146] space-y-1.5">
                <div className="flex items-center gap-2 text-[#F2C94C] font-bold">
                  <FileCheck className="w-4 h-4" />
                  <span>Legal AAC Permit</span>
                </div>
                <p className="text-[11px] text-[#C5DAC9]">Automobile Association of Ceylon permit processed before you arrive.</p>
              </div>

              <div className="bg-[#244632] p-4 rounded-2xl border border-[#386146] space-y-1.5">
                <div className="flex items-center gap-2 text-[#F2C94C] font-bold">
                  <Shield className="w-4 h-4" />
                  <span>Full $0 Excess Insurance</span>
                </div>
                <p className="text-[11px] text-[#C5DAC9]">Comprehensive coverage for vehicle, third party, and passenger liability.</p>
              </div>

              <div className="bg-[#244632] p-4 rounded-2xl border border-[#386146] space-y-1.5">
                <div className="flex items-center gap-2 text-[#F2C94C] font-bold">
                  <Award className="w-4 h-4" />
                  <span>1-on-1 Driving Lesson</span>
                </div>
                <p className="text-[11px] text-[#C5DAC9]">Hands-on practical training with certified instructors in Negombo.</p>
              </div>

              <div className="bg-[#244632] p-4 rounded-2xl border border-[#386146] space-y-1.5">
                <div className="flex items-center gap-2 text-[#F2C94C] font-bold">
                  <MessageCircle className="w-4 h-4" />
                  <span>24/7 Roadside Assistance</span>
                </div>
                <p className="text-[11px] text-[#C5DAC9]">Instant WhatsApp mechanic dispatch and emergency replacement fleet.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleWhatsAppBooking("hero_partner_cta")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reserve on WhatsApp (+94 72 296 8210)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById("calculator-heading");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-colors"
              >
                <span>Calculate Rental Quote</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: 7 CRUCIAL SELF-DRIVE RULES & REGULATIONS */}
        {/* ========================================================================= */}
        <section aria-labelledby="rules-deep-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Official Road Handbook</span>
              <h2 id="rules-deep-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Self-Drive Tuk-Tuk Rules Worth Knowing
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#4A453A] leading-relaxed">
            Driving a three-wheeler is safe and incredibly fun if you respect local road regulations and traffic dynamics. Here are the 7 non-negotiable rules every foreign driver must know:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Rule 1: AAC Permit */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-2.5 shadow-sm hover:border-[#1F3D2B] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2.5 py-1 rounded-md uppercase">
                  Rule 1 • Legal Requirement
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F3D2B]">
                Sri Lanka AAC Driving Permit Endorsement
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Your home driving license or standard International Driving Permit (IDP) is <strong>not valid alone</strong> for driving three-wheelers in Sri Lanka. You must have your license endorsed by the <strong>Automobile Association of Ceylon (AAC)</strong> in Colombo. Our partner handles this complete submission so your official permit card is ready upon arrival.
              </p>
            </div>

            {/* Rule 2: 40 km/h Limit */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-2.5 shadow-sm hover:border-[#1F3D2B] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2.5 py-1 rounded-md uppercase">
                  Rule 2 • Speed Regulation
                </span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F3D2B]">
                Strict 40 km/h Maximum Speed Limit
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Three-wheelers have a legal maximum speed limit of <strong>40 km/h (25 mph)</strong> everywhere in Sri Lanka — even on wide open national highways. Traffic police routinely operate radar speed guns. Staying under 40 km/h also ensures superior vehicle stability around corners.
              </p>
            </div>

            {/* Rule 3: Expressways Banned */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-2.5 shadow-sm hover:border-[#1F3D2B] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md uppercase">
                  Rule 3 • Road Restrictions
                </span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F3D2B]">
                Expressways (Class-E Roads) Are Strictly Banned
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Tuk-Tuks are legally barred from all expressways (E01 Southern Expressway, E02 Outer Circular, E03 Colombo-Katunayake Airport Expressway). Instead, you will take the scenic coastal A2 highway and inland roads, which offer far richer scenery, coastal vistas, and roadside fruit stands.
              </p>
            </div>

            {/* Rule 4: Mountain & Hill Engine Braking */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-2.5 shadow-sm hover:border-[#1F3D2B] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2.5 py-1 rounded-md uppercase">
                  Rule 4 • Hill Country Safety
                </span>
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F3D2B]">
                Use Low-Gear Engine Braking on Downhills
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                When descending steep mountain roads from Nuwara Eliya or Ella towards Wellawaya, <strong>never coast in neutral or rely solely on your foot brake</strong>. Overheating brake drums causes brake fade. Keep the tuk-tuk in 2nd gear to let engine compression control your descent speed safely.
              </p>
            </div>

            {/* Rule 5: Elephant Corridors */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-2.5 shadow-sm hover:border-[#1F3D2B] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2.5 py-1 rounded-md uppercase">
                  Rule 5 • Wildlife Awareness
                </span>
                <Heart className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F3D2B]">
                Respect Elephant Corridors (Habarana & Buttala)
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                In wildlife zones such as Habarana (Cultural Triangle) and the Buttala-Kataragama road, wild elephants occasionally cross the road at dusk. <strong>Never honk your horn, rev your engine, or step out of the tuk-tuk</strong>. Slow down, keep a safe distance of at least 50 meters, and let other larger vehicles pass first.
              </p>
            </div>

            {/* Rule 6: Fueling & Octane */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-2.5 shadow-sm hover:border-[#1F3D2B] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2.5 py-1 rounded-md uppercase">
                  Rule 6 • Fuel & Mechanics
                </span>
                <Fuel className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F3D2B]">
                Use 92-Octane Petrol & Keep Tank 1/3 Full
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Modern 4-stroke Bajaj tuk-tuks run on regular <strong>92-Octane Unleaded Petrol (LP 92)</strong>. The fuel tank holds 7 to 8 liters (good for ~200 km). In hill country stretches, petrol stations can be 30 km apart, so top up whenever your fuel gauge drops below half.
              </p>
            </div>

            {/* Rule 7: Police Checkpoints */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] space-y-2.5 shadow-sm hover:border-[#1F3D2B] transition-colors md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2.5 py-1 rounded-md uppercase">
                  Rule 7 • Police Interactions
                </span>
                <CheckCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F3D2B]">
                Routine Police Checkpoints: Friendly & Transparent
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5448] leading-relaxed">
                Sri Lankan traffic officers are polite and welcoming to international travelers. If signaled to pull over, smile, turn off your engine, and present your <strong>AAC endorsement card, home driver's license, and vehicle registration book (kept in your lockable glove box)</strong>. Foreign tourists driving tuk-tuks are celebrated across the island!
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: LIVE RENTAL ESTIMATOR & BOOKING WIDGET */}
        {/* ========================================================================= */}
        <section aria-labelledby="calculator-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Instant Quote</span>
              <h2 id="calculator-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Self-Drive Tuk-Tuk Cost Calculator (2026 Rates)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-7 bg-[#FAF8F3] p-6 sm:p-7 rounded-3xl border border-[#E8E4D9] space-y-6">
              
              {/* Currency & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2">
                    1. Rental Duration: <span className="text-[#1F3D2B] text-sm">{calcRentalDays} Days</span>
                  </label>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    value={calcRentalDays}
                    onChange={(e) => setCalcRentalDays(Number(e.target.value))}
                    className="w-full accent-[#1F3D2B] cursor-pointer"
                  />
                  <span className="text-[10px] text-[#7A7365] block text-center mt-1">Recommended: 10 to 14 Days</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2">
                    2. Currency
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcCurrency("USD")}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        calcCurrency === "USD"
                          ? "bg-[#1F3D2B] text-white shadow-sm"
                          : "bg-[#F9F7F2] text-[#5A5448] border border-[#E8E4D9]"
                      }`}
                    >
                      USD ($)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcCurrency("INR")}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        calcCurrency === "INR"
                          ? "bg-[#1F3D2B] text-white shadow-sm"
                          : "bg-[#F9F7F2] text-[#5A5448] border border-[#E8E4D9]"
                      }`}
                    >
                      INR (₹)
                    </button>
                  </div>
                  <span className="text-[10px] text-[#7A7365] block text-center mt-1">Live converted rates</span>
                </div>
              </div>

              {/* Number of Tuk-Tuks */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2">
                  3. Number of Tuk-Tuks
                </label>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCalcTukTuks(Math.max(1, calcTukTuks - 1))}
                    className="w-10 h-10 rounded-xl bg-[#EFECE6] hover:bg-[#E2DDD5] text-lg font-bold flex items-center justify-center text-[#1F3D2B] transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-mono font-bold text-[#1F3D2B]">
                    {calcTukTuks} {calcTukTuks === 1 ? "Tuk-Tuk" : "Tuk-Tuks"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCalcTukTuks(Math.min(6, calcTukTuks + 1))}
                    className="w-10 h-10 rounded-xl bg-[#EFECE6] hover:bg-[#E2DDD5] text-lg font-bold flex items-center justify-center text-[#1F3D2B] transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-[#7A7365] block text-center mt-1">Comfortably fits 2 adults + 2 bags per vehicle</span>
              </div>

              {/* Pick-Up & Drop-Off Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1F3D2B]" /> Pick-Up City
                  </label>
                  <select
                    value={calcPickup}
                    onChange={(e) => setCalcPickup(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                  >
                    <option value="Negombo (Near CMB Airport)">Negombo (Near CMB Airport)</option>
                    <option value="Colombo City Center">Colombo City Center</option>
                    <option value="Kandy Hill Country">Kandy Hill Country</option>
                    <option value="Galle Fort">Galle Fort</option>
                    <option value="Ella Mountain Valley">Ella Mountain Valley</option>
                    <option value="Mirissa / Weligama">Mirissa / Weligama Coast</option>
                    <option value="Sigiriya / Cultural Triangle">Sigiriya / Cultural Triangle</option>
                  </select>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8E4D9]">
                  <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#1F3D2B]" /> Drop-Off City
                  </label>
                  <select
                    value={calcDropoff}
                    onChange={(e) => setCalcDropoff(e.target.value)}
                    className="w-full text-xs font-medium bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                  >
                    <option value="Negombo (Near CMB Airport)">Negombo (Near CMB Airport)</option>
                    <option value="Colombo City Center">Colombo City Center</option>
                    <option value="Galle Fort">Galle Fort</option>
                    <option value="Ella Mountain Valley">Ella Mountain Valley</option>
                    <option value="Mirissa / Weligama">Mirissa / Weligama Coast</option>
                    <option value="Kandy Hill Country">Kandy Hill Country</option>
                    <option value="Arugam Bay (East Coast)">Arugam Bay (East Coast)</option>
                  </select>
                </div>
              </div>

              {/* Add-ons Checkboxes */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E4D9] space-y-3">
                <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block mb-2">
                  4. Add-ons & Legal Inclusions
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] transition-colors cursor-pointer border border-[#E8E4D9]">
                  <input
                    type="checkbox"
                    checked={calcNeedPermit}
                    onChange={(e) => setCalcNeedPermit(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#1F3D2B] focus:ring-[#1F3D2B]"
                  />
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#1F3D2B] flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Sri Lanka Driving Permit Endorsement (AAC)
                      </strong>
                      <span className="font-mono font-bold text-[#1F3D2B]">+$40 one-time</span>
                    </div>
                    <p className="text-[#7A7365] text-[11px] mt-0.5">
                      Required by Sri Lankan law. Prepared in advance so you can start driving immediately.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] transition-colors cursor-pointer border border-[#E8E4D9]">
                  <input
                    type="checkbox"
                    checked={calcFullInsurance}
                    onChange={(e) => setCalcFullInsurance(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#1F3D2B] focus:ring-[#1F3D2B]"
                  />
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#1F3D2B] flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-600" />
                        Comprehensive Full Coverage ($0 Excess)
                      </strong>
                      <span className="font-mono font-bold text-[#1F3D2B]">+$3 / day</span>
                    </div>
                    <p className="text-[#7A7365] text-[11px] mt-0.5">
                      Zero deductible liability covering third party, passenger medicals, and vehicle damages.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] transition-colors cursor-pointer border border-[#E8E4D9]">
                  <input
                    type="checkbox"
                    checked={calcSurfRacks}
                    onChange={(e) => setCalcSurfRacks(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#1F3D2B] focus:ring-[#1F3D2B]"
                  />
                  <div className="text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#1F3D2B] flex items-center gap-1.5">
                        <Palmtree className="w-3.5 h-3.5 text-emerald-600" />
                        Surfboard Roof Racks & Tie-Down Straps
                      </strong>
                      <span className="font-mono font-bold text-[#1F3D2B]">+$15 one-time</span>
                    </div>
                    <p className="text-[#7A7365] text-[11px] mt-0.5">
                      Fitted foam roof bars to securely strap 1–2 boards for Southern coast and Arugam Bay breaks.
                    </p>
                  </div>
                </label>
              </div>

              {/* Traveler Details */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E4D9] space-y-3">
                <label className="text-xs font-mono font-bold uppercase text-[#7A7365] block">
                  5. Quick WhatsApp Inquiry Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-[#5A5448] block mb-1">Your Name:</span>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full text-xs bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#5A5448] block mb-1">WhatsApp Number:</span>
                    <input
                      type="text"
                      placeholder="e.g. +44 7700 900077"
                      value={userWhatsApp}
                      onChange={(e) => setUserWhatsApp(e.target.value)}
                      className="w-full text-xs bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#5A5448] block mb-1">Travel Dates / Month:</span>
                    <input
                      type="text"
                      placeholder="e.g. Nov 10 - Nov 23"
                      value={userTravelMonth}
                      onChange={(e) => setUserTravelMonth(e.target.value)}
                      className="w-full text-xs bg-[#F9F7F2] border border-[#E8E4D9] rounded-xl p-2.5 focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Live Quotation Summary Card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-[#1F3D2B] text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-6 sticky top-28">
                
                <div className="flex items-center justify-between border-b border-[#2C523B] pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5DAC9] uppercase tracking-wider block">Live Price Breakdown</span>
                    <h3 className="text-xl font-serif font-bold text-white">Your Self-Drive Rental</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-[#2C523B] text-[#F2C94C] text-xs font-mono font-bold rounded-lg border border-[#3E6B4F]">
                    {calcRentalDays} Days
                  </span>
                </div>

                {/* Line Items */}
                <div className="space-y-2.5 text-xs text-[#E8E4D9]">
                  <div className="flex justify-between">
                    <span>Self-Drive Tuk-Tuk ({calcTukTuks}x @ ${totals.dailyRate}/day):</span>
                    <span className="font-mono font-semibold text-white">${totals.baseRentalUSD} USD</span>
                  </div>

                  {totals.permitFeeUSD > 0 && (
                    <div className="flex justify-between">
                      <span>Sri Lanka AAC Driving Permits ({calcTukTuks}x):</span>
                      <span className="font-mono font-semibold text-white">${totals.permitFeeUSD} USD</span>
                    </div>
                  )}

                  {totals.insuranceFeeUSD > 0 && (
                    <div className="flex justify-between">
                      <span>Comprehensive Insurance ($0 Excess):</span>
                      <span className="font-mono font-semibold text-white">${totals.insuranceFeeUSD} USD</span>
                    </div>
                  )}

                  {totals.surfRacksUSD > 0 && (
                    <div className="flex justify-between">
                      <span>Surfboard Roof Racks:</span>
                      <span className="font-mono font-semibold text-white">${totals.surfRacksUSD} USD</span>
                    </div>
                  )}

                  {totals.relocationUSD > 0 && (
                    <div className="flex justify-between">
                      <span>One-Way Relocation ({calcPickup.split(" ")[0]} → {calcDropoff.split(" ")[0]}):</span>
                      <span className="font-mono font-semibold text-white">${totals.relocationUSD} USD</span>
                    </div>
                  )}

                  <div className="flex justify-between text-emerald-300">
                    <span>1-on-1 Driving Lesson & Test:</span>
                    <span className="font-mono font-bold">FREE INCLUDED</span>
                  </div>

                  <div className="flex justify-between text-emerald-300">
                    <span>Phone Mount & USB Fast Charger:</span>
                    <span className="font-mono font-bold">FREE INCLUDED</span>
                  </div>

                  <div className="flex justify-between text-emerald-300">
                    <span>24/7 Islandwide WhatsApp Support:</span>
                    <span className="font-mono font-bold">FREE INCLUDED</span>
                  </div>
                </div>

                {/* Grand Total Box */}
                <div className="bg-[#142A1D] p-4 rounded-2xl border border-[#2C523B] text-center space-y-1">
                  <span className="text-[11px] font-mono uppercase text-[#C5DAC9] tracking-wider block">
                    Total Estimated Package
                  </span>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#F2C94C]">
                    {calcCurrency === "USD" ? `$${totals.grandTotalUSD} USD` : `₹${totals.grandTotalINR.toLocaleString("en-IN")} INR`}
                  </div>
                  <span className="text-[11px] text-[#A3BFAB] block">
                    {calcCurrency === "USD" ? `(~₹${totals.grandTotalINR.toLocaleString("en-IN")} INR)` : `(~$${totals.grandTotalUSD} USD)`} • For {calcTukTuks} vehicle(s)
                  </span>
                </div>

                {/* Big WhatsApp CTA Button */}
                <button
                  type="button"
                  onClick={() => handleWhatsAppBooking("calculator_widget")}
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Book with Partner on WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-[#C5DAC9] pt-2 border-t border-[#2C523B]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant Reply
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Local Family Owned
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Lesson
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: SELF-DRIVE VS PRIVATE CHAUFFEUR VS TRAIN COMPARISON */}
        {/* ========================================================================= */}
        <section aria-labelledby="comparison-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Travel Options Compared</span>
              <h2 id="comparison-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Self-Drive Tuk-Tuk vs Private Chauffeur vs Public Trains
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E8E4D9] bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1F3D2B] text-white font-serif">
                  <th className="p-4 font-semibold">Travel Feature</th>
                  <th className="p-4 font-semibold">🛺 Self-Drive Tuk-Tuk ⭐</th>
                  <th className="p-4 font-semibold">🚗 Private AC Car & Driver</th>
                  <th className="p-4 font-semibold">🚆 Public Trains & Buses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4D9]">
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">Daily Cost</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">$17 – $20 USD / day</td>
                  <td className="p-4 font-mono font-bold text-[#5A5448]">$55 – $75 USD / day</td>
                  <td className="p-4 font-mono font-bold text-[#5A5448]">$5 – $12 USD / day</td>
                </tr>
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">Spontaneity & Freedom</td>
                  <td className="p-4 text-[#1F3D2B] font-medium">100% Freedom. Stop at every secret waterfall, temple, and fruit stall.</td>
                  <td className="p-4 text-[#5A5448]">High. Driver accommodates requests, but you follow a fixed vehicle route.</td>
                  <td className="p-4 text-[#5A5448]">Low. Bound to train timetables and sold-out reserved tickets.</td>
                </tr>
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">Adventure & Immersion</td>
                  <td className="p-4 text-[#1F3D2B] font-medium">Maximum. Locals wave and invite you for tea. Pure open-air tropical vibe.</td>
                  <td className="p-4 text-[#5A5448]">Moderate. Air-conditioned comfort, ideal for business or elderly travelers.</td>
                  <td className="p-4 text-[#5A5448]">High scenery on hill train, crowded on general compartments.</td>
                </tr>
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">Luggage Capacity</td>
                  <td className="p-4 text-[#1F3D2B] font-medium">Fits 2 large backpacks + 2 daypacks + optional surfboards on roof.</td>
                  <td className="p-4 text-[#5A5448]">Fits 3-4 large hard suitcases in car boot.</td>
                  <td className="p-4 text-[#5A5448]">Must carry luggage onto crowded train carriages.</td>
                </tr>
                <tr className="hover:bg-[#FAF8F3]">
                  <td className="p-4 font-bold text-[#1F3D2B]">Legal License Requirement</td>
                  <td className="p-4 text-[#1F3D2B] font-medium">Home car license + AAC Sri Lanka endorsement (handled by partner).</td>
                  <td className="p-4 text-[#5A5448]">None. Chauffeur drives.</td>
                  <td className="p-4 text-[#5A5448]">None.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: RECOMMENDED 13-DAY ITINERARY LINKAGE */}
        {/* ========================================================================= */}
        <section className="bg-[#FAF8F3] p-6 sm:p-8 rounded-3xl border border-[#E8E4D9] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#1F3D2B] bg-[#EBF3ED] px-2.5 py-1 rounded-md uppercase">
              Ready-to-Drive Route
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F3D2B]">
              Looking for the Complete 13-Day Tuk-Tuk Island Loop?
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5448] max-w-xl">
              Explore our day-by-day 1,100 km itinerary covering Negombo, Sigiriya Citadel, Kandy, Nuwara Eliya waterfalls, Ella Nine Arch Bridge, Yala Safari, and Galle Fort with driving hours and fuel stops.
            </p>
          </div>

          <Link
            to="/sri-lanka-13-day-tuk-tuk-itinerary"
            className="px-6 py-3.5 bg-[#1F3D2B] hover:bg-[#142A1D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap flex items-center gap-2 shadow-md shrink-0"
          >
            <span>View 13-Day Route</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: FAQS ACCORDION */}
        {/* ========================================================================= */}
        <section aria-labelledby="faq-rules-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-[#1F3D2B]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#7A7365] uppercase tracking-wider">Everything Answered</span>
              <h2 id="faq-rules-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F3D2B]">
                Frequently Asked Questions (Self-Drive Tuk-Tuk)
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#1F3D2B] hover:bg-[#FAF8F3] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7A7365] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#1F3D2B]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm text-[#5A5448] leading-relaxed border-t border-[#E8E4D9]/60 font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CONVERSION BANNER */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-r from-[#1F3D2B] to-[#142A1D] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-mono uppercase bg-[#2C523B] text-[#F2C94C] px-3 py-1 rounded-full font-bold border border-[#3E6B4F]">
              Ready for the Open Road?
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Reserve Your Tuk-Tuk with Verified Partner Support
            </h3>
            <p className="text-xs sm:text-sm text-[#C5DAC9] leading-relaxed">
              Message us on WhatsApp to check vehicle availability, confirm your driving lesson slot, and prepare your AAC driving permit before your plane touches down.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleWhatsAppBooking("bottom_guide_cta")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-transform hover:scale-105 shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp (+94 72 296 8210)</span>
          </button>
        </section>

      </main>
    </div>
  );
}
