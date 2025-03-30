'use client'
import { useEffect, useRef } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { gsap } from "gsap";

export default function Loading() {
  const cloudRef = useRef(null);

  useEffect(() => {
    gsap.to(cloudRef.current, {
      x: "100vw",
      duration: 5,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-blue-100 w-full">
      {/* Moving Clouds Animation */}
      <div
        ref={cloudRef}
        className="absolute top-10 left-[-50px] w-32 h-16 bg-white rounded-full opacity-80 shadow-md"
      ></div>

      <div className="space-y-4 w-80 text-center">
        <Skeleton className="h-8 w-40 mx-auto" />
        <Skeleton className="h-12 w-32 mx-auto" />
        <Skeleton className="h-6 w-48 mx-auto" />
      </div>
    </div>
  );
}
