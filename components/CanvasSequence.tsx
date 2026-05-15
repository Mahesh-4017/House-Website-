"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  accentColor?: string; // tailwind color token e.g. "amber", "rose", "sky"
};

interface Props {
  folderPrefix: string;
  totalFrames: number;
  overlays: [OverlayContent, OverlayContent, OverlayContent, OverlayContent];
}

// ─── Frame path helper ────────────────────────────────────────────────────────

function getFramePath(prefix: string, index: number) {
  const num = String(index + 1).padStart(3, "0");
  return `${prefix}${num}.jpg`;
}

// ─── Accent color map ─────────────────────────────────────────────────────────

const accentMap: Record<string, { border: string; text: string; bg: string; dot: string }> = {
  amber:  { border: "border-amber-400/60",  text: "text-amber-300",  bg: "bg-amber-400/10",  dot: "bg-amber-400" },
  rose:   { border: "border-rose-400/60",   text: "text-rose-300",   bg: "bg-rose-400/10",   dot: "bg-rose-400"  },
  sky:    { border: "border-sky-400/60",    text: "text-sky-300",    bg: "bg-sky-400/10",    dot: "bg-sky-400"   },
  emerald:{ border: "border-emerald-400/60",text: "text-emerald-300",bg: "bg-emerald-400/10",dot: "bg-emerald-400"},
  white:  { border: "border-gray-400/60",   text: "text-gray-200",   bg: "bg-white/10",      dot: "bg-gray-200"     },
};

function getAccent(key?: string) {
  return accentMap[key ?? "white"] ?? accentMap["white"];
}

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({ label, value, accent }: { label: string; value: string; accent: ReturnType<typeof getAccent> }) {
  return (
    <div className={`flex flex-col items-center px-5 py-3 rounded-xl border ${accent.border} ${accent.bg} backdrop-blur-sm`}>
      <span className={`text-2xl font-light ${accent.text}`}>{value}</span>
      <span className="text-white/40 text-xs tracking-widest uppercase mt-0.5">{label}</span>
    </div>
  );
}

// ─── Feature list ─────────────────────────────────────────────────────────────

