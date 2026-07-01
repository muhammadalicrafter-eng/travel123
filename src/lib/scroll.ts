export const HEADER_OFFSET = 76;

export const NAV_SECTIONS = [
  { id: "top", label: "Home", hash: "#top" },
  { id: "destinations", label: "Destinations", hash: "#destinations" },
  { id: "tours", label: "Tours", hash: "#tours" },
  { id: "why-us", label: "Why Us", hash: "#why-us" },
  { id: "reviews", label: "Reviews", hash: "#reviews" },
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];

/** Document Y position for a section element. */
export function getSectionTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

export function getScrollTarget(id: string): number {
  if (id === "top") return 0;

  const el = document.getElementById(id);
  if (!el) return 0;

  return Math.max(0, Math.round(getSectionTop(el) - HEADER_OFFSET));
}

export function resolveActiveSection(): NavSectionId {
  const marker = window.scrollY + HEADER_OFFSET;

  let current: NavSectionId = "top";

  for (const { id } of NAV_SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;

    const top = getSectionTop(el);
    if (top <= marker + 2) {
      current = id;
    }
  }

  return current;
}

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  window.scrollTo({ top: getScrollTarget(id), behavior });
}

export function navHref(id: string): string {
  return id === "top" ? "/" : `/#${id}`;
}

export function syncUrlHash(id: string) {
  if (window.location.pathname !== "/") return;

  const nextUrl = id === "top" ? "/" : `/#${id}`;
  window.history.replaceState(null, "", nextUrl);
}

/** Wait until smooth scroll has settled before re-enabling scroll-spy. */
export function waitForScrollEnd(onEnd: () => void, timeoutMs = 1400) {
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", onScrollEnd);
    onEnd();
  };

  const onScrollEnd = () => finish();

  if ("onscrollend" in window) {
    window.addEventListener("scrollend", onScrollEnd, { once: true });
  }

  let lastY = window.scrollY;
  let stableFrames = 0;
  const startedAt = performance.now();

  const tick = () => {
    if (done) return;

    const currentY = window.scrollY;

    if (currentY === lastY) {
      stableFrames += 1;
      if (stableFrames >= 12) {
        finish();
        return;
      }
    } else {
      stableFrames = 0;
      lastY = currentY;
    }

    if (performance.now() - startedAt < timeoutMs) {
      requestAnimationFrame(tick);
    } else {
      finish();
    }
  };

  requestAnimationFrame(tick);
  setTimeout(finish, timeoutMs);
}
