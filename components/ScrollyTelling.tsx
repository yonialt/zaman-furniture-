"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import CanvasSequence from "./CanvasSequence";

export default function ScrollyTelling() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the main container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [progress, setProgress] = useState(0);

  // Update canvas progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-background">

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* Canvas Sequence Background */}
        <CanvasSequence progress={progress} />

      </div>
    </div>
  );
}
