import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  Compass, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  Users, 
  MapPin, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Map,
  Clock,
  Layers,
  Award
} from "lucide-react";

export default function SrilankaHowToUsePlannerPage() {
  usePageMetadata({
    title: "How to Use the Sri Lanka Trip Planner | Step-by-Step Guide",
    description: "Learn how to use the Sri Lanka Trip Planner to build a custom itinerary, calculate budgets, choose travel months, and map destinations in minutes.",
    canonicalUrl: "https://plan-srilanka.com/how-to-use-trip-planner",
    ogUrl: "https://plan-srilanka.com/how-to-use-trip-planner",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: "How accurate is the budget estimate?",
      a: "The budget estimates are based on real-time averages for transport, accommodation, meals, and attraction entrance fees across Sri Lanka. While actual spending varies by personal style and seasonality, the estimates provide a highly realistic financial benchmark."
    },
    {
      q: "Can I customize the itinerary after it's generated?",
      a: "Yes. You can easily adjust your inputs—such as changing the total days, travel companions, or month—to instantly regenerate alternative routes and stay options that fit your preferred pace."
    },
    {
      q: "Does the planner include flights?",
      a: "No, the planner focuses specifically on ground travel expenses within Sri Lanka. To search flight schedules and track inbound flights to Colombo, you can use our dedicated Flight Search Tool."
    },
    {
      q: "Is the planner free to use?",
      a: "Yes, the Sri Lanka Trip Planner is 100% free to use. There are no registration requirements, subscriptions, or hidden fees involved."
    },
    {
      q: "How far in advance should I plan my trip?",
      a: "We recommend planning 2 to 4 months in advance. This is particularly important for peak season travel (December to April), when boutique hotels and reserved train tickets sell out fast."
    },
    {
      q: "Does the tool take Sri Lanka's monsoons into account?",
      a: "Yes. Selecting your travel month helps the planner highlight weather-appropriate destinations, steering you toward sunny coasts and dry zones based on seasonal monsoon cycles."
    },
    {
      q: "Is the itinerary suitable for families traveling with children?",
      a: "Yes. Selecting 'Family' as your group type optimizes the route for child-friendly travel, recommending gentle activity pacing and accommodations with suitable amenities."
    }
  ];

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      {/* Schema Markups for Structured Search Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "How to Use the Sri Lanka Trip Planner",
          "description": "Comprehensive documentation and user guide for the interactive Sri Lanka Trip Planner tool. Learn how to configure travel parameters, generate itineraries, calculate costs, and optimize travel months.",
          "url": "https://plan-srilanka.com/how-to-use-trip-planner",
          "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
          "author": {
            "@type": "Organization",
            "name": "Plan Sri Lanka Editorial Team"
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
          "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        })}
      </script>

      {/* HERO SECTION */}
      <section className="relative py-16 md:py-24 bg-[#1e3a2f] text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-widest mx-auto">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            Official Documentation & User Guide
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white leading-tight tracking-tight">
            How to Use the Sri Lanka Trip Planner
          </h1>
          
          <p className="text-base sm:text-lg text-[#a3bfae] max-w-3xl mx-auto font-light leading-relaxed">
            Welcome to the official guide on <strong>how to use the Sri Lanka Trip Planner</strong>. Learn how to configure your travel inputs, generate day-by-day itineraries, estimate budgets accurately, and map your island journey in minutes.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              to="/sri-lanka-trip-planner"
              className="px-6 py-3.5 bg-[#d4af37] hover:bg-white text-black font-bold uppercase tracking-wider text-xs rounded-full shadow-lg transition-all flex items-center gap-2"
            >
              Launch Interactive Trip Planner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STICKY QUICK LINKS BAR */}
      <section className="sticky top-[70px] bg-white/95 backdrop-blur-md z-30 border-b border-[#1e3a2f]/10 shadow-sm py-3 px-4 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex gap-3 whitespace-nowrap text-xs font-medium">
          <a href="#what-is-planner" className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#1e3a2f] hover:text-white transition-all">What Is It</a>
          <a href="#how-it-works" className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#1e3a2f] hover:text-white transition-all">Step-by-Step</a>
          <a href="#why-use" className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#1e3a2f] hover:text-white transition-all">Why Use It</a>
          <a href="#destinations" className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#1e3a2f] hover:text-white transition-all">Destinations</a>
          <a href="#budget-tips" className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#1e3a2f] hover:text-white transition-all">Budget Tips</a>
          <a href="#best-months" className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#1e3a2f] hover:text-white transition-all">Travel Months</a>
          <a href="#example-itinerary" className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#1e3a2f] hover:text-white transition-all">Sample Itinerary</a>
          <a href="#faqs" className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#1e3a2f] hover:text-white transition-all">FAQs</a>
        </div>
      </section>

      {/* MAIN DOCUMENTATION CONTENT */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* SECTION 1: WHAT IS THE PLANNER */}
        <section id="what-is-planner" className="space-y-4 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] border-b border-[#1e3a2f]/10 pb-3">
            What Is the Sri Lanka Trip Planner
          </h2>
          <p className="text-base text-neutral-700 leading-relaxed font-light">
            The <strong>Sri Lanka Trip Planner</strong> is an interactive travel tool designed to help international travelers build custom, route-optimized trip itineraries across Sri Lanka. By taking into account key parameters such as total trip length, travel budget, party size, and arrival month, the planner generates a personalized schedule featuring daily destination recommendations, budget allocations, interactive route maps, and curated accommodation choices. It is engineered specifically for budget-conscious explorers, couples, families, and solo travelers seeking an efficient, stress-free planning process.
          </p>
        </section>

        {/* SECTION 2: HOW THE PLANNER WORKS (STEP-BY-STEP) */}
        <section id="how-it-works" className="space-y-6 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] border-b border-[#1e3a2f]/10 pb-3">
            How to Use the Sri Lanka Trip Planner: Step-by-Step
          </h2>
          <p className="text-base text-neutral-700 font-light leading-relaxed">
            Generating your custom Sri Lanka itinerary takes less than a minute. Follow these five simple steps inside the interactive tool:
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#d4af37]" /> Step 1: Enter Your Travel Duration
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Select the total number of days you plan to spend in Sri Lanka (typically between 3 to 21 days). The algorithm uses this duration to calculate realistic driving distances and optimal daily stops.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#d4af37]" /> Step 2: Set Your Total Travel Budget
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Input your target budget level (Budget, Mid-Range, or Luxury). This adjusts the financial estimates for private transport, hotel categories, daily dining, and landmark activity fees.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#d4af37]" /> Step 3: Choose Your Travel Companions
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Indicate whether you are traveling Solo, as a Couple, with Friends, or with Family. The planner uses this information to optimize activity pacing, transport vehicle sizing, and room arrangements.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm shrink-0">4</div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d4af37]" /> Step 4: Select Your Travel Month
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Choose the month of your visit. Because Sri Lanka experiences a dual-monsoon climate, the tool factors in seasonal weather windows to prioritize destinations with favorable conditions.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold text-sm shrink-0">5</div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37]" /> Step 5: Get Your Personalized Itinerary
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Click generate to view your complete travel plan. You will receive a day-by-day itinerary, destination overviews, an interactive route map, a category budget breakdown, and recommended accommodation options with price ranges.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#1e3a2f]/5 border border-[#1e3a2f]/10 rounded-2xl space-y-2">
            <h3 className="font-serif font-bold text-[#1e3a2f] text-base flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#d4af37]" /> What Happens After Submission?
            </h3>
            <p className="text-sm text-neutral-700 font-light leading-relaxed">
              Upon submitting your preferences, the application instantly renders a comprehensive travel dashboard. This includes day-by-day travel times, route visualizers, cost distribution charts (separating transport, meals, stays, and tickets), and links to book recommended lodging directly.
            </p>
          </div>
        </section>

        {/* SECTION 3: WHY USE THIS PLANNER */}
        <section id="why-use" className="space-y-6 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] border-b border-[#1e3a2f]/10 pb-3">
            Why Use This Planner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#1e3a2f] font-bold font-serif text-base">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span>Saves Planning Time</span>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Replaces hours of manual research across blogs and forums with a structured, route-optimized itinerary generated in seconds.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#1e3a2f] font-bold font-serif text-base">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span>Accurate Budget Estimates</span>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Provides realistic expense breakdowns across transit, dining, accommodations, and entry tickets to help prevent overspending.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#1e3a2f] font-bold font-serif text-base">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span>Monsoon & Weather Smart</span>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Automatically adjusts destination recommendations based on Sri Lanka's seasonal monsoons so you visit dry, sunny regions.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#1e3a2f] font-bold font-serif text-base">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span>Realistic Travel Times</span>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Calculates actual road transit durations between towns to ensure comfortable pacing and eliminate travel fatigue.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: BEST DESTINATIONS COVERED */}
        <section id="destinations" className="space-y-6 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] border-b border-[#1e3a2f]/10 pb-3">
            Best Destinations Covered
          </h2>
          <p className="text-base text-neutral-700 font-light leading-relaxed">
            The planner draws from Sri Lanka's premier destination clusters to create balanced travel routes:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-1">
              <h3 className="font-serif font-bold text-[#1e3a2f] text-base">Negombo</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Relaxed coastal beach town situated 20 minutes from Colombo Airport, perfect for initial rest after landing.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-1">
              <h3 className="font-serif font-bold text-[#1e3a2f] text-base">Sigiriya & Dambulla</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                The ancient Cultural Triangle featuring the Lion Rock Fortress, UNESCO cave temples, and national parks.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-1">
              <h3 className="font-serif font-bold text-[#1e3a2f] text-base">Kandy</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                The sacred hill capital surrounded by tea estates, royal botanical gardens, and the Temple of the Tooth.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-1">
              <h3 className="font-serif font-bold text-[#1e3a2f] text-base">Nuwara Eliya & Ella</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Highland tea country offering cool climate, scenic rail journeys, mountain hikes, and the Nine Arch Bridge.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-1">
              <h3 className="font-serif font-bold text-[#1e3a2f] text-base">Yala & Udawalawe</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                World-renowned wildlife sanctuaries famous for high leopard density, wild elephant herds, and 4x4 safaris.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-neutral-200 space-y-1">
              <h3 className="font-serif font-bold text-[#1e3a2f] text-base">Galle & Mirissa</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                17th-century Dutch colonial fort ramparts, golden beaches, coconut palm hills, and seasonal whale watching.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: BUDGET PLANNING TIPS */}
        <section id="budget-tips" className="space-y-6 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] border-b border-[#1e3a2f]/10 pb-3">
            Budget Planning Tips
          </h2>
          <div className="space-y-4 text-base text-neutral-700 font-light leading-relaxed">
            <p>
              Understanding how travel costs work in Sri Lanka helps you set realistic expectations before flying:
            </p>
            
            <ul className="space-y-3 pl-6 list-disc">
              <li>
                <strong>Typical Daily Cost Ranges:</strong> Expect typical daily land costs of <strong>$30 to $50 USD per person</strong> for budget travel (guesthouses, public transport, local eateries), <strong>$80 to $150 USD per person</strong> for mid-range comfort (3/4-star hotels, private driver, mixed dining), and <strong>$250+ USD per person</strong> for luxury stays.
              </li>
              <li>
                <strong>Factors Influencing Expenses:</strong> Accommodation tier and transport choices are the primary budget drivers. Hiring a dedicated private AC car with driver guide offers convenience and safety, with costs shared easily among couples or small groups.
              </li>
              <li>
                <strong>How Costs Are Calculated:</strong> The planner evaluates regional averages for hotel room rates, daily vehicle hire, entrance ticket prices (such as Sigiriya at $30 USD or Yala safaris), and meal expenses to generate category totals.
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif font-bold text-base text-[#1e3a2f]">Want to analyze specific regional flight & stay budgets?</h3>
              <p className="text-xs text-neutral-600 font-light">Explore our complete expense guide for regional travelers.</p>
            </div>
            <Link 
              to="/sri-lanka-trip-cost-from-india"
              className="px-5 py-2.5 bg-[#1e3a2f] hover:bg-[#d4af37] text-white hover:text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shrink-0"
            >
              View Trip Costs Guide
            </Link>
          </div>
        </section>

        {/* SECTION 6: BEST MONTHS TO TRAVEL */}
        <section id="best-months" className="space-y-6 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] border-b border-[#1e3a2f]/10 pb-3">
            Best Months to Travel (and How Seasonality Affects Your Route)
          </h2>
          <div className="space-y-4 text-base text-neutral-700 font-light leading-relaxed">
            <p>
              Sri Lanka is a year-round destination, but weather conditions vary by region due to two distinct monsoon cycles:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-xl border border-neutral-200 space-y-2">
                <h3 className="font-serif font-bold text-[#1e3a2f] text-base">December to April (Peak Season)</h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Best for the South & West Coasts (Galle, Mirissa, Bentota) and Central Highlands (Kandy, Ella). Expect sunny days, calm seas, and higher accommodation rates.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-neutral-200 space-y-2">
                <h3 className="font-serif font-bold text-[#1e3a2f] text-base">May to September (East Coast Season)</h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Best for the East Coast (Trincomalee, Arugam Bay, Passikudah) and Cultural Triangle. The southwest experiences monsoon rains, while the east remains dry and sunny.
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-600 font-light">
              By selecting your specific travel month in the planner, the algorithm adjusts the itinerary to favor regions experiencing peak dry conditions.
            </p>
          </div>
        </section>

        {/* SECTION 7: EXAMPLE ITINERARY */}
        <section id="example-itinerary" className="space-y-6 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] border-b border-[#1e3a2f]/10 pb-3">
            Example Itinerary
          </h2>
          <p className="text-base text-neutral-700 font-light leading-relaxed">
            Here is a realistic sample generated for a <strong>7-day couple's trip with a $700 USD mid-range budget</strong>:
          </p>

          <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-4">
            <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
              <span className="font-serif font-bold text-lg text-[#1e3a2f]">7-Day Classic Island Highlight Route</span>
              <span className="text-xs font-mono uppercase bg-[#1e3a2f]/10 text-[#1e3a2f] px-2.5 py-1 rounded-full font-bold">Couple • $700 Budget</span>
            </div>

            <ul className="space-y-3 text-sm text-neutral-700 font-light">
              <li className="flex gap-3">
                <span className="font-bold text-[#1e3a2f] shrink-0">Day 1:</span>
                <span><strong>Arrival in Negombo:</strong> Airport transfer, check-in at a seaside hotel, and evening coastal walk.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1e3a2f] shrink-0">Day 2:</span>
                <span><strong>Dambulla & Sigiriya:</strong> Visit Dambulla Cave Temple and climb Pidurangala Rock for sunset views over Sigiriya.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1e3a2f] shrink-0">Day 3:</span>
                <span><strong>Sigiriya Fortress to Kandy:</strong> Ascend the Lion Rock Citadel in the morning, then drive south to Kandy to visit the Temple of the Tooth.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1e3a2f] shrink-0">Day 4:</span>
                <span><strong>Highland Train to Ella:</strong> Board the scenic blue train through tea plantations and misty hills up to Ella town.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1e3a2f] shrink-0">Day 5:</span>
                <span><strong>Nine Arch Bridge & Yala Safari:</strong> Morning hike to Nine Arch Bridge, descend to Yala for an afternoon 4x4 leopard safari.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1e3a2f] shrink-0">Day 6:</span>
                <span><strong>Galle Dutch Fort:</strong> Travel along the southern coast to Galle Fort for cobblestone street walks and ocean bastion sunsets.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1e3a2f] shrink-0">Day 7:</span>
                <span><strong>Colombo Souvenirs & Departure:</strong> Southern Expressway drive to Colombo for tea shopping and evening airport transfer.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
        <section id="faqs" className="space-y-6 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a2f] border-b border-[#1e3a2f]/10 pb-3">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-serif font-bold text-[#1e3a2f] text-base">{item.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#d4af37] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="p-5 pt-0 text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9: INTERNAL LINKS & RECOMMENDED RESOURCES */}
        <section className="p-8 bg-white border border-neutral-200 rounded-2xl shadow-sm space-y-4">
          <h2 className="font-serif font-bold text-[#1e3a2f] text-xl">
            Recommended Sri Lanka Travel Resources
          </h2>
          <p className="text-sm text-neutral-600 font-light leading-relaxed">
            Continue planning your trip with our specialized guides and interactive tools:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link 
              to="/sri-lanka-trip-planner"
              className="p-3.5 bg-[#fcfbf7] border border-neutral-200 hover:border-[#d4af37] rounded-xl flex items-center justify-between text-xs font-bold text-[#1e3a2f] transition-all group"
            >
              <span>🗺️ Interactive Sri Lanka Trip Planner</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/sri-lanka-train-trip-planner"
              className="p-3.5 bg-[#fcfbf7] border border-neutral-200 hover:border-[#d4af37] rounded-xl flex items-center justify-between text-xs font-bold text-[#1e3a2f] transition-all group"
            >
              <span>🚂 Train Trip Planner & Interactive Route Map</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/sri-lanka-trip-cost-from-india"
              className="p-3.5 bg-[#fcfbf7] border border-neutral-200 hover:border-[#d4af37] rounded-xl flex items-center justify-between text-xs font-bold text-[#1e3a2f] transition-all group"
            >
              <span>💰 Sri Lanka Trip Cost & Budget Breakdown</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/sri-lanka-visa-for-indians"
              className="p-3.5 bg-[#fcfbf7] border border-neutral-200 hover:border-[#d4af37] rounded-xl flex items-center justify-between text-xs font-bold text-[#1e3a2f] transition-all group"
            >
              <span>📄 Sri Lanka Visa Guide (ETA Online Application)</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* TRUST & CREDIBILITY / EDITORIAL BYLINE NOTE */}
        <section className="p-6 bg-[#1e3a2f]/5 rounded-2xl border border-[#1e3a2f]/10 text-xs text-neutral-600 font-light flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-[#d4af37] shrink-0" />
          <div>
            <div className="font-serif font-bold text-[#1e3a2f] text-sm">Editorial Quality & Trust Assurance</div>
            <p className="mt-0.5">
              This documentation is published by Plan Sri Lanka's destination strategists and periodically updated to reflect local pricing changes, train schedule updates, and monsoon advisories.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
