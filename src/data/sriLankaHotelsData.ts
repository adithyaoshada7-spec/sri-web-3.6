export interface HotelListing {
  id: string;
  destinationId: string; // e.g. "negombo", "sigiriya", "kandy", "nuwara_eliya", "ella", "yala", "mirissa", "galle", "colombo"
  name: string;
  roomType: string;
  stayType: "hotel" | "rental"; // Hotels or Vacation rentals
  rating: number;
  reviewCount: number;
  imageUrl: string;
  pricePerNightLkr: number;
  amenities: string[];
}

export const INITIAL_HOTELS_DATA: HotelListing[] = [
  // --- NEGOMBO ---
  {
    id: "negombo-heritance",
    destinationId: "negombo",
    name: "Heritance Negombo",
    roomType: "Deluxe Sea Facing Double Room",
    stayType: "hotel",
    rating: 4.6,
    reviewCount: 342,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 22500,
    amenities: ["Oceanfront", "Pool", "Breakfast Included", "Free WiFi"]
  },
  {
    id: "negombo-lagoon-villa",
    destinationId: "negombo",
    name: "Lagoon Paradise Heritage Villa",
    roomType: "One-Bedroom Private Garden Suite",
    stayType: "rental",
    rating: 4.8,
    reviewCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 14500,
    amenities: ["Lagoon View", "Kitchenette", "Garden Patio", "AC"]
  },
  {
    id: "negombo-azure",
    destinationId: "negombo",
    name: "Azure Lagoon Stay",
    roomType: "Economy Double Room",
    stayType: "hotel",
    rating: 4.2,
    reviewCount: 47,
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 9800,
    amenities: ["Free Airport Shuttle", "AC", "Breakfast"]
  },

  // --- SIGIRIYA ---
  {
    id: "sigiriya-aliya",
    destinationId: "sigiriya",
    name: "Aliya Resort & Spa",
    roomType: "Deluxe Chalet - Rock View",
    stayType: "hotel",
    rating: 4.7,
    reviewCount: 512,
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 24000,
    amenities: ["Infinity Pool", "Lion Rock View", "Spa", "Breakfast"]
  },
  {
    id: "sigiriya-water-garden",
    destinationId: "sigiriya",
    name: "Sigiriya Water Garden Sanctuary",
    roomType: "Luxury Water Villa with Plunge Pool",
    stayType: "rental",
    rating: 4.9,
    reviewCount: 164,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 38000,
    amenities: ["Private Pool", "Paddy View", "Chef on Demand"]
  },
  {
    id: "sigiriya-village-eco",
    destinationId: "sigiriya",
    name: "Sigiriya Heritage Eco Cottage",
    roomType: "Standard Queen Treehouse",
    stayType: "rental",
    rating: 4.4,
    reviewCount: 92,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 11500,
    amenities: ["Nature Trail", "Local Breakfast", "Free Bikes"]
  },

  // --- KANDY ---
  {
    id: "kandy-cinnamon-citadel",
    destinationId: "kandy",
    name: "Cinnamon Citadel Kandy",
    roomType: "Superior River View King Room",
    stayType: "hotel",
    rating: 4.5,
    reviewCount: 420,
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 21000,
    amenities: ["Mahaweli River View", "Swimming Pool", "Breakfast"]
  },
  {
    id: "kandy-hillcrest-villa",
    destinationId: "kandy",
    name: "Kandy Cloud Valley Residence",
    roomType: "Two-Bedroom Mountain Apartment",
    stayType: "rental",
    rating: 4.7,
    reviewCount: 76,
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 16500,
    amenities: ["Kitchen", "Panoramic Balcony", "High-speed WiFi"]
  },

  // --- NUWARA ELIYA ---
  {
    id: "nuwara-grand-hotel",
    destinationId: "nuwara_eliya",
    name: "The Grand Hotel Nuwara Eliya",
    roomType: "Colonial Heritage Deluxe Room",
    stayType: "hotel",
    rating: 4.8,
    reviewCount: 610,
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 26000,
    amenities: ["Colonial Fireplace", "High Tea Lounge", "Heated Pool"]
  },
  {
    id: "nuwara-tea-chalet",
    destinationId: "nuwara_eliya",
    name: "Single-Tree Tea Bungalow",
    roomType: "Private Plantation Pine Cottage",
    stayType: "rental",
    rating: 4.6,
    reviewCount: 58,
    imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 15500,
    amenities: ["Tea Estate Walks", "Fireplace", "Breakfast"]
  },

  // --- ELLA ---
  {
    id: "ella-98-acres",
    destinationId: "ella",
    name: "98 Acres Resort & Spa",
    roomType: "Premium Eco Chalet with Ella Gap View",
    stayType: "hotel",
    rating: 4.9,
    reviewCount: 720,
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 32000,
    amenities: ["Ella Gap View", "Helipad", "Pool", "Spa"]
  },
  {
    id: "ella-gap-homestay",
    destinationId: "ella",
    name: "Ella Cloud Nine Loft",
    roomType: "One-Bedroom Mountain Terrace Flat",
    stayType: "rental",
    rating: 4.5,
    reviewCount: 114,
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 12500,
    amenities: ["Bridge View", "Hammock", "Free Coffee"]
  },

  // --- YALA ---
  {
    id: "yala-cinnamon-wild",
    destinationId: "yala",
    name: "Cinnamon Wild Yala",
    roomType: "Jungle Chalet on Elephant Corridor",
    stayType: "hotel",
    rating: 4.7,
    reviewCount: 388,
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 27500,
    amenities: ["Park Border", "Observation Deck", "Safari Jeep Station"]
  },

  // --- MIRISSA / WELIGAMA ---
  {
    id: "mirissa-mandara",
    destinationId: "mirissa",
    name: "Mandara Resort Mirissa",
    roomType: "Deluxe Sea Facing Suite with Balcony",
    stayType: "hotel",
    rating: 4.6,
    reviewCount: 295,
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 23500,
    amenities: ["Direct Beach Access", "Swimming Pool", "Seafood Dining"]
  },
  {
    id: "mirissa-surf-loft",
    destinationId: "mirissa",
    name: "Weligama Bay Surf Haven",
    roomType: "Two-Bedroom Beachfront Apartment",
    stayType: "rental",
    rating: 4.8,
    reviewCount: 82,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 17000,
    amenities: ["Surfboard Storage", "Full Kitchen", "Sunset Deck"]
  },

  // --- GALLE ---
  {
    id: "galle-jetwing-lighthouse",
    destinationId: "galle",
    name: "Jetwing Lighthouse Galle",
    roomType: "Ocean Suite - Bawa Architecture",
    stayType: "hotel",
    rating: 4.8,
    reviewCount: 650,
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 28000,
    amenities: ["Historic Ramparts View", "2 Pools", "Fine Dining"]
  },
  {
    id: "galle-fort-merchant-villa",
    destinationId: "galle",
    name: "Dutch Merchant Heritage House",
    roomType: "Cobblestone Courtyard Suite",
    stayType: "rental",
    rating: 4.7,
    reviewCount: 104,
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 19500,
    amenities: ["Inside UNESCO Fort", "Antique Four-Poster Bed", "Private Butler"]
  },

  // --- COLOMBO ---
  {
    id: "colombo-galle-face-hotel",
    destinationId: "colombo",
    name: "Galle Face Hotel",
    roomType: "Heritage Sea Facing Room",
    stayType: "hotel",
    rating: 4.7,
    reviewCount: 890,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=300&h=300",
    pricePerNightLkr: 25000,
    amenities: ["Ocean Boardwalk", "Saltwater Pool", "Museum", "High Tea"]
  }
];

export function getHotelsForDestination(destination: string): HotelListing[] {
  const d = destination.toLowerCase();
  let key = "negombo";
  if (d.includes("sigiriya") || d.includes("dambulla") || d.includes("triangle")) key = "sigiriya";
  else if (d.includes("kandy")) key = "kandy";
  else if (d.includes("nuwara eliya") || d.includes("little england")) key = "nuwara_eliya";
  else if (d.includes("ella")) key = "ella";
  else if (d.includes("yala")) key = "yala";
  else if (d.includes("mirissa") || d.includes("weligama")) key = "mirissa";
  else if (d.includes("galle")) key = "galle";
  else if (d.includes("colombo")) key = "colombo";

  const matches = INITIAL_HOTELS_DATA.filter((h) => h.destinationId === key);
  return matches.length > 0 ? matches : INITIAL_HOTELS_DATA.slice(0, 3);
}
