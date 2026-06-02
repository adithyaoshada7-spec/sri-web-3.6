import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  MapPin, 
  Compass, 
  Clock, 
  Car, 
  Utensils, 
  Sparkles, 
  Calendar, 
  Info,
  CheckCircle,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaItineraryPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Lead form state
  const [leadForm, setLeadForm] = useState({
    name: "",
    whatsapp: "",
    travelDates: "",
    travelers: 2,
    style: "midrange",
    departure: "Delhi",
    agreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppRedirect = (source: string) => {
    trackEvent('whatsapp_click', 'conversion', `itinerary_page_${source}`);
    const message = `Hi Plan Sri Lanka! I am interested in booking or customizing the 7-Day Sri Lanka Classic Itinerary. Can I get a personalized pricing plan?`;
    window.open(`https://wa.me/94722968210?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.whatsapp) {
      alert("Please enter both your Name and WhatsApp phone number.");
      return;
    }
    setIsSubmitting(true);
    trackEvent('lead_submit', 'acquisition', 'itinerary_page_form_submit');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      const text = `Hi! I requested a free customized 7-Day Sri Lanka Itinerary.
Name: ${leadForm.name}
WhatsApp: ${leadForm.whatsapp}
Travel Dates: ${leadForm.travelDates || "Autumn 2026"}
Travelers: ${leadForm.travelers}
Budget Style: ${leadForm.style}
Departure Hub: ${leadForm.departure}`;

      const waUrl = `https://wa.me/94722968210?text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 1200);
  };

  const itineraryDays = [
    {
      day: "Day 1",
      title: "Arrival & Coastal Heritage of Colombo",
      desc: "Touch down at Colombo (CMB) key airport. Meet your private English-speaking chauffeur-guide and transfer to your coastal boutique hotel. Unwind with an evening tour of Galle Face Green and dinner overlooking the Indian Ocean.",
      activities: ["Ocean-front sunset walk", "Chauffeur meet & greet", "Colonial heritage dining at Dutch Hospital"],
      accommodation: "High-contrast coastal boutique villa"
    },
    {
      day: "Day 2",
      title: "The Majestic Sigiriya Lion Rock Citadel",
      desc: "Drive inland through emerald plains. Climb the ancient Sigiriya Lion Rock, a breathtaking UNESCO World Heritage site featuring beautiful royal frescoes and high-altitude water gardens.",
      activities: ["Scale the 1,200 steps to the sky fortress", "Village catamaran ride with local lunch", "Evening elephant sanctuary view"],
      accommodation: "Luxurious jungle resort with private canopy pool"
    },
    {
      day: "Day 3",
      title: "The Sacred Tooth Relic & Kandy's Misty Hills",
      desc: "Journey into the mountain kingdom of Kandy. Traverse rich spice gardens and experience the sacred Temple of the Tooth. Witness a spectacular evening traditional cultural performance.",
      activities: ["Kandy Temple of the Tooth tour", "Royal Botanical Gardens walk", "Scenic lakefront sunset"],
      accommodation: "Hillside hotel with panorama view of Kandy lake"
    },
    {
      day: "Day 4",
      title: "Misty Blue Train Experience to Ella",
      desc: "Board the legendary blue train through rolling tea plantations, tea leaves pluckers, and high waterfall gorges. Walk across the architectural wonder of Nine Arch Bridge under majestic misty skies.",
      activities: ["Scenic blue train ride", "Sunset hike to Little Adam's Peak", "Walk across historic Nine Arch Bridge"],
      accommodation: "Boutique cliffside cabin with private valley views"
    },
    {
      day: "Day 5",
      title: "Safari Wilderness at Yala National Park",
      desc: "Descend the misty valleys to the golden savannas of Yala. Embark on a private 4x4 open-top jeep safari to spot the elusive Sri Lankan leopards, wild elephants, and elegant sloth bears.",
      activities: ["Leopard tracking with VIP park guide", "Savanna campfire high tea", "Golden hours outdoor dining"],
      accommodation: "Stunning eco-luxury safari glamping tents"
    },
    {
      day: "Day 6",
      title: "Galle Fort Heritage & Sandy South Coast",
      desc: "Drive to the historic colonial Galle Fort. Stroll ancient cobblestone ramparts, browse high-end boutique stores, and wind down on the golden, low-tide sandy beaches of Bentota or Mirissa.",
      activities: ["Galle Fort walking tour with local historian", "Turtle hatchery conservation visit", "Boutique shopping & coastal dining"],
      accommodation: "Colonial-luxury oceanfront hotel"
    },
    {
      day: "Day 7",
      title: "Bentota Waterways & Smooth Departure",
      desc: "Savor a fresh tropical breakfast. Explore the serene mangrove channels of the Madu River by private speed boat. Wrap up your unforgettable island memories as your driver chauffeurs you back to Colombo for your return flight.",
      activities: ["Madu River boat safari", "Bentota beach sunbathing", "Smooth private airport drop-off"],
      accommodation: "Return Flight"
    }
  ];

  const itineraryFaqs = [
    {
      q: "What is the best month to do this 7-day Sri Lanka itinerary?",
      a: "The absolute best months for this classic central & southern loop are December through April, when the west and south coasts are perfectly dry, calm, and sun-kissed. You can also explore from July to September for great weather in the central hills and cultural triangle."
    },
    {
      q: "How much does a private chauffeur car cost for a 7-day trip?",
      a: "A private, fully air-conditioned modern sedan or SUV with an English-speaking chauffeur-guide costs approximately ₹4,000 to ₹6,500 ($50 - $80 USD) per day, which comfortably translates to around ₹28,000 - ₹45,000 for the entire 7-day tour. This already covers driver lodging, fuel, tolls, and absolute daily flexibility."
    },
    {
      q: "Do we need to book the Kandy-Ella scenic train tickets in advance?",
      a: "Yes! The legendary blue train tickets are highly sought after and sell out instantly on the official railway booking launch (30 days in advance). When you reserve a custom itinerary with Plan Sri Lanka, our local desk automatically secures your first-class or second-class observation deck seats for you."
    }
  ];

  return (
    <div className="bg-luxury-cream min-h-screen text-luxury-black font-sans leading-relaxed selection:bg-luxury-gold/30 pt-24 md:pt-32">
      <Helmet>
        <title>Sri Lanka 7 Day Itinerary (2026) | Complete Travel Guide For Indian Travelers</title>
        <meta name="description" content="Explore the perfect 7 day Sri Lanka itinerary including Colombo, Sigiriya, Kandy, Ella and Galle. Includes budget tips, hotels and travel planning advice." />
        <link rel="canonical" href="https://plan-srilanka.com/sri-lanka-7-day-itinerary" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://plan-srilanka.com/sri-lanka-7-day-itinerary" />
        <meta property="og:title" content="Sri Lanka 7 Day Itinerary (2026) | Complete Travel Guide For Indian Travelers" />
        <meta property="og:description" content="Explore the perfect 7 day Sri Lanka itinerary including Colombo, Sigiriya, Kandy, Ella and Galle. Includes budget tips, hotels and travel planning advice." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630" />
        <meta property="og:site_name" content="Plan Sri Lanka" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sri Lanka 7 Day Itinerary (2026) | Complete Travel Guide For Indian Travelers" />
        <meta name="twitter:description" content="Explore the perfect 7 day Sri Lanka itinerary including Colombo, Sigiriya, Kandy, Ella and Galle. Includes budget tips, hotels and travel planning advice." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630" />
        
        {/* ARTICLE SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka 7-Day Itinerary: The Classic Curated Route (2026)",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "author": {
              "@type": "Person",
              "name": "Adithya Oshada",
              "jobTitle": "Local Travel Planner"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            },
            "datePublished": "2026-02-10T08:00:00Z",
            "dateModified": "2026-06-02T14:32:00Z",
            "description": "Planning 7 days in Sri Lanka? Cover Sigiriya Rock, Kandy sacred relics, Ella mountain railways, leopards of Yala, and Galle Fort with a private chauffeur guide."
          })}
        </script>

        {/* BREADCRUMB SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://plan-srilanka.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "7-Day Itinerary",
                "item": "https://plan-srilanka.com/sri-lanka-7-day-itinerary"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-black/50 mb-6" aria-label="Breadcrumb">
          <a href="/" className="hover:text-luxury-gold transition-colors">Home</a>
          <span>/</span>
          <span className="text-luxury-gold font-semibold">7-Day Itinerary</span>
        </nav>
        
        <div className="border-l-4 border-luxury-gold/50 pl-6 space-y-3">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="bg-luxury-green/10 text-luxury-green font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[10px]">
              Expert Crafted Route
            </span>
            <span className="text-luxury-black/40 font-mono">2026 Edition</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-serif text-luxury-green tracking-tight leading-tight">
            Sri Lanka 7-Day Itinerary: <br className="hidden md:block"/>
            <span className="italic font-normal text-luxury-gold">The Classic Ceylon Loop</span>
          </h1>
          <p className="text-lg md:text-2xl text-luxury-black/70 font-light max-w-4xl tracking-wide">
            How to maximize 7 magical days in Sri Lanka. Central temple sanctuaries, deep mist highland railways, wild leopard reserves, and coastal Galle ramparts.
          </p>
        </div>
      </div>

      {/* QUICK STATS INFOGRAPHIC BANNER */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-[32px] p-6 md:p-8 border border-luxury-black/5 shadow-luxury grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-[10px] text-luxury-black/40 uppercase tracking-widest font-mono block mb-1">Recommended Flight</span>
            <p className="font-serif text-lg text-luxury-green font-bold">In into CMB (Colombo)</p>
          </div>
          <div>
            <span className="text-[10px] text-luxury-black/40 uppercase tracking-widest font-mono block mb-1">Ideal Commute</span>
            <p className="font-serif text-lg text-luxury-green font-bold">Private Chauffeur Car</p>
          </div>
          <div>
            <span className="text-[10px] text-luxury-black/40 uppercase tracking-widest font-mono block mb-1">Est. Mid-Range Cost</span>
            <p className="font-serif text-lg text-luxury-gold font-bold">₹48,000 - ₹62,000 / Person</p>
          </div>
          <div>
            <span className="text-[10px] text-luxury-black/40 uppercase tracking-widest font-mono block mb-1">Destinations Visited</span>
            <p className="font-serif text-lg text-luxury-green font-bold">Central Hills, South & West</p>
          </div>
        </div>
      </section>

      {/* DAY-BY-DAY FLOW TIMELINE */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight mb-12 text-center">
          The Curated Day-By-Day Journey
        </h2>

        <div className="relative border-l-2 border-luxury-gold/30 pl-8 ml-4 md:ml-6 space-y-16">
          {itineraryDays.map((d, index) => (
            <div key={index} className="relative group">
              {/* Floating Day Node */}
              <div className="absolute -left-[51px] top-0 w-10 h-10 rounded-full bg-luxury-green text-luxury-gold font-serif text-xs font-bold flex items-center justify-center border-4 border-luxury-cream shadow-md group-hover:scale-110 transition-transform">
                {index + 1}
              </div>

              <div className="space-y-4">
                <span className="text-luxury-gold font-mono text-xs uppercase tracking-widest block font-bold">
                  {d.day} • {d.accommodation}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-luxury-green leading-snug">
                  {d.title}
                </h3>
                <p className="text-luxury-black/70 font-light text-sm md:text-base leading-relaxed">
                  {d.desc}
                </p>

                {/* Bullets highlighting activities of the day */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {d.activities.map((act, idx) => (
                    <span key={idx} className="bg-white border border-luxury-black/5 rounded-full px-3 py-1 text-xs text-luxury-black/60 flex items-center gap-1.5 font-sans">
                      <CheckCircle className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEAD CAPTURE ENGAGEMENT BLOCK */}
      <section className="bg-luxury-green py-20 px-6 text-white overflow-hidden relative mb-20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-6 space-y-6">
            <span className="text-luxury-gold uppercase tracking-[0.25em] text-xs font-mono block">Customized Concierge Plans</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              Get Your Free Personalized Sri Lanka Travel Plan
            </h2>
            <p className="text-white/60 font-light text-base leading-relaxed">
              Unlock a bespoke pricing, route sequence, and premium hotel selections tailored exactly for your families or honeymooners. Free of deposits. Available 24/7.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0" />
                <span className="text-sm text-white/80">Tailored hotels & private transfers with driver logo check</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-luxury-gold shrink-0" />
                <span className="text-sm text-white/80">Instant flexible dates customization</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-white rounded-3xl p-8 text-luxury-green shadow-xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-luxury-gold/25 text-luxury-green rounded-full flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-bold">Successfully Received!</h3>
                <p className="text-xs text-luxury-black/60">
                  Opening your custom blueprint plan summary directly on WhatsApp now. If it didn't open automatically, use the WhatsApp button below.
                </p>
                <button
                  onClick={() => handleWhatsAppRedirect("form_success_button")}
                  className="w-full py-4 bg-luxury-green hover:bg-luxury-gold text-white font-serif tracking-widest text-xs uppercase font-bold rounded-full transition-all"
                >
                  Message Expert Chauffeur
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                    className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold block mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={leadForm.whatsapp}
                    onChange={(e) => setLeadForm({...leadForm, whatsapp: e.target.value})}
                    className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold block mb-1">Preferred Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. Oct 2026"
                      value={leadForm.travelDates}
                      onChange={(e) => setLeadForm({...leadForm, travelDates: e.target.value})}
                      className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold block mb-1">Travelers Count</label>
                    <input
                      type="number"
                      min="1"
                      value={leadForm.travelers}
                      onChange={(e) => setLeadForm({...leadForm, travelers: parseInt(e.target.value) || 2})}
                      className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold block mb-1">Travel Style</label>
                    <select
                      value={leadForm.style}
                      onChange={(e) => setLeadForm({...leadForm, style: e.target.value})}
                      className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                    >
                      <option value="budget">Value Budget</option>
                      <option value="midrange">Comfort Boutique</option>
                      <option value="luxury">Signature Exclusive</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold block mb-1">Departure City</label>
                    <select
                      value={leadForm.departure}
                      onChange={(e) => setLeadForm({...leadForm, departure: e.target.value})}
                      className="w-full rounded-xl border border-luxury-black/10 bg-luxury-cream px-4 py-3 text-xs text-luxury-green focus:outline-none focus:border-luxury-gold transition-colors"
                    >
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-luxury-gold hover:bg-luxury-green text-luxury-green hover:text-white font-serif tracking-[0.2em] text-xs uppercase font-bold rounded-full transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  {isSubmitting ? "Generating Custom Itinerary..." : "Download 7-Day PDF Plan"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-luxury-black/15">
        <h2 className="text-3xl md:text-5xl font-serif text-luxury-green tracking-tight leading-tight text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {itineraryFaqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-luxury-black/5 overflow-hidden transition-all shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-luxury-cream/20 transition-all cursor-pointer"
              >
                <span className="font-serif font-bold text-luxury-green text-sm md:text-base pr-4">
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-luxury-gold shrink-0 transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-6 text-xs md:text-sm text-luxury-black/60 leading-relaxed font-sans border-t border-luxury-black/[0.02] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
