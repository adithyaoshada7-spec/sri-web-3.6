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
const FeatureSection = lazy(() => import("./components/FeatureSection"));
const CallToAction = lazy(() => import("./components/CallToAction"));
const Footer = lazy(() => import("./components/Footer"));

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
        alt="Italian Vibe Tour"
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
          className="text-white text-4xl md:text-8xl font-serif mb-6 md:mb-8 leading-[1.1]"
        >
          Italian Vibe <br /> 
          <span className="italic text-luxury-gold">Tour In Sri Lanka</span>
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
            Unforgettable Italian Vibe Tour where coastal beauty, stylish experiences, music, food, and relaxed luxury come together. Designed for travelers who want more than just a trip, this tour creates moments full of culture, connection, celebration, and unforgettable memories inspired by the charm and energy of the Italian lifestyle.
          </p>
          <p>
            Feel the Italian vibe in Sri Lanka—with complete privacy, exceptional luxury, and soulful connection.
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
            <p className="mt-4 text-luxury-black/50 tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">Unrivalled Luxury • One Private Charter</p>
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
              <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-luxury-gold p-3 bg-white rounded-full shadow-sm">
                    {IconMap[item.iconName] || <Star className="w-5 h-5" />}
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.4em] text-luxury-black/40 font-bold">Limited Signature Collection</span>
                </div>
                <h3 className="text-4xl md:text-7xl font-serif text-luxury-green mb-6 leading-tight group-hover:text-luxury-gold transition-colors">
                  {item.title.includes("Italian") ? (
                    <>
                      {item.title.split("Italian")[0]}
                      <span className="font-bold italic">Italian</span>
                      {item.title.split("Italian")[1]}
                    </>
                  ) : item.title}
                </h3>
                <p className="text-xl md:text-2xl font-serif italic mb-8 text-luxury-gold leading-relaxed">
                  {item.subheading}
                </p>
                <div className="grid grid-cols-2 gap-8 mb-12 border-y border-luxury-black/5 py-8">
                  {item.stats && Object.entries(item.stats).map(([label, value]) => (
                    <div key={label}>
                      <span className="text-[10px] uppercase tracking-widest text-luxury-black/30 font-bold block mb-2">{label}</span>
                      <span className="font-serif text-xl text-luxury-green italic">{value as string}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full md:w-fit px-12 py-6 bg-luxury-green text-white rounded-full text-sm font-bold uppercase tracking-[0.3em] hover:bg-luxury-gold hover:shadow-xl transition-all flex items-center justify-center gap-4">
                  Step Inside The Experience <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const OfferSection = () => (
    <section className="py-20 md:py-32 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          whileInView="animate"
          initial="initial"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-luxury-gold font-serif italic mb-4 block">Limited Time Invitation</span>
          <h2 className="text-3xl md:text-6xl font-serif text-luxury-green mb-8">Exclusive Family Discovery</h2>
          <p className="text-luxury-black/90 mb-12 text-xl md:text-2xl font-serif leading-relaxed tracking-tight">
            Book your first family tour with us for <span className="font-bold italic text-luxury-gold border-b border-luxury-gold/30 pb-0.5">FREE</span> and discover local travel tips, hidden places, coastal experiences, and personalized recommendations inspired by the Italian vibe.
          </p>
          <div className="p-8 border-2 border-luxury-gold/20 rounded-3xl bg-luxury-cream/30">
            <p className="font-serif italic text-luxury-gold text-xl">"Luxury is not a price, it's a feeling of being understood."</p>
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
        <Link 
          to="/"
          className="text-lg md:text-xl font-serif tracking-[0.2em] font-bold cursor-pointer"
        >
          ITALIAN VIBE
        </Link>
        
        <div className="hidden md:flex gap-12 items-center text-[10px] uppercase tracking-[0.3em] font-medium">
          <Link to="/#about" className="hover:text-luxury-gold transition-colors">The Experience</Link>
          <Link to="/#destinations" className="hover:text-luxury-gold transition-colors">The Tour</Link>
          <a href="#concierge" className="hover:text-luxury-gold transition-colors">Private Concierge</a>
          <a 
            href="https://wa.me/94722968210"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('whatsapp_click', 'engagement', 'header_book_now');
            }}
            className="px-6 py-2 bg-luxury-gold text-white rounded-full hover:bg-white hover:text-black transition-all shadow-lg font-bold"
          >
            Book Now
          </a>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
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
            <Hero />
            <About />
            <Destinations />
            <Suspense fallback={<div className="h-40 bg-luxury-green" />}>
              <FeatureSection />
            </Suspense>
            <OfferSection />
            <Suspense fallback={<div className="h-40 bg-luxury-cream" />}>
              <CallToAction trackEvent={trackEvent} fadeUp={fadeUp} />
            </Suspense>
          </motion.div>
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
        className="fixed inset-0 bg-luxury-green z-[100] p-12 text-white flex flex-col justify-between"
      >
        <button onClick={() => setIsMenuOpen(false)} className="self-end p-2 border border-white/20 rounded-full">
          <X className="w-8 h-8" />
        </button>
        <div className="flex flex-col gap-8 text-4xl font-serif italic text-center">
          <a href="#about" onClick={() => setIsMenuOpen(false)}>Experience</a>
          <a href="#destinations" onClick={() => setIsMenuOpen(false)}>The Tour</a>
          <a href="#concierge" onClick={() => setIsMenuOpen(false)}>Concierge</a>
          <a 
            href="https://wa.me/94722968210" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Now
          </a>
        </div>
        <div className="text-center text-[10px] tracking-widest opacity-50 uppercase">
          Italian Vibe Tour | London • Colombo
        </div>
      </motion.div>
    </div>
  );
}
