import { motion } from "motion/react";
import { ArrowRight, Menu, X, MessageCircle } from "lucide-react";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, Link, Routes, Route, useLocation } from "react-router-dom";
import { usePageMetadata } from "./hooks/usePageMetadata";
import { trackEvent } from "./lib/analytics";

const HomeMetadata = () => {
  usePageMetadata({
    title: "Plan Sri Lanka | Curated Luxury Travel & Bespoke Vibe Tours",
    description: "An exclusive travel concierge for high-net-worth individuals and families seeking extraordinary, tailored journeys across the majestic landscapes of Sri Lanka.",
    canonicalUrl: "https://plan-srilanka.com/",
    ogUrl: "https://plan-srilanka.com/"
  });
  return null;
};

const ExperienceDetail = lazy(() => import("./components/ExperienceDetail"));
const SrilankaCostPage = lazy(() => import("./components/SrilankaCostPage"));
const SrilankaItineraryPage = lazy(() => import("./components/SrilankaItineraryPage"));
const SrilankaTenDayItineraryPage = lazy(() => import("./components/SrilankaTenDayItineraryPage"));
const SrilankaVisaPage = lazy(() => import("./components/SrilankaVisaPage"));
const SrilankaBestTimePage = lazy(() => import("./components/SrilankaBestTimePage"));
const SrilankaFamilyPage = lazy(() => import("./components/SrilankaFamilyPage"));
const SrilankaJunePage = lazy(() => import("./components/SrilankaJunePage"));
const SrilankaTripPlannerPage = lazy(() => import("./components/SrilankaTripPlannerPage"));
const SrilankaTrainTripPlannerPage = lazy(() => import("./components/SrilankaTrainTripPlannerPage"));
const SrilankaTrainTripGuidePage = lazy(() => import("./components/SrilankaTrainTripGuidePage"));
const SrilankaTripPlannerPillarPage = lazy(() => import("./components/SrilankaTripPlannerPillarPage"));
const SrilankaChennaiCostPillarPage = lazy(() => import("./components/SrilankaChennaiCostPillarPage"));
const SrilankaBangaloreCostPillarPage = lazy(() => import("./components/SrilankaBangaloreCostPillarPage"));
const SrilankaMumbaiCostPillarPage = lazy(() => import("./components/SrilankaMumbaiCostPillarPage"));
const SrilankaHyderabadCostPillarPage = lazy(() => import("./components/SrilankaHyderabadCostPillarPage"));
const SrilankaAugustCouplesPage = lazy(() => import("./components/SrilankaAugustCouplesPage"));
const SrilankaAmericanGuidePage = lazy(() => import("./components/SrilankaAmericanGuidePage"));
const HomePage = lazy(() => import("./components/HomePage"));
const Footer = lazy(() => import("./components/Footer"));
const BlogIndexPage = lazy(() => import("./components/BlogIndexPage"));
const SrilankaExperiencesPage = lazy(() => import("./components/SrilankaExperiencesPage"));
const SrilankaFirstTimeThingsToDoPage = lazy(() => import("./components/SrilankaFirstTimeThingsToDoPage"));
const SrilankaAboutFounderPage = lazy(() => import("./components/SrilankaAboutFounderPage"));
const SrilankaFlightsPage = lazy(() => import("./components/SrilankaFlightsPage"));
const SrilankaFlightsGuidePage = lazy(() => import("./components/SrilankaFlightsGuidePage"));
const SrilankaFlightSearchToolBlogPage = lazy(() => import("./components/SrilankaFlightSearchToolBlogPage"));
const SrilankaHowToUsePlannerPage = lazy(() => import("./components/SrilankaHowToUsePlannerPage"));
const SrilankaPrivateDriverSouthPage = lazy(() => import("./components/SrilankaPrivateDriverSouthPage"));
const SrilankaChennaiItineraryPage = lazy(() => import("./components/SrilankaChennaiItineraryPage"));
const SrilankaWhyIndianTravellersPage = lazy(() => import("./components/SrilankaWhyIndianTravellersPage"));
const SrilankaCarRentalPage = lazy(() => import("./components/SrilankaCarRentalPage"));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen selection:bg-luxury-gold/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between gap-6 px-5 md:px-14 py-5 bg-luxury-black/55 backdrop-blur-md flex-wrap">
        <Link
          to="/"
          className="font-serif font-semibold text-lg tracking-[0.14em] text-white"
        >
          PLAN SRI LANKA
        </Link>

        <div className="flex items-center gap-6 md:gap-7">
          <div className="hidden md:flex items-center gap-7 text-[12px] tracking-[0.12em] uppercase text-white/85">
            <button onClick={() => scrollToSection("journeys")} className="hover:text-luxury-gold transition-colors">Journeys</button>
            <button onClick={() => scrollToSection("plan")} className="hover:text-luxury-gold transition-colors">Plan Your Trip</button>
            <button onClick={() => scrollToSection("founder")} className="hover:text-luxury-gold transition-colors">Founder</button>
            <a
              href="https://wa.me/94722968210"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_click', 'engagement', 'header_book_now');
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'Lead');
                }
              }}
              className="px-[22px] py-[11px] bg-luxury-gold text-luxury-black rounded-full font-semibold tracking-[0.14em] hover:bg-white transition-colors text-[11px]"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-4">
            {location.pathname.startsWith('/experience/') && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/')}
                className="group flex items-center"
                title="Back to Home"
              >
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-luxury-gold transition-colors bg-black/20 backdrop-blur-sm">
                  <ArrowRight className="w-5 h-5 rotate-180 text-white" />
                </div>
              </motion.button>
            )}

            <button
              className="p-2 text-white hover:text-luxury-gold transition-colors bg-black/20 backdrop-blur-sm rounded-full md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <>
              <HomeMetadata />
              
              {/* WEBSITE SCHEMA FOR RICH SNIPPETS */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Plan Sri Lanka",
                  "url": "https://plan-srilanka.com/",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://plan-srilanka.com/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                })}
              </script>

              {/* TRAVEL AGENCY / ORGANIZATION SCHEMA */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "TravelAgency",
                  "name": "Plan Sri Lanka",
                  "url": "https://plan-srilanka.com/",
                  "logo": "https://plan-srilanka.com/logo.png",
                  "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
                  "description": "A private travel concierge for the island, built for families and couples travelling from Australia and India — real local guides, honest planning, and direct WhatsApp access.",
                  "telephone": "+94722968210",
                  "priceRange": "$$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Colombo 07",
                    "addressLocality": "Colombo",
                    "addressRegion": "Western Province",
                    "postalCode": "00700",
                    "addressCountry": "LK"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+94722968210",
                    "contactType": "concierge assistance",
                    "areaServed": ["IN", "GB", "US", "AE"],
                    "availableLanguage": ["en", "hi"]
                  }
                })}
              </script>

              {/* FAQPAGE SCHEMA */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Do we need a visa to enter Sri Lanka?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Most passport holders, including Indian and Australian citizens, need a Sri Lanka ETA before arrival. It's a short online form — we'll send you the checklist and confirm it's approved before you fly."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "When's the best time for us to travel?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "It depends which coast. December to April suits the west and south coast and the hill country; May to September is drier on the east coast and around the ancient cities. We build your route around the season you're travelling in."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What should we budget for, beyond flights?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A private, fully-guided trip with good mid-range to upscale stays typically runs from about $150 a day per couple, inclusive of vehicle, guide and entries. We send an exact daily breakdown before you book anything."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do we get around once we land?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most guests travel by private air-conditioned car with an English-speaking driver-guide — the easiest way to cover the hill country and coast comfortably. For the Kandy–Ella stretch, we book you onto the scenic train instead."
                      }
                    }
                  ]
                })}
              </script>
            </>
            <Suspense fallback={<div className="h-screen bg-luxury-black" />}>
              <HomePage />
            </Suspense>
          </motion.div>
        } />
        
        <Route path="/sri-lanka-trip-cost-from-india" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaCostPage />
          </Suspense>
        } />
        
        <Route path="/sri-lanka-7-day-itinerary" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaItineraryPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-10-day-itinerary" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaTenDayItineraryPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-visa-for-indians" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaVisaPage />
          </Suspense>
        } />

        <Route path="/best-time-to-visit-sri-lanka" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaBestTimePage />
          </Suspense>
        } />
        
        <Route path="/sri-lanka-family-itinerary" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaFamilyPage />
          </Suspense>
        } />
        
        <Route path="/where-to-go-in-sri-lanka-in-june" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaJunePage />
          </Suspense>
        } />
        
        <Route path="/sri-lanka-trip-planner" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaTripPlannerPage />
          </Suspense>
        } />

        <Route path="/how-to-use-trip-planner" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaHowToUsePlannerPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-train-trip-planner" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaTrainTripPlannerPage />
          </Suspense>
        } />

        <Route path="/how-to-plan-a-train-trip-in-sri-lanka" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaTrainTripGuidePage />
          </Suspense>
        } />

        <Route path="/how-to-plan-a-trip-to-sri-lanka" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaTripPlannerPillarPage />
          </Suspense>
        } />

        <Route path="/how-much-will-it-take-to-visit-sri-lanka-from-chennai" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaChennaiCostPillarPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-7-day-itinerary-from-chennai" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaChennaiItineraryPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-trip-cost-from-bangalore" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaBangaloreCostPillarPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-trip-cost-from-mumbai" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaMumbaiCostPillarPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-trip-cost-from-hyderabad" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaHyderabadCostPillarPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-itinerary-august-couples" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaAugustCouplesPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-travel-guide-for-americans" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaAmericanGuidePage />
          </Suspense>
        } />
        
        <Route path="/experience/:slug" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <ExperienceDetail />
          </Suspense>
        } />

        <Route path="/blog" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <BlogIndexPage />
          </Suspense>
        } />

        <Route path="/things-to-do-in-sri-lanka" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaExperiencesPage />
          </Suspense>
        } />

        <Route path="/best-things-to-do-sri-lanka-first-time-visitors" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaFirstTimeThingsToDoPage />
          </Suspense>
        } />

        <Route path="/about-founder" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaAboutFounderPage />
          </Suspense>
        } />

        <Route path="/flights" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-luxury-cream min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaFlightsPage />
          </Suspense>
        } />

        <Route path="/guide-to-flying-to-sri-lanka" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaFlightsGuidePage />
          </Suspense>
        } />

        <Route path="/flights/why-use-a-flight-search-tool" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaFlightSearchToolBlogPage />
          </Suspense>
        } />

        <Route path="/blog/why-sri-lanka-is-popular-with-indian-travellers" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaWhyIndianTravellersPage />
          </Suspense>
        } />

        <Route path="/private-driver-south-sri-lanka" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaPrivateDriverSouthPage />
          </Suspense>
        } />

        <Route path="/sri-lanka-car-rental" element={
          <Suspense fallback={
            <div className="pt-24 md:pt-32 bg-[#fcfbf7] min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SrilankaCarRentalPage />
          </Suspense>
        } />

      </Routes>

      {/* Footer */}
      <Suspense fallback={<div className="h-20 bg-luxury-black" />}>
        <Footer />
      </Suspense>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : "100%" }}
        className="fixed inset-0 bg-luxury-black z-[150] px-6 py-6 text-white flex flex-col justify-start overflow-y-auto"
      >
        <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="font-serif font-semibold text-lg tracking-[0.14em] text-white"
          >
            PLAN SRI LANKA
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 border border-white/20 rounded-full hover:border-luxury-gold hover:text-luxury-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3 flex-grow">
          <button
            onClick={() => { setIsMenuOpen(false); scrollToSection("journeys"); }}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-luxury-gold/40 transition-all text-left font-serif text-lg"
          >
            Journeys
          </button>
          <button
            onClick={() => { setIsMenuOpen(false); scrollToSection("plan"); }}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-luxury-gold/40 transition-all text-left font-serif text-lg"
          >
            Plan Your Trip
          </button>
          <button
            onClick={() => { setIsMenuOpen(false); scrollToSection("founder"); }}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-luxury-gold/40 transition-all text-left font-serif text-lg"
          >
            Founder
          </button>
          <Link
            to="/blog"
            onClick={() => setIsMenuOpen(false)}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-luxury-gold/40 transition-all text-left font-serif text-lg block"
          >
            Travel Guides &amp; Blog
          </Link>

          <div className="pt-6 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold font-bold block mb-2">
              Planning Tools
            </span>
            {[
              { title: "Trip Cost Calculator", path: "/sri-lanka-trip-cost-from-india" },
              { title: "Visa & ETA Guide", path: "/sri-lanka-visa-for-indians" },
              { title: "Sample Itineraries", path: "/sri-lanka-7-day-itinerary" },
              { title: "Train Route Planner", path: "/sri-lanka-train-trip-planner" },
              { title: "Flights Dashboard", path: "/flights" },
              { title: "Car Rental", path: "/sri-lanka-car-rental" }
            ].map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex justify-between items-center p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-white/85"
              >
                {tool.title}
                <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 shrink-0">
          <a
            href="https://wa.me/94722968210"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent('whatsapp_click', 'engagement', 'mobile_menu_book');
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'Lead');
              }
            }}
            className="w-full py-4 bg-luxury-gold text-luxury-black font-bold text-center rounded-full uppercase text-xs tracking-widest hover:bg-white transition-colors block"
          >
            Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
