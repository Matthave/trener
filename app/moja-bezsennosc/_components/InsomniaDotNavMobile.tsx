"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { INSOMNIA_DOT_NAV_SECTIONS } from "../_data/nav-sections";

const ACCENT = "#9FC6FF";
const INACTIVE_DOT = "rgba(122, 179, 224, 0.5)";

const INIT_DELAY_MS = 100;
const PHASE2_START_MS = 80;
const PHASE3_START_MS = 360;
const PHASE1_TRANSITION = "80ms ease";
const PHASE2_MOVE_TRANSITION =
  "top 280ms cubic-bezier(0.4, 0, 0.2, 1), left 280ms cubic-bezier(0.4, 0, 0.2, 1)";
const PHASE3_TRANSITION =
  "width 150ms cubic-bezier(0.34, 1.4, 0.64, 1), height 150ms cubic-bezier(0.34, 1.4, 0.64, 1), border-radius 150ms cubic-bezier(0.34, 1.4, 0.64, 1), top 150ms cubic-bezier(0.34, 1.4, 0.64, 1), left 150ms cubic-bezier(0.34, 1.4, 0.64, 1)";

const W0 = 8;
const H0 = 8;
const W1 = 5;
const H1 = 14;
const BR_SQUASH = 3;
const SPY_DEBOUNCE_MS = 120;

type InsomniaDotNavMobileProps = {
  activeId: string;
  onNavigate: (sectionId: string) => void;
};

function indexFromActiveId(activeId: string) {
  const i = INSOMNIA_DOT_NAV_SECTIONS.findIndex((s) => s.id === activeId);
  return i < 0 ? 0 : i;
}

function applyTraveler(
  el: HTMLElement,
  cx: number,
  cy: number,
  w: number,
  h: number,
  borderRadius: number | "50%",
  transition: string,
) {
  el.style.transition = transition;
  el.style.left = `${cx - w / 2}px`;
  el.style.top = `${cy - h / 2}px`;
  el.style.width = `${w}px`;
  el.style.height = `${h}px`;
  el.style.borderRadius = borderRadius === "50%" ? "50%" : `${borderRadius}px`;
}

