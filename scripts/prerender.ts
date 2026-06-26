import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { activities } from "../src/data/activities";
import { seoArticles } from "../src/data/seoArticles";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");
const indexPath = path.join(distPath, "index.html");

interface PrerenderPage {
  path: string;
  title: string;
  description: string;
  image: string;
  ogType: string;
  canonicalUrl: string;
  bodyHtml: string;
  schemas: string[];
}

function generatePrerenderPages(): PrerenderPage[] {
  const pages: PrerenderPage[] = [];
  const domain = "https://plan-srilanka.com";

  // 1. Homepage
  pages.push({
    path: "/",
    title: "Plan Sri Lanka | Curated Luxury Travel & Bespoke Vibe Tours",
    description: "An exclusive travel concierge for high-net-worth individuals and families seeking extraordinary, tailored journeys across the majestic landscapes of Sri Lanka.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200",
    ogType: "website",
    canonicalUrl: `${domain}/`,
    bodyHtml: `
      <header>
        <h1>Plan Sri Lanka | Curated Luxury Travel & Bespoke Vibe Tours</h1>
        <p><strong>An exclusive travel concierge for high-net-worth individuals and families seeking extraordinary, tailored journeys across the majestic landscapes of Sri Lanka.</strong></p>
      </header>
      <section>
        <h2>Bespoke Curated Experiences</h2>
        <ul>
          <li><strong>Vibe Tour Sri Lanka</strong> - Elite luxury coastal getaway and customized family discovery sessions from Colombo Marina.</li>
          <li><strong>Cultural Triangle</strong> - Explore ancient cave temples, lion rock fortress, and sacred relics with private English-fluent guides.</li>
          <li><strong>Tea Country & Misty Highlands</strong> - Scenic train rides, colonial bungalows, and walks through emerald estates in Hatton and Ella.</li>
          <li><strong>Wildlife Safari</strong> - Spot wild leopards, Asian elephants, and exotic birds in private custom-built 4x4 safaris inside Yala and Wilpattu.</li>
        </ul>
      </section>
    `,
    schemas: [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Plan Sri Lanka",
        "url": domain,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${domain}/sri-lanka-trip-planner?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }, null, 2),
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Plan Sri Lanka",
        "url": domain,
        "logo": `${domain}/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "adithyaoshada7@gmail.com"
        }
      }, null, 2)
    ]
  });

  // 2. SEO Articles (from the shared list)
  const defaultArticleBodies: Record<string, string> = {
    "/sri-lanka-trip-cost-from-india": `
      <header>
        <h1>Sri Lanka Trip Cost From India (2026 Guide)</h1>
        <p><strong>Discover the complete Sri Lanka trip cost from India. Compare budget, mid-range and luxury travel costs, flights, hotels, visa fees and use our free trip budget calculator.</strong></p>
      </header>
      
      <section>
        <h2>How Much Does a Sri Lanka Trip Cost From India? (Quick Answer)</h2>
        <p>On average, a <strong>7-day comforting Sri Lanka trip from India</strong> costs about <strong>₹45,000 to ₹65,000 per traveler</strong>. Standard costs are divided by traveler dynamics:</p>
        <ul>
          <li><strong>Budget Traveler:</strong> ₹25,000 – ₹40,000</li>
          <li><strong>Couple:</strong> ₹80,000 – ₹120,000</li>
          <li><strong>Family:</strong> ₹150,000 – ₹250,000</li>
          <li><strong>Luxury:</strong> ₹150,000+</li>
        </ul>
      </section>

      <section>
        <h2>Sri Lanka Trip Cost in Indian Rupees</h2>
        <p>Depending on your comfort styles, standard land expenses are split into specific Indian Rupees (INR) divisions:</p>
        <table>
          <thead>
            <tr>
              <th>Travel Style Category</th>
              <th>Solo Traveler</th>
              <th>Couple Total</th>
              <th>Family of 4</th>
              <th>Luxury Comfort</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Round Flights (Direct)</strong></td>
              <td>₹11,000 - ₹18,000</td>
              <td>₹22,000 - ₹36,000</td>
              <td>₹44,000 - ₹72,000</td>
              <td>₹75,000+</td>
            </tr>
            <tr>
              <td><strong>Boutique Hotels (Daily)</strong></td>
              <td>₹1,500 - ₹3,000</td>
              <td>₹5,000 - ₹10,000</td>
              <td>₹11,000 - ₹18,000</td>
              <td>₹25,000 - ₹80,000+</td>
            </tr>
            <tr>
              <td><strong>Daily Meals & Dining</strong></td>
              <td>₹800 - ₹1,200</td>
              <td>₹2,000 - ₹4,000</td>
              <td>₹4,000 - ₹8,000</td>
              <td>₹10,000 - ₹20,000+</td>
            </tr>
            <tr>
              <td><strong>Private AC Chauffeur Sedan</strong></td>
              <td>Local transport (₹500)</td>
              <td>Chauffeur (₹4,500)</td>
              <td>Spacious Van (₹6,000)</td>
              <td>Premium SUV (₹14,000)</td>
            </tr>
            <tr>
              <td><strong>Landmarks & Admissions</strong></td>
              <td>₹3,000</td>
              <td>₹12,000</td>
              <td>₹24,000</td>
              <td>₹50,000+</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>India to Sri Lanka Trip Cost by Departure City</h2>
        <p>Your departure city plays an essential role in your total India to Sri Lanka trip cost structure:</p>
        
        <h3>Chennai to Sri Lanka Cost</h3>
        <p>Chennai offers the most affordable flights to Sri Lanka, starting at ₹9,000 - ₹12,000 for direct round trips. Average comfort 7-day budget starts near ₹30,000 including local heritage stays.</p>
        
        <h3>Mumbai to Sri Lanka Cost</h3>
        <p>Flights from Mumbai represent standard western corridor rates ranging from ₹18,000 - ₹24,000 for non-stop flights. Comfortable 7-day budget begins around ₹45,000.</p>
        
        <h3>Delhi to Sri Lanka Cost</h3>
        <p>Flights from Delhi represent the northern sector with round trips at ₹19,000 - ₹28,000. Under comfortable parameters, expect a total budget of ₹48,000 per person.</p>
        
        <h3>Bangalore to Sri Lanka Cost</h3>
        <p>Direct routes from Bangalore typically range from ₹11,000 to ₹14,000 round trip. Comfortable 7-day budget sits at ₹32,000 per seat.</p>
        
        <h3>Hyderabad to Sri Lanka Cost</h3>
        <p>Round trips from Hyderabad cost about ₹14,000 - ₹19,000. Comfortable budget parameters start at ₹36,000 per traveler.</p>
      </section>

      <section>
        <h2>What Makes Up Your Sri Lanka Travel Budget?</h2>
        <p>Your overall vacation budget is shaped by these specific ratios and segments:</p>
        <ul>
          <li><strong>Flights:</strong> Standard round trips from India (30% - 35% of total budget)</li>
          <li><strong>Visa:</strong> Electronic Travel Authorization ETA (2% - 4% of total budget; waived to ₹0 dynamically during promotions)</li>
          <li><strong>Hotels:</strong> Dynamic boutiques & heritage villas with pool (25% - 30% of total budget)</li>
          <li><strong>Food & Culinary:</strong> Local street food eats and beachside seafood dining (12% - 15% of total budget)</li>
          <li><strong>Transport & Chauffeurs:</strong> Dedicated private AC vehicle with an English-fluent driver guide (15% - 20% of total budget)</li>
          <li><strong>Activities:</strong> Sigiriya, Yala Safaris, Mirissa Whales, trains (8% - 12% of total budget)</li>
        </ul>
      </section>

      <section>
        <h2>Sri Lanka Visa Cost for Indians</h2>
        <p>The standard <strong>Sri Lanka Visa Cost for Indians</strong> is usually <strong>$20 USD (approx. ₹1,660)</strong> for a 30-day double-entry Electronic Travel Authorization (ETA). However, Sri Lanka periodically offers completely free visa waiver schemes for Indian tourists, reducing the visa fee to <strong>₹0</strong>.</p>
        <ul>
          <li><strong>Standard Online ETA Visa Fee:</strong> $20 USD (~₹1,660) with 24-hour processing</li>
          <li><strong>Bilateral Fee Waiver Promotions:</strong> ₹0 (Zero Fee) during promotional tourism campaigns</li>
        </ul>
      </section>

      <section>
        <h2>Suggested 7 Day Sri Lanka Itinerary</h2>
        <p>Follow our highly optimized 7-day route map for Indian tourists (Best Itinerary for Sri Lanka for 7 Days):</p>
        <ul>
          <li><strong>Day 1 Colombo Arrival:</strong> Transfer straight to a comfortable sea view beach resort and trial traditional clay hoppers.</li>
          <li><strong>Day 2 Sigiriya Cultural Citadel:</strong> Climb the ancient UNESCO Sigiriya Lion Rock Fortress.</li>
          <li><strong>Day 3 Kandy Hill Sanctuary:</strong> Pay respects at Kandy Temple of the Tooth Relic.</li>
          <li><strong>Day 4 Nuwara Eliya Highlands:</strong> Tea estate plantation tour & mist-shrouded green waterfalls.</li>
          <li><strong>Day 5 Ella Scenic Train:</strong> Board the world-famous Kandy-Ella scenic train passing Nine Arch Bridge.</li>
          <li><strong>Day 6 Yala wild Safari or Mirissa sunset beaches:</strong> Gold sand beaches, Coconut Tree Hill or wildlife leopard tracking.</li>
          <li><strong>Day 7 Galle Colonial White Fort & Departure:</strong> Beautiful white-washed 17th-century Galle Dutch Fort lighthouse and evening flight return.</li>
        </ul>
        <p><a href="/sri-lanka-7-day-itinerary">Read Full Sri Lanka 7 Day Itinerary</a></p>
      </section>

      <section>
        <h2>Sri Lanka Trip Cost for Different Travelers</h2>
        <p>Different traveler demographics require distinct budget styles:</p>
        <h3>Solo Travelers</h3>
        <p>Expect a total expense of ₹25,000 - ₹40,000 by taking local trains and spending on boutique local guesthouses.</p>
        <h3>Couples Travel</h3>
        <p>An amazing comfort honeymoon loop runs around ₹80,000 - ₹120,000 per couple, using romantic private villas and dedicated AC chauffeured guides.</p>
        <h3>Families Group</h3>
        <p>Spacious multi-bedroom resorts and comfortable van transport total around ₹150,000 - ₹250,000 for 4 people.</p>
      </section>

      <section>
        <h2>Best Time to Visit Sri Lanka for Indian Travelers</h2>
        <p>Plan smart to maximize sunshine and avoid rainy seasons. The Southwest coast (Galle, Hikkaduwa, Mirissa) shines from December to April. The East Coast (Trincomalee, Arugam Bay) remains beautiful from May to September. Opting for shoulder periods like September-October or April can save you up to 30% on heritage hotels and private guides.</p>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        <p><strong>Is Sri Lanka expensive for Indian tourists?</strong><br/>No, Sri Lanka is highly affordable and budget-friendly for Indian travelers compared to other international beach destinations. Land costs, local transport, hotels, and delicious dining are extremely reasonable in Indian Rupees.</p>
        <p><strong>How much is Sri Lanka visa fee in Indian Rupees?</strong><br/>The standard ETA fee is $20 USD (approx. ₹1,660). If you travel during active bilateral visa-free campaigns, the fee is completely waived to ₹0.</p>
        <p><strong>Is Bangalore or Chennai cheaper to fly to Sri Lanka?</strong><br/>Chennai offers the most economical flight connections to Colombo, often starting around ₹9,000 - ₹12,000 round-trip.</p>
      </section>
    `,
    "/sri-lanka-7-day-itinerary": `
      <header>
        <h1>Sri Lanka 7-Day Itinerary: The Perfect Route for First-Time Visitors</h1>
        <p><strong>Planning your first trip to Sri Lanka? Follow this optimized 7-day itinerary with daily routes, travel times, estimated costs, interactive maps, and a free customizable trip planner.</strong></p>
      </header>
      <section>
        <h2>The Perfect 7-Day Day-by-Day Route</h2>
        <ul>
          <li><strong>Day 1: Arrive in Negombo</strong> - Sandy Beaches, lagoon catamarans, and rapid rest right next to the airport.</li>
          <li><strong>Day 2: Cultural Triangle via Dambulla</strong> - Golden Rock Cave Temple exploration and a sunset hike up Pidurangala Rock.</li>
          <li><strong>Day 3: Sigiriya Lion Rock to Kandy</strong> - Climb the iconic ancient Sky Fortress rules early in the morning and tour the Tooth Temple.</li>
          <li><strong>Day 4: Highland Blue Train to Ella</strong> - Board the world-famous blue train running through emerald tea fields and walk Nine Arch Bridge.</li>
          <li><strong>Day 5: Ella Ridge Hiking & Yala Safari</strong> - Sunrise climb of Little Adam's Peak, drop down Ella Gap, and safari in Yala to find wild leopards.</li>
          <li><strong>Day 6: Galle Fort Colonial Walk</strong> - Wander coastal fishing towns, capture sunset views from Utrecht Bastion, and rest inside Galle's historic 17th-century rampart hotels.</li>
          <li><strong>Day 7: Colombo Hub Souvenirs & Departures</strong> - Souvenirs in premium boutiques, giant lagoon mud crab eating at Ministry of Crab, and expressway transition to CMB.</li>
        </ul>
      </section>
    `,
    "/how-much-will-it-take-to-visit-sri-lanka-from-chennai": `
      <header>
        <h1>How Much Will It Cost to Visit Sri Lanka From Chennai? | Budget Guide</h1>
        <p><strong>Find the real cost of visiting Sri Lanka from Chennai. Compare 5-day, 7-day, family and honeymoon budgets, flight prices, hotels and transport costs.</strong></p>
      </header>

      <section>
        <h2>Quick Answer (Featured Snippet Guide)</h2>
        <p>Planning travel from Chennai (MAA) to Sri Lanka (CMB)? A <strong>5-day budget trip starts from ₹25,000 to ₹40,000 per person</strong>. Couples seeking a comfortable <strong>mid-range boutique experience spend ₹45,000 to ₹75,000</strong>, and premium <strong>luxury trips cost ₹90,000+ per traveler</strong>.</p>
        
        <table>
          <thead>
            <tr>
              <th>Trip Type</th>
              <th>Estimated Cost (5 Days / Person)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Budget (5 Days)</strong></td>
              <td>₹25,000 - ₹40,000</td>
            </tr>
            <tr>
              <td><strong>Mid-range (5 Days)</strong></td>
              <td>₹45,000 - ₹75,000</td>
            </tr>
            <tr>
              <td><strong>Luxury (5 Days)</strong></td>
              <td>₹90,000+</td>
            </tr>
          </tbody>
        </table>

        <!-- Mid-page conversion CTA for Chennai readers -->
        <p><strong>Planning from Chennai? <a href="/sri-lanka-trip-planner">Get a free personalized Sri Lanka travel plan</a> tailored directly to your budget and interests.</strong></p>
      </section>

      <section>
        <h2>Sri Lanka Trip Cost From Chennai Breakdown</h2>
        <p>Your overall <strong>sri lanka travel cost from chennai</strong> splits cleanly into five main areas:</p>
        <ul>
          <li><strong>Flights:</strong> ₹10,000 - ₹18,000 for standard direct round trips.</li>
          <li><strong>Hotels:</strong> ₹3,500 - ₹12,000+ per night depending on boutique settings.</li>
          <li><strong>Food:</strong> Local organic hoppers (₹150) to high-end fresh ocean crab (₹1,500).</li>
          <li><strong>Transport:</strong> Local trains, PickMe app tuk-tuks, or secure private AC sedans with driver guides.</li>
          <li><strong>Activities:</strong> Sigiriya Fortress climbs, wildlife safaris, and tea country excursions.</li>
        </ul>
      </section>

      <section>
        <h2>Chennai to Sri Lanka Distance</h2>
        <p>When planning a trip, understanding the geographical proximity makes the journey feel even closer. The actual physical distance between Chennai and Sri Lanka is incredibly short, making it quicker to reach than many domestic Indian destinations.</p>
        <table>
          <thead>
            <tr>
              <th>Route</th>
              <th>Distance</th>
              <th>Flight Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chennai to Colombo</td>
              <td>650 km</td>
              <td>1h 20m</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Chennai to Sri Lanka Flight Cost</h2>
        <p>The <strong>chennai to colombo flight cost</strong> represents the most economical international aviation routes from India. Non-stop flights take just about 80 minutes to land at Colombo. Regular airlines include IndiGo and SriLankan Airlines, and the <strong>cheapest flights from chennai to sri lanka</strong> can be secured online around 60 days ahead for as low as <strong>₹10,500 to ₹12,500</strong>. Last-minute searches or peak holiday seasons can elevate the <strong>chennai to colombo airfare</strong> to ₹22,000+.</p>
        <p>You can also consider our growing overland route via Alliance Air running direct from Chennai (MAA) to Jaffna (JAF) Airport, followed by a scenic speed-train connection down to Colombo.</p>
      </section>

      <section>
        <h2>5 Day Sri Lanka Trip Cost From Chennai</h2>
        <p>Your realistic <strong>5 day sri lanka trip cost from chennai</strong> depends heavily on your choice of accommodation and transit. A basic budget format costs around <strong>₹25,000 - ₹34,000 per person</strong>, using high-rated local guest villas, local train tracks, and delicious roadside hoppers. A comfortable mid-range journey starting around <strong>₹45,000 - ₹62,000</strong> secures 3/4-star hotels with pools and a continuous, dedicated private chauffeured vehicle.</p>
      </section>

      <section>
        <h2>7 Day Sri Lanka Trip Cost From Chennai</h2>
        <p>First-time visitors typically spend 7 days to cover the classic travel loop: <strong>Colombo → Sigiriya Fortress → Nuwara Eliya → Highlands of Ella → Galle Fort → Colombo</strong>. The total <strong>sri lanka tour cost from chennai</strong> for a 7-day comfortable couple vacation averages <strong>₹75,000 dual total</strong>. Backpacker solo travelers spending on boutique homestays and public commutes can easily experience this 7-day loop for <strong>₹33,000 net</strong>.</p>
      </section>

      <section>
        <h2>Sri Lanka Family Trip Cost From Chennai</h2>
        <p>The <strong>sri lanka family trip cost from chennai</strong> represents outstanding value for Indian families. A family of 4 can experience a wonderful 7-day vacation with a spacious private AC van, child-friendly boutique hotel suites, and safe meals for under <strong>₹1,60,000 to ₹2,10,000</strong>. Standard flight tracks are short, minimizing kid-friendly travel tiredness.</p>
      </section>

      <section>
        <h2>Sri Lanka Honeymoon Package Cost From Chennai</h2>
        <p>A romantic <strong>sri lanka honeymoon package from chennai</strong> delivers extreme value. For about <strong>₹95,000 to ₹1,40,000 per couple</strong>, you can secure private oceanfront plunge pool villas, candlelit beach dinners, couples' spa therapies, and beautiful tea-estate plantation lodging.</p>
      </section>

      <section>
        <h2>Best 7-Day Sri Lanka Itinerary From Chennai</h2>
        <p>Since direct flights out of Anna International Airport (MAA) land in Colombo in only 80 minutes, you can maximize your 7-day tour with this highly optimized layout:</p>
        <ul>
          <li><strong>Day 1: Arrival & Ocean Sunset</strong> - Touch down at CMB, check into a relaxing ocean pool villa in Bentota, and watch golden sunset tides.</li>
          <li><strong>Day 2: Climb Sigiriya Lion Rock</strong> - Private transfer to the Cultural Triangle to ascend the legendary fortress ruins.</li>
          <li><strong>Day 3: Royal Kandy Botanic Walk</strong> - Settle in Kandy, explore the sacred Temple of the Tooth Relic, and stroll botanical gardens.</li>
          <li><strong>Day 4: Highland Blue Train ride</strong> - Climb past waterfalls on the scenic colonial railway line up to green Ella peaks.</li>
          <li><strong>Day 5: Icon Hikes & Little Adam’s Peak</strong> - Photography on the Nine Arch Bridge, hike Little Adam's Peak, and drive down to Southern Weligama beaches.</li>
          <li><strong>Day 6: UNESCO Galle Fort Colonial Ramparts</strong> - Savor boutique shopping, colonial Dutch heritage architectures, and beautiful ocean bastions.</li>
          <li><strong>Day 7: Colombo Souvenirs & Flight back to Chennai</strong> - Load up on premium dilmah tea, handlooms, and board your evening short flight home.</li>
        </ul>
      </section>

      <section>
        <h2>Best Time to Visit Sri Lanka From Chennai</h2>
        <p>The climate of Sri Lanka is characterized by a "dual monsoon" cycle, meaning different sides of the island experience perfect weather at different periods of the year. This weather profile is ideal for travelers escaping the intense Chennai summer or looking for cool winter breaks.</p>
        <p>Chennai travelers have a unique planning advantage: since the flight duration is just about 1 hour 20 minutes, any weekend, national holiday, or major festival such as Pongal, Diwali, or summer school vacations can be seamlessly transformed into a tropical escape. By matching your travel dates with the right side of the island (the West/South coast from December to April, or the East coast from May to September), you can guarantee a perfect, sun-kissed vacation without worrying about heavy rains.</p>
        <ul>
          <li><strong>Winter Season (December to April):</strong> Ideal for Galle, Hikkaduwa, Weligama beach surf and cold central hill country peaks.</li>
          <li><strong>Summer Season (May to September):</strong> Ideal for Chennai's school vacations—enjoy dry, sunny conditions along Trincomalee, Nilaveli, and historical ancient ruins.</li>
        </ul>
      </section>

      <section>
        <h2>Chennai to Colombo Flight Schedule Guide</h2>
        <p>Daily connectivity makes Sri Lanka exceptionally easy to reach from Tamil Nadu. Key schedule carriers include:</p>
        <ul>
          <li><strong>IndiGo:</strong> Regular high-frequency flights with excellent morning and late evening timetables.</li>
          <li><strong>SriLankan Airlines:</strong> Premium global carrier offering comfortable widebody configurations and hot meals.</li>
          <li><strong>Alliance Air:</strong> Convenient flights operating direct from Chennai to Jaffna in northern Sri Lanka.</li>
        </ul>
      </section>

      <section>
        <h2>How To Reduce Your Sri Lanka Travel Cost</h2>
        <p>Avoid expensive pitfalls by utilizing these veteran-tested savings guidelines:</p>
        <ul>
          <li><strong>Use PickMe App:</strong> Avoid casual unmetered tuk-tuks. Always hail via PickMe or Uber for legal metered rates.</li>
          <li><strong>Carry Physical Cash:</strong> Bring physical Indian Rupees (₹500 notes) and convert them at airport exchange desks. Standard credit card transactions incur heavy international markup and transaction gateway commissions.</li>
          <li><strong>Book Trains Early:</strong> 1st and 2nd class train seats on the scenic Ella lines sell out quick. Secure them online 30 days ahead to bypass street scalpers overcharging 4x prices.</li>
          <li><strong>Curated Internal Links:</strong> Read our complete guide profiles at <a href="/sri-lanka-trip-cost-from-india">Sri Lanka Trip Cost From India</a>, check out the optimized day-by-day maps at <a href="/sri-lanka-7-day-itinerary">Sri Lanka 7 Day Itinerary</a>, learn about easy online applications via our <a href="/sri-lanka-visa-for-indians">Sri Lanka Visa for Indians</a> handbook, or calculate custom expenses coordinates at <a href="/sri-lanka-trip-planner">Sri Lanka Trip Planner</a>.</li>
        </ul>
      </section>

      <section>
        <h2>Frequently Asked Questions (Chennai Route FAQs)</h2>
        <ul>
          <li><strong>Is Sri Lanka cheaper than Maldives for Chennai travelers?</strong> Yes. A simple 4-night overwater villa in the Maldives starts at ₹1,50,000+ per couple. In contrast, you can enjoy a full 7-day private tour experience with boutique beach escapes in Sri Lanka for under ₹75,000 total per couple, flights from MAA included.</li>
          <li><strong>How much money should I carry from Chennai to Sri Lanka?</strong> We propose taking around ₹15,000 to ₹25,000 in physical Indian Rupees (as crisp ₹500 bills) per traveler to convert at CMB airport desks. This feeds cash-only street cafes and local tuk-tuks, while card facilities handle premium stays.</li>
          <li><strong>Is 5 days enough for Sri Lanka?</strong> Yes. 5 days is highly sufficient for a targeted 'coastal escape' (covering Colombo, Bentota, and UNESCO Galle Fort). For full hill-country tours (Ella, Nuwara Eliya), we advise dedicating a 7-day slot.</li>
          <li><strong>What is the cheapest month to visit Sri Lanka from Chennai?</strong> September and October offer the lowest flight outlays and off-season resort promotions, allowing you to save up to 40% on standard luxury hotel costs.</li>
        </ul>
        <p><strong>CTA Option:</strong> Click to <a href="/sri-lanka-trip-planner">Get Your Free Sri Lanka Travel Plan</a> instantly!</p>
      </section>
    `
  };

  seoArticles.forEach(art => {
    // Skip if path equals "/" to avoid redundancy (handled manually above)
    if (art.path === "/") return;

    let bodyHtml = defaultArticleBodies[art.path] || `
      <header>
        <h1>${art.title}</h1>
        <p><strong>${art.description}</strong></p>
      </header>
      <section>
        <h2>Essential Guides & Contextual Frameworks</h2>
        <p>Planning travel to Sri Lanka from India involves careful consideration of climate patterns, regional transport nodes, and curated hotel inventory. Read our active guide resources to plan your perfect vacation.</p>
      </section>
    `;

    const schemas = [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": art.title,
        "description": art.description,
        "image": art.image,
        "author": {
          "@type": "Person",
          "name": "Adithya Oshada",
          "jobTitle": "Local Travel Planner"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Plan Sri Lanka",
          "logo": {
            "@type": "ImageObject",
            "url": `${domain}/logo.png`
          }
        },
        "datePublished": "2026-02-10T08:00:00Z",
        "dateModified": "2026-06-19T10:00:00Z"
      }, null, 2)
    ];

    if (art.path === "/sri-lanka-trip-cost-from-india") {
      schemas.push(
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${domain}`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Sri Lanka Trip Cost From India",
              "item": `${domain}/sri-lanka-trip-cost-from-india`
            }
          ]
        }, null, 2),
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Sri Lanka Trip Cost Estimator & Luxury Calculator (2026)",
          "description": "Real-time cost planning engine for Indian travelers. Computes flights, hotels, private tour guides, safari pricing, and localized chauffeur rates in Indian Rupees.",
          "brand": {
            "@type": "Brand",
            "name": "Plan Sri Lanka"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "25000",
            "highPrice": "150000",
            "offerCount": "100"
          }
        }, null, 2),
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much does a Sri Lanka trip cost from India?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "An average 7-day Sri Lanka comfort trip from India costs about ₹45,000 to ₹65,000 per traveler. Budget backpackers can complete the journey for ₹25,000 to ₹40,000 using public trains and guesthouses, while couples seeking premium boutique hotels range from ₹80,000 to ₹1,20,000 total. Custom luxury stays start at ₹1,50,000+ per traveler."
              }
            },
            {
              "@type": "Question",
              "name": "Is Sri Lanka cheaper than Thailand?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Sri Lanka is generally more wallet-friendly than Thailand for Indian tourists. Flight routes from southern Indian cities to Colombo are shorter and cheaper than flights to Bangkok. Additionally, hiring a private English-speaking chauffeur-driven AC car in Sri Lanka is almost half the price of equivalent private transports in Thailand or Bali."
              }
            },
            {
              "@type": "Question",
              "name": "Do Indians need a visa for Sri Lanka?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Indian passport holders need a valid ETA (Electronic Travel Authorization) visa standard for a 30-day stay. Sri Lanka regularly waives visa fees dynamically for Indian citizens as part of bilateral tourism booster campaigns (making it ₹0). When standard fees apply, it costs approximately $20 USD (₹1,660)."
              }
            },
            {
              "@type": "Question",
              "name": "Can I visit Sri Lanka under ₹50,000?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! A single traveler or budget couple can easily explore Sri Lanka under ₹50,000 per person. By starting from southern flight terminals like Chennai or Bangalore, choosing high-rated local guest villas (₹2,000/night), using localized train tracks, and eating standard Ceylon rice and curries, you can comfortably spend 7 action-packed days."
              }
            },
            {
              "@type": "Question",
              "name": "Which Indian city has the cheapest flights?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Chennai (MAA) offers the cheapest direct flight tickets to Sri Lanka, with round-trips regularly starting as low as ₹9,000 - ₹12,000. Bangalore (BLR) runs closely behind with options from ₹11,000 - ₹14,000. Flights from northern or western hubs like Delhi or Mumbai are slightly premium, running upwards of ₹18,050."
              }
            },
            {
              "@type": "Question",
              "name": "How much does a 7 day Sri Lanka trip cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A 7-day comfortable tour costs about ₹48,000 to ₹75,000 per person including round-trip flights, cozy boutique accommodations, a continuously available private vehicle with an English concierge driver, entry passes (Sigiriya, Temple of Tooth), and dining."
              }
            }
          ]
        }, null, 2)
      );
    }

    pages.push({
      path: art.path,
      title: art.title,
      description: art.description,
      image: art.image,
      ogType: art.ogType,
      canonicalUrl: `${domain}${art.path}`,
      bodyHtml: bodyHtml,
      schemas: schemas
    });
  });

  // 3. Dynamic experiences (from Activities)
  const legacyExperiences = [
    { slug: "cultural-triangle", title: "Cultural Triangle Luxury Experience", description: "Immerse in the heritage of Sri Lanka's ancient cities." },
    { slug: "tea-country", title: "Luxury Tea Country & Misty Highlands", description: "Discover the breathtaking tea plantations and colonial heritage of Nuwara Eliya." },
    { slug: "wildlife-safari", title: "Elite Wildlife Safari Experience", description: "Encounter legendary wildlife in Sri Lanka's premium national parks." }
  ];

  // Merge act and legacy experiences to form a complete list of Slugs
  const renderedSlugs = new Set<string>();

  activities.forEach(act => {
    renderedSlugs.add(act.slug);
    pages.push({
      path: `/experience/${act.slug}`,
      title: act.slug === "italian-vibe-tour"
        ? "Sri Lanka Tour Packages from India | Vibe Tour Sri Lanka"
        : `${act.title} | Plan Sri Lanka`,
      description: act.slug === "italian-vibe-tour"
        ? "Bespoke Sri Lanka travel and vacation packages from India. Experience the elite Vibe Tour Sri Lanka with curated itineraries, premium Colombo dining, and packages from Delhi/Mumbai."
        : act.description,
      image: act.image,
      ogType: "article",
      canonicalUrl: `${domain}/experience/${act.slug}`,
      bodyHtml: `
        <header>
          <h1>${act.title}</h1>
          <p><strong>${act.description}</strong></p>
        </header>
        <section>
          <h2>${act.subheading || "Activity Highlight"}</h2>
          <p>${act.longDescription}</p>
        </section>
      `,
      schemas: [
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": act.title,
          "description": act.description,
          "image": act.image,
          "brand": {
            "@type": "Brand",
            "name": "Plan Sri Lanka"
          }
        }, null, 2)
      ]
    });
  });

  legacyExperiences.forEach(leg => {
    if (renderedSlugs.has(leg.slug)) return;
    renderedSlugs.add(leg.slug);
    pages.push({
      path: `/experience/${leg.slug}`,
      title: `${leg.title} | Plan Sri Lanka`,
      description: leg.description,
      image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200",
      ogType: "article",
      canonicalUrl: `${domain}/experience/${leg.slug}`,
      bodyHtml: `
        <header>
          <h1>${leg.title}</h1>
          <p><strong>${leg.description}</strong></p>
        </header>
        <section>
         <h2>Discover Bespoke Itineraries</h2>
         <p>Contact our elite concierge desk to integrate this landmark into your master custom journey.</p>
        </section>
      `,
      schemas: []
    });
  });

  return pages;
}

