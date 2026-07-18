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
    id: "vibe-tour",
    slug: "italian-vibe-tour",
    title: "Vibe Tour Sri Lanka",
    location: "Colombo Marina",
    description: "Experience the ultimate coastal getaway just a short flight from India. Your first private family discovery session is FREE. No forms, no hidden costs—just pure premium vibe-inspired luxury in the heart of Sri Lanka.",
    longDescription: "Discover why Sri Lanka is the new favorite getaway for discerning Indian travelers. We bring the sun-drenched elegance of premier coastal living to your doorstep. Our Vibe Tour Sri Lanka is a curated lifestyle experience designed for families who appreciate the finer things. From artisan dining that rivals the world's best coastal retreats to a soundtrack of breezy island ease, we offer an elite escape that feels a world away, yet remains perfectly close to home.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/93/07/ac/family-outing.jpg?w=1200&h=900&s=1",
    iconName: "Wind",
    subheading: "The Island Spirit, Indian Ocean Soul.",
    features: ["Skyline Views at Sunset", "Artisan Coastal Dining", "Curated Music & Vibe", "Private Family Moments"],
    gallery: [
      "https://www.bradtguides.com/wp-content/uploads/2022/10/Eliya-Kandy_train_Sri_Lanka_Melinda_Nagy_Shutterstock.jpg",
      "https://tse1.explicit.bing.net/th/id/OIP.DoDwaNTXcnoo_uLeBxEPFAAAAA?cb=thfc1falcon&pid=ImgDet&w=184&h=244&c=7&dpr=1.3&o=7&rm=3",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/7b/29/24/open-door-sitting.jpg?w=200&h=200&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/44/75/06/plenty-of-plants-and.jpg?w=200&h=200&s=1"
    ],
    stats: { experience: "Elite Luxury", exclusivity: "Family Private", accessibility: "Short-Haul Escape" },
    testimonial: {
      quote: "It felt like we were suddenly in a bespoke coastal paradise, but with the warmth of Sri Lankan hospitality. The music, the food, the vibe—it was the first time our family felt truly 'away' without leaving the island. A masterpiece of relaxed luxury.",
      author: "The Silva Family",
      title: "Premium Vibe in Colombo"
    }
  },
  {
    id: "cruise",
    slug: "crust-ahangama",
    title: "Coastal Sophistication at Crust Ahangama",
    location: "Ahangama Shoreline",
    description: "Experience coastal sophistication at the south coast's premier beachfront destination. Artisanal pizzas, curated cocktails, and sunset views.",
    longDescription: "Experience the coastal sophistication of Crust Ahangama, the south coast's premier beachfront destination. Indulge in artisanal, wood-fired pizzas paired with curated signature cocktails. With its vibrant atmosphere and prime location overlooking the Indian Ocean, it’s the definitive choice for those seeking an elevated evening of gastronomy and sunset views.",
    image: "https://static.goto-where.com/6279-albums-8.jpg",
    iconName: "Compass",
    subheading: "Artisanal Beachfront Gastronomy",
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
    image: "https://cdn-idgij.nitrocdn.com/PYIkwxaiDQkwbmZMkHODMuuEAfVTLOht/assets/images/optimized/rev-412ad82/www.sail-lanka-charter.com/wp-content/uploads/2023/02/IMG_11577a-1024x635.jpg",
    iconName: "Wind",
    subheading: "Private Family Yacht Charter",
    features: ["Skyline Views at Sunset", "Swimming & Paddle Boarding", "Welcome Drinks & Snacks", "Family-Friendly Charter"],
    stats: { duration: "3 Hours", exclusivity: "Private", season: "Year Round" },
    testimonial: {
      quote: "I escaped the city's noise for a cozy cruise over the Colombo seas with my family. I saw the beautiful, evolving skyline at sunset.",
      author: "The Silva Family",
      title: "Island Connoisseurs"
    }
  }
];
