"use client";

import Image from "next/image";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const coverDurationMs = 240;
const uncoverDurationMs = 260;
const routeFallbackMs = 5000;

type PageTransitionProviderProps = {
  children: ReactNode;
};

type PendingNavigation = {
  href: string;
  pathname: string;
  hash: string;
};

type ScrollLockState = {
  x: number;
  y: number;
  htmlScrollBehavior: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
  bodyOverflow: string;
};

export function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);
  const pendingNavigationRef = useRef<PendingNavigation | null>(null);
  const scrollLockRef = useRef<ScrollLockState | null>(null);
  const timeoutIdsRef = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    timeoutIdsRef.current = [];
  }, []);

  const scheduleTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      timeoutIdsRef.current = timeoutIdsRef.current.filter(
        (storedId) => storedId !== timeoutId,
      );
      callback();
    }, delay);

    timeoutIdsRef.current.push(timeoutId);
    return timeoutId;
  }, []);

  const lockScrollForTransition = useCallback(() => {
    const root = document.documentElement;
    const body = document.body;

    if (scrollLockRef.current) {
      return;
    }

    scrollLockRef.current = {
      x: window.scrollX,
      y: window.scrollY,
      htmlScrollBehavior: root.style.scrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
    };

    root.style.scrollBehavior = "auto";
    body.style.position = "fixed";
    body.style.top = `-${scrollLockRef.current.y}px`;
    body.style.left = `-${scrollLockRef.current.x}px`;
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }, []);

  const restoreScrollLock = useCallback(() => {
    const root = document.documentElement;
    const body = document.body;
    const scrollLock = scrollLockRef.current;

    if (!scrollLock) {
      return;
    }

    body.style.position = scrollLock.bodyPosition;
    body.style.top = scrollLock.bodyTop;
    body.style.left = scrollLock.bodyLeft;
    body.style.right = scrollLock.bodyRight;
    body.style.width = scrollLock.bodyWidth;
    body.style.overflow = scrollLock.bodyOverflow;
    root.style.scrollBehavior = scrollLock.htmlScrollBehavior;
    window.scrollTo({
      left: scrollLock.x,
      top: scrollLock.y,
      behavior: "auto",
    });

    scrollLockRef.current = null;
  }, []);

  const scrollToDestination = useCallback((hash: string) => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));

      if (target) {
        target.scrollIntoView({ block: "start", behavior: "auto" });
      } else {
        window.scrollTo({ left: 0, top: 0, behavior: "auto" });
      }
    } else {
      window.scrollTo({ left: 0, top: 0, behavior: "auto" });
    }

    return previousScrollBehavior;
  }, []);

  const unlockScrollAfterTransition = useCallback((hash: string) => {
    const root = document.documentElement;
    const body = document.body;
    const scrollLock = scrollLockRef.current;

    if (!scrollLock) {
      const previousScrollBehavior = scrollToDestination(hash);

      window.requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
      });
      return;
    }

    body.style.position = scrollLock.bodyPosition;
    body.style.top = scrollLock.bodyTop;
    body.style.left = scrollLock.bodyLeft;
    body.style.right = scrollLock.bodyRight;
    body.style.width = scrollLock.bodyWidth;
    body.style.overflow = scrollLock.bodyOverflow;

    scrollToDestination(hash);

    window.requestAnimationFrame(() => {
      root.style.scrollBehavior = scrollLock.htmlScrollBehavior;
      scrollLockRef.current = null;
    });
  }, [scrollToDestination]);

  const finishTransition = useCallback(
    (hash: string) => {
      pendingNavigationRef.current = null;
      clearTimeouts();

      window.requestAnimationFrame(() => {
        unlockScrollAfterTransition(hash);

        window.requestAnimationFrame(() => {
          setIsOpaque(false);
          scheduleTimeout(() => {
            setIsActive(false);
          }, uncoverDurationMs);
        });
      });
    },
    [clearTimeouts, scheduleTimeout, unlockScrollAfterTransition],
  );

  const beginTransition = useCallback(
    (destination: URL) => {
      const href = `${destination.pathname}${destination.search}${destination.hash}`;
      const pendingNavigation: PendingNavigation = {
        href,
        pathname: destination.pathname,
        hash: destination.hash,
      };

      clearTimeouts();
      lockScrollForTransition();
      pendingNavigationRef.current = pendingNavigation;
      setIsActive(true);

      window.requestAnimationFrame(() => {
        setIsOpaque(true);
      });

      scheduleTimeout(() => {
        router.push(href as Route, { scroll: false });
      }, coverDurationMs);

      scheduleTimeout(() => {
        if (pendingNavigationRef.current === pendingNavigation) {
          finishTransition(pendingNavigation.hash);
        }
      }, routeFallbackMs);
    },
    [
      clearTimeouts,
      finishTransition,
      lockScrollForTransition,
      router,
      scheduleTimeout,
    ],
  );

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download") ||
        anchor.dataset.pageTransition === "off"
      ) {
        return;
      }

      const rawHref = anchor.getAttribute("href");

      if (!rawHref || rawHref.startsWith("#")) {
        return;
      }

      const destination = new URL(rawHref, window.location.href);
      const current = new URL(window.location.href);

      if (
        destination.origin !== current.origin ||
        !["http:", "https:"].includes(destination.protocol)
      ) {
        return;
      }

      const isSameDocument =
        destination.pathname === current.pathname &&
        destination.search === current.search;

      if (isSameDocument) {
        return;
      }

      event.preventDefault();
      beginTransition(destination);
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      clearTimeouts();
      restoreScrollLock();
    };
  }, [beginTransition, clearTimeouts, restoreScrollLock]);

  useLayoutEffect(() => {
    const pendingNavigation = pendingNavigationRef.current;

    if (!pendingNavigation || pathname !== pendingNavigation.pathname) {
      return;
    }

    finishTransition(pendingNavigation.hash);
  }, [finishTransition, pathname]);

  return (
    <>
      {children}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[9999] grid place-items-center bg-[#fbfdfb] opacity-0 transition-opacity duration-200 ease-out motion-reduce:duration-0",
          isActive ? "pointer-events-auto" : "pointer-events-none",
          isOpaque ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="grid size-16 place-items-center rounded-2xl bg-white shadow-[0_18px_44px_rgba(17,28,51,0.12)]">
          <Image
            src="/landing/beranda/syncvoca-mark.webp"
            alt=""
            width={54}
            height={54}
            className="size-11 rounded-xl object-cover"
            priority={false}
          />
        </div>
      </div>
    </>
  );
}
