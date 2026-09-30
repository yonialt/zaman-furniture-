"use client";

/**
 * SmartImage — next/image wrapper used by all homepage photography.
 * - Renders a dark gradient placeholder that stays if the image fails to load
 * - Lazy-loads by default (pass `preload` for above-the-fold art)
 * - Optional `zoomOnGroupHover` wraps the image in a scale-1.04-on-hover layer
 *   driven by the nearest Tailwind `group` — used by the interactive cards.
 */
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SmartImageProps = Omit<ImageProps, "onError"> & {
  /** Swap the photo for the fallback gradient (set automatically on load error). */
  forceFallback?: boolean;
  /** Wrap in a layer that scales to 1.04 when the parent `.group` is hovered. */
  zoomOnGroupHover?: boolean;
};

const FALLBACK_GRADIENT =
  "bg-[radial-gradient(120%_120%_at_50%_0%,#1a1d24_0%,#0b0d12_55%,#050608_100%)]";

export default function SmartImage({
  zoomOnGroupHover = false,
  forceFallback = false,
  className = "",
  alt,
  preload = false,
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = failed || forceFallback;

  const img = showFallback ? (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 ${FALLBACK_GRADIENT} ${className}`}
    />
  ) : (
    <Image
      alt={alt}
      onError={() => setFailed(true)}
      preload={preload}
      loading={preload ? undefined : "lazy"}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      {...rest}
    />
  );

  if (!zoomOnGroupHover) return img;

  return (
    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
      {img}
    </div>
  );
}
