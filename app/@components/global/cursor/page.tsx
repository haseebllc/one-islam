// components/@components/cursor/page.tsx
"use client";

import React, { useRef } from "react";
import useCursorEffect from "@/app/hooks/useCursorEffect";

import light from "./light.module.scss";
import dark from "./dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";

const CustomCursor = () => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;

  const UseCustomCursorRef = useRef<HTMLDivElement>(null);
  const { cursor_startDefault } = useCursorEffect(UseCustomCursorRef);
  // cursor_startDefault();

  return <div ref={UseCustomCursorRef} className="custom-cursor"></div>;
};

export default CustomCursor;
