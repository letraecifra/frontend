import { type ReactNode, useEffect, useState } from 'react';

import musician1 from '~/assets/musician-1.jpg';
import musician2 from '~/assets/musician-2.jpg';
import musician3 from '~/assets/musician-3.jpg';
import musician4 from '~/assets/musician-4.jpg';
import musician5 from '~/assets/musician-5.jpg';

const CAROUSEL_INTERVAL_IN_MS = 6000;

const musicianImages = [
  { src: musician1, alt: 'Amateur guitarist learning songs' },
  { src: musician2, alt: 'Piano student practicing music' },
  { src: musician3, alt: 'Ukulele player with joyful expression' },
  { src: musician4, alt: 'Violin learner concentrating' },
  { src: musician5, alt: 'Singer with acoustic guitar' },
];

interface HeroCarouselProps {
  className?: string;
}

export function HeroCarousel({ className = '' }: HeroCarouselProps): ReactNode {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Auto-play functionality - 6 seconds per image
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % musicianImages.length);
    }, CAROUSEL_INTERVAL_IN_MS);

    return (): void => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={`w-screen lg:w-full h-full ${className}`}>
      <div className="relative w-full h-full overflow-hidden">
        {musicianImages.map((image, index) => (
          <img
            key={index}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none select-none touch-none"
            draggable={false}
            style={{
              opacity: current === index ? 1 : 0,
              pointerEvents: 'none',
            }}
            src={image.src}
            alt={image.alt}
          />
        ))}

        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
