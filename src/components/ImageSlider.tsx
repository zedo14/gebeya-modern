import React, { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface ImageSliderProps {
  original: string;
  result: string;
}

export default function ImageSlider({ original, result }: ImageSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  const handleTouchStart = () => {
    isDragging.current = true;
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  useEffect(() => {
    // Cleanup window event listeners
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square bg-[#1a1c1e] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl select-none"
      id="before-after-container"
    >
      {/* Before Image (Original Upload) */}
      <img
        src={original}
        alt="Original Upload"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover grayscale-10"
      />
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white border border-white/10 text-xs tracking-wider px-3 py-1.5 rounded-full font-mono font-medium">
        ORIGINAL SELFIE
      </div>

      {/* After Image (Rendered Studio Result) */}
      <div
        className="absolute inset-y-0 right-0 left-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
      >
        <img
          src={result}
          alt="Studio Style Result"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 z-10 bg-emerald-600/85 backdrop-blur-md text-white border border-emerald-500/20 text-xs tracking-wider px-3 py-1.5 rounded-full font-mono font-medium">
          STUDIO PORTRAIT
        </div>
      </div>

      {/* Slider Split Line */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white cursor-ew-resize z-25 group"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white text-gray-900 border-4 border-gray-900 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-100">
          <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
