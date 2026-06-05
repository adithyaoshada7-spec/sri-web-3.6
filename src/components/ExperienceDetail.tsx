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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (selectedActivity) {
      document.title = selectedActivity.slug === 'italian-vibe-tour'
        ? "Sri Lanka Tour Packages from India | Vibe Tour Sri Lanka"
        : `${selectedActivity.title} | Plan Sri Lanka`;
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
        <title>
          {selectedActivity.slug === 'italian-vibe-tour' 
            ? "Sri Lanka Tour Packages from India | Vibe Tour Sri Lanka" 
            : `${selectedActivity.title} | Plan Sri Lanka`}
        </title>
        <meta 
          name="description" 
          content={selectedActivity.slug === 'italian-vibe-tour' 
            ? "Bespoke Sri Lanka travel and vacation packages from India. Experience the elite Vibe Tour Sri Lanka with curated itineraries, premium Colombo dining, and packages from Delhi/Mumbai." 
            : selectedActivity.description} 
        />
        <meta 
          name="keywords" 
          content={selectedActivity.slug === 'italian-vibe-tour' 
            ? "Sri Lanka Tour Packages from India, Vibe Tour Sri Lanka, Sri Lanka tour package from Delhi, Sri Lanka travel packages from India, Sri Lanka vacation packages, Colombo custom tour"
            : `${selectedActivity.title}, Sri Lanka travel, Plan Sri Lanka, custom itinerary`} 
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Plan Sri Lanka Editorial Desk" />
        <meta name="publisher" content="Plan Sri Lanka" />
        <link rel="canonical" href={`https://plan-srilanka.com/experience/${selectedActivity.slug}`} />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://plan-srilanka.com/experience/${selectedActivity.slug}`} />
        <meta 
          property="og:title" 
          content={selectedActivity.slug === 'italian-vibe-tour' 
            ? "Sri Lanka Tour Packages from India | Vibe Tour Sri Lanka" 
            : `${selectedActivity.title} | Plan Sri Lanka`} 
        />
        <meta 
          property="og:description" 
          content={selectedActivity.slug === 'italian-vibe-tour' 
            ? "Bespoke Sri Lanka travel and vacation packages from India. Experience the elite Vibe Tour Sri Lanka with curated itineraries, premium Colombo dining, and packages from Delhi/Mumbai." 
            : selectedActivity.description} 
        />
        <meta property="og:image" content={selectedActivity.image} />
        <meta property="og:site_name" content="Plan Sri Lanka" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta 
          name="twitter:title" 
          content={selectedActivity.slug === 'italian-vibe-tour' 
            ? "Sri Lanka Tour Packages from India | Vibe Tour Sri Lanka" 
            : `${selectedActivity.title} | Plan Sri Lanka`} 
        />
        <meta 
          name="twitter:description" 
          content={selectedActivity.slug === 'italian-vibe-tour' 
            ? "Bespoke Sri Lanka travel and vacation packages from India. Experience the elite Vibe Tour Sri Lanka with curated itineraries, premium Colombo dining, and packages from Delhi/Mumbai." 
            : selectedActivity.description} 
        />
        <meta name="twitter:image" content={selectedActivity.image} />
        {selectedActivity.slug === 'italian-vibe-tour' && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Plan Sri Lanka",
              "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1",
              "description": "Premium luxury Sri Lanka travel packages from India and direct Sri Lanka tour packages from Delhi. Curators of the exclusive Vibe Tour Sri Lanka.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Colombo",
                "addressCountry": "LK"
              },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "lowPrice": "0",
                "highPrice": "1500",
                "offerCount": "1",
                "offers": [
                  {
                    "@type": "Offer",
                    "name": "Vibe Tour Sri Lanka - First Family Discovery Session Free",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                ]
              }
            })}
          </script>
        )}
        {selectedActivity.slug === 'italian-vibe-tour' && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristTrip",
              "name": "Vibe Tour Sri Lanka - Sri Lanka Tour Packages from India",
              "description": "Premium luxury Sri Lanka travel packages from India and direct Sri Lanka tour packages from Delhi.",
              "provider": {
                "@type": "TravelAgency",
                "name": "Plan Sri Lanka"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "name": "Complimentary First Family Discovery Session"
              }
            })}
          </script>
        )}
        {selectedActivity.slug === 'italian-vibe-tour' && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How easily can I book Sri Lanka packages from Delhi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Booking our bespoke Sri Lanka packages from Delhi is simple. Discerning travellers can take a direct flight from Indira Gandhi International Airport (DEL) to Colombo Bandaranaike International Airport (CMB) in just under 3.5 hours. Our luxury concierge service will meet you directly at the runway for VIP fast-track customs clearance, followed by a private luxury drive to your coastal retreat."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What makes this the premium Sri Lanka tour itinerary from India?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Unlike standard commercial itineraries, this exclusive Sri Lanka tour itinerary from India is designed for the modern luxury traveller. It prioritizes the elegant slow-living philosophy of premium island living, combining seaside dining, luxury harbor cruises, curated lounge soundtracks, and complete privacy for your family, rather than over-scheduled, rushed sightseeing."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do your Sri Lanka vacation packages from India include private custom experiences?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all our luxury Sri Lanka vacation packages from India are entirely bespoke. We specialize in custom-tailored travel packages for families and couples seeking complete exclusivity, artisan dining, and high-contrast, beautiful coastal atmospheres in the Indian Ocean."
                  }
                }
              ]
            })}
          </script>
        )}
      </Helmet>

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
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 pb-12 md:p-20 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h1 className="text-5xl md:text-[11rem] font-serif text-white mb-8 leading-[0.9] md:leading-[0.85] tracking-tighter">
                {selectedActivity.title.includes("Vibe") ? (
                   <>
                     {selectedActivity.title.split("Vibe")[0]}
                     <span className="italic text-luxury-gold">Vibe</span>
                     {selectedActivity.title.split("Vibe")[1]}
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
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 justify-center md:justify-start w-full">
                        <button 
                          onClick={() => document.getElementById('captured-moments')?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-luxury-gold hover:text-white transition-colors cursor-pointer border-b border-luxury-gold/30 font-medium text-sm sm:text-base whitespace-nowrap"
                        >
                          View tour photos from last week →
                        </button>
                        {selectedActivity.slug === 'italian-vibe-tour' && (
                          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs text-emerald-400 font-sans font-semibold tracking-wide shadow-md">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                            </span>
                            <span>🔥 3 families from India booked today</span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : selectedActivity.description}
                </div>
                  
                  <div className="flex flex-col items-center md:items-start gap-4 w-full">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://wa.me/94722968210"
                      target="_blank"
                      onClick={() => {
                        trackEvent('whatsapp_click', 'conversion', 'detail_claim_free_tour');
                        if (typeof window !== 'undefined' && (window as any).fbq) {
                          (window as any).fbq('track', 'Lead');
                        }
                      }}
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
                {selectedActivity.slug === 'italian-vibe-tour' ? "The Essence of Vibe Tour Sri Lanka." : "Behind the Selection."}
              </h3>
              <p className="text-xl leading-relaxed text-luxury-black/70 font-light italic">
                {selectedActivity.longDescription}
              </p>
            </div>

            {selectedActivity.slug === 'italian-vibe-tour' ? (
              <div className="space-y-12">
                <div className="bg-luxury-gold/5 p-10 rounded-[40px] border border-luxury-gold/10">
                  <h4 className="text-2xl font-serif text-luxury-green mb-8 italic">The Slow Living Ritual</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="space-y-3">
                        <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                           <Coffee className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-xs uppercase tracking-widest text-luxury-green">The Sunset Vibe</p>
                        <p className="text-sm text-luxury-black/60 leading-relaxed italic">Sunset coolers and artisan dishes curated for the family palate.</p>
                     </div>
                     <div className="space-y-3">
                        <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                           <Wind className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-xs uppercase tracking-widest text-luxury-green">The Soundtrack</p>
                        <p className="text-sm text-luxury-black/60 leading-relaxed italic">Curated coastal deep house and soulful acoustic sunset fusion.</p>
                     </div>
                     <div className="space-y-3">
                        <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                           <Star className="w-4 h-4" />
                        </div>
                        <p className="font-bold text-xs uppercase tracking-widest text-luxury-green">The Vibe</p>
                        <p className="text-sm text-luxury-black/60 leading-relaxed italic">Slow living, linen textures, and the effortless style of a premium island getaway.</p>
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
                    ? "Our concierge is waiting to curate your private coastal escape. No forms, just a direct conversation."
                    : "We value your time. Connect directly with our concierge via WhatsApp for instant availability and personalized planning."}
                </p>
                <a 
                  href="https://wa.me/94722968210"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('whatsapp_click', 'conversion', 'detail_form_skip');
                    if (typeof window !== 'undefined' && (window as any).fbq) {
                      (window as any).fbq('track', 'Lead');
                    }
                  }}
                  className="w-full py-6 bg-luxury-green text-white rounded-2xl font-serif text-xl hover:bg-luxury-black transition-all shadow-2xl flex items-center justify-center gap-4 group"
                >
                  <MessageCircle className="w-6 h-6" /> Talk to Us Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>
             </div>
          </div>
        </div>

        {/* NEW SEO HUB FOR INDIAN TRAVELERS */}
        {selectedActivity.slug === 'italian-vibe-tour' && (
          <div className="mt-32 pt-20 border-t border-luxury-gold/20">
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
              <span className="text-luxury-gold font-serif italic text-lg uppercase tracking-wider block">Bespoke Indian Edition</span>
              <h2 className="text-4xl md:text-6xl font-serif text-luxury-green leading-snug tracking-tight">
                Elite Sri Lanka Tour Packages from India
              </h2>
              <p className="text-luxury-black/70 text-lg leading-relaxed max-w-2xl mx-auto font-light">
                Discover the ultimate luxury holiday. Seamless direct connections, fast-track custom clearances, and curated coastal itineraries custom-tailored for families traveling from Delhi, Mumbai, and Bangalore.
              </p>
            </div>

            {/* TWO COLUMN GRID FOR TRAVEL LAYOUT: ITINERARY DETAILS & TRANSIT BLUEPRINTS */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {/* Box 1: The Curated Itinerary Blueprint */}
              <div className="bg-white p-10 md:p-12 rounded-[40px] border border-luxury-black/5 shadow-luxury space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-luxury-green tracking-tight">The Sri Lanka Tour Itinerary from India</h3>
                    <p className="text-xs text-luxury-gold uppercase tracking-[0.15em] font-medium mt-0.5">Slow Living Curated Map</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4 border-l-2 border-luxury-gold/20 pl-6 relative">
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-luxury-gold -left-[6px] top-1.5" />
                    <div>
                      <p className="font-bold text-xs uppercase text-luxury-green tracking-wider">Day 1: Delhi/Mumbai Arrival & Skyward Sunset</p>
                      <p className="text-sm text-luxury-black/60 leading-relaxed mt-1 italic">
                        Touch down in Colombo. Glide past the customs crowd via our airside fast-track service. Start with luxury skyline views and sunset cocktails.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 border-l-2 border-luxury-gold/20 pl-6 relative">
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-luxury-gold -left-[6px] top-1.5" />
                    <div>
                      <p className="font-bold text-xs uppercase text-luxury-green tracking-wider">Day 2: The Premium Coastal Experience</p>
                      <p className="text-sm text-luxury-black/60 leading-relaxed mt-1 italic">
                        A full morning of barefoot luxury, culminating in artisan coastal dining with artisan regional grills and curated deep house under the stars.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 border-l-2 border-luxury-gold/20 pl-6 relative">
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-luxury-gold -left-[6px] top-1.5" />
                    <div>
                      <p className="font-bold text-xs uppercase text-luxury-green tracking-wider">Day 3: Private Lagoon Sail & Gastronomy Journey</p>
                      <p className="text-sm text-luxury-black/60 leading-relaxed mt-1 italic">
                        Board a private yacht. Sail along the tranquil Colombo skyline before checking out with direct luxury airport shuttle transfers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Flight Connections and Transit Map */}
              <div className="bg-luxury-green p-10 md:p-12 rounded-[40px] text-white flex flex-col justify-between relative overflow-hidden group">
                <div className="space-y-8 z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-luxury-gold">
                      <Wind className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-white tracking-tight">Sri Lanka Packages from Delhi & Indian Hubs</h3>
                      <p className="text-xs text-luxury-gold uppercase tracking-[0.15em] font-medium mt-0.5">Frictionless Premium Flight Paths</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-sm font-light leading-relaxed">
                    <p>
                      Our signature <strong className="text-luxury-gold font-bold">sri lanka travel packages from india</strong> are designed around direct, hassle-free sky routes:
                    </p>
                    
                    <ul className="space-y-4 text-xs font-serif italic text-white/90">
                      <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>Delhi (DEL) direct to Colombo</span>
                        <span className="text-luxury-gold font-sans font-bold">~3h 30m</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>Mumbai (BOM) direct to Colombo</span>
                        <span className="text-luxury-gold font-sans font-bold">~2h 35m</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>Bangalore (BLR) direct to Colombo</span>
                        <span className="text-luxury-gold font-sans font-bold">~1h 25m</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-2">
                        <span>Chennai (MAA) direct to Colombo</span>
                        <span className="text-luxury-gold font-sans font-bold">~1h 15m</span>
                      </li>
                    </ul>

                    <p className="text-xs text-white/75 italic">
                      All trips include standard private yacht access, luxury private SUV ground transfers, and customizable dates to perfectly map to your airline itinerary.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Pricing Model</p>
                    <p className="font-serif text-lg text-luxury-gold">First Session FREE • Zero Form Commitment</p>
                  </div>
                  <a 
                    href="https://wa.me/94722968210"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent('whatsapp_click', 'engagement', 'detail_booking_guide_request');
                      if (typeof window !== 'undefined' && (window as any).fbq) {
                        (window as any).fbq('track', 'Lead');
                      }
                    }}
                    className="px-6 py-3 bg-white text-luxury-green rounded-full font-serif text-xs font-semibold hover:bg-luxury-gold hover:text-white transition-all flex items-center gap-2 group/btn"
                  >
                    <span>Request Booking Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-luxury-gold/15 transition-all duration-1000" />
              </div>
            </div>

            {/* ACCORDION FAQ HUB SECTION FOR RANKINGS */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center md:text-left mb-10">
                <span className="text-luxury-gold font-serif italic text-sm uppercase tracking-wider block">Travel Sanctuary FAQ</span>
                <h3 className="text-3xl font-serif text-luxury-green">Sri Lanka Vacation Packages from India FAQ</h3>
                <p className="text-xs text-luxury-black/50 font-sans tracking-wide mt-1">Answering elite traveler queries organically</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "How easily can I book Sri Lanka packages from Delhi?",
                    a: "Direct flights run multiple times daily from Delhi (DEL). We arrange everything else—private fast-track custom approvals, luxury chauffeured air-conditioned SUVs directly from the airport terminal, and direct custom coordination. No forms or deposits are required to claim your initial getaway slot."
                  },
                  {
                    q: "Why is this the most premium option for Sri Lanka tour packages from India?",
                    a: "We steer clear of rigid schedules and standard tourist mini-buses. By aligning premium coastal relaxation (Slow Living) with absolute luxury on the Sri Lankan coast, we offer a vacation package format designed specifically for the discerning elite families seeking highly intimate memories."
                  },
                  {
                    q: "Can I customize the Sri Lanka tour itinerary from India with this trip?",
                    a: "Absolutely. Our Vibe Tour voyage is completely fluid. You can request customized length extensions, specific culinary adjustments (such as curated vegetarian or Jain artisan plates), special anniversaries, or multiple luxury resort additions across Colombo, Nuwara Eliya, or Galle."
                  },
                  {
                    q: "How does our Sri Lanka trip package from India save you from Google Ads booking traps?",
                    a: "We offer complete luxury transparency. While commercial package portals load packages with hidden transport and meal costs, we provide an elite, private, fully-guided lifestyle experience where your initial family getaway launch is completely complimentary, curated directly via WhatsApp."
                  }
                ].map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-3xl border border-luxury-black/5 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-luxury-gold/5 transition-colors"
                      >
                        <span className="font-serif text-base md:text-lg text-luxury-green font-medium tracking-tight">
                          {faq.q}
                        </span>
                        <ChevronDown 
                          className={`w-5 h-5 text-luxury-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-8 pb-6 text-sm text-luxury-black/60 leading-relaxed font-light italic border-t border-luxury-black/[0.03] pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Section - Full Width Impact */}
        {selectedActivity.gallery && (
          <div className="mt-40" id="captured-moments">
            <div className="text-center mb-20 space-y-4">
              <span className="text-luxury-gold font-serif italic text-xl">The Atmosphere</span>
              <h2 className="text-5xl md:text-8xl font-serif text-luxury-green tracking-tighter">
                {selectedActivity.slug === 'italian-vibe-tour' ? "Premium Vibe, Sri Lankan Soul." : "Captured Moments."}
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
                 <span className="text-luxury-gold font-serif italic text-2xl lowercase tracking-wider">The luxury of slow time.</span>
                 <h3 className="text-4xl md:text-6xl font-serif text-luxury-green leading-tight">The Art of Doing Nothing.</h3>
                 <p className="text-luxury-black/60 text-lg leading-relaxed italic">
                   We invite you to leave the itinerary behind. On this journey, the luxury is in the stillness—the sound of the water, the taste of the coast, and the presence of your loved ones. Pure soul, perfectly at home in the Indian Ocean.
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
