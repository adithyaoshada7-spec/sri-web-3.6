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
    description: "Book your first family tour with us for FREE and discover local travel tips, hidden places, coastal experiences, and personalized recommendations inspired by the Italian vibe.",
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
    stats: { duration: "3 Hours", exclusivity: "Private", capacity: "Up to 12 Guests" },
    testimonial: {
      quote: "I escaped the city's noise for a cozy cruise over the Colombo seas with my family. I saw the beautiful, evolving skyline at sunset.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  }
];
