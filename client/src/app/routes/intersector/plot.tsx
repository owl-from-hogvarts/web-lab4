import React, { useEffect, useRef } from "react";
import PlotPainter from "old/draw";
import { AreaCheckResult } from "old/display-points";
import styled from "@emotion/styled";
import { TPoint } from "./intersector-form";

const StyledPlot = styled.canvas`
  display: flex;
  width: 30rem;
  height: 30rem;
`;

export interface PlotProps {
  points: Pick<AreaCheckResult, "point" | "result">[];
  onPointAdd?: (point: TPoint) => void,
  scale: number
}

export default function Plot({ points, onPointAdd = () => {}, scale }: PlotProps) {
  const plot = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!plot.current) return;
    const painter = new PlotPainter(plot.current);

    for (const { point, result } of points) {
      painter.drawPoint(point, result);
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
