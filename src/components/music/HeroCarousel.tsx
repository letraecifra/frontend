import { useEffect, useState } from "react";
import musician1 from "@/assets/musician-1.jpg";
import musician2 from "@/assets/musician-2.jpg";
import musician3 from "@/assets/musician-3.jpg";
import musician4 from "@/assets/musician-4.jpg";
import musician5 from "@/assets/musician-5.jpg";

const musicianImages = [
  { src: musician1, alt: "Amateur guitarist learning songs" },
  { src: musician2, alt: "Piano student practicing music" },
  { src: musician3, alt: "Ukulele player with joyful expression" },
  { src: musician4, alt: "Violin learner concentrating" },
  { src: musician5, alt: "Singer with acoustic guitar" },
];

interface HeroCarouselProps {
  className?: string;
}

export const HeroCarousel = ({ className = "" }: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {    
    // Auto-play functionality - 6 seconds per image
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % musicianImages.length);
    }, 6000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={`w-screen lg:w-full h-full ${className}`}>
      <div className="relative w-full h-full overflow-hidden">
        {musicianImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none select-none touch-none"
            style={{
              opacity: current === index ? 1 : 0,
            }}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};