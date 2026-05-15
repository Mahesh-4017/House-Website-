import CanvasSequence, { OverlayContent, VisualStyle } from "@/components/CanvasSequence";
import SpecsSection from "@/components/SpecsSection";
import ContactForm from "@/components/ContactForm";

// ─────────────────────────────────────────────────────────────────────────────
// Visual styles — one per section
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Section 1 — Exterior / Pool
 * Bright golden-hour feel. Warm amber tint on overlay mode.
 * High saturation + contrast to make the white villa and blue pool pop.
 */
const exteriorStyle: VisualStyle = {
  filter: "brightness(1.15) saturate(1.45) contrast(1.1) hue-rotate(-5deg)",
  tint: {
    color: "rgba(255, 185, 60, 0.12)",
    blendMode: "overlay",
  },
  grain: true,
  vignetteStrength: 1,
};

/**
 * Section 2 — Bedroom
 * Soft, warm, intimate. Slight rose-gold tint with gentle contrast.
 * Lower saturation keeps the cream tones delicate and not oversaturated.
 */
const bedroomStyle: VisualStyle = {
  filter: "brightness(1.05) saturate(1.1) contrast(1.08) sepia(0.08)",
  tint: {
    color: "rgba(230, 160, 100, 0.1)",
    blendMode: "screen",
  },
  grain: true,
  vignetteStrength: 2,
};

/**
 * Section 3 — Kitchen & Dining
 * Clean, crisp, editorial. Cool-white tone, high clarity.
 * Slight blue tint on screen gives a fresh luxury magazine look.
 */
const kitchenStyle: VisualStyle = {
  filter: "brightness(1.12) saturate(1.25) contrast(1.12)",
  tint: {
    color: "rgba(180, 220, 255, 0.08)",
    blendMode: "screen",
  },
  grain: false,
  vignetteStrength: 1,
};

/**
 * Section 4 — Bathroom
 * Spa-like, serene. Slight desaturation + warm glow.
 * Heavy vignette creates a cocoon / intimate feeling.
 */
const bathroomStyle: VisualStyle = {
  filter: "brightness(1.08) saturate(1.05) contrast(1.06) sepia(0.12)",
  tint: {
    color: "rgba(200, 170, 120, 0.12)",
    blendMode: "overlay",
  },
  grain: true,
  vignetteStrength: 2,
};

// ─────────────────────────────────────────────────────────────────────────────
// Overlay content — all 4 sections
// ─────────────────────────────────────────────────────────────────────────────

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
    align: "right",
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
    align: "center",
    accentColor: "amber",
    isCTA: true,
    stats: [
      { label: "From",       value: "€4.2M" },
      { label: "Completion", value: "2025"  },
    ],
  },
];

const bedroomOverlays: [OverlayContent, OverlayContent, OverlayContent, OverlayContent] = [
  {
    id: "bed-1",
    badge: "Master Suite",
    subtitle: "Level 2",
    title: "Sleep Inside\nthe View",
    description: "The master bedroom is a sanctuary that opens entirely to the lake on two sides — waking up here feels like floating.",
    align: "center",
    accentColor: "white",
  },
  {
    id: "bed-2",
    badge: "Headboard Wall",
    subtitle: "Craftsmanship",
    title: "Fluted Panels,\nGolden Detail",
    description: "Hand-selected travertine-finish panels run floor to ceiling behind the bed, lit from within by a ribbon of warm brass.",
    align: "left",
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
      { label: "Ceiling Ht", value: "3.4m" },
      { label: "Windows",    value: "4.8m" },
      { label: "Aspect",     value: "180°" },
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

const kitchenOverlays: [OverlayContent, OverlayContent, OverlayContent, OverlayContent] = [
  {
    id: "kit-1",
    badge: "Heart of the Home",
    subtitle: "Kitchen & Dining",
    title: "Where Cooking\nMeets Theatre",
    description: "The kitchen opens entirely to the waterfront through 4.8-metre bi-fold doors — cooking with a view this extraordinary.",
    align: "right",
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
    align: "right",
    accentColor: "amber",
    stats: [
      { label: "Seats",  value: "10"   },
      { label: "Island", value: "4 m"  },
      { label: "View",   value: "270°" },
    ],
  },
  {
    id: "kit-4",
    badge: "Indoor–Outdoor",
    title: "The Boundary\nDisappears",
    description: "When the bi-fold doors retract, the kitchen, dining room, terrace, and pool become one continuous living space.",
    align: "center",
    accentColor: "emerald",
    isCTA: true,
  },
];

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
      { label: "Vanity",  value: "1.8m"    },
      { label: "Mirror",  value: "LED"     },
      { label: "Heating", value: "Radiant" },
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

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="w-full bg-[#050505]">

      {/* 1 — Exterior & Pool — warm golden-hour tint */}
      <CanvasSequence
        folderPrefix="/ezgif-1-jpg/ezgif-frame-"
        totalFrames={24}
        overlays={exteriorOverlays}
        visualStyle={exteriorStyle}
      />

      {/* 2 — Bedroom — warm rose-gold sepia */}
      <CanvasSequence
        folderPrefix="/ezgif-2-jpg/ezgif-frame-"
        totalFrames={24}
        overlays={bedroomOverlays}
        visualStyle={bedroomStyle}
      />

      {/* 3 — Kitchen & Dining — cool crisp editorial */}
      <CanvasSequence
        folderPrefix="/ezgif-3-jpg/ezgif-frame-"
        totalFrames={32}
        overlays={kitchenOverlays}
        visualStyle={kitchenStyle}
      />

      {/* 4 — Bathroom — spa warm sepia heavy vignette */}
      <CanvasSequence
        folderPrefix="/ezgif-4-jpg/ezgif-frame-"
        totalFrames={24}
        overlays={bathroomOverlays}
        visualStyle={bathroomStyle}
      />

      {/* Section 5 — Specs */}
      <SpecsSection />

      {/* Section 10 — Contact */}
      <ContactForm />

    </main>
  );
}
