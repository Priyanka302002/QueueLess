import { useEffect, useState } from "react";
import { Activity, Shield } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState<"scale" | "pulse" | "fadeout">("scale");

  useEffect(() => {
    // Stage 1: Scale in (1s)
    const scaleTimer = setTimeout(() => {
      setStage("pulse");
    }, 1000);

    // Stage 2: Pulse (1s)
    const pulseTimer = setTimeout(() => {
      setStage("fadeout");
    }, 2000);

    // Stage 3: Fade out and complete (1s)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(scaleTimer);
      clearTimeout(pulseTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] transition-all duration-1000 ${
        stage === "fadeout" ? "opacity-0 translate-y-[-20px]" : "opacity-100"
      }`}
    >
      {/* Main Icon Container */}
      <div 
        className={`relative flex items-center justify-center transition-all ${
          stage === "scale" 
            ? "opacity-0 scale-90" 
            : stage === "pulse"
            ? "opacity-100 scale-100 animate-pulse-soft"
            : "opacity-100 scale-100"
        }`}
        style={{
          transitionDuration: stage === "scale" ? "1000ms" : "300ms",
          transitionTimingFunction: "ease-out"
        }}
      >
        {/* Glow Effect */}
        <div className="absolute w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
        
        {/* Icon Circle */}
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
          {/* Logo Icon */}
          <div className="relative">
            <Activity className="w-12 h-12 text-[#2563EB]" strokeWidth={2} />
            <Shield 
              className="w-6 h-6 text-[#3B82F6] absolute -bottom-1 -right-1" 
              strokeWidth={2}
              fill="white"
            />
          </div>
        </div>
      </div>

      {/* App Name & Tagline */}
      <div 
        className={`mt-8 text-center transition-all ${
          stage === "scale" 
            ? "opacity-0 translate-y-4" 
            : "opacity-100 translate-y-0"
        }`}
        style={{
          transitionDuration: "1000ms",
          transitionDelay: "300ms",
          transitionTimingFunction: "ease-out"
        }}
      >
        <h1 className="text-white text-4xl font-bold mb-2 tracking-tight">
          QueueLess
        </h1>
        <p className="text-white/90 text-lg font-medium">
          AI-Powered Hospital Queue Management
        </p>
      </div>

      {/* Loading Indicator */}
      <div 
        className={`mt-12 transition-opacity ${
          stage === "pulse" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDuration: "500ms",
          transitionDelay: stage === "pulse" ? "300ms" : "0ms"
        }}
      >
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
