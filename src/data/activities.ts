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
  }
];
