import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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

    // Auto-play functionality - 6 seconds per image
    const timer = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);

    // Update current slide for fade effect
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(timer);
    };
  }, [api]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
          dragFree: false,
          containScroll: false,
        }}
      >
        <CarouselContent className="-ml-0">
          {musicianImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full lg:h-screen object-cover transition-opacity duration-1000 pointer-events-none select-none"
                  style={{
                    opacity: current === index ? 1 : 0,
                    position: current === index ? 'relative' : 'absolute',
                    top: current === index ? 'auto' : 0,
                    left: current === index ? 'auto' : 0,
                  }}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};