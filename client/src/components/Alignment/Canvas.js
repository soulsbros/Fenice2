import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  drawAllAlignments,
  drawAxesLines,
  drawCenterCircle,
  drawEctagon,
  drawEvilTiles,
  drawGoodTiles,
  drawNeutralTiles,
  drawSideCircle,
} from '../../util/drawUtils';

const Canvas = () => {
  const width = window.innerWidth > 600 ? 600 : window.innerWidth;
  const height = window.innerHeight > 600 ? 600 : window.innerHeight;

  const { characters } = useSelector((st) => st.alignmentReducer);
  const canvasRef = useRef(null);

  const draw = (ctx, canvas, characters) => {
    const a = Math.PI / 4;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const r = canvas.width / 2.5;

    let angles = drawEctagon(ctx, centerX, centerY, r, a);

    ctx.lineWidth = 5;
    ctx.strokeStyle = '#C384FF';

    drawGoodTiles(ctx, centerX, centerY, angles, r);

    drawEvilTiles(ctx, centerX, centerY, angles, r);

    drawNeutralTiles(ctx, centerX, centerY, angles, r);

    drawAxesLines(ctx, angles);

    drawCenterCircle(ctx, centerX, centerY);

    drawSideCircle(ctx, a, r, centerX, centerY);

    drawAllAlignments(ctx, characters, r, centerX, centerY);
  };

  useEffect(() => {
    const resizeCanvas = (canvas) => {
      //const { width, height } = canvas.getBoundingClientRect()

      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        const context = canvas.getContext('2d');
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.scale(ratio, ratio);
        return true;
      }

      return false;
    };

    const resizeCanvasToDisplaySize = (canvas) => {
      //const { width, height } = canvas.getBoundingClientRect()

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }

      return false;
    };
    const canvas = canvasRef.current;

    resizeCanvas(canvas);
    resizeCanvasToDisplaySize(canvas);
    const context = canvas.getContext('2d');

    let animationFrameId;

    context.clearRect(0, 0, canvas.width, canvas.height);

    //Our draw came here
    const render = () => {
      draw(context, canvas, characters);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [characters, height, width]);

  return (
    <div style={{ width: '600px', height: '600px', margin: 'auto' }}>
      <canvas width="400px" height="400px" ref={canvasRef} />
    </div>
  );
};

export default Canvas;
