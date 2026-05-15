import CanvasSequence, { OverlayContent } from "@/components/CanvasSequence";

// ─── Section 1 — Exterior / Villa ────────────────────────────────────────────
const exteriorOverlays: [OverlayContent, OverlayContent, OverlayContent, OverlayContent] = [
  {
    id: "ext-1",
    badge: "Signature Collection",
    subtitle: "Welcome",
    title: "The Architecture\nof Luxury",
    description: "Scroll to begin your journey through a residence where every surface, every light, and every space has been considered with obsessive precision.",
    align: "left",
    accentColor: "white",
  },
  {
    id: "ext-2",
    badge: "Exterior",
    subtitle: "The Villa",
    title: "A Statement\nin White",
    description: "Clean planes of white render, floor-to-ceiling glass, and cantilevered terraces create an architecture that belongs to both land and sky.",
    align: "left",
    accentColor: "sky",
    stats: [
      { label: "Sq Ft",    value: "6,200" },
      { label: "Bedrooms", value: "5"     },
      { label: "Levels",   value: "3"     },
    ],
  },
  {
    id: "ext-3",
    badge: "Outdoor Living",
    subtitle: "The Pool",
    title: "Infinity Edge,\nInfinite Calm",
    description: "The 18-metre infinity pool dissolves into the horizon at golden hour, its still surface a mirror for the mountains behind.",
    align: "center",
    accentColor: "sky",
    features: [
      "Heated infinity pool — 18 m",
      "Submerged sun-shelf & spa jets",
      "Teak loungers & outdoor kitchen",
      "Smart pool automation system",
    ],
  },
  {
    id: "ext-4",
    badge: "Availability",
    title: "Begin Your\nResidence",
    description: "Private viewings available by appointment. Our team will guide you through every detail of this extraordinary home.",
    align: "right",
    accentColor: "amber",
    isCTA: true,
    stats: [
      { label: "From",       value: "€4.2M" },
      { label: "Completion", value: "2025"  },
    ],
  },
];

// ─── Section 2 — Bedroom ─────────────────────────────────────────────────────
const bedroomOverlays: [OverlayContent, OverlayContent, OverlayContent, OverlayContent] = [
  {
    id: "bed-1",
    badge: "Master Suite",
    subtitle: "Level 2",
    title: "Sleep Inside\nthe View",
    description: "The master bedroom is a sanctuary that opens entirely to the lake on two sides — waking up here feels like floating.",
    align: "right",
    accentColor: "white",
  },
  {
    id: "bed-2",
    badge: "Headboard Wall",
    subtitle: "Craftsmanship",
    title: "Fluted Panels,\nGolden Detail",
    description: "Hand-selected travertine-finish panels run floor to ceiling behind the bed, lit from within by a ribbon of warm brass.",
    align: "center",
    accentColor: "amber",
    features: [
      "Floor-to-ceiling fluted feature wall",
      "Integrated brass accent lighting",
      "Bespoke upholstered bedframe",
      "600-thread Egyptian cotton linen",
    ],
  },
  {
    id: "bed-3",
    badge: "Lighting",
    subtitle: "Ambiance",
    title: "Sculptural Light,\nSoft Evenings",
    description: "The Apparatus cluster chandelier casts warm orbs of light across the room — cinematic at night, brilliant during the day.",
    align: "right",
    accentColor: "amber",
    stats: [
      { label: "Ceiling Ht", value: "3.4m"  },
      { label: "Windows",    value: "4.8m"  },
      { label: "Aspect",     value: "180°"  },
    ],
  },
  {
    id: "bed-4",
    badge: "Walk-in Wardrobe",
    title: "A Room\nFor Dressing",
    description: "Beyond the bedroom lies a 22 m² dressing suite with island drawer units, full-length mirrors, and bespoke joinery throughout.",
    align: "left",
    accentColor: "white",
    isCTA: true,
  },
];

