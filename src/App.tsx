import { motion } from "motion/react";
import { 
  MapPin, 
  Wind, 
  Compass, 
  Palmtree, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  Menu, 
  X,
  Star,
  Coffee,
  Sun,
  MessageCircle,
  Share2,
  Mail
} from "lucide-react";
import React, { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { useNavigate, useParams, Link, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "./lib/analytics";
import { activities } from "./data/activities";

const ExperienceDetail = lazy(() => import("./components/ExperienceDetail"));
const SrilankaCostPage = lazy(() => import("./components/SrilankaCostPage"));
const SrilankaItineraryPage = lazy(() => import("./components/SrilankaItineraryPage"));
const SrilankaVisaPage = lazy(() => import("./components/SrilankaVisaPage"));
const SrilankaBestTimePage = lazy(() => import("./components/SrilankaBestTimePage"));
const SrilankaFamilyPage = lazy(() => import("./components/SrilankaFamilyPage"));
const SrilankaJunePage = lazy(() => import("./components/SrilankaJunePage"));
const FeatureSection = lazy(() => import("./components/FeatureSection"));
const CallToAction = lazy(() => import("./components/CallToAction"));
const Footer = lazy(() => import("./components/Footer"));
const FaqAccordion = lazy(() => import("./components/FaqAccordion"));
const BlogHubSection = lazy(() => import("./components/BlogHubSection"));

// Helper for mapping icon names to components
const IconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  Palmtree: <Palmtree className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const Hero = () => (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <img 
        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1"
        alt="Vibe Tour Sri Lanka"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        referrerPolicy="no-referrer"
        {...{ fetchPriority: "high" } as any}
      />
      
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.p 
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5 }}
          className="text-white text-[11px] uppercase mb-8 font-medium"
        >
          Bespoke Journeys • Unrivalled Service
        </motion.p>
        <motion.h1 
          {...fadeUp}
          className="text-white text-5xl md:text-[9rem] font-serif mb-6 md:mb-8 leading-[0.9] tracking-tighter"
        >
          The Ultimate Getaway, <br /> 
          <span className="italic text-luxury-gold">Now In Sri Lanka.</span>
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex justify-center"
        >
          <div className="mt-4 md:mt-6 p-6 md:p-10 border border-white/20 rounded-full flex items-center justify-center group hover:border-luxury-gold transition-all cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="sr-only">Scroll down</span>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-luxury-gold transition-all">
              <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 z-20 text-white/50 text-[10px] tracking-widest hidden md:block">
        07° 01' 57" N • 79° 59' 18" E
      </div>
    </section>
  );

  const About = () => (
    <section id="about" className="py-20 md:py-32 px-6 bg-luxury-cream">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div 
          whileInView="animate"
          initial="initial"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-luxury-gold font-serif italic text-base md:text-lg mb-4 block">Exclusivity Defined</span>
          <h2 className="text-3xl md:text-6xl font-serif text-luxury-green mb-8 leading-tight">
            A curated heritage <br /> of island living.
          </h2>
        </motion.div>
        <motion.div 
          whileInView="animate"
          initial="initial"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-luxury-black/70 space-y-6 text-base md:text-lg font-light leading-relaxed"
        >
          <p>
            Unforgettable Vibe Tour Sri Lanka where coastal beauty, stylish experiences, music, food, and relaxed luxury come together. Designed for travelers who want more than just a trip, this tour creates moments full of culture, connection, celebration, and unforgettable memories inspired by the charm and energy of the premium island lifestyle.
          </p>
          <p>
            Feel the premium vibe in Sri Lanka—with complete privacy, exceptional luxury, and soulful connection.
          </p>
        </motion.div>
      </div>
    </section>
  );

  const Destinations = () => (
    <section id="destinations" className="py-20 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
          <motion.div
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-luxury-green tracking-tight">The Signature Experience</h2>
            <p className="mt-4 text-luxury-black/50 tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">Unrivalled Luxury • One Private Discovery</p>
          </motion.div>
        </div>

        <motion.div 
          whileInView="animate"
          initial="initial"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-12"
        >
          {activities.filter(a => a.slug === 'italian-vibe-tour').map((item) => (
            <motion.div 
              key={item.id}
              variants={fadeUp}
              onClick={() => {
                trackEvent('select_content', 'portfolio', item.title);
                navigate(`/experience/${item.slug}`);
              }}
              className="group relative flex flex-col md:flex-row h-full bg-luxury-cream rounded-[40px] overflow-hidden border border-luxury-black/5 cursor-pointer col-span-full shadow-2xl"
            >
              <div className="md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-luxury-gold p-3 bg-white rounded-full shadow-sm">
                    {IconMap[item.iconName] || <Star className="w-5 h-5" />}
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-black/40 font-bold">Limited Signature Collection</span>
                </div>
                <h3 className="text-4xl md:text-7xl font-serif text-luxury-green mb-6 leading-tight group-hover:text-luxury-gold transition-colors">
                  {item.title.includes("Vibe") ? (
                    <>
                      {item.title.split("Vibe")[0]}
                      <span className="font-bold italic">Vibe</span>
                      {item.title.split("Vibe")[1]}
                    </>
                  ) : item.title}
                </h3>
                <p className="text-xl md:text-2xl font-serif italic mb-8 text-luxury-gold leading-relaxed">
                  {item.subheading}
                </p>
                <div className="grid grid-cols-2 gap-8 mb-12 border-y border-luxury-black/5 py-8 w-full max-w-xs md:max-w-none">
                  {item.stats && Object.entries(item.stats).map(([label, value]) => (
                    <div key={label} className="flex flex-col items-center md:items-start">
                      <span className="text-[10px] uppercase tracking-widest text-luxury-black/30 font-bold block mb-2">{label}</span>
                      <span className="font-serif text-xl text-luxury-green italic">{value as string}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full md:w-fit px-12 py-6 bg-luxury-green text-white rounded-full text-sm font-bold uppercase tracking-[0.3em] hover:bg-luxury-gold hover:shadow-xl transition-all flex items-center justify-center gap-4 group/btn">
                  Step Inside <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const OfferSection = () => (
    <section className="py-24 md:py-40 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          whileInView="animate"
          initial="initial"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col items-center"
        >
          <span className="text-luxury-gold font-serif italic mb-6 block text-lg">Our Gift To Your Family</span>
          <h2 className="text-4xl md:text-7xl font-serif text-luxury-green mb-10 leading-[1.1] tracking-tight">Your First Tour is <span className="italic">On Us.</span></h2>
          <p className="text-luxury-black/80 mb-12 text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto px-4">
            <span className="bg-luxury-gold/10 px-2 py-1 rounded-lg border border-luxury-gold/20 inline-block mb-2 sm:inline">Experience your first private family tour for <span className="font-bold text-luxury-gold text-lg">FREE</span></span>. Just a short flight away, discover a unique blend of premium coastal soul and Sri Lankan beauty, curated for the modern Indian family.
            <button 
              onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
              className="ml-1 text-luxury-gold hover:text-luxury-green transition-colors cursor-pointer border-b border-luxury-gold/30 font-medium"
            >
              See photos from past tours
            </button>
          </p>
          
          <a 
            href="https://wa.me/94722968210"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('whatsapp_click', 'conversion', 'offer_section_claim');
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'Lead');
              }
            }}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-luxury-green text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-xl transition-all hover:bg-luxury-gold hover:scale-105 mb-16"
          >
            Claim Your Free Private Tour <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="p-8 md:p-12 border border-luxury-gold/20 rounded-[40px] bg-luxury-cream/30 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-luxury-gold/10" />
            <p className="font-serif italic text-luxury-gold text-xl md:text-2xl leading-relaxed relative z-10">
              "Luxury is not a price, it's a feeling of being understood."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen selection:bg-luxury-gold/30">
      {/* Sri Lankan Heritage Accent Line */}
      <div className="fixed top-0 left-0 w-full z-[100] h-1.5 pointer-events-none">
        <div className="w-full h-full flex">
          <div className="h-full w-[10%] bg-[#006233]" title="Green" />
          <div className="h-full w-[10%] bg-[#FFBE29]" title="Orange" />
          <div className="h-full flex-grow bg-[#8D153B]" title="Maroon" />
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-6 md:py-8 flex justify-between items-center bg-transparent mix-blend-difference text-white">
        <div className="w-32"> {/* Spacer/Logo container */}
          <Link 
            to="/"
            className="text-lg md:text-xl font-serif tracking-[0.2em] font-bold cursor-pointer"
          >
            VIBE TOUR
          </Link>
        </div>
        
        <div className="flex items-center gap-6 md:gap-12">
          <div className="hidden md:flex gap-12 items-center text-[10px] uppercase tracking-[0.4em] font-bold font-sans">
            <Link to="/#about" className="hover:text-luxury-gold transition-colors">The Lifestyle</Link>
            <Link to="/#destinations" className="hover:text-luxury-gold transition-colors">The Collection</Link>
            <Link to="/sri-lanka-trip-cost-from-india" className="hover:text-luxury-gold transition-colors">Trip Costs</Link>
            <Link to="/sri-lanka-visa-for-indians" className="hover:text-luxury-gold transition-colors text-luxury-gold font-bold">Visa Guide</Link>
            <a href="#concierge" className="hover:text-luxury-gold transition-colors">Concierge Desk</a>
            <a 
              href="https://wa.me/94722968210"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_click', 'engagement', 'header_book_now');
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'Lead');
                }
              }}
              className="px-8 py-3 bg-luxury-gold text-white rounded-full hover:bg-white hover:text-black transition-all shadow-lg text-[11px]"
            >
              Start Your Private Journey
            </a>
          </div>

          <div className="flex items-center gap-4">
            {location.pathname.startsWith('/experience/') && (
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/')}
                className="group flex items-center"
                title="Back to Collection"
              >
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-luxury-gold transition-colors bg-black/20 backdrop-blur-sm">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </div>
              </motion.button>
            )}

            <button 
              className="p-2 hover:text-luxury-gold transition-colors bg-black/20 backdrop-blur-sm rounded-full md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Helmet>
              <title>Plan Sri Lanka | Curated Luxury Travel & Bespoke Vibe Tours</title>
              <meta name="description" content="An exclusive travel concierge for high-net-worth individuals and families seeking extraordinary, tailored journeys across the majestic landscapes of Sri Lanka." />
              <link rel="canonical" href="https://plan-srilanka.com/" />
              
              {/* Open Graph / Facebook */}
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="Plan Sri Lanka" />
              <meta property="og:title" content="Plan Sri Lanka | Curated Luxury Travel & Bespoke Vibe Tours" />
              <meta property="og:description" content="An exclusive travel concierge for high-net-worth individuals and families seeking extraordinary, tailored journeys across the majestic landscapes of Sri Lanka." />
              <meta property="og:url" content="https://plan-srilanka.com/" />
              <meta property="og:image" content="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630" />
              
              {/* Twitter Cards */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Plan Sri Lanka | Curated Luxury Travel & Bespoke Vibe Tours" />
              <meta name="twitter:description" content="An exclusive travel concierge for high-net-worth individuals and families seeking extraordinary, tailored journeys across the majestic landscapes of Sri Lanka." />
              <meta name="twitter:image" content="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200" />

              {/* WEBSITE SCHEMA FOR RICH SNIPPETS */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Plan Sri Lanka",
                  "url": "https://plan-srilanka.com/",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://plan-srilanka.com/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                })}
              </script>

              {/* TRAVEL AGENCY / ORGANIZATION SCHEMA */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "TravelAgency",
                  "name": "Plan Sri Lanka",
                  "url": "https://plan-srilanka.com/",
                  "logo": "https://plan-srilanka.com/logo.png",
                  "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
                  "description": "Exclusive boutique luxury travel concierge for families, couples, and honeymoons seeking bespoke Sri Lanka travel plans, vacation packages, and curated Vibe Tours.",
                  "telephone": "+94722968210",
                  "priceRange": "$$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Bespoke Regency Towers, Colpetty",
                    "addressLocality": "Cardiff",
                    "addressRegion": "Western Province",
                    "postalCode": "00300",
                    "addressCountry": "LK"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+94722968210",
                    "contactType": "concierge assistance",
                    "areaServed": ["IN", "GB", "US", "AE"],
                    "availableLanguage": ["en", "hi"]
                  }
                })}
              </script>

              {/* FAQPAGE SCHEMA */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "When is the absolute best time to visit Sri Lanka?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sri Lanka has a dual monsoon climate, making it a spectacular year-round destination. For the West Coast, South Coast, and Hill Country (Colombo, Galle, Ella, Kandy), the best weather is from December to April. For the East Coast and Ancient Cities (Trincomalee, Arugam Bay, Sigiriya), the dry sunny window peaks from May to September."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do Indian passport holders need a visa before flying to Sri Lanka?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, all Indian travelers must obtain an entry clearance. We highly recommend securing a digital Tourist ETA (Electronic Travel Authorization) online at least 3-4 days prior to departure. This links directly to your passport, avoids long hours in arrival queues at Colombo airport, and ensures standard budget airline check-in clearance in India."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the recommended currency, and are credit cards widely accepted?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The local currency is the Sri Lankan Rupee (LKR). While premium hotels, resorts, and high-end restaurants in major cities like Colombo and Galle accept Visa and Mastercard, we highly recommend carrying cash for local cafes, tuk-tuks, rural markets, and national park entries. ATMs are widely available across major towns."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What type of power adapters and clothing should I pack?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sri Lanka primarily uses Type G (three rectangular pins, like the UK) and Type D (three round pins, like India) sockets. For clothing, lightweight breathable cottons or linens are perfect for warmer coastal towns. However, if you are visiting the Hill Country (Nuwara Eliya, Ella), temperature drops of up to 12°C require light sweeps, cardigans, or jackets."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How should we organize local transit and getting around?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "For supreme comfort and complete peace of mind, hiring a private air-conditioned vehicle with a professional English-speaking chauffeur-guide is the elite choice. It allows you to explore remote hills and coastal roads at your own pace. Uber and PickMe apps are highly reliable in Colombo town zones; scenic local trains can be booked in advance for Ella routes."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can we fully customize our Vibe Tour Sri Lanka package?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely. Every luxury journey we curate is built entirely around your family's speed, tastes, and desired mood. Whether you want a high-paced coastal surf tour, quiet secluded jungle spas, historic tea field estates, or gourmet private dining setups, our London and Colombo concierge desks coordinate the custom itinerary flawlessly."
                      }
                    }
                  ]
                })}
              </script>
            </Helmet>
            <Hero />
            <About />
            <Destinations />
            <Suspense fallback={<div className="h-40 bg-luxury-green" />}>
              <FeatureSection />
            </Suspense>
            <OfferSection />
            <Suspense fallback={<div className="h-40 bg-[#fcfbf7]" />}>
              <BlogHubSection />
            </Suspense>
            <Suspense fallback={<div className="h-40 bg-[#fcfbf7]" />}>
              <FaqAccordion theme="cream" />
            </Suspense>
            <Suspense fallback={<div className="h-40 bg-luxury-cream" />}>
              <CallToAction trackEvent={trackEvent} fadeUp={fadeUp} />
            </Suspense>
          </motion.div>
        } />
        
        <Route path="/sri-lanka-trip-cost-from-india" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaCostPage />
          </Suspense>
        } />
        
        <Route path="/sri-lanka-7-day-itinerary" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaItineraryPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-visa-for-indians" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaVisaPage />
          </Suspense>
        } />

        <Route path="/best-time-to-visit-sri-lanka" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaBestTimePage />
          </Suspense>
        } />
        
        <Route path="/sri-lanka-family-itinerary" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaFamilyPage />
          </Suspense>
        } />
        
        <Route path="/where-to-go-in-sri-lanka-in-june" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaJunePage />
          </Suspense>
        } />
        
        <Route path="/experience/:slug" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <ExperienceDetail />
          </Suspense>
        } />
      </Routes>

      {/* Footer */}
      <Suspense fallback={<div className="h-20 bg-luxury-black" />}>
        <Footer />
      </Suspense>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : "100%" }}
        className="fixed inset-0 bg-[#0e1c17] z-[150] px-6 py-6 text-white flex flex-col justify-start overflow-y-auto"
      >
        {/* Top Header */}
        <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-serif tracking-[0.2em] font-bold text-white"
          >
            VIBE TOUR
          </Link>
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="p-2 border border-white/20 rounded-full hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links Grid */}
        <div className="space-y-8 flex-grow">
          {/* Main Links */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold block">
              Bespoke Services
            </span>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link 
                to="/" 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/");
                }}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all flex flex-col gap-1"
              >
                <span className="font-serif font-bold text-base">Signature Home</span>
                <span className="text-[10px] opacity-60">Curated lifestyle</span>
              </Link>
              <a 
                href="/#destinations"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all flex flex-col gap-1"
              >
                <span className="font-serif font-bold text-base">The Collection</span>
                <span className="text-[10px] opacity-60">Past visual tours</span>
              </a>
            </div>
          </div>

          {/* Blogs / Curated Travel Guides list */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold block">
              Expert Travel Blueprints (Blogs)
            </span>
            <div className="space-y-3">
              {[
                { title: "Where to Go in June (2026)", path: "/where-to-go-in-sri-lanka-in-june", badge: "June Weather", desc: "Which coast to choose to beat the monsoons." },
                { title: "12-Day Family Itinerary with Kids", path: "/sri-lanka-family-itinerary", badge: "Kids Fun • 2026", desc: "Custom low-fatigue routes & baby safety." },
                { title: "7-Day Sri Lanka Classic Itinerary", path: "/sri-lanka-7-day-itinerary", badge: "Most Popular", desc: "Ready-to-use perfect first trip loop." },
                { title: "Best Time to Visit Sri Lanka Guide", path: "/best-time-to-visit-sri-lanka", badge: "Weather Guide", desc: "Dual monsoon & seasonal months." },
                { title: "Sri Lanka Visa ETA Guide for Indians", path: "/sri-lanka-visa-for-indians", badge: "Waivers & ETA", desc: "How to register entry clearance." },
                { title: "Complete Trip Cost & Calculator", path: "/sri-lanka-trip-cost-from-india", badge: "Financials", desc: "Real flight, hotels & taxi budgets." }
              ].map((blog, idx) => (
                <Link
                  key={idx}
                  to={blog.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#d4af37] hover:bg-white/10 transition-all flex justify-between items-center group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] uppercase font-mono font-bold bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-md">
                        {blog.badge}
                      </span>
                    </div>
                    <p className="font-serif font-bold text-sm text-white group-hover:text-[#d4af37] transition-colors leading-tight">
                      {blog.title}
                    </p>
                    <p className="text-[10px] text-white/50 leading-relaxed font-light">
                      {blog.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Area with Book Button */}
        <div className="mt-12 pt-6 border-t border-white/10 space-y-6 shrink-0">
          <a 
            href="https://wa.me/94722968210" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent('whatsapp_click', 'engagement', 'mobile_menu_book');
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'Lead');
              }
            }}
            className="w-full py-4 bg-[#d4af37] text-black font-bold text-center rounded-full uppercase text-xs tracking-widest hover:bg-white transition-colors block"
          >
            Start Your Private Journey (WhatsApp)
          </a>
          <div className="text-center text-[10px] tracking-widest opacity-40 uppercase">
            Vibe Tour Sri Lanka | London • Colombo
          </div>
        </div>
      </motion.div>
    </div>
  );
}
