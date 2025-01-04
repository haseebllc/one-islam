// hooks/useZoomIn
"use client";

import { useEffect } from "react";

const useZoomIn = (ref: any) => {
  useEffect(() => {
    if (!ref.current) return;
    let isIntersecting = false;

    const onScroll = () => {
      if (!isIntersecting) return;
      const scrollPercent = globalThis.Math.max(
        0,
        (window.scrollY - (ref.current.offsetTop + window.innerHeight)) / 100
      );
      const scale = 1 + globalThis.Math.max(0, scrollPercent * 0.03);
      ref.current.style.transform = `scale(${scale})`;
    };

    const zoomObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry.isIntersecting;

        if (isIntersecting) {
          window.addEventListener("scroll", onScroll);
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      {
        threshold: 0,
      }
    );

    zoomObserver.observe(ref.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      zoomObserver.disconnect();
    };
  }, [ref]);
};

export default useZoomIn;
