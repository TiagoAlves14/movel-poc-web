export const snap = (value: number, step: number) =>
  step > 0 ? Math.round(value / step) * step : value;
