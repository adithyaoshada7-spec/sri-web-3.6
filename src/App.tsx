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
import React, { useState, useEffect, lazy, Suspense } from "react";
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
          PLAN SRI LANKA
        </Link>
        
        <div className="hidden md:flex gap-12 items-center text-[10px] uppercase tracking-[0.3em] font-medium">
          <Link to="/#about" className="hover:text-luxury-gold transition-colors">The Experience</Link>
          <Link to="/#destinations" className="hover:text-luxury-gold transition-colors">Portfolio</Link>
          <a href="#concierge" className="hover:text-luxury-gold transition-colors">Private Concierge</a>
          <button 
            onClick={() => trackEvent('inquiry_click', 'engagement', 'header_inquiry')}
            className="px-6 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Inquire
          </button>
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
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2000"
                alt="Sri Lanka Highlands"
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
                  The Ultimate <br /> 
                  <span className="italic">Island Escape</span>
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

            {/* About Section */}
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
                    Plan Sri Lanka is more than a travel agency; we are custodians of the extraordinary. For the discerning British traveller, we bridge the gap between heritage and high-modernity.
                  </p>
                  <p>
                    From the rolling tea estates of the central highlands to the secret coves of the southern coast, every itinerary is hand-stitched to your specific desires. Experience the teardrop of the Indian Ocean as it was meant to be seen—with complete privacy, exceptional luxury, and soulful connection.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Destinations/Activities Grid */}
            <section id="destinations" className="py-20 md:py-32 px-6 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
                  <motion.div
                    whileInView="animate"
                    initial="initial"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <h2 className="text-4xl md:text-5xl font-serif text-luxury-green">Chosen Experiences</h2>
                    <p className="mt-4 text-luxury-black/50 tracking-wide uppercase text-[10px] md:text-xs">Hand-picked for our limited clientele</p>
                  </motion.div>
                  <button className="group flex items-center gap-3 text-[10px] md:text-sm font-medium tracking-widest uppercase text-luxury-gold w-fit">
                    Explore Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <motion.div 
                  whileInView="animate"
                  initial="initial"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid md:grid-cols-3 gap-6 md:gap-8"
                >
                  {activities.map((item) => (
                    <motion.div 
                      key={item.id}
                      variants={fadeUp}
                      onClick={() => {
                        trackEvent('select_content', 'portfolio', item.title);
                        navigate(`/experience/${item.slug}`);
                      }}
                      className="group relative flex flex-col h-full bg-luxury-cream rounded-2xl overflow-hidden border border-luxury-black/5 cursor-pointer"
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="text-luxury-gold p-2 bg-white rounded-full shadow-sm">
                            {IconMap[item.iconName] || <Star className="w-5 h-5" />}
                          </div>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold">Limited Availability</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif text-luxury-green mb-2 md:mb-3 group-hover:text-luxury-gold transition-colors">
                          {item.title.includes("Italian") ? (
                            <>
                              {item.title.split("Italian")[0]}
                              <span className="font-bold italic whitespace-nowrap">Italian</span>
                              {item.title.split("Italian")[1]}
                            </>
                          ) : (
                            item.title
                          )}
                        </h3>
                        {item.subheading && (
                          <p className="text-sm md:text-base font-serif italic mb-3 md:mb-4 text-luxury-gold">
                            {item.subheading.includes("Italian") ? (
                              <>
                                {item.subheading.split("Italian")[0]}
                                <span className="font-bold italic whitespace-nowrap">Italian</span>
                                {item.subheading.split("Italian")[1]}
                              </>
                            ) : (
                              item.subheading
                            )}
                          </p>
                        )}
                        <p className="text-luxury-black/60 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                          {item.description}
                        </p>
                        <button className="w-full py-4 border border-luxury-green/10 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-green hover:text-white transition-all flex items-center justify-center gap-2">
                          View Details <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
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

      {/* Feature Section */}
      <Suspense fallback={<div className="h-40 bg-luxury-green" />}>
        <FeatureSection />
      </Suspense>

      {/* Call to Action */}
      <Suspense fallback={<div className="h-40 bg-luxury-cream" />}>
        <CallToAction trackEvent={trackEvent} fadeUp={fadeUp} />
      </Suspense>

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
          <a href="#destinations" onClick={() => setIsMenuOpen(false)}>Destinations</a>
          <a href="#concierge" onClick={() => setIsMenuOpen(false)}>Concierge</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Inquire</a>
        </div>
        <div className="text-center text-[10px] tracking-widest opacity-50 uppercase">
          Plan Sri Lanka | London • Colombo
        </div>
      </motion.div>
    </div>
  );
}
