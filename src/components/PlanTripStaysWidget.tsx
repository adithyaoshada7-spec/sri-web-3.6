import React, { useState, useEffect } from "react";
import { Star, Info, Check, Sparkles, Building, Home, ExternalLink } from "lucide-react";
import { HotelListing, getHotelsForDestination } from "../data/sriLankaHotelsData";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { CURRENCY_RATES } from "../lib/tripRuleEngine";

interface PlanTripStaysWidgetProps {
  dayNumber: number;
  destination: string;
  nightsCount?: number;
  currencyCode?: string;
  selectedHotelId?: string;
  initialStayType?: "hotel" | "rental";
  onSelectHotel: (hotel: HotelListing) => void;
}

export default function PlanTripStaysWidget({
  dayNumber,
  destination,
  nightsCount = 1,
  currencyCode = "LKR",
  selectedHotelId,
  initialStayType = "hotel",
  onSelectHotel
}: PlanTripStaysWidgetProps) {
  const [stayType, setStayType] = useState<"hotel" | "rental">(initialStayType);
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

    async function loadHotels() {
      // 1. Sanitize destination to lowercase and trim
      const cleanDestination = (destination || "").toLowerCase().trim();
      const fallbackData = getHotelsForDestination(destination);

      let data: any[] | null = null;
      let error: any = null;

      // 2. Query Supabase if client is initialized
      if (supabase) {
        const res = await supabase
          .from("hotels")
          .select("*")
          .eq("destination_id", cleanDestination);

        data = res.data;
        error = res.error;

        if (error) {
          console.error("Error fetching Supabase hotels:", error);
        }

        // If 0 records returned and destination had multi-word text (e.g. "sigiriya / habarana" or "negombo beachfront"),
        // also check primary hub token to match user database entries like 'sigiriya' or 'negombo'
        if (!error && (!data || data.length === 0)) {
          const primaryToken = cleanDestination.split(/[\s/&-]+/)[0];
          if (primaryToken && primaryToken !== cleanDestination) {
            const tokenRes = await supabase
              .from("hotels")
              .select("*")
              .eq("destination_id", primaryToken);

            if (tokenRes.error) {
              console.error("Error fetching Supabase hotels by token:", tokenRes.error);
            } else if (tokenRes.data && tokenRes.data.length > 0) {
              data = tokenRes.data;
            }
          }
        }
      }

      // 3. Only trigger fallback data if !data || data.length === 0
      if (!data || data.length === 0) {
        if (!isMounted) return;
        const filteredFallback = stayType
          ? fallbackData.filter((h) => h.stayType === stayType)
          : fallbackData;
        const resultFallback = filteredFallback.length > 0 ? filteredFallback : fallbackData;
        setHotels(resultFallback);
        setIsLoading(false);
        if (!selectedHotelId && resultFallback.length > 0) {
          onSelectHotel(resultFallback[0]);
        }
        return;
      }

      // 4. Map live database partner records
      const liveHotels: HotelListing[] = data.map((item: any) => ({
        id: String(item.id),
        destinationId: item.destination_id || cleanDestination,
        name: item.name,
        roomType: item.room_type || "Deluxe Double Room",
        stayType: (item.stay_type === "rental" ? "rental" : "hotel") as "hotel" | "rental",
        rating: Number(item.rating) || 4.5,
        reviewCount: Number(item.review_count) || 25,
        imageUrl: item.image_url || fallbackData[0]?.imageUrl || "",
        pricePerNightLkr: Number(item.price_per_night_lkr) || 20000,
        amenities: Array.isArray(item.amenities) ? item.amenities : ["AC", "Breakfast", "WiFi"]
      }));

      if (!isMounted) return;

      const filteredLive = stayType
        ? liveHotels.filter((h) => h.stayType === stayType)
        : liveHotels;
      const finalHotels = filteredLive.length > 0 ? filteredLive : liveHotels;

      setHotels(finalHotels);
      setIsLoading(false);
      if (!selectedHotelId && finalHotels.length > 0) {
        onSelectHotel(finalHotels[0]);
      }
    }

    loadHotels();

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
            Loading partner stays from Supabase...
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
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-white truncate leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {hotel.name}
                    </span>
                    {isSelected && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 shrink-0">
                        🤖 AI Match
                      </span>
                    )}
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
