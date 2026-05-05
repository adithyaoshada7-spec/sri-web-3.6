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
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Add global checkout for GA tracking
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Helper function for tracking events
const trackEvent = (action: string, category: string, label: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
};

const activities = [
  {
    id: "cruise",
    slug: "crust-ahangama",
    title: "Coastal Sophistication at Crust Ahangama",
    location: "Ahangama Shoreline",
    description: "Experience coastal sophistication at the south coast's premier beachfront destination. Artisanal pizzas, curated cocktails, and sunset views.",
    longDescription: "Experience the coastal sophistication of Crust Ahangama, the south coast's premier beachfront destination. Indulge in artisanal, wood-fired pizzas paired with curated signature cocktails. With its vibrant atmosphere and prime location overlooking the Indian Ocean, it’s the definitive choice for those seeking an elevated evening of gastronomy and sunset views.",
    image: "https://static.goto-where.com/6279-albums-8.jpg",
    icon: <Compass className="w-5 h-5" />,
    features: ["Artisanal Wood-Fired Pizza", "Signature Cocktails", "Direct Beachfront Access", "Sunset Gastronomy"],
    stats: { duration: "Evening", exclusivity: "Vibrant", season: "Year Round" },
    testimonial: {
      quote: "The best gold-hour spot on the south coast. The cocktail list is as impressive as the view.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  },
  {
    id: "safari",
    slug: "colombo-sailing-cruise",
    title: "Family Sailing Cruise: Colombo Skyline",
    location: "Colombo Marina",
    description: "Escape the city for a 3-hour Colombo sailing cruise. Experience stunning skyline views, golden-hour swimming, and paddle boarding.",
    longDescription: "Escape the city for a 3-hour Colombo sailing cruise. Depart from the Marina at 4:00 PM to enjoy stunning skyline views, welcome drinks, and snacks. Dive into the sea for a swim or try stand-up paddle boarding at the Port City beach before returning at 7:00 PM. Perfect for families!",
    image: "https://cdn-idgij.nitrocdn.com/PYIkwxaiDQkwbmZMkHODMuuEAfVTLOht/assets/images/optimized/rev-412ad82/www.sail-lanka-charter.com/wp-content/uploads/2023/02/IMG_11577a-1024x635.jpg",
    icon: <Wind className="w-5 h-5" />,
    features: ["Skyline Views at Sunset", "Swimming & Paddle Boarding", "Welcome Drinks & Snacks", "Family-Friendly Charter"],
    stats: { duration: "3 Hours", exclusivity: "Private", season: "Year Round" },
    testimonial: {
      quote: "I escaped the city's noise for a cozy cruise over the Colombo seas with my family. I saw the beautiful, evolving skyline at sunset.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  },
];

const ExperienceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const selectedActivity = activities.find(a => a.slug === slug);

  useEffect(() => {
    if (selectedActivity) {
      document.title = `${selectedActivity.title} | Plan Sri Lanka`;
    }
    return () => {
      document.title = 'Plan Sri Lanka | Curated Luxury Travel';
    };
  }, [selectedActivity]);

  if (!selectedActivity) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 md:pt-32 bg-luxury-cream min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-serif text-luxury-green mb-4">Experience Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-luxury-gold font-bold uppercase tracking-widest"
          >
            Return to Portfolio
          </button>
        </div>
      </motion.div>
    );
  }

  const handleShare = (platform?: 'x' | 'fb' | 'wa' | 'mail') => {
    const shareText = `Discover ${selectedActivity.title} with Plan Sri Lanka — Pure luxury in the heart of the Indian Ocean.`;
    const shareUrl = window.location.href;

    if (!platform && navigator.share) {
      navigator.share({
        title: selectedActivity.title,
        text: shareText,
        url: shareUrl,
      }).catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });
      return;
    }

    if (platform === 'x') {
      const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(xUrl, '_blank');
    } else if (platform === 'fb') {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(fbUrl, '_blank');
    } else if (platform === 'wa') {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      window.open(waUrl, '_blank');
    } else if (platform === 'mail') {
      const mailUrl = `mailto:?subject=${encodeURIComponent(selectedActivity.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
      window.open(mailUrl, '_blank');
    } else {
      // Default fallback if choice not specified and navigator.share fails
      const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(xUrl, '_blank');
    }
  };

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-24 md:pt-32 bg-luxury-cream min-h-screen"
    >
      <Helmet>
        <title>{selectedActivity.title} | Plan Sri Lanka</title>
        <meta name="description" content={selectedActivity.description} />
        <meta property="og:title" content={`${selectedActivity.title} | Plan Sri Lanka`} />
        <meta property="og:description" content={selectedActivity.description} />
        <meta property="og:image" content={selectedActivity.image} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:title" content={selectedActivity.title} />
        <meta name="twitter:description" content={selectedActivity.description} />
        <meta name="twitter:image" content={selectedActivity.image} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-black/40 hover:text-luxury-gold transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Portfolio
          </button>
          
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-black/30 hidden sm:block">Share:</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleShare('x')}
                className="p-2 text-luxury-gold hover:text-luxury-green transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare('fb')}
                className="p-2 text-luxury-gold hover:text-luxury-green transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare('wa')}
                className="p-2 text-luxury-gold hover:text-luxury-green transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare('mail')}
                className="p-2 text-luxury-gold hover:text-luxury-green transition-colors"
                title="Share via Email"
              >
                <Mail className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare()}
                className="p-2 text-luxury-gold hover:text-luxury-green transition-colors"
                title="Other options"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-luxury-gold font-serif italic text-lg md:text-xl mb-3 md:mb-4 block">{selectedActivity.location}</span>
            <h1 className="text-4xl md:text-7xl font-serif text-luxury-green mb-6 md:mb-8 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
              {selectedActivity.title}
            </h1>
            
            <div className="flex gap-8 md:gap-12 mb-8 md:mb-12 border-y border-luxury-black/5 py-6 md:py-8 overflow-x-auto no-scrollbar">
              {selectedActivity.stats && Object.entries(selectedActivity.stats).map(([label, value]) => (
                <div key={label} className="flex-shrink-0">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold mb-1">{label}</p>
                  <p className="font-serif text-base md:text-lg text-luxury-green whitespace-nowrap">{value as string}</p>
                </div>
              ))}
            </div>

            <div className="prose prose-luxury lg:max-max-w-none text-luxury-black/70 font-light text-base md:text-lg leading-relaxed space-y-6">
              <p>{selectedActivity.longDescription}</p>
            </div>

            <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {selectedActivity.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-xs md:text-sm font-medium text-luxury-green">
                  <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex flex-col items-center">
              <a 
                href="https://wa.me/94722968210"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', 'conversion', selectedActivity.title)}
                className="w-full flex items-center justify-center gap-3 py-5 md:py-6 bg-luxury-green text-white rounded-full font-serif text-lg md:text-xl hover:bg-luxury-gold transition-all duration-500 shadow-xl hover:shadow-luxury-gold/20"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative order-first lg:order-last"
          >
            <div className="aspect-[4/3] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={selectedActivity.image} 
                alt={selectedActivity.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 bg-white p-6 md:p-10 rounded-2xl shadow-xl hidden sm:block max-w-[240px] md:max-w-xs border border-luxury-black/5">
              <Star className="text-luxury-gold w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 fill-luxury-gold" />
              <p className="text-luxury-green italic font-serif text-base md:text-lg leading-relaxed">
                "{selectedActivity.testimonial.quote}"
              </p>
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-widest font-bold text-luxury-black/40">— {selectedActivity.testimonial.author}</p>
                <p className="text-[8px] uppercase tracking-widest text-luxury-gold font-medium mt-1">{selectedActivity.testimonial.title}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Guest Chronicles Section */}
        <div className="mt-32 py-24 border-t border-luxury-black/5">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1">
              <span className="text-luxury-gold font-serif italic text-lg mb-2 block">Guest Chronicles</span>
              <h3 className="text-4xl font-serif text-luxury-green mb-6">Voices of <br /> Distinction</h3>
              <p className="text-luxury-black/60 text-sm leading-relaxed mb-8">
                We pride ourselves on the advocacy of our guests. Each journey is a testament to our commitment to uncompromised luxury and soul-filled adventure.
              </p>
              <div className="flex items-center gap-4 py-6 border-y border-luxury-black/5">
                <div className="flex gap-1 text-luxury-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-luxury-gold" />)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-black/40">Verified Distinction</span>
              </div>
            </div>
            <div className="md:col-span-2">
              {[
                { q: "I escaped the city's noise for a cozy cruise over the Colombo seas with my family. I saw the beautiful, evolving skyline at sunset.", a: "The Silva Family" }
              ].map((note, i) => (
                <div key={i} className="p-8 bg-white/50 rounded-2xl border border-luxury-black/5 italic max-w-2xl">
                  <p className="text-luxury-black/70 text-sm leading-relaxed mb-4">"{note.q}"</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-luxury-gold">— {note.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-20 md:py-32 border-t border-luxury-black/5 mt-0 uppercase tracking-tight">
          <h3 className="text-2xl md:text-3xl font-serif text-luxury-green mb-8 md:mb-12">Other Extraordinary Paths</h3>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {activities.filter(a => a.slug !== slug).map(other => (
              <div 
                key={other.id}
                onClick={() => {
                  trackEvent('select_content', 'related_portfolio', other.title);
                  navigate(`/experience/${other.slug}`);
                }}
                className="group flex gap-4 md:gap-6 items-center p-4 md:p-6 bg-white rounded-2xl border border-luxury-black/5 cursor-pointer hover:border-luxury-gold hover:shadow-lg transition-all duration-500"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={other.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-serif text-lg md:text-xl text-luxury-green group-hover:text-luxury-gold transition-colors">{other.title}</h4>
                  <p className="text-luxury-black/50 text-[10px] md:text-xs uppercase tracking-widest mt-1">{other.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
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
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="text-luxury-gold p-2 bg-white rounded-full shadow-sm">
                            {item.icon}
                          </div>
                          <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold">Limited Availability</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif text-luxury-green mb-3 md:mb-4 group-hover:text-luxury-gold transition-colors">{item.title}</h3>
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
        
        <Route path="/experience/:slug" element={<ExperienceDetail />} />
      </Routes>

      {/* Feature Section */}
      <section className="py-20 md:py-32 bg-luxury-green text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {[
              { icon: <Star />, title: "Private Jets", desc: "Arrive in style with our seamless private aviation partnerships." },
              { icon: <MapPin />, title: "Secret Paths", desc: "Access ancient temples and gardens closed to the general public." },
              { icon: <Wind />, title: "Wellness First", desc: "Private Ayurvedic masters curated for your physical restoration." },
              { icon: <Palmtree />, title: "Estate Buyouts", desc: "Complete exclusivity with full estate takeovers for your party." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-luxury-gold mb-4 md:mb-6 flex justify-center md:justify-start">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-serif mb-3 md:mb-4">{feature.title}</h4>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="concierge" className="py-24 md:py-40 px-6 bg-luxury-cream">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-7xl font-serif text-luxury-green mb-6 md:mb-8 leading-tight">Begin Your Story.</h2>
            <p className="text-luxury-black/60 text-base md:text-lg mb-10 md:mb-12 max-w-2xl mx-auto px-4">
              We will handle your tour.
            </p>
            <div className="flex flex-col items-center justify-center px-4">
              <motion.a 
                href="https://wa.me/94722968210"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', 'conversion', 'footer_cta')}
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(197, 160, 89, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center gap-4 px-10 md:px-16 py-6 md:py-8 bg-luxury-green text-white rounded-full font-serif text-lg md:text-2xl shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out -z-10" />
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 group-hover:text-white transition-colors" />
                <span className="tracking-tight group-hover:text-white transition-colors">Start Your Private Inquiry</span>
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/10 rounded-full blur-2xl group-hover:bg-luxury-gold/30 transition-all" />
              </motion.a>
              <p className="mt-8 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-luxury-black/30">
                Direct access to our Mayfair desk
              </p>
            </div>
            <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-luxury-black/40">
              <span>+44 20 7946 0123</span>
              <span className="hidden md:block w-1 h-1 bg-luxury-gold rounded-full" />
              <span>London Office</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-black text-white/40 py-16 md:py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 md:mb-20 text-sm">
            <div className="col-span-1 md:col-span-2">
              <div className="text-xl font-serif tracking-[0.2em] font-bold text-white mb-6 md:mb-8">PLAN SRI LANKA</div>
              <p className="max-w-xs leading-relaxed text-xs md:text-sm">
                The ultimate travel concierge for the Indian Ocean. Dedicated to preservation, luxury, and the art of travel.
              </p>
            </div>
            <div>
              <h5 className="text-white uppercase tracking-widest text-[10px] md:text-[11px] font-bold mb-4 md:mb-6">Contact</h5>
              <p className="mb-2 text-xs md:text-sm">Mayfair, London W1K</p>
              <p className="mb-2 text-xs md:text-sm">Colombo 07, Sri Lanka</p>
              <p className="text-xs md:text-sm">concierge@plansrilanka.com</p>
            </div>
            <div>
              <h5 className="text-white uppercase tracking-widest text-[10px] md:text-[11px] font-bold mb-4 md:mb-6">Social</h5>
              <div className="flex gap-6 md:gap-4">
                <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 md:pt-10 text-[9px] md:text-[10px] uppercase tracking-widest text-center md:text-left gap-4">
            <p>© 2026 Plan Sri Lanka. All Rights Reserved.</p>
            <div className="flex gap-6 md:gap-8 bg-transparent">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

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
