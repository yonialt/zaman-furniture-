"use client";

/**
 * SectionHeading — shared editorial header for every page section:
 * small-caps eyebrow, large display title, and an optional lede.
 */
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal
      className={`flex flex-col gap-4 ${alignment} ${className}`}
      from={align === "center" ? "up" : "left"}
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
        {eyebrow}
      </span>
      <h2 className="max-w-2xl text-balance text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {lede && (
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/50 md:text-base">
          {lede}
        </p>
      )}
    </Reveal>
  );
}
