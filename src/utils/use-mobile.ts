import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT_IN_PX = 768;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    function onChange(): void {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_IN_PX);
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_IN_PX - 1}px)`);

    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_IN_PX);

    return (): void => {
      mql.removeEventListener('change', onChange);
    };
  }, []);

  return !!isMobile;
}
