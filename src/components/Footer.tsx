import type { ReactNode } from "react";
import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const exploreLinks = [
  { label: "Cultural Triangle", href: "/#journeys" },
  { label: "Tea Country", href: "/#journeys" },
  { label: "Wildlife Safari", href: "/#journeys" },
  { label: "Coastal Vibe Tour", href: "/#journeys" }
];

const planLinks = [
  { label: "Sri Lanka Trip Planner", to: "/sri-lanka-trip-planner" },
  { label: "Sri Lanka 7-Day Itinerary", to: "/sri-lanka-7-day-itinerary" },
  { label: "Sri Lanka 10-Day Itinerary", to: "/sri-lanka-10-day-itinerary" },
  { label: "Visa & ETA Guide", to: "/sri-lanka-visa-for-indians" }
];

const costLinks = [
  { label: "Trip Cost From India", to: "/sri-lanka-trip-cost-from-india" },
  { label: "Trip Cost From Bangalore", to: "/sri-lanka-trip-cost-from-bangalore" },
  { label: "Trip Cost From Chennai", to: "/how-much-will-it-take-to-visit-sri-lanka-from-chennai" },
  { label: "Trip Cost From Mumbai", to: "/sri-lanka-trip-cost-from-mumbai" },
  { label: "Trip Cost From Hyderabad", to: "/sri-lanka-trip-cost-from-hyderabad" }
];

const resourceLinks = [
  { label: "Meet the Founder", to: "/about-founder" },
  { label: "Travel Guides & Blog", to: "/blog" },
  { label: "Things to Do in Sri Lanka", to: "/things-to-do-in-sri-lanka" },
  { label: "Sri Lanka Car Rental", to: "/sri-lanka-car-rental" }
];

const FooterLinkColumn = ({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) => (
  <div>
    <h5 className="text-white uppercase tracking-[0.2em] text-[10px] font-bold mb-4">{title}</h5>
    <div className="flex flex-col gap-2.5 text-[13px]">{children}</div>
  </div>
);

export const Footer = () => (
  <footer className="bg-luxury-black text-white/50 pt-14 md:pt-22 px-6 md:px-14 pb-10">
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-12">
        <Link to="/" className="inline-block font-serif font-semibold text-lg tracking-[0.14em] text-white mb-4">
          PLAN SRI LANKA
        </Link>
        <p className="max-w-md text-[13px] leading-relaxed m-0">
          A private travel concierge for the island, built for families and couples travelling from Australia and India.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mb-14">
        <FooterLinkColumn title="Contact">
          <p className="text-[13px] mb-0">Colombo 07, Sri Lanka</p>
          <p className="text-[13px] mb-0">+94 72 296 8210</p>
          <p className="text-[13px] m-0">concierge@plansrilanka.com</p>
        </FooterLinkColumn>

        <FooterLinkColumn title="Plan Your Trip">
          {planLinks.map((l) => (
            <Link key={l.label} to={l.to} className="hover:text-luxury-gold transition-colors">
              {l.label}
            </Link>
          ))}
        </FooterLinkColumn>

        <FooterLinkColumn title="Trip Cost By City">
          {costLinks.map((l) => (
            <Link key={l.label} to={l.to} className="hover:text-luxury-gold transition-colors">
              {l.label}
            </Link>
          ))}
        </FooterLinkColumn>

        <FooterLinkColumn title="Explore">
          {exploreLinks.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-luxury-gold transition-colors">
              {l.label}
            </a>
          ))}
        </FooterLinkColumn>

        <FooterLinkColumn title="Resources">
          {resourceLinks.map((l) => (
            <Link key={l.label} to={l.to} className="hover:text-luxury-gold transition-colors">
              {l.label}
            </Link>
          ))}
        </FooterLinkColumn>
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
