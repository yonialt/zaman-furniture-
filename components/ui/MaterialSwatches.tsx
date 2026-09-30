"use client";

/**
 * MaterialSwatches — the colour selector row on product cards and in
 * Quick View. Selecting a colour swaps the card photograph and the label
 * beneath the row; both come from the same ProductColor object.
 *
 * Selection is click/tap + keyboard only (never hover), so it works on
 * touch devices. Each button keeps a small visual dot with a full-size
 * transparent hit area (min 44px) around it.
 */
import type { ProductColor } from "@/lib/types";

interface MaterialSwatchesProps {
  colors: ProductColor[];
  selected: string;
  onSelect: (id: string) => void;
  /** "sm" = card row, "md" = larger dots with visible labels (Quick View). */
  size?: "sm" | "md";
  showLabels?: boolean;
}

export default function MaterialSwatches({
  colors,
  selected,
  onSelect,
  size = "sm",
  showLabels = false,
}: MaterialSwatchesProps) {
  return (
    <div
      role="group"
      aria-label="Colour variants"
      className="flex flex-wrap items-center gap-4"
    >
      {colors.map((color) => {
        const isActive = color.id === selected;
        return (
          <button
            key={color.id}
            type="button"
            onClick={(e) => {
              // Card-safe: these buttons sit inside the whole-card link,
              // so keep the click from navigating the anchor.
              e.preventDefault();
              e.stopPropagation();
              onSelect(color.id);
            }}
            // Touch devices fire click anyway; explicit keyboard handlers
            // make Enter/Space work without relying on <button> quirks.
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onSelect(color.id);
              }
            }}
            aria-label={`Select ${color.label}`}
            aria-pressed={isActive}
            title={showLabels ? undefined : color.label}
            className="group/sw relative -m-2 flex items-center gap-2 p-2 outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span
              className={`relative inline-block rounded-full transition-all duration-300 ${
                size === "md" ? "h-9 w-9" : "h-7 w-7"
              } ${
                isActive
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                  : "ring-1 ring-white/20 group-hover/sw:ring-white/50"
              }`}
              style={{ background: color.hex }}
            />
            {showLabels && (
              <span
                className={`text-xs tracking-wide transition-colors ${
                  isActive ? "text-white" : "text-white/45 group-hover/sw:text-white/75"
                }`}
              >
                {color.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
