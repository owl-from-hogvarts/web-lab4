import React, { useEffect, useRef } from "react";
import PlotPainter from "utils/draw";
import styled from "@emotion/styled";
import { PointCheckResult, TPoint } from "app/api/point";

const StyledPlot = styled.canvas`
  display: flex;
  width: 30rem;
  height: 30rem;
`;

export interface PlotProps {
  points: Pick<PointCheckResult, "pointX" | "pointY" | "scale" | "isIntersects">[];
  onPointAdd?: (point: TPoint) => void,
  scale: number
}

export default function Plot({ points, onPointAdd = () => {}, scale }: PlotProps) {
  const plot = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!plot.current) return;
    const painter = new PlotPainter(plot.current);
    painter.reDraw()

    for (const { pointX, pointY, scale, isIntersects: result } of points) {
      painter.drawPoint({pointX, pointY, scale}, result);
    }
  }, [points]);

  return (
    <StyledPlot className="rounded" width="480" height="480" ref={plot} onClick={(event) => {
      const rect = plot.current!.getBoundingClientRect(); 
      const painter = new PlotPainter(plot.current!)
      const x = (event.clientX - rect.left - rect.width / 2) / painter.axisUnit * scale; 
      const y = (event.clientY - rect.top - rect.height / 2) / -painter.axisUnit * scale;

      onPointAdd({pointX: x, pointY: y})
    }}></StyledPlot>
  );
}
