export const scrollToTopInstant = (offsetTop = 0) => {
  if (typeof window === 'undefined') return;

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const root = document.documentElement;
  const body = document.body;
  const previousBehavior = root.style.scrollBehavior;
  const previousBodyBehavior = body.style.scrollBehavior;
  const targetTop = Math.max(0, offsetTop);
  const applyScroll = () => {
    window.scrollTo({ left: 0, top: targetTop, behavior: 'auto' });
  };

  root.style.scrollBehavior = 'auto';
  body.style.scrollBehavior = 'auto';
  applyScroll();

  window.requestAnimationFrame(() => {
    root.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';
    applyScroll();

    window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
    });
  });
};
