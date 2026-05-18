export interface Activity {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  longDescription: string;
  image: string;
  iconName: string;
  features: string[];
  subheading?: string;
  gallery?: string[];
  stats: Record<string, string>;
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
}

export const activities: Activity[] = [
  {
    id: "safari",
    slug: "italian-vibe-tour",
    title: "Italian Vibe Tour In Sri Lanka",
    location: "Colombo Marina",
    description: "Book your first family tour with us for FREE and discover local travel tips, hidden places, coastal experiences, and personalized recommendations inspired by the Italian vibe. And here are some pictures we capture during the tour",
    longDescription: "Unforgettable Italian Vibe Tour where coastal beauty, stylish experiences, music, food, and relaxed luxury come together. Designed for travelers who want more than just a trip, this tour creates moments full of culture, connection, celebration, and unforgettable memories inspired by the charm and energy of the Italian lifestyle.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1",
    iconName: "Wind",
    subheading: "Feel Italian vibe in Sri Lanka",
    features: ["Skyline Views at Sunset", "Artisan Coastal Dining", "Curated Music & Vibe", "Private Family Moments"],
    gallery: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=60", // Luxury Yacht/Boat feel
      "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=800&auto=format&fit=crop&q=60", // Coastal aesthetic
      "https://images.unsplash.com/photo-1520116468419-955a7408cf57?w=800&auto=format&fit=crop&q=60", // Italian-style dining/drinks by sea
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60"  // Joyful group/family moments
    ],
    stats: { duration: "3 Hours", exclusivity: "Private", capacity: "Up to 12 Guests" },
    testimonial: {
      quote: "I escaped the city's noise for a cozy cruise over the Colombo seas with my family. I saw the beautiful, evolving skyline at sunset.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  }
];
