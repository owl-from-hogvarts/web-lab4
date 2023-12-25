import React, { useEffect, useState } from "react";
import Plot from "./plot";
import IntersectorForm from "./intersector-form";
import PointsTable from "./table";
import api from "app/api/api";
import { PointCheckResult, addPoint, getPoints } from "app/api/point";

export default function Intersector() {
  const [points, setPoints] = useState([] as PointCheckResult[]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    refreshPoints();
  }, []);

  async function refreshPoints() {
    setPoints(await getPoints());
  }

  return (
    <>
      <Plot
        points={points}
        scale={scale}
        onPointAdd={async (point) => {
          await addPoint({...point, scale})
          refreshPoints();
        }}
      />
      <IntersectorForm
        onPointAdd={() => refreshPoints()}
        scale={scale}
        onScaleSet={setScale}
      />
      <PointsTable points={points} />
    </>
  );
}

// propose point to sever
// when request completes, re-request points from server
