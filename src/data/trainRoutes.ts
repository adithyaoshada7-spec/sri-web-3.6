export interface Station {
  id: string;
  name: string;
  distance: number; // km
  elevation: number; // m
  arrivalTime: string;
  stopTime: string; // e.g., "2 mins"
  weather: string;
  photoSpots: string[];
  attractions: string[];
  lat: number;
  lng: number;
}

export interface POI {
  id: string;
  name: string;
  type: "hotel" | "restaurant" | "scenic" | "viewpoint";
  rating: number;
  description: string;
  lat: number;
  lng: number;
  stationId: string;
}

export interface TrainRoute {
  id: string;
  name: string;
  displayName: string;
  color: string;
  description: string;
  longDescription: string;
  distance: number; // km
  duration: string; // hours
  vibe: string;
  tags: string[];
  image: string;
  stations: Station[];
  pois: POI[];
}

export const trainRoutes: TrainRoute[] = [
  {
    id: "highland",
    name: "Highland Main Line",
    displayName: "The Highland Tea-Country Express",
    color: "#C5A059", // gold
    description: "The world-famous 'Blue Train' journey winding through mist-shrouded peaks, cascading waterfalls, and manicured tea plantations.",
    longDescription: "Widely regarded as one of the most beautiful train journeys on earth, the Highland Main Line connects Colombo with the ancient royal capital Kandy, climbs to the chilly tea estates of Nuwara Eliya, summits at Pattipola (1,898m), and descends into the magical hiking haven of Ella. This journey offers dramatic transitions from tropical heat to crisp highland cloud forests.",
    distance: 292,
    duration: "9.5 hrs",
    vibe: "Cozy, Misty, Dreamy & Photographic",
    tags: ["Tea Estates", "Misty Peaks", "Waterfalls", "9 Arch Bridge"],
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200",
    stations: [
      {
        id: "colombo-fort",
        name: "Colombo Fort",
        distance: 0,
        elevation: 5,
        arrivalTime: "05:55 AM",
        stopTime: "Origin",
        weather: "Humid & Sunny (30°C)",
        photoSpots: ["Heritage Clocktower", "Red Train Engines"],
        attractions: ["Galle Face Green", "Pettah Floating Market"],
        lat: 6.9332,
        lng: 79.8499
      },
      {
        id: "kandy",
        name: "Kandy",
        distance: 121,
        elevation: 465,
        arrivalTime: "08:45 AM",
        stopTime: "10 mins",
        weather: "Pleasant & Breezy (26°C)",
        photoSpots: ["Kandy Lake Curve", "Royal Station Entrance"],
        attractions: ["Temple of the Sacred Tooth Relic", "Peradeniya Botanical Gardens"],
        lat: 7.2896,
        lng: 80.6324
      },
      {
        id: "nawalapitiya",
        name: "Nawalapitiya",
        distance: 158,
        elevation: 595,
        arrivalTime: "09:50 AM",
        stopTime: "3 mins",
        weather: "Warm & Tropical (25°C)",
        photoSpots: ["Mahaweli River View", "Tea Harvesters along tracks"],
        attractions: ["Kataboola Waterfalls", "Kabagala Trek"],
        lat: 7.0211,
        lng: 80.5342
      },
      {
        id: "hatton",
        name: "Hatton (Adam's Peak Gateway)",
        distance: 175,
        elevation: 1262,
        arrivalTime: "11:12 AM",
        stopTime: "5 mins",
        weather: "Cool & Crisp (20°C)",
        photoSpots: ["Castlereagh Reservoir from carriage", "Vintage Signals"],
        attractions: ["Sri Pada / Adam's Peak Trek", "Castlereagh Lake Tea Bungalows"],
        lat: 6.8973,
        lng: 80.5986
      },
      {
        id: "nanu-oya",
        name: "Nanu Oya (Nuwara Eliya)",
        distance: 206,
        elevation: 1613,
        arrivalTime: "12:40 PM",
        stopTime: "8 mins",
        weather: "Misty & Cold (16°C)",
        photoSpots: ["Train in Tea bushes", "Colonial Platform Signs"],
        attractions: ["Gregory Lake", "Pedro Tea Estate", "Hakgala Gardens"],
        lat: 6.9531,
        lng: 80.7891
      },
      {
        id: "pattipola",
        name: "Pattipola Summit",
        distance: 224,
        elevation: 1898,
        arrivalTime: "01:25 PM",
        stopTime: "2 mins",
        weather: "Foggy & Pine-scented (14°C)",
        photoSpots: ["Highest Railway Station Board", "Pattipola Tunnel entrance"],
        attractions: ["Horton Plains National Park", "World's End Cliff"],
        lat: 6.8533,
        lng: 80.8252
      },
      {
        id: "ohiya",
        name: "Ohiya",
        distance: 226,
        elevation: 1764,
        arrivalTime: "01:38 PM",
        stopTime: "2 mins",
        weather: "Extremely Misty (15°C)",
        photoSpots: ["Mist-filled Pine Forests", "Mountain Valley Vista"],
        attractions: ["Devil's Staircase Jeep Trail", "Bambarakanda Falls"],
        lat: 6.8167,
        lng: 80.8500
      },
      {
        id: "bandarawela",
        name: "Bandarawela",
        distance: 258,
        elevation: 1225,
        arrivalTime: "02:25 PM",
        stopTime: "3 mins",
        weather: "Sunny & Refreshing (22°C)",
        photoSpots: ["Colonial Brick Arches", "Fruit stalls on tracks"],
        attractions: ["Adisham Benedictine Monastery", "Lipton's Seat"],
        lat: 6.8315,
        lng: 80.9984
      },
      {
        id: "ella",
        name: "Ella",
        distance: 271,
        elevation: 1041,
        arrivalTime: "02:50 PM",
        stopTime: "10 mins",
        weather: "Cozy & Vibrant (21°C)",
        photoSpots: ["Hanging off the Train Door", "Ravana Valleys"],
        attractions: ["Nine Arch Bridge Walk", "Little Adam's Peak", "Ella Rock"],
        lat: 6.8718,
        lng: 81.0478
      },
      {
        id: "demodara",
        name: "Demodara Loop",
        distance: 277,
        elevation: 912,
        arrivalTime: "03:15 PM",
        stopTime: "3 mins",
        weather: "Sunlit Highlands (23°C)",
        photoSpots: ["Demodara Loop underpass", "Train curving 360°"],
        attractions: ["Demodara Tea Estate", "Blackwood Tea Overlook"],
        lat: 6.9031,
        lng: 81.0625
      },
      {
        id: "badulla",
        name: "Badulla Terminal",
        distance: 292,
        elevation: 652,
        arrivalTime: "03:45 PM",
        stopTime: "Terminal",
        weather: "Warm Mountain valley (25°C)",
        photoSpots: ["Historic End-of-Line Buffers", "Muthiyangana Vihara"],
        attractions: ["Dunhinda Cascading Waterfall", "Bogoda Wooden Bridge"],
        lat: 6.9934,
        lng: 81.0550
      }
    ],
    pois: [
      {
        id: "poi-grand-hotel",
        name: "The Grand Hotel Nuwara Eliya",
        type: "hotel",
        rating: 4.8,
        description: "An iconic Elizabethan-era colonial hotel famous for its high-tea experiences and manicured English lawns.",
        lat: 6.9678,
        lng: 80.7675,
        stationId: "nanu-oya"
      },
      {
        id: "poi-98-acres",
        name: "98 Acres Resort & Spa",
        type: "hotel",
        rating: 4.9,
        description: "A luxury boutique hotel made of recycled timber, nested inside a scenic 98-acre organic tea plantation in Ella.",
        lat: 6.8710,
        lng: 81.0545,
        stationId: "ella"
      },
      {
        id: "poi-tea-trails",
        name: "Ceylon Tea Trails",
        type: "hotel",
        rating: 5.0,
        description: "The world's first tea bungalow resort, comprised of five restored colonial planter residences on Lake Castlereagh.",
        lat: 6.8742,
        lng: 80.5982,
        stationId: "hatton"
      },
      {
        id: "poi-cafe-chill",
        name: "Cafe Chill Ella",
        type: "restaurant",
        rating: 4.7,
        description: "Ella's most vibrant social culinary hub, offering Sri Lankan specialty curries, modern wood-fired pizzas, and delicious juices.",
        lat: 6.8735,
        lng: 81.0465,
        stationId: "ella"
      },
      {
        id: "poi-empire-cafe",
        name: "The Empire Cafe Kandy",
        type: "restaurant",
        rating: 4.5,
        description: "Set in a historic heritage building next to the Temple of the Tooth, offering beautiful fusion cuisine and organic coffees.",
        lat: 7.2938,
        lng: 80.6385,
        stationId: "kandy"
      },
      {
        id: "poi-nine-arch",
        name: "Nine Arch Bridge",
        type: "scenic",
        rating: 5.0,
        description: "Built without a single piece of steel, this colonial bridge stands majestic in dense jungle, connecting two mountain peaks.",
        lat: 6.8768,
        lng: 81.0608,
        stationId: "ella"
      },
      {
        id: "poi-ravana-falls",
        name: "Ravana Falls",
        type: "scenic",
        rating: 4.6,
        description: "A gorgeous multi-tiered waterfall cascading down raw granite mountain walls in Ella's wild valley pass.",
        lat: 6.8411,
        lng: 81.0550,
        stationId: "ella"
      },
      {
        id: "poi-st-clairs",
        name: "St. Clair's Falls",
        type: "scenic",
        rating: 4.7,
        description: "Known as the Little Niagara of Sri Lanka, this wide waterfall cascades beautifully over multiple terraces in the tea mountains.",
        lat: 6.9367,
        lng: 80.6353,
        stationId: "nanu-oya"
      },
      {
        id: "poi-world-end",
        name: "World's End Cliff View",
        type: "viewpoint",
        rating: 4.9,
        description: "A sheer precipice with a terrifying and beautiful 880-meter vertical drop, overlooking villages and coastal lakes below.",
        lat: 6.8028,
        lng: 80.8028,
        stationId: "pattipola"
      }
    ]
  },
  {
    id: "ocean",
    name: "Coastal Ocean Line",
    displayName: "The Coastal Surf & Sunset Express",
    color: "#2C6B50", // deep green / ocean vibe
    description: "The breathtaking marine rail route that runs mere inches from the roaring rollers and golden beaches of the Indian Ocean.",
    longDescription: "Dashing along the South Coast, the Coastal Ocean Line starts at Colombo Fort and tracks south through the historical resort beaches of Hikkaduwa, Galle's 17th-century UNESCO Fortress, the whale-watching port of Mirissa, and ends in Matara. It is famous for sea spray blowing through open carriage windows and magnificent tropical sunsets.",
    distance: 161,
    duration: "3.5 hrs",
    vibe: "Tropical, Salty, Sunny & High-Energy",
    tags: ["Ocean Spray", "Surfers", "Colonial Forts", "Whales"],
    image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1200",
    stations: [
      {
        id: "colombo-fort-coastal",
        name: "Colombo Fort",
        distance: 0,
        elevation: 5,
        arrivalTime: "06:50 AM",
        stopTime: "Origin",
        weather: "Humid & Sunny (30°C)",
        photoSpots: ["Heritage Platforms"],
        attractions: ["Colombo Galle Face Green"],
        lat: 6.9332,
        lng: 79.8499
      },
      {
        id: "mount-lavinia",
        name: "Mount Lavinia",
        distance: 12,
        elevation: 8,
        arrivalTime: "07:12 AM",
        stopTime: "2 mins",
        weather: "Breezy Shore (29°C)",
        photoSpots: ["Golden Sands Curve", "Mount Lavinia Heritage Hotel"],
        attractions: ["Mount Lavinia Sandy Beach", "Seaside Seafood Shacks"],
        lat: 6.8361,
        lng: 79.8631
      },
      {
        id: "hikkaduwa",
        name: "Hikkaduwa",
        distance: 98,
        elevation: 6,
        arrivalTime: "08:45 AM",
        stopTime: "3 mins",
        weather: "Bright Coast (30°C)",
        photoSpots: ["Surfbreaks from train", "Palm groves flanking track"],
        attractions: ["Coral Reef Snorkeling", "Marine Turtle Sanctuary"],
        lat: 6.1396,
        lng: 80.1062
      },
      {
        id: "galle",
        name: "Galle Fort",
        distance: 116,
        elevation: 7,
        arrivalTime: "09:15 AM",
        stopTime: "10 mins",
        weather: "Brilliant Ocean Spray (28°C)",
        photoSpots: ["Classic White Lighthouse walk", "Red tile rooftops from fort walls"],
        attractions: ["UNESCO Galle Fort", "Dutch Reformed Church", "Maritime Museum"],
        lat: 6.0336,
        lng: 80.2181
      },
      {
        id: "weligama",
        name: "Weligama (Surf Capital)",
        distance: 144,
        elevation: 6,
        arrivalTime: "09:55 AM",
        stopTime: "2 mins",
        weather: "Warm & Wave-Swept (29°C)",
        photoSpots: ["Stilt Fishermen in surf", "Weligama Sandy Crescent Bay"],
        attractions: ["Beginner Surf beaches", "Taprobane Island Luxury Estate"],
        lat: 5.9722,
        lng: 80.4286
      },
      {
        id: "mirissa",
        name: "Mirissa",
        distance: 150,
        elevation: 5,
        arrivalTime: "10:08 AM",
        stopTime: "2 mins",
        weather: "Sunny Tropical (29°C)",
        photoSpots: ["Coconut Tree Hill view", "Fishermen harbor colors"],
        attractions: ["Blue Whale Boat Safaris", "Parrot Rock Tide pools"],
        lat: 5.9483,
        lng: 80.4578
      },
      {
        id: "matara",
        name: "Matara Terminal",
        distance: 161,
        elevation: 5,
        arrivalTime: "10:30 AM",
        stopTime: "Terminal",
        weather: "Breezy & Sunny (29°C)",
        photoSpots: ["Polhena Beach views", "Dutch Star Fort ramparts"],
        attractions: ["Weherahena Temple Giant Buddha", "Nilwala River Crocodile boat"],
        lat: 5.9501,
        lng: 80.5435
      }
    ],
    pois: [
      {
        id: "poi-amangalla",
        name: "Amangalla Galle Fort",
        type: "hotel",
        rating: 5.0,
        description: "Ultra-luxury hotel inside a 300-year-old Dutch colonial mansion, featuring vintage high ceilings, polished jackwood, and grand verandas.",
        lat: 6.0264,
        lng: 80.2185,
        stationId: "galle"
      },
      {
        id: "poi-cape-weligama",
        name: "Cape Weligama Cliff Resort",
        type: "hotel",
        rating: 4.9,
        description: "Bespoke clifftop resort overlooking the roaring waves, featuring massive private villas and a crescent-shaped infinity pool.",
        lat: 5.9689,
        lng: 80.4182,
        stationId: "weligama"
      },
      {
        id: "poi-pedlars",
        name: "Pedlar's Inn Cafe",
        type: "restaurant",
        rating: 4.6,
        description: "Galle Fort's original artisan bistro, set in a historic Dutch merchant house, serving gorgeous lobster pasta and gelato.",
        lat: 6.0268,
        lng: 80.2188,
        stationId: "galle"
      },
      {
        id: "poi-coconut-hill",
        name: "Coconut Tree Hill",
        type: "viewpoint",
        rating: 4.8,
        description: "An incredibly photogenic red-clay headland densely covered in tilting coconut trees framing the azure waters of Mirissa.",
        lat: 5.9472,
        lng: 80.4611,
        stationId: "mirissa"
      },
      {
        id: "poi-stilt-fishermen",
        name: "Koggala Stilt Fishermen Spot",
        type: "scenic",
        rating: 4.5,
        description: "The iconic spot where traditional fishermen balance perfectly on wooden poles driven deep into the coral reef to catch spotted herrings.",
        lat: 5.9922,
        lng: 80.3952,
        stationId: "weligama"
      }
    ]
  },
  {
    id: "northern",
    name: "Northern Heritage Line",
    displayName: "The Northern Cultural Express (Yarl Devi)",
    color: "#2C6B50", // Deep forest green
    description: "The historical express railway bridging the capital with the vibrant Hindu temples, palm deserts, and lagoon bridges of the north.",
    longDescription: "The Northern Line is a majestic crossing that leaves the wet tropical plains of Colombo, cutting straight through the archaeological heartlands of Anuradhapura (UNESCO Sacred Stupas), traversing the historic dry plains, crossing the marshy Elephant Pass salt pans, and culminating in the colorful, mango-scented, historical Jaffna peninsula.",
    distance: 402,
    duration: "6.5 hrs",
    vibe: "Spiritual, Historical, Serene & Expansive",
    tags: ["Ancient Ruins", "Sacred Stupas", "Hindu Temples", "Salt Lagoons"],
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=1200",
    stations: [
      {
        id: "colombo-fort-north",
        name: "Colombo Fort",
        distance: 0,
        elevation: 5,
        arrivalTime: "06:30 AM",
        stopTime: "Origin",
        weather: "Humid & Bright (30°C)",
        photoSpots: ["Platform arches"],
        attractions: ["National Museum of Colombo"],
        lat: 6.9332,
        lng: 79.8499
      },
      {
        id: "kurunegala",
        name: "Kurunegala",
        distance: 94,
        elevation: 116,
        arrivalTime: "08:15 AM",
        stopTime: "3 mins",
        weather: "Warm Inland Vibe (31°C)",
        photoSpots: ["Elephant Rock backdrop", "Lush paddy fields"],
        attractions: ["Athugala Giant Buddha Statue", "Kurunegala Lake Walk"],
        lat: 7.4863,
        lng: 80.3647
      },
      {
        id: "anuradhapura-town",
        name: "Anuradhapura",
        distance: 204,
        elevation: 81,
        arrivalTime: "10:10 AM",
        stopTime: "8 mins",
        weather: "Hot & Golden sunshine (33°C)",
        photoSpots: ["Distant white dome stupas", "Vast heritage reservoirs"],
        attractions: ["Ruwanwelisaya Sacred Stupa", "Jaya Sri Maha Bodhi Sacred Tree", "Isurumuniya Lovers stone carving"],
        lat: 8.3122,
        lng: 80.4131
      },
      {
        id: "vavuniya",
        name: "Vavuniya",
        distance: 258,
        elevation: 94,
        arrivalTime: "11:15 AM",
        stopTime: "3 mins",
        weather: "Dry northern wind (32°C)",
        photoSpots: ["Vavuniya Lake line", "Traditional water wells"],
        attractions: ["Kandasaamy Kovil Temple", "Madukanda Buddhist Temple"],
        lat: 8.7514,
        lng: 80.4972
      },
      {
        id: "elephant-pass",
        name: "Elephant Pass Gate",
        distance: 352,
        elevation: 4,
        arrivalTime: "12:30 PM",
        stopTime: "2 mins",
        weather: "Windy Lagoon Flat (33°C)",
        photoSpots: ["Salt Lagoon causeway", "Elephant Pass War Memorial"],
        attractions: ["Chundikulam Lagoon Wildlife Park", "Elephant Pass causeway drive"],
        lat: 9.5194,
        lng: 80.4022
      },
      {
        id: "jaffna-central",
        name: "Jaffna Town",
        distance: 402,
        elevation: 6,
        arrivalTime: "01:15 PM",
        stopTime: "Terminal",
        weather: "Dry desert-like heat (34°C)",
        photoSpots: ["Vibrant blue & gold station building", "Tall Palmyra palm forests"],
        attractions: ["Nallur Kandaswamy Giant Hindu Kovil", "Jaffna Fort Historic Battlements", "Casuarina Beach shallow waters"],
        lat: 9.6684,
        lng: 80.0211
      }
    ],
    pois: [
      {
        id: "poi-jetwing-jaffna",
        name: "Jetwing Jaffna Luxury Hotel",
        type: "hotel",
        rating: 4.7,
        description: "The city's tallest modern hotel, offering stunning rooftop views of the peninsula and spectacular fusion Tamil cuisine.",
        lat: 9.6642,
        lng: 80.0163,
        stationId: "jaffna-central"
      },
      {
        id: "poi-heritage-hotel",
        name: "The Heritage Hotel Anuradhapura",
        type: "hotel",
        rating: 4.5,
        description: "Set amidst ancient gardens and holy reservoirs, offering luxury stays for archaeological pilgrims.",
        lat: 8.3242,
        lng: 80.4055,
        stationId: "anuradhapura-town"
      },
      {
        id: "poi-nallur-kovil",
        name: "Nallur Kandaswamy Kovil",
        type: "scenic",
        rating: 5.0,
        description: "A spectacular, massive Hindu temple with a towering golden gopuram, featuring brilliant Murugan shrines and intense spiritual rituals.",
        lat: 9.6744,
        lng: 80.0298,
        stationId: "jaffna-central"
      },
      {
        id: "poi-ruwanwelisaya",
        name: "Ruwanwelisaya Sacred Stupa",
        type: "scenic",
        rating: 4.9,
        description: "One of the world's tallest monuments built in 140 BC, featuring a breathtaking white hemisphere guarded by a wall of 344 sculpted elephants.",
        lat: 8.3503,
        lng: 80.3961,
        stationId: "anuradhapura-town"
      }
    ]
  }
];
