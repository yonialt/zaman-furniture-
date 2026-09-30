"use client";

/**
 * ColorStackImage — stacks every colour variant's photo absolutely inside
 * the 4:5 frame and crossfades between them (~200ms opacity), so switching
 * colours never swaps a src (no flash) and the card never changes size.
 *
 * All variants stay mounted underneath; the active one sits on top. That
 * means every variant is fetched as soon as the card mounts (the active
 * one eagerly when `priority`, the rest lazy) — the first colour switch
 * is instant with no white flash.
 *
 * Inherits the card's hover-zoom behaviour via the `group` class (the zoom
 * lives on a wrapper element so its transform transition can't conflict
 * with the images' opacity crossfade).
 */
import Image from "next/image";
import { useState } from "react";
import type { ProductColor } from "@/lib/types";

interface ColorStackImageProps {
  colors: ProductColor[];
  /** id of the currently selected colour (drives the crossfade). */
  selectedId: string;
  alt: string;
  sizes: string;
  /** Preload the first variant (above-the-fold card rows). Next 16 `preload`. */
  preload?: boolean;
  /** Scale to 1.04 when the nearest Tailwind `group` is hovered. */
  zoomOnGroupHover?: boolean;
}

const FALLBACK_GRADIENT =
  "bg-[radial-gradient(120%_120%_at_50%_0%,#1a1d24_0%,#0b0d12_55%,#050608_100%)]";

export default function ColorStackImage({
  colors,
  selectedId,
  alt,
  sizes,
  preload = false,
  zoomOnGroupHover = false,
}: ColorStackImageProps) {
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  const allFailed = colors.every((c) => failedIds.has(c.id));

  const stack = (
    <>
      {colors.map((color, i) => {
        const isActive = color.id === selectedId;
        // The first variant of above-the-fold card rows preloads (it is the
        // LCP image); everything else lazy-loads while still being mounted.
        const isPreload = preload && i === 0;
        return (
          <Image
            key={color.id}
            src={color.image}
            alt={isActive ? alt : ""}
            aria-hidden={!isActive}
            fill
            sizes={sizes}
            preload={isPreload}
            loading={isPreload ? undefined : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-linear ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            onError={() =>
              setFailedIds((prev) => {
                if (prev.has(color.id)) return prev;
                const next = new Set(prev);
                next.add(color.id);
                return next;
              })
            }
          />
        );
      })}
      {allFailed && (
        <div
          role="img"
          aria-label={alt}
          className={`absolute inset-0 ${FALLBACK_GRADIENT}`}
        />
      )}
    </>
  );

  if (!zoomOnGroupHover) return stack;

  // Wrap in a zoom layer driven by the card's `group` class, the same way
  // SmartImage does it for the rest of the homepage.
  return (
    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
      {stack}
    </div>
  );
}
