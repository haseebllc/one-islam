// hooks/useCursorEffect.ts
"use client";

import $ from "jquery";
import { useEffect } from "react";

const useCursorEffect = (ref: any) => {
  const cursor_startDefault = () => {
    useEffect(() => {
      $(ref.current).css({
        opacity: "1",
        position: "absolute",
        width: "16px",
        height: "16px",
        backgroundColor: "black",
        borderRadius: "100%",
        zIndex: "2",
        transition: "0.3s cubic-bezier(.34,.92,.37,.99)",
        pointerEvents: "none",
      });

      let animationFrameId: number;

      const handleMouseMove = (e: MouseEvent) => {
        if (ref.current) {
          animationFrameId = requestAnimationFrame(() => {
            $(ref.current).css({
              top: e.pageY - 7 + "px",
              left: e.pageX - 7 + "px",
            });
          });
        }
      };
      const handleMouseDown = () => {
        if (ref.current) {
          $(ref.current).css({
            transform: "scale(0.3)",
          });
        }
      };
      const handleMouseUp = () => {
        if (ref.current) {
          $(ref.current).css({
            transform: "scale(1)",
          });
        }
      };

      $(window).on({
        mousemove: handleMouseMove,
        mousedown: handleMouseDown,
        mouseup: handleMouseUp,
      });
      // Clean up event listeners on-unmount
      return () => {
        $(window).off({
          mousemove: handleMouseMove,
          mousedown: handleMouseDown,
          mouseup: handleMouseUp,
        });
        // Cancel any pending animation-frames
        cancelAnimationFrame(animationFrameId);
      };
    }, []);
  };

  const cursor_Small = () => {
    if (ref.current) {
      $(ref.current).css({
        transform: "scale(.3)",
      });
    }
  };
  const cursor_Large = () => {
    if (ref.current) {
      $(ref.current).css({
        transform: "scale(2.5)",
        opacity: "25%",
      });
    }
  };
  const cursor_default = () => {
    if (ref.current) {
      $(ref.current).css({
        transform: "scale(1)",
        opacity: "1",
      });
    }
  };
  const cursor_destroy = () => {
    if (ref.current) {
      $(ref.current).css({
        opacity: "0",
        transform: "scale(0)",
      });
    }
  };

  return {
    cursor_startDefault,
    cursor_Small,
    cursor_Large,
    cursor_default,
    cursor_destroy,
  };
};

export default useCursorEffect;
