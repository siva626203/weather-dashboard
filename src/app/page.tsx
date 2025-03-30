"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TransitionLink from "./components/TransitionLink";
import { useUser } from "@auth0/nextjs-auth0/client";
import Witcher from "@/images/witch-7518.gif"
import Image from "next/image";
export default function Home() {
  const { user } = useUser();
  const cloudRef = useRef<HTMLDivElement | null>(null);
  const moonRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      !cloudRef.current ||
      !moonRef.current ||
      !lightRef.current ||
      !contentRef.current ||
      !glowRef.current ||
      !starsRef.current
    )
      return;

    gsap.fromTo(
      cloudRef.current,
      { x: "-100vw" },
      { x: "100vw", duration: 12, repeat: -1, ease: "linear" }
    );

    gsap.fromTo(
      moonRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power2.out" }
    );

    gsap.to(lightRef.current, {
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.to(glowRef.current, {
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animate Stars: Moving and Glowing Effect
    if (!starsRef.current) return;

    const stars = Array.from(starsRef.current.children);

    gsap.to(stars, {
      x: () => Math.random() * 100 - 50, // Random horizontal movement
      y: () => Math.random() * 100 - 50, // Random vertical movement
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1,
    });

    gsap.to(stars, {
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  }, []);

  useEffect(() => {
    const moveCursor = (e: any) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* Custom Mouse Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 flex items-center justify-center text-blue-400 pointer-events-none z-50"
      />

      {/* Left Side - Night Sky with Moon and Stars */}
      <div className="relative flex-1 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center overflow-hidden">
        {/* Stars */}
        <div
          ref={starsRef}
          className="absolute inset-0 flex flex-wrap opacity-80"
        >
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
              }}
            />
          ))}
        </div>

        {/* Moon */}
        <div
          ref={moonRef}
          className="w-24 h-24 bg-gray-300 rounded-full shadow-2xl animate-pulse"
        />

        {/* Moving Cloud */}
        <div
          ref={cloudRef}
          className="absolute top-20 w-40 h-20 bg-white/80 rounded-full shadow-md"
        >
          <Image src={Witcher} alt="witcher"/>
        </div>

        {/* Moonlight Glow Effect */}
        <div
          ref={lightRef}
          className="absolute w-96 h-96 bg-gray-200 opacity-0 blur-3xl rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Right Side - Background Video and Content */}
      <div className="relative flex-1 flex items-center justify-center bg-gray-900 text-white p-6">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40 z-0"
          autoPlay
          loop
          muted
        >
          <source src="/asserts/Weather.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Box with Glow & Animation */}
        <div
          ref={contentRef}
          className="relative z-10 text-center space-y-6 backdrop-blur-lg bg-black/50 p-8 rounded-lg shadow-xl transition-all"
        >
          <h1
            ref={glowRef}
            className="text-4xl font-bold text-white drop-shadow-md animate-pulse"
          >
            Welcome to Weather App
          </h1>
          {user ? (
            <TransitionLink href="/dashboard" label="Go to Dashboard" />
          ) : (
            <TransitionLink href="/api/auth/login" label="Login" />
          )}
        </div>
      </div>
    </div>
  );
}
