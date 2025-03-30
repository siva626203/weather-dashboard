"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { CloudRain, Sun, MapPin, Globe } from "lucide-react";
import Loading from "./loading";

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const titleRef = useRef(null);
  const fadeInRef = useRef(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef(null);
  const sunRef = useRef(null);
  const ballsRef = useRef<HTMLDivElement[]>([]);

  const [local, setLocal] = useState<any>();

  const fetchLocalData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_IP_API || "https://ipapi.co/json/"
      );
      if (!response.ok) throw new Error("Failed to fetch IP data");
      const data = await response.json();
      setLocal(data);
    } catch (error) {
      console.error("Failed to fetch IP:", error);
      setLocal("We can't detect your IP address!");
    }
  };

  useEffect(() => {
    fetchLocalData();
    if (!user && !isLoading) {
      router.push("/api/auth/login");
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (user && locationRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        fadeInRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        locationRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, [user]);

  useEffect(() => {
    gsap.fromTo(
      cloudRef.current,
      { x: "-100vw" },
      { x: "100vw", duration: 12, repeat: -1, ease: "linear" }
    );
    gsap.fromTo(
      sunRef.current,
      { scale: 0 },
      { scale: 1, duration: 2, ease: "elastic.out(1, 0.5)" }
    );

    // RGB Balls Animation
    ballsRef.current.forEach((ball) => {
      gsap.to(ball, {
        x: () => Math.random() * 200 - 100,
        y: () => Math.random() * 200 - 100,
        scale: () => Math.random() * 1.5 + 0.5,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [user]);

  if (isLoading) return <Loading />;
  if (!user) return null;

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden px-4 ">
      {/* RGB Floating Balls */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) ballsRef.current[i] = el;
          }}
          className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full opacity-75"
          style={{
            background: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
              Math.random() * 255
            })`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Animated Floating Elements */}
      <div
        ref={sunRef}
        className="absolute top-5 right-5 md:top-10 md:right-10 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full shadow-lg"
      />
      <div
        ref={cloudRef}
        className="absolute top-10 left-0 w-24 h-12 md:w-32 md:h-16 bg-blue-400 rounded-full shadow-md opacity-80"
      />

      <h1
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold text-center neon-text"
      >
        Welcome, {user.name}!
      </h1>
      <div ref={fadeInRef} className="mt-4 text-lg text-center">
        <p className="opacity-80">Enjoy your personalized weather dashboard.</p>
      </div>

      {/* Location Info with Icons */}
      <div
        ref={locationRef}
        className="mt-6 p-4 md:p-6 bg-white/10 rounded-lg backdrop-blur-md shadow-md w-full max-w-lg space-y-3 text-center "
      >
        <p className="flex items-center gap-2 text-lg justify-center">
          <Globe /> Your Network IP: {local?.ip || "Loading..."}
        </p>
        <p className="flex items-center gap-2 text-lg justify-center">
          <MapPin /> City: {local?.city || "Loading..."}
        </p>
        <p className="flex items-center gap-2 text-lg justify-center">
          🌎 Country: {local?.country || "Loading..."}
        </p>
        <p className="flex items-center gap-2 text-lg justify-center">
          🏛️ State: {local?.region || "Loading..."}
        </p>
        <p className="flex items-center gap-2 text-lg justify-center">
          📍 Postal Code: {local?.postal || "Loading..."}
        </p>
        <p className="flex items-center gap-2 text-lg justify-center">
          ⏰ Time Zone: {local?.timezone || "Loading..."}
        </p>
        <p className="flex items-center gap-2 text-lg justify-center">
          📡 Network Provider: {local?.org || "Loading..."}
        </p>
      </div>
    </div>
  );
}
