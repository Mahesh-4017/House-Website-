"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue, useSpring } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type OverlayContent = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  align: "center" | "left" | "right";
  isCTA?: boolean;
  badge?: string;
  stats?: { label: string; value: string }[];
  features?: string[];
  accentColor?: string;
};

/**
 * visualStyle controls how the canvas image looks.
 *
 * filter        — CSS filter string applied directly to the <canvas>
 *                 e.g. "brightness(1.15) saturate(1.4) contrast(1.1)"
 *
 * tint          — colour overlay on top of the canvas
 *                 color: any CSS color  e.g. "rgba(255,180,50,0.18)"
 *                 blendMode: CSS mix-blend-mode  e.g. "overlay" | "screen" | "color" | "multiply"
 *
 * grain         — subtle film-grain noise layer (true/false)
 * vignetteStrength — 0 = none, 1 = subtle, 2 = heavy (default 1)
 */
export type VisualStyle = {
  filter?: string;
  tint?: {
    color: string;
    blendMode?: string;
  };
  grain?: boolean;
  vignetteStrength?: 0 | 1 | 2;
};

interface Props {
  folderPrefix: string;
  totalFrames: number;
  overlays: [OverlayContent, OverlayContent, OverlayContent, OverlayContent];
  visualStyle?: VisualStyle;
}

// ─────────────────────────────────────────────────────────────────────────────
// Accent color map
// ─────────────────────────────────────────────────────────────────────────────

type AccentStyle = {
  border: string;
  text: string;
  bg: string;
  dot: string;
  line: string;
};

const accentMap: Record<string, AccentStyle> = {
  amber: {
    border: "border-[#D4A373]/40",
    text: "text-[#F6E7D8]",
    bg: "bg-[#D4A373]/10",
    dot: "bg-[#D4A373]",
    line: "bg-[#D4A373]/30",
  },

  rose: {
    border: "border-[#B76E79]/40",
    text: "text-[#F8D7DA]",
    bg: "bg-[#B76E79]/10",
    dot: "bg-[#B76E79]",
    line: "bg-[#B76E79]/30",
  },

  sky: {
    border: "border-[#5DADE2]/40",
    text: "text-[#D6EAF8]",
    bg: "bg-[#5DADE2]/10",
    dot: "bg-[#5DADE2]",
    line: "bg-[#5DADE2]/30",
  },

  emerald: {
    border: "border-[#3CB371]/40",
    text: "text-[#D1F2E0]",
    bg: "bg-[#3CB371]/10",
    dot: "bg-[#3CB371]",
    line: "bg-[#3CB371]/30",
  },

  white: {
    border: "border-white/15",
    text: "text-[#E5E5E5]",
    bg: "bg-white/[0.04]",
    dot: "bg-white/80",
    line: "bg-white/10",
  },
};
function getAccent(key?: string): AccentStyle {
  return accentMap[key ?? "white"] ?? accentMap.white;
}

// ─────────────────────────────────────────────────────────────────────────────
// Frame path
// ─────────────────────────────────────────────────────────────────────────────

