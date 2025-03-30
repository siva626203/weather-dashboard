'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const ghostRef = useRef(null);
  const textRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    gsap.fromTo(
      ghostRef.current,
      { y: -10 },
      { y: 10, repeat: -1, yoyo: true, ease: "power1.inOut", duration: 1 }
    );
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="relative">
        <span className="text-9xl font-bold absolute left-0 top-0 opacity-20">
          4
        </span>
        <div
          ref={ghostRef}
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg relative"
        >
          👻
        </div>
        <span className="text-9xl font-bold absolute right-0 top-0 opacity-20">
          4
        </span>
      </div>
      <h1 ref={textRef} className="text-4xl font-bold mt-5">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-400 mt-2">
        The page you're looking for doesn't exist.
      </p>
      <Button className="mt-6 hover:cursor-pointer" onClick={() => router.push("/")}>
        Go Home
      </Button>
    </div>
  );
}
