'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Anima un numero verso il suo valore finale.
 * Al primo render restituisce subito il valore finale, così il markup del
 * server e quello del browser coincidono (niente errori di idratazione).
 */
export default function useCountUp(target: number, duration = 500): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number>();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      fromRef.current = target;
      setValue(target);
      return;
    }

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || duration <= 0) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    const from = fromRef.current;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (target - from) * eased;
      setValue(current);
      if (p < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      fromRef.current = target;
    };
  }, [target, duration]);

  return value;
}
