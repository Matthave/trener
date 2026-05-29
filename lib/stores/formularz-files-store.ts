import { create } from "zustand";

interface FormularzFilesState {
  files: File[];
  addFiles: (incoming: File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
}

export const useFormularzFilesStore = create<FormularzFilesState>((set) => ({
  files: [],

  addFiles: (incoming) =>
    set((state) => ({
      files: [...state.files, ...incoming],
    })),

  removeFile: (index) =>
    set((state) => ({
      files: state.files.filter((_, i) => i !== index),
    })),

  clearFiles: () => set({ files: [] }),
}));
