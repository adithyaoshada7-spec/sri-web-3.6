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
    id: "cruise",
    slug: "crust-ahangama",
    title: "Coastal Sophistication at Crust Ahangama",
    location: "Ahangama Shoreline",
    description: "Experience coastal sophistication at the south coast's premier beachfront destination. Artisanal pizzas, curated cocktails, and sunset views.",
    longDescription: "Experience the coastal sophistication of Crust Ahangama, the south coast's premier beachfront destination. Indulge in artisanal, wood-fired pizzas paired with curated signature cocktails. With its vibrant atmosphere and prime location overlooking the Indian Ocean, it’s the definitive choice for those seeking an elevated evening of gastronomy and sunset views.",
    image: "https://static.goto-where.com/6279-albums-8.jpg",
    iconName: "Compass",
    features: ["Artisanal Wood-Fired Pizza", "Signature Cocktails", "Direct Beachfront Access", "Sunset Gastronomy"],
    gallery: [
      "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1510629954389-c1e0da47d4ec?auto=format&fit=crop&q=80&w=600"
    ],
    stats: { duration: "Evening", exclusivity: "Vibrant", season: "Year Round" },
    testimonial: {
      quote: "The best gold-hour spot on the south coast. The cocktail list is as impressive as the view.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  },
  {
    id: "safari",
    slug: "italian-vibe-tour",
    title: "Plan Your Italian Vibe Tour In Sri Lanka",
    location: "Colombo Marina",
    description: "Escape the city for a 3-hour Colombo sailing cruise. Experience stunning skyline views, golden-hour swimming, and paddle boarding.",
    longDescription: "Unforgettable Italian Vibe Tour where coastal beauty, stylish experiences, music, food, and relaxed luxury come together. Designed for travelers who want more than just a trip, this tour creates moments full of culture, connection, celebration, and unforgettable memories inspired by the charm and energy of the Italian lifestyle.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1",
    iconName: "Wind",
    subheading: "Feel Italian vibe in Sri Lanka",
    features: ["Skyline Views at Sunset", "Swimming & Paddle Boarding", "Welcome Drinks & Snacks", "Family-Friendly Charter"],
    gallery: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/55/fe/a0/beautiful-atmosphere.jpg?w=500&h=-1&s=1",
      "https://tse1.mm.bing.net/th/id/OIP.D8NDdYZcaIEfS9pL_G5mdgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://www.holidify.com/images/cmsuploads/compressed/271276120_20220516234537.jpg"
    ],
    stats: { duration: "Customizable", exclusivity: "Private", season: "Year Round" },
    testimonial: {
      quote: "I escaped the city's noise for a cozy cruise over the Colombo seas with my family. I saw the beautiful, evolving skyline at sunset.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  },
];
