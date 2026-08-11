export interface DailySchedule {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  travelTime: string;
  drivingTime: string;
  costs: string;
  foodSuggestions: string;
  hotels: string;
  photoSpots: string;
  packingTips: string;
  localTips: string;
  commonMistakes: string;
}

export const itinerarySchedules: DailySchedule[] = [
  {
    day: 1,
    title: "Bandaranaike Airport (CMB) to Negombo (The Soft Landing)",
    morning: "Land at Bandaranaike International Airport. Pass through immigration, pick up local LKR currency, and secure your Dialog eSIM at the arrivals hall.",
    afternoon: "Skip Colombo's grueling bumper-to-bumper city traffic. Take a short 20-minute drive directly to Negombo. Check-in to your beachfront resort and enjoy a refreshing king coconut by the pool.",
    evening: "Embark on a traditional Negombo Lagoon catamaran sunset cruise. Dinner at a shoreline tavern featuring fresh ginger mud crabs.",
    travelTime: "20 minutes",
    drivingTime: "20 minutes (12 km)",
    costs: "Airport Expressway Toll: 300 LKR. Catamaran Cruise: 4,000 LKR per person.",
    foodSuggestions: "Lagoon crab curry, coconut pol-sambol, fried seer fish.",
    hotels: "Jetwing Beach (Luxury), Heritance Negombo (Premium), Villa Araliya (Value).",
    photoSpots: "Negombo beach sunset, catamaran sails on the lagoon, local fish drying nets.",
    packingTips: "Breathable cotton shirt, slip-on shoes for airport transfers, sun hat.",
    localTips: "Buy your SIM card and exchange money at the airport; rates are competitive and convenient.",
    commonMistakes: "Driving to Colombo on Day 1. It wastes 1.5 hours in traffic when you are already exhausted from your flight."
  },
  {
    day: 2,
    title: "Negombo to Sigiriya via Pidurangala (Cultural Inland)",
    morning: "Leave Negombo early (7:30 AM) to beat the inland heat. Drive past coconut estates. Stop for a cold King Coconut (Thambili) on the highway roadside.",
    afternoon: "Arrive in Sigiriya. Rest and have a traditional clay-pot lunch. Avoid climbing Lion Rock in the blistering 33°C afternoon heat.",
    evening: "At 4:15 PM, climb Pidurangala Rock (1,000 LKR fee). The summit offers an incredible 360-degree sunset panoramic view directly facing the Lion Rock monolith.",
    travelTime: "3.5 hours",
    drivingTime: "3.5 hours (145 km)",
    costs: "Pidurangala Rock Entry: 1,000 LKR ($3 USD) per person.",
    foodSuggestions: "Wambatu Moju (sweet eggplant), dhal curry, clay-pot red rice.",
    hotels: "Jetwing Vil Uyana (Luxury), Aliya Resort & Spa (Comfort), Sigiriya Rock Side Home (Value).",
    photoSpots: "Sunset view of Sigiriya Lion Rock from the top of Pidurangala granite platform.",
    packingTips: "Modest clothes (knees & shoulders covered for temple pass-by), flashlight for climbing down in the dark.",
    localTips: "Pidurangala climb is moderately steep at the end. Wear shoes with excellent grip.",
    commonMistakes: "Scaling Sigiriya Rock in the mid-afternoon. It is too hot, with zero shade on the rock face."
  },
  {
    day: 3,
    title: "Sigiriya Citadel & Dambulla to Sacred Kandy",
    morning: "Enter Sigiriya Lion Rock Fortress at 7:00 AM sharp when gates open. Walk through water gardens and climb 1,200 steps before tourist buses arrive.",
    afternoon: "Drive south to Kandy. Stop at the UNESCO-listed Dambulla Cave Temple to see 150+ golden Buddha statues. Have lunch at a spice grove homestead.",
    evening: "Arrive in Kandy. Visit the Temple of the Sacred Tooth Relic during the evening 'Thevava' ceremony (6:30 PM) amidst oil lamps and traditional drumming.",
    travelTime: "2.5 hours",
    drivingTime: "2.5 hours (90 km)",
    costs: "Sigiriya Lion Rock: $36 USD (approx. 11,500 LKR). Dambulla Caves: 2,000 LKR. Tooth Temple: 2,000 LKR.",
    foodSuggestions: "Devilled chicken, Kandy honey hoppers, pol roti with chili paste.",
    hotels: "The Kandy House (Luxury), Earl's Regency (Premium), Hanthana Jungle View (Value).",
    photoSpots: "The Lion Paw stairs of Sigiriya, golden ceiling paintings in Dambulla caves, Tooth Temple reflections on Kandy Lake.",
    packingTips: "Socks (white recommended) to walk on sun-baked stones at temples, long sarong, wet wipes.",
    localTips: "Kandy Temple dress code is strictly enforced: knees and shoulders must be covered. No hats or shoes allowed inside.",
    commonMistakes: "Buying Dambulla Cave tickets at the top. The ticket counter is at the bottom of the hill; don't climb up empty-handed."
  },
  {
    day: 4,
    title: "The Misty Highland Blue Railway to Ella Ridge",
    morning: "Board the world-famous blue train from Kandy Station. Wind through emerald tea plantations, eucalyptus forests, and misty valleys.",
    afternoon: "The train rides along high ridges. Your driver carries your heavy baggage by road, letting you travel with just your camera.",
    evening: "Arrive in Ella. Check-in to a valley-facing bungalow. Head to Cafe Chill for a lively evening of wood-fired pizza, craft sodas, and local music.",
    travelTime: "3.5 to 4 hours train",
    drivingTime: "Chauffeur drives 3.5 hours to meet you at Ella Station",
    costs: "Train 2nd Class reserved: approx. 1,500 - 2,500 LKR per ticket.",
    foodSuggestions: "Sri Lankan kottu roti, passion fruit cheesecake, wood-fired pizza.",
    hotels: "98 Acres Resort & Spa (Luxury), Mountain Heavens (Premium), Ella Edge Resort (Value).",
    photoSpots: "Hanging from the open train door with tea estate backdrop, tea-pickers in the mist.",
    packingTips: "Warm cardigan or fleece sweater (Nuwara Eliya/Ella drops to 14°C at night), high-quality camera lenses.",
    localTips: "Book 2nd class reserved seats instead of 1st class; 1st class AC windows are sealed, preventing photography.",
    commonMistakes: "Trying to bring heavy suitcases onto the crowded train. There is zero luggage rack space; always send bags with your driver."
  },
  {
    day: 5,
    title: "Ella Peak Sunrise & The Plains of Yala Safari",
    morning: "Walk to the iconic Nine Arch Bridge at 6:00 AM. Watch the morning train pass over the majestic stone arches amidst deep valley mist.",
    afternoon: "Drive down from the central hills toward the dry plains of Yala. Watch the temperature rise from 16°C to 32°C. Stop at Ravana Falls for photos.",
    evening: "Check-in to your safari camp. Embark on a private 4x4 evening safari in Yala National Park Block 1 to track leopards, bears, and wild elephants.",
    travelTime: "2 hours",
    drivingTime: "2.0 hours (100 km)",
    costs: "Private 4x4 Jeep + Yala Park Entrance Fee: Approx. 24,000 LKR total for two.",
    foodSuggestions: "Lakeside barbecue skewers, buffalo curd with wild kithul treacle.",
    hotels: "Chena Huts by Uga (Luxury), Jetwing Yala (Premium), Wild Trails Yala (Value).",
    photoSpots: "Train crossing Nine Arch Bridge, wild leopards on rocks, herds of elephants at sunset waterholes.",
    packingTips: "Sunscreen, high-strength mosquito repellent (DEET), telephoto zoom lens.",
    localTips: "Book the afternoon safari (2:30 PM to 6:00 PM); leopards are most active on sun-warmed rocks as the day cools.",
    commonMistakes: "Booking an un-licensed cheap safari operator. Their jeeps are loud, old, and drivers rush, ruining the wildlife experience."
  },
  {
    day: 6,
    title: "Yala Wilderness to Historic Galle Dutch Fort",
    morning: "Sleep-in or take an optional early morning lagoon bird-watching boat cruise in Bundala. Depart along the southern coastline.",
    afternoon: "Stop at Weligama bay. Take photos of the iconic stilt fishermen and enjoy a fresh-caught garlic butter lobster lunch right on the beach.",
    evening: "Arrive at Galle Dutch Fort (UNESCO site). Stroll the historic stone ramparts at sunset (5:15 PM) when the sea breeze cools the fort alleys.",
    travelTime: "2.5 hours",
    drivingTime: "2.5 hours (150 km) via Southern Expressway link",
    costs: "Stilt Fishermen Photo tip: 1,000 LKR. Beach Seafood lunch: 6,000 LKR for two.",
    foodSuggestions: "Garlic butter prawns, grilled snappers, Mediterranean tapas, gelato.",
    hotels: "Amangalla (Luxury), Fort Bazaar (Premium), Galle Fort Hotel (Value Heritage).",
    photoSpots: "Stilt fishermen at Weligama, Galle Fort Lighthouse, waves crashing against the stone ramparts.",
    packingTips: "Linen shirt, sunglasses, comfortable walking sandals for cobbled streets.",
    localTips: "Galle Fort is full of beautiful local boutiques and craft shops; it is the best place to buy authentic Ceylon sapphires and tea.",
    commonMistakes: "Taking photos of stilt fishermen without tipping them. They are posing for photos as their livelihood; tipping is normal."
  },
  {
    day: 7,
    title: "Galle Fort Coastal Loop to Colombo & Departures",
    morning: "Explore the colonial heritage alleys, antique shops, and independent jewelers within the Galle Fort walls.",
    afternoon: "Take the fast Southern Expressway back to Colombo. Dine at the world-famous Ministry of Crab inside the Dutch Hospital complex.",
    evening: "Take a final sunset stroll on Galle Face Green, pick up souvenirs at Laksala, and transfer to Bandaranaike Airport for your night flight home.",
    travelTime: "2 hours",
    drivingTime: "2.0 hours (125 km) via Southern Expressway",
    costs: "Ministry of Crab meal: Approx. 12,000 - 20,000 LKR for two (booking essential).",
    foodSuggestions: "Garlic chili mud crab, kade bread, local woodapple juice.",
    hotels: "Departing flight tonight (no hotel needed, or Colombo Hilton for day-use).",
    photoSpots: "Ministry of Crab dishes, Colombo skyline from Galle Face Green, colonial architecture of Colombo Fort.",
    packingTips: "Keep your travel documents, flight tickets, and airport clothing handy in your driver's car.",
    localTips: "Reserve your table at Ministry of Crab at least 2 weeks in advance; they sell out every night.",
    commonMistakes: "Leaving Galle too late for your flight. Always factor in a 3-hour airport arrival buffer plus expressway transit times."
  }
];
