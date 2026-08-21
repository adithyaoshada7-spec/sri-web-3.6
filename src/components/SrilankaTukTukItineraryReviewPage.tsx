import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  ArrowRight, MapPin, Compass, Clock, Car, Sparkles, Calendar, Info,
  CheckCircle, HelpCircle, ChevronDown, AlertTriangle, Train, Check,
  Ban, Fuel, Route, Sunrise, Gauge, Milestone, Sun
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface LegPlan {
  leg: number;
  dates: string;
  from: string;
  to: string;
  nights: number;
  km: number;
  carTime: string;
  tuktukTime: string;
  road: string;
  flag?: "warning" | "ban" | null;
  note: string;
}

export const tukTukLegData: LegPlan[] = [
  {
    leg: 1,
    dates: "2 Oct",
    from: "Colombo Airport (CMB)",
    to: "Negombo",
    nights: 1,
    km: 10,
    carTime: "15 - 20 min",
    tuktukTime: "Arranged airport taxi (tuk-tuk pickup happens in Negombo)",
    road: "Katunayake Expressway / Negombo Road",
    flag: null,
    note: "Take a taxi or hotel transfer straight from arrivals — don't try to collect the tuk-tuk at the airport itself. Almost every rental operator hands over the vehicle at their Negombo depot after a short briefing and a test loop."
  },
  {
    leg: 2,
    dates: "3 - 4 Oct",
    from: "Negombo",
    to: "Kandy",
    nights: 2,
    km: 140,
    carTime: "3h 45m",
    tuktukTime: "5h 15m - 5h 45m",
    road: "A1 via Kurunegala",
    flag: null,
    note: "Flat and fast for the first two-thirds, then the last 25 km climbing into Kandy gets slow with town traffic. Leave by 8 AM to arrive with daylight to spare for the Temple of the Tooth evening ceremony."
  },
  {
    leg: 3,
    dates: "5 - 6 Oct",
    from: "Kandy",
    to: "Sigiriya",
    nights: 2,
    km: 92,
    carTime: "2h 45m",
    tuktukTime: "3h 30m - 3h 45m",
    road: "A9 via Matale, turning off near Dambulla",
    flag: null,
    note: "Good sealed road throughout. Worth splitting the drive with a stop at Matale's spice gardens or Dambulla Cave Temple on the way in — you're passing the door anyway."
  },
  {
    leg: 4,
    dates: "7 - 8 Oct",
    from: "Sigiriya",
    to: "Trincomalee",
    nights: 2,
    km: 108,
    carTime: "2h 30m",
    tuktukTime: "3h 15m",
    road: "A6 / A11 via Habarana and Kantale",
    flag: null,
    note: "Straightforward dry-zone road, mostly straight and flat. Watch for wandering elephants near Habarana at dusk — an argument for finishing this leg before 5 PM."
  },
  {
    leg: 5,
    dates: "9 Oct",
    from: "Trincomalee",
    to: "Pasikudah",
    nights: 1,
    km: 82,
    carTime: "2h 00m",
    tuktukTime: "2h 45m",
    road: "A15 coastal road via Kalkudah",
    flag: null,
    note: "Short and scenic, hugging the coast. This is the leg where the itinerary's logic feels softest — see \"Other Feedback Points\" below."
  },
  {
    leg: 6,
    dates: "10 - 12 Oct",
    from: "Pasikudah",
    to: "Ella",
    nights: 3,
    km: 232,
    carTime: "6h 00m - 6h 30m",
    tuktukTime: "8h 30m - 9h 30m",
    road: "B-roads via Mahiyangana and Bibile/Passara — narrow, hairpin climbs in the final two hours",
    flag: "warning",
    note: "The single hardest day of the whole trip and the main thing this review flags. See the full breakdown below before you lock hotels in."
  },
  {
    leg: 7,
    dates: "13 Oct",
    from: "Ella",
    to: "Mirissa",
    nights: 1,
    km: 172,
    carTime: "4h 15m",
    tuktukTime: "5h 45m - 6h 00m",
    road: "A23 / A18 via Wellawaya and Tissamaharama, then coastal A2",
    flag: null,
    note: "A long but manageable descent — you drop from tea country to the dry southern plains, then hit the coast. Fuel up in Wellawaya; stations thin out after that."
  },
  {
    leg: 8,
    dates: "14 Oct",
    from: "Mirissa",
    to: "Colombo",
    nights: 1,
    km: 148,
    carTime: "2h 15m (car, via E01 expressway)",
    tuktukTime: "4h 00m - 4h 30m (old coastal A2 — expressway is car/motorcycle-restricted for tuk-tuks)",
    road: "A2 coastal road via Galle, Hikkaduwa, Bentota, Kalutara",
    flag: "ban",
    note: "Tuk-tuks are not permitted on the Southern Expressway (E01), so this leg takes almost double a car's time. It's a scenic trade-off, not a wasted one — but budget the extra two hours."
  },
  {
    leg: 9,
    dates: "15 Oct",
    from: "Colombo",
    to: "CMB Airport",
    nights: 0,
    km: 32,
    carTime: "45 min (expressway, car/taxi)",
    tuktukTime: "1h 15m (old road, or arrange the rental's drop-off driver)",
    road: "Colombo - Katunayake Expressway (E03) or Negombo Road",
    flag: "ban",
    note: "Most rental companies handle the final CMB drop-off themselves for a fee since your pickup point (Negombo) differs from your return point (Colombo) — confirm this one-way charge when booking, not on the day."
  }
];

