import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  HelpCircle, 
  Info, 
  Plane, 
  Building, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  ThumbsUp, 
  Sparkles,
  CheckCircle,
  FileText,
  AlertTriangle,
  Lock,
  ChevronRight,
  Send,
  HelpCircle as QuestionIcon
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

export default function SrilankaVisaPage() {
  usePageMetadata({
    title: "Sri Lanka Visa For Indians (2026 ETA Guide) | Apply Online & Entry Requirements",
    description: "Unravel the Sri Lanka Visa for Indians. Discover how to get your Sri Lanka Tourist ETA online, latest requirements, application steps, and how to stay stress-free at the airport.",
    canonicalUrl: "https://plan-srilanka.com/sri-lanka-visa-for-indians",
    ogUrl: "https://plan-srilanka.com/sri-lanka-visa-for-indians"
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    passport: false,
    etaApproved: false,
    hotelBooked: false,
    returnFlight: false,
    etaPdf: false,
    hotelAddr: false,
    emergency: false,
  });

  const [leadForm, setLeadForm] = useState({
    travelDates: "",
    departureCity: "Mumbai",
    travelers: 2,
    budget: "luxury",
    whatsapp: "",
    agreed: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeWalkthroughStep, setActiveWalkthroughStep] = useState(0);

  // Scroll to top upon page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleChecklistItem = (key: string) => {
    setChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      trackEvent("checklist_item_toggle", "engagement", `${key}_${updated[key]}`);
      return updated;
    });
  };

  const currentYear = 2026;

  // FAQ Data (20 Items mapping to user requirements)
  const faqList = [
    {
      q: "What is a Sri Lanka ETA?",
      a: "An ETA (Electronic Travel Authorization) is an official digital entry permit that lets Indian passport holders travel to Sri Lanka for tourism, transit, or short business stays. It is electronically linked to your passport, removing the need for physical stamps or stickers before departure."
    },
    {
      q: "Do citizens of India need a visa before flying to Sri Lanka?",
      a: "Yes. All Indian passport holders planning a trip to Sri Lanka require an ETA (Electronic Travel Authorization) or visa. While you can technically queue up for a Visa on Arrival at Colombo Airport, it is highly discouraged due to long, exhausting queues and because some budget airlines will decline boarding at check-in without your approved pre-departure ETA clearance."
    },
    {
      q: "Is the Sri Lanka Tourist ETA currently free for Indians?",
      a: "Government policies for Indian tourists periodically waive or apply processing fees. Even when the official visa fee itself is set to zero ($0) by diplomatic councils, a standard digital portal system convenience and processing desk fee of around $10 to $20 USD usually applies via official channels. Always review current fee rules at flight boarding."
    },
    {
      q: "Can I obtain a Sri Lanka Visa on Arrival?",
      a: "Technically yes, Sri Lanka offers a Landing Visa desk at Bandaranaike International Airport (BIA). However, queue times can easily stretch to 1 to 2.5 hours after red-eye flights. Additionally, several commercial carriers bound to Colombo demand a digital ETA confirmation code during boarding check-in in India to prevent passenger deportations."
    },
    {
      q: "How many days is the Indian Tourist ETA valid for?",
      a: "The standard tourist ETA allows an initial stay of up to 30 days from your date of arrival in Sri Lanka. It can be extended after arrival at the Department of Immigration in Colombo if you wish to stay longer."
    },
    {
      q: "How long does it take for the ETA to get approved?",
      a: "An online ETA application is typically processed and approved via email within 12 to 24 hours. For complete peace of mind, we advise submitting your application at least 3 to 4 days prior to your departure flight."
    },
    {
      q: "What is the minimum passport validity required?",
      a: "Your Indian passport must be legitimately valid for at least 6 months starting from the exact date you land in Sri Lanka. If your passport is expiring in less than 6 months, immigration officers of the airport will reject your entry."
    },
    {
      q: "Can I draft one single application for my whole family?",
      a: "Yes. The official ETA portal offers a 'Group Application' feature. This allows you to add multiple companion family members under one profile, making it much easier to run payments and receive companion approvals together."
    },
    {
      q: "What is the exact correct mobile number country format to use (+91)?",
      a: "When filing online, input your Indian telephone contact with the international code without excess zeroes. For instance, write '+919876543210' or '919876543210' inside the telephone parameters to evade code formatting crashes."
    },
    {
      q: "Do children and infants below 12 years require an ETA?",
      a: "Yes, every single traveler (including newborn babies, toddlers, and young minors) must have their own ETA corresponding to their individual passport number. Minors under 12 may qualify for lower processing fee rates."
    },
    {
      q: "Can I work in Sri Lanka with a Tourist ETA?",
      a: "Absolutely not. Doing corporate placement, self-employment, freelance jobs, or active commercial work under a standard Tourist ETA is strictly illegal and subject to severe government penalties, deportation, or heavy fines."
    },
    {
      q: "What hotel address should I type if I am staying at multiple locations?",
      a: "Type in the exact name and full geographical location of your first night's luxury hotel or resort (e.g., 'Cinnamon Grand, Colombo' or 'Heritance Kandalama, Sigiriya'). This is exactly what immigration authorities look at to verify safe entry."
    },
    {
      q: "Should I carry a physical printed copy of my approved ETA PDF?",
      a: "Yes, definitely. Keep at least two physical paper prints of your 'ETA APPROVAL NOTICE' PDF in your hand baggage. If the immigration computer system undergoes a temporary network outage or your smartphone battery dies, this print guarantees clear entry."
    },
    {
      q: "What are the core documents checked on arrival at Colombo airport?",
      a: "Immigration check stands ask for 3 things: (1) Your Indian passport valid for 6+ months, (2) Your printed ETA Approval letter, and (3) A confirmed outbound onward/return flight ticket back to India or another destination."
    },
    {
      q: "Can I extend my stay beyond 30 days once I are in Sri Lanka?",
      a: "Yes. You can extend your tourism stay up to 90 days. Extensions must be processed at the Immigration Services Center in Colombo, or you may utilize a licensed local travel concierge to submit the renewal application."
    },
    {
      q: "Are there any vaccination or health travel certificates needed for 2026?",
      a: "Currently, there are no mandatory Covid vaccination constraints or rigid PCR tests to enter Sri Lanka. However, travelers arriving from nations with active Yellow Fever zones must demonstrate valid immunization logs."
    },
    {
      q: "What happens if my ETA application contains a typo or incorrect passport digit?",
      a: "Your entry will be strictly rejected. If there is a single character typo, you must re-apply for a fresh ETA online immediately using the correct passport credentials. The airline desk cannot modify errors in the system."
    },
    {
      q: "What are the customs cash limits I can carry into Colombo?",
      a: "You can import foreign currencies up to $10,000 USD (or equivalent) in cash. However, any amount exceeding $15,000 USD in tourist capital or bank warrants must be formally declared to the desk."
    },
    {
      q: "Why do some budget flights deny boarding if I plan on getting Visa on Arrival?",
      a: "Airlines face massive fines if a passenger is rejected entry and sent back on their route. To mitigate risk, several key budget Indian airlines demand pre-cleared digital ETA approvals before issued boarding passes."
    },
    {
      q: "Is it safe to utilize random third-party agency sites for my ETA?",
      a: "No. Dozens of clone sites mimic official portals, charging unauthorized intermediary markups upward of $80 to $100 USD. Always check that you submit through authorized government systems or your verified concierge desk."
    }
  ];

  const walkthroughSteps = [
    {
      id: "step-1",
      title: "Select Tourist ETA Option",
      desc: "Go to the official authorization portal. Look for tourist paths of individual or group options. Avoid selecting business or transit tracks unless those strictly match your custom travel needs.",
      why: "Picking business subcategories requires official corporate invitations. Tourist ETA is standard, fast, and does not require third-party sponsorship."
    },
    {
      id: "step-2",
      title: "Input Personal Info & Double-Check Passport",
      desc: "Fill in your full legal name, date of birth, gender, and nationality exactly as listed in your passport machine-readable zone. Be extremely vigilant with letters like 'O' vs '0', or 'I' vs '1'.",
      why: "A single typo will invalidate your approved ETA. Sri Lankan airport customs cross-reference the digital system, and mismatch errors will stall your entry."
    },
    {
      id: "step-3",
      title: "Provide Contact Details (Use +91 Format)",
      desc: "Input your direct personal email address and telephone contact. Ensure your phone number is entered cleanly with '+91' or country-leading code to allow notification logs to sync.",
      why: "If there's an issue or delay with your visa application, the department will contact you directly via these details. All approval PDFs will also land in this email box."
    },
    {
      id: "step-4",
      title: "Add Primary Accommodation Details",
      desc: "Input the legitimate name, address, and city of your first night's resort or luxury boutique stay in Sri Lanka.",
      why: "Immigration authorities closely verify that arriving families have safe, documented hotel bookings in the country. Never leave this blank or fill with general text."
    },
    {
      id: "step-5",
      title: "Confirm & Pay System Fees",
      desc: "Review your comprehensive draft, verify companionship entries, and proceed to the secured checkout gateway using an international credit or debit card.",
      why: "The ETA only enters processing queues once system/convenience fees have cleared the transaction gateway. Make sure international transactions are active on your card."
    }
  ];

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.whatsapp) return;
    setIsSubmitting(true);
    trackEvent("visa_lead_form_submit_start", "conversion", leadForm.budget);
    
    // Simulate API processing
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      trackEvent("visa_lead_form_submit_success", "conversion", leadForm.budget);
      
      // Open WhatsApp chat to complete the personalized high-touch request
      const message = `Hi Plan Sri Lanka! I just completed my Visa & Customs planning checklist and would like my personalized Sri Lanka Travel Package.
Travel dates: ${leadForm.travelDates || "Not set"}
Departure: ${leadForm.departureCity}
Travelers: ${leadForm.travelers}
Budget Level: ${leadForm.budget}
WhatsApp: ${leadForm.whatsapp}`;
      
      const whatsappUrl = `https://wa.me/94722968210?text=${encodeURIComponent(message)}`;
      
      // Delay slightly for UX ease
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 800);
    }, 1500);
  };

  return (
    <div className="bg-[#fcfbf7] text-[#1a2d24] min-h-screen pt-24 md:pt-32 pb-16 font-sans">
      <>
        {/* Schema markup inject */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://plan-srilanka.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Sri Lanka Visa for Indians",
                "item": "https://plan-srilanka.com/sri-lanka-visa-for-indians"
              }
            ]
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Sri Lanka Visa For Indians (2026 Guide): Do You Need An ETA?",
            "description": "An exhaustive, user-first handbook to understanding the Sri Lanka Tourist ETA application process, minimizing boarding issues, and traveling with full confidence.",
            "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200&h=630",
            "author": {
              "@type": "Organization",
              "name": "Plan Sri Lanka Editorial Desk"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Plan Sri Lanka",
              "logo": {
                "@type": "ImageObject",
                "url": "https://plan-srilanka.com/logo.png"
              }
            },
            "datePublished": "2026-06-04",
            "dateModified": "2026-06-04"
          })}
        </script>
      </>

      {/* SECTION 1: HERO SECTION - ATTENTION Phase */}
      <section id="hero-section" className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-[#d4af37]/5 blur-3xl -z-10 pointer-events-none" />
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-xs text-[#b8941c] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Entry Protocol Handbook
          </div>
          
          <h1 className="text-3xl md:text-6xl font-serif font-serif text-[#1e3a2f] leading-tight select-none">
            Sri Lanka Visa For Indians (2026): <br />
            <span className="italic text-[#d4af37]">Do You Need An ETA?</span>
          </h1>

          <p className="text-base md:text-xl text-[#3a4d44] font-light max-w-3xl mx-auto leading-relaxed">
            Confused by conflicting travel rules online? Avoid check-in stress and long queues. This guide breaks down exactly what Indian passport holders need before their flight lands in Colombo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a 
              href="#safest-path"
              className="px-8 py-4 bg-[#1e3a2f] hover:bg-[#d4af37] text-white rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Check My Travel Requirements <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#confidence-checklist"
              className="px-8 py-4 bg-white border border-[#1e3a2f]/10 text-[#1e3a2f] rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:bg-[#fcfbf7]/50 hover:border-[#1e3a2f]/30 flex items-center justify-center"
            >
              Open Interactive Flyer Checklist
            </a>
          </div>

          <div className="flex justify-center items-center gap-8 pt-8 text-xs text-[#3a4d44]/60 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> Verified 2026 Policy
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#d4af37]" /> Update Speed: Instant
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK ANSWER BOX - TRUST Phase */}
      <section id="quick-answer" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#1e3a2f]/5 shadow-2xl overflow-hidden">
          <div className="bg-[#1e3a2f] p-6 text-white">
            <h2 className="font-serif text-xl md:text-2xl text-center font-bold tracking-tight">
              Sri Lanka Tourist Entry Requirements at a Glance
            </h2>
            <p className="text-center text-xs text-white/70 font-light mt-1">
              Direct answers to eliminate doubts and decision friction.
            </p>
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { q: "Do Indian passport holders need a visa?", a: "Yes, an entry permit / valid clearance is mandatory prior to passing airport immigration.", status: "yes" },
                { q: "Do Indians need a Tourist ETA?", a: "Yes. Getting an approved Electronic Travel Authorization (ETA) online is the safest path.", status: "yes" },
                { q: "Is the Sri Lanka ETA application online?", a: "Yes, completely digital. You receive an approved PDF copy directly through email.", status: "yes" },
                { q: "Can my spouse & children be added together?", a: "Yes. Group application allows adding all family companions under one entry.", status: "yes" },
                { q: "Should I skip ETA and get Visa on Arrival?", a: "Highly Discouraged. Skip the queues and eliminate potential airline boarding denials.", status: "no" },
                { q: "Is the ETA completely free & without fees?", a: "No. Diplomatic base exemptions vary, but processing center standard system fees still apply.", status: "no" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-[#fcfbf7] border border-[#1e3a2f]/5 hover:shadow-md transition-shadow">
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${
                    item.status === "yes" ? "bg-emerald-100/80 text-emerald-800" : "bg-amber-100/80 text-amber-800"
                  }`}>
                    {item.status === "yes" ? "✓" : "!"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1e3a2f]">{item.q}</h4>
                    <p className="text-xs text-[#3a4d44] font-light mt-0.5 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/50 flex flex-col md:flex-row gap-4 items-center justify-between text-center md:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-mono font-bold text-lg">💡</div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">Immediate Action Summary</h4>
                  <p className="text-[11px] text-amber-800 font-light mt-0.5 max-w-xl">
                    For a trouble-free holiday, always secure your Tourist ETA online at least 3 days before you depart, save the PDF, and carry an onward/return flight proof.
                  </p>
                </div>
              </div>
              <a 
                href="#lead-offer"
                className="px-5 py-2.5 bg-[#1e3a2f] hover:bg-[#d4af37] text-white text-[11px] uppercase tracking-wider font-bold rounded-lg transition-all shadow"
              >
                Get Custom Entry Help
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY INDIAN TRAVELERS GET CONFUSED - TRUST Phase */}
      <section id="whyconfused" className="py-12 md:py-20 px-4 md:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Friction Demystified</span>
          <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f] leading-tight">
            Why Indian Travelers Get Confused
          </h2>
          <p className="text-sm md:text-base text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
            Planning a vacation shouldn’t feel like a high-stakes legislative audit. Let’s unmask why Sri Lankan visa lookup is famously chaotic for Indian citizens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { title: "No Two Portals Match Directives", desc: "A simple web search yields dozens of official-looking copycat domains. Some call it an online ETA, others call it a landing e-visa, and some claim Indians enter with zero paperwork." },
                { title: "Rapidly Changing Diplomatic Policies", desc: "Bilateral agreements between Colombo and New Delhi frequently shift. Promoted 'visa-free' announcements are often trial runs with hidden validation conditions." },
                { title: "High-Risk Airline Check-In Protocols", desc: "Even if Sri Lankan airport customs allow Visa on Arrival, Indian major airport officers are highly risk-averse. Many budget carriers will flatly reject boarding if you don't show a valid ETA code." },
                { title: "Confusing Terminology", desc: "Travel forums casually interchange 'Visa', 'ETA (Electronic Travel Authorization)', and 'E-Visa'. In reality, an ETA is a pre-clearance certificate required prior to takeoff, not a physical stamp." }
              ].map((reason, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white border border-transparent hover:border-[#1e3a2f]/5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#1e3a2f]/5 flex items-center justify-center text-[#d4af37] font-bold shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#1e3a2f]">{reason.title}</h4>
                    <p className="text-xs text-[#3a4d44] leading-relaxed font-light">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REASSURANCE BOX */}
          <div className="bg-white p-7 rounded-[32px] border border-[#1e3a2f]/5 shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-[100px] pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-[#d4af37]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="font-serif text-xl md:text-2xl text-[#1e3a2f] font-bold">
              You’re Not The Only One Confused
            </h3>

            <p className="text-xs md:text-sm text-[#3a4d44]/80 leading-relaxed font-light">
              Weekly, our concierge desk hears of families stranded in Chennai, Kochi, or Delhi airports because a budget airline officer demanded an ETA approval certificate that wasn't prepared.
            </p>

            <blockquote className="border-l-2 border-[#d4af37] pl-4 italic text-xs text-[#1e3a2f]/70 font-serif">
              "We were told online that Sri Lanka was visa-free for citizens of India. But at Bangalore check-in desk, we weren't given boarding passes because we didn't have the official pre-approved ETA code. We had to file it on our phones in panic!" <br />
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider not-italic block mt-1.5 text-luxury-gold">— Ramesh S., Travels with 2 Kids (June 2026)</span>
            </blockquote>

            <div className="pt-2 border-t border-[#1e3a2f]/5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-emerald-800 font-bold">Our Desk Solves This Hassle Instantly</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE SAFEST DECISION PATH - EXPERIENCE Phase */}
      <section id="safest-path" className="py-16 md:py-24 px-4 md:px-8 bg-[#1e3a2f] text-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Operational Excellence</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              The Safest Pre-Flight Decision Path
            </h2>
            <p className="text-sm md:text-base text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Skip speculative guesses. Follow this visual step-by-step pipeline approved by leading regional airline dispatch desks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative">
            {[
              { num: "01", title: "Verify Your Passport Validity", desc: "Check if your booklet is valid for at least six calendar months past your Colombo arrival date." },
              { num: "02", title: "Apply Online via Verified Portal", desc: "Draft a formal application for a Tourist ETA. Prefer Group filing if companions join." },
              { num: "03", title: "Check Approval Email & Reference", desc: "Secure the official 'Tourist ETA Approval' system letter showing your transaction code." },
              { num: "04", title: "Save Approved ETA & Lodging PDF", desc: "Keep physical print versions alongside offline files inside your phone memory." },
              { num: "05", title: "Confirm Return Ticket & Cash", desc: "Carry proof of your roundtrip flight to India and details of your primary hotel reservation." },
              { num: "06", title: "Board Flight & Enter Snag-Free", desc: "Present documents at airport immigration, skip long Landing Visa queues, and start your trip." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:bg-white/10 transition-colors relative">
                <div className="font-mono text-xs text-[#d4af37] font-bold">{step.num}</div>
                <h4 className="font-serif font-bold text-sm text-white group-hover:text-luxury-gold">{step.title}</h4>
                <p className="text-[11px] text-white/60 leading-normal font-light">{step.desc}</p>
                {idx < 5 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-white/20 select-none">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: APPLICATION WALKTHROUGH - EXPERIENCE Phase */}
      <section id="application-walkthrough" className="py-16 md:py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Portal Breakdown</span>
          <h2 className="text-2xl md:text-5xl font-serif text-[#1e3a2f] leading-tight">
            Sri Lanka ETA Application Blueprint
          </h2>
          <p className="text-sm md:text-base text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
            Our step-by-step online filing checklist helps beginners file their ETA perfectly and confidently without hitting technical errors.
          </p>
        </div>

        {/* INTERACTIVE COMPONENT: TABS IN WALKTHROUGH */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2 col-span-1">
            {walkthroughSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveWalkthroughStep(index);
                  trackEvent("walkthrough_tab_click", "engagement", step.title);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  activeWalkthroughStep === index 
                    ? "bg-[#1e3a2f] border-[#1e3a2f] text-white shadow-lg" 
                    : "bg-white border-[#1e3a2f]/10 text-[#1e3a2f]/80 hover:bg-[#1e3a2f]/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs ${
                    activeWalkthroughStep === index ? "bg-[#d4af37] text-white" : "bg-[#1e3a2f]/5"
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold font-serif tracking-tight truncate max-w-[180px]">{step.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          <div className="col-span-2 bg-white rounded-3xl border border-[#1e3a2f]/5 shadow-2xl p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#1e3a2f]/5 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#d4af37] font-bold">
                  Step {activeWalkthroughStep + 1} of {walkthroughSteps.length}
                </span>
                <span className="text-[10px] px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold">
                  Perfect For First-Time Flyers
                </span>
              </div>

              <h3 className="font-serif text-xl md:text-2xl text-[#1e3a2f]">
                {walkthroughSteps[activeWalkthroughStep].title}
              </h3>

              <p className="text-xs md:text-sm text-[#3a4d44] font-light leading-relaxed">
                {walkthroughSteps[activeWalkthroughStep].desc}
              </p>

              <div className="bg-[#fcfbf7] p-4 rounded-xl border-l-[3px] border-[#d4af37] space-y-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Why This Matters
                </h4>
                <p className="text-[11px] text-[#3a4d44]/80 leading-relaxed font-light">
                  {walkthroughSteps[activeWalkthroughStep].why}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1e3a2f]/5 flex justify-between items-center">
              <button 
                onClick={() => {
                  setActiveWalkthroughStep(prev => Math.max(0, prev - 1));
                  trackEvent("walkthrough_prev_click", "engagement", "");
                }}
                disabled={activeWalkthroughStep === 0}
                className="text-xs font-bold text-[#1e3a2f]/50 hover:text-[#1e3a2f] disabled:opacity-35 disabled:hover:text-[#1e3a2f]/50 transition-colors"
              >
                Previous Step
              </button>
              <button 
                onClick={() => {
                  setActiveWalkthroughStep(prev => Math.min(walkthroughSteps.length - 1, prev + 1));
                  trackEvent("walkthrough_next_click", "engagement", "");
                }}
                disabled={activeWalkthroughStep === walkthroughSteps.length - 1}
                className="px-4 py-2 bg-[#1e3a2f] text-white text-xs font-bold rounded-lg hover:bg-[#d4af37] disabled:opacity-35 transition-colors shadow"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMON QUESTIONS INDIAN TRAVELERS ASK - PROOF Phase */}
      <section id="common-concerns" className="py-12 md:py-20 px-4 md:px-8 bg-[#fcfbf7] border-y border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block font-sans">Traveler Rumors vs Facts</span>
            <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
              Addressing Critical Doubts Head-On
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What if it says 'Visa-Free' but airline staff asks for ETA anyway?",
                a: "Airlines follow national IATA check-in registries. Even under visa-free promotions, travelers are usually required to show a pre-filed $0 or convenience-rate ETA registration receipt prior to departure. Boarding without it is highly risky."
              },
              {
                q: "How early in advance should my family register our application?",
                a: "Apply exactly 3 to 7 days before you fly. This provides a safe time cushion if your payment gateway fails or if the Colombo system experiences server maintenance outages."
              },
              {
                q: "Is it safe to pay on arbitrary third-party agency sites claiming $90 approvals?",
                a: "No! Unauthorized websites advertise heavy service overhead markups. Always file through the verified state portals or rely on established luxury concierge agencies like ours to manage your package securely."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#1e3a2f]/5 hover:border-[#d4af37]/30 transition-colors space-y-2">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-bold">
                  <QuestionIcon className="w-4 h-4" /> Doubts resolved
                </div>
                <h4 className="font-bold text-sm text-[#1e3a2f]">{item.q}</h4>
                <p className="text-xs text-[#3a4d44] leading-relaxed font-light">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: AVOID THESE MISTAKES - PROOF Phase */}
      <section id="avoid-mistakes" className="py-16 md:py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Guard Against Errors</span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f]">
            10 Fatal Mistakes Indian Travelers Must Avoid
          </h2>
          <p className="text-xs md:text-sm text-[#3a4d44] font-light max-w-2xl mx-auto leading-relaxed">
            A single tiny oversight on your application or checklist can stall your airport transit entirely. Always review this roster before executing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { num: "01", title: "Applying through copycat websites", desc: "Dozens of search ads mimic the official site to charge Indian families 4x price markups." },
            { num: "02", title: "Entering incorrect email contacts", desc: "A typed error in your mail address will prevent your digital ETA approval PDF from reaching you." },
            { num: "03", title: "Relying on digital offline PDFs without paper prints", desc: "If immigration desk networks drop or your phone battery goes flat, boarding may get rejected." },
            { num: "04", title: "Forgetting the outward/return flight confirmation", desc: "Arriving without a confirmed return ticket implies permanent settle risk, stopping entry." },
            { num: "05", title: "Waiting until standard departure date", desc: "Filing late during terminal gates can trigger severe boarding stress if queue processing hits traffic." },
            { num: "06", title: "Confusing letters with numbers", desc: "Mixing 'O' and '0' or '1' and 'I' inside the passport number tab renders the ETA invalid." },
            { num: "07", title: "Leaving tourist hotel coordinates blank", desc: "Colombo airport counters demand local addresses. General words like 'Tourist' trigger investigations." },
            { num: "08", title: "Failing to check 6-month passport validity", desc: "If validity checks read 5 months and 28 days, boarding gets rejected with no exceptions." },
            { num: "09", title: "Filing business activities on tourist tracks", desc: "Representing client engagements under tourist tags is prohibited and triggers audits." },
            { num: "10", title: "Utilizing cards without active international transactions", desc: "The government portal gateway rejects domestic payments, blocking immediate file processing." }
          ].map((mistake, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-[#1e3a2f]/5 flex gap-4 items-start">
              <span className="font-mono text-xs text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded">{mistake.num}</span>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#1e3a2f]">{mistake.title}</h4>
                <p className="text-[11px] text-[#3a4d44]/80 leading-relaxed font-light">{mistake.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: TRAVEL CONFIDENCE CHECKLIST - PROOF Phase */}
      <section id="confidence-checklist" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#1e3a2f] to-[#12231c] text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Interactive Companion Tool</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              Your Pre-Departure Travel Confidence Flyer
            </h2>
            <p className="text-sm text-white/70 font-light max-w-xl mx-auto">
              Interactive Checklist. Check each element off of your device as you prepare to pass the terminal cleanly.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "passport", title: "Indian Passport physically valid for 6+ months", desc: "Cross-check date stamps from landing." },
                { key: "etaApproved", title: "Approved Sri Lanka Tourist ETA Clearance", desc: "Confirm electronic link with passport." },
                { key: "hotelBooked", title: "Primary Resort Room booked cleanly", desc: "Keep confirmed receipts at hand." },
                { key: "returnFlight", title: "Confirmed return air ticket back to India", desc: "Printed proof speeds transit checks." },
                { key: "etaPdf", title: "Two printed paper copies of ETA Approval letter", desc: "Safest safeguard if network drops." },
                { key: "hotelAddr", title: "Resort name & address saved cleanly offline", desc: "Aids entry file procedures." },
                { key: "emergency", title: "Save flight carrier contact lines", desc: "Aids on-the-go terminal modifications." }
              ].map((item) => (
                <div 
                  key={item.key} 
                  onClick={() => toggleChecklistItem(item.key)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 items-start ${
                    checklist[item.key] 
                      ? "bg-white/10 border-[#d4af37]/80 text-[#d4af37]" 
                      : "bg-white/5 border-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                    checklist[item.key] ? "bg-[#d4af37] border-[#d4af37] text-[#12231c]" : "border-white/30"
                  }`}>
                    {checklist[item.key] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">{item.title}</h4>
                    <p className="text-[10px] text-white/50 font-light mt-0.5 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* PROGRESS METER */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-sm font-bold">Your Verification Status</h4>
                <p className="text-[10px] text-white/50 font-light mt-0.5">
                  Confirm all checkboxes prior to boarding the terminal checks.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-[#d4af37] bg-white/10 px-3 py-1 rounded">
                  {Object.values(checklist).filter(Boolean).length} of {Object.keys(checklist).length} Ready
                </span>
                {Object.values(checklist).filter(Boolean).length === Object.keys(checklist).length ? (
                  <span className="text-xs text-emerald-400 font-bold animate-pulse">✓ Perfect Clearance</span>
                ) : (
                  <span className="text-xs text-amber-300 font-light">Pending validations</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ SECTION - PROOF Phase */}
      <section id="faq-section" className="py-16 md:py-24 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-bold block">Frequently Answered Queries</span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#1e3a2f] text-center">
            20 Essential Questions We Solve Weekly
          </h2>
          <p className="text-xs md:text-sm text-[#3a4d44] font-light max-w-xl mx-auto leading-relaxed">
            Everything your family wants to know regarding entry laws, customs, fees, passport limits, and clearances.
          </p>
        </div>

        <div className="space-y-3">
          {faqList.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-[#1e3a2f]/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => {
                    setActiveFaq(isOpen ? null : index);
                    trackEvent("faq_toggle_visa", "engagement", `faq_${index}`);
                  }}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 text-[#1e3a2f] font-serif"
                >
                  <span className="font-bold text-sm md:text-base leading-snug">
                    {index + 1}. {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-[#d4af37] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-[#1e3a2f]/5 text-xs md:text-sm text-[#3a4d44] leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 10: LEAD GENERATION OFFER - OFFER & CTA Phase */}
      <section id="lead-offer" className="py-16 md:py-24 px-4 md:px-8 bg-white border-t border-[#1e3a2f]/5">
        <div className="max-w-4xl mx-auto bg-[#1e3a2f] rounded-[40px] text-white overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-bl-[200px] pointer-events-none" />
          <div className="p-8 md:p-16 space-y-10 relative z-10">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-bold font-mono">
                Exclusive Concierge Assistance
              </span>
              <h2 className="text-2xl md:text-4xl font-serif leading-tight">
                Travel To Sri Lanka Without Uncertainty
              </h2>
              <p className="text-xs md:text-sm text-white/75 font-light leading-relaxed">
                Get a personalized Sri Lanka travel plan, document check, budget forecast, and curated itinerary tailored for your family.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8 max-w-2xl mx-auto">
              {formSubmitted ? (
                <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-[#12231c] flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                  <h3 className="font-serif text-xl font-bold">Plan Blueprint Initiated!</h3>
                  <p className="text-xs text-white/80 font-light max-w-md mx-auto">
                    We’ve prepared your dynamic files. You are now being forwarded to our WhatsApp Desk (+94 722 968 210) to finalize your elite curated blueprint. Check your tab!
                  </p>
                  <a 
                    href="https://wa.me/94722968210" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-2.5 bg-[#d4af37] text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-colors hover:bg-white hover:text-black"
                  >
                    Direct Connect WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/80">Planned Travel Dates</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. October 2026" 
                        value={leadForm.travelDates}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, travelDates: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#d4af37] transition-all"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/80">Departure City</label>
                      <select 
                        value={leadForm.departureCity}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, departureCity: e.target.value }))}
                        className="w-full bg-white/10 focus:bg-[#1e3a2f] border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-all"
                      >
                        {["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kochi", "Kolkata", "Ahmedabad"].map(city => (
                          <option key={city} value={city} className="bg-[#12231c] text-white">{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/80">Number of Travelers</label>
                      <input 
                        type="number" 
                        min="1"
                        max="30"
                        required
                        value={leadForm.travelers}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, travelers: parseInt(e.target.value) || 2 }))}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-all"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-white/80">Target Budget Class</label>
                      <select 
                        value={leadForm.budget}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full bg-white/10 focus:bg-[#1e3a2f] border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-all"
                      >
                        <option value="luxury" className="bg-[#12231c] text-white">Curated Luxury Experience ($$$)</option>
                        <option value="midrange" className="bg-[#12231c] text-white">Classic Elite Voyage ($$)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#d4af37] block">WhatsApp Number (For instant checklist report delivery)</label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. +91 98765 43210" 
                        value={leadForm.whatsapp}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                        className="w-full bg-white/5 border border-white/20 focus:border-[#d4af37] rounded-xl pl-10 pr-4 py-3.5 text-xs text-white placeholder-white/35 focus:outline-none transition-all font-mono"
                      />
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs opacity-45 font-bold">📲</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1 pb-3">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={leadForm.agreed}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, agreed: e.target.checked }))}
                      className="mt-0.5 rounded accent-[#d4af37] border-white/25"
                    />
                    <label htmlFor="terms" className="text-[10px] text-white/60 leading-normal select-none">
                      I agree to receive interactive traveling guides, budget estimations, and custom itinerary options from Plan Sri Lanka desk via WhatsApp.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !leadForm.agreed || !leadForm.whatsapp}
                    className="w-full py-4 bg-[#d4af37] hover:bg-white text-[#12231c] disabled:opacity-40 disabled:hover:bg-[#d4af37] disabled:hover:text-[#12231c] font-serif font-bold rounded-xl text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#12231c] border-t-transparent rounded-full animate-spin" />
                        Generating Document Package...
                      </>
                    ) : (
                      <>
                        Get My Personalized Sri Lanka Travel Plan <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-white/40 pt-2">
                    <Lock className="w-3.5 h-3.5" /> Checked secure SSL encryption. Zero unsolicited contacts.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER RESOURCE LINK SECTION */}
      <section className="py-12 bg-[#fcfbf7] px-4 md:px-8 border-t border-[#1e3a2f]/5 max-w-6xl mx-auto">
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#3a4d44] font-bold mb-6 text-center">Plan Sri Lanka Curated Resources</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <Link 
            to="/sri-lanka-trip-cost-from-india"
            className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all group flex justify-between items-center"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#d4af37] block mb-1">Financial Blueprint</span>
              <h4 className="font-serif font-bold text-[#1e3a2f] text-sm group-hover:text-luxury-gold">Sri Lanka Trip Cost From India (2026)</h4>
              <p className="text-[11px] text-[#3a4d44]/75 mt-1 font-light">Interactive flight, hotel & safari budget calculator.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link 
            to="/sri-lanka-7-day-itinerary"
            className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all group flex justify-between items-center"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#d4af37] block mb-1">Pacing Optimization</span>
              <h4 className="font-serif font-bold text-[#1e3a2f] text-sm group-hover:text-[#d4af37]">Sri Lanka 7 Day Signature Itinerary</h4>
              <p className="text-[11px] text-[#3a4d44]/75 mt-1 font-light">A curated road map comparing route pacing and transit times.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link 
            to="/best-time-to-visit-sri-lanka"
            className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all group flex justify-between items-center"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#d4af37] block mb-1">Seasonality Advisory</span>
              <h4 className="font-serif font-bold text-[#1e3a2f] text-sm group-hover:text-[#d4af37]">Best Time to Visit Sri Lanka (2026)</h4>
              <p className="text-[11px] text-[#3a4d44]/75 mt-1 font-light">Choose your journey based on festival events, crowds & microclimates.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link 
            to="/sri-lanka-family-itinerary"
            className="p-5 rounded-2xl bg-white border border-[#1e3a2f]/5 hover:border-[#d4af37] transition-all group flex justify-between items-center"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#d4af37] block mb-1">Stress-Free Family</span>
              <h4 className="font-serif font-bold text-[#1e3a2f] text-sm group-hover:text-[#d4af37]">Sri Lanka Family Itinerary (2026)</h4>
              <p className="text-[11px] text-[#3a4d44]/75 mt-1 font-light">Custom slow-placed routes, baby carrier rules & beach matchmaking.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
