import React, { useEffect, useState } from "react";
import Plot from "./plot";
import IntersectorForm from "./intersector-form";
import PointsTable from "./table";
import { AreaCheckResult } from "old/display-points";

export default function Intersector() {  
  const [points, setPoints] = useState([] as AreaCheckResult[])
  const [scale, setScale] = useState(1)

  useEffect(() => {
    refreshPoints()
  })
  
  async function refreshPoints() {
    const pointsResponse = await fetch("/api/v1/points")
    setPoints(await pointsResponse.json())
  }

  return (
    <>
      <Plot points={points} scale={scale} onPointAdd={(point) => {
        fetch("/api/v1/points", {
          method: "POST",
          body: JSON.stringify({...point, scale})
        })
      }} />
      <IntersectorForm onPointAdd={refreshPoints} scale={scale} onScaleSet={setScale} />
      <PointsTable points={points} />
    </>
  );
}

// propose point to sever
// when request completes, re-request points from server