interface FaqItem {
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  {
    q: "Is 13 nights enough for this exact route?",
    a: "Yes. Eight stops in 13 nights averages 1.6 nights per stop, which is a sustainable pace for a tuk-tuk trip — most single-night stands here (Negombo, Pasikudah, Mirissa, Colombo) are arrival/departure buffers or short coastal add-ons rather than places you're trying to deeply explore. The pacing itself isn't the issue; the route order is."
  },
  {
    q: "Is the Pasikudah to Ella transfer really that bad by tuk-tuk?",
    a: "By car it's a long but ordinary 6-hour day. By tuk-tuk, factoring in a top comfortable cruising speed of 35-40 km/h on good stretches and 15-20 km/h on the hairpins into Ella, it stretches to 8.5-9.5 hours — and the final climb happens on narrow, poorly lit mountain roads that are genuinely unpleasant (and start to feel unsafe) after dark. If you attempt it as written, leave Pasikudah by 6:30 AM at the absolute latest."
  },
  {
    q: "Can tuk-tuks use the Southern Expressway (E01) between Mirissa and Colombo?",
    a: "No. Three-wheelers are barred from all of Sri Lanka's controlled-access expressways (E01 Southern, E02 Outer Circular, E03 Colombo-Katunayake, E04 Ruwanpura). You'll take the old A2 coastal road, which is slower but passes directly through Galle Fort, Hikkaduwa, and Bentota if you want a scenic last day rather than a fast one."
  },
  {
    q: "Do we need an International Driving Permit to drive a tuk-tuk in Sri Lanka?",
    a: "Yes — foreign visitors need a valid International Driving Permit (or a Sri Lankan temporary driving permit, which most tuk-tuk rental companies can arrange for you, usually a same-day process involving a short test with a local instructor). Confirm exactly which document your rental company requires before you fly, since this can take a day to sort out and eats into Day 1 if left unbooked."
  },
  {
    q: "Is October a good month for this specific combination of coasts?",
    a: "Mostly yes, with caveats. Early October sits in Sri Lanka's inter-monsoon transition: expect short, heavy afternoon downpours anywhere on the island, including Kandy and the hill country, rather than all-day rain. Trincomalee and Pasikudah are still in their good-weather window (their wet season doesn't usually set in until November), so the East Coast leg should be dry and calm. The West/South Coast nights (Negombo, Mirissa, Colombo) are more likely to catch a shower, but rarely for the whole day."
  },
  {
    q: "Should we add a wildlife safari like Yala or Udawalawe?",
    a: "It's the one experience this itinerary skips entirely, and it's a fair omission given the pacing — Yala sits well off the direct Ella-Mirissa line and would add a half-day detour plus a park entry fee. If you have any flexibility, Udawalawe is the easier bolt-on: it's roughly on the way between Ella and Mirissa rather than a backtrack, and a half-day safari there is simpler to slot in than a full Yala visit."
  },
  {
    q: "How far in advance should we book the Ella to Haputale train?",
    a: "Sri Lanka Railways opens reserved-seat bookings 30 days before departure, and this exact window sells out fastest in the first hour it opens — especially in the run-up to peak season. If your trip is in October and you haven't booked yet, do it now rather than after finishing this article. Unreserved 3rd class tickets are sold on the day and are a reasonable backup if reserved seats are gone."
  },
  {
    q: "What should we do during the roughly five hours between trains in Haputale?",
    a: "That gap (arriving 10:48, departing 15:57) is enough time for the return taxi/tuk-tuk trip up to Lipton's Seat for the classic tea-country viewpoint (about 1.5-2 hours round trip plus time at the top), a stop at the Adisham Bungalow tea-estate walking trails, and a sit-down lunch in Haputale town before heading back to the station."
  }
];

