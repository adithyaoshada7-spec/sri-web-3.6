import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

const THRESHOLDS = [25, 50, 75, 90] as const;

/**
 * Fires scroll_25 / scroll_50 / scroll_75 / scroll_90 once each per page view,
 * so we can see where users stop reading (GA4 funnel drop-off analysis).
 */
export function useScrollDepthTracking(pageLabel: string) {
  useEffect(() => {
    const fired = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = (scrollTop / docHeight) * 100;

      THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackEvent(`scroll_${threshold}`, "engagement", pageLabel);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageLabel]);
}
