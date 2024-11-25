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
        <Button
          size="lg"
          className="animate-fade-up animate-delay-300 bg-primary text-white hover:bg-opacity-90"
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
}
