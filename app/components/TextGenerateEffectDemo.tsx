"use client";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { useState, useEffect } from "react";

const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows`;

export function TextGenerateEffectDemo() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getFontSize = () => {
    if (windowWidth < 640) return "text-sm";
    if (windowWidth < 768) return "text-base";
    if (windowWidth < 1024) return "text-lg";
    return "text-xl";
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${getFontSize()}`}>
          <TextGenerateEffect words={words} />
        </div>
      </div>
    </section>
  );
}