import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

interface CTAProps {
  trackEvent: (action: string, category: string, label: string) => void;
  fadeUp: any;
}

export const CallToAction = ({ trackEvent, fadeUp }: CTAProps) => (
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
        <h3 className="text-2xl md:text-4xl font-serif text-luxury-green mb-8 italic">"I Want Plan My Trip"</h3>
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
            <span className="tracking-tight group-hover:text-white transition-colors uppercase tracking-widest text-xs">
              Get My <span className="font-bold italic px-1 whitespace-nowrap">Italian</span> Vibe Tour.
            </span>
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
);

export default CallToAction;
