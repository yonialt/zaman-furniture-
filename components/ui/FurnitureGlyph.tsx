/**
 * Minimalist line-art furniture silhouettes, drawn as inline SVG so the
 * platform needs zero external image assets for mock content.
 * Swap any <FurnitureGlyph /> for a real <Image /> when assets are ready.
 */
interface FurnitureGlyphProps {
  kind: "sofa" | "table" | "chair" | "closet";
  className?: string;
}

export default function FurnitureGlyph({ kind, className }: FurnitureGlyphProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {kind === "sofa" && (
        <g {...common}>
          {/* Backrest */}
          <path d="M14 46 V30 a8 8 0 0 1 8-8 h76 a8 8 0 0 1 8 8 v16" />
          {/* Seat split */}
          <line x1="60" y1="46" x2="60" y2="34" />
          <line x1="14" y1="46" x2="106" y2="46" />
          {/* Arms */}
          <path d="M8 62 V44 a6 6 0 0 1 6-6" />
          <path d="M112 62 V44 a6 6 0 0 1-6-6" />
          <line x1="8" y1="62" x2="112" y2="62" />
          {/* Legs */}
          <line x1="20" y1="62" x2="20" y2="70" />
          <line x1="100" y1="62" x2="100" y2="70" />
        </g>
      )}

      {kind === "table" && (
        <g {...common}>
          {/* Slab top */}
          <path d="M8 30 H112" />
          <path d="M12 36 H108" />
          <line x1="8" y1="30" x2="12" y2="36" />
          <line x1="112" y1="30" x2="108" y2="36" />
          {/* Legs */}
          <line x1="26" y1="36" x2="26" y2="68" />
          <line x1="94" y1="36" x2="94" y2="68" />
          {/* Stretcher */}
          <line x1="26" y1="54" x2="94" y2="54" />
        </g>
      )}

      {kind === "chair" && (
        <g {...common}>
          {/* Back */}
          <path d="M44 12 C44 12 40 34 44 46" />
          <path d="M76 12 C76 12 80 34 76 46" />
          <path d="M44 14 Q60 8 76 14" />
          {/* Seat */}
          <path d="M42 46 H78" />
          {/* Base */}
          <path d="M46 46 L42 68" />
          <path d="M74 46 L78 68" />
          <line x1="60" y1="46" x2="60" y2="66" />
          <line x1="48" y1="66" x2="72" y2="66" />
        </g>
      )}

      {kind === "closet" && (
        <g {...common}>
          {/* carcass */}
          <rect x="18" y="8" width="84" height="60" rx="1.5" />
          {/* Doors */}
          <line x1="60" y1="8" x2="60" y2="68" />
          <line x1="54" y1="34" x2="54" y2="42" />
          <line x1="66" y1="34" x2="66" y2="42" />
          {/* Internal shelf hint */}
          <line x1="60" y1="30" x2="102" y2="30" strokeDasharray="3 4" opacity="0.5" />
          {/* Legs */}
          <line x1="24" y1="68" x2="24" y2="74" />
          <line x1="96" y1="68" x2="96" y2="74" />
        </g>
      )}
    </svg>
  );
}
