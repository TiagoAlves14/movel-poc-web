export type Mm = number;

export type Environment2D = {
  width: Mm;   // mm
  height: Mm;  // mm
};

export type ModuleType = "BASE_CABINET";

export type ModuleParams = {
  width: Mm;
  height: Mm; // no 2D vamos tratar como "profundidade" (planta)
  label?: string;
};

export type ModuleInstance = {
  id: string;
  type: ModuleType;
  x: Mm;
  y: Mm;
  rotation: number; // graus (mantemos, mas PoC pode não usar agora)
  params: ModuleParams;
};
