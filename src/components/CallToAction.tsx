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
        <div className="flex flex-col items-center justify-center px-4">
          <a 
            href="https://wa.me/94722968210"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('whatsapp_click', 'conversion', 'footer_cta');
            }}
            className="group relative flex flex-col md:flex-row items-center justify-center gap-4 px-10 md:px-16 py-8 md:py-10 bg-luxury-green text-white rounded-full transition-all duration-500 overflow-hidden hover:bg-luxury-gold hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
              <span className="font-serif text-xl md:text-3xl italic tracking-tight">Begin The Conversation</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20 mx-2" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold opacity-80">Book Your Private Tour</span>
          </a>
          <p className="mt-8 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-luxury-black/30">
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
