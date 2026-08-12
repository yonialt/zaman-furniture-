"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
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

  // Text Animations mapped to scrollYProgress (0 to 1)
  
  // 1. HERO (0 - 0.15)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 1], [1, 1, 0, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15, 1], [0, -50, -50]);

  // 2. ENGINEERING REVEAL (0.15 - 0.40)
  const engOpacity = useTransform(scrollYProgress, [0, 0.14, 0.15, 0.20, 0.35, 0.40, 1], [0, 0, 0, 1, 1, 0, 0]);
  const engY = useTransform(scrollYProgress, [0, 0.14, 0.15, 0.20, 0.35, 0.40, 1], [50, 50, 50, 0, 0, -50, -50]);

  // 3. ERGONOMICS & INTERIORS (0.40 - 0.65)
  const ergoOpacity = useTransform(scrollYProgress, [0, 0.39, 0.40, 0.45, 0.60, 0.65, 1], [0, 0, 0, 1, 1, 0, 0]);
  const ergoY = useTransform(scrollYProgress, [0, 0.39, 0.40, 0.45, 0.60, 0.65, 1], [50, 50, 50, 0, 0, -50, -50]);

  // 4. MATERIAL ARTISTRY (0.65 - 0.85)
  const matOpacity = useTransform(scrollYProgress, [0, 0.64, 0.65, 0.70, 0.80, 0.85, 1], [0, 0, 0, 1, 1, 0, 0]);
  const matY = useTransform(scrollYProgress, [0, 0.64, 0.65, 0.70, 0.80, 0.85, 1], [50, 50, 50, 0, 0, -50, -50]);

  // 5. REASSEMBLY & CTA (0.85 - 1.0)
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.84, 0.85, 0.90, 1.0], [0, 0, 0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0, 0.84, 0.85, 0.90, 1.0], [50, 50, 50, 0, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-background">
      
      {/* Sticky Canvas & Text Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Canvas Sequence Background */}
        <CanvasSequence progress={progress} />

        {/* Overlay Content wrapper */}
        <div className="absolute inset-0 w-full h-full pointer-events-none px-8 md:px-24 py-32 flex flex-col justify-center">
          
          {/* 1. HERO */}
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }} 
            className="absolute inset-0 flex flex-col items-center justify-center text-center mt-32"
          >
            <h1 className="text-5xl md:text-8xl font-bold text-white/95 tracking-tighter mb-4 shadow-black/50 drop-shadow-lg">
              AeroForm Luxe
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium tracking-wide mb-2 drop-shadow-md">
              Sit in absolute stillness.
            </p>
            <p className="text-md md:text-lg text-white/60 max-w-lg mx-auto">
              Flagship modern seating, re-engineered for total architectural harmony.
            </p>
          </motion.div>

          {/* 2. ENGINEERING REVEAL */}
          <motion.div 
            style={{ opacity: engOpacity, y: engY }} 
            className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 max-w-md"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white/95 tracking-tight mb-6">
              Precision-engineered for comfort.
            </h2>
            <div className="space-y-4">
              <p className="text-white/60 text-lg leading-relaxed">
                Kiln-dried hardwood frames, reinforced steel tension cores, and optimized weight distribution deliver structural integrity.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                Every layer is calibrated for balance, support, and longevity—decade after decade.
              </p>
            </div>
          </motion.div>

          {/* 3. ERGONOMICS & INTERIORS */}
          <motion.div 
            style={{ opacity: ergoOpacity, y: ergoY }} 
            className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 max-w-md text-right"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white/95 tracking-tight mb-6">
              Adaptive support, redefined.
            </h2>
            <div className="space-y-4 text-white/60 text-lg leading-relaxed">
              <p>Multi-density foam matrix responds to every point of contact.</p>
              <p>Real-time weight distribution adapts effortlessly to your posture.</p>
              <p>The external environment fades—your living space becomes a true sanctuary.</p>
            </div>
          </motion.div>

          {/* 4. MATERIAL ARTISTRY */}
          <motion.div 
            style={{ opacity: matOpacity, y: matY }} 
            className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 max-w-md"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white/95 tracking-tight mb-6">
              Immersive, lifelike comfort.
            </h2>
            <div className="space-y-4 text-white/60 text-lg leading-relaxed">
              <p>High-performance tailoring unlocks detail, depth, and texture in every single hide.</p>
              <p>Expertly integrated support layers restore structural form over time, ensuring every seating experience feels brand new.</p>
            </div>
          </motion.div>

          {/* 5. REASSEMBLY & CTA */}
          <motion.div 
            style={{ opacity: ctaOpacity, y: ctaY }} 
            className="absolute inset-0 flex flex-col items-center justify-center text-center mt-32 pointer-events-auto"
          >
            <h2 className="text-4xl md:text-7xl font-bold text-white/95 tracking-tight mb-4 shadow-black/50 drop-shadow-lg">
              See everything. Feel nothing else.
            </h2>
            <p className="text-xl text-white/80 font-medium mb-10 drop-shadow-md">
              AeroForm Luxe. Designed for focus, crafted for modern spaces.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:shadow-[0_0_30px_rgba(0,214,255,0.4)] transition-all duration-300 transform hover:scale-105">
                Experience AeroForm
              </button>
              <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/5 transition-all duration-300">
                View Bespoke Options
              </button>
            </div>
            <p className="mt-8 text-sm text-white/40 tracking-widest uppercase">
              Engineered for penthouses, premium studios, and everything in between.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
