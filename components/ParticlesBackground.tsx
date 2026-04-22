"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useParticlesStore } from "@/lib/stores/particles-store";
import { particlesConfig } from "@/config/particles.config";

export default function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isParticlesEnabled = useParticlesStore((s) => s.isParticlesEnabled);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const particlesInit = useCallback(() => Promise.resolve(), []);

  if (!isParticlesEnabled || prefersReducedMotion || !engineReady) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 z-0 pointer-events-none"
      options={particlesConfig}
      particlesLoaded={particlesInit}
    />
  );
}