export default function SrilankaTukTukItineraryReviewPage() {
  usePageMetadata({
    title: "13-Night Sri Lanka Tuk-Tuk Itinerary Review: Negombo to Colombo (2026)",
    description: "An expert review of a 13-night self-drive tuk-tuk itinerary across Sri Lanka: Negombo, Kandy, Sigiriya, Trincomalee, Pasikudah, Ella, Mirissa & Colombo. Real tuk-tuk drive times, pacing feedback, and the one route fix we'd make.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-13-day-tuk-tuk-itinerary",
    ogUrl: "https://plan-srilanka.com/sri-lanka-13-day-tuk-tuk-itinerary"
  });

  const [activeLeg, setActiveLeg] = useState<number>(6);
  const [showTuktukTimes, setShowTuktukTimes] = useState<boolean>(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppConsult = (msgText?: string) => {
    trackEvent("whatsapp_click", "conversion", "tuktuk_itinerary_review");
    const msg = msgText || "Hi Plan Sri Lanka! I'm planning a 13-night tuk-tuk trip in October (Negombo-Kandy-Sigiriya-Trincomalee-Pasikudah-Ella-Mirissa-Colombo) and would love feedback on the route before I lock in hotels.";
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const totalKm = tukTukLegData.reduce((sum, leg) => sum + leg.km, 0);
  const totalNights = tukTukLegData.reduce((sum, leg) => sum + leg.nights, 0);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0F1412] font-sans leading-relaxed selection:bg-[#C5A059]/20 pt-24 md:pt-32">

      {/* STRUCTURED JSON-LD SCHEMAS */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "13-Night Sri Lanka Tuk-Tuk Itinerary Review: Negombo to Colombo",
          "description": "An expert review of a reader-submitted 13-night self-drive tuk-tuk itinerary across Sri Lanka, covering pacing, realistic tuk-tuk drive times, and one recommended route fix.",
          "author": { "@type": "Person", "name": "Adithya Oshada", "jobTitle": "Local Travel Planner" },
          "publisher": {
            "@type": "Organization",
            "name": "Plan Sri Lanka",
            "logo": { "@type": "ImageObject", "url": "https://plan-srilanka.com/logo.png" }
          },
          "datePublished": "2026-08-21T08:00:00Z",
          "dateModified": "2026-08-21T08:00:00Z"
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          "name": "13-Night Sri Lanka Tuk-Tuk Itinerary (Negombo to Colombo)",
          "description": "A reader-submitted 13-night, 8-stop self-drive tuk-tuk route across Sri Lanka covering the Cultural Triangle, East Coast beaches, hill country and South Coast.",
          "touristType": ["Self-Drive Travelers", "Couples", "Adventure Travelers"],
          "itinerary": tukTukLegData.map(leg => ({
            "@type": "TouristAttraction",
            "name": `${leg.dates}: ${leg.from} to ${leg.to}`,
            "description": `${leg.km} km, approx. ${leg.tuktukTime} by tuk-tuk. ${leg.note}`
          }))
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://plan-srilanka.com/blog" },
            { "@type": "ListItem", "position": 3, "name": "13-Night Tuk-Tuk Itinerary Review", "item": "https://plan-srilanka.com/sri-lanka-13-day-tuk-tuk-itinerary" }
          ]
        })}
      </script>

      {/* 1. HERO */}
      <section className="relative px-6 pb-12 pt-6 overflow-hidden bg-gradient-to-b from-[#1A2F23]/10 via-[#1A2F23]/5 to-transparent border-b border-[#0F1412]/5">
        <div className="max-w-6xl mx-auto text-center space-y-6">

          <div className="inline-flex items-center gap-2 bg-[#C5A059]/15 border border-[#C5A059]/40 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> Reader Itinerary Review • October Edition
          </div>

          <h1 className="text-4xl md:text-7xl font-serif text-[#1A2F23] tracking-tight leading-[1.1] max-w-5xl mx-auto font-bold">
            13-Night Sri Lanka Tuk-Tuk Itinerary: <br />
            <span className="italic text-[#C5A059] font-normal">Reviewed, Leg by Leg</span>
          </h1>

          <p className="text-base md:text-xl text-[#0F1412]/80 font-light max-w-3xl mx-auto leading-relaxed">
            A traveler shared their October route — Negombo, Kandy, Sigiriya, Trincomalee, Pasikudah, Ella, Mirissa, Colombo, self-driven by tuk-tuk. Here's our honest read: what's genuinely well-planned, what needs a second look, and realistic tuk-tuk drive times for every single leg (not the car-based estimates most planners quote).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleWhatsAppConsult()}
              className="px-8 py-4 bg-[#1A2F23] text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-[#C5A059] hover:text-black transition-all flex items-center gap-3 group"
            >
              <Compass className="w-4 h-4 text-[#C5A059] group-hover:text-black" /> Get Your Own Route Reviewed
            </button>
            <Link
              to="/how-to-plan-a-train-trip-in-sri-lanka"
              className="px-6 py-4 bg-white border border-[#0F1412]/15 text-[#0F1412] rounded-full font-bold uppercase tracking-[0.15em] text-xs shadow-sm hover:border-[#C5A059] hover:text-[#C5A059] transition-all flex items-center gap-2"
            >
              <Train className="w-4 h-4" /> Train Booking Guide
            </Link>
          </div>

          {/* Key Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F1412]/50 block mb-1">Nights / Stops</span>
              <span className="font-serif text-2xl font-bold text-[#1A2F23]">{totalNights} / 8</span>
              <span className="text-[10px] text-[#C5A059] block font-medium">Well-Balanced Pace</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F1412]/50 block mb-1">Total Distance</span>
              <span className="font-serif text-2xl font-bold text-[#1A2F23]">~{totalKm} km</span>
              <span className="text-[10px] text-[#C5A059] block font-medium">Matches Their Own Estimate</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F1412]/50 block mb-1">Toughest Day</span>
              <span className="font-serif text-2xl font-bold text-[#1A2F23]">8.5-9.5h</span>
              <span className="text-[10px] text-[#C5A059] block font-medium">Pasikudah → Ella</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#0F1412]/5 shadow-sm text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F1412]/50 block mb-1">Verdict</span>
              <span className="font-serif text-2xl font-bold text-[#1A2F23]">Solid, 1 Fix</span>
              <span className="text-[10px] text-[#C5A059] block font-medium">See Below</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SUBMITTED ITINERARY, RESTATED */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#0F1412]/10 p-6 md:p-10 shadow-lg space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-1">
              What Was Submitted
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1A2F23] font-bold">
              The Route As Planned
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 text-sm md:text-base">
            {[
              ["2 Oct", "Negombo (arrival + tuk-tuk pickup)"],
              ["3 - 4 Oct", "Kandy (2 nights)"],
              ["5 - 6 Oct", "Sigiriya (2 nights)"],
              ["7 - 8 Oct", "Trincomalee (2 nights)"],
              ["9 Oct", "Pasikudah (1 night)"],
              ["10 - 12 Oct", "Ella (3 nights) — incl. Ella-Haputale train"],
              ["13 Oct", "Mirissa (1 night)"],
              ["14 Oct", "Colombo (1 night)"],
              ["15 Oct", "Flight departs 23:00"]
            ].map(([date, plan]) => (
              <div key={date} className="flex items-baseline gap-3 border-b border-[#0F1412]/5 pb-2">
                <span className="font-mono text-xs font-bold text-[#C5A059] w-20 shrink-0">{date}</span>
                <span className="text-[#0F1412]/85">{plan}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#0F1412]/50 pt-2">
            Pickup in Negombo, drop-off in Colombo, ~1,000-1,200 km of driving including sightseeing — as stated in the original post.
          </p>
        </div>
      </section>

      {/* 3. THE QUICK VERDICT */}
      <section className="py-4 px-6 max-w-6xl mx-auto">
        <div className="bg-[#1A2F23] text-white rounded-3xl p-6 md:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 bg-[#C5A059]/20 rounded-2xl shrink-0">
              <CheckCircle className="w-6 h-6 text-[#C5A059]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
                The Short Answer
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                Yes — this is a well-balanced route with one structural problem worth fixing.
              </h2>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-3xl">
                The pacing (2 nights per major stop, single-night buffers at the edges) is exactly right for a self-drive tuk-tuk trip — it avoids the classic mistake of one-night-stand fatigue. The problem is buried in the route order: going Trincomalee → Pasikudah → Ella creates one brutal, borderline-unsafe 8.5-9.5 hour driving day that a simple reorder would cut into two manageable ones. Everything else is minor polish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEG-BY-LEG DRIVE TIME TABLE */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#0F1412]/10 p-6 md:p-10 shadow-lg space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#0F1412]/5 pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-1">
                Real Tuk-Tuk Pacing, Not Car Estimates
              </span>
              <h2 className="text-2xl md:text-4xl font-serif text-[#1A2F23] font-bold">
                Leg-by-Leg Drive Time Reality Check
              </h2>
            </div>
            <button
              onClick={() => setShowTuktukTimes(!showTuktukTimes)}
              className="shrink-0 flex items-center gap-2 bg-[#FAF8F5] border border-[#0F1412]/10 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#1A2F23] hover:border-[#C5A059] transition-all"
            >
              <Gauge className="w-4 h-4 text-[#C5A059]" />
              {showTuktukTimes ? "Showing: Tuk-Tuk Times" : "Showing: Private Car Times"}
            </button>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#0F1412]/5 text-xs text-[#0F1412]/70 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <p>Most itinerary guides quote private-chauffeur-car drive times. A rented self-drive tuk-tuk cruises meaningfully slower — around 35-45 km/h on good roads and 15-25 km/h through hill switchbacks — so we've recalculated every leg specifically for a tuk-tuk.</p>
          </div>

          <div className="overflow-x-auto pb-2">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1A2F23] text-white">
                  <th className="p-3 md:p-4 rounded-l-xl font-mono uppercase text-[11px] tracking-wider">Date</th>
                  <th className="p-3 md:p-4 font-mono uppercase text-[11px] tracking-wider">From → To</th>
                  <th className="p-3 md:p-4 font-mono uppercase text-[11px] tracking-wider">Distance</th>
                  <th className="p-3 md:p-4 rounded-r-xl font-mono uppercase text-[11px] tracking-wider">{showTuktukTimes ? "Tuk-Tuk Time" : "Private Car Time"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F1412]/5">
                {tukTukLegData.map((leg) => (
                  <tr
                    key={leg.leg}
                    onClick={() => setActiveLeg(leg.leg)}
                    className={`hover:bg-[#FAF8F5] transition-colors cursor-pointer ${
                      activeLeg === leg.leg ? "bg-[#C5A059]/10 font-medium" : ""
                    }`}
                  >
                    <td className="p-3 md:p-4 font-mono font-bold text-[#C5A059] whitespace-nowrap">{leg.dates}</td>
                    <td className="p-3 md:p-4 font-serif text-[#1A2F23] font-bold whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        {leg.from} → {leg.to}
                        {leg.flag === "warning" && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                        {leg.flag === "ban" && <Ban className="w-3.5 h-3.5 text-orange-500 shrink-0" />}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 whitespace-nowrap">{leg.km} km</td>
                    <td className={`p-3 md:p-4 font-mono text-xs font-bold whitespace-nowrap ${leg.flag === "warning" ? "text-red-600" : "text-[#1A2F23]"}`}>
                      {showTuktukTimes ? leg.tuktukTime : leg.carTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Active Leg Detail Card */}
          {tukTukLegData.filter(l => l.leg === activeLeg).map(leg => (
            <div key={leg.leg} className={`p-5 md:p-6 rounded-2xl border ${leg.flag ? "bg-red-50 border-red-200" : "bg-[#FAF8F5] border-[#0F1412]/10"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Route className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#1A2F23]">{leg.from} → {leg.to} · {leg.road}</span>
              </div>
              <p className="text-sm text-[#0F1412]/80 leading-relaxed">{leg.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHAT'S WORKING WELL */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#0F1412]/10 p-6 md:p-10 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl md:text-3xl font-serif text-[#1A2F23] font-bold">What's Working Well</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Two-night minimums at every major stop",
                desc: "Kandy, Sigiriya, and Trincomalee each get 2 full nights — enough to actually see the sights without a same-day arrive-and-leave scramble. This is the single most common mistake in first-draft itineraries, and it's already fixed here."
              },
              {
                title: "The train replaces a driving day, correctly",
                desc: "Using the Ella-Haputale train instead of driving the tuk-tuk up those same switchbacks is the right call — it's safer, more scenic, and gives the driver an actual rest day in the middle of the trip."
              },
              {
                title: "A genuine buffer day before a night flight",
                desc: "A full free day in Colombo on 15 Oct ahead of a 23:00 departure is smart — it absorbs any delay from the trip without threatening the flight, and leaves room for souvenir shopping or the drop-off logistics."
              },
              {
                title: "Minimal backtracking overall",
                desc: "Reading the route on a map, it flows in a broadly clockwise loop from the west coast through the hills to the east coast, down to the south, and back to Colombo — there's no wasted doubling-back on any single leg."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif font-bold text-[#1A2F23] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#0F1412]/75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE ONE CHANGE WE'D MAKE */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-red-200 p-6 md:p-10 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl md:text-3xl font-serif text-[#1A2F23] font-bold">The One Change We'd Make</h2>
          </div>
          <p className="text-sm md:text-base text-[#0F1412]/80 leading-relaxed max-w-3xl">
            The Pasikudah → Ella leg is 232 km of mostly narrow B-roads through Mahiyangana and Bibile, climbing hard in the final two hours. By tuk-tuk that's 8.5-9.5 hours in the seat, on roads you don't want to be finishing after dark. It's the single biggest risk in an otherwise sound plan — and it exists only because Kandy is visited <em>before</em> the East Coast instead of <em>between</em> the East Coast and Ella.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-red-50 border border-red-200">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-red-500 block mb-3">As Submitted</span>
              <div className="space-y-2 text-sm">
                {["Negombo", "Kandy", "Sigiriya", "Trincomalee", "Pasikudah", "Ella", "Mirissa", "Colombo"].map((stop, i, arr) => (
                  <div key={stop} className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#0F1412]/40 w-4">{i + 1}.</span>
                    <span className={i === 4 ? "font-bold text-red-600" : "text-[#0F1412]/80"}>{stop}</span>
                    {i === 4 && <span className="text-[10px] font-mono text-red-500">← 9h transfer follows</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-green-50 border border-green-200">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-green-600 block mb-3">Suggested Reorder</span>
              <div className="space-y-2 text-sm">
                {["Negombo", "Sigiriya", "Trincomalee", "Pasikudah", "Kandy", "Ella", "Mirissa", "Colombo"].map((stop, i) => (
                  <div key={stop} className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#0F1412]/40 w-4">{i + 1}.</span>
                    <span className={i === 4 || i === 3 ? "font-bold text-green-700" : "text-[#0F1412]/80"}>{stop}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/10">
            <p className="text-sm text-[#0F1412]/80 leading-relaxed">
              Swapping Kandy to after the East Coast splits that one 9-hour day into two realistic ones: <strong>Pasikudah → Kandy</strong> (roughly 165 km via Polonnaruwa and Matale, ~4 hours by tuk-tuk on better roads) and <strong>Kandy → Ella</strong> (the classic hill-country run, ~4.5-5 hours, with the option to put the tuk-tuk on a car-carrier and take the famous Kandy-Ella train instead if you want the scenic route without the driving). Same total nights, same stops, none of the risk.
            </p>
          </div>

          <p className="text-xs text-[#0F1412]/50">
            If hotels are already booked and this reorder isn't realistic anymore: leave Pasikudah no later than 6:30 AM, plan a proper lunch stop in Mahiyangana, and treat the day as the trip's one real "road trip day" rather than a routine transfer.
          </p>
        </div>
      </section>

      {/* 7. OTHER FEEDBACK POINTS */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#0F1412]/10 p-6 md:p-10 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-2xl md:text-3xl font-serif text-[#1A2F23] font-bold">Other Feedback Points</h2>
          </div>
          <div className="space-y-5">
            {[
              {
                title: "Pasikudah's single night is fine, but consider a day trip instead",
                desc: "Trincomalee and Pasikudah are only ~2.5 hours apart and offer a similar calm-bay beach experience. Unless a specific Pasikudah resort is the draw, a day trip down from Trincomalee (returning the same night) would free up a full extra night to add anywhere else on the route — Nuwara Eliya, an extra Ella night, or Galle Fort."
              },
              {
                title: "Mirissa's one night is tight after a 6-hour driving day",
                desc: "Arriving from Ella already tired, a single night in Mirissa leaves little time to actually enjoy the beach. If the reorder above frees up a spare night, this is where we'd add it back."
              },
              {
                title: "No whale watching — probably the right call for these dates",
                desc: "Mirissa's blue whale season typically ramps up from November, so an early-to-mid October boat trip is a coin flip on operators even running. Not including it in the plan avoids a likely disappointment; if the trip shifts later into the season next time, it's an easy add."
              },
              {
                title: "Confirm the return leg's expressway restriction before you commit to timing",
                desc: "The 14 Oct Mirissa → Colombo leg takes roughly double the car-based estimate because tuk-tuks can't use the E01 expressway. Build the extra ~2 hours into your plan now rather than discovering it on the day."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5">
                <span className="w-6 h-6 rounded-full bg-[#C5A059]/20 text-[#C5A059] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                <div>
                  <h3 className="font-serif font-bold text-[#1A2F23] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#0F1412]/75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TRAIN + HAPUTALE PLANNING */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <div className="bg-[#1A2F23] text-white rounded-3xl p-6 md:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3">
            <Train className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Making the Most of the Ella-Haputale Train Day</h2>
          </div>
          <p className="relative z-10 text-white/80 text-sm md:text-base font-light leading-relaxed max-w-3xl">
            Ella → Haputale (09:50-10:48) and the 15:57-16:55 return is a smart, lower-key alternative to the more crowded Kandy-Ella line — same tea-country scenery, far fewer standing passengers. It also hands the driver a genuine rest day. That leaves roughly five hours in Haputale between trains:
          </p>
          <div className="relative z-10 grid md:grid-cols-3 gap-4">
            {[
              { icon: <Sunrise className="w-5 h-5 text-[#C5A059]" />, title: "Lipton's Seat", desc: "The classic tea-estate viewpoint. A round-trip taxi or tuk-tuk ride is about 1.5-2 hours including time at the top." },
              { icon: <MapPin className="w-5 h-5 text-[#C5A059]" />, title: "Adisham Bungalow", desc: "A colonial-era tea planter's house with short walking trails through the surrounding estate, an easy 20-minute detour." },
              { icon: <Sun className="w-5 h-5 text-[#C5A059]" />, title: "Lunch in Haputale town", desc: "Small, unhurried, and a good spot to sit before the 15:57 return without rushing back to the platform." }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                {item.icon}
                <h3 className="font-serif font-bold text-white">{item.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="relative z-10 p-4 bg-[#C5A059]/15 border border-[#C5A059]/40 rounded-2xl text-xs text-white/90 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <p>Reserved seats open exactly 30 days before departure and this window sells out fast. If tickets for these two trains aren't booked yet, do it before reading any further — 3rd class unreserved is the only fallback once reserved seats are gone.</p>
          </div>
        </div>
      </section>

      {/* 9. TUK-TUK SPECIFIC RULES */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#0F1412]/10 p-6 md:p-10 shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <Fuel className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-2xl md:text-3xl font-serif text-[#1A2F23] font-bold">Self-Drive Tuk-Tuk Rules Worth Knowing</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: <Ban className="w-5 h-5 text-orange-500" />, title: "Expressways are off-limits", desc: "E01 (Southern), E02 (Outer Circular), E03 (Colombo-Katunayake) and E04 all restrict three-wheelers. Plan every expressway-adjacent leg on the old parallel road instead." },
              { icon: <Milestone className="w-5 h-5 text-[#C5A059]" />, title: "Realistic cruising speed", desc: "Expect 35-45 km/h on good flat roads and 15-25 km/h on hill switchbacks — well below what car-based route planners assume." },
              { icon: <Fuel className="w-5 h-5 text-[#C5A059]" />, title: "Refuel often", desc: "Small fuel tanks mean stopping roughly every 100-120 km. Stations thin out in rural stretches like Mahiyangana-Bibile, so don't let the tank run low there." },
              { icon: <CheckCircle className="w-5 h-5 text-[#C5A059]" />, title: "Permit requirements", desc: "An International Driving Permit or a locally-arranged temporary driving permit is required — confirm which one your rental company needs before departure." },
              { icon: <AlertTriangle className="w-5 h-5 text-red-500" />, title: "Avoid hill roads after dark", desc: "Poor lighting, unmarked animals, and drivers unused to slow-moving tuk-tuks make night driving on mountain roads genuinely risky. Build in daylight buffers." },
              { icon: <Info className="w-5 h-5 text-[#C5A059]" />, title: "One-way drop-off fees", desc: "Picking up in Negombo and returning in Colombo (different towns) usually carries a one-way relocation fee — confirm the amount when booking, not at drop-off." }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-[#FAF8F5] border border-[#0F1412]/5">
                {item.icon}
                <div>
                  <h3 className="font-serif font-bold text-[#1A2F23] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#0F1412]/75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-2">
            Frequently Asked
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A2F23] font-bold">Common Questions About This Route</h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#0F1412]/10 overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="flex items-center gap-3 font-serif font-bold text-[#1A2F23] text-sm md:text-base">
                  <HelpCircle className="w-4 h-4 text-[#C5A059] shrink-0" /> {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-[#C5A059] shrink-0 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-5 pb-5"
                >
                  <p className="text-sm text-[#0F1412]/75 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. RELATED READING / INTERNAL LINKS */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/best-time-to-visit-sri-lanka" className="group p-6 rounded-3xl bg-white border border-[#0F1412]/10 hover:border-[#C5A059] transition-all shadow-sm hover:shadow-lg">
            <Calendar className="w-5 h-5 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-[#1A2F23] group-hover:text-[#C5A059] transition-colors mb-1">Best Time to Visit Sri Lanka</h3>
            <p className="text-xs text-[#0F1412]/60">Understand the dual-monsoon pattern behind our October weather notes.</p>
          </Link>
          <Link to="/how-to-plan-a-train-trip-in-sri-lanka" className="group p-6 rounded-3xl bg-white border border-[#0F1412]/10 hover:border-[#C5A059] transition-all shadow-sm hover:shadow-lg">
            <Train className="w-5 h-5 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-[#1A2F23] group-hover:text-[#C5A059] transition-colors mb-1">How to Plan a Train Trip in Sri Lanka</h3>
            <p className="text-xs text-[#0F1412]/60">The full 30-day booking window rule and class-by-class comparison.</p>
          </Link>
          <Link to="/sri-lanka-trip-planner" className="group p-6 rounded-3xl bg-white border border-[#0F1412]/10 hover:border-[#C5A059] transition-all shadow-sm hover:shadow-lg">
            <Compass className="w-5 h-5 text-[#C5A059] mb-3" />
            <h3 className="font-serif font-bold text-[#1A2F23] group-hover:text-[#C5A059] transition-colors mb-1">Sri Lanka Trip Planner</h3>
            <p className="text-xs text-[#0F1412]/60">Build and reorder your own route with our free interactive planner.</p>
          </Link>
        </div>
      </section>

      {/* 12. BOTTOM CTA */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-[#1e3a2f] text-white rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden border border-[#C5A059]/30 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-[#C5A059] font-mono text-xs uppercase tracking-[0.3em] font-bold block">
              Want A Second Opinion On Your Own Route?
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold">
              Send Us Your Draft Itinerary
            </h3>
            <p className="text-sm font-light text-white/80 leading-relaxed">
              Whether you're driving a tuk-tuk yourself or hiring a chauffeur, we'll check the pacing, flag the risky driving days, and suggest a fix — free, over WhatsApp, usually within a couple of hours.
            </p>
            <button
              onClick={() => handleWhatsAppConsult()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C5A059] text-black hover:bg-white transition-all font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg"
            >
              💬 WhatsApp Your Itinerary For Review <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
