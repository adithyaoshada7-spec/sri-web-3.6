export interface FaqItem {
  category: "logistics" | "health" | "money" | "connectivity" | "weather" | "safety" | "culture";
  q: string;
  a: string;
}

export const itineraryFaqs: FaqItem[] = [
  // 1-15: Logistics & Transport
  {
    category: "logistics",
    q: "Is 7 days genuinely enough for both Cultural Triangle and South Coast?",
    a: "It is the absolute minimum. You can cover the highlights (Sigiriya, Kandy, Ella, Galle) in 7 days without burning out ONLY if you hire a private driver-guide. If using slow public trains/buses exclusively, you will spend 60% of your waking hours in transit and should cut at least one region."
  },
  {
    category: "logistics",
    q: "What happens if my Kandy-to-Ella train is delayed by 3+ hours?",
    a: "Highland train delays of 1 to 4 hours are common. If your train is severely delayed, your private chauffeur (who travels by road with your main luggage) can pick you up at an intermediate station like Nanu Oya (Nuwara Eliya) or Hatton, rescuing your evening schedule."
  },
  {
    category: "logistics",
    q: "Can I do Ella and Yala Safari on the same day realistically?",
    a: "Yes, but only with tight coordination. You must check out of Ella early (7:00 AM), drive 2 hours downhill to Yala, check-in or have lunch by 1:30 PM, and enter the national park gate by 2:30 PM for the afternoon safari. Our 7-day route maps this out perfectly."
  },
  {
    category: "logistics",
    q: "Is the Colombo airport-to-Sigiriya drive actually 3.5 hours?",
    a: "Only with perfect highway conditions late at night. During the day, expect 4.5 to 5 hours due to narrow two-lane roads, heavy agricultural tractor traffic, and pedestrian crossings in local trade towns."
  },
  {
    category: "logistics",
    q: "Should I do Colombo on day 1 or skip it entirely in a 7-day plan?",
    a: "Skip it. When you have only 7 days, spending Day 1 in Colombo traffic is a waste. Head directly to Negombo (20 mins from airport) to rest on the beach, then go inland on Day 2."
  },
  {
    category: "logistics",
    q: "What is the backup plan if my flight lands late and I lose half of day 1?",
    a: "If landing late, rest overnight in Negombo. On Day 2, start earlier (6:30 AM) to preserve your Cultural Triangle activities without losing any momentum."
  },
  {
    category: "logistics",
    q: "Where can I safely store luggage if I want a same-day activity before departure?",
    a: "Most travelers leave luggage with their private driver during activities, or at your final hotel front desk. Colombo Fort Station has a manned cloakroom, but a private car is 100% safer."
  },
  {
    category: "logistics",
    q: "Do I need to reconfirm hotel bookings or drivers each day?",
    a: "With Plan Sri Lanka, your driver-guide stays in continuous communication with hotels ahead of arrival. If traveling independently, a WhatsApp message the night before is recommended."
  },
  {
    category: "logistics",
    q: "Is skipping Colombo entirely a mistake?",
    a: "No. The real magic of Sri Lanka lies in the ancient citadels, tea country, wildlife, and southern beaches. Colombo is a typical busy South Asian hub; skip it if short on time."
  },
  {
    category: "logistics",
    q: "How early do I need to book my Kandy-Ella train reserved seats?",
    a: "Reserved seats open exactly 30 days prior. Because of high tourist demand, they often sell out within 5 minutes. Secure them via a licensed agent or local planner the moment they open."
  },
  {
    category: "logistics",
    q: "What is the honest trade-off between Ella and Nuwara Eliya?",
    a: "Nuwara Eliya is colder, historic, and centered around tea factories and colonial gardens. Ella is a livelier mountain village with hiking trails (Little Adams Peak, Ella Rock) and vibrant cafes. Couples and younger travelers prefer Ella."
  },
  {
    category: "logistics",
    q: "Is the 1st class train cabin better than the 2nd class reserved cabin?",
    a: "1st class has closed air-conditioned windows. 2nd class reserved has non-AC open windows which are actually much better for photography and feeling the crisp mountain air."
  },
  {
    category: "logistics",
    q: "Can I drive a rental car myself in Sri Lanka?",
    a: "Self-driving requires a temporary Sri Lankan driving license. However, navigating unpredictable traffic, aggressive buses, and mountain hairpin turns is stressful and not recommended."
  },
  {
    category: "logistics",
    q: "Are public buses reliable for a tight 7-day itinerary?",
    a: "Public buses are incredibly cheap but very slow, crowded, and lack luggage racks. They will easily double your travel times and cause extreme physical fatigue."
  },
  {
    category: "logistics",
    q: "Is a same-day trip from Galle to Sigiriya possible?",
    a: "Absolutely not. This is a 5-6 hour drive one-way. It defeats the entire purpose of a relaxed vacation and is a critical planning error."
  },

  // 16-25: Physical & Health Reality
  {
    category: "health",
    q: "How physically demanding is the Sigiriya climb for seniors or children?",
    a: "There are 1,200 steep, narrow steel steps. It is moderately demanding. Anyone with average fitness can climb it by taking frequent breaks in the shade. Go at 7:00 AM to avoid heatstroke."
  },
  {
    category: "health",
    q: "Is Horton Plains' World's End hike doable with kids?",
    a: "The trail is a 9.5 km loop on uneven, rocky ground. It is too long and tiring for toddlers, but active children aged 8+ can manage it easily. Strollers are impossible here."
  },
  {
    category: "health",
    q: "Is the tap water safe anywhere in Sri Lanka?",
    a: "No. Do not drink tap water. Use bottled mineral water (check the SLS seal) or filtered water. Use bottled water even for brushing teeth in rural spots."
  },
  {
    category: "health",
    q: "What vaccinations do I actually require for 7 days in Sri Lanka?",
    a: "Routine vaccines (Hepatitis A, Typhoid, Tetanus) are recommended. Sri Lanka is certified malaria-free, but dengue fever exists, so bring high-strength mosquito repellent."
  },
  {
    category: "health",
    q: "How do I avoid stomach illness ('Delhi Belly') on this route?",
    a: "Eat food that is served steaming hot. Avoid pre-cut fruit, ice cubes in rural villages, and raw salads. Roadside curries are safe if busy with locals."
  },
  {
    category: "health",
    q: "How cold does Nuwara Eliya get compared to the coast?",
    a: "Coastal areas average 30°C. Nuwara Eliya (1,800m altitude) drops to 10°C–14°C in the evening. You must pack a warm fleece, sweater, and long pants."
  },
  {
    category: "health",
    q: "Are leeches a problem in the mountain tea estates?",
    a: "Only after rain. If hiking in Ella tea fields or Horton Plains when damp, apply eucalyptus oil or wear high socks ('leech socks') to prevent bites."
  },
  {
    category: "health",
    q: "Is motion sickness common on the roads from Kandy to Ella?",
    a: "Yes. The road is a series of continuous hairpin bends. If prone to motion sickness, take an antihistamine beforehand and ask your driver to go slowly."
  },
  {
    category: "health",
    q: "What should I do if a wild monkey steals my food or belongings?",
    a: "Do not fight back or make direct eye contact; they can be aggressive. Avoid carrying plastic bags near temples, as monkeys associate them with food."
  },
  {
    category: "health",
    q: "Are medical facilities reliable in rural regions?",
    a: "Sigiriya and Yala have basic local clinics. For serious issues, Kandy and Colombo have world-class private hospitals (e.g., Asiri, Kings Hospital)."
  },

  // 26-38: Money & Value
  {
    category: "money",
    q: "What is a realistic daily cash requirement for a couple?",
    a: "Plan for 10,000 to 15,000 LKR ($30–$50 USD) daily in cash. This covers driver tips, local lunches, coconut drinks, toilet tips, and small souvenir buys."
  },
  {
    category: "money",
    q: "Are national park fees paid in LKR or USD?",
    a: "They are calculated in USD equivalents but paid in LKR at the counter. Cash is preferred; card systems are frequently offline in rural gates."
  },
  {
    category: "money",
    q: "Are there free alternative viewpoints near Sigiriya?",
    a: "Yes! Climb Pidurangala Rock instead. It is only 1,000 LKR ($3 USD) and offers a gorgeous direct view of the Sigiriya Lion Rock itself."
  },
  {
    category: "money",
    q: "What is a fair daily rate for a private car & driver in 2026?",
    a: "A standard sedan with driver, fuel, highway tolls, and driver accommodation covered costs ₹6,000 to ₹9,000 INR per day, depending on vehicle class."
  },
  {
    category: "money",
    q: "Do ATMs in Sri Lanka charge foreign card transaction fees?",
    a: "Yes. Bank of Ceylon (BOC) and People's Bank have the lowest international fees. Commercial Bank and HNB charge 400–800 LKR per transaction."
  },
  {
    category: "money",
    q: "What is the typical tipping norm for a private driver?",
    a: "It is customary to tip 2,500 to 3,500 LKR ($8–$12 USD) per day at the end of the trip for excellent service, plus small tips for bags."
  },
  {
    category: "money",
    q: "Can I use my credit card in rural Sigiriya or Ella?",
    a: "Most tourist hotels and upscale cafes accept Visa/Mastercard. Local fruit stalls, tuk-tuks, and minor entrance temples are strictly cash-only."
  },
  {
    category: "money",
    q: "Do foreign tourists get charged higher prices at heritage sites?",
    a: "Yes. Sri Lanka has dual pricing. For example, Sigiriya is $36 USD for foreigners but only a nominal fee for locals. This goes directly to heritage conservation."
  },
  {
    category: "money",
    q: "Is it cheaper to exchange currency at the airport or in Colombo?",
    a: "The airport exchange counters are competitive and safe. Avoid shady city jewelers offering unrealistic rates; stick to licensed banks."
  },
  {
    category: "money",
    q: "Should I buy travel insurance for a short 7-day trip?",
    a: "Yes. It is highly recommended. It should cover emergency medical evacuation, safari activity accidents, and train ticket cancellation protection."
  },
  {
    category: "money",
    q: "What happens if a safari jeep breaks down in Yala?",
    a: "Drivers communicate via radio. If a jeep breaks down, another jeep from the same company will pick you up within 15–20 minutes inside the park."
  },
  {
    category: "money",
    q: "Is haggling expected with Sri Lankan tuk-tuk drivers?",
    a: "Yes. Unless they use a meter (common in Colombo), always agree on a price before getting in. A good rule of thumb is 150–200 LKR per kilometer."
  },
  {
    category: "money",
    q: "How much is the airport expressway toll fee, and who pays it?",
    a: "The Colombo-Katunayake expressway toll is 300 LKR. If you hire a private driver through us, all expressway tolls are fully pre-included."
  },

  // 39-45: Connectivity & Technology
  {
    category: "connectivity",
    q: "Which mobile network has the best coverage in the hill country?",
    a: "Dialog Axiata has the widest coverage and fastest 4G/5G speeds, especially in remote areas like Horton Plains and Yala."
  },
  {
    category: "connectivity",
    q: "Should I get an eSIM or buy a physical SIM at the airport?",
    a: "A Dialog eSIM can be bought online before departure. If you need a physical SIM, tourist packages are available in the CMB airport arrivals hall for around $10."
  },
  {
    category: "connectivity",
    q: "Is hotel Wi-Fi reliable enough for remote work in Ella?",
    a: "While hotels have Wi-Fi, mountain storms can cause power fluctuations and slower speeds. A 4G backup SIM is essential for digital nomads."
  },
  {
    category: "connectivity",
    q: "Will Google Maps work offline during rural transfers?",
    a: "Yes, but you should download the offline map area of Sri Lanka before arriving. Hill country signal can occasionally drop in deep ravines."
  },
  {
    category: "connectivity",
    q: "What power adapter socket is used in Sri Lanka?",
    a: "Sri Lanka uses Type D and Type G sockets. Bring a universal multi-plug adapter to handle both."
  },
  {
    category: "connectivity",
    q: "How common are power cuts, and should I carry a power bank?",
    a: "Power cuts are rare now compared to 2022. However, bring a high-capacity power bank (10,000mAh+) to keep your phone charged during long safaris."
  },
  {
    category: "connectivity",
    q: "Can I use WhatsApp to coordinate with my driver?",
    a: "Yes, WhatsApp is the primary mode of communication used by all drivers, hotels, and tour operators in Sri Lanka."
  },

  // 46-53: Weather, Crowds & Timing
  {
    category: "weather",
    q: "What is the absolute best time of day to visit Nine Arch Bridge?",
    a: "Be there by 6:00 AM to 6:30 AM. You will beat the heavy crowds, enjoy cool morning temperatures, and see the mist rising over the valley."
  },
  {
    category: "weather",
    q: "What is the wet-season alternative if traveling in June?",
    a: "In June, the southwest coast (Galle, Mirissa) has high rainfall. Head to the dry north-central plains (Sigiriya) and east coast beaches (Trincomalee)."
  },
  {
    category: "weather",
    q: "When does Yala National Park close for annual maintenance?",
    a: "Yala Block 1 usually closes from September 1 to October 15 for drought animal migration. If visiting then, go to Udawalawe or Wilpattu instead."
  },
  {
    category: "weather",
    q: "How does the dual monsoon system affect my 7-day trip?",
    a: "Sri Lanka has two monsoons: Maha (Northeast, Dec–Jan) and Yala (Southwest, May–Aug). Because they hit opposite sides of the island, there is always a dry beach area."
  },
  {
    category: "weather",
    q: "What time do tour buses arrive at Sigiriya?",
    a: "Large tour groups arrive by 8:30 AM to 9:00 AM. Climb at 7:00 AM to enjoy a peaceful ascent."
  },
  {
    category: "weather",
    q: "Is whale watching in Mirissa reliable in July?",
    a: "No. The sea is very rough during the southwest monsoon (May to September), making whale tours unsafe and highly prone to sea-sickness."
  },
  {
    category: "weather",
    q: "Can I climb Pidurangala Rock in the rain?",
    a: "No. The final section requires scrambling over wet, slippery granite boulders. Avoid climbing during heavy downpours."
  },
  {
    category: "weather",
    q: "Is Nuwara Eliya misty year-round?",
    a: "Nuwara Eliya is prone to mist and light drizzle. October and November are the wettest months, while February and March are the clearest."
  },
  {
    category: "weather",
    q: "What's the best month to do this 7-day route?",
    a: "December to March is the driest window for both the hill country (Kandy, Ella) and south coast (Galle) legs of this route, so all seven days line up with good weather. See our full best-time-to-visit breakdown for a month-by-month guide."
  },
  {
    category: "weather",
    q: "Is this itinerary suitable for a June or August trip?",
    a: "The route still works in June and August, but you'll want to swap Galle for an East Coast stop (Trincomalee or Passikudah), since the southwest monsoon hits Galle/Mirissa in those months while the east stays dry. See our dedicated Sri Lanka in June guide, or our August couples itinerary for a ready-made East Coast variant."
  },

  // 54-62: Packing & Safety
  {
    category: "safety",
    q: "Is Sri Lanka safe for solo female travelers?",
    a: "Yes, Sri Lanka is generally very safe and welcoming. However, avoid walking alone on unlit beaches or quiet rural lanes after dark. Dress modestly off-the-beach."
  },
  {
    category: "safety",
    q: "What is the 'Milk Powder Scam' in Colombo?",
    a: "A local may approach saying they don't want money, only milk powder for their baby. They take you to a nearby shop where you pay highly inflated prices, and they split the profit later. Avoid."
  },
  {
    category: "safety",
    q: "Are there venomous snakes on the hiking trails?",
    a: "Sri Lanka has venomous snakes, but they avoid noisy tourist trails. Stick to marked paths in Horton Plains and Yala, and wear closed shoes."
  },
  {
    category: "safety",
    q: "Can I swim at any beach along the south coast?",
    a: "Many beaches have strong undercurrents and rip tides. Only swim in designated safe bays like Unawatuna, Hiriketiya, or Mirissa's reef-protected areas."
  },
  {
    category: "safety",
    q: "Are emergency service numbers reliable for tourists?",
    a: "Yes. Dial 1912 for the Tourist Police, 119 for general police, and 110 for medical emergencies."
  },
  {
    category: "safety",
    q: "Should I pack formal clothing for high-end dining in Ella?",
    a: "No. Ella has a laid-back, bohemian backpacker vibe. Smart-casual attire (clean t-shirt, shorts/pants) is perfect even for luxury resorts."
  },
  {
    category: "safety",
    q: "Is it safe to hang out of train doors for photos?",
    a: "It is a popular Instagram trend, but highly dangerous. The train passes close to rock faces, bridges, and trees. Always hold on tightly and be extremely careful."
  },
  {
    category: "safety",
    q: "Do I need to carry passport photocopies?",
    a: "Yes. Keep a digital copy on your phone and a physical copy in your bag, leaving your actual passport safe in your hotel room locker."
  },
  {
    category: "safety",
    q: "What should I pack for mosquito safety?",
    a: "Bring repellent with 20% DEET or Picardin. Plug-in mosquito vaporizers are usually provided by hotels."
  },

  // 63-70: Culture & Etiquette
  {
    category: "culture",
    q: "Can I wear leggings or sleeveless tops at temples?",
    a: "No. Sleeveless tops, shorts, leggings, and short skirts are strictly forbidden. Knees and shoulders must be fully covered. Wear loose linen pants or a sarong."
  },
  {
    category: "culture",
    q: "Is it offensive to pose with your back to a Buddha statue?",
    a: "Yes, it is highly offensive and illegal. Never turn your back directly to a Buddha statue for a selfie. Always face the statue, or take a side-angle photo."
  },
  {
    category: "culture",
    q: "Is Pinnawala Elephant Orphanage ethical to visit?",
    a: "Many modern ethical guides recommend skipping Pinnawala due to elephants being chained and handled for tourism. Visit the Elephant Transit Home in Udawalawe instead."
  },
  {
    category: "culture",
    q: "Is it polite to eat with your left hand in Sri Lanka?",
    a: "Locals eat traditional rice and curry with their right hand. The left hand is considered unclean; avoid using it to pass food or shake hands."
  },
  {
    category: "culture",
    q: "What is Poya Day, and how does it affect alcohol sales?",
    a: "Poya is the monthly Buddhist holiday on a full moon. Alcohol sales in shops, supermarkets, and bars are illegal on Poya days. Upmarket hotels can only serve it to rooms."
  },
  {
    category: "culture",
    q: "How do I show appreciation to temple guides or caretakers?",
    a: "A polite nod, palms pressed together ('Ayubowan'), and a small donation (500–1,000 LKR) in the temple charity box is highly appreciated."
  },
  {
    category: "culture",
    q: "Is displaying Buddha tattoos offensive?",
    a: "Yes, highly offensive. Buddhist tattoos must be covered up in public; tourists have been detained or deported in the past for displaying visible Buddha tattoos."
  },
  {
    category: "culture",
    q: "Should I tip for stilt fishermen photos?",
    a: "Yes. Modern stilt fishermen on the south coast pose for photos as their primary livelihood. A tip of 1,000 LKR ($3 USD) is standard and fair."
  }
];