function getFramePath(prefix: string, index: number) {
  return `${prefix}${String(index + 1).padStart(3, "0")}.jpg`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function StatPill({ label, value, accent }: { label: string; value: string; accent: AccentStyle }) {
  return (
    <div className={`flex flex-col items-center px-5 py-3 rounded-2xl border ${accent.border} ${accent.bg} backdrop-blur-md`}>
      <span className={`text-xl md:text-2xl font-light tracking-tight ${accent.text}`}>{value}</span>
      <span className="text-white/35 text-[10px] tracking-[0.2em] uppercase mt-0.5">{label}</span>
    </div>
  );
}

function FeatureList({ features, accent, align }: { features: string[]; accent: AccentStyle; align: "center" | "left" | "right" }) {
  return (
    <ul className="space-y-2.5 mt-2">
      {features.map((f, i) => (
        <li key={i} className={`flex items-center gap-3 text-white/60 text-sm leading-snug ${align === "right" ? "flex-row-reverse" : ""}`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.dot}`} />
          {f}
        </li>
      ))}
    </ul>
  );
}

function OverlayPanel({ overlay, opacityValue }: { overlay: OverlayContent; opacityValue: MotionValue<number> }) {
  const accent = getAccent(overlay.accentColor);

  const positionClass =
    overlay.align === "center" ? "inset-0 flex flex-col justify-center px-8"
      : overlay.align === "right" ? "inset-y-0 right-0 w-full md:w-[52%] flex flex-col justify-center px-10 md:pr-20"
        : "inset-y-0 left-0 w-full md:w-[52%] flex flex-col justify-center px-10 md:pl-20";

  const alignClass =
    overlay.align === "center" ? "items-center text-center"
      : overlay.align === "right" ? "items-end text-right"
        : "items-start text-left";

  return (
    <motion.div style={{ opacity: opacityValue }} className={`absolute ${positionClass} flex flex-col ${alignClass}`}>

      {overlay.badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${accent.border} ${accent.bg} backdrop-blur-sm mb-5 self-${overlay.align === "center" ? "center" : overlay.align === "right" ? "end" : "start"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
          <span className={`text-[10px] tracking-[0.22em] uppercase font-medium ${accent.text}`}>{overlay.badge}</span>
        </div>
      )}

      {overlay.subtitle && (
        <p className={`text-xs tracking-[0.3em] uppercase mb-3 ${accent.text}`}>{overlay.subtitle}</p>
      )}

      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white/95 mb-4 leading-[1.05] whitespace-pre-line">
        {overlay.title}
      </h2>

      <div className={`h-px w-12 mb-5 ${accent.line} ${overlay.align === "right" ? "ml-auto" : overlay.align === "center" ? "mx-auto" : ""}`} />

      <p className="text-sm md:text-base text-white/50 max-w-xs md:max-w-sm leading-relaxed mb-5">
        {overlay.description}
      </p>

      {overlay.stats && overlay.stats.length > 0 && (
        <div className={`flex gap-2.5 mb-5 flex-wrap ${overlay.align === "center" ? "justify-center" : overlay.align === "right" ? "justify-end" : "justify-start"}`}>
          {overlay.stats.map((s, i) => <StatPill key={i} label={s.label} value={s.value} accent={accent} />)}
        </div>
      )}

      {overlay.features && overlay.features.length > 0 && (
        <FeatureList features={overlay.features} accent={accent} align={overlay.align} />
      )}

      {overlay.isCTA && (
        <button className={`mt-6 pointer-events-auto group relative overflow-hidden px-9 py-4 rounded-full text-xs tracking-[0.25em] uppercase font-medium border border-white/25 text-white/80 hover:border-white/50 hover:text-white transition-all duration-500 self-${overlay.align === "center" ? "center" : overlay.align === "right" ? "end" : "start"}`}>
          <span className="relative z-10">Reserve Your Tour</span>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-all duration-500 rounded-full" />
        </button>
      )}

    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Vignette strength configs
// ─────────────────────────────────────────────────────────────────────────────

const vignetteConfig = {
  0: { top: "from-transparent", topH: "h-0", bottom: "from-transparent", bottomH: "h-0" },
  1: { top: "from-black/40", topH: "h-36", bottom: "from-black/65", bottomH: "h-48" },
  2: { top: "from-black/65", topH: "h-52", bottom: "from-black/85", bottomH: "h-64" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function CanvasSequence({ folderPrefix, totalFrames, overlays, visualStyle = {} }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.2 });
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

  const {
    filter = "brightness(1.1) saturate(1.2) contrast(1.05)",
    tint,
    grain = false,
    vignetteStrength = 1,
  } = visualStyle;

  const vc = vignetteConfig[vignetteStrength];

  // ── Preload ───────────────────────────────────────────────────────────────
  useEffect(() => {
    setImagesLoaded(false);
    let count = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      img.src = getFramePath(folderPrefix, i);
      const done = () => { count++; if (count === totalFrames) setImagesLoaded(true); };
      img.onload = done; img.onerror = done;
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [folderPrefix, totalFrames]);

  // ── Canvas render ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf: number | null = null;
    let cw = 0;
    let ch = 0;

    const render = () => {
      raf = null;
      const img = imagesRef.current[Math.round(frameIndex.get())];
      if (!img?.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const targetW = window.innerWidth * dpr;
      const targetH = window.innerHeight * dpr;

      // Only resize the canvas buffer if the window size actually changed.
      // Reassigning canvas.width clears the buffer and causes severe flickering/breaking.
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        cw = window.innerWidth;
        ch = window.innerHeight;
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

      const hRatio = cw / img.width;
      const vRatio = ch / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const shiftX = (cw - img.width * ratio) / 2;
      const shiftY = (ch - img.height * ratio) / 2;

      ctx.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);
    };

    render();
    const unsub = frameIndex.on("change", () => {
      if (raf === null) {
        raf = requestAnimationFrame(render);
      }
    });
    const onResize = () => {
      if (raf === null) {
        raf = requestAnimationFrame(render);
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [imagesLoaded, frameIndex]);

  // ── Opacity values ────────────────────────────────────────────────────────
  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [1, 1, 0, 0]);
  const opacity2 = useTransform(smoothProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const opacity3 = useTransform(smoothProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const opacity4 = useTransform(smoothProgress, [0.8, 0.9, 1, 1], [0, 1, 1, 1]);
  const opacities = [opacity1, opacity2, opacity3, opacity4];

  const dotScale = [
    useTransform(smoothProgress, [0, 0.25], [1.5, 0.8]),
    useTransform(smoothProgress, [0.25, 0.45], [0.8, 1.5]),
    useTransform(smoothProgress, [0.45, 0.75], [0.8, 1.5]),
    useTransform(smoothProgress, [0.75, 1], [0.8, 1.5]),
  ];

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Loading */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-50 gap-5">
            <div className="flex gap-2">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/25 animate-pulse" style={{ animationDelay: `${i * 180}ms` }} />
              ))}
            </div>
            <p className="text-white/25 text-[10px] tracking-[0.35em] uppercase">Loading Experience</p>
          </div>
        )}

        {/* ── Canvas with CSS filter ── */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            display: "block",
            filter: filter,
          }}
        />

        {/* ── Color tint overlay ── */}
        {tint && (
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              backgroundColor: tint.color,
              mixBlendMode: (tint.blendMode ?? "overlay") as React.CSSProperties["mixBlendMode"],
            }}
          />
        )}

        {/* ── Film grain overlay ── */}
        {grain && (
          <div
            className="absolute inset-0 pointer-events-none z-[2] opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
            }}
          />
        )}

        {/* ── Vignette ── */}
        <div className="absolute inset-0 pointer-events-none z-[3]">
          {vignetteStrength > 0 && <>
            <div className={`absolute top-0 inset-x-0 ${vc.topH} bg-gradient-to-b ${vc.top} to-transparent`} />
            <div className={`absolute bottom-0 inset-x-0 ${vc.bottomH} bg-gradient-to-t ${vc.bottom} to-transparent`} />
            <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-white/10 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-white/10 to-transparent" />
          </>}
        </div>

        {/* ── Text overlays ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {overlays.map((overlay, i) => (
            <OverlayPanel key={overlay.id} overlay={overlay} opacityValue={opacities[i]} />
          ))}
        </div>

        {/* ── Progress dots ── */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 pointer-events-none">
          {dotScale.map((scale, i) => (
            <motion.div key={i} style={{ scale }} className="w-1 h-1 rounded-full bg-white/50 origin-center" />
          ))}
        </div>

        {/* ── Scroll hint ── */}
        <motion.div style={{ opacity: opacity1 }} className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-white/25 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-9 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </motion.div>

        {/* ── Branding ── */}
        <div className="absolute top-6 left-7 z-20 pointer-events-none">
          <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase">Luxury Residences</p>
        </div>

        <div className="absolute top-6 right-7 z-20 pointer-events-none">
          <p className="text-white/15 text-[9px] tracking-[0.25em] font-mono uppercase">{String(totalFrames).padStart(2, "0")} Frames</p>
        </div>

      </div>
    </div>
  );
}