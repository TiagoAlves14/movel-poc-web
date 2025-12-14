import React from "react";
import { Shape } from "react-konva";
import type Konva from "konva";

type Props = {
  width: number;
  height: number;
  step: number;
};

export function Grid2D({ width, height, step }: Props) {
  const safeStep = Math.max(1, Math.floor(step)); // evita loops infinitos/linhas demais

  const sceneFunc = (ctx: Konva.Context, shape: Konva.Shape) => {
    ctx.beginPath();

    // linhas verticais
    for (let x = 0; x <= width; x += safeStep) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    // linhas horizontais
    for (let y = 0; y <= height; y += safeStep) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    (ctx as CanvasRenderingContext2D).strokeStyle = "#eee";
    (ctx as CanvasRenderingContext2D).lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    // required by react-konva to indicate custom drawing is done
    shape.getLayer()?.batchDraw();
  };

  return <Shape sceneFunc={sceneFunc} listening={false} />;
}
