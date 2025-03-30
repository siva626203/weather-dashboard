"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
  const loaderRef = useRef(null);

  useEffect(() => {
    gsap.to(loaderRef.current, {
      rotate: 360,
      repeat: -1,
      duration: 1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        ref={loaderRef}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
}
