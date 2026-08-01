import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import {
  ArrowRight,
  Sparkles,
  Sun,
  Sunset,
  Waves,
  PawPrint,
  TrainFront,
  Car,
  Users,
  HelpCircle,
  Check,
  MapPin,
  Clock,
  Compass
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaPrivateDriverSouthPage() {
  usePageMetadata({
    title: "Why You Should Consider a Private Driver for Your South Sri Lanka Road Trip",
    description: "Planning a 10-day South Sri Lanka road trip through Mirissa, Galle, Udawalawe & Ella? Timing tips for sunsets, turtles, safaris and the Demodara train — plus why a private driver beats self-driving.",
    canonicalUrl: "https://plan-srilanka.com/private-driver-south-sri-lanka",
    ogUrl: "https://plan-srilanka.com/private-driver-south-sri-lanka",
    ogImage: "https://images.unsplash.com/photo-1580889240912-c8f0f2c6d5f3?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    trackEvent("faq_toggle", "engagement", `private_driver_faq_${index}`);
  };

  const handlePlannerClick = (buttonId: string) => {
    trackEvent("private_driver_cta_click", "conversion", buttonId);
  };

  const faqs = [
    {
      q: "Do I need a private driver for South Sri Lanka, or is self-driving fine?",
      a: "Self-driving is possible on the coastal roads between Bentota, Galle, and Mirissa, but it gets far more demanding once you head inland toward Udawalawe and up into the hill country near Ella — narrow, winding roads with unfamiliar local traffic patterns. Many families prefer a private driver for exactly that stretch, even if they're comfortable driving the coast themselves."
    },
    {
      q: "How much does a private driver cost in Sri Lanka for a 10-day trip?",
      a: "Rates vary by vehicle type and season, but a private SUV or van with a local driver for a multi-day South Sri Lanka route is generally comparable to renting a self-drive car once you factor in fuel, tolls, and the value of not navigating unfamiliar roads yourself. Use our trip planner to get a route-specific estimate."
    },
    {
      q: "Can a private driver help plan the itinerary too, not just drive?",
      a: "Yes — local drivers on this route typically know current timings for Udawalawe safaris, calmer snorkeling windows, and the best sunset views at Galle Fort, and can adjust your day if something changes (weather, park closures, a spot you want to linger at)."
    },
    {
      q: "Is a private SUV/van transfer suitable for families with children?",
      a: "Very much so. Air-conditioned SUVs and vans give kids room to nap between stops, and the flexibility to pull over for a bathroom break or a roadside snack — something that's much harder to manage when you're the one driving on unfamiliar mountain roads."
    }
  ];

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      {/* SCHEMA MARKUPS */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Why You Should Consider a Private Driver for Your South Sri Lanka Road Trip",
          "description": "Timing tips for Galle Fort sunsets, turtle snorkeling, Udawalawe safaris, and the Ella-Demodara train, plus why a private driver is a stress-free alternative to self-driving in South Sri Lanka.",
          "image": "https://images.unsplash.com/photo-1580889240912-c8f0f2c6d5f3?auto=format&fit=crop&q=80&w=1200&h=630",
          "author": {
            "@type": "Person",
            "name": "Adithya Oshada",
            "jobTitle": "Lead Ceylon Travel Stylist"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Plan Sri Lanka",
            "url": "https://plan-srilanka.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://plan-srilanka.com/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://plan-srilanka.com/private-driver-south-sri-lanka"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://plan-srilanka.com/" },
            { "@type": "ListItem", "position": 2, "name": "Travel Guides", "item": "https://plan-srilanka.com/blog" },
            { "@type": "ListItem", "position": 3, "name": "Private Driver for South Sri Lanka", "item": "https://plan-srilanka.com/private-driver-south-sri-lanka" }
          ]
        })}
      </script>

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

      {/* HERO */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#1e3a2f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mx-auto">
            <Sparkles className="w-4 h-4" />
            South Coast &amp; Hill Country Road Trip Guide
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white leading-tight max-w-4xl mx-auto tracking-tight">
            Why You Should Consider a Private Driver for Your South Sri Lanka Road Trip
          </h1>

          <p className="text-sm md:text-lg text-[#a3bfae] font-light max-w-3xl mx-auto leading-relaxed">
            A 10-day loop through Mirissa, Galle, Hiriketiya, Udawalawe, Ella, and Bentota is one of the best trips on the island — here's how to time each stop, and why so many families skip the rental car.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/sri-lanka-trip-planner"
              onClick={() => handlePlannerClick("hero_cta")}
              className="px-6 py-3 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              Plan Your Route <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/sri-lanka-trip-cost-from-india" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-[10px] rounded-xl border border-white/10 transition-all">
              💰 See Trip Costs
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK LINKS SUB-BAR */}
      <section className="bg-white border-b border-neutral-100 py-3 shadow-sm sticky top-[70px] z-30 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-6 flex gap-4 text-xs font-semibold whitespace-nowrap">
          <span className="text-neutral-400 self-center uppercase tracking-wider text-[10px]">Related Guides:</span>
          <Link to="/sri-lanka-trip-planner" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">🗺️ Trip Planner</Link>
          <Link to="/sri-lanka-trip-cost-from-india" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">💰 Trip Cost from India</Link>
          <Link to="/sri-lanka-7-day-itinerary" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">📅 7-Day Itinerary</Link>
          <Link to="/best-time-to-visit-sri-lanka" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">☀️ Best Time to Visit</Link>
          <Link to="/sri-lanka-visa-for-indians" className="text-[#1a2d24] hover:text-[#d4af37] transition-all">🛂 Visa Guide</Link>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* INTRO / AI-EXTRACTABLE SUMMARY */}
        <section className="p-8 bg-white border border-[#d4af37]/30 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]" />
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold block">
              Quick Answer
            </span>
            <p className="text-base sm:text-lg text-[#1e3a2f] leading-relaxed font-light">
              Ten days in the south of Sri Lanka is one of the best trips you can plan on this island — golden beaches, sea turtles, wild elephants, misty tea country, and a UNESCO fort all within a few hours of each other. The route most travelers follow looks something like Bentota → Hiriketiya → Mirissa → Galle → Udawalawe → Ella, and every stop rewards good timing. Self-driving is tempting, especially if you're used to road trips back home, but a growing number of visitors are choosing to hire a <strong>private driver in Sri Lanka</strong> instead, simply because it makes the whole trip easier to enjoy. Below are a few timing tips for the highlights along this route, plus an honest look at why so many families skip the rental car.
            </p>
          </div>
        </section>

        {/* SECTION 1: Galle Fort Sunset */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <Sunset className="w-6 h-6 text-[#d4af37]" />
            Best Time to Visit Galle Fort for Sunset
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Galle Fort is worth visiting any time of day, but if you only get one visit in, make it late afternoon. Arriving around 4:30–5:30pm gives you time to wander the old Dutch ramparts while the worst of the heat has passed, then find a spot on the sea wall as the light turns gold and the lighthouse catches the last sun.
            </p>
            <p>
              This is genuinely the <strong>best time to visit Galle Fort for sunset</strong> — the stone glows, the crowds thin out a little, and the cafés along the ramparts start lighting up for the evening. Bring water, wear shoes you can walk cobblestones in, and give yourself at least two hours to explore before the sky puts on its show.
            </p>
          </div>
        </section>

        {/* SECTION 2: Turtles */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <Waves className="w-6 h-6 text-[#d4af37]" />
            Best Time to Snorkel with Turtles in Sri Lanka
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Along this coast — whether you're at Hikkaduwa, Polhena near Mirissa, or one of the quieter turtle points near Weligama — mornings are everything. The <strong>best time to snorkel with turtles in Sri Lanka</strong> is early, ideally before 9am, while the sea is still glassy and the wind hasn't picked up yet.
            </p>
            <p>
              Calmer water means better visibility, and turtles tend to be more relaxed feeding on sea grass before the boat traffic and swimmers arrive. Go later in the day and you'll often find the same spot choppy and cloudy with stirred-up sand. If turtles are high on your list, this is one timing rule worth building your morning around.
            </p>
          </div>
        </section>

        {/* SECTION 3: Udawalawe Safari */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <PawPrint className="w-6 h-6 text-[#d4af37]" />
            Udawalawe Safari Timing for the Best Wildlife Sightings
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Udawalawe National Park is one of the most reliable places in Sri Lanka to see wild elephants, but timing genuinely changes the experience. The <strong>best time to start a Udawalawe National Park safari</strong> for wildlife sightings is right at gate opening, around 6am.
            </p>
            <p>
              Elephants, buffalo, and birdlife are far more active in the cool early morning air, often gathering near the reservoir before retreating into the shade as temperatures climb. Book your jeep the evening before, and pack a light jacket — open-top jeeps get surprisingly chilly before sunrise.
            </p>
          </div>
        </section>

        {/* SECTION 4: Ella to Demodara train */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <TrainFront className="w-6 h-6 text-[#d4af37]" />
            Ella to Demodara: A Short but Unforgettable Train Ride
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              If there's one experience people talk about for years afterward, it's the train through the hill country, and the short stretch between Ella and Demodara is a perfect, low-commitment way to try it. It only takes around 45 minutes to an hour, but the <strong>Ella to Demodara scenic train ride</strong> is consistently rated one of the most scenic train journeys in the world — winding through bright green tea plantations, past waterfalls, and directly over the famous Nine Arches Bridge, where you'll see almost as many people posing on the tracks as riding the train itself.
            </p>
            <p>
              Grab a window seat, or stand near an open doorway (carefully) for the classic photo — a small addition to your itinerary that delivers an outsized memory.
            </p>
          </div>
        </section>

        {/* SECTION 5: Private SUV / Van Transfers (main promotional section) */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] flex items-center gap-2">
            <Car className="w-6 h-6 text-[#d4af37]" />
            Private SUV and Van Transfers in South Sri Lanka: A Stress-Free Alternative to Self-Driving
          </h2>
          <div className="text-base text-neutral-800 font-light leading-relaxed space-y-4">
            <p>
              Here's the part that changes how the whole trip feels: how you actually get between these places. The coastal roads from Bentota to Galle are manageable enough, but once you head inland toward Udawalawe and up into the hill country toward Ella, the driving gets genuinely demanding — narrow, winding roads and drop-offs that keep your hands tight on the wheel instead of your eyes on the view.
            </p>
            <p>
              This is exactly why so many families and couples choose a <strong>private SUV or van with a local driver</strong> instead of renting a car. A typical private transfer and sightseeing service in the south includes:
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <li className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Check className="w-5 h-5 text-[#d4af37]" />
                  <span>Comfortable, A/C Transport</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Air-conditioned SUV or van transport between each stop on your route, keeping everyone comfortable through the heat of the day.
                </p>
              </li>
              <li className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                  <span>A Driver Who Knows the Roads</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  A local driver who genuinely knows the roads, the shortcuts, and the best times to travel each stretch.
                </p>
              </li>
              <li className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Compass className="w-5 h-5 text-[#d4af37]" />
                  <span>Flexibility to Stop</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Stop wherever something catches your eye — a fruit stall, a viewpoint, a roadside temple — without it derailing your schedule.
                </p>
              </li>
              <li className="p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1e3a2f]">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <span>More Time to Relax</span>
                </div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  More time to actually look up and enjoy the scenery, instead of concentrating on hairpin bends.
                </p>
              </li>
            </ul>

            <p>
              This kind of door-to-door private transfer and sightseeing tour is especially popular with families planning a <strong>stress-free South Sri Lanka itinerary</strong>. It removes the guesswork around drive times between places like Udawalawe and Ella — a stretch that can easily surprise self-drivers — and turns transit time into part of the holiday rather than a chore to get through. Your driver also becomes a resource: suggesting where to eat, what to skip if you're short on time, and adjusting the day if plans change.
            </p>
            <p>
              Ready to map this route to your own dates? Our <Link to="/sri-lanka-trip-planner" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">free trip planner</Link> can help you sequence these stops and estimate driving times, and our <Link to="/sri-lanka-trip-cost-from-india" className="text-[#d4af37] underline font-semibold hover:text-[#1e3a2f] transition-colors">trip cost guide</Link> breaks down what a private driver adds to your overall budget.
            </p>
          </div>
        </section>

        {/* FAQ SECTION */}
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

        {/* FINAL THOUGHTS + CTA */}
        <section className="bg-[#1e3a2f] text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-[#d4af37]/20 text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1),transparent_50%)]" />
          <div className="relative space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] font-semibold flex items-center justify-center gap-2">
              <Users className="w-4 h-4" /> Final Thoughts
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Plan Your South Sri Lanka Road Trip
            </h2>
            <p className="text-sm md:text-base text-[#a3bfae] font-light leading-relaxed">
              Ten days through Bentota, Hiriketiya, Mirissa, Galle, Udawalawe, and Ella gives you one of the best cross-sections of what Sri Lanka does well — beaches, wildlife, culture, and mountains, all in one loop. Whether you self-drive or hire a private driver for your Sri Lanka road trip, getting your timing right at each stop — sunset at Galle Fort, mornings for turtles and safaris, that short scenic ride to Demodara — will make a real difference to how much you enjoy each place. And if you'd rather spend the trip looking out the window instead of at a map, arranging a private SUV or van with local sightseeing stops is a simple way to make the journey itself one of the best parts of the holiday.
            </p>
          </div>

          <div className="relative pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link
              to="/sri-lanka-trip-planner"
              onClick={() => handlePlannerClick("final_cta")}
              className="px-8 py-4 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all"
            >
              Plan Your Private Transfer Route
            </Link>
            <Link
              to="/sri-lanka-7-day-itinerary"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-xl border border-white/10 transition-all"
            >
              View the 7-Day Itinerary
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