export function InsomniaDotNavMobile({
  activeId,
  onNavigate,
}: InsomniaDotNavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeIdxRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const initDoneRef = useRef(false);
  const clickLockSectionIdRef = useRef<string | null>(null);
  const spyDebounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const measureCenters = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) {
      return [] as { cx: number; cy: number }[];
    }
    const w = wrap.getBoundingClientRect();
    return INSOMNIA_DOT_NAV_SECTIONS.map((_, i) => {
      const slot = slotRefs.current[i];
      if (!slot) {
        return { cx: 0, cy: 0 };
      }
      const r = slot.getBoundingClientRect();
      return {
        cx: r.left + r.width / 2 - w.left,
        cy: r.top + r.height / 2 - w.top,
      };
    });
  }, []);

  const travelerCenter = useCallback(() => {
    const wrap = wrapRef.current;
    const el = travelerRef.current;
    if (!wrap || !el) {
      return { cx: 0, cy: 0 };
    }
    const w = wrap.getBoundingClientRect();
    const tr = el.getBoundingClientRect();
    return {
      cx: tr.left + tr.width / 2 - w.left,
      cy: tr.top + tr.height / 2 - w.top,
    };
  }, []);

  const clearAnimTimers = useCallback(() => {
    for (const t of timersRef.current) {
      clearTimeout(t);
    }
    timersRef.current = [];
  }, []);

  const placeTravelerInstant = useCallback(
    (idx: number) => {
      const centers = measureCenters();
      const el = travelerRef.current;
      if (!el || !centers[idx]) {
        return;
      }
      const { cx, cy } = centers[idx];
      el.style.transition = "none";
      applyTraveler(el, cx, cy, W0, H0, "50%", "none");
      void el.offsetHeight;
      el.style.transition = "";
      activeIdxRef.current = idx;
    },
    [measureCenters],
  );

  const runTravelerSequence = useCallback(
    (toIdx: number) => {
      const el = travelerRef.current;
      if (!el) {
        return;
      }
      const centers = measureCenters();
      if (!centers[toIdx]) {
        return;
      }

      clearAnimTimers();

      const { cx: fromCx, cy: fromCy } = travelerCenter();
      const to = centers[toIdx];

      applyTraveler(
        el,
        fromCx,
        fromCy,
        W1,
        H1,
        BR_SQUASH,
        `left ${PHASE1_TRANSITION}, top ${PHASE1_TRANSITION}, width ${PHASE1_TRANSITION}, height ${PHASE1_TRANSITION}, border-radius ${PHASE1_TRANSITION}`,
      );

      const t2 = setTimeout(() => {
        el.style.transition = `${PHASE2_MOVE_TRANSITION}, width 0s, height 0s, border-radius 0s`;
        applyTraveler(el, to.cx, to.cy, W1, H1, BR_SQUASH, el.style.transition);
      }, PHASE2_START_MS);
      timersRef.current.push(t2);

      const t3 = setTimeout(() => {
        el.style.transition = PHASE3_TRANSITION;
        applyTraveler(el, to.cx, to.cy, W0, H0, "50%", PHASE3_TRANSITION);
        activeIdxRef.current = toIdx;
      }, PHASE3_START_MS);
      timersRef.current.push(t3);
    },
    [clearAnimTimers, measureCenters, travelerCenter],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      placeTravelerInstant(indexFromActiveId(activeIdRef.current));
      initDoneRef.current = true;
    }, INIT_DELAY_MS);
    return () => clearTimeout(t);
  }, [placeTravelerInstant]);

  useEffect(() => {
    if (!initDoneRef.current) {
      return;
    }

    const lock = clickLockSectionIdRef.current;
    if (lock !== null) {
      if (activeId === lock) {
        clickLockSectionIdRef.current = null;
        return;
      }
      return;
    }

    if (spyDebounceTimerRef.current !== null) {
      clearTimeout(spyDebounceTimerRef.current);
    }
    spyDebounceTimerRef.current = setTimeout(() => {
      spyDebounceTimerRef.current = null;
      if (clickLockSectionIdRef.current !== null) {
        return;
      }
      const idx = indexFromActiveId(activeIdRef.current);
      if (idx === activeIdxRef.current && timersRef.current.length === 0) {
        return;
      }
      runTravelerSequence(idx);
    }, SPY_DEBOUNCE_MS);

    return () => {
      if (spyDebounceTimerRef.current !== null) {
        clearTimeout(spyDebounceTimerRef.current);
        spyDebounceTimerRef.current = null;
      }
    };
  }, [activeId, runTravelerSequence]);

  useEffect(() => {
    const onResize = () => {
      if (!initDoneRef.current) {
        return;
      }
      clearAnimTimers();
      placeTravelerInstant(indexFromActiveId(activeIdRef.current));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clearAnimTimers, placeTravelerInstant]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !initDoneRef.current) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      placeTravelerInstant(indexFromActiveId(activeIdRef.current));
      closeButtonRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen, placeTravelerInstant]);

  const handleClick = (sectionId: string, idx: number) => {
    if (spyDebounceTimerRef.current !== null) {
      clearTimeout(spyDebounceTimerRef.current);
      spyDebounceTimerRef.current = null;
    }
    clickLockSectionIdRef.current = sectionId;
    onNavigate(sectionId);
    runTravelerSequence(idx);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Otwórz nawigację sekcji"
        aria-expanded={isOpen}
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed right-5 top-5 z-50 flex h-[45px] w-[45px] items-center justify-center rounded-full bg-accent text-background shadow-[0_0_0_1px_rgba(159,198,255,0.38),0_8px_24px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-200 min-[1280px]:hidden",
          isOpen ? "pointer-events-none scale-95 opacity-0" : "opacity-100",
        )}
      >
        <span className="flex items-center gap-[3px]" aria-hidden="true">
          <span className="h-1 w-1 rounded-full bg-background" />
          <span className="h-1 w-1 rounded-full bg-background" />
          <span className="h-1 w-1 rounded-full bg-background" />
        </span>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/35 backdrop-blur-[1px] transition-opacity duration-300 min-[1280px]:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <nav
        aria-label="Nawigacja sekcji strony Moja bezsenność"
        aria-hidden={!isOpen}
        className={cn(
          "fixed bottom-0 right-0 top-0 z-50 w-[min(76vw,390px)] border-l border-foreground/15 bg-background/95 bg-opacity-90 px-6 py-6 shadow-[-18px_0_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform duration-300 ease-out min-[1280px]:hidden",
          isOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Zamknij nawigację sekcji"
          tabIndex={isOpen ? 0 : -1}
          onClick={() => setIsOpen(false)}
          className="ml-auto flex h-[45px] w-[45px] items-center justify-center text-foreground"
        >
          <span className="relative block h-[38px] w-[38px]" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 h-px w-[38px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground" />
            <span className="absolute left-1/2 top-1/2 h-px w-[38px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-foreground" />
          </span>
        </button>

        <div
          ref={wrapRef}
          className="relative mt-4 flex max-h-[calc(100svh-7.5rem)] flex-col items-end gap-3 overflow-y-auto pr-1"
        >
          <div
            ref={travelerRef}
            className="pointer-events-none absolute z-10 bg-accent"
            style={{
              width: W0,
              height: H0,
              left: 0,
              top: 0,
              borderRadius: "50%",
              boxShadow: "0 0 0 4px rgba(159, 198, 255, 0.28)",
            }}
            aria-hidden="true"
          />
          {INSOMNIA_DOT_NAV_SECTIONS.map((section, idx) => {
            const isActive = activeId === section.id;
            const isHover = hoverId === section.id;
            const emphasized = isActive || isHover;

            return (
              <button
                key={section.id}
                type="button"
                aria-label={section.label}
                aria-current={isActive ? "true" : undefined}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => handleClick(section.id, idx)}
                onMouseEnter={() => setHoverId(section.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(section.id)}
                onBlur={() => setHoverId(null)}
                className="relative z-[1] flex min-h-[34px] w-full items-center justify-end gap-3 text-right"
              >
                <span
                  className={cn(
                    "font-heading text-[14px] leading-[1.25] tracking-[0.01em] transition-colors duration-200",
                    emphasized ? "text-accent" : "text-foreground/92",
                  )}
                >
                  {section.label}
                </span>
                <span
                  ref={(el) => {
                    slotRefs.current[idx] = el;
                  }}
                  className="pointer-events-none flex h-7 w-7 shrink-0 items-center justify-center"
                  aria-hidden="true"
                >
                  <span
                    className="rounded-full transition-[background-color,box-shadow] duration-200"
                    style={{
                      width: W0,
                      height: H0,
                      backgroundColor: emphasized ? ACCENT : INACTIVE_DOT,
                      boxShadow: emphasized
                        ? "0 0 0 3px rgba(159, 198, 255, 0.28)"
                        : "none",
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
