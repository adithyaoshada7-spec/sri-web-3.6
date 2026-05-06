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
    stats: { duration: "Evening", exclusivity: "Vibrant", season: "Year Round" },
    testimonial: {
      quote: "The best gold-hour spot on the south coast. The cocktail list is as impressive as the view.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  },
  {
    id: "safari",
    slug: "colombo-sailing-cruise",
    title: "Family Sailing Cruise: Colombo Skyline",
    location: "Colombo Marina",
    description: "Escape the city for a 3-hour Colombo sailing cruise. Experience stunning skyline views, golden-hour swimming, and paddle boarding.",
    longDescription: "Escape the city for a 3-hour Colombo sailing cruise. Depart from the Marina at 4:00 PM to enjoy stunning skyline views, welcome drinks, and snacks. Dive into the sea for a swim or try stand-up paddle boarding at the Port City beach before returning at 7:00 PM. Perfect for families!",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1",
    iconName: "Wind",
    features: ["Skyline Views at Sunset", "Swimming & Paddle Boarding", "Welcome Drinks & Snacks", "Family-Friendly Charter"],
    stats: { duration: "3 Hours", exclusivity: "Private", season: "Year Round" },
    testimonial: {
      quote: "I escaped the city's noise for a cozy cruise over the Colombo seas with my family. I saw the beautiful, evolving skyline at sunset.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  },
];
