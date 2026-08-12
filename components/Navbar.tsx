"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-8 md:px-12 py-4 flex items-center justify-between
        ${isScrolled ? "bg-[#050505]/75 backdrop-blur-md border-b border-white/5" : "bg-transparent"}
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold tracking-tight text-white/90 hover:text-white transition-colors">
          AeroForm
        </Link>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex flex-1 justify-center space-x-8">
        {["Overview", "Craftsmanship", "Ergonomics", "Specs", "Inquire"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-white/60 hover:text-white/90 transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex-1 flex justify-end">
        <button className="relative px-6 py-2 rounded-full bg-transparent overflow-hidden group">
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-20 group-hover:opacity-40 transition-opacity duration-300"></span>
          <span className="absolute inset-0 w-full h-full border border-white/10 rounded-full group-hover:border-transparent transition-colors duration-300"></span>
          <span className="absolute inset-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: "1px", background: "linear-gradient(to right, var(--primary), var(--secondary))", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}></span>
          
          <span className="relative text-sm font-medium text-white/90 group-hover:text-white transition-colors">
            Reserve Order
          </span>
          <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(0,80,255,0)] group-hover:shadow-[0_0_20px_rgba(0,80,255,0.4)] transition-shadow duration-500 pointer-events-none"></div>
        </button>
      </div>
    </motion.nav>
  );
}