function FeatureList({ features, accent }: { features: string[]; accent: ReturnType<typeof getAccent> }) {
  return (
    <ul className="space-y-2 mt-4">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.dot}`} />
          {f}
        </li>
      ))}
    </ul>
  );
}

// ─── Single overlay panel ─────────────────────────────────────────────────────

function OverlayPanel({
  overlay,
  opacityValue,
}: {
  overlay: OverlayContent;
  opacityValue: MotionValue<number>;
}) {
  const accent = getAccent(overlay.accentColor);

  const alignClasses =
    overlay.align === "center"
      ? "items-center text-center"
      : overlay.align === "right"
      ? "items-end text-right"
      : "items-start text-left";

  const positionClasses =
    overlay.align === "center"
      ? "inset-0 flex flex-col justify-center px-6"
      : overlay.align === "right"
      ? "inset-y-0 right-0 flex flex-col justify-center w-full md:w-[55%] px-10 md:pr-16 lg:pr-24"
      : "inset-y-0 left-0 flex flex-col justify-center w-full md:w-[55%] px-10 md:pl-16 lg:pl-24";

  return (
    <motion.div
      style={{ opacity: opacityValue }}
      className={`absolute ${positionClasses} flex flex-col ${alignClasses}`}
    >
      {/* Badge */}
      {overlay.badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${accent.border} ${accent.bg} backdrop-blur-sm mb-5`}>
          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
          <span className={`text-xs tracking-[0.2em] uppercase font-medium ${accent.text}`}>
            {overlay.badge}
          </span>
        </div>
      )}

      {/* Subtitle above title */}
      {overlay.subtitle && (
        <p className={`text-sm tracking-[0.25em] uppercase mb-3 ${accent.text}`}>
          {overlay.subtitle}
        </p>
      )}

      {/* Main title */}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white/95 mb-4 leading-[1.05] whitespace-pre-line">
        {overlay.title}
      </h2>

      {/* Thin accent line */}
      <div className={`w-12 h-px mb-5 ${overlay.align === "right" ? "ml-auto" : overlay.align === "center" ? "mx-auto" : ""} bg-white/30`} />

      {/* Description */}
      <p className="text-base md:text-lg text-white/60 max-w-md leading-relaxed mb-6">
        {overlay.description}
      </p>

      {/* Stats row */}
      {overlay.stats && overlay.stats.length > 0 && (
        <div className={`flex gap-3 mb-4 flex-wrap ${overlay.align === "center" ? "justify-center" : overlay.align === "right" ? "justify-end" : "justify-start"}`}>
          {overlay.stats.map((s, i) => (
            <StatPill key={i} label={s.label} value={s.value} accent={accent} />
          ))}
        </div>
      )}

      {/* Feature list */}
      {overlay.features && overlay.features.length > 0 && (
        <FeatureList features={overlay.features} accent={accent} />
      )}

      {/* CTA button */}
      {overlay.isCTA && (
        <button
          className={`
            mt-2 pointer-events-auto ${overlay.align === "center" ? "self-center" : overlay.align === "right" ? "self-end" : "self-start"}
            group relative px-9 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium
            border border-white/25 text-white/90
            hover:border-white/60 hover:text-white
            transition-all duration-500 overflow-hidden
          `}
        >
          <span className="relative z-10">Reserve Your Tour</span>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500 rounded-full" />
        </button>
      )}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CanvasSequence({ folderPrefix, totalFrames, overlays }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // ── Preload frames ──────────────────────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      img.src = getFramePath(folderPrefix, i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) setImagesLoaded(true);
      };
      img.onerror = () => {
        // still count failed frames so we don't hang forever
        loadedCount++;
        if (loadedCount === totalFrames) setImagesLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [folderPrefix, totalFrames]);

  // ── Canvas render loop ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let animationFrameId: number;

    const render = () => {
      const currentFrame = Math.round(frameIndex.get());
      const image = imagesRef.current[currentFrame];
      if (!image?.complete) return;

      const dpr = window.devicePixelRatio || 1;
      
      canvas.width  = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.scale(dpr, dpr);

      const hRatio = window.innerWidth  / image.width;
      const vRatio = window.innerHeight / image.height;
      const ratio  = Math.max(hRatio, vRatio);

      const shiftX = (window.innerWidth  - image.width  * ratio) / 2;
      const shiftY = (window.innerHeight - image.height * ratio) / 2;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(image, 0, 0, image.width, image.height, shiftX, shiftY, image.width * ratio, image.height * ratio);
    };

    render();
    const unsubscribe  = frameIndex.on("change", () => { animationFrameId = requestAnimationFrame(render); });
    const handleResize = () => { animationFrameId = requestAnimationFrame(render); };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded, frameIndex]);

  // ── Scroll-synced opacity for each overlay ──────────────────────────────────
  const opacity1 = useTransform(scrollYProgress, [0,    0.1,  0.2,  0.25], [1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3,  0.4,  0.45], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.5,  0.7,  0.75], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.8,  0.9,  1,    1   ], [0, 1, 1, 1]);
  const opacities = [opacity1, opacity2, opacity3, opacity4];

  // ── Progress dots ───────────────────────────────────────────────────────────
  const dotOpacity = [
    useTransform(scrollYProgress, [0, 0.2], [1, 0]),
    useTransform(scrollYProgress, [0.2, 0.25, 0.45], [0, 1, 0]),
    useTransform(scrollYProgress, [0.45, 0.5, 0.75], [0, 1, 0]),
    useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]),
  ];

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Loading screen ── */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-50 gap-6">
            <div className="flex gap-1.5">
              {[0,1,2,3].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase">
              Loading Experience
            </p>
          </div>
        )}

        {/* ── Canvas ── */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full brightness-110 saturate-125 contrast-[1.15]"
          style={{ display: "block" }}
        />
        
        {/* Subtle cinematic color tint (warm amber luxury feel) */}
        <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay pointer-events-none" />

        {/* ── Cinematic vignette — top & bottom darkening ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* top fade */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
          {/* left edge for left-aligned text */}
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-black/40 to-transparent" />
          {/* right edge for right-aligned text */}
          <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-black/40 to-transparent" />
        </div>

        {/* ── Text overlays ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {overlays.map((overlay, index) => (
            <OverlayPanel
              key={overlay.id}
              overlay={overlay}
              opacityValue={opacities[index]}
            />
          ))}
        </div>

        {/* ── Progress indicator (right side dots) ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5 pointer-events-none">
          {dotOpacity.map((op, i) => (
            <motion.div
              key={i}
              style={{ opacity: op }}
              className="w-1 h-1 rounded-full bg-white/60"
            />
          ))}
        </div>

        {/* ── Scroll hint (fades out after first section) ── */}
        <motion.div
          style={{ opacity: opacity1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </motion.div>

        {/* ── Section label (top-left) ── */}
        <div className="absolute top-7 left-8 z-20 pointer-events-none">
          <p className="text-white/20 text-[10px] tracking-[0.35em] uppercase font-medium">
            Luxury Residences
          </p>
        </div>

        {/* ── Frame counter (top-right, dev-friendly) ── */}
        <div className="absolute top-7 right-8 z-20 pointer-events-none">
          <p className="text-white/15 text-[10px] tracking-[0.25em] font-mono uppercase">
            {String(totalFrames).padStart(2, "0")} Frames
          </p>
        </div>

      </div>
    </div>
  );
}