"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Disable native scroll restoration so refreshes always start at the top
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Initialize Lenis with cinematic "heavy" settings
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      wrapper: window,
      content: wrapperRef.current!,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    /**
     * Extract only the hash fragment from an href string.
     * Handles: "/#services", "#services", "/work/#services", etc.
     */
    const extractHash = (href: string): string | null => {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return null;
      return href.slice(hashIndex); // e.g. "#services"
    };

    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hash = extractHash(href);
      if (!hash || hash.length <= 1) return;

      // Only intercept if navigating within the same page (home page or current page)
      const hrefPath = href.split("#")[0] || "/";
      const isHome = pathname === "/";
      const isSamePage = hrefPath === pathname || hrefPath === "/" + pathname || (isHome && (hrefPath === "/" || hrefPath === ""));

      if (isSamePage) {
        e.preventDefault();
        // Update the URL hash without triggering navigation
        window.history.pushState(null, "", hash);
        
        const cleanSelector = hash.split('?')[0].split('&')[0];
        lenis.scrollTo(cleanSelector);
      }
    };

    document.addEventListener("click", handleHashClick);

    // Initial scroll reset to top
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    return () => {
      document.removeEventListener("click", handleHashClick);
      lenis.destroy();
    };
  }, [pathname]);

  // Reset scroll position or scroll to hash on route change
  useEffect(() => {
    if (lenisRef.current) {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
          const cleanSelector = hash.split('?')[0].split('&')[0];
          setTimeout(() => {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(cleanSelector, { immediate: false, duration: 1.2 });
            }
          }, 100);
        } else {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }
    }
  }, [pathname, searchParams]);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
