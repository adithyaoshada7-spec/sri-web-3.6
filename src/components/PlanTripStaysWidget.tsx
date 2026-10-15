import React, { useState, useEffect } from "react";
import { Star, Info, Check, Sparkles, Building, Home, ExternalLink } from "lucide-react";
import { HotelListing } from "../data/sriLankaHotelsData";
import { fetchHotels } from "../lib/supabaseClient";
import { CURRENCY_RATES } from "../lib/tripRuleEngine";

interface PlanTripStaysWidgetProps {
  dayNumber: number;
  destination: string;
  nightsCount?: number;
  currencyCode?: string;
  selectedHotelId?: string;
  onSelectHotel: (hotel: HotelListing) => void;
}

export default function PlanTripStaysWidget({
  dayNumber,
  destination,
  nightsCount = 1,
  currencyCode = "LKR",
  selectedHotelId,
  onSelectHotel
}: PlanTripStaysWidgetProps) {
  const [stayType, setStayType] = useState<"hotel" | "rental">("hotel");
  const [hotels, setHotels] = useState<HotelListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const curr = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.LKR;

  // Format price to user currency
  const formatPrice = (priceLkr: number) => {
    const val = priceLkr / curr.toLkr;
    return curr.format(val);
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchHotels(destination, stayType)
      .then((data) => {
        if (isMounted) {
          setHotels(data);
          setIsLoading(false);
          // If no hotel currently selected for this day, pre-select the first one
          if (!selectedHotelId && data.length > 0) {
            onSelectHotel(data[0]);
          }
        }
      })
      .catch((err) => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [destination, stayType]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center text-amber-400 gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < fullStars ? "fill-amber-400 text-amber-400" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full rounded-2xl bg-[#1b2028] text-white p-4 sm:p-5 border border-white/10 shadow-xl space-y-4">
      {/* Top Header matching Google Stays reference */}
      <div className="text-center relative pb-1">
        <h4 className="text-base sm:text-lg font-bold tracking-tight">Stays</h4>
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-0.5">
          <span>
            Day {dayNumber} · {destination} · {nightsCount} {nightsCount === 1 ? "night" : "nights"}
          </span>
          <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>

      {/* Segmented Pill Tab Toggle [Hotels] [Vacation rentals] */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-[#12161c] border border-white/5">
        <button
          type="button"
          onClick={() => setStayType("hotel")}
          className={`py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            stayType === "hotel"
              ? "bg-[#283547] text-white font-bold shadow-sm"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Hotels</span>
        </button>

        <button
          type="button"
          onClick={() => setStayType("rental")}
          className={`py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            stayType === "rental"
              ? "bg-[#283547] text-white font-bold shadow-sm"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Vacation rentals</span>
        </button>
      </div>

      {/* Hotels List */}
      <div className="space-y-3 pt-1">
        {isLoading ? (
          <div className="py-8 text-center text-xs text-gray-400 animate-pulse">
            Loading verified stays from Supabase...
          </div>
        ) : (
          hotels.map((hotel) => {
            const isSelected = selectedHotelId === hotel.id;
            return (
              <div
                key={hotel.id}
                onClick={() => onSelectHotel(hotel)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                  isSelected
                    ? "bg-[#253245] border-[#D4AF37] ring-1 ring-[#D4AF37]/50"
                    : "bg-[#161a22] border-white/5 hover:border-white/20 hover:bg-[#1a202a]"
                }`}
              >
                {/* Left: Thumbnail photo */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-gray-800">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-[9px] font-bold shadow">
                      ✓
                    </div>
                  )}
                </div>

                {/* Middle: Name + Room Type + Stars */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="text-xs sm:text-sm font-bold text-white truncate leading-tight group-hover:text-[#D4AF37] transition-colors">
                    {hotel.name}
                  </div>
                  <div className="text-[11px] text-gray-300 truncate">
                    {hotel.roomType}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <span className="font-bold text-white">{hotel.rating.toFixed(1)}</span>
                    {renderStars(hotel.rating)}
                    <span className="text-[10px]">({hotel.reviewCount})</span>
                  </div>
                </div>

                {/* Right: Price per night */}
                <div className="shrink-0 text-right">
                  <div className="text-xs sm:text-sm font-bold font-mono text-white whitespace-nowrap">
                    {formatPrice(hotel.pricePerNightLkr)}
                  </div>
                  <div className="text-[10px] text-gray-400">per night</div>
                  <button
                    type="button"
                    className={`mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      isSelected
                        ? "bg-[#D4AF37] text-black"
                        : "bg-white/10 text-gray-300 group-hover:bg-white/20"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => {
            if (hotels.length > 0) onSelectHotel(hotels[0]);
          }}
          className="w-full py-2.5 rounded-full border border-white/20 hover:border-white/40 bg-[#12161c] hover:bg-[#1a202a] text-xs font-semibold text-gray-200 transition-all text-center cursor-pointer"
        >
          View all verified {destination} stays
        </button>
      </div>
    </div>
  );
}
