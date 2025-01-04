// hooks/useCountScroll.ts
"use client";
import {
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
const useCountScroll = (
  counterParentRef: RefObject<HTMLDivElement | HTMLElement>,
  setElementCount: Dispatch<SetStateAction<number>>,
  targetCount: number
) => {
  // start Counter
  let counterInterval: any;

  const countUp = useCallback(() => {
    let count = 0;
    const duration = 2000; // 2 seconds
    const interval = 10; // interval for smoother animation
    const increment = targetCount / (duration / interval);

    counterInterval = setInterval(() => {
      count += increment;
      count = globalThis.Math.round(count);
      setElementCount(count);

      if (count >= targetCount) {
        clearInterval(counterInterval);
      }
    }, interval);

    return () => clearInterval(counterInterval);
  }, [setElementCount, targetCount]);

  // Reset Couner
  const resetCount = () => {
    setElementCount(0);
    clearInterval(counterInterval);
  };

  useEffect(() => {
    let hasCounted = false;
    const handleScroll = () => {
      if (
        !hasCounted &&
        counterParentRef.current &&
        window.scrollY >= counterParentRef.current.offsetTop - 500
      ) {
        countUp();
        hasCounted = true;
      } else if (
        counterParentRef.current &&
        window.scrollY < counterParentRef.current?.offsetTop - 500
      ) {
        resetCount();
        hasCounted = false;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [countUp, counterParentRef]);
};

export default useCountScroll;
