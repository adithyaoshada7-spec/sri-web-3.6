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
      <div className="fixed bottom-6 left-6 right-6 z-[100] md:hidden flex flex-col items-center gap-2">
        {selectedActivity.slug === 'italian-vibe-tour' && (
          <div className="bg-emerald-950/90 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-sans tracking-wide border border-emerald-500/30 flex items-center gap-2 shadow-lg backdrop-blur-md animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold">🔥 3 families from India booked today</span>
          </div>
        )}
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
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h1 className="text-5xl md:text-[11rem] font-serif text-white mb-8 leading-[0.9] md:leading-[0.85] tracking-tighter">
                {selectedActivity.title.includes("Italian") ? (
                  <>
                    {selectedActivity.title.split("Italian")[0]}
                    <span className="italic text-luxury-gold">Italian</span>
                    {selectedActivity.title.split("Italian")[1]}
                  </>
                ) : selectedActivity.title}
              </h1>

              <div className="grid md:grid-cols-2 gap-12 items-end w-full">
                <div className="flex flex-col items-center md:items-start">
                <div className="text-sm sm:text-base text-white/90 font-sans leading-relaxed mb-10 max-w-2xl px-4 md:px-0">
                  {selectedActivity.description.includes("Your first private family discovery session is FREE") ? (
                    <>
                      <span className="bg-white/10 px-2 py-1 rounded-lg border border-white/20 font-medium inline-block mb-2 sm:inline mr-1 text-white">
                        Book Your First Family Trip <span className="font-bold text-luxury-gold">FREE</span>
                      </span>
                      {selectedActivity.description.split("Your first private family discovery session is FREE")[1]}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
                        <button 
                          onClick={() => document.getElementById('captured-moments')?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-luxury-gold hover:text-white transition-colors cursor-pointer border-b border-luxury-gold/30 font-medium w-fit text-left"
                        >
                          View tour photos from last week →
                        </button>
                      </div>
                    </>
                  ) : selectedActivity.description}
                </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://wa.me/94722968210"
                      target="_blank"
                      className="w-full sm:w-auto px-10 py-5 bg-luxury-gold text-white rounded-full font-serif text-xl shadow-xl shadow-luxury-gold/20 flex items-center justify-center gap-4 group"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span>Claim My Free Tour</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.a>
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

      {/* MAIN BODY CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left: Deep Storytelling */}
          <div className="space-y-16">
            <div className="border-l-4 border-luxury-gold/30 pl-10">
              <h3 className="text-3xl md:text-5xl font-serif text-luxury-green mb-8 italic">
                {selectedActivity.slug === 'italian-vibe-tour' ? "The Essence of The Amalfi Indian Ocean." : "Behind the Selection."}
              </h3>
              <p className="text-xl leading-relaxed text-luxury-black/70 font-light italic">
                {selectedActivity.longDescription}
              </p>
            </div>

            {selectedActivity.slug === 'italian-vibe-tour' ? (
              <div className="space-y-12">
                <div className="bg-luxury-gold/5 p-10 rounded-[40px] border border-luxury-gold/10">
                  <h4 className="text-2xl font-serif text-luxury-green mb-8 italic">The Dolce Vita Ritual</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="space-y-3">
                        <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                           <Coffee className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-xs uppercase tracking-widest text-luxury-green">The Aperitivo</p>
                        <p className="text-sm text-luxury-black/60 leading-relaxed italic">Sunset spritz and artisan antipasti curated for the family palate.</p>
                     </div>
                     <div className="space-y-3">
                        <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                           <Wind className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-xs uppercase tracking-widest text-luxury-green">The Soundtrack</p>
                        <p className="text-sm text-luxury-black/60 leading-relaxed italic">Curated Mediterranean deep house and classic Italian jazz fusion.</p>
                     </div>
                     <div className="space-y-3">
                        <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                           <Star className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-xs uppercase tracking-widest text-luxury-green">The Vibe</p>
                        <p className="text-sm text-luxury-black/60 leading-relaxed italic">Slow living, linen textures, and the effortless style of an Amalfi getaway.</p>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedActivity.gallery?.slice(0, 4).map((img, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-square rounded-2xl overflow-hidden shadow-md border border-luxury-gold/10"
                    >
                      <img src={img} alt="Tour Moment" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {selectedActivity.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-luxury-green font-serif italic text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
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
            )}
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

             <div className="bg-white p-12 rounded-[40px] border border-luxury-black/5 shadow-luxury text-center">
                {selectedActivity.slug === 'italian-vibe-tour' && (
                  <div className="mb-6 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-150 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>3 families from India booked today</span>
                  </div>
                )}
                <h3 className="text-3xl font-serif text-luxury-green mb-6">
                  {selectedActivity.slug === 'italian-vibe-tour' ? "Reserve Your Vibe." : "Skip the Form."}
                </h3>
                <p className="text-luxury-black/60 mb-10 font-sans">
                  {selectedActivity.slug === 'italian-vibe-tour' 
                    ? "Our concierge is waiting to curate your private Mediterranean escape. No forms, just a direct conversation."
                    : "We value your time. Connect directly with our concierge via WhatsApp for instant availability and personalized planning."}
                </p>
                <a 
                  href="https://wa.me/94722968210"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', 'conversion', 'detail_form_skip')}
                  className="w-full py-6 bg-luxury-green text-white rounded-2xl font-serif text-xl hover:bg-luxury-black transition-all shadow-2xl flex items-center justify-center gap-4 group"
                >
                  <MessageCircle className="w-6 h-6" /> Talk to Us Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>
             </div>
          </div>
        </div>

        {/* Gallery Section - Full Width Impact */}
        {selectedActivity.gallery && (
          <div className="mt-40" id="captured-moments">
            <div className="text-center mb-20 space-y-4">
              <span className="text-luxury-gold font-serif italic text-xl">The Atmosphere</span>
              <h2 className="text-5xl md:text-8xl font-serif text-luxury-green tracking-tighter">
                {selectedActivity.slug === 'italian-vibe-tour' ? "Italian Vibe, Sri Lankan Soul." : "Captured Moments."}
              </h2>
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

            {selectedActivity.slug === 'italian-vibe-tour' && (
              <div className="mt-40 text-center max-w-3xl mx-auto space-y-8">
                 <span className="text-luxury-gold font-serif italic text-2xl lowercase tracking-wider">La Dolce Far Niente.</span>
                 <h3 className="text-4xl md:text-6xl font-serif text-luxury-green leading-tight">The Art of Doing Nothing.</h3>
                 <p className="text-luxury-black/60 text-lg leading-relaxed italic">
                   We invite you to leave the itinerary behind. On this journey, the luxury is in the stillness—the sound of the water, the taste of the coast, and the presence of your loved ones. Italian soul, perfectly at home in the Indian Ocean.
                 </p>
                 <div className="pt-10 flex justify-center">
                    <div className="w-20 h-[1px] bg-luxury-gold/30" />
                 </div>
              </div>
            )}
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default ExperienceDetail;