// ─── Section 3 — Kitchen & Dining ────────────────────────────────────────────
const kitchenOverlays: [OverlayContent, OverlayContent, OverlayContent, OverlayContent] = [
  {
    id: "kit-1",
    badge: "Heart of the Home",
    subtitle: "Kitchen & Dining",
    title: "Where Cooking\nMeets Theatre",
    description: "The kitchen opens entirely to the waterfront through 4.8-metre bi-fold doors — cooking with a view this extraordinary.",
    align: "left",
    accentColor: "white",
  },
  {
    id: "kit-2",
    badge: "Kitchen",
    subtitle: "Appliances",
    title: "Miele.\nSub-Zero.\nBulthaup.",
    description: "Every appliance is the best in its category. Fully integrated, seamlessly concealed behind continuous white cabinetry.",
    align: "left",
    accentColor: "sky",
    features: [
      "Miele steam & combi oven tower",
      "Sub-Zero integrated refrigeration",
      "Bulthaup b3 handleless cabinetry",
      "Calacatta marble waterfall island",
      "4-metre island with bar seating",
    ],
  },
  {
    id: "kit-3",
    badge: "Dining",
    subtitle: "The Table",
    title: "Live-Edge Oak,\nWater Views",
    description: "A 3.2-metre live-edge walnut dining table seats 10. Overhead, a bespoke linear chandelier traces the table's full length.",
    align: "left",
    accentColor: "amber",
    stats: [
      { label: "Seats",    value: "10"   },
      { label: "Island",   value: "4 m"  },
      { label: "View",     value: "270°" },
    ],
  },
  {
    id: "kit-4",
    badge: "Indoor–Outdoor",
    title: "The Boundary\nDisappears",
    description: "When the bi-fold doors retract, the kitchen, dining room, terrace, and pool become one continuous living space.",
    align: "right",
    accentColor: "emerald",
    isCTA: true,
  },
];

// ─── Section 4 — Bathroom ────────────────────────────────────────────────────
const bathroomOverlays: [OverlayContent, OverlayContent, OverlayContent, OverlayContent] = [
  {
    id: "bath-1",
    badge: "Spa Suite",
    subtitle: "Master Bathroom",
    title: "A Private\nSanctuary",
    description: "The master bathroom is not a room — it is a ritual. Every material was chosen for how it feels, not just how it looks.",
    align: "center",
    accentColor: "white",
  },
  {
    id: "bath-2",
    badge: "The Tub",
    subtitle: "Freestanding",
    title: "Soak in\nStillness",
    description: "A freestanding soaking tub by Victoria + Albert sits at the window, positioned to hold the garden view while you decompress.",
    align: "left",
    accentColor: "sky",
    features: [
      "Victoria + Albert freestanding tub",
      "Floor-mounted brushed brass filler",
      "Heated stone surround",
      "Garden & pool outlook",
    ],
  },
  {
    id: "bath-3",
    badge: "Vanity",
    subtitle: "Double Basin",
    title: "Floating Marble,\nBrass Handles",
    description: "Twin vessel basins on a floating marble vanity with wall-mounted taps. The LED mirror runs the full 1.8-metre width.",
    align: "right",
    accentColor: "amber",
    stats: [
      { label: "Vanity",  value: "1.8m"   },
      { label: "Mirror",  value: "LED"    },
      { label: "Heating", value: "Radiant"},
    ],
  },
  {
    id: "bath-4",
    badge: "Shower",
    title: "Glass, Steam\n& Silence",
    description: "A frameless glass rain shower with body jets, brushed brass fittings, and honed travertine walls. Your daily ritual, elevated.",
    align: "left",
    accentColor: "sky",
    isCTA: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

import SpecsSection from "@/components/SpecsSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="w-full bg-[#050505]">

      {/* Section 1 — Exterior & Pool */}
      <CanvasSequence
        folderPrefix="/ezgif-1-jpg/ezgif-frame-"
        totalFrames={24}
        overlays={exteriorOverlays}
      />

      {/* Section 2 — Bedroom */}
      <CanvasSequence
        folderPrefix="/ezgif-2-jpg/ezgif-frame-"
        totalFrames={24}
        overlays={bedroomOverlays}
      />

      {/* Section 3 — Kitchen & Dining */}
      <CanvasSequence
        folderPrefix="/ezgif-3-jpg/ezgif-frame-"
        totalFrames={32}
        overlays={kitchenOverlays}
      />

      {/* Section 4 — Bathroom */}
      <CanvasSequence
        folderPrefix="/ezgif-4-jpg/ezgif-frame-"
        totalFrames={24}
        overlays={bathroomOverlays}
      />

      {/* Section 5 — Specs */}
      <SpecsSection />

      {/* Section 10 — Contact */}
      <ContactForm />

    </main>
  );
}
