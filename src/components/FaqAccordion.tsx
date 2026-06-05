import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { trackEvent } from "../lib/analytics";

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
  theme?: "light" | "cream" | "green";
}

const defaultPreTripFaqs: FaqItem[] = [
  {
    category: "Planning",
    question: "When is the absolute best time to visit Sri Lanka?",
    answer: "Sri Lanka has a dual monsoon climate, making it a spectacular year-round destination. For the West Coast, South Coast, and Hill Country (Colombo, Galle, Ella, Kandy), the best weather is from December to April. For the East Coast and Ancient Cities (Trincomalee, Arugam Bay, Sigiriya), the dry sunny window peaks from May to September."
  },
  {
    category: "Visa & Entry",
    question: "Do Indian passport holders need a visa before flying to Sri Lanka?",
    answer: "Yes, all Indian travelers must obtain an entry clearance. We highly recommend securing a digital Tourist ETA (Electronic Travel Authorization) online at least 3-4 days prior to departure. This links directly to your passport, avoids long hours in arrival queues at Colombo airport, and ensures standard budget airline check-in clearance in India."
  },
  {
    category: "Budget & Currency",
    question: "What is the recommended currency, and are credit cards widely accepted?",
    answer: "The local currency is the Sri Lankan Rupee (LKR). While premium hotels, resorts, and high-end restaurants in major cities like Colombo and Galle accept Visa and Mastercard, we highly recommend carrying cash for local cafes, tuk-tuks, rural markets, and national park entries. ATMs are widely available across major towns."
  },
  {
    category: "Luggage & Packing",
    question: "What type of power adapters and clothing should I pack?",
    answer: "Sri Lanka primarily uses Type G (three rectangular pins, like the UK) and Type D (three round pins, like India) sockets. For clothing, lightweight breathable cottons or linens are perfect for warmer coastal towns. However, if you are visiting the Hill Country (Nuwara Eliya, Ella), temperature drops of up to 12°C require light sweeps, cardigans, or jackets."
  },
  {
    category: "Local Transport",
    question: "How should we organize local transit and getting around?",
    answer: "For supreme comfort and complete peace of mind, hiring a private air-conditioned vehicle with a professional English-speaking chauffeur-guide is the elite choice. It allows you to explore remote hills and coastal roads at your own pace. Uber and PickMe apps are highly reliable in Colombo town zones; scenic local trains can be booked in advance for Ella routes."
  },
  {
    category: "Custom Itineraries",
    question: "Can we fully customize our Vibe Tour Sri Lanka package?",
    answer: "Absolutely. Every luxury journey we curate is built entirely around your family's speed, tastes, and desired mood. Whether you want a high-paced coastal surf tour, quiet secluded jungle spas, historic tea field estates, or gourmet private dining setups, our London and Colombo concierge desks coordinate the custom itinerary flawlessly."
  }
];

export default function FaqAccordion({
  items = defaultPreTripFaqs,
  title = "Pre-Trip Planning Answers",
  subtitle = "Eliminate hesitation. Get direct, clear guidance for a sublime, trouble-free getaway.",
  theme = "cream"
}: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  const toggleIndex = (index: number, question: string) => {
    setOpenIndexes(prev => {
      const isOpen = !prev[index];
      trackEvent("faq_accordion_toggle", "engagement", `faq_home_${index}_${isOpen}`);
      return { ...prev, [index]: isOpen };
    });
  };

  // Theme-specific styles
  const isLight = theme === "light";
  const isGreen = theme === "green";
  const isCream = theme === "cream" || (!isLight && !isGreen);

  let bgClass = "bg-[#fcfbf7]";
  let titleClass = "text-luxury-green";
  let subtitleClass = "text-[#3a4d44] opacity-80";
  let itemBgClass = "bg-white border-luxury-black/5";
  let itemHeaderClass = "text-luxury-green hover:text-luxury-gold";
  let answerClass = "text-[#3a4d44]";

  if (isGreen) {
    bgClass = "bg-[#1e3a2f] text-white";
    titleClass = "text-white";
    subtitleClass = "text-white/70";
    itemBgClass = "bg-white/5 border-white/10";
    itemHeaderClass = "text-white hover:text-luxury-gold";
    answerClass = "text-white/80";
  } else if (isLight) {
    bgClass = "bg-white";
    titleClass = "text-luxury-green";
    subtitleClass = "text-[#3a4d44] opacity-80";
    itemBgClass = "bg-[#fcfbf7] border-luxury-black/5";
    itemHeaderClass = "text-luxury-green hover:text-luxury-gold";
    answerClass = "text-[#3a4d44]/90";
  }

  return (
    <section id="faq-home-section" className={`py-20 md:py-32 px-6 ${bgClass} transition-colors duration-300 relative overflow-hidden`}>
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none -z-10" />
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-xs text-[#b8941c] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Island Intelligence Desk
          </div>
          <h2 className={`text-3xl md:text-5xl font-serif leading-tight ${titleClass}`}>
            {title}
          </h2>
          <p className={`text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed ${subtitleClass}`}>
            {subtitle}
          </p>
        </div>

        {/* FAQs Grid/List */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = !!openIndexes[index];
            return (
              <div 
                key={index} 
                className={`rounded-2xl border transition-all duration-300 ${itemBgClass} ${
                  isOpen ? "shadow-md hover:shadow-lg border-luxury-gold/30" : "hover:scale-[1.005] hover:border-[#1e3a2f]/10"
                }`}
              >
                <button
                  id={`home-faq-trigger-${index}`}
                  onClick={() => toggleIndex(index, item.question)}
                  aria-expanded={isOpen}
                  className={`w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 transition-colors ${itemHeaderClass} font-serif`}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="mt-0.5 shrink-0 text-luxury-gold">
                      <HelpCircle className="w-5 h-5 opacity-90" />
                    </div>
                    <div className="space-y-1">
                      {item.category && (
                        <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold font-sans block">
                          {item.category}
                        </span>
                      )}
                      <span className="font-bold text-sm md:text-base leading-snug tracking-tight">
                        {item.question}
                      </span>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-luxury-black/5 bg-luxury-cream/10 transition-transform duration-300 ${
                    isOpen ? "rotate-180 border-luxury-gold/40 bg-luxury-gold/5" : ""
                  }`}>
                    <ChevronDown className="w-4 h-4 text-luxury-gold" />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className={`px-12 pb-6 pt-1 text-xs md:text-sm leading-relaxed font-light border-t border-luxury-black/5 ${answerClass}`}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic Trust Note */}
        <div className="p-6 rounded-2xl bg-white border border-luxury-black/5 flex flex-col md:flex-row gap-4 items-center justify-between text-center md:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="text-xs text-[#3a4d44] font-light">
              Have specific questions regarding complex transit, customized routes, or flight coordination from India?
            </p>
          </div>
          <a
            href="https://wa.me/94722968210"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("faq_whats_app_cta_click", "conversion", "faq_footer")}
            className="px-5 py-2.5 bg-luxury-green hover:bg-luxury-gold text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all shadow"
          >
            Direct Connect Concierge
          </a>
        </div>
      </div>
    </section>
  );
}
