import { useEffect, RefObject } from 'react';

export const useHorizontalScroll = (ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const currentContainer = ref.current;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      currentContainer!.scrollLeft += event.deltaY;
    };

    currentContainer?.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    return () => {
      currentContainer?.removeEventListener('wheel', handleWheel);
    };
  }, [ref.current]);
};
