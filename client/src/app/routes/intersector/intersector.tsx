import React, { useEffect, useState } from "react";
import Plot from "./plot";
import IntersectorForm from "./intersector-form";
import PointsTable from "./table";
import {
  PointCheckResult,
  TScaledPoint,
  addPoint,
  getPoints,
} from "app/api/point";
import Pager from "./pager";
import usePages from "app/hooks/usePages";

type TRefreshPointsConfig = {
  scale?: TScaledPoint["scale"], 
  page?: number
}

const DEFAULT_PAGE = 1

export default function Intersector() {
  const [points, setPoints] = useState([] as PointCheckResult[]);
  const [scale, setScale] = useState(1);

  const {page, totalPages, setPages, setTotalPages} = usePages({
    defaultPage: DEFAULT_PAGE,
    paramName: true
  })

  useEffect(() => {
    refreshPoints({scale, page});
  }, [scale, page]);

  async function refreshPoints({scale, page}: TRefreshPointsConfig = {}) {
    try {
      const response = await getPoints({ scale, page })
      setPoints(response.points);
      setTotalPages(response.totalPages)
    } catch (error) {
      setPages(DEFAULT_PAGE)
    }
  }

  return (
    <>
      <Plot
        points={points}
        scale={scale}
        onPointAdd={async (point) => {
          await addPoint({ ...point, scale });
          refreshPoints({scale, page});
        }}
      />
      <IntersectorForm
        onPointAdd={() => refreshPoints({scale, page})}
        scale={scale}
        onScaleSet={(scale) => setScale(scale)}
      />
      <Pager
        totalPages={totalPages}
        page={page}
        onPageChange={setPages}
        />
      <PointsTable points={points} />
    </>
  );
}
