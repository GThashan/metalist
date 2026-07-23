import { useEffect, useState } from "react";

/**
 * Shows a loading screen until the page assets are ready,
 * with a minimum display time so the transition feels intentional.
 */
export function usePageLoad(minDuration = 2000) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDuration - elapsed);

      window.setTimeout(() => {
        setIsFadingOut(true);
        window.setTimeout(() => setIsLoading(false), 700);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      return () => window.removeEventListener("load", finish);
    }
  }, [minDuration]);

  return { isLoading, isFadingOut };
}
