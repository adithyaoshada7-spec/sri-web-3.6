import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Wind, 
  Palmtree, 
  Star, 
  Coffee, 
  ArrowRight, 
  Twitter, 
  Facebook, 
  MessageCircle, 
  Mail, 
  Share2,
  ChevronDown,
  Play
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { activities } from "../data/activities";

// Helper function for tracking events
const trackEvent = (action: string, category: string, label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
};

const ExperienceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showAtmosphere, setShowAtmosphere] = useState(false);
  const selectedActivity = activities.find(a => a.slug === slug);

  useEffect(() => {
    if (selectedActivity) {
      document.title = `${selectedActivity.title} | Plan Sri Lanka`;
    }
    window.scrollTo(0, 0);
  }, [selectedActivity]);

  if (!selectedActivity) {
    return (
      <div className="pt-32 bg-luxury-cream min-h-screen text-center px-6">
        <h1 className="text-4xl font-serif text-luxury-green mb-8">Adventure Hidden</h1>
        <button onClick={() => navigate('/')} className="text-luxury-gold uppercase tracking-[0.3em] font-bold">Return to Portfolio</button>
      </div>
    );
  }

  const handleShare = (platform?: 'x' | 'fb' | 'wa' | 'mail') => {
    const shareText = `Discover ${selectedActivity.title} with Plan Sri Lanka — Pure luxury in the heart of the Indian Ocean.`;
    const shareUrl = window.location.href;

    if (!platform && navigator.share) {
      navigator.share({ title: selectedActivity.title, text: shareText, url: shareUrl }).catch(() => {});
      return;
    }

    const urls = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      wa: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      mail: `mailto:?subject=${encodeURIComponent(selectedActivity.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };
    
    if (platform && urls[platform]) window.open(urls[platform], '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-luxury-cream min-h-screen relative"
    >
      <Helmet>
        <title>{selectedActivity.title} | Plan Sri Lanka</title>
        <meta name="description" content={selectedActivity.description} />
      </Helmet>

      {/* STICKY MOBILE CTA - Now High Contrast */}
      <div className="fixed bottom-6 left-6 right-6 z-[100] md:hidden">
        <motion.a
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          href="https://wa.me/94722968210"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 py-5 bg-white text-luxury-black rounded-full font-serif text-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 border-luxury-gold"
        >
          <MessageCircle className="w-5 h-5 text-luxury-gold" />
          <span className="font-bold">Book Your Italian Vibe</span>
        </motion.a>
      </div>

      {/* CINEMATIC HERO (First 15-20%) */}
      <section className="relative h-[95vh] min-h-[700px] overflow-hidden">
        {/* Cinematic Background */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0 bg-luxury-black"
        >
          <img 
            src={selectedActivity.image} 
            className="w-full h-full object-cover opacity-80" 
            alt={selectedActivity.title} 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/30" />
        </motion.div>

        {/* Hero Content Area */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-20 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-luxury-gold/20 backdrop-blur-md rounded-full text-luxury-gold text-xs font-serif italic border border-luxury-gold/30">
                  {selectedActivity.location}
                </span>
                <span className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">The Exclusive Portfolio</span>
              </div>
              
              <h1 className="text-6xl md:text-[11rem] font-serif text-white mb-8 leading-[0.85] tracking-tighter">
                {selectedActivity.title.includes("Italian") ? (
                  <>
                    {selectedActivity.title.split("Italian")[0]}
                    <span className="italic text-luxury-gold">Italian</span>
                    {selectedActivity.title.split("Italian")[1]}
                  </>
                ) : selectedActivity.title}
              </h1>

              <div className="grid md:grid-cols-2 gap-12 items-end">
                <div>
                  <p className="text-2xl md:text-3xl text-white font-serif italic leading-relaxed mb-10 max-w-2xl tracking-tight">
                    {selectedActivity.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://wa.me/94722968210"
                      target="_blank"
                      className="px-10 py-5 bg-luxury-gold text-white rounded-full font-serif text-xl shadow-xl shadow-luxury-gold/20 flex items-center gap-4 group"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span>Book Instant Access</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.a>
                    
                    <button 
                      onClick={() => setShowAtmosphere(true)}
                      className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-serif text-xl flex items-center gap-4 hover:bg-white hover:text-black transition-all"
                    >
                      <Play className="w-6 h-6 fill-current" />
                      <span>Experience Atmosphere</span>
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex flex-col gap-6 justify-end items-end">
                   {/* Non-interactive stat cards to avoid dead clicks */}
                   <div className="flex gap-8 border-l border-white/10 pl-8">
                     {selectedActivity.stats && Object.entries(selectedActivity.stats).map(([label, value]) => (
                        <div key={label} className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">{label}</p>
                          <p className="font-serif text-2xl text-white italic">{value as string}</p>
                        </div>
                     ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Momentum Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40 z-30 pointer-events-none"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Atmosphere Modal */}
      <AnimatePresence>
        {showAtmosphere && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-luxury-black flex items-center justify-center p-6 md:p-20"
          >
            <button 
              onClick={() => setShowAtmosphere(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white uppercase tracking-widest text-xs flex items-center gap-2"
            >
              Close <span className="text-xl">×</span>
            </button>
            <div className="w-full max-w-7xl aspect-video rounded-3xl overflow-hidden shadow-2xl relative">
               <img src={selectedActivity.image} className="w-full h-full object-cover" />
               <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-center text-white px-6">
                    <h2 className="text-4xl md:text-7xl font-serif italic mb-4">The Atmosphere of Italian Vibe</h2>
                    <p className="text-xl md:text-2xl text-white/60 mb-8 max-w-2xl mx-auto">Visual narratives captured during our elite charters. Immersive video stories arriving soon.</p>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedActivity.gallery?.map((img, i) => (
                        <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                          <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN BODY CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left: Deep Storytelling */}
          <div className="space-y-16">
            <div className="border-l-4 border-luxury-gold/30 pl-10">
              <h3 className="text-3xl md:text-5xl font-serif text-luxury-green mb-8 italic">Behind the Selection.</h3>
              <p className="text-xl leading-relaxed text-luxury-black/70 font-light italic">
                {selectedActivity.longDescription}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              {selectedActivity.features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white rounded-3xl border border-luxury-black/5 flex flex-col gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 bg-luxury-cream rounded-xl flex items-center justify-center text-luxury-gold">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-base font-bold text-luxury-green leading-snug tracking-tight">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Immersive Media & Testimonial */}
          <div className="space-y-12">
             <div className="bg-luxury-green p-12 rounded-[50px] text-white overflow-hidden relative group">
                <Star className="text-luxury-gold w-16 h-16 mb-10 fill-luxury-gold animate-pulse" />
                <blockquote className="text-3xl md:text-4xl font-serif italic mb-12 leading-relaxed">
                  "{selectedActivity.testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                    <span className="font-serif italic text-luxury-gold text-2xl">{selectedActivity.testimonial.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold tracking-widest text-xs uppercase">{selectedActivity.testimonial.author}</p>
                    <p className="text-luxury-gold text-xs uppercase mt-1 tracking-tight">{selectedActivity.testimonial.title}</p>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-luxury-gold/10 transition-all duration-1000" />
             </div>

             <div className="bg-white p-12 rounded-[40px] border border-luxury-black/5 shadow-luxury">
                <h3 className="text-3xl font-serif text-luxury-green mb-10">Check Availability.</h3>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="group">
                    <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-luxury-black/30 block mb-4 group-focus-within:text-luxury-gold transition-colors">Exclusive Invitation Email</label>
                    <input 
                      type="email" 
                      placeholder="luxury@concierge.com"
                      className="w-full px-8 py-5 bg-luxury-cream border-2 border-transparent rounded-2xl focus:border-luxury-gold outline-none transition-all font-serif italic text-lg"
                    />
                  </div>
                  <button className="w-full py-6 bg-luxury-green text-white rounded-2xl font-serif text-xl hover:bg-luxury-black transition-all shadow-2xl flex items-center justify-center gap-4">
                    Send Priority Request <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
             </div>
          </div>
        </div>

        {/* Gallery Section - Full Width Impact */}
        {selectedActivity.gallery && (
          <div className="mt-40">
            <div className="text-center mb-20 space-y-4">
              <span className="text-luxury-gold font-serif italic text-xl">The Atmosphere</span>
              <h2 className="text-5xl md:text-8xl font-serif text-luxury-green tracking-tighter">Captured Moments.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {selectedActivity.gallery.map((img, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 0.98 }}
                  className={`rounded-[30px] overflow-hidden shadow-xl ${idx % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default ExperienceDetail;
