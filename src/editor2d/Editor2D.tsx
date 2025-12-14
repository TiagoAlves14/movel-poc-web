import React, { useMemo } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useProjectStore } from "../store/projectStore";
import { Grid2D } from "./Grid2D";
import { ModuleRect } from "./ModuleRect";

export function Editor2D() {
  const env = useProjectStore((s) => s.env);
  const snapStep = useProjectStore((s) => s.snapStep);
  const modules = useProjectStore((s) => s.modules);
  const selectedId = useProjectStore((s) => s.selectedId);
  const select = useProjectStore((s) => s.select);
  const updateModule = useProjectStore((s) => s.updateModule);
  const updateModuleParams = useProjectStore((s) => s.updateModuleParams);

  // viewport simples: 1px = 1mm (para PoC). Depois colocamos zoom e pan.
  const stageSize = useMemo(() => ({ width: env.width + 2, height: env.height + 2 }), [env.width, env.height]);

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
      <Stage width={stageSize.width} height={stageSize.height} onMouseDown={() => select(null)} onTouchStart={() => select(null)}>
        <Layer>
          <Rect x={0} y={0} width={env.width} height={env.height} fill="#fff" stroke="#111" strokeWidth={1} />
          <Grid2D width={env.width} height={env.height} step={snapStep * 5} />
        </Layer>

        <Layer>
          {modules.map((m) => (
            <ModuleRect
              key={m.id}
              module={m}
              isSelected={m.id === selectedId}
              snapStep={snapStep}
              onSelect={() => select(m.id)}
              onChange={(patch) => updateModule(m.id, patch)}
              onChangeParams={(patch) => updateModuleParams(m.id, patch)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
