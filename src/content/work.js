/**
 * All work items: card data + full page content.
 * `id` is used in the URL: /work/{id}
 */

export const PROJECTS_HEADING = "Work";
export const PROJECTS_DESCRIPTION =
  "Case studies, projects, and writing from the field.";

export const FILTER_OPTIONS = [
  { id: "all", label: "All", icon: "all" },
  { id: "project", label: "Projects", icon: "project" },
  { id: "article", label: "Articles", icon: "article" },
  { id: "case-study", label: "Case studies", icon: "case-study" },
];

export const TAG_LABELS = {
  project: "Project",
  article: "Article",
  "case-study": "Case study",
};

/** @typedef {"paragraph"|"heading"|"subheading"|"image"|"meta"|"list"|"quote"|"learning"|"divider"} BlockType */

/**
 * @typedef {Object} ContentBlock
 * @property {BlockType} type
 * @property {string} [text]
 * @property {string} [src]
 * @property {string} [alt]
 * @property {string} [caption]
 */

/**
 * @typedef {Object} WorkItem
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {"project"|"article"|"case-study"} tag
 * @property {string} thumbnail — card image (put files in public/images/work/)
 * @property {ContentBlock[]} body
 */

/** Placeholder helper — replace with /images/work/your-file.jpg when ready. */
function thumb(label) {
  return `https://placehold.co/800x450/e4e4e7/52525b?text=${encodeURIComponent(label)}`;
}

function img(label, width = 960, height = 540) {
  return `https://placehold.co/${width}x${height}/f4f4f5/52525b?text=${encodeURIComponent(label)}`;
}

