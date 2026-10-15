import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Car,
  Building,
  User,
  Mail,
  Phone,
  Plane,
  Sparkles,
  Printer,
  Download,
  PhoneCall,
  Lock,
  ArrowRight
} from "lucide-react";
import { HotelListing } from "../data/sriLankaHotelsData";
import { saveBookingToDatabase } from "../lib/supabaseClient";
import { DayItineraryItem, CURRENCY_RATES } from "../lib/tripRuleEngine";

interface OnSiteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: DayItineraryItem[];
  selectedHotels: Record<number, HotelListing>;
  totalDays: number;
  totalCost: number;
  currencyCode: string;
}

export default function OnSiteBookingModal({
  isOpen,
  onClose,
  itinerary,
  selectedHotels,
  totalDays,
  totalCost,
  currencyCode
}: OnSiteBookingModalProps) {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const curr = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.LKR;

  const formatPrice = (lkr: number) => {
    const val = lkr / curr.toLkr;
    return curr.format(val);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    setIsSubmitting(true);
    const summary = `${totalDays}-Day Island Tour across ${itinerary.map(i => i.destination).join(" -> ")}`;

    const res = await saveBookingToDatabase({
      guestName,
      guestEmail,
      guestPhone,
      itinerarySummary: summary,
      totalDays,
      selectedHotels,
      totalAmount: totalCost,
      currency: currencyCode
    });

    setIsSubmitting(false);
    if (res.success) {
      setConfirmedBookingId(res.bookingId);
    }
  };

  const getWhatsAppConfirmationUrl = () => {
    const text = `Hi Plan Sri Lanka! I just placed an on-site reservation for my ${totalDays}-day tour on plan-srilanka.com.\n\nBooking ID: ${confirmedBookingId}\nGuest: ${guestName}\nFlight: ${flightNumber || "TBD"}\nTotal: ${formatPrice(totalCost)}`;
    return `https://wa.me/94777123456?text=${encodeURIComponent(text)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8E4D9] overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 bg-[#1F3D2B] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl">
                {confirmedBookingId ? "Reservation Confirmed!" : "Direct On-Site Reservation"}
              </h3>
              <p className="text-xs text-white/70">
                {totalDays} Days Island Tour · Dedicated Chauffeur & Verified Stays
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {confirmedBookingId ? (
          /* SUCCESS SCREEN */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl shadow-inner">
              ✓
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                Booking Reference ID
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#1F3D2B]">
                {confirmedBookingId}
              </div>
              <p className="text-xs text-[#7A7365]">
                Saved into Supabase Database · Confirmation email sent to <strong>{guestEmail}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] text-left text-xs space-y-2">
              <strong className="block font-bold text-sm text-[#1F3D2B]">
                Reserved Trip Summary:
              </strong>
              <div className="flex justify-between py-1 border-b border-[#E8E4D9]/60">
                <span className="text-[#7A7365]">Lead Guest:</span>
                <span className="font-semibold text-[#1A1A1A]">{guestName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8E4D9]/60">
                <span className="text-[#7A7365]">Trip Duration:</span>
                <span className="font-semibold text-[#1A1A1A]">{totalDays} Days / {totalDays - 1} Nights</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8E4D9]/60">
                <span className="text-[#7A7365]">Private Chauffeur:</span>
                <span className="font-semibold text-emerald-800">Dedicated AC Car Included</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#7A7365]">Total Package:</span>
                <span className="font-bold text-sm text-[#1F3D2B]">{formatPrice(totalCost)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getWhatsAppConfirmationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 fill-current" />
                <span>Confirm Driver On WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3.5 bg-white border border-[#E8E4D9] hover:border-[#1F3D2B] text-[#1F3D2B] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Travel Voucher</span>
              </button>
            </div>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Trip Cost Summary Banner */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4D9] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#7A7365] block font-mono text-[10px] uppercase">
                  Calculated Total Package
                </span>
                <span className="text-lg sm:text-xl font-mono font-bold text-[#1F3D2B]">
                  {formatPrice(totalCost)}
                </span>
              </div>
              <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                ✓ 0 Booking Fees
              </span>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#5A5448] uppercase tracking-wider block">
                  Lead Guest Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#7A7365]" />
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. John & Sarah Davies"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E4D9] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#5A5448] uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#7A7365]" />
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="e.g. john@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E4D9] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#5A5448] uppercase tracking-wider block">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#7A7365]" />
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="e.g. +44 7911 123456"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E4D9] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#5A5448] uppercase tracking-wider block">
                    Arrival Flight No (Optional)
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-3.5 top-3 w-4 h-4 text-[#7A7365]" />
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="e.g. UL504 (LHR to CMB)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E4D9] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#5A5448] uppercase tracking-wider block">
                    Special Requests / Room Preferences
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. King bed, sea view, vegetarian"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D9] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1F3D2B]"
                  />
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Direct Reservation: Stored securely in Supabase. Your private chauffeur will be allocated immediately with 0 cancellation fees up to 48 hours before arrival.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-[#1F3D2B] hover:bg-[#142A1D] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Registering Reservation with Supabase...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Confirm Direct On-Site Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
