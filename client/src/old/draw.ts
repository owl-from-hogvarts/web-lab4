import { TPoint, TScaledPoint } from "app/routes/intersector/intersector-form";

export type Position = { x: number; y: number };
type UnitMark = Position & { label: string; isHorizontal: boolean };

const FIGURE_COLOR = "#3399ff";
const POINT_COLOR = {
  intersects: "#2F4",
  notIntersects: "#570000",
};
const POINT_RADIUS = 5;

export default class PlotPainter {
  readonly #context: CanvasRenderingContext2D;
  readonly #canvas: HTMLCanvasElement

  get axisNumberSize() {
    return this.widthPercents(80);
  }

  get axisUnit() {
    return this.axisNumberSize / 2
  }

  get axisHalfUnit() {
    return this.axisUnit / 2
  }

  get #canvasWidth() {
    return this.#canvas.clientWidth
  }

  get #canvasHeight() {
    return this.#canvas.clientHeight
  }
  
  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas
    this.#context = canvas.getContext("2d")!;

    this.reDraw()
  }

  reDraw() {
    this.#context.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
    this.#context.save();
    this.#context.translate(this.#canvasWidth / 2, this.#canvasHeight / 2);
    this.#context.scale(1, -1);
    this.#context.save();
    this.drawCircle(this.#context);
    this.#context.rotate(Math.PI);
    drawTriangle(this.#context, this.axisHalfUnit);
    this.#context.restore();
    this.#context.save();
    this.#context.scale(-1, 1);
    this.drawRect(this.#context);
    this.#context.restore();

    this.#context.restore();

    this.#drawAxis(this.#context, false);
    this.#drawAxis(this.#context, true);
  }

  drawPoint(point: TScaledPoint, result: boolean) {
    const context = this.#context
    
    context.save();
    context.translate(this.#canvasWidth / 2, this.#canvasHeight / 2);
    context.scale(1, -1);

    const x = (this.axisUnit * point.pointX) / point.scale;
    const y = (this.axisUnit * point.pointY) / point.scale;

    context.translate(x, y);
    const circle = new Path2D();
    circle.moveTo(0, 0);
    circle.arc(0, 0, POINT_RADIUS, 0, Math.PI * 2);

    context.fillStyle = result
      ? POINT_COLOR.intersects
      : POINT_COLOR.notIntersects;
    context.fill(circle);
    context.restore();
  }

  widthPercents(percents: number): number {
    return (this.#canvasWidth / 100) * percents;
  }

  heightPercents(percents: number): number {
    return (this.#canvasHeight / 100) * percents;
  }

  #drawAxis(
    context: CanvasRenderingContext2D,
    isVertical: boolean = false
  ) {
    const canvasWidth = this.#canvasWidth
    const canvasHeight = this.#canvasHeight
    
    context.save();
  
    const arrowBody = new Path2D();
  
    if (isVertical) {
      const arrowTipPosition: Position = {
        x: this.widthPercents(50),
        y: 0,
      };
  
      arrowBody.moveTo(arrowTipPosition.x, arrowTipPosition.y);
      arrowBody.lineTo(arrowTipPosition.x, canvasHeight);
  
      context.save();
      context.translate(arrowTipPosition.x, arrowTipPosition.y);
      context.rotate(-Math.PI / 2);
      this.#drawArrowTip(context);
      context.restore();
    } else {
      const arrowTipPosition: Position = {
        x: canvasWidth,
        y: canvasHeight / 2,
      };
  
      arrowBody.moveTo(0, arrowTipPosition.y);
      arrowBody.lineTo(arrowTipPosition.x, arrowTipPosition.y);
  
      context.save();
      context.translate(arrowTipPosition.x, arrowTipPosition.y);
      this.#drawArrowTip(context);
      context.restore();
    }
  
    context.stroke(arrowBody);
  
    const unitMark: UnitMark = {
      x: isVertical ? 0 : this.axisUnit,
      y: isVertical ? this.axisUnit : 0,
      label: "R",
      isHorizontal: isVertical,
    };
  
    const halfUnitMarker: UnitMark = {
      x: isVertical ? 0 : this.axisHalfUnit,
      y: isVertical ? this.axisHalfUnit : 0,
      label: "R/2",
      isHorizontal: isVertical,
    };
  
    context.save();
    context.translate(canvasWidth / 2, canvasHeight / 2);
  
    this.#drawUnitMark(context, unitMark);
    this.#drawUnitMark(context, halfUnitMarker);
  
    const mirrorAxis: keyof Position = isVertical ? "y" : "x";
  
    const unitMarkNegative = {
      ...unitMark,
      [mirrorAxis]: unitMark[mirrorAxis] * -1,
    };
    const halfUnitMarkerNegative = {
      ...halfUnitMarker,
      [mirrorAxis]: halfUnitMarker[mirrorAxis] * -1,
    };
  
    this.#drawUnitMark(context, unitMarkNegative);
    this.#drawUnitMark(context, halfUnitMarkerNegative);
  
    context.restore();
    context.restore();
  }
  
  #drawArrowTip(context: CanvasRenderingContext2D) {
    const arrowTip = new Path2D();
    const arrowTipWidthPercents = 3;
    const arrowTipHalfHeightPercents = 1;
  
    arrowTip.moveTo(0, 0);
    arrowTip.lineTo(
      -this.widthPercents(arrowTipWidthPercents),
      -this.heightPercents(arrowTipHalfHeightPercents)
    );
  
    arrowTip.lineTo(
      -this.widthPercents(arrowTipWidthPercents),
      this.heightPercents(arrowTipHalfHeightPercents)
    );
  
    context.fill(arrowTip);
  }
  
  #drawUnitMark(context: CanvasRenderingContext2D, unitMark: UnitMark) {
    const unitMarkHalfHeight = this.heightPercents(1.8);
    const unitMarkHalfWidth = this.widthPercents(0.1);
  
    const textMargin = this.heightPercents(3);
    context.save();
    context.translate(unitMark.x, unitMark.y);
    context.save();
    context.rotate(unitMark.isHorizontal ? Math.PI / 2 : 0);
    context.fillRect(
      -unitMarkHalfWidth,
      -unitMarkHalfHeight,
      unitMarkHalfWidth * 2,
      unitMarkHalfHeight * 2
    );
    context.restore();
    context.fillText(
      unitMark.label,
      unitMarkHalfWidth + (unitMark.isHorizontal ? textMargin : 0),
      unitMarkHalfHeight + (!unitMark.isHorizontal ? textMargin : 0)
    );
    context.restore();
  }

  drawCircle(context: CanvasRenderingContext2D) {
    context.save();
    const arc = new Path2D();
    arc.moveTo(0, 0);
    arc.arc(0, 0, this.axisHalfUnit, -Math.PI / 2, 0);
  
    context.fillStyle = FIGURE_COLOR;
    context.fill(arc);
    context.restore();
  }
  
  drawRect(context: CanvasRenderingContext2D) {
    context.save();
  
    const rect = new Path2D();
    rect.moveTo(0, 0);
    rect.rect(0, 0, this.axisHalfUnit, this.axisUnit);
  
    context.fillStyle = FIGURE_COLOR;
    context.fill(rect);
    context.restore();
  }
}

function drawTriangle(context: CanvasRenderingContext2D, size: number) {
  context.save();
  const triangle = new Path2D();
  triangle.moveTo(0, 0);
  triangle.lineTo(0, size);
  triangle.lineTo(size, 0);

  context.fillStyle = FIGURE_COLOR;
  context.fill(triangle);
  context.restore();
}


