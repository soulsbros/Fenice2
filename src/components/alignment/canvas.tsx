"use client";

import {
  drawAllAlignments,
  drawAxesLines,
  drawCenterCircle,
  drawEvilTiles,
  drawGoodTiles,
  drawNeutralTiles,
  drawOctagon,
  drawSideCircle,
} from "@/lib/drawUtils";
import { Character } from "@/types/API";
import { useEffect, useRef, useState } from "react";

interface CanvasProps {
  characters: Character[];
}

export default function Canvas({ characters }: Readonly<CanvasProps>) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const dimension = window.innerWidth > 600 ? 800 : window.innerWidth;
    setWidth(dimension);
    setHeight(dimension);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    characters: Character[]
  ) => {
    const a = Math.PI / 4;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const r = canvas.width / 3;
    const angles = drawOctagon(ctx, centerX, centerY, r, a);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#C384FF";

    drawGoodTiles(ctx, centerX, centerY, angles, r);
    drawEvilTiles(ctx, centerX, centerY, angles, r);
    drawNeutralTiles(ctx, centerX, centerY, angles, r);
    drawAxesLines(ctx, angles);
    drawCenterCircle(ctx, centerX, centerY);
    drawSideCircle(ctx, a, r, centerX, centerY);
    drawAllAlignments(ctx, characters, r, centerX, centerY);
  };

  useEffect(() => {
    const resizeCanvas = (canvas: HTMLCanvasElement) => {
      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        const context = canvas.getContext("2d")!;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.scale(ratio, ratio);
        return true;
      }

      return false;
    };

    const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }

      return false;
    };
    const canvas = canvasRef.current as HTMLCanvasElement;

    resizeCanvas(canvas);
    resizeCanvasToDisplaySize(canvas);
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    let animationFrameId: number;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const render = () => {
      draw(context, canvas, characters);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [characters, height, width]);

  return <canvas width={width} height={height} ref={canvasRef} />;
}
