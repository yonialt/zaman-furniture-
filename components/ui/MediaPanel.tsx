"use client";

/**
 * MediaPanel — the asset-free stand-in for product photography.
 * A deep gradient "studio backdrop" with a centered furniture glyph,
 * subtle vignette and film grain. Replace with <Image> when real
 * photography is available; every consumer already passes className
 * and children so the swap is mechanical.
 */
import { motion } from "framer-motion";
import FurnitureGlyph from "./FurnitureGlyph";

type GlyphKind = "sofa" | "table" | "chair" | "closet";

interface MediaPanelProps {
  /** Which furniture silhouette anchors the composition. */
  glyph?: GlyphKind;
  /** Visual flavor of the studio backdrop. */
  tone?: "graphite" | "bronze" | "oak" | "slate" | "ivory";
  className?: string;
  children?: React.ReactNode;
}

const TONES: Record<NonNullable<MediaPanelProps["tone"]>, string> = {
  graphite:
    "bg-[radial-gradient(120%_120%_at_50%_0%,#1a1d24_0%,#0b0d12_55%,#050608_100%)]",
  bronze:
    "bg-[radial-gradient(120%_120%_at_50%_0%,#2b241a_0%,#16120c_55%,#080605_100%)]",
  oak: "bg-[radial-gradient(120%_120%_at_50%_0%,#241d14_0%,#120e09_55%,#070503_100%)]",
  slate: "bg-[radial-gradient(120%_120%_at_50%_0%,#1d232c_0%,#0d1015_55%,#05070a_100%)]",
  ivory: "bg-[radial-gradient(120%_120%_at_50%_0%,#2e2c26_0%,#151410_55%,#080806_100%)]",
};

const GLYPH_TONE: Record<NonNullable<MediaPanelProps["tone"]>, string> = {
  graphite: "text-white/25",
  bronze: "text-amber-200/25",
  oak: "text-orange-200/20",
  slate: "text-sky-100/20",
  ivory: "text-yellow-100/20",
};

export default function MediaPanel({
  glyph = "sofa",
  tone = "graphite",
  className = "",
  children,
}: MediaPanelProps) {
  return (
    <div
      className={`relative overflow-hidden ${TONES[tone]} ${className}`}
      aria-hidden="true"
    >
      {/* Film-grain / texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_45%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {/* Anchor silhouette */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ scale: 1 }}
      >
        <FurnitureGlyph
          kind={glyph}
          className={`h-1/2 w-1/2 max-w-[280px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.6)] ${GLYPH_TONE[tone]}`}
        />
      </motion.div>

      {children}
    </div>
  );
}
