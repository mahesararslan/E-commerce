"use client";

import img from "../../public/hero5.jpeg";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import WordFadeIn from "./ui/word-fade-in";

const mottos = [
  "Unleash the Future of Tech",
  "Elevate Your Digital Lifestyle",
  "Innovation at Your Fingertips",
  "Discover Tomorrow's Gadgets Today",
];

export function Hero() {
  const [currentMottoIndex, setCurrentMottoIndex] = useState(0);
  const [displayedMotto, setDisplayedMotto] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const currentMotto = mottos[currentMottoIndex];

    if (isDeleting) {
      // Deleting animation
      if (displayedMotto.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedMotto((prev) => prev.slice(0, -1));
        }, 50); // Speed of deletion
      } else {
        setIsDeleting(false);
        setCurrentMottoIndex((prevIndex) => (prevIndex + 1) % mottos.length); // Move to the next motto
      }
    } else {
      // Typing animation
      if (displayedMotto.length < currentMotto.length) {
        timeoutId = setTimeout(() => {
          setDisplayedMotto((prev) => currentMotto.slice(0, prev.length + 1));
        }, 100); // Speed of typing
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause before deleting
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedMotto, isDeleting, currentMottoIndex]);

  return (
    <section
      className="relative lg:py-48 py-32 lg:overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img.src})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10 text-white text-center">
        
          <WordFadeIn className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up" words="Welcome to DeviceHaven" />
        
        <p className="text-3xl mb-8 h-16 font-bold animate-type">
          {displayedMotto}
        </p>
        <CustomButton url="/products">
          Shop Now
        </CustomButton>
      </div>
    </section>
  );
}

export function CustomButton({ children, url }: { children: React.ReactNode, url?: string }) {
  return (
    <a href={url} className="cursor-pointer relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl bg-gradient-to-r from-cyan-500 to-sky-900 group hover:scale-110">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-cyan-200 via-cyan-700 to-cyan-900 group-hover:opacity-100"></span>
        <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
        <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
        <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
        <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
        <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
        <span className="relative">{children}</span>
    </a>
  )
}
