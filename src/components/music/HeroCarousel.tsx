import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
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
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Auto-play functionality
    const timer = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);

    // Update current slide
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(timer);
    };
  }, [api]);

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {musicianImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-0 shadow-elevated overflow-hidden bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Carousel Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {musicianImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index 
                ? 'bg-white shadow-glow' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};