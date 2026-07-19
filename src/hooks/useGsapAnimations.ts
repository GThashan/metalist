import { useEffect, useLayoutEffect } from "react";
import { runGsapAnimations, ScrollTrigger } from "../lib/gsapSetup";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Re-runs GSAP scroll animations whenever `deps` change (e.g. page navigation).
 */
export function useGsapAnimations(deps: unknown[] = []) {
  useIsoLayoutEffect(() => {
    const cleanup = runGsapAnimations(document);

    // Recalculate after fonts/images settle
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshId);
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
