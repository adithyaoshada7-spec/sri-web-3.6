import { motion } from "motion/react";
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
  Share2
} from "lucide-react";
import React, { useEffect } from "react";
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

// Helper for mapping icon names to components
const IconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  Palmtree: <Palmtree className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />,
};

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
            <h1 className="text-4xl md:text-7xl font-serif text-luxury-green mb-4 md:mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
              {selectedActivity.title.includes("Italian") ? (
                <>
                  {selectedActivity.title.split("Italian")[0]}
                  <span className="font-bold italic whitespace-nowrap">Italian</span>
                  {selectedActivity.title.split("Italian")[1]}
                </>
              ) : (
                selectedActivity.title
              )}
            </h1>
            {selectedActivity.subheading && (
              <p className="text-xl md:text-2xl font-serif italic mb-6 md:mb-8 text-luxury-gold">
                {selectedActivity.subheading.includes("Italian") ? (
                  <>
                    {selectedActivity.subheading.split("Italian")[0]}
                    <span className="font-bold italic whitespace-nowrap">Italian</span>
                    {selectedActivity.subheading.split("Italian")[1]}
                  </>
                ) : (
                  selectedActivity.subheading
                )}
              </p>
            )}
            
            <div className="flex gap-8 md:gap-12 mb-8 md:mb-12 border-y border-luxury-black/5 py-6 md:py-8 overflow-x-auto no-scrollbar">
              {selectedActivity.stats && Object.entries(selectedActivity.stats).map(([label, value]) => (
                <div key={label} className="flex-shrink-0">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-luxury-black/40 font-bold mb-1">{label}</p>
                  <p className="font-serif text-base md:text-lg text-luxury-green whitespace-nowrap">{value as string}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-3xl">
              <p className="font-sans text-base md:text-lg text-luxury-black/80 leading-relaxed border-l-2 border-luxury-gold/30 pl-6 md:pl-8 py-2">
                {selectedActivity.longDescription}
              </p>
            </div>

            {selectedActivity.gallery && (
              <div className="mt-12 md:mt-16">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-black/30 mb-6 block">
                  The <span className="font-bold italic">Italian</span> Vibe Gallery.
                </span>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {selectedActivity.gallery.slice(0, 3).map((img, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="aspect-square rounded-xl overflow-hidden shadow-sm border border-luxury-black/5"
                    >
                      <img 
                        src={img} 
                        alt={`Gallery ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-[10px] text-luxury-black/40 italic">Captured by our guests</p>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-gold cursor-pointer hover:text-luxury-green transition-colors flex items-center gap-2">
                    <Share2 className="w-3 h-3" />
                    <span>Upload your memories</span>
                    <input type="file" className="hidden" accept="image/*" multiple />
                  </label>
                </div>
              </div>
            )}

            <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {selectedActivity.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-xs md:text-sm font-medium text-luxury-green">
                  <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-serif text-luxury-green mb-8 italic text-center">"I Want Plan My Trip"</h3>
              <a 
                href="https://wa.me/94722968210"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', 'conversion', selectedActivity.title)}
                className="w-full flex items-center justify-center gap-3 py-5 md:py-6 bg-luxury-green text-white rounded-full font-serif text-lg md:text-xl hover:bg-luxury-gold transition-all duration-500 shadow-xl hover:shadow-luxury-gold/20"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                <span>Get My <span className="font-bold italic px-1 whitespace-nowrap">Italian</span> Vibe Tour.</span>
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
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
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
                  <img src={other.image} alt={other.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
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

export default ExperienceDetail;