/** @type {ContentBlock[]} */
const PRICE_SIGNAL_BODY = [
  {
    type: "paragraph",
    text: "In 2018, Iran's used car market was full of rumors. Dealers were allegedly coordinating to inflate prices on classifieds platforms — creating a false sense of market value. Whether or not that was completely true, the effect was real: buyers didn't trust what they were seeing, fewer deals were closing, and the market was slowing down.",
  },
  {
    type: "paragraph",
    text: "I was a product designer at Sheypoor, one of Iran's largest classifieds platforms. This is the story of a feature we built to bring transparency to car listings — and what we learned when we tried to change how sellers behave.",
  },
  {
    type: "meta",
    items: [
      {
        label: "My role",
        value:
          "Product Design — wireframes, prototypes, interaction design, plus involvement in the product thinking behind the feature.",
      },
      { label: "Team", value: "Kourosh (PM), Engineering, Support, Sales" },
      { label: "Timeline", value: "~2 months from idea to results" },
    ],
  },
  { type: "heading", text: "The Problem" },
  {
    type: "paragraph",
    text: "Buyers were losing trust. Prices felt random and too high. Most buyers had no way to know if a price was fair — they were relying entirely on a stranger's judgment, on a platform that had no opinion about whether a deal was good.",
  },
  {
    type: "paragraph",
    text: "Fewer transactions were happening. That was a problem for everyone.",
  },
  { type: "heading", text: "The Idea" },
  {
    type: "paragraph",
    text: "It started over lunch.",
  },
  {
    type: "paragraph",
    text: 'Kourosh and I were talking about the rumors when I asked, almost as a passing thought: "What if Sheypoor just told people whether a price is fair or not?"',
  },
  {
    type: "paragraph",
    text: "Add a small label to each listing. Is this car priced too high? About right? A great deal?",
  },
  {
    type: "paragraph",
    text: "Kourosh liked it right away. We found an engineer that same afternoon. It turned out we already had a machine learning model that estimated fair market prices based on mileage, year, condition, and model. We had the data. We just weren't using it this way.",
  },
  {
    type: "paragraph",
    text: "But when we brought it to the sales and support teams, they pushed back immediately. Sellers would get angry. Support would get flooded. The idea was shelved.",
  },
  { type: "heading", text: "The First Test" },
  {
    type: "paragraph",
    text: 'A few weeks later, the market had slowed down noticeably. The same people who said no came back with a different tone: "Let\'s do a small test. Minimum effort."',
  },
  {
    type: "paragraph",
    text: "We built it fast. After a seller posted a listing and it passed moderation, a colored badge appeared below the price:",
  },
  {
    type: "list",
    items: [
      "🔴 Red — Price is very high",
      "🟡 Yellow — Price is high",
      "🔵 Blue — Fair price",
      "🟢 Green — Great deal",
    ],
  },
  {
    type: "image",
    src: img("Listing card with price badge", 960, 600),
    alt: "Used car listing card showing a red price badge labeled Price is very high",
    caption:
      "Screenshot of a used car listing card with the colored price badge below the price — ideally showing the red \"Price is very high\" state on a real listing UI.",
  },
  {
    type: "paragraph",
    text: "The test ran for two days before seller complaints forced us to roll it back.",
  },
  { type: "heading", text: "What the Data Said" },
  {
    type: "paragraph",
    text: "Even in two days, the numbers were interesting.",
  },
  {
    type: "paragraph",
    text: "Of all listings that received a badge, 23% were tagged as fair price. That was a baseline — something to improve toward.",
  },
  {
    type: "paragraph",
    text: "6% of sellers who called support to complain actually lowered their price after the agent explained they could edit the listing. Others had quietly deleted and reposted with lower prices — we couldn't track the exact count, but we could see it in the data.",
  },
  {
    type: "paragraph",
    text: "On the buyer side, listings tagged as fair price got roughly 10% more clicks on the contact button. We couldn't measure actual calls, but the intent signal was clear.",
  },
  {
    type: "paragraph",
    text: "We shared these numbers with stakeholders. Real data reopened a closed conversation.",
  },
  { type: "heading", text: "Back to Design" },
  {
    type: "paragraph",
    text: "We also had a clear diagnosis of what went wrong.",
  },
  {
    type: "paragraph",
    text: "We were giving feedback at the wrong moment. The seller would go through the entire listing process, go live — and then find out their price was flagged. The feedback felt like a penalty, not a helpful signal. The only option was to go back and edit.",
  },
  {
    type: "paragraph",
    text: "We needed to move the feedback to before anything went live.",
  },
  {
    type: "image",
    src: img("Old flow vs new flow", 960, 480),
    alt: "Side-by-side diagram comparing feedback after going live versus during listing creation at the price field",
    caption:
      "Side-by-side diagram showing the old flow (feedback after going live) vs. the new flow (feedback during listing creation, at the price field).",
  },
  { type: "heading", text: "Redesigning the Flow" },
  {
    type: "paragraph",
    text: "The Sheypoor listing form was a single page — a core product principle we wanted to keep. So we worked within it.",
  },
  {
    type: "paragraph",
    text: "The price field had always been near the top. I moved it to the bottom.",
  },
  {
    type: "paragraph",
    text: "The reasoning: if the seller fills in all the car details first — model, year, mileage, condition — by the time they reach the price field, we have everything we need to make an accurate estimate. The feedback could happen right there, before anything goes live.",
  },
  { type: "subheading", text: "The first idea: a range slider" },
  {
    type: "paragraph",
    text: "My initial design used a color-gradient range slider — red on the left through yellow to green. A marker would show where the seller's price landed. They could drag it toward green to find a fair price.",
  },
  {
    type: "image",
    src: img("Gradient range slider prototype", 960, 540),
    alt: "Framer prototype of a gradient range slider with a price marker in the red and yellow zone",
    caption:
      "Framer prototype screenshot of the gradient range slider with a price marker positioned in the red/yellow zone — showing the interaction concept.",
  },
  {
    type: "paragraph",
    text: "I built a Framer prototype and ran a quick test with people from other teams. The same problem came up every time: people didn't understand what the slider was for or how it connected to their price. It added confusion we didn't need. We moved on.",
  },
  { type: "heading", text: "The Final Design" },
  {
    type: "paragraph",
    text: "We simplified.",
  },
  {
    type: "paragraph",
    text: "Instead of a slider, we pre-filled the price field with our suggested fair price. Below it, a short line of guidance:",
  },
  {
    type: "quote",
    text: "Based on current market conditions, Sheypoor suggests this price for your listing.",
  },
  {
    type: "image",
    src: img("Listing form with suggested price", 960, 600),
    alt: "Listing form with the price field pre-filled and an explanatory note below it",
    caption:
      "Screenshot of the listing form with the price field pre-filled with the suggested price and the explanatory note below it — showing the clean, final state.",
  },
  {
    type: "paragraph",
    text: "The seller could keep it or change it — their listing, their choice. But the default was now a fair price. The path of least resistance led somewhere good.",
  },
  { type: "heading", text: "The Results" },
  {
    type: "paragraph",
    text: "Two weeks after launch, the percentage of listings tagged as fair price grew from 23% to 41% — nearly double.",
  },
  {
    type: "image",
    src: img("23% to 41% fair-priced listings", 960, 480),
    alt: "Before and after chart showing fair-priced listings growing from 23% to 41%",
    caption:
      "Simple before/after graphic showing 23% → 41% fair-priced listings, with the two badge states side by side.",
  },
  { type: "heading", text: "How It Ended" },
  {
    type: "paragraph",
    text: "A few months after launch, the Iranian government ordered all major classifieds platforms to remove car prices from listings entirely as part of broader price control measures. The feature came down with everything else.",
  },
  {
    type: "paragraph",
    text: "When the restrictions were lifted, we brought it back. But the period that mattered — from a lunch conversation to a working, data-backed feature — was about two months.",
  },
  { type: "heading", text: "What I Learned" },
  {
    type: "learning",
    title: "Feedback timing changes everything.",
    text: "The first version wasn't wrong in concept — it was wrong in placement. The same information, delivered when the seller could still act on it, produced completely different results.",
  },
  {
    type: "learning",
    title: "Two days of data beats two weeks of debate.",
    text: "Arguments got us nowhere. A minimal test with real numbers reopened a closed conversation. Running the experiment — even imperfectly — was the right call.",
  },
  {
    type: "learning",
    title: "Defaults are stronger than instructions.",
    text: "Pre-filling the price field did more than the slider ever could. We didn't explain or persuade — we just made the right option the easy option.",
  },
  {
    type: "learning",
    title: "The same idea needs the right conditions.",
    text: "We had this idea before the slowdown and it went nowhere. When the problem became visible to everyone inside the company, the same idea suddenly had support. Timing matters as much as the idea itself.",
  },
];

