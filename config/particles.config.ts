import type { ISourceOptions } from "@tsparticles/engine";

export const particlesConfig: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    color: {
      value: "#9FC6FF",
    },
    links: {
      color: "#9FC6FF",
      distance: 110,
      enable: true,
      opacity: 0.12,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: 0.35,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 60,
    },
    opacity: {
      value: { min: 0.2, max: 0.75 },
      animation: {
        enable: true,
        speed: 1.2,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 0.8, max: 3.5 },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
    },
  },
  detectRetina: true,
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: {
            density: {
              enable: false,
            },
            value: 35,
          },
        },
      },
    },
  ],
};
