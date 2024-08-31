"use client";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { useState, useEffect } from "react";

const words = ` Full stack developer specializing in Java backend and React.js frontend technologies. I craft robust, scalable web applications that seamlessly integrate server-side logic with dynamic user interfaces. My expertise spans the entire development lifecycle, from conceptualization to deployment and maintenance.`;

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
        <div 
          className={`p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${getFontSize()}`}
        >
          <h1 className="text-center ">
            <b>ABOUT ME</b>
          </h1>
          <TextGenerateEffect words={words} />
        </div>
      </div>
    </section>
  );
}
