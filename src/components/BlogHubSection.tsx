import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, DollarSign, Globe, Users, ShieldCheck } from "lucide-react";
import { seoArticles, Seometa } from "../data/seoArticles";
import { trackEvent } from "../lib/analytics";

// Custom categories and tags for a high-end editorial feel
const getArticleMeta = (path: string) => {
  switch (path) {
    case "/sri-lanka-trip-cost-from-india":
      return {
        category: "Financial Planning",
        tag: "Budget & Costs",
        icon: <DollarSign className="w-3.5 h-3.5 text-[#d4af37]" />,
        readTime: "6 Min Read",
        badge: "Calculator"
      };
    case "/sri-lanka-7-day-itinerary":
      return {
        category: "Classic Routes",
        tag: "7-Day Tour",
        icon: <Globe className="w-3.5 h-3.5 text-[#d4af37]" />,
        readTime: "8 Min Read",
        badge: "Highly Popular"
      };
    case "/sri-lanka-visa-for-indians":
      return {
        category: "Essential Entry",
        tag: "Visa & ETA",
        icon: <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />,
        readTime: "4 Min Read",
        badge: "Fast Approval"
      };
    case "/best-time-to-visit-sri-lanka":
      return {
        category: "Seasonal Guide",
        tag: "Monsoon Cycles",
        icon: <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />,
        readTime: "5 Min Read",
        badge: "Weather Match"
      };
    case "/sri-lanka-family-itinerary":
      return {
        category: "Stress-Free Family",
        tag: "12-Day Kids Route",
        icon: <Users className="w-3.5 h-3.5 text-[#d4af37]" />,
        readTime: "12 Min Read",
        badge: "Gold Standard"
      };
    default:
      return {
        category: "Travel Guide",
        tag: "Expert Insight",
        icon: <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />,
        readTime: "5 Min Read",
        badge: "Curated"
      };
  }
};

export const BlogHubSection: React.FC = () => {
  return (
    <section id="guides-hub" className="py-24 md:py-32 px-4 md:px-8 bg-[#fcfbf7] border-t border-b border-[#1e3a2f]/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">
              Bespoke Intel Desk
            </span>
            <h2 className="text-3xl md:text-6xl font-serif text-[#1e3a2f] leading-tight">
              Curated Travel Knowledge
            </h2>
            <p className="text-sm md:text-base text-[#3a4d44] font-light leading-relaxed">
              Before lifting a suitcase, explore our extensive local blueprints. We wrote these guides to solve common transit fatigue, weather confusion, and high budget leaks for Indian families.
            </p>
          </div>
          <div className="shrink-0">
            <span className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-[#3a4d44]/60 uppercase tracking-widest bg-[#1e3a2f]/5 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" /> 5 Master Blueprints Available
            </span>
          </div>
        </div>

        {/* Bento / Beautiful Grid of 5 Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {seoArticles.map((article: Seometa, idx: number) => {
            const meta = getArticleMeta(article.path);
            const isFeatured = idx === 4; // Highlight the 12-Day family itinerary nicely if it's the last one

            return (
              <Link
                key={article.path}
                to={article.path}
                onClick={() => trackEvent("blog_hub_card_click", "engagement", article.path)}
                className={`group flex flex-col justify-between bg-white rounded-[28px] border border-[#1e3a2f]/5 hover:border-[#d4af37] hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  isFeatured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Image Header with Badge and Zoom */}
                  <div className="relative h-56 md:h-64 overflow-hidden bg-neutral-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Floating pill tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 text-[9px] uppercase tracking-wider font-bold bg-[#1e3a2f] text-white rounded-full">
                        {meta.tag}
                      </span>
                      <span className="px-3 py-1 text-[9px] uppercase tracking-wider font-bold bg-[#d4af37] text-white rounded-full">
                        {meta.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span className="flex items-center gap-1">
                        {meta.icon}
                        {meta.category}
                      </span>
                      <span>{meta.readTime}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg md:text-xl text-[#1e3a2f] group-hover:text-[#d4af37] transition-colors leading-snug">
                      {article.title.replace(/\s\|\s.*$/, "")} {/* Keep the title beautiful and clean */}
                    </h3>

                    <p className="text-xs text-[#3a4d44]/80 font-light leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 md:px-8 pb-8 pt-2">
                  <div className="flex items-center justify-between pt-4 border-t border-[#1e3a2f]/5 group-hover:border-[#d4af37]/30 transition-colors">
                    <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#1e3a2f]/60 group-hover:text-[#d4af37] transition-colors">
                      Unlock Blueprint
                    </span>
                    <div className="w-8 h-8 rounded-full border border-neutral-200 group-hover:border-[#d4af37] group-hover:bg-[#1e3a2f] group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 text-[#1e3a2f] group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Help Callout for Mobile Connections */}
        <div className="bg-[#1e3a2f] text-white rounded-[32px] p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4af37] font-bold block">
              Direct Concierge Support
            </span>
            <h4 className="font-serif text-xl md:text-2xl font-bold">
              Want a fully customized route for your team?
            </h4>
            <p className="text-xs text-white/70 font-light max-w-xl">
              Skip researching dozens of blogs. Connect directly with our Colombo or London concierge desks to stitch together routes, hotels, driver bookings, and activities instantly.
            </p>
          </div>
          <a
            href="https://wa.me/94722968210"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", "engagement", "blog_hub_cta")}
            className="w-full md:w-auto text-center px-8 py-4 bg-[#d4af37] hover:bg-white hover:text-black text-black rounded-full font-bold uppercase tracking-widest text-xs shadow-lg transition-all"
          >
            Chat with Concierge
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogHubSection;
