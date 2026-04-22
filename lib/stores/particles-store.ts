import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ParticlesState {
  isParticlesEnabled: boolean;
  toggleParticles: () => void;
}

export const useParticlesStore = create<ParticlesState>()(
  persist(
    (set) => ({
      isParticlesEnabled: true,
      toggleParticles: () =>
        set((state) => ({ isParticlesEnabled: !state.isParticlesEnabled })),
    }),
    { name: "particles_pref" },
  ),
);
