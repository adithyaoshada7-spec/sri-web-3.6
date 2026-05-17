import { motion } from "motion/react";
import { Star, MapPin, Wind, Palmtree } from "lucide-react";

export const FeatureSection = () => (
  <section className="py-20 md:py-32 bg-luxury-green text-white px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        {[
          { icon: <Star />, title: "Aperitivo at Sea", desc: "Savor a glass of prosecco as the sun dips below the horizon." },
          { icon: <MapPin />, title: "Sunset Skyline", desc: "Navigate the Colombo coast with unrivaled views of the evolving city." },
          { icon: <Wind />, title: "Pure Serenity", desc: "Golden-hour swimming and paddle boarding in the tranquil ocean." },
          { icon: <Palmtree />, title: "Private Charter", desc: "The entire vessel is yours—complete exclusivity for up to 12 guests." },
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
);

export default FeatureSection;