function prerender() {
  console.log("[Prerender] Launching Static Site Generation (SSG)...");

  if (!fs.existsSync(indexPath)) {
    console.error(`[Prerender] Error: Base index.html does not exist at ${indexPath}. Please run "vite build" first!`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, "utf-8");
  const pages = generatePrerenderPages();

  pages.forEach(page => {
    console.log(`[Prerender] Generating static file for: "${page.path}"`);

    let template = baseHtml;

    // 1. Generate Metadata Block
    const metaTags = `
    <!-- Primary Meta Tags -->
    <title data-rh="true">${page.title}</title>
    <meta data-rh="true" name="title" content="${page.title}" />
    <meta data-rh="true" name="description" content="${page.description}" />
    <link data-rh="true" rel="canonical" href="${page.canonicalUrl}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta data-rh="true" property="og:type" content="${page.ogType}" />
    <meta data-rh="true" property="og:url" content="${page.canonicalUrl}" />
    <meta data-rh="true" property="og:title" content="${page.title}" />
    <meta data-rh="true" property="og:description" content="${page.description}" />
    <meta data-rh="true" property="og:image" content="${page.image}" />
    <meta data-rh="true" property="og:image:secure_url" content="${page.image}" />
    <meta data-rh="true" property="og:image:type" content="image/jpeg" />
    <meta data-rh="true" property="og:image:width" content="1200" />
    <meta data-rh="true" property="og:image:height" content="630" />
    <meta data-rh="true" property="og:image:alt" content="${page.title}" />
    <meta data-rh="true" property="og:site_name" content="Plan Sri Lanka" />
    <meta data-rh="true" property="og:locale" content="en_GB" />

    <!-- Twitter -->
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:url" content="${page.canonicalUrl}" />
    <meta data-rh="true" name="twitter:title" content="${page.title}" />
    <meta data-rh="true" name="twitter:description" content="${page.description}" />
    <meta data-rh="true" name="twitter:image" content="${page.image}" />
    <meta data-rh="true" name="twitter:site" content="@PlanSriLanka" />
    <meta data-rh="true" name="twitter:creator" content="@PlanSriLanka" />`;

    // Replace the head meta block wrapped inside <seo-meta>...</seo-meta>
    const seoBlockRegex = /<seo-meta>[\s\S]*?<\/seo-meta>/i;
    if (seoBlockRegex.test(template)) {
      template = template.replace(seoBlockRegex, `<seo-meta>${metaTags.trim()}\n    </seo-meta>`);
    } else {
      template = template.replace(/<\/head>/i, `<seo-meta>${metaTags.trim()}\n    </seo-meta>\n  </head>`);
    }

    // 2. Wrap Schema Block inside <seo-schema>...</seo-schema>
    const schemaBlockRegex = /<seo-schema>[\s\S]*?<\/seo-schema>/i;
    if (page.schemas.length > 0) {
      const schemaScripts = page.schemas
        .map(sch => `\n    <script type="application/ld+json">\n${sch}\n    </script>`)
        .join("");
      template = template.replace(schemaBlockRegex, `<seo-schema>${schemaScripts}\n    </seo-schema>`);
    } else {
      // Clear out the schema if not needed or not explicitly configured
      template = template.replace(schemaBlockRegex, `<seo-schema></seo-schema>`);
    }

    // 3. Generate Inner Crawler Semantic Content inside `<article class="crawler-seo-wrapper">...</article>`
    const articleRegex = /<article class="crawler-seo-wrapper">[\s\S]*?<\/article>/i;
    const replacementArticle = `<article class="crawler-seo-wrapper">${page.bodyHtml.trim()}\n      </article>`;
    if (articleRegex.test(template)) {
      template = template.replace(articleRegex, replacementArticle);
    }

    // 4. Determine output filepath
    let targetFileDir = distPath;
    let targetFileName = "index.html";

    if (page.path !== "/") {
      // Example: `/sri-lanka-trip-cost-from-india` -> `dist/sri-lanka-trip-cost-from-india/index.html`
      const cleanSubPath = page.path.replace(/^\//, "");
      targetFileDir = path.join(distPath, cleanSubPath);
      targetFileName = "index.html";
    }

    if (!fs.existsSync(targetFileDir)) {
      fs.mkdirSync(targetFileDir, { recursive: true });
    }

    const finalPath = path.join(targetFileDir, targetFileName);
    fs.writeFileSync(finalPath, template, "utf-8");
  });

  console.log("[Prerender] Static site pre-rendering completely updated with bespoke page metadata and semantic layouts!");
}

prerender();
