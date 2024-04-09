import { Character } from "@/types/API";

const BORDER_COLOR = "#000000";
const GOOD_COLOR = "#ccf2ff";
const EVIL_COLOR = "#ffcccc";
const NEUTRAL_COLOR = "#fff2cc";

const toRadians = (deg: number) => {
  return (deg * Math.PI) / 180;
};

const drawAlignmentCircle = (
  ctx: CanvasRenderingContext2D,
  character: Character,
  r: number,
  centerX: number,
  centerY: number
) => {
  let lawfulChaotic = character.lawfulChaoticValue / 100;
  let goodEvil = character.goodEvilValue / 100;

  if (lawfulChaotic > 1) {
    lawfulChaotic = 1;
  }
  if (lawfulChaotic < -1) {
    lawfulChaotic = 1;
  }

  if (goodEvil > 1) {
    goodEvil = 1;
  }

  if (goodEvil < -1) {
    goodEvil = -1;
  }

  const rawX = centerX + lawfulChaotic * r;
  const rawY = centerY + goodEvil * r;
  const angle = Math.atan2(rawY - centerY, rawX - centerX);
  let x = centerX + Math.abs(lawfulChaotic) * r * Math.cos(angle);
  let y = centerY + Math.abs(goodEvil) * r * Math.sin(angle);

  //alignment
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, 2 * Math.PI);
  ctx.lineWidth = 5;
  ctx.fillStyle = "#752626";
  ctx.fill();
  ctx.stroke();
  ctx.font = "12px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffff";
  ctx.fillText(character.name.charAt(0), x, y);
  ctx.closePath();
};

export const drawAllAlignments = (
  ctx: CanvasRenderingContext2D,
  characters: Character[],
  r: number,
  centerX: number,
  centerY: number
) => {
  characters.forEach((el) => {
    drawAlignmentCircle(ctx, el, r, centerX, centerY);
  });
};

export const drawOctagon = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  r: number,
  a: number
) => {
  let angles = [];
  ctx.beginPath();
  ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
  for (let i = 0; i < 8; i++) {
    angles.push([
      centerX + r * Math.cos(a * i + Math.PI / 8),
      centerY + r * Math.sin(a * i + Math.PI / 8),
    ]);
  }
  ctx.lineWidth = 5;
  ctx.strokeStyle = BORDER_COLOR;
  ctx.stroke();
  ctx.closePath();

  return angles;
};

export const drawGoodTiles = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  _angles: any,
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, r, toRadians(157.5), toRadians(337.5));
  ctx.lineTo(centerX, centerY);
  ctx.closePath();
  ctx.fillStyle = GOOD_COLOR;
  ctx.fill();
  ctx.closePath();
};

export const drawEvilTiles = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  _angles: any,
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, r, toRadians(22.5), toRadians(157.5));
  ctx.lineTo(centerX, centerY);
  ctx.closePath();
  ctx.fillStyle = EVIL_COLOR;
  ctx.fill();
  ctx.closePath();
};

export const drawNeutralTiles = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  _angles: any,
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, r, toRadians(157.5), toRadians(202.5));
  ctx.lineTo(centerX, centerY);
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, r, toRadians(-22.5), toRadians(22.5));
  ctx.lineTo(centerX, centerY);
  ctx.fillStyle = NEUTRAL_COLOR;
  ctx.fill();
  ctx.closePath();
};

export const drawAxesLines = (
  ctx: CanvasRenderingContext2D,
  angles: number[][]
) => {
  ctx.strokeStyle = BORDER_COLOR;
  let axesLines = new Path2D();
  axesLines.moveTo(angles[0][0], angles[0][1]);
  axesLines.lineTo(angles[4][0], angles[4][1]);
  axesLines.moveTo(angles[5][0], angles[5][1]);
  axesLines.lineTo(angles[1][0], angles[1][1]);
  axesLines.moveTo(angles[6][0], angles[6][1]);
  axesLines.lineTo(angles[2][0], angles[2][1]);
  axesLines.moveTo(angles[7][0], angles[7][1]);
  axesLines.lineTo(angles[3][0], angles[3][1]);
  ctx.lineWidth = 2.5;
  ctx.stroke(axesLines);
  axesLines.closePath();
};

export const drawCenterCircle = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number
) => {
  ctx.beginPath();
  ctx.arc(centerX, centerY, 75, 0, 2 * Math.PI);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = BORDER_COLOR;
  ctx.stroke();
  ctx.closePath();
};

export const drawSideCircle = (
  ctx: CanvasRenderingContext2D,
  a: number,
  r: number,
  centerX: number,
  centerY: number
) => {
  const alignments = ["CN", "CE", "NE", "LE", "LN", "LG", "NG", "CG"];
  for (let i = 0; i < 8; i++) {
    const x = centerX + r * Math.cos(a * i);
    const y = centerY + r * Math.sin(a * i);
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, 2 * Math.PI);

    if (i > 0 && i < 4) {
      ctx.fillStyle = EVIL_COLOR;
    } else if (i > 4 && i < 8) {
      ctx.fillStyle = GOOD_COLOR;
    } else {
      ctx.fillStyle = NEUTRAL_COLOR;
    }
    ctx.lineWidth = 0;
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.font = "20px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(alignments[i], x, y);
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = BORDER_COLOR;
    ctx.arc(x, y, 35, a * i - Math.PI / 2, a * i + Math.PI - Math.PI / 2);
    ctx.stroke();
    ctx.closePath();
  }
  ctx.fillStyle = "#000000";
  ctx.font = "20px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("N", centerX, centerY);
};
