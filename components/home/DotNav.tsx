"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { HOME_DOT_NAV_SECTIONS } from "@/components/home/useHomeScrollSpy";

const ACCENT = "#7ab3e0";
const STATIC_DOT = "#282828";

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
/** Spy często przeskakuje pośrednio przy długim scrollu — jedna animacja po ustabilizowaniu sekcji. */
const SPY_DEBOUNCE_MS = 120;

type DotNavProps = {
  activeId: string;
  onNavigate: (sectionId: string) => void;
};

function indexFromActiveId(activeId: string) {
  const i = HOME_DOT_NAV_SECTIONS.findIndex((s) => s.id === activeId);
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

export function DotNav({ activeId, onNavigate }: DotNavProps) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const wrapRef = useRef<HTMLDivElement>(null);
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
    return HOME_DOT_NAV_SECTIONS.map((_, i) => {
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
      /* Po kliknięciu ignoruj pośrednie sekcje ze spy aż dojazd do celu — nie przerywaj animacji. */
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

  const handleClick = (sectionId: string, idx: number) => {
    if (spyDebounceTimerRef.current !== null) {
      clearTimeout(spyDebounceTimerRef.current);
      spyDebounceTimerRef.current = null;
    }
    clickLockSectionIdRef.current = sectionId;
    onNavigate(sectionId);
    runTravelerSequence(idx);
  };

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

  return (
    <nav
      aria-label="Nawigacja sekcji strony głównej"
      className="pointer-events-auto fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-end"
    >
      <div
        ref={wrapRef}
        className="relative flex flex-col items-end gap-[18px]"
      >
        <div
          ref={travelerRef}
          className="pointer-events-none absolute z-10 bg-[#7ab3e0]"
          style={{
            width: W0,
            height: H0,
            left: 0,
            top: 0,
            borderRadius: "50%",
            boxShadow: "0 0 0 4px rgba(122, 179, 224, 0.3)",
          }}
          aria-hidden="true"
        />
        {HOME_DOT_NAV_SECTIONS.map((section, idx) => {
          const isActive = activeId === section.id;
          const isHover = hoverId === section.id;
          const showLabel = isActive || isHover;

          return (
            <button
              key={section.id}
              type="button"
              aria-label={section.label}
              aria-current={isActive ? "true" : undefined}
              onClick={() => handleClick(section.id, idx)}
              onMouseEnter={() => setHoverId(section.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(section.id)}
              onBlur={() => setHoverId(null)}
              className="group relative z-[1] flex cursor-pointer items-center justify-end gap-3 py-1 pr-1"
            >
              <span
                className={cn(
                  "pointer-events-none absolute right-[calc(0.5rem+8px)] whitespace-nowrap font-heading text-[11px] uppercase tracking-[0.12em] transition-[opacity,transform,color] duration-200 ease-out mr-3",
                  showLabel
                    ? "translate-x-0 opacity-100 text-shadow-sm/100 mr-4"
                    : "translate-x-1 opacity-0 mr-4",
                )}
                style={{ color: showLabel ? ACCENT : "transparent" }}
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
                  className="rounded-full transition-[background-color,box-shadow] duration-200 ease-out"
                  style={{
                    width: W0,
                    height: H0,
                    backgroundColor: isHover ? ACCENT : STATIC_DOT,
                    boxShadow: isHover
                      ? "0 0 0 4px rgba(122, 179, 224, 0.3)"
                      : "none",
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
