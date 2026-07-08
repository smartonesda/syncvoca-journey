"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardSidebarContextValue = {
  setDesktopSidebarOpen: Dispatch<SetStateAction<boolean>>;
  setMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const DashboardSidebarContext = createContext<DashboardSidebarContextValue | null>(null);

export function DashboardShell({
  desktopSidebar,
  mobileSidebar,
  children,
}: {
  desktopSidebar: ReactNode;
  mobileSidebar: ReactNode;
  children: ReactNode;
}) {
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarContextValue = useMemo(
    () => ({ setDesktopSidebarOpen, setMobileSidebarOpen }),
    [],
  );

  useEffect(() => {
    if (!mobileSidebarOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileSidebarOpen]);

  return (
    <DashboardSidebarContext.Provider value={sidebarContextValue}>
      <main className="h-screen overflow-hidden bg-[#FBFCFD] text-[#0E1A34]">
        <div className="flex h-full overflow-hidden">
          <div
            className={cn(
              "hidden h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-out xl:block",
              desktopSidebarOpen ? "w-[228px] 2xl:w-[292px]" : "w-0",
            )}
          >
            {desktopSidebar}
          </div>

          <div
            className={cn(
              "fixed inset-0 z-50 transition xl:hidden",
              mobileSidebarOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            )}
            aria-hidden={!mobileSidebarOpen}
            inert={!mobileSidebarOpen}
          >
            <button
              type="button"
              aria-label="Tutup sidebar"
              tabIndex={mobileSidebarOpen ? 0 : -1}
              className={cn(
                "absolute inset-0 bg-[#0B1531]/32 backdrop-blur-[2px] transition-opacity duration-300",
                mobileSidebarOpen ? "opacity-100" : "opacity-0",
              )}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div
              className={cn(
                "relative h-full w-[min(86vw,340px)] max-w-[340px] overflow-hidden border-r border-[#DDE8E2] bg-white shadow-[24px_0_80px_rgba(8,22,36,0.2)] transition-transform duration-300 ease-out",
                mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
              )}
              onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest("a")) {
                  setMobileSidebarOpen(false);
                }
              }}
            >
              <button
                type="button"
                aria-label="Tutup menu"
                tabIndex={mobileSidebarOpen ? 0 : -1}
                className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-xl border border-[#DDE8E2] bg-white text-[#0E1A34] shadow-sm transition hover:bg-[#F3F8F5]"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="size-5" />
              </button>
              {mobileSidebar}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      </main>
    </DashboardSidebarContext.Provider>
  );
}

export function DashboardSidebarToggle({ className }: { className?: string }) {
  const context = useContext(DashboardSidebarContext);

  const handleClick = () => {
    if (!context) {
      return;
    }

    if (window.matchMedia("(min-width: 1280px)").matches) {
      context.setDesktopSidebarOpen((isOpen) => !isOpen);
      return;
    }

    context.setMobileSidebarOpen((isOpen) => !isOpen);
  };

  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      className={className}
      onClick={handleClick}
    >
      <Menu className="size-6" />
    </button>
  );
}

export function SidebarScrollArea({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const updateScrollCue = useCallback(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    const remainingScroll =
      scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight;
    const hasOverflow = scrollElement.scrollHeight - scrollElement.clientHeight > 8;

    setCanScrollDown(hasOverflow && remainingScroll > 8);
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    updateScrollCue();
    const frame = window.requestAnimationFrame(updateScrollCue);
    const resizeObserver = new ResizeObserver(updateScrollCue);

    resizeObserver.observe(scrollElement);
    Array.from(scrollElement.children).forEach((child) => resizeObserver.observe(child));
    scrollElement.addEventListener("scroll", updateScrollCue, { passive: true });
    window.addEventListener("resize", updateScrollCue);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      scrollElement.removeEventListener("scroll", updateScrollCue);
      window.removeEventListener("resize", updateScrollCue);
    };
  }, [updateScrollCue]);

  return (
    <div className="relative min-h-0 flex-1">
      <nav
        ref={scrollRef}
        className={cn(
          "sv-scrollbar-hidden h-full overflow-y-auto px-4 transition-[padding] duration-200 2xl:px-5",
          canScrollDown ? "pb-14" : "pb-4",
        )}
      >
        {children}
      </nav>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-white via-white to-white/0 pb-3 transition duration-200",
          canScrollDown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
        aria-hidden={!canScrollDown}
      >
        <span className="flex h-8 items-center gap-1.5 rounded-full border border-[#CFECDC] bg-white px-3 text-[11px] font-black text-[#058447] shadow-[0_8px_22px_rgba(0,83,44,0.14)]">
          Menu lainnya
          <ChevronDown className="size-4 animate-bounce" />
        </span>
      </div>
    </div>
  );
}
