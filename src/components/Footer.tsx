import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const exploreLinks = [
  { label: "Cultural Triangle", href: "/#journeys" },
  { label: "Tea Country", href: "/#journeys" },
  { label: "Wildlife Safari", href: "/#journeys" },
  { label: "Coastal Vibe Tour", href: "/#journeys" }
];

const resourceLinks = [
  { label: "Meet the Founder", to: "/about-founder" },
  { label: "Travel Guides & Blog", to: "/blog" },
  { label: "Trip Cost Calculator", to: "/sri-lanka-trip-cost-from-india" },
  { label: "Visa & ETA Guide", to: "/sri-lanka-visa-for-indians" },
  { label: "7-Day Itinerary", to: "/sri-lanka-7-day-itinerary" }
];

export const Footer = () => (
  <footer className="bg-luxury-black text-white/50 pt-14 md:pt-22 px-6 md:px-14 pb-10">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-14">
        <div className="sm:col-span-2">
          <Link to="/" className="inline-block font-serif font-semibold text-lg tracking-[0.14em] text-white mb-4">
            PLAN SRI LANKA
          </Link>
          <p className="max-w-xs text-[13px] leading-relaxed m-0">
            A private travel concierge for the island, built for families and couples travelling from Australia and India.
          </p>
        </div>
        <div>
          <h5 className="text-white uppercase tracking-[0.2em] text-[10px] font-bold mb-4">Contact</h5>
          <p className="text-[13px] mb-2.5">Colombo 07, Sri Lanka</p>
          <p className="text-[13px] mb-2.5">+94 72 296 8210</p>
          <p className="text-[13px] m-0">concierge@plansrilanka.com</p>
        </div>
        <div>
          <h5 className="text-white uppercase tracking-[0.2em] text-[10px] font-bold mb-4">Explore</h5>
          <div className="flex flex-col gap-2.5 text-[13px] mb-6">
            {exploreLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-luxury-gold transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <h5 className="text-white uppercase tracking-[0.2em] text-[10px] font-bold mb-4">Resources</h5>
          <div className="flex flex-col gap-2.5 text-[13px]">
            {resourceLinks.map((l) => (
              <Link key={l.label} to={l.to} className="hover:text-luxury-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pb-10">
        <h5 className="sr-only">Social</h5>
        <a href="#" aria-label="Instagram" className="w-8.5 h-8.5 border border-white/20 rounded-full flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-colors">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="#" aria-label="Facebook" className="w-8.5 h-8.5 border border-white/20 rounded-full flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-colors">
          <Facebook className="w-4 h-4" />
        </a>
      </div>

      <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.1em]">
        <span>© 2026 Plan Sri Lanka. All Rights Reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
