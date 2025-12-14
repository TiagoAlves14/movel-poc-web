import { create } from "zustand";
import type { Environment2D, ModuleInstance, Mm } from "../domain/types";

type ProjectState = {
  env: Environment2D;
  snapStep: Mm;
  modules: ModuleInstance[];
  selectedId: string | null;

  addBaseCabinet(): void;
  select(id: string | null): void;

  updateModule(id: string, patch: Partial<ModuleInstance>): void;
  updateModuleParams(id: string, patch: Partial<ModuleInstance["params"]>): void;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const useProjectStore = create<ProjectState>((set, get) => ({
  env: { width: 3200, height: 2400 }, // cozinha demo (mm)
  snapStep: 10,
  modules: [
    {
      id: "m1",
      type: "BASE_CABINET",
      x: 400,
      y: 600,
      rotation: 0,
      params: { width: 1200, height: 550, label: "Armário Base" }
    }
  ],
  selectedId: "m1",

  addBaseCabinet() {
    const { modules } = get();
    const id = `m${modules.length + 1}`;
    set({
      modules: [
        ...modules,
        {
          id,
          type: "BASE_CABINET",
          x: 200,
          y: 200,
          rotation: 0,
          params: { width: 800, height: 550, label: "Armário Base" }
        }
      ],
      selectedId: id
    });
  },

  select(id) {
    set({ selectedId: id });
  },

  updateModule(id, patch) {
    const { env, modules } = get();
    const next = modules.map((m) => {
      if (m.id !== id) return m;

      const merged = { ...m, ...patch };
      // manter dentro do ambiente (clamp simples; no resize usamos validação também)
      const maxX = env.width - merged.params.width;
      const maxY = env.height - merged.params.height;
      return {
        ...merged,
        x: clamp(merged.x, 0, Math.max(0, maxX)),
        y: clamp(merged.y, 0, Math.max(0, maxY))
      };
    });
    set({ modules: next });
  },

  updateModuleParams(id, patch) {
    const { env, modules } = get();
    const next = modules.map((m) => {
      if (m.id !== id) return m;

      const params = { ...m.params, ...patch };
      const maxX = env.width - params.width;
      const maxY = env.height - params.height;

      return {
        ...m,
        params,
        x: clamp(m.x, 0, Math.max(0, maxX)),
        y: clamp(m.y, 0, Math.max(0, maxY))
      };
    });
    set({ modules: next });
  }
}));
