import { useEffect } from "react";
import Lenis from "lenis";

type SmoothScrollProps = {
  enabled: boolean;
};

export default function SmoothScroll({ enabled }: SmoothScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      stopInertiaOnNavigate: true,
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
    });

    return () => lenis.destroy();
  }, [enabled]);

  return null;
}
