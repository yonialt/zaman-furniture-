"use client";

import { useEffect, useRef, useState } from "react";

interface CanvasSequenceProps {
  progress: number;
}

export default function CanvasSequence({ progress }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 300;

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          // All images loaded, could trigger a state if needed
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate current frame based on progress (0 to 1)
    const currentFrameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(progress * frameCount))
    );

    const img = images[currentFrameIndex];

    if (img && img.complete) {
      // Ensure canvas matches screen dimensions for crispness
      const { innerWidth, innerHeight } = window;
      
      // Update canvas size if it doesn't match window
      if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
      }

      // We want to fill the screen while maintaining aspect ratio (object-fit: cover equivalent)
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image
        renderHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        // Canvas is taller than image
        renderWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - renderWidth) / 2;
      }

      // Clear canvas with the background color
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    }
  }, [progress, images]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ backgroundColor: "#050505" }}
      />
    </div>
  );
}
