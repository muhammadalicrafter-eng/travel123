"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { PhoneLink } from "@/components/ui/phone-link";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import {
  NAV_SECTIONS,
  navHref,
  resolveActiveSection,
  scrollToSection,
  syncUrlHash,
  waitForScrollEnd,
  type NavSectionId,
} from "@/lib/scroll";
import { useSlidingIndicator } from "@/hooks/use-sliding-indicator";

function NavPageLink({
  href,
  label,
  active,
  register,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  active: boolean;
  register: (key: string) => (el: HTMLElement | null) => void;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      ref={register(href)}
      href={href}
      onClick={onNavigate}
      className={cn(className, active ? "nav-tab-active" : "nav-tab-inactive")}
    >
      {label}
    </Link>
  );
}

function NavTab({
  id,
  label,
  active,
  register,
  onSelect,
  className,
}: {
  id: NavSectionId;
  label: string;
  active: boolean;
  register: (key: string) => (el: HTMLElement | null) => void;
  onSelect: (id: NavSectionId) => void;
  className?: string;
}) {
  const section = NAV_SECTIONS.find((s) => s.id === id)!;

  return (
    <button
      type="button"
      ref={register(section.hash)}
      role="tab"
      aria-selected={active}
      onClick={() => onSelect(id)}
      className={cn(
        className,
        active ? "nav-tab-active" : "nav-tab-inactive"
      )}
    >
      {label}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId>("top");

  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);
  const scrollSpyFrameRef = useRef<number>(0);
  const pendingNavTargetRef = useRef<NavSectionId | null>(null);
  const scrollSpyCooldownRef = useRef(0);

  const isHomePage = pathname === "/";
  const isAboutPage = pathname === ROUTES.about;
  const activeKey = isAboutPage
    ? ROUTES.about
    : (NAV_SECTIONS.find((l) => l.id === activeSection)?.hash ?? "");

  const desktopIndicator = useSlidingIndicator(activeKey, desktopNavRef);
  const mobileIndicator = useSlidingIndicator(activeKey, mobileNavRef);

  const releaseNavigationLock = useCallback(() => {
    isNavigatingRef.current = false;
    const target = pendingNavTargetRef.current;
    pendingNavTargetRef.current = null;

    if (target) {
      setActiveSection(target);
      scrollSpyCooldownRef.current = performance.now() + 400;
      return;
    }

    setActiveSection(resolveActiveSection());
  }, []);

  const goToSection = useCallback(
    (id: NavSectionId | "search") => {
      if (!isHomePage) {
        window.location.href = id === "search" ? "/#search" : navHref(id);
        return;
      }

      const sectionId: NavSectionId = id === "search" ? "top" : id;

      pendingNavTargetRef.current = sectionId;
      isNavigatingRef.current = true;
      setActiveSection(sectionId);
      scrollToSection(id);
      syncUrlHash(sectionId);

      waitForScrollEnd(releaseNavigationLock);
    },
    [isHomePage, releaseNavigationLock]
  );

  const updateScrollState = useCallback(() => {
    setScrolled(window.scrollY > 8);

    if (!isHomePage || isNavigatingRef.current) return;
    if (performance.now() < scrollSpyCooldownRef.current) return;

    cancelAnimationFrame(scrollSpyFrameRef.current);
    scrollSpyFrameRef.current = requestAnimationFrame(() => {
      if (!isNavigatingRef.current && performance.now() >= scrollSpyCooldownRef.current) {
        setActiveSection(resolveActiveSection());
      }
    });
  }, [isHomePage]);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      cancelAnimationFrame(scrollSpyFrameRef.current);
    };
  }, [updateScrollState]);

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("top");
      return;
    }

    const hash = window.location.hash.replace("#", "");

    if (hash === "search") {
      pendingNavTargetRef.current = "top";
      isNavigatingRef.current = true;
      requestAnimationFrame(() => {
        scrollToSection("search", "auto");
        setActiveSection("top");
        waitForScrollEnd(releaseNavigationLock);
      });
      return;
    }

    const validIds = NAV_SECTIONS.map((s) => s.id);
    if (validIds.includes(hash as NavSectionId)) {
      const target = hash as NavSectionId;
      pendingNavTargetRef.current = target;
      isNavigatingRef.current = true;
      requestAnimationFrame(() => {
        scrollToSection(target, "auto");
        setActiveSection(target);
        waitForScrollEnd(releaseNavigationLock);
      });
      return;
    }

    setActiveSection(resolveActiveSection());
  }, [isHomePage, pathname, releaseNavigationLock]);

  useLayoutEffect(() => {
    if (!open) return;
    mobileIndicator.measure();
    const frame = requestAnimationFrame(mobileIndicator.measure);
    return () => cancelAnimationFrame(frame);
  }, [open, activeKey, mobileIndicator]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  const handleSectionSelect = useCallback(
    (id: NavSectionId) => {
      goToSection(id);
      closeMenu();
    },
    [goToSection, closeMenu]
  );

  const handleLogoSelect = useCallback(() => {
    goToSection("top");
    closeMenu();
  }, [goToSection, closeMenu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] isolate transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-line bg-cloud shadow-[0_4px_24px_-8px_rgba(12,40,71,0.12)]"
          : "border-b border-line/40 bg-cloud/92 backdrop-blur-md"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-10"
      >
        {isHomePage ? (
          <button
            type="button"
            className="group shrink-0 transition-transform duration-200 hover:scale-[1.02]"
            onClick={handleLogoSelect}
            aria-label="Get A Ticket — go to top"
          >
            <Logo />
          </button>
        ) : (
          <Link
            href="/"
            className="group shrink-0 transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Get A Ticket — home"
          >
            <Logo />
          </Link>
        )}

        <div
          ref={desktopNavRef}
          className="nav-track hidden lg:flex"
          role="tablist"
          aria-label="Page sections"
        >
          <div
            className="nav-indicator"
            aria-hidden
            style={{
              transform: `translate3d(${desktopIndicator.rect.x}px, ${desktopIndicator.rect.y}px, 0)`,
              width: desktopIndicator.rect.width,
              height: desktopIndicator.rect.height,
              opacity: desktopIndicator.rect.visible ? 1 : 0,
            }}
          />
          {NAV_SECTIONS.map((l) => (
            <NavTab
              key={l.id}
              id={l.id}
              label={l.label}
              active={!isAboutPage && activeSection === l.id}
              register={desktopIndicator.register}
              onSelect={handleSectionSelect}
              className="nav-tab"
            />
          ))}
          <NavPageLink
            href={ROUTES.about}
            label="About"
            active={isAboutPage}
            register={desktopIndicator.register}
            className="nav-tab"
          />
        </div>

        <PhoneLink className="shrink-0" />

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-cloud-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[4.75rem] bg-ink/20 lg:hidden"
            onClick={closeMenu}
            aria-hidden
          />
          <div className="absolute inset-x-0 top-full border-t border-line bg-cloud shadow-lg lg:hidden">
            <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">
              <div
                ref={mobileNavRef}
                className="nav-mobile-track"
                role="tablist"
                aria-label="Page sections"
              >
                <div
                  className="nav-mobile-indicator"
                  aria-hidden
                  style={{
                    transform: `translate3d(0, ${mobileIndicator.rect.y}px, 0)`,
                    height: mobileIndicator.rect.height,
                    opacity: mobileIndicator.rect.visible ? 1 : 0,
                  }}
                />
                {NAV_SECTIONS.map((l) => (
                  <NavTab
                    key={l.id}
                    id={l.id}
                    label={l.label}
                    active={!isAboutPage && activeSection === l.id}
                    register={mobileIndicator.register}
                    onSelect={handleSectionSelect}
                    className="nav-mobile-tab w-full text-left"
                  />
                ))}
                <NavPageLink
                  href={ROUTES.about}
                  label="About"
                  active={isAboutPage}
                  register={mobileIndicator.register}
                  onNavigate={closeMenu}
                  className="nav-mobile-tab w-full text-left"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