/** @type {WorkItem[]} */
export const WORK_ITEMS = [
  {
    id: "price-signal",
    title: "Price Signal",
    subtitle:
      "How Sheypoor helped buyers and sellers find fair ground in a volatile market",
    tag: "case-study",
    thumbnail: thumb("Price Signal"),
    body: PRICE_SIGNAL_BODY,
  },
  {
    id: "verified-listings",
    title: "Verified Listings",
    subtitle:
      "A trust badge that cut scam reports — and why we almost shipped the wrong version",
    tag: "case-study",
    thumbnail: thumb("Verified Listings"),
    body: [
      {
        type: "paragraph",
        text: "Scam listings were the number-one reason buyers called support. Not fraud at payment — fraud at first contact. A seller would post a too-good deal, a buyer would message, and the conversation would move off-platform within minutes.",
      },
      {
        type: "paragraph",
        text: "We needed a signal buyers could read in under a second: has this listing been checked? The hard part wasn't the badge. It was deciding what \"verified\" actually meant.",
      },
      {
        type: "meta",
        items: [
          {
            label: "My role",
            value: "Product design — flows, badge system, seller verification UX",
          },
          { label: "Team", value: "Trust & Safety, Engineering, Support" },
          { label: "Timeline", value: "~6 weeks from research to launch" },
        ],
      },
      { type: "heading", text: "The Problem" },
      {
        type: "paragraph",
        text: "Buyers didn't distrust the platform — they distrusted individual listings. Support logs showed the same pattern: people wanted a reason to skip a listing without reading every line of description text.",
      },
      { type: "heading", text: "What We Shipped" },
      {
        type: "paragraph",
        text: "We landed on phone-verified sellers plus moderation review for high-risk categories. The badge appeared on the listing card and again at the contact step — the moment hesitation peaked.",
      },
      {
        type: "image",
        src: img("Verified listing badge on card", 960, 540),
        alt: "Listing card with a verified seller badge",
        caption: "Badge placement on the listing card and contact sheet.",
      },
      { type: "heading", text: "What I Learned" },
      {
        type: "learning",
        title: "Labels carry legal weight.",
        text: "Calling something \"verified\" sounds simple until Legal asks what promise you're making. We renamed internal states three times before launch.",
      },
      {
        type: "learning",
        title: "Trust UI belongs at the decision point.",
        text: "The badge on the card helped scanning. The badge before contact helped conversion. One without the other did half the job.",
      },
    ],
  },
  {
    id: "quiet-checkout",
    title: "Quiet Checkout",
    subtitle:
      "Removing four fields from a marketplace checkout and watching completion climb",
    tag: "case-study",
    thumbnail: thumb("Quiet Checkout"),
    body: [
      {
        type: "paragraph",
        text: "Our marketplace checkout was built for the first product we ever sold. By year three it asked for billing address, shipping notes, gift options, and marketing consent — on a used bookshelf.",
      },
      {
        type: "meta",
        items: [
          {
            label: "My role",
            value: "End-to-end UX — audit, wireframes, UI, post-launch review",
          },
          { label: "Team", value: "Payments squad, Data, Customer Support" },
          { label: "Timeline", value: "4 weeks" },
        ],
      },
      { type: "heading", text: "The Audit" },
      {
        type: "paragraph",
        text: "Analytics showed 38% of users dropped between cart and payment. Session replays told a simpler story: people weren't confused — they were tired. Every optional field looked required.",
      },
      { type: "heading", text: "The Redesign" },
      {
        type: "paragraph",
        text: "We collapsed checkout to one screen: total, payment method, confirm. Address auto-filled from the profile when available. Everything else moved to post-purchase or settings.",
      },
      {
        type: "image",
        src: img("Before and after checkout", 960, 480),
        alt: "Side-by-side of old multi-step checkout versus simplified one-screen flow",
        caption: "Four steps and twelve fields reduced to one screen with three inputs.",
      },
      { type: "heading", text: "Results" },
      {
        type: "paragraph",
        text: "Checkout completion rose 14% in the first month. Support tickets about \"where do I pay\" dropped to nearly zero. The gift-wrap field, it turned out, had been used four times all quarter.",
      },
    ],
  },
  {
    id: "seller-inbox",
    title: "Seller Inbox",
    subtitle: "One inbox for every buyer message — instead of one thread per listing",
    tag: "project",
    thumbnail: thumb("Seller Inbox"),
    body: [
      {
        type: "paragraph",
        text: "Power sellers on our platform managed dozens of active listings. Every buyer message opened a separate thread tied to a single ad — so the same person selling a couch and a camera had two inboxes that couldn't talk to each other.",
      },
      {
        type: "meta",
        items: [
          { label: "My role", value: "UX/UI design, prototyping, usability testing" },
          { label: "Team", value: "Messaging, Mobile, Seller Experience" },
          { label: "Timeline", value: "8 weeks" },
        ],
      },
      { type: "heading", text: "Approach" },
      {
        type: "paragraph",
        text: "I mapped reply workflows with six high-volume sellers. The pattern was consistent: they cared about the buyer first, the listing second. We reorganized around people, with listing context as secondary metadata.",
      },
      {
        type: "image",
        src: img("Unified seller inbox", 960, 600),
        alt: "Mobile inbox showing buyer threads with listing thumbnails",
        caption: "Threads grouped by buyer with listing context inline.",
      },
      {
        type: "paragraph",
        text: "Quick replies and read-state sync across web and app shipped in the same release. Average time-to-first-response improved without adding a single notification type.",
      },
    ],
  },
  {
    id: "map-first-search",
    title: "Map-First Search",
    subtitle: "Flipping the rental search experience so place came before filters",
    tag: "project",
    thumbnail: thumb("Map-First Search"),
    body: [
      {
        type: "paragraph",
        text: "Renters searched our real-estate vertical the same way they searched for phones: filters first, results as a list. But interviews showed they thought in neighborhoods — draw a area, then narrow down.",
      },
      {
        type: "meta",
        items: [
          { label: "My role", value: "Interaction design, mobile layouts, design QA" },
          { label: "Team", value: "Real estate vertical, Maps, iOS/Android" },
          { label: "Timeline", value: "10 weeks" },
        ],
      },
      { type: "heading", text: "Concept" },
      {
        type: "paragraph",
        text: "The map became the primary canvas. Filters slid in as a sheet. Pins clustered by block, not by exact address, until zoom level justified detail.",
      },
      {
        type: "image",
        src: img("Map-first rental search", 960, 540),
        alt: "Mobile map view with rental pins and a bottom filter sheet",
        caption: "Default view on open — map full screen, filters one swipe away.",
      },
      {
        type: "paragraph",
        text: "List view stayed available for comparison shoppers, but second-session retention on mobile improved once the default matched how people described their search out loud.",
      },
    ],
  },
  {
    id: "empty-states",
    title: "The Empty State Problem",
    subtitle: "Most zero-result screens apologize. Better ones give you somewhere to go.",
    tag: "article",
    thumbnail: thumb("Empty States"),
    body: [
      {
        type: "paragraph",
        text: "An empty state is not a dead end — it's the moment a user has told you exactly what they wanted and you came up short. That makes it one of the highest-signal screens in a product, and we routinely waste it on illustration and apology copy.",
      },
      { type: "heading", text: "Three jobs of a good empty state" },
      {
        type: "list",
        items: [
          "Confirm what happened — \"No results in this area\" beats \"Nothing here yet.\"",
          "Explain why if you can — stale filters, new account, sold out.",
          "Offer the next best action — broaden search, save alert, contact support.",
        ],
      },
      { type: "heading", text: "What I skip" },
      {
        type: "paragraph",
        text: "Cute mascots, passive voice, and suggestions that require starting over. If the user refined filters four times, don't send them back to step one.",
      },
      {
        type: "quote",
        text: "Treat empty states like search results with zero items — because that's what they are.",
      },
    ],
  },
  {
    id: "design-the-default",
    title: "Design the Default",
    subtitle: "Pre-selection is a design decision with ethics attached",
    tag: "article",
    thumbnail: thumb("Design the Default"),
    body: [
      {
        type: "paragraph",
        text: "Every form has a default: the option already chosen, the path of least resistance. Users can change it — but most won't. That's not laziness; it's rational. Defaults are how interfaces scale without demanding attention at every step.",
      },
      { type: "heading", text: "Defaults as product strategy" },
      {
        type: "paragraph",
        text: "On a classifieds platform I worked on, we pre-filled listing prices with a suggested fair value. Completion rates went up. So did the share of fairly priced listings. We didn't add instructions — we changed what showed up first.",
      },
      { type: "heading", text: "The line I watch for" },
      {
        type: "paragraph",
        text: "A good default helps someone finish what they already came to do. A dark default hides cost, auto-enrolls, or makes the reversible feel permanent. The design question isn't \"can we?\" — it's \"would we explain this choice out loud without flinching?\"",
      },
      {
        type: "learning",
        title: "Make the right thing easy.",
        text: "If the best option for most people is also the best option for the business long term, pre-select it. If those diverge, fix the product — don't bury the toggle.",
      },
    ],
  },
  {
    id: "prototype-before-meeting",
    title: "Prototype Before the Meeting",
    subtitle: "Why I stopped bringing slides to stakeholder reviews",
    tag: "article",
    thumbnail: thumb("Prototype First"),
    body: [
      {
        type: "paragraph",
        text: "Static frames invite opinion. Prototypes invite behavior. The difference shows up in the room: \"I don't like that blue\" versus \"I wouldn't tap that — I'd expect it to save first.\"",
      },
      { type: "heading", text: "What changed" },
      {
        type: "paragraph",
        text: "I started sending a clickable link 24 hours before review meetings. Not as homework — as the agenda. Stakeholders arrived having already tried the flow. Meetings shifted from presentation to critique.",
      },
      { type: "heading", text: "How little is enough" },
      {
        type: "list",
        items: [
          "One happy path, fully clickable",
          "Real copy, not lorem ipsum — words change decisions",
          "One edge state you expect pushback on — error, empty, loading",
        ],
      },
      {
        type: "paragraph",
        text: "The goal isn't polish. It's reducing the gap between what people imagine and what you're proposing. A rough prototype that behaves correctly beats a beautiful deck that leaves room for ten interpretations.",
      },
    ],
  },
];

export function getWorkItemById(id) {
  return WORK_ITEMS.find((item) => item.id === id);
}
