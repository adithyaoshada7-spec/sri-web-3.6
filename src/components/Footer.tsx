import { Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => (
  <footer className="bg-luxury-black text-white/40 py-16 md:py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 md:mb-20 text-sm">
        <div className="col-span-1 md:col-span-2">
          <div className="text-xl font-serif tracking-[0.2em] font-bold text-white mb-6 md:mb-8">PLAN SRI LANKA</div>
          <p className="max-w-xs leading-relaxed text-xs md:text-sm">
            The ultimate travel concierge for the Indian Ocean. Dedicated to preservation, luxury, and the art of travel.
          </p>
        </div>
        <div>
          <h5 className="text-white uppercase tracking-widest text-[10px] md:text-[11px] font-bold mb-4 md:mb-6">Contact</h5>
          <p className="mb-2 text-xs md:text-sm">Mayfair, London W1K</p>
          <p className="mb-2 text-xs md:text-sm">Colombo 07, Sri Lanka</p>
          <p className="text-xs md:text-sm">concierge@plansrilanka.com</p>
        </div>
        <div>
          <h5 className="text-white uppercase tracking-widest text-[10px] md:text-[11px] font-bold mb-4 md:mb-6">Social</h5>
          <div className="flex gap-6 md:gap-4">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 md:pt-10 text-[9px] md:text-[10px] uppercase tracking-widest text-center md:text-left gap-4">
        <p>© 2026 Plan Sri Lanka. All Rights Reserved.</p>
        <div className="flex gap-6 md:gap-8 bg-transparent">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
