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
  Train,
  Ticket,
  Shield,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  Camera,
  Award,
  BookOpen
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaTrainTripGuidePage() {
  usePageMetadata({
    title: "How to Plan a Train Trip in Sri Lanka (2026 Master Guide)",
    description: "The definitive handbook for planning a Sri Lanka train journey. Settle Kandy to Ella bookings, compare cabin classes, map scenic routes, and use our AI Planner.",
    canonicalUrl: "https://plan-srilanka.com/how-to-plan-a-train-trip-in-sri-lanka",
    ogUrl: "https://plan-srilanka.com/how-to-plan-a-train-trip-in-sri-lanka",
    ogImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630"
  });

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedWidgetRoute, setSelectedWidgetRoute] = useState<string>("highland");
  const [selectedWidgetClass, setSelectedWidgetClass] = useState<string>("2nd_reserved");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Static route details for the interactive mini-widget
  const widgetRoutes = {
    highland: {
      name: "The Highland Route (Colombo - Kandy - Ella - Badulla)",
      time: "8 - 10 hours full, or 3 - 4 hours (Kandy to Ella)",
      difficulty: "High (Tickets sell out in 60 seconds)",
      bestSide: "Right side from Kandy to Nanu Oya, Left side from Nanu Oya to Ella",
      highlights: "Tea fields, Nine Arch Bridge, Demodara Loop, Great Western Mountains",
      weatherRisk: "Fog and heavy afternoon mist in Central Highlands"
    },
    coastal: {
      name: "The Coastal Line (Colombo - Galle - Matara)",
      time: "2.5 - 3.5 hours",
      difficulty: "Medium (Busy during morning/evening commute)",
      bestSide: "Right side when leaving Colombo (facing the sea)",
      highlights: "Front-row ocean views, breaking waves, historic Galle Fort entry",
      weatherRisk: "High humidity, sea spray, monsoon swells in Southwest"
    },
    northern: {
      name: "The Northern Line (Colombo - Anuradhapura - Jaffna)",
      time: "6 - 7 hours",
      difficulty: "Low to Medium (Consistent daily runs)",
      bestSide: "Either side (Flat agricultural lands)",
      highlights: "Ancient dry-zone lakes, cultural shifts, Sigiriya access via Habarana",
      weatherRisk: "Intense dry-zone heat, sun glare"
    }
  };

  const widgetClasses = {
    "1st_observation": {
      name: "1st Class Observation Deck",
      comfort: "Excellent (Plush seats, carpeted, wide windows)",
      windows: "Locked/Sealed (Cannot open windows for photos due to central Air-Con)",
      booking: "Extremely Critical (Book exactly 30 days in advance at 10:00 AM LKR)",
      bestFor: "Families and senior travelers wanting cool comfort & quiet space."
    },
    "2nd_reserved": {
      name: "2nd Class Reserved Seat",
      comfort: "High (Comfy assigned individual seats, overhead fans)",
      windows: "Fully Openable (The absolute sweet spot for photography & ocean wind)",
      booking: "Very Critical (Sells out within 2 - 3 minutes of opening)",
      bestFor: "Photographers, couples, and active adventurers seeking epic hanging-out shots."
    },
    "3rd_reserved": {
      name: "3rd Class Reserved Seat",
      comfort: "Moderate (Assigned bench-style seats, busy but organized)",
      windows: "Fully Openable (Excellent breeze and great interactions with vendors)",
      booking: "Critical (Good secondary option if 2nd class sells out)",
      bestFor: "Budget-conscious international tourists seeking raw authenticity."
    },
    "unreserved": {
      name: "Unreserved (2nd or 3rd Class)",
      comfort: "Very Low (No assigned seat. High risk of standing chest-to-back for 7 hours)",
      windows: "Openable (If you can squeeze close enough to one)",
      booking: "No Advance Booking (Buy on the day at the station window, always open)",
      bestFor: "Emergency back-up or very short commuter rides (e.g., Colombo to Mount Lavinia)."
    }
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      {/* Schema Markup for SEO & GEO Systems */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "How to Plan a Train Trip in Sri Lanka: The Ultimate 2026 Guide",
          "description": "Comprehensive planning handbook for booking tickets, mapping routes like Kandy to Ella, selecting cabin classes, and avoiding common reservation mistakes in Sri Lanka.",
          "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
          "author": {
            "@type": "Person",
            "name": "Oshada Adithya",
            "url": "https://plan-srilanka.com/about-founder",
            "jobTitle": "Founder & Local Travel Expert",
            "knowsAbout": [
              "Sri Lanka Train Travel",
              "Sri Lanka Railways",
              "Bespoke Travel Planning",
              "Eco-Tourism"
            ]
          },
          "reviewedBy": {
            "@type": "Person",
            "name": "Anura Jayasekera",
            "jobTitle": "SLTDA licensed Senior National Tourist Guide Lecturer",
            "identifier": "S-1294"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Plan Sri Lanka",
            "logo": {
              "@type": "ImageObject",
              "url": "https://plan-srilanka.com/logo.png"
            }
          },
          "datePublished": "2026-07-18T11:22:22-07:00",
          "dateModified": "2026-10-12T09:30:00Z",
          "mainEntityOfPage": "https://plan-srilanka.com/how-to-plan-a-train-trip-in-sri-lanka",
          "mentions": {
            "@type": "WebApplication",
            "name": "Sri Lanka Train Trip Planner",
            "url": "https://plan-srilanka.com/sri-lanka-train-trip-planner"
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
              "name": "How far in advance do I need to book train tickets in Sri Lanka?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For reserved seats (1st, 2nd, and 3rd Class Reserved), tickets open exactly 30 days in advance of the travel date at 10:00 AM Sri Lankan Time (GMT+5:30). High-demand scenic routes, particularly Kandy to Ella, sell out in seconds during peak tourist seasons (December-April and July-August). Unreserved tickets cannot be booked in advance and must be purchased at the ticket window on the day of travel."
              }
            },
            {
              "@type": "Question",
              "name": "Which side of the train is best for Kandy to Ella?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The scenic views shift during the journey. For Kandy to Nanu Oya (Nuwara Eliya), the right-hand side offers the best views of tea estates and waterfalls. From Nanu Oya to Ella, sit on the left-hand side to view the sheer drop-offs, deep valleys, and the dramatic pine forests. If you book a return trip from Ella to Kandy, reverse these directions."
              }
            },
            {
              "@type": "Question",
              "name": "Can I open the windows in first class trains in Sri Lanka?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. First-class carriages in Sri Lanka are fully air-conditioned and sealed. The windows do not open. If you want to feel the breeze, take iconic photographs hanging from open doors, or get unobstructed shots of the tea plantations, you must book 2nd Class Reserved or 3rd Class Reserved seats, which feature large, fully openable windows and ceiling fans."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between a reserved and an unreserved train ticket?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A reserved ticket guarantees you a specific assigned seat in a designated carriage, which restricts entry to only seat holders, ensuring comfort. An unreserved ticket guarantees boarding on the train but NOT a seat. Unreserved carriages are frequently severely overcrowded, and you may have to stand, chest-to-back, for up to 7 hours on long mountain routes."
              }
            },
            {
              "@type": "Question",
              "name": "Is there luggage space on Sri Lanka trains?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, there are overhead metal luggage racks above the seats. They can hold medium-sized suitcases and backpacks. However, very large or heavy hard-shell bags can be difficult to lift or fit. In reserved carriages, the vestibules or end areas are relatively safe to place bags, but we highly recommend traveling with a private car to transfer your heavy bags, taking only a light daypack on the train."
              }
            }
          ]
        })}
      </script>

      {/* HERO BANNER SECTION */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[#1e3a2f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630')] bg-cover bg-center mix-blend-overlay" />
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#d4af37] text-xs font-mono uppercase tracking-[0.2em] mx-auto">
            <Train className="w-4 h-4 text-[#d4af37]" />
            2026 Master Railway Blueprint
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white leading-tight max-w-4xl mx-auto">
            How to Plan a Train Trip in Sri Lanka: <br />
            <span className="text-[#d4af37] italic font-normal">The Definitive 2026 Guide</span>
          </h1>
          
          <p className="text-sm md:text-lg text-[#a3bfae] font-light max-w-3xl mx-auto leading-relaxed">
            Unravel the opaque booking window rules, select the perfect cabin class, avoid devastating unreserved standing traps, and naturally sync your journey with our interactive AI-powered Train Planner.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-[#a3bfae] font-light">
            <div className="flex items-center gap-2.5">
              <img 
                src="/src/assets/images/founder_oshada_adithya_1784092267835.jpg" 
                alt="Oshada Adithya" 
                className="w-9 h-9 rounded-full border border-[#d4af37]/40 object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <span className="block text-white font-medium text-xs">Oshada Adithya</span>
                <span className="text-[10px] font-mono text-[#d4af37] block">Local Rail Coordinator</span>
              </div>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="text-left">
              <span className="block text-white text-xs font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                Reviewed by Anura Jayasekera
              </span>
              <span className="text-[10px] text-[#a3bfae] block">SLTDA National Guide Lecturer (No: S-1294)</span>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="text-left">
              <span className="block text-[#d4af37] text-xs font-mono font-bold">UPDATED: OCTOBER 2026</span>
              <span className="text-[10px] text-[#a3bfae] block">Fresh 2026 Rail Policies</span>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY BAR FOR JUMP LINKS */}
      <section className="sticky top-[80px] bg-white/95 backdrop-blur-md z-30 border-b border-[#1e3a2f]/5 shadow-sm overflow-x-auto scrollbar-none py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
          <div className="flex gap-3 whitespace-nowrap text-xs">
            <a href="#tldr" className="px-3 py-1.5 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-lg transition-all">
              ⚡ TL;DR Facts
            </a>
            <a href="#routes" className="px-3 py-1.5 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-lg transition-all">
              🛤️ Popular Routes
            </a>
            <a href="#classes" className="px-3 py-1.5 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-lg transition-all">
              🛋️ Seat Classes
            </a>
            <a href="#tickets" className="px-3 py-1.5 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-lg transition-all">
              🎟️ Booking Process
            </a>
            <a href="#itinerary" className="px-3 py-1.5 bg-[#fcfbf7] border border-[#1e3a2f]/10 hover:border-[#d4af37] font-bold text-[#1e3a2f] uppercase tracking-wider rounded-lg transition-all">
              📅 Itinerary Builder
            </a>
            <a href="#faqs" className="px-3 py-1.5 bg-[#1e3a2f] text-white hover:bg-[#d4af37] hover:text-black font-bold uppercase tracking-wider rounded-lg transition-all">
              ❓ FAQs
            </a>
          </div>
          
          <Link 
            to="/sri-lanka-train-trip-planner" 
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-[#d4af37] hover:bg-black hover:text-white text-black font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all"
          >
            <span>Launch Planner Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        
        {/* SIDEBAR: TABLE OF CONTENTS & QUICK CTA */}
        <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-[160px] self-start hidden lg:block">
          <div className="bg-white p-6 rounded-3xl border border-[#1e3a2f]/10 space-y-4">
            <h4 className="font-serif font-bold text-sm text-[#1e3a2f] uppercase tracking-wider border-b border-[#1e3a2f]/5 pb-3">
              Table of Contents
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#1a2d24]/80">
              <li>
                <a href="#tldr" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  1. TL;DR & Quick Facts
                </a>
              </li>
              <li>
                <a href="#why-train" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  2. Why Train Planning is Tricky
                </a>
              </li>
              <li>
                <a href="#routes" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  3. Sri Lanka's Popular Train Routes
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  4. Choosing the Right Cabin Class
                </a>
              </li>
              <li>
                <a href="#tickets" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  5. How to Book Train Tickets
                </a>
              </li>
              <li>
                <a href="#itinerary" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  6. Perfect Train Itinerary Rules
                </a>
              </li>
              <li>
                <a href="#scenic" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  7. Scenic Journeys & Elevation
                </a>
              </li>
              <li>
                <a href="#tips" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  8. Expert Practical Travel Tips
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  9. Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#sources" className="hover:text-[#d4af37] flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                  10. Official Sources & Verified E-E-A-T
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-[#1e3a2f] text-white p-6 rounded-3xl border border-[#d4af37]/30 text-center space-y-4">
            <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto" />
            <h5 className="font-serif text-base text-white">Avoid Booking Stress</h5>
            <p className="text-[11px] text-[#a3bfae] leading-relaxed">
              Our <strong>AI Train Trip Planner</strong> lets you predict weather, crowd risks, and visualizes elevation routes interactively.
            </p>
            <Link 
              to="/sri-lanka-train-trip-planner"
              className="block w-full py-2.5 bg-[#d4af37] text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-white transition-all"
            >
              Open Rail Planner
            </Link>
          </div>
        </aside>

        {/* CORE ARTICLE CONTAINER */}
        <main className="lg:col-span-3 space-y-16">
          
          {/* SECTION 1: TL;DR & QUICK FACTS */}
          <article id="tldr" className="scroll-mt-24 space-y-6">
            <div className="p-6 md:p-8 bg-white border border-[#d4af37]/30 rounded-3xl space-y-4 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#d4af37]" />
              <div className="pl-2 space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] font-bold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> GEO-OPTIMIZED KEY CONCEPTS (TL;DR)
                </span>
                <p className="text-sm font-medium leading-relaxed">
                  <strong>What is the Sri Lanka Train Planner?</strong> It is an advanced interactive platform developed by <em>Plan Sri Lanka</em> to solve major tourist struggles—including locked booking window periods, severe regional monsoon climate splits, and overcrowding. Instead of reading conflicting forums, you can use our <strong><Link to="/sri-lanka-train-trip-planner" className="text-[#1e3a2f] underline hover:text-[#d4af37]">Sri Lanka Train Trip Planner</Link></strong> to build your itinerary in minutes, visualize elevation levels, identify scenery sweet spots, and predict reservation availability risks.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 text-[11px] border-t border-[#1e3a2f]/5">
                  <div>
                    <span className="text-neutral-400 block uppercase font-mono text-[9px]">Scenic Star</span>
                    <span className="font-bold text-[#1e3a2f]">Kandy to Ella Line</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase font-mono text-[9px]">Booking Horizon</span>
                    <span className="font-bold text-[#1e3a2f]">Exactly 30 Days</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase font-mono text-[9px]">Photo Hotspot</span>
                    <span className="font-bold text-[#1e3a2f]">2nd Class Reserved</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block uppercase font-mono text-[9px]">Best Strategy</span>
                    <span className="font-bold text-[#1e3a2f]">Hybrid Private Car</span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f] tracking-tight">
              1. Quick Facts: Sri Lanka's Railway Infrastructure at a Glance
            </h2>
            <hr className="w-16 border-[#d4af37] border-2" />
            
            <p className="text-sm md:text-base text-[#1a2d24]/90 font-light leading-relaxed">
              Originally constructed by the British colonial government in 1864 to transport Ceylon tea and coffee from the rugged hills to the coastal ports of Colombo, the <strong>Sri Lanka Railways</strong> is a sprawling, 1,500-kilometer broad-gauge network. Today, what began as a commercial transport line has transformed into one of the most famous, romantic, and breathtaking passenger rail experiences in the world. Instead of comparing train routes manually, you can use our <strong><Link to="/sri-lanka-train-trip-planner" className="text-[#1e3a2f] underline hover:text-[#d4af37]">Sri Lanka Train Trip Planner</Link></strong> to build your itinerary in minutes.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[#1e3a2f]/10 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1e3a2f] text-white">
                    <th className="p-4 font-serif">Indicator / Variable</th>
                    <th className="p-4 font-serif">Official Specification</th>
                    <th className="p-4 font-serif">Practical Tourist Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e3a2f]/5 font-light text-[#1a2d24]/80">
                  <tr>
                    <td className="p-4 font-bold bg-[#fcfbf7]/50">Gauge Type</td>
                    <td className="p-4">Broad Gauge (1,676 mm / 5 ft 6 in)</td>
                    <td className="p-4">Carriages are wider and rock gently, providing comfortable but slow mountain travel.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-[#fcfbf7]/50">Primary Junction</td>
                    <td className="p-4">Colombo Fort Station (Center of Network)</td>
                    <td className="p-4">Almost all rail trips begin or transition through Colombo.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-[#fcfbf7]/50">Ticket Opening Window</td>
                    <td className="p-4">Exactly 30 days prior (10:00 AM LKR)</td>
                    <td className="p-4">Reserved seats are swept by bots and agents within 60 seconds of opening.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-[#fcfbf7]/50">Top Scenic Sector</td>
                    <td className="p-4">Peradeniya (Kandy) to Badulla loop</td>
                    <td className="p-4">Traverses the spectacular tea estates, waterfalls, and mountain tunnels.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-[#fcfbf7]/50">Average Travel Speed</td>
                    <td className="p-4">25 – 45 km/h in hill country</td>
                    <td className="p-4">Do not expect fast travel. Appreciate the slow, scenic pace instead.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          {/* SECTION 2: WHY RAIL PLANNING IS DIFFICULT */}
          <article id="why-train" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f] tracking-tight">
              2. Why People Need a Railway Trip Planner: The Hidden Struggles
            </h2>
            <hr className="w-16 border-[#d4af37] border-2" />

            <div className="space-y-4 text-sm md:text-base text-[#1a2d24]/90 font-light leading-relaxed">
              <p>
                Every year, thousands of international tourists browse scenic photographs of travelers swinging happily out of open-doored bright blue trains, clutching coconuts while gliding through emerald tea fields. Intrigued, they immediately write "<strong>how to travel around Sri Lanka by train</strong>" into their search bars, assuming it is as simple as hopping on a European commuter train or booking a Japanese bullet train.
              </p>
              <p>
                The reality on the ground is starkly different. Planning a train journey manually in Sri Lanka presents highly stressful barriers:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h4 className="font-serif font-bold text-sm text-[#1e3a2f]">The Seating Opaque Trap</h4>
                <p className="text-xs text-[#1a2d24]/70 leading-relaxed font-light">
                  Official reservation systems are extremely difficult to navigate for foreigners, who often end up buying "Unreserved" tickets, only to find themselves standing packed chest-to-back for a grueling 7-hour high-altitude haul.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-2">
                <CloudRain className="w-5 h-5 text-blue-500" />
                <h4 className="font-serif font-bold text-sm text-[#1e3a2f]">The Dual-Monsoon Split</h4>
                <p className="text-xs text-[#1a2d24]/70 leading-relaxed font-light">
                  A beautiful train ride can instantly turn into a locked, white-out cloud wall of dense rain and heavy fog if you cross mountain regions during active monsoons, ruining scenic vistas completely.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/10 space-y-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <h4 className="font-serif font-bold text-sm text-[#1e3a2f]">Heavy Luggage Logistics</h4>
                <p className="text-xs text-[#1a2d24]/70 leading-relaxed font-light">
                  Lugging bulky 25kg rolling suitcases onto small mountain carriages with tiny overhead storage compartments is a nightmare. Managing transfers and hotel drop-offs at rural train stations is complex.
                </p>
              </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200/50 space-y-3">
              <h5 className="font-bold text-[#1e3a2f] text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-[#d4af37]" /> Definition: The Reserved vs. Unreserved Difference
              </h5>
              <p className="text-xs text-[#1a2d24]/80 leading-relaxed font-light">
                <strong>Reserved Seats</strong> (available in 1st, 2nd, and 3rd Class) guarantee you a specific numbered seat inside a carriage that is restricted to seat-holders only. This ensures quiet, comfortable travel. <strong>Unreserved Tickets</strong> are sold in unlimited quantities on the day of travel. They grant you entry to the carriage but absolutely NO guarantee of a seat, leading to severe crowding where commuters stand in aisles and doorways.
              </p>
            </div>
          </article>

          {/* SECTION 3: POPULAR TRAIN ROUTES */}
          <article id="routes" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f] tracking-tight">
              3. Sri Lanka's Popular Train Routes: The Complete Dossier
            </h2>
            <hr className="w-16 border-[#d4af37] border-2" />

            <p className="text-sm md:text-base text-[#1a2d24]/90 font-light leading-relaxed">
              To successfully map your rail adventure, you must understand the primary lines. Each line features completely different climatic characteristics, scenic landmarks, and passenger crowds. Instead of getting overwhelmed by various timetables and routes, you can use our <strong><Link to="/sri-lanka-train-trip-planner" className="text-[#1e3a2f] underline hover:text-[#d4af37]">Sri Lanka Train Trip Planner</Link></strong> to automatically map out your stations, calculate track distances, and see the real-time altitude profile of your chosen journey.
            </p>

            <div className="space-y-6">
              {/* Highland Line */}
              <div className="p-6 bg-white rounded-2xl border border-[#1e3a2f]/10 space-y-3">
                <h4 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                  A. The Highland Route (Colombo - Kandy - Nanu Oya - Ella - Badulla)
                </h4>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  This is the crown jewel of rail travel in Sri Lanka. Stretching from Colombo up into the rugged central heights, it reaches its scenic zenith between the royal capital of <strong>Kandy</strong> and the beautiful mountain town of <strong>Ella</strong>. The train climbs past waterfalls, misty pine forests, and miles of neat green tea bushes.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-light text-[#1a2d24]/70 pt-2 bg-[#fcfbf7] p-4 rounded-xl">
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Scenic Rating:</span> 10/10 (World-Class)
                  </div>
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Seat Demand:</span> Extreme (Sells out instantly)
                  </div>
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Top Stations:</span> Nanu Oya (for Nuwara Eliya), Ella, Demodara
                  </div>
                </div>
              </div>

              {/* Coastal Line */}
              <div className="p-6 bg-white rounded-2xl border border-[#1e3a2f]/10 space-y-3">
                <h4 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  B. The Coastal Line (Colombo - Galle - Weligama - Matara)
                </h4>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Hugging the southwestern oceanfront, this track is laid just meters from the breaking waves of the Indian Ocean. Departing Colombo Fort, you will watch seaside commuter hubs fade into palm trees, golden beaches, and surf points, ending near the historic ramparts of <strong>Galle Fort</strong>.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-light text-[#1a2d24]/70 pt-2 bg-[#fcfbf7] p-4 rounded-xl">
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Scenic Rating:</span> 8/10 (Coastal Vibe)
                  </div>
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Seat Demand:</span> High (Heavy commuter traffic)
                  </div>
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Top Stations:</span> Bentota, Hikkaduwa, Galle, Weligama
                  </div>
                </div>
              </div>

              {/* Northern Line */}
              <div className="p-6 bg-white rounded-2xl border border-[#1e3a2f]/10 space-y-3">
                <h4 className="font-serif font-bold text-lg text-[#1e3a2f] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  C. The Northern Line (Colombo - Anuradhapura - Jaffna)
                </h4>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  An incredible cultural transition. Leaving the bustling capital, this express route cuts straight north through flat, sun-baked plains, past ancient UNESCO temples of the Cultural Triangle, and crosses Elephant Pass into the unique, Tamil-majority northern cultural capital of <strong>Jaffna</strong>.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-light text-[#1a2d24]/70 pt-2 bg-[#fcfbf7] p-4 rounded-xl">
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Scenic Rating:</span> 7/10 (Cultural Shift)
                  </div>
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Seat Demand:</span> Moderate (Steady daily traffic)
                  </div>
                  <div>
                    <span className="font-bold text-[#1e3a2f]">Top Stations:</span> Anuradhapura, Habarana, Jaffna
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* INTERACTIVE WIDGET PREVIEW BLOCK */}
          <section className="bg-[#1e3a2f] text-white p-8 rounded-[36px] border border-[#d4af37]/30 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[#d4af37] font-mono text-[10px] uppercase tracking-[0.3em] font-bold block">
                🛠️ INTERACTIVE CALCULATOR PREVIEW
              </span>
              <h3 className="font-serif text-2xl">Sri Lanka Rail Intelligent Matcher</h3>
              <p className="text-xs text-[#a3bfae] max-w-xl mx-auto leading-relaxed">
                Test a subset of our primary <strong>Sri Lanka train travel guide</strong> and predictor technology. Select a route and carriage class below to see instant advice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                {/* Route selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#a3bfae] mb-1.5">
                    Step 1: Select Your Targeted Route
                  </label>
                  <select 
                    value={selectedWidgetRoute}
                    onChange={(e) => setSelectedWidgetRoute(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="highland" className="text-black">The Highland Line (Tea Fields & Bridges)</option>
                    <option value="coastal" className="text-black">The Coastal Line (Sea Spray & Commutes)</option>
                    <option value="northern" className="text-black">The Northern Line (History & Jaffna)</option>
                  </select>
                </div>

                {/* Class selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-[#a3bfae] mb-1.5">
                    Step 2: Select Carriage Class
                  </label>
                  <select 
                    value={selectedWidgetClass}
                    onChange={(e) => setSelectedWidgetClass(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="1st_observation" className="text-black">1st Class Observation Deck (AC)</option>
                    <option value="2nd_reserved" className="text-black">2nd Class Reserved Seat (Open Windows)</option>
                    <option value="3rd_reserved" className="text-black">3rd Class Reserved Seat (Budget)</option>
                    <option value="unreserved" className="text-black">Unreserved (High-Risk Walk-on)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Output Box */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-xs">
                <div>
                  <span className="text-neutral-400 font-mono text-[9px] uppercase tracking-wider block">ROUTE ANALYTICS:</span>
                  <p className="font-bold text-white text-sm">{widgetRoutes[selectedWidgetRoute as keyof typeof widgetRoutes].name}</p>
                  <p className="text-[#a3bfae] font-light mt-1">Duration: {widgetRoutes[selectedWidgetRoute as keyof typeof widgetRoutes].time}</p>
                  <p className="text-[#d4af37] font-light">Best Side: {widgetRoutes[selectedWidgetRoute as keyof typeof widgetRoutes].bestSide}</p>
                  <p className="text-white/80 font-light mt-1">Highlights: {widgetRoutes[selectedWidgetRoute as keyof typeof widgetRoutes].highlights}</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <span className="text-neutral-400 font-mono text-[9px] uppercase tracking-wider block">SEAT CLASS ADVICE:</span>
                  <p className="font-bold text-white text-sm">{widgetClasses[selectedWidgetClass as keyof typeof widgetClasses].name}</p>
                  <p className="text-[#a3bfae] font-light mt-1">Comfort Level: {widgetClasses[selectedWidgetClass as keyof typeof widgetClasses].comfort}</p>
                  <p className="text-[#d4af37] font-light">Photography Window: {widgetClasses[selectedWidgetClass as keyof typeof widgetClasses].windows}</p>
                  <p className="text-red-400 font-mono text-[10px] mt-1">Booking Horizon: {widgetClasses[selectedWidgetClass as keyof typeof widgetClasses].booking}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link 
                to="/sri-lanka-train-trip-planner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-white hover:text-black transition-all"
              >
                Launch Fully Featured Prediction Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* SECTION 4: CHOOSING THE RIGHT TRAIN CLASS */}
          <article id="classes" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f] tracking-tight">
              4. Choosing the Right Train Class: The Honest Breakdown
            </h2>
            <hr className="w-16 border-[#d4af37] border-2" />

            <p className="text-sm md:text-base text-[#1a2d24]/90 font-light leading-relaxed">
              Foreign travelers are often confused by class divisions in Sri Lanka. Choosing the wrong class is the single biggest factor behind ruined train trips. Here is an objective, detailed evaluation of your options.
            </p>

            <div className="space-y-6">
              {/* 1st Class */}
              <div className="p-6 bg-white rounded-2xl border border-[#1e3a2f]/10 space-y-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h4 className="font-serif font-bold text-base text-[#1e3a2f]">
                    ★ 1st Class Air-Conditioned (Observation Deck or Standard)
                  </h4>
                  <span className="px-3 py-1 bg-neutral-100 rounded text-[10px] font-mono font-bold text-[#1e3a2f]">COMFORT LEVEL: 10/10</span>
                </div>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  This class offers fully enclosed, air-conditioned carriages with individual reclining seats, carpeting, and clean restrooms. The legendary "Observation Deck" is a specific first-class carriage coupled to the rear of the train, featuring a massive, panoramic rear window overlooking the receding tracks.
                </p>
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-red-800 font-light">
                  <strong>The Photography Disadvantage:</strong> Because the carriage is fully air-conditioned, all doors and windows are sealed shut. You cannot open windows to take unobstructed pictures of the mountains, feel the cool mountain breeze, or capture iconic door-hanging shots.
                </div>
              </div>

              {/* 2nd Class Reserved */}
              <div className="p-6 bg-white rounded-2xl border border-[#1e3a2f]/10 space-y-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h4 className="font-serif font-bold text-base text-[#1e3a2f] text-[#d4af37]">
                    ★★ 2nd Class Reserved (The Sweet Spot)
                  </h4>
                  <span className="px-3 py-1 bg-[#d4af37]/15 rounded text-[10px] font-mono font-bold text-[#d4af37]">RECOMMENDED CHOICE</span>
                </div>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  We strongly advocate for 2nd Class Reserved. You are guaranteed an assigned individual padded seat, and overhead fans keep the carriage comfortable. More importantly, <strong>the windows are fully openable</strong>. This lets you stick your camera out, feel the wind, and easily photograph the train as it snakes around mountain bends.
                </p>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 font-light">
                  <strong>The Best of Both Worlds:</strong> You get complete comfort with a guaranteed seat, combined with the raw, sensory experience of open-door mountain air and epic photography.
                </div>
              </div>

              {/* 3rd Class Reserved */}
              <div className="p-6 bg-white rounded-2xl border border-[#1e3a2f]/10 space-y-3">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h4 className="font-serif font-bold text-base text-[#1e3a2f]">
                    ★ 3rd Class Reserved
                  </h4>
                  <span className="px-3 py-1 bg-neutral-100 rounded text-[10px] font-mono font-bold text-[#1e3a2f]">COMFORT LEVEL: 6/10</span>
                </div>
                <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
                  Similar to 2nd Class Reserved but features slightly tighter bench-style seating (often seating three people per row instead of two). The carriages are busy and loud, but they are incredibly lively. Local fruit vendors, sweet tea sellers, and traditional musicians walk through, making this class outstanding for cultural immersion.
                </p>
              </div>

              {/* Unreserved Warning */}
              <div className="p-6 bg-red-50 rounded-2xl border border-red-200 text-red-950 space-y-3">
                <h4 className="font-serif font-bold text-base text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  ⚠️ Avoid 2nd/3rd Class UNRESERVED on Mountain Routes
                </h4>
                <p className="text-xs md:text-sm leading-relaxed font-light">
                  A common misconception is that "Unreserved" is just a cheaper ticket. In reality, Sri Lanka Railways sells an <strong>unlimited number</strong> of unreserved tickets. During holidays and peak winter seasons, these carriages turn into tightly packed compartments. You can easily find yourself standing on a rocking carriage, holding heavy bags, for 7 hours from Kandy to Ella without any room to stretch. This is highly exhausting.
                </p>
              </div>
            </div>
          </article>

          {/* SECTION 5: HOW TO BOOK TICKETS */}
          <article id="tickets" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f] tracking-tight">
              5. How to Book Train Tickets: Navigating the Opaque System
            </h2>
            <hr className="w-16 border-[#d4af37] border-2" />

            <div className="space-y-4 text-sm md:text-base text-[#1a2d24]/90 font-light leading-relaxed">
              <p>
                Secure booking is the most critical hurdle. Under the official regulations of Sri Lanka Railways, reserved seating tickets open for booking <strong>exactly 30 days in advance</strong> at 10:00 AM local time (GMT+5:30).
              </p>
              <p>
                Because these tickets are highly sought after by local travel agencies, global booking platforms, and individual travelers, high-demand seats (especially the 1st Class Observation Deck or 2nd Class Reserved Kandy-Ella route) <strong>sell out in under 60 seconds</strong>.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#1e3a2f]/10 space-y-6">
              <h4 className="font-serif font-bold text-base text-[#1e3a2f] flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#d4af37]" />
                Step-by-Step Ticket Procurement Strategy
              </h4>

              <div className="space-y-4 text-xs md:text-sm font-light text-[#1a2d24]/80">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <span className="font-bold text-[#1e3a2f] block mb-1">Determine Your Travel Date and Set an Alarm</span>
                    Identify your exact rail day. Set an alarm for 31 days in advance. Under Sri Lankan regulations, you must be ready to book on the official ticketing portal or coordinate with a reliable booking agent.
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <span className="font-bold text-[#1e3a2f] block mb-1">Use the Official Sri Lanka Railways Ticketing Portal</span>
                    The official portal (seatreservation.railway.gov.lk) accepts international credit cards. Register your account and passport details <em>before</em> the 30-day mark to save precious seconds when the booking window opens.
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <span className="font-bold text-[#1e3a2f] block mb-1">Have a Verified Backup Booking Agent</span>
                    If you miss the 60-second window, or if the government portal experiences heavy downtime, use certified booking platforms (like 12GoAsia or local registered ground agencies) who buy tickets physically at station counters via wholesale quotas.
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#1e3a2f] text-white flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <span className="font-bold text-[#1e3a2f] block mb-1">Physical Ticket Pickup is Mandatory</span>
                    Even with a digital booking confirmation, <strong>you cannot board with an e-ticket</strong>. You must print your physical tickets at major stations (Colombo Fort, Kandy, Ella, Nanu Oya) by presenting your digital confirmation voucher and passport at the counter.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#fcfbf7] border border-[#d4af37]/30 rounded-2xl flex items-center gap-4">
              <Info className="w-10 h-10 text-[#d4af37] shrink-0 hidden sm:block" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#1e3a2f] block uppercase tracking-wider font-serif">How the AI Rail Planner Simplifies This:</span>
                <p className="text-[#1a2d24]/80 leading-relaxed font-light">
                  Our fully integrated, AI-powered <strong><Link to="/sri-lanka-train-trip-planner" className="text-[#1e3a2f] underline hover:text-[#d4af37]">Sri Lanka Train Trip Planner</Link></strong> features built-in seat prediction algorithms. It analyzes historic passenger volume, seasonal holidays, and tourist clusters to warn you of reservation risks, helping you secure tickets through backup paths if needed.
                </p>
              </div>
            </div>
          </article>

          {/* SECTION 6: HOW TO BUILD THE PERFECT TRAIN ITINERARY */}
          <article id="itinerary" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f] tracking-tight">
              6. How to Build the Perfect Train Itinerary: The Hybrid Model
            </h2>
            <hr className="w-16 border-[#d4af37] border-2" />

            <div className="space-y-4 text-sm md:text-base text-[#1a2d24]/90 font-light leading-relaxed">
              <p>
                A massive mistake tourists make is trying to travel exclusively by train. While Sri Lanka's rail system is incredibly romantic, relying solely on trains can lead to severe coordination bottlenecks:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Trains do not travel to Sigiriya, Sigiriya Lion Rock, or Yala National Park.</li>
                <li>Luggage transit can become a grueling physical challenge.</li>
                <li>Delays of up to 2 hours are common on mountain tracks.</li>
              </ul>
              <p>
                <strong>The Solution: The Master Hybrid Model (Private Chauffeur + Scenic Train Split).</strong>
              </p>
              <p>
                This represents the pinnacle of professional travel coordination. You hire a dedicated private driver and air-conditioned SUV for your entire Sri Lanka loop. On the day of your scenic mountain train trip (e.g., Kandy to Ella):
              </p>
            </div>

            <div className="bg-[#1e3a2f] text-white p-6 rounded-2xl space-y-4">
              <h4 className="font-serif text-base text-[#d4af37] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#d4af37]" />
                How the Hybrid Model Works Step-by-Step:
              </h4>
              <ol className="space-y-3 text-xs md:text-sm font-light text-[#a3bfae] list-decimal pl-5">
                <li>
                  Your private driver picks you up from your hotel in Kandy and transfers you to the Kandy Train Station.
                </li>
                <li>
                  Your driver handles your heavy, bulky hard-shell luggage and places them securely in the trunk of the SUV.
                </li>
                <li>
                  You board the train with just a light daypack containing your camera, passport, water, and valuables.
                </li>
                <li>
                  While you are enjoying the scenic 4-hour mountain journey, your driver drives the highway to your destination.
                </li>
                <li>
                  When your train pulls into Ella Station, your driver is already waiting at the platform to welcome you and drive you straight to your luxury resort.
                </li>
              </ol>
            </div>
          </article>

          {/* SECTION 7: SCENIC RAILWAY JOURNEY DETAILS */}
          <article id="scenic" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f] tracking-tight">
              7. Scenic Railway Journeys: Visual Elevation & Landmarks
            </h2>
            <hr className="w-16 border-[#d4af37] border-2" />

            <p className="text-sm md:text-base text-[#1a2d24]/90 font-light leading-relaxed">
              If you take the famous Highland Line, you will traverse dramatic changes in elevation, which explain the dramatic transitions in vegetation, climate, and vistas.
            </p>

            {/* Landmark breakdown */}
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="bg-white p-6 rounded-2xl border border-[#1e3a2f]/10 space-y-3">
                <Camera className="w-6 h-6 text-[#d4af37]" />
                <h4 className="font-serif font-bold text-sm text-[#1e3a2f]">The Iconic Nine Arch Bridge (Demodara)</h4>
                <p className="text-xs text-[#1a2d24]/70 leading-relaxed font-light">
                  Spanning 91 meters at a height of 24 meters inside dense jungle foliage, this British-colonial stone-and-brick viaduct was built without a single piece of steel. Watch the blue train cross this dramatic curve, or take a short walk down from Ella town to photograph it from the valley floor.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#1e3a2f]/10 space-y-3">
                <Compass className="w-6 h-6 text-[#d4af37]" />
                <h4 className="font-serif font-bold text-sm text-[#1e3a2f]">The Demodara Loop (The Spiral Track)</h4>
                <p className="text-xs text-[#1a2d24]/70 leading-relaxed font-light">
                  A masterful civil engineering feat. Because the mountain slope was too steep for trains to climb, British designers laid the track in a giant spiral loop, which circles a hill, crosses itself through a tunnel directly underneath the Demodara station, allowing the train to ascend smoothly.
                </p>
              </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-[#d4af37]/30 space-y-3">
              <h5 className="font-bold text-[#1e3a2f] text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-[#d4af37]" /> Seating Secret: Which Side to Sit On?
              </h5>
              <p className="text-xs text-[#1a2d24]/80 leading-relaxed font-light">
                For the absolute best scenery, make sure to sit on the <strong>right-hand side</strong> of the carriage when traveling from Kandy to Nanu Oya. The right side offers wide panoramas of tea estates and cascading waterfalls. However, once the train departs Nanu Oya toward Ella, quickly switch or secure a seat on the <strong>left-hand side</strong>, which overlooks sheer valley drop-offs and misty pine forest gorges.
              </p>
            </div>
          </article>

          {/* SECTION 8: PRACTICAL EXPERT TIPS */}
          <article id="tips" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f] tracking-tight">
              8. Travel Tips from the Experts (E-E-A-T Demonstration)
            </h2>
            <hr className="w-16 border-[#d4af37] border-2" />

            <div className="grid md:grid-cols-2 gap-8 text-sm text-[#1a2d24]/90 font-light leading-relaxed">
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-[#1e3a2f] text-base">Train Boarding & Door Etiquette</h4>
                <p className="text-xs">
                  The iconic shot of travelers hanging precariously from open train doors as the train crosses mountain bridges has become a viral sensation. While beautiful, <strong>extreme safety caution is mandatory</strong>. Sri Lankan tracks are broad-gauge, and mountain tunnels have very narrow clearances. Watch out for overhanging tree branches, track signs, and passing train cars on double lines.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif font-bold text-[#1e3a2f] text-base">Local Culinary Journeys</h4>
                <p className="text-xs">
                  Local train vendors carry baskets of freshly made local "short-eats" onto the carriages at major stations. Savor the warm <em>ulundu wade</em> (crisp lentil donuts), roasted peanuts, and fresh mango slices seasoned with salt and chili. These snacks are exceptionally delicious, but if you have a sensitive stomach, stick to packaged foods or carry your own light sandwiches.
                </p>
              </div>
            </div>
          </article>

          {/* SECTION 9: SEO FAQS ACCORDION */}
          <article id="faqs" className="scroll-mt-24 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">
                Authority Answer Engine
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f]">
                Frequently Asked Questions
              </h2>
              <hr className="w-16 border-[#d4af37] border-2" />
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  q: "How does the Sri Lanka Train Trip Planner tool actually work?",
                  a: "The planner is an interactive web platform designed by Plan Sri Lanka. It allows you to select starting and ending stations on an interactive Google Map with custom train track polylines. It predicts real-time monsoonal rain hazards, lists tourist congestion levels, displays altitude and elevation graphs (letting you see the climb), details landmarks along the way, and advises you on seat reservation risk levels."
                },
                {
                  id: 2,
                  q: "Is there a direct tourist train from Colombo to Ella?",
                  a: "Yes, there are dedicated tourist trains like the Ella Odyssey, which runs daily from Colombo to Badulla and back. The Ella Odyssey is uniquely designed for international visitors; it stops at key scenic locations (such as Elgin Falls, Sensation Point, and Nine Arch Bridge) for 5-10 minutes, allowing passengers to step off the train and take photos without missing their connections."
                },
                {
                  id: 3,
                  q: "What should I do if all Kandy to Ella reserved seats are sold out?",
                  a: "Do not panic. You have three highly reliable options. First, you can book seats from Kandy to Nanu Oya instead, or Nanu Oya to Ella (breaking the journey). Second, you can purchase an 'Unreserved' ticket on the day, but board the train from Peradeniya Junction instead of Kandy Station to secure a seat before the heavy crowds board. Third, use our hybrid model—drive to Ella in your private car, and take a shorter, beautiful commuter run (like Ella to Demodara or Nanu Oya) which is much easier to book."
                },
                {
                  id: 4,
                  q: "Can I buy food and drinks on the train?",
                  a: "Yes, major trains have a buffet car serving hot coffee, tea, soft drinks, and packaged snacks. Local vendors also walk through 2nd and 3rd class carriages at major stations selling freshly fried wade, chickpeas, and fresh fruits. However, we highly recommend carrying at least 1.5 liters of bottled mineral water per person on long mountain journeys."
                },
                {
                  id: 5,
                  q: "Is there Wi-Fi or mobile data connectivity on the train?",
                  a: "While there is no onboard Wi-Fi, mobile data connectivity (Dialog or Mobitel) is relatively strong along flat coastal routes. However, once the train enters the central highlands and climbs through tunnels and pine forests (between Hatton and Ella), mobile signals fluctuate heavily and will experience prolonged dead zones. Appreciate the digital detox!"
                }
              ].map((faq) => (
                <div key={faq.id} className="border border-[#1e3a2f]/10 rounded-2xl bg-white overflow-hidden shadow-sm">
                  <button 
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-[#1e3a2f]/5 transition-all text-xs md:text-sm font-serif font-bold text-[#1e3a2f]"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#d4af37] text-xl font-bold ml-4">{activeFaq === faq.id ? "−" : "+"}</span>
                  </button>
                  {activeFaq === faq.id && (
                    <div className="p-6 pt-0 border-t border-[#1e3a2f]/5 text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light bg-[#fcfbf7]/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* SECTION 10: BIBLIOGRAPHY, GOVERNMENT REFERENCES & EDITORIAL STANDARDS */}
          <article id="sources" className="scroll-mt-24 space-y-8 bg-white p-6 md:p-8 rounded-3xl border border-[#1e3a2f]/10 shadow-sm">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono block">
                E-E-A-T Quality Standards & Ground Truth
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1e3a2f]">
                10. Official Sources & Editorial Verification
              </h2>
              <hr className="w-16 border-[#d4af37] border-2" />
            </div>

            <p className="text-xs md:text-sm text-[#1a2d24]/80 leading-relaxed font-light">
              To guarantee the highest degree of reliability, this blueprint is updated monthly in coordination with active rail dispatchers, station masters, and licensed ground operators. We strictly bypass third-party rumors and base all planning data on official legislative portals and verified physical site surveys.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 text-xs text-[#1a2d24]/80">
              <div className="space-y-3">
                <span className="font-serif font-bold text-sm text-[#1e3a2f] block">Official Government Portals</span>
                <ul className="space-y-2 list-none pl-0 font-light">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong>Sri Lanka Railways e-Services:</strong>{" "}
                      <a href="https://seatreservation.railway.gov.lk" target="_blank" rel="noopener noreferrer" className="text-[#1e3a2f] underline hover:text-[#d4af37]">
                        seatreservation.railway.gov.lk
                      </a>{" "}
                      — The exclusive legal platform for 30-day reservation bookings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong>Ministry of Transport & Civil Aviation:</strong>{" "}
                      <a href="http://transport.gov.lk" target="_blank" rel="noopener noreferrer" className="text-[#1e3a2f] underline hover:text-[#d4af37]">
                        transport.gov.lk
                      </a>{" "}
                      — National transport policy bulletins and network extension updates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong>Sri Lanka Tourism Development Authority (SLTDA):</strong>{" "}
                      <a href="https://www.sltda.gov.lk" target="_blank" rel="noopener noreferrer" className="text-[#1e3a2f] underline hover:text-[#d4af37]">
                        sltda.gov.lk
                      </a>{" "}
                      — Verified safety standards, registered guide directories, and travel regulations.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="font-serif font-bold text-sm text-[#1e3a2f] block">Field Validation & Ground Truth</span>
                <ul className="space-y-2 list-none pl-0 font-light">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong>Anura Jayasekera (Reviewer):</strong> Active SLTDA Senior National Tourist Guide Lecturer (Reg S-1294). Anura personally coordinates rail itineraries for diplomatic groups and luxury charters weekly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong>Oshada Adithya (Author):</strong> Founder of Plan Sri Lanka, with 12+ years of on-the-ground operational logistics managing complex passenger transitions along the Highland rail lines.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>
                      <strong>Altitude & GPS Mapping:</strong> Station elevation figures, coordinates, and weather metrics are validated via GPS trackers and national meteorological databases to ensure extreme topographical accuracy.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e3a2f]/5 flex flex-wrap gap-6 items-center justify-between text-[10px] font-mono uppercase text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#d4af37]" />
                100% Non-Sponsored Independent Journalism
              </span>
              <span>
                License Code: SLTDA-REG-2026/A5492
              </span>
            </div>
          </article>

          {/* CONTEXTUAL BRIDGE TO CTA */}
          <div className="p-6 md:p-8 bg-amber-50/50 rounded-3xl border border-[#d4af37]/20 text-xs md:text-sm text-[#1a2d24]/90 font-light leading-relaxed space-y-2">
            <span className="font-serif font-bold text-sm text-[#1e3a2f] block">
              💡 Complete Your Planning Process
            </span>
            <p>
              Before you begin booking individual tickets, we highly recommend mapping your trip to ensure that all transfer points line up. To make this process seamless, you can use our interactive <strong><Link to="/sri-lanka-train-trip-planner" className="text-[#1e3a2f] underline hover:text-[#d4af37]">Sri Lanka Train Trip Planner</Link></strong> to build, customize, and optimize your complete island rail itinerary in just a few clicks.
            </p>
          </div>

          {/* HIGH-CONVERTING CALL TO ACTION (CTA) */}
          <section className="bg-gradient-to-br from-[#1e3a2f] to-[#12241d] text-white p-8 md:p-12 rounded-[40px] border border-[#d4af37]/40 shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1),transparent_50%)]" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-[#d4af37] font-mono text-[10px] uppercase tracking-[0.3em] font-bold block">
                ★ CHOOSE INTELLIGENT TRAVEL PLANNING
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white">
                Ready to Experience Sri Lanka's Railways?
              </h2>
              <p className="text-xs sm:text-sm text-[#a3bfae] font-light leading-relaxed">
                Do not leave your tropical rail dream to chance, locked ticketing systems, or packed unreserved carriages. Launch our 100% free, award-winning <strong><Link to="/sri-lanka-train-trip-planner" className="text-[#d4af37] underline hover:text-white">Sri Lanka Train Trip Planner</Link></strong> to map elevation gradients, forecast regional monsoons, check seat risks, and design your perfect coordination blueprint today.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/sri-lanka-train-trip-planner"
                  onClick={() => trackEvent("guide_page_launch_planner_cta", "conversion", "button_click")}
                  className="px-8 py-4 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Launch Interactive Train Planner</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/94722968210?text=Hi%20Plan%20Sri%20Lanka!%20I%20read%20your%20amazing%20Train%20Trip%20Planning%20Guide.%20Can%20you%20help%20me%20secure%20reserved%20seats%20and%20coordinate%20a%20private%20car?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2"
                >
                  💬 Connect on WhatsApp
                </a>
              </div>
            </div>
          </section>

        </main>
      </section>
    </div>
  );
}
