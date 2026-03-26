"use client";

import { useState, useEffect, useRef } from "react";

const FULL_TEXT = "Lunal is now Confidential AI (Conf AI). Same team, same mission, new name.";
const BOLD_END = "Lunal is now Confidential AI (Conf AI).".length;
const CHAR_DELAY = 30;
const SLIDE_DURATION = 500;

export function RenameBanner() {
  const [visible, setVisible] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCharCount((prev) => {
          if (prev >= FULL_TEXT.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, CHAR_DELAY);
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const displayed = FULL_TEXT.slice(0, charCount);
  const boldPart = displayed.slice(0, BOLD_END);
  const restPart = displayed.slice(BOLD_END);

  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-out"
      style={{
        maxHeight: visible ? "5rem" : "0",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="bg-accent text-background text-center text-sm py-2 px-4 font-medium">
        <strong>{boldPart}</strong>
        {restPart}
        <span
          className="inline-block w-[2px] h-[1em] bg-background align-text-bottom ml-[1px]"
          style={{
            animation: charCount < FULL_TEXT.length ? "none" : "blink 1s step-end infinite",
            opacity: charCount === 0 ? 0 : 1,
          }}
        />
      </div>
    </div>
  );
}
